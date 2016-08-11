MODULE={
DATI:function($options){
	var CSS='.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.clearfix{display:block}.clear{clear:both;overflow:hidden;_zoom:1}.qsBox{width:100%;height:100%;border-radius:50%;box-sizing:border-box;padding:5px 0 0 0;background-color:#206aa7;overflow:hidden;text-align:center;color:#fff;background-size:cover;background-repeat:no-repeat;background-position:center center}.qsBox ul{margin:0;padding:0}.qsBox .timer{height:20%;font-size:2rem;font-weight:bold}.qsBox .title{box-sizing:border-box;height:36%;padding:5% 10%;border-top:2px rgba(255,255,255,0.6) solid;font-size:1.1rem;text-align:left;box-sizing:border-box}.qsBox .options{height:45%}.qsBox .options li{width:50%;padding:0 5%;box-sizing:border-box;float:left;height:100%}.qsBox p{width:90%;font-size:1rem;text-align:center}.qsBox .optA{padding:20px 0 0 10%}.qsBox .optB{padding:20px 0 0 0}.qsBox span{font-size:28px;font-weight:bold}.qsBox .spanA{float:left;padding-left:10px;color:#2ea23f}.qsBox .spanB{float:right;color:#f5507a}.qsBox .options li{background-color:#e1e1e1;color:#626468}.qsBox .options li:nth-child(1){background-size:cover;background-repeat:no-repeat;background-position:center center}.qsBox .options li:nth-child(2){border-left:1px #c4d0e6 solid;background-size:cover;background-repeat:no-repeat;background-position:center center}.liActive{-webkit-animation-name:bluePulse;-webkit-animation-duration:1s;-webkit-animation-fill-mode:forwards;background-color:#50c260}@-webkit-keyframes bluePulse{from{background-color:#e1e1e1}to{background-color:#23c53b}}@-webkit-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}#tools{position:fixed;top:0;left:0;z-index:10;-webkit-transform:translate3d(0,0,0);display:none}.parts{opacity:0;padding:15px 0 0 0;font-size:.9rem}.zanXB{margin-left:-30px}.partsActive{opacity:0;-webkit-animation-name:zoomIn;-webkit-animation-duration:1s;-webkit-animation-fill-mode:forwards}@media screen and (min-width:320px) and (max-width:321px){.qsBox .optA{font-size:12px;margin:20px 0 0 25%;padding:0;}.qsBox .optB{font-size:12px;text-align:left;}.qsBox .title{font-size:16px;}}';
	setStyle(CSS);
	var t=this,obj=$options.ele;	
	var action="dati"				
		,nums
		,method={
				display:function(){
					create(mainVar.sceneData)
				},run:function(ele,$data,opt,a){
				   var ulNode=document.querySelector(".options").childNodes,prize=prizeFun.call($options);
				   for(var i=0;i<ulNode.length;i++){
						ulNode[i].setAttribute("action",""); 
					  };														
					this.stop()	;			
					tishi("您选择的答案是："+$data);
					switch($data){
						case "A":
							socketIco=1;
						break;
						case "B":
							socketIco=2;
						break;
						case "C":
							socketIco=3;
						break;
						case "D":
							socketIco=4;
						break;
					};
					PAGE.category=3;
					mainVar.socketTxt={
						choose:socketIco,
						correct:(mainVar.game.daan===$data?true:false)
					};
					tjData["appName"]="DATI"
					tjData["timu"]=mainVar.game.question||'';
					tjData["album_name"]=a||'';									
					tjData["button_name"]=$data||'';									
					tjData["result"]=mainVar.game.result=(mainVar.game.daan===$data?"answer":"participate");	
					mainVar.game.xuanze=$data;						
					prize.display(function(){							
							function queryAction(data){
								countAction({method:'queryCounter',dom:obj,counterName:'答题人数'},function($data){
									try{
										var data=toObject($data),value,nums,pA=0,pB=0,sum=0,numArr=[],numObj={"optaNum":0,"optbNum":0},parts=document.querySelectorAll(".parts"),optionArr=[];
										if(+data.errCode==0 && data.result){
										 nums=toObject(data.result);
										 nums.options?value=nums.options:value=numObj;
										}else{
											value=numObj	
										}
										pA=value.optaNum?+value.optaNum:0;pB=value.optbNum?+value.optbNum:0;sum=pA+pB;
										numArr[0]=(sum==0)?45:(pA*100/sum)^0;
										numArr[1]=(sum==0)?55:100-numArr[0];	
										optionArr=[{name:"optaNum",value:mainVar.sceneData.optionA,votes:pA,percent:numArr[0]},{name:"optbNum",value:mainVar.sceneData.optionB,votes:pB,percent:numArr[1]}];
										for(var i=0;i<parts.length;i++){
											parts[i].style.opacity=1;
											parts[i].classList.add("partsActive");
											parts[i].innerHTML=numArr[i]+"%";
										}
										setTimeout(function(){
											prizeInit(optionArr);
										},1000);	
									}catch(e){
										prizeInit();
									};
								},function(){
									prizeInit();
								}); 									
							}			
							setStorage("set","xuanze"+gameTime,$data);				
							setStorage("set","daan"+gameTime,mainVar.game.daan);				
							ele.className ="liActive";	
							countAction({option:opt,method:'accumulate',counterName:'答题人数'},queryAction,function(){setTimeout(function(){prizeInit();},1000);});												
						});
				}
			};	
		return 	method;			
		function create($data){
			var contentBox=obj.contentBox,_data=$data,str=""
			mainVar.game.daan=trim(_data.answer);
			mainVar.game.question=_data.question;	
			str='<div class="qsBox" style="background-image:url('+_data.quesBg+');"><div class="timer">'+$options.mainData.countdown+'</div>'
			+'<h3 class="title">'+_data.question+'</h3>'
			+'<ul class="options clearfix">'
			+'<li action="'+action+".,A.,optaNum"+'.,'+trim(_data.optionA)+'" style="background-image:url('+_data.optaBg+');"><span class="spanA">A</span><div class="fr partsA parts"></div><p class="fr optA">'+_data.optionA+'</p></li>'
			+'<li action="'+action+".,B.,optbNum"+'.,'+trim(_data.optionB)+'" style="background-image:url('+_data.optbBg+');"><span class="spanB">B</span><div class="fr partsB parts"></div><p class="fl optB">'+_data.optionB+'</p></li>'
			+'</ul></div>'							
			contentBox.innerHTML=str;
			var tv=setInterval(function(){
					if($options.mainData.countdown>0){
						contentBox.querySelector(".timer").innerHTML=--$options.mainData.countdown;
					}else{
						clearInterval(tv);
						gameOver();				
					}
				},1000)
				method.stop=function(){
					clearInterval(tv)
				}		
			}
},
"DATI-4":function($options){
	        var CSS='.fouronewrap{background-color:#FFF;border-radius:50%;width:270px;height:270px;overflow:hidden;position:absolute;left:50%;top:50%;margin:-135px 0 0 -135px}.fouronewrap .fo_timeover{position:absolute;z-index:10;width:100%;text-align:center;font-size:22px;font-family:Arial;color:#FFF;padding:10px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.fouronewrap .q_text{position:absolute;width:100%;top:50%;z-index:9}.fouronewrap .q_text>div{margin:0;padding:5px 10px;overflow:hidden;font-size:16px;text-align:center;background-color:#DDD;color:#5b3303;position:relative;transform:translateY(-50%);-webkit-transform:translateY(-50%);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.fouronewrap .q_text>div p{margin:0;padding:0;line-height:20px;max-height:40px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.fouronewrap .a_option li{float:left;width:135px;height:135px;position:relative;overflow:hidden}.fouronewrap .a_option .a_item{background-size:cover;background-position:center;background-repeat:no-repeat;width:135px;height:135px;position:absolute}.fouronewrap .a_option li:nth-child(2) .a_item{right:0}.fouronewrap .a_option li:nth-child(3) .a_item{bottom:0}.fouronewrap .a_option li:nth-child(4) .a_item{bottom:0;right:0}.fouronewrap .a_option .a_item .ai_info{position:absolute;text-align:center}.fouronewrap .a_option .a_item .ai_info .a_x{font-size:26px;height:40px;line-height:40px;color:#FFF;text-shadow:0 0 1px #000;font-family:Arial;font-weight:bold}.fouronewrap .a_option .a_item .ai_info .a_name{width:110px;height:32px;font-size:14px;line-height:16px;overflow:hidden;color:#FFF;text-shadow:0 0 2px #000}.fouronewrap .a_option li:nth-child(1) .ai_info{right:0}.fouronewrap .a_option li:nth-child(2) .ai_info{left:0}.fouronewrap .a_option li:nth-child(3) .ai_info{right:0}.fouronewrap .a_option li:nth-child(4) .ai_info{left:0}.fouronewrap .a_option li:nth-child(3) .a_item .ai_info .a_name,.fouronewrap .a_option li:nth-child(4) .a_item .ai_info .a_name{height:20px}.fouronewrap .a_option li .ai_info.ai_info_bottom{bottom:15px}.fouronewrap .a_option li .ai_info.ai_info_top{top:30px}.fouronewrap .a_option p{margin:0;padding:0}.fouronewrap .a_option .a_itemAnswer{position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,.7);color:#FFF;font-size:14px;text-align:center;text-shadow:0 0 2px #000;font-family:Arial;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;z-index:1}.fouronewrap .a_option li:nth-child(1) .a_itemAnswer{padding:30px 0 0 35px;}.fouronewrap .a_option li:nth-child(2) .a_itemAnswer{padding:30px 35px 0 0}.fouronewrap .a_option li:nth-child(3) .a_itemAnswer{padding:40px 0 0 35px}.fouronewrap .a_option li:nth-child(4) .a_itemAnswer{padding:40px 35px 0 0}.fouronewrap .trf_gameover{width:100%;height:100%;position:absolute;z-index:10;background-color:#061521;top:0;left:0}.fouronewrap .trf_gameover .t_tile{background-color:#eeca25;border-radius:50%;color:#c71524;position:relative}.fouronewrap .trf_gameover .t_tile label{display:block;text-align:center;height:60px;line-height:60px;font-size:24px}.fouronewrap .trf_gameover .t_tet_c{text-align:center;color:#eeca25;line-height:150%;font-size:16px;margin-top:40px}.fouronewrap .trf_gameover .t_tet{text-align:center;color:#FFF;font-size:14px;margin-top:20px}@media screen and (max-width:320px){.fouronewrap .a_option li:nth-child(1) .a_itemAnswer{padding:50px 0 0 50px;font-size:12px;}.fouronewrap .a_option li:nth-child(2) .a_itemAnswer{padding:50px 52px 0 0;font-size:12px;}.fouronewrap .a_option li:nth-child(3) .a_itemAnswer{padding: 20px 0 0 45px;font-size:12px;}.fouronewrap .a_option li:nth-child(4) .a_itemAnswer{padding: 20px 48px 0 0;font-size: 12px;}}';
			setStyle(CSS);
	        var t=this,obj=$options.ele,contentBox=obj.contentBox,action="dati-4",right
			,_gamedata=mainVar.sceneData
			,_gameQuestion=_gamedata.gameQuestion!=null?toObject(_gamedata.gameQuestion):{}
			,_gameQuestion_pic=[_gamedata.gameAP_A,_gamedata.gameAP_B,_gamedata.gameAP_C,_gamedata.gameAP_D]
			,_gameQuestion_opt=["A","B","C","D"];
			for(var i=0;i<_gameQuestion_pic.length;i++){
				_gameQuestion.option[i].pic=_gameQuestion_pic[i];	
				_gameQuestion.option[i].opt=_gameQuestion_opt[i];	
				if(trim(_gameQuestion.answer)==_gameQuestion.option[i].name){right=_gameQuestion.option[i].opt}
			}
			var method={
				display:function($data){
					create(_gamedata);
				},run:function(ele,$xuanze,$value){
					switch($xuanze){
						case "A":
							socketIco=1;
						break;
						case "B":
							socketIco=2;
						break;
						case "C":
							socketIco=3;
						break;
						case "D":
							socketIco=4;
						break;
					};
					PAGE.category=6;
					mainVar.socketTxt={
						choose:socketIco,
						correct:(mainVar.game.daan===$xuanze?true:false)
					};
				   var ulNode=document.querySelector(".a_option").childNodes,prize=prizeFun.call($options);
				   for(var i=0;i<ulNode.length;i++){
						ulNode[i].setAttribute("action",""); 
					  };														
					this.stop()	;
					tjData["appName"]="SIXUANYI"
					tjData["timu"]=_gameQuestion.value||'';
					tjData["album_name"]=$value||'';									
					tjData["button_name"]=$xuanze||'';									
					tjData["result"]=mainVar.game.result=(mainVar.game.daan===$xuanze?"answer":"participate");	
					mainVar.game.xuanze=$xuanze;	
					createNode(ele,"div",{className:'a_itemAnswer',html:_qanswer(mainVar.game.result)})	
					prize.display(function(){	
							setStorage("set","xuanze"+gameTime,$xuanze);															
							setStorage("set","daan"+gameTime,mainVar.game.daan);															
							setTimeout(prizeInit,1000);	
					});
				}
			};
			return method;
		    function create($data){
			    mainVar.game.daan=right;
				var _gqdata=_gameQuestion.option,_chtml="",_html,_wrapobj,_scale,_offsH;
				for(var i=0;i<_gqdata.length;i++){
					var $i=_gqdata[i],_tempwz='ai_info_bottom',a_txt='<p class="a_x">'+$i.opt+'</p><p class="a_name">'+$i.value+'</p>';
					if(i>1){_tempwz='ai_info_top';a_txt='<p class="a_name">'+$i.value+'</p><p class="a_x">'+$i.opt+'</p>';}
					_chtml+='<li data-option="'+$i.name+'" action="'+action+'.,'+$i.opt+'.,'+$i.value+'"><div class="a_item" style="background-color:#ccc;background-image:url('+$i.pic+');"><div class="ai_info '+_tempwz+'">'+a_txt+'</div></div></li>';
				}
			   _html='<div class="fouronewrap">'
					+'<div class="fo_timeover">'+$options.mainData.countdown+'</div>'
					+'<div class="q_text"><div class="q_text_tile"><p>'+_gameQuestion.value+'</p></div></div>'
					+'<ul class="a_option">'+_chtml+'</ul></div></div>';
				_wrapobj =createNode(contentBox,"div",{style:"position:relative;width:100%;height:100%;",html:_html})	
				_scale=_wrapobj.style.width/270;
				_wrapobj.querySelector('.fouronewrap').style.cssTxt="transform:scale("+_scale+");-webkit-transform:scale("+_scale+")";
				_offsH=_wrapobj.querySelector('.q_text_tile').style.height/2;
			    var tv=setInterval(function(){
					if($options.mainData.countdown>0){
						contentBox.querySelector(".fo_timeover").innerHTML=--$options.mainData.countdown;
					}else{
						clearInterval(tv);
						gameOver();				
					}
				},1000)
				method.stop=function(){
					clearInterval(tv)
				}		
			}
			function _qanswer(result){
				if(result=="answer"){
					var _html='<p>恭喜你<br>回答正确</p><p style="margin-top:4px;"><svg x="0px" y="0px" width="44px" height="30px" viewBox="0 0 94 66" enable-background="new 0 0 94 66" xml:space="preserve"><polygon fill="#A4CF4D" points="94.048,11.589 82.059,-0.146 38.67,42.32 12.35,16.56 0.36,28.293 26.681,54.054 26.678,54.057   38.667,65.791 38.67,65.788 38.673,65.791 50.662,54.057 50.66,54.054 "/></svg></p>';
				}else{
					var _html='<p>回答错误<br>正确答案为'+mainVar.game.daan+'</p><p style="margin-top:4px;"><svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 75 75" enable-background="new 0 0 75 75" xml:space="preserve"><polygon fill="#F26832" points="58.107,46.226 49.383,37.5 56.941,29.941 56.941,29.941 74.588,12.295 62.705,0.412 45.559,17.559 37.5,25.617 37.5,25.617 12.295,0.412 0.412,12.294 25.617,37.5 25.616,37.501 17.559,45.559 0.411,62.706 12.294,74.589 30.837,56.046 37.499,49.384 37.499,49.384 47.808,59.692 47.808,59.692 62.705,74.59 74.588,62.707 58.107,46.226 "/></svg></p>';
				}
				return _html;
			}
		}
,NEWDATI:function($options){
	setStyle('.interWraper{height:300px;width:100%;z-index:4;margin-top:'+(winW/5+50)+'px;position:relative}.centerArea,.errorArea{border-radius:10px;width:75%;margin:0 auto}.centerArea{padding:4px;position:absolute;z-index:10;left:50%;top:0%;-webkit-transform:translate(-50%,0%);opacity:1}.centerArea .showArea{border-radius:10px;background:rgba(255,255,255,.6)}.centerArea .blueBtn,.errorArea .blueBtn{width:85%;background:#298ddf;border:1px solid #186db2;border-radius:5px;margin:0 auto;font-size:16px;height:40px;line-height:40px;color:#fff;box-shadow:0 4px rgba(0,0,0,.2)}.dati{width:89%;margin:0 auto;padding-bottom:15px;box-sizing:border-box}.dati .timer{padding:14px 0 14px 0;text-align:center;font-size:22px;color:#3d1307;font-weight:bolder}.dati .question{font-size:18px;margin:0 0 20px 0;line-height:1.6em}.dati .liTxt{margin:0 0 10px 0}.dati .liTxt .liContent{position:relative;width:100%;box-sizing:border-box;border:1px #bababa solid;padding:10px 0 10px 17px;border-radius:5px;background:#fff;box-shadow:1px 2px 2px rgba(0,0,0,.3);line-height:1.6em;color:#3e3e3e;font-size:18px}.dati .liTxt p,.dati .liTxt span{display:inline-block;vertical-align:top}.dati .options span{margin-right:10px}.dati .liTxt p{width:60%}.dati .liTxt .active{background:#fdf3d0;color:#298ddf;border:1px #186db2 solid}.dati .optname{position:absolute;left:50%;bottom:10px;width:80%;-webkit-transform:translateX(-50%);border-radius:8px;height:30px;background:#fff url(../img/dati_opt.png) no-repeat left center;background-size:30% 100%;box-sizing:border-box;line-height:30px;padding-left:25%;color:#3e3e3e}.dati .nameActive{border:1px #ff6c00 solid;background-color:#ffe6a2}.datiMoveIn{-webkit-animation:datiMoveIn 1.2s both}.datiMoveOut{-webkit-animation:datiMoveOut 1s both}@-webkit-keyframes datiMoveIn{0%{top:-50%;opacity:0}60%{top:10%}100%{top:0%;opacity:1}}@-webkit-keyframes datiMoveOut{0%{top:50%;opacity:1}100%{top:100%;opacity:0}}.dati .options{border-radius:10px;overflow:hidden}.dati .liImg{width:50%;float:left;height:130px;overflow:hidden;position:relative}.dati .liImg img{width:100%}.liImg .pers{position:absolute;left:5px;top:5px;color:#fff000;font-size:14px;text-shadow:0 0 2px rgba(0,0,0,.5);opacity:0;-webkit-transition:all linear .8s}.liImg .pers span{font-size:18px;display:block;font-weight:bolder}.liImg .pers em{font-size:14px;font-weight:bolder;font-style:normal}.overImg{width:80%;display:block;margin:0 auto;padding:40px 0}.overBtn{display:block;width:100%;margin:30px auto 0 auto;text-align:center;padding:10px 0;background:#298ddf;color:#fff;border-radius:5px;font-size:1.2em;box-shadow:0 1px 2px rgba(0,0,0,.1);text-decoration:none}.persState{position:absolute;right:5%;top:50%;-webkit-transform:translateY(-50%);width:10%}.persTxt{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);width:20%}.liPercent{height:30px;line-height:30px;-webkit-transition:all linear 1s;display:none;font-size:16px}.percent{height:8px;width:0;background:#298ddf;display:inline-block;vertical-align:middle;margin-right:10px;-webkit-transition:all linear 1s}.liTxt .liPercent span{color:#fa393b;vertical-align:middle}.btnAfter{background:#9c9c9c}@media screen and (min-width:320px) and (max-width:359px){.dati .liTxt{margin:0 0 8px 0}.dati .liTxt .liContent{line-height:1.5em;padding:10px 0 10px 13px;font-size:12px}.liPercent{font-size:10px}.dati .question{margin:0 0 13px 0;font-size:12px}.dati .timer{font-size:18px;padding:10px 0}.overBtn{margin:15px auto 0 auto;font-size:12px}.percent{height:5px}}@media screen and (min-width:360px) and (max-width:410px){.dati .liTxt{margin:0 0 10px 0}.dati .liTxt .liContent{line-height:1.5em;padding:10px 0 10px 13px;font-size:16px}.liPercent{font-size:14px}.dati .question{margin:0 0 13px 0;font-size:16px}.dati .timer{font-size:20px;padding:12px 0}.overBtn{margin:20px auto 0 auto;font-size:16px}.percent{height:5px}}@media screen and (min-width:414px){.dati .liImg{height:150px}}');
	mainVar.ele.svgBody.style.opacity='0';
	mainVar.ele.svgBody.style.zIndex='-1';
	var t=this,obj=$options.ele,optionArr=[]
	    ,action="newDati"				
		,nums
		,method={
				display:function(){
					create(mainVar.sceneData);
				},run:function(ele,xuanze,value,num,name){
				   var state=ele.getAttribute("state"),pers,liContent=ele.querySelector('.liContent');
				   if(state=='0'){
						trim(mainVar.sceneData.type)=='文字'?liContent.classList.add("active"):liContent.lastChild.classList.add("nameActive");
						pers=createNode(liContent,'img',{className:'persState',src:PAGE.COMMON+"img/dx_right.png",style:"opacity:1;"},'p3');	
						ele.setAttribute("state",xuanze);
					 }else{
						trim(mainVar.sceneData.type)=='文字'?liContent.classList.remove("active"):liContent.lastChild.classList.remove("nameActive");
						ele.setAttribute("state","0");
						removeNode(liContent.querySelector('.persState'));
					}
				},setPrize:function(){
					this.stop()	;	
					var ulNode=document.querySelector(".options").childNodes,ulList=ulNode.length,xuanze='',value='',prize=prizeFun.call($options),numXuan=0;
					for(var i=0;i<ulList;i++){
						var a=ulNode[i],b=a.getAttribute("state"),c=a.getAttribute("value"),d=a.querySelector('.liContent'),e=a.getAttribute("action");
						if(b!='0'){
							xuanze+=b;value+=c+'/';numXuan++;
							countAction({option:"option"+e,method:'accumulate',counterName:'答题人数',instanceId:mainVar.contentId},function(){},function(){setTimeout(function(){prizeInit();},2000);});	
						}
						trim(mainVar.sceneData.type)=='文字'?d.classList.remove("active"):d.lastChild.classList.remove("nameActive");
						if(a.querySelector('.persState'))removeNode(a.querySelector('.persState'));
					};
					if(numXuan==0){tishi("请您选择答案！");return;}
					tishi("您选择的答案是："+xuanze);
					mainVar.ele.dtBtn.innerHTML='已提交';
					mainVar.ele.dtBtn.style.background='#9c9c9c';
					mainVar.ele.dtBtn.setAttribute("action"," ");
					PAGE.category=3;
					mainVar.socketTxt={
						choose:ulList,
						correct:(mainVar.game.daan===xuanze?true:false)
					};
					tjData["appName"]="NEWDATI"
					tjData["timu"]=mainVar.game.question||'';
					tjData["album_name"]=value||'';									
					tjData["button_name"]=xuanze||'';									
					tjData["result"]=mainVar.game.result=(mainVar.game.daan===xuanze?"answer":"participate");	
					mainVar.game.xuanze=xuanze;
					setStorage("set","xuanze"+gameTime,xuanze);
					setStorage("set","daan"+gameTime,mainVar.game.daan);
					mainVar.video!==0&&videoPlay(mainVar.adData.adVideo);
					prize.display(function(){
						countAction({method:'queryCounter',dom:obj,counterName:'答题人数',instanceId:mainVar.contentId},function($data){
								try{
									var data=toObject($data);
									if(data.errCode=='0'){
										var nums=data.result
										,count=nums.options,a,b,sum=0,liHtml='';
										 for(var i=0,len=optionArr.length;i<len;i++){
											a=optionArr[i];
											a.votes=0;
											for(var j in count){
												b=+count[j];
												if(i==0){sum+=b;};
												if(j==a.name){
													a.votes=b;
												}
											}
											if(sum>0){a.percent=+((a.votes*100)/(sum*100)*100).toFixed(0)}else{a.percent=0;};	
											if(trim(mainVar.sceneData.type)=='图片'){
												var pers=createNode(ulNode[i],'div',{className:'pers',html:'<span>'+a.percent+'<em>%</em></span>观众选择TA',style:"opacity:1;"},'p3');	
											}else{
												var pers=createNode(ulNode[i],'div',{className:'liPercent',style:"display:block",html:'<div class="percent" style="width:'+(a.percent)+'px"></div><span>'+a.percent+'%</span><span>共有'+a.votes+'人选择</span>'},'p3');
											}
										}
										 mainVar.ele.interWraper.style.height=mainVar.ele.centerArea.offsetHeight+'px';
									}
									setTimeout(function(){
										mainVar.ele.interWraper.classList.remove('datiMoveIn');
										mainVar.ele.interWraper.classList.add('datiMoveOut');
										prizeInit(optionArr);
									},3000);
								}catch(e){
									mainVar.ele.interWraper.classList.remove('datiMoveIn');
									mainVar.ele.interWraper.classList.add('datiMoveOut');
									prizeInit(optionArr);
								};
							},function(){
									mainVar.ele.interWraper.classList.remove('datiMoveIn');
									mainVar.ele.interWraper.classList.add('datiMoveOut');
									prizeInit(optionArr);
								}) 									
					});
				}
			};	
		return 	method;			
		function create($data){
			var contentBox=obj,str="",html,lilist='',a,b,letter=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],time=n2t($options.mainData.countdown,[{v:60,u:":"},{v:1,u:""}]),liNode=[];
			for(var i in $data){
				if(i.indexOf("option")!=-1 && $data[i]){
					optionArr.push({
						name:i,
						value:$data[i],
					});
				}	
			}
			mainVar.dxLen=optionArr.length
			mainVar.game.daan=trim($data.answer);
			mainVar.game.question=$data.question;	
			mainVar.ele.interWraper=createNode(mainVar.ele.mainScroll,'div',{className:'interWraper'},'p3');
            var centerArea=createNode(mainVar.ele.interWraper,'div',{className:'centerArea'},'p3')
            ,showArea=createNode(centerArea,'div',{className:'showArea'},'p3');
			html='<div class="timer">'+time+'</div><div class="question">'+$data.question+'</div>';
            var datiArea=createNode(showArea,'div',{className:'dati',html:html},'p3')
			,ulList=createNode(datiArea,'ul',{className:'options'},'p3');	
			for(var i=0,len=optionArr.length;i<len;i++){
				a=optionArr[i];
				if(trim($data.type)=='文字'){
					liNode[i]=createNode(ulList,'li',{className:'liTxt',action:i,state:"0",value:a.value,html:'<div class="liContent"><span>'+letter[i]+'.</span><p>'+a.value+'</p></div>'},'p3');
				}else{
					liNode[i]=createNode(ulList,'li',{className:'liImg',action:i,state:"0",value:a.value,html:'<img src="'+a.value+'"><div class="optname"></div>'},'p3');
				}
				liNode[i].onclick=function(){var num=this.getAttribute("action");mainVar.module.run(this,letter[num],optionArr[num].value,num,optionArr[num].name);}
			}
			mainVar.ele.dtBtn=createNode(datiArea,'div',{className:'overBtn',action:action,html:'确定'},'p3');
			centerArea.classList.add('datiMoveIn');
			mainVar.ele.centerArea=centerArea;
			mainVar.ele.interWraper.style.height=(centerArea.offsetHeight+10)+'px';
			var tv=setInterval(function(){
					if($options.mainData.countdown>0){
						DB.querySelector(".timer").innerHTML=n2t(--$options.mainData.countdown,[{v:60,u:":"},{v:1,u:""}]);
					}else{
						clearInterval(tv);
						if(!mainVar.game.xuanze)gameOver();
						mainVar.ele.interWraper.style.height='360px';
						DB.style.height=winH+"px";
						if(mainVar.banquan)DB.appendChild(mainVar.banquan);

					}
				},1000)
			method.stop=function(){
					clearInterval(tv)
				}		
			}
    }
