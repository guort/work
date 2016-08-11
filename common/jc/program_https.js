function toSQ($fun){
	var userInfo=setStorage("get","userInfo"),overTime=+setStorage("get","overTime"),US=setStorage("get","US"),wxTime,off=false,uName="";
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
					userInfo={nickname:encodeURIComponent(data.nickname),weixin_avatar_url:encodeURIComponent(data.headimgurl),openid:data.openid,country:data.country,sig:data.sig,sigCode:sigCode,sex:data.sex,city:data.city,province:data.province,sigExpire:data.sigExpire};
					setStorage("set","userInfo",JSON.stringify(userInfo));
					setStorage("set","overTime",+new Date());
					mainVar.userInfo=userInfo;
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
			mainVar.userInfo={"city":"","nickname":uName,"ret":0,"openid":"the-user-is-xindong","resTime":1440228050,"country":"","sig":"b34463d4766f9de023f52a1d3a1ed611","status":"ok","errmsg":"","weixin_avatar_url":PAGE.errIco||"//a-h5.mtq.tvm.cn/yao/common/img/user.gif","sex":1,"province":"Beijing",sigCode:"61d81fabe7d6d2dc5357e04da16aafem"};
			tishi(uName+"正在进入",{time:3000});		
			to()
		}	
	function SQ(){	
		if(off)return;off=true;
		shaketv.authorize(PAGE.yyyappid,'userinfo',function($data){
			clearTimeout(time)
			if($data.errorCode===0){
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
								location.replace(PAGE.redirect)
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
		var time=setTimeout(function(){
			tishi("当前网络和微信通信异常<br>请更换网络重新进入",{time:10e9,style:"width:240px"})
			},5000)	
	}
	function to(){
		var url,user=userInfo;
			if(!!US){
				if(US.indexOf("?")===0)US=US.substr(1)
				if(US==="xdClear"){localStorage.clear();location.replace(PAGE.redirect);return}
				setStorage("remove","US")
				mainVar.isShare=getSearch2(US)||{};
				url=mainVar.isShare.url;
				if(url=="shequ"){
					mainVar.moduleName="SHEQU"
				}else if(url){					
				location.replace(url+(url.indexOf("?")>0?"&":"?")+"openId="+user.openid+"&nickname="+user.nickname+"&weixin_avatar_url="+user.weixin_avatar_url+"&sign="+user.sig+"&yyyappId="+PAGE.yyyappid+"&pageToken="+PAGE.hosturl+"&channelId="+PAGE.channelId+"&code="+sigCode+"&wxToken="+PAGE.token+"&sigExpire="+user.sigExpire);
				return
				}
			}
			isFun($fun)
		}	
	if(userInfo){
		mainVar.userInfo=toObject(userInfo)||{};
		if(mainVar.userInfo.sigExpire){
			curTime=+new Date();
				if(overTime){
					if(curTime-overTime>36e5){
						create();
					}else{
						var u=trim(decodeURIComponent(mainVar.userInfo.nickname));
						if(u==="未知用户"){
							create()
						}else{mainVar.status.txt("获取本地身份");
							sigCode=mainVar.userInfo.sigCode;
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
	//检查绑定关系API
	function getModule($data){
		var oneday=+localStorage.getItem('oneday'),locationStr=localStorage.getItem("location"),nowTime=+new Date();
			if(oneday){
				if(nowTime-oneday>1*864e5){
					check();
				}else{
					go()
					}
			}else{
				check();
			};
		function check(){
			var user=mainVar.userInfo,a=setAjax('get',HOST.RTS+"/check/check?yyyappid="+PAGE.yyyappid+"&yopenid="+user.openid+"&sigExpire="+user.sigExpire+"&yaoSig="+user.sig+"&cache="+Math.random());
				a.callBack=function($data){
					var data=toObject($data);
						mainVar.binding=data;
						data.mobile?mainVar.userInfo.phone=data.mobile:getPhone();
					if(data.openid){
							if(data.subscribe)
							localStorage.setItem('oneday',+new Date);
							localStorage.setItem('ttdsbid',user.ttdsbid=data.openid);
					}else{
						var _openid=search.openid,_sig=search.sig;
						if(_openid&&_sig){
							binding(_openid,_sig);
						}else{
						return location.href=HOST.AD+"/yyyoauth?wx_token=33580c57d3c86f07&yyyappid="+PAGE.yyyappid+"&yyycode="+sigCode+"&redirect_uri="+encodeURIComponent(location.href);
						};
					}
					go();localStorage.setItem('binding',JSON.stringify(data));				
				};
				a.err=go;
				a.send();
			}
			/*------绑定关系------*/
			function binding(_openid,_sig){
				var user=mainVar.userInfo,arg={
					yopenid:user.openid
					,yyyappid:PAGE.yyyappid
					,yaoSig:user.sig
					,sigExpire:user.sigExpire
					,wopenid:_openid
					,wxSig:_sig
				},a=setAjax("get",HOST.RTS+"/check/bind?"+jsonJoin(arg));
					a.callBack=function($data){
						var data=toObject($data);
						if(data.status){
							mainVar.binding=data;
							go();localStorage.setItem('binding',JSON.stringify(data));
						};
					};
					a.err=go;
					a.send()
					localStorage.setItem('ttdsbid',user.ttdsbid=_openid);
			};
		function go(){
			if(!!locationStr){
				mainVar.location=toObject(locationStr);
				mainVar.location.cache=1
				}
			pageInit($data);
			initWX("33580c57d3c86f07",location.href);
			if(!mainVar.userInfo.ttdsbid){
				mainVar.userInfo.ttdsbid=localStorage.getItem('ttdsbid')
				}
			if(!mainVar.binding){
				var s=localStorage.getItem('binding')
				if(s)mainVar.binding=toObject(s)
				else localStorage.removeItem('oneday')
				}
			}	
	};
//加载模块
function pageInit($data){
	var data=toObject($data)
	,type=data.type
	,theTime=formatTime("toUnix",new Date),hosts=data.hosts
	,ajaxTime=0;
	fujia=data.coinSwitch;
	balanceSwitch=data.balanceSwitch;	//balanceSwitch ==1 表示3.0开
	ylqSwitch=data.ylqSwitch;       //ylqSwitch == 1表示摇礼券开
	joinHudong=data.joinHudong;
	tjData["tvm_id"]=data.tvm_id;
	setStorage("set","tvm_id",data.tvm_id);
	setStorage("set","balanceSwitch",balanceSwitch);
	gameTime=data.countOverTime;			
	gameTime_next=data.nextCountdown;
	gameTime_over=data.countdown=Math.max(data.countdown,30);
	mainVar.prizeID=data.time_interval_id+data.paiTimeUnix;				
	mainVar.mainData=data;
	tjData["paiTimeUnix"]=data.paiTimeUnix;
	mainVar.paiTimeUnix=+data.paiTimeUnix;
	switch(type){
		case "module":
			var d=data.content1,id=d.instance_id;
			if(data.currentActivity===0){
				if(data.content1.name!="外链"){
					mainVar.baseNumP=data.userBase;
					mainVar.baseNumM=data.amountBase;						
					adCount(function(){loadModule({type:type,content:id})});
					return
				}
			}
			loadModule({type:type,content:id})
			tjData.insid=id
		break
		default:
			toPageErr(1)
		break
		}
	//加载模块
		function loadModule($data){
			mainVar.contentId=$data.content;
			var str=mainVar.contentId,sl=str.length
			,path1=str.substr(sl-2,1)
			,path2=str.substr(sl-1,1)
			setJsonp(HOST.APICDN+'/open/data/scene/'+path1+'/'+path2+'/'+str+'.js')
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
		case "SHEQU":case "ZHIBO":
			tosq(type)
		break
		case "TAG_CLOUD":
			mainVar.module=MODULE["TAG_CLOUD"].call(null,mainVar)
		break
		case "WAILIAN":
			if(mainVar.moduleName==="SHEQU"){
					tosq(mainVar.moduleName)
				}else{
					var u=trim(data.linkUrl);
					//tjData.appName=data.linkName	
					if(u.indexOf("inFrame")>-1){	
						createNode(mainVar.ele.mainBox,"div",{style:"position:relative;width:100%;height:"+winH+"px",html:'<iframe src="'+data.linkUrl+(data.linkUrl.indexOf("?")>0?"&":"?")+'nextCountdown='+mainData.nextCountdown+'&openId='+mainVar.userInfo.openid+'&sig='+mainVar.userInfo.openid+'&sigExpire='+mainVar.userInfo.sigExpire+'&yyyappId='+PAGE.yyyappid+'" frameborder="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="scroll" allowfullscreen="true" style="height:100%;width:100%"></iframe>'})
						mainVar.bird.hidd();
						TJ(131000,u,0,data.linkName);
						setGZ()			
					}else if(mainData.currentActivity===0||u.indexOf("fullScreen=1")>-1){				
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
				mainVar.adData.bgAdImg=data.bgAdImg;
				mainVar.adData.banner=data.topBannerAdImg			
			if(!mainVar.adData.adpositions1){
				mainVar.adData.adVideo=trim(data.adVideo)!=""?data.adVideo:null;
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
						mainVar.adData.adContent="https://a-h5.mtq.tvm.cn/yao/common/googleAds/index.html?token="+PAGE.token+"&channelName="+PAGE.channelName+"&channelId="+PAGE.channelId+"&openid_id="+mainVar.userInfo.openid+"&title_id="+mainVar.paiTimeUnix,
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
			mainVar.newlink=urlFolder()+"share.html?type=dajiang";
			PAGE.bangdan+="?openid="+ mainVar.userInfo.openid+"&avast="+mainVar.userInfo.weixin_avatar_url+"&nickname="+mainVar.userInfo.nickname;
			mainVar.M_mainBody=modules.main(data);
			setTimeout(function(){mainVar.M_mainBody.open()},100)
			throughTrain();
			break
		};
		if(type!=="SHEQU"){
			DO.title=data.pageTitle||data.linkName||"摇电视";
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
		var theUA=mainVar.isShare
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
		function tosq($n){
			mainVar.module=MODULE[$n].call(null,mainVar);
			mainVar.module.display(mainVar.ele.mainBox,mainVar.mainData.currentActivity?createBanner:function(){mainVar.bird.hidd();},function(){
				tishi("社区太火爆了，我们再试一次进入",{time:3000,fun:function(){
					location.reload()
					}})
				})
			setGZ()	
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
		var user=mainVar.userInfo,pos=mainVar.location,region=pos.region.split("-"),gps=pos.gps.split(","),data='id=555eacab75188098ad000001&sex='+user.sex
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
		+"&insid="+(tjData.insid||"err")
		+"&wx_country="+(region[0]||"")
		+"&wx_province="+(region[1]||"")
		+"&wx_city="+(region[2]||"")
		+"&wx_organization="+(region[3]||"")
		+"&wx_longitude="+(gps[0]||"")
		+"&wx_latitude="+(gps[1]||"")
		+"&wx_address="+(pos.address||"")	
		+"&flag="+(tjData.flag||0)	
		+"&spend="+(tjData.spend||'')
		+"&network="+mainVar.network
		+"&user_id="+user.ttdsbid
		+"&cache_label="+pos.cache;
		if(tjData.dsp)data+="&dsp="+(tjData.dsp|"0");
		if($m){
			location.replace("//rana.yaotv.tvm.cn/redirect?"+data+"&ch="+Math.random())
			}else{
		createNode(DB,"img",{src:HOST.TJ+"/ana?"+data+"&ch="+Math.random(),style:"display:none"},"p3")
			}
		setStorage("set","tjData",JSON.stringify(tjData))	
	}
function createBanner($opt){
	throughTrain();
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
	mainVar.bird.hidd();
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
		t.close=function(){so&&so.close()}
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
		var search,size,vw=winW,vh=vw/16*9,mtop=mainVar.adData.type==5?0:0
		mainVar.ele.mainAdBox=createNode(DB,"div",{className:"mainAdBox",style:"left:0;width:"+vw+"px;height:"+vh+"px;top:"+(1-vh-mtop)+"px;margin-top:"+mtop+"px;overflow:hidden"},"p3")
	};
	if(mainVar.adData.run)return false;
	if(mainVar.adData.type==1||mainVar.adData.type==2){
		if(mainVar.adData.type==2){
			carouselFn({"imgArr":mainVar.adData.adImgs,"aduio":trim(mainVar.adData.adAudio)});
		}else{
			videoFn(1);
		};
	}else{
		if(mainVar.adData.otherVideo){
			videoFn();
		}else if(mainVar.adData.otherAdImgs){
			carouselFn({"imgArr":mainVar.adData.otherAdImgs,"aduio":''});
		}else if(mainVar.adData.adVideo){
			videoFn();
		}else if(mainVar.adData.type==6){
			carouselFn({"imgArr":mainVar.adData.adImgs,"aduio":trim(mainVar.adData.adAudio)});
		};
	};
	//轮播图
	function carouselFn(options){
		mainVar.adData.run=1;
		mainVar.adImgShow=new loopImg({box:mainVar.ele.mainAdBox,handle:1});
		mainVar.adImgShow.create(options.imgArr);
		mainVar.adImgShow.run(0);
		options.aduio!=""&&audioPlay(options.aduio,1);	
	};
	//视频
	function videoFn(source){
		var mainAdBox=mainVar.ele.mainAdBox;
		mainAdBox.style.top="-320px";
		if(!mainVar.video){
			var v=createNode(mainAdBox,"video",{src:$u||PAGE.COMMON+"media/video.mp4",style:"margin:auto 50%;-webkit-transform:translate3d(-50%,0,0)",autoplay:"autoplay",loop:"loop","x-webkit-airplay":"allow","webkit-playsinline":"yes",height:"100%",action:"video"},"p3");	
				mainVar.video=v;
				if(mainVar.adData.type!=1&&mainVar.adData.otherVideo&&mainVar.sceneData.appName!=="DIANZAN"){
					if(mainVar.adData.otherVideoInfo){
						otherVideoReport();
					};
				};
				v.play();
				mainVar.ele.mainAdBox.style.background="#000";
				var adpositions1=mainVar.adData.adpositions1;
				if(adpositions1&&adpositions1.trackurl&&mainVar.adData.display==1){
					getTvme({
						callBack:function(){
							mainVar.tvmE.kaview(adpositions1.trackurl,function(){});
						}
					});
				};
		};
		var card=mainVar.adData.card;
		if(source==1&&!mainVar.onece&&card&&card.url){
			mainVar.onece=1
			mainAdBox.addEventListener('touchstart',dmpCollect,false);
		};
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
	};
};
//灵集的视频广告。
function otherVideo(url){
	var user=mainVar.userInfo,sex='',city='';
	if(user.sex==0){
		sex='女';
	}else if(user.sex==1){
		sex='男';
	}else{
		sex='未知';
	};
	var region=mainVar.location.region;
	if(region){
		var arr=region.split('-');
		city=encodeURIComponent(arr[2]);
	};
	url=url+(url.indexOf("?")>0?"&":"?");
	var a=setAjax("get",url+'ti='+encodeURIComponent(mainVar.sceneData.pageTitle)+'&openid='+user.openid+'&ct_name='+encodeURIComponent(PAGE.channelName)+'&sex='+encodeURIComponent(sex)+'&city='+city); 
	a.callBack=function($data){
		var data=toObject($data),videoSrc=data.src,videoTime=0,pm=null,time=0;
		if(videoSrc){
			mainVar.adData.otherVideoInfo={
				videoSrc:videoSrc,
				pm:data.pm,
				videoTime:data.meta.duration,
			};
			if(mainVar.adData.otherVideoSucc&&mainVar.video){
				otherVideoReport();
			};
		};
	};
	a.err=function(){};	
	a.send();
};
function otherVideoReport(){
	mainVar.adData.otherVideoSucc=false;
	var allInfo=mainVar.adData.otherVideoInfo,pm=allInfo.pm,videoTime=allInfo.videoTime,videoSrc=allInfo.videoSrc;
	mainVar.video.src=videoSrc;
	setTimeout(function(){
		if(mainVar.adData.adVideo){
			mainVar.video.src=mainVar.adData.adVideo;
		}else if(mainVar.adData.type==6){
			removeNode(mainVar.video);mainVar.video=null;
			mainVar.adData.otherVideo=false;
			videoPlay();
		}else{
			removeNode(mainVar.ele.mainAdBox);mainVar.ele.mainAdBox=null;
		};
	},videoTime*1000);
	for(attr in pm){
		if(!isNaN(attr)){
			(function(arr){
				setTimeout(function(){
					for(var i=0,len=arr.length;i<len;i++){
						createNode(DB,'img',{src:arr[i],style:"display:none"})
					};
				},attr*1000);
			})(pm[attr]);
		};
	};
};
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
		var data=toObject($data)
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
		mainVar.adData.adContent="https://a-h5.mtq.tvm.cn/yao/common/googleAds/index.html?token="+PAGE.token+"&channelName="+PAGE.channelName+"&channelId="+PAGE.channelId+"&openid_id="+mainVar.userInfo.openid+"&title_id="+mainVar.paiTimeUnix;
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
		},HOST.GOLDCOIN);
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
		var prize,_data=$data||{},ele=mainVar.ele,html="",time=0;
		if(mainVar.video){mainVar.video.pause();mainVar.video=0};
		ele.mainAdWrap&&(ele.mainAdWrap.style.display="none");
		ele.mainAdBox&&ele.mainAdBox.classList.add("hidd");
		//if(mainVar.adData.type===5)ele.svgBody.style.top="350px";
		var birdWrap=document.querySelector('.birdWrap');
		function fontSize(){DO.documentElement.style.fontSize=100*DO.documentElement.clientWidth/750+'px'};
		fontSize();
		setTimeout(function(){
			birdWrap.style.display='none';
			if(ele.mainAdBox){ele.mainAdBox.innerHTML="",removeNode(ele.mainAdBox),ele.mainAdBox=null};//删除视频
			clearAduio();
			if(_data.status==="success"){
				var data=_data.data,showPrizes=data.showPrizes,coinInfo=data.coinInfo,coinNum=mainVar.coinNum||0,thePrize=data.userGainPrize,inKind=data.inKind,bStop=true,curData=null,onOff=false,prizeArr=[],tj_type='',a_onOff=true,transparencyBg=null,todayUesrBalance=mainVar.todayUesrBalance,maxUesrBalance=mainVar.maxUesrBalance,upperLimitBalance=mainVar.upperLimitBalance,curUesrBalance=mainVar.curUesrBalance,perimeter=0;
				var elem=mainVar.ele.contentBox,html='',w=elem.style.width,h=elem.style.width,contentInBox=null,mainData=mainVar.mainData;
				removeNode(elem);
				mainVar.ele.contentBox=elem=null;
				setStorage("set","prizeData",JSON.stringify(data));
				/*------余额-----*/
				if(balanceSwitch&&todayUesrBalance!=undefined&&maxUesrBalance!=undefined){
						todayUesrBalance=(todayUesrBalance/100).toFixed(2);
						maxUesrBalance=(maxUesrBalance/100).toFixed(2);
						upperLimitBalance=(upperLimitBalance/100).toFixed(2);
						curUesrBalance=(curUesrBalance/100).toFixed(2);
						var _percentage=(todayUesrBalance/maxUesrBalance).toFixed(2),tipText='';
						if(_percentage>=1){   //100%
							tipText='<h2>超级赞！</h2><p>您的今日收入击败了<span>'+(_percentage*100).toFixed(0)+'%</span>的摇电视用户，<br>原来传说中的摇神就是您，继续保持啊~</p>';
						}else if(_percentage>=0.6&&_percentage<1){  //>60%<100%
							tipText='<h2>太棒了！</h2><p>您的今日收入击败了<span>'+(_percentage*100).toFixed(0)+'%</span>的摇电视用户，<br>距离今日收入冠军还差<span>'+(maxUesrBalance-todayUesrBalance).toFixed(2)+'</span>元，再接再厉噢~</p>';
						}else if(_percentage>=0.3&&_percentage<0.6){  //>30%<60%
							tipText='<h2>加油噢！</h2><p>您的今日收入击败了<span>'+(_percentage*100).toFixed(0)+'%</span>的摇电视用户，<br>距离今日收入冠军还差<span>'+(maxUesrBalance-todayUesrBalance).toFixed(2)+'</span>元，继续加油噢~</p>';
						}else if(_percentage>=0&&_percentage<0.3){  //0%-30%
							tipText='<h2>努力噢！</h2><p>您的今日收入击败了<span>'+(_percentage*100).toFixed(0)+'%</span>的摇电视用户，<br>距离今日收入冠军还差<span>'+(maxUesrBalance-todayUesrBalance).toFixed(2)+'</span>元，一直摇不要停~</p>';
						}
						transparencyBg=createNode(ele.mainBox,'div',{"style":"position:absolute;top:0;left:0;height:100%;width:100%;background-color:rgba(0,0,0,0.7);z-index:4;"});
						ele.svgBody.style.zIndex=5;
var css1='.myBalace{height:100%;width:100%;position:relative;}\
.myBalace .top{background-color:rgba(0,0,0,.7);background-image:url('+PAGE.COMMON+'img/shine.png);background-size:100% 100%;width:100%;height:100%;overflow:hidden;border-radius:50%;}\
.myBalace .content{color:#ffde26;position:absolute;top:50%;left:50%;-webkit-transform:translate3d(-50%,-50%,0);text-align:center;}\
.myBalace .text{font-size:.48rem;line-height:.54rem;height:.54rem;margin-bottom:.35rem;}\
.myBalace img{width:2.3rem;}\
.myBalace .con{position:relative;}\
.myBalace .con .money{font-size:.42rem;height:.68rem;line-height:.68rem;top:1.75rem;position:absolute;left:0;width:100%;-webkit-transform:translate3d(0,-50%,0);}\
.myBalace .con .money span{font-size:.68rem;}\
.balaceCon{width:100%;height:100%;position:relative;color:#ffde26;}\
.balaceChildCon{position:absolute;top:50%;left:50%;-webkit-transform:translate3d(-50%,-50%,0);}\
.balaceChildCon .con,.balaceChildCon svg{position:absolute;width:100%;height:100%;}\
.balaceChildCon .con{z-index:1;border-radius:50%;font-size:.48rem;height:0.48rem;line-heihgt:0.48rem;text-align:center;background-color:rgba(0,0,0,.7);background-image:url('+PAGE.COMMON+'img/shine.png);background-size:100% 100%;}\
.balaceChildCon svg{-webkit-transform: rotate(-90deg);}\
.balaceChildCon .con div{position:absolute;top:50%;left:50%;-webkit-transform:translate3d(-50%,-50%,0);width:100%;word-wrap:break-word;}\
.balaceChildCon .con p{margin-top:.3rem;width:100%;}\
.balaceChildCon .con .money{max-width:100%;font-size:1.1rem;display:inline-block;line-height:1.1rem;}\
.tipTextCon{color:#ffde26;text-align:center;position:absolute;left:50%;-webkit-transform:translate3d(-50%,0,0);}\
.tipTextCon p{font-size:.32rem;line-height:.48rem;}\
.tipTextCon h2{font-size:.48rem;font-weight:bold;line-height:0.8rem;height:0.8rem;margin:0;}\
.tipTextCon span{color:#fe0303;}';
setStyle(css1);
						/*第一个*/
						var fs=+todayUesrBalance>100?1:1.3,fs2=winW>375?1.5:1.2,str='<div class="myBalace">\
										<div class="top">\
											<div class="content">\
											<p class="text" style="font-size:'+fs2+'em">今日摇到余额</p>\
											<div class="con">\
												<img src="//a-h5.mtq.tvm.cn/yao/common/img/balance.jpg">\
												<p class="money"><span style="font-size:'+fs+'em">'+todayUesrBalance+'</span>元</p>\
											</div>\
										</div>\
									</div>\
									<div class="tipTextCon" style="width:'+ele.svgBody.offsetWidth+'px;top:'+(parseInt(w)+15)+'px;">'+tipText+'</div>\
								  </div>'
						var myBalace=createElem(str);
						myBalace.style.overflow="visible";
						/*第二个*/
						function createCon(options){
								var elem=document.createElement('div');
								elem.className='balaceCon';
								elem.setAttribute('data-svg','svg');
								elem.innerHTML='<div class="balaceChildCon" style="height:'+options.height+'px;width:'+options.width+'px;">\
													<div class="con" style="height:'+(options.height-2*options.strokeW)+'px;width:'+(options.width-2*options.strokeW)+'px;top:'+options.strokeW+'px;left:'+options.strokeW+'px;">\
														<div>\
															<span>您的余额</span>\
															<p><span class="money">0.00</span><span>元</span></p>\
														</div>\
												   </div>\
													<svg>\
													  <circle cx="'+options.x+'" cy="'+options.y+'" r="'+options.radius+'" stroke-width="'+options.strokeW+'" stroke="'+options.bottomColor+'" fill="none"></circle>\
													  <circle cx="'+options.x+'" cy="'+options.y+'" r="'+options.radius+'" stroke-width="'+options.strokeW+'" stroke="'+options.bottomColor+'" fill="none"></circle>\
												   </svg>\
												   <div class="tipTextCon" style="width:'+ele.svgBody.offsetWidth+'px;top:'+(parseInt(options.height)+15)+'px;">'+tipText+'</div>\
												</div>';
								
								return elem;
							};
							var width=parseInt(w),solidWidth=12,coordinateX=coordinateY=(width)/2,
								radius=(width/2)-(solidWidth/2);
							perimeter=2*Math.PI*radius;
							var divElem=createCon({
								width:width,
								height:width,
								x:coordinateX,
								y:coordinateY,
								radius:radius,
								strokeW:solidWidth,
								topColor:'#2a90d7',
								bottomColor:'#d2d2d2'
							});
							ele.svgBody.appendChild(divElem);
							divElem.style.display="none";
							var momey=divElem.querySelector('.money'),circle=divElem.querySelectorAll('circle')[1];
							/*---运动的方式--*/
							function exercise(options){
								var type=options.type||'linear',count=Math.round(options.time/30)
									,start=options.start||{},end=options.end||{},send={},dis={},
									n=0,timer=null;
								for(var name in start){
									dis[name]=end[name]-start[name];
									send[name]=0;
								};
								clearInterval(timer);
								timer=setInterval(function(){
									n++;
									for(var name in dis){
										switch(type){
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
										};
										send[name]=cur;
									};
									options.moveFn(send);
									if(n==count){
										clearInterval(timer);
										options.endFn && options.endFn();
									}
								},30);
							};
				};
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
									if(mainVar.mainData.redType==104){
										var obj=createElem(createContent({type:8,dj:curData,contentBoxW:w,contentBoxH:h}));
									}else{
										var obj=createElem(createContent({type:5,dj:curData}));
									};
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
					var gradeData=setStorage('get','grade'+gameTime);
					if(gradeData){
						gradeData=toObject(gradeData);
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
					setStorage('remove','grade'+gameTime);
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
						},HOST.GOLDCOIN);
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
				if(isSkip(contentInBox[0])){
					return;
				};
				ele.svgBody.className="svgBody display";
				contentInBox[0].style.display='block';
				playAduio(contentInBox[0]);
				if(coinNum&&onOff){
					//奖品为空的时候后面多一个界面→→→→手慢了
					var count=contentInBox.length-2;
				}else{	
					var count=contentInBox.length-1;
				};
				var index=1,allTime=600,temporaryTime=2400,transTime=600,haveYE=0;
				if(todayUesrBalance){
					temporaryTime=0
					haveYE=1
					}
				function auto(){
					setTimeout(function(){
						if(isSkip(contentInBox[index]))return;
						if(skipGoogle(contentInBox[index]))return;
						if(haveYE){
							setTimeout(function(){
							for(var j=0,len=contentInBox.length;j<len;j++){contentInBox[j].style.display='none'};
							contentInBox[1].style.display='block';
							exercise({
								type:'ease-in',
								start:{"textNum":0,"circleNum":0},
								end:{"textNum":curUesrBalance,"circleNum":curUesrBalance*perimeter/upperLimitBalance},
								time:1000,
								moveFn:function(data){
									momey.innerHTML=data['textNum'].toFixed(2);
									circle.style.cssText="stroke:#2a90d7;stroke-dasharray:"+data.circleNum+" "+perimeter;
								},
								endFn:function(){
									index=2;
									haveYE=0;
									setTimeout(auto,0);
									temporaryTime=1800;
									}
								});
							},2500)
							return
						}else ele.svgBody.className="svgBody hidden";
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
						},allTime);
					},temporaryTime);					
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
				mainVar.prizeData=thePrize;
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
				var isBigPrize=false,prevObj=obj.previousElementSibling;
				if(prevObj){
					var a_object=prevObj.getAttribute('audio');
					if(a_object){
						var attriData=toObject(a_object),val=attriData.key
						if(val=='bigPrize'){
							isBigPrize=true;
						};
					};
				};
				if(isBigPrize){
					setTimeout(function(){
						skipCardList();
					},2500);
				}else{
					skipCardList();
				};
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
			var bool=(userPrizeData==null||isEmpty(userPrizeData)),jb_ico=trim(CONFIG.chars.jbrk.a);
			birdWrap.style.display='block';
			mainVar.bird.move({top:winH-140,left:-10});
			if(PAGE.hasJB!=0&&(bool||userPrizeData.js_code!="google")){
				if(jb_ico!="OFF"&&jb_ico!="0")createNode(ele.mainBox,"img",{className:"coinIco2",src:jb_ico,action:'goto.,coin.html',style:"position:absolute;left:50%;top:75%;-webkit-transform:translate(-50%,0);width:60%;opacity:1;z-index:2;"},"p3");
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
			if(+sceneData.statisticsSwitch){
				var arr=[],choose=["optionA","optionB","optionC","optionD","optionE","optionF","optionG","optionH","optionI","optionJ"];
				switch(sceneData.appName){
					case 'DATI':
						arr=[{name:"optaNum",value:sceneData.optionA,num:0},{name:"optbNum",value:sceneData.optionB,num:0}]
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
			p.innerHTML=CONFIG.chars.kaijiang.a;
			infoa=p.querySelector(".info_a");
			calcTime(infoa,mainVar.mainData.countdown,2,function(){
					mainVar.dialog&&removeNode(mainVar.dialog)
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
			var b_timer=setInterval(function(){
				if(mainVar.djsTime<=10){
					getCoinBalance();
					clearInterval(b_timer);
				};
			},1000);
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
		var user=mainVar.userInfo,a=setAjax('get',HOST.CJ+'/open/syslottery/money?lotteryid='+mainVar.prizeID+"&yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.weixin_avatar_url+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city);
		a.callBack=function($data){						
			var data=toObject($data),num=+data.data||1,parts=data.participants||1;
				num=data.balanceTipsSize||(mainVar.moneyNum*num).toFixed(0)
				parts=(mainVar.baseNum*parts).toFixed(0)
				num=num.toString()
				mainVar.peopleNum=parts;
				if(mainVar.jj)mainVar.jj.innerHTML=num.replace(/(\d)/g,"<b>$1</b>");
				if(mainVar.people)mainVar.people.innerHTML=parts.replace(/(.)/g,"<b>$1</b>");
			};
		a.err=function(){};
		a.send()
	}	
	function getCoinBalance(){
		var appid=PAGE.yyyappid;
		if(appid=="wxf713ed3e7380b42d"||appid=="wxdff7aeae05418237"||appid=="wx03e62468c49d7805"||appid=="wxb815d73339f22c0c")return;
		var user=mainVar.userInfo;
		//请求用户等级
		(function(){
			var b=setAjax('post',HOST.USERAPI+"/tvmyao/api.php?action=yyy");
				b.data='sig='+user.sig+'&sigtime='+user.sigExpire+'&openid='+user.openid+'&yyyappid='+PAGE.yyyappid+'&paitime='+mainVar.paiTimeUnix;
				b.callBack=function($data){
					var _data=toObject($data);
					if(_data.status==1){
						if(balanceSwitch==1){
							!setStorage('get','grade'+gameTime)&&setStorage('set','grade'+gameTime,JSON.stringify(_data.data));
						}else{
							mainVar.coinNum=_data.data.source.gold;
						};
					};
				};
				b.err=function(){};
				b.send(); 
		})();
	};			

	function getBqBD(){
		var user=mainVar.userInfo
		//获取百分比
		if(balanceSwitch){
			var _ajax=setAjax('get',HOST.BALANCE+'/open/balance/'+PAGE.yyyappid+'/'+user.openid);		
			_ajax.callBack=function($data){
				var data=toObject($data);
				/*var data={"status":"success","result":{"current":{"balance":0,"openId":"oxWE2swUjKHO6Vi9Co4PCXgyeL58","yyyappid":"wx44490bbc768ce355","virtualCurrency":7132,"walletSize":100000},"topOne":{"openId":"oxWE2s9R27q6ZIarGH1qXEg0XyvM","balance":1697,"yyyappid":"wx44490bbc768ce355"}}}*/
				if(data.status=='success'&&data.result){
					var result=data.result;
					var current=result.current;
					mainVar.todayUesrBalance=current.balance;
					mainVar.maxUesrBalance=result.topOne.balance;
					mainVar.curUesrBalance=current.virtualCurrency;
					mainVar.upperLimitBalance=current.walletSize;
				}else{
					mainVar.todayUesrBalance=null;
					mainVar.maxUesrBalance=null;
					mainVar.upperLimitBalance=null
					mainVar.curUesrBalance=null
				};
			};
			_ajax.err=function(){
				mainVar.todayUesrBalance=null;
				mainVar.maxUesrBalance=null;
				mainVar.upperLimitBalance=null
				mainVar.curUesrBalance=null
			};
			_ajax.send();
		};
		//获取开奖结果
		var ajax=setAjax('get',HOST.CJ+"/open/syslottery/user/result?lotteryid="+mainVar.prizeID+"&yyyappId="+PAGE.yyyappid+"&code="+user.sig+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.weixin_avatar_url+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city);		
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
				var CSS='.contentInBox{font-size:15px;line-height:18px;}.contentInBox em{font-style:normal}.contentInBox{background:rgba(0,0,0,.5);position:absolute;height:100%;width:100%}.contentInBox>.bottomLayout{position:relative;height:100%;width:100%;z-index:2}.contentInBox>.bottomLayout label{position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);width:86%;border-radius:50%;color:#fff;font-weight:400;text-align:center}.contentInBox>.bottomLayout .top{padding:14px 0 2px;color:#c8151b;background:#eeca25;font-size:18px;bottom:auto;top:-5px}.contentInBox>.bottomLayout .top strong{font-size:20px;padding:10px 0;display:inline-block}.contentInBox>.bottomLayout .top em{font-size:16px;line-height:18px;display:inline-block;font-style:normal;color:#fff;width:44px;vertical-align:middle;margin-right:-4px}.contentInBox>.bottomLayout .top span{font-size:26px;vertical-align:middle;font-weight:700}.contentInBox>.bottomLayout .bottom{font-size:18px;background:#50c260;padding:8px 0 12px 0;box-sizing:border-box}.contentBox .showWrap,.contentBox .inKindCon{position:absolute;left:0;top:0;color:#ffde26;height:85%;width:100%;padding-top:15%;text-align:center}.contentBox .showWrap .jnBigPrize,.contentBox .showWrap .bigPrize,.contentBox .showWrap .error,.contentBox .inKindPrize{width:100%;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);text-align:center}.contentBox .showWrap .bigPrize p{margin:0 auto 5px;width:92%;}.contentBox .showWrap .bigPrize{font-size:18px;line-height:26px;}.contentBox .showWrap .bigPrize img{border-radius:50%;width:80px;height:80px;}.contentBox .getGoldCoin{position:absolute;text-align:center;position:absolute;left:0;width:100%;top:50%;-webkit-transform:translateY(-50%)}.getGoldCoin .goldCoinTxtArea{margin-bottom:5px}.getGoldCoin .goldCoinTxtArea span{display:inline-block;height:18px;width:18px;background-image:url('+PAGE.COMMON+'img/add.png);background-size:100% 100%;margin:0 10px}.getGoldCoin .goldCoin,.getGoldCoin img,.getGoldCoin span{display:inline-block;vertical-align:middle}.getGoldCoin img{height:100px}.getGoldCoin .goldCoin{width:60px;height:60px;background-size:100% 100%;}.getGoldCoin p{color:#ffde26;padding:0 10px}@media screen and (max-width:340px){.getGoldCoin .goldCoin{width:40px;height:40px}.getGoldCoin img{height:40px}.getGoldCoin p{font-size:12px;line-height:16px}}.contentInBox .goldPile{position:absolute;text-align:center;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);height:35px;width:100%}.contentInBox .goldPile .wrap{position:relative;background-image:url('+PAGE.COMMON+'img/goldPile.png);width:132px;height:35px;background-size:100% 100%;z-index:1;margin:0 auto}.contentInBox .goldPile span{background-size:100% 100%;position:absolute;top:0;left:50%;margin-left:-7px;z-index:0}.contentInBox .goldPile .gold1{background-image:url('+PAGE.COMMON+'img/gold01.png);width:13px;height:20px}.contentInBox .goldPile .gold2{background-image:url('+PAGE.COMMON+'img/gold02.png);width:18px;height:16px}.contentInBox .goldPile .gold3{background-image:url('+PAGE.COMMON+'img/gold03.png);width:15px;height:21px}.contentInBox .goldPile .gold4{background-image:url('+PAGE.COMMON+'img/gold04.png);width:15px;height:28px}.contentBox .inKindCon .img{position:relative;display:inline-block;margin-bottom:12px;padding:10px;background:#ffc507;width:38%;}.contentBox .inKindCon .img img{width:100%;vertical-align:middle;}.contentBox .inKindCon .img span{position:absolute;top:0;right:0;background:#298ddf;padding:2px 5px;color:#fff;}.contentBox .inKindCon h3{font-weight:normal;font-size:16px;line-height:20px;margin-bottom:4px;}.contentBox .inKindCon .text{font-size:20px;line-height:24px;padding:0 15px;}.contentBox .allUser{position:absolute;top:110%;width:100%;text-align:center;}.contentBox .allUser h4{font-size:16px;line-height:16px;padding:4px 8px;background:#eeca25;color:#000;border-radius:8px;display:inline-block}.contentBox .allUser .line{position:absolute;width:100%;height:1px;background:#eeca25;top:10px;z-index:-1;}.contentBox .allUser ul{padding-top:5px;text-align:center;max-height:156px;overflow:hidden;}.contentBox .allUser li{padding:5px 0;margin-right:5px;display:inline-block;}.contentBox .allUser .icon{width:100%;height:100%;}.contentBox .allUser .pic{border-radius:50%;height:40px;width:40px;border:2px solid rgba(255,255,255,0.2);overflow:hidden;margin:0 auto;}.contentBox .allUser .name{text-align:center;color:#ffde26;background:#000;padding:0 4px;border-radius:16px;font-size:14px;line-height:20px;margin-top:6px;max-width:56px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.contentInBox .shine{background:url(//a-h5.mtq.tvm.cn/yao/common/img/shine.png);background-size:100% 100%;position:absolute;width:100%;height:100%}.contentInBox .shinePic{height:50%%;width:50%%;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%)}.contentInBox .shinePic img{height:100%;width:100%}.contentInBox .shine_text .text{color:#ffde26;font-size:16px;line-height:20px;width:60%;padding-top:15px;margin:0 auto;text-shadow: 2px 2px 4px #000;}.topMove{-webkit-animation:topMove 800ms ease-out;}@-webkit-keyframes topMove{0%{top:0;}100%{top:-200px;}}.contentBox .showWrap .jnBigPrize{top:52%;}.contentBox .jnBigPrize .top{position:relative;text-align:center;margin-bottom:10px;}.contentBox .jnBigPrize .bg{height:100%;}.contentBox .jnBigPrize .bg{height:100%;}.contentBox .jnBigPrize .headImg{position:absolute;height:60px;width:60px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,0.6);left:50%;-webkit-transform:translateX(-50%);top:-12px;}.contentBox .jnBigPrize .headImg img{height:100%;width:100%;}.contentBox .jnBigPrize .money{color:#ffbc64;position:absolute;left:50%;-webkit-transform:translateX(-50%);bottom:10%;font-size:2.4em;}.contentBox .jnBigPrize .money span{font-size:13px;}.contentBox .jnBigPrize .bottom{line-height:1.5em;}';
				setStyle(CSS);
				mainVar.game.createContent=true;
			};
			var str='',html='',advertisement='恭喜您获得了',tip='',action='',txt='';
			if(data.thePrize)
				if(data.thePrize.tvmusername)advertisement='恭喜获得了'+data.thePrize.tvmusername+'为您提供的';
			switch(data.type){
				case 0:   //答错了 手慢了 超时  
					action="goto.,"+PAGE.bangdan;
					txt=CONFIG.chars.button.a;
					switch(data.kind){
						case 1:  //答错了
							/*if(+joinHudong!=1&&+PAGE.hasJB!=0&&balanceSwitch==0){
								str='<p>'+CONFIG.chars.linjiang.l+'</p>'
							};*/
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
						case 1001:
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
					var winners=data.dj.winners,prize=data.dj.prize,type=prize.type,str='';
					if(type==104&&winW<=320){
						str='font-size:16px;'
					};
					tip='<div class="bigPrize" style="'+str+'"><p>'+decodeURIComponent(winners[0].name)+'拿走了<br>本轮大奖'+changgeText(prize.name)+'</p><img src="'+decodeURIComponent(winners[0].icon)+'/96"></div>';
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
				break;
				case 8:   //中大奖
					var winners=data.dj.winners,prize=data.dj.prize,type=prize.type,str='',height=parseInt(data.contentBoxH)*0.5,ImgSize=parseInt(data.contentBoxH)*0.18,money=prize.name.match(/[^\u4e00-\u9fa5]+/g)[0];
					if(winW<=320){
						str='font-size:2em;'
					};
					tip='<div class="jnBigPrize"><div class="top" style="height:'+height+'px"><img class="bg" src="//a-h5.mtq.tvm.cn/yao/common/img/bigPrizeBg.png"><p class="headImg" style="height:'+ImgSize+'px;width:'+ImgSize+'px;"><img src="'+decodeURIComponent(winners[0].icon)+'/96"></p><p class="money" style="'+str+'">'+money+'<span>元</span></p></div><p class="bottom">恭喜'+decodeURIComponent(winners[0].name)+'拿走本轮<br>最大余额提现锦囊<br>'+money+'元</p></div>';
					html='<div class="showWrap" style="background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/shine.png);background-size:100%;">'+tip+'</div>';
				break;
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
			for(var i=0;i<10;i++){
				str+='<span class="gold'+index+'"></span>';
				index++;
				if(index>4){index=1};
			};
			contentBox.innerHTML=createContent({"type":3,"thePrize":thePrize,"coinNum":coinNum,"str":str,"curCoin":curCoin});
			var elem=contentBox.querySelector('.goldPile').querySelectorAll('span'),elemLength=elem.length,curIndex=0,timer=null,h=contentBox.offsetHeight/2;
			timer=setInterval(function(){
				topMove();
			},150);
			function topMove(){
				var curElem=elem[curIndex];
				curElem.className+=' topMove';
				curElem.addEventListener('webkitAnimationEnd',function(){
					this.classList.remove('topMove');
				},false);
				curIndex++;
				if(curIndex==elemLength){curIndex=0}
			};
			exercise({
				type:'ease-in',
				start:{"textNum":curCoin},
				end:{"textNum":curCoin+coinNum},
				time:2000,
				moveFn:function(data){
					myGoldNum.innerHTML=parseInt(data['textNum']);
				},
				endFn:function(){
					clearInterval(timer);
					setTimeout(function(){
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
					},500)
				}
			});
			function exercise(options){
				var type=options.type||'linear',count=Math.round(options.time/30)
					,start=options.start||{},end=options.end||{},send={},dis={},
					n=0,timer=null;
				for(var name in start){
					dis[name]=end[name]-start[name];
					send[name]=0;
				};
				clearInterval(timer);
				timer=setInterval(function(){
					n++;
					for(var name in dis){
						switch(type){
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
						};
						send[name]=cur;
					};
					options.moveFn(send);
					if(n==count){
						clearInterval(timer);
						options.endFn && options.endFn();
					}
				},30);
			};
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
					mainVar.retry=0;
					function auto(){
						mainVar.retry++;
						var b=setAjax('post',HOST.CJ+'/open/syslottery/receiveuser'),user=mainVar.userInfo;
						var jsonData={lotteryid:mainVar.prizeID,type:mainVar.game.result,code:user.sig,sigExpire:+user.sigExpire,yyyappId:PAGE.yyyappid,user:{openId:user.openid,name:user.nickname,icon:user.weixin_avatar_url,sex:""+user.sex+"",province:encodeURIComponent(user.province),country:encodeURIComponent(user.country),city:encodeURIComponent(user.city)}}
						
						if(!balanceSwitch){jsonData.matchingPrize=mainVar.adData.card};
						b.data=JSON.stringify(jsonData)
						b.set=function(){this.setRequestHeader("Content-type","application/json")}
						b.err=function(){
						    if(mainVar.retry==1){
								clearTimeout(time);
								isFun($fun);
								auto();
							};
						};
						b.callBack=function($data){
							clearTimeout(time);
							isFun($fun);
						};
						b.send();
					};
					auto();
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
//		CONFIG.shareInfo.success=function(res){
//			tjData["button_name"]='一键分享';
//      }
		if(window.wx){
			wx.ready(setShare);
		}else{
		setTimeout(wxShare,1000)
		}	
	function setShare(){
		wx.getLocation({
		  success:function($data){
			var list,pos=mainVar.location,ln=$data.longitude,la=$data.latitude
			pos.gps=ln+","+la;
			window.getGeo=function($data){
				var ad_info,result,address
				if($data){
					if(result=$data.result){
						ad_info=result.ad_info;
						list=ad_info.name;
						list=list.replace(/\,/g,"-");
						address=result.address;	
						pos.region=list;
						pos.address=address;
						pos.adcode=ad_info.adcode||0;
						localStorage.setItem("location",JSON.stringify(pos));
						pos.cache=0;
						var user=mainVar.userInfo,a=setAjax("POST",HOST.RTS+"/userinfo/saveaddr"),add=list.split("-")
						a.data="openid="+user.ttdsbid+"&longitude="+ln+"&latitude="+la+"&provice="+add[1]+"&city="+add[2]+"&area="+add[3]+"&street="+address
						a.send();
						 user.country=add[0];
						 user.province=add[1];
						 user.city=add[2];
						 user.organization=add[3];
						 user.longitude=ln;
						 user.latitude=la;
						 user.address=address;
					}
				}else
				noLocation(2)
			}
			setJsonp(HOST.WXAPIS+"?location="+la+","+ln+"&coord_type=5&get_poi=0&output=jsonp&callback=getGeo&key=IPVBZ-BO4HG-MD3QU-I75W4-F7KUZ-PSBYI")
		  },
		  cancel:function (res) {
			noLocation(1);
		  }
	    });
		wx.getNetworkType({
		  success:function(res){
			mainVar.network=res.networkType;
		  },
		  fail: function (res) {
			mainVar.network="fail"
		  }
  	    })
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
		setJsonp(HOST.AD+"/ufo/signature?cb=getWX&url="+encodeURIComponent(url)+"&wx_token="+token)
		}
	function guanzhuFun(){
		var div=createNode(DB,"div",{style:"position:fixed;bottom:0;height:50px;width:100%;left:0;z-index:100000",id:"xdDiv"})
		shaketv.getUserTicket();
		shaketv.subscribe({
					appid:PAGE.mpappid
					,selector:"#xdDiv"
				},function($data){
						if($data.errorCode!=="0"){
							div&&(div.style.display="none")
						}
						div=null
				})				
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
	if(!mainVar.popSty){
		setStyle('.popbox,.fuceng{width:80%; max-height:80%; min-height:200px; display:none; padding:6px; background:rgba(255,255,255,0.2); border-radius:5px; position:fixed; z-index:1000; top:50%; left:50%; -webkit-transform:translateX(-50%) translateY(-50%) translate3d(0,0,0);}.pop{width:100%; min-height:200px;  max-height:80%; background:rgba(255,255,255,.92); border:1px solid rgba(0,0,0,0.1); position:relative; border-radius:5px; box-sizing:border-box; overflow:hidden; overflow-x:hidden;}.poptitle,.fuceng>h4{background:rgba(104,186,219,.85); text-align:center; color:#fff; line-height:36px; height:36px; font-size:18px;}div.labelbox{height:100%; max-height:inherit; border-radius:50%; padding:0; margin:0; background:#fff;}div.labelbox .labelmain{padding: 32px 0; border-top:0; margin:0 8%; box-sizing: border-box;}div.labelbox .labelmain li{width:33%;}.labelbox{padding-top:5px; margin:0 1.5% 60px; max-height:276px; overflow-y:auto; overflow-x:hidden; text-align:center; -webkit-overflow-scrolling: touch; -webkit-transform: translate3d(0,0,0);}.labelbox>li{height:45px; line-height:45px; position:relative; font-size:15px; text-align:left;padding:0 6% 0 34%;}.labelbox>li.formtitle,.labelbox>li.formts{padding:0 20px;color:#e43656; border:0; height:auto; line-height:24px; min-height:45px; box-sizing: border-box;}.labelbox>li.formts{display:none;}.labelbox>li.formtitle{text-align:center; font-size:16px; padding-top: 12px;}.labelbox>li.formts{line-height:20px; padding: 7px 20px 7px 59px; font-size:13px;}.labelbox>li.formts img{width: 18px; position:absolute; top:8px; left:30px; -webkit-transform:translate3d(0,0,0);}.labelbox>li font.sx{color:#000; opacity:1; width:32%;}.labelbox>li .sx{ position:absolute; left:0;}.labelbox>li input,.labelbox>li textarea.txts{vertical-align: middle; border:0; width:100%; display:inline-block; outline:none; font-size:15px; background:none;}.labelbox>li label,.labelbox>li font{display:inline-block; font-size:14px; width:30%; text-align:right; outline:medium;}.labelbox>li font{width:70%; padding:0 5%; box-sizing:border-box; opacity:.5;}.labelbox .labelmain span{line-height:1; color:#646464;}.btn{height:60px; text-align:center; line-height:60px; background:rgba(255,255,255,0.05); width:100%; border-top:1px solid rgba(0,0,0,.08); position:absolute; bottom:0; left:0; z-index:1100;}.btn label{background:#59b3d8; color:#fff; padding:3px 18px 3px; font-size:16px; margin:0 20px; border-radius:4px;}.popbox{width:90%;}.pop_min{min-height:230px;}.speech{width:100%;height:100px;position:relative;}.speech textarea{width:94%;height:100%;display:block;margin:0 auto;padding-top:10px;border:none;box-sizing:border-box;font-size:1em;color:#347690;position:absolute;left:3%;top:10px;background:transparent;padding-left:10px;}.mark{position:absolute;width:10%;opacity:0.4;}.mark_t{left:10px;top:10px;}.mark_b{right:10px;bottom:10px;-webkit-transform:rotate(180deg);}.limit{height:2em;line-height:2em;text-align:right;padding-right:10px;color:#9e9e9e;}.pop_min .btn_bg{border:1px #67b9da solid;background:#fff;color:#67b9da;margin:0 13px;padding:5px 18px;}.speechLabel{position:absolute;left:5%;top:110%;margin:0;line-height:35px;height:35px;padding:0 6px 0 0;border-radius:15px;background:rgba(0,0,0,0.36);z-index:-1;white-space:nowrap;-webkit-transition:all 8s linear;color:rgba(255,255,255,1);}.speechLabel b{display:inline-block;line-height:20px;margin:0 15px 0 10px;}.grayT{position:absolute;left:40px;top:10px;width:10px;opacity:0.6;}.grayB{position:absolute;right:10px;bottom:5px;width:10px;opacity:0.6;-webkit-transform:rotate(180deg);}.pop_min .popCloseButton{color:#fff;background:#67b9da;}');
		setStyle('.speechbg{display:none;}.newspeech .speechbg{display:block;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.7);z-index:998;}.newspeech .popbox{background:#ff6654;padding:0;border-radius:3px;}.newspeech .pop{border-radius:3px 3px 0 0;background:#fff;overflow: inherit;}.newspeech .poptitle{height:48px;line-height:48px;font-weight:100;color:#ff6654;background:none;border-bottom:1px solid #ebebeb;}.newspeech .btn{border:0;height:48px;background:none;border-radius:3px 3px 0 0;bottom:-48px;}.newspeech .btn_bg{width:50%;height:100%;background:none;color:#fff;border:0;margin:0;padding:0;display:block;line-height:48px;float:left;}.newspeech .popCloseButton{background:#d3d3d3;margin-left:-1px;margin-top:1px;border-radius:0 0 0 4px;color:#000;}.newspeech .speech{height:150px;padding-top:10px;}.newspeech .pop_min{margin-bottom:48px;}.newspeech .speech textarea{color:#000;box-sizing:border-box;top:0;padding:10px;}.newspeech .limit{padding-bottom:10px;}.newspeech .btn label{font-size:15px;}.newspeech .btn_bg.w{width:100%;}.newspeech .poptitle.form{color:#000;font-size:20px;}.labelbox.form>li.formtitle{color:#ff6654;padding:10px;}.labelbox.form{margin:0 3% 30px;}.labelbox.form li{border:1px solid #ebebeb;border-radius:3px;margin-bottom:10px;padding:0 6% 0 18%;}.labelbox.form .formtitle{border:0;margin:0;}.labelbox.form>li font.sx{width:20%;text-align:center;}.labelbox.form>li textarea.txts{border-left:1px solid #ebebeb;padding-left:14px;}.newspeech .poptitle.form .close{width:15px;height:15px;display:inline-block;position:absolute;left:15px;top:15px;background:url('+PAGE.COMMON+'img/closeBtn.gif);background-size:100% 100%;}')
	}mainVar.popSty=true;
	var t=this;
	if(!t.$)t.$=createNode(DB,"div",{id:"popbox",class:"popbox fadeIn boxtime",html:'<div class="pop"><h3 class="poptitle"></h3><ul class="labelbox"></ul><div class="btn"></div></div>'},'p3')
	mainVar.speechbg=createNode(DB,"div",{className:"speechbg"},"p3");
	t.open=function(){
		t.$.className="popbox fadeIn boxtime";
		t.$.style.display='block';
	}
	t.popClose=function(a){
		t.$.className="popbox fadeOut boxtime";
		setTimeout(function (){
			t.$.style.display='none';
			setTimeout(function(){
				DB.classList.remove('newspeech');
				mainVar.newbg.style.cssText='display:none;z-index:999;';
				DB.style.overflow="auto";
				if(b)b();
			},200)
		},600)
		if(a){
			var type=mainVar.prizeData.type||mainVar.prizeData.awardtype||mainVar.prizeData.prizeType;   //奖品类型
			if(type==108){
				wallet(mainVar.prizeData.money);
			}else if(type==102){
				//lingjiang.getHongbao();
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
	function lingjiangs($,options){
		var t=this
		,options=options||{}
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
			t.box=obj;
			mainVar.ele.overall_obj=obj;
			mainVar.ele.overall_tag=tag;
			var Verif=setStorage("get","Verif"),/*mo=!mainVar.mobile,yanzheng=+PAGE.yanzheng,*/speech=+PAGE.speech,tvm_id=setStorage("get","tvm_id");
			obj.id='thebox';
			mainVar.mywin={ele:obj,a:tag};
			if(!mainVar.prizeData){
				mainVar.prizeData=mainVar.newdata.data[t.box.parentNode.title];
			};
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
			};
			$link=data.gainUrl; 
			$typ=data.type||data.awardtype||data.prizeType;   //奖品类型
			switch($typ){
				case 2:case 3:case 5:case 1001:
					$link=data.link||data.url||data.google_json_url;          //url
					if(!$link){
						if(data.prizeInfo){
							$link=data.prizeInfo.url;
						}else{
							$link=''
						};
					};
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
			if(($rate==1||$isT==1||$typ==1)&&!mainVar.writeInfo&&activityType==1){
				isWriteInfo({
					fn:function(){
						var ele=mainVar.ele;
						lingjiang.init(ele.overall_obj,ele.overall_tag);
					}
				})
			}else{
				auto();
			};
			function auto(){
				var user=mainVar.userInfo;
				if(activityType==3)$isT=1;
				else if(activityType==2){
					if($rate<5)$isT=1;
				}
				mainVar.$isT=$isT;
				if($isT===1){mainVar.shoppn=$name;mainVar.shoppt=$typ;}
				$ord=setStorage("get",'hjgy'+$orderId);			
				if(typeof $createTime=='string')mainVar.paiTimeUnix=+new Date($createTime.replace(/-/g,"/"));
				pushAdData($typ,data);
				switch($typ){
					case 1:
						if(speech!=0&&$isT===1&&!$ord){
							t.hjgy()
						}else{
							options.inKind&&options.inKind(data);
						};
					break
					case 101:
						if($isT===0||!$isT)t.getKaquan();else{
							if(speech!=0&&$ord==null)t.hjgy();else t.getKaquan();
						}
					break
					case 102:case 103:case 104:
						tjHjgy=0;
						if(_b=="now"){
							if($ord==='1')tishi(CONFIG.chars.linjiang.d);else t.hjgy();
						}else t.getHongbaoData();
						if($typ==103)mainVar._urls=HOST.CJ+'/open/auth/ttdsb?orderId='+$orderId+'&openId='+user.openid;
					break
					case 108:
						wallet(mainVar.prizeData.money)
					break
					default:
						mainVar._urls=setURL($link);
						if($typ==5)mainVar._urls=nowinfun({name:$name,link:mainVar._urls});
						if($isT===1||$isT){
							if(speech!=0&&$ord==null){
								t.hjgy();
							}else{
								if(options.Fun&&$typ==2){
									options.Fun();
								}else{
									mainVar._urls!=''&&setTimeout(function(){goto(mainVar._urls)},1000)
								};
							};
						}else{
							if(options.Fun&&$typ==2){
								options.Fun();
							}else{
								mainVar._urls!=''&&setTimeout(function(){goto(mainVar._urls)},1000)
							};
						};
					break
				};
				if(!mainVar.tj101){mainVar.tj101=1
					tjData["tvm_id"]=tvm_id;
					tjData["timu"]=album_list($typ);
					tjData["album_name"]=$name;
					tjData["content_id"]=$rate;
					tjData["content"]=$orderId;
					tjData["appName"]="抽奖页";
					tjData["paiTimeUnix"]=mainVar.paiTimeUnix;
					TJ(101000);
				}
				function setURL($link){
					var str="";
					if($link.indexOf("fullScreen=1")>-1){
						str=$link
					}else if($link.indexOf('pmall')>0){
						str=$link+($link.indexOf("?")>0?"&":"?")+"yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sign="+user.sig+"&sigExpire="+user.sigExpire;
					}else if($link.indexOf('tvm.cn')>0){
						str=$link+($link.indexOf("?")>0?"&":"?")+"yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sig="+user.sig+"&sigExpire="+user.sigExpire+"&orderId="+$orderId+"&paiTime="+mainVar.paiTimeUnix+"&token="+PAGE.token+"&channel_id="+PAGE.channelId+"&t="+(+new Date());
					}else if($link.indexOf('cctvmall.com')>0){
						str=$link+(/\/$/g.test($link)?"":"/")+"yyyappId/"+PAGE.yyyappid+"/openId/"+user.openid+"/sig/"+user.sig+"/sigExpire/"+user.sigExpire+"/orderId/"+$orderId+"/t/"+(+new Date());				
					}else{ 
						str=$link+($link.indexOf("?")>0?"&":"?")+"yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sig="+user.sig+"&sigExpire="+user.sigExpire+"&orderid="+$orderId+"&t="+(+new Date());
					};
					return str;
				};
			};
		};
		t.getHongbaoData=function(){
			if(typeof $createTime == 'string')mainVar.paiTimeUnix=+new Date($createTime.replace(/-/g,"/"))
			mainVar.prizeName=$name;
			t.hjgy();
		}
		t.hjgy=function(){
			//isFun($[4],data)
			setTimeout(function(){
				var a=""
				,b=CONFIG.chars.hjgy.g
				,c=CONFIG.chars.form.n
				,d=CONFIG.chars.button.c
				,html="",jnhtml=''
				,len=mainVar.speechlen=72;				
				mainVar.speechfn=function(e){
					var val=e.value,nlen=val.length;
					speechlen.innerHTML=nlen;
				}
				a='<label onclick="popBox.popClose(1)" class="btn_bg popCloseButton">等等再领取</label>';
				if($typ==102||$typ==103||$typ==104){d='发表感言领取红包';}
				$typ==104&&jinnang();
				function jinnang(){
					b='中奖是不是很激动？分享下您的中奖心情吧';
					c='提现确认';
					!mainVar.jnsty&&setStyle('.jinnang_gy{background:#ffd2c0;padding:7px 0}.jinnang_gy p{text-align:center;line-height:22px;color:#000;}.jinnang_gy p font{font-weight:900;color:#db5c48;}.closepop{width:20px;height:20px;display:inline-block;position:absolute;left:12px;top:12px;}.closepop:after,.closepop:before{display:inline-block;content:"";width:1px;height:20px;background:rgba(0,0,0,.4);transform:translateX(10px) translateY(2px) rotate(45deg);}.closepop:before{transform:translateX(10px) translateY(2px) rotate(-45deg)}');
					mainVar.jnsty=true;
					jnhtml='<em onclick="popBox.popClose(1)" class="closepop"></em><div class="jinnang_gy"><p>您目前的余额账户有 <font>'+mainVar.money+'元</font></p><p>本次可提现金额为 <font>'+mainVar._money+'元</font></p></div>';
				}
				html='<h3 class="poptitle">'+c+'</h3>'+jnhtml+'<div class="label">'+
				'<div class="speech"><textarea  placeholder="'+b+'" max-length="'+len+'" id="textarea" oninput="mainVar.speechfn(this)"></textarea></div>'+
				'<div class="limit"><span id="speechlen">0</span>/72</div></div><div class="btn">'+
				a+'<label action="btn_speech" class="btn_bg">'+d+'</label></div>';
				popbox.querySelector('.pop').innerHTML=html;
				popbox.querySelector('.pop').classList.add('pop_min');
				popBox.open();
				DB.classList.add('newspeech');
			},500)
		}
		t.postspeech=function(){
			isFun($[3],data,options)
		}
		t.speechDo=function(posts,options){
			var a=setAjax('post',HOST.HJGY+'/actions/posts/addposts3.do');
			a.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");}
			a.data='posts='+JSON.stringify(posts);
			a.callBack=function($data){
				var _data=JSON.parse($data);
				if(_data.status=='1'){
					tishi(CONFIG.chars.hjgy.d,{time:2000});
					//$typ==1&&DB.classList.remove('newspeech');
				}
				isFun($[4],data,options)
				setStorage("set","hjgy"+$orderId,1);
			};
			a.err=function(){tishi('获奖感言提交失败！请稍候再试...',{time:2000});}
			a.send();
			//isFun($[4],data)
			//setStorage("set","hjgy"+$orderId,1);
		}
		t.tixian=function($money){
			var c=setAjax('get',HOST.TX +'/open/balanceActivity/draw?channelId='+PAGE.channelId+'&yyyappId='+PAGE.yyyappid+'&openId='+user.openid+'&orderId='+$orderId+'&code='+user.sig+'&sigExpire='+user.sigExpire+'&meony='+$money+"&name="+user.nickname+"&icon="+user.weixin_avatar_url);
			c.callBack=function($data){
				var $data=toObject($data);
				if($data.status=='failed')tishi($data.msg,{time:2000});
				else goto($data.redirect_uri);
				mainVar.dx.lqzt(2);
			}
			c.err=function(){tishi('服务器超时，请稍候...');}
			c.send();
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
							+"&icon="+user.weixin_avatar_url
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
			c.data=JSON.stringify({id:$wxRedLotteryId,code:user.sig,openId:user.openid,sigExpire:+user.sigExpire,yyyappId:PAGE.yyyappid,dingdanid:$orderId,ico:user.weixin_avatar_url,name:user.nickname,sex:user.sex,country:user.country,province:user.province,city:user.city});	
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
			var wechatInfo=UA.match(/MicroMessenger\/([\d\.]+)/i);
			if(!wechatInfo){
				tishi(CONFIG.chars.tishi.c) ;
			}else{
				setJsonp(HOST.QQHB,function(){	
					t.postHB();
				},DB)
			}
			if(t.box.getAttribute("data")=='1')t.box.setAttribute("action","lgj");
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
			c.data=JSON.stringify({orderId:$orderId,wxRedResultCode:code,openId:user.openid,code:user.code,sigExpire:+user.sigExpire,yyyappId:PAGE.yyyappid,ico:user.weixin_avatar_url,name:user.nickname,sex:user.sex,country:user.country,province:user.province,city:user.city});
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
			html='<h3 class="poptitle form"><em class="close" onclick="popBox.popClose(1)"></em>'+CONFIG.chars.form.m+'</h3><ul class="labelbox form"><li class="formtitle">奖品：'+sp+'</li>';
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
				cansave='<label action="popSave" class="btn_bg w">确定</label>';
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
				cansave='<label action="popSave" class="btn_bg w">确定</label>';
			}
			DB.classList.add('newspeech');
			html+='<li><font class="sx">姓名</font><textarea class="txts" rows="1" '+ Read +' id="username" placeholder="真实姓名">'+username+'</textarea></li>'+
			'<li><font class="sx">电话</font><textarea class="txts" rows="1" '+ Read +' id="telInput" placeholder="手机号码">'+userphone+'</textarea></li>'+
			'<li><font class="sx">地址</font><textarea class="txts" rows="1" '+ Read +' id="address" placeholder="收货地址">'+useradd+'</textarea></li>';
			btnh=cansave+'</div>';//'<label action="popClose" class="close">取消</label>'+
			html+='<li class="formts"><img src="'+PAGE.COMMON+'img/ts.png">'+CONFIG.chars.form.l+'</li></ul><div class="btn">'+btnh;
			popbox.querySelector('.pop').innerHTML=html;
			popbox.querySelector('.pop').classList.add('pop_min');
			popBox.open()
			mainVar.newbg.style.cssText="z-index:999; display:block";
			//userInfo.phone=userphone
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
					var ajax=setAjax('post',HOST.SJYZ+'/ufo/puserupdate?cache='+Math.random()+'&wx_token='+PAGE.yyyappid+'&openid='+user.openid+'&sign='+user.sig+'&code='+sigCode+'&type=2');
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
			var user=mainVar.userInfo,a1=setAjax("get",HOST.CJ+"/coin/ranking?yyyappId="+PAGE.yyyappid+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.weixin_avatar_url+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city);					
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
	function getPhone(){
		var a=setAjax("get",HOST.SJYZ+"/point/integral/query?wxToken="+PAGE.yyyappid+"&openId="+mainVar.userInfo.openid+"&ca="+(+new Date));
			a.callBack=function($data){
				var data=toObject($data),phone
				if(data.status==="success"){
					phone=data.data.mobile;
					phone&&(mainVar.userInfo.phone=phone)
					}
				}
			a.send()
		}
	function mygodnum($,a,b){	//获取“累计金币、我的金币” $是回调方法；
		var a1;
		if(b)
			a1=setAjax("get",b+"/point/integral/query?wxToken="+PAGE.yyyappid+"&openId="+mainVar.userInfo.openid+"&ca="+(+new Date));
		else
			a1=setAjax("get",HOST.SJYZ+"/point/integral/query?wxToken="+PAGE.yyyappid+"&openId="+mainVar.userInfo.openid+"&ca="+(+new Date));
		a1.callBack=function($data){	
			var data=toObject($data);
			huoqugod(data);
		};
		a1.err=function(){};
		a1.send();
		function huoqugod(_){
			if(typeof $=="function")$(_);else{
				var _=_.data;
				a&&a(_.integral);
			}
		}
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

function adCount($fun){
	var advertiserid="",urlSearch=mainVar.isShare||{};	
	function getAD_display($data){
		var data=toObject($data)
		if(data.errcode==0){
			var d=data,i;
			for(i in d)mainVar.adData[i]=d[i];
			if(mainVar.adData.adpositions1){
						//mainVar.adData.bgAdImg=mainVar.adData.adpositions1.image;
						//mainVar.adData.adpositions1.banner&&(mainVar.adData.banner=mainVar.adData.adpositions1.banner);	
						mainVar.adData.card.type=1001
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
		$fun()
	}	
	if(urlSearch.advertiserid){advertiserid="&from=dsp&advertiserid="+urlSearch.advertiserid}
	getTvme({
		callBack:function(){
			var column_info=mainVar.mainData.column_info,user=mainVar.userInfo,tiid=mainVar.mainData.time_interval_id;
			  mainVar.tvmE.getadbyka_new(
				function($data){
					var $data=toObject($data),data=$data.data||{};
					getAD_display(data.dmp);
					getTag(data.cards);
				},{
				"tags":'',
				"channelmid":PAGE.channelId,
				"columnid":(column_info?column_info.column_id:1),
				"mtid":tiid,
				"openid":user.openid,
				"nickname":user.nickname,
				"sex":user.sex,
				"face":user.weixin_avatar_url,
				"did":mainVar.location.adcode,
				"position":mainVar.location.region,
				"gps":mainVar.location.gps,
			  });
		}
	})
	window.getAD_over=function(){}
	window.pushADCount=function(){
		setJsonp(HOST.DSP+'/card?openid='+u.openid+'&sharktimeid='+mainVar.adData.sharktimeid+'&version='+mainVar.adData.version+'&callback=getAD_over&phone='+(mainVar.userInfo.phone||""));
	};
	var ajax=setAjax("get",HOST.ADJS+'/tf_'+PAGE.channelId+'.json');
		ajax.callBack=function($data){
			var data=toObject($data),hdkj=data.hdkj||{},resultpage=hdkj.resultpage,waitpage=hdkj.waitpage;
			if(waitpage&&waitpage.advalue==6){
				if(waitpage.put_code&&waitpage.put_code.code){
					mainVar.adData.otherVideo=true;
					mainVar.adData.otherVideoSucc=true;
					otherVideo(waitpage.put_code.code);
				};
			};
			if(resultpage){
				setStorage('set','resultPage',JSON.stringify(resultpage));
			}else{
				setStorage('set','resultPage',null);
			};
		};
		ajax.send()
};
function noLocation($i){
	var u=mainVar.userInfo,src=HOST.TJ+"/php/html/1.gif?name="+u.nickname+"&time="+mainVar.paiTimeUnix+"&id="+u.openid+"&i="+$i;
		if(!window.tjimg)window.tjimg=createNode(DB,"img",{style:"display:none"},"p3");
		window.tjimg.src=src;
		getUserInfo()
	}
function getUserInfo(){
	var b=setAjax('get',HOST.RTS+'/userinfo/get?yyyappid='+PAGE.yyyappid+'&&yopenid='+mainVar.userInfo.openid);
	b.callBack=function($data){
		var data=toObject($data);
		if(data.status){
			var d=data.data,p,pos=mainVar.location;
			if(p=d.address){
				pos.region="0-"+p.provice+"-"+p.city+"-"+p.area;
				pos.address=p.street;
				pos.latitude=p.latitude;
				pos.longitude=p.longitude
			}
		};
	};
	b.send();
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
	var data=json.data||{},bool=true;;
	data.t=Math.random()+new Date().getTime();
	var arr=[];
	for(var i in data){
		arr.push(i+'='+encodeURIComponent(data[i]));
	};
	data=arr.join('&');
	var oAjax=window.XMLHttpRequest?new XMLHttpRequest():new activeXObject('Microsoft.XMLHTTP');
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
		if(oAjax.readyState==4&&bool){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				clearTimeout(timer);
				json.success&&json.success(oAjax.responseText);
			}else{
				clearTimeout(timer);
				json.error&&json.error(oAjax.status)
			};
		};
	};
	if(json.timeout){
		var timer=setTimeout(function(){
			bool=false
			oAjax.abort();
			oAjax.onreadystatechange=null;
			json.error&&json.error(0);
		},json.timeout);
	};
};

//边看边聊导航栏跳转链接
function goUrl($){var h='',user=mainVar.userInfo;
	switch($){
		case "a":case "M_WDSC":
			h="mywin.html"
		break
		case "b":case "M_SC":
			h="coin.html"
		break
		case"M_SC_NEW":
			h="http://mlive.tvmcloud.com/qstore/qstore/pages/shop/3cce113b-8395-7bc8-c304-b9e41b1c7c5a/index.html?addi="+JSON.stringify({"yaotv_openid":user.openid,"yyyappid":PAGE.yyyappid,"sign":user.sig,"sigExpire":user.sigExpire})
		break
		case "c":case "M_YL":
			h="http://qa.games.yaotv.tvm.cn?addi="+JSON.stringify({"yaotv_openid":user.openid,"yyyappid":PAGE.yyyappid,"sign":user.sig,"sigExpire":user.sigExpire})
		break
		case "d":case "M_GRZX":
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
			h=HOST.WSQCDN+'/wsqh5/dotask/index.html?yyyappid='+PAGE.yyyappid+'&openid='+user.openid+'&token='+PAGE.token+'&channelId='+PAGE.channelId
		break
		case "M_HBBD":
			h="share.html?type=money"
		break
		case "M_DJBD":
			h="share.html?type=dajiangsk"
		break
		case "TTDSB":			
			h='//qa-h5.mtq.tvm.cn/yao/join_us/'+(mainVar.binding.subscribe?'yezh_1':'yezh_0')+'.html?token='+PAGE.token+'&yoid='+user.openid+'&yyyid='+PAGE.yyyappid+'&ysig='+user.sig+'&ysige='+user.sigExpire
		break
		case "YESGJ":			
			h='//qa-h5.mtq.tvm.cn/yao/join_us/'+(mainVar.binding.subscribe?'yesgj_1':'yesgj_0')+'.html?token='+PAGE.token+'&yoid='+user.openid+'&yyyid='+PAGE.yyyappid+'&ysig='+user.sig+'&ysige='+user.sigExpire
		break		
		default:
			h=$+($.indexOf("?")>-1?"&":"?")+"yyyappid="+PAGE.yyyappid+"&openId="+user.openid+"&sign="+user.sig+"&sigExpire="+user.sigExpire
		break
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
						mainVar.banquan&&DB.appendChild(mainVar.banquan);
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
	//					if(mainVar.adData.head){				
//							mainVar.ele.adHead=createNode(DB,"div",{html:mainVar.adData.head,style:"position:fixed;top:8px;left:0;width:100%;text-align:center",action:"goto.,coin.html"})	
//							};
							mainVar.ele.mainBg.style.display='none'
							mainVar.ele.mainBox.style.backgroundImage="url("+mainVar.adData.bgAdImg+")"
//						if(mainVar.adData.type==5&&mainVar.video){
//							setJsonp("//s0.2mdn.net/instream/html5/ima3.js",function(){
//								setJsonp(PAGE.COMMON+"jc/videoAds.js",function(){
//									var box=mainVar.video.previousSibling,vw=box.offsetWidth,vh=box.offsetHeight;
//									mainVar.GVAD=new Application({ele:mainVar.video,token:PAGE.token,adcontainer:box,width:vw,height:vh});
//									mainVar.GVAD.onClick_()
//									})
//								})	
//							}							
					},400)
						if(mainVar.game.result){
							tjData["appName"]="广告页面";											 		  
							TJ(100000)
							var user=mainVar.userInfo,a=setAjax("GET",HOST.CJ+"/open/ad/uv?lotteryid="+mainVar.prizeID+"&yyyappId="+PAGE.yyyappid+"&code="+user.sig+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.weixin_avatar_url+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city)	
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
					var m="SOCKET",mainData=mainVar.mainData;
					if(mainData.balanceSwitch===1){
						if(mainData.yPack===1)m="KAQUAN"
					}else if(mainData.coinSwitch===0){
						m=""
						}	
					if(mainData.redSource==="platform"){
						mainVar.moneyNum=1
						CONFIG.chars.kaijiang.a="距离大奖揭晓还有<label class='info_a'><b>0</b><b>0</b></label>秒<br>，观众<b class='info_b'>1</b>人，本轮最大锦囊<label class='info_c'><b>0</b></label>元，<label class='deng'>玩家越多，奖池越大</label>"
						}
					mainVar.warter=MODULE.WARTER({module:m})
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
								var banquan=mainVar.sceneData.pageCopyright?mainVar.sceneData.pageCopyright:PAGE.banquan;
								if(mainVar.sceneData.appName=="NEWDATI" && mainVar.dxLen>4){var objB=mainBox;}else{var objB=DB;}
								mainVar.banquan=createNode(objB,"div",{className:"banquan",style:"background-image:url("+mainVar.pageBg+")",html:"<img src='"+banquan+"' style='width:100%;display:block;'>"},"p3")
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
				}else if(vl>mainVar.speechlen){
				tishi(CONFIG.chars.hjgy.b,{time:2000});return
				}
			if(tjHjgy == 1){
				tishi(CONFIG.chars.hjgy.c,{time:3000});return
				}
			tjHjgy=1;
			if(content){
				var desc='',$sw='',money,shareicon;
				/*if($typ==102||$typ==108){
					money=+data.money/100
					if(money==1)desc=CONFIG.chars.hjgy.h;
					else 
					desc=CONFIG.chars.hjgy.i+money+CONFIG.chars.hjgy.j;
				}
				if(mainVar.$isT==1)desc=CONFIG.chars.hjgy.k+$name+CONFIG.chars.hjgy.l;*/
				if($typ==102||$typ==108)
					money=+data.money/100+"元现金红包";
				else
					money=data.name||data.prize_name;
				desc='泪牛满面！竟然是我中了'+money+'，感谢'+PAGE.channelName+'频道，点我看大奖';
				//shareicon=PAGE.COMMON+'img/cupicon.jpg';
				
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
								goldCoinCon.innerHTML='<p style="line-height:'+h+'px;color:#fff;text-align:center">卡密：'+mainVar.prizeData.shoppingCard+'</p>';
							};
						}else{
							if(mainVar._urls)setTimeout(function(){goto(mainVar._urls)},1000);
						};
					break;
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
				lingjiang.speechDo(posts);
			}else{
				tishi(CONFIG.chars.hjgy.f)	
			}
		}
		,function(data){
			$typ=data.type
			switch($typ){
				case 1:case 102:
					if(mainVar.$sw=="a"){
						lingjiang.getHongbao();
						popBox.popClose();
					}else{
						popBox.popClose();
						getInkind(data,true);
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
				break
				default:
					popBox.popClose();
					mainVar._urls&&goto(mainVar._urls)
				break;
			}
			tjHjgy=0;	
		}],{
			inKind:function(data){
				getInkind(data,false);
			}
		});
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
	if(balanceSwitch==1){
		var contentInfo='',reccards='';
		if(e==2){  //互动超时
			contentInfo={"userGainPrize":null,"timeout":true};
			setStorage('set','shakeArr','');//摇到点击的
			setStorage('set','likeArr','');//摇到没有点击的
			if(mainVar.reccards){
				reccards=JSON.stringify(mainVar.reccards);
			};
			setStorage('set','originArr',reccards);       //没有摇到的
		}else{    //手慢了
			contentInfo={"userGainPrize":null};
		};
		setStorage("set","prizeData",JSON.stringify(contentInfo));
		skipCardList(e);
		return;
	};
	switch(e){
		case 0:
			var str='';
			//if(+joinHudong!=1&&+PAGE.hasJB!=0)str=','+CONFIG.chars.linjiang.l;
			e=CONFIG.chars.linjiang.k+mainVar.game.daan+str;
		break
		case 1:
			e=CONFIG.chars.linjiang.j;
		break
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
		case 6:type="商品类卡券";break
		case 7:type="理财类卡券";break
		case 8:type="金币";break
		case 9:type="优惠券";break;
		case 101:type="微信卡券";break
		case 102:
		case 103:
		case 105:
			type="微信红包";
		break
		case 104:type="余额提现锦囊";break
		case 108:type="天天余额";break
		case 1001:type="dsp-1001";break
	}
	return type;
}
function skipCardList(num){
	setStorage("set","prizeId",mainVar.prizeID);
	var m=mainVar.mainData,ad=mainVar.adData,trackVal=0;
	if(ad.adpositions1&&ad.adpositions1.trackurl){
		trackVal=1;
	};
	var dsp_card=mainVar.adData.card;
	if(num!=2){
		if(dsp_card&&dsp_card.url){
			dsp_card.prizeSource=2;
			dsp_card.name=dsp_card.title;
			dsp_card.updated_at=mainVar.adData.updated_at;
			dsp_card.pic=dsp_card.logo;
			dsp_card.activityType=1;
			setStorage("set","dspCardData",JSON.stringify(dsp_card));
		};
	};
	location.href="gold.html?column_id="+(m.column_info?m.column_info.column_id:1)+"&isOwner="+m.isOwner+"&trackurl="+trackVal+"&_="+(+new Date);
};
	function sendmobile(a,b,c,d){
		if(mainVar._biaokey==false)return false;
		mainVar._biaokey=false;
		var user=mainVar.userInfo;
		var h=d==1?'':'&reset=1',$_=mainVar.loading.style,a1=setAjax("get",HOST.SJYZ+"/apis/sms/checkverify?wx_token="+PAGE.yyyappid+"&mobile="+a+"&openid="+user.openid+"&code="+sigCode+"&sign="+user.sig+"&verify="+b+"&sigExpire="+user.sigExpire+h)
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
	
	function bindmobile(_,_$){
		var h=_$==1?'':'&reset=1',b=setAjax('post',HOST.SJYZ+'/apis/sms/send'),user=mainVar.userInfo;
		b.data="wx_token="+PAGE.yyyappid+"&mobile="+_+"&openid="+user.openid+"&code="+sigCode+"&sigExpire="+(+user.sigExpire)+"&sign="+user.sig+h;
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
function xdDialog($str){
	mainVar.yyyAction=0;
	if(!mainVar.dialog){
		var html='<style>.ico_11{width:80px;height:80px;margin:50px auto 20px auto;}.info_11{text-align:center;color:#fff;margin:10px auto}.buts{display:block;width:100px;line-height:15px;color:#88311E;background:#F8B161;border-radius:4px;font-weight:normal;margin:auto;padding:3px 0}.butsBox{padding:20px 0;background:#c04d3b;}.infoMiddel{width:100%;height:65px;background: url(//a-h5.mtq.tvm.cn/yao/common/img/redBlock.gif) no-repeat left bottom;background-size:100% auto;}@media screen and (max-width:320px){.ico_11{width:60px;height:60px;margin:25px auto 9px auto}}@media screen and (min-width:360px){.ico_11{margin:30px auto 17px auto}.infoMiddel{height:77px}}@media screen and (min-width:400px){.info_11{margin:0 auto 17px auto}.ico_11{width:80px;height:80px;margin:40px auto 20px auto}.butsBox{padding:25px 0}.buts{padding:5px 0;line-height:17px;}.infoMiddel{height:80px}}</style><b class="ico_11" style="display:block;background:url(//a-h5.mtq.tvm.cn/yao/common/img/induce.png);background-size:100% 100%;"></b><p class="info_11">已存入您的余额账户，请到个人中心进行查看</p><div class="infoMiddel"><p style="text-align:cetner;color:#F8B161;margin:0 auto;padding:10px 0;width:71%">建议您开启余额自动收割机，自动领取余额，省时省力多摇余额！</p></div><div class="butsBox"><p class="buts b_12" action="joinUs">开启收割机<span style="display:block;color:red;font-size:12px;">送50元余额</span></p></div><span class="close" action="closeDialog"><em></em></span>'
		mainVar.dialog=createNode(DB,"div",{className:"popupContainer comeIn",style:"position:fixed;z-index:900;background:#db5c48;font-size:1em;text-align:center;",html:html})
		}
		mainVar.dialog.style.display="block"
	}
function closeDialog(){
	mainVar.yyyAction=1;
	mainVar.dialog.style.display="none"
	}	
/*
*
function gobindmobile(n){  //n=0 重置手机，n=1 绑定手机，不传显示升级提示框
	if(!$.call)$.call=new callChange;
	$.call.open(n);
}
*
*/
function callChange(){
	var t=this,user=mainVar.userInfo;
		setStyle('.changeTC{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.6);z-index:1000;display:none;}.changebox{text-align:center;background:#fff;width:90%;border-radius:3px;position:absolute;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);display:none;}.changebox h4,.inp span{color:#ff6654;font-size:14px;font-weight:100;}.changebox h3{border-bottom:1px solid #eee;font-weight:100;padding:10px 6px 6px;font-size:13px;}.changebox h3 .ft_red{color:#ff6654;font-weight:900;}.changebox h3 img{width:30px;height:30px;border-radius:50%;vertical-align:middle;margin:-4px 6px 0 0;}.changebox h4{padding:25px 10px 10px 10px;}.inp span{border:1px solid #ff6654;}.changebox p{font-size:10px;margin-bottom:25px;padding:0 15px;line-height:18px;}.changebox ul{margin-bottom:35px;border-top:1px solid #eee;}.changebox ul li{border-bottom:1px solid #eee;border-right:0;border-left:0;padding:10px;}.changebox input{width:100%;margin:0;padding:7px 0;border:0;font-size:14px;padding:7px 0 7px 10px;box-sizing:border-box;}.changebox .inp{padding:10px 120px 10px 10px;position:relative;}.changebox .inp span{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);border-radius:2px;padding:4px 9px;}.changebox ol li{background:#ebebeb;width:50%;padding:15px 0;float:left;border-radius:0 0 0 3px;}.changebox ol li:nth-child(2){background:#ff6654;color:#fff;border-radius:0 0 3px 0;}\
@-webkit-keyframes show{\
0%{opacity:0;margin-top:-50%;}\
30%{opacity:0;}\
100%{opacity:1;margin-top:0;}}\
@keyframes show{\
0%{opacity:0;margin-top:-50%;}\
30%{opacity:0;}\
100%{opacity:1;margin-top:0;}}\
.show{-webkit-animation:show .3s linear;animation:show .3s linear;display:block;}\
@-webkit-keyframes hide{\
0%{opacity:1;margin-top:0;}\
70%{opacity:0;}\
100%{opacity:0;margin-top:-50%;}}\
@keyframes hide{\
0%{opacity:1;margin-top:0;}\
70%{opacity:0;}\
100%{opacity:0;margin-top:-50%;}}\
.hide{-webkit-animation:hide .3s linear;animation:hide .3s linear;display:block;}\
.changeTC.TC1 .changebox{width:80%;} @media screen and (min-width:320px){.changeTC.TC1 .changebox{width:90%;}} @media screen and (min-width:360px){.changeTC.TC1 .changebox{width:80%;}}.changeTC.TC1 h4{padding:10px;font-size:18px;}.TC1 .changebox ul{padding:0 20px 0 43px;margin:0;border:0;}.TC1 .changebox ul li{border:0;padding:0;text-align:left;margin-bottom:10px;font-size:13px;}.TC1 .changebox ul li em{padding:0 4px;border-radius:3px;color:#fff;background:#ff6654;margin-left:-24px;float:left;}.changeTC.TC1 label{display:block;width:100%;padding:11px 0;text-align:center;color:#fff;background:#ff6654;font-size:16px;border-radius:0 0 3px 3px;}.changeTC.TC1 .guanzhu{padding:0 38px;margin-bottom:10px;}.changeTC.TC1 .guanzhu img{width:100%;}.changebox p.sjbt{padding:0;margin:0;color:#ff6654;font-size:13px;margin-bottom:3px;}.scsty{color:#3f61ae;text-decoration:underline;padding-top:4px;}.changebox p.nop{margin:0;padding:0;padding-top:5px;font-size:13px;}');
		createNode(DB,'div',{className:'changeTC',id:'changeTC',html:'<div class="changebox">\
			<h4>若您的手机号码变更，请立即更换</h4>\
			<p>您的注册信息我们不会分享、透露给任何第三方服务商</p>\
			<ul>\
				<li class="inp"><input type="text" id="inp1" placeholder="输入新手机号"><span onclick="mainVar.call.yzfn(0)">获取验证码</span></li>\
				<li class="tanz"><input type="text" id="inp2" placeholder="输入验证码"></li>\
			</ul>\
			<ol>\
				<li id="close" onclick="mainVar.call.close(0);">取消</li>\
				<li id="confirm" onclick="mainVar.call.confirm(0)">确定</li>\
			</ol>\
		</div>\
		<div class="changebox">\
			<h4>请您注册成为'+PAGE.channelName+'频道会员</h4>\
			<p style="text-align:justify;">为了给您提供更好的服务和保证，请您注册会员以便在必要时联系到您。您的注册信息我们不会分享、透露给任何第三方服务商。</p>\
			<ul>\
				<li class="inp"><input type="text" id="inp1" placeholder="输入新手机号"><span onclick="mainVar.call.yzfn(1)">获取验证码</span></li>\
				<li class="tanz"><input type="text" id="inp2" placeholder="输入验证码"></li>\
			</ul>\
			<ol>\
				<li id="close" onclick="mainVar.call.close(1);">继续查看</li>\
				<li id="confirm" onclick="mainVar.call.confirm(1)">注册</li>\
			</ol>\
		</div>'},'p3');
		createNode(DB,'div',{className:'changeTC TC1',id:'TC1',html:'<div class="changebox" id="TC2">\
		  <h3><img src="'+getHead(user.weixin_avatar_url)+'">您目前的余额钱包上限是<span class="ft_red">'+mainVar.walletSize+'元</span></h3>\
			<h4>升级您的余额钱包</h4>\
			<ul>\
				<li><em>1</em><p class="sjbt">让钱包变大，存入更多余额</p>去商城购物，消费的余额越多，返现越多，钱包能存入的余额金额就越大~<a class="scsty" href=javascript:goUrl("M_SC_NEW")>猛戳这里，进入商城</a></li>\
				<li><em>2</em><p class="sjbt">把余额转走，恢复钱包继续存余额</p>把余额转入天天电视宝公众号，便能存入辛苦赚来的余额。天天电视宝有更多惊喜商品，还有一元夺宝！<p class="nop">长按下方关注，获得更多信息</p></li>\
			</ul>\
			<div class="guanzhu"><img src="'+PAGE.COMMON+'img/guanzhu.gif"></div>\
			<label onclick="mainVar.call.TCclose();">我知道了</label>\
		</div>'},'p3');
		var cbox=changeTC.querySelectorAll('.changebox');
		var inps1=changeTC.querySelectorAll('#inp1');
		var inps2=changeTC.querySelectorAll('#inp2');
		t.yzfn=function(_){
			if(inps1[_].value==''){
				tishi('请输入手机号')
				return
			}
			if(!t.yz(inps1[_].value)){
				tishi('请输入11位正确的手机号')
				return
			}
			bindmobile(inps1[_].value,_);
		}
		t.yz=function(_){
			var regMobile=/^0?\d{11}$/,mflag=regMobile.test(_);
			return mflag
		}
		t.confirm=function(_){
			if(inps1[_].value==''){
				tishi('请输入手机号')
				return
			}
			if(inps2[_].value==''){
				tishi('请输入验证码')
				return
			}
			if(!t.yz(inps1[_].value)){
				tishi('请输入11位正确的手机号')
				return
			}
			sendmobile(inps1[_].value,inps2[_].value,function(){
				setZT&&setZT('手机号 <font id="yh_status">'+(inps1[_].value.substr(0,3)+'****'+inps1[_].value.substr(7))+'</font> <span onclick="gobindmobile(0);">重置</span>');
				Phonecallback&&Phonecallback();
				if(mainVar.prizeData){
					var ele=mainVar.ele;
					if(ele){
						lingjiang.init(ele.overall_obj,ele.overall_tag)
					};
				};
				t.close(_);
			},_);
		}
		t.open=function(e){
			changeTC.style['display']='block';
			cbox[e].classList.add('show');
		}
		t.close=function(e){
			inps1[e].value='';
			inps2[e].value='';
			cbox[e].classList.remove('show');
			cbox[e].classList.add('hide');
			setTimeout(function(){cbox[e].classList.remove('hide');changeTC.style['display']='none';},300)
		}
		t.TCopen=function(){
			TC1.style['display']='block';
			TC2.classList.add('show');
		}
		t.TCclose=function(){
			TC2.classList.remove('show');
			TC2.classList.add('hide');
			setTimeout(function(){TC2.classList.remove('hide');TC1.style['display']='none';},300)
		}
	};
	function writeInfo(mobile,tOpenid,fn){
		if(mainVar.ele.wiContainer){
			mainVar.ele.wiContainer.className='wiContainer wiFadeIn';
		}else{
			var css='\
			.wiContainer{background:#f0f0f0;height:100%;width:100%;position:fixed;z-index:3199;top:0;display:none;-webkit-overflow-scrolling:touch;overflow-y:scroll;}\
			.wiFadeIn{display:block;}\
			.wiFadeOut{display:none;}\
			';
			setStyle(css)
			var wiContainer=mainVar.ele.wiContainer=createNode(DB,'div',{className:'wiContainer wiFadeIn',style:"overflow:auto"});
		}

		var host="//qa.h5.mtq.tvm.cn/yao/join_us/",user=mainVar.userInfo;
			setJsonp(host+"register.js?",function(){
			register({
				box:wiContainer,phone:(mobile||''),
				openid:user.ttdsbid||tOpenid||user.openid,
				headImg:user.weixin_avatar_url,
				nickname:decodeURIComponent(user.nickname),
				zIndex:3200,
				change:function(data){
					mainVar.writeInfo=true;
					mainVar.personInfo=data;
					wiContainer.className='wiContainer wiFadeOut';
					fn&&fn();
				}
			})
		})
		};
	//生成中奖信息
function createPrizeInfo(options){
	var css='.popupContainer{height:100%;width:100%;position:fixed;top:0;left:0;z-index:101;background:rgba(0,0,0,0.7);font-weight:normal;margin:0;padding:0;}\
.popupContainer .flower{width:7.5rem;height:1.75rem;position:absolute;top:0;left:0;background:url(//a-h5.mtq.tvm.cn/yao/common/img/smallRedPack.png);background-size:100% 100%;z-index:1;pointer-events:none;}\
.popup,.popup .content{border-radius:0.08rem;overflow:hidden;}\
.popup{width:6.65rem;text-align:center;background:#c04d3b;padding-bottom:0.45rem;position:absolute;top:0.6rem;left:50%;margin-left:-3.32rem;}\
.popup h2{font-size:0.42rem;color:#ffbc64;height:0.88rem;line-height:0.88rem;margin:0;padding:0;}\
.popup .close{background:url(//a-h5.mtq.tvm.cn/yao/common/img/r_close.png);background-size:100% 100%;height:0.3rem;width:0.3rem;position:absolute;top:0.27rem;left:0.27rem;}\
.popup .content{background:#fff;margin:0 auto;width:6.09rem;padding:0.52rem 0 0.48rem 0;}\
.popup .content img{width:4.5rem;height:auto;}\
.popup .content .name{font-size:0.3rem;width:4.83rem;margin:0.3rem auto 0.45rem;/*text-align:left;*/word-break:break-all;}\
.popup .content .cardCode{text-align:center;}\
.popup .content .button{display:inline-block;font-size:0.36rem;background:#05b010;width:4.64rem;height:0.9rem;line-height:0.9rem;text-align:center;color:#fff;border-radius:0.1rem;}\
.popup .content .tip{font-size:0.28rem;line-height:0.5rem;padding:0.25rem 0;margin:auto;}\
.popup .red{font-size:0.3rem;color:#fc1d03;}\
.popup .content .name p{text-align:left;margin-bottom:0.1rem;}\
.popup .content .name .prizeName{margin-bottom:0.4rem;text-align:center;}\
.popup .content .annotation01{}\
.popup .content .annotation02{color:#858585;}\
.popupIn{-webkit-animation:popupIn 800ms forwards;}\
@-webkit-keyframes popupIn{\
	0%{opacity:0;top:-100%;}\
	100%{opacity:1;top:0.6rem;}\
}'
setStyle(css)
	function fontSize(){
		 DO.documentElement.style.fontSize=100*DO.documentElement.clientWidth/750+'px';
		 if(navigator.userAgent.indexOf('HTC M8Sw')!=-1){
			DO.documentElement.style.fontSize=65+'px';
		 };
	};
	fontSize();
	window.onresize=fontSize;
	popupContainer=createNode(DB,'div',{'className':'popupContainer','html':createPrizeContent(options)});
	var btn=popupContainer.querySelector('.button');
	popupContainer.querySelector('.button').onclick=function(e){
		noPop(e);
		showLoading();
		var ajax=setAjax('post',HOST.CJ+'/open/order/update/address'),user=mainVar.userInfo,personInfo=mainVar.personInfo,area=personInfo.area||{};
		ajax.data=JSON.stringify({name:user.nickname,channelId:PAGE.channelId.toString(),icon:user.weixin_avatar_url,openId:user.openid,code:user.code,yyyappId:PAGE.yyyappId,sigExpire:user.sigExpire,orderId:mainVar.prizeData.orderId,receive:{name:personInfo.receiver,phoneNum:personInfo.mobile,address:area.province+area.city+area.county+personInfo.addr}});
		ajax.set=function(){this.setRequestHeader("Content-type","application/json; charset=UTF-8; text/html")}
		ajax.callBack=function($data){
			var data=toObject($data)
			hideLoading();
			if(data.status=="success"){
				tishi(CONFIG.chars.form.k,{time:3e3});
				setStorage("set","hjgy"+mainVar.prizeData.orderId,1);
				rmPop();
				var prizeBtn=mainVar.ele.overall_obj;
				if(prizeBtn.className=='contentBox contentInBox'){
					toview(prizeBtn);	
				}else{
					prizeBtn.className='';
					prizeBtn.removeAttribute('onclick');
					prizeBtn.innerHTML='已领取';
				};
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
};
function personalInfor(){
	location='//qa-h5.mtq.tvm.cn/yao/join_us/personalInfor.html?openid='+user.ttdsbid+'&headImg='+user.weixin_avatar_url+'&nickname='+user.nickname+'&phone='+user.phone+'&redirect='+encodeURIComponent(location.href)
	}
function createPrizeContent(options){
	var structure='<p class="flower"></p>\
				   <div class="popup popupIn">\
		           	  <h2>恭喜您获得</h2>\
					  <span class="close" onclick="rmPop()"></span>\
					  <div class="content" title="0">\
					  	  <img src="'+options.pic+'">\
						  	<div class="name">\
								<p class="prizeName">'+options.name+'</p>\
								<p class="annotation01">配送地址：</p>\
								<p class="addr">'+mainVar.personInfo.addr+'</p>\
								<p class="annotation02">（如需其他服务请联系客服人员）</p>\
							</div>\
							<span class="button">我知道了</span>\
						  </div>\
				   </div>';
	return structure;
};
function rmPop(){
	removeNode(popupContainer);
}
function getInkind(data,bool){
	if(bool){
		setTimeout(function(){
			createPrizeInfo(data)
		},1000);
	}else{
		createPrizeInfo(data)
	};
};
function showLoading(options){
	var options=options||{}
	if(!mainVar.ele.loading){
		var css='.oldLoading{background:url(//a-h5.mtq.tvm.cn/yao/common/img/loading.gif) no-repeat center center;height:25px;width:25px;position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);background-color:rgba(0,0,0,.8);padding:15px;background-size:25px 25px;box-sizing:content-box;border-radius:6px;z-index:'+(options.zIndex||999999)+';}';
	setStyle(css);
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
function getTvme(options){
	if(mainVar.tvmE){
		options.callBack&&options.callBack();
	}else{
		//JS文件测试环境地址：HOST.DSPJS+'/demo/etag/v0.9/tvme-0.9.js'
		//正式CDN文件地址HOST.DSPJS+'/cdn/etag/tvme-0.9.js'
		setJsonp(HOST.DSPJS+'/demo/etag/v0.9/tvme-0.9.js',function(){
			mainVar.tvmE=new tvmE()
			options.callBack&&options.callBack();
		});
	};
};
function throughTrain(){
	getTvme({
		callBack:function(){
			var tip=mainVar.status;
			setTimeout(function(){
				tip.txt('开始调用接口');
			},3e3);
			mainVar.tvmE.getadbyca('',mainVar.location.adcode,mainVar.location.region,function($data){
				var _data=toObject($data),data='',arr=[];
				if(_data.errcode==0){
					setTimeout(function(){
						tip.txt('己返回数据');
					},3e3);
					data=_data.data;
					arr=data.cards[0];
					arr.columnid=data.columnid;
					if(arr.acttype==2||arr.acttype==3){
						shakeChina=new shakeChinaCar(arr);
						shakeChina.init();
					};
				}else{
					setTimeout(function(){
						tip.txt('不在投放区域');
					},3e3);
				};
			},encodeURIComponent("channelid="+PAGE.channelId));
		}
	});
};
function shakeChinaCar(options){
	var css='\
@media screen and (min-width:320px) and (max-width:359px){\
	.shakeChinaCon{font-size:42.667px;}\
	.goldEggCon{height:12.52em}\
	.testimonials textarea{font-size:11px;margin-top:30px;height:156px;}\
}\
@media screen and (max-width:320px) and (max-height:568px){ /5s/  \
	.shakeChinaCon{font-size:42.667px;}\
	.goldEggCon{height:12.52em;}\
	.testimonials textarea{font-size:11px;margin-top:30px;height:156px;}\
}\
@media screen and (max-width:320px) and (max-height:504px){ /*ipod*/  \
	.goldEggCon{height:100%;}\
	.goldEggCon .winPrizeList{margin-top:0.6em;}\
	.goldEggCon .winPrizeList .con{height:3.2em;}\
}\
@media screen and (max-width:320px) and (max-height:480px){ /*4s*/  \
	.goldEggCon{height:100%;}\
	.goldEggCon .winPrizeList{margin-top:0.6em;}\
	.goldEggCon .winPrizeList .con{height:2.7em;}\
}\
@media screen and (max-width:320px) and (max-height:416px){ /*4*/  \
	.shakeChinaCon{font-size:35px;}\
	.goldEggCon .winPrizeList .con{height:3.2em;}\
}\
@media screen and (min-width:360px) and (max-width:374px){\
	.shakeChinaCon{font-size:48px;}\
	.goldEggCon .smashEgg li{width:1.5em;height:2.1em;}\
	.goldEggCon .smashEgg .eggAfter img{width:3.10em;}\
	.goldEggCon{height:10.5em;}\
	.goldEggCon .winPrizeList{margin-top:0.6em;}\
	.goldEggCon .winPrizeList .con{height:2.4em;}\
	.testimonials textarea{font-size:12px;margin-top:32px;height:175px;}\
}\
@media screen and (min-width:360px) and (max-height:567px){ \
	.goldEggCon{height:11.5em;}\
	.goldEggCon .winPrizeList .con{height:3.25em;}\
}\
@media screen and (min-width:360px) and (max-height:519px){ \
	.shakeChinaCon{font-size:48px;}\
	.goldEggCon .smashEgg li{width:1.5em;height:2.1em;}\
	.goldEggCon .smashEgg .eggAfter img{width:3.10em;}\
	.goldEggCon{height:10.5em;}\
	.goldEggCon .winPrizeList{margin-top:0.6em;}\
	.goldEggCon .winPrizeList .con{height:2.4em;}\
	.testimonials textarea{font-size:12px;margin-top:32px;height:175px;}\
}\
@media screen and (min-width:375px) and (max-width:413px){\
	.shakeChinaCon{font-size:50px;}\
	.goldEggCon{height:12.52em;}\
	.testimonials textarea{font-size:13px;margin-top:34px;height:183px;}\
}\
@media screen and (min-width:414px){\
	.shakeChinaCon{font-size:55.2px;}\
	.goldEggCon{height:12.52em;}\
	.testimonials textarea{font-size:14px;margin-top:38px;height:202px;}\
}\
body{padding:0;margin:0;}\
.shakeChinaCon{height:100%;width:100%;background:rgba(0,0,0,.7);z-index:3100;position:absolute;top:0;left:0;font-family:weiruanyahei,FZYQJW,"微软雅黑",Tahoma,"\534E\6587\5B8B\4F53",arial;}\
.shakeChinaCon *{box-sizing:content-box;}\
.shakeChinaCon ul,.shakeChinaCon li,.shakeChinaCon p,.shakeChinaCon{list-style:none;margin:0;padding:0;}\
.shakeChinaCon img{vertical-align:middle;}\
.shakeChinaCon b{vertical-align:top;display:inline-block;height:100%;width:100%;font-weight:normal;}\
.shakeChinaBox{position:relative;opacity:0;height:100%;width:100%;}\
.shakeChinaBoxIn{-webkit-animation:shakeChinaBoxIn 800ms ease-out forwards;}\
@-webkit-keyframes shakeChinaBoxIn{\
	  0% {-webkit-transform:scale(0,0);opacity:0;}\
    60% {-webkit-transform:scale(1.2,1.2);}\
   100% {-webkit-transform:scale(1,1);opacity:1;}\
}\
.shakeChinaBoxOut{-webkit-animation:shakeChinaBoxOut 500ms ease-in forwards;}\
@-webkit-keyframes shakeChinaBoxOut{\
	   0% {-webkit-transform:scale(1,1);opacity:1;}\
	  40% {-webkit-transform:scale(1.2,1.2);}\
     100% {-webkit-transform:scale(0,0);opacity:0;}\
}\
.shakeChinaBox .firstScreen,.shakeChinaBox .goldEggCon{width:6.5em;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);}\
.shakeChinaBox .closeOut{background:rgba(0,0,0,0.5);color:#fff;line-height:1em;padding:0 0.1em;text-align:right;position:absolute;right:0;top:0;height:1.1em;width:1em;border-bottom-left-radius:1.1em;border-top-left-radius:0;}\
.shakeChinaBox .closeOut b{font-size:0.4em;}\
/*首屏*/ \
.firstScreen{color:#fff;text-align:center;}\
.firstScreen .pic img{width:100%;min-height:6em;}\
.firstScreen .text{line-height:0.4em;padding:0.28em 0 0.26em 0;}\
.firstScreen .text b{font-size:0.28em;vertical-align:top;}\
.firstScreen .buttonParent{height:0.78em;overflow:hidden;}\
.firstScreen .button{display:inline-block;padding:0 0.7em;height:100%;line-height:0.78em;text-align:center;background:#cc0001;border-radius:0.1em;margin:0 auto; vertical-align:top;}\
.firstScreen .button b{font-size:0.36em;}\
/*弹出窗*/\
.shakeChinaPopup{width:5em;background:#fff;border-radius:0.15em;position:absolute;top:40%;left:50%;overflow:hidden;-webkit-transform-origin:center center}\
.shakeChinaPopupIn{-webkit-animation:shakeChinaPopupIn 600ms forwards ease-out;}\
@-webkit-keyframes shakeChinaPopupIn{\
	 0% {-webkit-transform:scale(0,0);opacity:0;}\
    60% {-webkit-transform:scale(1.2,1.2);}\
   100% {-webkit-transform:scale(1,1);opacity:1;}\
}\
.shakeChinaPopupOut{-webkit-animation:shakeChinaPopupOut 400ms forwards ease-out;}\
@-webkit-keyframes shakeChinaPopupOut{\
     0% {-webkit-transform:scale(1,1);opacity:1;}\
   100% {-webkit-transform:scale(0,0);opacity:0;}\
}\
.shakeChinaPopup .close{line-height:0.8em;top:0;right:0.3em;position:absolute;}\
.shakeChinaPopup .close b{font-size:0.3em;}\
.activityRule .title{line-height:0.8em;top:0;position:absolute;left:50%;-webkit-transform:translateX(-50%);}\
.activityRule .title b{font-size:0.3em;}\
.activityRule .content{width:4.28em;min-height:3em;margin:0.8em auto 0;line-height:0.46em;margin-bottom:0.4em;color:#535353;max-height:6em;overflow:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;}\
.activityRule .content b{font-size:0.26em;}\
.activityRule .button{display:block;color:#fff;background:#cc0001;height:0.76em;line-height:0.76em;text-align:center;}\
.activityRule .button b{font-size:0.36em;}\
.shakeChinaWinPrize{text-align:center;}\
.shakeChinaWinPrize .pic{background:url(//a-h5.mtq.tvm.cn/yao/common/img/prizeBg.png) no-repeat;background-size:100% auto;background-origin:content-box;padding-top:0.36em;height:3.11em;margin-bottom:0.07em;position:relative;}\
.shakeChinaWinPrize .pic img{position:absolute;top:60%;left:50%;-webkit-transform:translate3d(-50%,-50%,0);}\
.shakeChinaWinPrize .pic .promotionCode{width:3.4em;}\
.shakeChinaWinPrize .pic .url{width:3.4em;}\
.shakeChinaWinPrize .pic .favorable{width:4.64em;}\
.shakeChinaWinPrize .pic .redPack{width:2em;max-height:2.5em;top:58%;}\
.shakeChinaWinPrize .pic .participation,.shakeChinaWinPrize .pic .noChange{width:1.66em;max-height:2.34em;top:58%;}\
.shakeChinaWinPrize .tip{line-height:0.65em;color:#e53a31;}\
.shakeChinaWinPrize .promotionCode .tip,.shakeChinaWinPrize .redPack .tip,.shakeChinaWinPrize .favorable .tip{font-weight:bold;}\
.shakeChinaWinPrize .explain{line-height:0.34em;color:#e53a31;margin:0.2em 0;}\
.shakeChinaWinPrize .explain b{font-size:0.26em;}\
.shakeChinaWinPrize .tip b{font-size:0.36em;}\
.shakeChinaWinPrize .pirzeName{line-height:0.46em;}\
.shakeChinaWinPrize .pirzeName b{font-size:0.3em;color:#000;max-width:75%;text-align:left;}\
.shakeChinaWinPrize p.noChange,.shakeChinaWinPrize p.participation{margin-bottom:0.4em;}\
.shakeChinaWinPrize .noChange b,.shakeChinaWinPrize .participation b{color:#e53a31;max-width:62%;}\
.shakeChinaWinPrize .pirzeName b em{font-style:normal;color:#e53a31;}\
.shakeChinaWinPrize .button{color:#fff;background:#cc0001;height:0.76em;line-height:0.76em;}\
.shakeChinaWinPrize .button b{font-size:0.36em;}\
.testimonials{text-align:center;}\
.testimonials .title{line-height:0.8em;top:0;position:absolute;left:50%;-webkit-transform:translateX(-50%);}\
.testimonials .title b{font-size:0.3em;}\
.testimonials .textBox{width:4.24em;margin:0 auto;}\
.testimonials textarea{font-family:weiruanyahei,FZYQJW,"微软雅黑",Tahoma,"\534E\6587\5B8B\4F53",arial;width:100%;border:none;resize:none;padding:0;}\
.testimonials .statistics{text-align:right;line-height:0.3em;height:0.3em;overflow:hidden;color:#a7a7a7;margin-bottom:0.15em;}\
.testimonials .statistics b{font-size:0.26em;}\
.testimonials .btnArea{height:0.76em;line-height:0.76em;overflow:hidden;}\
.testimonials .btnArea span{display:inline-block;height:100%;width:100%;width:50%;color:#fff;}\
.testimonials .btnArea span b{font-size:0.36em;}\
.testimonials .btnArea .btnBefore{background:#d3d3d3;}\
.testimonials .btnArea .btnAfter{background:#cc0001;}\
.goldEggCon{background:#ffe881 url(//a-h5.mtq.tvm.cn/yao/common/img/goldEgBanner.jpg) no-repeat center top;background-size:100% auto;display:none;}\
.goldEggCon .ruleElem,.goldEggCon .chance{color:#fff;background:rgba(43,28,78,1);text-align:center;position:absolute;}\
.goldEggCon .ruleElem b,.goldEggCon .chance b{font-size:0.28em;}\
.goldEggCon .ruleElem{padding:0 0.2em;height:0.58em;line-height:0.58em;border-radius:0.4em;top:0.15em;left:0.1em;}\
.goldEggCon .chance{padding:0 0.5em;height:0.6em;line-height:0.6em;border-radius:0.4em;top:3.35em;left:50%;-webkit-transform:translateX(-50%);white-space:nowrap;}\
.goldEggCon .chance em{color:#ffee17;font-size:1.5em;font-style:normal;display:inline-block;vertical-align:top;margin-top:-2px;}\
.goldEggCon .radiusCon{position:absolute;top:4.9em;width:100%;background:#ffe881;}\
.smashEgg{background:url(//a-h5.mtq.tvm.cn/yao/common/img/radius.png) no-repeat center top;background-size:100% auto;margin-top:-0.68em;}\
.smashEgg ul{width:5.84em;margin:0 auto;padding-top:0.36em;text-align:center;}\
.smashEgg li{display:inline-block;margin:0 0.12em;width:1.68em;height:2.42em;vertical-align:middle;position:relative;z-index:2;}\
.smashEgg li img{width:100%;}\
.smashEgg li .egg{background:url(//a-h5.mtq.tvm.cn/yao/common/img/eggBtottom.png) no-repeat center bottom;background-size:100% auto;padding-bottom:0.4em;height:100%;width:100%;position:relative;}\
.smashEgg .eggAfter img{width:3.34em;position:absolute;left:-0.68em;top:-1.1em;max-width:none;}\
.smashEgg .hammer{display:none;width:1em;top:-0.3em;right:-0.30em;position:absolute;}\
.smashEgg .open{display:block;}\
.smashEgg .hammerIn{-webkit-animation:hammerIn 600ms ease-in forwards;-webkit-transform-origin:right bottom;}\
@-webkit-keyframes hammerIn{\
	0% {-webkit-transform:rotate(0deg);}\
   40% {-webkit-transform:rotate(48deg);}\
  100% {-webkit-transform:rotate(-18deg);}\
}\
.winPrizeList{width:6.18em;margin:0.8em auto 0;}\
.winPrizeList .title{width:68%;margin:0 auto 0.1em;line-height:0;text-align:center;}\
.winPrizeList .title img{width:100%;}\
.winPrizeList .con{height:3.66em;border:0.06em solid #ffa500;border-radius:4px;background:#fefad7;overflow:hidden;box-sizing:border-box;position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch;}\
.winPrizeList .con .load,.winPrizeList .con .without{height:20px;line-height:20px;font-size:12px;text-align:center;padding:5px 0;}\
.winPrizeList .con .load span{background:url(//a-h5.mtq.tvm.cn/yao/common/img/loading.gif) no-repeat center top;background-size:100%;height:20px;width:20px;display:inline-block;margin-right:5px;vertical-align:middle;}\
.winPrizeList .emptyData{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);height:20px;line-height:20px;font-size:14px;}\
.winPrizeList li{padding-top:0.13em;position:relative;}\
.winPrizeList .headImg{width:20%;height:100%;position:absolute;top:0;left:0;}\
.winPrizeList .headImg img{width:80%;border-radius:50%;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);}\
.winPrizeList .content{width:80%;border-bottom:1px solid #e9e9e9;padding-bottom:0.16em;margin-left:20%;}\
.winPrizeList .content .top{height:0.48em;line-height:0.48em;}\
.winPrizeList .name,.winPrizeList .prizeInfo{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}\
.winPrizeList .name{font-size:0.3em;float:left;color:#52649a;width:30%;}\
.winPrizeList .prizeInfo{font-size:0.26em;float:right;color:#da2d1e;width:65%;text-align:right;padding-right:2%;}\
.winPrizeList .content .bottom{line-height:0.48em;padding-right:2%;overflow:hidden;}\
.winPrizeList .publishInfo{font-size:0.3em;color:#979797;float:left;}\
.winPrizeList .time{font-size:0.26em;color:#979797;float:right;}'
setStyle(css)
	var t=this,shakeChinaCon=null,shakeChinaBox=null,shakeChinaPopup={},firstScreen=null,goldEggCon=null,originPrizeData=null,nowPrizeData=null,speak={},user=mainVar.userInfo,basicConfig=null,pageIndex=0,
	isReadConfig=0,isCanSmach=true,zIndex=0,eggSwitch=true,scrollCon=null;
	t.init=function(){  //初始化，生成首屏
		DO.documentElement.style['overflow']='hidden';
		DB.style['overflow']='hidden';
		DB.style['height']=winH+'px';
		shakeChinaCon=createNode(DB,'div',{className:'shakeChinaCon',style:'height:'+winH+'px;'},'p3');
		shakeChinaBox=createNode(shakeChinaCon,'div',{className:'shakeChinaBox',html:''},'p3');
		var firstScreenHtml='<span class="closeOut" action="closeShakeChina"><b>关闭</b></span>\
							 <p class="pic" action="enterEgg"><img src="'+options.banner+'"></p>\
							 <p class="text"><b class="word">'+options.desc+'</b></p>\
							 <p class="buttonParent"><span class="button" action="enterEgg"><b class="word">'+options.text+'</b></span></p>';
		firstScreen=createNode(shakeChinaBox,'div',{className:'firstScreen',html:firstScreenHtml},'p3');
		var goldEggHtml='<span class="ruleElem" action="activeRule.,activityRuleBox"><b>活动规则</b></span>\
							<span class="chance" style="display:none;"><b>你还有<em>？</em>次机会</b></span>\
							<div class="radiusCon">\
								<div class="smashEgg">\
								<ul>\
									<li action="smashEgg">\
										<p class="egg"><img src="//a-h5.mtq.tvm.cn/yao/common/img/eggBefore.png"></p>\
										<p class="egg eggAfter" style="display:none;"><img src="//a-h5.mtq.tvm.cn/yao/common/img/eggAfter.png"></p>\
										<p class="hammer"><img src="//a-h5.mtq.tvm.cn/yao/common/img/hammer.png"></p>\
									</li><li action="smashEgg">\
										<p class="egg"><img src="//a-h5.mtq.tvm.cn/yao/common/img/eggBefore.png"></p>\
										<p class="egg eggAfter" style="display:none;"><img src="//a-h5.mtq.tvm.cn/yao/common/img/eggAfter.png"></p>\
										<p class="hammer"><img src="//a-h5.mtq.tvm.cn/yao/common/img/hammer.png"></p>\
									</li><li action="smashEgg">\
										<p class="egg"><img src="//a-h5.mtq.tvm.cn/yao/common/img/eggBefore.png"></p>\
										<p class="egg eggAfter" style="display:none;"><img src="//a-h5.mtq.tvm.cn/yao/common/img/eggAfter.png"></p>\
										<p class="hammer open"><img src="//a-h5.mtq.tvm.cn/yao/common/img/hammer.png"></p>\
									</li>\
								</ul>\
							</div>\
							<div class="winPrizeList">\
								<p class="title"><img src="//a-h5.mtq.tvm.cn/yao/common/img/prizeLite.jpg"></p>\
								<div class="con"><ul><div class="emptyData">暂无数据！</div></ul></div>\
							</div>\
						</div>';
		goldEggCon=createNode(shakeChinaBox,'div',{className:'goldEggCon',html:goldEggHtml+'<span class="closeOut" action="closeShakeChina"><b>关闭</b></span>'},'p3');
		setTimeout(function(){
			shakeChinaBox.style.opacity=1;
			shakeChinaBox.classList.add("shakeChinaBoxIn");
		},300);
		zIndex=getComputedStyle(shakeChinaCon,false)['zIndex'];
		if(options.acttype==2){
			t.goldEgg();
		};
		shakeChinaCon.addEventListener('touchmove',function(e){//防止滑动摇动中国弹出层，页面也跟着滑动;
			if(scrollCon&&scrollCon.contains){
				if(!scrollCon.contains(e.target)){
					e.preventDefault()
				};
			}else{
				e.preventDefault()
			};
		},false)
		/*---砸金蛋入口页面上报---*/
		tjData.appName="砸金蛋入口页面";
		tjData.tvm_id='';
		tjData.content='';
		TJ(100000,'','','砸金蛋');
	};
	t.activityRule=function(){ //生成“活动规则”内容
		var str='<div class="activityRule">\
				 	<p class="title"><b>活动规则</b></p>\
					<p class="content"><b>'+basicConfig.data.desc.replace(/\n/g,'<br>')+'</b></p>\
					<span class="button" action="closeIn.,activityRuleBox"><b>我知道了</b></span>\
				 </div>'
		t.popup({
			html:str,
			name:'activityRuleBox'
		})
	};
	t.winPrize=function(data){ //生成中奖内容、谢谢参与内容、没机会了内容
		var prizeData=nowPrizeData=data,adMater="华联力宝",jsonData={oClass:"",pic:prizeData.pic,tip:"恭喜你中奖啦",content:"",explain:'奖品已存入您的中奖记录，<br>请到个人中心查看！',btnText:"立即领取"};
		t.distinguishPrize({
			inKindFn:function(){       //实物
				jsonData.oClass='promotionCode';
			},
			urkFn:function(){          //URL
				jsonData.oClass='url';
				jsonData.tip=adMater+'给您发大奖';
				jsonData.content="恭喜您获得<em>"+prizeData.prizeName+"</em>1件";
			},
			favorableFn:function(){    //优惠券
				jsonData.oClass='favorable';
				jsonData.tip=adMater+'给您发大奖';
				jsonData.content="恭喜您获得<em>"+prizeData.prizeName+"</em>1张";
			},
			redPacketFn:function(){    //红包
				jsonData.oClass='redPack';
				jsonData.content='恭喜您获得<em>'+prizeData.value+'元</em>现金红包1个';
				jsonData.tip=adMater+'给您发红包';
			},
			noPrizeFn:function(){      //没中奖---谢谢参与。
				jsonData={oClass:"participation",pic:"//a-h5.mtq.tvm.cn/yao/common/img/participation.png",tip:"",content:"别灰心！30日到店，百种礼品，现金红包，更大惊喜等着你！",explain:'',btnText:"再玩一次"};
			},
			noChanceFn:function(){     //没机会了。
				jsonData={oClass:"noChange",pic:"//a-h5.mtq.tvm.cn/yao/common/img/noChange.png",tip:"",content:"别灰心！30日到店，百种礼品，现金红包，更大惊喜等着你！",explain:'',btnText:"我知道了"};
			}
		});
		var tipStr='',explainStr='';
		jsonData.tip&&(tipStr='<p class="tip"><b>'+jsonData.tip+'</b></p>');
		jsonData.explain&&(explainStr='<p class="explain"><b>'+jsonData.explain+'</b></p>');
		var str='<div class="shakeChinaWinPrize">\
					<div class="pic"><img class="'+jsonData.oClass+'" src="'+jsonData.pic+'"></div>\
					'+tipStr+'\
					<p class="pirzeName '+jsonData.oClass+'"><b>'+jsonData.content+'</b></p>\
					'+explainStr+'\
					<p class="button" action="acceptThePrize"><b>'+jsonData.btnText+'</b></p>\
				</div>';
		t.popup({
			html:str,
			name:'prizeBox'
		});
	};
	t.createTestimonials=function(name){  //生成获奖感言盒子
		var maxLen=72;
		var str='<div class="testimonials">\
				 	<p class="title"><b>获奖感言</b></p>\
					<div class="textBox">\
						<textarea placeholder="中大奖了，分享下中奖心情"></textarea>\
						<p class="statistics"><b>0/'+maxLen+'</b></p>\
					</div>\
					<p class="btnArea"><span class="btnBefore" action="closeIn.,testimonialsBox"><b>等等再领取</b></span><span class="btnAfter" action="nowPulish.,testimonialsBox"><b>现在发表</b></span></p>\
				  </div>';
		t.popup({
			name:'testimonialsBox',
			html:str,
			callBack:function(){
				var testimonials=shakeChinaPopup[name].querySelector('.testimonials'),textarea=testimonials.querySelector('textarea'),statistics=testimonials.querySelector('.statistics b');
				textarea.addEventListener('input',function(){ //实时字数
					if(this.value.length>maxLen){
						this.value=this.value.substring(0,maxLen);
					};
					statistics.innerHTML=this.value.length+'/'+maxLen;
				},false);
				shakeChinaPopup['prizeBox'].style.visibility='hidden';
			}
		});
	};
	t.popup=function(json){ //生成弹窗外层结构
		var startClass=json.startClass?json.startClass:'shakeChinaPopupIn',curElem=null;
		curElem=shakeChinaPopup[json.name]=createNode(shakeChinaBox,'div',{className:'shakeChinaPopup '+startClass,html:json.html+'<span class="close" action="closeIn.,'+json.name+'"><b>关闭</b></span>'});
		curElem.style.cssText='width:'+curElem.offsetWidth+'px;height:'+curElem.offsetHeight+'px;margin:-'+(curElem.offsetHeight/2)+'px 0 0 -'+(curElem.offsetWidth/2)+'px;';
		json.callBack&&json.callBack();
	};
	t.goldEgg=function(){  //砸金蛋页面
		(function(){  //读取配置信息 578e0d1b351dba417a8dd900
			var ajax=setAjax('get',HOST.DOMAIN+'/lottery/yao/info?id='+options.actid);
				ajax.callBack=function($data){
					var data=toObject($data);
					if(data.status=="success"){
						isReadConfig=1;
						basicConfig=data;
						auto(data);
					}else{
						isReadConfig=2;
						
					};
				};
				ajax.err=function(){
					hideLoading();
					isReadConfig=3;
				};
				ajax.send();
		})();
		function auto(configInfo){
			goldEggCon.style.cssText="background-image:url("+configInfo.data.topBanner+")";
			(function(){ //请求次数。
				var ajax=setAjax('get',HOST.DOMAIN+'/lottery/yao/times?id='+configInfo.data._id+'&openId='+user.openid);
					ajax.callBack=function($data){
						var data=toObject($data);
						if(data.code==200){
							var oChance=goldEggCon.querySelector('.chance'),chanceEm=oChance.querySelector('em'),num=configInfo.data.limit-data.data;
							oChance.style.display='block';
							chanceEm.innerHTML=num>0?num:0;
							if(num<=0){isCanSmach=false;}
						};
					};
					ajax.err=function(){};
					ajax.send();
			})();
			(function(){ //获奖感言的列表
				function loadSpeechList(_JSON){
					var ajax=setAjax('get',HOST.DOMAIN+'/lottery/yao/speech/list?id='+configInfo.data._id+'&pageIndex='+_JSON.index);
					ajax.callBack=function($data){
						var _data=toObject($data),data=_data.data,str='',surplusStr='';
						if(_data.code==200){
							for(var i=0,len=data.length;i<len;i++){
								switch(data[i].prizeType){
									case 105:
										surplusStr=data[i].value+'元'+'现金红包';
									break;
									default:
										surplusStr=data[i].prizeName;
									break;
								};
								str+='<li>\
										<p class="headImg"><img src="'+getHead(data[i].weixin_avatar_url)+'"></p>\
										<div class="content">\
											<div class="top">\
												<span class="name">'+data[i].nickname+'</span><span class="prizeInfo">领走了'+surplusStr+'</span>\
											</div>\
											<div class="bottom">\
												<p class="publishInfo">'+data[i].speech+'</p><span class="time">'+_getTime(data[i].dateTime)+'</span>\
											</div>\
										</div>\
									</li>';
							};
							_JSON.callBack&&_JSON.callBack(str);
						};
					};
					ajax.err=function(){};
					ajax.send();
				};
				
				loadSpeechList({
					index:pageIndex,
					callBack:function(htmlStr){
						if(htmlStr){
							var winPrizeList=goldEggCon.querySelector('.winPrizeList');
							winPrizeList.querySelector('ul').innerHTML=htmlStr;
							scrollLoad(winPrizeList);
						};
					}
				});
				function scrollLoad(winPrizeList){
					var oCon=scrollCon=winPrizeList.querySelector('.con'),oUl=oCon.querySelector('ul'),loading=null,without=null;
					oCon.onscroll=function(e){
						var oUlHeight=oUl.offsetHeight;
						if(oUlHeight-(this.scrollTop+oCon.offsetHeight)<=1){
							if(!loading){
								loading=createNode(oUl,'div',{className:'load',html:'<span></span>正在努力加载中...'});
							};
							loadSpeechList({
								index:++pageIndex,
								callBack:function(htmlStr){
									if(htmlStr){
										if(loading){removeNode(loading);loading=null};
										if(without){removeNode(without);without=null};
										oUl.innerHTML+=htmlStr;
									}else{
										--pageIndex;
										if(loading){removeNode(loading);loading=null};
										if(!without)without=createNode(oUl,'div',{className:'without',html:'已经到头了，没有数据啦！'});
									};
								}
							})
						};
						return false;
					};
				};
				function _getTime(pulishTime){
					var nowTime=+new Date(),dis=parseInt((nowTime-pulishTime)/1000),oneHousr=60*60;
					if(dis<60){
						return "刚刚";
					}else if(dis<oneHousr){
						return parseInt(dis/60)+"分之前";
					}else if(dis<12*oneHousr){
						return parseInt(dis/oneHousr)+"小时之前";
					}else{
						var curTime=new Date(pulishTime);
						return curTime.getFullYear()+'-'+(curTime.getMonth()+1)+'-'+curTime.getDate()+" "+curTime.getHours()+':'+curTime.getMinutes()+':'+curTime.getSeconds();
					};	
				};
			})();
		};
	};
	t.closeShakeChina=function(){ //点击最外面关闭按钮
		shakeChinaBox.classList.add('shakeChinaBoxIn');
		shakeChinaBox.classList.add('shakeChinaBoxOut');
		shakeChinaBox.addEventListener('webkitAnimationEnd',function(){
			hideLoading();
			removeNode(shakeChinaCon);
		},false)
	};
	t.enterEgg=function(){ //点击抽大奖赢红包按钮
		if(options.acttype==3){
			location.href=options.acturl;
			return;
		};
		shakeChinaBox.classList.remove('shakeChinaBoxIn');
		shakeChinaBox.classList.add('shakeChinaBoxOut');
		shakeChinaBox.addEventListener('webkitAnimationEnd',moveEnd,false);
		function moveEnd(){
			removeNode(firstScreen);
			shakeChinaBox.removeEventListener('webkitAnimationEnd',moveEnd,false);
			shakeChinaBox.classList.remove('shakeChinaBoxOut');
			shakeChinaBox.classList.add('shakeChinaBoxIn');
			goldEggCon.style.display="block";
			switch(isReadConfig){
				case 0:
					showLoading({"zIndex":zIndex});
					tishi('正在获取配置信息中...',{time:2e3});	
				break;
				case 2:
					tishi('配置信息获取失败。',{time:2e3});	
				break;
				case 3:
					tishi('配置信息获取超时',{time:2e3});
				break;
			};
			/*---砸金蛋入口页面上报---*/
			tjData.appName="砸金蛋互动页面";
			TJ(100000,'','','砸金蛋');
		};
	};
	t.smashEgg=function(curElem){ //砸金蛋
		if(!basicConfig){
			var _tip='';
			switch(isReadConfig){
				case 0:
					_tip='正在获取配置信息中...<br>请稍等会儿';
				break;
				case 2:
					_tip='配置信息获取失败,请稍后再来';
				break;
				case 3:
					_tip='配置信息获取超时,请稍后再来。';
				break;
			};
			tishi(_tip,{time:3e3});
			return;
		};
		if(!eggSwitch){return};
		eggSwitch=false;
		var smashEgg=goldEggCon.querySelector('.smashEgg'),oChance=goldEggCon.querySelector('.chance'),chanceEm=oChance.querySelector('em'),oLi=smashEgg.querySelectorAll('li'),curData=null;
		for(var i=0,len=oLi.length;i<len;i++){
			oLi[i].querySelector('.hammer').classList.remove('open');
		};
		curHammer=curElem.querySelector('.hammer');
		curHammer.classList.add('open');
		curHammer.classList.add('hammerIn');
		curHammer.addEventListener('webkitAnimationEnd',moveEnd,false);
		curElem.style.zIndex=0;
		audioPlay('//a-h5.mtq.tvm.cn/yao/common/media/dansui.mp3');
		function moveEnd(){
			var egg=curElem.children[0],eggAfter=curElem.children[1];
			egg.style.display="none";
			eggAfter.style.display="block";
			curElem.removeAttribute('action');
			if(isCanSmach){
				(function(){
					
					showLoading();
					var ajax=setAjax('POST',HOST.DOMAIN+'/lottery/yao/prize'),normalReturn=false;
					ajax.data='id='+basicConfig.data._id+'&channelId='+PAGE.channelId+'&wx_token='+PAGE.token+'&yyyappId='+PAGE.yyyappid+'&sign='+user.sig+'&sigExpire='+user.sigExpire+'&openId='+user.openid+'&user[openid]='+user.openid+'&user[nickname]='+decodeURIComponent(user.nickname)+'&user[username]='+decodeURIComponent(user.nickname)+'&user[country]='+user.country+'&user[province]='+user.province+'&user[city]='+user.city+'&user[sex]='+user.sex+'&user[weixin_avatar_url]='+user.weixin_avatar_url;
					ajax.callBack=function($data){
						hideLoading();
						var data=toObject($data);
						switch(+data.code){
							case 200: //中奖
								curData=data.data.prize;
								curData.type=0;
								t.winPrize(curData);
								reduceNum();
								normalReturn=true;
								tjData.result=1;
								tjData.timu=album_list(curData.prizeType);
								tjData.album_name=curData.prizeName;
								if(curData.prizeType==105){
									tjData.spend=curData.value*100;
								};
							break;
							case 10007:  //没中奖
								t.winPrize({type:1});
								reduceNum();
								tjData.result=0;
								normalReturn=true;
							break;
							case 10006:
								t.winPrize({type:2});//参与次数已经用尽
								isCanSmach=false;
							break;
							default:
								var tipStr='';
								switch(+data.code){
									case 10005: //活动已结束
									case 10004: //活动未开始
									case 10003: //配置信息不存在
									case 10002: //系统错误
										tipStr="请稍后再试！";
									break;
									case 10001: //签名错误
										tipStr="请刷新页面重新进入！";
									break;
									case 403: //频繁操作
										tipStr="请歇一会儿";
									break;
									default:
										tipStr="请稍后再试！";
									break;
								};
								t.winPrize({type:1});
								tishi(data.errMsg+","+tipStr,{time:3e3});
							break;
						};
						if(normalReturn){//中奖了or谢谢参与时上报
							tjData.appName="砸金蛋互动页面";
							tjData.tvm_id=basicConfig.data._id;
							tjData.content=basicConfig.data.name;
							tjData.content_id="";
							TJ(120000,'','','砸金蛋');
							tjData.tvm_id='';
							tjData.content='';
							tjData.timu='';
							tjData.album_name='';
							tjData.spend='';
							tjData.result='';
						};
					};
					ajax.err=function(){
						hideLoading();
						tishi("网络繁忙，请稍后重试！",{time:3e3});
						eggSwitch=true;
					};
					ajax.send();
					function reduceNum(){
						if(getComputedStyle(oChance,false)['display']=='block'){
							chanceEm.innerHTML-=1;
							if(chanceEm.innerHTML<=0){
								isCanSmach=false;
							};
						};
					};
				})();
			}else{
				t.winPrize({type:2});
			};
		};
	};
	t.activeRule=function(name){ //点击活动规则按钮
		!shakeChinaPopup[name]&&t.activityRule();
	};
	t.closeIn=function(name,bool){  //点击关闭按钮关闭弹出层
		var curElem=shakeChinaPopup[name];
		if(!curElem)return;
		switch(name){
			case 'testimonialsBox':
				if(bool){
					removeNode(shakeChinaPopup["prizeBox"])
					eggSwitch=true;
				}else{
					shakeChinaPopup["prizeBox"].style.visibility='visible';
				};
			break;
			case 'prizeBox':
				 eggSwitch=true;
			break;
		};
		curElem.classList.remove('shakeChinaPopupIn');
		curElem.classList.add('shakeChinaPopupOut');
		curElem.addEventListener('webkitAnimationEnd',moveEnd,false)
		function moveEnd(){
			curElem.removeEventListener('webkitAnimationEnd',moveEnd,false);
			removeNode(curElem);
			curElem=shakeChinaPopup[name]=null;
		};
	};
	t.nowPulish=function(name){//点击获奖感言的发表按钮
		var textarea=shakeChinaPopup[name].querySelector('textarea'),minLen=5;
		if(textarea.value.length==''){
			tishi('请填写获奖感言',{time:2e3});
			return;
		}else if(textarea.value.length<minLen){
			tishi('哎哟你写的获奖感言太少了，最少也要写5个字吧',{time:2e3});
			return;
		}else{
			(function(){
				showLoading();
				var ajax=setAjax('post',HOST.DOMAIN+'/lottery/yao/speech');
				ajax.data="dbId="+nowPrizeData.dbId+"&speech="+textarea.value;
				ajax.callBack=function($data){
					var data=toObject($data);
					hideLoading();
					if(data.code==200||data.code==10004){
						if(data.code==200){
							tishi('您的获奖感言提交成功',{time:2e3});
						}else{
							tishi('您已经填过了获奖感言',{time:2e3});
						};
						speak[nowPrizeData.orderId]=true;
						setTimeout(function(){
							t.closeIn('testimonialsBox',true);
							t.acceptThePrize();
						},800);
						setStorage('set',nowPrizeData.orderId,1);
					}else{
						tishi(data.code+'请稍后重试！',{time:2e3});
					};
				};
				ajax.err=function(){
					hideLoading();
					tishi('网络繁忙，请稍后重试！',{time:2e3});
				};
				ajax.send();
			})();
		};
	};
	t.acceptThePrize=function(){  //领奖
		t.distinguishPrize({
			inKindFn:function(){
				classify({
					fn:function(){
						tishi('实物领取成功！',{time:3e3})
					}
				})
			},
			urkFn:function(){
				classify({
					fn:function(){
						location.href=nowPrizeData.url;
					}
				})
			},
			favorableFn:function(){
				classify({
					fn:function(){
						t.closeIn('prizeBox');
						tishi('奖品已存入您的中奖记录，<br>请到个人中心查看！',{time:3e3});
						var infoStr=document.getElementById('infoStr');
						infoStr.style['width']='220px';
						setTimeout(function(){
							infoStr.style['width']='auto';
						},4e3)
					}
				})
			},
			redPacketFn:function(){
				classify({
					fn:function(){
						location.href=HOST.CJ+'/open/auth/ttdsb?orderId='+nowPrizeData.orderId+'&openId='+user.openid;
					}
				})
			},
			noPrizeFn:function(){
				t.closeIn('prizeBox');
			},
			noChanceFn:function(){
				t.closeIn('prizeBox');
			}
		});
		function classify(JSON){
			if(+nowPrizeData.fillProfile&&!mainVar.writeInfo){
				isWriteInfo({
					fn:function(){
						cback();
					}
				});
			}else{
				cback();
			};
			function cback(){
				if(+nowPrizeData.writeSpeech){
					if(speak[nowPrizeData.orderId]){
						JSON.fn&&JSON.fn();
					}else{
						t.createTestimonials('testimonialsBox');
					};
				}else{
					JSON.fn&&JSON.fn();
				};
			};
		};
	};
	t.distinguishPrize=function(json){
		switch(nowPrizeData.type){
			case 0: //中奖了。
				json.winPrizeFn&&json.winPrizeFn();
				switch(nowPrizeData.prizeType){
					case 1: //实物
						json.inKindFn&&json.inKindFn();
					break;
					case 3: //URL
						json.urkFn&&json.urkFn();
					break;
					case 9: //优惠券
						json.favorableFn&&json.favorableFn();
					break;
					case 105: //红包
						json.redPacketFn&&json.redPacketFn();
					break;
				};
			break;
			case 1: //没中奖----谢谢参与。
				json.noPrizeFn&&json.noPrizeFn();
			break;
			case 2: //没机会了。
				json.noChanceFn&&json.noChanceFn();
			break;
		};
	};
};
function isWriteInfo(options){
	showLoading();
	var user=mainVar.userInfo,ajax=setAjax('get',HOST.RTS+'/userinfo/get?yyyappid='+PAGE.yyyappid+'&yopenid='+user.openid);
	ajax.callBack=function($data){
		var data=toObject($data);
		hideLoading();
		if(data.status){
			mainVar.personInfo=data.data;
			if(data.data.info_status==2){
				mainVar.writeInfo=true;
				options.fn&&options.fn();
			}else{
				writeInfo(data.data.mobile,data.data.openid,options.fn);
			};
		}else{
			tishi("请重新进入！",{time:3e3});
		};
	};
	ajax.err=function(){
		hideLoading();
		tishi('获取身份失败，请稍微重试！',{time:3e3});
	};
	ajax.send();
};
function pc_getPrize(){
	var t=this,user=mainVar.userInfo,data;
	t.init=function(elem){
		data=mainVar.prizeData=mainVar.newdata.data[elem.parentNode.title];
		if(+data.fillProfile&&!mainVar.writeInfo){
			isWriteInfo({
				fn:function(){
					t.pc_isWriteHjgy();
				}
			});
		}else{
			t.pc_isWriteHjgy();
		};
	};
	t.pc_isWriteHjgy=function(){
		var flag=setStorage('get',data.orderId);
		if(+data.writeSpeech&&!flag){
			t.pc_createHjgy();
		}else{
			t.pc_goPrize();
		};
	};
	t.pc_createHjgy=function(){
		var a=""
		,b=CONFIG.chars.hjgy.g
		,c=CONFIG.chars.form.n
		,d=CONFIG.chars.button.c
		,html="",jnhtml=''
		,len=mainVar.speechlen=72;
		
		mainVar.speechfn=function(e){
			var val=e.value,nlen=val.length;
			speechlen.innerHTML=nlen;
		}
		a='<label onclick="popBox.popClose(1)" class="btn_bg popCloseButton">等等再领取</label>';
		if(data.type==102||data.type==103||data.type==104||data.type==105){d='发表感言领取红包';}
		data.type==104&&jinnang();
		function jinnang(){
			b='中奖是不是很激动？分享下您的中奖心情吧';
			c='提现确认';
			!mainVar.jnsty&&setStyle('.jinnang_gy{background:#ffd2c0;padding:7px 0}.jinnang_gy p{text-align:center;line-height:22px;color:#000;}.jinnang_gy p font{font-weight:900;color:#db5c48;}.closepop{width:20px;height:20px;display:inline-block;position:absolute;left:12px;top:12px;}.closepop:after,.closepop:before{display:inline-block;content:"";width:1px;height:20px;background:rgba(0,0,0,.4);transform:translateX(10px) translateY(2px) rotate(45deg);}.closepop:before{transform:translateX(10px) translateY(2px) rotate(-45deg)}');
			mainVar.jnsty=true;
			jnhtml='<em onclick="popBox.popClose(1)" class="closepop"></em><div class="jinnang_gy"><p>您目前的余额账户有 <font>'+mainVar.money+'元</font></p><p>本次可提现金额为 <font>'+mainVar._money+'元</font></p></div>';
		}
		html='<h3 class="poptitle">'+c+'</h3>'+jnhtml+'<div class="label">'+
		'<div class="speech"><textarea  placeholder="'+b+'" max-length="'+len+'" id="textarea" oninput="mainVar.speechfn(this)"></textarea></div>'+
		'<div class="limit"><span id="speechlen">0</span>/72</div></div><div class="btn">'+
		a+'<label action="sendHjgy" class="btn_bg">'+d+'</label></div>';
		popbox.querySelector('.pop').innerHTML=html;
		popbox.querySelector('.pop').classList.add('pop_min');
		popBox.open();
		DB.classList.add('newspeech');
	};
	t.sendHjgy=function(){
		var content=trim(document.getElementById("textarea").value),vl=content.length;
		if(vl<5){
			tishi(CONFIG.chars.hjgy.a,{time:2000});return
		}else if(vl>mainVar.speechlen){
			tishi(CONFIG.chars.hjgy.b,{time:2000});return
		};
		var ajax=setAjax('post',HOST.DOMAIN+'/lottery/yao/speech');
		showLoading();
		ajax.data="dbId="+data.dbId+"&speech="+textarea.value;
		ajax.callBack=function($data){
			var $data=toObject($data);
			hideLoading();
			if($data.code==200||$data.code==10004){
				if($data.code==200){
					tishi('您的获奖感言提交成功',{time:2e3});
				}else{
					tishi('您已经填过了获奖感言',{time:2e3});
				};
				setStorage('set',data.orderId,1);
				popBox.popClose();
				setTimeout(function(){
					t.pc_goPrize();
				},1000);
			}else{
				tishi($data.code+'请稍后重试！',{time:2e3});
			};
		};
		ajax.err=function(){
			hideLoading();
			tishi('网络繁忙，请稍后重试！',{time:2e3});
		};
		ajax.send();
	};
	t.pc_goPrize=function(){
		switch(data.type){
			case 1:
				tishi('领取成功！');
			break;
			case 3:
				location.href=data.url;
			break;
			case 9:
				tishi('领取成功！');
			break;
			case 105:
				location.href=HOST.CJ+'/open/auth/ttdsb?orderId='+data.orderId+'&openId='+user.openid;
			break;
		};
	};
};
function dmpCollect(){
	var css='induce{width:4.75rem;height:3.17rem;background:rgba(0,0,0,.7);color:#fff;position:absolute;top:65%;left:50%;-webkit-transform:translate(-50%,-50%);overflow:hidden;text-align:center;z-index:998;border-radius:.2rem;display:none}.induce span{display:inline-block;background:url(//a-h5.mtq.tvm.cn/yao/common/img/induce.png);background-size:100% 100%;width:1.3rem;height:1.3rem;margin-top:.6rem}.induce p{line-height:.4rem;font-size:.3rem;margin-top:.25rem}';
	setStyle(css);
	var induce=createNode(DB,'div',{className:'induce',html:"<span></span><p>已放入您的收藏</p>"},'p3'),dspObject=mainVar.adData.card||{},mainAdBox=mainVar.ele.mainAdBox,updated_at=dspObject.updated_at=mainVar.adData.updated_at;
	dspObject['imgType']='small';
	if(updated_at){
		var curTime=new Date(updated_at.replace(/-/g,'/')),compare=new Date("2016/04/08 21:05:00");
		if(curTime>compare){
			dspObject['imgType']='big';
		};
	};
	var user=mainVar.userInfo,matchingPrize={id:dspObject.id,"title":dspObject.title,"type":dspObject.type,"url":dspObject.url,"logo":dspObject.logo,"updated_at":dspObject.updated_at,imgType:dspObject.imgType};
	var b=setAjax('post',HOST.CJ+'/open/order/balanceActivity');
	b.set=function(){this.setRequestHeader("Content-type","application/json")};
	b.data=JSON.stringify({"lotteryid":mainVar.prizeID.toString(),"code":user.sig,"sigExpire":user.sigExpire,"yyyappId":PAGE.yyyappid,"balance":false,"prizeFrom":"postuser","user":{"openId":user.openid,"name":user.nickname,"icon":user.weixin_avatar_url,"sex":user.sex,"province":user.province,"country":user.country,"city":user.city},"matchingPrize":matchingPrize});
	b.callBack=function($data){
		mainAdBox.removeEventListener('touchstart',dmpCollect,false);
		induce.style.display='block';
		setTimeout(function(){
			removeNode(induce);
		},2000);
	};
	b.send();
}
function getTag($data){
	if(balanceSwitch==1){
		if(ylqSwitch==1){
			var _data=toObject($data),data='';
			if(_data.errcode==0){
				var data=_data,arr=[],saveIndex=null;
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
		};
	};
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
				case "closeShakeChina":
					shakeChina.closeShakeChina();
				break;
				case "enterEgg":
					shakeChina.enterEgg();
				break;
				case "activeRule":
					shakeChina.activeRule(argument[1]);
				break;
				case "closeIn":
					shakeChina.closeIn(argument[1]);
				break;
				case "nowPulish":
					shakeChina.nowPulish(argument[1]);
				break;
				case "smashEgg":
					shakeChina.smashEgg(ele);
				break;
				case "acceptThePrize":
					shakeChina.acceptThePrize();
				break;
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
				case "closeDialog":
					closeDialog()
				break
				case "joinUs":
					goto(mainVar.joinUrl)
				break
				
			}
		}
	}			









































