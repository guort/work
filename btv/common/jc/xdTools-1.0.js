var addEvent,delEvent;
if(document.addEventListener){
		addEvent=function(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
		delEvent=function(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};
	}else{
		addEvent=function(_,Eve,Fun){_.attachEvent("on"+Eve,Fun)};
		delEvent=function(_,Eve,Fun){_.detachEvent('on'+Eve,Fun||null)};	
	}
//取子元素
function getChildNodes(_,tag){
	var nodes=[],node=_.firstChild;
	if(tag){
		tag=tag.toUpperCase();
		while(node){ 
			if(tag==node.tagName)nodes.push(node);
			node=node.nextSibling;
		} 
	}else{
		while(node){ 
			if(node.tagName)nodes.push(node);
			node=node.nextSibling;
		} 
	}
		return (nodes==""?null:nodes); 	
	};

//取search
function getSearch(str){
	var s=decodeURIComponent(str||location.search.substr(1)),o={}
	if(s.length>2){
		var fg=s.indexOf("&amp;")>-1?"&amp;":"&",arr=(s!==""&&s.split(fg))||[""],arrL=arr.length-1,i=-1,key=null,v=null,a=null;
			do{
				var a=arr[++i].split("=");
				if(a){
						o[a[0]]=a[1]
				}
			}while(i<arrL)	
		}
		return o			
	};
function getSearch2(str){
	var s=str||location.search.substr(1),o={}
	if(s.length>2){
		var fg=s.indexOf("&amp;")>-1?"&amp;":"&",arr=(s!==""&&s.split(fg))||[""],arrL=arr.length-1,i=-1,key=null,v=null,a=null;
			do{
				var a=arr[++i].split("=");
				if(a){
						o[a[0]]=decodeURIComponent(a[1])
				}
			}while(i<arrL)	
		}
		return o	
	}	

//去两边空格	
function trim(str){
	var s=str||''
	return s.replace(/^\s+|\s+$/g,"")
	}
//移除node	
function removeNode(_){
	_&&_.parentNode.removeChild(_)
	}
//创建并返回element	
function createNode(_,tag,type,position){    
	var p=position||"p3"; 
	var node=(typeof(tag)=="string"?document.createElement(tag):tag)
		if(type)setAtt(node,type)
		switch(p){ 
			case "p1": 
				_.parentNode.insertBefore(node,_); 
				break; 
			case "p2": 
				_.insertBefore(node,_.firstChild); 
				break; 
			case "p3":
				_.appendChild(node)
				break; 
			case "p4":
				if(_.nextSibling)
					_.parentNode.insertBefore(node,_.nextSibling); 
				else 
					_.parentNode.appendChild(node); 
			break;
			default:
			var child=getChildNodes(_)
				if(child){
					if(child[p])_.insertBefore(node,child[p]); 
				}else{
				_.parentNode.insertBefore(node,_.nextSibling)
				}
			break
			 
		} 
	return node
 };	
//Array.prototype.typeOf="array";
//Object.prototype.typeOf="object"; 

//创建JSONP 
function setJsonp(action,callback,_){	
	var js=document.createElement("script"),_=_||document.documentElement;
	js.src=action;
	 _.appendChild(js);
	 js.onreadystatechange=js.onload=function(e){
		 var read=js.readyState;
		 if(read){
			if(read=="loaded")callback&&callback(1)
		 }else{
			 callback&&callback(1)
			 }
		 _.removeChild(js)	 
		 }
	js.onerror=err;
	function err(status){
		isFun(callback,0);
		_.removeChild(js)
	}
}

//设置对象属性
function setAtt(_,att,val){
	if(typeOf(att)=="object"){
		for(var i in att){
			if(att.propertyIsEnumerable(i))
				Att(i,att[i])	
			}
		}else{	
			Att(att,val)
		}
	function Att(att,val){
			switch(att){
				case "style":_.style.cssText=val;break;
				case "className":_.className=val;break;
				case "html":_.innerHTML=val;break;
				default:_.setAttribute(att,val);break
			}
		}	
	};
	
//返回对象类型	
function typeOf(_){
	var a=typeof(_);
		if(a==="object"){
			if(_===null){
				a=null
			}else if(_.setAttribute){
				a="DOM"
			}else if(_.shift){
				a="array"
			}
		}
	return a
};
//获取元素的相对屏幕位置
function getProperty(_){
	var w=_.offsetWidth,h=_.offsetHeight,l=0,t=0;	
	do{
		l+=_.offsetLeft;
		t+=_.offsetTop;		
		}while(_=_.offsetParent)
	return {width:w,height:h,left:l,top:t};	
	}
//创建xmlObj对象-----------------------------------
function xmlObj(){
	try{
		return (new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject('Microsoft.XMLHTTP'))
		}catch(e){
		return new XMLHttpRequest()
	}	}
function B(num){return +num<10?"0"+num:num}	
var timeStr=setItem("$Y;Y;$M;M;$D;D;$h;h;$m;m;$s;s");
//日期格式化
function formatTime(fra,$time,$type){
	var date=new Date($type?{"Unix":$time*1000,"UTC":$time-288e5}[$type]:$time);	
	if(!date.getTime())	return null;
 	var y=date.getFullYear(),m=date.getMonth()+1,d=date.getDate(),h=date.getHours(),m2=date.getMinutes(),s=date.getSeconds();
    var obj=timeStr,temp=obj,str2="",dataStr="",data={Y:y,$Y:y.toString().substr(2),$M:B(m),M:m,$D:B(d),D:d,$h:B(h),h:h,$m:B(m2),m:m2,$s:B(s),s:s};
	 switch(fra){
		case "toUTC":
			with(date)dataStr=Date.UTC(getFullYear(),getMonth(),getDate(),getHours(),getMinutes(),getSeconds())		
		break
		case "toUnix":
			dataStr=+date/1000^0
		break
		default:
		 for(var i=0,il=fra.length,t;i<il;){
			str=fra.charAt(i)
			if(temp=temp[str]){
				str2+=str;		
				if(temp.end){
					dataStr+=data[str2];
					str2="";
					temp=obj
					}
				}else{
					temp=obj;
					str2="";
					dataStr+=str
				}
			i++
			}
		break
		}
	return dataStr
}


//返回路径中的最后一层目录
function urlFolder($str){
	var s,a,l;
	if(!$str){
		s=location.pathname;
		s=location.origin+s.substr(0,s.lastIndexOf("/"))
		}else{
			l=$str.search(/[\#\?]/g)
			s=l>-1?$str.substr(0,l):$str
			s=s.substr(0,s.lastIndexOf("/"))
			}
	return s+"/"
	}			

//ajax方法
function setAjax(a,b,c,d,e){
		return new function(){
			var t=this,errRun=0;
			t.method=a||"get";      
			t.action=b;      
			t.async=(c!=undefined?c:true);  
			t.cache=d||0;        
			t.callBack=(typeof(e)=="function"?e:0)         
			t.data="";	
			t.Data="";  
			t.Open=t.Send=t.Test=t.Over=Function;
			t.Err=function(){xmlhttp=null}
			t.send=function(xmlCache){
			var	xmlhttp=xmlObj()
			    xmlhttp.open(t.method,t.action,t.async);
			  t.set&&t.set.call(xmlhttp);
			  if(t.method.toUpperCase()=="POST"){
					if(!t.set)xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");
				}else{
					if(t.cache){
						var c="cache="+Math.random();
							c=(t.action.indexOf("?")!=-1?"&":"?")+c;
							t.action+=c
						}
						t.data=null
				}
				function err(){
					t.stop();
					if(errRun)return;errRun=1;
					typeof(t.err)==="function"&&t.err()
					}
				  xmlhttp.onreadystatechange=function(){
					  if(xmlhttp.readyState===4){				
						  if(xmlhttp.status===200||xmlhttp.status===304){
								t.err=null								
							  if(t.callBack)t.callBack.call(xmlhttp,xmlhttp.responseText);//responseXML responseText
								xmlhttp=null;
						 }else{
							 xmlhttp=null;
							 err()
						 }
					  }
				  }				  
				  xmlhttp.send(t.data);
				  t.stop=function(){					
					xmlhttp&&xmlhttp.abort()
					}	
				setTimeout(function(){	
					if(t.err)err()
				},15000)						  
				};
			}	
		}
function setItem($c,$k,$o){		
	var k=$k||";",sl=$c.length,i=0,o=$o||{},it=o,t
	for(;i<sl;i++){
		t=$c.charAt(i)
		if(t!==k){
			if(it[t]){
				it=it[t];it.tag=$k;
			}else{
				it=it[t]={};it.tag=$k;
			}
		}else{
			it.end=true;		
			it=o;
		}
	}
	it.end=true	
	return o
}
function insertText(obj,str) {
	if (document.selection) {
		var sel = document.selection.createRange();
		sel.text=str;
	} else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
		var startPos=obj.selectionStart,
			endPos=obj.selectionEnd,
			cursorPos=startPos,
			tmpStr=obj.value;
		obj.value=tmpStr.substring(0,startPos)+str+tmpStr.substring(endPos,tmpStr.length);
		cursorPos+=str.length;
		obj.selectionStart=obj.selectionEnd=cursorPos;
	} else {
		obj.value += str;
	}
}
function moveEnd(obj){
	obj.focus();
	var len = obj.value.length;
	if (document.selection) {
		var sel = obj.createTextRange();
		sel.moveStart('character',len);
		sel.collapse();
		sel.select();
	} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
		obj.selectionStart = obj.selectionEnd = len;
	}
} 	
//千分制		
function qfz($n){
	return $n.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
	}
function noPop(e){
	e.preventDefault();
	e.stopPropagation();
	e.returnValue=false;
	e.cancelBubble=true
}
function xdAlbum(box,option){
	//初始化所有变量
		var isTouch=('ontouchstart' in window)
			,evtS="mousedown",evtM="mousemove",evtE="mouseup"
			,getTouchType=function(e,type){return e[type]},eve=function(e,type){return e[type]}
			,startY,endY
			,_t=this
			,_box=box				//盒子对象
			,_boxSty=_box.style			//设置盒子的变量
			,_option=option||{}			//设置参数	
			,_childs=_box.children
			,_childsCount=_childs.length
			,_origin=0		
			,_delay=300					//延时清零
			,_maxPoint=_option.maxPoint||_childsCount-1 //设置最大可显示的点
			,_minPoint=_option.minPoint||0
			,_X=0,_Y=0,_x=0,_y=0
			,arg=0.5
			,winW=window.innerWidth
			,winH=window.innerHeight
			,_startX,_startY
			,runTime=_option.runTime||500 //设置一个过度时间
			,_transition=_option.transition||'all '+runTime+'ms ease' //过渡属性设置
			
			,translateX=0
			,translateY=0
			,_move=0		//子对象默认不可移动
			,_scale=1		//默认缩放级别
			,_clickCount=0	//点击次数
			,_pointCount=0  //触摸点的数量
			;
			if(isTouch){
				evtS="touchstart";evtM="touchmove";evtE="touchend";
				evt=function(e,type){return e.touches[0][type]};
				getTouchType=function(e,type){return e.changedTouches[0][type]}
			}	
			_t.handleEvent=function(e){
					_pointCount=_t.canScale?e.touches.length:1;
					switch(e.type){
						case evtS:
							touchStart(e);
							break;
						case evtM:	
							touchMove(e);										
							break;
						case evtE:
							touchEnd(e);					
							break;
						case "touchcancel":
							
						break	
					}
					setTimeout(function(){_clickCount=0},_delay)					
				};	
				
			function touchStart(e){
						_t.run = true;
						_t.moveReady =false;
						_boxSty.webkitTransition="";							
						translateX=0;
						translateY=0;
						_x=0;_y=0;										
						_origin=0;
						_startX=getTouchType(e,'pageX');
						_startY=getTouchType(e,'pageY');
						_t.startTime =e.timeStamp
						}
			function touchMove(e){
				if(!_t.run)return false;					
					var pageX=getTouchType(e,'pageX')
					,pageY =getTouchType(e,'pageY')
					,distX=pageX-_startX	//计算移动水平与垂直的距离	
					,distY=pageY-_startY
					,absX=Math.abs(distX)
					,absY=Math.abs(distY);	
					if(absX>absY){ // 判断水平还是垂直
						var newX=_t.currentX+distX;				 
						setTranslate(newX);//正常移动
						_t.space=distX;//赋值移动变量
						_origin=distX>0?-1:1;//计算滑动的方向
						noPop(e)
					}else if(absY>absX){//垂直方向
					return 
						var newY=_t.currentY+distY;				 
						setTranslate(newY);//正常移动
						_t.space=distX;//赋值移动变量
						_origin=distY>0?-1:1;//计算滑动的方向
						noPop(e)			
						}
					}				
			function touchEnd(e){
					_t.run=false;
					var space=0,point=_t.currentPoint;
					_boxSty.webkitTransition=_transition;
					_boxSty.transition=_transition;					 					
					if(Math.abs(_t.space)>_t.range){							
						point=point+_origin						
						_t.moveToPoint(point<0?0:point>_maxPoint?_maxPoint:point)
					}else{
						_t.moveToPoint(_t.currentPoint)
					} 						
					_pointCount=0 				
				}									


			_t.toNext=function(){
					if(_t.currentPoint<_maxPoint)_t.moveToPoint(_t.currentPoint + 1)
				};
			_t.toPrev=function(){
					if(_t.currentPoint>_minPoint)_t.moveToPoint(_t.currentPoint - 1);
				};
			_t.moveToPoint=function(index,fun){
					var space=-index*_t.distance;					
						setTranslate(space,fun);
						_t.currentPoint=index;						
						_t.currentX=space;		
				};
			_t.toPosition=function(index){
				_boxSty.webkitTransition="";
				_boxSty.transition="";
				var space=-index*_t.distance;				
					_t.currentPoint=index;						
					_t.currentX=space;
				 setTranslate(space,function(){
					 setTimeout(function(){_boxSty.webkitTransition=_transition},runTime)
					 })
				}				
			function setTranslate(x,fun){					
					_boxSty.webkitTransform='translate3d('+x+'px, 0, 0)';
					typeof fun==="function"&&fun()
				};
			function changeProperty(){				
				}
			 _t.noThing=function(){
					$.delEvent(box,evtS,T,false);
					$.delEvent(box,evtM,T,false);
					$.delEvent(box,evtE,T,false)	
				};
			_t.getPoints=function(point){
				return point?_t.maxPoint=point:_t.maxPoint
				}		
			function calcSqrt(x,y){			
				return Math.sqrt(Math.pow(x[0]-x[1],2)+Math.pow(y[0]-y[1],2))
				};				
			_t.currentPoint=_option.currentPoint||0;	
			_t.distance=_option.distance||_box.scrollWidth / (_childsCount);
			_t.toPosition(_t.currentPoint);															
																		
			_t.range=_option.range||50;				
			_t.child=_childs[_t.currentPoint];		
			
			addEvent(box,evtS,_t,false);
			addEvent(box,evtM,_t,false);
			addEvent(box,evtE,_t,false);			
			typeof _option.done	=="function"&&_option.done.call(_t);
			
	};		
function wxApi(option){
		var wxData = option ||{},
			WeixinApi = (function(){
				"use strict";
				function weixinShareTimeline(data, callbacks){
					callbacks = callbacks ||{};
					var shareTimeline = function(theData){
						WeixinJSBridge.invoke('shareTimeline',{
							"appid": theData.appId,
							"img_url": theData.imgUrl,
							"link": theData.link,
							"desc": theData.desc,
							"title": theData.desc,
							"img_width": "640",
							"img_height": "640"
						}, function(resp){
							switch (resp.err_msg){
								case 'share_timeline:cancel':
									callbacks.cancel && callbacks.cancel(resp);
									break;
								case 'share_timeline:confirm':
								case 'share_timeline:ok':
									callbacks.confirm && callbacks.confirm(resp);
									break;
								case 'share_timeline:fail':
								default:
									callbacks.fail && callbacks.fail(resp);
									break;
							}
							callbacks.all && callbacks.all(resp);
						});
					};
					WeixinJSBridge.on('menu:share:timeline', function(argv){
						if (callbacks.async && callbacks.ready){
							window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
							if (window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0){
								window["_wx_loadedCb_"] = new Function();
							}
							callbacks.dataLoaded = function(newData){
								window["_wx_loadedCb_"](newData);
								shareTimeline(newData);
							};
							callbacks.ready && callbacks.ready(argv);
						} else{
							callbacks.ready && callbacks.ready(argv);
							shareTimeline(data);
						}
					});
				}
				function weixinSendAppMessage(data, callbacks){
					callbacks = callbacks ||{};
					var sendAppMessage = function(theData){
						WeixinJSBridge.invoke('sendAppMessage',{
							"appid": theData.appId,
							"img_url": theData.imgUrl,
							"link": theData.link,
							"desc": theData.desc,
							"title": theData.title,
							"img_width": "640",
							"img_height": "640"
						}, function(resp){
							switch (resp.err_msg){
								case 'send_app_msg:cancel':
									callbacks.cancel && callbacks.cancel(resp);
									break;
								case 'send_app_msg:confirm':
								case 'send_app_msg:ok':
									callbacks.confirm && callbacks.confirm(resp);
									break;
								case 'send_app_msg:fail':
								default:

									callbacks.fail && callbacks.fail(resp);
									break;
							}
							callbacks.all && callbacks.all(resp);
						});
					};
					WeixinJSBridge.on('menu:share:appmessage', function(argv){
						if (callbacks.async && callbacks.ready){
							window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function;
							if (window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0){
								window["_wx_loadedCb_"] = new Function;
							}
							callbacks.dataLoaded = function(newData){
								window["_wx_loadedCb_"](newData);
								sendAppMessage(newData);
							};
							callbacks.ready && callbacks.ready(argv);
						} else{
							callbacks.ready && callbacks.ready(argv);
							sendAppMessage(data);
						}
					});
				}
				function imagePreview(curSrc, srcList){
					if (!curSrc || !srcList || srcList.length == 0){
						return;
					}
					WeixinJSBridge.invoke('imagePreview',{
						'current': curSrc,
						'urls': srcList
					});
				}
				function showOptionMenu(){
					WeixinJSBridge.call('showOptionMenu');
				}
				function hideOptionMenu(){
					WeixinJSBridge.call('hideOptionMenu');
				}
				function showToolbar(){
					WeixinJSBridge.call('showToolbar');
				}
				function hideToolbar(){
					WeixinJSBridge.call('hideToolbar');
				}
				function getNetworkType(callback){
					if (callback && typeof callback == 'function'){
						WeixinJSBridge.invoke('getNetworkType',{}, function(e){
							callback(e.err_msg);
						});
					}
				}
				function closeWindow(){
					WeixinJSBridge.call("closeWindow");
				}

				function wxJsBridgeReady(readyCallback){
					if (readyCallback && typeof readyCallback == 'function'){
						var Api = this;
						var wxReadyFunc = function(){
							readyCallback(Api);
						};
						if (typeof window.WeixinJSBridge == "undefined"){
							if (document.addEventListener){
								document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
							} else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
								document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
							}
						} else{
							wxReadyFunc();
						}
					}
				}
				return{
					version: "2.0",
					ready: wxJsBridgeReady,
					shareToTimeline: weixinShareTimeline,
					shareToFriend: weixinSendAppMessage,
					showOptionMenu: showOptionMenu,
					hideOptionMenu: hideOptionMenu,
					showToolbar: showToolbar,
					hideToolbar: hideToolbar,
					getNetworkType: getNetworkType,
					imagePreview: imagePreview,
					closeWindow: closeWindow
				};
			})();
		WeixinApi.ready(function(Api){
			var wxCallbacks ={
				ready: function(){},
				cancel: function(resp){},
				fail: function(resp){},
				confirm: function(resp){
					typeof(wxData.add) === "function" && wxData.add()
				},
				all: function(resp, shareTo){}
			};
			Api.shareToFriend(wxData, wxCallbacks);
			Api.shareToTimeline(wxData, wxCallbacks);
		});
	} 	