,DANXUAN:function($options){
	setStyle('.interWraper{height:300px;width:100%;z-index:4;margin-top:'+(winH/5+45)+'px;position:relative}.centerArea,.errorArea{border-radius:10px;width:75%;margin:0 auto}.centerArea{padding:4px;position:absolute;z-index:10;left:50%;top:0%;-webkit-transform:translate(-50%,0%);opacity:1}.centerArea .showArea{border-radius:10px;background:rgba(255,255,255,.6)}.centerArea .blueBtn,.errorArea .blueBtn{width:85%;background:#298ddf;border:1px solid #186db2;border-radius:5px;margin:0 auto;font-size:16px;height:40px;line-height:40px;color:#fff;box-shadow:0 4px rgba(0,0,0,.2)}.dati{width:89%;margin:0 auto;padding-bottom:15px;box-sizing:border-box}.dati .timer{padding:14px 0 14px 0;text-align:center;font-size:22px;color:#3d1307;font-weight:bolder}.dati .question{font-size:18px;margin:0 0 20px 0;line-height:1.6em}.dati .liTxt{margin:0 0 10px 0}.dati .liTxt .liContent{position:relative;width:100%;box-sizing:border-box;border:1px #bababa solid;padding:10px 0 10px 17px;border-radius:5px;background:#fff;box-shadow:1px 2px 2px rgba(0,0,0,.3);line-height:1.6em;color:#3e3e3e;font-size:18px}.dati .liTxt p,.dati .liTxt span{display:inline-block;vertical-align:top}.dati .options span{margin-right:10px}.dati .liTxt p{width:60%}.dati .liTxt .active{background:#fdf3d0;color:#298ddf;border:1px #186db2 solid}.dati .optname{position:absolute;left:50%;bottom:10px;width:80%;-webkit-transform:translateX(-50%);border-radius:8px;height:30px;background:#fff url(../img/dati_opt.png) no-repeat left center;background-size:30% 100%;box-sizing:border-box;line-height:30px;padding-left:25%;color:#3e3e3e}.dati .liContent .active{background: #fdf3d0;color: #298ddf;border: 1px #186db2 solid}.datiMoveIn{-webkit-animation:datiMoveIn 1.2s both}.datiMoveOut{-webkit-animation:datiMoveOut 1s both}@-webkit-keyframes datiMoveIn{0%{top:-50%;opacity:0}60%{top:10%}100%{top:0%;opacity:1}}@-webkit-keyframes datiMoveOut{0%{top:50%;opacity:1}100%{top:100%;opacity:0}}.dati .options{border-radius:10px;overflow:hidden}.dati .liImg{width:50%;float:left;height:130px;overflow:hidden;position:relative}.dati .liImg img{width:100%}.liImg .pers{position:absolute;left:5px;top:5px;color:#fff000;font-size:14px;text-shadow:0 0 2px rgba(0,0,0,.5);opacity:0;-webkit-transition:all linear .8s}.liImg .pers span{font-size:18px;display:block;font-weight:bolder}.liImg .pers em{font-size:14px;font-weight:bolder;font-style:normal}.overImg{width:80%;display:block;margin:0 auto;padding:40px 0}.overBtn{display:block;width:100%;margin:30px auto 0 auto;text-align:center;padding:10px 0;background:#298ddf;color:#fff;border-radius:5px;font-size:1.2em;box-shadow:0 1px 2px rgba(0,0,0,.1);text-decoration:none}.persState{position:absolute;right:5%;top:50%;-webkit-transform:translateY(-50%);width:10%}.persTxt{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);width:20%}.liPercent{height:30px;line-height:30px;-webkit-transition:all linear 1s;display:none;font-size:16px}.percent{height:8px;width:0;background:#298ddf;display:inline-block;vertical-align:middle;margin-right:10px;-webkit-transition:all linear 1s}.liTxt .liPercent span{color:#fa393b;vertical-align:middle}.btnAfter{background:#9c9c9c}@media screen and (min-width:320px) and (max-width:359px){.dati .liTxt{margin:0 0 8px 0}.dati .liTxt .liContent{line-height:1.5em;padding:10px 0 10px 13px;font-size:12px}.liPercent{font-size:10px}.dati .question{margin:0 0 13px 0;font-size:12px}.dati .timer{font-size:18px;padding:10px 0}.overBtn{margin:15px auto 0 auto;font-size:12px}.percent{height:5px}}@media screen and (min-width:360px) and (max-width:410px){.dati .liTxt{margin:0 0 10px 0}.dati .liTxt .liContent{line-height:1.5em;padding:10px 0 10px 13px;font-size:16px}.liPercent{font-size:14px}.dati .question{margin:0 0 13px 0;font-size:16px}.dati .timer{font-size:20px;padding:12px 0}.overBtn{margin:20px auto 0 auto;font-size:16px}.percent{height:5px}}@media screen and (min-width:414px){.dati .liImg{height:150px}}');
	mainVar.ele.svgBody.style.opacity='0';
	mainVar.ele.svgBody.style.zIndex='-1';
	var t=this,obj=$options.ele,optionArr=[]
	    ,action="newDati"				
		,nums
		,method={
				display:function(){
					create(mainVar.sceneData);
				},run:function(ele,xuanze,value,num,name){
				   var state=ele.getAttribute("state"),pers,liContent=ele.querySelector('.liContent');
				   if(state=='0'){
						trim(mainVar.sceneData.type)=='文字'?liContent.classList.add("active"):liContent.classList.add("active");
						pers=createNode(liContent,'img',{className:'persState',src:PAGE.COMMON+"img/dx_right.png",style:"opacity:1;"},'p3');	
						ele.setAttribute("state",xuanze);
					 }else{
						trim(mainVar.sceneData.type)=='文字'?liContent.classList.remove("active"):liContent.classList.remove("active");
						ele.setAttribute("state","0");
						removeNode(liContent.querySelector('.persState'));
					}
				},setPrize:function(){
					this.stop();
					var ulNode=document.querySelector(".options").childNodes,ulList=ulNode.length,xuanze='',value='',prize=prizeFun.call($options),numXuan=0;
					for(var i=0;i<ulList;i++){
						var a=ulNode[i],b=a.getAttribute("state"),c=a.getAttribute("value"),d=a.querySelector('.liContent'),e=a.getAttribute("action");
						if(b!='0'){
							xuanze+=b;value+=c+'/';numXuan++;
							countAction({option:"option"+e,method:'accumulate',counterName:'答题人数',instanceId:mainVar.contentId},function(){},function(){setTimeout(function(){prizeInit();},2000);});	
						}
					};
					if(numXuan==0){tishi("请您选择答案！");return;}
					tishi("您选择的答案是："+xuanze);
					PAGE.category=3;
					mainVar.socketTxt={
						choose:ulList,
						correct:(mainVar.game.daan===xuanze?true:false)
					};
					tjData["appName"]="DANXUAN"
					tjData["timu"]=mainVar.game.question||'';
					tjData["album_name"]=value||'';									
					tjData["button_name"]=xuanze||'';									
					tjData["result"]=mainVar.game.result=(mainVar.game.daan===xuanze?"answer":"participate");	
					mainVar.game.xuanze=xuanze;
					setStorage("set","xuanze"+gameTime,xuanze);
					setStorage("set","daan"+gameTime,mainVar.game.daan);
					mainVar.video!==0&&videoPlay(mainVar.adData.adVideo);
					prize.display(function(){
						countAction({method:'queryCounter',dom:obj,counterName:'答题人数',instanceId:mainVar.contentId},function($data){
								try{
									var data=toObject($data);
									if(data.errCode=='0'){
										var nums=data.result
										,count=nums.options,a,b,sum=0,liHtml='';
										 for(var i=0,len=optionArr.length;i<len;i++){
											a=optionArr[i];
											a.votes=0;
											for(var j in count){
												b=+count[j];
												if(i==0){sum+=b;};
												if(j==a.name){
													a.votes=b;
												}
											}
											if(sum>0){a.percent=+((a.votes*100)/(sum*100)*100).toFixed(0)}else{a.percent=0;};	
										}
										 mainVar.ele.interWraper.style.height=mainVar.ele.centerArea.offsetHeight+'px';
									}
									mainVar.ele.interWraper.classList.remove('datiMoveIn');
									mainVar.ele.interWraper.classList.add('datiMoveOut');
									prizeInit(optionArr);
								}catch(e){
									mainVar.ele.interWraper.classList.remove('datiMoveIn');
									mainVar.ele.interWraper.classList.add('datiMoveOut');
									prizeInit(optionArr);
								};
							},function(){
								mainVar.ele.interWraper.classList.remove('datiMoveIn');
								mainVar.ele.interWraper.classList.add('datiMoveOut');
								prizeInit(optionArr);
							}) 									
					});
				}
			};	
		return 	method;			
		function create($data){
			var contentBox=obj,str="",html,lilist='',a,b,letter=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],time=n2t($options.mainData.countdown,[{v:60,u:":"},{v:1,u:""}]),liNode=[],question=JSON.parse($data.question),option=question.option;
			mainVar.game.daan=question.answer[0];
			for(var i=0;i<option.length;i++){
				if(option[i].name==question.answer[0])mainVar.game.daan=letter[i]
				optionArr.push({
					name:i,
					value:option[i].value,
				});
			}
			mainVar.dxLen=optionArr.length
			mainVar.game.question=question.value;	
			mainVar.ele.interWraper=createNode(mainVar.ele.mainScroll,'div',{className:'interWraper'},'p3');
            var centerArea=createNode(mainVar.ele.interWraper,'div',{className:'centerArea'},'p3')
            ,showArea=createNode(centerArea,'div',{className:'showArea'},'p3');
			html='<div class="timer">'+time+'</div><div class="question">'+question.value+'</div>';
            var datiArea=createNode(showArea,'div',{className:'dati',html:html},'p3')
			,ulList=createNode(datiArea,'ul',{className:'options'},'p3');	
			for(var i=0,len=optionArr.length;i<len;i++){
				a=optionArr[i];
				liNode[i]=createNode(ulList,'li',{className:'liTxt',action:i,state:"0",value:a.value,html:'<div class="liContent"><span>'+letter[i]+'.</span><p>'+a.value+'</p></div>'},'p3');
				liNode[i].onclick=function(){
					if(mainVar.run)return;mainVar.run=1;
					var num=this.getAttribute("action");
					mainVar.module.run(this,letter[num],optionArr[num].value,num,optionArr[num].name);
					setTimeout(mainVar.module.setPrize,500)
				}
			}
			centerArea.classList.add('datiMoveIn');
			mainVar.ele.centerArea=centerArea;
			mainVar.ele.interWraper.style.height=(centerArea.offsetHeight+10)+'px';
			var tv=setInterval(function(){
					if($options.mainData.countdown>0){
						DB.querySelector(".timer").innerHTML=n2t(--$options.mainData.countdown,[{v:60,u:":"},{v:1,u:""}]);
					}else{
						clearInterval(tv);
						if(!mainVar.game.xuanze)gameOver();
						mainVar.ele.interWraper.style.height='360px';
						DB.style.height=winH+"px";
						if(mainVar.banquan)DB.appendChild(mainVar.banquan);

					}
				},1000)
			method.stop=function(){
					clearInterval(tv)
				}		
			}
    }
,DIANZAN:function($options){
				var CSS='.zanBox{width:100%;height:100%;border-radius:50%;box-sizing:border-box;overflow:hidden;text-align:center;color:#fff;background:url('+PAGE.COMMON+'img/dianzanpic.png) no-repeat center center;background-size:100%}.zanBox .timer{height:20%;font-size:2rem;border-bottom:1px solid rgba(255,255,255,.3)}.zanCount{position:relative;height:80%}.zanTxt{line-height:120px;font-size:1.2rem;text-shadow:2px 2px 2px #000;-webkit-animation:bigger 1s ease-in}.heartRound{width:54px;height:54px;background:rgba(255,255,255,.3);border-radius:50%;position:absolute;bottom:40px;left:50%;margin-left:-27px;z-index:999}.heartRound img{height:36px;margin:12px auto 6px auto}.zanNum{width:100%;height:30px;position:absolute;bottom:8px}.zanNum p{line-height:30px}.zanNum p span{display:inline-block;width:13px;height:14px;margin-right:10px;margin-top:8px;background:url('+PAGE.COMMON+'img/whitehand.png) no-repeat center center;background-size:100% auto}.zanNum p em{font-style:normal}.heartRound b{color:#f91f5d;font-size:1.6rem;opacity:0;position:absolute;left:55%;top:-40%;-webkit-transform:translate(-50%,-50%)}.marskBox{width:100%;height:100%;border-radius:50%;background-color:rgba(249,31,93,.2);display:none;position:absolute;left:0;top:0}.b2{color:#f91f5d;font-size:1.6rem;opacity:0;display:block;position:absolute;-webkit-transform:translate(-50%,-50%)}.hand{position:relative;margin-top:12px;width:100%;height:100%}.hand img{width:20%;position:absolute}.hand .zanA{left:50%;top:40%;-webkit-transform:translate(-50%,-50%)}.hand .zanB{left:40%}.zannums{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);color:#206aa7;opacity:0}.hand b{opacity:0;position:absolute;left:60%;top:50%;-webkit-transform:translate(-50%,-50%);font-size:14px;color:#e81040}.zanImg{-webkit-animation-name:zoomOutUp;-webkit-animation-duration:1s}.zan{background:#d1def4}.addMove{-webkit-animation:addMove 1s forwards}.numAc{-webkit-animation:zannum 1s forwards}@-webkit-keyframes addMove{0%{top:50%;opacity:0}40%{top:20%;opacity:1}80%{top:20%;opacity:1}100%{top:0;opacity:0}}@-webkit-keyframes zannum{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes addMove2{0%{top:60%;opacity:0}60%{top:40%;opacity:1}100%{top:30%;opacity:0}}@-webkit-keyframes bigger{0%{-webkit-transform:scale(1)}50%{-webkit-transform:scale(1.2)}100%{-webkit-transform:scale(1)}}@-webkit-keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(1.875,1.875,1.875) translate3d(0,0,0);transform:scale3d(1.875,1.875,1.875) translate3d(0,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}100%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}';
				setStyle(CSS);
				mainVar.dianzan={};
	 			var t=this,obj=$options.ele;	
			    var action="dianzan"
					,nums
					,zanCount=0
					,countTime=0
					,method={
						display:function(){
								create(mainVar.sceneData)																		
							},setPrize:function(){
								var dsp=mainVar.adData.adpositions1;
								if(!(dsp&&dsp.type==2)){
									if(mainVar.adData.adVideo||mainVar.adData.otherVideo){
										if(mainVar.video){
											if(mainVar.adData.adVideo){
												mainVar.video.src=mainVar.adData.adVideo;
											};
											if(!(dsp&&dsp.type==1)){
												if(mainVar.adData.otherVideoInfo){
													otherVideoReport();
												};
											};
											mainVar.video.play();
										};
										tjData["result"]=mainVar.game.result="answer";	
										tjData["videoUrl"]=mainVar.adData.adVideo;	
										tjData["appName"]="广告页面";		
										tjData["button_name"]='播放视频';	
										TJ(113000)	
									};
								};
								var prize=prizeFun.call($options);
								tjData["timu"]='点赞';
								tjData["album_name"]='';
								tjData["button_name"]='';
								tjData["result"]=mainVar.game.result="answer";																	
								prize.display(function(){											
									setStorage("set","daan"+gameTime,"A");		
									setStorage("set","xuanze"+gameTime,"A");
									setStorage("set","zanCount"+gameTime,zanCount);	
									countAction({option:'optbNum',method:'accumulate',counterName:'点赞人数',number:zanCount},function(){setTimeout(function(){prizeInit();},1000)},function(){setTimeout(function(){prizeInit();},1000);});			
								});
							},run:function(){
								PAGE.category=2;
								mainVar.socketTxt='';
								mainVar.video!==0&&videoPlay();
								mainVar.dianzan.parts.className="b addMove";
								zanCount++;								
								mainVar.game.xuanze="A";
								mainVar.game.daan="A";
								if(countTime){																		
									mainVar.dianzan.marskBox.style.display='block';								
									var b2 = createNode(mainVar.dianzan.marskBox,"b",{className:"b2",html:zanCount},"p3");				
									b2.style.left=(Math.random()*50+25)+"%";
									b2.style.webkitAnimation='addMove2 '+Math.ceil((Math.random()*3000)/2)+'ms linear';		
									b2.addEventListener("webkitAnimationEnd", function(){removeNode(b2);}, false);							
								}else{									
									mainVar.dianzan.zanP1.style.display='none';
								}
							}
						};
					return method;
					function create($data){
						var _data=$data,html,contentBox=obj.contentBox,zanIco;
						countTime=+_data.countdown					
						zanIco=_data.zanIco?_data.zanIco:PAGE.COMMON+"img/redheart.png";
						if($options.mainData.countdown>6){
							html='<div class="zanBox" style="background:url('+_data.zanPeople+');background-size:100%;"><div class="timer">'+countTime+'</div>'	
							+'<div class="zanCount">'
							+'<div class="zanCounts"></div>'
							+'<div class="heartRound" action='+action+".,zanNum"+'><img src="'+zanIco+'" /><b class="b"></b></div>'
							+'<div class="zanNum"><p id="zanP1" style="font-size:14px;text-shadow:2px 2px 2px #000;">'+(_data.zanTxt||"点击赞TA")+'</p></div>'	
							+'</div><div class="marskBox"></div></div></div>';							
							contentBox.innerHTML=html	
							mainVar.dianzan.parts=contentBox.querySelector(".b");
							mainVar.dianzan.marskBox=contentBox.querySelector(".marskBox");
							mainVar.dianzan.zanCounts=contentBox.querySelector('.zanCounts');
							mainVar.dianzan.zanP1=document.getElementById('zanP1');
							tv=setInterval(function(){
								$options.mainData.countdown--;									
								if($options.mainData.countdown>-1){	
									if(zanCount){
										countTime--									
									}
									var s=Math.min(countTime,$options.mainData.countdown)
									contentBox.querySelector(".timer").innerText=s;
									if(s===0){method.stop();
										if(zanCount){
											mainVar.dianzan.zanCounts.innerHTML='<p class="zanTxt">'+(_data.zanTxtAfter||"您共为TA点赞")+'<b style="color:#f91f5d;font-size:1.4rem;">+'+zanCount+'</b>'+(CONFIG.chars.button.i||"次")+'</p>';				
											mainVar.dianzan.marskBox.style.display='none';
											contentBox.querySelector('.heartRound').removeAttribute('action');
											mainVar.module.setPrize();
										}else{
												gameOver()
											}
										}										
									}else{
										clearInterval(tv)									
										}
								},1000)	
							method.stop=function(){
								clearInterval(tv)
								}						
						}else{
							gameOver()
							}		
					}				
			}
,DIANJIJINRU:function($options){
				setStyle('.zanBox{width:100%;height:100%;border-radius:50%;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,1)}.zanBox .timer{width:51%;background:rgba(51,182,250,.6);color:#fff;text-align:center;border-radius:50%;padding:45px 0 10px 0;font-size:24px;margin:-40px auto 0 auto}.djjr_btn{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);width:24%;z-index:10;}.djjr_btn2{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);width:24%;opacity:0}.pulse2{-webkit-animation:pulse2 200ms forwards ease-in-out;-webkit-transform-origin:center center}@-webkit-keyframes pulse2{from{-webkit-transform:scale3d(1,1,1) translate(-50%,0)}50%{-webkit-transform:scale3d(1.1,1.1,1.1) translate(-50%,0)}to{-webkit-transform:scale3d(1,1,1) translate(-50,0)}}');
				mainVar.dianzan={};
	 			var t=this,obj=$options.ele;	
			    var action="dianjijinru"
					,nums
					,zanCount=0
					,countTime=0
					,method={
						display:function(){
								create(mainVar.sceneData)																		
							},run:function(ele){
								ele.setAttribute("action"," ");
								this.stop();				
							    ele.classList.add("pulse2");
								mainVar.game.xuanze="A";
								mainVar.game.daan="A";
								var prize=prizeFun.call($options);
								tjData["timu"]='点击进入';
								tjData["album_name"]='';
								tjData["button_name"]='';
								tjData["result"]=mainVar.game.result="answer";	
							    mainVar.video!==0&&videoPlay(mainVar.adData.adVideo);
								prize.display(function(){
									prizeInit();
									setStorage("set","daan"+gameTime,"A");
									setStorage("set","xuanze"+gameTime,"A");
									}
								);
							}
						};
					return method;
					function create($data){
						var _data=$data,contentBox=obj.contentBox,zanIco;
						zanIco=_data.zanIco?_data.zanIco:PAGE.COMMON+"img/redheart.png";
						str='<div class="zanBox" style="background-image:url('+_data.zanPeople+');background-size:100%;"><div class="timer">'+$options.mainData.countdown+'</div>'
						    +'<img src="'+zanIco+'" class="djjr_btn" action="'+action+'">'
							+'</div>'							
						contentBox.innerHTML=str;
						var tv=setInterval(function(){
								if($options.mainData.countdown>0){
									contentBox.querySelector(".timer").innerHTML=--$options.mainData.countdown;
								}else{
									clearInterval(tv);
									gameOver();				
								}
							},1000)
							method.stop=function(){
								clearInterval(tv)
							}		
								}				
			}
