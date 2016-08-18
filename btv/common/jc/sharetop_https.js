if(setStorage("get","userInfo"))mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
var search=getSearch()
    ,pg_type=search["type"]//'':'dajiang'
    ,href=location.href
    ,DO=document
    ,DB=DO.body
	,tjData={}
	,$=mainVar
	,user=$.userInfo
/*
*红包接口*
*
http://qa-wsq.mtq.tvm.cn/wtopic/jssdk/{token}_hongbao.js
*
*大奖接口*
*
http://qa-wsq.mtq.tvm.cn/wtopic/jssdk/{token}_dajiang.js
*/
setPage();
function setPage(){
	var boxName,banner;
	createNode(DB,"link",{href:PAGE.COMMON+"jc/share.css?2",rel:"stylesheet",type:"text/css"},"p2");
	$.loading=createNode(DB,"div",{className:"loading"},"p3");
	
	switch(pg_type){
		case 'dajiang':
			DO.title="大奖时刻榜单";
			DB.style['background']='#e9242e';
			boxName='djsk';
			banner=PAGE.COMMON+'img/dajiang_bg.jpg';
		break
		default:
			DO.title="幸运榜单";
			DB.style['background']='#c04d3b';
			boxName='main';
			banner=PAGE.COMMON+'img/share_list_banner.png';
		break
	}
	createNode(DB,"div",{id:boxName,className:boxName,html:'<div class="head">\
		<img src="'+banner+'">\
	</div>\
	<div class="box">\
		<ul class="list" id="listbox"></ul>\
	</div>'},"p3");
	
	setList();
	
	CONFIG.shareInfo.link+="?a="+user.nickname+"&b="+user.weixin_avatar_url;
	initWX(PAGE.token,location);
}

function setList(){
	var _load=$.loading.style,ajax;
	_load['display']='block';
	if(!pg_type)
		ajax=setAjax('get',HOST.WSQCDN+'/wtopic/jssdk/'+PAGE.token+'_yedajiang.js?cache='+(+new Date));
	else
		ajax=setAjax('get',HOST.WSQCDN+'/wtopic/jssdk/'+PAGE.token+'_dajiang.js?cache='+(+new Date));
	
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
		var html=''
		,now=+new Date
		,$arr=formatTime("Y-M-D-h-m-s",now).split('-')
		,yy=$arr[0],mm=$arr[1],dd=$arr[2]
		,todayend=+new Date(yy+'/'+mm+'/'+dd+' 23:59:59')
		,st=todayend*1000-now;
		
		function mfl(e){return Math.floor(e);}
		if(list){
			for(var i=0,li;i<list.length;i++){
				var li=list[i],type=+li.type,money;console.log(type)
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
							if(type==104){
								//if(type==104)
									money=li.money+'元';
								//else money=li.money+"元现金红包";
								hfn();
							}
						break
					}
					function hfn(){
						var hitime=+li.create_timestamp,_=now-hitime,_time='',bool=(st+_)<86400000;
						if(_<=60000)_time='刚刚';
						else if(bool){
							if(_<3600000)_time=mfl(_/60000)+'分钟前';
							else _time=mfl(_/3600000)+'小时前';
						}else _time=li.update_time;
						html+='<li>\
							<img src="'+getHead(li.headimg)+'">\
							<p><font>'+li.nickname+'</font><span class="country"></span><span class="red right">'+(type==104?'拆开余额提现锦囊':'领走了')+money+'</span></p>\
							<p><span class="desc">'+li.content+'</span><span class="right">'+_time+'</span></p>\
						</li>';
					}
				}
			}
			return html||'<p class="quesheng">暂时没有榜单</p>';
		}
	}
		
	function sethtml(a,b){a.innerHTML=b;a.classList.add('load2');_load['display']='none';}
}