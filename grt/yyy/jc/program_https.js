function toSQ($fun){
	var wxTime,userInfoStr,off=false,uName="";	
	function create(){
		mainVar.status.txt("去授权")
		localStorage.removeItem("userInfo"+PAGE.yyyappid);
		if(!window.shaketv){
			setJsonp(HOST.QQAPI,SQ)
		}else{
			SQ()
		}
	}
	function getUserInfo(){
		var a=setAjax("get",HOST.YAO+'/api/yaotv/auth?action=getNewAuthInfo&yyyappid='+PAGE.yyyappid+'&code='+sigCode)
			a.callBack=function($data){
				var data=toObject($data);	
				if(data.status!=="failed"){	
					mainVar.userInfo={nickname:encodeURIComponent(data.nickname),weixin_avatar_url:encodeURIComponent(data.headimgurl),openid:data.openid,country:data.country,sig:data.sig,sigCode:sigCode,sex:data.sex,city:data.city,province:data.province,sigExpire:data.sigExpire};
					setStorage("set","userInfo",JSON.stringify(mainVar.userInfo));
					setStorage("set","overTime",+new Date());
					mainVar.status.txt("返回用户信息");
					to()				
					}else{
						uName=PAGE.errName3||"摇仙";
						theErr();
						mainVar.status.txt(uName+"来了");
					}
				}
			a.err=function(){
				uName=PAGE.errName2||"摇侠";
				theErr()
				mainVar.status.txt(uName+"来了");
				};
			a.send()				
		}			
	function theErr($str){
			mainVar.userInfo={"city":"","nickname":uName,"ret":0,"openid":"the-user-is-xindong","resTime":1440228050,"country":"","sig":"b34463d4766f9de023f52a1d3a1ed611","status":"ok","errmsg":"","weixin_avatar_url":PAGE.errIco||"//a-h5.mtq.tvm.cn/yao/common/img/user.gif","sex":1,"province":"Beijing",sigCode:"014f92ef98cc6af12c4a3ad57c83399U"};
			tishi(uName+"正在进入",{time:3000});		
			to()
		}	
	function SQ(){	
		if(off)return;off=true;
		shaketv.authorize(PAGE.yyyappid,'userinfo',function($data){
			if ($data.errorCode===0){
				mainVar.status.txt("返回code成功");
				sigCode=$data.code;
				getUserInfo();
				}else{
					mainVar.status.txt("授权失败")
					var err_sq=+setStorage("get","err_sq")||1;
					setStorage("set","err_sq",1+err_sq);
					if(err_sq<3){						
						tishi("我们没有获取到您的身份，正在重试..."+$data.errorCode,{fun:function(){
							setTimeout(function(){
									location.href = "http://192.168.28.125/work/grt/";
								 // location.href=PAGE.redirect.replace("http://yaotv.qq.com",location.protocol+"//yaotv.qq.com")
							},1000)					
						}})
					}else{
						setStorage("set","err_sq",1);
						uName=PAGE.errName1||"摇霸";
						theErr();
						mainVar.status.txt(uName+"来了")
					}
				}
			})
	}
	function to(){
		var US=setStorage("get","US"),url;
			if(US){
				//setStorage("remove","US")
				mainVar.isShare=getSearch2(US)||{};
				url=mainVar.isShare.url;
				if(url=="shequ"){
					mainVar.moduleName="SHEQU"
				}else if(url){					
				location.replace(url+(url.indexOf("?")>0?"&":"?")+"openId="+mainVar.userInfo.openid+"&nickname="+mainVar.userInfo.nickname+"&weixin_avatar_url="+mainVar.userInfo.weixin_avatar_url+"&sign="+mainVar.userInfo.sig+"&yyyappId="+PAGE.yyyappid+"&pageToken="+PAGE.hosturl+"&channelId="+PAGE.channelId+"&code="+sigCode+"&wxToken="+PAGE.token+"&sigExpire="+mainVar.userInfo.sigExpire);
				return
				}
			}
			isFun($fun)
		}	
var userInfo=setStorage("get","userInfo");
	if(userInfo){
		mainVar.userInfo=toObject(userInfo)||{};
		if(mainVar.userInfo.sigExpire){
			var overTime=+setStorage("get","overTime"),curTime=+new Date();
				if(overTime){
					if(curTime-overTime>36e5){
						create();
					}else{
						var u=trim(decodeURIComponent(mainVar.userInfo.nickname));
						if(u==="未知用户"){
							create()
						}else{mainVar.status.txt("获取本地身份");
							to();
						}
					}
				}else{
					create()	
				}			
		}else{
			create()
		}
	}else create()
if(mainVar.cbKey=search["cb41faa22e731e9b"]){setStorage("set","cbKey",mainVar.cbKey)}else{mainVar.cbKey=setStorage("get","cbKey")}
}
	function statusFun($str){
		var t=this
		,pageLoad=createNode(DB,"b",{className:"pageLoad",style:"position:fixed;right:0px;top:2px;font-size:12px;z-index:10;color:#999;font-weight:normal;-webkit-transform:scale(.8)"}),h=0,ps=pageLoad.style
		t.txt=function($str){
			if(!h)set("0");
			pageLoad.textContent=$str;
			t.hidd()
			}
		t.hidd=function(){
		setTimeout(function(){
			set("100%");
			h=0;		
			},1000)		
		}
		function set($p){
			ps.webkitTransition="all ease 500ms";
			ps.webkitTransform="translate3d("+$p+",0,0) scale(.8)";			
			}
	}	
//小鸟说话模块
function bird($position){	
	setStyle(".birdWrap{position:absolute;overflow:hidden;pointer-events:none;z-index:6}.birdBox{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);overflow:hidden;pointer-events:auto;z-index:2}.bird{position:absolute;left:0;width:80%;top:0;pointer-events:auto;margin-left:10%;}.birdShadow{position:absolute;width:100%;height:70px;bottom:0;left:50%;border-radius:100%;-webkit-transform:translate3d(-50%,0,0) rotateX(66deg) scale(1);box-shadow:0 0 10px rgba(255,255,255,1);background-image:radial-gradient(at 50%50%,rgba(166,166,166,1) 0,rgba(254,254,254,1) 76%,rgba(254,254,254,1) 100%)}.birdOpening{-webkit-animation:birdOpening 600ms 1 ease forwards}.birdMove{-webkit-animation:birdMove infinite 800ms linear alternate}.birdShadowDis{-webkit-transform:translate3d(-50%,0,0) rotateX(66deg) scale(.2);-webkit-animation:birdShadowDis 600ms 1 ease forwards}.txtWrap{position:absolute;left:60px;top:50%;z-index:2;-webkit-transform:translateY(-50%);min-height:100px}.txtInfo{position:absolute;top:0;width:100%;text-align:right;min-height:22px}.txtEle_p{word-wrap:break-word;text-align:center}.info_a b,.info_c b,.txtInfo b{background:#f21136;color:#fff;font-size:1.2em;font-weight:700;padding:0 4px;border-radius:4px;margin:0 1px}.info_a b,.info_c b{margin:0 1px}.txtArrow{width:0;height:0;border-width:15px;border-style:solid;border-color:#ee3349 transparent transparent transparent;position:absolute;top:12px;left:-13px}.arrowOver{width:0;height:0;border-width:10px;border-style:solid;border-color:rgba(255,255,255,1) transparent transparent transparent;position:absolute;top:14px;left:-7px;z-index:3}.txtEle{color:red;font-size:13px;text-shadow:0 0#999;width:97%;padding:8px 20px 8px 20px;overflow:hidden;box-sizing:border-box}.txtEle.birds{text-align:left}.txtBox{position:absolute;width:100%;top:50%;font-size:12px;border-radius:16px;-webkit-transform:translateY(-50%);pointer-events:auto;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center}.txtBoxBottomZero{bottom:auto}.yaoImg{position:absolute;left:5%;top:50%;-webkit-transform:translateY(-50%);height:40px}.yaotxt{float:right;width:80%;text-align:center}.videoTxt{position:absolute;left:50%;top:80%;-webkit-transform:translate(-50%,-50%);text-align:center;color:#fff;font-size:1.3em;overflow:hidden}.yaoActive{-webkit-animation:yaoActive .4s infinite}@-webkit-keyframes widther{0%{width:0}50%{width:50%}100%{width:100%}}@-webkit-keyframes yaoActive{0%{-webkit-transform:scale(1,1) rotate(0) translateY(-50%)}50%{-webkit-transform:scale(1,1) rotate(15deg) translateY(-50%)}100%{-webkit-transform:scale(1,1) rotate(0) translateY(-50%)}}@-webkit-keyframes birdOpening{0%{top:100%}50%{top:1%}100%{top:10%}}@-webkit-keyframes birdMove{0%{top:0}100%{top:5%}}@-webkit-keyframes birdShadowDis{0%{background-image:radial-gradient(at 50%50%,rgba(166,166,166,1) 0,rgba(254,254,254,1) 76%,rgba(254,254,254,1) 100%);-webkit-transform:translate3d(-50%,0,0) rotateX(66deg) scale(1)}50%{-webkit-transform:translate3d(-50%,0,0) rotateX(66deg) scale(.7)}100%{-webkit-transform:translate3d(-50%,0,0) rotateX(66deg) scale(1);background-image:radial-gradient(at 50%50%,rgba(166,166,166,1) 0,rgba(254,254,254,1) 76%,rgba(254,254,254,1) 100%)}}.birdHidd{-webkit-animation:birdHidd 600ms 1 ease forwards}@-webkit-keyframes birdHidd{0%{-webkit-transform:translate(0,10%) scale(1)}100%{-webkit-transform:translate(0,50%) scale(.1);opacity:0}}.bird_loading{position:absolute;text-align:center;left:50%;font-size:.8em;-webkit-transform:translate(-50%,-10px)}.mascotImg{position:absolute;width:60%;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);pointer-events:auto}.mascotImg.markRoud{width:100%}.mascotImg .markS{width:100%}.mascotTxt{border:none;border-radius:0;width:100%;box-sizing:border-box;background:-webkit-gradient(linear,left top,right top,color-stop(0,rgba(255,255,255,0)),color-stop(35%,rgba(255,255,255,1)),color-stop(50%,rgba(255,255,255,1)),color-stop(80%,rgba(255,255,255,.8)),color-stop(100%,rgba(255,255,255,0)));font-size:1.1em;line-height:1.3em;color:#3d 3d3e;opacity:1;min-height:50px}")
	var bW=100,bH=150
		,top=winH/2-80
		,left=(winW-bW)/2^0
		,tW=winW*.75^0
		,birdWrap=createNode(DB,"div",{className:"birdWrap",style:"width:"+bW+"px;height:"+bH+"px;left:"+left+"px;top:"+top+"px;display:none"},"p3")
		,birdBox=createNode(birdWrap,"div",{className:"birdBox",style:"width:"+bW+"px;height:"+bH+"px;",action:"rule.,rule"},"p3")
		,bird=createNode(birdBox,"img",{className:"bird",action:"rule.,rule",src:PAGE.mascot.img},"p3")
		,birdShadow=createNode(birdBox,"div",{className:"birdShadow",style:"display:none;"},"p2")
		,txtWrap=createNode(birdWrap,"div",{className:"txtWrap",style:"width:"+(tW+10)+"px;display:none"},"p3")
		,txtBox=createNode(txtWrap,"div",{className:"txtBox mascotTxt"},"p3")
		,txtInfo=createNode(txtWrap,"div",{className:"txtInfo",style:"display:none"},"p3")
		,txtEle=createNode(txtBox,"div",{className:"txtEle"},"p3")
		,loading,loadingImg
		,txtWrapSty=txtWrap.style
		,birdWrapSty=birdWrap.style
		,birdBoxSty=birdBox.style
		,birdSty=bird.style
		,txtBoxSty=txtBox.style
		,txtEleSty=txtEle.style
		,birdname
		,method={
			opening:function(fun){
				birdWrapSty.display="block";
				bird.classList.add("birdOpening");
				if(PAGE.loading)loading=createNode(DB,"div",{className:"bird_loading",html:PAGE.loading,style:"top:"+(top+bH)+"px"},"p3");
				if(PAGE.background)loadingImg=createNode(DB,"img",{src:PAGE.background,style:"position:fixed;top:0;left:0;width:100%;z-index:-1"},"p2");
				setTimeout(function(){birdShadow.classList.add("birdShadowDis")},100)
				setTimeout(function(){
					bird.classList.add("birdMove");
					isFun(fun).call()
				},500);
				audioPlay(PAGE.mascot.sound.a)
			}
			,move:function($options){
				r()
				birdWrapSty.webkitTransition="all 1000ms ease";
				birdWrapSty.left="0px";
				birdWrapSty.top=$options.top+"px";
				birdWrapSty.overflow="visible";						
				birdBoxSty.webkitTransition="all 500ms ease";
				bird.src=PAGE.mascot.img;
				typeOf($options.overFun)==="function"&&
				setTimeout(function(){	
				birdBox.innerHTML='<div class="mascotImg" style="min-height:80px;" action="rule.,rule"><img src="'+PAGE.mascot.img+'" class="markS"></div>';
					$options.overFun()
					},500)
				}
			,hidd:function($fun){	
				r();					
				bird.className="bird birdHidd";
				birdShadow.className="birdShadow";
				birdShadow.style.cssText="-webkit-transition:all 300ms ease;-webkit-transform:translate(0,50%) scale(.1)"
				setTimeout(function(){
					isFun($fun);					
					birdWrapSty.display="none"
					},500)	
				}	
			,talk:function($data){//说话的地方
				var info;				
				//txtBoxSty.overflow="hidden"; //"visible"
				//txtEleSty.webkitTransform="translate3d(-100%,0,0)";						
				if($data.style){
					txtWrapSty.cssText=$data.style;
					}
				txtWrapSty.display="block";						
				setTimeout(function(){
					if($data.txt)txtEle.innerHTML=$data.txt;		
					else if($data.tag){
						txtEle.innerHTML="";
						txtEle.appendChild($data.tag)
						}
					setTimeout(function(){txtBoxSty.overflow="visible"},300)
					//txtEleSty.webkitTransform="translate3d(0,0,0)";
					},300)
				if(info=$data.info){
					txtInfo.style.display="block";
					if(info.txt)txtInfo.innerHTML=info.txt;
					else if(info.tag){
						txtInfo.innerHTML="";
						txtInfo.appendChild(info.tag)
						}
					}else{
						txtInfo.style.display="none"
						}
				}
			,shutUp:function(){
				txtWrapSty.display="none";
				}
			,ele:bird
	};
	function r(){
		if(loading)removeNode(loading);
		if(loadingImg)removeNode(loadingImg);
		loading=null;
		loadingImg=null
		}
	_txtWrap=txtWrap;
	mainVar.status=new statusFun
	return method;
}
//加载模块
function getModule($data){
	var data=toObject($data)
	,type=mainVar.config.moduleData||data.type
	,theTime=formatTime("toUnix",new Date),hosts=data.hosts
	,ajaxTime=0;
	fujia=0//data.coinSwitch;
	balanceSwitch=1//data.balanceSwitch
	joinHudong=0//data.joinHudong;
	tjData["tvm_id"]=data.tvm_id;
	setStorage("set","tvm_id",data.tvm_id);
	gameTime=data.countOverTime;			
	gameTime_next=data.nextCountdown;
	gameTime_over=data.countdown=mainVar.config.momentTime//Math.max(data.countdown,30);
	mainVar.prizeID=data.time_interval_id+data.paiTimeUnix;				
	mainVar.mainData=data;
	tjData["paiTimeUnix"]=data.paiTimeUnix;
	mainVar.paiTimeUnix=+data.paiTimeUnix;
	if(mainVar.config.adData){adCount();ajaxTime=1500};
	switch(type){
		case "module":
			var d=data.content1,id=d.instance_id;
			if(data.currentActivity===0){
				if(data.content1.name!="外链"){
					adCount();
					ajaxTime=1500
				}
				mainVar.baseNumP=data.userBase;
				mainVar.baseNumM=data.amountBase;								
			}
			loadModule({type:type,content:id})
			tjData.insid=id
		break
		default:
			//toPageErr(1)
			loadModule({type:type,content:mainVar.config.moduleData})			
		break
		}
	//加载模块
		function loadModule($data){
			mainVar.contentId=$data.content;
			var str=mainVar.contentId,sl=str.length
			,path1=str.substr(sl-2,1)
			,path2=str.substr(sl-1,1)
			setTimeout(function(){
				mainVar.adData.dsp=1;
				setJsonp(HOST.APICDN+'/open/data/scene/'+path1+'/'+path2+'/'+str+'.js')
				},ajaxTime)
			mainVar.times.modTime=setTimeout(function(){
				toPageErr(2);
			},10000);	
		}		
		setTimeout(function(){data.prize&&pushMonitor(data.prize)},50)
	}