,CAITU:function($options){
	    var CSS='body,html{height:100%;-webkit-touch-callout:none;-webkit-user-select:none}h1,h2,h3,h4,h5,h6{margin:0;padding:0;font-size:100%;font-weight:normal}ul,li{list-style:none}html{-webkit-text-size-adjust:none}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}@media screen and (max-width:479px){.yuan,.option{font-size:10px;-webkit-text-size-adjust:none}}@media screen and (min-width:480px) and (max-width:639px){.yuan,.option{font-size:15px;-webkit-text-size-adjust:none}}@media screen and (min-width:640px) and (max-width:719px){.yuan,.option{font-size:20px;-webkit-text-size-adjust:none}}@media screen and (min-width:720px){.yuan,.option{font-size:22.5px;-webkit-text-size-adjust:none}}.yuan{width:100%;height:100%;border-radius:50%;border:1px solid rgba(255,255,255,.05);box-sizing:border-box;overflow:hidden;z-index:1}.answer{width:100%;height:100%;text-align:center}.answer h2{width:100%;color:#fff;font-size:2.5em;padding-top:.2em}.answer p{width:100%;color:#fff;font-size:1.8em;padding-top:57%;font-weight:bold;-webkit-text-fill-color:#fff;-webkit-text-stroke:.04em #ea0b3a}.answer div{font-size:1.6em;width:1.9em;height:1.9em;background:#fff;opacity:.7;line-height:1.9em;margin-right:2.4%;border-radius:.5em;color:#000;vertical-align:middle;display:inline-block;margin-top:.5em}.answer div:last-child{margin-right:0}.rotation{animation:x-spin 2s;-webkit-animation:x-spin 1.5s}@-webkit-keyframes x-spin{0%{transform:scale(1)}50%{transform:scale(1.5)}100%{transform:scale(1)}}.option{position:absolute;z-index:10;top:68%;left:50%;-webkit-transform:translateX(-50%);width:100%;text-align:center}.option div{display:inline-block;font-size:1.64em;width:2em;height:2em;line-height:2em;background:#00396f;border-radius:.5em;text-align:center;margin-right:.35em;margin-top:.4em;color:#fff}.option div:last-child{margin-right:0}@media screen and (min-width:319px) and (max-width:358px){.answer p{padding-top:51%}.answer div{font-size:1.5em;width:1.7em;height:1.7em;line-height:1.7em}.option{top:70%}.option div{font-size:1.8em;width:1.7em;height:1.7em;line-height:1.7em}}@media screen and (min-width:319px) and (max-height:481px){.option div{font-size:1.5em}}@media screen and (min-width:359px) and (max-width:376px){.answer p{padding-top:55%}.answer div{margin-top:.4em}.option{top:70%}}@media screen and (min-width:377px) and (max-width:413px){.option{top:73%}}@media screen and (min-width:414px){.answer h2{font-size:3em}.answer p{padding-top:57%;font-size:2em}.answer div{font-size:2.1em;width:1.7em;height:1.7em;line-height:1.7em;margin-top:.3em}.option{top:70%}.option div{font-size:2.3em;width:1.7em;height:1.7em;line-height:1.7em}}';
		setStyle(CSS);
        var t=this,obj=$options.ele;	
        var  action="caitu"
            ,index=0
            ,nums
            ,_arr=[]
			,opp	
			,gameAudio		
				,kaiguan
				,method={
					display:function($data){
						create(mainVar.sceneData)
					},run:function(ele,$data,opt,a){
						this.stop();
						var asNum=document.querySelector('.answer').querySelectorAll('div'),arrtxt='',prize=prizeFun.call($options);
						for(var i=0;i<asNum.length;i++){
							arrtxt+=asNum[i].innerText;
						}
						PAGE.category=7;
						mainVar.socketTxt={
							choose:arrtxt,
							correct:(mainVar.game.daan===arrtxt?true:false)
						};
							tjData["timu"]=mainVar.game.question||'';
							tjData["album_name"]=a||'';
							tjData["button_name"]=$data||'';
							tjData["result"]=mainVar.game.result=(mainVar.game.daan===arrtxt?"answer":"participate");
							mainVar.game.xuanze=arrtxt;	
							mainVar.video!==0&&videoPlay(mainVar.adData.adVideo);
						prize.display(function(){
							setStorage("set","xuanze"+gameTime,arrtxt);
							setStorage("set","daan"+gameTime,mainVar.game.daan);
							setTimeout(method.oppb,3000);
							setTimeout(prizeInit,3000);
							countAction({option:'optbNum',method:'accumulate',counterName:'猜图人数'},function(){},function(){setTimeout(function(){prizeInit();},1000);});	
							});
					},caitu_opt:function(ele,txt,$i1,$i2){
						if(kaiguan)return
					   var v;
						if($i2){
							ele.style.background="#003968";
							ele.setAttribute("action","caitu_opt.,"+txt+".,"+$i1);
							v = mainVar.caitu_daan[Number($i2)]
							v.ele.innerHTML='';
							v.v = null;
							v.i = null;
							v.ele.setAttribute('class','');
						}else {
							for (var i = 0; i < mainVar.caitu_daan.length; i++) {
								v = mainVar.caitu_daan[i]
								if (v.i === null) {
									v.ele.innerHTML =txt;
									v.ele.setAttribute("action","caitu_asw.,"+i+".,"+$i1)
									ele.style.background = "#626166";
									ele.setAttribute("action", "caitu_opt.," + txt+".,"+$i1+ ".," + i)
									v.v = txt;
									v.i = i;
									v.ele.setAttribute('class','rotation');
									break
								} else if (v.i === $i1) {
									ele.style.background = "#00396f";
									ele.setAttribute("action", "caitu_opt.," + txt+".,"+$i1)
									v.ele.innerHTML = '';
									v.v = null;
									v.i = null;
									v.ele.setAttribute('class','');
									break
								}
							}
						}
						var danan='';
						for(var q= 0,l=mainVar.caitu_daan.length;q<l;q++){
							var caidaan=mainVar.caitu_daan[q].v;
							if(!mainVar.caitu_daan[q].v)break
							danan+=caidaan;
							if(q===l-1) {
								kaiguan=1;								
								tishi('您选择的答案是：'+danan,{time:2000});
								method.run();
								proevent();
							}
						}
	
					},caitu_asw:function(ele,$i1,$i2){
						if(!$i1)return
							if(kaiguan)return
								mainVar.caitu_daan[Number($i1)].v=null
								mainVar.caitu_daan[Number($i1)].i=null
								var e2=mainVar.caitu_option[Number($i2)]
								e2.v=null
								e2.i=null
								e2.ele.style.background = "#00396f";
								e2.ele.setAttribute("action", "caitu_opt.,"+ele.textContent+".,"+$i2)
								ele.setAttribute("action","null")
								ele.innerHTML=""
								ele.setAttribute('class','')	
					},oppb:function(){
						opp.style.display='none';
					}
				};
			method.stop=function(){
				clearInterval(tv)
			}
			return method;
			function create($data){                      
				var _data=$data,contentBox=obj.contentBox
				var tv=setInterval(function(){
					if($options.mainData.countdown>0){
						document.querySelector(".timer").innerHTML=--$options.mainData.countdown;
					}else{
						clearInterval(tv);
						gameOver();
						if(mainVar.game.tp_marsk){mainVar.game.tp_marsk.style.opacity=0;}
					}
				},1000)
				method.stop=function(){
					clearInterval(tv)
				}
				var yuan=createNode(contentBox,"div",{className:"yuan"})
				var answers=trim(_data.answer),
					optionss=trim(_data.option),
					answersTxt='',
					optionsTxt='';
				mainVar.game.daan=answers;
				mainVar.game.question=optionss;					
				mainVar.caitu_daan=[]
			   var  answer=createNode(yuan,"div",{className:'answer',style:"background: url("+_data.answerBg+") no-repeat;background-size: 100% 100%;"
			   ,html:'<h2 class="timer">'+$options.mainData.countdown+'</h2><p>'+_data.question+'</p>'})
				for(var i=0;i<answers.length;i++){
					var div=document.createElement("div")
						div.setAttribute("action","caitu_asw")
						mainVar.caitu_daan.push({ele:div,v:null,i:null})
						 answer.appendChild(div)
				}
				mainVar.caitu_option=[]
				var option_box=document.querySelector('.mainBox');
				var opt=createNode(option_box,"div",{className:"option"})
				for(var s=0;s<optionss.length;s++){
					var div=document.createElement("div")
					div.setAttribute("action","caitu_opt.,"+optionss[s]+".,"+s)
					div.innerHTML=optionss[s]
					opt.appendChild(div);
					mainVar.caitu_option.push({ele:div,v:null,i:null})
				}
				mainVar.game.tp_marsk=opp=document.querySelector('.option');
				if(_data.gameAudio){
					gameAudio=new Audio;
					gameAudio.src=_data.gameAudio;
					gameAudio.play();
					mainVar.gameAudio=gameAudio;
					}
			}
		}
,DANMU:function($options){
	         var CSS='.maskObj{position:fixed;top:0;left:0;bottom:0;right:0;background-image:url(//a-h5.mtq.tvm.cn/yao/ty/img/blank.png);background-color:rgba(0,0,0,.2);z-index:1;display:none}.msgInputBox{position:absolute;width:100%;left:0;right:0;z-index:20;height:3.6rem;bottom:105px}.msgBox{width:100%;overflow:hidden;border-radius:5px;background-color:#DC2527}.msgBox td{padding:5px 0}.t1{width:40px;text-align:center}.t3{width:66px;text-align:center}.msgBox button{border:none}.msgInput{width:100%;height:100%;border:none;border-radius:5px;font-size:14px;padding:0 90px 0 5px;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-user-modify:read-write-plaintext-only}.faceButton{height:2.3em;vertical-align:middle}.sendButton{display:inline-block;line-height:30px;width:56px;height:30px;font-size:14px;color:#FFF;border-radius:5px;background:-webkit-gradient(linear,0 0,0 100%,from(#6588e7),to(#405dae))}.faceDiv{-webkit-transform:translate3D(0,0,0);display:none;background:rgba(255,255,255,1);border-top:1px solid #F0F0F0;border-left:1px solid #F0F0F0;overflow:auto}.faceDiv>section{position:relative;width:30px;height:30px;border-right:1px solid #F0F0F0;border-bottom:1px solid #F0F0F0;box-sizing:border-box;float:left;background-size:92% 92%;background-repeat:no-repeat;background-position:center}.faceDiv img{width:60px;height:60px;border-right:1px solid #F0F0F0;border-bottom:1px solid #F0F0F0;box-sizing:border-box;padding:10px}.zmLabel{position:absolute;height:36px;display:-webkit-box;-webkit-box-align:center;margin:0;padding:0 6px 0 0;border-radius:15px;background:rgba(0,0,0,.36);z-index:-1;white-space:nowrap;-webkit-transition:all 12s linear;top:10px;color:#fff;left:100%}.avast{width:36px;height:36px;border-radius:50%;vertical-align:top;margin:0 6px 0 0}.zmTxt{line-height:15px}.hjgyTxt{margin:0;padding:0}.gy{color:#f8db1d}.faceImg{width:24px;height:24px;box-sizing:border-box;vertical-align:middle}#setMsg{display:none;z-index:80;width:100%;-webkit-transition:all 200ms ease;margin-top:.5rem}#setMsg dl{text-align:center}#setMsg dl dt{position:relative;height:2.8em;background:#eee;border-radius:5px;box-shadow:1px 1px 2px #999;display:inline-block;vertical-align:middle}#setMsg dl dt .msgInput{font-size:14px;width:8rem;height:100%;background:#eee;border-radius:5px;border:none;color:#212121;line-height:100%;padding:0 0 0 3%;box-sizing:border-box}#setMsg dl dt .sendMsg{font-size:1em;color:#fff;background:#50c260;text-align:center;border:none;border-radius:3px;padding:0 10px;margin:0 5px;display:inline-block;line-height:2em;box-sizing:border-box}.msghead{width:2.3em;height:2.3em;border-radius:50%;vertical-align:middle;margin-left:5px}#setMsg.inMove{-webkit-animation:inMove 200ms forwards;display:block}#setMsg.outMove{-webkit-animation:outMove 200ms forwards;display:block}.coinIco{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);width:60%;opacity:1;-webkit-transition:all 700ms ease;-webkit-tap-highlight-color:transparent}.coinIco2{position:absolute;left:50%;top:75%;-webkit-transform:translate(-50%,0);width:60%;opacity:1;z-index:2}.dmIco{position:absolute;right:0;top:-35%;height:125%;-webkit-transition:all 700ms ease}#closeMsg{display:inline-block;vertical-align:middle;margin-left:-14px;height:2.6rem;margin-top:-5%}#closeMsg img{vertical-align:middle;height:140%}#closeMsg div{display:inline-block;vertical-align:middle}@-webkit-keyframes inMove{0%{-webkit-transform:translateX(100%)}100%{-webkit-transform:translateX(0)}}@-webkit-keyframes outMove{0%{-webkit-transform:translateX(0)}100%{-webkit-transform:translateX(100%)}}';
			 setStyle(CSS);
			 mainVar.danmu={}
			var at=40,mH=10,lH=30,dt=50
			,danmuBox=$options.ele.contentBox
			,bH=danmuBox.offsetHeight-mH-80
			,bW=danmuBox.offsetWidth
			,msgA=[]
			,msgB=[]
			,msgC=[]
			,socketErr
	        ,faceDiv
			,t=this
			,face_text='[微笑,冷汗,可怜,再见,敲打,惊恐,害羞,坏笑,扣鼻,发火,疑问,不屑,调皮,得意,鄙视,大哭,流汗,晕了,偷笑,鼓掌,口水,鼻涕,大笑,亲亲,可爱,憨笑,色]'.split(",")
			,faceT=face_text.join("],[")
			,faceA=faceT.split(",")
			,method={
              display:function(){
				   mainVar.msgInputBox=createNode(DB,"div",{className:"msgInputBox",style:"bottom:125px;"},"p3");
				   mainVar.danmu.dmIco=createNode(mainVar.msgInputBox,"img",{className:"dmIco",src:PAGE.COMMON+"img/dm_ts2.png"},"p3");
				   if((+PAGE.hasJB)!=0)mainVar.danmu.coinIco=createNode(mainVar.msgInputBox,"a",{className:"coinIco",href:'coin.html?token='+ PAGE.token + '&instanceId='+ PAGE.countInstanceid + '&openid='+ mainVar.userInfo.openid + '&sig='+mainVar.userInfo.sig + '&sigCode='+ sigCode + '&yyyappid='+ PAGE.yyyappid +'&nickname='+mainVar.userInfo.nickname+'&headimg='+mainVar.userInfo.weixin_avatar_url,html:'<img src='+CONFIG.chars.jbrk.a+' style="width:100%;">'},"p3");
				   mainVar.danmu.dmIco.onclick=showfn;
					   var html='<form name="msgForm" action="###"><dl>'
						+'<dt><img class="msghead" src="'+getHead(mainVar.userInfo.weixin_avatar_url)+'"/><input type="text" class="msgInput" placeholder="我要说一说" id="msgInput" action="inputMsg" maxlength="'+chartLen+'" /><img src="'+PAGE.COMMON+'img/face.png" class="faceButton" action="faceActive">'
						+'<b action="sendMsg" class="sendMsg"/>发送</b></dt>'
						+'<dd id="closeMsg"><img src="'+PAGE.COMMON+'img/dan_jt2.png"></dd>'
						+'</dl></form>';
					 mainVar.danmu.setMsg=createNode(mainVar.msgInputBox,"div",{id:"setMsg",html:html},"p3");
					 closeMsg.onclick=closefn;
					 danmuBox.onclick=function(){
						if(mainVar.danmu.setMsg.className == "inMove"){closefn()}else{
							showfn();	
						}	
					}
					mainVar.danmu.tcbox=createNode(danmuBox,"div",{className:"tcbox pulses actives"},"p3");
					mainVar.danmu.tcboxBottom=createNode(mainVar.danmu.tcbox,"div",{className:"tcBoxBottom playbtn",style:"background:#50c260;font-size:16px;",html:"点我看电视",action:"goto.,"+mainVar.sceneData.bottomLink+".,tlq"},"p3");	
				    mainVar.danmu.tcboxTop=createNode(mainVar.danmu.tcbox,"div",{className:"domtitle",html:"点我看大奖",action:"goto.,"+PAGE.FOLDER+PAGE.bangdan+"?tab=2&openid="+ mainVar.userInfo.openid+"&avast="+mainVar.userInfo.weixin_avatar_url+"&nickname="+mainVar.userInfo.nickname,style:"font-size:16px;"},"p3");	
					 msgForm.onsubmit=function(){
						method.setMsg();
						return false
					  };
				setTimeout(function(){
					mainVar.bird.move({left:-10,top:winH-140,overFun:function(){
						bird_txt()
						}})
				},100);
			   function showfn(){
					mainVar.danmu.setMsg.className="inMove";  
					setTimeout(function(){mainVar.danmu.setMsg.style.display="block"},200);
					if((+PAGE.hasJB)!=0)mainVar.danmu.coinIco.style.opacity='0';
					 mainVar.danmu.dmIco.style.opacity='0';
				}
			  function closefn(){
					mainVar.danmu.setMsg.className="outMove";  
					setTimeout(function(){mainVar.danmu.setMsg.style.display="none"},200);
					if((+PAGE.hasJB)!=0)mainVar.danmu.coinIco.style.opacity='1';
					 mainVar.danmu.dmIco.style.opacity='1';
					 mainVar.module.faceHidd();
				}					
	         },
		      setMsg:function setMsg(){
						if(mainVar.userInfo){
						var msg=msgInput.value;
						if(msg!=="" && msg.replace(/\s/g,"").length!=0){
							if(socketErr){
								getMsg(joinMsg(msg,""))
							}else{
								var obj=keyword,data=setObj(),temp=obj,str2="",dataStr="",len=0,ml=5;
								 for(var i=0,il=msg.length;i<il;i++){
									str=msg.charAt(i);				
									if(temp=temp[str]){					
										str2+=str;
										if(temp.end){
											if(temp.tag==="|"){								
												tishi("您的发言有些不合适哦！",{time:3000,style:"width:200px;"})
												return
												}
											str2="";
											temp=obj;
											len++							
											}
									}else{				
										temp=obj;
										str2="";
									}
								}
								if(msg.length-len>mainVar.danmuLength){tishi("亲，最多只能输入"+mainVar.danmuLength+"个字哦！",{style:"width:250px"})}
								if(len>ml)tishi("亲，表情每次最多只能输入5个哦！",{style:'width:280px;'})
								if(+PAGE.pusher==1){
									PAGE.category=5;
									mainVar.cSocket.sendMsg(msg);
								};
								sendMsg(msg,"sockjs:sendMessage");
						}
						msgInput.value="";
						msgInput.blur()
					}else{tishi("不可为空哦！")}
					msgBoxShow()		
					}else{
						tishi(alertStr[0])
					}
				return
				},
			  faceDivShow:0,
			  faceShow:function faceShow(top){
						var i=0,m=faceA.length,str="",p=mainVar.msgInputBox.getBoundingClientRect(),w=p.width,a=w/8,b=a+"px";
						if(!faceDiv){
							for(;i<m;i++){
								str+="<section style='width:"+b+";height:"+b+";background-image:url("+PAGE.COMMON+"face/b/"+i+".gif)' index='"+faceA[i]+"' action='isFace'></section>"
								}
							faceDiv=createNode(mainVar.msgInputBox,"div",{className:"faceDiv",style:"width:"+w+"px",html:str},"p3")
						}
						var sty=faceDiv.style;
						sty.display="block";
						method.faceDivShow=1;
					},
			  faceHidd:function faceHidd(){
							if(method.faceDivShow){
							method.faceDivShow=0;
							faceDiv.style.display="none"
							}		
				},
			  inputFace:function inputFace($ele){		
					var obj=keyword,data=setObj(),temp=obj,str2="",dataStr="",len=0,ml=5,cont=msgInput.value;	
					 for(var i=0,il=cont.length;i<il;i++){
						str=cont.charAt(i);				
						if(temp=temp[str]){					
							str2+=str;
							if(temp.end){
								str2="";
								temp=obj;
								len++							
								}
						}else{				
							temp=obj;
							str2="";
						}
					}
					if(len<ml){
						msgInput.value+=$ele.getAttribute("index")
						}else tishi("亲，表情每次最多只能输入5个哦！",{style:'width:250px;height:50px;line-height:50px'})
				}
			}
		function bird_txt(){
				var p=DO.createElement("p"),infoa,tv=0;			
				p.className="txtEle_p";			
				if(gameTime_next<1){
				p.innerHTML=CONFIG.chars.birdSay.f;
				}else{
					if(gameTime_next>21600)gameTime_next=21600
					p.innerHTML=CONFIG.chars.birdSay.h;
					infoa=p.querySelector(".info_a");
						calcNum2(infoa,gameTime_next,2,function(){						
						p.innerHTML=CONFIG.chars.birdSay.f	
					})
				}				
				mainVar.bird.talk({tag:p});	
		  }
		function getMsg(){			
			}  
		function getJson(){
			var a1=setAjax("get",HOST.WSQ+"/wtopic/jssdk/"+PAGE.token+"_vpost.js?c="+new Date)
			a1.callBack=function($data){
				var data=toObject($data);
				danData=data.data
				countdownData=data.countdownData
				dzpdmData=data.dzpdm
				lotteryData=data.lotteryData;
				jinbiData=data.jinbiData;
				pushAction(countdownData,1,"countdown")
				pushAction(lotteryData,5,"lottery")
				pushAction(danData,10,"danData")
				//pushAction(jinbiData,1,"jinbi")
				//pushAction(dzpdmData,5,"dzp")
				function pushAction(data,n,sorts){
					if(data){
					for(var i=0,il=Math.min(n,data.length),_d,_e={};i<il;i++){
						_d=data[i]
						_d.sorts=sorts;
						if(sorts=="danData" && (_d.prizeinfo ==''|| _d.prizeinfo.substr(0,1)=="1")){continue;}
						msgA.push(_d);
						msgB.push(_d)
						if(_d.content!=""){						
							_e={headimg:_d.headimg,content:_d.content}	
							msgA.push(_e);
							msgB.push(_e)
							}									
					}	
					}
				}
				getMsg=getMsg_
			}
			a1.err=function(){
				a1.send();
				getMsg=getMsg_
				}
			a1.send();
		}	
		var headImg,message,dw=danmuBox.offsetWidth,bi=0,biL=msgB.length;			
		setInterval(function(){	
			    var txt,lH=40
			    if(msgA.length==0 && msgC.length==0){
						if(bi<msgB.length){
							txt=msgB[bi]
							bi++
							}else bi=0
			    }
			    if(msgA.length==0 && msgC.length>0){txt=msgC.shift();}
			    if(msgA.length>0){txt=msgA.shift()}
				if(txt){
					(function aa(txt){	
					if(!txt.sender){
						headImg=txt.headimg;
						message=txt.content;
						}else{
							headImg=txt.sender.avast;
							message=txt.message;
						}
						headImg=decodeURIComponent(headImg)
					var zm=document.createElement("div"),zw,speech="",prise_msg="";
						zm.className="zmLabel";	
						var uni_use=decodeURIComponent(txt.nickname)+"刚刚在"+formatTime("$h:$m",+txt.create_timestamp),
						    uni_useimg="<img src='"+getHead(headImg)+"' class='avast'>",
							uni_prize;
						if(txt.sorts){
							switch (txt.sorts){
								case "lottery":
								 if(txt.type=="102"){
									 if(txt.money.indexOf("红包")>0){var money=txt.money}else{var money=txt.money+"元现金红包";}
									 uni_prize="<b style='color:#f91f42;font-size:16px'>"+money+"</b>"
								}else{uni_prize="<b style='color:#f91f42;font-size:16px'>"+txt.prize+"</b>"}
							     prise_msg=uni_use+"参与电视互动获得了"+uni_prize;
								break
								case "danData":
								 uni_prize="<b style='color:#f91f42;font-size:16px'>"+txt.prize+"</b>";
							     prise_msg=uni_use+"参与电视互动获得了"+uni_prize;
								break
								case "countdown":
								if(txt.awardtype=="102"){var awardname=txt.moneyval+"元"+txt.awardname}else{var awardname=txt.awardname}
							     prise_msg ="<span style='padding-left:5px;'>大奖！大奖！大奖！重要的事说三遍！让我们恭喜</span><img src='"+getHead(headImg)+"' class='avast' style='width:34px;height:34px;vertical-align:middle;padding:0 3px;'>"+decodeURIComponent(txt.nickname)+"成为"+formatTime("$M月$D日",+txt.create_timestamp)+"幸运大奖得主，获得<b style='color:#f91f42;font-size:16px'>"+awardname+"</b>";
								 uni_useimg=''
								break
							}	
						}else{
								prise_msg=getFace(decodeURIComponent(message));	
						}
						zm.innerHTML=uni_useimg+"<section class='zmTxt' style='line-height:36px;'>"+prise_msg+speech+"</section>";	
						danmuBox.appendChild(zm);
						var zs=zm.style;
						if(at>bH+10)at=dt;
						zs.left=dw+"px"
						zs.top=(at+mH)+"px";															
						at+=lH;						
						setTimeout(function(){
							zs.left=(-dw-460)+"px";	
							zm.addEventListener("webkitTransitionEnd",zmA)					
							function zmA(){									
								zm.removeEventListener("webkitTransitionEnd",zmA)
								zm&&danmuBox.removeChild(zm);
								}
							},100)			
					}(txt));
				}	
		},2500);
		keyword=setItem(mainVar.sceneData.keyword||CONFIG.chars.keyword,"|");
		setItem(faceT,",",keyword);	
		function sendMsg(msg){
			socket.sendMsg(msg);
		}
		function getMsg_($data){
			var str=$data,data=JSON.parse(str);
			msgC.unshift(data.data)		
		}	
		var socket=new setSocket({url:HOST.SOCKET+"/chat",room:"danmu"+PAGE.token,onmessage:function($data){
				getMsg($data)
				},onerr:function(){
					socketErr=1;
					}})	
		getJson();		
		return method;		
		function msgBoxShow(){
			var sty=mainVar.msgInputBox.style	
			if(sty.display!=="block"){		
				sty.display="block";
				method.faceHidd()
				setTimeout(function(){
					msgInput.click()
					msgInput.focus()
					},100)
			}else{
				msgInput.blur();
				method.faceHidd()
			}
		}			
		function setObj(){
			for(var o={},i=0,il=faceA.length;i<il;i++){
				o[faceA[i]]=i
				}
			return o
		}						
		function getFace(fra){
			var obj=keyword,data=setObj(),temp=obj,str2="",dataStr="",len=0,ml=5,tlen=0;	
			 for(var i=0,il=fra.length,t;i<il;i++){
				str=fra.charAt(i);				
				if(temp=temp[str]){					
					str2+=str;
					if(temp.end){					
						if(temp.tag==="，"){
							dataStr+="*"
						}else if(len<ml){
							dataStr+="<img src='"+PAGE.COMMON+"face/b/"+data[str2]+".gif' class='faceImg'>"
						}
						str2="";
						temp=obj;
						len++
					}else if(!temp[fra.charAt(i+1)]){					
						temp=obj;
						dataStr+=str2;
						str2="";
					}
				}else{
					if(str==="<")str="";
					temp=obj;
					tlen++;				
					dataStr+=str;
					str2="";
				}
			}
		return dataStr
		}
	}	
