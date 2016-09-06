var search=getSearch()
	,reset=search["reset"]||""
	,href=location.href
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight
	,tjData={}
	,sigCode;
	if(setStorage("get","userInfo"))mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
	createNode(DB,"link",{href:PAGE.COMMON+"jc/home_new.css?2",rel:"stylesheet",type:"text/css"},"p2");
	var $=mainVar
	,hasJB=+PAGE.hasJB
	,user=mainVar.userInfo,sigCode,nickname
	if(!user)noUser();
	HOST.JBDH='http://q.cdn.mtq.tvm.cn/adsmall/qamobile/views/';
	nickname=decodeURIComponent(user.nickname)
	sigCode=mainVar.userInfo.sigCode;
	newWins=new winList([function(e){//class="hidden";  元素隐藏
		if(hasJB!=0){
			mygodnum(function(_){
				var $h,$a,$=_.data;
				if(_.status="success"){
					if($.integral==0)$h=0;else $h=$.integral;
					if($.totalIntegral==0)$a=0;else $a=$.totalIntegral;
				}else{$h=0;$a=0;}
				mygod.innerHTML=$h;
				mygod2.innerHTML=$a;
			});
			_mypaihang(function(_){
				var ranking=_.ranking,coin=_.coin;
				if(coin != null)mygod3.innerHTML=coin; else mygod3.innerHTML='--';
				if(ranking != null)mygod4.innerHTML=ranking; else mygod4.innerHTML='--';
			});
		}
		
		setdingdan(function(_){
			if(_.status=='success'){
				var d=_.data,darr=['waitPay','waitSend','delivered','finish'],dd=HOST.JBDH+'my-order.html?pageToken='+PAGE.hosturl+'&channel_id='+PAGE.channelId+'&wxToken='+PAGE.token+'&sign='+user.sig+'&code='+sigCode+'&openId='+user.openid+'&yyyappId='+PAGE.yyyappid+'&nickname='+user.nickname+'&weixin_avatar_url='+user.weixin_avatar_url+'&sigExpire='+user.sigExpire;
				for(var i=0;i<darr.length;i++)dingdan.innerHTML+=setHtml(darr[i]);
				function setHtml($dd){var hh='',_n='',lj='',$w='25%';
					switch($dd){
						case 'finish':hh='已完成';_n=d.finish;lj='&tab=4';break
						case 'waitPay':hh='待付款';_n=d.waitPay;lj='&tab=1';break
						case 'waitSend':hh='待发货';_n=d.waitSend;lj='&tab=2';break
						case 'delivered':hh='待收货';_n=d.delivered;lj='&tab=3';break
					}
					return '<li style="width:'+$w+'" onclick=goto("'+dd+lj+'")>'+hh+'<br><font>'+_n+'</font></li>';
				}
			}
		})
		
		myWin.innerHTML=page();
		function page(){var html='',l=e.length,$w=100/l+"%";
			for(var i=0;i<l;i++){var a=e[i],t=a.type,n=a.name,c,$num,action='goto("mywin.html?type='+t+'&name='+n+'&sigCode='+sigCode+'")';
				if(a.num!=-1&&a.num!=null)$num=a.num;else $num='';
				switch(t){
					case "CASH":
						c="hb";
					break
					case "GOOD":
						c="sw";
					break
					case "COUPONS":
						c="kq";
						$num='<span>及其他</span>'
					break
				};
				html+='<li class="'+c+'" style="width:'+$w+'" onclick='+action+'>'+n+'<br><font>'+$num+'</font></li>';
			}
			return html;
		}
		CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;
		initWX(PAGE.token,location);
	},,,function(){
		//pageinit(user,nickname);
	}]);
	pageinit(user,nickname);
	newWins.init();
	
	tjData.page="我的金币";
	tjData.title="我的金币页面";
	tjData.paiTimeUnix='';
	goldTJ(100000)
	
	function pageinit(user,nickname){
		DO.title="个人中心";//topg
		$.banner=createNode(DB,"div",{className:"banner",style:"background-image:url('"+PAGE.COMMON+"img/home_banner.jpg');",html://'<img class="bannerBG" style="min-width:'+winW+'px;" src="img/home_banner.jpg">'+
		'<span class="userspan"><img class="userimg" src="'+ getHeads(user.weixin_avatar_url) +'"></span><br><span class="username">'+nickname+'</span><span class="gowri" onclick=goto("information.html") style="display:none;">编辑个人资料</span>'},"p2");
		var htmls='',dname;
		if(+PAGE.cash!=0)dname='';else dname='hsmoney';
		if(hasJB!=0)htmls+='<li class="Wallet lis" onclick=goto("Detailed.html")><span>我的钱包</span><a href="#">明细  &nbsp;&nbsp;></a></li>'+
		'<li class="Walletm lis '+dname+'">'+
			'<p><font>余额账户</font><span id="yms" onclick=goto("Detailed.html")></span><label onclick=goto("'+HOST.CARD+'/auth/recharge?yyyappId='+PAGE.yyyappid+'&wxToken='+PAGE.token+'&channelId='+PAGE.channelId+'")>充值</label></p>'+
			'<ol class="lis">'+
				'<li>我的'+PAGE.unit+'<br><font id="mygod">0</font></li>'+
				'<li>累计'+PAGE.unit+'<br><font id="mygod2">0</font></li>'+
				'<li>今日获得<br><font id="mygod3">--</font></li>'+
				'<li onclick=goto("share.html?tab=2&openid='+user.openid+'&nickname='+nickname+'&avast='+user.weixin_avatar_url+'")>今日排行<br><font id="mygod4">--</font></li>'+
			'</ol>'+
		'</li>';
		htmls+='<li class="Win lis"><span>我的奖品</span><a style="display:none;">全部  &nbsp;&nbsp;></a></li>'+
		'<ol class="myWin lis" id="myWin"></ol>';
		if(hasJB!=0)htmls+='<li class="dingdan lis" onclick=goto("'+HOST.JBDH+'my-order.html?pageToken='+PAGE.hosturl+'&channel_id='+PAGE.channelId+'&wxToken='+PAGE.token+'&sign='+user.sig+'&code='+sigCode+'&openId='+user.openid+'&yyyappId='+PAGE.yyyappid+'&nickname='+user.nickname+'&weixin_avatar_url='+user.weixin_avatar_url+'&sigExpire='+user.sigExpire+'&tab=0")><span>我的订单</span><a href="#">查看全部订单  &nbsp;&nbsp;></a></li>'+
		'<ol class="myWin lis" id="dingdan"></ol>';
		htmls+='<li class="Post lis hidden"><span>我的帖子 (<span>23</span>)</span><a href="#"><font class="red">●</font> 有新回复  &nbsp;&nbsp;></a></li>'+
		'<li class="news hidden lis"><span>我的消息 (<span>83</span>)</span><a href="#"><font class="red">●</font> 有新消息  &nbsp;&nbsp;></a></li>'
		if(hasJB!=0)htmls+=//'<li class="myOrder lis" action="goto.,'+HOST.JBDH+'my-order.html?pageToken='+PAGE.hosturl+'&channel_id='+PAGE.channelId+'&wxToken='+PAGE.token+'&sign='+user.sig+'&code='+sigCode+'&openId='+user.openid+'&yyyappId='+PAGE.yyyappid+'&nickname='+user.nickname+'&weixin_avatar_url='+user.weixin_avatar_url+'"><span>我的订单</span><a href="javascript:;">查看全部订单！  &nbsp;&nbsp;></a></li>'+
		'<li class="Award lis" onclick=goto("coin.html?token='+ PAGE.token + '&instanceId='+ PAGE.countInstanceid + '&openid='+ user.openid + '&sig='+ user.sig + '&sigCode='+ sigCode + '&yyyappid='+ PAGE.yyyappid +'&nickname='+nickname+'&headimg='+user.weixin_avatar_url+'")><span>金币商城</span><a href="#">超多好货，等你来拿  &nbsp;&nbsp;></a></li>'+
		'<li class="work hidden lis" onclick=goUrl("rwzq")><span>任务中心</span><a href="#">做任务，赚'+PAGE.unit+'  &nbsp;&nbsp;></a></li>'+
		'<li class="viptq hidden lis"><span>VIP特权（8）</span><a href="#">查看我的特权  &nbsp;&nbsp;></a></li>'
		$.list=createNode($.banner,"ul",{className:"list",html:htmls},"p4");
		yue(function(_){
			var _=toObject(_);
			if(_.status=="success")yms.innerHTML='￥'+(_.body.virtualCurrency/100).toFixed(2);
			else yms.innerHTML='￥0.00';
		})
		/*var li=$.list.querySelectorAll('.lis'),hi=$.list.querySelectorAll('.hidden'),len=li.length,ln=0;
		setTimeout(function(){
			var tr=setInterval(function(){var $l=li[ln],$f=$.list.querySelectorAll('.leftg').length;
				console.log(len,hi.length,ln);
				console.log($l,$l.className.indexOf('hidden'),$f)
				if((len-hi.length)!=$f){
					if($l.className.indexOf('hidden')==-1)$l.className+=' leftg';
					ln++;
				}else clearInterval(tr);
			},60);
		},1200)*/
	}
	
	function getHeads($url){
		if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96";}
	}
	
	function docAction(e){
		var ele=e.srcElement||e.target,_action="action",attribute,argument;	
		do{
			if(ele.nodeType!==1)break
			if(attribute=ele.getAttribute(_action))break			
		}while(ele=ele.parentNode)	
		if(attribute){										
			argu=attribute.split(".,");
			switch(argu[0]){
				case "goto":
					goto(argu[1],argu[2])
				break
			}
		}
	}	
	addEvent(DO,"touchstart",docAction);
	
	function goto(url){top.location.href=url;DB.className="hidden";}
	
	function yue($fun){
		var a=setAjax('get',HOST.CJ+'/open/user/virtualcurrency?openId='+user.openid+"&code="+user.sig+"&yyyappId="+PAGE.yyyappid+'&sigExpire='+user.sigExpire+'&channelid='+PAGE.channelId+'&cache='+Math.random());		
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