function parsePageData(data){
	var type=data.appName,mainData=mainVar.mainData
	if(runTime)return;runTime=1;
	DB.style.margin=0;
	mainVar.sceneData=data;
	mainVar.ele.mainBox=createNode(DB,"div",{className:"mainBox",style:"min-height:"+winH+"px"},"p3");
	mainVar.status.txt("载入"+type+"模块");
	tjData.appName=type;
	tjData.column_id=mainData.column_info&&mainData.column_info.column_id;
	switch(type){
		case "SHEQU":
			tosq()
		break
		case "TAG_CLOUD":
			mainVar.module=MODULE["TAG_CLOUD"].call(null,mainVar)
		break
		case "WAILIAN":
			if(mainVar.moduleName==="SHEQU"){
					tosq()
				}else{
					var u=trim(data.linkUrl);
					//tjData.appName=data.linkName					
					if(mainData.currentActivity===0||u.indexOf("fullScreen=1")>-1){				
						TJ(131000,u,1,data.linkName)
					}else{
						createBanner({style:"display:none"});
						createNode(mainVar.ele.mainBox,"div",{style:"position:relative;width:100%;height:"+winH+"px",html:'<iframe src="'+data.linkUrl+(data.linkUrl.indexOf("?")>0?"&":"?")+'nextCountdown='+mainData.nextCountdown+'&openId='+mainVar.userInfo.openid+'&sig='+mainVar.userInfo.openid+'&sigExpire='+mainVar.userInfo.sigExpire+'&yyyappId='+PAGE.yyyappid+'" frameborder="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="scroll" allowfullscreen="true" style="height:100%;width:100%"></iframe>'})
						TJ(131000,u,0,data.linkName)
					}
				}
		break
		default:
			createNode(DB,"link",{href:PAGE.COMMON+"jc/style.css?2",rel:"stylesheet",type:"text/css"},"p2");
			modules=new modulesFun;
			if(!mainVar.adData.adpositions1){
				mainVar.adData.adVideo=trim(data.adVideo)!=""?data.adVideo:null;
				mainVar.adData.bgAdImg=data.bgAdImg;
				mainVar.adData.banner=data.topBannerAdImg
			}
			PAGE.yanzheng=0;
			if(mainVar.config.adValue==="google"){
				mainData.prize=[{type:5}]
			}
			if(!mainVar.adData.type){
				if(mainData.adImgs){
					if(mainData.adImgs.length>0){
						mainVar.adData.type=6;
						mainVar.adData.adImgs=mainData.adImgs;
						mainVar.adData.adAudio=mainData.adAudio
					}
				}else if(mainData.prize){
					if(mainData.prize[0].type==5){
						var folder=PAGE.COMMON+"googleAds/";
						//mainVar.adData.bgAdImg=folder+"img/bg.jpg",
						//data.pageBg=folder+"img/bg1.jpg",
						//mainVar.adData.bodyBG=folder+"img/bg.jpg",
						//mainVar.adData.banner=folder+"img/banner.jpg",
						mainVar.adData.type=5,
						mainVar.adData.adContent=folder+"index.html?token="+PAGE.token+"&channelName="+PAGE.channelName+"&channelId="+PAGE.channelId+"&openid_id="+mainVar.userInfo.openid+"&title_id="+mainVar.paiTimeUnix,
						mainVar.adData.ico=folder+"img/coinKj.png",
						mainVar.adData.ico2=folder+"img/hand.png",
						mainVar.adData.bg=[{src:folder+"img/s1.jpg",action:"goto.,coin.html"},{src:folder+"img/s2.jpg",action:"goto.,coin.html"},{src:folder+"img/s3.jpg",action:"goto.,coin.html"},{src:folder+"img/s3.jpg",action:"goto.,coin.html"}],
						mainVar.adData.head="<img src='"+folder+"img/2.png' style='width:95%'>"
						//<p style='margin:auto;box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.39);background:rgba(49, 49, 49, 0.69);text-align:left;color:#FBFBFB;display:inline-block;padding:6px 10px;font-size:1em;width:280px;border-radius:6px'>快来"+PAGE.channelName+"金币商城抢实惠吧！100%品质保证,超低折扣，品类齐全！优生活，购时尚！点击有惊喜。</p>
						}
				}
			}
			var mainYound=mainVar.ele.mainBox.querySelector('.mainYound');
			if(mainYound)if(type=='NEWDATI'||type=='DANXUAN')mainYound.style.pointerEvents='none';			
			mainVar.module=MODULE[type].call(null,mainVar);				
			mainVar.pageBg=data.pageBg==""?PAGE.COMMON+"img/bodybg.jpg":data.pageBg;
			mainVar.bottomLink=data.bottomLink;
			mainVar.pageCopyright=data.pageCopyright;
			mainVar.newlink=urlFolder()+"/share.html";
			PAGE.bangdan+="?openid="+ mainVar.userInfo.openid+"&avast="+mainVar.userInfo.weixin_avatar_url+"&nickname="+mainVar.userInfo.nickname;
			mainVar.M_mainBody=modules.main(data);
			setTimeout(function(){mainVar.M_mainBody.open()},100)
			mz_tj(function(){_mz_wx_view(1);})
			if(balanceSwitch==1){
				//JS文件测试环境地址： //alpha.dsp.tvm.cn/demo/etag/v0.4/tvme-0.4.js
				//正式CDN文件地址：   //e-cdn.yaotv.tvm.cn/cdn/etag/tvme-0.4.js
				setJsonp(cardDataUrl,function(){
					
			var _data=toObject(cardData),data='';
			if(_data.errcode==0){
				var data=_data.data,arr=[],saveIndex=null;
				var arr=[],saveIndex=null;
				if(data.staticcards){    //理财卡券
					//arr=data.staticcards
					setStorage('set','staticcards',JSON.stringify(data.staticcards));
				}else{
					setStorage('set','staticcards',"");
				};
				if(data.tagcards){             //普通卡券
					arr=data.tagcards.concat(arr);
				};
				if(data.reccards){             //猜你喜欢
					arr=data.reccards.concat(arr);
				};
				/*获取实时价格start*/
				var cur=null;
				for(var i=0,len=arr.length;i<len;i++){
					cur=arr[i]
					if(cur.type==6&&cur.productid){
						realTime(arr,i);
					};
					if(cur.type==10001){
						saveIndex=i
					};
				};
				if(saveIndex==null){
					setStorage('set','bannerAdData','');
				}else{
					setStorage('set','bannerAdData',JSON.stringify(arr.splice(saveIndex,1)[0]));
				};
				function realTime(cardArr,index){
					/*
						1，通过574407ec29ce31c74f8b4567，截取前8位，
						2，得到574407ec，
						3，转成10进制
						4，得到一个秒为单位的时间戳，
						5，将其格式化为时间格式
						6，获取其中的时和分做为路径
						7，拼成最终路径
						例：574407ec29ce31c74f8b4567，最终生成的路径为：
						 http://tvmtest.oss-cn-hangzhou.aliyuncs.com/15_51/574407ec29ce31c74f8b4567.json
					*/
					var id=cardArr[index].productid,time=new Date(parseInt(parseInt(id.substring(0,8),16)+'000')),hours=time.getHours(),minutes=time.getMinutes();
					var _ajax=setAjax('get',HOST.JIAGE+'/'+hours+'_'+minutes+'/'+id+'.json');
						_ajax.callBack=function($data){
							var data=toObject($data);
							cardArr[index].cash=FindDot(data.back_cash/100);
							cardArr[index].price=FindDot(data.sale_price/100);
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
				mainVar.reccards=arr;
				if(!(arr instanceof Array)){
					setTimeout(function(){
						tishi('卡券异常!',{time:5e3});
					},3e3);
				};
			};
		
				});
				//请求用户等级
				(function(){
				//测试地址	http://qa.userapi.yaotv.tvm.cn/api/tvmyao/api.php?action=yyy
				//正式地址	http://userapi.yaotv.tvm.cn/tvmyao/api.php?action=yyy
					var b=setAjax('post',"//qa.userapi.yaotv.tvm.cn/api/tvmyao/api.php?action=yyy");
						b.data='sig='+mainVar.userInfo.sig+'&sigtime='+mainVar.userInfo.sigExpire+'&openid='+mainVar.userInfo.openid+'&yyyappid='+PAGE.yyyappid+'&paitime='+mainVar.paiTimeUnix;
						b.callBack=function($data){
							var _data=toObject($data);
							if(_data.status==1){
								mainVar.gradeData=_data.data;
							};
						};
						b.err=function(){};
						b.send(); 
				})();
			};
			break
		}
		if(type!=="SHEQU"){
			DO.title=data.pageTitle;
			data.shareIco&&(CONFIG.shareInfo.imgUrl=data.shareIco);
			data.shareDesc&&(CONFIG.shareInfo.desc=data.shareDesc);
			data.shareTitle&&(CONFIG.shareInfo.title=data.shareTitle);				
			mainVar.baseNum=Number(mainVar.baseNumP)||1;
			mainVar.moneyNum=Number(mainVar.baseNumM)||1		
			}
		if(mainVar.mainData.commitJCDeal==1){
			setStyle('.quizclose{background:url('+PAGE.COMMON+'/img/iknow.png) no-repeat;background-size:cover;width:180px;height:28px;line-height:28px;position:relative;margin:-28px auto;text-align:center;font-size:16px;}.quizclose:after{content:"";display:block;width:12px;height:8px;background:url('+PAGE.COMMON+'/img/down_tp.png) no-repeat;background-size:cover;position:absolute;right:41px;top:13px;}.quizclose:before{content:"";display:block;width:12px;height:8px;background:url('+PAGE.COMMON+'/img/down_tp.png) no-repeat;background-size:cover;position:absolute;right:41px;top:8px;}@-webkit-keyframes jcshow{0%{opacity:0;bottom:-100%;}100%{opacity:1;bottom:0;}}@keyframes jcshow{0%{opacity:0;bottom:-100%;}100%{opacity:1;bottom:0;}}.jcshow{-webkit-animation-name:jcshow;animation-name:jcshow;}.jctime{-webkit-animation-duration: .4s;animation-duration: .4s;-webkit-animation-fill-mode: both;animation-fill-mode: both;}@-webkit-keyframes jchide{0%{opacity:1;bottom:0;}100%{opacity:0;bottom:-100%;}}@keyframes jchide{0%{opacity:1;bottom:0;}100%{opacity:0;bottom:-100%;}}.jchide{-webkit-animation-name:jchide;animation-name:jchide;}')
			var lohost='//a-h5.mtq.tvm.cn/yao/';
			mainVar.jcbox=createNode(DB,'div',{className:'jcshow jctime',style:'width:'+winW+'px;height:'+(winH*.68)+'px;position:fixed;bottom:0;left:0;z-index:10000;background:#fff;',html:'<div class="quizclose" onclick="mainVar.jcbox.close();">我知道啦</div><div style="-webkit-overflow-scrolling:touch;overflow-y:scroll;height:100%;width:100%;position:absolute;top:0;left:0;"><iframe src="'+lohost+'quiz/index.html?ho1='+encodeURIComponent(HOST.YAO)+'&openid='+mainVar.userInfo.openid+'&yyyappid='+PAGE.yyyappid+'&commitJCDeal='+mainVar.mainData.commitJCDeal+'&jcid='+mainVar.mainData.jcid+'" width="'+winW+'" height="'+(winH*.68+1)+'" frameborder="0" style="display:block;"></iframe></div>'},"p3");
			mainVar.jcbox.close=function(){
				mainVar.jcbox.className='jchide jctime';
				setTimeout(function(){mainVar.jcbox.style['display']='none';},500)
			}
		}
		setShareInfo();
		tjData["dsp"]=mainVar.adData.display;
		TJ(100000);
		tjData["dsp"]=false;
		var theUA=0//mainVar.isShare
		if(theUA){
			if(theUA.a&&PAGE.shareBanner!=="1"){
			setStyle('.shareHeader{position:absolute;left:0;top:0;width:100%;z-index:3;background:url(//a-h5.mtq.tvm.cn/yao/ty/img/share_topbg.jpg) no-repeat center center;background-size:100% 100%;font-size:12px}.shareHeader>div{position:absolute;top:50%;-webkit-transform:translateY(-50%)}.share_head{width:40px;height:40px;border-radius:50%;left:5px}.share_right{left:50px;line-height:20px}.share_head img{width:100%;height:100%;border-radius:50%}.share_name{color:#75450c}.share_name span{color:#1763d5;font-size:16px;margin-right:5px;font-weight:bolder;text-shadow:0 0 4px #fff}.share_right table{color:#75450c;-webkit-text-stroke:.25px #fff;font-weight:bolder;text-shadow:0 0 1px #fff}.share_right table td img{vertical-align:middle;width:20px}.share_right b{color:#75450c}@media screen and (min-width:320px){.share_name span{font-size:14px}.share_right table{font-size:10px}}@media screen and (min-width:377px){.share_head{width:45px;height:45px}}@media screen and (min-width:414px){.share_head{width:50px;height:50px;left:15px}.share_right{left:75px}}');
			var str=PAGE.yyyappid==="wxb529d9839a7eb26f"?'<div class="share_name"><span>'+decodeURIComponent(theUA.a)+'</span>邀请你一起来参加央视新闻新春互动</div><table><tr><td>锁定央视新闻频道 关注《一年又一年》</td></tr></table>':'<div class="share_name"><span>'+decodeURIComponent(theUA.a)+'</span>'+CONFIG.chars.share.a+'</div><table><tr><td>'+CONFIG.chars.share.b+'<b>></b></td><td><img src="'+PAGE.COMMON+'img/share_ico1.png">'+CONFIG.chars.share.c+'<b>></td><td><img src="'+PAGE.COMMON+'img/share_ico2.png">'+CONFIG.chars.share.d+'</td></tr></table>',shareHtml='<div class="share_head"><img src="'+getHead(theUA.b)+'"></div>'
							+'<div class="share_right">'+str+'</div>'
							,banner=createNode(DB,"div",{className:"shareHeader",style:"height:65px",html:shareHtml},"p2");
							setTimeout(function(){
								banner.style.webkitTransition="all 450ms ease"
								banner.style.webkitTransform="translate(0,-100%)"
							},5000)
			}
			TJ(118000,"")
		}
		sendSokect();
		function tosq(){
			mainVar.module=MODULE["SHEQU"].call(null,mainVar)
			mainVar.module.display(mainVar.ele.mainBox,createBanner,function(){
				tishi("社区太火爆了，我们再试一次进入",{time:3000,fun:function(){
					location.reload()
					}})
				})
		}		
	}
function toPageErr($n){
	parsePageData({"appName":"SHEQU","title":"边看边聊"})
	tishi('found_code_00'+$n,{time:3000});
	tjData.result=$n;
	tjData.appName="DANMU";
	TJ(100000);
	}
function goto(url,$type){
	if($type==="tlq"){
		tjData["appName"]="讨论区";
		TJ(100000);
		setTimeout(function(){
			top.location.href=url
			},1000)
		return 
		}
	top.location.href=url
	} 

//统计方法====================================================================
function goldTJ(ec){
	var user=mainVar.userInfo,data='id=55d2e8adb9ee8e3d65000001'
	+'&sex='+(user.sex||0)
	+'&user_name='+(user.nickname||"")
	+'&open_id='+(user.openid||"")
	+'&country='+(user.country||"")
	+'&province='+(user.province||"")
	+'&city='+(user.city||"")
	+'&token='+PAGE.token
	+'&url='+encodeURIComponent(location.href)
	+'&title='+(tjData.title||"")
	+'&event_code='+ec
	+"&page="+(tjData.page||"")
	+"&title_id="+(tjData.paiTimeUnix||"")
	+"&master_id="+(tjData.tvm_id||"")
	+"&content="+(tjData.tvm_id||"")
	+"&channel_id="+(PAGE.channelId||"")
	+"&video_name="+encodeURIComponent(tjData.videoUrl||"")//视频路径
	+"&play_time="+(tjData.playTime||0)
	+"&video_time="+(tjData.videoTime||0)
	createNode(DB,"img",{src:HOST.TJ+"/ana?"+data+"&ch="+Math.random(),style:"display:none"},"p3")
}
	function TJ(ec,$url,$m,$s,$d){
		var user=mainVar.userInfo,data='id=555eacab75188098ad000001&sex='+user.sex
		+'&user_name='+user.nickname
		+'&open_id='+user.openid
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
		+"&account="+(tjData.account||"")
		+"&insid="+(tjData.insid||"err");
		if(tjData.dsp)data+="&dsp="+(tjData.dsp|"0");
		if($m){
			location.replace("//rana.yaotv.tvm.cn/redirect?"+data+"&ch="+Math.random())
			}else{
		createNode(DB,"img",{src:HOST.TJ+"/ana?"+data+"&ch="+Math.random(),style:"display:none"},"p3")
			}
		setStorage("set","tjData",JSON.stringify(tjData))	
	}
function createBanner($opt){
	if(mainVar.banner)return
	mainVar.banner=1
	var _opt=$opt||{},banner=createNode(mainVar.ele.mainBox,"div",{className:"djs",style:_opt.style},"p2"),djs,count=0,djs2,nt=mainVar.mainData.nextCountdown;	
	setStyle(".djs{position:relative;background:#EA5C3A;color:white;text-align:center;height:30px;line-height:30px;font-size:15px;font-family:weiruanyahei,微软雅黑,Tahoma,arial;z-index:1}.djs b{margin:0 1px;color:#EA5C3A;background:white;padding:0px 3px;border-radius:3px;font-family:Arial,Helvetica,sans-serif}.djs span{font-weight:bold;margin:0 2px;}")
//	if(nt<0){
//		banner.innerHTML="让红包飞一会儿，请关注电视屏幕提示"
//	}else{ 
		if(nt>0)djs=setInterval(a,1000);
		a();b();
//		}
	if(PAGE.hiddenBanner=="1")banner.style.display="none"
	mainVar.bird.hidd()	
	function a($fun){
		banner.innerHTML=nt>0?(CONFIG.chars.bkbl.b?CONFIG.chars.bkbl.b:"距离下次开奖还有 ")+n2t(--nt,[{v:3600,u:":"},{v:60,u:":"},{v:1,u:""}]).replace(/(\d)/g,"<b>$1</b>").replace(/(\:)/g,"<span>$1</span>"):(clearInterval(djs),typeof($fun)==="function"&&$fun(),CONFIG.chars.bkbl.a?CONFIG.chars.bkbl.a:"大奖时刻马上开始，请看电视注意屏幕提示")
		}
	function b(){
		count++;
		if(count<100000){
			createMain({fun:function($data){
				var data=toObject($data);				
				if(data.currentActivity===0){
					clearTimeout(djs2)
					if(!InterTC)InterTC=new InterTCs(function(){
						location.reload();
					});
					InterTC.open()	
					}
				}})
				djs2=setTimeout(b,6000)	
			}
		}			
	}	
function setSocket($opt){
	var i=0,errCount=5,t=this,sender=$opt.sender||"",channel=$opt.channel||"";
	if(!window.SockJS)setJsonp(PAGE.COMMON+"jc/sockjs-0.3.min.js",function(){
		c();
		})
	else c();	
	function c(){
		var so=new SockJS($opt.url)
		so.onopen=function(){console.log("连接打开");
		    mainVar.openType=1;
			sendMsg('','sockjs:joinChannel')	
		};
		so.onmessage=function($data){
			$opt.onmessage($data.data)
			};
		so.onclose=function(){			
			so=null;
			mainVar.socketType=1;
			isFun($opt.onerr);
		};	
		t.sendMsg=function(msg){
			sendMsg(msg,"sockjs:sendMessage")
			};
		t.close=function(){so.close()}
		function sendMsg(msg,event){
			so&&so.send(joinMsg(msg,event));
		}
	}
	function joinMsg(msg,event){
		return JSON.stringify({'channel':channel,'uuid':'','data':{message:encodeURIComponent(msg),sender:sender},'event':event})
	}
}
	function audioPlay($i,$loop){
		if($i){
			if(!mainVar.audio){
				mainVar.audio=createNode(DB,"audio",{className:"music",autoplay:"autoplay"},"p3");
				}
			mainVar.audio.src=$i;
			mainVar.audio.play()
			if($loop)mainVar.audio.loop="true"
			}
		}
	function videoPlay($u){
		if(!mainVar.ele.mainAdBox){
			var search,size,vw=winW,vh=vw/16*9,mtop=mainVar.adData.type==5?38:0
		//	if($u){
				//search=getSearch($u.split('?')[1]),size=search.size,vn=(size?size:"16:9").split(":"),vh=winW/vn[0]*vn[1]				
		//	}
			mainVar.ele.mainAdBox=createNode(DB,"div",{className:"mainAdBox",style:"left:0;width:"+vw+"px;height:"+vh+"px;top:"+(1-vh-mtop)+"px;margin-top:"+mtop+"px;overflow:hidden"},"p3")
			}
		if(mainVar.adData.run)return false;
		switch(mainVar.adData.type){
			case 5:mainVar.adData.run=1;
				var adItemLength=0,bg=mainVar.adData.bg[adItemLength];
				mainVar.adImgShow=new loopImg({time:20000,box:mainVar.ele.mainAdBox,style:"width:300px;height:270px;margin:0 auto"});		
				mainVar.adImgShow.create([{tagName:"iframe",action:bg.action,style:"background:url("+bg.src+") no-repeat top center;background-size:300px 250px"}]);
				mainVar.adImgShow.run(0);
//						mainVar.times.adImgShow=setInterval(function(){
//							adItemLength++
//							bg=mainVar.adData.bg[adItemLength];
//							if(adItemLength<3&&bg)mainVar.adImgShow.create([{tagName:"iframe",action:bg.action,style:"background:url("+bg.src+") no-repeat top center;background-size:300px 250px"}])
//							else clearInterval(mainVar.times.adImgShow)
//							},16000)				
			break
			case 2:case 6:mainVar.adData.run=1;
				mainVar.adImgShow=new loopImg({box:mainVar.ele.mainAdBox,handle:1});			
				mainVar.adImgShow.create(mainVar.adData.adImgs);
				mainVar.adImgShow.run(0);
				trim(mainVar.adData.adAudio)!=""&&audioPlay(trim(mainVar.adData.adAudio),1)			
			break
			default:
				if(mainVar.adData.adVideo){
					mainVar.ele.mainAdBox.style.top="-320px";
					if(!mainVar.video){
						var v=createNode(mainVar.ele.mainAdBox,"video",{src:$u||PAGE.COMMON+"media/video.mp4",style:"margin:auto 50%;-webkit-transform:translate3d(-50%,0,0)",autoplay:"autoplay",loop:"loop","x-webkit-airplay":"allow","webkit-playsinline":"yes",height:"100%",action:"video"},"p3");				
							v.play();
							mainVar.ele.mainAdBox.style.background="#000";
							mainVar.video=v;
							}
							if(mainVar.game.result){									
								tjData["videoUrl"]=mainVar.adData.adVideo;	
								tjData["appName"]="广告页面";		
								tjData["button_name"]='播放视频';
								TJ(113000);
								setTimeout(function(){
									if(mainVar.adData.adpositions1){
										pushADCount&&pushADCount()
										}
									},1e4)	
								}
						}			
			break
			}	
	}

//开奖==========================================================
var indexNum=0,_indexNum=0
function parsePrize(){
	clearInterval(mainVar.jishu);
	mainVar.ele.contentBox.innerHTML="";	
	var ab=createNode(mainVar.ele.contentBox,"div",{html:mainVar.ele.htmls,className:'Win_Box'},"p2")	
	toShare();
	setTimeout(function(){
		if(ab.nextSibling)ab.nextSibling.style.display="none"
		ab.style.display="block"
		},3000)
	firstRun=0;			
	}
	function mzj($data){
		timetab(contentBox);
		if(!mainVar.M_bangdan)mainVar.M_bangdan=t.bangdan();
		mainVar.M_bangdan.display($data);
		mainVar.bird.sayStr=CONFIG.chars.birdSay.c
		mainVar.bird.move({left:-10,top:winH-140,overFun:function(){	
			var info=null
			if(gameTime_next>0){
				var p=document.createElement("p"),infoa;
				p.innerHTML="下一轮<label class='infoB'></label>";
				infoa=p.querySelector(".infoB");
				info={tag:p}
			}
			mainVar.bird.talk({txt:$data.birdSay?$data.birdSay:CONFIG.chars.birdSay.c,info:info})
			mainVar.M_mainBody.up()
			}
		})
		clearInterval(mainVar.times.jishu)									
	}	
	function getPrizeData($data){
		var data=mainVar.config.prize||toObject($data);//{"status": "failed","statusCode":10,"message": "系统错误"}//
		if(data.status==="success"){
			parseBd(data)
		}else{
			if(data.statusCode==101){a();parseBd();nowinfun(1);
			}else if(data.statusCode==110){
				a();setTimeout(getBqBD,8000);if(_indexNum==1){nowinfun(1);};_indexNum++	
			}else if(data.statusCode==4||data.statusCode==500){a();parseBd();nowinfun(1);
			}else{
				if(indexNum<2){	
					tishi(CONFIG.chars.kaijiang.b,{time:4000});
					setTimeout(function(){
						getBqBD();
						indexNum++
						},3000);
					}else{
						tishi(CONFIG.chars.kaijiang.c,{style:"width:260px",time:1e8})
						setTimeout(function(){nowinfun(1);},2000)
					}
				}
				return;			
			};
		indexNum=_indexNum=0;
		function a(){tishi("获取奖品信息异常："+data.statusCode,{time:3000})}
		}
	function createNewModule(coinNum){
		var folder=PAGE.COMMON+"googleAds/";
		mainVar.adData.adContent=folder+"index.html?token="+PAGE.token+"&channelName="+PAGE.channelName+"&channelId="+PAGE.channelId+"&openid_id="+mainVar.userInfo.openid+"&title_id="+mainVar.paiTimeUnix;
		mainVar.adData.ico=folder+"img/coinKj.png";
		mainVar.adData.bg=[{src:folder+"img/s1.jpg",action:"goto.,coin.html"},{src:folder+"img/s2.jpg",action:"goto.,coin.html"},{src:folder+"img/s3.jpg",action:"goto.,coin.html"},{src:folder+"img/s3.jpg",action:"goto.,coin.html"}]
		var svgBody=mainVar.ele.svgBody,bg=(mainVar.adData.bg&&mainVar.adData.bg[3]),_w=300
		,CSS='.rectangle{border-radius:10px;margin:54px auto}.rectangle .top{height:35%;padding: 10px;background:rgba(255,255,255,.8);border-top-left-radius:10px;border-top-right-radius:10px;text-align:center;overflow:hidden;}.rectangle .top em{font-size:20px;font-style:normal;margin-left:5px}.coin .coinImg{vertical-align:bottom;width:54px;margin-bottom: -7px;position:relative;z-index:1}.rectangle .top .coin{padding-bottom:10px;margin-bottom:10px;border-bottom:1px dashed #ccc;position:relative}.rectangle .top .coin b{margin-right:5px}.rectangle .top .txt{width:90%;font-size:1.2em;line-height:1.5em;color:#333;text-align:left;margin:auto}.rectangle .bottom{height:270px;width:100%;overflow:hidden}.coin .head{width:34px;border-radius:50%;border:2px solid white;margin:0 auto -5px auto;vertical-align:bottom}.coin .goldBox{display:inline-block;position:relative}.coin .gold{position:absolute;top:10px;left:20px}.lqButton{width:40px;padding:3px 6px;font-size:1em;color:white;background:#05BF02;border-radius:4px;line-height:20px;text-align:center;box-shadow: 1px 1px 1px #CACACA}';
		setStyle(CSS);svgBody.style.top="260px";
		var str='<div class="rectangle" style="width:'+_w+'px" action="rectangle_getGold">'
			+'<div class="top">'
			+'<div class="coin">'
			+'<img src="'+getHead(mainVar.userInfo.weixin_avatar_url)+'" class="head">'
			+'<em>我的'+PAGE.unit+':<b class="num">0</b></em>'
			+'<div class="goldBox"><p class="gold"></p><img src="'+(mainVar.adData.ico)+'" class="coinImg"></div>'
			+'</div>'	
			+'<table class="txt"><tr><td>恭喜获得'+PAGE.channelName
			+'和商家为您提供的'+coinNum+PAGE.unit
			+'</td><td><div class="lqButton">点击领取</div></td></table></div>'+
			'<div class="bottom" style="background:url('+bg.src+') no-repeat;background-size:300px 250px" action="'+bg.action+'">'+setIframe()+'</div>'+
			'</div>',rectangle=createNode(svgBody,'div',{className:'rectangle',html:str,style:'display:none'});
		rectangle.setAttribute('action','rectangle_getGold');
		svgBody.style.pointerEvents="auto";
		try{
			removeNode(mainVar.bird.ele.parentNode.parentNode);
		}catch(e){
			removeNode(document.querySelector('.birdWrap'));
		};
		var myGoldNum=svgBody.querySelector('.num');
		mygodnum(4,function(data){
			if((data-coinNum)<0){
				myGoldNum.innerHTML=0;
			}else{
				myGoldNum.textContent=data-coinNum;
			};
		});
		if(coinNum<=0)return;
		var CSS='.rectangle .gold1{background-image:url('+PAGE.COMMON+'img/gold01.png);width:13px;height:20px}.rectangle .gold2{background-image:url('+PAGE.COMMON+'img/gold02.png);width:18px;height:16px}.rectangle .gold3{background-image:url('+PAGE.COMMON+'img/gold03.png);width:15px;height:21px}.rectangle .gold0{background-image:url('+PAGE.COMMON+'img/gold04.png);width:15px;height:28px}.rectangle .gold span{position:absolute;top:10px;background-size:100% 100%}.rectangle .goldAnimation{-webkit-animation:goldAnimation ease-out .6s forwards}@-webkit-keyframes goldAnimation{0%{-webkit-transform:translate3d(0,210px,0)}100%{-webkit-transform:translate3d(0,0,0)}}',str='',index=0;
		setStyle(CSS);	
		for(var i=0;i<coinNum;i++){
			str+='<span class="gold'+index+'"></span>';
				index++;
				if(index>4){index=1};
		};			
		svgBody.querySelector('.gold').innerHTML=str;
		var oSpan=svgBody.querySelectorAll('span'),lq=0;
		mainVar.animation=function(){
			if(lq)return;lq=1
			svgBody.querySelector('.rectangle').removeAttribute('action');;
			var index=0,timer=setInterval(function(){
				if(index<coinNum){
				oSpan[index].classList.add('goldAnimation');
				remove(oSpan[index]);
				}else{
					clearInterval(timer);
					var b=svgBody.querySelector('.lqButton');
					b.style.background="#8E8E8E";
					b.textContent="已经领取";
				}
				index++;
			},200);
		};
		function remove(obj){
			setTimeout(function(){
				myGoldNum.textContent=1+(+myGoldNum.textContent);
				//if(obj)obj.parentNode.removeChild(obj);
			},400)
		};
	};
	function parseBd($data){
		mainVar.times.p_bstop=true;
		clearInterval(mainVar.times.countNum);
		clearInterval(mainVar.times.adImgShow);
		clearInterval(mainVar.times.percentage);
		if(mainVar.ele.percentage){removeNode(mainVar.ele.percentage);mainVar.ele.percentage=null};
		if(mainVar.ele.popup){removeNode(mainVar.ele.popup);mainVar.ele.popup=null};
		if(mainVar.adData.banner){
			var topBannerAdLink=trim(mainVar.sceneData.topBannerAdLink),
			_action=topBannerAdLink!=""?"goto.,"+topBannerAdLink:"";
			createNode(DB,"div",{style:"position:fixed;top:0;left:0;height:75px;width:100%;z-index:2;background:url("+mainVar.adData.banner+") no-repeat top center;background-size:100% auto;box-shadow: rgba(0, 0, 0, 0.298039) 0px 2px 8px",action:_action},"p3")	
			}else{				
		createNode(DB,"div",{html:mainVar.adData.head,style:"position:fixed;top:8px;left:0;width:100%;text-align:center",action:"goto.,coin.html"})	
				};
		mainVar.ele.percentage&&removeNode(mainVar.ele.percentage);
		mainVar.bird.talk({txt:CONFIG.chars.birdSay.i});
		mz_tj(function(){_mz_wx_view(3);})
		var prize,_data=$data||{},ele=mainVar.ele,html="",time=0;
		if(mainVar.video){mainVar.video.pause();mainVar.video=0};
		ele.mainAdWrap&&(ele.mainAdWrap.style.display="none");
		ele.mainAdBox&&ele.mainAdBox.classList.add("hidd");
		//if(mainVar.adData.type===5)ele.svgBody.style.top="350px";
		var birdWrap=document.querySelector('.birdWrap');
		setTimeout(function(){
			birdWrap.style.display='none';
			if(ele.mainAdBox){ele.mainAdBox.innerHTML="",removeNode(ele.mainAdBox),ele.mainAdBox=null};//删除视频
			clearAduio();
			if(_data.status==="success"){
				var data=_data.data,showPrizes=data.showPrizes,coinInfo=data.coinInfo,coinNum=coinInfo?coinInfo.value:0,thePrize=data.userGainPrize,inKind=data.inKind,bStop=true,curData=null,onOff=false,prizeArr=[],tj_type='',a_onOff=true;
				var elem=mainVar.ele.contentBox,html='',w=elem.style.width,h=elem.style.width,contentInBox=null;
				mainVar.prizeData=thePrize;
				removeNode(elem);
				mainVar.ele.contentBox=elem=null;
				setStorage("set","prizeId",mainVar.prizeID)
				setStorage("set","prizeData",JSON.stringify(data))
				/*-----大奖-----*/
				if(showPrizes!=null){
					for(attr in showPrizes){
						if(attr!="typeOf"){
							prizeArr.push(showPrizes[attr]);
						};
					};
					for(var i=0,len=prizeArr.length;i<len;i++){
						curData=prizeArr[i];
						if(curData!=null&&curData.winners&&curData.winners.length){
							var curPrize=curData.prize;
							if(curPrize!=null&&curPrize.rate!=null){
								if(curPrize.rate==1){
									//大奖
									var obj=createElem(createContent({type:5,dj:curData}));
								}else{
									//勾选大奖
									var obj=createElem(createContent({type:4,inKind:curData}));
									obj.setAttribute('check',1);
									obj.style.overflow='visible';
								};
								obj.setAttribute('audio','{key:"bigPrize",rate:"'+curPrize.rate+'",prize_name:"'+curPrize.prize_name+'",type:"'+album_list(+curPrize.type)+'"}');
							};
						};
					};
				};
				/*-----预先判断是否会出现手慢了(自己没有奖品)-----*/
				if(thePrize==null||isEmpty(thePrize)){
					onOff=true;
				};
				/*-----Google广告-----*/
				if(!onOff&&thePrize.type==5&&thePrize.js_code=="google"){
					var elem=ele.svgBody.children;
					for(var i=0,len=elem.length;i<len;i++){
						elem[i].style.marginTop="40px";
					};
					bStop=false;
					createNewModule(coinNum);
					showBird(thePrize);
					tjData["tvm_id"]=setStorage("get","tvm_id");
					tjData["timu"]=album_list(thePrize.type);
					tjData["album_name"]=thePrize.name;
					tjData["content_id"]=thePrize.rate;
					tjData["appName"]="抽奖页";
					tjData["paiTimeUnix"]=mainVar.paiTimeUnix;
					TJ(101000);	
				};
				if(bStop){
					/*-----显示我的奖品之前判断是否答错了-----*/
					if(mainVar.game.daan!==mainVar.game.xuanze&&!onOff){
						var obj=createElem(createContent({type:0,kind:1}));
						obj.setAttribute('flag','error');
					};
					/*-----判断是否显示用户等级-----*/
					var gradeData=mainVar.gradeData;
					if(gradeData){
						if(gradeData.type==3||gradeData.type==4){
							var obj=createElem(createContent({"type":7,"gradeData":gradeData}));
							obj.setAttribute('check',1);
							obj.style.overflow='visible';
						};
						var m=gradeData.source.gold;
						if(+m){
							setStorage('set','coinNum',m);
						};
					};
					/*-----我的奖品-----*/
					if(coinNum){
						//单独的金币
						if(onOff){
							var curElem=createElem(createContent({"type":6,"thePrize":thePrize,"coinNum":coinNum}));
						}else{
							//金币+奖品
							var totalCoin=0,curCoin=0;
							var curElem=createElem(createContent({"type":1,"thePrize":thePrize,"coinNum":coinNum}));
							curElem.setAttribute('audio','{key:'+thePrize.type+'}');
						};
						curElem.setAttribute('data-flag','skip');
						var myGoldNum=document.getElementById('myGoldNum');
						mygodnum(4,function(data){
							if((data-coinNum)<0){
								myGoldNum.innerHTML=0;
							}else{
								totalCoin=data;
								myGoldNum.innerHTML=curCoin=data-coinNum;
							};
						});
						curElem.setAttribute('data','1');
						curElem.setAttribute('action','getGold.,0');
						mainVar.skip=function(){
							//吸金币
							onOff?curElem.removeAttribute('action'):curElem.setAttribute('action','lingjiang.,0');
							takeGoldCoin(curElem,thePrize,totalCoin,curCoin,coinNum);
						};
					};
					if(!coinNum&&!onOff){
						//单独奖品	
						var obj=createElem(createContent({"type":2,"thePrize":thePrize}));
						obj.setAttribute('data','1');
						obj.setAttribute('action','lingjiang.,0');
						obj.setAttribute('audio','{key:'+thePrize.type+'}');
						obj.setAttribute('data-flag','skip');
					};
					/*-----判断是否显示手慢了的界面or答错了页面-----*/
					if(onOff&&mainVar.game.daan==mainVar.game.xuanze){     
						var obj=createElem(createContent({type:0,kind:2}));
						obj.setAttribute('flag','slow');
						obj.setAttribute('audio','{key:"slow"}');
						obj.setAttribute('data-flag','skip');
					};
					if(onOff&&mainVar.game.daan!=mainVar.game.xuanze){
						var obj=createElem(createContent({type:0,kind:1}));
						obj.setAttribute('flag','error');
						obj.setAttribute('data-flag','skip');
					};
				};
				contentInBox=ele.svgBody.children;
				ele.svgBody.className="svgBody display";
				contentInBox[0].style.display='block';
				playAduio(contentInBox[0]);
				if(isSkip(contentInBox[0])){
					return;
				};
				if(coinNum&&onOff){
					//奖品为空的时候后面多一个界面→→→→手慢了
					var count=contentInBox.length-2;
				}else{	
					var count=contentInBox.length-1;
				};
				var index=1;
				showLine(contentInBox[0]);
				function auto(){
					setTimeout(function(){
						if(isSkip(contentInBox[index])){
							return;
						};
						if(skipGoogle(contentInBox[index])){
							return;
						};
						ele.svgBody.className="svgBody hidden";
						setTimeout(function(){
							for(var j=0,len=contentInBox.length;j<len;j++){contentInBox[j].style.display='none'};
							contentInBox[index].style.display='block';
							if(contentInBox[index].getAttribute('check')){
								contentInBox[index].parentNode.style.top='38%';
							}else{
								contentInBox[index].parentNode.style.top='45%';
							};
							ele.svgBody.className="svgBody display";
							showLine(contentInBox[index]);
							playAduio(contentInBox[index]);
							index++;
							if(index<=count){
								auto();
							}else{
								//最后一个界面
								showBird(thePrize);
							};
						},800);
					},3000);
				};
				if(count>0){
					auto()
				}else{
					//最后一个界面
					if(skipGoogle(contentInBox[count])){
						return;
					};
					playAduio(contentInBox[count]);
					showBird(thePrize);
				};
				function skipGoogle(obj){
					var flag=obj.getAttribute('flag');
					switch(flag){
						case 'slow':
							nowinfun(1);
							return true;
						break;
						case 'error':
							if(onOff&&!coinNum){
								nowinfun(0);
								return true;
							};
						break;
					};
					return false;
				};
				function playAduio(obj){
					if(!obj)return;
					var a_object=obj.getAttribute('audio');
					if(!a_object)return;
					var attriData=toObject(a_object),val=attriData.key,curAduio='';
					switch(val){
						case 'bigPrize':   //大奖时的音频&&大奖上报统计
							if(PAGE.mascot.sound.f&&a_onOff){
								clearAduio();
								a_onOff=false;
								audioPlay(PAGE.mascot.sound.f);
							};
							tjData['appName']="开奖页面";
							tjData['content_id']=attriData.rate;
							tjData['button_name']='';
							tjData['album_name']=attriData.prize_name;
							tjData['timu']=attriData.type;
							TJ(100000);
						break;
						case 'slow':      //手慢了时的音频
							clearAduio();
							curAduio=PAGE.mascot.sound.c;
							curAduio&&audioPlay(curAduio);
						break;
						default:         //自己中奖时的音频
							curAduio=PAGE.mascot.sound.b;
							if(curAduio&&(val==1||val==3||val==102||val==108||val==101)){
								clearAduio();
								audioPlay(curAduio);
							};
						break;
					};
				};	
				function createElem(content){
					return createNode(mainVar.ele.svgBody,'div',{className:'contentBox contentInBox','style':'width:'+w+';height:'+h+';display:none;',html:content},'p3');
				};
				if(thePrize==null)thePrize={};
				mainVar.prizeName=thePrize.type>0?thePrize.name:0;	
				tjData["album_name"]=thePrize.name||"没中奖";
				tjData["result"]=thePrize.type>0?1:0;
				tjData.button_name='抽奖';	
			}else{
				ele.svgBody.className="svgBody display";
				var elem=mainVar.ele.contentBox,curAduio='';
				elem.className="contentBox contentInBox";
				elem.innerHTML=createContent({type:0,kind:2});
				curAduio=PAGE.mascot.sound.c;
				curAduio&&audioPlay(curAduio);
			};
		},800);
		function isSkip(obj){
			var curAttri=obj.getAttribute('data-flag');
			if(balanceSwitch==1&&curAttri=="skip"){
			location.href="gold.html?tags="+(mainVar.ticketInfo.join(','))+"&mtid="+mainVar.mainData.time_interval_id+"&column_id="+(mainVar.mainData.column_info?mainVar.mainData.column_info.column_id:1)+"&_="+(+new Date);
				return true;
			};
		};
		function clearAduio(){
			if(mainVar.audio){removeNode(mainVar.audio);mainVar.audio=null};
		};
		function showLine(elem){//作用：使用户两行能正常显示
			var allUser=elem.querySelector('.allUser');
			if(allUser){
				var h=allUser.offsetHeight;
				var t=allUser.offsetParent.offsetTop+allUser.offsetTop;
				var curWinH=t+h;
				if(curWinH>winH){
					if(ele.mainBody){ele.mainBody.style.display="none"};
					if(ele.mainBox){ele.mainBox.style.height=curWinH+'px'};
					DB.style.height=curWinH+'px';
				};
			}else{
				if(ele.mainBody){ele.mainBody.style.display="block"};
				if(ele.mainBox){ele.mainBox.style.height=winH+'px'};
				DB.style.height=winH+'px';
			};
		};
		function showBird(userPrizeData){
			var bool=(userPrizeData==null||isEmpty(userPrizeData));
			birdWrap.style.display='block';
			mainVar.bird.move({top:winH-140,left:-10});
			if(PAGE.hasJB!=0&&(bool||userPrizeData.js_code!="google")){
					createNode(ele.mainBox,"img",{className:"coinIco2",src:CONFIG.chars.jbrk.a,action:'goto.,coin.html',style:"position:absolute;left:50%;top:75%;-webkit-transform:translate(-50%,0);width:60%;opacity:1;z-index:2;"},"p3");
			};
		};
	};		
//大奖初始化 清空圆的内容
	function prizeInit(data){
		mainVar.ele.mainScroll.style.cssText='overflow:hidden;height:100%;';
		mainVar.M_mainBody.down(function(){
			if(+PAGE.pusher==1){
				if(!mainVar.socketType&&mainVar.openType)mainVar.cSocket.sendMsg(JSON.stringify(mainVar.socketTxt));
			};
			var sceneData=mainVar.sceneData;
			if(sceneData.statisticsSwitch=1){
				var arr=[],choose=["optionA","optionB","optionC","optionD","optionE","optionF","optionG","optionH","optionI","optionJ"];
				switch(sceneData.appName){
					case 'DATI':
						arr=[{name:"optaNum",value:sceneData.optionA},{name:"optbNum",value:sceneData.optionB}]
						MODULE.INTERACTIVE(sceneData,arr,0,'答题人数');
					break;
					case 'TOUPIAO':
						for(var i=0,len=choose.length;i<len;i++){  
							var curArrTerm=sceneData[choose[i]];
							if(curArrTerm){
								arr.push({value:curArrTerm,noteText:''});
							};
						};
						MODULE.INTERACTIVE(sceneData,arr,1,'投票人数');
					break;
					case 'JINGCAI':
						var question=toObject(sceneData.question);
						for(var i=0,len=question.length;i<len;i++){
							if(i%2==0&&question[i].value){arr.push(question[i])};
						};
						MODULE.INTERACTIVE(sceneData,arr,1,'投票人数');
					break;
					case 'DIANZAN':
						var arr=[{name:"optaNum",value:sceneData.zanPeople,noteText:''}] 
						MODULE.INTERACTIVE(sceneData,arr,2,'点赞人数');
					break;
				};
			};
			var p=document.createElement("p"),infoa,tv=0,info_b;
			p.className="txtEle_p";
			p.innerHTML=CONFIG.chars.kaijiang.a+(mainVar.adData.adpositions1?"。":"");
			mz_tj(function(){_mz_wx_view(2);})
			infoa=p.querySelector(".info_a");
			calcTime(infoa,mainVar.mainData.countdown,2,function(){
					getBqBD();if(mainVar.warter)mainVar.warter.remove();	
					removeNode(p.querySelector(".deng"));
					mainVar.ele.svgBody.style.opacity='1';
					mainVar.ele.svgBody.style.zIndex='1';					
					if(PAGE.token=='3a59f7a4b8b28dca'&&mainVar.ele.mainHeader){
						mainVar.ele.mainBox.appendChild(mainVar.ele.mainHeader);
						setStyle('.headLeft{-webkit-animation:headLeft 800ms forwards;}@-webkit-keyframes headLeft{0%{left:-100%;top:0%}60%{left:15%;top:0%}100%{left:0%;top:0%}}');
						mainVar.ele.mainHeader.className='mainHeader headLeft';
						if(document.querySelector('.fixedIn')){
							var fisedIn=document.querySelector('.fixedIn');
							fisedIn.style.background='url('+PAGE.COMMON+'img/ball.png) center center no-repeat';
						}
					}
			});	
			mainVar.people=p.querySelector(".info_b");			
			mainVar.jj=p.querySelector(".info_c");		
			mainVar.bird.move({top:winH-140,left:-10});
			mainVar.bird.talk({tag:p});
			mainVar.ele.contentBox.innerHTML="";
			mainVar.times.getMoneyTime=setInterval(getJJ,3000)		
		});									
	}	
	function calcTime($e,$n,$c,$f){
		var n=$n,c=$c,str="";		
		mainVar.djsTime=n;																					
			tv=setInterval(function(){
				n--;			
				if(n>-1){	
					str=""+n;
					for(var i=str.length;i<c;i++){
						str="0"+str
						}						
				}else{		
					clearInterval(tv);				
					isFun($f)
				}			
				$e.innerHTML=str.replace(/(.)/g,"<b>$1</b>")
				if($e.getAttribute("class")=='info_a'){mainVar.djsTime=n;}
			},1000)																									
		}
	//获取奖金	
	function getJJ(){
		var user=mainVar.userInfo,a=setAjax('get',HOST.CJ+'/open/syslottery/money?lotteryid='+mainVar.prizeID+"&yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.headimg+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city);
		a.callBack=function($data){						
			var data=toObject($data),num=+data.data||1,parts=data.participants||1;
				parts=mainVar.peopleCount+=Math.random()*10>>0
				num=mainVar.moneyCount+=Math.random()*10>>0
				num=num.toString()
				parts=parts.toString()
				if(mainVar.jj)mainVar.jj.innerHTML=num.replace(/(.)/g,"<b>$1</b>");
				if(mainVar.people)mainVar.people.innerHTML=parts.replace(/(.)/g,"<b>$1</b>");
			};
		a.err=function(){};
		a.send()
	}	
				
//获取开奖结果
	function getBqBD(){
		var user=mainVar.userInfo,ajax=setAjax('get',HOST.CJ+"/open/syslottery/user/result?lotteryid="+mainVar.prizeID+"&yyyappId="+PAGE.yyyappid+"&code="+user.sig+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.headimg+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city);		
			ajax.callBack=getPrizeData;
			ajax.err=function(){getPrizeData({status:0})};
			ajax.send();
			clearInterval(mainVar.times.jishu);
			clearInterval(mainVar.times.getMoneyTime);
			//clearInterval(mainVar.times.pageCount);
			mainVar.audio&&mainVar.audio.pause();
		}	
		function createContent(data){
			if(!mainVar.game.createContent){
				var CSS='.contentInBox{font-size:15px;line-height:18px;}.contentInBox em{font-style:normal}.contentInBox{background:rgba(0,0,0,.5);position:absolute;height:100%;width:100%}.contentInBox>.bottomLayout{position:relative;height:100%;width:100%;z-index:2}.contentInBox>.bottomLayout label{position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);width:86%;border-radius:50%;color:#fff;font-weight:400;text-align:center}.contentInBox>.bottomLayout .top{padding:14px 0 2px;color:#c8151b;background:#eeca25;font-size:18px;bottom:auto;top:-5px}.contentInBox>.bottomLayout .top strong{font-size:20px;padding:10px 0;display:inline-block}.contentInBox>.bottomLayout .top em{font-size:16px;line-height:18px;display:inline-block;font-style:normal;color:#fff;width:44px;vertical-align:middle;margin-right:-4px}.contentInBox>.bottomLayout .top span{font-size:26px;vertical-align:middle;font-weight:700}.contentInBox>.bottomLayout .bottom{font-size:18px;background:#50c260;padding:8px 0 12px 0;box-sizing:border-box}.contentBox .showWrap,.contentBox .inKindCon{position:absolute;left:0;top:0;color:#ffde26;height:85%;width:100%;padding-top:15%;text-align:center}.contentBox .showWrap .bigPrize,.contentBox .showWrap .error,.contentBox .inKindPrize{width:100%;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);text-align:center}.contentBox .showWrap .bigPrize p{margin-bottom:5px}.contentBox .showWrap .bigPrize{font-size:18px;line-height:26px;}.contentBox .showWrap .bigPrize img{border-radius:50%;width:80px;height:80px;}.contentBox .getGoldCoin{position:absolute;text-align:center;position:absolute;left:0;width:100%;top:50%;-webkit-transform:translateY(-50%)}.getGoldCoin .goldCoinTxtArea{margin-bottom:5px}.getGoldCoin .goldCoinTxtArea span{display:inline-block;height:18px;width:18px;background-image:url('+PAGE.COMMON+'img/add.png);background-size:100% 100%;margin:0 10px}.getGoldCoin .goldCoin,.getGoldCoin img,.getGoldCoin span{display:inline-block;vertical-align:middle}.getGoldCoin img{height:100px}.getGoldCoin .goldCoin{width:60px;height:60px;background-size:100% 100%;}.getGoldCoin p{color:#ffde26;padding:0 10px}@media screen and (max-width:340px){.getGoldCoin .goldCoin{width:40px;height:40px}.getGoldCoin img{height:40px}.getGoldCoin p{font-size:12px;line-height:16px}}.contentInBox .goldPile{position:absolute;text-align:center;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);height:35px;width:100%}.contentInBox .goldPile .wrap{position:relative;background-image:url('+PAGE.COMMON+'img/goldPile.png);width:132px;height:35px;background-size:100% 100%;z-index:1;margin:0 auto}.contentInBox .goldPile span{background-size:100% 100%;position:absolute;top:0;left:50%;margin-left:-7px;z-index:0}.contentInBox .goldPile .gold1{background-image:url('+PAGE.COMMON+'img/gold01.png);width:13px;height:20px}.contentInBox .goldPile .gold2{background-image:url('+PAGE.COMMON+'img/gold02.png);width:18px;height:16px}.contentInBox .goldPile .gold3{background-image:url('+PAGE.COMMON+'img/gold03.png);width:15px;height:21px}.contentInBox .goldPile .gold4{background-image:url('+PAGE.COMMON+'img/gold04.png);width:15px;height:28px}.contentBox .inKindCon .img{position:relative;display:inline-block;margin-bottom:12px;padding:10px;background:#ffc507;width:38%;}.contentBox .inKindCon .img img{width:100%;vertical-align:middle;}.contentBox .inKindCon .img span{position:absolute;top:0;right:0;background:#298ddf;padding:2px 5px;color:#fff;}.contentBox .inKindCon h3{font-weight:normal;font-size:16px;line-height:20px;margin-bottom:4px;}.contentBox .inKindCon .text{font-size:20px;line-height:24px;padding:0 15px;}.contentBox .allUser{position:absolute;top:110%;width:100%;text-align:center;}.contentBox .allUser h4{font-size:16px;line-height:16px;padding:4px 8px;background:#eeca25;color:#000;border-radius:8px;display:inline-block}.contentBox .allUser .line{position:absolute;width:100%;height:1px;background:#eeca25;top:10px;z-index:-1;}.contentBox .allUser ul{padding-top:5px;text-align:center;max-height:156px;overflow:hidden;}.contentBox .allUser li{padding:5px 0;margin-right:5px;display:inline-block;}.contentBox .allUser .icon{width:100%;height:100%;}.contentBox .allUser .pic{border-radius:50%;height:40px;width:40px;border:2px solid rgba(255,255,255,0.2);overflow:hidden;margin:0 auto;}.contentBox .allUser .name{text-align:center;color:#ffde26;background:#000;padding:0 4px;border-radius:16px;font-size:14px;line-height:20px;margin-top:6px;max-width:56px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.contentInBox .shine{background:url(//qa-h5.mtq.tvm.cn/yao/common/img/shine.png);background-size:100% 100%;position:absolute;width:100%;height:100%}.contentInBox .shinePic{height:50%%;width:50%%;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%)}.contentInBox .shinePic img{height:100%;width:100%}.contentInBox .shine_text .text{color:#ffde26;font-size:16px;line-height:20px;width:60%;padding-top:15px;margin:0 auto;text-shadow: 2px 2px 4px #000;}';
				setStyle(CSS);
				mainVar.game.createContent=true;
			};
			var str='',html='',advertisement='',tip='',action='',txt='';
			if(data.thePrize){
				if(mainVar.adData.adpositions1){
					advertisement='恭喜您获得了'
				}else{
					advertisement='恭喜获得了'+data.thePrize.tvmusername+'为您提供的'
				}; 
			};
			switch(data.type){
				case 0:   //答错了 手慢了 超时  
					action="goto.,"+PAGE.bangdan;
					txt=CONFIG.chars.button.a;
					switch(data.kind){
						case 1:  //答错了
							if(+joinHudong!=1&&+PAGE.hasJB!=0){
								str='<p>'+CONFIG.chars.linjiang.l+'</p>'
							};
							tip='<div class="error">'+CONFIG.chars.linjiang.k+mainVar.game.daan+str+'</div>';
						break;
						case 2:  //手慢了
							tip='<div class="error">'+CONFIG.chars.linjiang.j+'</div>';
						break;
						case 3:  //超时
							tip='<div class="error">'+CONFIG.chars.linjiang.i+'</div>';
						break;
					};
					html='<div class="bottomLayout">'+
					  	'<label class="top" action="'+action+'">'+
							'<strong>'+txt+'</strong>'+
						'</label>'+
					 '</div>'+
					 '<div class="showWrap">'+tip+'</div>';
				break;
				case 1:  //金币+奖品	
					var code='';
					if(data.thePrize.shoppingCard){
						code="<p>卡密："+data.thePrize.shoppingCard+"</p>";
					};		
					html='<div class="bottomLayout">'+
					  	'<label class="top">'+
							'<em>'+CONFIG.chars.units.b+'</em>'+
							'<span id="myGoldNum">0</span>'+
						'</label>'+
						'<label class="bottom">'+CONFIG.chars.button.d+'</label>'+
					 '</div>'+
					 '<div class="getGoldCoin">'+
					 	'<div class="goldCoinTxtArea">'+
							'<div class="goldCoin" style="background-image:url('+CONFIG.chars.coin.a+')"></div><span></span><img src='+data.thePrize.pic+'>'+
						'</div>'+
						'<p>'+advertisement+'</p>'+
						'<p><em>'+data.coinNum+'</em>'+CONFIG.chars.units.c+"和"+changgeText(data.thePrize.name)+'</p>'+
						code+
					  '</div>';
				break;
				case 2:  //单独的奖品（没有金币）
					var code='';
					if(data.thePrize.shoppingCard){
						code="<p>卡密："+data.thePrize.shoppingCard+"</p>";
					};		
					html='<div class="bottomLayout">'+
					  	'<label class="top">'+
							'<strong>'+CONFIG.chars.button.f+'</strong>'+
						'</label>'+
						'<label class="bottom">'+CONFIG.chars.button.d+'</label>'+
					 '</div>'+
					 '<div class="getGoldCoin" action="getGold">'+
					 	'<p>'+advertisement+'<br>'+changgeText(data.thePrize.name)+'</p>'+
						code+
					 	'<div class="goldCoinTxtArea" style="margin-top:5px;">'+
							'<img src='+data.thePrize.pic+'>'+
						'</div>'+
					  '</div>';
				break;
				case 3: //领取金币
					html='<div class="bottomLayout">'+
					  	'<label class="top">'+
							'<em>'+CONFIG.chars.units.b+'</em>'+
							'<span id="myGoldNum">'+data.curCoin+'</span>'+
						'</label>'+
						'<label class="bottom">'+CONFIG.chars.button.d+'</label>'+
					 '</div>'+
					 '<div class="goldPile">'+
					 	'<div class="wrap">'+data.str+'</div>'+
					 '</div>';
				break;
				case 4: //实物大奖
					var prize=data.inKind.prize,winners=data.inKind.winners,prizeName='';
					var len=winners.length;
					if(len>12){len=12};
					for(var i=0;i<len;i++){
						str+='<li><p class="pic"><img class="icon" src="'+getHead(winners[i].icon)+'"></p><p class="name">'+decodeURIComponent(winners[i].name)+'</p></li>'
					};
					switch(+prize.type){
						case 1:
							prizeName='实物';
						break;
						case 2:
							prizeName='电子券';
						break;
						case 3:
							prizeName='卡券';
						break;
						case 4:
							prizeName='任务';
						break;
						case 5:
							prizeName='贺卡';
						break;
						case 101:
							prizeName='微信卡券';
						break;
						case 108:
							prizeName='余额红包';
						break;
						case 102:
							prizeName='现金红包';
						break;
					};
					html='<div class="inKindCon">'+
					 	'<div class="inKindPrize">'+
							'<p class="img">'+
								'<img src="'+prize.pic+'">'+
								'<span>'+prizeName+'<span>'+
							'</p>'+
							'<h3>大奖揭晓</h3>'+
							'<p class="text">'+changgeText(prize.name)+'</p>'+
						'</div>'+
					 '</div>'+
					 '<div class="allUser">'+
					 	 '<h4>中奖用户</h4>'+
						 '<p class="line"></p>'+
						 '<ul>'+str+'</ul>'+
					 '</div>'
				break;
				case 5:   //中大奖
					var winners=data.dj.winners,prize=data.dj.prize;
					tip='<div class="bigPrize"><p>'+decodeURIComponent(winners[0].name)+'拿走了<br>本轮大奖'+changgeText(prize.name)+'</p><img src="'+decodeURIComponent(winners[0].icon)+'/96"></div>';
					html='<div class="showWrap">'+tip+'</div>';
				break;
				case 6:
					html='<div class="bottomLayout">'+
					  	'<label class="top">'+
							'<em>'+CONFIG.chars.units.b+'</em>'+
							'<span id="myGoldNum">0</span>'+
						'</label>'+
						'<label class="bottom">'+CONFIG.chars.button.d+'</label>'+
					 '</div>'+
					 '<div class="getGoldCoin">'+
					 	'<div class="goldCoinTxtArea">'+
							'<div class="goldCoin" style="background-image:url('+CONFIG.chars.coin.a+')"></div>'+
						'</div>'+
						'<p><em>'+data.coinNum+'</em>'+CONFIG.chars.units.c+'</p>'+
					  '</div>';
				break;
				case 7:
					var gradeData=data.gradeData,source=gradeData.source;
					html='<div class="shine">\
							<p class="shinePic"><img src="'+source.img+'"></p>\
						  </div>\
						  <div class="allUser shine_text">\
								<h4>晋级成功</h4>\
								<p class="line"></p>\
								<p class="text">'+source.message+'</p>\
						  </div>';
			};
			return html;
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
		//领取爽币
		function takeGoldCoin(contentBox,thePrize,totalCoin,curCoin,coinNum){
			var str='';
			var index=1;
			for(var i=0;i<coinNum;i++){
				str+='<span class="gold'+index+'"></span>';
				index++;
				if(index>4){index=1};
			};
			contentBox.innerHTML=createContent({"type":3,"thePrize":thePrize,"coinNum":coinNum,"str":str,"curCoin":curCoin});
			var elem=contentBox.querySelector('.goldPile').querySelectorAll('span');
			var elemLength=elem.length;
			var curIndex=0,ZIndex=0;
			var timer=null;
			var h=contentBox.offsetHeight/2;
			timer=setInterval(function(){
				function getStyle(obj, name){return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];}
				function move(obj, json, options){
					options=options||{};
					options.time=options.time||700;
					options.type=options.type||'ease-out';
					var start={},dis={};
					for(var name in json){
						if(name=='opacity'){
							start[name]=parseFloat(getStyle(obj, name));
						}else{
							start[name]=parseInt(getStyle(obj, name));
						}
						dis[name]=json[name]-start[name];
					}
					var count=Math.round(options.time/30);
					var n=0;
					clearInterval(obj.timer);
					obj.timer=setInterval(function (){
						n++;
						for(var name in json){
							switch(options.type){
								case 'linear':
									var cur=start[name]+dis[name]*n/count;
									break;
								case 'ease-in':
									var a=n/count;
									var cur=start[name]+dis[name]*a*a*a;
									break;
								case 'ease-out':
									var a=1-n/count;
									var cur=start[name]+dis[name]*(1-a*a*a);
									break;
							}
							if(name=='opacity'){
								obj.style.opacity=cur;
								obj.style.filter='alpha(opacity:'+cur*100+')';
							}else{
								obj.style[name]=cur+'px';
							}
						}
						if(n==count){
							clearInterval(obj.timer);
							options.fn && options.fn(obj);
						}
					}, 30);
				}
				move(elem[curIndex],{top:-h},{time:1500,type:'ease-out',fn:function(obj){
					obj.parentNode.removeChild(obj);
					ZIndex++;
					myGoldNum.innerHTML=curCoin+ZIndex;
					if(ZIndex>=elemLength){
						if((thePrize==null||isEmpty(thePrize))){ 
					     	//手慢了or答错了
							function skipGoogle(obj){
								var flag=obj.getAttribute('flag');
								switch(flag){
									case 'slow':
										nowinfun(1);
									break;
									case 'error':
										nowinfun(0);
									break;
								};
							};
							skipGoogle(contentBox.nextElementSibling)
							/*mainVar.ele.svgBody.className="svgBody hidden";
							setTimeout(function(){   
								contentBox.style.display='none';
								contentBox.nextElementSibling.style.display='block';
								mainVar.ele.svgBody.className="svgBody display";
								if(mainVar.audio){removeNode(mainVar.audio);mainVar.audio=null};
								var curAduio=PAGE.mascot.sound.c;
								curAduio&&audioPlay(curAduio);
								setTimeout(function(){
									nowinfun();
								},2000)
							},800);*/
						}else{
							lingjiang.init(contentBox,1);
						};
					};
				}});
				curIndex++;
				if(curIndex==elemLength){
					clearInterval(timer);
				};
			},150)
		};
function prizeFun(){
	var t=this;
//开奖领奖模块
			var method={
				display:function($fun){
					var time=setTimeout(function(){
					tishi("<img src='"+PAGE.COMMON+"img/loading.gif' style='width:32px;height:32px'>")
					},1500)
					if(+joinHudong==1){
						mainVar.game.result='answer';
					};
					var b=setAjax('post',HOST.CJ+'/open/syslottery/receiveuser'),user=mainVar.userInfo;
					b.data=JSON.stringify({lotteryid:mainVar.prizeID,type:mainVar.game.result,code:user.sig,sigExpire:+user.sigExpire,yyyappId:PAGE.yyyappid,user:{openId:user.openid,name:user.nickname,icon:user.weixin_avatar_url,sex:""+user.sex+"",province:encodeURIComponent(user.province),country:encodeURIComponent(user.country),city:encodeURIComponent(user.city)},matchingPrize:mainVar.adData.card})
					b.set=function(){this.setRequestHeader("Content-type","application/json")}
					b.err=praseDate;
					b.callBack=praseDate;
					function praseDate($data){
						clearTimeout(time);
						isFun($fun);
					}
					b.send();
					tjData["appName"]=mainVar.sceneData.appName;
					TJ(120000);
				}
			}			
		return method
	}
		
	
//手机验证=====================================================
//获取验证码
	
//画圆模块========================================================
function circle(options){
	var w=options.container.offsetWidth;
	var h=options.container.offsetHeight;
	var html='';
	var num=(2*Math.PI*((w+2)/2));
	//num为周长
	var ang=360/num;
	//角度
	var reg=/\d/;//匹配数字
	var rex=/,/;
	//生成元素
	html=create(options.str);
	options.container.innerHTML='<div class="fixedOut" style="border:'+options.outBorderW+'px rgba(255,255,255,.7) solid;border-radius:50%;width:'+w+'px;height:'+h+'px;"><div class="fixedIn" style="border:'+options.inBorderW+'px solid #37a5e4;width:'+(w-options.spaceing*2-2)+'px;height:'+(h-options.spaceing*2-2)+'px;border-radius:50%;"><div class="scrollCon"><div>'+html+'</div><div><span style="top:-46px;pointer-events:auto;"><img class="packRotateS" width="68" height="68" src="'+options.picName+'" action="goto.,home.html?sigCode='+sigCode+'"></span></div></div></div></div>';// action="rule.,mywin"
	//设置样式
	setElemStyle(false);
	var scrollCon=options.container.querySelector('.scrollCon');
	scrollCon.className="scrollCon rotateS";
	setTimeout(function(){
		scrollCon.className="scrollCon rotate";
		options.container.querySelector('img').className="packRotate";
	},2000);
	function create(str){
		var html='';
		for(var i=0,len=str.length;i<len;i++){
			var symbol=rex.test(str.charAt(i))?'comma':"";
			html+='<em class="'+symbol+'">'+str.charAt(i)+'</em>';
		};
		return html;
	};
	function setElemStyle(bool){
		var elem=options.container.querySelectorAll('em');
		var curElme=null;
		var curAng=0;
		var index=0;
		var t=options.outBorderW+options.inBorderW+options.spaceing+options.v_space;
		var y=options.outBorderW+options.inBorderW+options.v_space+w/2;
		for(var i=0;len=elem.length,i<len;i++){
			curElme=elem[i];
			if(curElme.innerHTML=='过')curElme.style.width=curElme.offsetWidth+3+'px';
			curAng=curElme.offsetWidth*ang;
			curElme.style.cssText='-webkit-transform:rotate('+(curAng+index+options.dis)+'deg);margin-left:'+-(curElme.offsetWidth/2)+'px;top:'+-(t+curElme.offsetHeight)+'px;-webkit-transform-origin:50% '+(y+curElme.offsetHeight)+'px;';
			if(curElme.innerHTML=='过')curElme.style.marginLeft=-(curElme.offsetWidth/2)+3+'px';
			if(bool){
				var _class=reg.test(curElme.innerHTML)?'numRed':'';
				if(curElme.innerHTML==','&&curElme.previousElementSibling&&reg.test(curElme.previousElementSibling.innerHTML))_class='numRed';
				curElme.className=curElme.className+' '+_class;
			};
			index+=curAng;
		};
	};
	//更新数字--对外接口
	window.afresh=function(str){
		var str=str+CONFIG.chars.circle.b;
		scrollCon.querySelector('div').innerHTML=create(str);
		setElemStyle(true);
	};
};
					
//统计模块=========================================================
	function countAction(options,fn,errFn){
		var method= options["method"],obj=options["dom"]||'';
		var ajax=setAjax('post',HOST.API +'/templateapp?cache='+Math.random());
		ajax.data="appid=runtimeappid&service=generalApi&method="+method+"&data="+JSON.stringify({instanceId:options["instanceId"]||mainVar.contentId,type:options["type"]||"GLOBAL",counterName:options["counterName"],option:options["option"],number:options["number"]||1,openId:mainVar.userInfo.openid});		
		ajax.callBack=fn||function($data){
			var data=toObject($data)
			if(data.result){data=toObject(data.result)}
			switch (options["option"]){
				case "people":
				   if(method=='queryCounter'){
						if(!data.options.people){data.options.people=0;};
						obj.innerHTML=((data.options.people||354558)*mainVar.baseNum).toFixed(0);
					}else if(obj){
						obj.innerHTML=data.value||1000;	
					}
				break
			}
		};
		ajax.err=function(){
			isFun(errFn);
			clearInterval(mainVar.times.countNum)
			//clearInterval(mainVar.times.pageCount)
			}
		ajax.send();
		}		
/*function getPageCount(){
		countAction({method:'queryCounter',counterName:'主页访问量',type:"SCENE",instanceId:PAGE.countInstanceid},function($data){
			var data=toObject($data),beforValue=0,nowValue,result;
			if(data.result){
				result=toObject(data.result)
				if(result.options){
					nowValue=result.options.pageCount
					if(nowValue!=beforValue)afresh(qfz(nowValue));
					beforValue=nowValue;
					}
				};
		});
	}*/	
	
//分享与关注==========================================================
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
	function guanzhuFun(){
		shaketv.getUserTicket();
		shaketv.subscribe(PAGE.mpappid,function($data){				
			});			
		}
	function setGZ(){		
		if(!window.shaketv){
				setJsonp(HOST.QQAPI,guanzhuFun)
			}else{
				guanzhuFun()
			}
		}
//解析微信头像				
	function getHead($url){
		var url=decodeURIComponent($url)
		if(/\.jpg$|\.png$|\.gif$/gi.test(url))return url
		else{			
			return url.indexOf("tvm")>-1?url:url.replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/64"
		}
	}		
//引用弹框
/**
*var popBox=new popBox(function(e,v){...});实例弹层，obj为滚动设置的回调，不用可不传
*popBox.open()
*/	
	
function popBoxs(obj,b){
	if(!mainVar.popSty)setStyle('.popbox,.fuceng{width:80%; max-height:80%; min-height:200px; display:none; padding:6px; background:rgba(255,255,255,0.2); border-radius:5px; position:fixed; z-index:1000; top:50%; left:50%; -webkit-transform:translateX(-50%) translateY(-50%) translate3d(0,0,0);}.pop{width:100%; min-height:200px;  max-height:80%; background:rgba(255,255,255,.92); border:1px solid rgba(0,0,0,0.1); position:relative; border-radius:5px; box-sizing:border-box; overflow:hidden; overflow-x:hidden;}.poptitle,.fuceng>h4{background:rgba(104,186,219,.85); text-align:center; color:#fff; line-height:36px; height:36px; font-size:18px;}div.labelbox{height:100%; max-height:inherit; border-radius:50%; padding:0; margin:0; background:#fff;}div.labelbox .labelmain{padding: 32px 0; border-top:0; margin:0 8%; box-sizing: border-box;}div.labelbox .labelmain li{width:33%;}.labelbox{padding-top:5px; margin:0 1.5% 60px; max-height:276px; overflow-y:auto; overflow-x:hidden; text-align:center; -webkit-overflow-scrolling: touch; -webkit-transform: translate3d(0,0,0);}.labelbox>li{height:45px; line-height:45px; position:relative; font-size:15px; text-align:left; border-bottom:1px solid rgba(0,0,0,.08); padding:0 6% 0 34%;}.labelbox>li.formtitle,.labelbox>li.formts{padding:0 20px; color:#e43656; border:0; height:auto; line-height:24px; min-height:45px; box-sizing: border-box;}.labelbox>li.formtitle{text-align:center; font-size:18px; padding-top: 12px;}.labelbox>li.formts{line-height:20px; padding: 7px 20px 7px 59px; font-size:13px;}.labelbox>li.formts img{width: 18px; position:absolute; top:8px; left:30px; -webkit-transform:translate3d(0,0,0);}.labelbox>li font.sx{color:#000; opacity:1; width:32%;}.labelbox>li .sx{ position:absolute; left:0;}.labelbox>li input,.labelbox>li textarea.txts{vertical-align: middle; border:0; width:100%; display:inline-block; outline:none; font-size:15px; background:none;}.labelbox>li label,.labelbox>li font{display:inline-block; font-size:14px; width:30%; text-align:right; outline:medium;}.labelbox>li font{width:70%; padding:0 5%; box-sizing:border-box; opacity:.5;}.labelbox .labelmain span{line-height:1; color:#646464;}.btn{height:60px; text-align:center; line-height:60px; background:rgba(255,255,255,0.05); width:100%; border-top:1px solid rgba(0,0,0,.08); position:absolute; bottom:0; left:0; z-index:1100;}.btn label{background:#59b3d8; color:#fff; padding:3px 18px 3px; font-size:16px; margin:0 20px; border-radius:4px;}.popbox{width:90%;}.pop_min{min-height:230px;}.speech{width:100%;height:100px;position:relative;}.speech textarea{width:94%;height:100%;display:block;margin:0 auto;padding-top:10px;border:none;box-sizing:border-box;font-size:1em;color:#347690;position:absolute;left:3%;top:10px;background:transparent;padding-left:10px;}.mark{position:absolute;width:10%;opacity:0.4;}.mark_t{left:10px;top:10px;}.mark_b{right:10px;bottom:10px;-webkit-transform:rotate(180deg);}.limit{hieght:2em;line-height:2em;text-align:right;padding-right:10px;color:#9e9e9e;}.pop_min .btn_bg{border:1px #67b9da solid;background:#fff;color:#67b9da;margin:0 13px;padding:5px 18px;}.speechLabel{position:absolute;left:5%;top:110%;margin:0;line-height:35px;height:35px;padding:0 6px 0 0;border-radius:15px;background:rgba(0,0,0,0.36);z-index:-1;white-space:nowrap;-webkit-transition:all 8s linear;color:rgba(255,255,255,1);}.speechLabel b{display:inline-block;line-height:20px;margin:0 15px 0 10px;}.grayT{position:absolute;left:40px;top:10px;width:10px;opacity:0.6;}.grayB{position:absolute;right:10px;bottom:5px;width:10px;opacity:0.6;-webkit-transform:rotate(180deg);}.pop_min .popCloseButton{color:#fff;background:#67b9da;}');mainVar.popSty=true;	
	var t=this;
	if(!t.$)t.$=createNode(DB,"div",{id:"popbox",class:"popbox fadeIn boxtime",html:'<div class="pop"><h3 class="poptitle"></h3><ul class="labelbox"></ul><div class="btn"></div></div>'},'p3')
	t.open=function(){
		t.$.className="popbox fadeIn boxtime";
		t.$.style.display='block';
	}
	t.popClose=function(a){
		t.$.className="popbox fadeOut boxtime";
		setTimeout(function (){
			t.$.style.display='none';
			setTimeout(function(){
				mainVar.newbg.style.cssText='display:none;z-index:999;';
				DB.style.overflow="auto";
				if(b)b();
			},700)
		},600)
		if(a){
			var type=mainVar.prizeData.type||mainVar.prizeData.awardtype||mainVar.prizeData.prizeType;   //奖品类型
			if(type==108){
				wallet(mainVar.prizeData.money);
			}else if(type==102){
				lingjiang.getHongbao();
			};
		};
	}
	t.scrolldo=function(e){
		if(!e.tagName)e=mainVar.scrolldom;
		var v=e.scrollTop,c=e.clientHeight,d=e.scrollHeight,a=d-c;
		if(v>a-2){
			obj(e,v);
		}
	}
}


/*领奖模块
*var lingjiang=new lingjiang($);//实例领奖模块对象。$数组是实例时带的回调，$[0]为实物领取结束回调，$[1]为红包领取结束回调，$[2]为微信卡券领取结束回调
*$[3]获奖感言引用回调，返回奖品的data，$[4]获奖感言发送成功回调，返回获奖感言接口返回的data
*lingjiang.init(obj)//领奖调用方法,带按钮本身或者随意DOM元素，
*第二个参数:1为刚中奖mainVar.prizeData={}、其他或者空值的奖品信息应为数组存放的多个奖品信息mainVar.newdata={data:[]}（DOM元素的父级元素要加type做为数组对应奖品信息的索引）。
*手机验证需要再config.js里配置Key.yanzheng=true是为要验证
*
**/
	function lingjiangs($){
		var t=this
		,a
		,_b
		,$f
		,$ord
		,$isT
		,data
		,$typ
		,$link
		,$name
		,$rate
		,$wxstate
		,$card_id
		,$orderId
		,$createTime
		,$receiveInfo
		,activityType
		,$wxRedLotteryId
		,user=mainVar.userInfo
		,UA=navigator.userAgent.toLowerCase()
		;
		t.init=function(obj,tag){
			t.box=obj;PAGE.yanzheng=0
			var Verif=setStorage("get","Verif"),mo=!mainVar.mobile,yanzheng=+PAGE.yanzheng,speech=+PAGE.speech
			,tvm_id=setStorage("get","tvm_id");
			if(mo&&yanzheng!=0){
				obj.id='thebox';
				mainVar.mywin={ele:obj,a:tag};
				mygodnum(function(_){
					if(!_.data.mobile){
						if(!Verifs)Verifs=new saveVerif;
						Verifs.openform();
					}else{
						mainVar.mobile=_.data.mobile;
						lingjiang.init(lingjiang.box,tag);
					}
				});
				return false;
			}
			switch(tag){
				case 1:
					data=mainVar.prizeData;
					_b="now";
					a=0;
				break
				default:
					_b=t.box.parentNode.title;
					data=mainVar.newdata.data[_b];
					mainVar.prizeData=data;
					a=1;
				break
			}
			$link=data.gainUrl; 
			$typ=data.type||data.awardtype||data.prizeType;   //奖品类型
			switch($typ){
				case 2:case 3:case 5:
					$link=data.link||data.url||data.google_json_url||data.prizeInfo.url;          //url
				break
				case 101:
					$card_id=data.card_id||data.prizeInfo.wx_coupon_id;           //卡券id
				break
			}
			$name=data.name||data.prize_name;                 //名称
			$rate=data.rate||data.grade;     //等级
			$orderId=data.orderId;           //商品id
			$wxstate=data.wxstate;           //
			$createTime=data.datetime;  
			$isT=data.isToBarrage;            //判断是否进大幕榜单（1:进）
			$receiveInfo=data.receiveInfo;    //实物领奖的地址相关信息 
			$wxRedLotteryId=data.wxRedLotteryId;//红包id		
			activityType=data.activityType; //活动类别（大转盘、金币兑奖）
			if($isT)$isT=Number($isT);
			if(activityType==3)$isT=1;
			else if(activityType==2){
				if($rate<5)$isT=1;
			}
			mainVar.$isT=$isT;
			if($isT===1){mainVar.shoppn=$name;mainVar.shoppt=$typ;}
			$ord=setStorage("get",'hjgy'+$orderId);			
			if(typeof $createTime=='string')mainVar.paiTimeUnix=+new Date($createTime.replace(/-/g,"/"));
			pushAdData($typ,data);
			mz_tj(function(){_mz_wx_custom($typ);})
			switch(activityType){
				case 1://摇一摇
					switch($typ){
						case 1:
							setJsonp(HOST.MB+"/ufo/puserinfo?cb=getUser2&openid="+user.openid+"&wx_token="+PAGE.yyyappid+"&display=address&cache="+Math.random())
							window.getUser2=function($data){
								var data=toObject($data),msg=data.msg;
								if(data.err == false)mainVar.getUsers=data.msg;else mainVar.getUsers='';
								if($ord){
									if(_b=="now")tishi(CONFIG.chars.linjiang.d);else t.form();
								}else{
									if($receiveInfo==undefined&&speech!=0&&$isT===1&&!$ord)t.hjgy();else t.form();
								}
							}
						break
						case 101:
							if($isT===0||!$isT)t.getKaquan();else{
								if(speech!=0&&$ord==null)t.hjgy();else t.getKaquan();
							}
						break
						case 102:
							tjHjgy=0;
							if(_b=="now"){
								if($ord==='1')tishi(CONFIG.chars.linjiang.d);else t.hjgy();
							}else t.getHongbaoData();
						break
						case 108:
							wallet(mainVar.prizeData.money)
						break
						default:
							mainVar._urls=setURL($link);
							if($typ==5){
								mainVar._urls=nowinfun({name:$name,link:mainVar._urls});
							};
							if($isT===1||$isT){
								if(speech!=0&&$ord==null)t.hjgy();else{if(mainVar._urls != ''){setTimeout(function(){goto(mainVar._urls)},1000);}}
							}else{
								if(mainVar._urls!=''){
									setTimeout(function(){goto(mainVar._urls)},2000)
								}
								}
						break
					}
				break
				case 2://大转盘
				case 3://倒计时
				case 6://刮刮卡
					switch($typ){
						case 1:
							setJsonp(HOST.MB +"/ufo/puserinfo?cb=getUser2&openid="+user.openid+"&wx_token="+PAGE.yyyappid+"&display=address&cache="+Math.random())
							window.getUser2=function($data){
								var data=toObject($data),msg=data.msg;
								if(data.err == false) mainVar.getUsers=data.msg; else mainVar.getUsers='';
								if($rate<5){
									mainVar.$eles=t.box;
									if(speech!=0&&$receiveInfo==undefined&&!$ord)t.hjgy();else{
										if(_b=="now")tishi(CONFIG.chars.linjiang.d);else t.form();
									}
								}else t.form();
							}
						break
						case 101:
							if($rate<5){if(speech!=0&&$ord==null)t.hjgy();else t.getKaquan();}else t.getKaquan();;
						break
						case 102:
							tjHjgy=0;
							if(_b=="now"){
								if($ord==='1')tishi(CONFIG.chars.linjiang.d);else t.hjgy();
							}else t.getHongbaoData();
						break
						case 108:
							wallet(mainVar.prizeData.money)
						break
						default:
							mainVar._urls=setURL($link);
							if($isT===1||$isT){
								if(speech!=0&&$ord==null)t.hjgy();else{if(mainVar._urls != ''){setTimeout(function(){goto(mainVar._urls)},1000);}}
							}else{if($rate<5&&speech!=0&&$ord==null)t.hjgy();else{if(mainVar._urls!=''){setTimeout(function(){goto(mainVar._urls)},1000);}}}
						break
					}
				break
				case 5://金币兑换
					switch($typ){
						case 1:
							setJsonp(HOST.MB+"/ufo/puserinfo?cb=getUser2&openid="+user.openid+"&wx_token="+PAGE.yyyappid+"&display=address&cache="+Math.random())
							window.getUser2=function($data){
								var data=toObject($data),msg=data.msg;
								if(data.err == false) mainVar.getUsers=data.msg;else mainVar.getUsers='';
								if($ord){
									if(_b=="now")tishi(CONFIG.chars.linjiang.d);else t.form();
								}else{
									mainVar.$eles=t.box;
									if(speech!=0&&$receiveInfo==undefined&&$isT===1)t.hjgy();else t.form();
								}
							}
						break
						case 101:
							if($isT===0||!$isT)t.getKaquan();else{if(speech!=0&&$ord==null)t.hjgy();else t.getKaquan();}
						break
						case 102:
							tjHjgy=0;
							if(_b=="now"){
								if($ord==='1')tishi(CONFIG.chars.linjiang.d);else t.hjgy();
							}else t.getHongbaoData();
						break
						case 108:
							wallet(mainVar.prizeData.money)
						break
						default:
							mainVar._urls=setURL($link);
							if($isT===1||$isT){
								if(speech!=0&&$ord==null)t.hjgy();else{if(mainVar._urls != ''){setTimeout(function(){goto(mainVar._urls)},1000);}}
							}else{if(mainVar._urls!=''){setTimeout(function(){goto(mainVar._urls)},1000);}}
						break
					}
				break
				default:
					 switch($typ){
						case 1:
							if(sessionStorage.getItem('shiwu'+mainVar.prizeData.orderId)){
								 tishi('您已经领过奖！')
								return;
							};
							setJsonp(HOST.MB+"/ufo/puserinfo?cb=getUser2&openid="+user.openid+"&wx_token="+PAGE.yyyappid+"&display=address&cache="+Math.random())
							window.getUser2=function($data){
								var data=toObject($data),msg=data.msg;
								if(data.err == false)mainVar.getUsers=data.msg;else mainVar.getUsers='';
								if($ord){
									t.form();
								}else{
									if($rate<=4&&$rate>=1&&speech!=0&&$ord==null){
										t.hjgy();
									}else{
										t.form();
									};
								};
							};
						break
						case 2:
							if($rate<=4&&$rate>=1&&speech!=0&&$ord==null){
								t.hjgy();
							}else{
								 tctab(data);
							};
						break
						case 3:
							if($rate<=4&&$rate>=1&&speech!=0&&$ord==null){
								t.hjgy();
							}else{
								mainVar._urls=setURL($link);
								setTimeout(function(){goto(mainVar._urls)},1000);
							};
						break
						case 101:
							if(sessionStorage.getItem('kaquan'+mainVar.prizeData.orderId)){
								 tishi('您已经领过奖！')
								return;
							};
							if($rate<=4&&$rate>=1){
								if(speech!=0&&$ord==null){
									t.hjgy();
								}else{
									t.getKaquan();
								};
							}else{
								 t.getKaquan();
							};
						break
						case 102:
							if(sessionStorage.getItem('hongbao'+mainVar.prizeData.orderId)){
								 tishi('您已经领过奖！')
								return;
							};
							tjHjgy=0;
							if($rate<=4&&$rate>=1&&speech!=0&&$ord==null){
								if(_b=='now'&&!$ord){
									if(!speech!=0&&$ord==='1'){
										tishi(CONFIG.chars.linjiang.f);
									}else{
										 t.hjgy();
									};
								}else{
									 t.getHongbaoData();
								};
							}else{
								t.getHongbaoData();
							};
						break
						case 108:
							wallet(mainVar.prizeData.money)
						break
					};
			}
			if(!mainVar.tj101){mainVar.tj101=1
				tjData["tvm_id"]=tvm_id;
				tjData["timu"]=album_list($typ);
				tjData["album_name"]=$name;
				tjData["content_id"]=$rate;
				tjData["appName"]="抽奖页";
				tjData["paiTimeUnix"]=mainVar.paiTimeUnix;
				TJ(101000);
			}
			function setURL($link){
				var str="";
				if($link.indexOf("fullScreen=1")>-1){
					str=$link
				}else if($link.indexOf('pmall')>0){
					str=$link;
				}else if($link.indexOf('tvm.cn')>0){
					str=$link+($link.indexOf("?")>0?"&":"?")+"yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sig="+user.sig+"&sigExpire="+user.sigExpire+"&orderId="+$orderId+"&paiTime="+mainVar.paiTimeUnix+"&token="+PAGE.token+"&channel_id="+PAGE.channelId+"&t="+(+new Date());
				}else if($link.indexOf('cctvmall.com')>0){
					str=$link+(/\/$/g.test($link)?"":"/")+"yyyappId/"+PAGE.yyyappid+"/openId/"+user.openid+"/sig/"+user.sig+"/sigExpire/"+user.sigExpire+"/orderId/"+$orderId+"/t/"+(+new Date());				
				}else{ 
					str=$link+($link.indexOf("?")>0?"&":"?")+"openid="+user.openid+"&orderid="+$orderId+"&t="+(+new Date());
				};
				return str;
			};
		};
		t.getHongbaoData=function(){
			if(typeof $createTime == 'string')mainVar.paiTimeUnix=+new Date($createTime.replace(/-/g,"/"))
			mainVar.prizeName=$name;
			t.hjgy();
		}
		t.hjgy=function(){
			isFun($[4],data)
//			setTimeout(function(){
//				var a="",b=CONFIG.chars.hjgy.g,html="";
//				if(data.awardtype){
//					if((data.awardtype==102&&data.money==1)||(data.awardtype==108&&data.money==1)){
//						a='<label onclick="popBox.popClose(1)" class="btn_bg popCloseButton">'+CONFIG.chars.button.b+'</label>';
//					};
//					b="";
//				}else{
//					if(+$rate>1){
//						if(($typ==102&&$isT==0)||($typ==108&&$isT==0))a='<label onclick="popBox.popClose(1)" class="btn_bg popCloseButton">'+CONFIG.chars.button.b+'</label>'; else a='';
//						b="";
//					}
//				};
//				html='<h3 class="poptitle">'+CONFIG.chars.form.n+'</h3><div class="label">'+
//				'<div class="speech"><textarea  placeholder="'+b+'" max-length="15" id="textarea"></textarea></div>'+
//				'<div class="limit">最多15字</div></div><div class="btn">'+
//				'<label action="btn_speech" class="btn_bg">'+CONFIG.chars.button.c+'</label>'+a+'</div>';
//				popbox.querySelector('.pop').innerHTML=html;
//				popbox.querySelector('.pop').className+=' pop_min';
//				popBox.open();
//			},500)
		}
		t.postspeech=function(){
			isFun($[3],data)
		}
		t.speechDo=function(posts){
			var a=setAjax('post',HOST.HJGY+'/actions/posts/addposts3.do');
			a.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");}
			a.data='posts='+JSON.stringify(posts);
			a.callBack=function($data){
				var _data=JSON.parse($data);
				if(_data.status=='1')tishi(CONFIG.chars.hjgy.d,{time:2000});
				//isFun($[4],data)
				//setStorage("set","hjgy"+$orderId,1);
			};
			a.err=function(){}
			a.send();
			isFun($[4],data)
			setStorage("set","hjgy"+$orderId,1);
		}
		t.getKaquan=function(){
			if(setStorage("get",$orderId)==="1"){
				tishi(CONFIG.chars.linjiang.d)
				return false;
			}
			var fun=data.card_status!=1?kaquan:function(){
				setJsonp("//yaotv.qq.com/shake_tv/include/js/jsapi_card.js",function(){
					window.getKQ=function($data){
					var data=toObject($data);
						if(data.errorcode == 0){
							data=data.data;
							if(data.cur_result){ 
								if(data.prize_type==1)							
								shaketv.card({cardList:[data.cur_result.prize_detail]},function(d){									
									if(d.errorCode == 0){
										toview(t.box);
									} else {
										mzjImg()
									}
								});
								else
								kaquan(data.cur_result.prize_detail)
							} else {
								mzjImg()
							}
						} else {
							mzjImg()
						}
					}
					if(mainVar.cbKey=setStorage("get","cbKey"))
					setJsonp("https://yao.qq.com/cgi-bin/component/lotteryextra/draw?callback=getKQ&batch_key="+$card_id+"&cb41faa22e731e9b="+mainVar.cbKey)
					else
					tishi("亲，只有对着电视摇一摇进来的用户才可以正常领取哦！",{time:1000})

				})
			}	
			fun();
			function mzjImg(){
				mainVar.loading.style.display="none";
					if(!mainVar.mzj){
					setStyle(".zoom{-webkit-animation:zoom 500ms forwards}@-webkit-keyframes zoom{0%{-webkit-transform:translate(-50%,-50%) scale(0)}60%{-webkit-transform:translate(-50%,-50%) scale(1.25)}100%{-webkit-transform:translate(-50%,-50%) scale(1)}}.mzjImg{position:fixed;z-index:5;top:50%;left:50%;width:70%;-webkit-transform:translate(-50%,-50%) scale(0)}")
					mainVar.mzj=1
					var mzjImg=createNode(DB,"img",{className:"mzjImg",src:PAGE.COMMON+"img/mzj.png"}),ac=function(){
							delEvent(mzjImg,"touchstart",ac)
							removeNode(mzjImg)						
						var user=mainVar.userInfo,ajax=setAjax('get',HOST.CJ+"/open/syslottery/user/again/result?lotteryid="
							+mainVar.prizeData.lotteryId+"&yyyappId="+PAGE.yyyappid+"&orderId="+mainVar.prizeData.orderId
							+"&code="+user.sig
							+"&openId="+user.openid
							+"&sigExpire="+user.sigExpire
							+"&icon="+user.headimg
							+"&name="+user.nickname
							+"&sex="+user.sex
							+"&country="+user.country
							+"&province="+user.province
							+"&city="+user.city);		
							ajax.callBack=b;
							ajax.err=function(){b({status:0})};
							ajax.send();
						
						function b($data){
							var data=toObject($data)
							if(data.status=="success"){
								data=data.data
								if(data.userGainPrize){
									goto(data.userGainPrize.link)
									}
								}else{								
									mainVar.ele.svgBody.firstChild.innerHTML=createContent({type:0,kind:2})
									}
							}	
						}
					addEvent(mzjImg,"touchstart",ac)
					setTimeout(function(){mzjImg.classList.add("zoom")},500)
					}
				}
			function kaquan($cid){
				var card=$cid||$card_id,ajaxdata="id="+$orderId+"&sig="+user.sig+"&openId="+user.openid+"&card_id="+card+"&url="+location.href.split('#')[0]+"&code="+sigCode+"&yyyappId="+PAGE.yyyappid;
				mainVar.loading.style.display="block";
				var ajax=setAjax('post',HOST.YAO+'/open/card/jssdk/param');
					ajax.data=ajaxdata;
					//ajax.set=function(){this.setRequestHeader("Content-type","application/json; charset=UTF-8; text/html");}
					ajax.err=function(){tishi("领取卡券出了错，xd-110")}
					ajax.callBack=parseData
					function parseData($data){
					var _data=toObject($data),data=_data.data;
					if(_data.status == 'success'){
						function ac(){
							wx.config({
								debug:0,
								appId:data.jsParam.appId,
								timestamp:data.jsParam.timestamp,
								nonceStr:data.jsParam.noncestr,
								signature:data.jsParam.signature,
								jsApiList:["addCard"]
							});
							wx.ready(function(){		
								mainVar.loading.style.display="none";
									wx.addCard({
										cardList:[{
											cardId:card,  
											cardExt:_data.data.cardExt
										}],
										fail:function (res){
											var list=res.cardList;
											if(!list)mzjImg()
												else if(!list[0])mzjImg()
													if(!list[0].cardId)mzjImg()	
													else tishi("您的卡券已经领取")											
										},
										success:function(res){
											if(res.errMsg==="addCard:ok"){
												t.savahongbao($orderId,'');
												setStorage("set",$orderId,1);
												toview(t.box);
												isFun($[2])				
											}	
										}
									});							
								tjData["timu"]=album_list(101)
								tjData["content_id"]=rate
								tjData["appName"]="抽奖页"
								TJ(101000)
								})
							}							
							if(!window.wx)setJsonp(HOST.WXAPI,ac,DB)
							else ac()					
					}else{
						tishi(CONFIG.chars.linjiang.d)
						mainVar.loading.style.display="none";
					}	
				};
				ajax.err=function(){
					tishi(CONFIG.chars.linjiang.e,{time:5000})
					mainVar.loading.style.display="none";
				}
				ajax.send();
				}
		}
		t.getHongbao=function(){
			var c=setAjax('post',HOST.CJ +'/open/hongbao/js/param'),user=mainVar.userInfo;
			c.data=JSON.stringify({id:$wxRedLotteryId,code:user.sig,openId:user.openid,sigExpire:+user.sigExpire,yyyappId:PAGE.yyyappid,dingdanid:$orderId,ico:user.headimg,name:user.nickname,sex:user.sex,country:user.country,province:user.province,city:user.city});	
			c.set=function(){this.setRequestHeader("Content-type","application/json")}
			c.callBack=function($data){
				var _data=toObject($data);											
				if(_data.status=='success'){
					mainVar.hongbao=_data.data;					
					t.linghongbao();						
				}else{
					tishi(_data.errMsg);
				}
			};
			c.err=function(){mzj()}
			c.send();
		}
		t.linghongbao=function(){
		//	var wechatInfo=UA.match(/MicroMessenger\/([\d\.]+)/i);
		//	if(!wechatInfo){
		//		tishi(CONFIG.chars.tishi.c) ;
		//	}else{
				setJsonp(HOST.QQHB,function(){	
					t.postHB();
				},DB)
		//	}
		//	if(t.box.getAttribute("data")=='1')t.box.setAttribute("action","lgj");
		}
		t.postHB=function(){
			shaketv.hongbao({
				userid:mainVar.hongbao.userid,
				lottery_id:mainVar.hongbao.lottery_id,
				noncestr:mainVar.hongbao.noncestr,
				sign:mainVar.hongbao.sign
			},function(d){
				var code=Number(d.errorCode),fun;
				switch(code){					
					case 0:
						setStorage("set","hjgy"+$orderId,1);
						isFun($[1])
						toview(t.box);
					break
					default:						
						fun=function(){
							t.hongbaoErr();//红包领取失败
						}
					break
				}
				t.savahongbao($orderId,code,fun);
			})
		}
		t.hongbaoErr=function(){
			goto(HOST.CJ+'/open/auth/wxred/send?id='+$orderId+'&wxRedLotteryId='+$wxRedLotteryId+'&openId='+user.openid+'&code='+user.sig+'&sigExpire='+user.sigExpire+'&yyyappId='+PAGE.yyyappid)
		}
		t.savahongbao=function($orderId,code,fun){
			var c=setAjax('post',HOST.CJ +'/open/order/user/prize/state'),user=mainVar.userInfo;								
			c.data=JSON.stringify({orderId:$orderId,wxRedResultCode:code,openId:user.openid,code:user.code,sigExpire:+user.sigExpire,yyyappId:PAGE.yyyappid,ico:user.headimg,name:user.nickname,sex:user.sex,country:user.country,province:user.province,city:user.city});
			c.set=function(){this.setRequestHeader("Content-type","application/json; charset=UTF-8; text/html");}
			c.callBack=function($data){
				isFun(fun);
			}
			c.send();
		}
		t.form=function(){
			var dizhi=setStorage("get","dizhi"+$orderId),sp,$_,newinfo,_,btnh='',ph,zbox,username='',userphone='',useradd='',$a=mainVar.getUsers,userNum,Read,cansave;
			if(!mainVar.globalVar){
				zbox=lingjiang.box.parentNode;
				ph=zbox.querySelector('.p');
				if(dizhi && t.box.tagName=="DIV"){
					tishi(CONFIG.chars.linjiang.d);
					return
					dizhi=eval("("+dizhi+")")
				}
				sp=data.name||mainVar.prizeData.prize_name;
			}else{
				sp=mainVar.prizeData.name||mainVar.prizeData.prize_name;
			};
			html='<h3 class="poptitle">'+CONFIG.chars.form.m+'</h3><ul class="labelbox"><li class="formtitle">奖品：'+sp+'</li>';
			if($a){
				var $a=$a.split('|');
				username=$a[0];
				userphone=$a[1];
				useradd=$a[2];
				userNum=1;
				cansave='';
			}else{
				username='';
				userphone='';
				useradd='';
				userNum=0;
				cansave='<label action="popSave" class="save">提交</label>';
			}
			if($receiveInfo){
				userNum=userNum+1;
				if(userNum==2){
					Read='ReadOnly="true"';
				}else{
					Read='';
				}
				useradd=$receiveInfo.address;
				username=$receiveInfo.name;
				userphone=$receiveInfo.phoneNum;
			}else{
				Read='';
				cansave='<label action="popSave" class="save">提交</label>';
			}
			
			html+='<li><font class="sx">姓名</font><textarea class="txts" rows="1" '+ Read +' id="username" placeholder="请输入姓名">'+username+'</textarea></li>'+
			'<li><font class="sx">手机号</font><textarea class="txts" rows="1" '+ Read +' id="telInput" placeholder="请输入手机号码">'+userphone+'</textarea></li>'+
			'<li><font class="sx">收货地址</font><textarea class="txts" rows="1" '+ Read +' id="address" placeholder="请输入详细地址">'+useradd+'</textarea></li>';
			btnh='<label action="popClose" class="close">取消</label>'+cansave+'</div>';
			html+='<li class="formts"><img src="'+PAGE.COMMON+'img/ts.png">'+CONFIG.chars.form.l+'</li></ul><div class="btn">'+btnh;
			popbox.querySelector('.pop').innerHTML=html;
			popBox.open()
			mainVar.newbg.style.cssText="z-index:999; display:block";
			userInfo.phone=userphone
		}
		t.popSave=function(){
			if(mainVar.fkey)return false;
			var mflag
				,obj={}
				,dizhi={}
				,_data=''
				,add=address.value
				,tel=telInput.value
				,name=username.value
				,user=mainVar.userInfo
				,regMobile=/^0?1[3|4|5|7|8][0-9]\d{8}$/; //手机;			
			if(!name){
				tishi("请输入姓名",{time:2000})
				return false
			}		
			mflag = regMobile.test(tel);
			if(!mflag){
				tishi(CONFIG.chars.form.a,{time:2000})
				return false
			}
			if(!add){
				tishi("请输入地址",{time:2000})
				return false
			}
			mainVar.fkey=true;
			username.blur();
			telInput.blur();
			address.blur();
			dizhi={"联系人":name,"联系电话":tel,"收货地址":add};
			_data=JSON.stringify({name:user.nickname,channelId:PAGE.channelId.toString(),icon:user.weixin_avatar_url,openId:user.openid,code:user.code,yyyappId:PAGE.yyyappId,sigExpire:user.sigExpire,orderId:mainVar.prizeData.orderId,receive:{name:name,phoneNum:tel,address:add}});
			var a=setAjax('post',HOST.CJ+'/open/order/update/address');
			a.data=_data;
			a.set=function(){this.setRequestHeader("Content-type","application/json; charset=UTF-8; text/html")}
			a.callBack=function($data){
				var data=toObject($data)
				mainVar.fkey=false;
				if(data.status == "success"){
					tishi(CONFIG.chars.form.k,{time:3000})
					setStorage("set","dizhi"+$orderId,JSON.stringify(dizhi));
					setStorage("set","hjgy"+$orderId,1);
					isFun($[0])
					toview(t.box);
					if(mainVar.newdata)mainVar.newdata.data[_b].receiveInfo=dizhi;
					var ajax=setAjax('post',HOST.MB+'/ufo/puserupdate?cache='+Math.random()+'&wx_token='+PAGE.yyyappid+'&openid='+user.openid+'&sign='+user.sig+'&code='+sigCode+'&type=2');
					ajax.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");}
					ajax.data='address[name]='+name+'&address[phone]='+tel+'&address[address]='+add;
					ajax.callBack=function(_data){
						mainVar.getUsers=name+'|'+tel+'|'+add;
					};							
					ajax.send();
					setTimeout(popBox.popClose(),3000)
				}else{
					tishi(CONFIG.chars.form.j,{time:3000})
				}
				userInfo.phone=tel
			};
			a.err=function(){mainVar.fkey=false;};
			a.send();
		}
		
	}

//我的奖品页面	
/*
*var newWins=new winList([function,function]);  实例我的奖品模块,一下注释取得的参数是obj
*obj[0]   请求奖品分类的接口，接口返回的数据data会返回到回调方法
*obj[1]   请求奖品列表的接口，接口返回的数据data会返回到回调方法
*obj[2]	  给load显示预留的，如有需要则传
*obj[3]	  给load隐藏预留的，如有需要则传
**/
	function winList(obj){
		var t=this;
		t.init=function(){
			var userInfo=mainVar.userInfo,ajax=setAjax('get',HOST.CJ+'/open/order/classification/count?cache='+Math.random()+'&openId='+userInfo.openid+'&code='+userInfo.sig+'&sigExpire='+userInfo.sigExpire+'&yyyappId='+PAGE.yyyappid);
			ajax.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");}
			ajax.callBack=function($data){
				var data=toObject($data);
				isFun(obj[0],data)
			};
			ajax.err=function(){
				isFun(obj[3])
			}							
			ajax.send();
		};
		t.listOne=function(a,b,c,d){var cs;
			if(a=="COINEXCHANGE")cs="&queryType=coinexchange";else cs='&queryType=prize&prizeType='+a;
			var userInfo=mainVar.userInfo,$='',ajax=setAjax('get',HOST.CJ+'/open/order/user/orders?cache='+Math.random()+'&yyyappId='+PAGE.yyyappid+'&openId='+userInfo.openid+'&code='+userInfo.sig+'&sigExpire='+userInfo.sigExpire+'&page='+c+'&pageSize='+d+cs);
			isFun(obj[2])
			ajax.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");}
			ajax.callBack=function($data){
				var data=toObject($data);
				if(data.statusCode===101){
					setTimeout(function(){codeyc()},3000);
					function codeyc(){
						var $c=setStorage("get","ticket");
						var aj=setAjax("get",HOST.YAO+"/api/yaozb/index?yyyappid="+PAGE.yyyappid+"&code="+$c+"&openid="+mainVar.userInfo.openid+"&action=setCode");
						aj.callBack=function($data){
							var data=toObject($data);
							mainVar.userInfo.sig=data.sig;
							setStorage("set","userInfo",JSON.stringify(mainVar.userInfo));
							t.listOne(a,b,0,30);
						};
						aj.send()
					}
					return
				}
				isFun(obj[3])
				isFun(obj[1],data,a,b,c,d)
			};
			ajax.err=function(){
				isFun(obj[3])
			}							
			ajax.send();
		};
	}
	
/**	手机验证；
*var Verifs=new saveVerif;  实例手机验证模块
*/
	function saveVerif(obj){
		if(!mainVar.VerifSty)setStyle("#Verification{background:rgba(255,255,255,.9); position:fixed; top:0; left:0; display:none; padding:16px 18px 8px; width:100%; box-sizing:border-box; z-index: 5000;}#Verification p{color:#a48952; padding:7px 12px; font-size:12px; line-height:22px; background:#fff5e1; border:1px solid #e3d5bb; border-radius:5px;}#Verification ul{padding-top:4px;}#Verification li{padding:4px 0; text-align:center;}#Verification li.test{padding-right:30%; position:relative;}#Verification li.test label{position:absolute; right:0; top:50%; height:40px; line-height:40px; -webkit-transform:translateY(-50%); font-size:14px; margin:0; width:27%;}#Verification li label{display:inline-block; font-size:18px; margin:0 5px; height:40px; line-height:40px; text-align:center; width:32%; color:#fff; background:#999999; border-radius:5px;}#Verification li input{box-sizing:border-box; width:100%; font-size:14px; outline:none; padding:12px 10px; border:1px solid rgba(200,200,200,.4); border-radius:5px;}#Verification li label.red{background:#50c260;}#Verification li.test label.red{background:#f39800;}#Verification.formdown,#Verification.formup{display:block;}");mainVar.VerifSty=true;
		var t=this;
		t.openform=function(){
			if(!mainVar.Verification)mainVar.Verification=createNode(DB,"div",{id:"Verification"},"p3");
			mainVar.Verification.innerHTML='<p>'+CONFIG.chars.form.o+'</p>'+
			'<ul>'+
				'<li><input class="tel" type="text" placeholder="输入手机号，领取奖品" oninput="Verifs.txts(this)"></li>'+
				'<li class="test"><input class="yzm" type="text" placeholder="验证码"><label onclick="Verifs.qyanzheng(this)">点击获取</label></li>'+
				'<li><label onclick="Verifs.closeVerif()">取消</label> <label onclick="Verifs.saveTheVerif(this)">确认</label></li>'+
			'</ul>';
			mainVar.Verification.className='gotbtime formdown';
		}
		t.qyanzheng=function(e){
			var $a=mainVar.Verification,b=$a.querySelector('.tel').title;
			if(e.className=='red'&&mainVar.Gttkey!=false){
				if(!b){
					tishi(CONFIG.chars.form.b,{time:2000});
					return false;
				}
				Verifs.saveVerif(e,b);
			}else tishi(CONFIG.chars.form.a,{time:2000});
		}
		t.saveTheVerif=function(ele){
			var a=mainVar.Verification,b=a.querySelector('.tel').title,c=a.querySelector('.yzm').value;
			if(b.length!=11){tishi(CONFIG.chars.form.a,{time:2000});
				return false;
			}
			if(!b){tishi(CONFIG.chars.form.b,{time:2000});
				return false;
			}
			if(!c){tishi(CONFIG.chars.form.c,{time:2000});
				return false;
			}
			if(ele.className=='red')Verifs.goVerif(b,c);
		}
		t.txts=function(e){
			var _=e.value
			,regBox={regMobile:/^0?1[3|4|5|7|8][0-9]\d{8}$/} //手机
			,mflag=regBox.regMobile.test(_)
			,btn=mainVar.Verification.querySelector('.test').querySelector('label')
			,btn1=mainVar.Verification.querySelectorAll('li')[2].querySelectorAll('label')[1];
			if(_.length>=11&&mflag==false){
				tishi(CONFIG.chars.tishi.f,{time:2000});
				Class('');
				return false;
			}else{
				e.title="";
				Class('');
			}
			if(mflag==true){
				e.title=_;
				Class('red');
			}
			function Class($){
				btn.className=$;
				btn1.className=$;
			}
		}
		t.closeVerif=function(){	//关闭弹层
			mainVar.Gttkey=true;
			clearInterval(mainVar.Gtt);
			mainVar.Verification.className="gotbtime formup";
			mainVar.Verification.querySelector('.tel').title='';
		}
		t.getTheTime=function(_,e){
			if(!Number(_))return false;
			mainVar.Gttkey=false;
			e.className='';
			e.innerHTML=_+' s';
			mainVar.Gtt=setInterval(function(){
				_--;
				e.innerHTML=_+' s';
				if(_<0){
					clearInterval(mainVar.Gtt);
					mainVar.Gttkey=true;
					e.innerHTML=CONFIG.chars.button.d;
					e.className='red';
				}
			},1000)
		}
		t.saveVerif=function(e,b){
			var a=setAjax('post',HOST.SJYZ+'/apis/sms/send'),userInfo=mainVar.userInfo;
			a.data="wx_token="+ PAGE.yyyappid+"&mobile="+b+"&openid="+userInfo.openid+"&code="+sigCode+"&sign="+userInfo.sig+"&sigExpire="+userInfo.sigExpire;			
			a.callBack=function($data){
				var data=toObject($data);
				if(data.result==true){
					tishi(CONFIG.chars.sjyz.a,{time:2000});
					t.getTheTime(60,e);
				}else{if(data.message)tishi(data.message+' 错误码：'+data.errorcode,{time:2000});
					/*if(data.errorcode){
						errorcode=Number(data.errorcode);
						t.errorDo(errorcode);
					}*/
				}
			};
			a.err=function(){tishi("网络超时，请稍后再试",{time:2000});}
			a.send();
		}
		t.goVerif=function(b,c){
			if(mainVar._biaokey==false) return false;
			mainVar._biaokey=false;
			var userInfo=mainVar.userInfo,a1=setAjax("get",HOST.SJYZ+"/apis/sms/checkverify?wx_token="+PAGE.yyyappid+"&mobile="+ b +"&openid="+ userInfo.openid +"&code="+ sigCode +"&sign="+ userInfo.sig +"&verify="+ c+"&sigExpire="+userInfo.sigExpire)
			a1.callBack=function($data){
				var data=toObject($data),errorcode;
				mainVar._biaokey=true;
				if(data.result==true){
					var $=mainVar.mywin,$_=mainVar.loading.style;
					Verifs.closeVerif();
					mainVar.mobile=b;
					setStorage("set","Verif",b+','+c);
					$_.display='block';
					setTimeout(function(){
						tishi(CONFIG.chars.form.d,{time:2000});
						lingjiang.init($.ele,$.a);
						$_.display='none';
					},1500)
				}else{if(data.message)tishi(data.message+' 错误码：'+data.errorcode,{time:2000});
					/*if(data.errorcode){
						errorcode=Number(data.errorcode);
						t.errorDo(errorcode)
					}*/
				}
			}
			a1.err=function(){tishi("网络超时，请稍后再试",{time:2000});}
			a1.send();
		}
		t.errorDo=function(_){
			switch(_){
				case -22:
					tishi(CONFIG.chars.form.e+' 错误码：'+_,{time:2000});
				break
				case -23:
					tishi(CONFIG.chars.form.f+' 错误码：'+_,{time:2000});
				break
				case -27:
					tishi(CONFIG.chars.form.g+' 错误码：'+_,{time:2000});
				break
				case -28:
					tishi(CONFIG.chars.form.h+' 错误码：'+_,{time:2000});
				break
				default:
					tishi(CONFIG.chars.form.i+' 错误码：'+_,{time:2000});
				break
			}
		}
	}
	
	
	function _mypaihang($){	//获取“今日排行、今日获得” $是回调方法；
		if(!mainVar._ranking){
			var user=mainVar.userInfo,a1=setAjax("get",HOST.CJ+"/coin/ranking?yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.headimg+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city);					
			a1.callBack=function($data){				
				var data=toObject($data);
				mainVar._ranking=data;
				getpaihang(data);
			};
			a1.err=function(){};
			a1.send();
		}else{
			getpaihang(mainVar._ranking);
		}
		function getpaihang(_){
			$(_);
		}
	}


	function mygodnum($,a){	//获取“累计金币、我的金币” $是回调方法；
		var e=Number(e);
		if(!mainVar.mygod){
			var a1=setAjax("get",HOST.MB+"/point/integral/query?wxToken="+PAGE.yyyappid+"&openId="+mainVar.userInfo.openid+"&ca="+new Date);					
			a1.callBack=function($data){	
				var data=toObject($data);
				mainVar.mygod=data;
				huoqugod(mainVar.mygod);
			};
			a1.err=function(){};
			a1.send();
		}else{
			huoqugod(mainVar.mygod);
		}
		
		function huoqugod(_){
			if(typeof $=="function")$(_);else{
				var _=_.data;
				a&&a(_.integral);
			}
		}
	}
	
//请求金币明细列表（加了分页效果）；_:放置列表的dom对象；b:请求接口的页码；c:每次请求接口返回的列表个数，第一次调用方法必传（会存放全局变量），程序中再调用个数一样可不传
	function JBlist(_,b,c,d,a){
		if(c)_c=mainVar.isKey=c;
	var html='',num=1,userInfo=mainVar.userInfo,str=mainVar.loading.style
	,a1=setAjax("get",HOST.MB +"/point/integral/log/query?wxToken="+PAGE.yyyappid+"&openId="+userInfo.openid+"&page="+b+"&pagecount="+_c+"&sort=dateTime&source=");
	str.display="block";
	a1.callBack=function($data){
		var data=toObject($data),l=data.data;
		if(l.length == 0){
			if(typeof a=="function")a();
			//if(_.innerHTML=='')html+='<li class="tmd"><img src="'+PAGE.FOLDER+'img/nogod.png">'+CONFIG.chars.units.l+'</li>';
		}else{
			if(mainVar.mxlb)html=mainVar.mxlb(l);
			if(d){d.setAttribute('onscroll','popBox.scrolldo(this)');mainVar.scrolldom=d;}
			if(b==1){
				_.innerHTML=html;
			}else{
				createNode(_,"ol",{html:html},"p3");
			}
		}
		if(l.length<_c) mainVar.scrollkey2=false;
		str.display="none";
	};
	a1.err=function(){str.display="none";if(typeof a=="function")a();};
	a1.send();
	}
	
//现金明细：
	function CashDetails(a,b,c){
		var userInfo=mainVar.userInfo,Ca=setAjax("get",HOST.CJ+"/open/user/vclogs?openId="+userInfo.openid+"&code="+userInfo.sig+"&yyyappId="+PAGE.yyyappid+'&sigExpire='+userInfo.sigExpire+'&channelid='+PAGE.channelId+"&page="+b+"&pageSize="+c+'&cache='+Math.random());
		Ca.callBack=function($data){
			var data=toObject($data);
			if(typeof a=="function")a(data);
		};
		Ca.err=function(){data={data:[]};if(typeof a=="function")a(data);};
		Ca.send();
	}
	//互动超时
	function gameOver(){
				var elem=mainVar.ele.contentBox;
				elem.className="contentBox contentInBox";
				elem.innerHTML='';
				nowinfun(2);
				mainVar.bird.talk({txt:CONFIG.chars.birdSay.e});
			}	
/**
*商品信息提示框
*/
	function closetab(fn){
		var _tctabname=mainVar._tctab;
		if(_tctabname.className=='tctab fadeIn boxtime') _tctabname.className='tctab fadeOut boxtime'; else _tctabname.className='tctab fadeOut boxtime zhuanpan';
		setTimeout(function(){
			mainVar._tctab.style.cssText='display:none;';
			setTimeout(function(){
				mainVar.newbg.style.cssText='display:none; z-index:999;';
				mainVar.newbg.className="newbg";
				_tctabname='tctab fadeOut boxtime';
				fn&&fn();
			},200)
		},400)
	}
	
	function tctab(a,b){
		if(!mainVar.tcSty)setStyle(".tctab{background:rgba(0,0,0,.7); padding:16px 17px 0; border-radius:15px; display:none; position:fixed; top:50%; left:50%; -webkit-transform:translateX(-50%) translateY(-50%); z-index:500;}.tctab li{color:#fff; margin-bottom:6px; font-size:16px; white-space:nowrap;}.tctab li.kmtt{padding-left:4px;}.tctab .btn{ position:initial; background:none; margin:-9px 0 0;}.tctab .btn label{background:#f26520; padding: 3px 14px 3px;}.tctab .btn.bt label{margin:0 10px;}.tctab .btn label.fc{background:#fff; color:#000;}");mainVar.tcSty=true;
		var _data,i,type;
		if(!mainVar._tctab){ mainVar._tctab=createNode(DB,"ul",{className:""},"p3"); }
		if(b != undefined){
			mainVar.newbg.className="newbg heise";
			mainVar._tctab.className="tctab fadeIn boxtime zhuanpan";
			var type=b;
			//新的弹层内容操作
		}else{
			mainVar._tctab.className='tctab fadeIn boxtime';
			var _data,i,type,$data;
			if(a.tagName == 'DIV'){
				_data=mainVar.newdata.data;
				i=+a.parentNode.title;
				$data=_data[i]
				type=$data.type;
			}else{
				$data=a;
				type=a.type||a.awardtype||a.prizeType;
			}
		}
		switch(type){
			case 1:
				var $=type.courier;
				/*if($ == -1){
					mainVar._tctab.innerHTML='<li>发货状态：未发货</li>'+
					'<li>预计时间：3个月之内发货</li>'+
					'<li class="btn"><label class="fc" action="closetab.,closetab">知道了</label></li>';
				}else{*/
					mainVar._tctab.innerHTML='<li>发货状态：已发货</li>'+
					'<li>物流品牌：'+$.name+'</li>'+
					'<li>物流单号：'+$.num+'</li>'+
					'<li class="btn"><label class="fc" action="closetab.,closetab">知道了</label></li>';
				//}
			break
			case 2:
				var $btn,_link=$data.link||$data.url||mainVar.prizeData.prizeInfo.url;
				if(_link){
					$btn='<label onclick=goto("'+_link+'")>领 奖</label>';
				}else{
					$btn=''
				};
				mainVar._tctab.innerHTML='<li class="kmtt">卡密：'+($data.shoppingCard||mainVar.prizeData.prizeInfo.shoppingCard)+'</li>'+
				'<li class="btn know"><label class="fc" action="closetab.,closetab">知道了</label> '+$btn+'</li>';
			break
			case 3:
				var $consume_url=$data.consume_url;
				if($consume_url)btns='<label action="goto.,'+$data.consume_url+'">去购买</label>';else btns='';
				mainVar._tctab.innerHTML='<li class="kmtt">恭喜您获得：'+(mainVar.adData.adpositions1?"":$data.name)+'</li>'+
				'<li class="btn bt"><label class="fc" action="closetab.,closetab">知道了</label> <label onclick="lingjiang.init(this)">领 奖</label>'+btns+'</li>';
			break
			case 101:
				tishi(CONFIG.chars.linjiang.g)
				return false;
			break
			case 102:case 108:
				tishi(CONFIG.chars.linjiang.f)
				return false;
			break
			case 0:
				mainVar._tctab.innerHTML='<img class="close" action="closetab.,closetab" src="'+PAGE.COMMON+'img/ntabclose.png">'+
				'<li><img src="'+PAGE.FOLDER+'img/prize1.png"></li>'+
				'<li class="gxn">恭喜您</li>'+
				'<li>中了蒙牛特仑苏牛奶一箱</li>'+
				'<li class="btn"><label class="fc" action="closetab.,closetab">点击领奖</label></li>';
			break
			default:
				return false;
			break
		}
		mainVar._tctab.style.display='block';
		mainVar.newbg.style.cssText="z-index:2000; display:block;"	
	}

function adCount(){
	var u=mainVar.userInfo,tiid=mainVar.mainData.time_interval_id,advertiserid="",urlSearch=mainVar.isShare||{};	
	window.getAD_display=function($data){
		if(mainVar.adData.dsp){mainVar.adData.display=2;return };
		var data=mainVar.config.adData||toObject($data)////
		if(data.errcode==0){
			var d=data.data,i;
			for(i in d)mainVar.adData[i]=d[i];
			if(mainVar.adData.adpositions1){
						mainVar.adData.bgAdImg=mainVar.adData.adpositions1.image;
						mainVar.adData.adpositions1.banner&&(mainVar.adData.banner=mainVar.adData.adpositions1.banner);	
				switch(mainVar.adData.type=mainVar.adData.adpositions1.type){
					case 1:
						mainVar.adData.adVideo=mainVar.adData.adpositions1.video;
					break
					case 2:
						mainVar.adData.adVideo=null;
						mainVar.adData.adAudio=mainVar.adData.adpositions1.audio;
						mainVar.adData.adImgs=mainVar.adData.adpositions1.group;
					break
				}
			}
			mainVar.adData.display=1
		}else{
			mainVar.adData.display=-1
			}
	}	
	if(urlSearch.advertiserid){advertiserid="&from=dsp&advertiserid="+urlSearch.advertiserid}
	setJsonp(HOST.DSP+'/show?openid='+u.openid+'&nickname='+u.nickname+'&sex='+u.sex+'&province='+u.province+'&city='+u.city+'&country='+u.country+'&mtid='+tiid+'&face='+encodeURIComponent(u.weixin_avatar_url)+'&callback=getAD_display&'+advertiserid);
	window.getAD_over=function(){}
	window.pushADCount=function(){
		setJsonp(HOST.DSP+'/card?openid='+u.openid+'&sharktimeid='+mainVar.adData.sharktimeid+'&version='+mainVar.adData.version+'&callback=getAD_over&phone='+(mainVar.userInfo.phone||""));
		}
	}
function getStep(v){
	var src=HOST.TJ+"/php/html/1.gif?insid=1&title_id="+(mainVar.prizeID||0)+"&step="+v+"&openid="+(mainVar.userInfo?mainVar.userInfo.openid:0)+"&ch="+Math.random()
		if(!window.tjimg)window.tjimg=createNode(DB,"img",{style:"display:none"},"p3");
		window.tjimg.src=src
	}
function InterTCs($){var t=this,now=new Date(),H=now.getHours(),M=now.getMinutes(),$t;
		if(H<10)H='0'+H;
		if(M<10)M='0'+M;
		$t=H+':'+M;
		if(!mainVar.Inter){
			var CSS='.Inter{position:fixed; top:0; left:0; display:none; width:100%; height:100%; background:rgba(0,0,0,.7); z-index:3000;}.Intertc{position:absolute; top:50%; left:50%;box-sizing:border-box; padding:10px 20px 20px; -webkit-transform:translateX(-50%) translateY(-50%); width:88%; background:#fff; border-radius:10px;}.Intertc>img{width:100%;}.Interhead{padding-bottom:5px; height:44px; line-height:44px;}.Interhead>img{width:44px; float:left; padding-right:5px; height:44px; border-radius:50%;}.Interhead>span{float:right; opacity:.4;}.tixing{font-size:15px; opacity:.6; line-height:22px; padding:4px 4px 10px;}.Interfooter{text-align:center;}.Interfooter label{border:1px solid #00b7ee; background:#00b7ee; color:#fff; border-radius:5px; font-size:15px; width:90px; display:inline-block; text-align:center; padding:4px;}.Interfooter label.fq{background:#fff; color:#00b7ee; margin-right:30px;}@-webkit-keyframes fadeIn {0% {opacity: 0;margin-top:-70px;}100% { opacity: 1;margin-top:0; }}@keyframes fadeIn {0% {opacity: 0;margin-top:-70px;}100% { opacity: 1;margin-top:0; }}.fadeIn {-webkit-animation-name: fadeIn; animation-name: fadeIn;}@-webkit-keyframes fadeOut {0% {opacity: 1;margin-top:0;} 100% { opacity: 0;margin-top:-70px;}}@keyframes fadeOut { 0% {opacity: 1;margin-top:0;} 100% {opacity: 0;margin-top:-70px;}}.fadeOut {-webkit-animation-name: fadeOut; animation-name: fadeOut;}.boxtime{-webkit-animation-duration: .4s;animation-duration: .4s;-webkit-animation-fill-mode: both;animation-fill-mode: both;}';
			setStyle(CSS);
			mainVar.Inter=createNode(DB,"div",{className:"Inter",html:'<div class="Intertc">'+
				'<div class="Interhead"><img src="'+(CONFIG.chars.Interaction.b||"//a.h5.mtq.tvm.cn/yao/btv7/img/Interaction.png")+'">'+CONFIG.chars.Interaction.a+'<span id="nowt">'+$t+'</span></div>'+
				'<img src="'+CONFIG.chars.Interaction.c+'" height="'+winW/2.5+'px">'+
				'<p class="tixing">'+CONFIG.chars.Interaction.d+'</p>'+
				'<div class="Interfooter"><label class="fq" onclick="InterTC.close()">'+CONFIG.chars.Interaction.e+'</label><label class="cy" onclick="InterTC.Inter()">'+CONFIG.chars.Interaction.f+'</label></div>'+
			'</div>'},"p3")
		}
		t.open=function(){
			mainVar.Inter.style.display="block";
			mainVar.Inter.querySelector('.Intertc').className+=' fadeIn boxtime';
		}
		t.close=function(){
			mainVar.Inter.querySelector('.Intertc').className+=' fadeOut boxtime';
			setTimeout(function(){mainVar.Inter.style.display="none";},400);
		}
		t.Inter=function(){t.close();
			if(typeof $=="function")setTimeout(function(){$();},400);
		}
	}
//ajax函数
function AjaxFn(json){
	var data=json.data||{};
	data.t=Math.random()+new Date().getTime();
	var arr=[];
	for(var i in data){
		arr.push(i+'='+encodeURIComponent(data[i]));
	};
	data=arr.join('&');
	var oAjax=window.XMLHttpRequest?new XMLHttpRequest():new activeXObject('MicorsoftXMLHTTP');
	var type=json.type||'get';
	switch(type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+data,true);
			oAjax.send();
		break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(data);
		break;
	};
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				json.success&&json.success(oAjax.responseText);
			}
			else{
				json.error&&json.error(oAjax.status)
			};
			clearTimeout(timer);
		};
	};
	if(json.timeout){
		var timer=setTimeout(function(){
			oAjax.abort();
			oAjax.onreadystatechange=null;
			json.error&&json.error(0);
		},json.timeout);
	};
};

