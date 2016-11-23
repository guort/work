(function(){
var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight
,mainVar={temporary:{}}
,UA=navigator.userAgent.toLowerCase()
,search=getSearch()
,ST_user=localStorage.getItem("userInfo")
,userInfo=toObject(ST_user)||{}
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
FR:"http://friends.yaotv.tvm.cn",
RTS:"//rts-opa.yaotv.tvm.cn",
}
toSQ({userInfo:userInfo,fun:function(){
	shareInit()
}})
function ruleCon(){
	var rulePrompt=createPrompt({
		id:'sharePrompt',
		type:'toast',
		content:'<div class="p_inner_info">\
					<p class="p_top_tit">活动规则</p>\
					<p class="p_top_con">1. 老用户每发展1个新用户下载App，并成为新用户的第1个好友。奖励老用户1元红包。最高可获得16元红包奖励。</p>\
					<p class="p_top_con">2. 可通过微信发给好友，例如：老用户A邀请B，B下载App并使用手机号登录成为新用户，在App“好友-新的朋友”通过老用户A的好友申请。老用户便获取红包奖励。</p>\
				</div>',
		animation:'scaleIn',
		isShowClose:true,
		isShowMask:true,
        closeCallback:function(){
        }
	});
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
		if($this.isShowMask){
			var promptMask=createNode(DB,'div',{className:'p_mask',id:'pMask'},'p2');
		}
		if(!node){
			node=createNode(DB,'div',{className:'prompt '+$this.animation,id:$this.id||'defaultPrompt'});
		}
		pCell=createNode(node,'div',{className:'p_cell'});
		pInner=createNode(pCell,'div',{className:'p_inner'});
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
		setTimeout(function(){
			DO.getElementById("pMask").remove();
		},600);
	}
	function hiddPrompt($node){
		var target=DO.getElementById($node.id),ele,className;
		if(target){
			ele=target;
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
}
function shareInit(){
	var shareCon=createNode(DB,'div',{className:'shareCon'},'p2')
		,img=createNode(DB,'img',{src:'img/share/hbjh.PNG',className:'yyImg'})
		,shareConTop=createNode(shareCon,'div',{className:'shareConTop',html:'<img id="getShRP" src="img/share/shareBtn.png"><p class="shfont">TA下载App并加您为第一个好友您即可获得1元现金</p>'},'p2')
		,shareStat=createNode(DB,'div',{className:'shareStat'},'p3')
		,shareStatTop=createNode(shareStat,'div',{className:'shareStatTop'},'p2')
		,shareStatInfo=createNode(shareStat,'div',{className:'shareStatInfo'},'p3')
		,statInfoList=createNode(shareStatInfo,'ul',{className:'statInfoList'},'p3')
		,html=""
		,statHtml=""
		,statFlag=1;
		statHtml='<p class="awardRule">红包计划奖励规则</p>'
				+'<div class="ruleCon"><img src="img/share/one.png"/><p>红包计划分为1元、5元、10元三种，完成1档红包计划，自动激活下一档红包计划，以此类推。</p></div>'
				+'<div class="ruleCon"><img src="img/share/two.PNG"/><p>您邀请朋友下载app，请确认TA添加的第一个好友是您，否则无法证明TA是由您推荐的，也无法领取红包奖励。</p></div>'
				+'<div class="ruleCon"><img src="img/share/thr.png"/><p>红包计划上限是邀请16个人，获得16元红包奖励，完成后红包计划结束。</p></div>'
		shareStatTop.innerHTML=statHtml
		getShRP=DO.getElementById("getShRP")
		getShRP.onclick=function(){
			FSPrompt()
		}
		var ajax = setAjax('get','http://ua.apps.tvm.cn/user/appshareList?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InR2bWlkIjoid3hoNTgyZDUyYjkyYTI5NDAwMTc4MWQxZTA2IiwibW9iaWxlX251bWJlciI6IjE1NjExNTA4MTE2IiwidHRvcGVuaWQiOiJvckV0MnR5TXpXLW5aS3lQdjlFZXNMdHpXaWVFIiwidW5pb25pZCI6Im9DTE9BdUtJS0VYd0ZXeDQzV0p1RWpSY2V4NHMiLCJ1c2VybmFtZSI6IiIsIm1hY2FkZHJlc3MiOiI4NjI3NTgwMzQ5NzgxMDYiLCJpc1dlbGZhcmVOZXdVc2VyIjp0cnVlfSwiaWF0IjoxNDc5NDYwMDc5fQ.sNxSVxM25xiz5MxgfG4s_otMrXicujrOa72HD30JyW4&pageNum=1&pageSize=30');
		ajax.callBack = function($data){
			var data=toObject($data),li=data.data,hImg,hName,vitNum,hStat,len=13,arr=[];
			if(data.status=='200'){
				vitNum=li.length
				hImg=li.headImg?li.headImg.replace(/0$/,'96'):'http://a-h5.mtq.tvm.cn/yao/common/img/user.gif'
				if(vitNum){
					
					for(var i=0;i<len;i++){
						arr[i]='<li><div>\
				                  	<div class="inviteHead">\
				                   	 	<img class="friImg" src="img/share/noadd.png">\
				                  	</div>\
				                  	<p class="friName">邀请好友</p>\
				                  	<span class="inviteStat"></span><div>\
				                </li>'
				        if(i==1||i==6||i==12){
				        	switch(i){
			                  case 1:var mon=1;hbSrc='img/share/yyhb.PNG';break;
			                  case 6:var mon=5;hbSrc='img/share/wyhb.PNG';break;
			                  case 12:var mon=10;hbSrc='img/share/syhb.png';break;
			                }
				        	arr[i]='<li><div>\
					                    <img class="monImg" src="'+hbSrc+'">\
					                    <p class="friName monName">获得'+mon+'元</p>\
					                    <p id="inviteStat"><span class="inviteStat"></span></p>\
					                </div></li>'
				        }
					}
					for(var i=0;i<vitNum;i++){
						// hStat=li[i].hStat||0;
            			var addSrc=(hStat==1)?'img/share/addstat.png':'img/share/noadd.png';
						if(i==1||i==6||i==12){
							switch(i){
			                  case 1:var mon=1;hbSrc='img/share/yyhb.PNG';break;
			                  case 6:var mon=5;hbSrc='img/share/wyhb.PNG';break;
			                  case 12:var mon=10;hbSrc='img/share/syhb.png';break;
			                }
				        	arr[i]='<li><div>\
					                    <img class="monImg" src="'+hbSrc+'">\
					                    <p class="friName monName">获得'+mon+'元</p>\
					                    <p id="inviteStat"><span class="inviteStat isStat"></span></p>\
					                </div></li>'
							++vitNum;++i

						}
						arr[i]='<li><div>\
				                  	<div class="inviteHead">\
				                    	<img class="friImg" src="img/coverBJ.jpg">\
				                    	<img class="addstat" src="'+addSrc+'">\
				                 	</div>\
				                  	<p class="friName">李晓明</p>\
				                  	<span class="inviteStat isStat"></span><div>\
				                </li>'
				        
					}
					if(len>0){
			            remark=createNode(shareStatInfo,'p',{className:"remark",html:'<b>备注：</b><img src="img/share/addstat.png"/><span> 已加好友</span><img src="img/share/noadd.png"/><span> 未加好友</span>'},'p3')
			          }
				}else{
					arr[0]='<img class="statImg" src="img/doublePeo.PNG" alt="">'
						+'<p class="statTip">还没有朋友应邀前来哦~</p>'
				}
				statInfoList.innerHTML=arr.join("");
			}
		}
		ajax.err=function(){
			tishi('获取数据失败，请稍后刷新重试',{showTime:2000})
		}
		
		ajax.send();
}

function FSPrompt(){
	var friSPrompt=createNode(DB,'div',{className:'friSPrompt'},'p2')
		,friSP=createNode(friSPrompt,'div',{className:'friSP transIn'},'p3')
		,wxLogo=createNode(friSP,'p',{className:'wxLogo',html:'<img src="img/wxLogo.png"><span>微信好友</span>'},'p3')
		,pyqLogo=createNode(friSP,'p',{className:'pyqLogo',html:'<img src="img/wxLogo.png"><span>微信好友</span>'},'p3')
		,cancle=createNode(friSP,'p',{className:'cancle',html:'取消'},'p3')
		wxLogo.onclick=function(){
			alert(3)
		}
		pyqLogo.onclick=function(){
			alert(4)
		}
		friSPrompt.onclick=cancle.onclick=function(){
			className=friSP.className;
 			friSP.className=className+' transOut';
			setTimeout(function(){friSPrompt.style.display='none';friSPrompt.remove()},600);
		}

}
function nocache(){
	return "nocache="+Math.random()
}
function getUserInfo($id,$fun){
	window.getUserData=$fun;
	setJsonp(HOST.AD+'/ufo/puserinfo?wx_token='+PAGE.token+"&openid="+$id+"&cb=getUserData&"+nocache())
}
}())





