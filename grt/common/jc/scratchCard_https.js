/*---默认数据---*/
var DO=document,DB=DO.body;
mainVar.shareInfo={
		 shareDesc: "7.18来摇吧！现金大奖等着你，呼朋唤友抢红包啦"
		,shareIco: "http://q.cdn.mtq.tvm.cn/general/uploads/tvm2fabf1ff49f91c72/55a91c9d4ae5e14a2b7177a0/0d12ec0d61a7570d661fad673b0f6472.jpg"
		,shareTitle: "718来摇吧！BTV生活邀您一起疯狂抽大奖"
		,shareLink:""
		,trigger:function (res){}//用户点击发送给朋友;
		,success:function (res){}//已分享;
		,cancel:function (res){}//已取消'
		,fail: function (res){}//失败
	}
mainVar.pageInfo={
		background:""
		,activity:"欢迎进入10000分抽奖俱乐部，每天大奖送不停，百分百中奖哦 -  快来转动您的大赚盘吧，直接现金馈赠呢。"
		,banner:"img/txt.png"
		,turntable:"img/turnplate2.png"
		,adVideo:"http://q.cdn.mtq.tvm.cn/general/uploads/tvma9b372a4eae60a2a/55b319b24ae5e14a2b717b1f/a20a70a2ae200758c6e137ab27f7fd42.mp4"
		,sjLogo:"img/sjlogo.png"
		,videoPic:"img/videopic.jpg"
		,pageTitle:''
		,copyright:'TVM天脉聚源提供技术支持'
		,prizeAndDeg:{prize:["a","b","c","d","e","f","g","h","i","j","k","l"],degArr:[0,30,60,90,120,150,180,210,240,270,300,330]}
	}
mainVar.userInfo={}
/*---初始化变量、获取信息---*/
//用户信息
if(setStorage("get","userInfo")){
	mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
};
var search=getSearch()
	,href=null
	,tjData={}
	,openid=mainVar.userInfo.openid
	,sig=mainVar.userInfo.sig
	,sigExpire=mainVar.userInfo.sigExpire
	,nickname=mainVar.userInfo.nickname
	,headimg=mainVar.userInfo.weixin_avatar_url 
	,sigCode=mainVar.userInfo.sigCode
	,brandId=search["brandId"]
	,activeId=search["activeId"]
	,needScore=search["needScore"]
	,carIndex=false
	,myGoldCoin=0
	,tjHjgy=0
	,theFolder=urlFolder()
	,viewW=document.documentElement.clientWidth
	,viewH=document.documentElement.clientHeight
	,insufficient=PAGE.unit+'不足，请看电视参与摇一摇，集'+PAGE.unit+'吧~';
	var lingjiang=null;
	var Verifs=null;
	var popBox=null;
	CONFIG.shareInfo.link=CONFIG.shareInfo.link+"?b="+headimg+"&a="+nickname;
var UA=navigator.userAgent.toLowerCase(),OSA=["windows","ipad","ipod","iphone","android"],OSL=OSA.length,OS=""
while(OS=OSA.shift()){
	if(UA.indexOf(OS)>-1){
		break;
	};
};
var tip=null
	,masterSwitch=true    //保证只挂一次的开关
	,paiTimeUnix=null
	,comestible=true
	,Hmoeny=''
	,prize_name
	,prize_img
	,award_type
	,prizeInfoData={}
	,prize_grade=null
	,oScratchCard=null
	,oSpan=null
	,coins=0      //转一次要多少积分	
	,integral=0;  //用户还剩多少积分