//冒泡	
,WARTER:function($opt){
	var CSS='.warte_wrap{width:100%;height:400px;position:absolute;left:0;overflow:hidden;bottom:40px}.warte_wrap .ball{white-space:nowrap;will-change:left ,top;-webkit-transition:all 4000ms linear;position:absolute;text-align:center;left:50%;top:100%;-webkit-transform:translate3d(-50%,0,0)}.warte_wrap .ball img{width:38px;height:38px;border-radius:50%;display:block;margin:0 auto 2px auto}.warte_wrap .partName{background:rgba(0,0,0,0.4);padding:0 8px;border-radius:50%;color:#fff;font-size:10px;line-height:18px;border-radius:9px}.warte_wrap .opt{-webkit-animation:opts 6000ms forwards}@-webkit-keyframes opts{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes paoMove{0%{top:100%;opacity:0}60%{top:40%;opacity:1}100%{top:20%;opacity:0}}@-webkit-keyframes timer{0%{opacity:1}100%{opacity:1}}';
	setStyle(CSS);
	mainVar.warte_wrap=createNode(mainVar.ele.mainAdWrap,"div",{className:"warte_wrap"})
	var socketErr
	,warte_wrap=mainVar.warte_wrap
	,i=0,mtime,gtime
	,module=$opt.module
	,msgc=[10,40,60,1,30,0,20,50,70,90,20,55,100,11,42,0,35,81,26,60,55,74,19]
	,msgA=[]
	,speed=5000
	,getData
	,runSocket
	,socket
	,method={
		create:function($d){
			var zm = document.createElement("div");
			zm.className="ball";
			warte_wrap.appendChild(zm);
			zm.innerHTML='<img src="'+getHead($d.headImg)+'"><div class="partName">'+decodeURIComponent($d.data)+'</div>';
			return zm
		},
		set:function (){
			getData();
			mtime=setInterval(move,1200);
			gtime=setInterval(function(){
				if(msgA.length<10)getData()
				},5000)
			},
		remove:function(){
			if(mainVar.warte_wrap);
			removeNode(mainVar.warte_wrap);
			socket&&socket.close();
			clearInterval(mtime);
			clearInterval(gtime);
			socket=null
		},shareTag:function($tag){
			var tag=trim($tag)
			if(tag!=="")socket&&socket.sendMsg("刚刚抢到"+tag)
			}
	}
	switch(module){
		case "SOCKET":
		getData=function(){
			if(!runSocket){
				runSocket=1;
				socket=new setSocket({
				url:HOST.SOCKET+"/chat"
				,channel:"tag"+PAGE.yyyappid
				,sender:{headImg:mainVar.userInfo.weixin_avatar_url}
				,onmessage:function($data){
					var data=toObject($data);
					if(data){
						data=data.data;
						if(data.sender){
							msgA.push({data:decodeURIComponent(data.message),headImg:data.sender.headImg})
						}
					}
				}
				,onerr:function(){console.log('Socket错误')}
			});				
			}
		}
	break
	case "KAQUAN":
		getData=function(){
			var ajax=setAjax('get',HOST.TX+"/api/rest/getRealRedPackage?countdown=100&yyyappid="+PAGE.yyyappid+"&num=20");		
				ajax.callBack=function($data){
					var data=toObject($data);
					if(data.status=='ok'){
						var arr=data.data?data.data:{},len=arr.length,a;
						if(len>0){
							for(var i=0;i<len;i++){
								a=toObject(arr[i]);   
								msgA.unshift({headImg:getHead(a.headimgurl),data:"刚刚抢到"+setMoney(a.money)+"元余额提现锦囊",category:3});
							}
						}
					}
				};
				ajax.err=function(){};
				ajax.send();
			}	
	break
	default:
		getData=function(){
			var ajax=setAjax('get',HOST.YAO+"/api/yaotv/index?action=getRealUsers&yyyappid="+PAGE.yyyappid+"&num=2&countdown=1");		
				ajax.callBack=function($data){
					var data=toObject($data);
					if(data.status=='ok'){
						var arr=data.data?data.data:{},len=arr.length,a;
						if(len>0){
							for(var i=0;i<len;i++){
								a=toObject(arr[i]);   
								msgA.unshift({headImg:getHead(a.headimgurl),data:a.nickname,category:3});
							}
						}
					}
				};
				ajax.err=function(){};
				ajax.send();
			}
	break				 			
	}
	return method;
	function move(){
		var txt=msgA.shift()
			if(txt){
			 var time=Math.ceil((Math.random()*4333+speed)),ele=method.create(txt),l=msgc[Math.random()*msgc.length>>0]
			setTimeout(function(){
					if(i>5){i=0;}
					ele.style.webkitTransition='all '+time+'ms linear';	
					i++
					ele.style.left=l+"%";
					ele.style.top="-60px"				
					setTimeout(zmA,time);			
					function zmA(){		
						ele&&warte_wrap.removeChild(ele);
						}
				},500)			
			}
		}
	}
//摇礼券	
,CASTBALANCE:function(json){
		var CSS_s='#coin_wrap{position:absolute;top:0;height:100%;width:100%;overflow:hidden;z-index:3;pointer-events:none;}#coin_wrap>div{position:absolute;width:22px;height:22px;-webkit-animation-iteration-count:1,1;-webkit-animation-direction:normal,normal;-webkit-animation-timing-function:linear,ease-in}#coin_wrap>div>img{position:absolute;width:22px;height:22px;background-size:100% 100%;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:alternate;-webkit-animation-timing-function:ease-in-out;-webkit-transform-origin:50% -100%}@-webkit-keyframes fade{0%{opacity:1}90%{opacity:1}100%{opacity:0}}@-webkit-keyframes drop{0%{-webkit-transform:translate(0,0)}100%{-webkit-transform:translate(0,736px)}}@-webkit-keyframes clockwiseSpin{0%{-webkit-transform:rotate(-100deg)}100%{-webkit-transform:rotate(100deg)}}@-webkit-keyframes counterclockwiseSpinAndFlip{0%{-webkit-transform:scale(-1.2,1.2) rotate(50deg)}100%{-webkit-transform:scale(-1.2,1.2) rotate(-50deg)}}.scroll_nav{position:fixed;top:45%;left:50%;-webkit-transform:translate(-50%);width:218px;height:26px;background:url(//a-h5.mtq.tvm.cn/yao/common/img/font.png) no-repeat;background-size:100%;text-align:center}.scroll_nav img{width:56px;margin-top:-10px}@keyframes lineR{0%{-webkit-transform:rotate(0)}25%{-webkit-transform:rotate(-20deg)}50%{-webkit-transform:rotate(0)}75%{-webkit-transform:rotate(20deg)}100%{-webkit-transform:rotate(0)}}@-webkit-keyframes lineR{0%{-webkit-transform:rotate(0)}25%{-webkit-transform:rotate(-20deg)}50%{-webkit-transform:rotate(0)}75%{-webkit-transform:rotate(20deg)}100%{-webkit-transform:rotate(0)}}.lineR{-webkit-animation:lineR .4s linear infinite;animation:lineR .4s linear infinite}';
		var CSS_a='.popupContainer .redPack>div{position:relative;height:4.7rem;background:url(//a-h5.mtq.tvm.cn/yao/common/img/redBlock.gif) no-repeat #db5c48 left bottom;background-size:100%;padding-top:.12rem}.popupContainer .redPack h4{margin-bottom:.76rem}.popupContainer .redPack .explain{color:#8b2515;text-align:center;font-size:.24rem;line-height:.3rem;margin-bottom:0.15rem;}.popupContainer .redPack .money em{font-style:normal;position:relative}.popupContainer .redPack .money img{position:absolute;width:.8rem;left:-.8rem;top:58%;-webkit-transform:translateY(-50%)}.popupContainer .redPack .money{color:#fff;text-align:center;font-size:1.3rem}.popupContainer .redPack .money span{color:#fff;font-size:.4rem}.redPacketCon{background:#fff;height:100%;width:100%;position:absolute}.redPacketCon .redBag{width:100%;height:1.97rem;background:url(//a-h5.mtq.tvm.cn/yao/common/img/a_redBag.png) no-repeat;background-size:100%;position:absolute;left:0;top:0}.redPacketCon .redBag>h3{margin-top:.28rem;line-height:.38rem;color:#ffbc64;text-align:center;font-size:.3rem}.redPacketCon .person{width:1.46rem;height:1.46rem;border-radius:50%;overflow:hidden;position:absolute;left:50%;margin-left:-.73rem;bottom:0;margin-bottom:-.73rem}.redPacketCon p.name{line-height:.38rem;margin-top:2.8rem;text-align:center;font-size:.26rem;color:#010101;margin-bottom:.12rem}.redPacketCon p.getmoney{color:#000;font-size:1.3rem;line-height:1.42rem;text-align:center;overflow:hidden;max-height:1.42rem;max-width:7.5rem}.redPacketCon p.getmoney>span{font-size:.4rem;line-height:.7rem;margin-left:.05rem}.redPacketCon a.justify{text-decoration:none;color:#6f90cf;font-size:.26rem;line-height:.5rem;text-align:center;display:block;margin-bottom:.4rem}.redPacketCon p.agin{font-size:.28rem;color:#db5c48;line-height:.4rem;text-align:center}.popupContainer{height:6.2rem;width:100%;background:#c04d3b;position:fixed;overflow:hidden;-webkit-transform:translate(0,150%);z-index:6;bottom:0;left:0;z-index:806}.popupContainer .close,.popupContainer .r_close{height:.3rem;width:.3rem;position:absolute;top:.15rem;left:.25rem;z-index:100;padding:.15rem}.popupContainer .close em,.popupContainer .r_close em{background-size:100% 100%;height:.3rem;width:.3rem;display:inline-block}.popupContainer .r_close em{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/r_close.png)}.popupContainer .close em{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/closeBtn.png)}.popupContainer h3,.popupContainer h4{font-weight:400;text-align:center}.popupContainer h3{font-size:.4rem;line-height:.62rem;color:#ffbc64;padding-top:.11rem}.popupContainer h4{font-size:.3rem;line-height:.48rem;color:#fff}.popupContainer .btn{background:#ffbc64;width:4.64rem;height:.9rem;line-height:.9rem;text-align:center;color:#852b1d;font-size:.32rem;position:absolute;left:50%;-webkit-transform:translateX(-50%);bottom:.2rem;border-radius:.15rem}.popupContainer .redPack h4{margin-bottom:.76rem}.popupContainer .redPack .explain{color:#8b2515;font-size:.26rem;line-height:.3rem;text-align:center}.popupContainer .redPack .money{font-size:1.3rem;color:#fff;text-align:center;}.popupContainer .redPack .money span{font-size:.4rem;color:#fff}.popupContainer .redPack .bottomText{width:7.5rem;color:#ffbc64;text-align:center;line-height:.3rem;height:1rem;left:0;font-size:.24rem;display:table-cell;vertical-align:middle;padding-top:.4rem}.ticket .explainText,.ticketPic .explainText{font-size:.3rem;color:#ffbc64;line-height:.8rem;text-align:center}.ticket h4{margin-bottom:.24rem}.ticket>div{background:#fff;box-sizing:border-box;padding-left:.24rem;border-radius:.1rem;width:7.16rem;margin:0 auto;text-align:left}.ticket table{border-collapse:collapse;border-spacing:0;height:100%;box-sizing:border-box}.ticket table td{-width:1.1rem}.ticket .left{width:1.1rem}.ticket .title{box-sizing:border-box;height:1.46rem;position:relative;border-bottom:1px solid #dedede;padding-top:.18rem;padding-bottom:.16rem;overflow:hidden}.ticket .title .left{float:left;height:1.1rem}.ticket .circle{background:#f0f0f0;position:relative;height:100%;width:100%;border-radius:50%}.ticket .circle img{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);width:60%}.ticket .explain{height:1.46rem;overflow:hidden;box-sizing:border-box;padding-top:.18rem;padding-bottom:.16rem}.ticket .explain .left img{max-height:1.08rem;max-width:80%}.ticket .title .right{float:left}.ticket .right{margin-left:.25rem;width:5.3rem}.ticket .right h3{font-size:.34rem;line-height:.52rem;color:#000;max-width:5.52rem;max-height:.52rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-top:.09rem;text-align:left}.ticket .right .intro{font-size:.24rem;line-height:.44rem;max-width:5.52rem;max-height:.52rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ticket .pic{text-align:center}.ticket .explain .right{font-size:14px;color:#666;line-height:16px;max-height:46px;overflow:hidden}.ticketPic h4{margin-bottom:.3rem}.ticketPic div{max-height:2.94rem;overflow:hidden}.ticketPic div img{height:3rem;width:7.5rem}{height:100%;width:100%}.induce{width:4.75rem;height:3.17rem;background:rgba(0,0,0,.7);color:#fff;position:absolute;top:65%;left:50%;-webkit-transform:translate(-50%,-50%);overflow:hidden;text-align:center;z-index:998;border-radius:.2rem;display:none}.induce span{display:inline-block;background:url(//a-h5.mtq.tvm.cn/yao/common/img/induce.png);background-size:100% 100%;width:1.3rem;height:1.3rem;margin-top:.6rem}.induce p{line-height:.4rem;font-size:.3rem;margin-top:.25rem}@-webkit-keyframes prizeComeIn{0%{-webkit-transform:translate(0,150%);opacity:0}50%{-webkit-transform:translate(0,75%)}100%{-webkit-transform:translate(0,0);opacity:1}}.popupContainer.comeIn{-webkit-animation:prizeComeIn 500ms forwards ease-in}@-webkit-keyframes prizeComeOut{0%{-webkit-transform:translate(0,0);opacity:1}50%{-webkit-transform:translate(0,40%)}100%{-webkit-transform:translate(0,150%);opacity:0}}.popupContainer.comeOut{-webkit-animation:prizeComeOut 500ms forwards ease-in}.smartExpress{text-align:center;background:url(//a-h5.mtq.tvm.cn/yao/common/img/txred_bg.jpg);height:100%;width:100%}.smartExpress div{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/smartExpress.png);width:7.5rem;height:4.1rem;background-size:100% 100%}.smartExpress div h3{color:#ffbc64;font-size:.4rem;padding-top:0;line-height:.88rem;margin-bottom:.4rem}.smartExpress .money{font-size:1.3rem;line-height:1.34rem;height:1.34rem;color:#fff}.smartExpress .money span{font-size:.4rem;color:#fff}.smartExpress .text{color:#fff;font-size:.24rem;height:.56rem;line-height:.56rem}.smartExpress .tip01{font-size:.26rem;color:#ffbc64;line-height:1.03rem;height:1.03rem}.smartExpress .tip02{font-size:.3rem;color:#6f0f0f;height:.72rem;line-height:.72rem}.apple .sub{background:#ed3535;font-size:.24rem;height:.38rem;line-height:.38rem;border-radius:.08rem;text-align:center;color:#fff;position:absolute;right:0;top:0;padding:0 .1rem}.ticket>.appleCon{height:2rem;width:7.17rem;margin:0 auto;padding:.28rem 0 .5rem 0;font-size:.35rem;box-sizing:content-box;position:relative}.appleCon .left{height:2rem;width:2rem;padding-left:.25rem;float:left;overflow:hidden;position:relative}.appleCon .left img{height:100%}.appleCon .left p{width:2rem;position:absolute;bottom:0;background:rgba(255,255,255,.7);font-size:.24rem;height:.36rem;line-height:.36rem;text-align:center}.appleCon .right{width:4.4rem;padding:.21rem 0 0 .08rem;float:left}.appleCon .right .s_title{line-height:.43rem;height:.86rem;overflow:hidden;margin-bottom:.22rem}.appleCon .money{height:.32rem;line-height:.32rem}.appleCon .money .cash{color:#e80303}.appleCon .money i{color:#fff;background:#e80303;display:inline-block;width:.32rem;text-align:center;font-style:normal;font-size:.26rem;margin:0 .1rem 0 .18rem;vertical-align:top}.apple .explainText{line-height:1rem}.storeCon>.appleCon{height:1.75rem;position:relative}.storeCon .appleCon .left{height:1.75rem;width:1.75rem;padding-left:.2rem}.storeCon .appleCon .right{width:4.8rem;padding:.1rem 0 0 0}.storeCon .logo{height:.48rem;padding:.06rem 0;position:absolute;top:0;left:0;width:100%;text-align:center;border-bottom:1px solid #d9d9d9}.storeCon .logo img{height:100%}.storeCon>.appleCon{padding:.82rem .08rem .5rem}.storeCon .explainText{line-height:.65rem}.appleCon .tip{color:#e80303;font-size:.24rem;line-height:.5rem;position:absolute;left:0;bottom:0;text-align:center;width:100%}.popupContainer .redPack .getBalance{background:url(//a-h5.mtq.tvm.cn/yao/common/img/getBalance.png);background-size:100% 100%;height:1.3rem;width:1.3rem;position:absolute;left:50%;-webkit-transform:translateX(-50%);bottom:-.5rem}.popupContainer .cardCon{height:100%;}.popupContainer .redPack h4{margin-bottom:0.4rem;}.popupContainer .redPack .balanceTip{text-align:center;color:#8b2515;}.popupContainer .handSlow .explain{font-size:0.36rem;color:#fff;line-height:0.42rem;margin:1.5rem 0 0.4rem;}.popupContainer .handSlow .balanceTip{font-size:0.3rem;height:0.54rem;line-height:0.54rem;}.popupContainer .handSlow .bottomText{padding-top:0.15rem;}.popupContainer .con .bottomText{line-height:1.4rem;height:1.4rem;font-size:0.3rem;padding-top:0;}.popupContainer .con h4{margin-bottom:0.6rem;}.redPack .autoGet{background-color:#1e9f00;text-align:center;width:1.2rem;border-radius:0.08rem;overflow:hidden;position:absolute;top:55%;-webkit-transform:translateY(-50%);right:0.2rem;}.redPack .autoGet .top{font-size:0.26rem;line-height:0.3rem;background:#ffbc64;color:#852b1d;border-bottom-left-radius:0.08rem;border-bottom-right-radius:0.08rem;padding:0.06rem 0 0.06rem;}.redPack .autoGet .bottom{font-size:0.24rem;height:0.42rem;line-height:0.42rem;color:#fff;}.handSlow  .autoGet{top:25%;}';
		//判断ios还是Android
		var UA=navigator.userAgent.toLowerCase(),OSA=["windows","ipad","ipod","iphone","android"],OSL=OSA.length,OS=""
		while(OS=OSA.shift()){
			if(UA.indexOf(OS)>-1){
				break;
			};
		};
		setStyle(CSS_s+CSS_a)
		function fontSize(){DO.documentElement.style.fontSize=100*DO.documentElement.clientWidth/750+'px'};
		fontSize();
		var archInfo=null,countIndex=0,bool=true,onSwitch=true,shakeSwitch=false,c_timer=null,shakeArr=[],likeArr=[],meetArr=[],x_timer=null;
		var induce=createNode(DB,'div',{className:'induce',html:"<span></span><p>已放入您的收藏</p>"},'p3');
		var coin_wrap=mainVar.ele.coin_wrap=createNode(DB,'div',{id:"coin_wrap",'style':'z-index:3'},'p3');
		var audioCon=createNode(DB,'audio',{src:json.voiceBand},'p3');
		var scroll_nav=createNode(DB,'div',{className:'scroll_nav',html:'<img class="lineR" src="'+PAGE.COMMON+'img/scrollhand.png">'},'p3');
		var mainAdBox=mainVar.ele.mainAdBox;
		if(mainAdBox){
			scroll_nav.style.top=mainAdBox.offsetHeight+95+'px';
		};
		var popContainer=mainVar.ele.popup=createNode(DB,'div',{className:'popupContainer'},'p3');
		function randomNum(minNum,maxNum){
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
		};
		function init(num){
			var index=0;
			clearInterval(timer);
			var timer=setInterval(function(){
				index++;
				if(bStop){
					var jsonData=createElem();
					var curElem=coin_wrap.appendChild(jsonData.elem);
					setTimeout(function(){
						if(curElem.parentNode){curElem.parentNode.removeChild(curElem);}
					},jsonData.time);
				};
				if(index==num){clearInterval(timer)};
			},100);
		};
		function createElem(){
			var elem=document.createElement('div');
			var image=document.createElement('img');
			image.src=PAGE.COMMON+'img/gif.png';
			elem.style.top= "-100px";
			elem.style.left=randomNum(0,document.documentElement.clientWidth-27)+'px';
			elem.style.webkitAnimationName = 'fade, drop';
			var time=randomNum(2000,3000);
			var fadeAndDropDuration=time+"ms";
			elem.style.webkitAnimationDuration = fadeAndDropDuration+','+fadeAndDropDuration;
			var imgAnimationName=(Math.random()<0.5)?'clockwiseSpin':'counterclockwiseSpinAndFlip';
			image.style.webkitAnimationName = imgAnimationName;
			var imgDuration="2500ms";
			image.style.webkitAnimationDuration = imgDuration;
			elem.appendChild(image);
			return {elem:elem,time:time};
		};
		//初始化摇一摇功能
		if(window.DeviceMotionEvent){
			mainVar.yyyAction=1
			window.addEventListener('devicemotion',deviceMotionHandler,false);
		}else{
			alert('您的手机不支持摇晃');
		};
		var bStop=true;
		var c_timer=null;
		var SHAKE_THRESHOLD=800;
		var last_update=0;    
		var x,y,z,last_x=0,last_y=0,last_z=0;
		var last_report=0; 
		function deviceMotionHandler(eventData){
			if(!mainVar.yyyAction)return
			noPop(eventData);
			var acceleration=eventData.accelerationIncludingGravity;   
			var curTime=(new Date()).getTime();
			if((curTime-last_update)>100){   
				var diffTime=curTime-last_update;    
				last_update=curTime;        
				x=acceleration.x;    
				y=acceleration.y;    
				z=acceleration.z;   
				var speed=Math.abs(x+y+z-last_x-last_y-last_z)/diffTime*10000;
				if(speed>SHAKE_THRESHOLD&&bStop){ 
					last_report=curTime;
					startGame();
				};
				last_x=x;
				last_y=y;    
				last_z=z;    
			};
		};
		//setInterval(function(){startGame()},1000)
		function startGame(){
			if(shakeSwitch){
				shakeSwitch=false;
				popContainer.className="popupContainer comeOut";
				setTimeout(function(){
					onSwitch=bool=true;
				},500);
			};
			if(onSwitch){
				if(bool){
					init(20);
					setTimeout(function(){
						audioCon.play();
					},1500);
					bool=false
					x_timer=setTimeout(function(){
						getCoinNum();
					},2000);
				};
			};
		};
		function getCoinNum(){
			var user=mainVar.userInfo;
			AjaxFn({
				type:'get',
				url:HOST.BALANCE+"/open/balanceActivity/draw?lotteryid="+mainVar.prizeID+"&yyyappId="+PAGE.yyyappid+"&code="+user.sig+"&openId="+user.openid+"&sigExpire="+user.sigExpire+"&icon="+user.headimg+"&name="+user.nickname+"&sex="+user.sex+"&country="+user.country+"&province="+user.province+"&city="+user.city,
				success:function($data){
					var _data=toObject($data),data=_data.data;
					if(data&&data.code==1&&(data.balance||data.cash)){
						onSwitch=false;
						var coinNumber=data.balance||data.cash;
							coinNumber=(coinNumber/100).toFixed(2);
							isSubscribe=''; 
						if(data.balance){
							  //virtualCurrency 当前余额
							 //walletSize  钱包大小
							if(data.virtualCurrency>=data.walletSize){
								isSubscribe=popup(6,coinNumber); //余额红包--已满
							}else{
								isSubscribe=popup(0,coinNumber); //余额红包
							};
							/*if(mainVar.reccards==undefined){
								mainVar.warter.shareTag("余额红包");
							};*/
							tjData.album_name=coinNumber+"元余额红包";
							if(isSubscribe){
								tjData.flag=1;
							}else{
								tjData.flag=0;
							};
						}else{
							if(data.type==103){
								isSubscribe=popup(4,coinNumber); //奖励红包
								mainVar.warter.shareTag(coinNumber+"元现金红包");
							}else{
								isSubscribe=popup(5,coinNumber); //余额锦囊任务红包
								mainVar.warter.shareTag(coinNumber+"元余额提现锦囊");
							};
							tjData.album_name=coinNumber+"元微信红包";
							tjData.flag=0;
						};
						tjData.account=coinNumber;
						tjData.content="";
						tjData.timu=album_list(+data.type);
						tjData.result=1;
						TJ(132000);
						tjData.timu='';
						tjData.account="";
						tjData.album_name="";
						tjData.flag=0;
					}else{
						if(ylqSwitch==1){
							if(mainVar.reccards&&mainVar.reccards.length){
								onSwitch=false;
								showCard();
							}else{
								popup(7); //当卡券摇过三次之后，没有卡券了就显示手慢了。
							};
						}else{
							popup(7); //余额红包--手慢了
						};
					};
				},
				timeout:2000,
				error:function(){
					if(ylqSwitch==1){
						if(mainVar.reccards&&mainVar.reccards.length){
							onSwitch=false;
							showCard();
						}else{
							popup(7); //当卡券摇过三次之后，没有卡券了就显示手慢了。
						};
					}else{
						popup(7); //余额红包--手慢了
					};
				}
			})
		};
		//显示卡券和上报摇出来的卡券
		function showCard(){
			var cardSwitch=true,partIndex=countIndex;
			archInfo=mainVar.reccards[countIndex];
			if(archInfo.count){
				archInfo.count++;
			}else{
				archInfo.count=1
			};	
			if(likeArr.length){
				for(var i=0;i<likeArr.length;i++){
					if(archInfo.id==likeArr[i].id){
						likeArr.splice(i,1);
						cardSwitch=false;
						break;
					};
				};
				likeArr.push(archInfo);
			}else{
				likeArr.push(archInfo);
			};
			if(cardSwitch){
				cardAppear();
			}; 
			function cardAppear(){
				var tvmE=mainVar.tvmE;
				if(tvmE&&archInfo.trackurl){
					tvmE.kaview(archInfo.trackurl,function(){});
				};
			};
			countIndex++;
			if(countIndex>(mainVar.reccards.length-1)){countIndex=0;}
			if(archInfo.type==6){
				popup(3,archInfo); //商品卡券
			}else if(archInfo.type==1002){
				popup(2,archInfo);  //1002卡券
			}else{
				popup(1,archInfo);  //普通卡券
			};
			if(archInfo.title){
				mainVar.warter.shareTag(archInfo.title);
			}else{
				if(archInfo.shop.search(/tvmining/)==-1){
					mainVar.warter.shareTag(archInfo.shop+'优惠');	
				};
			};
			tjData.timu=album_list(6);
			tjData.album_name=archInfo.title||archInfo.id;
			tjData.content=archInfo.shop;
			tjData.button_name=archInfo.tag;
			tjData.result=1;
			TJ(132000);
			tjData.timu="";
			tjData.button_name="";
			tjData.content="";
			tjData.album_name="";
			if(archInfo.count>=3){
				meetArr.push(mainVar.reccards.splice(partIndex,1)[0]);
				countIndex--;
			};
		};
		var indexTime=mainVar.djsTime; //gameTime_over
		var dsp=mainVar.adData.adpositions1,numTime=1
		/*if(dsp&&(dsp.type==2||dsp.type==1)){
			numTime=15
		};*/
		var y_timer=setInterval(function(){
			if(indexTime<=numTime){
				clearInterval(y_timer);
				clearInterval(x_timer);
				removeNode(induce);
				removeNode(scroll_nav)
				removeNode(coin_wrap);
				if(popContainer){removeNode(popContainer);mainVar.ele.popup=null};
				removeNode(audioCon);
				if(mainVar.banquan)mainVar.banquan.style.display="block";
				window.removeEventListener('devicemotion',deviceMotionHandler);
				setStorage('set','shakeArr',JSON.stringify(shakeArr));
				setStorage('set','likeArr','');
				var curArr=meetArr.concat(mainVar.reccards);
				setStorage('set','originArr',JSON.stringify(curArr));
			};
			indexTime--;
		},1000);
		function popup(num,data){
			var str='',oClass='close',isShowstr='',isSubscribe=false;
			function estimate(type){
				var binding=mainVar.binding||{}
					,user=mainVar.userInfo
					,path='http://qa-h5.mtq.tvm.cn/yao/join_us/'
					,_url=""//"redirect="+encodeURIComponent(location.href)
					,infoUrl=path+'yesgj_0.html?token='+PAGE.token+'&channel_id='+PAGE.channelId+'&user_name='+user.nickname+'&sex='+user.sex+'&yoid='+user.openid+'&yyyid='+PAGE.yyyappid+'&ysig='+user.sig+'&ysige='+user.sigExpire+"&phone="+user.phone+"&"+jsonJoin(mainVar.binding)+"&"//+_url
					if(binding){ 
						if(binding.status){					
							if(binding.subscribe){//没有关注天天电视宝
								isSubscribe=true;
							};
						}
					};
					if(isSubscribe){ //关注天天电视宝了。
						var isShowHide='block';
						if(type==6||type==7){
							isShowHide='none';
						};
						isShowstr='<div class="autoGet" style="display:'+isShowHide+'">\
									<p class="top">余额自动<br>收割机</p>\
									<p class="bottom">收割成功</p>\
								</div>';				
					}else{   //没有关注天天电视宝了。
						mainVar.joinUrl=HOST.AD+"/oauth?wx_token=33580c57d3c86f07&redirecturl="+encodeURIComponent(infoUrl);
//						isShowstr='<div class="autoGet" onclick=goUrl("'+url+'")>\
//									<p class="top">余额自动<br>收割机</p>\
//									<p class="bottom">点击开启</p>\
//								</div>';	
						isShowstr=""
					};
					
			};
			var shopTip1='',shopTip2=''
			if(num==1||num==2||num==3){
				if(data.shop.search(/tvmining/gi)==-1){
					 shopTip1=shopTip2='恭喜您摇到'+data.shop+'提供的礼券';
				}else{
					 shopTip1='恭喜您摇到一张礼券';
					 shopTip2='恭喜您摇到一次优惠机会';
				};
			};
			switch(num){
				case 0: //余额红包--余额未满
					estimate(0);
					if(isSubscribe){     //关注天天电视宝了。
						str='<div class="redPack con">\
							<div>\
								<h3>摇一摇有惊喜</h3>\
								<h4>恭喜您摇到一个余额红包</h4>\
								<p class="money"><em>'+data+'</em><span>元</span></p>\
								<p class="balanceTip">已存入您的余额账户，请到个人中心进行查看</p>\
								'+isShowstr+'</div>\
							<p class="bottomText">手气超赞，继续接着摇！</p>\
						</div>';
					}else{     //没有关注天天电视宝了。
						str='<div class="redPack">\
							<div>\
								<h3>摇一摇有惊喜</h3>\
								<h4>恭喜您摇到一个余额红包</h4>\
								<p class="money"><em>'+data+'</em><span>元</span></p>\
								<p class="balanceTip">点击领取，继续接着摇！</p>\
								<span class="getBalance"></span>\
								'+isShowstr+'</div>\
							<p class="bottomText">余额红包可在商城使用，购买后立返现金，或直接抵扣货款。</p>\
						</div>';
					};
				break;
				case 6:        //余额红包--余额已满
					estimate(6);
					 str='<div class="redPack">\
						<div>\
							<h3>摇一摇有惊喜</h3>\
							<h4>恭喜您摇到一个余额红包</h4>\
							<p class="money"><em>'+data+'<img src="'+PAGE.COMMON+'img/minus.png"></em><span>元</span></p>\
							<p class="explain">无法存入，您的余额账户已满，请到个人中心进行查看</p>\
							<p class="balanceTip">手气超赞，继续接着摇！</p>\
							'+isShowstr+'</div>\
						<p class="bottomText">余额红包可在商城使用，购买后立返现金，或直接抵扣货款。</p>\
					</div>';
				break;
				case 7:          //余额红包--手慢了
					estimate(7);
					var peopleNum=mainVar.peopleNum,symbol='';
					if(mainVar.reccards===undefined){
						symbol="。"
					};
					var t_str='手慢了，没抢到余额红包'+symbol;
					 if(peopleNum){
						t_str='手慢没抢到，'+peopleNum+'人和你一起拼手气'+symbol;
					 };
					 str='<div class="redPack handSlow">\
						<div>\
							<h3>摇一摇有惊喜</h3>\
							<p class="explain">'+t_str+'</p>\
							<p class="balanceTip">不要停，继续摇</p>\
							'+isShowstr+'</div>\
						<p class="bottomText">余额红包可在商城使用，购买后立返现金，或直接抵扣货款。</p>\
					</div>';
					/*上报*/
					tjData.timu="未中奖";
					tjData.result=0;
					tjData.album_name="无";
					TJ(132000);
				break;
				case 4:           //现金红包
					var user=mainVar.userInfo;
					oClass='r_close';
					 str='<div class="redPacketCon cardCon">\
							<div class="redBag">\
								<h3 class="sepur">恭喜您摇到一个现金红包</h3>\
								<img src="'+decodeURIComponent(user.weixin_avatar_url)+'/96" class="person"/>\
							  </div>\
							  <p class="name">'+decodeURIComponent(user.nickname)+'</p>\
							  <p class="getmoney">'+data+'<span>元</span></p>\
							  <a class="justify" href="javascript:void(0);">已存入您的中奖记录，请到个人中心进行领取</a>\
							   <p class="agin">人品大爆发，继续接着摇！</p>\
						  </div>';
				break;
				case 1:           //普通卡券
					 str='<div class="ticket cardCon" data-flag="ticket">\
							<h3>摇一摇有惊喜</h3>\
							<h4>'+shopTip1+'</h4>\
							<div>\
								<div class="parent title">\
									<div class="left">\
										<p class="circle">\
											<img src="'+data.shoplogo+'">\
										</p>\
									</div>\
									<div class="right">\
										<h3>'+(data.title||data.tagtitle)+'</h3>\
										<p class="intro">'+data.shop+'</p>\
									</div>\
								</div>\
								<div class="parent explain">\
									<table>\
										<tr>\
											<td><div class="left">\
													<p class="pic">\
														<img src="'+data.banner+'">\
													</p>\
												</div>\
											</td>\
											<td style="height:0.95rem">\
												<div class="right">'+data.desc+'</div>\
											</td>\
										</tr>\
									</table>\
								</div>\
							</div>\
							<p class="explainText">手气超赞，领完记得再摇！</p>\
							<span class="btn">先收藏 待会看</span>\
						</div>';
				break; 
				case 2:          //102类型的卡券
					 str='<div class="ticketPic cardCon" data-flag="ticket">\
							<h3>摇一摇有惊喜</h3>\
							<h4>'+shopTip1+'</h4>\
							<div>\
								<img src="'+(data.banner||data.banner_big)+'">\
							</div>\
							<p class="explainText">手气超赞，领完记得再摇！</p>\
							<span class="btn">先收藏 待会看</span>\
						</div>';
				break;
				case 3:           //商品类型的卡券
					oClass='r_close';
					var mall_isShow='none',limit_isShow='none',imgStr='',conClass='';
					if(data.mall){
						if(data.mall.indexOf('京东')!=-1||data.mall.indexOf('1号店')!=-1||data.mall.indexOf('一号店')!=-1){
							conClass='storeCon';
							if(data.mall.indexOf('京东')!=-1){
								picSrc='goldsLogo2.jpg'
							}else{
								picSrc='goldsLogo1.jpg'
							};
							imgStr='<p class="logo"><img src="'+PAGE.COMMON+'/img/'+picSrc+'"></p>'
						}else{
							mall_isShow="inline-block";
						};
					};
					if(data.limit){
						limit_isShow='inline-block';
					};
					 str='<div class="ticket apple cardCon '+conClass+'" data-flag="ticket">\
						<h3>摇一摇有惊喜</h3>\
						<h4>'+shopTip2+'</h4>\
						<div class="appleCon">\
							<span class="sub" style="display:'+mall_isShow+';">'+data.mall+'</span>'+imgStr+'<div class="left">\
								<img src="'+data.banner+'">\
								<p style="display:'+limit_isShow+';">限量'+data.limit+'件</p>\
							</div>\
							<div class="right">\
								<p class="s_title">'+data.title+'</p>\
								<p class="money">\
									<span class="buy">￥'+data.price+'</span><span class="cash"><i>返</i>'+data.cash+'元</span>\
								</p>\
							</div>\
							<p class="tip">商家有时会调整佣金，实际返现金额以返现确认页为准</p>\
						</div>\
						<p class="explainText">手气超赞，领完记得再摇！</p>\
						<span class="btn">先收藏 待会看</span>\
					</div>';
				break;
				case 5:       //个余额提现锦囊
					oClass='r_close';
					str='<div class="smartExpress cardCon">\
							<div>\
								<h3>恭喜您摇到一个余额提现锦囊</h3>\
								<p class="money">'+data+'<span>元</span></p>\
								<p class="text">可立刻提取现金</p>\
							</div>\
							<p class="tip01">已存入您的中奖记录，请到个人中心进行领取</p>\
							<p class="tip02">人品大爆发，继续接着摇！</p>\
						 </div>'
				break;
			};
			popContainer.innerHTML=str+'<span class="'+oClass+'"><em></em></span>';
			popContainer.className="popupContainer comeIn";
			c_timer=setTimeout(function(){   //这个时间是卡券的停留时间
				if((num!=0)||(num==0&&isSubscribe)){
					shakeSwitch=true;
				};
			},2000);
			var firstElem=popContainer.children[0],closeBtn=popContainer.children[1];
			//点击存入我的卡券包
			var btn=firstElem.querySelector('.btn'),ImgBtn=firstElem.querySelector('img');
			if(btn){
				addEvent(btn,'touchstart',function(e){
					noPop(e);
					collect()
				});
			};
			if(ImgBtn){
				addEvent(ImgBtn,'touchstart',function(e){
					noPop(e);
					collect()
				});
			};
			function collect(){
				if(likeArr.length){
					likeArr.pop();
				};
				var len=shakeArr.length,judge=true,cur=archInfo;
				countIndex--;
				if(countIndex<0){
					countIndex=mainVar.reccards.length-1;
					mainVar.reccards.splice(countIndex,1);//删除已经选择的卡券
					countIndex=0;
				}else{
					mainVar.reccards.splice(countIndex,1);//删除已经选择的卡券
				};
				if(len){
					for(var i=0;i<len;i++){
						if(shakeArr[i].id==cur.id){
							judge=false;
							break;
						};
					};
					if(judge){
						shakeArr.push(cur);
					};
				}else{
					shakeArr.push(cur);
				};
				saveCard(cur);
				disappear(true,'已放入您的收藏');
				tjData.content=cur.shop;
				tjData.album_name=cur.title;
				TJ(101000);
			};
			function saveCard(listData){
				var user=mainVar.userInfo,matchingPrize=null;
				matchingPrize={"id":listData.id,"title":listData.title,"type":listData.type,"url":listData.url,"logo":listData.shoplogo,"pubid":listData.pubid,"pubversion":listData.pubversion,"tag":listData.tag,"desc":listData.desc,"banner":listData.banner,"shop":listData.shop}
				switch(+matchingPrize.type){
					case 6:
						matchingPrize.type=6
						matchingPrize['cash']=listData.cash;
						matchingPrize['price']=listData.price;
						matchingPrize['originprice']=listData.originprice;
						matchingPrize['mall']=listData.mall;
						matchingPrize['limit']=listData.limit;
						matchingPrize['productid']=listData.productid;
					break;
					case 7:
						matchingPrize.type=7;
					break;
					case 1001:
						matchingPrize.type=1001;
					break;
					case 1002:
						matchingPrize.type=1002;
						matchingPrize['banner_big']=listData.banner_big;
					break;
					default:
						matchingPrize.type=4
					break;
				};
				var b=setAjax('post',HOST.CJ+'/open/order/balanceActivity');
					b.set=function(){this.setRequestHeader("Content-type","application/json")};
					b.data=JSON.stringify({"lotteryid":mainVar.prizeID,"balance":false,"code":user.sig,"sigExpire":user.sigExpire,"yyyappId":PAGE.yyyappid,"user":{"openId":user.openid,"name":user.nickname,"icon":user.weixin_avatar_url,"sex":user.sex,"province":user.province,"country":user.country,"city":user.city},"matchingPrize":matchingPrize})
					b.err=function(){};
					b.callBack=function(){};
					b.send();
			};
			//点击'立即领取'
			var getBag=firstElem.querySelector('.getBalance');
			if(getBag){
				addEvent(getBag,'touchstart',function(e){
					noPop(e);
					xdDialog(true,'已存入您的余额账户<br>请到个人中心进行查看');
					disappear(false)
					//disappear
				});
			};
			//点击关闭按钮
			addEvent(closeBtn,'touchstart',function(e){    
				noPop(e);
				disappear(false);
			});
			function disappear(parm,str){
				popContainer.className="popupContainer comeOut";
				clearTimeout(c_timer);
				shakeSwitch=false;
				setTimeout(function(){
					popContainer.innerHTML='';
					if(parm){
						induce&&(induce.querySelector('p').innerHTML=str);
						induce&&(induce.style.display="block");
						setTimeout(function(){
							induce&&(induce.style.display="none");
							onSwitch=bool=true;
							shakeSwitch=false;
						},2000)
					}else{
						onSwitch=bool=true;
						shakeSwitch=false;
					};
				},500);
			};
			return isSubscribe;
		};
	}
