(function(){localStorage.clear();
var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight
,UA=navigator.userAgent.toLowerCase()
,mainVar={temporary:{}}
,search=getSearch()
,ST_user=localStorage.getItem("userInfo")
,userInfo=toObject(ST_user)||{}
,isWX
,CONFIG={
	shareInfo:{
	title:"红包摇不停！",
	ico:"http://qa.h5.mtq.tvm.cn/yao/sq_yyy/img/share_ico.png",
	link:"",
	desc:"正在玩红包摇不停，推荐你也来试试，现金红包任你领",
	token:"46497107fa23"
	}
}
,replayInfomation,mainFun,mainBody
,_openid
,_sig
,_toopenid
,_self
,now=+new Date;
toSQ({fun:function(){
	if(_openid)return;
	_openid=userInfo.openid;
	_sig=userInfo.sig;
	_toopenid=search.toopenid||_openid;	
	_self=_toopenid===_openid;
	mainBody=createNode(DB,"div",{className:"mainBody"});
	getGift();
	mainFun=lyContent();
	initTopInfo();
	replayInfomation=infomation();
	userInfo.isWX&&inWX();
	(function(){
		var user=mainVar.userInfo;
		var ajax=setAjax('get',HOST.RTS+'/userinfo/get?openid='+_openid+'&wxSig='+_sig+'&systoken=uuETOJuZ');
		ajax.callBack=function($data){
			var data=toObject($data);
			if(data.status){
				var d=data.data,pos=userInfo.location,p=d.address;
				if(d.age!=null){
					pos.age=d.age;
				};
				if(p){
					pos.region="0-"+p.provice+"-"+p.city+"-"+p.area;
					pos.address=p.street;
					pos.adcode=p.street;
					pos.latitude=p.latitude;
					pos.longitude=p.longitude
					pos.gps=p.longitude+","+p.latitude; 
				};
			};
		};
		ajax.send();
	})();
},userInfo:userInfo})

//留言主体
function lyContent(){
	var box=createNode(mainBody,"div",{className:"divListBox"})
	,openid=_openid
	,replyButtonBox
	,replyButton
	,buttonI=0
	,hasZan=0
	,loadPage=0
	,firstRun=1
	,scrollRun
	,delDialog
	,infoDiv
	,loading=createNode(box,"div",{id:"loading"});
	
	function loadMsg(){scrollRun=1
		var a=setAjax("GET",HOST.FR+"/open/message/list?openid="+openid+"&toopenid="+_toopenid+"&page="+loadPage+"&pageSize=10&"+nocache())
		a.callBack=function($data){
			var data=eval("("+$data+")")//toObjcet($data);
			if(data.status==="success"){
				data=data.data;
				var i=0,il=data.length
				for(;i<il;i++)pinglun(data[i],"p3");
				if(il>0){
					if(i>9){
						scrollRun=0
						}else{
							loading.style.border="none"
							loading.style.height=_self?"20px":"60px"
							}
				}else{
					if(firstRun){
						infoDiv=createNode(box,"div",{className:"infoDiv",html:_self?"你的空间什么也没有，快写点什么吧~":"还没有人给TA留言，快来抢沙发吧~"});
						loading.style.display="none"
						}else{
						loading.textContent="没有数据了！"
						loading.style.webkitTransition="height 600ms 1000ms"
						loading.style.height="50px"	
						}
					}
			firstRun=0;		
			loading.style.background="";
			box.appendChild(loading);
			}
		}
		a.send()
	}
	if(_self)createNode(DB,"img",{className:"sayButton",src:"img/sayButton.png"}).onclick=function(){
		replayInfomation.selfBigReplayCite.show()
		}	
		loadMsg()
	function createList($data,$p){
			if(infoDiv){removeNode(infoDiv);infoDiv=null}
			var div=pinglun($data,"p3","刚刚"),h
			div.style.opacity="0";
			box.style.webkitTransition="padding 400ms 500ms"
			h=div.offsetHeight;
			box.style.paddingTop=h+"px";
			setTimeout(function(){
				box.style.cssText="";
				createNode(box,div,{},"p2")
				setTimeout(function(){
					div.style.opacity=1;
					div.style.webkitTransition="opacity 300ms";
				},50)
			},900)
		}
	function pinglun($data,$p,$t){hasZan=0
		var div=createNode(box,"div",{className:"divList",id:"divList"+buttonI,action:"1"},$p||"p2")
			,pictures=$data.pictures
			,user=$data.user
			,money=$data.money
			,openid=$data.openid
			,type=+$data.type
			,id=$data._id
			,moneyStr
			,himg=user.avatar_url
			,headimg
			,butbox
			,delB
			,d1,d2,d3,d4=getDZ($data.likes,buttonI,1),d5
			,action=buttonI+".,"+id+".,"+hasZan;
			if(_self){
				delB="<button class='replyButton' touch_action='del.,"+action+"' style='margin-left:0px' >删除</button>";
				butbox="replyButtons"
				}else{
					if(_openid===openid)delB="<button class='replyButton' touch_action='del.,"+action+"' style='margin-left:0px' >删除</button>";
					else delB="";
					butbox=""
					}
			if(type===4){
				moneyStr="提现"+setMoney(money*-1)+"元";
				delB="";
				himg="img/money.png"
				}else if(type===5){
					moneyStr="抢好友红包";
					delB="";
					}else{
					moneyStr=""
					}			
			headimg="<img src='"+himg+"' onerror='headImgErr(this)' class='headimg' action='goto.,"+openid+".,"+($data.tvmid||"null")+"'>"
			,d1="<div class='thead'><label class='nickname'>"+user.nickname+"</label><span class='money'>"+moneyStr+"</span></div>"
			,d2="<div class='tbody'>"+getFace($data.text)+createImg(pictures,buttonI)+"</div>"
			,d3="<div class='tbottom' id='tbottom"+buttonI+"'><label>"+($t||t2s($data.dateTime,now))+"</label>"
			+"<section class='replyBox' touch_action='showReply.,"+buttonI+"'><div class='replyButtonBox replyButtons'>"
			+"<div class='buttonBox'>"
			+"<button class='replyButton' touch_action='zan.,"+action+"' id='cbutton"+buttonI+"'><svg viewBox='0 0 200 200' class='svg-icon' style='vertical-align:-5px;width:20px;height:20px;transform:scale(.8);-webkit-transform:scale(.8)'><g><g transform='scale(0.1953125, 0.1953125)'><path fill='currentColor' d='M723.2 57.6C640 57.6 563.2 89.6 512 134.4 460.8 89.6 384 57.6 300.8 57.6 134.4 57.6 0 185.6 0 352c0 307.2 512 614.4 512 614.4s512-313.6 512-614.4C1024 185.6 889.6 57.6 723.2 57.6z'></path></g></g></svg>"+(hasZan?"取消":"赞")+"</button>"
			+"<button class='replyButton' touch_action='reply.,"+action+"' style='margin-left:0px' >回复</button>"
			+delB
			+"</div></div><b class='replyIco'></b></section></div>"
			,d5=getPL($data.comments,buttonI,1)
			createNode(div,"div",{className:"listLeft",html:headimg})
			createNode(div,"div",{className:"listContent",id:"listContent"+buttonI,html:d1+d2+d3+d4+d5});			
			buttonI++
			return div	
		}
	function getFace($str){
		return $str.replace(/\[(.{1,3})\]/gi,'<img class="faceIcon" src="//q-cdn.mtq.tvm.cn/adsmall/release/active/image/emotionPic/png/$1.png">')
		}	
	function createImg($d,$i){
		var str=""
		if($d){
			var i=0,il=$d.length,li,str="",url="",src,d="";
			if(il>1){
				for(;i<il;i++){
					li=$d[i];
					src=li.url;
					d+=","+src;
					url=src+"_200w_200h"
					str+="<label style='background-image:url("+url+");background-size:cover' title='"+src+"' class='photos' action='photoShow.,"+$i+".,"+i+"'></label>"
					}
			}else{
				src=$d[0].url
				url=src+"_200w_200h";d=","+src
				str+="<img src='"+url+"' class='contentImg' action='photoShow.,"+$i+".,0'>"
				}
			str="<div id='photoBox"+$i+"' data='"+d+"'>"+str+"</div>"
		}
		return str
		}
	function getDZ($data,$i,$c){
		var data=$data||[],str="",i=0,il=data.length,li;
		if(il>0){
			str="<table border='0' cellpadding='0' cellspacing='0'><tr><td valign='top'><img src='img/ico2.png' class='ico2'></td><td id='zanTD"+$i+"'>"
			for(;i<il;i++){
				li=data[i];
				str+="<img src='"+li.avatar_url+"' class='headImgS1'  onerror='headImgErr(this)' title='"+li.openid+"'>"
				if(openid===li.openid)hasZan=1
				}
				str+="<label class='zanCount' id='zanPeople"+$i+"'>共"+il+"人赞</label></td></tr></table>"
				if($c)str="<div class='zanBox' id='zanBox"+$i+"'>"+str+"</div>"
			}
			return str
		}
	function getPL($data,$i,$c){
		var data=$data||[],str="",i=0,il=data.length,li,user,id;
		if(il>0){
			for(;i<il;i++){
				li=data[i],user=li.user,id=li.messageId,hf=li.tocomment,s="";
				if(!!hf){s="回复<font color='#576b95'>"+hf.nickname+"：</font>"}
				str+="<div class='table' id='table"+$i+i+"'><section class='headImgBox' action='goto.,"+li.openid+".,"+(li.tvmid||"null")+"'><img src='"+user.avatar_url+"' onerror='headImgErr(this)' class='headImgS2'></section>"
				+"<section class='content' action='ping.,"+$i+".,"+id+".,"+i+".,"+li.openid+".,"+user.nickname+".,"+li._id+"'><div class='thead'><label class='nickname'>"+user.nickname+"</label><span class='money'>"+($c?t2s(li.dateTime,now):"刚刚")+"</span></div>"+s+getFace(li.text)+"</section></div>"
				}
				if($c)
				str="<div class='pinglunBox' id='pinglunBox"+$i+"'>"+str+"</div>"
			}
			return str
		}
	function photoShow($i,$i2){
		var td=document.getElementById('photoBox'+$i),box=document.getElementById("photoWrap"),data=td.getAttribute("data").split(",");
		data.shift()
		if(window.WebViewJavascriptBridge)
			WebViewJavascriptBridge.callHandler("callNativeToDo",{action:"preview_images",data:{images:data,offset:$i2},callback:0});
		else{
			CONFIG.shareInfo.resources=location.href;
			CONFIG.shareInfo.strFun=function($wx){
				    wx.previewImage({
					  current:data[$i2],
					  urls:data
					});
				}
			wxShare(CONFIG.shareInfo)
		}
	}	
	function channerName($s){
		var str=channelInfo[$s]||{tvname:""}
		return str.tvname
		}
	var buttonList=[]	
	function showReply($t,$i){
		var ele,style,h;
		if($t){
			$t.style.display="block";
			ele=$t.firstChild;
			h=ele.className//取当前元素的类
			if(!ele.event){
				ele.event=1;
				addEvent(ele,"webkitAnimationEnd",function(){
					if(ele.className.indexOf("showb")>-1){
						ele.className="buttonBox hidd";
						$t.style.display="none"
						}
					})
			}		
		}
		var el;
		while(el=buttonList.shift())
			el.className="buttonBox showb"
		if(h)
		if(h.indexOf("showa")>-1){
			ele.className="buttonBox showb"
			}else{
				ele.className="buttonBox showa"
				buttonList.push(ele)
				}
		}
	function del($i,$id,$a){
		var a=setAjax("POST",HOST.FR+"/open/removeMsg"),ele=document.getElementById("divList"+$i),h=ele.offsetHeight,t=ele.offsetTop
		ele.style.cssText="position:absolute;top:"+t+"px;-webkit-transition:all 400ms ease;-webkit-transform:scale(0)"
		div=createNode(ele,"div",{className:"divList",style:"height:"+h+"px;padding:0;-webkit-transition:all 600ms ease;"},"p1")
		a.data="openid="+openid+"&sig="+_sig+"&messageId="+$id
		a.callBack=function($data){
			var data=toObject($data)
			if(data.status==="success"){
				setTimeout(function(){
					removeNode(div)
					div=null;
					ele=null;
					a=null;
					},550)
				div.style.height="0px"			
				}
			}
		a.send()
		}	
	function ping($data,$i,$id,$a){
			var data=$data,td=document.getElementById("pinglunBox"+$i);
			if(td){
				var str,li=data,user=li.user,id=li.messageId,hf=li.tocomment,s="",i=td.childElementCount;
				if(!!hf){s="回复<font color='#576b95'>"+hf.nickname+"：</font>"}
				str="<section class='headImgBox' action='goto.,"+li.openid+".,"+(li.tvmid||"null")+"'><img src='"+user.avatar_url+"' class='headImgS2'></section>"
				+"<section class='content' action='ping.,"+$i+".,"+id+".,"+i+".,"+li.openid+".,"+user.nickname+".,"+li._id+"'><div class='thead'><label class='nickname'>"+user.nickname+"</label><span class='money'>刚刚</span></div>"+s+getFace(li.text)+"</section>"
				createNode(td,"div",{className:"table",id:"table"+$i+i,html:str})
			}else{
				createNode(document.getElementById("listContent"+$i),"div",{className:"pinglunBox",id:"pinglunBox"+$i,html:getPL([data],$i)})
				}
		}
	function zan($i,$id,$a){
		var a=setAjax("POST")
			a.data="openid="+openid+"&messageId="+$id+"&tvmid="+userInfo.tvmid,td=document.getElementById("zanTD"+$i)
		if($a!=="1"){
			a.action=HOST.FR+"/open/like"
			a.callBack=function($data){
				var data=toObject($data);
				if(data.status==="success"){
					data=data.data
					if(td){
						createNode(td,"img",{src:data.avatar_url,className:'headImgS1',title:data.openid},"p2")
						}else{
							createNode(document.getElementById("tbottom"+$i),"div",{className:"zanBox",id:"zanBox"+$i,html:getDZ([data],$i)},"p4")
							}
						getP()
					}
				}
		}else{
			a.action=HOST.FR+"/open/unlike"
			a.callBack=function($data){
				var data=toObject($data);
				if(data.status==="success"){
					var child=td.children,il=child.length,i=0,li,tit;
					for(;i<il;){
						li=child[i];
						tit=li.title;
						if(tit===openid){
							--il;
							td.removeChild(li)
							}else i++
						}
						getP()
					}
				}
			}
			a.send()
			function getP(){
				var n=document.getElementById("zanTD"+$i).children.length-1,li=document.getElementById("zanPeople"+$i)
				,b=document.getElementById("cbutton"+$i),str="赞",action='zan.,'+$i+'.,'+$id+'.,0';
				if($a==="0"){
					str="取消",action='zan.,'+$i+'.,'+$id+'.,1'
					}
					b.innerHTML="<svg viewBox='0 0 200 200' class='svg-icon' style='vertical-align:-5px;width:20px;height:20px;transform:scale(.8);-webkit-transform:scale(.8)'><g><g transform='scale(0.1953125, 0.1953125)'><path fill='currentColor' d='M723.2 57.6C640 57.6 563.2 89.6 512 134.4 460.8 89.6 384 57.6 300.8 57.6 134.4 57.6 0 185.6 0 352c0 307.2 512 614.4 512 614.4s512-313.6 512-614.4C1024 185.6 889.6 57.6 723.2 57.6z'></path></g></g></svg>"+str
					b.setAttribute("touch_action",action)
					if(n<1)
					removeNode(document.getElementById("zanBox"+$i))
					else
					li.textContent="共"+n+"人赞"
				}
		}
	function displayDialog($data){
		var html;$data.shift()
		if($data[3]===openid){
			html="<p action='delPing.,"+$data.join(".,")+"'>删除</p>"
			}else{
				html="<p action='ping.,"+$data.join(".,")+"'>回复</p>"
				}
		if(!delDialog){
			delDialog=createNode(DB,"div",{className:"delDialog",action:'hiddDelDialog'})
			addEvent(delDialog,"click",function(e){
			docAction(e,{action:"action",fun:function($t,$action){
						var action=$action.split(".,")
						switch(action[0]){
							case"hiddDelDialog":
								hiddDelDialog()
							break
							case"delPing":
								delPing(action);
							break
							case"ping":
								replayInfomation.bigReplayCite.show({
								  "callBack":function(data){
										ping(data,action[1])
										hiddDelDialog()
								  },
								  "messageId":action[2],
								  "tocomment":{"id":action[6],"openid":action[4],"nickname":action[5]}
								})
							break
							}
						}
					})
				})
			}
			delDialog.innerHTML="<div>"+html+"<p action='hiddDelDialog'>取消</p></div>"
			delDialog.style.display="block";
			setTimeout(function(){
				delDialog.firstChild.style.webkitTransform="translate(0,0)"
				delDialog.style.background="rgba(0,0,0,.3)"
				},50)
		}
	function delPing($ac){
		var a=setAjax("POST",HOST.FR+"/open/comment/remove");
		a.data="openid="+openid+"&sig="+_sig+"&commentId="+$ac[6]
		a.callBack=function($data){
			var data=toObject($data)
			if(data.status==="success"){
				var box=document.getElementById("pinglunBox"+$ac[1])
				removeNode(document.getElementById("table"+$ac[1]+$ac[3]))
				if(box.childElementCount===0)removeNode(box)
				hiddDelDialog();
				}
			};
		a.send()
		}
	function hiddDelDialog(){
		if(delDialog){
			delDialog.firstChild.style.webkitTransform="translate(0,100%)"
			delDialog.style.background="rgba(0,0,0,0)"
			setTimeout(function(){
				delDialog.style.display="none";
				},280)		
			}
		}	
	addEvent(box,"click",function(e){
		docAction(e,{action:"action",fun:function($t,$action){
					var action=$action.split(".,")
					switch(action[0]){
						case"goto":
						//	if(action[2]!=="null")
							location="user.html?toopenid="+action[1]+(action[2]!=="null"?"&tvmid="+action[2]:"")
						break
						case"photoShow":
							photoShow(action[1],action[2])
						break
						case"ping":
							displayDialog(action)
						break
						default:
						showReply()
						break
						}
					}
				})
		})
		addEvent(mainBody,"scroll",function(){
			if(!scrollRun){
				var t=mainBody,h1=t.scrollHeight,h2=t.offsetHeight,h3=t.scrollTop
					if(h2+h3>h1-30){
						loading.style.cssText='background:url(img/loading.gif) no-repeat center 10px;background-size:32px 32px';
						loadPage++;
						loadMsg()
					}
				}
			})
	addEvent(DB,"touchstart",function(e){
		docAction(e,{action:"touch_action",fun:function($t,$action){
					var action=$action.split(".,");
					switch(action[0]){
						case"showReply":
							showReply($t.firstChild,action[1]);
							noPop(e)
						break
						case"zan":
							zan(action[1],action[2],action[3]);showReply()
						break						
						case"reply":
							showReply();
							replayInfomation.bigReplayCite.show({
								'messageId':action[2],
								'serialNum':action[1],
								'callBack':function(data){
									ping(data,action[1])
								}
							  });
						break
						case"del":
							del(action[1],action[2],action[3]);showReply()
						break						
						}
					}
				})
		})			
		return {"createList":createList}
	}

//mainVar.loadObj=xdLoadFun()
//mainVar.loadObj.show()
//工具类方法



//loading 显示与隐藏
function xdLoadFun(){
	if(!window.xdLoadEle){
		setStyle(".xdLoadBox{position:fixed;width:60px;height:60px;border-radius:5px;background:rgba(0,0,0,.5) url(img/loading.gif) no-repeat center center;display:none;top:50%;left:50%;background-size:30px 30px;-webkit-transform:translate(-50%,-50%);z-index:1000}")
		window.xdLoadEle=createNode(mainBody,"div",{className:"xdLoadBox"})
		}
		return {show:function($opt){
			if($opt){
				if($opt.style)
				xdLoadEle.style.cssText=$opt.style
				}
			xdLoadEle.style.display="block";
		},hidd:function(){
			xdLoadEle.style.display="none"
			}
		}
	}
//边看边聊导航栏跳转链接
function goUrl($){var h,user=userInfo;
	switch($){
		case"M_SC_NEW":
			h="http://assets.yaomall.tvm.cn/staticfile/pages/shop/2aeaf986-da55-8738-2f81-2b2918cad9df/index.html?fromgzh=1"
		break
		case "M_YL":
			h="http://assets.yaomall.tvm.cn/staticfile/pages/shop/2aeaf986-da55-8738-2f81-2b2918cad9df/index.html?fromgzh=1"
			//h=" http://games.yaotv.tvm.cn/?f=wx&addi="+JSON.stringify({"yaotv_openid":user.openid,"yyyappid":PAGE.yyyappid,"sign":user.sig})+"&cache="+Math.random()
		break
		case "M_GRZX":
			h="http://a.h5.mtq.tvm.cn/yao_zhoubian/ttdsb/index.html?url=home.html"
		break
		case "M_HBBD":
			  h="share.html?type=money"
		break
		case "M_DJBD":
			h="share.html?type=dajiangsk"
		break
		case "FX":
			h=HOST.DOMAIN2+"/auth/fanxian?page=pickup&fromgzh=1"
		break
		case "CZ":
			h="http://games.yaotv.tvm.cn/Home/Order/index"
		break
		case "MYE":
			h="http://yaomall.tvm.cn/html/?q=deal/46497107fa23/0/buy-balance"
		break
		case "MH":
			//h=HOST.DOMAIN2+"/auth/fanxian?page=record&fromgzh=1&toopenid="+user.openid
			var url=getSearch().home;
			h=url?url:h=HOST.FR+"/auth/friends?page=friends&fromgzh=1&toopenid="+user.openid
		break
		case "PHB":
			h="http://pmall.yaotv.tvm.cn/sales/dist/rank/index.html"
		break
		
	}
	setTimeout(function(){
		if(h)location.href=h
		},200);
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
//倒计时
function format($time){
  var t=n2t($time,[{v:3600,u:":",hidd:1},{v:60,u:":"},{v:1,u:""}]);
  return t.replace(/(\d)/g,"<b>$1</b>");
}

function initTopInfo(){
	var toopenid=_toopenid,
		user=userInfo,
		targetTvmid=search.tvmid||'',
		hbHelperTvmid='sys582581347a23dba43c128fe6',
		_ishelper;
	if(_self){
		targetTvmid=user.tvmid;
	}
	_ishelper=(targetTvmid==hbHelperTvmid?true:false);
	var posObj={
			q1:[{top:"30%",left:"35%"}],
			gtq2:[{top:"-14%",left:"35%"},{top:"15%",left:"5%"},{top:"20%",right:"5%"},{top:"40%",left:"35%"}],
			gtq4:[{top:"-14%",left:"35%"},{top:"55%",left:"5%"},{top:"-5%",right:"5%"},{top:"40%",left:"35%"},{top:"1%",left:"1%"},{top:"52%",right:"1%"}]
		},
		topHB=createNode(mainBody,'div',{className:'hongbao',id:'topHB'},'p2'),
		//topImg=createNode(topHB,'img',{src:'img/top/top.jpg',width:'100%',height:"306px",className:'topImg'},'p3'),
		userTop=createNode(topHB,'div',{className:'user_top',id:'userTop'},'p3'),
		userTopInfo=createNode(userTop,'div',{className:'user_top_info',html:'<div class="user_top_img" ><img width="100%" id="userTopImg"></div>\
			<div class="user_top_nick">\
				<p class="top_nick" id="topNick"></p>\
				<p class="top_pos" id="topPos"></p>\
			</div>'},'p3');
	var toUserPos,toUserImg='',toUserNick='';
	var cashData={};
	var userStatus,getRelationFlag=false;//是否调用getRelation
  DC_FUN(true);
	if(_self){//进自己主页
		if(user.isWX){//微信
			var userST=createNode(userTopInfo,'div',{className:'user_top_st',html:'设置'},'p3'),//进自己主页显示
				userSTFile=createNode(userST,'input',{action:'st',name:"file",type:'file',accept:'image/*'},'p3');
		}else{
			var userST=createNode(userTopInfo,'div',{action:'st',className:'user_top_st',html:'设置'},'p3');//进自己主页显示
		}
	}else{
		var userAF;
		if(targetTvmid){
			getRelation(function($data){
				if($data.status=='success'&&$data.data){
					switch($data.data.type){
						case 0:
							userAF=createNode(userTopInfo,'div',{action:'af',className:'user_top_af',html:'加好友'},'p3');
							break;
						case 1:
							userAF=createNode(userTopInfo,'div',{className:'user_top_check',html:'等待验证'},'p3');
							break;
						case 2:
							userAF=createNode(userTopInfo,'div',{action:'ac',className:'user_top_ac',html:'接受'},'p3');
							break;
						case 4:
							userAF=createNode(userTopInfo,'div',{action:'sm',className:'user_top_sm',html:'发消息'},'p3');
							break;
						default:
							userAF=createNode(userTopInfo,'div',{action:'af',className:'user_top_af',html:'加好友'},'p3');
					}
				}else{
					userAF=createNode(userTopInfo,'div',{action:'af',className:'user_top_af',html:'加好友'},'p3');
				}
			});
			checkUserStatus(function($data){
				userStatus=getUserStatus($data.code);
			});
		}else{
			getInvite(function($data){
				if($data.status=='success'){
					switch($data.data){
						case 0:
							userAF=createNode(userTopInfo,'div',{action:'af',className:'user_top_af',html:'加好友'},'p3');
							break;
						case 1:
							userAF=createNode(userTopInfo,'div',{className:'user_top_check',html:'等待验证'},'p3');
							break;
						default:
							userAF=createNode(userTopInfo,'div',{action:'af',className:'user_top_af',html:'加好友'},'p3');
					}
					userStatus=getUserStatus(10004);
				}else{
					tishi($data.code)
				}
			});
		}
	}
	var userMoney=createNode(userTop,'div',{},'p3'),
		userMoneyLink=createNode(userMoney,'a',{className:'user_top_hb',href:'list.html?toopenid='+toopenid+'&tvmid='+targetTvmid},'p3'),
		userBTM=createNode(topHB,'div',{className:'user_bottom',id:'userBTM'},'p3');
	if(_ishelper){
		userMoneyLink.innerHTML='红包榜 &gt;';
	}else{
	  getHBTotal(function($data){
	    if($data.status=="success"){
	      userMoneyLink.innerHTML='红包:'+($data.data/100||0)+'元 &gt;';
	    }
	  });
	}
	getUserInfo(function($data){
		toUserImg=$data.head_img?($data.head_img.indexOf('wx.qlogo.cn')<0?$data.head_img:$data.head_img+'/0'):'http://q-cdn.mtq.tvm.cn/yao/images/default.png';
		toUserNick=$data.nickname||'未知用户';
		DO.title=(_self?"我":toUserNick)+"的空间"
		if($data.address){
			toUserPos=$data.address.city+$data.address.area;
		}
		var userBG=$data.user_bg;
		if(userBG){
			topHB.style.backgroundImage='url('+userBG+')';
		}
		setHbAreaH();
		getUserHBList(function($hbData){
			if($hbData.status=="success"){
				if($hbData.data){
				  setHBItem($hbData.data);
				}
			}else{
				tishi('网络异常，请稍后再试');
			}
		});
		DO.getElementById("userTopImg").src=toUserImg;
		DO.getElementById("topNick").innerHTML=toUserNick;
		if(toUserPos){
			DO.getElementById("topPos").innerHTML="来自"+toUserPos;
		}
	});
	function setHbAreaH(){
		var topHBH=topHB.offsetHeight,
			topH=userTop.offsetHeight;
		userBTM.style.height=(topHBH-topH)+'px';
	}
	function getUserInfo($fun){
		var d=setAjax("GET",HOST.RTS+"/userinfo/get?openid="+toopenid+"&systoken="+PAGE.systoken+"&"+nocache())
			d.callBack=function($data){
				var data=toObject($data);
				data=data.data;	
				isFun($fun,data);
			}
			d.send()
	}
	function setHBItem($data){
		var curpos={},arrIndex,hbItem,progressArr=[],progressOut,progressInner,timeCount,timeDefaultArr=[],timeArr=[],progressWidth=0,posArr=[],itemLength=$data.length;
	    userBTM.innerHTML='';
	    posObj={
			q1:[{top:"30%",left:"35%"}],
			gtq2:[{top:"-14%",left:"35%"},{top:"15%",left:"5%"},{top:"20%",right:"5%"},{top:"40%",left:"35%"}],
			gtq4:[{top:"-14%",left:"35%"},{top:"55%",left:"5%"},{top:"-5%",right:"5%"},{top:"40%",left:"35%"},{top:"1%",left:"1%"},{top:"52%",right:"1%"}]
		};
		if(itemLength==1){
			posArr=posObj.q1;
		}else if(itemLength>1&&itemLength<4){
			posArr=posObj.gtq2;
		}else{
			posArr=posObj.gtq4;
		}
		for(var i=0;i<itemLength;i++){
			if(posArr.length>0){
				arrIndex=random(0,posArr.length-1);
				curpos=posArr[arrIndex];
				switch($data[i].status){
					case 4://已被抢
						var getHBTime=t2s($data[i].dateTime*1000,now);
						hbItem=createNode(userBTM,'div',{html:'<a class="goHomePage" href="user.html?toopenid='+$data[i].ttopenid+'&tvmid='+$data[i].tvmid+'"><img width="31" src="img/top/hb.png"></a>\
							<div class="hb_hasused"><p>'+($data[i].dateTime?((getHBTime.indexOf("-")==0||getHBTime.indexOf("0")==0)?'刚刚':getHBTime):"刚刚")+'被</p><p><span class="used_nick">'+$data[i].name+'</span> <span>抢走了</span></p></div>',className:"hbItem",style:'position:absolute;'+(curpos.left?'left:'+curpos.left+';':'')+(curpos.right?'right:'+curpos.right+';':'')+';top:'+curpos.top+';'},'p3');
						break;
					case 3://待生成
						hbItem=createNode(userBTM,'div',{html:'<img width="31" src="img/top/hb.png">',className:"hbItem",style:'position:absolute;'+(curpos.left?'left:'+curpos.left+';':'')+(curpos.right?'right:'+curpos.right+';':'')+';top:'+curpos.top+';'},'p3');
						progressOut=createNode(hbItem,'div',{className:'progress_outer',id:'progressOuter',html:'<div class="progress_inner1"></div>'},'p3');
						progressInner=createNode(progressOut,'div',{width:$data[i].countdown/$data[i].interval*progressWidth+"px",className:'progress_inner2'},'p3');
						if(!progressWidth){
							progressWidth=progressInner.offsetWidth;
						}
						timeCount=createNode(hbItem,'div',{className:'pro_countdown',html:formatDate($data[i].countdown)},'p3');
						timeDefaultArr.push($data[i].interval);
						timeArr.push($data[i].countdown);
						progressArr.push({time:timeCount,out:progressOut,inner:progressInner});
						break;
					case 2://可抢红包
						hbItem=createNode(userBTM,'div',{html:'<img action="'+(_self?'self':userStatus)+'" width="31" src="img/top/hb.png">\
							<p class="hb_useable">红包可抢啦</p>',className:"hbItem",style:'position:absolute;'+(curpos.left?'left:'+curpos.left+';':'')+(curpos.right?'right:'+curpos.right+';':'')+';top:'+curpos.top+';'},'p3');
						break;
				}
				posArr.splice(arrIndex,1);
			}
		}
		setProgress();
		doTopAction();
		function setProgress(){
			if(progressArr.length>0){
				var timerArr=[];
				for(var i=0;i<progressArr.length;i++){
					(function($i){
						timerArr[$i]=setInterval(function(){
							if(timeArr[$i]==0){
								clearInterval(timerArr[$i]);
								if(!_self){//非自己
									checkUserStatus(function($data){
										userStatus=getUserStatus($data.code);
									});
								}
								getUserHBList(function($hbData){
									if($hbData.status=="success"){
										if($hbData.data){
										  setHBItem($hbData.data);
										}
									}else{
										tishi('网络异常，请稍后再试');
									}
								});
							}else{
								timeArr[$i]--;
								progressArr[$i].time.innerHTML=formatDate(timeArr[$i]);
								progressArr[$i].inner.style.width=timeArr[$i]/timeDefaultArr[$i]*progressWidth+"px";
							}
						},1000)
					})(i)
				}
			}
		}
	}
	function checkUserStatus($fun){
		var a=setAjax("GET",HOST.FR+"/app/redEnvelop/check?ttopenid="+user.openid+"&toTtopenid="+toopenid+"&tvmid="+user.tvmid+"&toTvmid="+targetTvmid);
		a.callBack=function($data){
			var data=toObject($data)
			isFun($fun,data)
		}
		a.async=false;
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();	
	}
	function getUserStatus($code){
		var s='';
		switch($code){
			case 10002://抢中同一好友红包次数已达上限
				s='noSameF';
				break;
			case 10003://不可以抢自己的红包
				s='self';
				break;
			case 10004://不是好友不能抢红包
				s='nf';
				if(getRelationFlag){//检测若不是好友，重新渲染关系状态
					getRelation(function($data){
						if($data.status=='success'&&$data.data){
							switch($data.data.type){
								case 0:
									userAF=createNode(userTopInfo,'div',{action:'af',className:'user_top_af',html:'加好友'},'p3');
									break;
								case 1:
									userAF=createNode(userTopInfo,'div',{className:'user_top_check',html:'等待验证'},'p3');
									break;
								case 2:
									userAF=createNode(userTopInfo,'div',{action:'ac',className:'user_top_ac',html:'接受'},'p3');
									break;
								case 4:
									userAF=createNode(userTopInfo,'div',{action:'sm',className:'user_top_sm',html:'发消息'},'p3');
									break;
							}
						}
					});
				}
				break;
			case 10005://每日红包已达上限
				s='noMore';
				break;
			case 10006://今日还没摇
				s='noShake';
				break;
			case 200:
				s='getHB';
				break;
		}
		getRelationFlag=true;
		return s;
	}
	function getUserHBList($fun){
		var user=userInfo,
			a=setAjax("GET",HOST.FR+"/app/redEnvelop?targetTvmid="+targetTvmid+"&targetTtopenid="+toopenid+"&"+nocache());
		a.callBack=function($data){
			var data=toObject($data)
			//console.log(data)
			isFun($fun,data)
		}
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();	
	}
	function uploadFile(options){
		var data=new FormData(options.object)
			,xhr=new XMLHttpRequest();
		data.append("name","."+options.fileName.split('.').pop().toLowerCase())
		data.append("file",options.data);
		xhr.open(options.type,options.url,true);
		xhr.upload.onprogress=function(ev){
			var percent=0;
			if(ev.lengthComputable){
				percent=100*ev.loaded/ev.total;
				options.moveFn(percent);
			};
		};
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status>=200&&xhr.status<300||xhr.status==304){
					options.success(xhr.responseText);
				}else{
					options.error(xhr.status);
				};
			};
		};
		xhr.send(data);	
	}
	function setUserBG($fun,$data){
		var a=setAjax("POST",HOST.RTS+"/userinfo/saveaddr?"+nocache()),
			//data='{openid:'+user.openid+',systoken:'+PAGE.systoken+',wxSig:'+user.sig+',user_bg:'+$data+'}';
			data='openid='+user.openid+'&systoken='+PAGE.systoken+'&wxSig='+user.sig+'&user_bg='+$data;
			a.data=data;
		a.callBack=function($data){
			var data=toObject($data)
			isFun($fun,data)
		}
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();
	}
	function random(min,max){
		return parseInt(Math.random()*(max-min+1)+min);
	}
	function doTopAction(){
		topHB.onclick=function(e){
			var ele=e.srcElement||e.target
			,action=ele.getAttribute("action");
			switch(action){
				case 'af'://加好友
					if(targetTvmid){
						var type=1;
						addFriend(function($data){
							if($data.status=="success"){
								if($data.data&&$data.data.type==1){
									userAF.remove();
									userAF=createNode(userTopInfo,'div',{className:'user_top_check',html:'等待验证'},'p3');
								}
							}else{
								tishi($data.errMsg.msg);
							}
						},type);
					}else{
						sendInvite(function($data){
							if($data.status=='success'){
								userAF.remove();
								userAF=createNode(userTopInfo,'div',{className:'user_top_check',html:'等待验证'},'p3');
							}else{
								tishi($data.code);
							}
						});
					}
					break;
				case 'ac'://接受
					var type=4;
					addFriend(function($data){
						if($data.status=="success"){
							if($data.data&&$data.data.type==4){
								userAF.remove();
								userAF=createNode(userTopInfo,'div',{action:'sm',className:'user_top_sm',html:'发消息'},'p3');
								userStatus="getHB";
						        getUserHBList(function($hbData){
									if($hbData.status=="success"){
										if($hbData.data){
										  setHBItem($hbData.data);
										}
									}else{
										tishi('网络异常，请稍后再试');
									}
								});
							}
						}else{
							tishi($data.errMsg);
						}
					},type);
					break;
				case 'sm'://发消息
					if(window.WebViewJavascriptBridge){
						WebViewJavascriptBridge.callHandler("callNativeToDo",{action:"chat_tofriend",data:{tvmid:targetTvmid},callback:0});
					}
					break;
				case 'st'://设置
					settingOpt();
					break;
				case 'noSameF'://抢同一个好友红包到达上限
					createTSErrMsg('<p>每天只能抢同一个好友<span>2个红包</span>哦</p><p>去其他好友家看看吧~</p>');
					break;
				case 'self'://自己
					createTSErrMsg('<p>不能抢自己的红包哦</p><p>去<span>好友家</span>看看吧~</p>');
					break;
				case 'nf'://不是好友，不能抢红包
					createTSErrMsg('<p>你们还不是好友</p><p>只能抢<span>好友的红包</span>哦~</p>');
					break;
				case 'noMore'://每日红包已达上限
					createTSErrMsg('<p>您今天抢的红包太多了</p><p>明天再来玩吧~</p>');
					break;
				case 'noShake'://今日还没摇
					createTSErrMsg('<p>您还不能抢红包</p><p>参与过<span>摇红包</span>才能抢红包哦~</p>');
					break;
				case 'getHB'://抢红包
					initHBPrompt();
					break;
			}
		}
		function settingOpt(){
			if(user.isWX){	
				var upProgOuter=createNode(userTop,'div',{className:'up_progress'},'p3');
				userSTFile.onchange=function(){
					var fileName=this.files[0].name;
					uploadFile({
						type:'POST',
						url:HOST.FR+'/upload/image',
						data:this.files[0],
		       			object:this,
		       			fileName:fileName,
						moveFn:function(num){
							upProgOuter.style.width=parseInt(num)+'%';
						},
						success:function(data){
							var data=toObject(data);
							if(data.status=='success'){
								setUserBG(function(){
									topHB.style.backgroundImage='url('+data.data.imageUrl+')';
									upProgOuter.remove();
								},data.data.imageUrl);
							}else{
								tishi('上传失败，请重试。',{time:3e3});
							};
						},
						error:function(){
							tishi('上传失败，请重试!',{time:3e3});
						}
					})
				}
			}else{
				if(window.WebViewJavascriptBridge){
					WebViewJavascriptBridge.callHandler("callNativeToDo",
					{
						action:"get_image",
						data:{
					       "neededit":0
				       	},
						callback:1
					},
					function(data){
						var data=toObject(data);
						if(data){
							setUserBG(function(){
								topHB.style.backgroundImage='url('+data.url+')';
							},data.url);
						}
					});
				}
			}
		}
	}
	function sendInvite($fun){
		var a=setAjax("POST",HOST.FR+"/app/invite/user"),
			data='invited_openid='+toopenid+'&tvmid='+user.tvmid;
		a.data=data;
		a.callBack=function($data){
			var data=toObject($data)
			isFun($fun,data)
		}
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();
	}
	function getInvite($fun){
		var a=setAjax("GET",HOST.FR+"/app/check/invite/user?invited_openid="+toopenid+"&tvmid="+user.tvmid);
		a.callBack=function($data){
			var data=toObject($data)
			isFun($fun,data)
		}
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();
	}
	function addFriend($fun,type){
		var a=setAjax("POST",HOST.FR+"/app/friendChanged"),
			data='tvmid='+user.tvmid+'&ttopenid='+user.openid+'&friend_tvmid='+targetTvmid+'&friend_ttopenid='+toopenid+'&type='+type+'&mode=2';
		a.data=data;
		a.callBack=function($data){
			var data=toObject($data)
			isFun($fun,data)
		}
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();
	}
  function getHBTotal($fun){
    var a=setAjax("GET","http://pmall.yaotv.tvm.cn/open/account/total?openid="+toopenid+"&"+nocache());
    a.callBack=function($data){
      var data=toObject($data)
      isFun($fun,data)
    }
    a.err=function(){
      tishi("网络异常");
    }
    a.send();
  }
	function getRelation($fun){
		var a=setAjax("GET",HOST.FR+"/app/askRelation?tvmid="+user.tvmid+"&friend_tvmid="+targetTvmid+"&"+nocache());
		a.callBack=function($data){
			var data=toObject($data)
			isFun($fun,data)
		}
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();
	}
	function grabUserHB($fun){
		var a=setAjax("POST",HOST.FR+"/app/redEnvelop/grab?"+nocache()),
        region=user.location?user.location.region:'',
        add=region.split("-"),
			data='tvmid='+user.tvmid+'&targetTvmid='+targetTvmid+'&ttopenid='+user.openid+'&targetTtopenid='+toopenid;
		a.data=data;
		a.callBack=function($data){
			var data=toObject($data)
			isFun($fun,data)
		}
	    a.err=function(){
	      tishi("网络异常");
	    }
		a.send();
	}
  function saveUserHB($fun,$data,$codeObj){
    var a=setAjax("POST",HOST.FR+"/app/redEnvelop/save?"+nocache()),
        region=user.location?user.location.region:'',
        add=region.split("-"),
      data='tvmid='+user.tvmid+'&targetTvmid='+targetTvmid+'&name='+user.nickname+'&img='+user.weixin_avatar_url+'&province='+(add[1]||'')+'&city='+(add[2]||'')+'&area='+(add[3]||'')+'&type='+$data.type+'&amount='+$data.amount+'&dateTime='+$data.dateTime+'&targetUserImg='+toUserImg+'&targetUserName='+toUserNick+'&ttopenid='+user.openid+'&targetTtopenid='+toopenid+'&orderId='+$data.orderId+'&token='+($codeObj.token||'')+'&checkAddress='+($codeObj.checkAddress||'')+'&sig='+($codeObj.sid||'');
    a.data=data;
    a.callBack=function($data){
      var data=toObject($data)
      isFun($fun,data)
    }
      a.err=function(){
        tishi("网络异常");
      }
    a.send();
  }
  function commUserHB($fun,$id,$msg){
  	var a=setAjax("POST",HOST.FR+"/app/redEnvelop/speech?"+nocache()),
      data='id='+$id+'&msg='+$msg;
    a.data=data;
    a.callBack=function($data){
      var data=toObject($data)
      isFun($fun,data)
    }
      a.err=function(){
        tishi("网络异常");
      }
    a.send();
  }
	function initHBPrompt($data){
		var config={
			id:'hbPrompt',
			type:'toast',
			content:'<div class="p_inner_info">\
						<img width="50" src="'+toUserImg+'">\
						<p>'+toUserNick+'</p>\
					</div>\
					<p class="p_hb_wish">恭喜发财，大吉大利！</p>\
					<div class="hb_open_btn"></div>',
			animation:'scaleIn',
			isShowClose:true,
			isShowMask:true,
		      closeCallback:function(){
				if(!_self){//非自己
					checkUserStatus(function($data){
						userStatus=getUserStatus($data.code);
					});
				}
		        getUserHBList(function($hbData){
					if($hbData.status=="success"){
						if($hbData.data){
						  setHBItem($hbData.data);
						}
					}else{
						tishi('网络异常，请稍后再试');
					}
				});
		      }
		},
		hbPrompt,
		prizePrompt,
		commPrompt;
		if(!DO.getElementById(config.id)){
			hbPrompt=new createPrompt(config);
		}
		var hbOpen=DO.getElementById(hbPrompt.id).querySelector(".hb_open_btn"),hasOpenFlag=false;
		hbOpen.onclick=function(){
			if(!hasOpenFlag){
				hasOpenFlag=true;
				grabUserHB(function($data){
					hiddPrompt(hbPrompt);
					if($data.status=="success"){
						if($data.data){
							initPrizePrompt($data.data);
						}
					}else{
						if($data.code==10000||$data.code==10001){
							var cf={
								id:'noHBPrompt',
								type:'toast',
								content:'<div class="p_inner_info">\
										<img width="50" src="'+toUserImg+'">\
										<p>'+toUserNick+'</p>\
									</div>\
									<p class="p_hb_wish">手慢了，红包被抢完了！</p><div class="sel_other"><a href="list.html?toopenid='+toopenid+'&tvmid='+targetTvmid+'">看看大家的手气 &gt;</a></div>',
								animation:'scaleIn2',
								isShowClose:true
							};
							if(!DO.getElementById(cf.id)){
								setTimeout(function(){
									noHBPrompt=createPrompt(cf);
								},600);
							}
						}else{
							if($data.errMsg&&$data.errMsg.msg){
								tishi($data.errMsg.msg);
							}else{
								tishi($data.errMsg);
							}
						}
						if(!_self){//非自己
							checkUserStatus(function($data){
								userStatus=getUserStatus($data.code);
							});
						}
						getUserHBList(function($hbData){
						  if($hbData.status=="success"){
						    if($hbData.data){
						      setHBItem($hbData.data);
						    }
						  }else{
						    tishi('网络异常，请稍后再试');
						  }
						});
					}
				});
			}
		}
  }
	function initPrizePrompt($data){
      if($data.type=="109"){
        cashData=$data;
        mainVar.TC.start();
      }else{
        saveUserHB(function($hbData){
        	if($hbData.status=="success"){
	          showSavePrompt($data);
	      	}else{
				if($hbData.errMsg&&$hbData.errMsg.errMsg){
					tishi($hbData.errMsg.errMsg);
				}else{
					tishi($hbData.errMsg);
				}
	      	}
        },$data,{});
      }
	}
    function showSavePrompt($data){
		var cf={
			id:'',
			type:'toast',
			content:'',
			animation:'scaleIn2',
			isShowClose:true,
	        closeCallback:function(){
				if(!_self){//非自己
					checkUserStatus(function($data){
						userStatus=getUserStatus($data.code);
					});
				}
	          getUserHBList(function($hbData){
	              if($hbData.status=="success"){
	                if($hbData.data){
	                  setHBItem($hbData.data);
	                }
	              }else{
	                tishi('网络异常，请稍后再试');
	              }
	          });
	        }
		}
        switch($data.type){
          case "108"://余额
            cf.id='yePrompt';
            cf.content='<div class="p_inner_info p_inner_info1">\
              <img width="50" src="'+toUserImg+'">\
              <p>'+toUserNick+'</p>\
            </div>\
            <div class="p_hb_info">\
              <span class="p_ye_icon">'+$data.typeMsg+'</span><span class="p_hb_num">'+$data.amount/100+'</span><span class="p_coin_name">元</span>\
            </div>\
            <p class="p_save_tip">已存入我的钱包</p>';
            break;
          case "109"://现金
            cf.id='cashPrompt';
            cf.content='<div class="p_inner_info p_inner_info1">\
              <img width="50" src="'+toUserImg+'">\
              <p>'+toUserNick+'</p>\
            </div>\
            <div class="p_hb_info">\
              <span class="p_hb_num">'+$data.amount/100+'</span><span class="p_coin_name">'+$data.typeMsg+'</span>\
            </div>\
            <p class="p_save_tip">已存入我的钱包</p>';
            break;
          case "110"://金币
            cf.id='coinPrompt';
            cf.content='<div class="p_inner_info p_inner_info1">\
              <img width="50" src="'+toUserImg+'">\
              <p>'+toUserNick+'</p>\
            </div>\
            <div class="p_hb_info">\
              <img width="40" src="img/top/p_coin_icon.png">\
              <span class="p_coin_num">x'+$data.amount+'</span><span class="p_coin_name">'+$data.typeMsg+'</span>\
            </div>\
            <p class="p_save_tip">已存入我的钱包</p>';
            break;
        }
        if(!DO.getElementById(cf.id)){
	        setTimeout(function(){
	          prizePrompt=new createPrompt(cf);
	        },500);
	    }
      }
    function showCommPrompt($data,$id){
      	var config={
	        id:'commPrompt',
	        type:'alert',
	        content:'<div class="p_inner_info">\
	            <p>给'+toUserNick+'留言</p>\
	            <div class="">\
	              <textarea maxLength="72" id="commText" placeholder="抢到红包喽，分享下此刻的心情吧~" rows="10"></textarea>\
	            </div>\
	            <div class="p_comm_btm clearfix">\
	              <span class="p_comm_tip">至少8个字哦~</span>\
	              <span class="p_len_tip"><span id="inputLen">0</span>/72</span>\
	            </div>\
	          </div>',
	        animation:'scaleIn',
	        isShowClose:true,
	        okBtn:'留言',
	        okCallback:function(){
	        	var connText=DO.getElementById("commText").value;
		    	if(connText.length<8){
		    		tishi("哎哟你写的获奖感言太少了，最少也要写8个字吧");
		    	}else{
		    		commUserHB(function($commData){
		    			if($commData.status=='success'){
							DO.getElementById(commPrompt.id).classList.add("scaleOut");
							setTimeout(function(){
								showSavePrompt($data);
							},500);
							mainFun.createList($commData.data);
						}else{
							if($commData.errMsg&&$commData.errMsg.msg){
								tishi($commData.errMsg.msg);
							}else{
								tishi($commData.errMsg);
							}
						}
		    		},$id,connText)
		    	}
	        }
	    },
	    commPrompt;
	    if(!DO.getElementById(config.id)){
	    	commPrompt=new createPrompt(config);
	    }
		DO.getElementById("commText").oninput=function(){
			DO.getElementById("inputLen").innerHTML=this.value.length;
		}
	} 
    function DC_FUN($a){
      if(mainVar.TC&&mainVar.TC.status){
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
            window.TouClick.ready(function(){
                var tcBox=createNode(DB,"div",{style:"width:0;height:0"}),tc=TouClick(tcBox,{
                      onSuccess:function(obj){
                        var data=cashData||{};
                        saveUserHB(function($data){
                          if($data.status=="success"){
                              showCommPrompt(data,$data.data.redEnvelop);
                          }else{
                            tishi($data.errMsg);
                          }
                        },data,obj);
                      },
                      behaviorDom:0,
                      captchaType:13,
                      isOpenMask:function(){
                          return true;
                      },
                      isCaptchaFloat:function(env){
                          if(env == "pc"){
                              return false;
                          }else if(env == "mob"){
                              return true;
                          }
                      }
                    });
                var box=tc[0],a=box.querySelector(".touclick"),b=a.querySelector(".touclick-hod-wrap"),c=a.querySelector(".touclick-pub"),d=a.querySelector(".touclick-empty");
                a.style.cssText="width:0;height:0";
                removeNode(a);
                document.body.appendChild(c)
                b.style.cssText="width:0;height:0;padding:0;margin:0";
                b.innerHTML="";
                box.appendChild(b);
                tc.status=1;
                mainVar.TC=tc;
                !$a&&tc.start()
                  })
              }else{
                      ti++
                var str="验证码服务异常，正在进行重试 "+ti
                    if(!ms)ms=new tishi(str,{showTime:3e6});
                else
                      ms.box.innerHTML=str
                      setTimeout(r,2000)
              }
          }
      } 
	function formatDate(time){     
		var minute=parseInt(time/60);     
			second=time%60,
			timeStr=minute>0?minute+"分"+second+"秒后可抢":second+"秒后可抢";
		return timeStr;     
	}
}
function createPrompt($opt){
	var options=$opt||{};
	this.id=options.id||'defaultPrompt';
	this.type=options.type||'';
	this.isShowTitle=options.isShowTitle||false;
	this.isShowClose=options.isShowClose||false;
	this.isShowShare=options.isShowShare||false;
	this.isShowMask=options.isShowMask||false;
	this.title=options.title||null;
	this.content=options.content||'成功';
	this.cancelBtn=options.cancelBtn||'取消';
	this.okBtn=options.okBtn||'确认';
	this.style=options.style||'';
	this.cancelCallback=options.cancelCallback||function(){};
	this.okCallback=options.okCallback||function(){};
	this.closeCallback=options.closeCallback||function(){};
	this.animation=options.animation||'scaleIn';
	initPrompt(this);
}
function initPrompt($this){
	var node=DO.getElementById($this.id),pCell,pInner,html,close;
	/*if($this.isShowMask){
		var promptMask=createNode(DB,'div',{className:'p_mask',id:'pMask'},'p2');
	}*/
	if(!node){
		node=createNode(DB,'div',{className:'prompt',id:$this.id||'defaultPrompt'});
	}
	pCell=createNode(node,'div',{className:'p_cell'});
	pInner=createNode(pCell,'div',{className:'p_inner '+$this.animation});
	pInner.innerHTML=loadHtml($this);
	if($this.isShowShare){
		createNode(node,'img',{src:"img/prize/share.png",width:"100%",class:"p_share"},'p3');
	}
	node.style.display='table';
	if($this.style){
		loadCss();
	}
	promptAddEvent(node,$this);
}
function loadHtml(options){
	var html=(options.isShowTitle?'<div class="p_title">'+(options.title||'')+'</div>':'')+'\
				<div class="p_content">'+(options.content||'')+(options.isShowClose?'<span action="close" class="p_close"></span>':'')+'</div>'
	switch(options.type){	
		case "confirm":
			html+='		<div class="p_btns">\
							<b class="p_btn_cancel" action="cancel">'+(options.cancelBtn||'取消')+'</b>\
							<b class="p_btn_ok" action="ok">'+(options.okBtn||'确认')+'</b>\
						</div>'
			break;
		case "alert":
			html+='		<div class="p_btns">\
							<b class="p_btn_ok" action="ok">'+(options.okBtn||'确认')+'</b>\
						</div>'
			break;
	}
	return html;
}
function loadCss(){
	var style=DO.createElement('style');
	style.innerHTML=options.style;
	DO.head.appendChild(style);
}
function cancelFunc(options){
	options.cancelCallback();
}
function okFunc(options){
	options.okCallback();
}
function closeFunc(options){
	options.closeCallback();
	hiddPrompt(options);
}
function hiddPrompt($node){
	var target=DO.getElementById($node.id),ele,className;
	if(target){
		ele=target.querySelector('.p_inner');
		className=ele.className;
		ele.className=className+' scaleOut';
		setTimeout(function(){target.remove();},600);
	}
}
function promptAddEvent($node,options){
	$node.onclick=function(e){
		var ele=e.srcElement||e.target
		,action=ele.getAttribute("action");
		switch(action){
			case 'cancel':
				cancelFunc(options);
				break;
			case 'ok':
				okFunc(options);
				break;
			case 'close':
				closeFunc(options);
				break;
		}
	}
}