function hideTurntable(str){
	var oDiv=document.querySelector('#childContainer');
	if(oDiv){
		removeNode(oDiv)
	};
	var elem=document.createElement('div');
	elem.id='childContainer';
	elem.style.display='block';
	elem.innerHTML=str;
	document.body.appendChild(elem);
	setTimeout(function(){
		elem.className="MoveShow";
	},500)
};
//抽奖       
function getCoin(){  
	tip=createNode(DB,"div",{className:"tctab",id:'tip',style:'display:none'},"p3");
	tip.innerHTML='<p class="personInfo"><img src=""><span class="name"></span></p><h3>剩余'+PAGE.unit+'：<span>500</span>个</h3><h4>每次抽奖需要消耗<span>'+needScore+'</span>个'+PAGE.unit+'</h4><div><button class="affirm">确  认</button></div>';
	//读取爽币数量
	var ajax=setAjax('get',HOST.MB+"/point/integral/query?wxToken="+PAGE.yyyappid+"&openId="+openid+'&cache='+Math.random());				
	ajax.callBack=function($data){
		var data=typeof $data==="object"?$data:eval("("+$data+")");
		tip.querySelector('.name').innerHTML=decodeURIComponent(nickname);
		tip.querySelector('img').src=getHead(headimg);
		tip.querySelector('h3').querySelector('span').innerHTML=data.data.integral;
		tip.style.display='block';
		var oElem=createNode(DB,'p',{'style':'height:100%;width:100%;background:#000;opacity:0.6;position:absolute;top:0;left:0;z-index:100;'});
		document.documentElement.style.overflow='hidden';
		myGoldCoin=data.data.integral;
		//点击确定
		tip.querySelector('.affirm').addEventListener("touchstart",function(e){
			noPop(e);
			tip.style.display='none';
			oElem.style.display='none';
			document.documentElement.style.overflow='visible';
			DB.style.overflow='visible';
			if(parseInt(data.data.integral)<parseInt(needScore)){
				hideTurntable(insufficient);
			}else{
				oSpan.addEventListener('touchstart',getLottery,false);
			};
		});
	};
	ajax.send();
};
function getPrize(){
	//rate： -1代表谢谢参与   0代表鼓励奖   >=1 正常奖品
	comestible=true;
	carIndex=false;
	paiTimeUnix=null;
	integral=prizeInfoData.leftScore;     //剩余金币
	coins=prizeInfoData.needScore;       //刮一次需要多少金币
	prize_grade=prizeInfoData.rate;      //等级
	prize_name=prizeInfoData.prize_name;  //名称
	prize_img=prizeInfoData.prize_img;     //图片
	if(prizeInfoData.rate!=-1){
		Hmoeny='';
		award_type=prizeInfoData.prizeType;   //类型
		paiTimeUnix=new Date().getTime();
		if(award_type==102){
			var ex=/\./g;
			if(ex.test(data.data.money)){
				Hmoeny=prizeInfo.money+'元现金红包';
			}else{
				Hmoeny=prizeInfo.money+'.0元现金红包';
			};
		};
		if(award_type==0){
			tctabFn("a",0)
		}else if(award_type==101){
			tctabFn("a",101)
		}else if(award_type==102){
			tctabFn("a",102)
		}else if(award_type==2){
			tctabFn("a",2)
		}else{
			tctabFn("a",1)
		};
	}else{
		tctabFn("a",0)
	};
};
/*新的弹层内容操作*/
function tctabFn(a,b){
	if(!mainVar._tctab){ mainVar._tctab=createNode(DB,"ul",{className:""},"p3"); }
	mainVar.newbg.className="newbg heise";
	mainVar._tctab.className="tctab fadeIn boxtime zhuanpan";
	var type=b;
	var str='';
	if(coins>0){
		str='<li class="coins">本次抽奖消耗您'+coins+PAGE.unit+'，剩余'+PAGE.unit+integral+'个</li>';
	};
	var coniURL="coin.html";
	var btnArea='<li class="btnArea"><a href="'+coniURL+'">回到'+PAGE.unit+'大奖区</a><span onclick="continueLottery()">继续抽奖</span></li>'
	switch(type){
		case 0:
			mainVar._tctab.innerHTML='<li class="participation"><img src="'+prize_img+'"></img></li>'+'<li class="btnArea"><a href="'+coniURL+'">回到'+PAGE.unit+'大奖区</a><span class="continue" onclick="continueLottery()">继续抽奖</span></li>'+str;
		break
		case 1: //实物
			mainVar._tctab.innerHTML=
			'<li class="gxn">恭喜您</li>'+
			'<li>中了'+prize_name+'</li>'+
			'<li><img src="'+prize_img+'"></img></li>'+
			'<li class="btn"><label class="fc" onclick="goPrize(this)">点击领奖</label></li>'+btnArea+str;
		break
		case 2:  //消费码
			mainVar._tctab.innerHTML=
			'<li class="gxn">恭喜您</li>'+
			'<li>中了'+prize_name+'</li>'+
			'<li><img src="'+prize_img+'"></img></li>'+
			'<li class="btn"><label class="fc" onclick="goPrize(this)">点击领奖</label></li>'+btnArea+str;
		break
		case 101:  //卡券
			mainVar._tctab.innerHTML=
			'<li class="gxn">恭喜您</li>'+
			'<li>中了'+prize_name+'卡券</li>'+
			'<li><img src="'+prize_img+'"></img></li>'+
			'<li class="btn"><label class="fc" onclick="goPrize(this)">点击领奖</label></li>'+btnArea+str;
		break
		case 102: //红包
			mainVar._tctab.innerHTML=
			'<li class="gxn">恭喜您</li>'+
			'<li>中了'+prizeInfoData.money+'元现金'+prize_name+'</li>'+
			'<li><img src="'+prize_img+'"></img></li>'+
			'<li class="btn"><label class="fc" onclick="goPrize(this)">点击领奖</label></li>'+btnArea+str;
		break
	};
	mainVar._tctab.style.display='block';
	mainVar.newbg.style.cssText="z-index:400; display:block;"  
}; 
function continueLottery(){
	closetab(function(){
		if(integral<coins){
			removeBtnEvent();
			hideTurntable(insufficient);
		}else{
			masterSwitch=true;
		};
	});
};
function goPrize(btn){
	masterSwitch=true;
	var arr=[];
	arr[0]=function(){
		sessionStorage.setItem('shiwu'+mainVar.prizeData.orderId,1);
	};
	arr[1]=function(){
		sessionStorage.setItem('hongbao'+mainVar.prizeData.orderId,1);
	};
	arr[2]=function(){
		sessionStorage.setItem('kaquan'+mainVar.prizeData.orderId,1);
	};
	arr[3]=function(){
		var content=trim(document.getElementById("textarea").value),vl=content.length,dj,getsearch
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
			if(mainVar.prizeData.awardtype==102){
				if(mainVar.prizeData.money==1){	
					desc=CONFIG.chars.hjgy.h;
				}else{
					desc=CONFIG.chars.hjgy.i+mainVar.prizeData.money+CONFIG.chars.hjgy.j;
				};
			}else{
				desc=CONFIG.chars.hjgy.k+prize_name+CONFIG.chars.hjgy.l;
			};
			switch(mainVar.prizeData.prizeType){
				case 102:case 1:
					if(mainVar.prizeData.prizeType==102)$sw="a";
				break;
				case 2:
					popBox.popClose();
					tctab(mainVar.prizeData);
				break;
				case 3:
					var link=mainVar.prizeData.prizeInfo.url,$f=link.indexOf('?')=="-1"?'?':'&',user=mainVar.userInfo;
					if(link.indexOf('tvm.cn/adsmall')=="-1")mainVar._urls=link;else mainVar._urls=link+$f+"pageToken="+PAGE.hosturl+"&wxToken="+PAGE.token+"&sign="+user.sig+"&code="+sigCode+"&openId="+user.openid+"&yyyappId="+PAGE.yyyappid+"&nickname="+user.nickname+"&weixin_avatar_url="+user.weixin_avatar_url;
					setTimeout(function(){goto(mainVar._urls)},1000);
				break;	
				case 101:
					$sw="a";
					lingjiang.getKaquan();
				break;
				default:
					
				break
			}
			mainVar.$sw=$sw;
			var posts={"intolotterylist":2,"orderid":mainVar.prizeData.orderId,"yyyappid":PAGE.yyyappid,shareurl:urlFolder()+'/share.html',"desc":desc,"token":PAGE.token,"topicid":PAGE.topicid,"openid":openid,"nickname":nickname,"headimg":headimg,"content":content,"paiTimeUnix":paiTimeUnix}
			lingjiang.speechDo(posts);
		}else{
			tishi(CONFIG.chars.hjgy.f)	
		};
	};
	arr[4]=function(_data){
		/*if(_data.status=='1'){
			tishi(CONFIG.chars.hjgy.d,{time:2000});												
		}else{
			tishi(CONFIG.chars.hjgy.e);
		};*/
		if(mainVar.prizeData.prizeType==102||mainVar.prizeData.prizeType==1){
			if(mainVar.$sw == "a"){
				lingjiang.getHongbao();
				popBox.popClose();
			}else{
				 lingjiang.form();
			};
		};
		if(mainVar.prizeData.prizeType==101){
			if(mainVar.$sw == "a"){
				popBox.popClose();
			};
		};
		tjHjgy=0;												
	};
	if(!lingjiang)lingjiang=new lingjiangs(arr);
	if(!Verifs)Verifs=new saveVerif();
	if(!popBox)popBox=new popBoxs();
	lingjiang.init(btn,1);
};