//摇金币	
,CASTCOIN:function(json){
	 var CSS='.cornucopia{position:absolute;left:50%;margin-left:-130px;background:url('+PAGE.COMMON+'img/cornucopia.png);width:260px;height:65px;padding-top:135px;text-align:center;background-size:100% 100%;z-index:1}.cornucopia p{font-size:18px;line-height:30px;color:#6a3906}.cornucopia span{color:#f33;font-size:26px;font-weight:700}#coin_wrap{position:absolute;top:0;height:100%;width:100%;overflow:hidden;z-index:3}#coin_wrap>div{position:absolute;width:22px;height:22px;-webkit-animation-iteration-count:1,1;-webkit-animation-direction:normal,normal;-webkit-animation-timing-function:linear,ease-in}#coin_wrap>div>img{position:absolute;width:22px;height:22px;background-size:100% 100%;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:alternate;-webkit-animation-timing-function:ease-in-out;-webkit-transform-origin:50% -100%}@-webkit-keyframes fade{0%{opacity:1}70%{opacity:1}100%{opacity:0}}@-webkit-keyframes drop{0%{-webkit-transform:translate(0,0)}100%{-webkit-transform:translate(0,700px)}}@media (max-height:628px){@-webkit-keyframes drop{0%{-webkit-transform:translate(0,0)}100%{-webkit-transform:translate(0,628px)}}}@media (max-height:568px){@-webkit-keyframes drop{0%{-webkit-transform:translate(0,0)}100%{-webkit-transform:translate(0,568px)}}}@media (max-height:480px){@-webkit-keyframes drop{0%{-webkit-transform:translate(0,0)}100%{-webkit-transform:translate(0,480px)}}}@-webkit-keyframes clockwiseSpin{0%{-webkit-transform:rotate(-100deg)}100%{-webkit-transform:rotate(100deg)}}@-webkit-keyframes counterclockwiseSpinAndFlip{0%{-webkit-transform:scale(-1.2,1.2) rotate(50deg)}100%{-webkit-transform:scale(-1.2,1.2) rotate(-50deg)}}.coinTip{position:absolute;top:0;left:50%;margin-left:-135px;background-image:url('+PAGE.COMMON+'img/coinTip.png);width:270px;height:190px;background-size:100% 100%;z-index:5;-webkit-animation:topToBototm 1500ms linear infinite alternate;color:#434343;font-size:15px;-webkit-transform-origin:50% 0}.coinTip img{position:absolute;top:105px;left:30px;width:62px;height:53px}.coinTip span{position:absolute;top:115px;left:105px;width:130px;text-align:justify}.bottomToTop{-webkit-animation:bottomToTop 500ms forwards}@-webkit-keyframes topToBototm{0%{-webkit-transform:rotate(20deg)}100%{-webkit-transform:rotate(-20deg)}}@-webkit-keyframes bottomToTop{0%{top:-30px}100%{top:-190px}}.waggle{-webkit-animation:waggle 200ms alternate infinite}@-webkit-keyframes waggle{0%{-webkit-transform:rotate(0)}50%{-webkit-transform:rotate(-30deg)}100%{-webkit-transform:rotate(0)}}';
		setStyle(CSS);
		if(json.time>4){
			var coinTip=createNode(json.container,"div",{className:"coinTip",html:'<img src="'+PAGE.COMMON+'img/phone.png"><span>摇'+PAGE.unit+'时间到啦！摇的越多  '+PAGE.unit+'越多</span>'},"p3");
			setTimeout(function(){
				coinTip.querySelector('img').className='waggle';
				setTimeout(function(){
					coinTip.className='coinTip bottomToTop';
					setTimeout(function(){
						coinTip.parentNode.removeChild(coinTip);
					},500)
				},3000)
			},1500)
		};
		setTimeout(function(){
			var bottomHeight=json.bottomHeight
			var bgBack=createNode(json.container,'p',{style:'top:0;z-index:0;background:#000;position:absolute;height:100%;width:100%;opacity:0.6;'},'p3');
			var cornucopia=createNode(json.container,'p',{className:'cornucopia',html:'<p>成功获得<span>0</span>'+PAGE.unit+'</p>','style':'z-index:10;bottom:'+bottomHeight+'px'},'p3');
			var coin_wrap=createNode(json.container,'div',{id:"coin_wrap",'style':'z-index:3'},'p3');
			var audioCon=createNode(json.container,'audio',{src:json.voiceBand},'p3');
			function randomNum(minNum,maxNum){
				return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
			};
			function init(num){
				var index=0;
				clearInterval(timer);
				var timer=setInterval(function(){
					index++;
					if(bStop){
						var jsonData=createElem();
						var curElem=coin_wrap.appendChild(jsonData.elem);
						setTimeout(function(){
							if(curElem.parentNode){curElem.parentNode.removeChild(curElem);}
						},jsonData.time);
					};
					if(index==num){clearInterval(timer)};
				},100);
			};
			function createElem(){
				var elem=document.createElement('div');
				var image=document.createElement('img');
				image.src=PAGE.COMMON+'img/coin0'+randomNum(1,9)+'.png';
				elem.style.top= "-100px";
				elem.style.left=randomNum(0,document.documentElement.clientWidth-27)+'px';
				
				elem.style.webkitAnimationName = 'fade, drop';
				var time=randomNum(600,1800);
				var fadeAndDropDuration=time+"ms";
				elem.style.webkitAnimationDuration = fadeAndDropDuration+','+fadeAndDropDuration;
			
				var imgAnimationName=(Math.random()<0.5)?'clockwiseSpin':'counterclockwiseSpinAndFlip';
				image.style.webkitAnimationName = imgAnimationName;
				var imgDuration="2500ms";
				image.style.webkitAnimationDuration = imgDuration;
				elem.appendChild(image);
				return {elem:elem,time:time};
			};
			//初始化摇一摇功能
			if(window.DeviceMotionEvent){
				window.addEventListener('devicemotion',deviceMotionHandler,false);
			}else{
				alert('您的手机不支持摇晃');
			};
			var bStop=true;
			var onOff=true;
			var bSwitch=true;
			var s_timer=null;
			var SHAKE_THRESHOLD=800;
			var coinNumber=0;    
			var last_update=0;    
			var x,y,z,last_x=0,last_y=0,last_z=0;
			var last_report=0; 
			function deviceMotionHandler(eventData){
				var acceleration=eventData.accelerationIncludingGravity;   
				var curTime=(new Date()).getTime();
				if((curTime-last_update)>100){   
					var diffTime=curTime-last_update;    
					last_update=curTime;        
					x=acceleration.x;    
					y=acceleration.y;    
					z=acceleration.z;   
					var speed=Math.abs(x+y+z-last_x-last_y-last_z)/diffTime * 10000;
					if(speed>SHAKE_THRESHOLD&&bStop){ 
						last_report=curTime;
						startGame();
					};    
					last_x=x;
					last_y=y;    
					last_z=z;    
				};
			};
			function startGame(){
				bSwitch=true;
				init(4);
				setTimeout(function(){
					audioCon.play();
				},2000);
				if(onOff){
					onOff=false
					clearInterval(s_timer);
					s_timer=setInterval(function(){
						if(bSwitch){
							bSwitch=false;
							getCoinNum();
						};
					},5000)
				};
			};
			function getCoinNum(){
				var ajax=setAjax('get',HOST.CJ+"/open/coinActivity/draw?lotteryid="+mainVar.prizeID+'&name='+mainVar.userInfo.nickname+'&openId='+mainVar.userInfo.openid+"&code="+mainVar.userInfo.sig+"&yyyappId="+PAGE.yyyappid+"&province="+mainVar.userInfo.province+"&country="+mainVar.userInfo.country+"&city="+mainVar.userInfo.city+"&sigExpire="+mainVar.userInfo.sigExpire);				
				ajax.callBack=function($data){
					/*
						成功返回  {"status":"success","code":200,"data":{"code":1,"coin":1/0}}  coin根据设置返回，有可能为0
						失败会返回
						{"status":"success","code":200,"data":{"code":8,"msg":"非抽奖活动时段"}}
						错误码 
						8 非抽奖活动时段：抽奖倒计时结束返回
						7 抽取金币活动关闭 ： 配置信息 coinSwitch 值为0
						4 没有抽奖信息：没有对应的抽奖活动
					*/
					var $data=toObject($data)
					var data=$data.data;
					data=typeOf(data)!=="object"?eval("("+data+")"):data
					if($data.status=='success'&&data.code==1&&bStop){
						if(data.coinNum>0){
							var num=parseInt(cornucopia.querySelector('span').innerHTML);
							var amount=0;
							clearInterval(t_cur);
							var t_cur=setInterval(function(){
								amount++;
								if(bStop){cornucopia.querySelector('span').innerHTML=(++num)};
								if(amount>=data.coinNum){clearInterval(t_cur);};
							},100)
						};
					};
				};
				ajax.err=function(){console.log('出错')};
				ajax.send();	
			};
			var indexTime=json.time; //gameTime_over
			var y_timer=setInterval(function(){
				if(indexTime<=1){
					clearInterval(s_timer);
					bStop=false;
					clearInterval(y_timer);
					window.removeEventListener('devicemotion',deviceMotionHandler);
					removeNode(bgBack);
					removeNode(cornucopia);
					removeNode(coin_wrap);
				};
				indexTime--;
			},1000)
		},1000)
	}