/*收到的礼物*/
function getGift(){
	var img
		,getGiftInfo
		,listUser
		,uLi
		,liLen
		,liWidth=0+'px'
		,html='<div style="width:100%;display:flex;display:-webkit-flex;" onclick="location.href=\'//friends.yaotv.tvm.cn/client/dist/giftrankapp/index.html?toopenid='+(search.toopenid||userInfo.openid)+'\'">'
				+'<p class="giftNum">TA收到的礼物<span id="giftC"></span></p>'
				+'<div class="giftUser"><ul class="listUser"></ul></div>'
				+'<div class="sign"><img src="img/gt.png"/></div>'
				+'</div>';
		getGiftInfo=createNode(mainBody,'div',{className:'getGiftInfo',html:html},'p3');
		listUser=getGiftInfo.querySelector('.listUser');

	var ajax = setAjax('get',HOST.FR+'/open/getUserGifts?openid='+_toopenid+'');
		ajax.callBack = function($data){
			var data=toObject($data),dataGift,len,li;
			if(data.status=='success'){
				data=data.data;
				dataGift=data.gifts;
				len=dataGift.length;
				if(data.amount!=0){
					giftC.textContent='('+data.amount+')';
				}
				if(len==0){
					uLi=createNode(listUser,'li',{className:'uLi'},'p3');
				}else{
					var aniIndex=Math.min(7,len),
						setOutTime=0;
					for(var i=0;i<len;i++){
						(function($i){
							setOutTime=$i>=aniIndex?(aniIndex+1)*200:$i*200;
							setTimeout(function(){
								li=dataGift[$i];
								toUserIco=li.user.avatar_url?li.user.avatar_url:'http://q-cdn.mtq.tvm.cn/yao/images/default.png';
								uLi=createNode(listUser,'li',{style:'-webkit-animation:headImgIn 200ms;',className:'uLi'},'p3');
								img=createNode(uLi,'img',{src:toUserIco});
							},setOutTime);
						})(i)
					}
				}
				setTimeout(function(){
					liLen=listUser.childElementCount;
					listUser.style.width=liWidth=uLi.offsetWidth*liLen+'px';
				},(len+1)*200)
			}
			
		}
		ajax.err=function(){
			giftC.textContent=0;
		}
		ajax.send();
}