//边看边聊导航栏跳转链接
function goUrl($){var h='';
	switch($){
		case "a":
			h="mywin.html?type=COUPONS&name=%E5%8D%A1%E5%88%B8&sigCode="+sigCode
		break
		case "b":
			h="coin.html"
		break
		case "c":
			h="http://yaotv.qq.com/shake_tv/shaketv_new/zip/24gyafa598o5s8uc8npkhk0/ylc.html?yyyappid="+PAGE.yyyappid
		break
		case "d":
			h="home.html"
		break
		case "home":
			h="home.html";
		break
		case "coin":
			h='coin.html'
		break
		case "share":
			h='share.html';
		break
		case "jbsc":
			h='coin.html'
		break
		case "rwzq":
			h=HOST.WSQCDN+'/wsqh5/dotask/index.html?yyyappid='+PAGE.yyyappid+'&openid='+mainVar.userInfo.openid+'&token='+PAGE.token+'&channelId='+PAGE.channelId
		break
		default:return false;break
	}
	goto(h);
}
	
//创建场景数据请求
	function createMain($opt){
		var a=setAjax('get',HOST.YAO+'/api/yaotv/index?action=yaocontrol&channelid='+PAGE.channelId+'&cache='+Math.random()),opt=$opt||{};		
		a.callBack=function($data){
			isFun($opt.fun,$data);
		}
		a.err=function(){
			isFun($opt.err)
			}
		a.send()
	}
	
