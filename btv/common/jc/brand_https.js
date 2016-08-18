/*---默认数据---*/
var DO=document,DB=DO.body;
mainVar.shareInfo= {
		title: "718来摇吧！BTV生活邀您一起疯狂抽大奖",
		imgUrl: "http://q.cdn.mtq.tvm.cn/general/uploads/tvm2fabf1ff49f91c72/55a91c9d4ae5e14a2b7177a0/0d12ec0d61a7570d661fad673b0f6472.jpg",
		link:"",
		desc:"7.18来摇吧！现金大奖等着你，呼朋唤友抢红包啦",
		fakeid:"",
		trigger: function (res) {
		}//用户点击发送给朋友;
		,
		success: function (res) {
		}//已分享;
		,
		cancel: function (res) {
		}//已取消'
		,
		fail: function (res) {
		}//失败
	}
mainVar.pageInfo={title:"摇一下爽一夏",logo: "img/logo.png",footer:"TVM天脉聚源提供技术支持"}
mainVar.userInfo={}
/*---获取用户信息---*/
if(setStorage("get","userInfo")){
	mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
}
var search=getSearch(),activeId=search['did']||"561c8c98145e11e71b65921b",tjData={},href='';
function init(data){
	var topBannerImg='',str='',elem='',goods='',basicInfo={},brandInfo=[];
	document.body.style.background='none';
	basicInfo=data.basic;
	brandInfo=data.brand;
	/*if(brandInfo.length==1){
		goods=brandInfo[0];
		var source=document.referrer;
		if(source){
			console.log(document.referrer)
			if(source.indexOf('scratchCard.html')!=-1){
				location.href='coin.html'+source.substring(source.indexOf('?'));
			}else{
				location.href='scratchCard.html?activeId='+data._id+'&brandId='+goods.brandId+'&needScore='+goods.needScore+'&sigCode='+sigCode;
			};
		};
	};*/
	/*---页面标题---*/
	if(basicInfo.activeName){
		mainVar.pageInfo.title=basicInfo.activeName;
	};
	document.title=basicInfo.activeName;
	
	/*---页面主体数据---*/
	var cells=3;//一行3列；
	var viewWidth=document.documentElement.clientWidth;
	var ceilWidth=Math.ceil(viewWidth/cells);
	var AllbrandId='';
	if(brandInfo.length){
		brandInfo.sort(function(a,b){
			return a['order']-b['order'];
		});
		var cssStyle='height:'+ceilWidth*(0.8)+'px;width:'+ceilWidth+'px;';
		for(var i=0,len=brandInfo.length;i<len;i++){
			elem='';
			if(!(i%cells)){
				elem='<tr>';
			};
			goods=brandInfo[i];
			AllbrandId+=goods.brandId+',';
			str+=elem+'<td style="'+cssStyle+'"><a style="'+cssStyle+'" href="scratchCard.html?activeId='+data._id+'&brandId='+goods.brandId+'&needScore='+goods.needScore+'" style="line-height:'+ceilWidth*(0.8)+'px;"><img src="'+goods.logoImg+'"></a></td>';
			/*if(goods.url){
				str+=elem+'<td style="'+cssStyle+'"><a href="scratchCard.html?id='+data._id+'&brandId='+goods.brandId+'&needScore='+goods.needScore+'" style="line-height:'+ceilWidth*(0.8)+'px;"><img src="'+goods.logoImg+'"></a></td>';
			}else{
				str+=elem+'<td style="'+cssStyle+'"><p><img src="'+goods.logoImg+'"><span>即将开启</span><em></em></p></td>';
			};*/
		};
		//当格子没满之时，补充剩余格子
		if(len%cells!=0){
			var size=cells-len%cells;
			for(var i=0;i<size;i++){
				str+='<td style="'+cssStyle+'"></td>';
			};
		};
		AllbrandId=AllbrandId.substring(0,AllbrandId.length-1)
	};
	document.body.innerHTML='<div class="banner"><img width="100%" src="'+basicInfo.headLogo+'"></div><div class="container"><table style="width:'+(viewWidth+cells+1)+'px">'+str+'</table></div>';
	createNode(DB,"div",{id:"maskBG"},"p3");
	if(!setStorage("get","userInfo")){
		noUser();
	 };
	tongji({eventCode:100000,brandId:AllbrandId});
	/*---分享数据---*/
	CONFIG.shareInfo.link=CONFIG.shareInfo.link+"?b="+mainVar.userInfo.weixin_avatar_url+"&a="+mainVar.userInfo.nickname;
	setShareInfo();
};
/*---页面入口---*/
createNode(document.querySelector('head'),"link",{href:PAGE.COMMON+"jc/brand.css",rel:"stylesheet",type:"text/css"},"p3");
window.onload=function(){
	AjaxFn({
		type:'get',
		url:HOST.CARD+'/open/scratch/brand/list/'+activeId,
		success:function($data){
			var data=typeof($data)!=="object"?eval("("+$data+")"):$data;
			if(data.status=="success"){
				init(data.data);
			};
		},
		error:function(){
			tishi('获取数据失败，请刷新试试！',{time:2000});
		}
	});
};
//统计代码
function tongji(json){
	goldTJFn(json);
	function goldTJFn(json){
		var data='id='+activeId
		+'&token='+PAGE.token
		+'&channel_id='+PAGE.channelId
		+'&master_id='+json.brandId
		+'&event_code='+(json.eventCode)
		+'&open_id='+mainVar.userInfo.openid
		+'&user_name='+mainVar.userInfo.nickname
		+'&sex='+mainVar.userInfo.sex
		+'&page='+"金币刮奖"
		+'&title='+"刮刮卡品牌之家页面"
		+'&content='+json.brandId
		+'&country='+mainVar.userInfo.country
		+'&province='+mainVar.userInfo.province
		+'&city='+mainVar.userInfo.city
		+'&user_agent='+(navigator.userAgent)
		createNode(document.body,"img",{src:HOST.TJ+"/ana?"+data+"&ch="+Math.random(),style:"display:none"},"p3")
	}
};



