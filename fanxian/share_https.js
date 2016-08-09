if(setStorage("get","userInfo"))mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
var search=getSearch()
    ,pg_type=search["type"]//'':'dajiang'
    ,href=location.href
    ,DO=document
    ,DB=DO.body
	,winH=window.innerHeight
	,tjData={}
	,$=mainVar
	,user=$.userInfo
	,_load,timeCount
	,listIndex=0;
	if(!user)noUser();
/*
*红包接口*
*
http://qa-wsq.mtq.tvm.cn/wtopic/jssdk/{token}_hongbao.js
*
*大奖接口*
*
http://qa-wsq.mtq.tvm.cn/wtopic/jssdk/{token}_dajiang.js
*
新大奖榜
http://qa-wsq.mtq.tvm.cn/wtopic/jssdk/{token}_tongji.js
*
现金红包榜
http://qa-wsq.mtq.tvm.cn/wtopic/jssdk/{token}_money.js
*/

setPage();
function setPage(){
	var boxName,banner,html;
	createNode(DB,"link",{href:PAGE.COMMON+"jc/share.css?2",rel:"stylesheet",type:"text/css"},"p2");
	$.loading=createNode(DB,"div",{className:"loading"},"p3");
	_load=$.loading.style;
	timeCount=new contrast_time
	
	switch(pg_type){
		case 'dajiang':
			DO.title="大奖时刻榜";
			boxName='djsk';
			banner=PAGE.COMMON+'img/dajiang_bg.jpg';
		break
		case 'dajiangsk':
			DO.title="大奖时刻";
			DB.style['background']='#fff';
			boxName='newdjsk';
			banner=PAGE.COMMON+'img/djbd_banner.jpg';
		break
		case "money":
			DO.title="现金红包榜";
			boxName='main1';
			banner=PAGE.COMMON+'img/share_list_banner.jpg';
		break
		default:
			DO.title="幸运榜单";
			DB.style['background']='#c04d3b';
			boxName='main';
			banner=PAGE.COMMON+'img/share_list_banner.png';
		break
	}
	switch(pg_type){
		case 'dajiangsk':
			html='<div class="head">\
				<img src="'+banner+'" id="banner">\
			</div>';
			setDjsk();
		break
		default:
			html='<div class="head">\
				<img src="'+banner+'" id="banner">\
			</div>\
			<div class="box"><label class="shareTag">余额大锦囊幸运榜</label>\
				<ul class="list" id="listbox"></ul>\
			</div>\
			<div class="box"><label class="shareTag">购物返现榜</label>\
				<ul class="list" id="fxbox"></ul>\
			</div>';
			setList();
		break
	}
	createNode(DB,"div",{id:boxName,className:boxName,html:html},"p3");
	CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;
	initWX(PAGE.token,location);
}

function setDjsk(){
	var html='',mascot=PAGE.mascot;
	_load['display']='block';
	var tj=setAjax('get',seturl("tongji"));
	tj.callBack=function($data){
		var data=toObject($data),lists=data.data;
		if(!lists)lists=[];
		for(var i=0;i<lists.length;i++){
			var d=lists[i];
			for(var j=0;j<d.length;j++){
				var _j=d[j],t=_j.create_time.split(' ')[1].split(':'),w=_j.prize,_user=_j.prizeUser,content=_j.contentUser,create_time=_j.create_time.replace(/-/gi,'/');
				html+='<div class="djsk_box"><img class="djsk_jxw" src="'+mascot.img+'">\
					<span class="jxw_name">'+mascot.name+'</span>\
					<p class="djsk_text">哇，'+((_j.type==1||_j.type==102)?'太激动了':'超赞')+'！'+t[0]+':'+t[1]+'分互动大奖揭晓啦，恭喜幸运观众'+setdata(_user,'nickname').join('、')+'，获得'+(_j.type==102?'现金红包'+_j.money+'元':w)+'。<img src="'+PAGE.COMMON+'img/hands.jpg"><img src="'+PAGE.COMMON+'img/hands.jpg"><img src="'+PAGE.COMMON+'img/hands.jpg"></p>\
					<div class="djsk_pic"><img src="'+_j.prizeimg+'"></div>\
					<p class="djsk_timebox"><span class="djsk_time">'+timeCount.fn(+new Date(create_time),create_time)+'</span></p>';
					if(_user.length>0){
						html+='<div class="djsk_huibg">';
						var us=setdata(_user,'headimg');
						us.length=_user.length;
						us=us.join(' ');
						html+='<p class="djsk_photo"><span class="zjyh">中奖用户</span>'+us+' <font class="djsk_listshow djsk_time">共'+_user.length+'人中奖</font></p>';
						if(content.length>0){
							html+='<ol class="djsk_xiangqing">\
								<li class="djsk_hjgy"><a name="ckgd'+(++listIndex)+'">获奖感言</a></li>'+setContent(content)+'</ol>';
							if(content.length>4)html+='<p class="xiangqing_key"><a onclick="showleft(this,'+listIndex+')">查看更多感言</a></p>';
						}
						html+='</div>';
					}
				html+='</div>';
			}
		}
		function setContent(_){
			var hh='';
			for(var i=0;i<_.length;i++){var t=_[i].update_time.replace(/-/gi,'/');
				hh+='<li class="testYY"><img src="'+getHeads(_[i].headimg)+'" onerror="imgErr(this)"><span class="YYname">'+_[i].nickname+'</span><span class="YYtime djsk_time">'+timeCount.fn(+new Date(t),t)+'</span><p>'+_[i].content+'</p></li>';
			}
			return hh;
		}
		function setdata(_,b){
			var pArr=[];
			for(var i=0;i<_.length;i++){
				b!='headimg'?pArr.push(_[i][b]):pArr.push('<img src="'+getHeads(_[i][b])+'" onerror="imgErr(this)">');
			}
			return pArr;
		}
		sethtml(newdjsk,html||'<p class="djskquesheng">暂时没有榜单</p>',true);
	};
	tj.err=function(){
		sethtml(newdjsk,'<p class="djskquesheng">服务器超时，请稍候再试。。。</p>',true);
	}
	tj.send();
}

