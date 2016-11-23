(function(){
	var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight,userInfo={}
	toSQ({fun:function(){
		
		onlineYY()
		
		},userInfo:userInfo})	
	function onlineYY(){
		var cardSeller=createNode(DB,'div',{className:'cardSeller'},'p2')
			,cardS_cell=createNode(cardSeller,'div',{className:'cardS_cell'},'p3')
			,sellerCon=createNode(cardS_cell,'div',{className:'sellerCon'},'p3')
			,close=createNode(cardS_cell,'p',{className:'close',html:'<img src="img/card/p_close.png" alt="">'},'p3')
			,sellerFont=createNode(sellerCon,'p',{className:'sellerFont',html:'周边商家'},'p3')
			,sellerInfo=createNode(sellerCon,'div',{className:'sellerInfo'},'p3')
			,sellerBtn=createNode(sellerCon,'p',{className:'sellerBtn',html:'<span>点击前往</span>'},'p3')
			,html=""
			,ajax
			,callback
			,id=userInfo.openid||''
			,location=userInfo.location||{}
			,region=location.region||'0-0-0-0'
			,lon=location.longitude||'0'
			,lat=location.latitude||'0'
			,city=region.split('-')[3]||'0'
			,area=region.split('-')[4]||'0'
			,sex=userInfo.sex||0
			;
		ajax=setAjax('GET','http://115.159.204.29/gety8s?id='+id+'&lon='+lon+'&lat='+lat+'&city='+city+'&area='+area+'&sex='+sex,callback);
		ajax.callBack=function($data){
				var data=toObject($data),li=data,distance,shopImg,shopName,address,shopPrice,userGrade,userEval,num,starNum='';
					address=li.address||''
					money=li.money?(li.money)/100:''
					dp=li.dp||''
					distance=li.distance?li.distance/1000:1
					shopImg=li.imgurl?li.imgurl:''
					shopName=li.name||''
					shopPrice=li.shopPrice||''
					num=li.poilevel||3.5
					url=li.url||''
					if(Math.floor(num)==num){
						for(var i=0;i<num;i++){
							starNum+='<img class="star" src="img/card/xing1.png" alt="" />'
						}
					}else{
						var toNum=Math.floor(num);
						for(var i=0;i<toNum;i++){
							starNum+='<img class="star" src="img/card/xing1.png" alt="" />'
						}
						starNum+='<img class="star" src="img/card/xing2.png" alt="" />'
					}
					html='<p class="sellerDis">距离您'+distance+'km</p>'
						+'<img class="sellerImg" src="'+shopImg+'">'
						+'<p class="sellerName">'+shopName+'</p>'
						+'<img class="location" src="img/card/dwImg.png" alt=""><p class="sellerArea">地址：<span>'+address+'</span></p>'
						+(money?'<p class="sellerRJ">人均：<span>'+money+'元</span></p>':'')
						+'<p class="sellerPF">评分：<span>'+starNum+'</span></p>'
						+(dp?'<div style="display: flex;display:-webkit-flex;"><p class="sellerDP">点评：</p><p class="dPCon">'+dp+'</p></div>':'')
					sellerInfo.innerHTML=html;
			sellerBtn.onclick=function(){
				goto(url)
			}
		}
		ajax.err=function(){
			tishi('获取数据失败，请稍后重试',{showTime:3000})
		}
		ajax.send()

	}
function goto(url,$type){
    if($type==="tlq"){
        tjData["appName"]="讨论区";
        TJ(100000);
        setTimeout(function(){
            top.location.href=url
            },1000)
        return 
        }
    top.location.href=url
}
}())