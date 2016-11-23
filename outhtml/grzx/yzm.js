//(function(){
	var DO=document,DB=DO.body,winW=document.body.clientWidth,winH=document.body.clientHeight
,mainVar={
	adShowCount:0,
	status:0,
	tjData:{},
	TC:{start:function(){tishi("网络异常请稍候重试！",{hiddFun:DC_FUN,showTime:3000})}}
	}
DC_FUN(0);	
function DC_FUN($a){
	if(mainVar.TC.status){
		!$a&&mainVar.TC.start()
		return
		}
	window.TouClick?f():r();
    var ms,ti=0;
	function r(){
		setJsonp("//js.touclick.com/js.touclick?b=3ca99045-1540-4e9d-838e-713ece33e9c6",f)
		}
	function f(){	
		if(window.TouClick){
        if(ms)ms.hidd()
		TouClick.ready(function(){
    	var tcBox=document.createElement("div"),tc=TouClick(tcBox,{
            onSuccess:function(obj){
				alert("验证成功")
				window.WebViewJavascriptBridge&&WebViewJavascriptBridge.callHandler("callNativeToDo",{action:"verify_succeed",data:obj,callback:0},function(){})
            },
            behaviorDom:0,
            captchaType:13,
            isOpenMask:function(){
                return 0;
            },
            isCaptchaFloat:function(env){
                if(env == "pc"){
                    return false;
                }else if(env == "mob"){
                    return true;
                }
            }
          });
		  tc.start()
		  tc.status=1;
		  var box=tc[0],a=box.querySelector(".touclick"),b=a.querySelector(".touclick-pub").firstChild.firstChild;
		 b.className="touclick-pub-holder"
		 b.style.cssText="display:block;top:0"
		 document.body.appendChild(b);
        })
		}else{
            ti++
			var str="验证码服务异常，正在进行重试 "+ti
        	if(!ms)ms=new tishi(str,{showTime:3e6});
			else ms.box.innerHTML=str
            setTimeout(r,2000)
		}
		}
	}
function setupWebViewJavascriptBridge(callback){
  window.WVJBCallbacks=[callback];
  var WVJBIframe=document.createElement('iframe');
  WVJBIframe.style.display='none';
  WVJBIframe.src='wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function(){
	document.documentElement.removeChild(WVJBIframe)
	WVJBIframe=null
  },0);
}
setupWebViewJavascriptBridge(function(){}) 

//}())