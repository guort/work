var search=getSearch()
	,reset=search["reset"]||""
	,href=location.href
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight
	,tjData={}
	,sigCode,Verifs
	,gifts
	,balanceSwitch=+setStorage("get","balanceSwitch")
	,userInfo=setStorage("get","userInfo")
	,DM=document.documentElement.firstChild
	,Phonecallback=null
	,PMALL_JK="//qa.pmall.yaotv.tvm.cn"
	,PMALL_LJ="http:"+HOST.DOMAIN
	,FOLDER="//qa-h5.mtq.tvm.cn/yao"
	,phone
	,info_status=0
	,hasTT=1
	;
	mainVar.binding={subscribe:1};
	createNode(DM,"link",{href:PAGE.COMMON+"jc/home.css",rel:"stylesheet",type:"text/css"},"p2");
	createNode(DM,"link",{href:PAGE.COMMON+"jc/mywin_new.css",rel:"stylesheet",type:"text/css"},"p2");
	setStyle('body{background:#EBEBEB;overflow:auto;margin:0;padding:0}ul{margin:0;padding:0}'
+'.txbox{-webkit-overflow-scrolling:touch;position:fixed;top:0;left:0;width:100%;height:100%;background:url('+PAGE.COMMON
+'img/txred_bg.jpg);background-size:58px;z-index:900;-webkit-transform:translate3d(0,0,0);display:none;overflow:hidden;overflow-y:auto;}'
+'.txtop{background:#af4a3a;color:#ffbc64;text-align:center;padding:12px 0;}'
+'.txtop img{width:40px;height:40px;border-radius:50%;vertical-align:middle;margin-right:6px;}'
+'.txtop span{font-size:24px;}'
+'.txtit{background:url('+PAGE.COMMON+'img/bling.png) no-repeat;background-size:100% 100%;padding:2px 16px;font-zize:18px;}'
+'.txtit,.txtzz,.hbbt,.hbbt p{color:#ffbc64;text-align:center}'
+'.hbmain>img{width:100%;}'
+'.hbmain .chai{width:76px;height:76px;border-radius:50%;background:#ffbc64;line-height:76px;text-align:center;display:inline-block;color:#c04d3b;font-size:34px;position:absolute;left:50%;bottom:10px;-webkit-transform:translateX(-50%) translateY(50%);box-shadow:0 4px 0px rgba(0,0,0,.2);}'
+'.headImg{position:absolute;left:20px;top:50%;border-radius:50%;width:52px;height:52px;border:2px solid rgba(255,255,255,.3);-webkit-transform:translate(0,-50%)}'
+'.hbbt{font-size:18px;padding-top:45px;line-height:72px;}'
+'.hbbt span{font-size:70px;vertical-align:sub;}'
+'.hbmain span.en{display:none;background:#a3a3a3;color:#c3c3c3;}'
+'.hbmain{position:relative;}'
+'.hbtxt{opacity:.84;position:absolute;left:0;top:0;width:100%;text-align:center;padding-top:24px;line-height:26px;}'
+'.txtit{font-size:20px;}'
+'.txtzz{display:none;}'
+'.enough .txtzz{display:block;}'
+'.enough .chai{display:none;}'
+'.enough .chai.en{display:block;}'
+'.hbbt p{opacity:.74;}'
+' @-webkit-keyframes txshow{0%{opacity:0;-webkit-transform:scale(.3);transform:scale(.3);}'
+'50%{opacity:.5;-webkit-transform:scale(1.05);transform:scale(1.05);}'
+'70%{-webkit-transform:scale(.9);transform:scale(.9);}'
+'100%{opacity:1;-webkit-transform:scale(1);transform:scale(1);}'
+'}'
+' @keyframes txshow{0%{opacity:0;-webkit-transform:scale(.3);-ms-transform:scale(.3);transform:scale(.3);}'
+'50%{opacity:.5;-webkit-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05);}'
+'70%{-webkit-transform:scale(.9);-ms-transform:scale(.9);transform:scale(.9);}'
+'100%{opacity:1;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}'
+'}'
+' .txshow{-webkit-animation:txshow .6s linear;animation:txshow .6s linear;}'
+' @-webkit-keyframes txhide{0%{-webkit-transform:scale(1);transform:scale(1);}'
+'25%{-webkit-transform:scale(.95);transform:scale(.95);}'
+'50%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1);}'
+'100%{opacity:0;-webkit-transform:scale(.3);transform:scale(.3);}'
+'}'
+' @keyframes txhide{0%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}'
+'25%{-webkit-transform:scale(.95);-ms-transform:scale(.95);transform:scale(.95);}'
+'50%{opacity:1;-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1);}'
+'100%{opacity:0;-webkit-transform:scale(.3);-ms-transform:scale(.3);transform:scale(.3);}'
+'}'
+' .txhide{-webkit-animation:txhide .6s linear;animation:txhide .6s linear;}'
+'.prompt{position:relative;padding:15px;}'
+'.prompt>span{background:#ffbc64;color:#c04d3b;font-weight:900;padding:1px 10px;border-radius:5px;position:absolute;left:10px;top:25px;font-size:12px;}'
+'.prompt ul{padding:40px 15px 15px;background:rgba(0,0,0,.18);border-radius:5px;}'
+'.prompt ul li{font-size:12px;color:#ffbc64;line-height:20px;padding-left:21px;}'
+'.prompt ul li em{color:#c04d3b;display:inline-block;border-radius:50%;background:#ffbc64;width:16px;height:16px;text-align:center;line-height:16px;margin-left:-21px;float:left;margin-top:1px;}'
+'.CZ{display:flex;align-items:center;display:-webkit-flex;-webkit-align-items:center}'
+'.head1 p{display:table-cell;box-sizing:border-box;width:33%;height:35px;text-align:center;vertical-align:middle}'
+'.head1 b{display:inline-block;vertical-align:middle;width:30px;height:24px;margin:2px 2px 0 0px}'
+'.menus{display:table;background:#fff;height:90px;width:100%}'
+'.menus p{display:table-cell;height:60px;width:25%;text-align:center;vertical-align:middle;box-sizing:border-box;border-right:1px solid #eee}'
+'.menus b{display:block;height:35px;width:35px;margin:auto}'
+'.emIco{-webkit-transform: scale(.8)}'
+'.list-box .tuijian.list-two:before{display:none;border:none}'
+'.table{display:table;margin:0;padding:0}'
+'.cell{display:table-cell;text-align:center;vertical-align:middle;box-sizing:border-box}'
+'.banner{position:relative;width:100%;height:98px}'
+'.banner .p{position:absolute;top:50%;margin:-15px 0 0 0;font-size:16px}'
+'#editTxt{font-size:14px;color:#f2d54f;display:block;font-weight:normal;margin:3px 0 0 0}'
+'.editTxt{background: url(http://a-h5.mtq.tvm.cn/yao/common/img/pen.png) no-repeat right center;background-size: 11px 11px;padding-right:16px;vertical-align:middle;font-weight: normal;}'
+'.addInfo{border-radius:30px;position:relative;padding:0 24px 0 30px;box-sizing:border-box;background:#9A151C url('+FOLDER+'/common/img/ico_6.png) no-repeat right center;background-size:20px 20px}'
+'.iconAll{position:absolute;top:30px;margin:-8px 0 0 0;right:10px;height:30px;}'
+'.iconAll>b{display:inline-block;width:90px;height:35px;background-size:100% auto;margin-right:10px;background-repeat:no-repeat;}'
+'.iconAll .xinyong{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/ico/xy1.png);}'
+'.iconAll .credit_01{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/ico/xy1.png);}'
+'.iconAll .credit_02{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/ico/xy2.png);}'
+'.iconAll .credit_03{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/ico/xy3.png);}'
+'.iconAll .credit_04{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/ico/xy4.png);}'
+'.iconAll .credit_05{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/ico/xy5.png);}'
+'.iconAll .credit_06{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/ico/xy6.png);}'
+'.iconAll .identity,.iconAll .identity_gray{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/identity_gray.png);}'
+'.iconAll .identity_bright{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/identity_bright.png);}'
+'.iconAll .harvest,.iconAll .balance_gray{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/balance_gray.png);}'
+'.iconAll .balance_bright{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/balance_bright.png);}'
+'.iconAll>*:last-child{margin-right:0;}'
+'.money1{color:#FF6654;font-weight:normal;font-size:1.2em}'
+'.ljtx{position:absolute;background:#FF6654;color:#FFF;padding:0 25px;font-size:12px;right:-29px;top:16px;font-weight:normal;-webkit-transform: rotate(45deg)}'
+'@media screen and (max-width:320px){\
.headImg{width:42px;height:42px;left:20px}\
.addInfo{line-height:1.6em;background-size:18px 18px;background-position:153px center}\
.iconAll .xinyong{width:78px}\
.iconAll{height:21px;}\
.iconAll>*{width:70px;height:21px;}\
}'
+'@media screen and (min-width:360px){\
.headImg{width:45px;height:45px;left:20px}\
.addInfo{padding:0 30px 0 30px;line-height:1.6em;background-position:155px center}\
}'
+'@media screen and (min-width:375px){\
.headImg{width:50px;height:50px;left:30px}\
.addInfo{padding:0 30px 0 30px;line-height:1.6em;background-position:158px center}\
}'
+'@media screen and (min-width:414px){\
.headImg{left:30px}\
}');
	if(userInfo)mainVar.userInfo=JSON.parse(userInfo);
	mainVar.newdata={data:[]};
	var $=mainVar
	,myhome=CONFIG.chars.myhome
	,user=mainVar.userInfo,sigCode,nickname;
	if(!user)noUser();
	if(!user.sig)noUser();
	nickname=decodeURIComponent(user.nickname)
	sigCode=user.sigCode;		
	pageinit(user,nickname);	
	tjData.page="我的金币";
	tjData.title="我的金币页面";
	tjData.paiTimeUnix='';
	goldTJ(100000)
	$.bz='请在72小时之内领取，过期作废';
	CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;
	initWX(PAGE.token,location);
	var popBox=new popBoxs(function(e,v){
		e.scrollTop=v-3;
		if($.loading.style.display != 'block'){
			var $a=mainVar.newscroll,$key=mainVar.newpan;
			if($key==false){
				tishi(CONFIG.chars.scroll.a);
				return false;
			}
			newWins.listOne($a[0],$a[1],$a[2]+1,$a[3]);
		}
	})
	,tjHjgy=0
	,pc_getPrize=new pc_getPrize()
	,lingjiang=new lingjiangs([function(){
		//实物
		lingjiang.box.setAttribute('onclick','');
		lingjiang.box.innerHTML='已领取';
		lingjiang.box.className='';
		var tag=lingjiang.box.parentNode.parentNode.querySelector('.sod');
		tag.classList.remove('red');
		tag.innerHTML='待发货';
	}
	,function(){
		//红包
		lingjiang.box.setAttribute('onclick','');
		lingjiang.box.setAttribute('action','lgj');
		lingjiang.box.innerHTML='已领取';
		lingjiang.box.className='';
	}
	,function(){
		//微信卡券
		var len=lingjiang.box.parentNode.querySelectorAll('label').length,pre=lingjiang.box.parentNode;
		if(len>0){
			pre.classList.remove('nszm'+len);
			pre.classList.add('nszm'+(len-1));
		}
		pre.removeChild(lingjiang.box);
	}
	,function(data){
		$typ=Number(data.type);
		var content=trim(document.getElementById("textarea").value),vl=content.length,dj,getsearch
		,$name=data.name
		,$rate=data.rate
		,$orderId=data.orderId
		,activityType=data.activityType
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
			/*if($typ==102){
				money=+data.money/100;
				if(money==1)desc=CONFIG.chars.hjgy.h;
				else 
				desc=CONFIG.chars.hjgy.i+money+CONFIG.chars.hjgy.j;
			}
			if(mainVar.$isT==1)desc=CONFIG.chars.hjgy.k+$name+CONFIG.chars.hjgy.l;*/
			if($typ==102)
				money=+data.money/100+"元现金红包";
			else
				money=data.name||data.prize_name;
			desc='泪牛满面！竟然是我中了'+money+'，感谢'+PAGE.channelName+'频道，点我看大奖';
			mainVar.newlink=urlFolder()+"share.html?type=dajiang";
			//shareicon=PAGE.COMMON+'img/cupicon.jpg';
			
			if(activityType>1){
				dj=2;
			}else{
				if($rate>1&&mainVar.$isT!=1){
					dj=0;
					if($typ==102&&mainVar.$isT!=1){mainVar.shoppn='';mainVar.shoppt='';}
				}else dj=1;
			}
			switch($typ){
				case 102:case 1:
					if($typ==102)$sw="a";
				break
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
	,function(_data){
		var $typ=_data.type,$orderId=_data.orderId;
		if(_data.status=='1')tishi(CONFIG.chars.hjgy.d,{time:2000});
		tjHjgy=0;
		if($typ==1)setStorage("set","hjgy"+$orderId,1);
		switch($typ){
			case 1:case 102:
				if(mainVar.$sw=="a"){
					lingjiang.getHongbao();
					popBox.popClose();
				}else{
					popBox.popClose();
					getInkind(_data,true);
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
	}],{
		inKind:function(data){
			getInkind(data,false);
		}
	});
	function pageinit(user,nickname){
		DO.title="个人中心";
		$.ts='设置手机号 ><font id="yh_status" onclick="gobindmobile(1);">即可成为'+PAGE.channelName+'频道会员</font>';
		var cardh='',homes=myhome.homes,menu=myhome.menu,html=""
		,usr=mainVar.userInfo,urlStr=SU(),sw=190,$opt={}
		,svg={width:sw,height:sw,origin:sw/2,r:78,bw:7}
		,att='cx="'+svg.origin+'" cy="'+svg.origin+'" r="'+svg.r+'" fill="none" stroke-width="'+svg.bw+'"'
		,zc=svg.r*Math.PI*2
		,theMoney=0
		,fullMoney=10000
		,getMoney=0
		,tr=0,ru=0
		,xdM=eval(PAGE.sqMenu)
		,wdsc=trim(xdM[0].noteText),wdsc_syt=""
		,sc=trim(xdM[1].noteText),sc_sty=""
		,ylc=trim(xdM[2].noteText),ylc_sty="border:none"
		,shangcheng,scdd
		,fx=+SWITCH.fanxianmingxi,fx_sty="",tiwen=+SWITCH.tiwen,tiwen_sty=""
		,css=(winW<360?'width:26px;height:24px;background-position:center -154px;margin:2px 1px 0 5px;':'width:30px;height:24px;background-position:center -179px;margin:2px 6px 0 20px')
		;
		if(wdsc=="OFF"){
			wdsc="tishi('还没开通此功能哦')"
			wdsc_syt="style='-webkit-filter:grayscale(1)'"
		}else if(wdsc=="M_WDSC"){
			wdsc="goUrl('"+wdsc+"')"
		};
		if(sc=="OFF"){
			sc="tishi('还没开通此功能哦')"
			sc_sty="style='-webkit-filter:grayscale(1)'"
			scdd="tishi('还没开通此功能哦')"
		}else{ 
				shangcheng="http://mlive.tvmcloud.com/qstore/qstore/?q=deal/fcc7568c74ec/0/order/"+user.openid
			if(sc=="M_SC_NEW"){
				sc="goUrl('"+sc+"')"
			}else if(sc=="M_SC"){
				sc="goto('coin.html')";
				shangcheng=PMALL_LJ+"/auth/custom?page=my-order&yyyappId="+PAGE.yyyappid
			}else sc="goUrl('"+sc+"')"
			scdd='goto(\''+shangcheng+'\')'		
		}
		if(ylc=="OFF"){
			ylc="tishi('还没开通此功能哦')"
			ylc_sty="style='border:none;-webkit-filter:grayscale(1)'"
		}else if(ylc=="M_YL"){
			ylc="goUrl('"+ylc+"')" 	
		}
		if(fx!==0){
			fx='goto(\''+PMALL_LJ+'/auth/fanxian?page=fxorder'+urlStr+'\')'
		}else{
			fx="tishi('还没开通此功能哦')"
			fx_sty="style='-webkit-filter:grayscale(1)'"
		}
		if(tiwen){
			tiwen="goto('coin.html?pageview=fdlist')"
			tiwen='<p class="wenda" onclick="'+tiwen+'"><b class="tag emIco" style="background-position:center -970px"></b>我的提问</p>'
		}else{
			tiwen='<p></p>'
		}
		html+='<div class="banner" style="padding-right:10px;overflow:hidden">'
		+'<img src='+getHeads(user.weixin_avatar_url)+' class="headImg">'
		+'<p class="p" style="margin:0;-webkit-transform:translate(0,-50%)">'+nickname+'<br><b onclick="personalInfor()" class="editTxt" id="editTxt">编辑资料</b></p>'
		+'<div class="iconAll">'
		+'<b class="xinyong" id="xinyong"></b>'
		+'</div>'
		+'</div>'			
		html+='<div style="background:#fff;overflow:auto;margin:0 auto"><div style="display:table;;margin:6px 0;width:100%;text-align:center" class="head1">'
		+'<p style="position:relative;border-right:1px solid #eee;text-align:left">'
		+'<em class="tag" onclick="goto(\'Detailed.html?nu=1\')" style="display:inline-block;vertical-align:middle;'+css+'"></em>'+PAGE.unit+'<span id="gold" onclick="goto(\'Detailed.html?nu=1\')"></span><span onclick="gotoUrl(\'CZ\')" style="position:absolute;margin-top:3px;right:10px;color:#078bff">充值</span></p>'
		+'<p id="hj_box" onclick="goto(\''+HOST.HUIYUAN+'\')"></p>'
		+'</div></div>'
		if(!+SWITCH.yue){
		html+='<div style="position:relative;margin:10px auto 0 auto;background:#fff;overflow:hidden">'
		+'<ul class="table" style="width:100%;height:45px;border-bottom:1px solid #eee;">'
		+'<li class="cell" style="width:40px"><b style="display:inline-block;background-position:center -120px;width:28px;height:25px" class="tag"></b></li>'
		+'<li class="cell" style="width:60px;text-align:left">钱包</li>'
		+'<li class="cell" style="text-align:right"><label style="color:red;border-radius:13px;padding:1px 13px"id="zrttdsb"onclick="goUrl(\'TTDSB\')">统一余额账户</label></li>'
		+'</ul><div style="position:relative;margin:3px auto 0 auto;width:'+svg.width+'px;height:'+svg.width+'px">'
		+'<svg style="width:100%;height:100%">'
		+'<circle '+att+' style="stroke:#E1E1E1"></circle>'
		+'<circle '+att+' style="stroke-dasharray:'+zc+';stroke:#2A90D7;stroke-dashoffset:'+zc+';-webkit-transform-origin:center;-webkit-transform:rotate(-90deg)" id="circleEle"></circle>'
		+'</svg>'
		+'<div style="position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);color:#FF6654;width:100%;text-align:center">'
		+'<p>余额</p>'
		+'<div style="font-size:2.4em;line-height:1.5em;font-family:arial;margin:0 0 2px 0" id="theMoneyInfo">0.00</div>'
		+'<label onclick="goto(\'Detailed.html?nu=0\')" style="border-radius:13px;text-align:center;border:1px solid red;padding:2px 6px"> 明细 &gt;</label>'
		+'</div></div>'
		+'<img src="//a-h5.mtq.tvm.cn/yao/common/img/sj.png" style="position:absolute;height:25px;right:25px;top:200px" onclick="toHome()">'
		+'<div style="border-top:1px solid #eee;height:0px;width:100%"></div>'		
		+'<div class="table" style="position:relative;height:70px;width:100%;margin:0 0;overflow:hidden">'
		+'<p class="cell" onclick="goto(\''+PMALL_LJ+'/auth/fanxian?page=fxdetail&fromgzh=1\')">返现帐户<br>'
		+'<b class="money1" id="fanxianM" >0.00</b></p>'
		+'<b style="position:absolute;wdith:0px;height:90%;top:5%;left:50%;border-right:1px solid #eee"></b>'
		+'<p class="cell" style="position:relative;width:50%" id="ljtx"><b class="ljtx">立即提现</b><label '+(winW<330?"style=\'margin:auto 25px auto 0\'":"")+'>今日可提</label><br><b class="money1" id="tixianM">0.00</b></p></div></div>';
		getXY()
		}
		html+='<div class="menus" style="margin:10px auto 0 auto">'
		//+'<p class="dingdan" onclick="'+fx+'" '+fx_sty+'><b class="tag emIco" style="background-position:center -386px"></b>返现明细</p>'
		+'<p class="history" onclick="'+scdd+'" '+sc_sty+'><b class="tag emIco" style="background-position:center -793px"></b>商城订单</p>'
		+'<p class="shoping" onclick="'+sc+'" '+sc_sty+'><b class="tag emIco" style="background-position:center -907px"></b>花余额</p>'	
		+'<p class="jbhouse" onclick="'+ylc+'" '+ylc_sty+'><b class="tag emIco" style="background-position:center -448px"></b>玩金币</p>'		
		+'<p class="dingdan" onclick="gifts.open()"><b class="tag emIco" style="background-position:center -262px"></b>中奖记录</p>'
		+'</div>'
		+'<div class="menus" style="border-top:1px solid #eee">'
		+'<p class="history" onclick="'+wdsc+'" '+wdsc_syt+'><b class="tag emIco" style="background-position:center -851px"></b>我的收藏</p>'
		+'<p class="shoping" onclick="goto(\'coin.html?pageview=mypost\')"><b class="tag emIco" style="background-position:center -100px"></b>帖子</p>'	
		+'<p class="jbhouse" onclick="goto(\'coin.html?pageview=mymsg\')"><b class="tag emIco" style="background-position:center -44px"></b>消息</p>'	
		+tiwen
		+'</div>'
		DB.innerHTML+=html;
		$.type=balanceSwitch!==1?"COUPONSV2":"COUPONSANDOTHERS"
		$.card=createNode(DB,'div',{className:'card',html:'<ul style="margin:0;padding:0">'+cardh+'</ul>',style:"overflow:hidden;margin:0;display:none"},'p3');
		$.lists=createNode(DB,'div',{className:'list_box',id:'list_box',html:'<ol id="nav" class="nav" type="0"><li name="GOOD">实物</li><li name="CASH">红包</li><li name="'+$.type+'">其他</li><li id="red" class="red"></li></ol><div id="scrollbox"><ul class="lists" id="GOOD"></ul><ul class="lists" id="CASH"></ul><ul class="lists" id="'+$.type+'"></ul></ul>'},'p3');	
		$.loading=createNode(DB,"div",{className:"loading"},"p3");
		$.load2=createNode(DB,"div",{className:"load2"},"p3");
	 	mainVar.newbg=createNode(DB,"div",{className:"newbg"},"p3");
		gifts=new gift_list;
		setTimeout(function(){gifts.init(GOOD,'GOOD',1);},200)
		DB.className='list0';		
		$.navs=nav.querySelectorAll('li');
		_left=4.5;
		navlen=$.navs.length-1;
		red.style.cssText='left:'+_left+'%;right:'+(33*2+_left)+'%';
		for(var i=0;i<navlen;i++){
			$.navs[i].type=i;
			$.navs[i].onclick=forbtn;
		}
		/*if(+PAGE.yanzheng==1){					
			mygodnum(function(_){
				var $d=_.data;
				if(_.status=="success"){
					if($d.mobile){
						setZT('手机号 <font id="yh_status">'+($d.mobile.substr(0,3)+'****'+$d.mobile.substr(7))+'</font> <span onclick="gobindmobile(0);">重置</span>');
					}else setZT($.ts);
				}else{
					setZT($.ts);
				}
			});
		}*/
		quanxian();//用户等级
		myhome.balance==1&&mygodnum(function(_){
			var $h,$a,$d=_.data;
			if(_.status=="success"){
				if($d.integral==0)$h=0;else $h=$d.integral;
			}else $h=0;
			
			gold.innerHTML=$h;
		},'',HOST.GOLDCOIN);
		
		function getXY(){
			var a=setAjax('GET',HOST.BALANCE+'/open/user/virtualcurrency?code='+user.sig+'&channelid='+PAGE.channelId+SU()+'&cache='+Math.random())			
			,b=setAjax("GET",HOST.RTS+'/userinfo/get?yyyappid='+PAGE.yyyappid+'&yopenid='+usr.openid);
			a.callBack=function($data){
				var _=toObject($data);
						if(_.status=="success"){
							var data=_.body,fullMoney=data.walletSize,theMoney=data.virtualCurrency,arr=locusCount(33,0,theMoney),maxV,time,zrttdsb=DO.getElementById("zrttdsb");				
							mainVar.money=theMoney/100;
							if(data.union){
								zrttdsb.textContent="统一余额账户(已开通)";
							}else{
								zrttdsb.textContent="统一余额账户(未开通)";
								mainVar.binding.subscribe=hasTT=0
								}
							time=setInterval(function(){
							if(arr.length){
								var s=arr.shift()
									theMoneyInfo.textContent=setMoney(s);
									maxV=zc-zc*s/fullMoney;
									if(maxV<0)maxV=0;
									circleEle.style.strokeDashoffset=maxV
								}else{
									tr=1;//trans();
									clearInterval(time)
									}
							},20)
							$.walletSize=fullMoney/100;
							function trans(){
								if(ru)return;ru=1
								setTimeout(function(){
									var tSty=txMone.style
									txMone.innerHTML='已提现 <label style="color:red">'+getMoney+'元</label>'
									tSty.opacity=1
									tSty.webkitTransition="all 300ms ease"
									tSty.webkitTransform="scale(1.3)"
									setTimeout(function(){
										tSty.webkitTransform="scale(1)"
										},450)		
									},100)
								}
							};
						$.walletSize=fullMoney/100;					
			}
			b.callBack=function($data){
				var data=toObject($data),ele;
				if(data.status){
					data=data.data;
					mainVar.userInfo.phone=data.mobile;
					mainVar.userInfo.ttopenid=data.openid;
					info_status=data.info_status;
					if(info_status!==2){
						ele=document.getElementById('editTxt');
						ele.className="addInfo";
						ele.innerHTML='<img src="'+FOLDER+'/common/img/ico_7.png" style="width:20px;position:absolute;left:6px;top:1px">完善个人资料 <b>+500</b>'
					};
				}else{
					tishi("Err-H02",{fun:function(){location.replace("fx.html?xdClear")}})
					};
				getTT()
			};
			b.err=function(){
				getTT()
				}
			a.send()
			b.send()
		}
		
	function getTT(){
	var openid=user.openid//此处只能用摇电视的id
		,a=setAjax("get",PMALL_JK+"/open/union/user/yrefund?openId="+openid)
		,b=setAjax("GET",PMALL_JK+"/open/yaccount/today/max/cash?openId="+openid)
		a.callBack=function($data){
			var data=toObject($data),d=data.data
			if(d){				
	var div=createNode(DB,"div",{html:"<img src='//a-h5.mtq.tvm.cn/yao/common/img/ico_5.png' style='position:absolute;width:30px;left:0;top:0'><label style='margin:0 0 0 30px'>发现您有</label><label style='color:red'>欠款"+setMoney(d)+"元，</label><label onclick=\"goto('"+HOST.DOMAIN2+"/auth/fanxian?page=debt_order')\" style='color:#2a90d7'>查看详情</label><label onclick=\"goto('"+HOST.DOMAIN2+"/auth/fanxian?page=backcash&fromgzh=1')\" style='position:absolute;color:#fff;background:red;border-radius:4px;padding:4px 6px;right:10px;top:50%;font-size:12px;-webkit-transform:translate(0,-50%)'>我要还款</label>",style:"position:relative;width:100%;height:40px;background:#FDF6D9;top:0;left:0;z-index:1;font-size:14px;display:flex;align-items:center;display:-webkit-flex;-webkit-align-items:center"},"p2")				
				}
			}
		b.callBack=function($data){
			var data=toObject($data),c,x,p=0,domain=PMALL_LJ,maxM;
			if(data.status==="success"){
				c=data.data;maxM=c.maxMoney
				fanxianM.textContent=setMoney(c.balance);
				tixianM.textContent=setMoney(c.maxMoney);
				if(c.newUser){
					p="credit_06" //新手入门
					}else if(c.verified){
						x=c.checkTodayLimit/100
						if(x>400){
							p="credit_05" //信用极好
							}else if(x>200){
								p="credit_04" //信用优秀
								}else if(x>100){
									p="credit_03" //信用良好
									}else if(x>99){
										p="credit_01" //信用正常
										}else if(x>-1){
											p="credit_02" //信用不良
											}
					}
				 xinyong.classList.add(p);
				 xinyong.onclick=function(){
					 goto(domain+(c.verified?"/auth/fanxian?page=credit_level":"/auth/fanxian?page=identity")+urlStr)
				 }
				// if(maxM>0){
				 ljtx.onclick=function(){
					 goto(domain+(c.verified?"/auth/fanxian?page=pickup":"/auth/fanxian?page=identity")+urlStr)
					 }
				//		ljtx.firstChild.style.display="block"
				//	}
				}		
			}
			a.send()	
			b.send();
		}		
		
		function LC(){
		var licai=setAjax("get","http://q.cdn.mtq.tvm.cn/adsmall/release/lc.json")
			licai.callBack=function($data){
				crateLC(toObject($data))
				}
			licai.send()
		function crateLC($data){
			var i=0,il=$data.length,li,str=SU()
			,html='<style>.lcCard{position:relative;width:100%;background:#fff;margin:0 0 10px 0;overflow:auto}'
			+'.lcCard>b{position:absolute;right:10px;padding:1px 5px;top:10px;background:#DD4B4B;color:#fff;border-radius:3px;font-size:12px}'
			+'.lcCard b{font-weight:normal}'
			+'.lcCard img{width:40px}'
			+'.lcCard>div{display:table;width:100%}'
			+'.d1,.d2{height:66px}'
			+'.lcCard .d1{border-bottom:1px solid #eee;margin:25px 0 0 0}'
			+'.lcCard section{display:table-cell;vertical-align:middle}'
			+'section.s1{width:100px;text-align:center}'
			+'section h3{font-weight:normal;font-size:1.2em;color:#000}'
			+'.s2{color:rgb(102,102,102)}'
			+'.s2 b{color:red}'
			+'.lcCard .d3{background:#F8F8F8 url(//a-h5.mtq.tvm.cn/yao/common_btv7/img/kq-border.png) repeat-x left bottom;background-size:10px 3px}'
			+'.lcCard .d3 b{display:block;margin:10px auto;width:105px;text-align:center;padding:6px 0;background:#05B010;color:#fff;border-radius:3px;font-size:1.1em}'
			+'</style>'
			html+='<div class="CZ" style="position:relative;background:#fff;height:39px;margin:8px 0 0 0;border-bottom:1px solid #eee" onclick="goto(\''+PMALL_LJ+'/auth/fanxian?page=finance?'+urlStr+'\')">'
			+'<em class="tag emIco" style="width:35px;height:35px;margin:0 5px 0 16px;background-position:center -680px"></em>理财推荐<label style="position:absolute;right:10px;color:#6297F8">买理财，赚收益，还可得微信红包</label></div>'
			  for(;i<il;i++){
				 li=$data[i];
				 html+='<div class="lcCard">'
				 +'<b>投资成功返现 '+(li.cash_back/100)+'元</b>'
				 +'<div class="d1">'
				 +'<section class="s1"><img src="'+li.logo+'"></section>'
				 +'<section><h3>'+li.title+'</h3><label>'+li.fromName+'</label></section>'
				 +'</div><div class="d2">'
				 +'<section class="s1"><img src="'+li.newUserImg+'"></section>'
				 +'<section class="s2">'+li.desc+'</section></div>'
				 +'<div class="d3"><b onclick="goto(\''+li.fanli_url+str+'\')">点击前往</b></div>'
				 +'</div>' 
				  }
  				createNode(DB,"div",{html:html},"p3")
			}
		}
		if(SWITCH.licai==="0")LC()
	}
	function forbtn(){
		var n=this.type,a,b,c,d,type=this.getAttribute('name'),_box;		
		if(n>nav.type){
			a=(navlen-n-1)*33+_left;
			b=n*33+_left;
			c='right';
			d="left";
		}else{
			a=n*33+_left;
			b=(navlen-n-1)*33+_left;
			c='left';
			d="right";
		}
		red.style[c]=a+'%';
		setTimeout(function(){red.style[d]=b+'%';},150);
		DB.className='list'+n;
		_box=DB.querySelector('#'+type);
		scrollbox.scrollTop=0;
		if(_box.innerHTML=='')gifts.init(_box,type,2);
		else{
			gifts.dom=_box;
			gifts.type=type;
		}
		nav.type=n;
		$.skey=true;
		setTimeout(function(){$.skey=false;},300)
	}
	function toHome(){
		goto(FOLDER+"/home/"+(hasTT?"upgrade":"index")+".html?yyyappid="+PAGE.yyyappid+"&userInfo="+JSON.stringify(user)+"&money="+mainVar.walletSize)
		}
	function setZT(e){
		mobile_box.innerHTML=e;
	}
	function getHeads($url){
		if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96";}
	}
	
	function yue($fun){
		var a=setAjax('get',HOST.BALANCE+'/open/user/virtualcurrency?code='+user.sig+SU()+'&channelid='+PAGE.channelId+'&cache='+Math.random());		
		a.callBack=function($data){
			isFun($fun,$data);
		}
		a.err=function(){
			isFun($fun,JSON.stringify({body:{virtualCurrency:0}}))
		}
		a.send()
	}
	function setdingdan($fun){
		var a=setAjax('get',HOST.CARD+'/open/order/state/count?openId='+user.openid);		
		a.callBack=function(data){
			_data=toObject(data);
			isFun($fun,_data);
		}
		a.send()
	}
	
	function fanxian($fun){
		var a=setAjax('get',PMALL_JK+'/open/fanxian/money?openId='+user.openid);		
		a.callBack=function(data){
			_data=toObject(data);
			isFun($fun,_data);
		}
		a.err=function(){
			isFun($fun,{status:"",code:200,data:0});
		}
		a.send()
	}
	
	function gobindmobile(n){
		if(!$.call)$.call=new callChange;
		if(n==undefined)$.call.TCopen();
		else $.call.open(n);
	}
	
	function quanxian(){
		q=setAjax("get",HOST.QX+"/tvmyao/api.php?action=userinfo&openid="+user.openid+"&yyyappid="+PAGE.yyyappid)
		q.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");}
		q.callBack=function($data){
			var data=toObject($data);
			if(data.status==1){
				var level=data.data.levelinfo;
				if(level.grade_name&&level.pic_name){					
					hj_box.innerHTML='<img src="'+level.pic_name+'" style="height:32px;margin:-4px 4px 0 0;vertical-align:middle">'+level.grade_name+level.lvl+'级'
				};
			}
		}
		q.send();		
	}	
	function isFun($fun){var a;
		return typeof($fun)==="function"?(a=[].slice.call(arguments),a.shift(),$fun.apply(null,a),$fun):function(){}
	}
	
	/*
	一、1：实物
	二、102：微信红包
		103：现金红包
	三、2：优惠码
		3：第三方URL
		5：google
		101：微信卡券
	*/
	function gift_list(){
		var t=this,ndata=mainVar.newdata.data
		,scro={
			sort:0
			,size:20
			,GOOD:0
			,CASH:0
		}
		,keys={};
		scro[$.type]=0;
		t.init=function($box,artyp,bool){
			if($.wonder)return;
			$.wonder=true;
			setTimeout(function(){$.wonder=false;},500);
			t.dom=$box;
			t.type=artyp;
			if(!bool)scro[artyp]++;
			t.ask(function(_){
				var html='',data=_.data,len=data.length;
				if(len!=0){
					for(var i=0;i<len;i++){
						var $a=data[i],wxstate=Number($a.wxstate),zt='',ddzt='',jpsm='',_jpsm='',btt='',curl=$a.consume_url,xshiwu,gq='',$name,expired=$a.expired,expireDay=+$a.expireDay||1;
						if($a.prizeFrom!='djyjx')
						setHtml();
						function setHtml(){
							switch($a.type){
								case 102:case 103:case 105:
									if(wxstate==1)
										btt='<label action="lgj">已领取</label>';
									else{
										if(+expired==1||typeof expired!='number'){
											if($a.activityType==2000){
												action="pc_getPrize.init(this)";
											}else{
												action="lingjiang.init(this)";
											};
											btt='<label onclick='+ action +' class="red">领取</label>';
										}else{
											btt='<label onclick=tishi("已过期")>已过期</label>';
										}
									}
									ddzt+='<span>'+$.bz+'</span>';
								break
								case 104:
									if(!$.ak47)$.ak47=new txred('$.ak47');
									ddzt+='<span>请在'+Math.round(expireDay*24)+'小时内领取，逾期无效不可提现</span>';
									if(wxstate==1)
										btt='<label onclick=tishi("已提现")>已提现</label>';
									else{
										if(+expired==1||typeof expired!='number'){
											action="$.ak47.open(this)";
											btt='<label onclick='+ action +' class="red">拆开领现金</label>';
										}else btt='<label onclick=tishi("已过期")>已过期</label>';
									}
								break
								case 1:
									var $ss,bz=$.bz.split('72');
									if($a.expireDay)ddzt+='<span>'+bz[0]+($a.expireDay*24)+bz[1]+'</span>';
									if($a.receiveInfo==undefined)$ss=0;else $ss=1;
									switch($ss){
										case 0:
											if($a.expireDay){
												if(+expired==1||typeof expired!='number'){
													zt+="<span class='sod'>未发货</span>";
													action="lingjiang.init(this)";
													btt='<label onclick='+ action +' class="red">领取</label>';
												}else{
													zt+="<span class='sod'>已过期</span>";
													btt='<label>领取</label>';
													gq='class="gq"';
												}
											}else{
												zt+="<span class='sod'>未发货</span>";
												action="lingjiang.init(this)";
												btt='<label onclick='+ action +' class="red">领取</label>';
											}
										break
										case 1:
											if($a.courier){
												zt+="<span class='red sod'>已发货</span>"
												if($a.courier)ddzt+="<span>物流: "+$a.courier.name+" 运单号:"+$a.courier.num+"</span>";
											}else
												zt+="<span class='sod'>待发货</span>";
											if(+$a.state==3){
												zt="<span class='sod'>已签收</span>";
												if($a.courier)ddzt="<span>物流: "+$a.courier.name+" 运单号:"+$a.courier.num+"</span>";
											}
											btt='<label>已领取</label>';
										break
									}
								break
								default:
									switch($a.type){
										case 101:
											if(wxstate!=1){
												action="lingjiang.init(this)";
												btt='<label onclick='+ action +' class="red">领取</label>';
											}
										break
										case 2:
											ddzt+="<span>电子码: "+$a.shoppingCard+"</span>";
											action="lingjiang.init(this)";
											if($a.link)btt='<label onclick='+ action +' class="red">领取</label>';
											if(curl)_jpsm='<label onclick=goto('+ curl +')>购 买</label> ';
										break
										default:
											if($a.type==5)$a.link=$a.google_json_url;
											if($a.activityType==2000){
												action="pc_getPrize.init(this)";
												btt='<label onclick='+ action +' class="red">领取</label>';
											}else{
												action="lingjiang.init(this)";
											};
											if($a.link)btt='<label onclick='+ action +' class="red">领取</label>';
											if(curl)_jpsm='<label onclick=goto("'+ curl +'")>购 买</label> ';
										break
									}
								break
							}
							if($a.gainUrl){var url=$a.gainUrl;jpsm="<label onclick=goto('"+ url +"')>奖品说明</label> ";}
							ndata.push($a);
							var nums=0;
							if(jpsm!='')nums++;
							if(_jpsm!='')nums++;
							if(btt!='')nums++;
							if($a.type==102||$a.type==103||$a.type==105)$name=($a.money/100).toFixed(2)+'元现金红包';else $name=$a.name;
							html+='<li '+gq+'><p class="list_time">中奖时间: '+$a.datetime+zt+'</p><div class="listb"><div class="photo2"><img src="'+$a.pic+'"></div><p>'+$name+'</p>'+ddzt+'</div><div class="list_btn nszm'+nums+'" title="'+(scro.sort++)+'">'+jpsm+_jpsm+btt+'</div></li>';
						}
					}
					if(html==''){
						if($box.innerHTML=='')
						t.mywinrc($box);
					}else
						createNode($box,'ol',{html:html},'p3');
				}else if(!keys[artyp])t.mywinrc($box,_.sos);
			},scro[artyp],scro.size,artyp,$box)
		}
		t.mywinrc=function(e,err){
			e.innerHTML='<p class="dtError" style="padding:'+winH/10.2
			+'px 0 0;"><img src="'+PAGE.COMMON+'img/error.png"><br><br>'+(err||'还没有奖品哦')+'</p>';
		}
		t.ask=function(fn,a,b,c,d){
			if(keys[c]){tishi('已经最后一页了');return}
			if(scro.GOOD==0)
			scrollbox.setAttribute('onscroll','gifts.scrolldo(this)');
			else
			$.loading.style['display']='block';
			var ajax=setAjax('get',HOST.CJ+'/open/order/user/orders?cache='+(+new Date)+'&yyyappId='+PAGE.yyyappid+'&openId='+user.openid+'&code='+user.sig+'&sigExpire='+user.sigExpire+'&queryType=prize&prizeType='+c+'&page='+a+'&pageSize='+b);
			ajax.callBack=function($data){
				var data=toObject($data);
				if(data.statusCode===101)tishi("Err-H03",{fun:function(){location.replace("fx.html?xdClear")}});
				if(data.data.length<b&&a>0)keys[c]=true;
				_js(fn,data);
			};
			ajax.err=function(){data={data:[]};_js(fn,data);}
			ajax.send();
			function _js(fn,_){
				isFun(fn,_);
				setTimeout(function(){$.loading.style['display']='none';},500);
			}
		}
		t.scrolldo=function(e){
			scrolldo(e,function(){
				t.init(t.dom,t.type);
			})
		}
		t.open=function(){
			DO.title='中奖记录';
			list_box.style['display']='block';
			location.hash='ld';
			DB.id="show";
			t.timer=setInterval(function(){
				if(!location.hash){
					$.load2.style['display']='block';
					setTimeout(function(){t.close();},1000)
				}
			},1000);
		}
		t.close=function(){
			clearInterval(t.timer);
			popboxfn();
			DO.title='个人中心';
			DB.id="";
			$.load2.style['display']='none';
			list_box.style['display']='none';
		}
	}
	
	function popboxfn(){
		DB.classList.remove('newspeech');
		var show=popbox.style;
		show['display']=show['display']=='block'?'none':'none';
	}
	
	function txred(obj){		
		$.txred=createNode(DB,"div",{className:"txbox",html:'<p class="txtop"><img src='+getHeads(user.weixin_avatar_url)+'> 余额账户 <span id="txmoney">0.0</span> 元</p>\
		<div class="hbmain" id="hbtxt"><img src="'+PAGE.COMMON+'img/txhb_top.png"><div class="hbtxt"><font class="txtit">余额提现锦囊</font><p class="txtzz">余额不足，不可提现</p></div><span class="chai" onclick="'+obj+'.chai(this)">拆</span><span class="chai en">拆</span></div>\
		<div class="hbbt"><p>拆开即可提现</p><span id="hbbt_money"></span> 元</div>\
		<div class="prompt"><span>特别提示：</span><ul>\
		<li><em>1</em>请您在中奖后72小时内拆开余额锦囊进行提现，逾期不可提现</li><li><em>2</em>如果您的余额小于锦囊金额，那么您的可提现金额＝您的余额账户金额。余额账户少于1元时不可提现。</li></ul></div>'},"p3");
		var t=this;
		t.open=function(_){
			var _title=_.parentNode.title,data=$.newdata.data[_title],_money=(data.money/100).toFixed(2),m=_money,qian=mainVar.money;
			hbtxt.title=_title;
			txmoney.innerHTML=qian;
			hbbt_money.innerHTML=_money;
			if($.money<1)t.lqzt(1)
			else if(qian<_money)m=qian;
			$._money=m;
			setTimeout(function(){
				$.txred.classList.remove('txhide');
				$.txred.classList.add('txshow');
				$.txred.style['display']='block';
				location.hash='txhb';
				t.val=setInterval(function(){
					location.hash!='#txhb'&&t.close();
				},1000)
			},400);
		}
		t.lqzt=function(_){
			var en=$.txred.querySelector('.en')
			$.txred.classList.add('enough');
			if(_==1)
				en.setAttribute('onclick',obj+'.chai(1)');
			else en.setAttribute('onclick',obj+'.chai(2)');
		}
		t.chai=function(_){
			if(_==1){
				tishi("您的余额不足");
				return false;
			}else if(_==2){
				tishi("红包领取失败，请稍候重试...");
				return false;
			}
			$.dx=t;
			lingjiang.init(_);
		}
		t.close=function(){
			clearInterval(t.val);
			popboxfn();
			$.txred.classList.remove('txshow');
			$.txred.classList.add('txhide');
			setTimeout(function(){$.txred.style['display']='none';},600)
		}
	}
	
	function scrolldo(e,fn){
		var v=e.scrollTop,c=e.clientHeight,d=e.scrollHeight,a=d-c;
		if(v>a-2){
			if($.loading.style.display != 'block'){
				if(!$.skey){
					e.scrollTop=v-3;
					isFun(fn);
				}
			}
		}
	}
	
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
				case "sendHjgy":
					pc_getPrize.sendHjgy();
				break;
				case "check":
					goto(a1);
				break
				case "giftopen":
					gifts.open();
				break
				case "btn_speech":
					lingjiang.postspeech();
				break
				case "popClose":
					popBox.popClose();
				break
				case "popSave":
					lingjiang.popSave();
				break
				case "tishi":
					tishi('敬请期待！');
				break
			}
		}
	}
	addEvent(DO,"touchstart",docAction);
function yeChart($opt){
	var sw=200
		,svg={width:sw,height:sw,origin:sw/2,r:80,bw:7}
		,att='cx="'+svg.origin+'" cy="'+svg.origin+'" r="'+svg.r+'" fill="none" stroke-width="'+svg.bw+'"'
		,zc=svg.r*Math.PI*2
		,theMoney=$opt.virtualCurrency||0
		,fullMoney=$opt.walletSize||100000
		,getMoney=0
		,tr=0,ru=0
		,str='<div style="position:relative;height:45px;border-bottom:1px solid #ccc;display:flex;align-items:center;display:-webkit-flex;-webkit-align-items:center">'
	+'<b style="display:inline-block;background-position:center -124px;width:28px;height:22px;margin:0 5px 0 10px" class="tag"></b>'
	+'<label style="">钱包</label>'
	+'<label style="position:absolute;top:10px;right:10px;border:1px solid red;color:red;border-radius:13px;padding:1px 6px">￥余额转账</label></div>'
	+'<div style="position:relative;margin:auto;width:'+svg.width+'px;height:'+svg.width+'px">'
	+'<svg style="width:100%;height:100%">'
	+'<circle '+att+' style="stroke:#E1E1E1"></circle>'
	+'<circle '+att+' style="stroke-dasharray:'+zc+';stroke:#2A90D7;stroke-dashoffset:'+zc+';-webkit-transform-origin:center;-webkit-transform:rotate(-90deg)" id="circleEle"></circle>'
	+'</svg>'
	+'<div style="position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);color:#FF6654;width:100%;text-align:center">'
	+'<p>余额</p>'
	+'<div style="font-size:2.4em;line-height:2em;font-family:arial" id="theMoneyInfo">0.00</div>'
	+'<a href="Detailed.html?nu=0" style="border-radius:15px;text-align:center;border:1px solid red;color:red;padding:1px 6px">明细 ></a>'
	+'</div></div>'
	+'<p style="text-align:center;font-size:1.1em;margin:0 0 10px 0;height:40px;opacity:0" id="txMone"></p>'
	,box=createNode(DB,"div",{style:"margin:10px 0;background:#fff",html:str}),arr=locusCount(33,0,theMoney),time=setInterval(function(){
		if(arr.length){
		var s=arr.shift()	
				theMoneyInfo.textContent=setMoney(s)
				circleEle.style.strokeDashoffset=zc-zc*s/fullMoney
			}else{
				tr=1;trans();
				clearInterval(time)
				}
		},20)
	,a=setAjax('get',PMALL_JK+'/open/fanxian/money?openId='+user.openid);		
	a.callBack=function(data){
		var data=toObject(data)
		getMoney=data.data;
		if(tr===1)trans()
		}
	a.send()
	function trans(){
		if(ru)return;ru=1
		setTimeout(function(){
			var tSty=txMone.style
			txMone.innerHTML='已提现<label style="color:red">'+getMoney+'元</label>'
			tSty.opacity=1
			tSty.webkitTransition="all 300ms ease"
			tSty.webkitTransform="scale(1.3)"
			setTimeout(function(){
				tSty.webkitTransform="scale(1)"
				},450)		
			},1000)
		}
	}
function setMoney($s){
	var b=+$s;
	return b<1?""+b:((b>99?"":b>9?"0":"00")+b).replace(/(..)$/,".$1")
	}
function locusCount(p,S,E){
	var tem,s=S,e=E,_=[],i=-1;
		if(p<1){
		if(p<=0)return false
		//判断p如果是大于1的则按等比均分，反之缓冲
			for(;s!=e;){
				tem=p*(e-s)
				tem=(tem>0?Math.ceil(tem):Math.floor(tem)) 
				s+=tem;
				_[i+=1]=s;
			}
		}else{
			tem=Math.ceil((e-s)/p);
			if(e<s){
					for(;s>e;s+=tem){_[i+=1]=s}
				}else{
					for(;s<e;s+=tem){_[i+=1]=s}
				}
		};
		if(_[_.length-1]!=e)_.push(e)
			return _
	};
tjData.appName="个人中心页面"
TJ(100000)	
function gotoUrl($u,$s){
	var u,user=mainVar.userInfo;
	switch($u){
		case "CZ":
			if(!user.ttopenid){
				tishi("<p>您没有绑定天天电视宝账号，<br>不能充值！</p>",{style:"height:60px"})
				return}
			u="http://qa.games.yaotv.tvm.cn/Home/Order/index?source=61&yyyappid=wxd06496bae6bb4a78&yaotv_openid="+user.ttopenid+"&redirect_url="+encodeURIComponent(location.href)
		break
		case "":
		break
		}
		console.log(u)
	goto(u)
	}
function personalInfor(){
	location.href=(info_status===2?FOLDER+'/join_us/personalInfor.html?openid='+user.ttopenid+"&yyyid="+PAGE.yyyappid+"&yoid="+user.openid+'&headImg='+user.weixin_avatar_url+'&nickname='+user.nickname+'&phone='+user.phone+'&redirect='+encodeURIComponent(location.href):PMALL_LJ+'/auth/fanxian?page=profile'+SU())
	}
function SU(){
	return '&yyyappId='+PAGE.yyyappid+'&openId='+user.openid+'&sign='+user.sig+'&sigExpire='+user.sigExpire
	}	