//投票
,TOUPIAO:function($options){
			 setStyle('.zanBox{width:100%;height:100%;border-radius:50%;box-sizing:border-box;overflow:hidden;text-align:center;color:#fff;background:url(+PAGE.COMMON+img/dianzanpic.png) no-repeat center center;background-size:100%}.zanBox .timer{height:20%;font-size:2rem;border-bottom:1px solid rgba(255,255,255,.3)}.tpBox{position:relative}.tpBox .timer{border-bottom:none}.tp_Count{position:absolute;bottom:15px;left:50%;-webkit-transform:translateX(-50%);width:60%}.tp_heart{box-sizing:border-box;width:100%;padding:8px 5px;margin:0 0 10px 0;border-radius:5px;background:#f21136;box-shadow:2px 2px 5px rgba(242,17,54,.5)}.tp_heart img{width:25px;vertical-align:middle;margin-right:10px}.tp_heart b{vertical-align:middle;font-size:16px}.tp_marsk{position:absolute;top:70%;left:50%;-webkit-transform:translateX(-50%);width:80%;z-index:10}.tp_marsk li{width:60px;height:60px;border-radius:50%;border:2px rgba(255,255,255,.3) solid;position:absolute;overflow:hidden}.tp_marsk li img{width:100%}.tpBox .tpActive{background:#696969;box-shadow:2px 2px 5px rgba(105,105,105,.5)}.tpBox .tpActive b{color:#bebebe}.tp_marsk li.tutor_cur{border:2px #fff solid}.opt_bfb{position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);background:url('+PAGE.COMMON+'img/tp_optbf.png) no-repeat center center;background-size:100% 100%;padding:10px 15px;color:#fff;opacity:0}#zanP1{opacity:0;-webkit-transition:all linear 1.2s}.tutor_1 .tutor0{left:50%;top:0;-webkit-transform:translateX(-50%)}.tutor_2 .tutor0{left:20%;top:7px}.tutor_2 .tutor1{left:60%;top:7px}.tutor_3 .tutor0{left:6%;top:-15px}.tutor_3 .tutor1{left:40%;top:8px}.tutor_3 .tutor2{left:73%;top:-15px}.tutor_4 .tutor0{left:-4%;top:-22px}.tutor_4 .tutor1{left:25%;top:8px}.tutor_4 .tutor2{left:54%;top:8px}.tutor_4 .tutor3{left:82%;top:-22px}.tutor_5 .tutor0{left:-10%;top:-48px}.tutor_5 .tutor1{left:13%;top:-2px}.tutor_5 .tutor2{left:40%;top:14px}.tutor_5 .tutor3{left:67%;top:-2px}.tutor_5 .tutor4{left:90%;top:-50px}.tutor_6 .tutor0{left:-11%;top:-64px}.tutor_6 .tutor1{left:6%;top:-14px}.tutor_6 .tutor2{left:29%;top:8px}.tutor_6 .tutor3{left:54%;top:8px}.tutor_6 .tutor4{left:76%;top:-20px}.tutor_6 .tutor5{left:92%;top:-76px}@media screen and (min-width:319px) and (max-width:358px){.tp_marsk li{width:50px;height:50px}}@media screen and (min-width:359px) and (max-width:376px){.tp_marsk li{width:55px;height:55px}}@media screen and (min-width:377px) and (max-width:413px){.tp_marsk li{width:60px;height:60px}}@media screen and (min-width:414px){.tp_marsk li{width:60px;height:60px}}');
	         var t=this,obj=$options.ele,prize=prizeFun.call($options);
			 var total_msg=[],tli
			    ,action="toupiao"				
				,nums
				,method={
						display:function($data){
							create(mainVar.sceneData)
						},run:function(ele,daan){
							PAGE.category=4;	
							mainVar.socketTxt={
								choose:(+daan)
							};
							this.stop()	;				
							tjData["appName"]="TOUPIAO"
							tjData["timu"]='投票';
							tjData["album_name"]='';									
							tjData["button_name"]=daan||'';									
							tjData["result"]=mainVar.game.result="answer";	
							mainVar.game.xuanze=daan;	
							mainVar.game.daan=daan;
							prize.display(function(){									
									function queryAction(data){
										if((+trim(mainVar.game.bfb))==1){return;}
										countAction({method:'queryCounter',dom:obj,counterName:'投票人数'},function($data){
											var data=toObject($data),zanP1=document.getElementById("zanP1");
											nums=toObject(data.result);
											var value=nums.options,sum;
											var pa=Number(value.optaNum)||0,pb=Number(value.optbNum)||0,pc=Number(value.optcNum)||0,pd=Number(value.optdNum)||0,pe=Number(value.opteNum)||0,sum=pa+pb+pc+pd+pe,numArr=[]
											numArr=[pa,pb,pc,pd,pe];
											for(var i=0;i<total_msg.length;i++){
												var tli=total_msg[i],part=document.querySelector(".opt_bfb"+tli.mask);
												part.style.opacity=1;
												part.classList.add("partsActive");
												part.innerHTML=((sum==0)?45:(numArr[i]*100/sum)^0)+"%";
											};
											zanP1.innerHTML=((sum==0)?45:(numArr[(+daan)-1]*100/sum)^0)+"%的人选择了TA";
											zanP1.style.opacity="1";
										}) 									
									}	
									setTimeout(function(){
									  prizeInit()		
									},2100);
									setTimeout(function(){mainVar.game.option_box.removeChild(mainVar.game.tp_marsk);},2800);
									setStorage("set","xuanze"+gameTime,daan);	
									setStorage("set","daan"+gameTime,daan);	
									ele.setAttribute("action","");
									ele.className ="tp_heart tpActive";	
									ele.lastChild.innerHTML=mainVar.sceneData.btnTxt2||'已选择';
									ele.firstChild.src=PAGE.COMMON+"img/tp_heart2.png";
									var jishu
									switch(daan){
										case "1":jishu="a";break	
										case "2":jishu="b";break	
										case "3":jishu="c";break	
										case "4":jishu="d";break	
										case "5":jishu="e";break	
										case "6":jishu="f";break	
									}
									countAction({option:"opt"+jishu+"Num",method:'accumulate',counterName:'投票人数'},queryAction,function(){setTimeout(function(){prizeInit();},1000);});												
								});
						},selection:function(ele,mask,$data,i){
							var tpBox=document.querySelector('.tpBox');
							var tp_heart=document.querySelector('.tp_heart');
							var child=mainVar.game.tp_marsk.childNodes;
							for(var j=0;j<child.length;j++){
								child[j].className ='tutor'+j;	
							}
							ele.className ='tutor'+i+' tutor_cur';
							tpBox.style.backgroundImage="url("+$data+")";
							tp_heart.setAttribute("action",action+'.,'+mask);
						}
					};				
				return method;
				function create($data){
					var contentBox=obj.contentBox
					contentBox.innerHTML=input($data)
					creamDom($data)
					var tv=setInterval(function(){
							if($options.mainData.countdown>0){
								contentBox.querySelector(".timer").innerHTML=--$options.mainData.countdown;
							}else{
								clearInterval(tv);
								mainVar.game.tp_marsk && removeNode(mainVar.game.tp_marsk);
								gameOver();				
							}
						},1000)
						method.stop=function(){
							clearInterval(tv)
						}		
					}
				function creamDom($data){
					var tutorArr=[],tutorBig=[],html='',sli,bli,s,b,t;
					 mainVar.game.option_box=document.querySelector('.mainBox');
					 mainVar.game.tp_marsk=createNode(mainVar.game.option_box,"ul",{className:"tp_marsk"});
					tutorArr=[$data.optionA,$data.optionB,$data.optionC,$data.optionD,$data.optionE,$data.optionF];
					tutorBig=[$data.optionA_big,$data.optionB_big,$data.optionC_big,$data.optionD_big,$data.optionE_big,$data.optionF_big];
					sli=tutorArr.length;bli=tutorBig.length;
					for(var i=0;i<sli;i++){
					  s=tutorArr[i],b=tutorBig[i]
					  if(s!='' && b!=''){
						  total_msg.push({
							 sImg:s,
							 bImg:b,
							 mask:(i+1), 
						  })
					  }
					}
					tli=total_msg.length;
						mainVar.game.tp_marsk.className='tp_marsk tutor_'+tli;
						for(var i=0;i<tli;i++){
							t=total_msg[i]
							
							html +='<li class="tutor'+i+' '+(i===0?"tutor_cur":"")+'" action="toupiao_opt.,'+t.mask+'.,'+t.bImg+'.,'+i+'"><img src="'+t.sImg+'"><div class="opt_bfb opt_bfb'+t.mask+'"></div></li>';
						}
						 mainVar.game.tp_marsk.innerHTML=html
				}
				function input($data){	
					var _data=$data,html='',btnTxt=_data.btnTxt1||'请选择';
					mainVar.game.bfb=_data.result
					html='<div class="zanBox tpBox" style="background-image:url('+_data.optionA_big+');background-size:100%;"><div class="timer">'+$options.mainData.countdown+'</div>'	
						+'<div class="tp_Count">'
						+'<div class="tp_heart" action='+action+".,1"+'><img src="'+PAGE.COMMON+'img/tp_heart.png" class="tp_img"/><b class="b">'+btnTxt+'</b></div>'
						+'<div class="tp_zanNum"><p id="zanP1" style="font-size:14px;text-shadow:2px 2px 2px #000;">59%的人选择了TA</p></div>'	
						+'</div></div></div>';
					return html								
				}	
			}