//页面初始化	
	function instance($data){
		var data=toObject($data);
		clearTimeout(mainVar.times.modTime)
		if(data.appName!=""){
			parsePageData(data)
			}else{
			parsePageData(CONFIG.sceneData);
			}	
		}

//创建元素
	function modulesFun(){
		ExampleFun();
		//顶部宽高 750 124
		var t=this
			,headW=footW=winW
			,vH=winW*124/750 
			,headH=footH=winW/5
			,hdW=900*(winW/375)  
			,hdH=550*(winH/690)  
			,bottomH=vH+50 
			,mainBodyH=winH	
			//,aW=winW*.9,aH=aW*9/16
			,aW=winW,aH=aW*9/16
			,w=winW*1^0,h=w
			,otime=500			
			,radiusW=20
			,nRadius=yuanW=yuanH=w-80//弧
			//,nRadius=yuanW-radiusW*2	
			,mainBox=mainVar.ele.mainBox
			,mainBg=createNode(mainBox,"div",{className:"mainBg",style:"width:100%;height:100%;position:absolute;top:0;background-size:100% 100%;"},"p3")			
			,mainScroll=createNode(mainBox,"div",{className:"mainCont",style:"width:100%;height:"+(winH-80)+"px;background-size:100% 100%;position:absolute;top;0;z-index;3;overflow:auto;"},"p3")			
			,mainAdWrap=createNode(mainScroll,"div",{className:"mainAdWrap",style:"width:"+aW+"px;height:100%"},"p3")			
			,mainBody=createNode(mainScroll,"div",{className:"mainBody",style:"top:0;height:"+(mainBodyH-80)+"px;background-size:"+winW+"px "+winH+"px"},"p3")
			,mainHeader=createNode(mainBody,"div",{className:"mainHeader",style:"height:"+headH+"px"},"p3")
			,mainFooter=createNode(mainBody,"div",{className:"mainFooter",style:"height:"+footH+"px"},"p3")
			,mainYound=createNode(mainBox,"div",{className:"mainYound",style:"width:100%;height:"+hdH+"px;background-size:"+(winW+1)+"px "+winH+"px;"},"p3")
			,mainMask=createNode(mainBox,"div",{className:"mainMask",style:"width:"+hdW+"px;height:0;bottom:0;border:"+hdH+"px solid #fff;"},"p3")
			
			,svgBody=createNode(mainBox,"div",{className:"svgBody",style:"width:"+w+"px;height:"+h+"px"},"p3")
			,contentBox=createNode(svgBody,"div",{className:"contentBox",style:"width:"+nRadius+"px;height:"+nRadius+"px"},"p3")
			//,svgBox1=createNode(svgBody,"div",{className:"svgBox1",style:"width:"+yuanW+"px;height:"+yuanH+"px"},"p3")
			//,svgBox2=createNode(svgBody,"div",{className:"svgBox2",style:"width:"+yuanW+"px;height:"+yuanH+"px"},"p3")						
			,mainSty=svgBody.style
			
			,dropImg_r
			,dropImg_l
			,dropBg
			,svgBody
			,mainBoxSty=mainBox.style
			,mainAdWrapSty=mainAdWrap.style
			,mainBodySty=mainBody.style
			,mainHeadSty=mainHeader.style
			,mainYoundSty=mainYound.style
			,mainMaskSty=mainMask.style
			,_txtWrap
			,svg=document.createElementNS('http://www.w3.org/2000/svg',"svg")
			;	
			mainVar.newbg=createNode(DB,"div",{className:"newbg"},"p3");
			mainVar.loading=createNode(DB,"div",{className:"loading"},"p3");
			mainVar.Coin=createNode(DB,"div",{id:'Coin'},'p3');
			mainVar.img=createNode(DB,"img",{src:'',style:"display:none"},"p3")	;			
			mainVar.JBbox=createNode(DB,"div",{id:"JBbox"},"p3");
            createNode(DB,"img",{className:"",style:"position:fixed;width:100%;bottom:0;",src:PAGE.COMMON+"img/shadow_b.png"},"p3");		
			//svgBox1.appendChild(svg);			
			contentBox.height=nRadius
			mainVar.ele={
				mainBody:mainBody
				,mainBox:mainBox				
				,mainAdWrap:mainAdWrap
				,svgBody:svgBody
				,contentBox:contentBox
				,mainHeader:mainHeader
				,mainScroll:mainScroll
				,svgBody:svgBody
				,mainBg:mainBg
			}
			mainVar.dropImg_r1=null;				

//舞台模块===================================================== 
		t.main=function($data){
			var w=winW*0.8^0,h=w,otime=2000;
				function no(){
					setTimeout(function(){mainHeader.classList.remove("headAction")},1000)
					}				
				if($data.pageBg)mainBg.style.backgroundImage="url("+$data.pageBg+")";
				if(mainVar.adData.banner){
					mainHeadSty.backgroundImage="url("+mainVar.adData.banner+")";
					mainHeadSty.boxShadow="0px 2px 8px rgba(0,0,0,0.3)";
				var topBannerAdLink=trim(mainVar.sceneData.topBannerAdLink);
				if(topBannerAdLink!=""){mainHeader.setAttribute("action",'topBanner.,'+topBannerAdLink)}
				}								
				return{				
				open:function(){
					mainMaskSty.height=(winH*2)+"px";
					mainMaskSty.webkitTransition="all "+otime+"ms ease";										
					mainVar.M_opening=t.opening();
					if(mainVar.adData.banner)mainHeader.style.display="block";	
					setTimeout(function(){
						mainHeader.className=("mainHeader headUP");
						no();						
						mainVar.M_opening.run();
						if(mainVar.adData.type!=5 && mainVar.sceneData.appName !='NEWDATI'){
							mainVar.dropImg_r1=createNode(mainYound,"img",{src:PAGE.COMMON+"img/ico1.png",className:"dropImg_r",action:"drop.,sd.,sp",style:'display:none'})
							//mainHeader.setAttribute('action','drop.,sd.,sp');
							}
						},300)
				}
				,down:function($fun,$a,$b){
					if(mainVar.game.tp_marsk){mainVar.game.tp_marsk.style.opacity=0;}
					if(mainVar.contentDown)return;
					mainVar.contentDown=true;
					mainBodySty.webkitTransition="all 400ms ease";
					//mainVar.dropImg_r1&&(mainVar.dropImg_r1.style.webkitTransition="all 500ms ease");	
					if(mainVar.dropImg_r1 && !$a){mainVar.dropImg_r1.style.display='none';}
					setTimeout(function(){
						svgBody.className="svgBody down";
						mainAdWrapSty.display="block";
						DB.style.height=winH+"px";
					//	mainVar.banquan&&DB.appendChild(mainVar.banquan);
						mainHeader.className="mainHeader headDown";
						mainBodySty.webkitTransform="translate3d(0,120%,0)";
						typeOf($fun)==="function"&&$fun();
//			            if(!mainVar.spgg){
//							mainVar.spgg=createNode(mainAdWrap,"img",{className:"spgg",src:mainVar.adData.bgAdImg,style:'max-height:'+ winH +'px;'},"p2")
//						}						
							var CSS='.mainAdBox.chagngeDis{-webkit-animation:chagngeDis 1000ms forwards;}@-webkit-keyframes chagngeDis{0%{top:-20%;}60%{top:40%}100%{top:75px}}';
							setStyle(CSS)
							mainVar.ele.mainAdBox&&mainVar.ele.mainAdBox.classList.add("chagngeDis");
						if($a){
							if(mainVar.dropImg_r1){
								mainVar.dropImg_r1.setAttribute("action","mainUP");
								mainVar.dropImg_r1.setAttribute("src",PAGE.COMMON+"img/ico2.png");}
							//if(mainVar.spgg)mainVar.spgg.setAttribute('action',"mainUP");
							dropImg_r=createNode(mainAdWrap,"img",{className:"dropImg_r up",src:PAGE.COMMON+"img/ico2.png",style:"display:none;",action:"mainUP"},"p2");
							dropImg_l=createNode(mainAdWrap,"img",{className:"dropImg_l up",src:PAGE.COMMON+"img/ico1.png",action:"mainUP"},"p1");
							dropBg=createNode(mainAdWrap,"div",{className:"dropBg",action:"mainUP"},"p1");
							setTimeout(function(){
								var dropImgsty=dropImg_r.style;
								dropImgsty.cssText="display:block;bottom:"+ winH +"px";
								setTimeout(function(){dropImg_r.style.cssText="bottom:"+ (winH-90) +"px";setTimeout(function(){dropImg_r.style.cssText="bottom:"+ (winH-50) +"px";},200)},200)
								},100)
							}else{
								//if(mainVar.spgg)mainVar.spgg.setAttribute('action',"");
								if(balanceSwitch==1){MODULE.CASTBALANCE({container:mainAdWrap,bottomHeight:95,voiceBand:PAGE.COMMON+"media/e.mp3",time:gameTime_over})};
								if(fujia==1){
									MODULE.CASTCOIN({container:mainAdWrap,bottomHeight:95,voiceBand:PAGE.COMMON+"media/d.mp3",time:gameTime_over})
								}else{
									tishi(CONFIG.chars.tishi.b)
									mainVar.warter.set();
								};
							};
							mainVar.ele.mainBg.style.display='none'
							mainVar.ele.mainBox.style.backgroundImage="url("+mainVar.adData.bgAdImg+")"
						if(mainVar.adData.type==5&&mainVar.video){
							setJsonp("//s0.2mdn.net/instream/html5/ima3.js",function(){
								setJsonp(PAGE.COMMON+"jc/videoAds.js",function(){
									var box=mainVar.video.previousSibling,vw=box.offsetWidth,vh=box.offsetHeight;
									mainVar.GVAD=new Application({ele:mainVar.video,token:PAGE.token,adcontainer:box,width:vw,height:vh});
									mainVar.GVAD.onClick_()
									})
								})	
							}							
					},400)
						if(mainVar.game.result){
							tjData["appName"]="广告页面";											 		  
							TJ(100000)
							var user=mainVar.userInfo,a=setAjax("GET",HOST.CJ+"/open/ad/uv?lotteryid="+mainVar.prizeID+"&yyyappId="+PAGE.yyyappid+"&code="+user.sig+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.headimg+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city)	
							a.send()
						}
					}
				,up:function($fun,$a){
					setTimeout(function(){
					if(mainVar.dropImg_r1){mainVar.dropImg_r1.setAttribute("action","drop.,sd.,sp");mainVar.dropImg_r1.setAttribute("src",PAGE.COMMON+"img/ico1.png");}
					mainHeader.className=("mainHeader headUP");
					mainBodySty.webkitTransform="translate3d(0,0,0)";
					mainBodySty.webkitTransition="all 500ms ease";
					if(mainVar.game.tp_marsk){mainVar.game.tp_marsk.style.opacity=1;}
					if(mainVar.video){
						mainVar.video.pause();
						mainVar.video=null;
						mainVar.ele.mainAdBox.innerHTML="";
						}						
					setTimeout(function(){
						if(mainVar.game.xuanze){
							//离开互动了
							mainVar.ele.mainBg&&removeNode(mainVar.ele.mainBg);
						}else{
							//还在互动页or超时页
							mainVar.ele.mainBox.style.backgroundImage='none';
							if(mainVar.ele.mainBg){mainVar.ele.mainBg.style.display='block'};
						};
						mainAdWrapSty.display="none";
						typeOf($fun)==="function"&&$fun();
						if(dropImg_r){
							dropImg_r.parentNode.removeChild(dropImg_r);
							dropImg_l.parentNode.removeChild(dropImg_l);
							dropBg.parentNode.removeChild(dropBg);
							dropImg=null;
							svgBody.className="svgBody up";
							}
						mainVar.contentDown=0	
						},500)						
					no();	
					},400)
					}
				}
			}			
		t.opening=function(data){
			mainVar.game.xuanze=setStorage("get","xuanze"+gameTime)
			mainVar.game.daan=setStorage("get","daan"+gameTime)
			//	countAction({option:'pageCount',method:'accumulate',dom:svgBox2,type:"SCENE",counterName:'主页访问量',instanceId:PAGE.countInstanceid});
					mainVar.warter=MODULE.WARTER({module:balanceSwitch})
				var type=mainVar.sceneData.appName;			
					tjData["appName"]=type;
						addEvent(DO,"WeixinJSBridgeReady",function(){
							if(mainVar.game.xuanze){
								videoPlay(mainVar.adData.adVideo)
								mainVar.video.play()
							}audioPlay(PAGE.mascot.sound.a)
						},false);		
				return{
					run:function(){				
							switch(type){
								case "DATI":case "DIANZAN":case"CAITU": case"DATI-4": case"TOUPIAO": case"NEWDATI":case "DIANJIJINRU":case "JINGCAI":case "DANXUAN":
								//倒计时结束
								if(gameTime_over<0){
									mainVar.bird.move({left:-10,top:winH-140,overFun:function(){								
										mainVar.bird.talk({txt:CONFIG.chars.birdSay.e});
										mainVar.M_mainBody.down()
										}
									})
								}else{															
									if(mainVar.game.xuanze){									
										setTimeout(function(){tishi("您已参与过互动",{time:3000})},1000)
										prizeInit()	
										videoPlay(mainVar.adData.adVideo)								
									}else{	
										var birdTop=winH-140;
										mainVar.bird.move({left:-10,top:birdTop,overFun:function(){
											 mainVar.bird.talk({txt:CONFIG.chars.birdSay.a})
											}
										})
										mainVar.module.display();
									}	
								}
								break
								default:
									mainVar.module.display(data);
									mainVar.bird.move({left:-10,top:winH-140,overFun:function(){
										mainVar.bird.talk({txt:CONFIG.chars.birdSay.f})
										}
									})	
								break
								}							
//							circle({
//								container:svgBox2,
//								str:CONFIG.chars.circle.a+CONFIG.chars.circle.b,
//								picName:PAGE.COMMON+'img/pack.png',
//								outBorderW:2,
//								inBorderW:2,
//								spaceing:21,
//								dis:180,
//								v_space:0
//							});							
							 setTimeout(function(){
								 mainBox.removeChild(mainMask);
								//var banquan=mainVar.sceneData.pageCopyright?mainVar.sceneData.pageCopyright:PAGE.banquan;
								if(mainVar.sceneData.appName=="NEWDATI" && mainVar.dxLen>4){var objB=mainBox;}else{var objB=DB;}
								//mainVar.banquan=createNode(objB,"div",{className:"banquan",style:"background-image:url("+mainVar.pageBg+")",html:"<img src='"+banquan+"' style='width:100%;display:block;'>"},"p3")
								 setGZ()
							 },1000)
						// mainVar.times.pageCount=setInterval(getPageCount,5000)						
					}					
				}
			}		
		/*圆圈顶部与底部半圆*/
		t.tcbox=function(options){
				var opt=options||{},box
				(!mainVar.tcbox) && (mainVar.tcbox=createNode(contentBox,"div",{className:"tcbox pulses actives"},"p3"));
				if(opt.type=="bottom"){
					(!mainVar.tcboxBottom)&& (mainVar.tcboxBottom=createNode(mainVar.tcbox,"div",{className:"tcBoxBottom playbtn",style:opt["style"]},"p3"));	
				    box=mainVar.tcboxBottom;
				}else{
				   (!mainVar.tcboxTop) && (mainVar.tcboxTop=createNode(mainVar.tcbox,"div",{className:"domtitle",style:opt["style"]},"p3"));	
				    box=mainVar.tcboxTop;
				}
				setAtt(box,"action",opt.action||'')
				box.innerHTML=opt.html||'';	
			}			
		t.mainBody=mainBody;
		t.mainBox=mainBox;
}		

