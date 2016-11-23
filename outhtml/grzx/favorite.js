(function(){
var search=getSearch()
	,type=search['type']
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight
	,$={}
	,href=location.href	
	,tjData={tvm_id:'',paiTimeUnix:'',result:''}
	,key={user:'set_u',ajax:'set_a'}
	,list_box
	,navs,Verifs,num=0,_curObj=null,setZT=null
,userInfo={}
,CONFIG={
	shareInfo:{
	title:"红包摇不停！",
	ico:"http://qa.h5.mtq.tvm.cn/yao/sq_yyy/img/share_ico.png",
	link:"",
	desc:"正在玩红包摇不停，推荐你也来试试，现金红包任你领",
	token:"46497107fa23"
	}
},PAGE={title:"摇一摇福利到",
	token:"46497107fa23"
	,yyyappid:"46497107fa23"
	,channelId:"wxd06496bae6bb4a78"
  ,systoken:"uuETOJuZ"
	}
,HOST={
AD:"//mb.mtq.tvm.cn",
FAV:'//fav.yaotv.tvm.cn',
FR:"http://friends.yaotv.tvm.cn",
RTS:"//rts-opa.yaotv.tvm.cn",
SC:"//ucj.yaotv.tvm.cn",
TJ:"//ana.mtq.tvm.cn"
}	
;
	var klW,liW,wkey={//卡券包
			kabao:1				//
			,youlove:1			//
			,coupons:1			//
		};
	$.kabao=[];
	$.listArr=[0,20,'MATCHINGFLOW'];

toSQ(function(){
	var Verifs_two=null;	
		DO.title="我的收藏";		
		$.main=createNode(DB,'div',{className:'main'},'p3');
		$.loading=createNode(DB,"div",{className:"loading"},"p3");
		list_box=createNode($.main,'ul',{className:'list-box',html:"<p>以下是您最近100条收藏记录（含您摇过的所有频道）</p>"},'p3');
		$.ss=$.loading.style;		
		key[type]=='set_u'&&sethash(type,user);
		kabaoload($.listArr[0],$.listArr[1],$.listArr[2]);
		addEvent($.main,"click",_docAction);	
		CONFIG.shareInfo.link="http://a.h5.mtq.tvm.cn/yao_zhoubian/ttdsb/index.html?url=mywin.html";
		CONFIG.shareInfo.desc="天天电视宝 - 我的收藏"
		CONFIG.shareInfo.title="天天电视宝"
		tjData.appName="我的收藏页面";
		_TJ(100000);
		addEvent(window,'scroll',scrolldo);
	function sethash(_,u){
		var cs;switch(_){
			case 'user':cs=JSON.stringify(u);break
			case 'ajax':cs=encodeURIComponent(u);break
		};location.hash='$--'+cs;
	}	
	function scrolldo(){
		var v=DB.scrollTop+winH,d=DB.scrollHeight;
		if(v>d-2){
			if($.ss['display']!='block'){
				//DB.scrollTop=tp-3;
				if($.wonder)return;
				$.wonder=true;
				$.listArr[0]++;
				setTimeout(function(){$.wonder=false;},500);
				kabaoload($.listArr[0],$.listArr[1],$.listArr[2]);
			}
		}
	}
	function kabaoload(a,b,c){
		if($.qqkey){tishi('已经最后一页了');DB.setAttribute('onscroll','');return}
		$.ss['display']='block';
		var user=userInfo,canshu=HOST.FAV+'/open/user/orders?cache='+Math.random()+'&yyyappId='+PAGE.yyyappid+'&openId='+user.openid+'&sign='+user.tokenSig+'&sigExpire='+user.sigExpire+'&queryType=prize&prizeType='+c+'&page='+a+'&pageSize='+b+'&openid='+user.openid,ajax=setAjax('get',canshu);
		key[type]=='set_a'&&sethash(type,canshu);
		//ajax.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");}
		ajax.callBack=function($data){
			var data=toObject($data);
			if(data.status==='success'){
				var _=data.data;
				if(_.length<b)$.qqkey=true;
				setData(_);
				if(list_box.innerHTML=='')rongcuo(1,list_box);				
			}else if(data.statusCode===101){
				tishi("网络异常请重新进入",{fun:function(){
					location.replace("index.html")
					}})
				}else rongcuo(1,list_box);
		};
		ajax.err=function(){rongcuo(2,list_box);}
		ajax.send();
	}
	
	function setData(_){
		$.ss['display']='none';
		if(_.length==0&&$.kabao==0){
			rongcuo(3,list_box);
			return
		}
		for(var i=0;i<_.length;i++){
			var d=_[i];
			$.kabao.push(d);
		}
		wkey.kabao==1&&setkabao(list_box,_);
	}
	
	function setkabao(a,b){
		var kb=b,kbl=b.length,arrLen=$.kabao.length,lis="<p>以下是您最近100条收藏记录（含您摇过的所有频道）</p>";
		for(var i=0;i<kbl;i++){
			var d=kb[i];
			if(!d.banner&&!d.shop&&!d.desc)
				dsp(d)
			else
				djyjx(d,i);
		}
		/*type 对应 奖品
		4：第三方url
		6：推荐商品
		7：理财产品
		1001：DSP流量（官文吉）
		1002：图片卡券
		<!--<p class="red">实际只要: ￥<font>'+_money+'</font></p>-->\
		,money=d.price-d.cash
		_money=Math.floor(money)==money?money:money.toFixed(2)
		*/
		function djyjx(d,$i){
			var i=$i+arrLen-kbl;
			var html='',oClass='',topClass='',bottomClass='',showTip='';;
			if(d.tvmWelfare&&!d.tvmWelfare.hasGain){
				if(d.cardFlag=='coin'){
					bottomClass='neck';
					topClass='coin-card';
					showTip='<span action="myCard" data-curSrc="'+d.url+'" data-index="'+i+'">点击领取'+d.shop+'为您发的金币</span>';
				}else{
					bottomClass='neck';
					topClass='redPack-card';
					showTip='<span action="myCard" data-curSrc="'+d.url+'" data-index="'+i+'">点击领取'+d.shop+'为您发的红包</span>';
				}
			}else{
				showTip='<botton action="myCard" data-curSrc="'+d.url+'" data-index="'+i+'">点击查看</botton><span class="shop">'+d.shop+'提供</span>';
			};
			switch(d.type){
				case 6:
					var _link=d.url,yz=!d.originprice?'':'<font> 原价'+d.originprice+'</font>';
					yz='';
					function mallfn(_){
						var mallh='',mallbanner='';
						if(d.mall.indexOf("1号店")!=-1||d.mall.indexOf("一号店")!=-1)mallbanner='<div class="mallsty"><img src="'+PAGE.COMMON+'img/goldsLogo1.jpg"></div>';
						else if(d.mall.indexOf("京东")!=-1)mallbanner='<div class="mallsty"><img src="'+PAGE.COMMON+'img/goldsLogo2.jpg"></div>';
						else mallh='<span class="tag">'+d.mall+'</span>';
						//switch(d.mall){case "1号店":mallbanner='<div class="mallsty"><img src="'+PAGE.COMMON+'img/goldsLogo1.jpg"></div>';break
//							case "京东":mallbanner='<div class="mallsty"><img src="'+PAGE.COMMON+'img/goldsLogo2.jpg"></div>';break
//							default:mallh='<span class="tag">'+d.mall+'</span>';break}
						return (_==1?mallh:mallbanner);
					}
					html+='<p><font>收藏时间</font>: '+d.datetime+'<b class="butDel" action="del.,'+i+'"></b></p>'+(!d.mall?"":mallfn(0))+'\
					<div class="list-two tuijian">'+(!d.limit?'':'<div class="maxshop"><span>限量'+d.limit+'件</span></div>')+(!d.mall?"":mallfn(1))+'<img src="'+d.banner+'" class="kq-tp">\
						<h4>'+d.title+'</h4>\
						<p class="yj" id="yj'+num+'">￥'+d.price+yz+'</p>\
						<p class="red"><span>返</span> <font id="font'+num+'">'+d.cash+'</font>元</p>\
					</div>\
					<div class="typred6">商家有时会调整佣金，实际返现金额以返现确认页为准。</div>\
					<div class="list-three '+bottomClass+'">\
						'+showTip+'\
					</div>';
					if(d.productid){
						d.price='';
						d.cash='';
						vote(d.productid,'yj'+num,'font'+num,a);
					}
					num++;
				break
				case 1002:
					html+='<p><font>收藏时间</font>: '+d.datetime+'<b class="butDel" action="del.,'+i+'"></b></p><div class="list-four">\
						<img src="'+(d.banner||d.banner_big)+'" action="myCard" data-curSrc="'+d.url+'" data-index="'+i+'">\
					</div>\
					<div class="list-three '+bottomClass+'">\
						'+showTip+'\
					</div>';
				break
				default:
					html+='<p><font>收藏时间</font>: '+d.datetime+'<b class="butDel" action="del.,'+i+'"></b></p><div class="list-one">\
						<font class="kq-tp"><img src="'+d.banner+'"></font>\
						<h4>'+d.title+'</h4>\
						<p>'+d.shop+'</p>\
					</div>\
					<div class="list-two">\
						<img src="'+d.banner+'" class="kq-tp">\
						<p>'+d.desc+'</p>\
					</div>\
					<div class="list-three '+bottomClass+'">\
						'+showTip+'\
					</div>';
				break
			}
			
			createNode(a,"li",{'className':topClass?topClass:'',html:html});
		}
		function dsp(d){
			var html="",sty='';
			if(d.type==1001){
				if(d.imgType=="big"){
					html+='<img width="300" src="'+d.logo+'">';
					sty='style="text-align:center;padding:15px 0 12px;"';
				}else smallpic();
			}else smallpic();
			function smallpic(){
				html+='<font class="kq-tp"><img src="'+d.logo+'"></font>\
				<h4>'+d.title+'</h4>';
			}
			createNode(a,"li",{html:'<p><font>收藏时间</font>: '+d.datetime+'<b class="butDel" action="del.,'+i+'"></b></p><div class="list-one" '+sty+'>'+html+'</div><div class="list-three"><botton action="myCard" data-curSrc="'+d.url+'" data-index="'+i+'">点击查看</botton></div><div class="kq-bottom"></div>'});
		}
	}
	function vote(a,b,c,d){
		setTimeout(function(){
			var id=a,time=new Date(parseInt(parseInt(id.substring(0,8),16)+'000')),hours=time.getHours(),minutes=time.getMinutes();
			var _ajax=setAjax('get',HOST.JIAGE+'/'+hours+'_'+minutes+'/'+id+'.json');
			_ajax.callBack=function($data){
				var data=toObject($data);
				d.querySelector('#'+b).innerHTML=tofixed(data.sale_price);
				d.querySelector('#'+c).innerHTML='￥'+tofixed(data.back_cash);
			};
			_ajax.err=function(){console.log(a+'没有取到数据；')}
			_ajax.send();
		},200)
		function tofixed(_){_=_/100; return _.toString().indexOf('.')!=-1?_.toFixed(2):_;}
	}
	
	function rongcuo(e,_){$.ss['display']='none';
		var rc='';
		switch(e){
			case 1:
				rc='暂时没有获取到数据';
			break
			case 2:
				rc='网络超时，请稍候再试';
			break
			case 3:
				rc='您目前还没有添加过任何收藏哦';
			break
		}
		_.innerHTML='<p class="no_list"><img src="img/error.png"><br><br>'+rc+'</p>';
		DB.setAttribute('onscroll','');
	}
	window.Phonecallback=function(){
	/*手机注册成功的回调函数*/
		skipFn(_curObj)
		setStorage('set','mobile',1);
	};
	function _docAction(e){
		var ele=e.srcElement||e.target,_action="action",attribute,argument;				
		do{
			if(ele.nodeType!==1)break
			if(attribute=ele.getAttribute(_action))break			
		}while(ele=ele.parentNode);
			if(attribute){										
				argument=attribute.split(".,");
				var a1=argument[1];
				switch(argument[0]){
					case "myCard":
						isNativeMobile(ele);
					break
					case "like":
						isNativeMobile(ele);
					break
					case "del":
						delList(ele,a1)
					break
					case "dialog":
						dialogAction(a1)
					break
				};
		}
	}
	//判断是否注册了手机号
	function isNativeMobile(curObj){
		_curObj=curObj;
		var nativeMobile=null;
		if(+PAGE.yanzheng){
			var nativeMobile=setStorage('get','mobile');
			if(nativeMobile){
				skipFn(curObj)
			}else{
				showLoading();
				var getPhone=setAjax("get",HOST.SJYZ+"/point/integral/query?wxToken="+PAGE.yyyappid+"&openId="+mainVar.userInfo.openid);					
					getPhone.callBack=function($data){
						hideLoading();		
						var data=toObject($data).data;
						if(data.mobile){
							skipFn(curObj)
						}else{
							if(!mainVar.call)mainVar.call=new callChange;
							mainVar.call.open(1);
						};
					};
					getPhone.err=function(){
						hideLoading();
						tishi("服务器超时，请稍后重试;",{time:4000});
					};
					getPhone.send();
			};
		}else{
			skipFn(curObj)
		};
	};
	//显示loading
	function showLoading(){
		if(!mainVar.ele.loading){
			mainVar.ele.loading=createNode(DB,'div',{className:'loading'});
		}else{
			mainVar.ele.loading.style.display='block';
		};
	};
	//隐藏loading
	function hideLoading(){
		if(mainVar.ele.loading){
			mainVar.ele.loading.style.display='none';
		};
	};
	function skipFn(curObj){
		var action=curObj.getAttribute('action'),curSrc=curObj.getAttribute('data-curSrc'),index=curObj.getAttribute('data-index'),user=mainVar.userInfo,prizeData=$.kabao[index];
		if(action=='like'){
			submitFn($.like[index]);
		};
		if(prizeData.type==6){curSrc=curSrc+(curSrc.indexOf("?")>0?"&":"?")+'source=3';}
		curSrc=curSrc+(curSrc.indexOf("?")>0?"&":"?")+"yyyappId="+PAGE.yyyappid+"&openId="+user.openid+'&sign='+user.sig+'&sigExpire='+user.sigExpire+"&addi="+decodeURIComponent(JSON.stringify({"yaotv_openid":user.openid,"yyyappid":PAGE.yyyappid,"sign":user.sig,"sigExpire":user.sigExpire}))+'&cardId='+prizeData.id;
		if(prizeData.tvmWelfare&&!prizeData.tvmWelfare.hasGain){
			var locationStr=localStorage.getItem("location"),areaStr="0-0-0",gps="0,0";
			if(locationStr){
				locationStr=JSON.parse(locationStr)
				areaStr=locationStr.region.split('-');
				areaStr.splice(0,1);
				areaStr=areaStr.join("-");
				gps=locationStr.gps
			};
			showLoading();
		//	prizeData.createTime=prizeData.paiTimeUnix;
			var b=setAjax('post',HOST.BALANCE+'/open/receive/welfare');
			b.set=function(){this.setRequestHeader("Content-type","application/json")};
			b.data=JSON.stringify({
				"userInfo": {
					"openId":user.openid,    
					"ttdsbOpenId":localStorage.getItem('ttdsbid'),  
					"yyyappid":PAGE.yyyappid,           
					"sigExpire":user.sigExpire,    
					"code":user.sig,    
					"prizeFromUserId":prizeData.prizeFromUserId, 
					"name":user.nickname,
					"icon":user.weixin_avatar_url,
					"area":areaStr,
					"gps":gps
				},
				"prizeInfo":prizeData,
				"source":2        
			});
			b.callBack=function($data){
				hideLoading();
				var data=toObject($data);
				if(data.status=='success'){
					floatLayoutFun(prizeData);
				}else{
					tishi(data.message,{time:3e3});
				};
				setTimeout(function(){
					auto();
				},2e3)
			};
			b.err=function(){
				floatLayoutFun(prizeData)
				setTimeout(function(){
					auto();
				},2e3)
			};
			b.send();
		}else{
			auto();
		};
		function auto(){
			tjData.album_name=prizeData.name;
			tjData.timu=album_list(prizeData.type);
			tjData.content_id=prizeData.rate;
			tjData.result=1;
			tjData.button_name='立即前往';
			tjData.appName="卡劵包页面";
			_TJ(101000);
			location.href=curSrc;
		};	
	};
	function floatLayoutFun(options){
		DB.style.overflow='hidden';
		var str='',tip='';
		if(options.cardFlag=='coin'){
			str='<div class="coin-area">\
					  <span>x '+options.defaultValue+'</span>\
				  </div>'
			tip='不要走开，稍后金币<br>会存入您的金币账户';
		}else{
			str='<div class="redPack-area">\
					<div>\
						<p class="moneyArea">\
						  <span class="money">'+options.defaultValue+'元</span>\
						</p>\
					</div>\
				</div>'
			tip='不要走开，稍后现金红包<br>会存入您的提现账户';
		};
		var html='<p class="tip02">'+tip+'</p>\
				  <img src="//a-h5.mtq.tvm.cn/yao/common/img/icoBg.jpg">'
		var wrap=createNode(DB,'div',{'className':'floatLayout comeOut','html':'<div class="childLayout">'+str+html+'</div>'});
		/*var tip01=wrap.querySelector('.tip01 span'),htmlStr=tip01.innerHTML,htmlStrLen=htmlStr.length;
		tip01.style.cssText='width:'+(tip01.offsetWidth+5)+'px;';
		var i=3;
		setInterval(function(){
			tip01.innerHTML=htmlStr.slice(0,htmlStrLen-i);
			i--;
			if(i<0)i=3;
		},500);*/
	};
	function submitFn(listData){
		var b=setAjax('post',HOST.CJ+'/open/order/balanceActivity');
			b.set=function(){this.setRequestHeader("Content-type","application/json")};
			b.data=JSON.stringify({"lotteryid":setStorage('get','prizeId'),"balance":false,"code":user.sig,"sigExpire":user.sigExpire,"yyyappId":PAGE.yyyappid,"user":{"openId":user.openid,"name":user.nickname,"icon":user.weixin_avatar_url,"sex":user.sex,"province":user.province,"country":user.country,"city":user.city},"matchingPrize":{"id":listData.id,"title":listData.title,"type":listData.type,"url":listData.url,"logo":listData.shoplogo,"pubid":listData.pubid,"pubversion":listData.pubversion,"tag":listData.tag,"desc":listData.desc,"banner":listData.banner,"shop":listData.shop}})
			b.err=function(){};
			b.callBack=function($data){};
			b.send();
	};
function delList($ele,$i){
	dialogAction("display");
	addEvent(mainVar.dialog.ele,"click",_docAction)
	mainVar.dialog.fun=function(){
	var a=setAjax("GET",HOST.FAV+"/open/removeFav?sign="+user.tokenSig+"&sigExpire="+user.sigExpire+"&yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&uuid="+$.kabao[$i].uuid)
		a.callBack=function($data){
			var data=toObject($data);
				if(data.status=="success"){
					var ele=$ele.parentNode;
					do{
						if(ele.tagName==="LI")break
					}while(ele=ele.parentNode)
					removeNode(ele)
				}else{
					 tishi("操作失败！请刷新页面重试")
				};
			}				
			a.send()
		}		
	}
function delDialog(){
  var html ='<div class="confirm"><span>确认要删除吗?</span></div>'
		+'<div class="btn_s">'
		+'<span class="btn1" action="dialog.,cancel">取消</span>'
		+'<span class="btn2" action="dialog.,confirm">确定</span>'
		+'</div>'
		,dialogDiv=createNode(DB,"div",{className:"ul-masks"})
		,contentBox=createNode(dialogDiv,"div",{html:html,className:"hide_box"})
		,sty=dialogDiv.style
		,obj={display:function(){
			sty.display="block";
			setTimeout(function(){
				dialogDiv.classList.add("dialogDis")
					contentBox.style.display="block";
				},100)
			},hidd:function(){
				dialogDiv.classList.remove("dialogDis")	
				contentBox.style.display="none";				
				setTimeout(function(){
					dialogDiv.style.display="none";
					},300)
			},confirm:function(){
				obj.hidd();
				isFun(mainVar.dialog.fun);
				mainVar.dialog.fun=null					
			},ele:dialogDiv} 
		return obj	
	}	
function dialogAction($ac){
	if(!mainVar.dialog)mainVar.dialog=delDialog();
	switch($ac){
		case"display":
			mainVar.dialog.display();
		break
		case"confirm":
			mainVar.dialog.confirm()
		break
		case"cancel":
			mainVar.dialog.hidd()
		break
		}
	}	
function album_list($t){
	var type='';
	switch($t){
		case 1:type="实物";break
		case 2:type="消费码";break
		case 3:type="第三方卡券";break
		case 5:type="DSP";break
		case 8:type="金币";break
		case 101:type="微信卡券";break
		case 102:type="微信红包";break
		case 108:type="天天余额";break
	}
	return type;
};
function _TJ(ec,$url,$m,$s,$d){
	var user=userInfo,data='id=555eacab75188098ad000001&sex='+user.sex
	+'&user_name='+user.nickname
	+'&open_id='+user.openid
	+'&city='+user.city
	+'&country='+user.country
	+'&token='+PAGE.token
	+'&url='+encodeURIComponent($url||href)
	+'&title='+encodeURIComponent(tjData.appName||"未知应用")
	+'&event_code='+ec
	+"&page="+($s||"系统抽奖")
	+"&title_id="+tjData.paiTimeUnix
	+"&master_id="+tjData.tvm_id
	+"&content="+(tjData.content||"")
	+"&album_id="+(tjData.timu||"")
	+"&album_name="+(tjData.album_name||"")
	+"&result="+tjData.result
	+"&channel_id="+PAGE.channelId
	+"&button_name="+(tjData.button_name||"")
	+"&video_name="+encodeURIComponent(tjData.videoUrl||"")
	+"&content_id="+(tjData.content_id||"")
	+"&column_id="+(tjData.column_id||"")
	+"&insid="+(tjData.insid||"err");
	if(tjData.dsp)data+="&dsp="+(tjData.dsp|"0");
	if($m){
		location.replace("//rana.yaotv.tvm.cn/redirect?"+data+"&ch="+Math.random())
		}else{
	createNode(DB,"img",{src:HOST.TJ+"/ana?"+data+"&ch="+Math.random(),style:"display:none"},"p3")
		}
}
function getHeads($url){
	if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96";}
};
})
}())