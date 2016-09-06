//初始化全局变量
var search=getSearch()
,DO=document,DB=DO.body
,winW=window.innerWidth
,winH=window.innerHeight
,mtid=search['mtid']
,gameTime=search['gameTime']
,column_id=search['column_id']
,isOwner=search['isOwner']
,trackurl=search['trackurl']
,tjData={}
,Verifs=null
,href=location.href
,sigCode=null
,prizeData=null
,dspObject=null
,shakeArr=[]
,likeArr=[]
,wealthArr=[]
,commodityArr=[]
,originArr=[]
,skipUrl=''
,main=null
,cardDataPath=setStorage("get","cardDataUrl")
,popupContainer=null
,user={}
,setZT=null
,curObj=null
,lingjiang=null
,popBox=null
,userInfo=null
,gather={}
,tjHjgy=0



function exampleHeader(data){
	var coinNum=+data.coin,moneyNum=data.money,heading=data.heading,type=data.type,pic=data.pic,name=data.name,form=data.form,timeout=data.timeout,originData=data.originData;
	var headingText='',bodyText='',tipText='',coinText='',prizeText='',oClass="",embody="",incarnateClass='',isShow="block";
	switch(form){
		case 0: //手慢了
			var tip="手慢了，继续关注节目～"
			if(timeout){
				tip="互动超时了，继续关注节目～"
			};
			headingText='<span>'+tip+'</span>';
		break;
		case 1:  //中奖了or得金币了
			headingText='<span>恭喜您获得</span>';
			if(type==102||type==108||type==104){   //红包
				if(type==102){
					tipText='现金红包已存入您的中奖记录，请到个人中心进行领取';
				}else if(type==108){
					tipText='余额红包已存入您的余额账户，请到个人中心进行查看';
				}else{
					tipText='余额提现锦囊已存入您的中奖记录，请到个人中心进行领取';
					embody="<b>可提现</b>"
					incarnateClass='incarnate';
				};
				prizeText='<div class="redPacket '+incarnateClass+'"><i><img src="'+pic+'"></i>'+embody+'<p>'+moneyNum+'<span class="money">元</span></p></div>';
				oClass='bottom_high';
				isShow="block"
			}else{
				if(type){
					 //其他奖品
					//prizeText='<div class="other"><i><img src="'+pic+'"></i><p><span>'+name+'</span></p></div>';
					oClass='bottom_short';
					/*生成弹出层的奖品*/
					mainVar.newdata={data:[]};
					mainVar.newdata.data[0]=originData;
					popBox=new popBoxs();
					createPrizeInfo(originData);
					lingjiang=new lingjiangs([
						function(){
							removeNode(popupContainer);
						}
						,'','',
						function(data,options){
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
								}else if(vl>mainVar.speechlen){
								tishi(CONFIG.chars.hjgy.b,{time:2000});return
								}
							if(tjHjgy == 1){
								tishi(CONFIG.chars.hjgy.c,{time:3000});return
								}
							tjHjgy=1;
							if(content){
								var desc='',$sw='',money,shareicon;
								if($typ==102)
									money=+data.money/100+"元现金红包";
								else
									money=data.name||data.prize_name;
								desc='泪牛满面！竟然是我中了'+money+'，感谢'+PAGE.channelName+'频道，点我看大奖';
								mainVar.newlink=urlFolder()+"share.html?type=dajiang";
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
									case 103:case 104:
										//shareicon=PAGE.COMMON+'img/moneyIco.png';
										mainVar.newlink=urlFolder()+"share.html";
										money=+data.money/100;
										if($typ==103)desc='耶～人品大爆发！摇中现金红包，'+money+'元也是爱，快来参与摇一摇惊喜连连';
										else desc='好激动！我拆开了一个余额提现锦囊，拿走'+money+'元现金';
									break
								}
								mainVar.$sw=$sw;
								var posts={intolotterylist:1,orderid:$orderId,yyyappid:PAGE.yyyappid,CommodityName:mainVar.shoppn,CommodityType:mainVar.shoppt,shareicon:data.pic,shareurl:mainVar.newlink,desc:desc,token:PAGE.token,topicid:PAGE.topicid,openid:user.openid,nickname:user.nickname,headimg:user.weixin_avatar_url,content:content,paiTimeUnix:mainVar.paiTimeUnix||0};
								lingjiang.speechDo(posts,options);
							}else{
								tishi(CONFIG.chars.hjgy.f)	
							}
						
						},function(_data,options){
							var $typ=_data.type,$orderId=_data.orderId;
							if(_data.status=='1')tishi(CONFIG.chars.hjgy.d,{time:2000});
							tjHjgy=0;
							if($typ==1)setStorage("set","hjgy"+$orderId,1);
							switch($typ){
								case 1:case 102:
									if(mainVar.$sw=="a"){
										lingjiang.getHongbao();
										popBox.popClose();
									}else{
										popBox.popClose();
										options.inKind&&options.inKind(_data);
									};
								break
								case 101:
									if(mainVar.$sw=="a")popBox.popClose();
								break
								case 103:
									goto(mainVar._urls);
								break
								case 104:
									popBox.popClose();
									lingjiang.tixian(_data.money)
								break;
								default:
									popBox.popClose();
									if(options.Fun&&$typ==2){
										options.Fun();
									}else{
										mainVar._urls&&goto(mainVar._urls)
									};
								break;
							}
						}
					],{
						Fun:function(){
							var btn=popupContainer.querySelector('.button')
							btn.onclick=null;
							popupContainer.querySelector('.name').innerHTML='<span class="red">卡密：'+originData.shoppingCard+'</span><br>请妥善保管';
							popupContainer.querySelector('.name').className="name tip"
							if(originData.link){
								btn.innerHTML='去使用';
							}else{
								btn.innerHTML='我知道了';
							};
							btn.onclick=function(){
								if(originData.link){
									location.href=originData.link;
								}else{
									rmPop();
								};
							};
						},
						inKind:function(data){
							var btn=popupContainer.querySelector('.button')
							btn.onclick=null;
							var personInfo=mainVar.personInfo,area=personInfo.area||{};
							popupContainer.querySelector('.name').innerHTML='<p class="prizeName">'+data.name+'</p><p class="annotation01">配送地址：</p><p class="addr">'+personInfo.addr+'</p><p class="annotation02">（如需其他服务请联系客服人员）</p>';
							popupContainer.querySelector('.name').className="name inKind"
							btn.innerHTML='我知道了';
							btn.onclick=function(){
									showLoading();
									var ajax=setAjax('post',HOST.CJ+'/open/order/update/address'),user=mainVar.userInfo;
									ajax.data=JSON.stringify({name:user.nickname,channelId:PAGE.channelId.toString(),icon:user.weixin_avatar_url,openId:user.openid,code:user.code,yyyappId:PAGE.yyyappId,sigExpire:user.sigExpire,orderId:mainVar.prizeData.orderId,receive:{name:personInfo.receiver,phoneNum:personInfo.mobile,address:personInfo.addr}});
									ajax.set=function(){this.setRequestHeader("Content-type","application/json; charset=UTF-8; text/html")}
									ajax.callBack=function($data){
										var data=toObject($data)
										hideLoading();
										if(data.status=="success"){
											tishi(CONFIG.chars.form.k,{time:3e3});
											setStorage("set","hjgy"+mainVar.prizeData.orderId,1);
											rmPop();
										}else{
											tishi(CONFIG.chars.form.j,{time:3e3});
										};
									};
									ajax.err=function(){
										hideLoading();
										tishi("网络繁忙，请稍微重试！",{time:3e3});
									};
									ajax.send();
							};
						}	
					});
				};
				isShow="none"
			};
			if(coinNum){
				coinText='<div class="coin">\
						<i><img src="'+PAGE.COMMON+'img/icon03.png"></i>\
						<p>'+coinNum+'<span class="num">个</span></p>\
					</div>'
				isShow="block"
			};
			bodyText='<div class="bottomContainer" style="display:'+isShow+'"><div class="top">'+prizeText+coinText+'</div><div class="bottom '+oClass+'">'+tipText+'</div></div>';
		break;
		case 2:  //返回来空的情况
			headingText='';
		break;
	};
	html='<div class="topContainer"><img src="'+heading+'/96">'+headingText+'</div>'+bodyText;
	createNode(DB,"div",{"className":"header","html":html},"p3");  //生成header
	main=createNode(DB,"div",{"className":"main"},"p3")  //生成主体
};
//生成中奖信息
function createPrizeInfo(options){
	popupContainer=createNode(DB,'div',{'className':'popupContainer','html':createPrizeContent(options)});
	var btn=popupContainer.querySelector('.button');
	popupContainer.querySelector('.button').onclick=function(e){
		noPop(e);
		lingjiang.init(this,0);
	};	
};
function createPrizeContent(options){
	var structure='<p class="flower"></p>\
				   <div class="popup popupIn">\
		           	  <h2>恭喜您获得</h2>\
					  <span class="close" onclick="rmPop()"></span>\
					  <div class="content" title="0">\
					  	  <img src="'+options.pic+'">\
						  	<div class="name">'+options.name+'</div>\
							<span class="button">立即领取</span>\
						  </div>\
				   </div>';
	return structure;
};
function rmPop(){
	removeNode(popupContainer);
}
function googleAd(){
	if(isOwner==1||trackurl==1)return;
	var resultPage=setStorage('get','resultPage');
	if(resultPage){
		resultPage=toObject(resultPage);
		gather=resultPage.put_code
		delete gather.code;
		gather.advalue=resultPage.advalue;
	}else{
		return;
	};
	var json={"html":'<div class="guide"><p class="solid"></p><p class="text"><span>广告</span></p></div><div class="tgbox" style="height:250px;width:300px;overflow:hidden;margin:0 auto;"><img id="googleImg" src="http://a-h5.mtq.tvm.cn/yao/common/googleAds/img/bg.png"><div style="height:100%;width:100%;">'+setIframe({src:"http://qa-h5.mtq.tvm.cn/git_yao/common/googleAds/home.html?token="+PAGE.token+"&channelName="+PAGE.channelName+"&channelId="+PAGE.channelId+"&openid_id="+mainVar.userInfo.openid+"&title_id="+tjData.paiTimeUnix+"&gather="+encodeURIComponent(JSON.stringify(gather))})+'</div></div>'}
	
	createNode(main,"div",json,"p3");
	setTimeout(function(){
		removeNode(document.getElementById('googleImg'));
	},2000);
};
function dspData(data){
	dspHtml=exampleDsp(data)
	var obj=createNode(main,"div",{className:"dspCard","html":dspHtml},"p3");  //生成dsp卡券
	run(obj);
};
function dspBigPic(data){
	dspHtml=exampleDspBig(data)
	var obj=createNode(main,"div",{className:"dspBigCard","html":dspHtml},"p3");  //生成dsp卡券
	run(obj);
};
function exampleBanner(data){
	var html='<ul class="mainBody">\
			  	<li class="end">\
					<div id="bannerAd" class="top" data-flag="banner_0">\
						<img src="'+getImg(data.banner)+'">\
					</div>\
					<div class="bottom"></div>\
				</li>\
			  </ul>';
	return html;
};
function bannerAd(data){
	var obj=createNode(main,"div",{className:"dspBigCard","html":exampleBanner(data)},"p3");  //banner
	run(obj);
};
function parseBodyData(data,options){                                    
	var html='',str='',obj='',buttonText='',num=0;
	if(data&&data.length){       
		for(var i=0,len=data.length;i<len;i++){
			if(data[i]==null)continue;
			buttonText='点击查看';
			switch(+data[i].type){
				case 6:
					num=1;
				break;
				default:
					num=0;
				break;
			};
			obj={'data':data[i],showType:num,'flag':options.flag+'_'+i,'buttonText':buttonText};
			if(i==len-1){
				obj.class='end';
				str+=exampleList(obj);
			}else{
				str+=exampleList(obj);
			};
			mainVar.shakeIco.style.display='block';
		};
		var obj=createNode(main,"div",{class:options.oClass,"html":'<ul class="mainBody">'+str+'</ul>'},"p3");  
		run(obj);
	};
};
function exampleDspBig(data){
	var html='<ul class="mainBody">\
			  	<li class="end">\
					<div id="dspBigCardImg" class="top" data-flag="dsp_0">\
						<img src="'+data.logo+'">\
						<span>点击有惊喜哦</span>\
					</div>\
					<div class="bottom">\
						<em >点击有惊喜</em>\
					</div>\
				</li>\
			  </ul>';
	return html;
};
function exampleDsp(data){
	var html='<ul class="mainBody">\
			  	<li class="end">\
					<div class="top">\
						<div class="parent title">\
							<div class="left">\
								<p class="circle">\
									<img src="'+data.logo+'">\
								</p>\
							</div>\
							<div class="right">\
								<h3>'+(data.title)+'</h3>\
							</div>\
						</div>\
					</div>\
					<div class="bottom">\
						<em data-flag="dsp_0">点击有惊喜</em>\
					</div>\
				</li>\
			  </ul>';
	return html;
};
function exampleTitle(title){
	var html='<div class="guide">\
					<p class="solid"></p>\
					<p class="text">\
						<i></i><span>'+title+'</span>\
					</p>\
				</div>';
	return html;
};
//生成list内容
function exampleList(options){
	var data=options.data,oClass=options.class||'',flag=options.flag,text=options.buttonText,showType=options.showType,str='';
	switch(showType){
		case 0:
			if(data.type==1002){
				var html='<li class="bigPic '+oClass+'">\
							<div class="top">\
								<img data-flag="'+flag+'" class="canClick" src="'+getImg(data.banner||data.banner_big)+'">\
							</div>\
							<div class="bottom">\
								<em data-flag="'+flag+'">'+options.buttonText+'</em><span style="display:none">42801人已领取</span>\
							</div>\
						</li>';
			}else{
				//生成普通卡券or理财卡券
				var desc=data.desc;
				if(data.cash){
					str='<p class="tag"><span>投资成功返现'+data.cash+'元</span></p>';
					desc=desc.replace(/\d+./g,function(data){
						return '<span class="red">'+data+'</span>';
					});
				};
				var html='<li class="'+oClass+'">\
					<div class="top">'+str+'<div class="parent title">\
							<div class="left">\
								<p class="circle">\
									<img src="'+data.shoplogo+'">\
								</p>\
							</div>\
							<div class="right">\
								<h3>'+(data.title||data.tagtitle)+'</h3>\
								<p class="intro">'+data.shop+'</p>\
							</div>\
						</div>\
						<div class="parent explain">\
							<table>\
								<tr>\
									<td>\
										<div class="left">\
											<p class="pic">\
												<img src="'+data.banner+'">\
											</p>\
										</div>\
									</td>\
									<td>\
										<div class="right">'+desc+'</div>\
									</td>\
								</tr>\
							</table>\
						</div>\
					</div>\
					<div class="bottom">\
						<em data-flag="'+flag+'">'+options.buttonText+'</em><span style="display:none">42801人已领取</span>\
					</div>\
				</li>';
			};
		break;
		case 1:
			var mall_isShow='none',limit_isShow='none',imgStr='',conClass='',picSrc='';
			if(data.mall){
				if(data.mall.indexOf('京东')!=-1||data.mall.indexOf('1号店')!=-1||data.mall.indexOf('一号店')!=-1){
					conClass='storeCon';
					if(data.mall.indexOf('京东')!=-1){
						picSrc='goldsLogo2.jpg'
					}else{
						picSrc='goldsLogo1.jpg'
					};
					imgStr='<p class="logo"><img src="'+PAGE.COMMON+'img/'+picSrc+'"></p>'
				}else{
					mall_isShow="inline-block";
				};
			};
			if(data.limit){
				limit_isShow='inline-block';
			};
			var html='<li class="goodsCon '+conClass+'">\
				<span class="sub" style="display:'+mall_isShow+'">'+data.mall+'</span>'+imgStr+'<div class="top">\
					<p class="picture">\
						<img src="'+data.banner+'">\
						<span style="display:'+limit_isShow+'">限量'+data.limit+'件</span>\
					</p>\
					<div>\
						<p class="goodsTitle">'+data.title+'</p>\
						<p class="originalPrice use" id="mark_'+data.productid+'"><span class="num01">￥<b>'+data.price+'</b></span><span class="back">返</span><b>'+data.cash+'</b>元</p>\
					</div>\
					<p class="tip">商家有时会调整佣金，实际返现金额以返现确认页为准</p>\
				</div>\
				<div class="bottom">\
					<em data-flag="'+flag+'">'+options.buttonText+'</em><span style="display:none">42801人已领取</span>\
				</div>\
			</li>';
			if(data.productid){
				getPrice(data);
			};
		break;
	};
	return html;
};
/*获取实时价格start*/
function getPrice(curData){
		var id=curData.productid,time=new Date(parseInt(parseInt(id.substring(0,8),16)+'000')),hours=time.getHours(),minutes=time.getMinutes();
		var _ajax=setAjax('get',HOST.JIAGE+'/'+hours+'_'+minutes+'/'+id+'.json');
			_ajax.callBack=function($data){
				var data=toObject($data);
				var mark=document.getElementById('mark_'+curData.productid).getElementsByTagName('b');
				mark[0].innerHTML=FindDot(data.sale_price/100);
				mark[1].innerHTML=FindDot(data.back_cash/100);
			};
			_ajax.err=function(){console.log('没有取到数据；')}
			_ajax.send();
};
function FindDot(num){
	var dotIndex=num.toString().indexOf('.');
	if(dotIndex!=-1){
		num=num.toFixed(2);
	};
	return num;
};
/*获取实时价格start*/
//加上点击事件
function run(obj){
	var btn=obj.querySelectorAll('em'),curObj=null;
	for(var i=0,len=btn.length;i<len;i++){
		btn[i].onclick=isNativeMobile;
	};
	var dspBigCardImgBtn=document.querySelector('#dspBigCardImg'),canClick=obj.querySelectorAll('.canClick');
	if(dspBigCardImgBtn){
		dspBigCardImgBtn.onclick=isNativeMobile;
	};
	if(canClick){
		for(var i=0,len=canClick.length;i<len;i++){
			canClick[i].onclick=isNativeMobile;
		};
	};
};
//判断是否注册了手机号
function isNativeMobile(){
	user=mainVar.userInfo
	var nativeMobile=null;
	curObj=this;
	mainVar.prizeData=null;
	if(+PAGE.yanzheng){
		var nativeMobile=setStorage('get','mobile');
		if(nativeMobile){
			judge(curObj);
		}else{
			showLoading();
			var getPhone=setAjax("get",HOST.SJYZ+"/point/integral/query?wxToken="+PAGE.yyyappid+"&openId="+mainVar.userInfo.openid);					
				getPhone.callBack=function($data){	
					hideLoading();		
					var data=toObject($data).data;
					if(data.mobile){
						judge(curObj);
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
		judge(curObj);
	};
};
function Phonecallback(){
	/*手机注册成功的回调函数*/
	if(curObj){
		judge(curObj);
	};
	setStorage('set','mobile',1);
};
//判断是---直接跳走or去获取余额。
function judge(curObj){
	var flag=curObj.getAttribute('data-flag').split('_'),first=flag[0],end=flag[1],user=mainVar.userInfo,matchingPrize=null,listData=null,bool=true,cardId='';//控制是否放余额。
	if(first=="dsp"){  //只有dsp发余额
		skipUrl=dspObject.url;
		matchingPrize={id:dspObject.id,"title":dspObject.title,"type":dspObject.type,"url":skipUrl,"logo":dspObject.logo,"updated_at":dspObject.updated_at,imgType:dspObject.imgType};
		tjData.content="";
		tjData.album_name=dspObject.title;
		bool=true;
		var user=mainVar.userInfo;
		cardId=dspObject.id
	}else{
		bool=false;
		switch(first){
			case "likeArr":
				listData=likeArr[end]
			break;
			case "shakeArr":
				listData=shakeArr[end]
			break;
			case "wealthArr":
				listData=wealthArr[end]
			break;
			case "commodityArr":
				listData=commodityArr[end]
			break;
			case "originArr":
				listData=originArr[end]
			break;
		};
		skipUrl=listData.url||'';
		cardId=listData.id
		if(listData.type==6){
			skipUrl=skipUrl+(skipUrl.indexOf("?")>0?"&":"?")+'source=3'
		};
		matchingPrize={"id":listData.id,"title":listData.title,"type":listData.type,"url":listData.url,"logo":listData.shoplogo,"pubid":listData.pubid,"pubversion":listData.pubversion,"tag":listData.tag,"desc":listData.desc,"banner":listData.banner,"shop":listData.shop};
		if(listData.type==1002){
			matchingPrize.banner_big=matchingPrize.banner_big;
		};
		tjData.content=listData.shop;
		tjData.album_name=listData.title||listData.id;
	};
	skipUrl=skipUrl+(skipUrl.indexOf("?")>0?"&":"?")+"yyyappId="+PAGE.yyyappid+"&openId="+user.openid+'&sign='+user.sig+'&sigExpire='+user.sigExpire+"&addi="+decodeURIComponent(JSON.stringify({"yaotv_openid":user.openid,"yyyappid":PAGE.yyyappid,"sign":user.sig,"sigExpire":user.sigExpire}))+'&cardId='+cardId;
	switch(+matchingPrize.type){
		case 6:
			matchingPrize.type=6
			matchingPrize['cash']=listData.cash;
			matchingPrize['price']=listData.price;
			matchingPrize['originprice']=listData.originprice;
			matchingPrize['mall']=listData.mall;
			matchingPrize['limit']=listData.limit;
			matchingPrize['productid']=listData.productid;
		break;
		case 7:
			matchingPrize.type=7
		break;
		case 1001:
			matchingPrize.type=1001
		break;
		case 1002:
			matchingPrize.type=1002
			matchingPrize['banner_big']=listData.banner_big;
		break;
		default:
			matchingPrize.type=4
		break;
	};
	getCoin(curObj,matchingPrize,user,bool);
};
function getCoin(obj,matchingPrize,user,bool){
	var coinNumber=0;
	showLoading();
	//调用接口就会存入卡券
	var b=setAjax('post',HOST.CJ+'/open/order/balanceActivity');
	b.set=function(){this.setRequestHeader("Content-type","application/json")};
	b.data=JSON.stringify({"lotteryid":mainVar.paiTimeUnix,"code":user.sig,"sigExpire":user.sigExpire,"yyyappId":PAGE.yyyappid,"balance":bool,"prizeFrom":"postuser","user":{"openId":user.openid,"name":user.nickname,"icon":user.weixin_avatar_url,"sex":user.sex,"province":user.province,"country":user.country,"city":user.city},"matchingPrize":matchingPrize});
	b.err=function(){
		hideLoading();
		parseData(obj,coinNumber);
	};
	b.callBack=function($data){
		hideLoading();
		var _data=toObject($data),data=_data.data;
		if(data&&data.code==1&&data.balance){
			coinNumber=data.balance;
			if(+coinNumber){
				coinNumber=coinNumber/100;
			}
			if(coinNumber.toString().indexOf('.')==-1&&coinNumber){
				coinNumber+='.00';
			};
			var dotIndex=coinNumber.toString().indexOf('.');
			if(dotIndex!=-1){
				if(coinNumber.toString().substring(dotIndex+1).length==1){
					coinNumber+="0"
				};
			};
			parseData(obj,coinNumber);
		}else{
			parseData(obj,coinNumber);
		};
	};
	b.send();
};

function parseData(curObj,coinNumber){
	if(dspObject){
		if(coinNumber){
			mainVar.ele.popupCon=createNode(document.body,'div',{className:'popupCon'},'p3');
			var curObj=createElem('prizeContainer',createContent({"type":1,"data":{'coinNumber':coinNumber}}));
			curObj.style.display='block';
			curObj.className+=' comeOut';
			setTimeout(function(){
				urlTJ('dmp');
				location.href=skipUrl;
			},2000)
		}else{
			urlTJ('dmp');
			location.href=skipUrl;
		};
	}else{
		urlTJ('奖品链接页面');
		location.href=skipUrl;
		return;
	};
};
function createElem(oClass,content){
	return createNode(mainVar.ele.popupCon,'div',{className:oClass,'style':'display:none;',html:content},'p3');
};
function createContent(options){
	var html='';
	switch(options.type){
		case 1:
			var info=options.data;
				html='<div>\
							<p class="text01">惊喜来了<br>恭喜获得余额红包奖励</p>\
							<h3>'+info.coinNumber+'<span>元</span></h3>\
							<p class="text02">已存入您的余额账户</p>\
					  </div>\
					  <p class="text03">正在前往，请稍后...</p>'
		break;
	};
	return html;
};
//显示loading
function showLoading(){
	if(!mainVar.ele.loading){
		mainVar.ele.loading=createNode(DB,'div',{className:'oldLoading'});
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
//判断是否为{}
function isEmpty(obj){
	var bStop=true;
	if(typeof obj==='object'&&!(obj instanceof Array)){
		 for(var attr in obj){
			if(attr!="typeOf"){
				bStop=false;  
				break;  
			};
		}; 
	};
	return bStop;
};
function TJ(ec,$url,$m,$s,$d){
	var user=mainVar.userInfo,data='id=555eacab75188098ad000001&sex='+user.sex
	+'&user_name='+user.nickname
	+'&open_id='+user.openid
	+'&token='+PAGE.token
	+'&url='+encodeURIComponent($url||href)
	+'&title='+encodeURIComponent(tjData.appName||"未知应用")
	+'&event_code='+ec
	+"&page="+($s||"系统抽奖")
	+"&master_id="+tjData.tvm_id
	+"&content="+(tjData.content||"")
	+"&title_id="+tjData.paiTimeUnix
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
	//setStorage("set","tjData",JSON.stringify(tjData))	
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
		case 1001:type="dsp-1001";break
	}
	return type;
};
function init(){
	createNode(document.querySelector('head'),"link",{href:PAGE.COMMON+"jc/gold.css",rel:"stylesheet",type:"text/css"},"p3");
	function fontSize(){
		 DO.documentElement.style.fontSize=100*DO.documentElement.clientWidth/750+'px';
		 if(navigator.userAgent.indexOf('HTC M8Sw')!=-1){
			DO.documentElement.style.fontSize=65+'px';
		 };
	};
	fontSize();
	window.onresize=fontSize;
	showLoading();
	setTimeout(function(){
		hideLoading();
		//获取用户信息
		if(setStorage("get","userInfo")){
			userInfo=user=mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
			sigCode=mainVar.userInfo.sigCode
		};
		//拍的时间
		mainVar.paiTimeUnix=setStorage('get','prizeId');
		var statistics=toObject(setStorage("get","tjData"));
		if(statistics){
			tjData.tvm_id=statistics.tvm_id;
			tjData.paiTimeUnix=statistics.paiTimeUnix;
		};
		//获取中奖信息
		var moneyNum=0,type=0,pic='',form=-1,name='',timeout;
		var prizeInfo=toObject(setStorage('get','prizeData')),userGainPrize=null;
		if(prizeInfo){
			userGainPrize=prizeInfo.userGainPrize;
			if(userGainPrize==null||isEmpty(userGainPrize)){   //手慢了
				prizeData=null;
				timeout=prizeInfo.timeout;
				form=0;
			}else{
				prizeData=userGainPrize;
				if(userGainPrize.type==102||userGainPrize.type==108||userGainPrize.type==104){
					moneyNum=userGainPrize.money/100;
				};
				pic=userGainPrize.pic;
				form=1;
				type=userGainPrize.type;
				name=userGainPrize.name;
			};
			setStorage('remove','prizeData');
		}else{
			prizeData=null;       //空白
			form=2;
		};
		var coinNum=setStorage('get','coinNum');
		if(coinNum){
			if(prizeData==null){
				form=1;
			};
			setStorage('remove','coinNum');
		};
		//生成头部
		exampleHeader({
			"originData":userGainPrize,
			"form":form,
			"type":type,
			"coin":coinNum,
			"money":moneyNum,
			"pic":pic,
			"name":name,
			"timeout":timeout,
			"heading":decodeURIComponent(mainVar.userInfo.weixin_avatar_url)
		});
		//生成"dsp卡券"
		var dspCardData=setStorage('get','dspCardData');
		if(dspCardData){
			dspObject=toObject(dspCardData);
			dspObject['imgType']='small';
			if(dspObject.updated_at){
				var curTime=new Date(dspObject.updated_at.replace(/-/g,'/')),compare=new Date("2016/04/08 21:05:00");
				if(curTime>compare){
					dspObject['imgType']='big';
					dspBigPic(dspObject);
				}else{
					dspData(dspObject);
				};
			}else{
				dspData(dspObject);
			};
			setStorage('remove','dspCardData');
		};
		//生成banner广告
		var bannerAdData=setStorage('get','bannerAdData');
		if(bannerAdData){
			bannerAdData=toObject(bannerAdData);
			bannerAd(bannerAdData);
			document.getElementById('bannerAd').onclick=function(){
				tjData.content=bannerAdData.shop;
				tjData.album_name=bannerAdData.title||bannerAdData.id;
				urlTJ('奖品链接页面');
				location.href=bannerAdData.url;
			};
		};
		mainVar.shakeIco=createNode(main,'div',{className:'shake shakeIco',html:exampleTitle('我摇到的'),style:"display:none"});
		//生成"网信理财"
		wealthArr=setStorage('get','staticcards');
		if(wealthArr){
			wealthArr=toObject(wealthArr);
			if(wealthArr.length){
				parseBodyData(wealthArr,{
					"title":"理财产品",
					"oClass":"wealth",
					"flag":"wealthArr",
				});
			};
		};
		/*-------分解数据------*/
		shakeArr=setStorage('get','shakeArr');
		likeArr=setStorage('get','likeArr');
		originArr=setStorage('get','originArr');
		
		//去重
		if(shakeArr){     //摇到的
			shakeArr=toObject(shakeArr);
		};
		if(likeArr){      //点击的
			likeArr=toObject(likeArr);
		};
		if(originArr){    //未收藏的
			originArr=toObject(originArr);
		};
		if(shakeArr&&likeArr){
			for(var i=0,len=shakeArr.length;i<len;i++){
				for(var k=0;k<likeArr.length;k++){
					if(likeArr[k].id==shakeArr[i].id){
						likeArr.splice(k,1);
					};
				};
			};
		};
		if(likeArr&&originArr){
			for(var i=0,len=likeArr.length;i<len;i++){
				for(var k=0;k<originArr.length;k++){
					if(originArr[k].id==likeArr[i].id){
						originArr.splice(k,1);
					};
				};
			};
		};
		if(shakeArr&&originArr){
			for(var i=0,len=shakeArr.length;i<len;i++){
				for(var k=0;k<originArr.length;k++){
					if(originArr[k].id==shakeArr[i].id){
						originArr.splice(k,1);
					};
				};
			};
		};
		//生成"我摇到的"----点击收藏了的
		if(shakeArr&&shakeArr.length){
			parseBodyData(shakeArr,{
				"title":"我摇到的",
				"oClass":"shake",
				"flag":"shakeArr",
			});
		};
		//生成"猜你喜欢"----摇到的卡券（点击收藏的除外）
		if(likeArr&&likeArr.length){
			parseBodyData(likeArr,{
				"title":"猜你喜欢",
				"oClass":"like",
				"flag":"likeArr",
			});
		};
		//生成"没有摇出来的卡券"
		if(originArr&&originArr.length){
			parseBodyData(originArr,{
				"title":"没有摇出来的卡券",
				"oClass":"origin",
				"flag":"originArr",
			});
		};
		/*生成google广告*/
		googleAd();
		/*生成商城banner或者金币大奖区的banner*/
		var user=mainVar.userInfo;                                                    
		createNode(document.querySelector('.main'),"p",{style:'display:block;width:7.1rem;margin:0 auto;margin-top:0.3rem;',html:'<img src="'+PAGE.COMMON+'img/store.jpg">'},"p3").onclick=function(){goUrl('M_SC_NEW');};
		createNode(document.querySelector('.main'),"p",{style:'display:block;width:7.1rem;margin:0 auto;margin-top:0.3rem;',html:'<img src="'+PAGE.COMMON+'img/entertainment.png">'},"p3").onclick=function(){goUrl('M_YL');};
		/*进入页面上报*/
		tjData.column_id=column_id;
		tjData.appName='抽奖页';
		TJ(100000);
		/*如果中奖了就上报*/
		if(prizeData){
			tjData.album_name=prizeData.name;
			tjData.timu=album_list(prizeData.type);
			tjData.content_id=prizeData.rate;
			tjData.result=1;
			tjData.appName="抽奖页";
			TJ(101000);
		};
		/*dsp上报*/
		if(dspObject){
			tjData.tvm_id='';
			tjData.content=dspObject.title
			tjData.appName="dmp"
			TJ(130000);
		};
		
		
		
		
		
		
		
		/*======手机注册=====*/
		mainVar.loading=createNode(DB,"div",{className:"loading"},"p3");
		mainVar.load2=createNode(DB,"div",{className:"load2"},"p3");
		mainVar.newbg=createNode(DB,"div",{className:"newbg"},"p3");
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//分享与关注==========================================================
		setShareInfo();
		function wxShare(){
			CONFIG.shareInfo.success=function(res){
			tjData["button_name"]='一键分享';
		}
		if(window.wx){
			wx.ready(setShare);
		}else{
			setTimeout(wxShare,1000)
		}	
		function setShare(){
		wx.onMenuShareAppMessage(CONFIG.shareInfo);
		wx.onMenuShareTimeline(CONFIG.shareInfo); 
		}			
		}
		function setShareInfo(){
		if(!window.shaketv)setJsonp(HOST.QQAPI,toShare)
		else toShare()
		}
		function toShare($search){
		var user=mainVar.userInfo;
			shaketv.wxShare(
			CONFIG.shareInfo.imgUrl,
			CONFIG.shareInfo.title,
			CONFIG.shareInfo.desc,
			urlFolder()+"fx.html?a="+mainVar.userInfo.nickname+"&b="+mainVar.userInfo.weixin_avatar_url+"&"+($search||"")
			)
			tjData["button_name"]='一键分享';
		}		
		function initWX(token,url){
		window.getWX=function($data){
			setJsonp(HOST.WXAPI,function(){
			  wx.config({
						  debug: false,
						  appId:$data.appid,
						  timestamp: $data.timestamp,
						  nonceStr: $data.noncestr,
						  signature:$data.signature,
						  jsApiList:'checkJsApi,onMenuShareTimeline,onMenuShareAppMessage,onMenuShareQQ,onMenuShareWeibo,hideMenuItems,showMenuItems,hideAllNonBaseMenuItem,showAllNonBaseMenuItem,translateVoice,startRecord,stopRecord,onRecordEnd,playVoice,pauseVoice,stopVoice,uploadVoice,downloadVoice,chooseImage,previewImage,uploadImage,downloadImage,getNetworkType,openLocation,getLocation,hideOptionMenu,showOptionMenu,closeWindow,scanQRCode,chooseWXPay,openProductSpecificView,addCard,chooseCard,openCard'.split(",")
						 });
			  wxShare();	 
				})
			}
		setJsonp("//mb.mtq.tvm.cn/ufo/signature?cb=getWX&url="+encodeURIComponent(url)+"&wx_token="+token)	};
	},100);
};
function urlTJ(name){
	tjData.appName=name;
	tjData.content_id='';
	TJ(100000);
};
function setIframe($opt){
	var d=$opt||{};
	return '<iframe src="'+d.src+'" frameborder="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" style="pointer-events:auto;width:100%;height:100%;"></iframe>'
}
function getHeads($url){
	if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96";}
};
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
		}
	}
}
addEvent(DO,"touchstart",docAction);

init();