/*撒金币*/		
	function zliuliang($data){
			var html='<div class="Win_Box" style="background:url('+$data.data.pic+') no-repeat;background-size:100% 100%; border:3px solid #37a5e4"><label class="domtitle" style="background:#eeca25; padding:4% 0 4%;font-weight:100; font-size:24px;">中奖通知</label><label style="background:#50c260" class="playbtn" action="lingjiang">点击领奖</label></div>'
			mainVar.bird.sayStr=birdSay.a+"";
			contentBox.innerHTML=html
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
				case "rectangle_getGold":
					isFun(mainVar.animation);
				break;
				case "getGold":
					mainVar.skip();
				break;
				case "ylj":
					tishi(CONFIG.chars.linjiang.d);
				break;
				case "mainUP":
					mainVar.M_mainBody.up(null,1)					
					if(mainVar.msgInputBox != undefined) mainVar.msgInputBox.style.cssText='z-index:20';
					mainVar.video&&mainVar.video.parentNode.classList.remove('display');
				break
				case "drop":
					mainVar.M_mainBody.down(null,a1,argument[2]);				
					if(mainVar.msgInputBox != undefined) mainVar.msgInputBox.style.cssText='z-index:-1';
					mainVar.video!==0&&videoPlay(mainVar.adData.adVideo)
				break
				case "goto":
					goto(a1,argument[2])
				break
				case "lingjiang":
					mainVar.globalVar=false;
					lingjiang.init(ele,1);
				break
				case "dati":
					mainVar.module.run(ele,a1,argument[2],argument[3]);
					proevent();
					mainVar.video!==0&&videoPlay(mainVar.adData.adVideo)
				break				
				case "dati-4":
					mainVar.module.run(ele,a1,argument[2]);
					proevent();
					mainVar.video!==0&&videoPlay(mainVar.adData.adVideo)
				break				
				case "dianzan":
					mainVar.module.run();
					proevent();
				break
				case "toupiao":
					mainVar.module.run(ele,a1);
					proevent();
					mainVar.video!==0&&videoPlay(mainVar.adData.adVideo);
				break
				case "toupiao_opt":
					mainVar.module.selection(ele,a1,argument[2],argument[3])
				break
				case "jingcai":
					mainVar.module.run(ele,a1,argument[2]);
					proevent();
					mainVar.video!==0&&videoPlay(mainVar.adData.adVideo);
				break
				case "jingcai_opt":
					mainVar.module.selection(ele,a1,argument[2],argument[3],argument[4])
				break
				case "gotoLink":
					gotoLink()
				break
				case "birdMove":
					mainVar.bird.move()				
				break
				case "playagin":
					playagin(ele);
				break
				case "popClose":
					popBox.popClose();
				break
				case "popSave":
					lingjiang.popSave();
				break
				case "rule":		
					mainVar.globalVar=false;
					rule(ele,a1,argument[2],argument[3]);
				break
				case "lgj":
					tishi(CONFIG.chars.linjiang.d)
				break
				case "sendMsg":
				    mainVar.module.setMsg()
				break
				case "faceActive":				    
					if(mainVar.module.faceDivShow){
						mainVar.module.faceHidd()
					}else{				
						mainVar.module.faceShow()
					}
				break
				case "isFace":
					mainVar.module.inputFace(ele)
				break
				case "closetab":
					closetab();
				break
				case "linghongbao":
					getHongbao(ele,a1,argument[2])
				break
				case "hjgy":
					mainVar.globalVar=false;
					hjgy(ele,a1,argument[2],argument[3],argument[4])
				break
				case "carUp":
					carUp(ele,a1,argument[2],argument[3]);
				break
				case "getKaquan":
					getKaquan(a1)
				break
				case "goplay":
					goplay(argument[2])
				break
				case "newzs":
					newzs();
				break
				case "hqWin":
					dataDo(mainVar.newdata);
				break
				case "btn_speech":
					//postspeech(argument[2],a1,argument[3],argument[4],argument[5],argument[6],argument[7])
					lingjiang.postspeech();
				break
				case "caitu_opt":
				mainVar.module.caitu_opt(ele,a1,argument[2],argument[3]);
				break
				case"caitu_asw":
				mainVar.module.caitu_asw(ele,a1,argument[2]);
				break
				case "video":
				 videoPlay()
				break
				case "JBclose":
					JBclose(ele);
				break
				case "previous":
					getWinlist();
				break
				case "tabOut":
					ele.style.cssText="display:none;";
				break
				case "listImg":
					mainVar.adImgShow.handle(e,ele,a1);
				break	
				case "newDati":
					mainVar.module.setPrize();
				break	
				case "dianjijinru":
					mainVar.module.run(ele);
				break	
				case "topBanner":
					goplay(argument[1]);
				break
				case "views":
					goto('home.html');
				break
			}
		}
	}			
	function goplay(c){
		location.href=c;
	}
	function proevent(){if(mainVar.dropImg_r1){mainVar.dropImg_r1.setAttribute('action','');}}
	
	function newzs(){
		mainVar.Coin.className='newCoin newc';
		mainVar.Coin.innerHTML='<div id="Coinbox" class="redBox bounceIn animated">'+
			'<div class="redBoxTop" id="redBoxTop">'+
				'<p class="Company"><img style="width:40px; height:40px; border-radius:50%;" src="'+ mainVar._data.data.result[0].users[0].icon +'"></p>'+
				'<p class="Blessing">'+ mainVar._data.data.result[0].users[0].name +'</p>'+
				'<label action="carUp.,carUp">知道了</label>'+
			'</div>'+
		'</div>';
		mainVar.Coin.style.display="block";
	}
	
	function rule(ele,a,$item,$now){		
		var html="";
		var ruleImg= mainVar.sceneData.activity||PAGE.FOLDER+"img/rule.png";
		switch(a){
			case "rule":
				html='<h3 class="poptitle">活动规则</h3>'+
				'<ul class="labelbox">'+
				'<img src="'+ruleImg+'" class="ruleapg">'+
				'</ul>'+
				'<div class="btn">'+
					'<label action="popClose" class="close">知道了</label>'+
				'</div>';
				popbox.querySelector('.pop').innerHTML=html;
				popBox.open();
				mainVar.newbg.style.cssText="z-index:999; display:block;";
			break
			case "win":	
				var _loadstr=mainVar.loading.style;
				mainVar._ele=ele;
				mainVar.nums=30;
				getWinlist(0,mainVar.nums);
				_loadstr.display="block";
			break
		}
	}
	
	function ExampleFun(){
		lingjiang=new lingjiangs([undefined,undefined,function(){
			if(lingjiang.box.tagName == "DIV"){
				var i=Number(lingjiang.box.parentNode.title),
					li=DB.querySelectorAll('#tags2')[i],
					_span=li.querySelector('.btt'),
					_data=mainVar.newdata.data[i];
				li.className+=' wxstate';
				_span.innerHTML='已领取';
				_data.wxstate=1;
				_span.setAttribute('onclick','tctab(this)');
			}
		}
		,function(data){
			$typ=Number(data.type);
			var content=trim(document.getElementById("textarea").value),vl=content.length,dj,getsearch
			,$name=data.name
			,$rate=data.rate
			,$orderId=data.orderId
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
				if($typ==102||$typ==108){
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
						if(($typ==102&&mainVar.$isT!=1)||($typ==108&&mainVar.$isT!=1)){mainVar.shoppn='';mainVar.shoppt='';}
					}else dj=1;
				}
				switch($typ){
					case 102:case 1:
						if($typ==102)$sw="a";
					break
					case 2:
						if(mainVar.globalVar){
							if(mainVar.prizeData.link){
								setTimeout(function(){goto(mainVar._urls)},1000);
							}else{
								var goldCoinCon=document.querySelector('.goldCoinCon');
								var h=goldCoinCon.clientHeight
								goldCoinCon.innerHTML='';
								goldCoinCon.innerHTML='<p style="line-height:'+h+'px;color:#fff;text-align:center">卡密：'+mainVar.prizeData.shoppingCard+'</p>'
							};
						}else{
							if(mainVar._urls)setTimeout(function(){goto(mainVar._urls)},1000);
						};
					break;
					case 101:
						$sw="a";
						lingjiang.getKaquan();
					break
					default:
						if(mainVar._urls)setTimeout(function(){goto(mainVar._urls)},1000);
					break
				}
				mainVar.$sw=$sw;
				var posts={intolotterylist:dj,orderid:$orderId,yyyappid:PAGE.yyyappid,CommodityName:mainVar.shoppn,CommodityType:mainVar.shoppt,shareurl:mainVar.newlink,desc:desc,token:PAGE.token,topicid:PAGE.topicid,openid:user.openid,nickname:user.nickname,headimg:user.weixin_avatar_url,content:content,paiTimeUnix:mainVar.paiTimeUnix||0};
				lingjiang.speechDo(posts);
			}else{
				tishi(CONFIG.chars.hjgy.f)	
			}
		}
		,function(data){
			$typ=data.type
			if($typ==102||$typ==1){
				//if(mainVar.$sw == "a"){
					lingjiang.getHongbao();
					//popBox.popClose();
					//}else lingjiang.form();
			}
			//if($typ==108){wallet(data.money);popBox.popClose();}
			//if($typ==101)if(mainVar.$sw == "a")popBox.popClose();
			tjHjgy=0;	
		}]);
		popBox=new popBoxs(function(e,v){
			var _nu=nu*mainVar.nums,loadstr=mainVar.loading.style,_id=e.id;
			e.scrollTop=v-3;
			if(loadstr.display != 'block' && nu>0){
				switch(_id){
					case "JBbobo":
						var _=e.querySelector('#JBbo');
						if(mainVar.scrollkey2 == false){
							tishi(CONFIG.chars.scroll.a);
							return false;
						}
						loadstr.display="block";
						JBlist(_,$nu)
						$nu++;
					break
					case "newsbox":
						var $a=mainVar.newscroll,$key=mainVar.newpan;
						if($key==false){
							tishi(CONFIG.chars.scroll.a);
							return false;
						}
						newWins.listOne($a[0],$a[1],$a[2]+1,$a[3]);
					break
				}
			}
		}
		,function(){
			mainVar.newdata={data:[]};
			mainVar.scrollkey=true;
			nu=1;
		});
	};
	function sendSokect(){
		if(+PAGE.pusher==1){
			PAGE.category=0;
			mainVar.cSocket=new setSocket({
				url:location.protocol+"//"+HOST.SOCKET+"/chat"
				,room:"create"+PAGE.token
				,category:PAGE.category
				,onmessage:function(data){}
				,onerr:function(){console.log('Socket错误')}
			});	
			if(setStorage("get",live_id))return;
			setStorage("set",live_id,1);
			mainVar.socketTxt='';
			setTimeout(function(){
			   if(!mainVar.socketType&&mainVar.openType)mainVar.cSocket.sendMsg(JSON.stringify(mainVar.socketTxt));
			},1000)
		}else{
			mainVar.cSocket={}
		};
	};