function closetab(parm){
	var _tctabname=mainVar._tctab;
	if(_tctabname.className == 'tctab fadeIn boxtime') _tctabname.className='tctab fadeOut boxtime'; else _tctabname.className='tctab fadeOut boxtime zhuanpan';
	setTimeout(function(){
		mainVar._tctab.style.cssText='display:none;';
		setTimeout(function(){
			mainVar.newbg.style.cssText='display:none; z-index:999;';
			mainVar.newbg.className="newbg";
			_tctabname='tctab fadeOut boxtime';
			if(parm){
				if(integral<coins){
					removeBtnEvent();
					hideTurntable(insufficient);
				}else{
					redraw();
				};
			};
		},200)
	},400)
}

//关闭弹层
function closeVerif(){	
	mainVar.Gttkey=true;
	clearInterval(mainVar.Gtt);
	mainVar.Verification.className="gotbtime formup";
	mainVar.Verification.querySelector('.tel').title='';
}
function init(data){
	var scratchCardArea='',scrollContainer='',str='',elem='',len=0;
	//set页面标题
	if(data.masterName){
		mainVar.pageInfo.pageTitle=data.masterName;
	};
	document.title=mainVar.pageInfo.pageTitle;
	//set页面背景
	document.body.style.cssText='background-image:url('+data.backAdImg+');background-size:100% 100%;';
	//set刮奖区
	scratchCardArea='<div class="scratchCardArea"><p class="top"></p><div class="scratchCard"><div class="area"><p>拼手气赢大奖！<br>刮一刮有惊喜！</p><span>开始刮奖</span></div></div><p class="bottom"></p></div>';
	//set奖品展示区
	len=data.prize.length;
	if(len){
		for(var i=0;i<len;i++){
			elem=data.prize[i].prizeInfo;
			str+='<li><p><img src="'+elem.card_img+'"></p>'+elem.prize_name+'</li>';
		};
		scrollContainer='<h2>奖品展示</h2><div class="scrollContainer"><div class="picScroll"><span class="prevBtn"></span><span class="nextBtn"></span><div class="scrollContent"><ul id="scrollArea" class="scrollArea">'+str+'</ul></div></div></div>';
	};
	var oDiv=createNode(DB,"div",{class:"main"});
	oDiv.innerHTML=scratchCardArea+scrollContainer;
	document.body.appendChild(oDiv);
	createNode(DB,"div",{id:"maskBG"},"p3");
	if(!setStorage("get","userInfo")){
		noUser();
	 };
	var container=document.querySelector('.scrollContainer');
	if(len<3&&len>0){
		var oLi=container.querySelector('li');
		var w=(oLi.clientWidth)*len+(parseInt(getStyle(oLi,'marginRight'))*(len-1));
		container.children[0].style.cssText='width:'+w+'px;overflow:hidden;';
		//container.querySelector('ul').style.width=w+'px';
	};
	oScratchCard=document.querySelector('.scratchCard'),oSpan=oScratchCard.querySelector('span');
	oScratchCard.querySelector('.area').style.height=oScratchCard.querySelector('.area').clientWidth/1.6+'px';
	mainVar.newbg=createNode(DB,"div",{className:"newbg"},"p3");
	mainVar.Verification=createNode(DB,"div",{id:"Verification"},"p3");
	
	//滚动效果
	
	if(data.prize.length<=3){
		container.querySelector('.prevBtn').style.display='none';
		container.querySelector('.nextBtn').style.display='none';
	}else{
		container.querySelector('.scrollArea').innerHTML+=container.querySelector('.scrollArea').innerHTML;
		new slide({
			isScroll:false,   
			space:10,
			scrollArea:container.querySelector('.scrollArea'),
			prevBtn:container.querySelector('.prevBtn'),
			nextBtn:container.querySelector('.nextBtn'),
			scrollList:container.querySelectorAll('li'),
			scrollNum:3,        //滚动图片的数量（默认值：1）
			time:'800',         //滚动图片队列所需的时间（默认值：400）
			intervalTime:4000  //阁多长时间滚动  （默认值：4000）
		});
	};
	//动态垂直图片
	var img=document.querySelector("#scrollArea").querySelectorAll('img');
	for(var i=0,len=img.length;i<len;i++){
		img[i].index=i;
		img[i].onload=function(){
			verticalImg(img[this.index])
		};
	};
	//分享
	setShareInfo();
};
function verticalImg(obj){
	var selfH=obj.offsetHeight;
	var parentH=obj.parentNode.clientHeight;
	obj.style.marginTop=(parentH-selfH)/2+'px';
};
/*---刮刮卡---*/
function wow(_,option){
	var self=this;
	self.option=option||{
	    width:300,     //圆宽度
		height:300,    //圆高度
		circle_color:"#fff",  //涂层颜色
	}
	self.init=function(){
		var half=self.option.width/2;
		self.wowBox=createNode(_,"div",{class:"wowBox",id:"wowBox",html:'<canvas id="cas"></canvas>',style:'position: absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);z-index:2;width:'+self.option.width+'px;height:'+self.option.height+'px;overflow: hidden;'},"p2")
		
		self.stageW=self.wowBox.offsetWidth
		self.stageH=self.wowBox.offsetWidth
		self.canvas = document.getElementById("cas")
		self.ctx=self.canvas.getContext("2d")
		self.delArea = 0
		self.Allarea = self.stageW*self.stageH;	
	   
		self.canvas.width=self.stageW;
		self.canvas.height=self.stageH;
		self.radius=20;
		self.ctx.fillStyle=self.option.circle_color;
		self.ctx.beginPath();
		//self.ctx.arc(half,half,half,0,Math.PI*2,true); 
		self.ctx.fillRect(0,0,self.stageW,self.stageH);
		self.ctx.closePath();
		self.ctx.fill();
	}
	self.run=function tapClip(){
		var hastouch = "ontouchstart" in window?true:false, 
			tapstart = hastouch?"touchstart":"mousedown",
			tapmove = hastouch?"touchmove":"mousemove",
			tapend = hastouch?"touchend":"mouseup";
			self.ctx.globalCompositeOperation = "destination-out";
		self.canvas.addEventListener(tapstart , function(e){
			e.preventDefault();
			self.canvas.addEventListener(tapmove , tapmoveHandler);
			self.canvas.addEventListener(tapend ,tapmovend);
			function tapmoveHandler(e){
				self.ctx.beginPath();
				self.ctx.arc(e.targetTouches[0].clientX-40, e.targetTouches[0].clientY-self.wowBox.offsetLeft-20, self.radius, 0, Math.PI*2);
				self.ctx.fill();
				self.ctx.closePath();	
				self.delArea+=Math.PI*Math.pow(self.radius,2)	
			};
			function tapmovend(){
				self.canvas.removeEventListener(tapmove , tapmoveHandler);
				self.canvas.removeEventListener(tapend ,tapmovend);
				if(self.wowBox.parentNode===null)return;
				if((self.delArea/self.Allarea)>0.3){
					self.wowBox.parentNode.removeChild(self.wowBox);
					getPrize();
				};
			};		
		});
    };
};
function setStyle(css,_){
		var sty=DO.createElement("style")
		sty.setAttribute("type","text/css");
		sty.styleSheet?sty.styleSheet.cssText=css:sty.innerHTML=css
		_?_.appendChild(sty):document.documentElement.firstChild.appendChild(sty);
};
function getStyle(obj,attr){
	return getComputedStyle(obj,false)[attr];
};
function redraw(){
	oSpan.previousElementSibling.style.display="block";
	oSpan.style.display="block";
	removeNode(oSpan.nextElementSibling);
};
function cancelLottery(){
	oSpan.removeEventListener('touchstart',getLottery,false)
};
function getLottery(){
	if(masterSwitch){
		masterSwitch=false;
		//发送中奖请求
		AjaxFn({
			type:'post',
			url:HOST.CARD+'/open/scratch/order',
			data:{sigExpire:sigExpire,code:sigCode,sig:sig,openId:openid,id:activeId,yyyappId:PAGE.yyyappid,brandId:brandId},
			success:function($data){
				var data=typeof($data)!=="object"?eval("("+$data+")"):$data;
				if(data.status=='success'){
					oSpan.previousSibling.style.display="none";
					oSpan.style.display="none";

					prizeInfoData=mainVar.prizeData=data.data.finalPrize;
					var area=oScratchCard.querySelector('.area');
					createNode(area,"div",{class:"ques",html:'<img src="'+prizeInfoData.card_back_img+'" height="'+area.clientHeight+'">'},"p3");
					var wow_option={
							width:area.clientWidth,     //圆宽度
							height:area.clientHeight,    //圆高度
							circle_color:"#c1c1c1",  //涂层颜色
					};
					var wowcard=new wow(area,wow_option);
					wowcard.init();
					wowcard.run();
				}else{
					cancelLottery();
					hideTurntable(data.errMsg);
				};
				masterSwitch=true;
			},
			error:function(){
				masterSwitch=true;
				cancelLottery();
				hideTurntable('网络繁忙，请稍后重试');
			}
		});
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
			case "btn_speech":
				lingjiang.postspeech();
			break;
			case "popClose":
				popBox.popClose();
			break;
			case "closetab":
				closetab();
			break;
			case "popSave":
				lingjiang.popSave();
			break;
		};
	};
};	
addEvent(DO,"touchstart",docAction);
//小于10前面添加0
function addZero(num){
	return num<10?'0'+num:num
};
//格式化日期
function formatNowTime(time){
	var nowDate=new Date(time);
	return addZero(nowDate.getMonth()+1)+"-"+addZero(nowDate.getDate())+" "+addZero(nowDate.getHours())+":"+addZero(nowDate.getMinutes());
};
//统计代码
function tongji(json){
	goldTJFn(json);
	function goldTJFn(json){
		var data='id='+activeId
		+'&token='+PAGE.token
		+'&channel_id='+PAGE.channelId
		+'&master_id='+brandId
		+'&event_code='+(json.eventCode)
		+'&open_id='+mainVar.userInfo.openid
		+'&user_name='+mainVar.userInfo.nickname
		+'&sex='+mainVar.userInfo.sex
		+'&page='+"金币刮奖"
		+'&title='+"刮刮卡刮奖区页面"
		+'&content='+brandId
		+'&country='+mainVar.userInfo.country
		+'&province='+mainVar.userInfo.province
		+'&city='+mainVar.userInfo.city
		+'&user_agent='+(navigator.userAgent)
		if(json.eventCode==101000){
			var album_id='';
			var spend=0;
			var resutl=0;
			switch(prizeInfoData.prizeType){
				case 1:
					album_id="实物";
				break;
				case 2:
					album_id="消费码";
				break;
				case 3:
					album_id="第三方卡券";
				break;
				case 101:
					album_id="微信卡券";
				break;
				case 102:
					spend=Hmoeny;
					album_id="微信红包";
				break;
				default:
					album_id="";
				break;
			};
			if(prizeInfoData.rate<=0){
				resutl=0;
			}else{
				resutl=1;
			};
			data+='&content_id='+(prizeInfoData.rate||'')
			+'&album_id='+album_id
			+'&album_name='+prizeInfoData.prize_name
			+'&point='+'-'+coins
			+'&spend='+(spend||0)
			+'&result='+resutl
		};
		if(json.eventCode==101000){
			data+='&button_name='+"点击领奖"
		};
		createNode(DB,"img",{src:HOST.TJ+"/ana?"+data+"&ch="+Math.random(),style:"display:none"},"p3")
	}
};
tongji({eventCode:100000});
mainVar.loading=createNode(DB,"div",{className:"loading"},"p3");
/*---入口---*/
createNode(document.querySelector('head'),"link",{href:PAGE.COMMON+"jc/scratchCard.css",rel:"stylesheet",type:"text/css"},"p3");
window.onload=function(){
	AjaxFn({
		type:'get',
		url:HOST.CARD+'/open/scratch/detail/'+activeId+'/'+brandId,
		success:function($data){
			var data=typeof($data)!=="object"?eval("("+$data+")"):$data;
			if(data.status=='success'){
				mainVar.loading.style.display="none"
				needScore=data.data.needScore;
				init(data.data);
				getCoin();//执行金币数比较
			};
		},
		error:function(){
			mainVar.loading.style.display="none"
			tishi('获取数据失败，请刷新试试！',{time:2000});
		}
	});
};
