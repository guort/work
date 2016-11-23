(function(){
	var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight
	onlineYY()
	function onlineYY(){
		var cardPrompt=createNode(DB,'div',{className:'cardPrompt'},'p2')
			,cardP_cell=createNode(cardPrompt,'div',{className:'cardP_cell'},'p3')
			,cardCon=createNode(cardP_cell,'div',{className:'cardCon'},'p3')
			,close=createNode(cardP_cell,'span',{className:'close',html:'<img src="img/card/close.png" alt="">'},'p3')
			,yyFont=createNode(cardCon,'p',{className:'yyFont',html:'在线摇友'},'p3')
			,cardInfo=createNode(cardCon,'div',{className:'cardInfo'},'p3')
			,cardBtn=createNode(cardCon,'p',{className:'cardBtn',html:'<span>看看TA的空间</span><span>和TA玩游戏</span>'},'p3')
			,html=""
			,ajax
			;
		ajax=setAjax('get','http://pmall.yaotv.tvm.cn/open/account/statistics/daily?openid=orEt2t0E5ZTLHk8Ny5IsfnzZiGTI');
		ajax.callBack=function($data){
				var data=toObject($data),li=data.data,distance,headImg,headName,address,yBaH;
				if(data.status=='success'){
					// distance=li.distance||''
					// headImg=li.headImg?li.headImg.replace(/0$/,'96'):'http://a-h5.mtq.tvm.cn/yao/common/img/user.gif'
					// headName=li.nickname||''
					// yBaH=li.yBaH||''
					// if($data.address){
					// 	address=$data.address.city+$data.address.area;
					// }
				html='<p class="distance">距离您<span>1.5km</span></p>'
					+'<img class="hImg" src="img/coverBJ.jpg" alt="">'
					+'<p class="hName"><img src="img/card/dwImg.png" alt=""><span>鱼缸里的猫</span></p>'
					+'<p class="hAddress">来自：<span>北京市西城区</span></p>'
					+'<p class="yaoBaH">摇8号：<span>ajippojn</span></p>'
				cardInfo.innerHTML=html;
				}
		}
		ajax.err=function(){
			tishi('获取数据失败，请稍后刷新重试',{showTime:2000})
		}
		ajax.send()
	}
}())