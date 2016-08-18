// JavaScript Document
var DO=document,DB=DO.body;
mainVar.shareInfo= {
		title: "1分钟精彩视频回放",
		imgUrl: "img/logo.png",
		link:"",
		desc:"",
		fakeid:"",
		trigger: function (res) {
		}//用户点击发送给朋友;
		,
		success: function (res) {
		}//已分享;
		,
		cancel: function (res) {
		}//已取消'
		,
		fail: function (res) {
		}//失败
	}
mainVar.pageInfo={title:"页面标题",logo: "img/logo.png",footer:"TVM天脉聚源提供技术支持"}
mainVar.userInfo={}
//用户信息
if(setStorage("get","userInfo")){
	mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
};
var search=getSearch()
,tjData={}
,nickname=mainVar.userInfo.nickname
,dzpid=search["dzpid"]
,headimg=mainVar.userInfo.weixin_avatar_url
,did=search["did"]
,openid=mainVar.userInfo.openid
,sig=mainVar.userInfo.sig
,sigCode=mainVar.userInfo.sigCode
,perCoins=search['perCoins']
,reset=search["reset"]
,scene=search["scene"]
,href=location.href
,winW=window.innerWidth
,winH=window.innerHeight;
var theFolder=urlFolder()
CONFIG.shareInfo.link=CONFIG.shareInfo.link+"?b="+headimg+"&a="+nickname;
var UA=navigator.userAgent.toLowerCase(),OSA=["windows","ipad","ipod","iphone","android"],OSL=OSA.length,OS=""
while(OS=OSA.shift()){
	if(UA.indexOf(OS)>-1){
		break;
	};
};
function getHead($url){
	return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/64"
};	
function getUrlSearch(str,name){
	var rex=new RegExp(name+'=([^&]+)');
	var arr=str.match(rex);
	if(arr){
		return arr[1]
	}else{
		return null
	};
};
if(document.addEventListener){
	addEvent=function(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
	delEvent=function(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};
}else{
	addEvent=function(_,Eve,Fun){_.attachEvent("on"+Eve,Fun)};
	delEvent=function(_,Eve,Fun){_.detachEvent('on'+Eve,Fun||null)};	
};
createNode(document.querySelector('head'),"link",{href:PAGE.COMMON+"jc/cashReward.css",rel:"stylesheet",type:"text/css"},"p3");
zan();
//http://t7.dev.tvm.cn/att/jssdk/'+parm('token',location.search)+'_'+parm('did',location.search)+'_businessInfo.js
function zan(){
	 var ajax=setAjax('get',HOST.WSQCDN+'/wtopic/jssdk/'+PAGE.yyyappid+'_'+did+'_businessInfo.js?cache='+Math.random());
    ajax.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");}
    ajax.callBack=function(data){
		var result=JSON.parse(data);
		mainVar.pageInfo.adVideo=result.adVideo;
		//拼接数据
		 var url='turntable.html?dzpid='+did+'&perCoins='+perCoins;
		 var prizeInfo=result.prizeInfo;
		 var str='<ul id="clickArea">';
		 for(var i=0;i<prizeInfo.length;i++){
		 	str+='<li><img src="'+prizeInfo[i]+'" width="100%"></li>';
		 };
		 str+='</ul>';
		 var logoStr='';
		 if(result.adLogo){
		 	logoStr='<img src="'+result.adLogo+'">';
		 };
		 var topUrlElem='';
		 if(result.adLogoUrl){
			topUrlElem='<a href="'+result.adLogoUrl+'" class="banner" style="display:block;"><img src="'+result.topBanner+'"></a>';
		 }else{
			topUrlElem='<div class="banner"><img src="'+result.topBanner+'"></div>';
		 };
		 var strElem='';
		 if(result.adVideo){
			strElem='<div class="videoArea"><video src="'+result.adVideo+'" autoplay="autoplay" loop="loop" x-webkit-airplay="allow" webkit-playsinline="yes"></video></div>';
		 }else if(result.adVideoIco){
			strElem='<div class="adVideoIco"><img src="'+result.adVideoIco+'" width="100%"></div>';
		 };
		 document.body.innerHTML='<div class="wrap">'+topUrlElem+'<div class="videoBtnArea">'+strElem+'</div><div class="bottom">'+str+'</div></div>'; 
		 document.querySelector('#clickArea').onclick=function(){
			goto(url);	
		 };
		 createNode(DB,"div",{id:"maskBG"},"p3");
		 if(!setStorage("get","userInfo")){
			noUser();
		 };
		 if(result.adVideo){
		 	normVideo(document.querySelector('.videoArea'),document.querySelector('video'),getUrlSearch(result.adVideo,'size'));
			 //点击出视频
			 var videoCon=document.querySelector('video');  
			  mediaCenter={
				play:function(){
					videoCon.src=result.adVideo;
					videoCon.play();
					if(OS==="android"){
						addEvent(videoCon,"pause",function(){							
							videoCon.play();													
						});		
					};
				},set:function(){
						document.addEventListener("WeixinJSBridgeReady",function(){             
							videoCon.play();
						},false);                           
					}
				}
			mediaCenter.play();
			mediaCenter.set();
		 };
		 if(result.pageTitle){
		 	document.title=result.pageTitle
		 }else{
		 	document.title='摇一下爽一夏';
		 };
		 document.title=result.pageTitle;
		 //统计
		 tjData['title']="金币广告页面";
		 tjData['tvm_id']=search["did"];
		 tjData['videoUrl']=result.adVideo;
		 tjData['play_time']=0;
		 tjData['video_time']=0;
	 	 goldTJ(113000);
		 //分享
		 setShareInfo();
	};
    ajax.send();
}
function goto(_){
	location.href=_;
};
function normVideo(elem,video,rule){
	var clientWidth=document.documentElement.clientWidth;
	video.width=clientWidth;
	if(rule=="4:3"){
		//传入的视频是4:3
		video.height=clientWidth/4*3;
	}else{
		//传入的视频是16:9
		video.height=clientWidth/16*9;
	};
};
/*统计代码*/
tjData['title']="金币广告页面";
tjData['tvm_id']=search["did"];
goldTJ(100000);

