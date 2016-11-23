var search=getSearch()
	,reset=search["reset"]||""
	,shareHead=search["head"]
	,shareName=search["name"]
	,g=+search["item"]||0
	,href=location.href
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight
	,ylc={}
	,UA=navigator.userAgent.toLowerCase()
	,ST_user=localStorage.getItem("userInfo")
,userInfo=toObject(ST_user)||{}
	,CONFIG={
		gameCount:10,
		gameTime:300,
		spendMoney:100,
		shareInfo:{
			title:"红包摇不停！",
			ico:"http://qa.h5.mtq.tvm.cn/yao/sq_yyy/img/share_ico.png",
			link:"",
			desc:"正在玩红包摇不停，推荐你也来试试，现金红包任你领",
			token:"46497107fa23"
			},
		banner:{data:[
		{url:'img/banner1.jpg',link:'http://pmall.yaotv.tvm.cn/sales/dist/rank/index.html'}
			]}
		}
	,HOST={
AD:"//mb.mtq.tvm.cn",
ADJS:"//tvmdata.oss-cn-hangzhou.aliyuncs.com",
API:"//count.yaotv.tvm.cn",
APICDN:"//q-cdn.mtq.tvm.cn",
BALANCE:"//ttye.yaotv.tvm.cn",
CARD:"//pmall.yaotv.tvm.cn",
CJ:"//cj.mtq.tvm.cn",
DOMAIN:"//pmall.yaotv.tvm.cn",
DOMAIN2:"http://pmall.yaotv.tvm.cn",
DSP:"//dsp.yaotv.tvm.cn",
DSPJS:"//e-cdn.yaotv.tvm.cn",
FOLDER:"//a-h5.mtq.tvm.cn/yao",
GOLDCOIN:"//coin.yaotv.tvm.cn",
HJGY:"//wsq.yaotv.tvm.cn",
HUIYUAN:"//userapi.yaotv.tvm.cn/tvmyao/hz.html",
JBDH:"http://q.cdn.mtq.tvm.cn/adsmall/mobile/views/",
JIAGE:"//ad-cdn.yaotv.tvm.cn",
MALL:"mall.yaotv.tvm.cn",
MB:"//qc.yaotv.tvm.cn",
ORDER:"http://yaomall.tvm.cn/html/?q=deal/46497107fa23/0/order",
QQAPI:"//yaotv.qq.com/shake_tv/include/js/jsapi.js",
QQHB:"//wximg.gtimg.com/shake_tv/include/js/jsapi_hongbao.js",
QX:"//userapi.yaotv.tvm.cn",
RESOURCE:"//a-h5.mtq.tvm.cn/yao/common/",
RTS:"//rts-opa.yaotv.tvm.cn",
SC:"//ucj.yaotv.tvm.cn",
SJYZ:"//qsms.yaotv.tvm.cn",
SOCKET:"//yao-socket.yaotv.tvm.cn",
TJ:"//ana.mtq.tvm.cn",
TX:"//tf.yaotv.tvm.cn",
USERAPI:"//userapi.yaotv.tvm.cn",
WSQ:"//wsq.yaotv.tvm.cn",
WSQCDN:"//q-cdn.mtq.tvm.cn",
WSQDZP:"//wsq.yaotv.tvm.cn",
WSQTURN:"//wsq.yaotv.tvm.cn",
WXAPI:"//res.wx.qq.com/open/js/jweixin-1.0.0.js",
WXAPIS:"//apis.map.qq.com/ws/geocoder/v1/",
YAO:"//yaotv.tvm.cn"
},
PAGE={title:"摇一摇福利到",
token:"46497107fa23"
,yyyappid:"46497107fa23"
,channelId:"wxd06496bae6bb4a78"
}
,mainVar={userInfo:{openid:search.openid,nickname:search.nickname,sig:search.sig}}
,yePageIndex=0
,yePageSize=20
,user=mainVar.userInfo
mainVar.scrollkey2=true;
mainVar.iskey=30
;
toSQ({userInfo:userInfo,fun:function(){
	CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;
		var t=this;
		mainVar.list=createNode(DB,"ul",{id:"JBbobo",className:"list"},"p3");
		mainVar.loading=createNode(DB,"div",{className:"loading"},"p3");
		mainVar.mxlb=mxlb;
		mainVar.opp=true;
		function mxlb(l){var html='';
			for(var i=0;i<l.length;i++){
				var time=l[i].timeStr,integral=l[i].integral,description=l[i].description,sq,_class;
				if(integral<0){sq='扣减'+-integral+PAGE.unit;_class="on";}else{sq='获得'+integral+PAGE.unit;_class="";}
				html+='<li><font>'+description+'</font><p>'+time+'<span class="fr '+_class+'">'+sq+'</span></p></li>';
			}
			return html;
		}
		switch(g){
			case 0://余额明细
				DO.title='余额明细';
				CashD();
			break
			case 1://金币明细
				DO.title=PAGE.unit+'明细';
				Sbfun();
				mainVar.scrollfn=function(){
					if(!mainVar.scrollkey2){
						if($nu!=2)tishi(CONFIG.chars.scroll.a);
						DB.setAttribute('onscroll','');
						return false;
					}
					mainVar.loading.style.display="block";
					JBlist(mainVar.list,$nu,mainVar.iskey,'','',HOST.GOLDCOIN)
					$nu++;
				}
			break
			case 2://体现明细
				DO.title='提现明细';
				DB.classList.add('tixian');
				mainVar.head=createNode(mainVar.list,"div",{className:"header",html:'<img src="'+getHeads(user.weixin_avatar_url)+'"> <span>￥18.00</span> <font>累计提现</font>'},"p1");
				mainVar.list.innerHTML='<ol>\
					<li>3月<font>提现￥2.00</font></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">商城购物<p>2015/10/04 19:00:50</p><span>-20.00</span></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">余额提现锦囊<p>2015/10/04 19:00:50</p><span>-1.00</span></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">商城购物<p>2015/10/04 19:00:50</p><span>-123.00</span></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">余额提现锦囊<p>2015/10/04 19:00:50</p><span>-1.00</span></li>\
				</ol>\
				<ol>\
					<li>2月<font>提现￥2.00</font></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">商城购物<p>2015/10/04 19:00:50</p><span>-20.00</span></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">余额提现锦囊<p>2015/10/04 19:00:50</p><span>-1.00</span></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">商城购物<p>2015/10/04 19:00:50</p><span>-123.00</span></li>\
					<li><img src="'+getHeads(user.weixin_avatar_url)+'">余额提现锦囊<p>2015/10/04 19:00:50</p><span>-1.00</span></li>\
				</ol>';
			break
		}
		document.body.onscroll=scrollAction;
	}})	
	function getHeads($url){
		if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96"}
	}
	function scrollAction(){
		if(!mainVar.scrollRun){
		var t=document.body,h1=t.scrollHeight,h2=t.offsetHeight,h3=t.scrollTop
			if(h2+h3>h1-10){
				CashD()
			}
		}
	}
	function CashD(){
		mainVar.scrollRun=1
		var str=mainVar.loading.style;str.display="block";
		getYeList(function(e){
			var _$,html='',sq,gm,l;
			if(e.status=='failed'||(l==0&&mainVar.list.innerHTML=='')){
				mainVar.list.innerHTML='<div class="nomx">暂无明细</div>';
			}else{
				for(var i=0,_$=e.data;i<_$.length;i++){
					var _=_$[i],time=_.dateTime,type=_.action,name=_.note;
					if(type=="minus"){
						_class='on';
						sq='-'+money(_.spend);
						gm=""
					}else{
						_class='';
						sq='+'+money(_.addValue+_.sendValue);
						gm=""
					}
					html+='<li><p class="prizename">'+name+'</p><p>'+time+'<span class="fr '+_class+'"><font>'+gm+'</font>'+sq+'</span></p></li>';
				}
				str.display="none";
				createNode(mainVar.list,"ol",{html:html},"p3");
				mainVar.scrollRun=0
			}
		});
	}
	
	function money(m){return (m/100).toFixed(2);}
	
	//金币明细	
	function JBlist(_,b,c,d,a,f){
		if(c)_c=mainVar.isKey=c;
		var html='',num=1,userInfo=mainVar.userInfo,str=mainVar.loading.style
		,a1=setAjax("get",(f||HOST.MB) +"/point/integral/log/query?wxToken="+PAGE.yyyappid+"&openId="+userInfo.openid+"&page="+b+"&pagecount="+_c+"&sort=dateTime&source=");
		str.display="block";
		a1.callBack=function($data){
			var data=toObject($data),l=data.data;
			if(l.length==0){
				if(typeof a=="function")a();
			}else{
				if(mainVar.mxlb)html=mainVar.mxlb(l);
				if(b==1){
					_.innerHTML=html;
					scrolltop();
				}else createNode(_,"ol",{html:html},"p3");
			}
			if(l.length<_c&&b>0)mainVar.scrollkey2=false;
			str.display="none";
		};
		a1.err=function(){str.display="none";if(typeof a=="function")a();};
		a1.send();
	}
	
	//现金明细：
	function getYeList($fun){
		var Ca=setAjax("get",HOST.BALANCE+"/open/user/vclogs?openId="+userInfo.openid+"&code="+userInfo.tokenSig+"&yyyappId="+PAGE.yyyappid+'&sigExpire='+userInfo.sigExpire+'&channelid='+PAGE.channelId+"&page="+yePageIndex+"&pageSize="+yePageSize+'&cache='+Math.random());
		Ca.callBack=function($data){
			var data=toObject($data);
			yePageIndex++;
			isFun($fun,data);
		};
		Ca.err=function(){isFun($fun,{})};
		Ca.send();
	}
	function scrolltop(){setTimeout(function(){DB.scrollTop=0;},100)}
	
