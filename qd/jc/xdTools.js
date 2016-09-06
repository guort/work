//创建xmlObj对象-----------------------------------
function xmlObj(){
	try{
		return (new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject('Microsoft.XMLHTTP'))
		}catch(e){
		return new XMLHttpRequest()
	}	
}	
function setAjax(a,b,c,d,e){
		return new function(){
			var t=this;
			t.method=a||"get";      
			t.action=b;      
			t.async=(c!=undefined?c:true);  
			t.cache=d||0;        
			t.callBack=(typeof(e)=="function"?e:0)         
			t.data="";	
			t.Data="";  
			t.Open=t.Send=t.Test=t.Over=Function;
			t.Err=function(){xmlhttp=null}
			t.xmlObj=null;	
			t.send=function(xmlCache){
			var xmlhttp=t.xmlObj||xmlObj();
			  xmlhttp.open(t.method,t.action,t.async);
			/*
			创建或设置对象 ，尤其注意如果 xmlhttp对象在初始建立，在页面加载同时发送请求，xmlhttp.readyState会返回0，这个问题容易引起错误
			所以初始化些对象时一定是在第一次调用时在同一区域创建			
			*/
			  if(t.method.toUpperCase()=="POST"){
				  if(t.cache)xmlhttp.setRequestHeader("Cache-Control","no-cache")
				  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
				}else{
				if(t.cache){
					var c="cache="+Math.random()
						c=(t.action.indexOf("?")!=-1?"&":"?")+c
						t.action+=c
					}
					t.data=null
				}
				  xmlhttp.onreadystatechange=function(){
					  switch(xmlhttp.readyState){					
						case 2:t.Send();break;						
						case 4:
						  if(xmlhttp.status===200||xmlhttp.status===304){
							  if(t.callBack)t.callBack.call(t,xmlhttp.responseText) ;
							  t.xmlObj=(xmlCache?xmlhttp:null);
								xmlhttp=null	 
							 }else{
							  if(typeof(t.Err)=="function")t.Err.call(t)
								}
						break
						default:
							if(xmlhttp.status===404){
								t.error&&t.error();
								xmlhttp.abort()
								}						
						break 
						}

					  }
				  xmlhttp.onerror=function(){
					  console.log(arguments)
					  }	  
				  xmlhttp.send(t.data);
				  t.stop=function(){
					xmlhttp.abort()
					}						  
				};
	
			}	
		}	
		
function getSearch(name,str){
	var s=str||location.search
		,r=new RegExp(name+"=([^#&]+)","i"),result=s.match(r)||[];
	return result[1]
	}
	
function viewProfile() {
typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke && WeixinJSBridge.invoke("profile",{username:'心动',scene:"57"});
}	

if(document.addEventListener){
	addEvent=function(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
	delEvent=function(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};
}else{
	addEvent=function(_,Eve,Fun){_.attachEvent("on"+Eve,Fun)};
	delEvent=function(_,Eve,Fun){_.detachEvent('on'+Eve,Fun||null)};	
}	
		
window.requestAnimFrame=(function(){
return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function( callback ){window.setTimeout( callback, 1000 / 60 )}})();
