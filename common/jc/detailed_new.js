var search=getSearch()
	,reset=search["reset"]||""
	,shareHead=search["head"]
	,shareName=search["name"]
	,g=+search["nu"]
	,href=location.href
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight
	,ylc=toObject(PAGE.sqMenu||"{}");
	
	mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
	createNode(DB,"link",{href:PAGE.COMMON+"jc/detailed_new.css?2",rel:"stylesheet",type:"text/css"},"p2");
	var $=mainVar
	,$nu=2,popBox,n=0
	,user=mainVar.userInfo
	,sigCode=mainVar.userInfo.sigCode;
	$.scrollkey2=true;
	$.iskey=30;
	if(ylc[2].noteText!="OFF"&&g)createNode(DB,"img",{src:"//a-h5.mtq.tvm.cn/yao/common/img/banner_jb.jpg",style:"width:100%;margin:0;border:0",onclick:'goUrl()'})
	pageinit();
	function goUrl(){
		location.href="http://games.yaotv.tvm.cn?addi="+JSON.stringify({"yaotv_openid":user.openid,"yyyappid":PAGE.yyyappid,"sign":user.sig,"sigExpire":user.sigExpire})
		}
	function pageinit(){CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;initWX(PAGE.token,location);
		var t=this;
		$.list=createNode(DB,"ul",{id:"JBbobo",className:"list"},"p3");
		$.loading=createNode(DB,"div",{className:"loading"},"p3");
		$.mxlb=mxlb;
		$.opp=true;
		popBox=new popBoxs(function(e,v){
			e.scrollTop=v-3;
			if($.loading.style.display!='block'){
				isFun($.scrollfn);
			}
		})
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
				$.scrollfn=function(){
					if($.opp)CashD();else{DB.setAttribute('onscroll','');if(n!=0)tishi(CONFIG.chars.scroll.a);}
				}
			break
			case 1://金币明细
				DO.title=PAGE.unit+'明细';
				Sbfun();
				$.scrollfn=function(){
					if(!$.scrollkey2){
						if($nu!=2)tishi(CONFIG.chars.scroll.a);
						DB.setAttribute('onscroll','');
						return false;
					}
					$.loading.style.display="block";
					JBlist($.list,$nu,$.iskey,'','',HOST.GOLDCOIN)
					$nu++;
				}
			break
			case 2://体现明细
				DO.title='提现明细';
				DB.classList.add('tixian');
				$.head=createNode($.list,"div",{className:"header",html:'<img src="'+getHeads(user.weixin_avatar_url)+'"> <span>￥18.00</span> <font>累计提现</font>'},"p1");
				$.list.innerHTML='<ol>\
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
		DB.setAttribute('onscroll','popBox.scrolldo(document.body)');
	}
	
	function getHeads($url){
		if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96";}
	}
	
	function Sbfun(){
		JBlist($.list,1,$.iskey,DB,function(){
			$.list.innerHTML='<div class="nomx">暂无明细</div>';
			DB.setAttribute('onscroll','');
		},HOST.GOLDCOIN);
	}
	
	function CashD(){
		var str=$.loading.style,len=20;str.display="block";
		CashDetails(function(e){var _$,html='',sq,gm,l;console.log(e)
			if(e.status!='failed'){_$=e.data;l=_$.length;}else{l=0;}
			if(e.status=='failed'||(l==0&&$.list.innerHTML=='')){
				$.list.innerHTML='<div class="nomx">暂无明细</div>';
				str.display="none";
				DB.setAttribute('onscroll','');
				return false;
			}
			for(var i=0;i<_$.length;i++){var _=_$[i],time=_.dateTime,type=_.action,name=_.note;
				if(type=="minus"){_class='on';sq='-'+money(_.spend);gm="";}else{_class='';sq='+'+money(_.addValue+_.sendValue);gm="";}
				html+='<li><p class="prizename">'+name+'</p><p>'+time+'<span class="fr '+_class+'"><font>'+gm+'</font>'+sq+'</span></p></li>';
			}
			str.display="none";
			if(n==1){
				$.list.innerHTML=html;
				scrolltop();
			}else createNode($.list,"ol",{html:html},"p3");
			if(_$.length<len&&n>1)$.opp=false;
		},n,len);
		n++;
	}
	function money(m){return (m/100).toFixed(2);}
	
	//金币明细	
	function JBlist(_,b,c,d,a,f){
		if(c)_c=$.isKey=c;
		var html='',num=1,userInfo=$.userInfo,str=$.loading.style
		,a1=setAjax("get",(f||HOST.MB) +"/point/integral/log/query?wxToken="+PAGE.yyyappid+"&openId="+userInfo.openid+"&page="+b+"&pagecount="+_c+"&sort=dateTime&source=");
		str.display="block";
		a1.callBack=function($data){
			var data=toObject($data),l=data.data;
			if(l.length==0){
				if(typeof a=="function")a();
			}else{
				if($.mxlb)html=$.mxlb(l);
				if(b==1){
					_.innerHTML=html;
					scrolltop();
				}else createNode(_,"ol",{html:html},"p3");
			}
			if(l.length<_c&&b>0)$.scrollkey2=false;
			str.display="none";
		};
		a1.err=function(){str.display="none";if(typeof a=="function")a();};
		a1.send();
	}
	
	//现金明细：
	function CashDetails(a,b,c){//HOST.CJ
		var userInfo=$.userInfo,Ca=setAjax("get",HOST.BALANCE+"/open/user/vclogs?openId="+userInfo.openid+"&code="+userInfo.sig+"&yyyappId="+PAGE.yyyappid+'&sigExpire='+userInfo.sigExpire+'&channelid='+PAGE.channelId+"&page="+b+"&pageSize="+c+'&cache='+Math.random());
		Ca.callBack=function($data){
			var data=toObject($data);
			if(typeof a=="function")a(data);
		};
		Ca.err=function(){data={data:[]};if(typeof a=="function")a(data);};
		Ca.send();
	}
	
	function scrolltop(){setTimeout(function(){DB.scrollTop=0;},100)}