/*----网站中的所有回复---*/
function infomation(){
	/*var faceArr=[{"title":"微笑","position":"0px 0px"},{"title":"撇嘴","position":"-48px 0px"},{"title":"色","position":"-96px 0px"},{"title":"发呆","position":"-144px 0px"},{"title":"得意","position":"-192px 0px"},{"title":"流泪","position":"-240px 0px"},{"title":"害羞","position":"-288px 0px"},{"title":"闭嘴","position":"-336px 0px"},{"title":"睡","position":"-384px 0px"},{"title":"大哭","position":"-432px 0px"},{"title":"尴尬","position":"-480px 0px"},{"title":"发怒","position":"-528px 0px"},{"title":"调皮","position":"-576px 0px"},{"title":"呲牙","position":"-624px 0px"},{"title":"惊讶","position":"-672px 0px"},{"title":"难过","position":"-720px 0px"},{"title":"酷","position":"-768px 0px"},{"title":"冷汗","position":"-816px 0px"},{"title":"抓狂","position":"-864px 0px"},{"title":"吐","position":"-912px 0px"},{"title":"偷笑","position":"-960px 0px"},{"title":"可爱","position":"-1008px 0px"},{"title":"白眼","position":"-1056px 0px"},{"title":"傲慢","position":"-1104px 0px"},{"title":"饥饿","position":"-1152px 0px"},{"title":"困","position":"-1200px 0px"},{"title":"惊恐","position":"-1248px 0px"},{"title":"流汗","position":"-1296px 0px"},{"title":"憨笑","position":"-1344px 0px"},{"title":"大兵","position":"-1392px 0px"},{"title":"奋斗","position":"-1440px 0px"},{"title":"咒骂","position":"-1488px 0px"},{"title":"疑问","position":"-1536px 0px"},{"title":"嘘","position":"-1584px 0px"},{"title":"晕","position":"-1632px 0px"},{"title":"折磨","position":"-1680px 0px"},{"title":"衰","position":"-1728px 0px"},{"title":"骷髅","position":"-1776px 0px"},{"title":"敲打","position":"-1824px 0px"},{"title":"再见","position":"-1872px 0px"},{"title":"擦汗","position":"-1920px 0px"},{"title":"抠鼻","position":"-1968px 0px"},{"title":"鼓掌","position":"-2016px 0px"},{"title":"糗大了","position":"-2064px 0px"},{"title":"坏笑","position":"-2112px 0px"},{"title":"左哼哼","position":"-2160px 0px"},{"title":"右哼哼","position":"-2208px 0px"},{"title":"哈欠","position":"-2256px 0px"},{"title":"鄙视","position":"-2304px 0px"},{"title":"委屈","position":"-2352px 0px"},{"title":"快哭了","position":"-2400px 0px"},{"title":"阴险","position":"-2448px 0px"},{"title":"亲亲","position":"-2496px 0px"},{"title":"吓","position":"-2544px 0px"},{"title":"可怜","position":"-2592px 0px"},{"title":"菜刀","position":"-2640px 0px"},{"title":"西瓜","position":"-2688px 0px"},{"title":"啤酒","position":"-2736px 0px"},{"title":"篮球","position":"-2784px 0px"},{"title":"乒乓","position":"-2832px 0px"},{"title":"咖啡","position":"-2880px 0px"},{"title":"饭","position":"-2928px 0px"},{"title":"猪头","position":"-2976px 0px"},{"title":"玫瑰","position":"-3024px 0px"},{"title":"凋谢","position":"-3072px 0px"},{"title":"示爱","position":"-3120px 0px"},{"title":"爱心","position":"-3168px 0px"},{"title":"心碎","position":"-3216px 0px"},{"title":"蛋糕","position":"-3264px 0px"},{"title":"闪电","position":"-3312px 0px"},{"title":"炸弹","position":"-3360px 0px"},{"title":"刀","position":"-3408px 0px"},{"title":"足球","position":"-3456px 0px"},{"title":"瓢虫","position":"-3504px 0px"},{"title":"便便","position":"-3552px 0px"},{"title":"月亮","position":"-3600px 0px"},{"title":"太阳","position":"-3648px 0px"},{"title":"礼物","position":"-3696px 0px"},{"title":"拥抱","position":"-3744px 0px"},{"title":"强","position":"-3792px 0px"},{"title":"弱","position":"-3840px 0px"},{"title":"握手","position":"-3888px 0px"},{"title":"胜利","position":"-3936px 0px"},{"title":"抱拳","position":"-3984px 0px"},{"title":"勾引","position":"-4032px 0px"},{"title":"拳头","position":"-4080px 0px"},{"title":"差劲","position":"-4128px 0px"},{"title":"爱你","position":"-4176px 0px"},{"title":"NO","position":"-4224px 0px"},{"title":"OK","position":"-4272px 0px"},{"title":"爱情","position":"-4320px 0px"},{"title":"飞吻","position":"-4368px 0px"},{"title":"跳跳","position":"-4416px 0px"},{"title":"发抖","position":"-4464px 0px"},{"title":"怄火","position":"-4512px 0px"},{"title":"转圈","position":"-4560px 0px"},{"title":"磕头","position":"-4608px 0px"},{"title":"回头","position":"-4656px 0px"},{"title":"跳绳","position":"-4704px 0px"},{"title":"挥手","position":"-4752px 0px"}];
	*/
	var faceArr=["[微笑]","[撇嘴]","[色]","[发呆]","[得意]","[流泪]","[害羞]","[闭嘴]","[睡]","[大哭]","[尴尬]","[发怒]","[调皮]","[呲牙]","[惊讶]","[难过]","[酷]","[冷汗]","[抓狂]","[吐]","[偷笑]","[可爱]","[白眼]","[傲慢]","[饥饿]","[困]","[惊恐]","[流汗]","[憨笑]","[大兵]","[奋斗]","[咒骂]","[疑问]","[嘘]","[晕]","[折磨]","[衰]","[骷髅]","[敲打]","[再见]","[擦汗]","[抠鼻]","[鼓掌]","[糗大了]","[坏笑]","[左哼哼]","[右哼哼]","[哈欠]","[鄙视]","[委屈]","[快哭了]","[阴险]","[亲亲]","[吓]","[可怜]","[菜刀]","[西瓜]","[啤酒]","[篮球]","[乒乓]","[咖啡]","[饭]","[猪头]","[玫瑰]","[凋谢]","[示爱]","[爱心]","[心碎]","[蛋糕]","[闪电]","[炸弹]","[刀]","[足球]","[瓢虫]","[便便]","[月亮]","[太阳]","[礼物]","[拥抱]","[强]","[弱]","[握手]","[胜利]","[抱拳]","[勾引]","[拳头]","[差劲]","[爱你]","[NO]","[OK]","[爱情]","[飞吻]"],faceArrLen=faceArr.length,faceCite=new face(),loading=xdLoadFun();
	function faceLocation(str){
		var reg=/\[([^[]+)\]/g;
		return str.replace(reg,function(a,b){
			return '<img class="faceIcon" src="//q-cdn.mtq.tvm.cn/adsmall/release/active/image/emotionPic/png/'+b+'.png">';
		});
	};
	function selfBigReplay(){
		var _this=this,bigReplayElem=null,enterBox=null,expressionCon=null,addPhoto=null,photoCon=null,uploadImgArr=[],publishSwitch=true;
		_this.init=function(){
			var str=faceCite.createContent();
			var html='\
					<h3>回复</h3>\
					<div class="replay">\
						<textarea placeholder="您这一刻的想法......"></textarea>\
					</div>\
					<div class="btnArea">\
						<div class="left camera" data-action="camera">\
							<i></i><p>照相机</p>\
						</div>\
						<div class="left face" data-action="face">\
							<i></i><p>表情<p>\
						</div>\
						<div class="right">\
							<span data-action="publish">发表</span>\
						</div>\
					</div>\
					<div class="bottom">\
						<div class="photo">\
							<ul><li class="add"></ul>\
						</div>\
						<div class="expression">\
							<div class="face">'+str+'</div>\
							<ul class="dot"></ul>\
						</div>\
					</div>'
			bigReplayElem=createNode(document.body,'div',{'className':'bigReplay showCamera',html:html});
			expressionCon=bigReplayElem.lastElementChild.children[1];
			photoCon=bigReplayElem.lastElementChild.children[0];
			enterBox=bigReplayElem.querySelector("textarea");
			expressionCon.style.cssText="position:absolute;top:10000px;left:1000px;width:100%;display:block";
			faceCite.scroll({
				"outContainer":expressionCon,
				"contentContainer":expressionCon.querySelector('.face'),
				"rowWidth":expressionCon.querySelector('.face').offsetWidth,
				"dotContianer":expressionCon.querySelector('.dot'),
				"leng":4
			});
			expressionCon.style.cssText="width:100%;";
			faceCite.delegation({"var":selfBigReplayCite,"elem":bigReplayElem});
			addPhoto=bigReplayElem.querySelector('.add');
			if(userInfo.isWX){
				var file=document.createElement('input');
				file.setAttribute('type','file');
				addPhoto.appendChild(file)
				file.addEventListener('change',_this.uploadPhoto,false);
				file.parentNode.addEventListener('touchstart',_this.judgeNum,false);
			}else{
				addPhoto.addEventListener('touchstart',_this.photo,false);
			};
			//filte.addEventListener('change',_this.uploadPhoto,false);
			//filte.parentNode.addEventListener('touchstart',_this.judgeNum,false);
		};
		_this.delFace=function(data){
			var reg=/(\[[^\[]+\]|.)$/;
			enterBox.value=enterBox.value.replace(reg,'');
		};
		_this.addFace=function(data){
			var reg=/(\[[^[]+\]){5,}$/g,str=enterBox.value;
			if(reg.test(str)){
				tishi('连续表情不能超过5个！');
			}else{
				enterBox.value+=data.curElem.dataset.title;	
			};
		};
		_this.face=function(){
			bigReplayElem.classList.remove('showCamera');
			bigReplayElem.classList.add('showFace');
		};
		_this.camera=function(){
			bigReplayElem.classList.remove('showFace');
			bigReplayElem.classList.add('showCamera');
		};
		_this.publish=function(){
			if(!publishSwitch){
				tishi("网络较慢，请耐心等待一会儿！",{time:3e3});
				return;
			};
			publishSwitch=false;
			var reg=/\s*/g;
			var str=enterBox.value.replace(reg,'');
			if(str.length===0&&uploadImgArr.length==0){
				tishi('请输入内容!');
				publishSwitch=true;
			}else{
				var user=userInfo,place=user.location.region.split('-');
				loading.show();
				var ajax=setAjax('post',HOST.FR+'/open/publish');
				var senData={"tvmid":user.tvmid,"yyyappId":PAGE.yyyappid,"toopenid":_toopenid,"openid":user.openid,"sig":user.sig,"text":enterBox.value,"provice":place[1],"city":place[2],"area":place[3]}
				for(var i=0;i<uploadImgArr.length;i++){
					senData["pictures["+i+"][type]"]=uploadImgArr[i].type;
					senData["pictures["+i+"][url]"]=uploadImgArr[i].url;
				};
				ajax.data=toForm({
					json:senData
				});
				ajax.callBack=function($data){
					publishSwitch=true;
					var data=toObject($data);
					loading.hidd();
					if(data.status=='success'){
						enterBox.value='';
						_this.hide();
						var dataJson=data.data;
						dataJson.text=replayInfomation.faceLocation(dataJson.text);
						mainFun.createList(dataJson);
						uploadImgArr=[];
						var oUl=photoCon.children[0],oLi=oUl.children,len=oLi.length-1;
						for(var i=0;i<len;i++){
							removeNode(oLi[i]);
						};
					}else{
						tishi(data.errMsg,{time:3e3});
					};
				};
				ajax.err=function(){
					publishSwitch=true;
					loading.hidd();
					tishi("网络超时，请稍后重试!",{time:3e3});
				};
				ajax.send();
			};
		};

		_this.closePhoto=function(data){
			var r=confirm('确定删除吗？');
			if(r){
				var flag=data.curElem.getAttribute('data-flag');
				removeNode(data.curElem.parentNode);
				uploadImgArr.splice(flag,1);
				photoCon.children[0].lastElementChild.style.display='block';
			};
		};
		_this.photo=function(e){
			var oLi=photoCon.querySelectorAll('li'),elemLen=oLi.length;
			if(elemLen>9){
				tishi("最多上传9张图片!");
				oLi[elemLen-1].style.display='none';
				return;
			};
			WebViewJavascriptBridge.callHandler(
			"callNativeToDo",
			{
				action:"get_image",
				data:{
			       "neededit":0,  
			       "width":750,
			       "height":750
		       	},
				callback:1
			},
			function(data){
				//alert(rspdt)
				var data=JSON.parse(data),
					oUl=photoCon.children[0],
					elemLi=document.createElement('li');
				elemLi.setAttribute('data-flag',elemLen-1);
				elemLi.innerHTML='<span>正准备中</span>';
				oUl.insertBefore(elemLi,oUl.lastElementChild);
				var oSpan=elemLi.children[0];
				elemLi.innerHTML='<em class="close" data-action="closePhoto"></em><img style="height:100%;width:100%;" src="'+decodeURIComponent(data.url)+'">';
				var leng=uploadImgArr.length;
				uploadImgArr.push({type:"image",url:data.url});
			});
		};
		_this.judgeNum=function(e){
			var oLi=photoCon.querySelectorAll('li'),elemLen=oLi.length;
			if(elemLen>9){
				tishi("最多上传9张图片!");
				e.preventDefault();
				oLi[elemLen-1].style.display='none';
			};
		};
		_this.uploadPhoto=function(event){
			var oUl=photoCon.children[0],elemLen=oUl.children.length,fileName=this.files[0].name,reg=/\.jpg|\.jpeg|\.png|\.gif/gi;
			if(!reg.test(fileName)){
                setTimeout(function(){
                	tishi("只支持图片上传！")
                },100);
                return;
			};
			var elemLi=document.createElement('li');
			elemLi.setAttribute('data-flag',elemLen-1);
			elemLi.innerHTML='<span>正准备中</span>';
			oUl.insertBefore(elemLi,oUl.lastElementChild);
			var oSpan=elemLi.children[0];
			upData({
				type:'POST',
				url:HOST.FR+'/upload/image',
				data:this.files[0],
       			object:this,
				moveFn:function(num){
					oSpan.innerHTML=parseInt(num)+'%';
				},
				success:function(data){
					var data=toObject(data);
					if(data.status=='success'){
						elemLi.style.backgroundImage="url("+data.data.imageUrl+")";
						elemLi.innerHTML='<em class="close" data-action="closePhoto"></em>';
						var leng=uploadImgArr.length;
						uploadImgArr.push({type:"image",url:data.data.imageUrl});
					}else{
						tishi('上传失败，请重试。',{time:3e3});
					};
				},
				error:function(){
					tishi('上传失败，请重试!',{time:3e3});
				}
			});
			function upData(options){
				var data=new FormData(options.object)
				,xhr=new XMLHttpRequest();
				data.append("name","."+fileName.split('.').pop().toLowerCase())
				data.append("file",options.data);
				xhr.open(options.type,options.url,true);
				xhr.upload.onprogress=function(ev){
					var percent=0;
					if(ev.lengthComputable){
						percent=100*ev.loaded/ev.total;
						options.moveFn(percent);
					};
				};
				xhr.onreadystatechange=function(){
					if(xhr.readyState==4){
						if(xhr.status>=200&&xhr.status<300||xhr.status==304){
							options.success(xhr.responseText);
						}else{
							options.error(xhr.status);
						};
					};
				};
				xhr.send(data);
			}
		};
		_this.show=function(){
			location.hash="selfBigReplay";
			bigReplayElem.classList.remove('bigReplayOut');
			bigReplayElem.classList.add('bigReplayIn');
			window.addEventListener('hashchange',_this.hash,false);
		};
		_this.hide=function(){
			location.hash="";
			bigReplayElem.classList.remove('bigReplayIn');
			bigReplayElem.classList.add('bigReplayOut');
			window.removeEventListener('hashchange',_this.hash,false);
		};
		_this.hash=function(){
			if(location.hash==''){
				_this.hide();
			};
		};
	};
	function bigReplay(){
		var _this=this,bigReplayElem=null,enterBox=null,expressionCon=null,messageId=null,serialNum=0,tocomment=null,outCallBack=null,publishSwitch=true;
		_this.init=function(){
			var str=faceCite.createContent();
			var html='\
					<h3>回复</h3>\
					<div class="replay">\
						<textarea placeholder="您这一刻的想法..."></textarea>\
					</div>\
					<div class="btnArea">\
						<div class="left camera" data-action="camera" style="display:none;">\
							<i></i><p>照相机</p>\
						</div>\
						<div class="left face" data-action="faceToggle">\
							<i></i><p>表情<p>\
						</div>\
						<div class="right">\
							<span data-action="publish">发表</span>\
						</div>\
					</div>\
					<div class="bottom">\
						<ul class="photo">\
							<li class="add"><input type="file"></li>\
						</ul>\
						<div class="expression">\
							<div class="face">'+str+'</div>\
							<ul class="dot"></ul>\
						</div>\
					</div>'
			bigReplayElem=createNode(document.body,'div',{'className':'bigReplay showFace',html:html});
			expressionCon=bigReplayElem.lastElementChild.children[1];
			enterBox=bigReplayElem.querySelector("textarea");
			faceCite.scroll({
				"outContainer":expressionCon,
				"contentContainer":expressionCon.querySelector('.face'),
				"rowWidth":expressionCon.querySelector('.face').offsetWidth,
				"dotContianer":expressionCon.querySelector('.dot'),
				"leng":4
			});
			faceCite.delegation({"var":bigReplayCite,"elem":bigReplayElem});
		};
		_this.delFace=function(data){
			var reg=/(\[[^\[]+\]|.)$/;
			enterBox.value=enterBox.value.replace(reg,'');
		};
		_this.addFace=function(data){
			var reg=/(\[[^[]+\]){5,}$/g,str=enterBox.value;
			if(reg.test(str)){
				tishi("连续表情不能超过5个！");
			}else{
				enterBox.value+=data.curElem.dataset.title;	
			};
		};
		_this.faceToggle=function(){
			var oClass=expressionCon.classList;
			if(oClass.contains('expressionIn')){
				oClass.remove('expressionIn');
				oClass.add('expressionOut');
			}else{
				oClass.remove('expressionOut');
				oClass.add('expressionIn');
			};
		};
		_this.publish=function(){
			if(!publishSwitch){
				tishi("网络较慢，请耐心等待一会儿！",{time:3e3});
				return;
			};
			publishSwitch=false;
			var reg=/\s*/g;
			var str=enterBox.value.replace(reg,'');
			if(str.length===0){
				tishi("请输入内容!");
				publishSwitch=true;
			}else{
				var user=userInfo;
				loading.show();
				var ajax=setAjax('post',HOST.FR+'/open/comment/save');
                if(tocomment){
                  ajax.data=toForm({
                    json:{"tvmid":user.tvmid,"toopenid":search.toopenid,"openid":user.openid,"sig":user.sig,"text":enterBox.value,"messageId":messageId,"tocomment":{"id":tocomment.id,"openid":tocomment.openid,"nickname":tocomment.nickname}}
                  });
                }else{
                  ajax.data=toForm({
                    json:{"tvmid":user.tvmid,"toopenid":search.toopenid,"openid":user.openid,"sig":user.sig,"text":enterBox.value,"messageId":messageId,"tocomment":""}
                  });
                };
    			ajax.callBack=function($data){
    				publishSwitch=true;
    				loading.hidd();
    				var data=toObject($data);
    				if(data.status=='success'){
    					enterBox.value='';
    					_this.hide();
    					var dataJson=data.data;
    					dataJson.text=replayInfomation.faceLocation(dataJson.text);
                         outCallBack&&outCallBack(dataJson,serialNum);
    				}else{
    					tishi(data.errMsg,{time:3e3});
    				};
    			};
    			ajax.err=function(){
    				publishSwitch=true;
    				loading.hidd();
					tishi("网络超时，请稍后重试!",{time:3e3});
    			};
    			ajax.send();
			};
		};
		_this.show=function(data){
			messageId=data.messageId;
            tocomment=data.tocomment;
			serialNum=data.serialNum;
            outCallBack=data.callBack;
			location.hash="bigReplay";
			bigReplayElem.classList.remove('bigReplayOut');
			bigReplayElem.classList.add('bigReplayIn');
			window.addEventListener('hashchange',_this.hash,false);
		};
		_this.hide=function(){
			location.hash="";
			bigReplayElem.classList.remove('bigReplayIn');
			bigReplayElem.classList.add('bigReplayOut');
			window.removeEventListener('hashchange',_this.hash,false);
		};
		_this.hash=function(){
			if(location.hash==''){
				_this.hide();
			};
		};
	};
	function smallReplay(){
		var _this=this,smallReplayElem,enterBox,expressionCon,publishSwitch=true;;
		_this.init=function(){
			var str=faceCite.createContent();
			var html='\
				<div class="top">\
					<div class="left" data-action="faceToggle"></div>\
					<div class="middle"><textarea placeholder="随便写点什么吧..."></textarea></div>\
					<div class="right" data-action="publish">给TA留言</div>\
				</div>\
				<div class="expression expressionIn">\
					<div class="face">'+str+'</div>\
					<ul class="dot"></ul>\
				</div>';
			smallReplayElem=createNode(document.body,'div',{"className":"smallReplay","html":html});
			expressionCon=smallReplayElem.lastElementChild;
			expressionCon.style.cssText="position:absolute;top:10000px;left:1000px;width:100%;display:block;";
			enterBox=smallReplayElem.querySelector('textarea');
			faceCite.scroll({
				"outContainer":expressionCon,
				"contentContainer":expressionCon.querySelector('.face'),
				"rowWidth":expressionCon.querySelector('.face').offsetWidth,
				"dotContianer":expressionCon.querySelector('.dot'),
				"leng":4
			});
			expressionCon.style.cssText="width:100%;";
			faceCite.delegation({"var":smallReplayCite,"elem":smallReplayElem});
			enterBox.addEventListener('focus',function(){
				smallReplayElem.classList.remove('smallReplayIn');
				smallReplayElem.classList.add('smallReplayOut');
				setTimeout(function(){
					document.body.scrollTop=10000;
				},500);
			},false);
		};
		_this.delFace=function(data){
			var reg=/(\[[^\[]+\]|.)$/;
			enterBox.value=enterBox.value.replace(reg,'');
		};
		_this.addFace=function(data){
			var reg=/(\[[^[]+\]){5,}$/g,str=enterBox.value;
			if(reg.test(str)){
				tishi("连续表情不能超过5个！");
			}else{
				enterBox.value+=data.curElem.dataset.title;	
			};
		};
		_this.faceToggle=function(){
			var oClass=smallReplayElem.classList;
			if(oClass.contains('smallReplayIn')){
				oClass.remove('smallReplayIn');
				oClass.add('smallReplayOut');
			}else{
				oClass.remove('smallReplayOut');
				oClass.add('smallReplayIn');
			};
		};
		_this.hide=function(){
			var oClass=smallReplayElem.classList;
			oClass.remove('smallReplayIn');
			oClass.add('smallReplayOut');
		};
		_this.publish=function(){
			if(!publishSwitch){
				tishi("网络较慢，请耐心等待一会儿！",{time:3e3});
				return;
			};
			publishSwitch=false;
			var reg=/\s*/g;
			var str=enterBox.value.replace(reg,'');
			if(str.length===0){
				tishi("请输入内容!");
				publishSwitch=true;
			}else{
				var user=userInfo,place=user.location.region.split('-');
				loading.show();
				var ajax=setAjax('post','//friends.yaotv.tvm.cn/open/publish');
				ajax.data=toForm({
					json:{"tvmid":user.tvmid,"yyyappId":PAGE.yyyappid,"toopenid":search.toopenid,"openid":user.openid,"sig":user.sig,"text":enterBox.value,"provice":place[1],"city":place[2],"area":place[3]}
				});
				ajax.callBack=function($data){
					publishSwitch=true;
					loading.hidd();
					var data=toObject($data);
					if(data.status=='success'){
						enterBox.value='';
						_this.hide();
						var dataJson=data.data;
						dataJson.text=replayInfomation.faceLocation(dataJson.text);
						mainFun.createList(dataJson);
					}else{
						tishi(data.errMsg);
					};
				};
				ajax.err=function(){
					publishSwitch=true;
					loading.hidd();
					tishi("网络超时，请稍后重试!",{time:3e3});
				};
				ajax.send();
			};
		};
	};
	function face(){
		var _this=this;
		_this.delegation=function(options){
			function docAction(e){
				var ele=e.srcElement||e.target,_action="data-action",attribute,argument;				
			 	do{
					if(ele.nodeType!==1)break
					if(attribute=ele.getAttribute(_action))break			
				}while(ele=ele.parentNode);	
			  	if(attribute){										
					argument=attribute.split(".,");
					var a1=argument[1];
					switch(argument[0]){
						case "closePhoto":
							options["var"].closePhoto({"curElem":ele});
						break;
						case "face":
							options["var"].face();
						break;
						case "camera":
							options["var"].camera();
						break;
						case "faceToggle":
							options["var"].faceToggle();
						break;
						case "delFace":
							options["var"].delFace();
						break;
						case "addFace":
							options["var"].addFace({"curElem":ele});
						break;
						case "publish":
							options["var"].publish();
						break;
					};
				};
			};
			options.elem.addEventListener("click",docAction,false)		
		};
        _this.createContent=function(){
            var str='',index=0;
            for(var i=0;i<4;i++){
                str+='<ul>';
                for(var k=0;k<24;k++){
                    if(k==23){
                        str+='<li data-action="delFace"><i class="del"></i></li>';
                    }else{
                        str+='<li data-action="addFace" title="'+faceArr[index]+'" data-title="'+faceArr[index]+'"><i style="background-position:-'+index*48+'px 0"></i></li>';
                        index++;
                    };
                };
                str+='</ul>';
            };
            return str;
        };
		_this.scroll=function(options){
			var outContainer=options.outContainer,
				contentContainer=options.contentContainer,
				dotContianer=options.dotContianer,
				rowWidth=options.rowWidth,
				leng=options.leng,
				elemUl=contentContainer.children
				totalWidth=rowWidth*leng;
			outContainer.style.width=rowWidth+'px';
			var str='',index=0,dotDisArr=[],sliderArr=[],direction='none',curValue=0,_switch=true;
			for(var i=0,len=elemUl.length;i<len;i++){
				elemUl[i].style.width=rowWidth+'px';
				if(i==0){
					str+='<li><span></span></li>'
				}else{
					str+='<li></li>'
				};
			};
			contentContainer.style.width=totalWidth+'px';
			dotContianer.innerHTML=str;
			var elemLi=dotContianer.children,distance=elemLi[1].offsetLeft-elemLi[0].offsetLeft,moveDot=elemLi[0].children[0];
			for(var i=0,len=elemLi.length;i<len;i++){
				dotDisArr.push(distance*i);
				sliderArr.push(-rowWidth*i);
			};
			drag(contentContainer);
			function drag(dragElem){
				dragElem.addEventListener('touchstart',touchstartFn,false);
				function touchstartFn(event){
					var e=event||window.event;
					var x=e.changedTouches[0].clientX-dragElem.offsetLeft;
					var y=e.changedTouches[0].clientY-dragElem.offsetTop;
					dragElem.addEventListener('touchmove',touchmoveFn,false);
					function touchmoveFn(event){
						var e=event||window.event;
						var l=e.changedTouches[0].clientX-x;
						var t=e.changedTouches[0].clientY-y;
						direction=l>0?'right':'left';
						curValue=l+sliderArr[index];
						if(curValue>0){
							curValue*=0.4;
						}else if(rowWidth-totalWidth>curValue){
							curValue=l*0.4+sliderArr[index];
						}
						dragElem.style.cssText='width:'+totalWidth+'px;-webkit-transform:translate3d('+curValue+'px,0,0);-webkit-transition-duration:0ms;';
						e.preventDefault();
					};
					dragElem.addEventListener('touchend',touchendFn,false);
					function touchendFn(){
						dragElem.removeEventListener('touchend',touchendFn,false);
						dragElem.removeEventListener('touchmove',touchendFn,false);
						if(direction=='left'){
							if(rowWidth-totalWidth<curValue&&_switch){index++};
							move(200);
						}else if(direction=='right'){
							if(curValue<0&&_switch){index--};
							move(200);
						}else{
							move(0);
						};
						function move(time){
							_switch=false;
							dragElem.style.cssText='width:'+totalWidth+'px;-webkit-transform:translate3d('+sliderArr[index]+'px,0,0);-webkit-transition-duration:'+time+'ms;';
							moveDot.style.left=dotDisArr[index]+'px';
							dragElem.addEventListener('webkitTransitionEnd',endFn,false);
							function endFn(){
								_switch=true;
								direction="none";
							};
						};
					};
				};
			};
		};
	};
	function toForm(options){
		var json=options.json,separator=options.separator||'&',allocation=options.allocation||'=',name=null,value=null,str='';
		for(name in json){
			value=json[name];
			if(value instanceof Object&&!(value instanceof Array)){
				for(var attr in value){
					str+=separator+name+'['+attr+']'+allocation+value[attr];
				};
			}else{
				str+=separator+name+allocation+value;
			};
		};
		return str.substring(1);
	};
	var bigReplayCite=new bigReplay();
	bigReplayCite.init();
	var toopenid=_toopenid,openid=search.openid;
	if(_self){
		var selfBigReplayCite=new selfBigReplay();
		selfBigReplayCite.init();
	}else{
		var smallReplayCite=new smallReplay();
		smallReplayCite.init();
	};
	return {
		bigReplayCite:bigReplayCite||{},
		selfBigReplayCite:selfBigReplayCite||{},
		smallReplayCite:smallReplayCite||{},
		faceLocation:faceLocation
	}
};
function createTSErrMsg($html){
	if(!DO.getElementById('errorMsgToast')){
		var errToast=createNode(mainBody,'div',{id:'errorMsgToast',className:'errorMsgToast MoveShow'},'p3'),
			errText=createNode(errToast,'div',{className:'errorMsgText',html:$html},'p3');
		setTimeout(function(){
			errToast.classList.add("MoveHide");
			setTimeout(function(){
				errToast.remove();
			},300);
		},3000);
	}
}

function inWX(){
	var user=userInfo;
	CONFIG.shareInfo.link="http://"+location.host+location.pathname+"?refer_code=摇8分享";
	CONFIG.shareInfo.title="摇8分享！";
	CONFIG.shareInfo.desc="满中国都是红包一起来吧，下个红包就是你的哦！";
	CONFIG.shareInfo.resources=location.href;
	CONFIG.shareInfo.success=function(){TJ('118000',{},{},0);}
	CONFIG.shareInfo.strFun=function(wx){
		wx.getLocation({
		  success:function($data){
			var user=userInfo
			,ln=$data.longitude
			,la=$data.latitude
			,list,pos
			if(!user.location)user.location={}
			pos=user.location
			pos.gps=la+","+ln;
			window.getGeo=function($data){
				var ad_info,result,address,add
				if($data){
					if(result=$data.result){
						ad_info=result.ad_info;
						list=ad_info.name;
						list=list.replace(/\,/g,"-");
						add=list.split("-");
						address=result.address;	
						pos.region=list;
						pos.address=address;
						pos.adcode=ad_info.adcode||0;
						pos.cache=0;
					    user.country=add[0];
						user.province=add[1];
						user.city=add[2];
						user.organization=add[3];
							var now=+new Date,us=userInfo.setTime||0;
							if(now-us>36e6){
								var a=setAjax("POST",HOST.RTS+"/userinfo/saveaddr?"+nocache())
								a.data="openid="+user.openid+"&nickname="+user.nickname+"&head_img="+user.weixin_avatar_url+"&sex="+user.sex
								+"&longitude="+ln+"&latitude="+la+"&provice="+add[1]+"&city="+add[2]+"&area="+add[3]+"&street="+address+"&adcode="+pos.adcode+"&systoken="+PAGE.systoken+"&wxSig="+user.sig
								a.send();							
								}
						localStorage.setItem("userInfo",JSON.stringify(user))
					}
				}else
				tishi("ERR_not position")
			}
			setJsonp(HOST.WXAPIS+"?location="+la+","+ln+"&coord_type=5&get_poi=0&output=jsonp&callback=getGeo&key=IPVBZ-BO4HG-MD3QU-I75W4-F7KUZ-PSBYI")
		  },
		  cancel:function (res) {
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
		}	
	wxShare(CONFIG.shareInfo);	
	displayY8()
	
	}
 }())