function loopImg($options){
	setStyle('#imgUl{position:absolute;left:50%;top:0;-webkit-transform:translateX(-50%);width:100%;height:100%;list-style:none}#imgUl li{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;overflow:hidden}#imgUl img{width:100%}#imgUl .te_show{display:block}#imgUl .te_hide{display:none}#imgUl .te_cur_l{-webkit-animation:te_cur_l .8s ease-in-out forwards}#imgUl .te_next_r{-webkit-animation:te_next_r .8s ease-in-out forwards}#imgUl .te_cur_r{-webkit-animation:te_cur_r .8s ease-in-out forwards}#imgUl .te_next_l{-webkit-animation:te_next_l .8s ease-in-out forwards}#imgUl .te_up{-webkit-animation:te_up .8s ease-in-out forwards}#imgUl .te_down{-webkit-animation:example4Front4 .8s ease-in-out forwards}@-webkit-keyframes te_cur_l{0%{-webkit-transform:translateX(0);z-index:3}50%{-webkit-transform:rotateZ(0) translateX(-50%);z-index:3}51%{z-index:1}100%{-webkit-transform:rotateZ(0) translateX(0);z-index:1}}@-webkit-keyframes te_next_r{0%{-webkit-transform:translateX(0);z-index:1}50%{-webkit-transform:rotateZ(0) translateX(50%);z-index:1}51%{z-index:3}100%{-webkit-transform:rotateZ(0) translateX(0);z-index:3}}@-webkit-keyframes te_cur_r{0%{-webkit-transform:translateX(0);z-index:3}50%{-webkit-transform:rotateZ(0) translateX(50%);z-index:3}51%{z-index:1}100%{-webkit-transform:rotateZ(0) translateX(0);z-index:1}}@-webkit-keyframes te_next_l{0%{-webkit-transform:translateX(0);z-index:1}50%{-webkit-transform:rotateZ(0) translateX(-50%);z-index:1}51%{z-index:3}100%{-webkit-transform:rotateZ(0) translateX(0);z-index:3}}.loopTxt{position:absolute;left:0;top:-30px;background:#fffa62;height:30px;line-height:30px;color:#b85909;padding:0 10px;box-sizing:border-box}.loopDiv{position:relative;margin:0 auto;height:100%;width:100%}.loopContent{width:100%;height:100%;overflow:hidden');
	var bool=true,state=false,direct,handle = {x: 0,y: 0,vx: 0,vy: 0},timer,timeOut,eles,theEle,nextEle,il,timerEnd,endType=true,lenght=0,imgUrl,listLen=0,zIndex=100,content,srcCont,loopObj=createNode($options.box,'div',{class:"loopDiv"});
	if($options.style){
		setAtt(loopObj,{style:$options.style})
	}
	$options.txt&&createNode(loopObj,'div',{class:"loopTxt",html:$options.txt});
	imgUrl=createNode(loopObj,'ul',{id:'imgUl'});
    var module={
		create:function(data){
			var arr=data,a,liHtml='';
			for(var i=0,len=arr.length;i<len;i++){
				a=arr[i],b=(listLen+i),d=zIndex-b,c=a.style;
				switch(a.tagName){
					case "iframe":
					content=setIframe();
					break
					default:
					content='<img src="'+a+'" alt="">';	
					break
				}
				createNode(imgUrl,'li',{action:"listImg.,"+(listLen+i),style:"z-index:"+d,class:b==0?"te_show":"te_hide",html:"<div class='loopContent' "+(c?"style='"+c+"'":"")+">"+content+"</div>"},"p3");
			};
		    eles=imgUl.children;listLen=eles.length;il=listLen-1;
			if($options.handle){
				addEvent(imgUl,"touchstart",docAction);
				addEvent(imgUl,"touchmove",docAction);
				addEvent(imgUl,"touchend",docAction);	
			}
		},
       run:function($i,direct){
		if(!bool){return false;}bool=false;
		clearTimeout(timer);
		timer=setInterval(function(){
		    if(il==0)return;
			theEle=eles[$i];
			if(direct=='right'){
				if($i>0){nextEle=eles[--$i];}else{nextEle=eles[$i=il];}
				theEle.className='te_cur_r';
				nextEle.className='te_next_l';	
			}else{
				 if($i<il){nextEle=eles[++$i];}else{nextEle=eles[$i=0];}
				theEle.className='te_cur_l';
				nextEle.className='te_next_r';	
			}
			setTimeout(function(){
				//theEle.className='te_hide';
				for(var i=0;i<listLen;i++){
					eles[i].className='te_hide';	
				}
			    nextEle.className='te_show';
				bool = true;
			},800);
		},$options.time||3000);
	  },
	  handle:function handleFun(e,ele,a1){
				var type=e.type;
				switch(type){
					case "touchstart":
						handleStart(e,ele);
					break;
					case "touchmove":
					   handleMove(e,ele,a1);
					break;
					case "touchend":
					   handleEnd(e,ele,a1);
					break ; 	
				}
			}
	}
       return module;
	   function handleStart(e,ele){
			noPop(e);
			clearTimeout(timeOut);
			clearInterval(timer);
			clearInterval(timerEnd);
			for(var i=0;i<=il;i++){
				eles[i].className='te_hide';
			}
			ele.className='te_show';
			handle.x = e.touches ? e.touches[0].pageX : e.pageX; 
		}
	   function handleMove(e,ele,$i){
			noPop(e);
			var x = e.touches ? e.touches[0].pageX : e.pageX;
			if($i<il){nextEle=eles[++$i];}else{nextEle=eles[$i=0];}
			handle.vx = Math.floor(x - handle.x) || 0;
			lenght=handle.vx/2;
		}
	   function handleEnd(e,ele,$i){
			noPop(e);
			if(lenght<0){
				direct='left';
			    if($i<il){nextEle=eles[++$i];}else{nextEle=eles[$i=0];}
				ele.className='te_cur_l';
				nextEle.className='te_next_r';	
			}else{direct='right';
				if($i>0){nextEle=eles[--$i];}else{nextEle=eles[$i=il];}
				ele.className='te_cur_r';
				nextEle.className='te_next_l';	
		    }
			timerEnd=setTimeout(function(){
				ele.className='te_hide';
			    nextEle.className='te_show';	
			},800);
			handle = {x: 0,y: 0,vx: 0,vy: 0};
			timeOut=setTimeout(function(){bool=true;mainVar.adImgShow.run($i,direct);},3000);
	   }
}
function pushAdData($typ,$prize){
	var card_id=$prize.card_id;
			if(card_id=="pnG3nsoZ-46ZPgFKUxJ5okqSlQAE"||card_id=="pSPKnwTPY8CeJxDfouRRjaw64LPE"||card_id=="pSg_xwA_eQuJoOwzUgYikXWUIajw"){
					createNode(DB,"img",{src:"http://e.cn.miaozhen.com/r/k=2013647&p=6yA4C&dx=0&rt=2&o=",style:"display:none"},"p3")
				}else if(mainVar.adData){
					if(mainVar.adData.card){
					var monitor=mainVar.adData.monitor
					if(monitor&&monitor!=""){
						createNode(DB,"img",{src:monitor,style:"display:none"},"p3")
						}
					}
				}else if(mainVar.monitorData){
						for(var i=0,d=mainVar.monitorData,t,il=d.length,m;i<il;i++){
							t=d[i];	
							if(t["p"+$prize.id])createNode(DB,"img",{src:t["p"+$prize.id],style:"display:none"},"p3");
							}
			 }
	}
