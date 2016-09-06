var search=getSearch()
	,reset=search["reset"]||""
	,href=location.href
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight
	,tjData={}
	,sigCode,Verifs;
	mainVar.newdata={data:[]};
	if(setStorage("get","userInfo"))mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
	createNode(DB,"link",{href:PAGE.COMMON+"jc/home.css",rel:"stylesheet",type:"text/css"},"p2");
	var $=mainVar
	,myhome=CONFIG.chars.myhome
	,user=mainVar.userInfo,sigCode,nickname;
	if(!user)noUser();
	if(!user.sig)noUser();
	nickname=decodeURIComponent(user.nickname)
	sigCode=user.sigCode;
	pageinit(user,nickname);
	
	tjData.page="我的金币";
	tjData.title="我的金币页面";
	tjData.paiTimeUnix='';
	goldTJ(100000)
	$.bz='备注:请在72小时之内领取，过期作废';
	
	CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;
	initWX(PAGE.token,location);
	
	var popBox=new popBoxs(function(e,v){
		e.scrollTop=v-3;
		if($.loading.style.display != 'block'){
			var $a=mainVar.newscroll,$key=mainVar.newpan;
			if($key==false){
				tishi(CONFIG.chars.scroll.a);
				return false;
			}
			newWins.listOne($a[0],$a[1],$a[2]+1,$a[3]);
		}
	})
	,tjHjgy=0
	,lingjiang=new lingjiangs([function(){
		//实物
		lingjiang.box.setAttribute('onclick','');
		lingjiang.box.innerHTML='已领取';
		lingjiang.box.className='';
		var tag=lingjiang.box.parentNode.parentNode.querySelector('.sod');
		tag.classList.remove('red');
		tag.innerHTML='待发货';
	}
	,function(){
		//红包
		lingjiang.box.setAttribute('onclick','');
		lingjiang.box.setAttribute('action','lgj');
		lingjiang.box.innerHTML='已领取';
		lingjiang.box.className='';
	}
	,function(){
		//微信卡券
		var len=lingjiang.box.parentNode.querySelectorAll('label').length,pre=lingjiang.box.parentNode;
		if(len>0){
			pre.classList.remove('nszm'+len);
			pre.classList.add('nszm'+(len-1));
		}
		pre.removeChild(lingjiang.box);
	}
	,function(data){
		$typ=Number(data.type);
		var content=trim(document.getElementById("textarea").value),vl=content.length,dj,getsearch
		,$name=data.name
		,$rate=data.rate
		,$orderId=data.orderId
		,activityType=data.activityType
		,user=mainVar.userInfo;
		if(mainVar.data&&mainVar.data.bottomLink)getsearch=getSearch(mainVar.data.bottomLink);		
		if(vl<5){
			tishi(CONFIG.chars.hjgy.a,{time:2000});return
			}else if(vl>15){
			tishi(CONFIG.chars.hjgy.b,{time:2000});return
			}
		if(tjHjgy == 1){
			tishi(CONFIG.chars.hjgy.c,{time:3000});return
			}
		tjHjgy=1;
		if(content){
			var desc='',$sw='';
			if($typ==102){
				var money=+data.money/100
				if(money==1)desc=CONFIG.chars.hjgy.h;
				else 
				desc=CONFIG.chars.hjgy.i+money+CONFIG.chars.hjgy.j;
			}
			if(mainVar.$isT==1)desc=CONFIG.chars.hjgy.k+$name+CONFIG.chars.hjgy.l;
			if(activityType>1){
				dj=2;
			}else{
				if($rate>1&&mainVar.$isT!=1){
					dj=0;
					if($typ==102&&mainVar.$isT!=1){mainVar.shoppn='';mainVar.shoppt='';}
				}else dj=1;
			}
			switch($typ){
				case 102:case 1:
					if($typ==102)$sw="a";
				break
				case 101:
					$sw="a";
					lingjiang.getKaquan();
				break
				default:
					setTimeout(function(){goto(mainVar._urls)},1000);
				break
			}
			mainVar.$sw=$sw;
			mainVar.newlink=urlFolder()+"share.html";
			var posts={intolotterylist:dj,orderid:$orderId,yyyappid:PAGE.yyyappid,CommodityName:mainVar.shoppn,CommodityType:mainVar.shoppt,shareurl:mainVar.newlink,desc:desc,token:PAGE.token,topicid:PAGE.topicid,openid:user.openid,nickname:user.nickname,headimg:user.weixin_avatar_url,content:content,paiTimeUnix:mainVar.paiTimeUnix||0};
			lingjiang.speechDo(posts);
		}else{
			tishi(CONFIG.chars.hjgy.f)	
		}
	}
	,function(_data){
		$typ=_data.type
		//if(_data.status=='1')tishi(CONFIG.chars.hjgy.d,{time:2000});
		if($typ==102||$typ==1){
		//	if(mainVar.$sw == "a"){
				lingjiang.getHongbao();
				//popBox.popClose();}else lingjiang.form();
		}
		//if($typ==101)if(mainVar.$sw == "a")popBox.popClose();
		tjHjgy=0;
	}]);
	
	function pageinit(user,nickname){
		DO.title="个人中心";
		$.ts='设置手机号 ><font id="yh_status">即可成为北京生活频道会员</font>';
		var cardh='',homes=myhome.homes,menu=myhome.menu;
		if(+myhome.news==1)$.banner=createNode(DB,'div',{className:'banner',html:'<div class="photo"><img src='+getHeads(user.weixin_avatar_url)+'></div>\
			<font>'+nickname+'</font><p id="mobile_box"></p><div class="hj_box" id="hj_box"></div>'},'p2')
		if(+myhome.balance==1)$.news=createNode($.banner,'div',{className:'news',html:'<ul>\
				<li class="xiaoxi"><a action="tishi" href="#"><em class="tag"></em>消息</a></li>\
				<li class="tiezi"><a href="coin.html?pageview=mypost"><em class="tag"></em>帖子</a></li>\
				<li class="gold"><a href="Detailed.html?nu=1"><em class="tag"></em>'+PAGE.unit+'<span id="gold"></span></a></li>\
			</ul>'},'p4')
		if(+homes.key==1)$.zhanghu=createNode($.news,'div',{className:'zhanghu',html:'<div class="zhang_top"><font><em class="tag"></em>钱包</font>'+(homes.strategy==''?'':'<a href="'+homes.strategy+'" class="color_blue"><span class="color_blue">?</span> 余额攻略</a>')+'</div>\
			<ul class="zhang_center">\
				<li>\
					<span>余额</span>\
					<p id="yms"></p>\
					<a class="mx" href="Detailed.html">明细 <em></em></a>\
				</li>\
				<li>\
					<span>已提现</span>\
					<p id="yms2"></p>\
					<a class="mx" href="'+HOST.DOMAIN+'/auth/yyyfanxian?page=fxorder&yyyappId='+PAGE.yyyappid+'">明细 <em></em></a>\
				</li>\
			</ul>\
			'+(homes.financing==''?'':'<div class="zhang_bottom"><a href="'+homes.financing+'?yyyappId='+PAGE.yyyappid+'&sigExpire='+user.sigExpire+'&sign='+user.sig+'&openId='+user.openid+'" class="color_blue"><em class="tag"></em>买理财，赚收益，还可得微信红包</a></div>')},'p4')
		$.loading=createNode(DB,"div",{className:"loading"},"p3");
		$.load2=createNode(DB,"div",{className:"load2"},"p3");
		mainVar.newbg=createNode(DB,"div",{className:"newbg"},"p3");
		
		cardh=(+menu.wintake==1?'<li class="mywin"><a onclick="gifts.open();"><em class="tag"></em>中奖记录</a></li>':'')
		+(+menu.card==1?'<li class="kaquan"><a href="mywin.html?type=COUPONS&name=卡券&sigCode='+sigCode+'"><em class="tag"></em>卡券包</a></li>':'')
		+(+menu.myorder==1?'<li class="dingdan"><a href="'+HOST.DOMAIN2+'/auth/yyyfanxian?page=fxorder&yyyappId='+PAGE.yyyappid+'"><em class="tag"></em>我的提现</a></li>':'')
		+(+menu.shoping==1?'<li class="shoping"><a href="coin.html?token='+PAGE.token+'&instanceId='+PAGE.countInstanceid+ '&openid='+user.openid+'&sig='+user.sig+'&sigCode='+sigCode+'&yyyappid='+PAGE.yyyappid+'&nickname='+nickname+'&headimg='+user.weixin_avatar_url+'"><em class="tag"></em>商城</a></li>':'')
		+(+menu.casino==1?'<li class="jbhouse"><a href="http://yaotv.qq.com/shake_tv/shaketv_new/zip/24gyafa598o5s8uc8npkhk0/ylc.html?yyyappid='+PAGE.yyyappid+'"><em class="tag"></em>娱乐场</a></li>':'')
		+(+menu.history==1?'<li class="history"><a href="'+HOST.ORDER+'"><em class="tag"></em>我的订单</a></li>':'');
		$.card=createNode($.zhanghu,'div',{className:'card',html:'<ul>'+cardh+'</ul>'},'p4');
		$.lists=createNode(DB,'div',{className:'list_box',id:'list_box',html:'<ol id="nav" class="nav"><li name="GOOD" class="on">实物</li><li name="CASH">微信红包</li><li name="COUPONS">卡券及其他</li><li id="red" class="red"></li></ol><div id="scrollbox"><ul class="lists" id="GOOD"></ul><ul class="lists" id="CASH"></ul><ul class="lists" id="COUPONS"></ul></div>'},'p3');
		
		gifts=new gift_list;
		gifts.init(GOOD,'GOOD');
		DB.className='list0';
		//if(ndata.length!=0&&t.Arr[0]==1)list_box.setAttribute('onscroll','gifts.scrolldo(this)');
		
		$.navs=nav.querySelectorAll('li');
		navlen=$.navs.length-1
		liW=winW/navlen
		random=.3
		kongW=liW*random
		klW=kongW/2
		redW=liW-kongW;
		
		red.style.cssText='left:'+klW+'px;width:'+redW+'px';
		for(var i=0;i<navlen;i++){
			$.navs[i].type=i;
			$.navs[i].onclick=forbtn;
		}
		
		quanxian();//设置手机号显示
		
		fanxian(function(_){//提现
			var money;
			if(_.status=='success')
			money=(+_.data).toFixed(2);
			else
			money='0.00';
			yms2.innerHTML=money
		})
		
		mygodnum(function(_){
			var $h,$a,$d=_.data;
			if(_.status=="success"){
				if($d.integral==0)$h=0;else $h=$d.integral;
				if($d.mobile){
					setZT('手机号 <font id="yh_status">'+($d.mobile.substr(0,3)+'****'+$d.mobile.substr(7))+'</font> <span onclick="gobindmobile();">重置</span>');
				}else setZT($.ts);
			}else{
				$h=0;
				setZT($.ts);
			}
			
			gold.innerHTML=$h;
		});
		
		yue(function(_){
			var _=toObject(_);
			if(_.status=="success")yms.innerHTML=(_.body.virtualCurrency/100).toFixed(2);
			else yms.innerHTML='0.00';
		})
	}
	
	function forbtn(){
		var n=this.type,nu=klW+n*liW,type=this.getAttribute('name'),_box;
		DB.className='list'+n;
		red.style['transition']='all .24s .2s ease';
		red.style['left']=nu+'px';
		_box=DB.querySelector('#'+type);
		if(_box.innerHTML=='')gifts.init(_box,type);
	}
	
	function setZT(e){
		mobile_box.innerHTML=e;
	}
	function getHeads($url){
		if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96";}
	}
	
	function yue($fun){
		var a=setAjax('get',HOST.CJ+'/open/user/virtualcurrency?openId='+user.openid+"&code="+user.sig+"&yyyappId="+PAGE.yyyappid+'&sigExpire='+user.sigExpire+'&channelid='+PAGE.channelId+'&cache='+Math.random());		
		a.callBack=function($data){
			isFun($fun,$data);
		}
		a.err=function(){
			isFun($fun,JSON.stringify({body:{virtualCurrency:0}}))
		}
		a.send()
	}
	function setdingdan($fun){
		var a=setAjax('get',HOST.CARD+'/open/order/state/count?openId='+user.openid);		
		a.callBack=function(data){
			_data=toObject(data);
			isFun($fun,_data);
		}
		a.send()
	}
	
	function fanxian($fun){
		var a=setAjax('get',HOST.DOMAIN2+'/open/fanxian/money?openId='+user.openid);		
		a.callBack=function(data){
			_data=toObject(data);
			isFun($fun,_data);
		}
		a.err=function(){
			isFun($fun,{status:"",code:200,data:0});
		}
		a.send()
	}
	
	function bindmobile(_){
		var b=setAjax('post',HOST.MB+'/apis/sms/send')
		b.data="wx_token="+PAGE.yyyappid+"&mobile="+_+"&openid="+user.openid+"&sigExpire="+(+user.sigExpire)+"&sign="+user.sig+"&reset=1"
		b.err=praseDate(1);
		b.callBack=praseDate;
		function praseDate($data){
			if($data==1){
				tishi("网络超时,请稍候再试",{time:2000});
				return
			}
			_data=toObject($data);
			if(_data.result)tishi(CONFIG.chars.sjyz.a);
			else
			if(_data.message){var code='';
				if(_data.errorcode)code=' 错误码：'+_data.errorcode;
				tishi(_data.message+code,{time:2000});
			}
		}
		b.send();
	}
	
	function gobindmobile(){
		if(!$.call)$.call=new callChange;
		$.call.open()
	}
	
	function sendmobile(a,b,c,d){
		if(mainVar._biaokey==false)return false;
		mainVar._biaokey=false;
		var userInfo=mainVar.userInfo,$_=$.loading.style,a1=setAjax("get",HOST.SJYZ+"/apis/sms/checkverify?wx_token="+PAGE.yyyappid+"&mobile="+a+"&openid="+userInfo.openid+"&code="+sigCode+"&sign="+userInfo.sig+"&verify="+b+"&sigExpire="+userInfo.sigExpire)
		$_.display='block';
		a1.callBack=function($data){
			var data=toObject($data);
			mainVar._biaokey=true;
			$_.display='none';
			if(data.result==true){
				typeof c=='function'&&c();
				tishi(CONFIG.chars.form.d,{time:2000});
				return
			}else
			if(data.message)tishi(data.message+' 错误码：'+data.errorcode,{time:2000});
			typeof d=='function'&&d();
		}
		a1.err=function(){
			tishi('网络超时，请稍候再试',{time:2000});
			$_.display='none';
		}
		a1.send();
	}
	
	function quanxian(){
		q=setAjax("get",HOST.QX+"/tvmyao/api.php?action=userinfo&openid="+user.openid+"&yyyappid="+PAGE.yyyappid)
		q.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");}
		q.callBack=function($data){
			var data=toObject($data);
			if(data.status==1){
				var level=data.data.levelinfo;
				if(level.grade_name&&level.pic_name)hj_box.innerHTML='<a href="'+HOST.HUIYUAN+'"><div class="hj_tag"><img src="'+level.pic_name+'"></div>'+level.grade_name+level.lvl+'级</a>';
			}
		}
		q.send();		
	}	
	
	function isFun($fun){var a;
		return typeof($fun)==="function"?(a=[].slice.call(arguments),a.shift(),$fun.apply(null,a),$fun):function(){}
	}
	
	function callChange(){
		var t=this;
		setStyle('.changeTC{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.6);z-index:110;display:none;}.changebox{text-align:center;background:#fff;width:90%;border-radius:3px;position:absolute;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);}.changebox h4,.inp span{color:#ff6654;font-size:14px;font-weight:100;}.changebox h4{padding:25px 10px 10px 10px;}.inp span{border:1px solid #ff6654;}.changebox p{font-size:10px;margin-bottom:25px;}.changebox ul{margin-bottom:35px;border-top:1px solid #eee;}.changebox ul li{border-bottom:1px solid #eee;border-right:0;border-left:0;padding:10px;}.changebox input{width:100%;margin:0;padding:7px 0;border:0;font-size:14px;padding:7px 0 7px 10px;box-sizing:border-box;}.changebox .inp{padding:10px 120px 10px 10px;position:relative;}.changebox .inp span{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);border-radius:2px;padding:4px 9px;}.changebox ol li{background:#ebebeb;width:50%;padding:15px 0;float:left;border-radius:0 0 0 3px;}.changebox ol li:nth-child(2){background:#ff6654;color:#fff;border-radius:0 0 3px 0;}\
@-webkit-keyframes show{\
0%{opacity:0;margin-top:-50%;}\
30%{opacity:0;}\
100%{opacity:1;margin-top:0;}}\
@keyframes show{\
0%{opacity:0;margin-top:-50%;}\
30%{opacity:0;}\
100%{opacity:1;margin-top:0;}}\
.show{-webkit-animation:show .3s linear;animation:show .3s linear}\
@-webkit-keyframes hide{\
0%{opacity:1;margin-top:0;}\
70%{opacity:0;}\
100%{opacity:0;margin-top:-50%;}}\
@keyframes hide{\
0%{opacity:1;margin-top:0;}\
70%{opacity:0;}\
100%{opacity:0;margin-top:-50%;}}\
.hide{-webkit-animation:hide .3s linear;animation:hide .3s linear}');
		createNode(DB,'div',{className:'changeTC',id:'changeTC',html:'<div class="changebox">\
			<h4>若您的手机号码变更，请立即更换</h4>\
			<p>您的注册信息我们不会分享、透露给任何第三方服务商</p>\
			<ul>\
				<li class="inp"><input type="text" id="inp1" placeholder="输入新手机号"><span onclick="$.call.yzfn()">获取验证码</span></li>\
				<li class="tanz"><input type="text" id="inp2" placeholder="输入验证码"></li>\
			</ul>\
			<ol>\
				<li id="close" onclick="$.call.close();">取消</li>\
				<li id="confirm" onclick="$.call.confirm()">确定</li>\
			</ol>\
		</div>'},'p3');
		var cbox=changeTC.querySelector('.changebox');
		t.yzfn=function(){
			if(inp1.value==''){
				tishi('请输入手机号')
				return
			}
			if(!t.yz(inp1.value)){
				tishi('请输入11位正确的手机号')
				return
			}
			bindmobile(inp1.value);
		}
		t.yz=function(_){
			var regBox={regMobile:/^0?1[3|4|5|7|8][0-9]\d{8}$/} //手机
			,mflag=regBox.regMobile.test(_)
			return mflag
		}
		t.confirm=function(){
			if(inp1.value==''){
				tishi('请输入手机号')
				return
			}
			if(inp2.value==''){
				tishi('请输入验证码')
				return
			}
			if(!t.yz(inp1.value)){
				tishi('请输入11位正确的手机号')
				return
			}
			sendmobile(inp1.value,inp2.value,function(){
				setZT('手机号 <font id="yh_status">'+(inp1.value.substr(0,3)+'****'+inp1.value.substr(7))+'</font> <span onclick="gobindmobile();">重置</span>');
				t.close();
			}
			,function(){
				//var inps=cbox.querySelectorAll('input');
				//inps[1].value='';
			});
		}
		t.open=function(){
			changeTC.style['display']='block';
			cbox.classList.add('show');
		}
		t.close=function(){
			var inps=cbox.querySelectorAll('input');
			inps[1].value='';
			cbox.classList.remove('show');
			cbox.classList.add('hide');
			setTimeout(function(){changeTC.style['display']='none';cbox.classList.remove('hide');},300)
		}
	}
	
	function gift_list(){
		var t=this,ndata=mainVar.newdata.data;
		t.Arr=[0,100,0];
		t.init=function($box,artyp){
			t.ask(function(_){
				var html='',data=_.data,len=data.length;
				if(len!=0){
					for(var i=0;i<len;i++){
						var $a=data[i],wxstate=Number($a.wxstate),zt='',ddzt='',jpsm='',_jpsm='',btt='',curl=$a.consume_url,xshiwu,gq='';
						if($a.prizeFrom!='djyjx')
						setHtml();
						function setHtml(){
							switch($a.type){
								case 102:
									if(wxstate==1)
										btt='<label action="lgj">已领取</label>';
									else{
										action="lingjiang.init(this)";
										btt='<label onclick='+ action +' class="red">领取</label>';
									}
									ddzt+='<span>'+$.bz+'</span>';
								break
								case 1:
									var $ss;
									if($a.receiveInfo==undefined)$ss=0;else $ss=1;
									switch($ss){
										case 0:
											ddzt+='<span>'+$.bz+'</span>';
											if($a.expireDay){
												var T=$a.datetime.split(' '),T1=T[0].split('-'),T2=T[1].split(':')
													,$d=new Date(Date.UTC(T1[0],T1[1]-1,T1[2],T2[0],T2[1],T2[2])).getTime()
													,_Day=new Date().getTime(),dnum,$dn=_Day-$d,$dnn=$dn/86400000,jgn;
												if($dnn<$a.expireDay-1){
													jgn=Math.floor($a.expireDay-$dnn);
													zt+="<span class='red sod'>剩余领取"+jgn+"天</span>";
													action="lingjiang.init(this)";
													btt='<label onclick='+ action +' class="red">领取</label>';
												}else{
													zt+="<span class='sod'>已过期</span>";
													btt='<label>领取</label>';
													gq='class="gq"';
												}
											}else{
												zt+="<span class='sod'>未发货</span>";
												action="lingjiang.init(this)";
												btt='<label onclick='+ action +' class="red">领取</label>';
											}
										break
										case 1:
											if($a.courier){
												zt+="<span class='red sod'>已发货</span>"
												if($a.courier)ddzt+="<span>物流: "+$a.courier.name+" 运单号:"+$a.courier.num+"</span>";
											}else
												zt+="<span class='sod'>待发货</span>";
											if(+$a.state==3){
												zt="<span class='sod'>已签收</span>";
												if($a.courier)ddzt="<span>物流: "+$a.courier.name+" 运单号:"+$a.courier.num+"</span>";
											}
											ddzt+='<span>'+$.bz+'</span>';
											btt='<label>已领取</label>';
										break
									}
								break
								default:
									switch($a.type){
										case 101:
											if(wxstate!=1){
												action="lingjiang.init(this)";
												btt='<label onclick='+ action +' class="red">领取</label>';
											}
										break
										case 2:
											ddzt+="<span>电子码: "+$a.shoppingCard+"</span>";
											action="lingjiang.init(this)";
											if($a.link)btt='<label onclick='+ action +' class="red">领取</label>';
											if(curl)_jpsm='<label onclick=goto('+ curl +')>购 买</label> ';
										break
										default:
											if($a.type==5)$a.link=$a.google_json_url;
											action="lingjiang.init(this)";
											if($a.link)btt='<label onclick='+ action +' class="red">领取</label>';
											if(curl)_jpsm='<label onclick=goto("'+ curl +'")>购 买</label> ';
										break
									}
								break
							}
							if($a.gainUrl){var url=$a.gainUrl;jpsm="<label onclick=goto('"+ url +"')>奖品说明</label> ";}
							ndata.push($a);
							var nums=0;
							if(jpsm!='')nums++;
							if(_jpsm!='')nums++;
							if(btt!='')nums++;
							html+='<li '+gq+'><p class="list_time">中奖时间: '+$a.datetime+zt+'</p><div class="listb"><div class="photo2"><img src="'+($a.type===102?"//a-h5.mtq.tvm.cn/yao/common_btv7/img/icon02.png":$a.pic)+'"></div><p>'+$a.name+'</p>'+ddzt+'</div><div class="list_btn nszm'+nums+'" title="'+(t.Arr[2]++)+'">'+jpsm+_jpsm+btt+'</div></li>';
						}
					}
					if(html=='')
						t.mywinrc($box);
					else
						createNode($box,'ol',{html:html},'p3');
				}else if(!t.key){
					t.mywinrc($box,_.sos);
					t.key=true;
				}
			},t.Arr[0],t.Arr[1],artyp)//t.Arr[0]++
		}
		t.mywinrc=function(e,err){
			e.style.cssText='padding:'+winH/4.2+'px 0;text-align:center;';
			e.innerHTML=err||'还没有奖品噢~<br>关注节目，一起摇一摇抽大奖';
		}
		t.ask=function(fn,a,b,c){
			if(a==1)$.loading.style['display']='block';
			var ajax=setAjax('get',HOST.CJ+'/open/order/user/orders?cache='+(+new Date)+'&yyyappId='+PAGE.yyyappid+'&openId='+user.openid+'&code='+user.sig+'&sigExpire='+user.sigExpire+'&queryType=prize&prizeType='+c+'&page='+a+'&pageSize='+b);
			ajax.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");}
			ajax.callBack=function($data){
				var data=toObject($data);
				if(data.statusCode===101){
					//setTimeout(function(){codeyc()},3000);
//					function codeyc(){
//						var $c=setStorage("get","ticket");
//						var aj=setAjax("get",HOST.YAO+"/api/yaozb/index?yyyappid="+PAGE.yyyappid+"&code="+$c+"&openid="+mainVar.userInfo.openid+"&action=setCode");
//						aj.callBack=function(_data){
//							var _data=toObject(_data);
//							mainVar.userInfo.sig=_data.sig;
//							setStorage("set","userInfo",JSON.stringify(mainVar.userInfo));
//							t.ask(fn,a,b);
//						};
//						aj.send()
//					}
					data={
						data:[]
						,sos:'请求数据中请稍候...'
					};
				}
				typeof fn=='function'&&fn(data);
				$.loading.style['display']='none';
			};
			ajax.err=function($data){console.log($data)
				data={data:[]}
				typeof fn=='function'&&fn(data);
				$.loading.style['display']='none';
			}							
			ajax.send();
		}
		t.scrolldo=function(e){
			scrolldo(e,function(){
				t.init();
			})
		}
		t.open=function(){
			DO.title='中奖记录';
			list_box.style['display']='block';
			location.hash='ld';
			DB.id="show";
			t.timer=setInterval(function(){
				if(!location.hash){
					$.load2.style['display']='block';
					setTimeout(function(){t.close();},1000)
				}
			},1000);
		}
		t.close=function(){
			clearInterval(t.timer);
			DO.title='个人中心';
			DB.id="";
			$.load2.style['display']='none';
			list_box.style['display']='none';
		}
	}
	
	function scrolldo(e,fn){
		var v=e.scrollTop,c=e.clientHeight,d=e.scrollHeight,a=d-c;
		if(v>a-2){
			if($.loading.style.display != 'block'){
				typeof fn=='function'&&fn()
			}
		}
	}
	function docAction(e){
		var ele=e.srcElement||e.target,_action="action",attribute,argument;				
			do{
				if(ele.nodeType!==1)break
				if(attribute=ele.getAttribute(_action))break			
				}while(ele=ele.parentNode)	
			if(attribute){										
			argument=attribute.split(".,");
			var a1=argument[1];
			switch(argument[0]){
				case "check":
					goto(a1);
				break
				case "giftopen":
					gifts.open();
				break
				case "btn_speech":
					lingjiang.postspeech();
				break
				case "popClose":
					popBox.popClose();
				break
				case "popSave":
					lingjiang.popSave();
				break
				case "tishi":
					tishi('敬请期待！');
				break
			}
		}
	}
	addEvent(DO,"touchstart",docAction);