function setList(){
	var ajax;
	_load['display']='block';
	switch(pg_type){
	case 'dajiang':
		ajax=setAjax('get',seturl("dajiang"));
	break
	case 'money':
		ajax=setAjax('get',seturl("yedajiang"));
		yuefn();
	break
	default:
		ajax=setAjax('get',seturl("hongbao"));
	break
	}	
	function yuefn(){
		var yue=setAjax('get',seturl("yue"));
		yue.callBack=function($data){
			var data=toObject($data),lists=data.data;
			if(!lists)lists=[];
			sethtml(fxbox,create(lists));
		};
		yue.err=function(){
			sethtml(fxbox,'<p class="quesheng">服务器超时，请稍候再试。。。</p>');
		}
		yue.send();
	}	
    ajax.callBack=function($data){
		var data=toObject($data),lists=data.data;
		if(!lists)lists=[];
		if(!pg_type){
			var lists=data.lotteryData.concat(lists);
			lists.sort(function(a,b){
				return b['create_timestamp']-a['create_timestamp'];
			});
		}
		sethtml(listbox,create(lists));
    };
	ajax.err=function(){
		sethtml(listbox,'<p class="quesheng">服务器超时，请稍候再试。。。</p>');
	}
    ajax.send();
	
	function create(list){
		var html='';
		if(list){
			for(var i=0,li;i<list.length;i++){
				var li=list[i],type=+li.type,money;
				if(li.nickname){
					switch(pg_type){
						case 'dajiang':
							if(type!=103){
								if(type==102||type==108)
									money=li.money+(type==108?"元余额红包":"元现金红包");
								else money=li.prize;
								hfn();
							}
						break
						default:
							switch(type){
								case 102:case 103:
									money=li.money+"元现金红包";
									hfn();
								break
								case 6:case 7:case 104:
									money=li.money+'元';
									hfn();
								break
							}
						break
					}
					function hfn(){
						var _time='',_left,hitime=+li.create_timestamp;
						switch(type){
							case 104:_left='拆开领走';break
							case 6:_left='返现';li.content='投资网信理财';break
							case 7:_left='返';li.content='商城购物';break
							default:_left='领走了';break
						}
						html+='<li>\
							<img src="'+getHead(li.headimg)+'" onerror="imgErr(this)">\
							<p><font>'+li.nickname+'</font><span class="country"></span><span class="red right">'+_left+money+'</span></p>\
							<p><span class="desc">'+li.content+'</span><span class="right">'+timeCount.fn(hitime,li.update_time)+'</span></p>\
						</li>';
					}
				}
			}
			return html||'<p class="quesheng">暂时没有榜单</p>';
		}
	}
}
function sethtml(a,b,c){
	c?createNode(a,"div",{id:'djlist',className:'djlist',html:b},"p3"):(a.innerHTML=b);
	a.classList.add('load2');
	_load['display']='none';
	if(pg_type=='money'){
		var yuh=53*5;
		listbox.parentNode.style['height']=yuh+'px';
		listbox.style['height']=(yuh-20)+'px';
	}
}
function seturl(_){return HOST.WSQCDN+'/wtopic/jssdk/'+PAGE.token+'_'+_+'.js?cha='+(+new Date);}
function contrast_time(){
	var t=this
	,now=+new Date
	,arr=formatTime("Y-M-D-h-m-s",now).split('-')
	,yy=arr[0]
	,mm=arr[1]
	,dd=arr[2]
	,todayend=+new Date(yy+'/'+mm+'/'+dd+' 23:59:59') //计算当前结束时间时间戳
	,st=todayend-now;  //计算当天当前时间到当天完时间长
	t.fn=function(a,b){
		var _=now-a,bool=(st+_)<86400000;
		if(_<=60000)return '刚刚';
		else if(bool){
			if(_<3600000)return t.mfl(_/60000)+'分钟前';
			else return t.mfl(_/3600000)+'小时前';
		}else return b;
	}
	t.mfl=function(e){return Math.floor(e);}
}
function showleft(e,i){
	var ps=e.parentNode,pp=e.parentNode.previousElementSibling;
	if(e.textContent==="关闭更多感言"){
		pp.classList.remove('shows');
		e.textContent="查看更多感言"
		//location.hash="ckgd"+i
		}else{
		pp.classList.add('shows');
		e.textContent="关闭更多感言"
		//location.hash="00"
		}
}
function getHeads($url){
	if($url)if($url.indexOf("default")>-1){return $url}else{return $url.indexOf("tvm")>-1?$url:decodeURIComponent($url).replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/96";}
}
function imgErr(e){e.src=PAGE.COMMON+'img/user.gif';}