function drawRound(options,endFun){
    var W=options.width,
      H=options.height,
	  data=options.data,
      centerX= W/2,
      centerY= H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings ={
        segmentShowStroke :true,
        segmentStrokeColor:"#0C1013",
        segmentStrokeWidth:20,
        baseColor: "rgba(0,0,0,0.7)",
        baseOffset:1,
        edgeOffset:1,//offset from edge of $this       
        animation : true,
        animationSteps:60,
        animationEasing:"easeInOutExpo", //"linear" ,//
        animateRotate : true       
      },	  
	  animationOptions={
        linear:function (t){
          return t;
        },
        easeInOutExpo:function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },		
	    $svg=options.ele,
        $paths=[],
        easingFunction =animationOptions[settings.animationEasing],
        cutoutRadius=W>>1,//外圆
        doughnutRadius=cutoutRadius-options.radiusWidth, //内圆
        segmentTotal = 0, 
      requestAnimFrame=function(){
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback,1000/60);
          };
      }();
	$svg.style.width=W+"px"
	$svg.setAttribute("height",H);
	$svg.setAttribute("viewBox","0 0 "+W+" "+H)
    for (var i=0,len = data.length,p; i < len; i++) {
		  segmentTotal+=data[i].value;
		  $paths[i]=document.createElementNS('http://www.w3.org/2000/svg','path')	 
		 p=$paths[i]   
//       p.setAttribute("stroke-width",settings.segmentStrokeWidth)
//       p.setAttribute("stroke",settings.segmentStrokeColor)
         p.setAttribute("fill",data[i].color)
         $svg.appendChild(p)
    }
    function drawPieSegments(animationDecimal) {
      var startRadius=-PI/2, 
	     //-90 degree
          rotateAnimation = 1;
      if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;
      for (var i = 0, len = data.length; i < len; i++){
        var segmentAngle=rotateAnimation*((data[i].value/segmentTotal)*(PI*2)),
            endRadius = startRadius + segmentAngle,
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,			
            endX2 = centerX + cos(startRadius) * cutoutRadius,			
            endY2 = centerY + sin(startRadius) * cutoutRadius,			
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,			
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', startX2,startY2,//Draw line path(this line connects outer and innner arc paths)
          'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
          'Z'//Cloth path
        ];
		var d=cmd.join(' ')
        $paths[i].setAttribute("d",d);
        startRadius += segmentAngle;
      }
    }  
    function animateFrame(cnt) {
      var easeAdjustedAnimationPercent=(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;	  
      drawPieSegments(easeAdjustedAnimationPercent);
    }
   (function(){
      var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
          cnt =(settings.animation)? 0 : 1;
      requestAnimFrame(function() {
          cnt+=animFrameAmount;
          animateFrame(cnt);
          if (cnt <= 1) {
            requestAnimFrame(arguments.callee);
          } else {
			 typeOf(endFun)==="function"&&endFun()
          }
      });
    }());	
    function Max(arr) {return Math.max.apply(null, arr);}
    function Min(arr) {return Math.min.apply(null, arr);}
    function isNumber(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
    function CapValue(valueToCap, maxValue, minValue){
      if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
      if (isNumber(minValue) && valueToCap < minValue) return minValue;
      return valueToCap;
    }
  };
  
/*提示用户*/		
function tishi(str,options){
	var opt=options||{}
	if(!window.infoStr){
		window.tishiTimer=0;
		setStyle("#maskBG{position:fixed; top:0; left:0; width:100%; height:100%; display:none; z-index:10000; -webkit-transition:all 400ms ease;}#infoStr{position:absolute;text-align:center;color:#fff;font-size:16px;background:rgba(0,0,0,.5);top:50%;left:50%;-webkit-transform:perspective(1px) translate3D(-50%,-50%,0);z-index:10;border-radius:6px;padding:10px;opacity:0;margin:-60px 0 0 0;box-sizing:border-box;display: -webkit-box; -webkit-box-orient: horizontal;-webkit-box-pack: center; -webkit-box-align: center;}#infoStr.MoveShow{-webkit-animation:iShow 400ms forwards;}#infoStr.MoveHide{-webkit-animation:iHidd 350ms forwards;}@-webkit-keyframes iShow{0%{opacity:0;margin:-60px 0 0 0}100%{opacity:1;margin:0 0 0 0}}@-webkit-keyframes iHidd{0%{opacity:1;margin:0 0 0 0;}100%{opacity:0;margin:-60px 0 0 0;}}")
	maskBG=createNode(opt.box||document.body,"div",{id:"maskBG"},"p3");
		infoStr=createNode(maskBG,"div",{id:"infoStr"},"p2");
	}
	clearTimeout(tishiTimer);
	if(opt.style){		
		infoStr.style.cssText=opt.style;
	}
	maskBG.style.display="block";
	setTimeout(function(){
        if(opt.animation){infoStr.style.opacity=1;}else{infoStr.className="MoveShow";}
	},100)
	infoStr.innerHTML=str;
	if(opt.autoHidden){
		return{hidd:hidd};
	}
	function hidd(){
        if(opt.animation){infoStr.style.opacity=0;}else{infoStr.className="MoveHide";}
		setTimeout(function(){maskBG.style.cssText="";infoStr.className="";},600);
		typeof opt.fun==="function"&&opt.fun()
	}
	tishiTimer=setTimeout(hidd,opt.time||1000) 
}	

function calcNum($e,$n,$c,$f){
	var n=$n,c=$c,str="";																							
		tv=setInterval(function(){
			n--;			
			if(n>-1){	
				str=""+n;
				for(var i=str.length;i<c;i++){
					str="0"+str
					}						
			}else{		
				clearInterval(tv);				
				typeOf($f)==="function"&&$f()
			}			
			$e.innerHTML=str.replace(/(.)/g,"<b>$1</b>")
		},1000)																									
	}
function calcNum2($e,$n,$c,$f){
	var n=$n,c=$c,str="";																					
		tv=setInterval(function(){
			n--;
			if(n>-1){
				mins = Math.floor(n/60);
				sec = Math.floor(n%60);
				if(mins<10){mins="0"+mins;}else{mins=""+mins}	
				if(sec<10){sec="0"+sec}else{sec=""+sec}	
			}else{		
				clearInterval(tv);				
				typeOf($f)==="function"&&$f()
			}			
			$e.innerHTML=mins.replace(/(.)/g,"<b>$1</b>")+":"+sec.replace(/(.)/g,"<b>$1</b>")
		},1000)	
	}
	
function outRoundTxt($option){
	var div=document.createElement("div"),options=$option//||{width:320,height:320,margin:20,start:30,packNum:0}
	var num=options.height/2^0 // 半径
	,bW=options.start//外边距
	,r=options.margin
	,packNum=options.packNum
	,sW=bW+r
	,mW=6
	,hr=num-bW //半径
	if(packNum==0){var vis=["visibility","hidden"];}else{var vis=["visibility",""];}
	html='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" "viewBox="0 0 '+options.width+' '+options.height+'" height="'+options.height+'" width="'+options.width+'" >'
			+'<path id="circlePath" d="M'+bW+' '+num+' A'+hr+' '+hr+' 0 1 1 '+bW+' '+(num+.0001)+' Z" stroke="#none" fill="none" style="stroke-width:2px"></path>'
			+'<path  d="M'+(bW+mW)+' '+num+' A'+(hr-mW)+' '+(hr-mW)+' 0 1 1 '+(bW+mW)+' '+(num+.0001)+' Z" stroke="rgba(255,255,255,.7)" fill="none" style="stroke-width:2px"></path>'
			+'<path id="circlePath2" d="M'+sW+' '+num+' A'+(hr-r)+' '+(hr-r)+' 0 1 1 '+sW+' '+(num+.0001)+' Z" stroke="'+options.circle_color+'" fill="none" style="stroke-width:2px"></path>'
			+'<g font-size="15">'
			+'<text x="10" y="10" fill="'+options.txt_color+'" style="text-shadow:1px 1px 1px rgba(0,0,0,0.6);">'
			+'<textPath xlink:href="#circlePath">'			
			+'<tspan id="svgTxt">'+options.txt+'</tspan>'
			+'位朋友和你一起玩电视'
			+'</textPath>'
			+'</text>'
			+'</g>'
			+'<g style="pointer-events:auto"><image xlink:href="img/pack.png" x="'+(options.height-bW-28)+'" y="'+(num-32)+'" width="46px" height="46px" class="red"/></g>'
//		    +'<g class="news">'
//			+'<circle id="RectElement" cx="'+(options.height-10-bW+30)+'" cy="'+(num-30)+'" r="8" fill="rgb(255,0,0)" '+vis[0]+'='+vis[1]+'>'				
//			+'</circle>'
//			+'<text x="'+(options.height-bW-10+26)+'" y="'+(num-30+5)+'" fill="#fff" font-size="13" '+vis[0]+'='+vis[1]+'>'+packNum+'</text></g>'
			+'</svg>'
		div.innerHTML=html;			
		//setTimeout(function(){div=null},100)
		return div.firstChild;
}	
//数字转倒计时间
function n2t($n,$fra){
	var a=$fra||[{v:86400,u:"天"},{v:3600,u:"小时"},{v:60,u:"分钟"},{v:1,u:"秒"}],al=a.length,i=0,t1,t2=$n,v,u,d,str="";
	for(;i<al;i++)d=a[i],v=d.v,u=d.u,str+=(t2>=v?(t1=t2/v^0,t2=t2%v,B(t1)+u):"00"+u)	
		return str
	}
function setStyle(css,_){
		var sty=DO.createElement("style")
		sty.setAttribute("type","text/css");
		sty.styleSheet?sty.styleSheet.cssText=css:sty.innerHTML=css
		_?_.appendChild(sty):document.documentElement.firstChild.appendChild(sty);
};	
// 解析成对象
function toObject($data){return typeof($data)==="object"?$data:eval("("+$data+")")}
//返回系统标识
function getOS(){
		var OSA=["windows","ipad","ipod","iphone","android"],OSL=OSA.length,OS,UA=navigator.userAgent.toLowerCase()
		while(OS=OSA.shift())if(UA.indexOf(OS)>-1)break;
		return OS
	}	
//判断是否是function	
function isFun($fun){var a;
	return typeof($fun)==="function"?(a=[].slice.call(arguments),a.shift(),$fun.apply(null,a),$fun):function(){}
	}
function setMoney($s){
	var b=+$s;
	return b<1?""+b:((b>99?"":b>9?"0":"00")+b).replace(/(..)$/,".$1")
	}	
function isPhone($s){var s=+$s;return (s<18999999999&&s>13000000000)?1:0}	
function jsonJoin($o,$s){
	var i,s=$s||"&",r="",v
	for(i in $o){
		if($o.propertyIsEnumerable(i)){
			v=$o[i]
			r+=s+i+"="+(typeof v==="object"?JSON.stringify(v):v)
			}
		}
	return r.substr(1)	
	}
function wxShare($opt){
	var opt=$opt||{},DB=document.body;
	if(window.shaketv){
		shaketv.wxShare(
			opt.ico,
			opt.title,
			opt.desc,
			opt.link
			)
		}else{
		window.getWX=function($data){
			setJsonp("//res.wx.qq.com/open/js/jweixin-1.0.0.js",function(){
				wx.config({
				  debug: false,
				  appId:$data.appid,
				  timestamp: $data.timestamp,
				  nonceStr: $data.noncestr,
				  signature:$data.signature,
				  jsApiList:'checkJsApi,onMenuShareTimeline,onMenuShareAppMessage,onMenuShareQQ,onMenuShareWeibo,hideMenuItems,showMenuItems,hideAllNonBaseMenuItem,showAllNonBaseMenuItem,translateVoice,startRecord,stopRecord,onRecordEnd,playVoice,pauseVoice,stopVoice,uploadVoice,downloadVoice,chooseImage,previewImage,uploadImage,downloadImage,getNetworkType,openLocation,getLocation,hideOptionMenu,showOptionMenu,closeWindow,scanQRCode,chooseWXPay,openProductSpecificView,addCard,chooseCard,openCard'.split(",")
				 });
				wx.ready(function(){
					isFun($opt.strFun,wx);
					wx.onMenuShareAppMessage({
					  title:opt.title,
					  desc:opt.desc,
					  link:opt.link,
					  imgUrl:opt.ico,
					  trigger:function(res){isFun(opt.trigger)},
					  success:function(res){isFun(opt.success)},
					  cancel:function(res){isFun(opt.cancel)},
					  fail:function(res){isFun(opt.fail)}
					}); 
					wx.onMenuShareTimeline({
					  title:opt.desc,
					  link: opt.link,
					  imgUrl:opt.ico,
					  trigger:function(res){isFun(opt.trigger)},
					  success:function(res){isFun(opt.success)},
					  cancel:function(res){isFun(opt.cancel)},
					  fail:function(res){isFun(opt.fail)}
					});					
					})
				})
			}
			setJsonp("//mb.mtq.tvm.cn/ufo/signature?cb=getWX&url="+encodeURIComponent(opt.resources)+"&wx_token="+opt.token)			
		}
}	