function pushMonitor($data){
	if($data.length>0){
		var i=0,il=$data.length,_data,monitor,ele=createNode(DB,"div",{style:"display:none"},"p3"),o={};
		mainVar.monitorData=[];
		for(;i<il;i++){
			_data=$data[i];
			monitor=_data.monitor;
			if(monitor){
				if(monitor.type=="miaozhen"&&mainVar.mainData.content1.name!="社区"){
					if(!mainVar.miaozhen){mainVar.miaozhen=true;
						setJsonp("https://wxjs.miaozhen.com/wx.1.0.js",function(){
							_mwx=window._mwx||{};
							_mwx.siteId=+PAGE.channelId;
							_mwx.openId=mainVar.userInfo.openid;
							var _time='',date=new Date(mainVar.paiTimeUnix);
							_time=date.getFullYear()+gett(date.getMonth()+1)+gett(date.getDate())+gett(date.getHours())+gett(date.getMinutes())+gett(date.getSeconds());
							function gett(t){return (t<10?'0'+t:t)}
							_mz_set_utm(+_time);
							setInterval(function(){
								if(mainVar.mzArr.length){									
									isFun(mainVar.mzArr.shift())
								}
							},2000)							
						});
					}
				}else{
					if(monitor.open){
						createNode(ele,"img",{src:monitor.open.data,style:"display:none"},"p3")
					}
					if(monitor.index){
						createNode(ele,"img",{src:monitor.index.data,style:"display:none"},"p3")
					}
					if(monitor.get){
						o["p"+_data.prize_id]=monitor.get.data;
						mainVar.monitorData.push(o)
					}
				}	
			}
		}
	}
}
function toview($){
	if($.getAttribute('data')=='1'){
		$.setAttribute('action','views');
		var lab=$.querySelector('.bottom');
		if(lab!=null)lab.innerHTML="点击查看";
	}
}
function mz_tj($){mainVar.mzArr.push($);}
function isFun($fun){var a;
	return typeof($fun)==="function"?(a=[].slice.call(arguments),a.shift(),$fun.apply(null,a),$fun):function(){}
	}