//竞猜
,JINGCAI:function($options){
			 setStyle('.zanBox{width:100%;height:100%;border-radius:50%;box-sizing:border-box;overflow:hidden;text-align:center;color:#fff;background:url(+PAGE.COMMON+img/dianzanpic.png) no-repeat center center;background-size:100%}.zanBox .timer{height:20%;font-size:2rem;border-bottom:1px solid rgba(255,255,255,.3)}.tpBox{position:relative}.tpBox .timer{border-bottom:none}.tp_Count{position:absolute;bottom:15px;left:50%;-webkit-transform:translateX(-50%);width:60%}.tp_heart{box-sizing:border-box;width:100%;padding:8px 5px;margin:0 0 10px 0;border-radius:5px;background:#f21136;box-shadow:2px 2px 5px rgba(242,17,54,.5)}.tp_heart img{width:25px;vertical-align:middle;margin-right:10px}.tp_heart b{vertical-align:middle;font-size:16px}.tp_marsk{position:absolute;top:70%;left:50%;-webkit-transform:translateX(-50%);width:80%;z-index:10}.tp_marsk li{width:60px;height:60px;border-radius:50%;border:2px rgba(255,255,255,.3) solid;position:absolute;overflow:hidden}.tp_marsk li img{width:100%}.tpBox .tpActive{background:#696969;box-shadow:2px 2px 5px rgba(105,105,105,.5)}.tpBox .tpActive b{color:#bebebe}.tp_marsk li.tutor_cur{border:2px #fff solid}.opt_bfb{position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);background:url('+PAGE.COMMON+'img/tp_optbf.png) no-repeat center center;background-size:100% 100%;padding:10px 15px;color:#fff;opacity:0}#zanP1{opacity:0;-webkit-transition:all linear 1.2s}.tutor_1 .tutor0{left:50%;top:0;-webkit-transform:translateX(-50%)}.tutor_2 .tutor0{left:20%;top:7px}.tutor_2 .tutor1{left:60%;top:7px}.tutor_3 .tutor0{left:6%;top:-15px}.tutor_3 .tutor1{left:40%;top:8px}.tutor_3 .tutor2{left:73%;top:-15px}.tutor_4 .tutor0{left:-4%;top:-22px}.tutor_4 .tutor1{left:25%;top:8px}.tutor_4 .tutor2{left:54%;top:8px}.tutor_4 .tutor3{left:82%;top:-22px}.tutor_5 .tutor0{left:-10%;top:-48px}.tutor_5 .tutor1{left:13%;top:-2px}.tutor_5 .tutor2{left:40%;top:14px}.tutor_5 .tutor3{left:67%;top:-2px}.tutor_5 .tutor4{left:90%;top:-50px}.tutor_6 .tutor0{left:-11%;top:-64px}.tutor_6 .tutor1{left:6%;top:-14px}.tutor_6 .tutor2{left:29%;top:8px}.tutor_6 .tutor3{left:54%;top:8px}.tutor_6 .tutor4{left:76%;top:-20px}.tutor_6 .tutor5{left:92%;top:-76px}@media screen and (min-width:319px) and (max-width:358px){.tp_marsk li{width:50px;height:50px}}@media screen and (min-width:359px) and (max-width:376px){.tp_marsk li{width:55px;height:55px}}@media screen and (min-width:377px) and (max-width:413px){.tp_marsk li{width:60px;height:60px}}@media screen and (min-width:414px){.tp_marsk li{width:60px;height:60px}}');
	         var t=this,obj=$options.ele,prize=prizeFun.call($options);
			 var total_msg=[],tli
			    ,action="jingcai"				
				,nums
				,method={
						display:function($data){
							create(mainVar.sceneData)
						},run:function(ele,daan,noteText){
							PAGE.category=4;	
							mainVar.socketTxt={
								choose:(+daan)
							};
							this.stop()	;				
							tjData["appName"]="JINGCAI"
							tjData["timu"]='竞猜';
							tjData["album_name"]=noteText;									
							tjData["button_name"]=noteText||'';									
							tjData["result"]=mainVar.game.result="answer";	
							mainVar.game.xuanze=daan;	
							mainVar.game.daan=daan;
							
							if(mainVar.mainData.commitJCDeal>0){
								var opt=toObject(mainVar.sceneData.question),arrs=[],newarr=[];
								if(!mainVar.jckey){mainVar.jckey=true;
									for(var i=0;i<opt.length;i++){if(i%2==1)newarr.push(opt[i])}
									for(var i=0;i<newarr.length;i++){
										if(newarr[i].value&&newarr[i].noteText)arrs.push({option:newarr[i].value,remark:newarr[i].noteText});
									};
									var user=mainVar.userInfo,a=setAjax('post',HOST.YAO+'/api/guess/index');
										a.set=function(){this.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");}
										a.data='options='+JSON.stringify(arrs)+'&action=set&startTime='+mainVar.mainData.startTime+'&yyyappid='+PAGE.yyyappid+'&openid='+user.openid+'&jcid='+mainVar.mainData.jcid+'&result='+newarr[daan-1].noteText+'&sig='+user.sig+'&sigExpire='+user.sigExpire;
										a.callBack=function(data){console.log(data);};
										a.send();
								}
							}
								
							prize.display(function(){									
									function queryAction(data){
										if((+trim(mainVar.game.bfb))==1){return;}
										countAction({method:'queryCounter',dom:obj,counterName:'投票人数'},function($data){
											var data=toObject($data),zanP1=document.getElementById("zanP1");
											nums=toObject(data.result);
											var value=nums.options,sum;
											var pa=Number(value.optaNum)||0,pb=Number(value.optbNum)||0,pc=Number(value.optcNum)||0,pd=Number(value.optdNum)||0,pe=Number(value.opteNum)||0,sum=pa+pb+pc+pd+pe,numArr=[]
											numArr=[pa,pb,pc,pd,pe]
											for(var i=0;i<total_msg.length;i++){
												var tli=total_msg[i],part=document.querySelector(".opt_bfb"+tli.mask);
												part.style.opacity=1;
												part.classList.add("partsActive");
												part.innerHTML=((sum==0)?45:(numArr[i]*100/sum)^0)+"%";
											};
											zanP1.innerHTML=((sum==0)?45:(numArr[(+daan)-1]*100/sum)^0)+"%的人选择了TA";
											zanP1.style.opacity="1";
										}) 									
									}	
									setTimeout(function(){
									  prizeInit()		
									},2100);
									setTimeout(function(){mainVar.game.option_box.removeChild(mainVar.game.tp_marsk);},2800);
									setStorage("set","xuanze"+gameTime,daan)
									setStorage("set","daan"+gameTime,daan)
									ele.setAttribute("action","");
									ele.className ="tp_heart tpActive";	
									ele.lastChild.innerHTML=mainVar.sceneData.btnTxt2||'已选择';
									ele.firstChild.src=PAGE.COMMON+"img/tp_heart2.png";
									var jishu
									switch(daan){
										case "1":jishu="a";break	
										case "2":jishu="b";break	
										case "3":jishu="c";break	
										case "4":jishu="d";break	
										case "5":jishu="e";break	
										case "6":jishu="f";break	
									}
									countAction({option:"opt"+jishu+"Num",method:'accumulate',counterName:'投票人数'},queryAction,function(){setTimeout(function(){prizeInit();},1000);});												
								});
						},selection:function(ele,mask,$data,i,noteText){
							var tpBox=document.querySelector('.tpBox');
							var tp_heart=document.querySelector('.tp_heart');
							document.querySelector(".tp_Count").style.display="block";
							var child=mainVar.game.tp_marsk.childNodes;
							for(var j=0;j<child.length;j++){
								child[j].className ='tutor'+j;	
							}
							ele.className ='tutor'+i+' tutor_cur';
							tpBox.style.backgroundImage="url("+$data+")";
							tp_heart.setAttribute("action",action+'.,'+mask+'.,'+noteText);
						}
					};				
				return method;
				function create($data){
					var contentBox=obj.contentBox
					contentBox.innerHTML=input($data)
					creamDom($data)
					var tv=setInterval(function(){
							if($options.mainData.countdown>0){
								contentBox.querySelector(".timer").innerHTML=--$options.mainData.countdown;
							}else{
								clearInterval(tv);
								mainVar.game.tp_marsk && removeNode(mainVar.game.tp_marsk);
								gameOver();				
							}
						},1000)
						method.stop=function(){
							clearInterval(tv)
						}		
					}
				function creamDom($data){
					var tutorArr=[],tutorBig=[],html='',sli,bli,s,b,t;
					 mainVar.game.option_box=document.querySelector('.mainBox');
					 mainVar.game.tp_marsk=createNode(mainVar.game.option_box,"ul",{className:"tp_marsk"});
					 var questions=toObject($data.question);
					 for(var i=0;i<questions.length;i++){
					 	var a=questions[i];
					 	if(a.value!=''){
					 		if(i%2==0){tutorArr.push(a);}else{tutorBig.push(a);};				 
							}
					 }
					sli=tutorArr.length;bli=tutorBig.length;
					for(var i=0;i<sli;i++){
					  s=tutorArr[i],b=tutorBig[i]
					  if(s&&b){
						  total_msg.push({
							 sImg:s,
							 bImg:b,
							 mask:(i+1), 
						  })
					  }
					}
					    tli=total_msg.length;
						mainVar.game.tp_marsk.className='tp_marsk tutor_'+tli;
						for(var i=0;i<tli;i++){
							t=total_msg[i]
							html +='<li class="tutor'+i+' '+(i===0?"tutor_cur":"")+'" action="jingcai_opt.,'+t.mask+'.,'+t.bImg.value+'.,'+i+'.,'+t.sImg.noteText+'"><img src="'+t.sImg.value+'"><div class="opt_bfb opt_bfb'+t.mask+'"></div></li>';
						}
						 mainVar.game.tp_marsk.innerHTML=html
				}
				function input($data){	
					var _data=$data,html='',btnTxt=_data.btnTxt1||'请选择';
					mainVar.game.bfb=_data.result
					html='<div class="zanBox tpBox" style="background-image:url('+_data.cover+');background-size:100%;"><div class="timer">'+$options.mainData.countdown+'</div>'	
						+'<div class="tp_Count" style="display:none;">'
						+'<div class="tp_heart" action='+action+".,1"+'><img src="'+PAGE.COMMON+'img/tp_heart.png" class="tp_img"/><b class="b">'+btnTxt+'</b></div>'
						+'<div class="tp_zanNum"><p id="zanP1" style="font-size:14px;text-shadow:2px 2px 2px #000;">59%的人选择了TA</p></div>'	
						+'</div></div></div>';
					return html								
				}	
			}
	//答题互动数据
	,INTERACTIVE:function(sceneData,arr,type,counter_name){
		var letter=["A","B","C","D","E","F","G","H","I","J"],s_letter=["optaNum","optbNum","optcNum","optdNum","opteNum","optfNum","optgNum","opthNum","optiNum","optjNum"];
		var percentage,index=0,userBase=mainVar.mainData.userBase,autoFn=null;
		if(+userBase<=0){
			userBase=1;
		};
		switch(type){
			case 0:
				var CSS='.percentage{position:absolute;top:0;left:0;width:100%;background:rgba(0,0,0,0.5);background-size:100% 100%;height:75px;color:#fff;line-height:16px;overflow:hidden;font-size:13px;}.percentage .area{position:relative;width:42%;float:left;margin:5px 4% 0 4%;}.percentage .area .left{width:85%;float:left;position:absolute;bottom:3px;}.percentage .serialNum{font-family:arial;font-size:38px;height:30px;line-height:30px;margin-right:10px}.percentage .num{font-size:16px}.percentage .answer{background:#279136;padding:1px 3px;border-radius:3px;margin-right:3px}.percentage .bottom{width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding:2px 0}.percentage .bottom span{vertical-align:middle}.percentage .area .right{width:15%;float:right;height:71px;}.percentage .area .con{padding-top:16px;height:55px;width:14px;position:relative;}.percentage .percentageNum{position:absolute;left:50%;-webkit-transform:translateX(-50%);top:0;}.percentage .right .con div{position:relative;width:12px;background:#fff;height:55px;border-top-left-radius:4px;border-top-right-radius:4px;overflow:hidden}.percentage .right p{width:100%;position:absolute;bottom:0;width:100%;height:5%;background:#000}.percentage .line{height:50px;width:1px;background:rgba(255,255,255,0.5);position:absolute;right:0;top:50%;margin-top:-25px;margin-right:-12px;}';
				setStyle(CSS);
				var color=['#2c9cce','#e42b79'];
				autoFn=function(){
					var str='',cssStyle='',className='',people=0,areaClass='';
					countAction({method:'queryCounter',dom:mainVar.ele,counterName:counter_name},function($data){
						var data=toObject($data);
						if(data.errCode=='0'){
							var nums=toObject(data.result),options=nums.options,count=0;
							if(!options)return;
							for(var k in options){
								for(var i=0;i<arr.length;i++){
									if(k==arr[i].name){
										people=Math.round(options[k]*userBase);
										arr[i].num=people;
										count+=people;
									};
								};
							};
							for(var i=0;i<arr.length;i++){
								var percent=((arr[i].num*100)/(count*100)*100).toFixed(0);
									if(letter[i]!=sceneData.answer){
										cssStyle="display:none";
									}else{
										cssStyle='';
									};
									if(i%2){
										className='';
									}else{
										className='line';
									};
									str+='<div class="area '+areaClass+'">\
												<div class="left">\
													<p class="top">\
														<span class="serialNum">'+letter[i]+'</span><span class="num">'+arr[i].num+'人</span>\
													</p>\
													<p class="bottom">\
														<span class="answer" style="'+cssStyle+'">正确</span><span class="option">'+arr[i].value+'</span>\
													</p>\
												</div>\
												<div class="right">\
													<div class="con">\
														<span class="percentageNum">'+percent+'%</span>\
														<div>\
															<p style="background-color:'+color[i]+';height:'+percent+'%;"></p>\
														</div>\
													</div>\
												</div>\
												<p class='+className+'></p>\
											 </div>'
								if(isNaN(percent)||arr[i].num==undefined||percent=='Infinity'){
									return;
								};
							};
							if(!mainVar.ele.percentage){
								percentage=mainVar.ele.percentage=createNode(mainVar.ele.mainBox,'div',{className:'percentage'},'p3');
							};
							mainVar.ele.percentage.innerHTML=str;
						};
					})
				};
			break;
			case 1:
				var CSS='.t_percentage{height:75px;background:rgba(0,0,0,0.5);position:absolute;top:0;left:0;width:100%;overflow:hidden;color:#fff;}.t_percentage ol{position:absolute;height:5px;bottom:5px;left:50%;-webkit-transform:translateX(-50%);}.t_percentage ol li{width:5px;height:100%;background:rgba(255,255,255,0.5);border-radius:50%;float:left;margin-right:5px;}.t_percentage ol .cur{background:#fff;}.t_percentage ul{height:100%;width:5000px;}.t_percentage ul li{height:100%;float:left;}.t_percentage .con{height:63px;padding:12px 5px 0 5px;}.t_percentage .left,.t_percentage .right{float:left;}.t_percentage .left{position:relative;width:50px;height:50px;margin-right:5px;}.t_percentage .left div{width:42px;height:42px;overflow:hidden;border:4px solid rgba(255,255,255,0.1);border-radius:50%;}.t_percentage svg{position:absolute;top:0px;left:0px;width:100%;height:100%;fill:none;-webkit-transform:rotate(90deg);display:none;}.t_percentage .left img{height:100%;width:100%;}.t_percentage .right{line-height:18px;padding-top:10px;position:relative;}.t_percentage .right p{width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.t_percentage .right .first{position:absolute;top:-12px;left:0;font-size:12px;line-height:20px;background:url(//a-h5.mtq.tvm.cn/yao/common/img/first.png);background-size:100% 100%;height:20px;width:32px;text-align:center;}'
				setStyle(CSS);
				var str='',html='',radius=22,viewNum=3,curW=winW/viewNum,strokeColor='',isShow='none',val=0,arrLen=0;
				arrLen=arr.length;
				if(arrLen<viewNum){
					val=10;
					curW=(winW-val)/arrLen;
				}else{
					if(curW>120){
						val=10;
						curW=(winW-val)/viewNum;
					};
				};
				
				for(var i=0;i<arrLen;i++){
					arr[i].num=0;
					arr[i].name=s_letter[i];
					if(i==0){
						strokeColor="#e42b79";
						isShow='block';
					}else{
						strokeColor="#1bd8cc";
						isShow='none';
					};
					str+='<li style="width:'+curW+'px">\
						<div class="con">\
							<div class="left">\
								<svg>\
									<circle cx="50%" cy="50%" r="'+radius+'" stroke-width="2" stroke="'+strokeColor+'"></circle>\
								</svg>\
								<div>\
									<img src="'+arr[i].value+'">\
								</div>\
							</div>\
							<div class="right" style="width:'+(curW-60)+'px">\
								<p class="first" style="display:'+isShow+'">领先</p>\
								<p class="name">'+arr[i].noteText+'</p>\
								<p class="people">0人</p>\
							</div>\
						</div>\
					 </li>';
				};
				var leng=Math.ceil(arrLen/viewNum);
				if(leng>1){   //加点
					html+='<ol>';
					for(var i=0;i<leng;i++){
						if(i==0){
							html+='<li class="cur"></li>';
						}else{
							html+='<li></li>';
						};
					};
					html+='</ol>';
				};
				if(arrLen>viewNum){
					for(var i=0,len=leng*viewNum-arrLen;i<len;i++){  //加空标签
						str+='<li style="width:'+curW+'px"></li>';
					};
				};
			    mainVar.ele.percentage=t_percentage=createNode(mainVar.ele.mainBox,'div',{'id':'t_percentage','className':'t_percentage','html':'<ul>'+str+'</ul>'+html,style:'display:none;padding-left:'+val+'px;'},'p3');
				var oUl=t_percentage.querySelector('ul'),elem_ol=t_percentage.querySelector('ol'),oLi=oUl.querySelectorAll('li');
				if(arrLen>viewNum){ //大于viewNum个出现自动滚动，手动滚动
					setJsonp(PAGE.COMMON+"jc/touch.js",function(){
						setJsonp(PAGE.COMMON+"jc/slide_new.js",function(){
							new slide({
								isScroll:true,   
								IDName:'t_percentage',
								scrollArea:oUl,
								prevBtn:null,
								nextBtn:null,
								scrollListWidth:curW,
								scrollList:oLi,
								dot:elem_ol,
								count:leng,
								scrollNum:viewNum, //滚动图片的数量（默认值：1）
								time:'800',        //滚动图片队列所需的时间（默认值：400）
								intervalTime:8000  //阁多长时间滚动  （默认值：4000）
							});
						});
					});
				};
				autoFn=function(){
					var str='',cssStyle='',className='',count=0,areaClass='';
					countAction({method:'queryCounter',dom:mainVar.ele,counterName:'投票人数'},function($data){
						var data=toObject($data);
						if(data.errCode=='0'){
							var nums=toObject(data.result),options=nums.options,count=0;
							if(!options)return;
							t_percentage.style.display='block';
							for(var k in options){
								for(var i=0,len=arr.length;i<len;i++){
									if(k==arr[i].name){
										arr[i].num=Math.round(options[k]*userBase);
										count+=arr[i].num;
									};
								};
							};
							arr.sort(function(a,b){
								return b.num-a.num;
							});
							for(var i=0,len=arr.length;i<len;i++){
								if(!count)return;
								var curElem=oLi[i];
								curElem.querySelector('.people').innerHTML=arr[i].num+'人';
								curElem.querySelector('.name').innerHTML=arr[i].noteText;
								curElem.querySelector('img').src=arr[i].value;
								if(arr[i].num){
									var percent=((arr[i].num*100)/(count*100)*100).toFixed(0);
									var decimals=percent/100,perimeter=2*Math.PI*radius;
									curElem.querySelector('svg').style.display='block';
									curElem.querySelector('circle').setAttribute('stroke-dasharray',perimeter*decimals+" "+perimeter*(1- decimals));
								};
							};
						};
					});
				};
			break
			case 2:
				var CSS='.d_percentage{position:relative;padding-top:14px;height:61px;background:rgba(0,0,0,0.5);position:absolute;top:0;left:0;width:100%;overflow:hidden;color:#fff;text-align:center}.d_percentage>*{display:inline-block;vertical-align:middle}.d_percentage .portrait{margin-right:8px;height:40px;width:40px;border-radius:50%;border:4px solid rgba(255,255,255,.1);overflow:hidden}.d_percentage .portrait img{height:100%;width:100%}.d_percentage .name{float:right;line-height:48px;font-size:16px;margin-right:8px}.d_percentage .text{padding-left:8px;border-left:1px solid rgba(255,255,255,.4);text-align:left}.d_percentage .text span{color:#f2bd1c;font-size:18px;font-weight:700;}.d_percentage .text span:nth-child(1){font-weight:300}';
				setStyle(CSS);
				var zanCount=mainVar.zanCount,obj=null,html='';
				html=(sceneData.countText||'共计点赞0次<br>您共为ta点赞0次').replace(/\d+/g,function(data){
					return ' <span>'+data+'</span> ';
				}); 
				autoFn=function(){
					var str='';
					countAction({method:'queryCounter',dom:mainVar.ele,counterName:'点赞人数'},function($data){
						var data=toObject($data);
						if(data.errCode=='0'){
							var nums=toObject(data.result),options=nums.options,count=0;
							if(!options)return;
							 str='<em class="portrait">\
										<img src="'+sceneData.zanPeople+'">\
									</em>\
									<div class="text">'+html+'</div>';
							if(!mainVar.ele.percentage){
								mainVar.ele.percentage=createNode(mainVar.ele.mainBox,'div',{'id':'d_percentage','className':'d_percentage','html':str},'p3');
							};
							var textElem=mainVar.ele.percentage.querySelectorAll('span');
							try{
								textElem[0].innerHTML=options.optbNum||setStorage("get","zanCount"+gameTime,zanCount);
								textElem[1].innerHTML=(zanCount||setStorage("get","zanCount"+gameTime,zanCount));
							}catch(e){ //容错
								mainVar.ele.percentage.querySelector('.text').innerHTML='累计点赞 <span>'+(options.optbNum||setStorage("get","zanCount"+gameTime,zanCount))+'</span> 次<br>您共为ta点赞 <span>'+(zanCount||setStorage("get","zanCount"+gameTime,zanCount))+'</span> 次';
							};
						};
					});
				};
		};
		autoFn();
		mainVar.times.percentage=setInterval(function(){
			if(mainVar.times.p_bstop)return;
			autoFn();
		},5000); 		
	},SHEQU:function(){
		return {display:function($ele,$fun,$err){		
			var menu=eval(PAGE.sqMenu),m=0,ml=menu.length,mi,mv,src="//a-h5.mtq.tvm.cn/yao/common/img/menu/",md=[
			{img:src+"n_scj.png","activeimg":1,txt:"",link:'javascript:goUrl(\'M_WDSC\')'},
			{img:src+"n_kds.png","activeimg":1,txt:"",link:'javascript:goUrl(\'KDS\')'},
			{img:src+"n_hye.png","activeimg":1,txt:"",link:'javascript:goUrl(\'M_SC_NEW\')'},
			{img:src+"n_wjb.png","activeimg":1,txt:"",link:'javascript:goUrl(\'M_YL\')'},
			{img:src+"n_grzx.png","activeimg":1,txt:"",link:'javascript:goUrl(\'M_GRZX\')'}]
//			PAGE.mascot.word=[];
//				for(;m<5;m++){
//						mi=menu[m],mv=trim(mi.value),mt=trim(mi.noteText),me=md[m];						
//						mt!="OFF"&&PAGE.mascot.word.push({img:me.img,"activeimg":1,txt:"",link:"javascript:goUrl('"+(mt==""?md[m].link:mt)+"')"})
//					}	
					PAGE.mascot.word=md;	
	setJsonp(HOST.WSQCDN+"/wsqh5/wsqface.js?v=20160326",function($arg){
				if($arg===1)new createBKBL($ele,$fun);
				else isFun($err)
			},document.body)
			}
		}
	},ZHIBO:function(){
		return {display:function($ele,$fun,$err){		
			var menu=eval(PAGE.sqMenu),m=0,ml=menu.length,mi,mv,md=[{img:"//a-h5.mtq.tvm.cn/yao/common/img/menu/1.png","activeimg":1,txt:"",link:'M_WDSC'},{img:"//a-h5.mtq.tvm.cn/yao/common/img/menu/2.png","activeimg":1,txt:"",link:'M_SC'},{img:"//a-h5.mtq.tvm.cn/yao/common/img/menu/3.png","activeimg":1,txt:"",link:'M_YL'},{img:"//a-h5.mtq.tvm.cn/yao/common/img/menu/4.png","activeimg":1,txt:"",link:'M_GRZX'}]
			PAGE.mascot.word=[];
				for(;m<ml;m++){
						mi=menu[m],mv=trim(mi.value),mt=trim(mi.noteText),me=md[m];
						mt!="OFF"&&PAGE.mascot.word.push({img:mv==""?me.img:mv,"activeimg":1,txt:"",link:"javascript:goUrl('"+(mt==""?md[m].link:mt)+"')"})
					}			
	setJsonp(HOST.WSQCDN+"/wsqh5/wsqface.js?v=20160326",function($arg){
				if($arg===1)new createZHIBO($ele,$fun);
				else isFun($err)
			},document.body)
			}
		}
	},TAG_CLOUD:function(){
function xdRandomBall($data,$c){
setStyle("html,body{width:100%;height:100%;overflow:hidden;padding:0;margin:0}\
body{width:100%;min-height:100%;padding:0;margin:0;position:relative;font:12px weiruanyahei,FZYQJW,'微软雅黑',Tahoma,'\534E\6587\5B8B\4F53',arial;overflow:hidden}\
body,ul,ul li,ol,ol li,dl,dl dd,h3,h4,p,hr{list-style:none;margin:0;padding:0}ul,ul li,ol,ol li,dl,dl dd,h3,h4,p{ list-style:none; margin:0; padding:0}\
.wrapBack{display:none;position:absolute;width:100%;height:100%;overflow:hidden;top:0;left:0;background:rgba(0,0,0,.65)}\
.tagBall{position:absolute;box-sizing:border-box;font-size:14px;border-radius:50%;transform:translate3d(0,0,0);padding:0 10px}\
.tanslateAni{-webkit-animation:tanslateAni 5000ms infinite linear alternate}\
@-webkit-keyframes tanslateAni{\
0%{-webkit-transform:rotate(10deg) translate3d(0px,0px,0)}\
35%{-webkit-transform:rotate(0deg) translate3d(20px,0px,0)}\
70%{-webkit-transform:rotate(-10deg) translate3d(0px,0px,0)}\
100%{-webkit-transform:rotate(0deg) translate3d(-20px,0px,0)}}\
@-webkit-keyframes sj_rotate2{0%{-webkit-transform:rotate(0deg) translate3d(0,0,0)}\
35%{-webkit-transform:rotate(-10deg) translate3d(0,12px,0)}\
70%{-webkit-transform:rotate(0deg) translate3d(0,0,0)}\
100%{-webkit-transform:rotate(10deg) translate3d(-12px,0,0)}}\
.classBall{position:absolute;font-size:1.2em;text-align:center;border-radius:50%;transform:translate3d(0,0,0);box-sizing:border-box;text-shadow:1px 1px 1px #000}\
.smallBox{position:absolute;left:0;top:0;box-sizing:border-box}\
.ball{display:flex;display:-webkit-box;justify-content:center;align-items:center;color:#fff;text-align:center;-webkit-box-pack:center;-webkit-box-align:center;font-weight:bold;font-size:15px;will-change: transform;}\
.ball.b1{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b1.png);background-size:100% 100%}\
.ball.b2{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b2.png);background-size:100% 100%}\
.ball.b3{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b3.png);background-size:100% 100%}\
.ball.b4{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b4.png);background-size:100% 100%}\
.ball.b5{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b5.png);background-size:100% 100%}\
.ball.b6{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b6.png);background-size:100% 100%}\
.b1s{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b1s.png);background-size:100% 100%}\
.b2s{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b2s.png);background-size:100% 100%}\
.b3s{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b3s.png);background-size:100% 100%}\
.b4s{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b4s.png);background-size:100% 100%}\
.b5s{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b5s.png);background-size:100% 100%}\
.b6s{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b6s.png);background-size:100% 100%}\
.b1ss{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b1ss.png);background-size:100% 100%}\
.b2ss{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b2ss.png);background-size:100% 100%}\
.b3ss{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b3ss.png);background-size:100% 100%}\
.b4ss{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b4ss.png);background-size:100% 100%}\
.b5ss{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b5ss.png);background-size:100% 100%}\
.b6ss{background-image:url(//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/b6ss.png);background-size:100% 100%}\
.page-top{position:fixed;top:0;left:0;width:100%;z-index:1;background:rgba(179,219,241,.7);color:#ff3101;text-align:center;padding:3px 0;line-height:24px;max-height:82px;font-size:16px}\
.page-top b,#djtime b{background:#F00;border-radius:4px;display:inline-block;padding:0 4px;color: #fff;margin:0 1px;height: 20px;line-height: 20px}\
.page-top p{position:relative;height:52px;display:inline-block}\
.page-top em{font-style:normal;display:inline-block;background:#ff3101;color:#fff;border-radius:3px;padding:0 4px;line-height:22px;margin:0 1px}\
.page-top span{font-size:26px}\
.page-top-main{display:inline-block;width:100%;margin-top:-100%}\
.page-top-main li{float:left;width:50%;padding:0 5px;box-sizing:border-box}\
.page-top-main li img{width:30px;vertical-align:middle}\
.page-top-main li span{text-shadow:0 0 3px #000,-3px 1px 1px #000,0 0 3px #000,0 1px 3px #000;color:#fff;display:inline-block;background:rgba(0,0,0,.3);padding:0 10px;border-radius:15px;margin-left:-8px;font-size:1.1em;font-weight:900}\
.page-top-main li.right{text-align:right}\
.page-top-main li.right span{margin-right:-8px}\
.page-bottom{position:fixed;left:0;bottom:0;width:100%;padding-bottom:10px;z-index:1}\
.page-bottom .page-bottom-top{padding-left:72px}\
.page-bottom .page-bottom-top font{width:50px;height:50px;display:inline-block;position:relative;margin-left:-62px;float:left}\
.page-bottom .page-bottom-top img{border:1px solid #fff;border-radius:100%;width:48px}\
.page-bottom .page-bottom-top span{display:inline-block;padding:2px;background:#ff3c3c;color:#fff;font-size:10px;line-height:11px;letter-spacing:1px;border-radius:8px;right:0;bottom:0;-webkit-transform:translateX(50%);position:absolute}\
.page-bottom ul{display:inline-block;padding-top:6px}\
.page-bottom ul li{float:left;width:70px;height:30px;font-size:12px;text-align:center;line-height:30px;color:#fff;margin-right:4px}\
.page-bottom ul li.less3{width:46px;}\
.page-bottom2{padding:5px 10px 0;position:relative}\
.page-bottom2 .tjbtn,.page-bottom2 .tjtext{border:0;margin:0;padding:0}\
.page-bottom2 .tjbtn{height:40px;border-radius:8px;position:absolute;right:9px;bottom:-2px;z-index:2}\
.page-bottom2 .tjtext{background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.6);border-radius:22px;padding:0 66px 0 10px;color:#fff;box-sizing:border-box;width:100%;height:38px}\
@-webkit-keyframes bounceIn{\
0%{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}\
50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}\
70%{-webkit-transform:scale(.9);transform:scale(.9)}\
100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}\
@keyframes bounceIn{\
0%{opacity:0;-webkit-transform:scale(.3);-ms-transform:scale(.3);transform:scale(.3)}\
50%{opacity:1;-webkit-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}\
70%{-webkit-transform:scale(.9);-ms-transform:scale(.9);transform:scale(.9)}\
100%{opacity:1;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}\
.paopao{-webkit-animation:bounceIn .6s linear;animation:bounceIn .6s linear}\
@-webkit-keyframes toleft{\
0%{-webkit-transform:translateX(48px)}\
100%{-webkit-transform:translateX(0)}}\
@keyframes toleft{0%{-webkit-transform:translateX(48px)}\
100%{-webkit-transform:translateX(0)}}\
.toleft{-webkit-animation:toleft .4s linear;animation:toleft .4s linear}\
.mysearch{width:100%;position:fixed;bottom:-100%;left:0;z-index:101;padding:10px;box-sizing:border-box}\
.mysearch .page-bottom2{clear:both;padding:0}\
.mysearch .page-bottom2 .tjbtn{right:-2px}\
.mysearch .page-bottom2 .tjtext,.page-bottom .tjtext{padding-left:10px;font-size:14px}\
.page-bottom div.tjtext{position:absolute;bottom:0;left:10px;right:10px;width:auto;z-index:1}\
.page-bottom input.tjtext{opacity:0}\
@-webkit-keyframes searchopen{\
0%{opacity:0}\
100%{opacity:1}}\
@keyframes searchopen{\
0%{opacity:0}\
100%{opacity:1}}\
.searchopen{-webkit-animation:searchopen .4s linear;animation:searchopen .4s linear}\
@-webkit-keyframes searchhide{\
0%{opacity:1}\
100%{opacity:0}}\
@keyframes searchhide{\
0%{opacity:1}\
100%{opacity:0}}\
.searchhide{-webkit-animation:searchhide .2s linear;animation:searchhide .2s linear}\
@-webkit-keyframes paopaobtn{0%{opacity:0;-webkit-transform:scale(.6);transform:scale(.6)}\
50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}\
70%{-webkit-transform:scale(.9);transform:scale(.9)}\
100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}\
@keyframes paopaobtn{\
0%{opacity:0;-webkit-transform:scale(.6);-ms-transform:scale(.6);transform:scale(.6)}\
50%{opacity:1;-webkit-transform:scale(1.05);-ms-transform:scale(1.05);transform:scale(1.05)}\
70%{-webkit-transform:scale(.9);-ms-transform:scale(.9);transform:scale(.9)}\
100%{opacity:1;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}\
.paopaobtn{-webkit-animation:paopaobtn .5s linear;animation:paopaobtn .5s linear}\
.mainAdBox{position:absolute}\
.mainAdBox.chagngeDis{-webkit-animation:chagngeDis 1000ms forwards}\
@-webkit-keyframes chagngeDis{\
0%{top:-20%}\
60%{top:40%}\
100%{top:58px}}\
@media screen and (min-width:320px){\
.page-bottom ul{padding-top: 3px;}\
}\
@media screen and (min-width:360px){\
.page-bottom ul{padding-top: 3px;}\
}\
@media screen and (min-width:375px){\
.page-bottom2 .tjbtn{height:46px}\
.page-bottom2 .tjtext{height:44px;padding:0 78px 0 10px}\
.page-bottom ul{padding-top:6px}}\
@media screen and (min-width:414px){.page-bottom2 .tjbtn{height:46px}\
.page-bottom2 .tjtext{height:44px;padding:0 10px 0 10px}\
.page-bottom ul{padding-top:6px}}")	
DB.style.cssText="width:100%;height:100%;background:rgb(52, 128, 216) url("+$c.background+") no-repeat center center;background-size:100% auto"
DB.removeChild(mainVar.ele.mainBox)
var isTouch=('ontouchstart' in window)
	,folder=urlFolder()
	,winW=window.innerWidth
	,winH=window.innerHeight
	,t=this
	,boxW=winW
	,boxH=winH
	,originX=boxW/2>>0
	,originY=boxH/2>>0
	,ballMax=120
	,ballMin=90
	,tags=$data
	,tagsL=tags.length
	,tagsContent=[]
	,tagsClass=0
	,tagsResult=[]
	,balls={}
	,dataIndex=0
	,zoomX=40
	,zoomY=40
	,tp=-100
	,isRun=1
	,timeHand
	,ballEle
	,ballRadius=100
	,_sb=boxH-20
	,_sl=boxW/2-80
	,sound=new Audio
	,smallBoxPro={width:boxW,height:boxW,left:boxW/2,top:boxW/2}
	,_elePro={left:0,top:0,ex:0,ey:0,sx:0,sy:0,zindex:1}
	,share={title:"标签云",desc:"好看好玩尽在TVM互动！",ico:"//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/5.png"}
	,wrap=createNode(DB,"div",{style:"positin:absolute;top:0;left:0;width:100%;height:100%"})
	,wrapBack=createNode(DB,"div",{className:"wrapBack"})
	,paopaoBox=createNode(DB,"div",{style:"position:absolute;top:0;left:0;width:100%"})
	,info=createNode(DB,"b",{html:"点击选择<br>抢你想要的优惠礼单",style:"color:#fff;text-align:center;width:200px;top:120px;position:absolute;font-size:1em;left:50%;-webkit-transform:translate(-50%,0);text-shadow:#000 0 0 1px "})
	,smallBox=createNode(wrapBack,"div",{className:"smallBox",style:"width:"+smallBoxPro.width+"px;height:"+smallBoxPro.height+"px;top:"+((boxH-smallBoxPro.height)/2)+"px"})
	sound.src=PAGE.COMMON+"media/pop_1.mp3";
	createNode(DB,"div",{className:"page-top",id:"page_top",html:'<p>距离大奖揭晓还有 <label id="djtime"></label> 秒<br>\
    	本轮玩家<label id="nbof_people"><b>1</b><b>8</b><b>0</b><b>8</b><b>0</b></label>人 奖池<label id="nbof_money"><b>8</b><b>7</b><b>8</b><b>6</b></label>元</p>'},'p3');
	createNode(DB,"div",{className:"page-bottom",id:"page_bottom",html:'<div class="page-bottom2">\
		<input type="text" placeholder="请输入您想要的优惠" id="tjtext2" onblur="gosearch.gosearch(this);" class="tjtext"><div id="tjtext3" class="tjtext" action="searchmylove"><ul id="papaw_list" action="null"></ul><b id="placeholder" style="font-weight:normal;height:44px;margin:-7px 0 0 0;display:block;color:#B7B7B7">只有三次机会噢~</b></div><img src="//a-h5.mtq.tvm.cn/yao/common/img/tagCloud/tjbtn.png" class="tjbtn" action="searchmylove">\
	</div>'},'p3');
	setTimeout(function(){
		info.style.webkitTransition="opacity 300ms ease"
		info.style.opacity="0"
		},3000)
	gosearch=new searchbox;
function init(){
	var i=5,il=i+12,time=setInterval(function(){
		if(i<il)setBalls(i*50),i++
		else clearInterval(time),setTimeout(function(){t.run()},5000);
		},20)
	}
function setBalls($t){
		if(!isRun)return
		   if(dataIndex===tagsL)dataIndex=0;
				(function(ball){
				setTimeout(function(){
						 var time=($t||winH)*20,sty=ball.style;
						//ball.style.left=random()+"%";	
						//ball.style.left=setRandomInt(0,boxW)+"px"; +setRandomReal(.1,3)+'ms'
						sty.top=-ballRadius+"px";
						sty.webkitTransition='all '+time+'ms linear';		
						ball.addEventListener("webkitTransitionEnd",zmA)				
						function zmA(){	
							ball.removeEventListener("webkitTransitionEnd",zmA)
							setTimeout(function(){ball&&wrap.removeChild(ball)},200)
							}
					},100)
				}(createBall(dataIndex,$t)))
				dataIndex++ 	
	}		
function random(){
	var a=[25,30,0,50,0,15,20,5,35,1,0,60,45,10,75,40,55,70,65,80],r=Math.random(),l=a.length*r>>0
	if(Math.abs(tp-a[l])<20){
	return random()
	}else{tp=a[l]
		return r*10+tp
	}
}
function setRandomInt(min,max) {//随机数整数
    return Math.floor(Math.random()*(max - min+1))+min
}
function setRandomReal(min, max) {//自然随机数
    return Math.random()*(max-min)+min
}
function setRandomColor() {//随机颜色
    var randomColor1=setRandomInt(30, 230);
    var randomColor2=setRandomInt(30, 230);
    var randomColor3=setRandomInt(30, 230);
    return "rgb(" +randomColor1+", "+randomColor2+", "+randomColor3+")"
}
function setColor(){
	var color="purple,yellow,pink,red,orange,blue,cyan,green".split(","),cl=color.length,r=Math.random()*cl>>0;
	return color[r]
	}
function getRandomBallRadius() {//随机大小
    return getRandomInteger(constants.minRadius, constants.maxRadius)
}
function getRandomSpeed() {//随机数度
    return getRandomReal(-constants.randomSpeedRange,constants.randomSpeedRange)
}
function createBall($i,$t){ //单个小球
	var data=tags[$i]
	,wh=setRandomInt(ballMin,ballMax)
	,x=random()
	,y=$t||wrap.offsetHeight
	,className="b"+setRandomInt(1,6)
	,name=data.name
	;
	x=x*boxW/100+wh>boxW?boxW-wh+"px":x+"%"
	var ball=createNode(wrap,"div",{
	action:"slecetTag.,"+data.name+".,"+data.id+".,"+className
	,html:data.name
	,className:"classBall ball "+className
	,drag:1
	,tag:name
	,'data-init-top':y
	,style:'left:'+x+';top:'+y+'px;width:'+wh+'px;height:'+wh+'px;-webkit-animation:tanslateAni '+(1000*setRandomInt(3,5.5))+'ms infinite linear alternate'});
	return ball;
}
	t.select=function($ele,$i,$c){
		t.stop();
		var p=$ele.getBoundingClientRect(),ele=$ele.cloneNode(1)
		,data=tags[$i].tags
		,w=p.width,h=p.height,x=(smallBoxPro.width-w)/2,y=(smallBoxPro.height-h)/2
		,ws=wrapBack.style
		,es=ele.style
		es.webkitAnimation="";
		es.top=y+"px";
		es.left=x+"px";
		es.zIndex=1;
		//es.transition=""
		ele.removeAttribute("action")
		ele.classList.add("paopao");
		ws.display="block";
		//ws.transition="all 400ms ease";
		smallBox.appendChild(ele)
		t.stop();
		ballEle={ele:ele,left:x,top:y};
		setTimeout(function(){			
			clearInterval(timeHand);
			var child=wrap.children;
			for(var i=0,len=child.length,cl;i<len;i++){
				var cl=child[i]
				,obj=getComputedStyle(cl,false),curTop=obj['top']
				,time_s=obj['transition-duration']
				,time_ms=time_s.substring(0,time_s.length-2)*1000,speed=time_ms/cl.getAttribute('data-init-top');
				cl.style.top=curTop;
				cl.style.transition='all '+(parseInt(curTop)+100)*speed+'ms linear';
				cl.style.display="none";
			};	
			wrap.style.display="none"		
			createTag({width:80,data:data})
			},200);
		tagsClass=$c	
		}
	function createTag($opt){ //生成标签小球
		var html=[],tagData=$opt.data
		,il=tagData.length
		,width=$opt.width
		,radius=width/2
		,_left=(smallBoxPro.width-width)/2
		,_top=(smallBoxPro.height-width)/2
		,X=smallBoxPro.width/2
		,Y=smallBoxPro.height/2
		,PI=Math.PI/180
		,R=(boxW-width)/2-10
		,R2=R+30
		,angle=360/il
		,hd=0,color
		,tags={start:[],center:[],end:[],pro:[],eles:[]},ele
		,css1=css2=css3=""
		,i=0
		,alef,atop,className
		;	
		for(i=0;i<il;i++){
			hd=i*angle*PI;		
			aleft=X+R*Math.cos(hd)-radius,atop=Y+R*Math.sin(hd)-radius;
			css1=["top:",_top,"px;left:",_left,"px;width:",width,"px;height:",width,"px;","opacity:0;transition:all 400ms linear"].join("")
			css2=["left:",X+R2*Math.cos(hd)-radius,"px;top:",Y+R2*Math.sin(hd)-radius,"px;width:",width,"px;height:",width,"px;",";opacity:1;transition:all 100ms linear"].join("")
			css3=["left:",aleft,"px;top:",atop,"px;width:",width,"px;height:",width,"px;",";opacity:1;transition:all 400ms ease"].join("")
			className="b"+setRandomInt(1,6)
			ele=createNode(smallBox,"div",{className:'tagBall ball '+className,style:css1,action:"slecetTag.,"+tagData[i].name+".,xd"+i+".,"+className,html:tagData[i].name})
			tags.start[i]={css:css1};
			tags.center[i]={css:css3};
			tags.end[i]={css:css3};
			tags.eles[i]={ele:ele,left:aleft,top:atop,key:"xd"+i}
			}
			setTimeout(function(){				
				setLT(tags.center);
				setTimeout(function(){
					//setLT(tags.end)
					//setTimeout(setCN,200)
					runPop();
					ballEle.ele.classList.remove("paopao")
					info.style.opacity=1
					info.innerHTML="点击空白区域即可返回上一层"
				},500)
			},400)
			var pop=new pops({box:smallBox,radius:80,maxRight:smallBoxPro.width,maxBottom:smallBoxPro.height});
			function runPop(){		
					for(var pro,i=0;i<il;i++)pop.createPop(tags.eles[i])
					pop.createPop(ballEle)
					pop.run();
					t.pop=pop;
					wrapBack.setAttribute("action","display");
				}
			function setLT($data){
				var lis=tags.eles,liL=lis.length,i=0,time=setInterval(function(){
					if(i<liL){
						lis[i].ele.style.cssText=$data[i].css
						i++
					}else clearInterval(time)
				},100)
				}
			function setCN(){
				var lis=tags.eles,liL=lis.length,i=0,li;
				for(;i<liL;i++){
					lis[i].style.webkitAnimation="sj_rotate2 "+(2000*setRandomInt(2,4))+"ms infinite linear alternate "+(500*setRandomInt(0,5))+"ms"
					}
				}			
		t.display=function(){
			pop.nothing();info.style.opacity=0
			t.pop=pop=null;
			wrapBack.removeAttribute("action","display");
			setLT(tags.start);	
			isRun=1;					
			setTimeout(function(){
				wrap.style.display="block"
				setTimeout(function(){					
					smallBox.innerHTML=""
					wrapBack.style.display="none"
					anewRun();					
					},1000)
				},500)
			};
			function anewRun(){
				var child=wrap.children;
				for(var i=0,len=child.length;i<len;i++){
					child[i].style.display="flex";
					(function(obj){
						setTimeout(function(){
							var curTop=getComputedStyle(obj,false)['top'];
							obj.style.top="-100px";
						},10)
					})(child[i]);		
				};
				t.run();
			};					
		}
	function drag($x,$y){	
		_elePro.sty.top=$y+"px";
		_elePro.sty.left=$x+"px"
		}				
	function assignEle($ele){
		clearTimeout($ele.time)
		var p=$ele.getBoundingClientRect()
		_elePro.left=p.left;
		_elePro.top=p.top;
		_elePro.sty=$ele.style
		}
	function recover($ele,$top){
		$ele.time=setTimeout(function(){
			aginRun($ele,$top)
			},3000)
		}
	function aginRun($ele,$top){
			var sty=$ele.style;
			sty.top="-100px";
			sty.transition="all "+($top*28)+"ms linear"		
		}	
	t.change=function($ele,$n,$i,$c){
		if(tagsResult.length>2){
			tishi("最多只能选三个哦~");return
			}	
		$ele.removeAttribute("action")
		var p=$ele.getBoundingClientRect()	
		,es=$ele.style
		es.webkitAnimation="";
		es.webkitTransition="all 600ms ease";
		es.width=(p.width/3)+"px"
		es.height=(p.height/3)+"px"
		es.top=_sb+"px";
		es.left=_sl+"px";
		es.opacity=0	
//		t.pop&&t.pop.removeList($n,function(){
//			var es=$ele.style;
//				es.transition="all 1000ms ease";
//				es.width="48px";
//				es.height="28px";
//				es.top=_sb+"px";
//				es.left=_sl+"px";
//				es.opacity=0;
//				setTimeout(function(){
//					removeNode($ele);
//					t.display()
//				},600)
//			})
		setTimeout(function(){
			addpapaw($i,$n,$c);
			},100)
		sound.play()
		}		
	t.stop=function(){
		clearInterval(timeHand)
		}
	t.run=function(){
		timeHand=setInterval(setBalls,800);
		}		
	t.handleEvent=function(e){noPop(e)
		var ele=e.srcElement||e.target,ev=getEvent(e),time=e.timeStamp,isDrag=ele.getAttribute("drag")
		switch(e.type){
			case "touchstart":
				if(isDrag){
					_elePro.sx=ev.pageX;
					_elePro.sy=ev.pageY;
					_elePro.time=time;
					_elePro.type=e.type;
					assignEle(ele)
				}
			break
			case "touchmove":
				if(isDrag){
					if(_elePro.type==="touchstart"){
						_elePro.type="touchmove"
						_elePro.sty.transition="";
						_elePro.sty.zIndex=_elePro.zindex++
					}
					_elePro.ex=ev.pageX
					_elePro.ey=ev.pageY	
					drag(_elePro.left+_elePro.ex-_elePro.sx,_elePro.top+_elePro.ey-_elePro.sy)	
				}
			break
			case "touchend":
				if(Math.abs(time-_elePro.time)<120)
					clickAction(e)
				else if(isDrag)
					recover(ele,_elePro.top)
			break
			}
		}
	function getEvent(e){
			return (e.touches&&e.touches[0])||e
		}	
	init();	
	wrapBack.ontouchmove=noPop;
	addEvent(wrap,isTouch?"touchstart":"click",t);
	addEvent(wrap,isTouch?"touchmove":"mousemove",t);
	addEvent(wrap,isTouch?"touchend":"mouseout",t);
	addEvent(document,isTouch?"touchstart":"click",clickAction);
	wxShare({token:'tvmcj',resources:location.href,link:location.href,title:share.title,ico:share.ico,desc:share.desc});
	function clickAction(e){
		var ele=e.srcElement||e.target,_action="action",attribute,argument;				
			do{
				if(ele.nodeType!==1)break
				if(attribute=ele.getAttribute(_action))break			
				}while(ele=ele.parentNode)	
			if(attribute){										
			argument=attribute.split(".,");
			var a1=argument[1];
			switch(argument[0]){
				case "select":
					isRun=0;
					tagCloud.select(ele,a1,argument[2])
				break
				case "display":
					tagCloud.display(ele)
				break
				case "slecetTag":
					tagCloud.change(ele,argument[2],a1,argument[3])
				break
				case "searchmylove":
					gosearch.init(ele);
				break
			}
		}
	}	
function pops($data){
	var K=0.999,POW_RATE=0.0001,POW_RANGE=0.8;
	var maxTop=0,maxBottom=$data.maxBottom,maxLeft=0,maxRight=$data.maxRight	
	function SPEED_X(){return 2+RND() * 4}
	function SPEED_Y(){return 1+RND() * 2}
	var t=this
	,arrBubs=[]
	,SQRT=Math.sqrt
	,ATAN2=Math.atan2
	,SIN=Math.sin
	,COS=Math.cos
	,ABS=Math.abs
	,RND=Math.random
	,ROUND=Math.round
	,_radius=$data.radius
	,time	
	t.run=function(){
		time=setInterval(update,100);
	}
	t.stop=function(){
		clearInterval(time)
		}
	t.nothing=function(){
		t.stop();
		arrBubs=null
	}	
	t.createPop=function($data){
		var bub=new _pop();
			bub.styBox=$data.ele.style;
			bub.setX($data.left);
			bub.setY($data.top);
			bub.vx=SPEED_X();
			bub.vy=SPEED_Y();
			bub.r=_radius;
			bub.xd=$data.key
			arrBubs.push(bub)
		};
	t.removeList=function($i,$f,$o){
		for(var i=0,il=arrBubs.length,it;i<il;i++)
			if($i==arrBubs[i].xd)it=i;
			arrBubs.splice(it,1);
			isFun($f);
			if(arrBubs.length===0)isFun($o)
		}	
	function update(){
		var n=arrBubs.length;
		var bub, bub2;
		var i, j;
		for(i=0; i<n; i++){
			bub=arrBubs[i];
			bub.vx *= K;
			bub.vy *= K;
			if(RND() < POW_RATE){
				bub.vx=SPEED_X()*(1+RND()*POW_RANGE);
				bub.vy=SPEED_Y()*(1+RND()*POW_RANGE);
			}
			bub.setX(bub.x+bub.vx);
			bub.setY(bub.y+bub.vy);
			checkWalls(bub);
		}
		for(i=0; i<n-1; i++){
			bub=arrBubs[i];
			for(j=i+1; j<n; j++){
				bub2=arrBubs[j];
				checkCollision(bub, bub2);
			}
		}
	}
	function checkWalls(ball){
		var r=ball.r,rr=maxRight-r,rb=maxBottom-r
		if(ball.x<0){
			ball.setX(0);
			ball.vx*=-1;
		}else if(ball.x>rr){
			ball.setX(rr);
			ball.vx*=-1;
		}
		if(ball.y<maxTop){
			ball.setY(maxTop);
			ball.vy*=-1;
		}else if(ball.y>rb){
			ball.setY(rb);
			ball.vy*=-1;
		}
	}
	function rotate(x,y,sin,cos,reverse){
			return reverse?{x:x * cos+y * sin, y: y * cos - x * sin}:{x:x * cos - y * sin, y: y * cos+x * sin};
	}
	function checkCollision(bub0, bub1){
		var dx=bub1.x-bub0.x;
		var dy=bub1.y-bub0.y;
		var dist=SQRT(dx*dx+dy*dy);	
		if(dist<_radius){
			var angle=ATAN2(dy,dx);
			var sin=SIN(angle);
			var cos=COS(angle);
			var pos0={x:0, y:0};
			var pos1=rotate(dx, dy, sin, cos, true);
			var vel0=rotate(bub0.vx, bub0.vy, sin, cos, true);
			var vel1=rotate(bub1.vx, bub1.vy, sin, cos, true);
			var vxTotal=vel0.x - vel1.x;
			vel0.x=vel1.x;
			vel1.x=vxTotal+vel0.x;
			var absV=ABS(vel0.x)+ABS(vel1.x);
			var overlap=_radius- ABS(pos0.x - pos1.x);
			pos0.x += vel0.x / absV * overlap;
			pos1.x += vel1.x / absV * overlap;
			var pos0F=rotate(pos0.x, pos0.y, sin, cos, false);
			var pos1F=rotate(pos1.x, pos1.y, sin, cos, false);
			bub1.setX(bub0.x+pos1F.x);
			bub1.setY(bub0.y+pos1F.y);
			bub0.setX(bub0.x+pos0F.x);
			bub0.setY(bub0.y+pos0F.y);
			var vel0F=rotate(vel0.x, vel0.y, sin, cos, false);
			var vel1F=rotate(vel1.x, vel1.y, sin, cos, false);
			bub0.vx=vel0F.x;
			bub0.vy=vel0F.y;
			bub1.vx=vel1F.x;
			bub1.vy=vel1F.y;
		}
	}
	function _pop(){
		var t=this
		t.setX=function(x){
			t.x=x;
			t.styBox.left=ROUND(x)+"px";
		}
		t.setY=function(y){
			t.y=y;
			t.styBox.top=ROUND(y)+"px";
		}
	}
	}	
	function xdBG($opt){
		var run=1,_ex=0,_ey=0,_ox=0,_oy=0,_oz=0,_maxX=$opt.maxX||20,_maxY=$opt.maxY||20,_ele=$opt.ele
		if(window.DeviceMotionEvent){
			window.ondevicemotion=function(event){
					setPosition(event.accelerationIncludingGravity);
					}
			}
			function setPosition($val){
				var o =$val,ox= o.x,oy= o.y,oz=o.z,x,y;
				if(ox>1){
					x=1
				}else if(ox<-1){
					x=-1
				}
				if(oy<-6){
					y=1
				}else if(oy>-3){
					y=-1
				}
				if(x){
					_ex+=x*.25
					if(Math.abs(_ex)>_maxX)_ex=x*_maxX
				}
				if(y){
					_ey+=y*.25
					if(Math.abs(_ey)>_maxY)_ey=y*_maxY
				}
				_ele.style.webkitTransform='translate3d('+_ex+ 'px, '+_ey+'px, 0)';
				;
			}
		}	
	
	var count_nn=mainVar.mainData.countdown,count,tj12=1;
	mainVar.jj=nbof_money;
	mainVar.people=nbof_people
	count_down();
	count=setInterval(count_down,1000)
	function count_down(){
		count_nn--;
		if(count_nn===15){
			//createVido('//q-cdn.mtq.tvm.cn/Public/user-uploads/videos/20160303/1456990478-19157.mp4');
	//		smallBox.style.top="270px"
	//		smallBox.style.transition="all 1000ms ease"
		}else if(count_nn===3){
			if(tj12){
				tj12=0;
				tjData["album_name"]=encodeURIComponent(tagsResult.join(","));
				TJ(132000);			
			}
		}
		if(count_nn<1){
			clearInterval(count);
			getBqBD()
		}
		djtime.innerHTML=count_nn.toString().replace(/(.)/g,"<b>$1</b>")
	};
function searchbox(){
		var t=this,OS=getOS();
		if(OS=='android')tjtext2.setAttribute('onblur','');
		t.init=function(e){
			t.paopaobtn(e,'paopao',true);
			tjtext2.style['opacity']=1;
			tjtext3.nextSibling.style['display']='none';
			tjtext3.style['display']='none';
			tjtext2.focus();
			return
		}
		t.gosearch=function(e){
			var val=tjtext2.value;
			if(val&&tjtext2.title==val)return
			tjtext2.title=val;
			tjtext2.blur();
			if(tagsContent.length)placeholder.style['display']='none';
			tjtext2.style['opacity']=0;
			tjtext3.nextSibling.style['display']='block';
			tjtext3.style['display']='block';
			tjtext2.value='';
			setTimeout(function(){tjtext2.title=''},400);
			if(val){
				if(val.length<2){
					tishi('请您至少输入2个字');
					return
				}
				if(val.length>6){
					tishi('最多不超过6个字');
					return
				}
				sound.play();
				addpapaw(val,0)
			}
		}
		t.paopaobtn=function(e,_,$,fn,t){
			if($)e.classList.add(_);
			setTimeout(function(){e.classList.remove(_);typeof(fn)=='function'&&fn()},t||400);
		}
	}
window.onresize=function(){if(winH==window.innerHeight&&tjtext2.style['opacity']==1)gosearch.gosearch(tjtext2)}
function replacefn(msg,e){return msg.replace(/(.)/g,"<"+e+">$1</"+e+">")}
function addpapaw($t,$id,$c){
	if(!$t)return
	if(tagsResult.length>2){
		tishi("最多只能选三个哦~");return
	}
	var t=$id>0?$t:";"+$t+";"
	if(tagsContent.indexOf($t)>-1){
		console.log("已经添加")
		return
		}
	tagsContent.push(t);
	tagsResult.push($t)
	//if(tagsContent.length>3)tagsContent.shift();
	var lis,ll,cla,sc=($c?$c:'b'+setRandomInt(1,6));
	if($t.length<=3)cla=sc+'ss less3';else cla=sc+"s";
	placeholder.style.display="none"
	setTimeout(function(){
		mainVar.lbox=createNode(papaw_list,"li",{className:"paopao "+cla,html:$t},"p3");
		gosearch.paopaobtn(mainVar.lbox,'paopao');
		if(papaw_list.innerHTML){
			lis=papaw_list.querySelectorAll('li');
			ll=lis.length;
			if(ll>3){
				papaw_list.removeChild(lis[0]);
				papaw_list.className='toleft';
				setTimeout(function(){papaw_list.className=''},400);
			}
		}
		if(sendCount<sendCountMax){
			sendCount++
			socket.sendMsg($t)
		}
	},400)
	
	/* 礼单历史添加参数 */
//	if(!marVar.newDate)marVar.newDate={};
//	marVar.newDate[new Date().getTime()]=$t;
}
function whichButton(e){
	switch(e.keyCode){
		case 13:
			gosearch.gosearch(tjtext2);
		break
	}
}
var qipaoData=[],userTag=[],sendCount=0,sendCountMax=3
function displayTag($data){//显示冒泡标签
	var i=0,lis=wrap.children,il=lis.length,li,tag=$data.tag,user=$data.user,top;
	if(!tag)return
	for(;i<il;i++){
		li=lis[i];		
		if(li.getAttribute("tag")===tag&&qipaoData.indexOf(tag)===-1){
			displayPP(li,tag,user)
			}
		}
	}
function displayPP(li,tag,user){
	var p=li.getBoundingClientRect()
		pTop=p.top
		pLeft=p.left
		pWidth=p.width
		if(pTop<40||pTop>winH-pWidth)return
		qipaoData.push(tag)
//	var sty=li.style
//		sty.left=pLeft+"px";
//		sty.top=pTop+"px";
//		sty.transition="";
//		sty.webkitTransition="";
//		sty.animation="";
	var tagWidth=176
		,ox=winW/2
			//屏幕中心点位置
		,x=pLeft+pWidth/2 
			//球的中心点位置
		,lr=x>ox?"r":"l"
		,m="8px 6px 0 10px"
		,sLeft,eLeft
		,label="",img="",float=""
			if(lr==="r"){
				eLeft=x-tagWidth
				sLeft=eLeft+20;
				m="8px 10px 0 6px";
				float="float:left";
			}else{
				eLeft=x;
				sLeft=x-20;
				float="float:right"
			}
			img="<img src='"+decodeURIComponent(user.avast)+"/96' style='vertical-align:top;border-radius:50%;width:30px;height:30px;margin:2px;"+float+"'>"
			label="<label style='display:inline-block;margin:"+m+";color:#0085BC;font-size:14px'>"+decodeURIComponent(user.nickName)+"要"+tag+"</label>"	
			html=label+img;
		var paopao=createNode(paopaoBox,"div",{html:html,style:"position:absolute;min-width:157px;top:"+pTop+"px;left:"+sLeft+"px;opacity:0;height:34px;background:rgba(255,255,255,.7);border-radius:36px;-webkit-transition:all 350ms ease;z-index:3000"})
			,asty=paopao.style
			setTimeout(function(){
				asty.opacity=1;//显示气泡
				asty.left=eLeft+"px";
				setTimeout(function(){
					asty.opacity=0;//隐藏气泡
					asty.left=sLeft+"px";
					paopao.addEventListener("webkitTransitionEnd",A);
					//aginRun(li,pTop)
					function A(){	
						paopao.removeEventListener("webkitTransitionEnd",A);
						qipaoData.splice(qipaoData.indexOf(tag),1)
						setTimeout(function(){
							paopao&&paopaoBox.removeChild(paopao);							
							},350)
						}					
					},2500)	
			},100)	
	}	
var socket=new setSocket({
	url:HOST.SOCKET+"/chat"
	,room:"paopao"+PAGE.yyyappid
	,category:0
	,onmessage:function($data){
		var data=toObject($data)
		if(data){
			data=data.data;
			if(data.sender){
				userTag.push({tag:decodeURIComponent(data.message),user:data.sender})
			}
		}
	}
	,onerr:function(){console.log('Socket错误')}
});
setInterval(function(){
	if(userTag.length)
		displayTag(userTag.shift())
},200)
function stopAction($ele){
	var p=$ele.getBoundingClientRect(),sty=$ele.style
	sty.left=p.left+"px";
	sty.top=p.top+"px";
	sty.transition="";
	sty.webkitTransition="";
	sty.animation="";
	p.ele=$ele
	p.sty=$ele.style	
	return p
	}	
window.parseBd=function($data){
		clearInterval(mainVar.times.countNum);
		clearInterval(mainVar.times.adImgShow);
		clearInterval(mainVar.times.percentage);
		setStorage("set","prizeId",mainVar.prizeID)
		setStorage("set","prizeData",JSON.stringify($data.data))
	var str=encodeURIComponent(tagsContent.join(","));
//	/* 礼单历史参数 */
//	if(marVar.newDate){
//		var md=marVar.mainData,nd=marVar.newDate;
//		for(var i in nd){
//			marVar.tagArr.push({name:nd[i],time:Number(i),time_id:md.time_interval_id,info:md.column_info})
//			if(marVar.tagArr.length>100)marVar.tagArr.shift();
//		}
//		setStorage("set","tagArr",JSON.stringify(marVar.tagArr))
//	}
//	/* 结束 */
	
		setTimeout(function(){
			location.href="gold.html?tags="+str+"&mtid="+mainVar.mainData.time_interval_id+"&column_id="+(mainVar.mainData.column_info?mainVar.mainData.column_info.column_id:1)+"&_="+(+new Date);
			},100)
	}
addEvent(DB,"keyup",function(e){
	if(e.keyCode===13)gosearch.gosearch(tjtext2);
	})	
}	
 window.getCloudData=function($data){
		var data=$data.data,taglist=data.taglist,dataArr=[];
	if(+$data.errcode===0){		
		for(var i in taglist){
			dataArr.push({"id":i,"name":taglist[i]});
			}
		tagCloud=new xdRandomBall(dataArr,data.column);	
			mainVar.bird.hidd(function(){DB.removeChild(DO.querySelector('.birdWrap'))});
			mainVar.game.result='answer';
		var prize=prizeFun.call({});
			prize.display();
			getJJ();
			mainVar.times.getMoneyTime=setInterval(getJJ,3000)
		}
		setStorage("set","banner",JSON.stringify(data.column))
		window.getCloudData=null;
	}
	setJsonp('//alpha.dsp.tvm.cn/demo/etag/tvme-0.2.js',function(){
		 var tvme=new tvmE();	
		 tvme.gettag(mainVar.mainData.column_info?mainVar.mainData.column_info.column_id:1,function($data){
			 getCloudData($data)
			 })
		})
	}
}