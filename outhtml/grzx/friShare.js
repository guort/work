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
	friShareInit()
	function friShareInit(){
		var friConTop
			,html=""
			,loadBtn
			,ajax
			;
		friConTop=createNode(DB,'div',{className:'friConTop'},'p2')
		ajax=setAjax('get','http://pmall.yaotv.tvm.cn/open/account/statistics/daily?openid=orEt2t0E5ZTLHk8Ny5IsfnzZiGTI');
		ajax.callBack=function($data){
			var data=toObject($data),li=data.data,headImg,name,money;
			if(data.status=='success'){
				headImg=li.headImg?li.headImg.replace(/0$/,'96'):'http://a-h5.mtq.tvm.cn/yao/common/img/user.gif'
				name=li.nickname||''
				html='<img class="headImg" src="img/coverBJ.jpg">'
					+'<p class="topInfo"><b>靠边儿闪</b><span>给你发了1个现金大礼包</span></p>'
					+'<img class="bigLB" src="img/share/bigliBao.png"/>'
					+'<div class="getInput"><input id="phoneInput" class="phoneInput" placeholder="请您输入手机号领取" type="text" />'
					+'<span id="getLB" span class="getLB">领取</span><div>'
				friConTop.innerHTML=html;
				phoneInput=DO.getElementById('phoneInput');
				
				getLB=DO.getElementById('getLB');
				getLB.onclick=function(){
					var val=phoneInput.value,valNum=val.substring(0,3);
					var reg = /^1[3|4|5|7|8][0-9]{9}$/;
					var a=setAjax('get','http://ua.apps.tvm.cn/user/appshare?mobile_number='+val+'&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InR2bWlkIjoid3hoNTgyZDUyYjkyYTI5NDAwMTc4MWQxZTA2IiwibW9iaWxlX251bWJlciI6IjE1NjExNTA4MTE2IiwidHRvcGVuaWQiOiJvckV0MnR5TXpXLW5aS3lQdjlFZXNMdHpXaWVFIiwidW5pb25pZCI6Im9DTE9BdUtJS0VYd0ZXeDQzV0p1RWpSY2V4NHMiLCJ1c2VybmFtZSI6IiIsIm1hY2FkZHJlc3MiOiI4NjI3NTgwMzQ5NzgxMDYiLCJpc1dlbGZhcmVOZXdVc2VyIjp0cnVlfSwiaWF0IjoxNDc5NDYwMDc5fQ.sNxSVxM25xiz5MxgfG4s_otMrXicujrOa72HD30JyW4')
					a.callBack=function($data){
						console.log($data)
						var data=toObject($data)
						if(data.status=='success'){
							if(reg.test(val)){
								html='<img class="headImg" src="img/coverBJ.jpg">'
									+'<p class="topInfo"><b>靠边儿闪</b></p>'
									+'<p class="tSOne">现金大礼包已存入<b>'+valNum+'</b>xxxxxxxx手机账户中。</p>'
									+'<img id="loadBtn" class="loadBtn" src="img/loadBtn.png" alt="" />'
									+'<p class="tSTwo">请下载摇8 App，并使用<b>'+valNum+'</b>xxxxxxxx机号</p>'
									+'<p class="tSThr">登录即可摇一摇领取现金哦！</p>'
								friConTop.innerHTML=html;
								loadBtn=DO.getElementById('loadBtn')
								loadBtn.onclick=function(){
								}
							}
							else{
								alert('请输入正确的手机号')
							}
						}
					}
					a.send()
					
				}
			}
		}
		ajax.err=function(){
			tishi('获取数据失败，请稍后刷新重试',{showTime:2000})
		}
		ajax.send()
		
	}
}())