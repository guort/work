function register($opt){
	var data=$opt.userInfoData;
	showLoading();
	if(data){//判断入口
		$opt.source='in';
		if(data.data.info_status==2){
			skipAddress({
				fn:function(){
					hideLoading();
					$opt.box.innerHTML='<div id="addRessEle"></div>';
					addressBox();
				},
				change:$opt.change,
				ttdsbOpenid:$opt.openid
			});
		}else{
			hideLoading();
			branch($opt);
		};
	}else{
		$opt.source='out';
		var a=setAjax("GET",HOST.RTS+"/userinfo/get?openid="+$opt.openid+"&yyyappid="+$opt.yyyid+"&yopenid="+$opt.yoid+"&cache="+Math.random());
		a.callBack=function($data){
			hideLoading();
			var data=toObject($data);
			if(data.status){
				$opt.userInfoData=data;
				branch($opt);
			}else{
				tishi("请重新进入！",{time:10e3});
			};
		};
		a.err=function(){
			hideLoading();
			tishi("网络超时，获取数据失败！",{time:10e3});
		};
		a.send();
	};
};
function branch($opt){
	var DO=document,DB=DO.body,win=window,winW=win.innerWidth,winH=win.innerHeight,isTouch=('ontouchstart' in window)
	,HOST={
	RTS:"//qarts-opa.yaotv.tvm.cn"
	,MB:"//qa.mb.mtq.tvm.cn"
	,SMS:"//qa-sms.yaotv.tvm.cn"
	,token:"33580c57d3c86f07"
	,wl:"http://mlive.tvmcloud.com/qstore/qstore/?q=deal/46497107fa23/0/shipping-address"
	}
	,_yyyid=$opt.yyyid
	,_yoid=$opt.yoid
	,_ysig=$opt.ysig
	,_ysige=$opt.ysige
	,_openid=$opt.openid||""
	,_phone=$opt.phone
	,_headImg=$opt.headImg
	,_nickname=decodeURIComponent($opt.nickname||"未知用户")
	,_sig=$opt.sig||""
	,_closePage=$opt.closePage
	,referrerURL=$opt.redirect
	,folder="http://a-h5.mtq.tvm.cn/yao/join_us/"
	,html=[
	,'<style>html{font-family:weiruanyahei,FZYQJW,"微软雅黑",Tahoma,"\534E\6587\5B8B\4F53",arial;font-size:1em;background:#f0f0f0}'
	,'body,p,div,span,ul,li,em,b,input,textarea{margin:0;padding:0;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);font-weight:normal}'
	,'input,textarea{-webkit-appearance:none;outline:none}'
	,'ul li{list-style:none;}'
	,'input{color:#b4b4b4;font-size:1em;font-family:weiruanyahei,FZYQJW,"微软雅黑",Tahoma,"\534E\6587\5B8B\4F53",arial;border-radius:none;height:30px}'
	,'a{text-decoration: none; }'
	,'i{font-style:normal;}'
	,'.boxTit{background:#FDF6D8;color:rgba(175,105,26,1.00);text-align:center;line-height:40px;}'
	,'.inforBox{background:#fff;border-radius:0 0 6px 6px;padding:0 0 10px 0;overflow:hidden;margin-top:20px;}'
	,'.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}'
	,'.clearfix{display:block}'
	,'.clear{clear:both;overflow:hidden;_zoom:1;}'
	,'.headTitle{width:100%;background: #ff6654;color:#ffffff;text-align:center;font-size:1.3em;line-height:2em;}'
	,'.contenter{width:91%;margin: 0 auto}	'
	,'.comStyle{line-height: 1.5em;letter-spacing:-0.05em;}'
	,'.complete{color:#696969;margin-top:1em;}'
	,'.statement{color:#ff6654;margin:1em 0 0 0;}'
	,'select{appearance:none;-webkit-appearance:none;border:none;font-size:12px;white-space:nowrap;}'
	,'.addWrap p{white-space:nowrap;height:2em;font-size:1em;overflow:hidden;text-overflow:ellipsis;word-wrap:normal;}'
	,'.province{margin-right:5px;}'
	,'.city{margin-right:5px;}'
	,'.leftDiv{margin:6px 0 0 0;font-weight:bold;float:left;width:84px;font-size:1em}'
	,'.rightDiv{position:relative;width:230px;overflow:hidden;color:#b4b4b4;}'
	,'.rightDiv .addWrap{padding:5px 5px 0 0;height:2em;line-height:1.6em;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;word-wrap: normal;box-sizing:border-box;height:30px}'
	,'.iconAagex{width:10px;height:14px;margin:0 4px 0 6px;display:inline-block;background:url(//a-h5.mtq.tvm.cn/yao/join_us/img/icon01.png) no-repeat center 2px;background-size:100%}'
	,'.bottomLine{border-bottom:1px solid #E0E0E0}'
	,'.ageRadio{width:241px}'
	,'.ageRadio li{float:left;font-size:1em;margin:10px 0 0 0;width:50%}'
	,'.ageRadio li span{float:left;width:1em;height:1em;margin-right:.3em;background: url(//a-h5.mtq.tvm.cn/yao/join_us/img/h_03.png) no-repeat;background-size:contain;}'
	,'.ageRadio li span img{width:100%;height:auto;}'
	,'.ageRadio li span.ageBg{background: url(//a-h5.mtq.tvm.cn/yao/join_us/img/radio_green.png) no-repeat;background-size:contain;}'
	,'.ageRadio li.iconLast{width:120px}'
	,'.addressBox{margin:38px 0 0 0;}'
	,'.verifyBox{margin:1em 0;}'
	,'.yzm,.tel{width:125px;border-radius:none;border-bottom:1px solid #E0E0E0}'
	,'.yzmButton{display:inline-block;background:#06b011;font-size:.9em;font-weight:normal;border-radius:5px;line-height:30px;color:#fff;text-align:center;}'
	,'.telBox b{width:80px;}'
	,'.yzmBox b{width:100px;}'
	,'.submit{display:block;font-size:1.5em;line-height:2em;text-align: center;border-radius:.2em;background: #ff6654;color:#ffffff;margin-top:15px;font-weight:inherit;}'
	,'.headPic{margin:0 auto;padding:1.3em 0;width: 25%;}'
	,'.headimg{border-radius:50%;display:block;width:3em;height:3em;border:2px solid #ddd;margin:0 auto;}'
	,'.headName{display:block;color:#000000;text-align:center;}'
	,'.commBor{margin:30px 0 0 0}'
	,'.ageBox{margin:20px 0 0 0}'
	,'.fl{float:left;}'
	,'.fr{float:right;}'
	,'.addressTxt{margin:40px 0 0 0}'
	,'.nameMar{margin:7px 0 0 0}'
	,'.sexDetail{position:relative;}'
	,'.sexText{margin-top:1.2em;}'
	,'.zwomen{margin-left:2em;}'
	,'.z_mStyle{width:25%;float:left;text-align: center;}'
	,'.z_mStyle img{width:100%;height:auto;}'
	,'.z_mStyle b{display:block;margin:.3em 0 .5em;}'
	,'.sureLeft,.sureRite{width:1em;height:1em;position:absolute;top:40%;}'
	,'.sureLeft{left:16%}'
	,'.sureRite{left:60%}'
	,'.areaInfor{height:30px;resize:none;border:none}'
	,'.addressV{width:200px;height:60px;overflow:visible;line-height:1.3em;font-size:1em;word-wrap:break-word;word-break:break-all;display:table-cell;vertical-align:top;outline:none;color:#b4b4b4}'
	,'.notice{margin:10px 0 0 4%;color:#aaa;font-size:.8em;line-height:1.4em;padding-bottom:.3em;text-align:left}'
	,'.resetButton{display:inline-block;text-align:center;padding:5px 6px;border-radius:5px;background:#06B011;color:#fff}'
	,'#maskBG{position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:10000;-webkit-transition:all 400ms ease;}#infoStr{position:absolute;width:70%;height:50px;text-align:center;color:#fff;font-size:16px;background:rgba(0,0,0,.5);top:50%;left:50%;-webkit-transform:perspective(1px) translate3D(-50%,-50%,0);z-index:10;border-radius:6px;padding:10px;opacity:0;margin:-60px 0 0 0;box-sizing:border-box;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;}'
	,'.addInfoBox{display:none}'
	,'.adEmpty{text-align:center;display:none}'
	,'.adEmptyTips{margin:20px 0;font-size:.8em}'
	,'.button2{display:inline-block;padding:8px 10px;background:#06b011;font-size:.9em;color:#fff;margin:auto;border-radius:4px}'
	,'.info3{text-align:center;padding:15px 0 0 0;line-height:20px;color:#999}'
	,'.nobober{border:none}'
	,'@media screen and (max-width:320px){'
	,'.ageRadio li{width:50%}'
	,'.leftDiv{width:92px;}'
	,'.rightDiv,.addressV{width:186px}'
	,'.telBox b{width:50px}'
	,'.tel{width:100px}'
	,'.yzm{width:90px;padding:0}'
	,'.yzmBox b{width:90px;font-size:.8em}}'
	,'@media screen and (min-width:360px){'
	,'.ageRadio li{width:50%}'
	,'.leftDiv{width:92px;}'
	,'.rightDiv,.addressV{width:220px;}'
	,'.telBox b{width:50px;}'
	,'.yzm{width:90px;padding:0}'
	,'.yzmBox b{width:90px;font-size:.8em}}'
	,'@media screen and (min-width:375px){'
	,'.leftDiv{width:92px}'
	,'.rightDiv,.addressV{width:228px}	'
	,'.ageRadio{width:247px}	'
	,'.ageRadio li{float:left;font-size:.9em;margin:10px 0 0 0;width:50%;}'
	,'.yzm, .tel{width:132px}'
	,'.sureLeft{left:17%}'
	,'.sureRite{left:59%}}'
	,'@media screen and (min-width:412px){'
	,'.leftDiv{width:95px;font-size:1em}	'
	,'.rightDiv,.addressV{width:260px}'
	,'.ageRadio{width:278px}'
	,'.ageRadio li{font-size:.9em;width:50%}'
	,'.yzm,.tel{width:164px}'
	,'li.iconLast{width:120px}}'
	,'.locationbox{position:fixed;display:none;width:100%;top:100px;left:0;background:#fff;}'
	,'.locationbox .divBox{position:absolute;width:100%;vertical-align: middle;height:100%;left:0;top:32px;background:#fff;-webkit-overflow-scrolling:touch;overflow:auto;box-shadow:0 10px 6px #CDCDCD}'
	,'.headBox{position:relative;height:30px;background:rgb(248, 248, 248);border-top:1px solid rgba(221,221,221,1.00);border-bottom:1px solid rgba(221,221,221,1.00);z-index:1}'
	,'.completeB{position:absolute;width:45px;line-height:30px;right:0;text-align:center;color:rgba(0,132,255,1.00)}'
	,'.selectList{border-bottom:1px solid #eee;line-height:25px;box-sizing:border-box;text-indent:4px}'
	,'.select{background:rgba(229,229,229,1.00);color:rgba(0,140,255,1.00)}'
	,'</style>'
	,'<div class="wapper bodyBox" style="padding-bottom:10px;">'
	,'<div class="headTitle">请完善您的个人资料</div>'
	,'<div class="contenter formBox">'
	,'<p class="complete comStyle">请完善您的个人资料，以便在奖品福利发放及必要时联系到您，为您提供更便捷优质服务。</p>'
	,'<p class="statement comStyle">安全声明：您的信息我们不会分享、透露给任何第三方服务商。</p>'
	,'<div class="inforBox"><p class="boxTit">基本资料</p><div class="headPicBox"><div class="headPic">'
	,'<img id="headimg" src="http://a-h5.mtq.tvm.cn/yao/common/img/user.gif" class="headimg">'
	,'<span id="headName" class="headName">小叶子</span></div></div>'
	,'<div class="areaBox commBor clearfix"><ul id="phoneBox"><li class="leftDiv"><span class="iconAagex"></span>手机</li>'
	,'<li class="rightDiv telBox"><input type="text" class="tel" maxlength="11" placeholder="请输入手机号">'
	,'<b class="yzmButton" action="setPhone">重置</b></li></ul><ul id="yzmBox" class="verifyBox" style="display:none">'
	,'<li class="leftDiv"></li><li class="rightDiv yzmBox"><input type="text" class="yzm" placeholder="输入验证码" style="border-bottom:1px solid #E0E0E0">'
	,'</li></ul></div><div class="sexBox commBor clearfix"><div class="leftDiv"><span class="iconAagex fl"></span>性别</div><div class="rightDiv"><ul class="pepoleTab">'
	,'<li action="setSex" value="1" class="z_mStyle"><img src="//a-h5.mtq.tvm.cn/yao/join_us/img/gentleman.png" class="gentleman zman"><b>男</b>'
	,'</li><li action="setSex" value="2" class="zwomen z_mStyle">'
	,'<img src="//a-h5.mtq.tvm.cn/yao/join_us/img/lady.png" class="lady"><b>女</b></li></ul><img src="//a-h5.mtq.tvm.cn/yao/join_us/img/ico_right.png" class="icoRight" style="display:none">'
	,'</div></div><div class="ageBox commBor clearfix" style="margin:0">'
	,'<div class="leftDiv"><span class="iconAagex"></span>年龄</div>'
	,'<ul class="rightDiv ageRadio" action="ageradio" id="countSpan">'
	,'<li action="setAge" value="0"><span></span>18岁以下</li>'
	,'<li action="setAge" value="1"><span></span>18-24岁</li>'
	,'<li action="setAge" value="2"><span></span>25-34岁</li>'
	,'<li action="setAge" value="3"><span></span>35-44岁</li>'
	,'<li action="setAge" value="4"><span></span>45-54岁</li>'
	,'<li action="setAge" value="5"><span></span>55-64岁</li>'
	,'<li action="setAge" value="6" class="iconLast"><span></span>65岁及以上</li>'
	,'</ul></div></div>'
	,'<b class="nextButton submit"  action="next">提 交</b></div></div><div id="addRessEle"></div>'].join("")
	;
	$opt.box.innerHTML=html;
	setTimeout(init,300)
	function init(){
		var $bodyBox=DB.querySelector(".bodyBox")
		,$formBox=$bodyBox.querySelector(".formBox")
		,$yzmButton=$formBox.querySelector(".yzmButton")
		,$tel=$formBox.querySelector(".tel")
		,$yzm=$formBox.querySelector(".yzm")
		,$areValue = $formBox.querySelector(".areaValue")
		,$addressV = $formBox.querySelector(".addressV")
		,$addPhone=$formBox.querySelector(".addPhone")
		,$name = $formBox.querySelector(".name")
		,$gentleman=$formBox.querySelector(".gentleman")
		,$lady=$formBox.querySelector(".lady")
		,$icoRight=$formBox.querySelector(".icoRight")
		,$pepoleTab=$formBox.querySelector(".pepoleTab")
		,$nextButton=$formBox.querySelector(".nextButton")
		,age
		,sex
		,num_click=0
		,subscribe=0
		,headimg = DO.getElementById("headimg")
		,headName = DO.getElementById("headName")
		,havYzm=0;
		if(_headImg)headimg.src=getHead(decodeURIComponent(_headImg));
		headName.textContent =_nickname;
		/*var a=setAjax("GET",HOST.RTS+"/userinfo/get?openid="+_openid+"&yyyappid="+_yyyid+"&yopenid="+_yoid+"&cache="+Math.random());
			a.callBack=getUserData;
			a.err=function(){getUserData({})}
			a.send();
		*/
		getUserData($opt.userInfoData);
		function docAction(e,$opt){
			var ele=e.srcElement||e.target,opt=$opt||{},_action=opt.action||"action",attribute,argument,a1;				
					do{
						if(ele.nodeType!==1)break;
						if(attribute=ele.getAttribute(_action))break;	
						}while(ele=ele.parentNode)					
					if(attribute){							
						isFun(opt.fun,ele,attribute)
					}
			}
		function setAge($i){
			var $countLi = 	 DO.getElementById("countSpan").getElementsByTagName("li"),			
				$countSpan = DO.getElementById("countSpan").getElementsByTagName("span");
				for (var i = 0; i < $countSpan.length; i++) {
					$countSpan[i].setAttribute("class","");
					if($i===i){
						$countSpan[i].setAttribute("class","ageBg");
						age=$i
					}				
				};	
			}
		function setSex($i){
			var sty=$icoRight.style;
				sex=$i;
				sty.display="block";
				$icoRight.setAttribute("class",$i===1?"sureLeft":"sureRite");
			}
		function bodyEvent(e){
			docAction(e,{action:"action",fun:function($t,$action){
				switch($action){
					case "setAge":
						setAge(+$t.getAttribute("value"))
					break;	
					case "setSex":
						setSex(+$t.getAttribute("value"))
					break
					case "next":				
						register()
					break
					case "getYZM":
						getYZM($t)
					break
					case "setPhone":
						setPhone($t)
					break
					case "resetPhone":
						resetPhone($t)
					break;
					}
				}
				})
			}	
		function goto(){
			location.href=HOST.wl
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
										tishi("您已经有余额收割机了",{fun:function(){location.replace(decodeURIComponent(referrerURL))}})
										}
							}else{
								$bodyBox.style.visibility="visible"
							}
					}
				a.send()
			}
		function crateAdd($opt){
			var t=this,winW=window.innerWidth,winH=window.innerHeight,top=200,box=createNode(DB,"div",{className:"locationbox",html:"<div class='headBox'><span class='completeB' action='complete'>完成</span></div>",style:"top:"+top+"px;height:"+(winH-top-30)+"px"})
			,isChange=0
			,val=$opt.value||[]
			,dom={
			province:{ele:createNode(box,"div",{className:"divBox"}),child:"city",val:val[0]}
			,city:{ele:createNode(box,"div",{className:"divBox",style:"left:100px;display:none"}),child:"prefecture",val:val[1]}
			,prefecture:{ele:createNode(box,"div",{className:"divBox",style:"left:200px;display:none"}),child:0,val:val[2]}
			}
			if(!window.XDLOCATIONLIST)setJsonp("//a-h5.mtq.tvm.cn/yao/common/jc/locationList.js",function(){
				createSelect("province",XDLOCATIONLIST.province)
				})
			else createSelect("province",XDLOCATIONLIST.province)
			function createSelect($name,$data){
				var d=dom[$name],i=0,c,li,a=[],ele=d.ele,data=$data,cs="selectList",child=d.child;
				ele.innerHTML="";
				ele.style.display="block";
				if(!d.val)d.val=data[0].N
				for(;i<data.length;i++){
					c=data[i];
					cs="selectList";
					if(c.N===d.val){
						cs+=" select";
						child&&createSelect(child,XDLOCATIONLIST[child][c.I])
						}	
					li=document.createElement("section");
					li.className=cs
					li.textContent=c.N;
					li.setAttribute("action","select.,"+$name+".,"+d.child+".,"+c.I);
					ele.appendChild(li);
					a[i]=li
					}
					d.list=a			
				}
			function change($ele,$p,$child,$item){
					clearSelect($ele,$p);
					if($child!=="0"){
					var $obj=dom[$child];isChange=1;$obj.val=0;dom.prefecture.val=0
						createSelect($child,XDLOCATIONLIST[$child][$item])
					}
				}
			function clearSelect($t,$c){
				var i=0,d=dom[$c],list=d.list,il=list.length;
				dom.prefecture.val=0;
				for(;i<il;i++){
					list[i].classList.remove("select")
					}
					d.val=$t.textContent;
					$t.classList.add("select")
				}
			box.onclick=function(e){
					docAction(e,{action:"action",fun:function($t,$action){
						var action=$action.split(".,")
						switch(action[0]){
							case "select":
								change($t,action[1],action[2],action[3]);
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
					t.input=$t;
					isChange=0
					}
			t.complete=function(){
					var i,str="";
					for(i in dom){
						str+=";"+dom[i].val;
						}
					t.result=str.substr(1);
					isFun($opt.complete,t,dom)
					box.style.display="none";
				}
			}	
		function register(){
			var mobile=$tel.value
			,yzm=$yzm.value
			function isName($name){
				var patrn = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？_+]","g");
					if(!patrn.test($name)) {
						return true;
					}else{
						return false;
					}
			}
			if(!isPhone(mobile)){
				tishi("请输入11位正确的手机号");
				return
				}
			if(havYzm)
			if(yzm==""){
				tishi("请填写手机验证码！")
				return		
				}	
			if(!sex){
				tishi("请选择您的性别！")
				return
				}				
			if(!$formBox.querySelector(".ageBg")){
				tishi("请选择您的年龄段！")
				return
				}
			var a=setAjax("POST",HOST.RTS+"/userinfo/save")
			a.data="openid="+_openid
			+"&mobile="+mobile
			+"&verify="+yzm
			+"&sex="+sex
			+"&age="+(age+1)
			+"&receiver="+name
			a.callBack=function($data){
				var data=toObject($data)
				if(data.status){
					tishi("<div style='width:100px;font-size:14px;height:120px'><img src='//a-h5.mtq.tvm.cn/yao/common/img/induce.png' style='display:block;margin:10px auto;width:40px;height:40px'>提交成功！</div>",{style:"height:100px;width:120px",fun:function(){
						//isFun($opt.change,{"addr":address,"receiver":name,"mobile":mobile,area:{"province":province,"city":city,"county":prefecture}})
						addressBox();
						}})
					}else{
						tishi(data.message)
					}
				}
			a.send()
		}
		function getYZM($ele,$fun){
			if(num_click===1)return
			var mobile=+$tel.value
			if(!isPhone(mobile)){
				tishi("请输入11位正确的手机号")
				return
				}
			num_click=1;havYzm=1;
			var a=setAjax("POST",HOST.SMS+"/apis/sms/sendCode")
			a.data="wx_token="+HOST.token
			+"&openid="+_openid	
			+"&sigExpire="+_sig
			+"&sign="+_sig
			+"&mobile="+mobile
			+"&type="+3
			a.callBack=function($data){
			var data=toObject($data),msg;
			if(!data)return
				msg=data.message;
				tishi(msg);
			if(msg== "发送成功"){
				var countTime = 60;
				var timer = setInterval(function(){
					$ele.style.background ="#ccc";
					countTime--;                            
					$ele.textContent = '重新发送' + countTime + 's';
					num_click=1;
					if (countTime == 0) {
						num_click=0;
						$ele.textContent ='获取验证码';
						$ele.style.background ="#06b011";	
						clearInterval(timer);
						}
					},1000)				
					$ele.textContent = '重新发送' + countTime + 's';							
					$tel.style.color="#333";				
				}else{
					num_click=0;
					}
			}
		a.err=function(){
			num_click=0;
			$ele.style.background ="#06b011";
		}
		a.send()
		isFun($fun,$ele)
		}		
		function resetPhone($ele){
			getYZM($ele,disYZM)
		}
		function disYZM($ele){
			yzmBox.style.display="block";
			$yzm.parentNode.appendChild($ele);	
			$ele.setAttribute("action","getYZM");
			$ele.textContent ='获取验证码';
			$tel.removeAttribute("readonly");			
		}		
		function setPhone($ele){
			yzmBox.style.display="block";
			$yzm.parentNode.appendChild($ele);	
			$ele.setAttribute("action","getYZM");
			$ele.textContent ='获取验证码';
			$tel.removeAttribute("readonly");
			$tel.value="";
			$tel.focus();
		}
		if($opt.source=='out'){
			wxShare({
				token:"46497107fa23",
				resources:location.href,
				ico:"",
				title:"摇一摇，爽一夏",
				desc:"小伙伴们，快来参加摇一摇吧",
				link:referrerURL
			})
		};
		addEvent($bodyBox,"touchstart",bodyEvent)	
		function getUserData($data){
			var data=toObject($data),area,address,box,info;
			if(data.status){
				var data=data.data
				if(data.info_status==2){
					setAge(+data.age-1);
					setSex(+data.sex);
				};
				_phone=data.mobile||_phone;
				if(info=data.info){
						box=$formBox.querySelector(".addInfoBox")
					}else{
						box=$formBox.querySelector(".adEmpty")
					}
			};
			if(isPhone(_phone)){
				$tel.value=_phone;
				$tel.setAttribute("readonly",1)
				havYzm=0
			}else{
				$yzmButton.style.width="80px";
				$yzmButton.setAttribute("action","resetPhone");
				$yzmButton.textContent='获取验证码';
			}
		}
		function getPage($s){
			var s=$s||location.href,w=s.indexOf("?")
			return w>1?s.substring(0,w):s
		}
		function getHead($url){
			var url=decodeURIComponent($url)
			if(/\.jpg$|\.png$|\.gif$/gi.test(url))return url
			else{			
				return url.indexOf("tvm")>-1?url:url.replace("http://wx.qlogo.cn/mmopen/http://wx.qlogo.cn/mmopen/","http://wx.qlogo.cn/mmopen/")+"/64"
			}
		}
		skipAddress({
			elem:$bodyBox,
			ttdsbOpenid:_openid,
			change:$opt.change
		});
	};
}
function skipAddress(options){
	window.addressBox=function(){
		function GetURIParams(uri){
			var pinstc = {};
			var qidx = uri.indexOf("?");
			if (qidx < 0){
				return pinstc;
			}
			var sidx = uri.indexOf("#");
			var pstr = uri.substring(qidx + 1, sidx < 0 ? uri.length : sidx);
			var kvarr = pstr.split("&");
			for (var i = 0, l = kvarr.length; i < l; ++i){
				var itm = kvarr[i];
				var eidx = itm.indexOf("=");
				if (eidx < 0){
					continue;
				}
				pinstc[itm.substring(0, eidx)] = itm.substring(eidx + 1);
			}
			return pinstc;
		}
		var openid=options.ttdsbOpenid;
		var shake_openid=null;
		var posid="addRessEle";
		ManageAddress(openid,shake_openid,posid,testtest)
		function testtest(data){
			var html=document.documentElement,bodyE=document.body;
			html.style.height='auto';
			html.style.overflow="visible";
			bodyE.style.height='auto';
			bodyE.style.overflow="visible";
			isFun(options.change,{"addr":data.address,"receiver":data.name,"mobile":data.phone})
		}
		/*---解决---*/
		if(options.elem){options.elem.style.display="none"};
		var html=document.documentElement,bodyE=document.body;
		html.style.height='100%';
		html.style.overflow="hidden";
		bodyE.style.height='100%';
		bodyE.style.overflow="hidden";
	};
	/*测试：HOST_ADDRESS='//mlive.tvmcloud.com/qstore/qstore/assets/';
	  正式：HOST_ADDRESS='//assets.yaomall.tvm.cn/staticfile/assets/';
	*/
	HOST_ADDRESS='//mlive.tvmcloud.com/qstore/qstore/assets/';
	createNode(DB,"link",{href:HOST_ADDRESS+"css/yaotvc-address-select.css",rel:"stylesheet",type:"text/css"},"p2");
	setJsonp(HOST_ADDRESS+"js/yaotvc-address-select.js",function(){
		options.fn&&options.fn();
	});		
}
var Prompt = function(options){
	this.init(options);
};
Prompt.prototype = {
	init:function(options){
		this.options = options || {};
		this.id = this.options.id || 'prompt';
		this.width = this.options.width || "50%";
		this.type = this.options.type || "confirm";
		this.title = this.options.title || '';
		this.content = this.options.content || '';
		this.cancelBtn = this.options.cancelBtn || '取消';
		this.okBtn = this.options.okBtn || '确认';
		this.animation = this.options.animation || '';
		this.okCallback = function(){
			this.options.okCallback();
		};
		this.cancelCallback = function(){
			this.options.cancelCallback();
		};
		this.create();
	},
	create:function(){
		var ele = document.createElement("div");
		ele.id = this.id;
		ele.className = "prompt";
		var html = '<div class="p_cell">'
			+ '			<div class="p_inner '+ this.animation +'" style="width:'+ this.width +'">'
			+ (this.title == '' ? '' : '<div class="p_title">'+ this.title +'</div>')
			+ '				<div class="p_content">'+ this.content +'</div>'
			+ '				<div class="p_btns">'
			+ '					<b class="p_btn_cancel">'+ this.cancelBtn +'</b>'
		switch(this.type){
			case "confirm":
				html += '		<b class="p_btn_ok">'+ this.okBtn +'</b>'
				break;
			case "alert":
				break;
		}
		html += '			</div>'
			+ '				<span class="p_close"></span>'
			+ '			</div>'
			+ '		</div>';
		ele.innerHTML = html;
		document.body.appendChild(ele);
		this.bindEvent();
	},
	remove:function(){
		document.body.removeChild(document.getElementById(this.id));
	},
	bindEvent:function(){
		var self = this;
		document.body.querySelector(".p_close").onclick = function(){
			self.remove();
		}
		document.body.querySelector(".p_btn_cancel").onclick = function(){
			self.cancelCallback();
		}
		if(this.type == "confirm"){
			document.body.querySelector(".p_btn_ok").onclick = function(){
				self.okCallback();
			}
		}
	}
}