function setIframe($opt){
	var d=$opt||{};
	return '<iframe src="'+(d.src||mainVar.adData.adContent)+'" frameborder="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" style="pointer-events:auto;margin:-100px 0 0 0;height:600px;width:100%"></iframe>'
	}
function changgeText(name){
	return name.replace(/微信红包/g,'现金红包');
};
//电子钱包，引用方法 wallet(100.00); 参数传钱的数目
function wallet($e){
	setStyle(".walletbox{width:100%;height:100%;position:fixed;top:0;left:0;background:#fff;z-index:1000000;}.wallettop{padding:0 0 30px;position:relative;}.wallettop img{width:100%;display:block;}.wallettop .users{width:80px;height:80px;position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);border-radius:50%;box-shadow:0 3px 1px rgba(0,0,0,.15);}.myname{text-align:center;font-size:12px;color:#b0b0b0;line-height:20px;padding:13px 0 0;font-family:'微软雅黑';}.myname .name{color:#000;font-size:16px;margin:0;}.sum{font-size:40px;font-family:'微软雅黑',arial;text-align:center;padding:14px 0 30px;}.sum font{font-size:12px;}.sum p{font-size:12px;color:#828ea6;margin:0;}.walbottom{text-align:center;padding:26px 0 20px;background:#f2f2f2;box-shadow:inset 0 1px 6px rgba(0,0,0,.1);}.walbottom label{width:80%;background:#298ddf;color:#fff;display:inline-block;padding:10px 0;border-radius:5px;box-shadow:0 2px 3px rgba(0,0,0,.3);margin-bottom:20px;}@-webkit-keyframes walletshow{0%{opacity:0;-webkit-transform: scale(.1);}100%{opacity:1;-webkit-transform: scale(1);}}@keyframes walletshow{0%{opacity:0;-webkit-transform: scale(.1);}100%{opacity:1;-webkit-transform: scale(1);}}.walletshow{-webkit-animation-name:walletshow;animation-name:walletshow;}.boxtime{-webkit-animation-duration: .4s;animation-duration: .4s;-webkit-animation-fill-mode: both;animation-fill-mode: both;}")
	var user=mainVar.userInfo,_;
	if(mainVar.prizeData){if(mainVar.prizeData.source=='turntable')_=$e.toFixed(2);else _=remoney();}else _=remoney();
	mainVar.wallet=createNode(DB,"div",{className:"walletbox walletshow boxtime",html:'<div class="wallettop">'+
		'<img src="'+PAGE.COMMON+'img/wallet_top.png">'+
		'<img class="users" src="'+getHead(user.weixin_avatar_url)+'/96">'+
	'</div>'+
	'<div class="myname">'+
		'<p class="name">'+decodeURIComponent(user.nickname)+'</p>恭喜获得余额红包'+
	'</div>'+
	'<div class="sum">'+_+' <font>元</font><p>已存入您的余额钱包</p></div>'+
	'<div class="walbottom"><label id="yuebtn">查看我的余额钱包</label><!--<br><label onclick=mainVar.wallet.locations("coin.html")>去返利商城逛逛</label>--></div>'},"p3");
	setTimeout(function(){yuebtn.setAttribute('onclick','goto("home.html")');},1200)
	function remoney(){return ($e/100).toFixed(2);}
}

//互动开奖容错页 or 第三方url跳转postcard:{e:奖品名称,...}
function nowinfun(e){
	var user=mainVar.userInfo,data='id=555eacab75188098ad000001&sex='+user.sex
		+'&user_name='+user.nickname
		+'&open_id='+user.openid
		+'&token='+PAGE.token
		+'&event_code='+100000
		+'&country='+user.country
		+'&province='+user.province
		+'&city='+user.city
		+"&page=系统抽奖"
		+"&title_id="+tjData.paiTimeUnix
		+"&master_id="+tjData.tvm_id
		+"&content="+(tjData.tvm_id||"")
		+"&channel_id="+PAGE.channelId,urls=HOST.TJ+"/ana?"+data+"&ch="+Math.random();
	if(typeof(e)=='object'){
		//goto(PAGE.COMMON+"postcard/index.html?data="+encodeURIComponent(urls)+"&name="+e.name);
		return e.link+"&data="+encodeURIComponent(urls)+"&name="+e.name;
	}
	switch(e){
		case 0:
			var str='';
			if(+joinHudong!=1&&+PAGE.hasJB!=0)str=','+CONFIG.chars.linjiang.l;
			e=CONFIG.chars.linjiang.k+mainVar.game.daan+str;
		break
		case 1:e=CONFIG.chars.linjiang.j;break
		case 2:e=CONFIG.chars.linjiang.i;break
	};
	goto(PAGE.COMMON+"googleAds/fault.html?token="+PAGE.token+"&channelName="+PAGE.channelName+"&channelId="+PAGE.channelId+"&openid_id="+mainVar.userInfo.openid+"&title_id="+mainVar.paiTimeUnix+"&bg="+encodeURIComponent(mainVar.pageBg)+"&e="+e+"&data="+encodeURIComponent(urls));
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
}
