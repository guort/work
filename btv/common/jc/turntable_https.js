var DO=document,DB=DO.body,win=window,winW=win.innerWidth,winH=win.innerHeight,isTouch=('ontouchstart' in window);
createNode(document.querySelector('head'),"link",{href:PAGE.COMMON+"jc/turntable.css",rel:"stylesheet",type:"text/css"},"p3");
init()
function init(){
	setJsonp('http://qa-h5.mtq.tvm.cn/yao/common/jc/locationList.js',function(){
	var bodyStr='<div class="wapper bodyBox">\
		<div class="headTitle">请完善您的个人资料</div>\
		<div class="contenter formBox">\
			<p class="complete comStyle">请完善您的个人资料，以便在奖品福利发放及必要时联系到您，为您提供更便捷优质服务。</p>\
			<p class="statement comStyle">安全声明：您的信息我们不会分享、透露给任何第三方服务商。</p>\
			<div class="inforBox">\
				<!-- 头像 -->\
				<div class="headPicBox">\
					<div class="headPic">\
						<span class="headimg" ><img id="headimg"  src="http://a-h5.mtq.tvm.cn/yao/common/img/user.gif"></span>\
						<span class="headName">小叶子</span>\
					</div>\
				</div>\
				<!-- 年龄 -->\
				<div class="ageBox commBor clearfix">\
					<div class="ageText fl"><label><span class="iconAagex fl"><img src="//a-h5.mtq.tvm.cn/yao/common/img/must.png"></span>年龄</label></div>\
					<ul class="ageDetail kuaiWith fr ageRadio" action="ageradio" id="countSpan">\
						<li action="setAge" value="0"><span></span>18岁以下</li>\
						<li action="setAge" value="1"><span></span>18-24岁</li>\
						<li action="setAge" value="2"><span class="ageBg"></span>25-34岁</li>\
						<li action="setAge" value="3"><span></span>35-44岁</li>\
						<li action="setAge" value="4"><span></span>45-54岁</li>\
						<li action="setAge" value="5"><span></span>55-64岁</li>\
						<li action="setAge" value="6" class="iconLast"><span></span>65岁及以上</li>\
					</ul>\
				</div>\
				<!-- 性别 -->\
				<div class="sexBox commBor clearfix">\
						<div class="tit ageText sexText fl">\
							<label><span class="iconAagex fl"><img src="//a-h5.mtq.tvm.cn/yao/common/img/must.png"></span>年龄</label>\
						</div>\
						<div class="content pepole kuaiWith sexDetail fr">\
						  <ul class="pepoleTab">\
						  		<li action="setSex" value="1" class="z_mStyle">\
						  			<img src="//a-h5.mtq.tvm.cn/yao/common/img/gentleman.png" class="man zman"><b>男</b>\
						  		</li>\
						  		<li action="setSex" value="2" class="zwomen z_mStyle">\
						  			<img src="//a-h5.mtq.tvm.cn/yao/common/img/lady.png" class="lady"><b>女</b>\
						  		</li>\
						  </ul>\
						  <img src="//a-h5.mtq.tvm.cn/yao/common/img/ico_right.png" class="icoRight sureLeft">\
						 </div>\
				</div>\
				<!-- 选择地区 -->\
				<div class="areaBox commBor clearfix">\
					<div class="ageText areaText fl"><label><span class="iconAagex fl"><img src="//a-h5.mtq.tvm.cn/yao/common/img/must.png"></span>选择地区</label></div>\
					<ul class="ageDetail kuaiWith areaDetail fr">\
                    <input type="hidden" class="province"><input type="hidden" class="city"><input type="hidden" class="prefecture">\
							<li class="addWrap">请选择地区</li>\
					</ul>\
				</div>\
				<!-- 详细地址 -->\
				<div class="areaBox commBor clearfix">\
					<div class="ageText areaText fl"><label><span class="iconAagex fl"><img src="//a-h5.mtq.tvm.cn/yao/common/img/must.png"></span>详细地址</label></div>\
					<ul class="ageDetail kuaiWith areaDetail fr">\
							<li><textarea class="areaInfor addreInfor fl addressV" placeholder="街道门牌信息" id=""></textarea></li>\
					</ul>\
					<p class="notice fl">参与互动获得的奖品会使用本地址配送，请准确填写。</p>\
				</div>\
				<!-- 手机号 -->\
				<div  class="areaBox commBor clearfix">\
					<ul id="phoneBox">\
						<li class="tit ageText areaText fl"><label><span class="iconAagex fl"><img src="//a-h5.mtq.tvm.cn/yao/common/img/must.png"></span>手机号</label>\
						</li>\
						<li class="content ageDetail kuaiWith areaDetail fr"><input type="tel" class="tel areaInfor fl" maxlength="11"></li>\
					</ul>\
					<ul id="yzmBox" class="kuaiWith verifyBox fr">\
						<li class="content  ageDetail  areaDetail">\
							<input type="text" class="yzm areaInfor verify" placeholder="输入验证码">\
							<b class="yzmButton verifyBtn" action="getYZM">获取验证码</b>\
						</li>\
					</ul>\
				</div>\
			</div>\
			<b href="#" class=" nextButton submit"  action="next">提交</b>\
		</div>\
	</div>'
	createNode(DB,'div',{className:'container',html:bodyStr,style:"width:100%;"},'p3');
	(function(){
		var HOST={
			RTS:"//qarts-opa.yaotv.tvm.cn"
			,MB:"//qa.mb.mtq.tvm.cn"
			,SMS:"//qa-sms.yaotv.tvm.cn"
		}
		var search=getSearch()
		,$bodyBox=DB.querySelector(".bodyBox")
		,$formBox=$bodyBox.querySelector(".formBox")
		// ,$inputBoxWH=getProperty($formBox.querySelector(".content.inputBox"))
		,$yzmButton=$formBox.querySelector(".yzmButton")
		,$tel=$formBox.querySelector(".tel")
		,$yzm=$formBox.querySelector(".yzm")
		,$areValue = $formBox.querySelector(".areaValue")
		,$addressV = $formBox.querySelector(".addressV")
		,$man=$formBox.querySelector(".man")
		,$lady=$formBox.querySelector(".lady")
		,$icoRight=$formBox.querySelector(".icoRight")
		,$pepoleTab=$formBox.querySelector(".pepoleTab")
		,$nextButton=$formBox.querySelector(".nextButton")
		,$addWrap=$formBox.querySelector(".addWrap")
		,$province=$formBox.querySelector(".province")
		,$city=$formBox.querySelector(".city")
		,$prefecture=$formBox.querySelector(".prefecture")
		,sex
		,_yyyid=search.yyyid
		,_yoid=search.yoid
		,_ysig=search.ysig
		,_ysige=search.ysige
		,_openid=search.openid
		,_phone=+search.phone
		,_sig=search.sig
		,_subscribe=search.subscribe
		,subscribe=0
		,token="33580c57d3c86f07"
		,headimg = DO.getElementById("headimg")
		;
		headimg.src = search.headImg||"http://a-h5.mtq.tvm.cn/yao/common/img/user.gif";
		if(isPhone(_phone)){
			$tel.value=_phone
			$tel.setAttribute("readonly",1)
			yzmBox.style.display="none"
			}
		if(_subscribe==="true")$nextButton.textContent="完善会员资料即可领取"
		//$dateInput.style.cssText="width:"+$inputBoxWH.width+"px;height:"+$inputBoxWH.height+"px";
		function docAction(e,$opt){
			var ele=e.srcElement||e.target,opt=$opt||{},_action=opt.action||"action",attribute,argument,a1;				
					do{
						if(ele.nodeType!==1)break
						if(attribute=ele.getAttribute(_action))break			
						}while(ele=ele.parentNode)					
					if(attribute){							
						isFun(opt.fun,ele,attribute)
					}
			}
		sex=1;
		$bodyBox.onclick=$bodyBox.ontouchstart=function(e){
			docAction(e,{action:"action",fun:function($t,$action){
				switch($action){
					case "setAge":
						var p=getProperty($t),sty=$icoRight.style;
						age=$t.getAttribute("value");
						$countLi = 	 DO.getElementById("countSpan").getElementsByTagName("li")			
						$countSpan = DO.getElementById("countSpan").getElementsByTagName("span");
						for (var i = 0; i < $countSpan.length; i++) {
							$countSpan[i].setAttribute("class","");
							if(parseInt(age)===i){
								$countSpan[i].setAttribute("class","ageBg");
							}				
						};
					break;	
					case "setSex":
						var p=getProperty($t),sty=$icoRight.style;
						sex=$t.getAttribute("value")
						sty.display="block";
						sty.top="48%";
						//sty.left=p.left + 20%;
						if(parseInt(sex)===1){
							$icoRight.setAttribute("class","sureLeft");
						}else if(parseInt(sex)===2){
							$icoRight.setAttribute("class","sureRite");
						}
					break
					case "next":				
						register()
					break
					case "getYZM":
						getYZM()
					break
					}
				}
				})
			}
			
		function binding(){
			var arg={
				yopenid:_yoid
				,yyyappid:_yyyid
				,yaoSig:_ysig
				,sigExpire:_ysige
				,wopenid:_openid
				,wxSig:_sig
			}
			localStorage.setItem("referrerURL",search.redirect)
			var a=setAjax("get",HOST.RTS+"/check/bind?"+jsonJoin(arg))
				a.callBack=function($data){
					var data=toObject($data);subscribe=data.subscribe;
					if(+data.mobile){
						_phone=+data.mobile;
					}
					if(data.err){
						tishi(data.message);
						$bodyBox.style.visibility="visible"
						}else if(data.info){					
								if(!data.subscribe){							
									location.replace("card.html")
									}else{
										tishi("您已经有余额收割机了",{fun:function(){location.replace(decodeURIComponent(localStorage.getItem("referrerURL")))}})
										}
							}else{
								$bodyBox.style.visibility="visible"
							}
					}
				a.send()
			}
		
		function crateAdd($opt){
			var t=this,winW=window.innerWidth,winH=window.innerHeight,top=200,box=createNode(DB,"div",{className:"locationbox",html:"<div class='headBox'><span class='completeB' action='complete'>完成</span></div>",style:"top:"+top+"px;height:"+(winH-top-30)+"px"})
			,dom={
			province:{ele:createNode(box,"div",{className:"divBox"}),child:"city"}
			,city:{ele:createNode(box,"div",{className:"divBox",style:"left:100px;display:none"}),child:"prefecture"}
			,prefecture:{ele:createNode(box,"div",{className:"divBox",style:"left:200px;display:none"})}
			}
			createSelect("province",XDLOCATIONLIST.province)
			function createSelect($name,$data){
				var d=dom[$name],i=0,c,li,a=[],ele=d.ele,data=$data;
				ele.innerHTML="";
				for(;i<data.length;i++){
					c=data[i];
					li=document.createElement("section");
					li.className="selectList"
					li.textContent=c.N;
					li.setAttribute("action","select.,"+$name+".,"+d.child+".,"+c.I);
					ele.appendChild(li);
					a[i]=li
					}
					d.list=a			
				}
			function change($child,$item){
				var $obj=dom[$child]
					if($obj){
						var ele=$obj.ele,data
						data=XDLOCATIONLIST[$child]
						if($item)data=data[$item]
						createSelect($child,data)
						ele.style.display="block"
						change($obj.child)
					}	
				}
			function clearSelect($t,$c){
				var i=0,d=dom[$c],list=d.list,il=list.length;
				dom.prefecture.text=0;
				for(;i<il;i++){
					list[i].classList.remove("select")
					}
					d.text=$t.textContent;
					$t.classList.add("select")
				}
			box.onclick=function(e){
					docAction(e,{action:"action",fun:function($t,$action){
						var action=$action.split(".,")
						switch(action[0]){
							case "select":
								change(action[2],action[3])
								clearSelect($t,action[1])
							break
							case "complete":				
								t.complete()
							break
							}
						}
					})
					noPop(e)
				}
			function docAction(e,$opt){
				var ele=e.srcElement||e.target,opt=$opt||{},_action=opt.action||"action",attribute,argument,a1;				
						do{
							if(ele.nodeType!==1)break
							if(attribute=ele.getAttribute(_action))break			
							}while(ele=ele.parentNode)					
						if(attribute){							
							isFun(opt.fun,ele,attribute)
						}
				}
			t.display=function($t){
					box.style.display="block";
					t.input=$t
					}
			t.complete=function(){
				if(!dom.prefecture.text){
					tishi("地区信息不完整！")
				}else{
					var i,str="";
					for(i in dom){
						str+=";"+dom[i].text;
						}
					box.style.display="none";
					t.result=str.substr(1);
					isFun($opt.complete,t,dom)
					}	
				}
			}	
			var locationObj=new crateAdd({complete:function($t,$d){
				$t.input.innerHTML="<p style='color:#000'>"+$t.result.replace(/;/g,"")+"</p>"
				$province.value=$d.province.text
				$city.value=$d.city.text
				$d.prefecture.text&&($prefecture.value=$d.prefecture.text)
				}})
			$addWrap.onclick=function(){
				locationObj.display(this)
			}
		
		function register(){
			var mobile=$tel.value
			,yzm=$yzm.value
			,address=$addressV.value+1
			,province=$province.value
			,city=$city.value
			,prefecture=$prefecture.value
			// if(year==""||month==""||date==""){
			// 	tishi("请填写您的生日")
			// 	return
			// 	}
			if(!$formBox.querySelector(".ageBg")){
				tishi("请选择您的年龄！")
				return
				}	
			if(!sex){
				tishi("请选择您的性别！")
				return
				}
			if(prefecture==""){
				tishi("请选择地区信息")
				return
				}	
			if(address == "1"){
					tishi("请填写您的详细地址！")
				return
				}else if($addressV.value.length<=6){
					tishi("地址不得小于6个字符！")
					return
				}
			if(!isPhone(mobile)){
				tishi("请输入正确的手机号码！")
				return
				}
			if(!_phone)
			if(yzm==""){
				tishi("请填写手机验证码！")
				return		
				}
			var a=setAjax("POST",HOST.RTS+"/userinfo/save")
			a.data="openid="+_openid
			+"&mobile="+mobile
			+"&verify="+yzm
			+"&sex="+sex
			+"&province="+province
			+"&city="+city
			+"&county="+prefecture
			+"&addr="+address
			+"&age="+age
			a.callBack=function($data){
				var data=toObject($data)
				if(data.status){
					tishi("您已注册成功",{fun:function(){
							if(subscribe)tishi("<div style='width:200px;font-size:14px'><img src='//a-h5.mtq.tvm.cn/yao/common/img/induce.png' style='display:block;margin:10px auto;width:40px'>恭喜，余额收割机已经为您装备好啦！正在带您返回摇一摇...</div>",{fun:function(){location.replace(decodeURIComponent(localStorage.getItem("referrerURL")))}})
							else
							location.replace("card.html")				
						},time:3000})
					}else{
						tishi(data.message)
						}
				}
			a.send()
			}
		var num_click=0;
		function getYZM(){
			if(num_click===1){
					  $bodyBox.querySelector(".verifyBtn").style.background ="#ccc";
				return}
				num_click = 1;
			var mobile=+$tel.value
			if(!isPhone(mobile)){
				tishi("请输入正确的手机号吗！")
				return
				}
			var a=setAjax("POST",HOST.SMS+"/apis/sms/sendCode")
			a.data="wx_token="+token
			+"&openid="+_openid	
			+"&sigExpire="+_sig
			+"&sign="+_sig
			+"&mobile="+mobile
			+"&type="+3
			a.callBack=function($data){
				var data=toObject($data)
					tishi(data.message)
				}
			a.err=function(){
				num_click=0;
				$bodyBox.querySelector(".verifyBtn").style.background ="#06b011";
			}
			a.send()	
			}		
		/*function toSQ(){
			location.href=getAccess()
			}
		
		if(!_openid)toSQ()
		else binding()
		function getAccess(){
				return HOST.MB+"/oauth?wx_token="+token+"&redirecturl="+encodeURIComponent(location.href)
			}
		wxShare({
				token:"46497107fa23",
				resources:location.href,
				ico:$bodyBox.querySelector(".bodyHead").src,
				title:"摇一摇，爽一夏",
				desc:"小伙伴们，快来参加摇一摇吧",
				link:localStorage.getItem("referrerURL")})
			
		function getPage($s){
			var s=$s||location.href,w=s.indexOf("?")
			return w>1?s.substring(0,w):s
			}	*/
		//alert(winW+"\n"+winH)
		//$dateInput.oninput=function(){
		//	var d=this.value||"1990-01-06",s=d.split("-")
		//	$year.value=s[0];
		//	$month.value=s[1];
		//	$date.value=s[2];
		//	}
			
	}());
	});
};
