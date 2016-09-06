var search=getSearch()
	,reset=search["reset"]||""
	,shareHead=search["head"]
	,shareName=search["name"]
	,g=search["nu"]
	,href=location.href
	,DO=document
	,DB=DO.body
	,winW=window.innerWidth
	,winH=window.innerHeight;
	
	mainVar.scrollkey2=true;
	mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
	createNode(DB,"link",{href:PAGE.COMMON+"jc/detailed_new.css?2",rel:"stylesheet",type:"text/css"},"p2");
	var $=mainVar
	,$nu=2,popBox,n=0
	,cash=+PAGE.cash
	,user=mainVar.userInfo
	,sigCode=mainVar.userInfo.sigCode;
	pageinit();
	function pageinit(){CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;initWX(PAGE.token,location);
		var t=this;DO.title="个人中心";
		if(cash!=0){
			$.tab=createNode(DB,"div",{className:"tab",html:'<span class="tab1 on" onclick="tabDo(this)">余额明细</span><span class="tab2" onclick="tabDo(this)">'+PAGE.unit+'明细</span>'},"p2");
			mainVar.xj="xj";
			DB.className="moneybox";
			DB.setAttribute('onscroll','popBox.scrolldo(document.body)');
		}else $.tab=createNode(DB,"div",{className:"tab",html:'<span class="tab2" style="width:100%;">'+PAGE.unit+'明细</span>'},"p2");
		$.list=createNode(DB,"ul",{id:"JBbobo",className:"list"},"p3");
		$.loading=createNode(DB,"div",{className:"loading"},"p3");
		if(g==1)DO.querySelector('.tab2').onclick()
		mygodnum(function(_){
			var $a,_$=_.data;
			if(_.status="success"){
				if(_$.totalIntegral==0)$a=0;else $a=_$.totalIntegral;
			}else $a=0;
			mainVar.gnl=createNode($.tab,"div",{className:"gnum",html:"累计获得"+PAGE.unit+":  "+$a},"p3");
		});
		mainVar.mxlb=mxlb;
		mainVar.opp=true;
		popBox=new popBoxs(function(e,v){
			e.scrollTop=v-3;
			if($.loading.style.display != 'block'){
				if(mainVar.xj=="xj"){
					if(mainVar.opp)CashD();else tishi(CONFIG.chars.scroll.a);
				}else{
					if(!mainVar.scrollkey2){
						tishi(CONFIG.chars.scroll.a);
						return false;
					}
					$.loading.style.display="block";
					JBlist($.list,$nu)
					$nu++;
				}
			}
		})
		function mxlb(l){var html='';
			for(var i=0;i<l.length;i++){
				var time=l[i].timeStr,integral=l[i].integral,description=l[i].description,sq,_class;
				if(integral<0){sq='扣减'+ -integral +PAGE.unit;_class="";}else{sq='获得'+integral+PAGE.unit;_class="on";}
				html+='<li><p>'+time+'<span class="fr '+_class+'">'+sq+'</span></p>'+description+'</li>';
			}
			return html;
		}
		if(cash!=0&&!g)CashD();else Sbfun();
	}
	
	function tabDo(e){
		var a=e.className.split(' '),b=a[1]=='on',c=a[0];
		if(b)return false;else{
			JBbobo.innerHTML='';
			e.className+=' on';
			switch(c){
				case "tab1":
					e.nextSibling.className="tab2";
					DB.className="moneybox";
					mainVar.xj="xj";
					mainVar.opp=true;
					CashD();
					$nu=2;
				break
				default:
					e.previousSibling.className="tab1";
					DB.className="";
					mainVar.xj="";
					mainVar.scrollkey2=true;
					Sbfun();
					n=0;
				break
			}
		}
	}
	
	function Sbfun(){
		JBlist($.list,1,30,DB,function(){
			$.list.innerHTML='<div class="nomx">暂无明细</div>';
			DB.setAttribute('onscroll','');
		});
	}
	
	function CashD(){var str=mainVar.loading.style,len=20;str.display="block";
		CashDetails(function(e){var $,html='',sq,gm,l;
			if(e.status!='failed'){$=e.data;l=$.length;}else{l=0;}
			if(e.status=='failed'||(l==0&&mainVar.list.innerHTML=='')){
				mainVar.list.innerHTML='<div class="nomx">暂无明细</div>';
				str.display="none";
				DB.setAttribute('onscroll','');
				return false;
			}
			for(var i=0;i<$.length;i++){var _=$[i],time=_.dateTime,type=_.action,name=_.note;
				if(type=="minus"){_class='';sq='-'+money(_.spend);gm="支付";}else{_class='on';sq='+'+money(_.addValue+_.sendValue);gm="获得";}
				html+='<li><p>'+time+'<span class="fr '+_class+'"><font>'+gm+'</font>'+sq+'</span></p><p class="prizename">'+name+'</p></li>';
			}
			str.display="none";
			if(n==1){
				mainVar.list.innerHTML=html;
			}else createNode(mainVar.list,"ol",{html:html},"p3");
			if($.length<len){tishi(CONFIG.chars.scroll.a);mainVar.opp=false;}
		},n,len);
		n++;
	}
	function money(m){return (m/100).toFixed(2);}