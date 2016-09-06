var search=getSearch()
	,reset=search["reset"]||""
	,type=search["type"]
	,names=search["name"]
	,href=location.href
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight
	,tjData={}
	,UA=navigator.userAgent.toLowerCase(),OSA=["windows","ipad","ipod","iphone","android"],OSL=OSA.length,OS="";
	createNode(DB,"link",{href:PAGE.COMMON+"jc/mywin.css?2",rel:"stylesheet",type:"text/css"},"p2");
	mainVar.kj=true;
	mainVar.newdata={data:[]};
	mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
	while(OS=OSA.shift())if(UA.indexOf(OS)>-1)break;
	var $=mainVar
	,user=mainVar.userInfo
	,sigCode=mainVar.userInfo.sigCode
	,tishiyu=''
	,jz=''
	,title_sty='';
	switch(type){
		case "GOOD":
			tishiyu="提示：请您在中奖后72小时内完成实物奖品领取，逾期视作放弃领奖，谢谢配合。";
		break
		case "CASH":
			tishiyu="提示：红包有效期为72小时，请您及时领取，过期无效不可领取。";
			jz='style="line-height:61px;"';
		break
		case "COUPONS":
			title_sty="padding:0;";
		break
	}
	$.title=createNode(DB,"div",{className:"title",html:tishiyu,style:title_sty},"p2");
	$.list=createNode($.title,"ul",{id:"JBbobo",className:"list"},"p4");
	$.loading=createNode(DB,"div",{className:"loading"},"p3");
	mainVar.Verification=createNode(DB,"div",{id:"Verification"},"p3");
	mainVar.newbg=createNode(DB,"div",{className:"newbg"},"p3");
	CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;
	initWX(PAGE.token,location);
	if(type=="COINEXCHANGE")$.title.style.display="none";
	var newWins=new winList([,function(data,a,b,c,d){
		mainVar.newscroll=[a,b,c,d];
		if(c==0)JBbobo.innerHTML=newpage(data.data,a,c,d,b);else createNode(JBbobo,"ol",{html:newpage(data.data,a,c,d,b)},"p3");
		if(JBbobo.scrollHeight>winH){DB.setAttribute('onscroll','popBox.scrolldo(this)');mainVar.scrolldom=DB;}
		function newpage(e,_,a,b,c){DO.title=names;
			var $='',cla='',l;
			if(e){
				l=e.length;
				if(l<b)mainVar.newpan=false;
				for(var i=0;i<e.length;i++){
					var Nums=a*b+i,$a=e[i],yl='',btt,zjsj,action,$s,jpsm='',_jpsm='',xshiwu='',hs=' yl',xs='',url,shiwul='',shiwuls='',wxstate=Number($a.wxstate),curl=$a.consume_url,$style='';
					if($a.type!=5)$for();
					function $for(){
						mainVar.newdata.data.push($a);
						switch($a.type){
							case 1:
								_="GOOD";
							break
							case 102:
								_="CASH";
							break
							default:
								_="COUPONS";
							break
						}
						switch(_){
							case "CASH":
								cla="hongbao";
								if(wxstate==1){yl='wxstate';btt='<div class="btt" action="lgj">已领取</div>';action="tctab(this)";xs=''}else{xs='xs';action="lingjiang.init(this)";btt='<div class="btt" onclick='+ action +'>领 取</div>';}
							break
							case "GOOD":
								cla="shiwu";
								var $ss;
								if($a.receiveInfo==undefined)$ss=0;else $ss=1;
								switch($ss){
									case 0:
										xs='xs';
										if($a.expireDay){
											var T=$a.datetime.split(' '),T1=T[0].split('-'),T2=T[1].split(':')
												,$d=new Date(Date.UTC(T1[0],T1[1]-1,T1[2],T2[0],T2[1],T2[2])).getTime()
												,_Day=new Date().getTime(),dnum,$dn=_Day-$d,$dnn=$dn/86400000,jgn;
											if($dnn<$a.expireDay-1){jgn=Math.floor($a.expireDay-$dnn);shiwuls='<span class="hd">未发货</span>';shiwul='</br><span class="chengde cd">剩余领取<span class="hds">'+jgn+'</span>天</span>';hs=" yl";action="lingjiang.init(this)";btt='<div class="btt" onclick='+ action +'>领 取</div>';}else{shiwul='</br><span class="chengde">已过期</span>';hs=" yl";yl='wxstate';btt='';}
										}else{shiwuls='<span class="hd">未发货</span>';action="lingjiang.init(this)";btt='<div class="btt" onclick='+ action +'>领 取</div>';}
									break
									case 1:
										btt='';xs='xs';
										if($a.courier){
											hs=" yl";action="lingjiang.init(this)";shiwuls='<span class="hd">已发货</span>';xshiwu='<span class="chengde">'+$a.courier.name+'单号：'+$a.courier.num+'</span>';
										}else{action="lingjiang.init(this)";shiwuls='<span class="hd">待发货</span>';}
										if(+$a.state==3){yl='wxstate';action="tctab(this)";shiwuls='<span class="hd">已签收</span>';if($a.courier)xshiwu='<span class="chengde">'+$a.courier.name+'单号：'+$a.courier.num+'</span>';else xshiwu='';}
									break
								}
							break
							case "COUPONS":
								cla="kaquan";xs='xs';
								switch($a.type){
									case 101:
										if(wxstate==1){yl='wxstate';btt='';}else{action="lingjiang.init(this)";btt='<div class="btt" onclick='+ action +'>领 取</div>';}
									break
									case 2:
										shiwul='</br><span class="chengde">卡密：'+$a.shoppingCard+'</span>';
										hs="yl";action="lingjiang.init(this)";
										if(!$a.link)btt='';else btt='<div class="btt" onclick='+ action +'>领 取</div>';
										if(curl){_jpsm='<label class="gainsm" onclick=goto('+ curl +')>购 买</label> ';}else _jpsm='';
									break
									default:
										action="lingjiang.init(this)";if(!$a.link)btt='';else btt='<div class="btt" onclick='+ action +'>领 取</div>';
										if(curl){
											var user=mainVar.userInfo
											//,$f=curl.indexOf('?')=="-1"?'?':'&'
											//,_urls=curl+$f+"pageToken="+PAGE.hosturl+"&wxToken="+PAGE.token+"&sign="+user.sig+"&code="+sigCode+"&openId="+user.openid+"&yyyappId="+PAGE.yyyappid+"&nickname="+user.nickname+"&weixin_avatar_url="+user.weixin_avatar_url;
											_jpsm='<label class="gainsm" onclick=goto("'+ curl +'")>购 买</label> ';
										}else _jpsm='';
									break
									
								}
							break
						}
						if(type=="COINEXCHANGE"){shiwuls='';zjsj="兑换";}else zjsj="中奖";
						if($a.type==4){
							if($a.gainUrl){url=$a.gainUrl;btt='<div class="btt" onclick=goto("'+ url +'")>查 看</div>';}else btt='';
						}else if($a.gainUrl){url=$a.gainUrl;jpsm="<em class='gainsm' onclick=goto('"+ url +"')>奖品说明</em> ";}else{
							jpsm='';
							if($a.type==2&&shiwul==''||$a.type==3&&_jpsm==''||$a.type==101||$a.type==102){
								jpsm==""?$style="style='line-height:60px;'":$style='';
							}
						}
						$s='<div class="jBwater" '+$style+'>'+$a.name+shiwuls+shiwul+'</div>';
						$+='<li id="tags2" class="'+ yl+hs +'"><div class="listt">'+zjsj+'时间：'+ $a.datetime+'</div><div class="listb" title="'+Nums+'"><img src="'+ $a.pic +'"><div class="pw">'+ $s+xshiwu+'</div>'+jpsm+_jpsm+btt+'</div></li>'
					}
				}
			};
			if(e.length==0&&JBbobo.innerHTML=='')return '<div class="noPrize">您还没有'+c+'奖品哦</div>';else return '<ol class="shiwu NLbox">'+$+'</ol>';
		};
	}
	,function(){
		$.loading.style.display="block";
	}
	,function(){
		$.loading.style.display="none";
	}])
	,Verifs=new saveVerif
	,popBox=new popBoxs(function(e,v){
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
	,lingjiang=new lingjiangs([function(){
		lingjiang.box.parentNode.querySelector('.hd').innerHTML="待发货";
		removeNode(lingjiang.box);
	}
	,function(){
		lingjiang.box.innerHTML="已领取";
	}
	,function(){
		removeNode(lingjiang.box);
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
			}else if(vl>15){
			tishi(CONFIG.chars.hjgy.b,{time:2000});return
			}
		if(tjHjgy == 1){
			tishi(CONFIG.chars.hjgy.c,{time:3000});return
			}
		tjHjgy=1;
		if(content){
			var desc='',$sw='';
			if($typ==102){
				var money=+data.money/100
				if(money==1)desc=CONFIG.chars.hjgy.h;
				else 
				desc=CONFIG.chars.hjgy.i+money+CONFIG.chars.hjgy.j;
			}
			if(mainVar.$isT==1)desc=CONFIG.chars.hjgy.k+$name+CONFIG.chars.hjgy.l;
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
				default:
					setTimeout(function(){goto(mainVar._urls)},1000);
				break
			}
			mainVar.$sw=$sw;
			mainVar.newlink=urlFolder()+"share.html";
			var posts={intolotterylist:dj,orderid:$orderId,yyyappid:PAGE.yyyappid,CommodityName:mainVar.shoppn,CommodityType:mainVar.shoppt,shareurl:mainVar.newlink,desc:desc,token:PAGE.token,topicid:PAGE.topicid,openid:user.openid,nickname:user.nickname,headimg:user.weixin_avatar_url,content:content,paiTimeUnix:mainVar.paiTimeUnix||0};
			lingjiang.speechDo(posts);
		}else{
			tishi(CONFIG.chars.hjgy.f)	
		}
	}
	,function(_data){
		if(_data.status=='1')tishi(CONFIG.chars.hjgy.d,{time:2000});
		if($typ==102||$typ==1){
			if(mainVar.$sw == "a"){lingjiang.getHongbao();popBox.popClose();}else lingjiang.form();
		}
		if($typ==101)if(mainVar.$sw == "a")popBox.popClose();
		tjHjgy=0;
	}]);
	newWins.listOne(type,name,0,20);
	
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
				case "goto":
					goto(a1,argument[2])
				break
				case "lingjiang":
					mainVar.globalVar=false;
					goLingjiang(ele,a1,argument[2],argument[3])
				break
				case "playagin":
					playagin(ele);
				break
				case "popClose":
					popBox.popClose();
				break
				case "popSave":
					lingjiang.popSave();
				break
				case "rule":		
					mainVar.globalVar=false;
					rule(ele,a1,argument[2],argument[3]);
				break
				case "lgj":
					tishi(CONFIG.chars.linjiang.f)
				break
				case "closetab":
					closetab();
				break
				case "linghongbao":
					getHongbao(ele,a1,argument[2])
				break
				case "hjgy":
					mainVar.globalVar=false;
					hjgy(ele,a1,argument[2],argument[3],argument[4])
				break
				case "carUp":
					carUp(ele,a1,argument[2],argument[3]);
				break
				case "getKaquan":
					getKaquan(a1)
				break
				case "goplay":
					goplay(argument[2])
				break
				case "newzs":
					newzs();
				break
				case "hqWin":
					dataDo(mainVar.newdata);
				break
				case "btn_speech":
					lingjiang.postspeech();
				break
				case "saveVerif":
					saveVerif(ele);
				break
				case "previous":
					getWinlist();
				break
		}
		}
	}	
	addEvent(DO,"touchstart",docAction);
