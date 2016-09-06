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
//							function queryAction(data){
//								countAction({method:'queryCounter',dom:obj,counterName:'答题人数'},function($data){
//									try{
//										var data=toObject($data),value,nums,pA=0,pB=0,sum=0,numArr=[],numObj={"optaNum":0,"optbNum":0},parts=document.querySelectorAll(".parts"),optionArr=[];
//										if(+data.errCode==0 && data.result){
//										 nums=toObject(data.result);
//										 nums.options?value=nums.options:value=numObj;
//										}else{
//											value=numObj	
//										}
//										pA=value.optaNum?+value.optaNum:0;pB=value.optbNum?+value.optbNum:0;sum=pA+pB;
//										numArr[0]=(sum==0)?45:(pA*100/sum)^0;
//										numArr[1]=(sum==0)?55:100-numArr[0];	
//										optionArr=[{name:"optaNum",value:mainVar.sceneData.optionA,votes:pA,percent:numArr[0]},{name:"optbNum",value:mainVar.sceneData.optionB,votes:pB,percent:numArr[1]}];
//										for(var i=0;i<parts.length;i++){
//											parts[i].style.opacity=1;
//											parts[i].classList.add("partsActive");
//											parts[i].innerHTML=numArr[i]+"%";
//										}
//										setTimeout(function(){
//											prizeInit(optionArr);
//										},1000);	
//									}catch(e){
//										prizeInit();
//									};
//								},function(){
//									prizeInit();
//								}); 									
//							}	
							//countAction({option:opt,method:'accumulate',counterName:'答题人数'},queryAction);												
							setTimeout(function(){prizeInit();},1000);	
							localStorage.setItem("xuanze"+gameTime,$data);										
							localStorage.setItem("daan"+gameTime,mainVar.game.daan);	
							ele.className ="liActive";	
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
							localStorage.setItem("xuanze"+gameTime,$xuanze);										
							localStorage.setItem("daan"+gameTime,mainVar.game.daan);	
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
	setStyle('.interWraper{height:300px;width:100%;z-index:3;padding-top:180px;position:relative}.centerArea,.errorArea{border-radius:10px;width:75%;margin:0 auto}.centerArea{padding:4px;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);opacity:1}.centerArea .showArea{border-radius:10px;background:rgba(255,255,255,.6)}.centerArea .blueBtn,.errorArea .blueBtn{width:85%;background:#298ddf;border:1px solid #186db2;border-radius:5px;margin:0 auto;font-size:16px;height:40px;line-height:40px;color:#fff;box-shadow:0 4px rgba(0,0,0,.2)}.dati{width:89%;margin:0 auto;padding-bottom:15px;box-sizing:border-box}.dati .timer{padding:14px 0 14px 0;text-align:center;font-size:22px;color:#3d1307;font-weight:bolder}.dati .question{font-size:18px;margin:0 0 20px 0;line-height:1.6em}.dati .liTxt{margin:0 0 10px 0}.dati .liTxt .liContent{position:relative;width:100%;box-sizing:border-box;border:1px #bababa solid;padding:10px 0 10px 17px;border-radius:5px;background:#fff;box-shadow:1px 2px 2px rgba(0,0,0,.3);line-height:1.6em;color:#3e3e3e;font-size:18px}.dati .liTxt p,.dati .liTxt span{display:inline-block;vertical-align:top}.dati .options span{margin-right:10px}.dati .liTxt p{width:60%}.dati .liTxt .active{background:#fdf3d0;color:#298ddf;border:1px #186db2 solid}.dati .optname{position:absolute;left:50%;bottom:10px;width:80%;-webkit-transform:translateX(-50%);border-radius:8px;height:30px;background:#fff url(../img/dati_opt.png) no-repeat left center;background-size:30% 100%;box-sizing:border-box;line-height:30px;padding-left:25%;color:#3e3e3e}.dati .nameActive{border:1px #ff6c00 solid;background-color:#ffe6a2}.datiMoveIn{-webkit-animation:datiMoveIn 1.2s both}.datiMoveOut{-webkit-animation:datiMoveOut 1s both}@-webkit-keyframes datiMoveIn{0%{top:-50%;opacity:0}60%{top:70%}100%{top:60%;opacity:1}}@-webkit-keyframes datiMoveOut{0%{top:50%;opacity:1}100%{top:100%;opacity:0}}.dati .options{border-radius:10px;overflow:hidden}.dati .liImg{width:50%;float:left;height:130px;overflow:hidden;position:relative}.dati .liImg img{width:100%}.liImg .pers{position:absolute;left:5px;top:5px;color:#fff000;font-size:14px;text-shadow:0 0 2px rgba(0,0,0,.5);opacity:0;-webkit-transition:all linear .8s}.liImg .pers span{font-size:18px;display:block;font-weight:bolder}.liImg .pers em{font-size:14px;font-weight:bolder;font-style:normal}.overImg{width:80%;display:block;margin:0 auto;padding:40px 0}.overBtn{display:block;width:100%;margin:30px auto 0 auto;text-align:center;padding:10px 0;background:#298ddf;color:#fff;border-radius:5px;font-size:1.2em;box-shadow:0 1px 2px rgba(0,0,0,.1);text-decoration:none}.persState{position:absolute;right:5%;top:50%;-webkit-transform:translateY(-50%);width:10%}.persTxt{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);width:20%}.liPercent{height:30px;line-height:30px;-webkit-transition:all linear 1s;display:none;font-size:16px}.percent{height:8px;width:0;background:#298ddf;display:inline-block;vertical-align:middle;margin-right:10px;-webkit-transition:all linear 1s}.liTxt .liPercent span{color:#fa393b;vertical-align:middle}.btnAfter{background:#9c9c9c}@media screen and (min-width:320px) and (max-width:359px){.dati .liTxt{margin:0 0 8px 0}.dati .liTxt .liContent{line-height:1.5em;padding:10px 0 10px 13px;font-size:12px}.liPercent{font-size:10px}.dati .question{margin:0 0 13px 0;font-size:12px}.dati .timer{font-size:18px;padding:10px 0}.overBtn{margin:15px auto 0 auto;font-size:12px}.percent{height:5px}}@media screen and (min-width:360px) and (max-width:410px){.dati .liTxt{margin:0 0 10px 0}.dati .liTxt .liContent{line-height:1.5em;padding:10px 0 10px 13px;font-size:16px}.liPercent{font-size:14px}.dati .question{margin:0 0 13px 0;font-size:16px}.dati .timer{font-size:20px;padding:12px 0}.overBtn{margin:20px auto 0 auto;font-size:16px}.percent{height:5px}}@media screen and (min-width:414px){.dati .liImg{height:150px}}');
	document.querySelector(".svgBody").style.opacity='0';
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
							countAction({option:"option"+e,method:'accumulate',counterName:'答题人数',instanceId:mainVar.contentId});
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
					localStorage.setItem("xuanze"+gameTime,xuanze);										
					localStorage.setItem("daan"+gameTime,mainVar.game.daan);
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
									},2000);
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
			mainVar.ele.interWraper=createNode(mainVar.ele.mainBox,'div',{className:'interWraper'},'p3');
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
			mainVar.ele.interWraper.style.height=centerArea.offsetHeight+'px';
			var tv=setInterval(function(){
					if($options.mainData.countdown>0){
						DB.querySelector(".timer").innerHTML=n2t(--$options.mainData.countdown,[{v:60,u:":"},{v:1,u:""}]);
					}else{
						clearInterval(tv);
						datiArea.innerHTML='<img src="'+PAGE.COMMON+'img/overImg.png" class="overImg"><a class="overBtn" href="'+PAGE.redirect+'">去社区聊聊天吧</div>'; 
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
								if(mainVar.adData.adVideo){
									mainVar.video.src=mainVar.adData.adVideo;
									mainVar.video.play();
									tjData["result"]=mainVar.game.result="answer";	
									tjData["videoUrl"]=mainVar.adData.adVideo;	
									tjData["appName"]="广告页面";		
									tjData["button_name"]='播放视频';	
									TJ(113000)	
								}
								var prize=prizeFun.call($options);
								this.stop();								
								tjData["timu"]='点赞';
								tjData["album_name"]='';
								tjData["button_name"]='';
								tjData["result"]=mainVar.game.result="answer";																	
								prize.display(function(){											
									setTimeout(prizeInit,1000);	
									localStorage.setItem("daan"+gameTime,"A");																	
									localStorage.setItem("xuanze"+gameTime,"A");									
									}
								);
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
									if(s===0){
										if(zanCount){
											mainVar.module.setPrize();
											mainVar.dianzan.zanCounts.innerHTML='<p class="zanTxt">'+(_data.zanTxtAfter||"您共为TA点赞")+'<b style="color:#f91f5d;font-size:1.4rem;">+'+zanCount+'</b>'+(CONFIG.chars.button.i||"次")+'</p>';				
											mainVar.dianzan.marskBox.style.display='none';
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
									localStorage.setItem("daan"+gameTime,"A");																	
									localStorage.setItem("xuanze"+gameTime,"A");									
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
							localStorage.setItem("xuanze"+gameTime,arrtxt);
							localStorage.setItem("daan"+gameTime,mainVar.game.daan);
							setTimeout(method.oppb,3000);
							setTimeout(prizeInit,3000);
							countAction({option:'optbNum',method:'accumulate',counterName:'猜图人数'});		
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
	         var CSS='.maskObj{position:fixed;top:0;left:0;bottom:0;right:0;background-image:url(http://qa.h5.mtq.tvm.cn/yao/ty/img/blank.png);background-color:rgba(0,0,0,.2);z-index:1;display:none}.msgInputBox{position:absolute;width:100%;left:0;right:0;z-index:20;height:3.6rem;bottom:105px}.msgBox{width:100%;overflow:hidden;border-radius:5px;background-color:#DC2527}.msgBox td{padding:5px 0}.t1{width:40px;text-align:center}.t3{width:66px;text-align:center}.msgBox button{border:none}.msgInput{width:100%;height:100%;border:none;border-radius:5px;font-size:14px;padding:0 90px 0 5px;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-user-modify:read-write-plaintext-only}.faceButton{height:2.3em;vertical-align:middle}.sendButton{display:inline-block;line-height:30px;width:56px;height:30px;font-size:14px;color:#FFF;border-radius:5px;background:-webkit-gradient(linear,0 0,0 100%,from(#6588e7),to(#405dae))}.faceDiv{-webkit-transform:translate3D(0,0,0);display:none;background:rgba(255,255,255,1);border-top:1px solid #F0F0F0;border-left:1px solid #F0F0F0;overflow:auto}.faceDiv>section{position:relative;width:30px;height:30px;border-right:1px solid #F0F0F0;border-bottom:1px solid #F0F0F0;box-sizing:border-box;float:left;background-size:92% 92%;background-repeat:no-repeat;background-position:center}.faceDiv img{width:60px;height:60px;border-right:1px solid #F0F0F0;border-bottom:1px solid #F0F0F0;box-sizing:border-box;padding:10px}.zmLabel{position:absolute;height:36px;display:-webkit-box;-webkit-box-align:center;margin:0;padding:0 6px 0 0;border-radius:15px;background:rgba(0,0,0,.36);z-index:-1;white-space:nowrap;-webkit-transition:all 12s linear;top:10px;color:#fff;left:100%}.avast{width:36px;height:36px;border-radius:50%;vertical-align:top;margin:0 6px 0 0}.zmTxt{line-height:15px}.hjgyTxt{margin:0;padding:0}.gy{color:#f8db1d}.faceImg{width:24px;height:24px;box-sizing:border-box;vertical-align:middle}#setMsg{display:none;z-index:80;width:100%;-webkit-transition:all 200ms ease;margin-top:.5rem}#setMsg dl{text-align:center}#setMsg dl dt{position:relative;height:2.8em;background:#eee;border-radius:5px;box-shadow:1px 1px 2px #999;display:inline-block;vertical-align:middle}#setMsg dl dt .msgInput{font-size:14px;width:8rem;height:100%;background:#eee;border-radius:5px;border:none;color:#212121;line-height:100%;padding:0 0 0 3%;box-sizing:border-box}#setMsg dl dt .sendMsg{font-size:1em;color:#fff;background:#50c260;text-align:center;border:none;border-radius:3px;padding:0 10px;margin:0 5px;display:inline-block;line-height:2em;box-sizing:border-box}.msghead{width:2.3em;height:2.3em;border-radius:50%;vertical-align:middle;margin-left:5px}#setMsg.inMove{-webkit-animation:inMove 200ms forwards;display:block}#setMsg.outMove{-webkit-animation:outMove 200ms forwards;display:block}.coinIco{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);width:60%;opacity:1;-webkit-transition:all 700ms ease;-webkit-tap-highlight-color:transparent}.coinIco2{position:absolute;left:50%;top:75%;-webkit-transform:translate(-50%,0);width:60%;opacity:1;z-index:2}.dmIco{position:absolute;right:0;top:-35%;height:125%;-webkit-transition:all 700ms ease}#closeMsg{display:inline-block;vertical-align:middle;margin-left:-14px;height:2.6rem;margin-top:-5%}#closeMsg img{vertical-align:middle;height:140%}#closeMsg div{display:inline-block;vertical-align:middle}@-webkit-keyframes inMove{0%{-webkit-transform:translateX(100%)}100%{-webkit-transform:translateX(0)}}@-webkit-keyframes outMove{0%{-webkit-transform:translateX(0)}100%{-webkit-transform:translateX(100%)}}';
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
		var socket=new setSocket({url:"http://"+HOST.SOCKET+"/chat",room:"danmu"+PAGE.token,onmessage:function($data){
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
,WARTER:function(){
	var CSS='.warte_wrap{width:100%;height:280px;position:absolute;left:0;overflow:hidden;bottom:80px}.warte_wrap .ball{-webkit-transition:all 4000ms linear;position:absolute;text-align:center;left:50%;opacity:1;top:110%;-webkit-transform:translateX(-50%)}.warte_wrap .ball img{width:38px;height:38px;border-radius:50%;display:block;margin:0 auto 2px auto}.warte_wrap .partName{background:#000;padding:0 8px;border-radius:50%;color:#fff;font-size:10px;line-height:18px;border-radius:9px}.warte_wrap .opt{-webkit-animation:opts 6000ms forwards}@-webkit-keyframes opts{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes paoMove{0%{top:100%;opacity:0}60%{top:40%;opacity:1}100%{top:20%;opacity:0}}@-webkit-keyframes timer{0%{opacity:1}100%{opacity:1}}';
	setStyle(CSS);
	mainVar.warte_wrap=createNode(mainVar.ele.mainAdWrap,"div",{className:"warte_wrap"})
	var socketErr
	,warte_wrap=mainVar.warte_wrap
	,i=0
	,msgc=[30,80,10,50,70]
	,msgA=[]	
	,method={
		create:function(head,name,errmsg){
			var zm = document.createElement("div");
			zm.className = "ball";
			warte_wrap.appendChild(zm);
			zm.innerHTML='<img src="'+getHead(head)+'" style="'+(errmsg==1?"border:1px #ff0 solid":" ")+'"><div class="partName">'+decodeURIComponent(name)+'</div>';
			return zm
		},
		move:function(){
			var txt=msgA.shift()
				if(txt){
				 var time=Math.ceil((Math.random()*1000+6000)),tao=method.create(txt.sender.avast,txt.sender.nickName,txt.sender.errmsg)
				setTimeout(function(){
						if(i>4){i=0;}
						tao.style.webkitTransition='all '+time+'ms linear';	
						var leftValue=(Math.floor(Math.random()*10+msgc[i]-5))+"%";
						i++
						tao.style.left=leftValue;					
						tao.style.top="-15%";	
						setTimeout(zmA,time);			
						function zmA(){		
							tao&&warte_wrap.removeChild(tao);
							}
					},20)			
				}	
		},
		set:function (){
			mainVar.warterCount=setInterval(function(){method.move()},600);
			errFun();
			//if(mainVar.openType==1){tishi("链接打开");_socket.sendMsg("qiandao");}
			},
		remove:function(){
			if(mainVar.warte_wrap){
				removeNode(mainVar.warte_wrap)
				clearInterval(mainVar.warterCount);
			}
		}
	},_socket=new setSocket({url:"https://"+HOST.SOCKET+"/chat",room:"warter"+PAGE.token,onmessage:function($data){
		var data=toObject($data),_data=data.data;
		if(_data.message==="qiandao")msgA.unshift(_data)
		},onerr:function(){errFun();}})	
	return method;
		function errFun(){
			var ajax=setAjax('get',HOST.YAO+"/api/yaotv/index?action=getRealUsers&yyyappid="+PAGE.yyyappid+"&num=20&countdown="+mainVar.djsTime);		
				ajax.callBack=function($data){
					var data=toObject($data);
					if(data.status=='ok'){
						var arr=data.data?data.data:{},len=arr.length,a;
						if(len>0){
							for(var i=0;i<len;i++){
								a=toObject(arr[i]);   
								msgA.unshift({sender:{avast:getHead(a.headimgurl),nickName:a.nickname,category:3,errmsg:1}});
							}
						}
					}
				};
				ajax.err=function(){};
				ajax.send();
		}			 
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
			var bgBack=createNode(json.container,'p',{style:'top:0;z-index:0;background:#000;position:absolute;height:'+(document.documentElement.clientHeight-bottomHeight)+'px;width:100%;opacity:0.6;'},'p3');
			var bgBackT=createNode(json.container.parentNode,'p',{id:'bgBackT',style:'position:absolute;height:'+bottomHeight+'px;width:100%;background:#000;z-index:5;bottom:0;opacity:0.6;'},'p3');
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
				var ajax=setAjax('get',HOST.CJ+"/open/coinActivity/draw?lotteryid="+mainVar.prizeID+'&name='+mainVar.userInfo.nickname+'&openId='+mainVar.userInfo.openid+"&code="+sigCode+"&yyyappId="+PAGE.yyyappid+"&province="+mainVar.userInfo.province+"&country="+mainVar.userInfo.country+"&city="+mainVar.userInfo.city);				
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
					document.querySelector('#bgBackT')&&removeNode(document.querySelector('#bgBackT'));
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
			 setStyle('.zanBox{width:100%;height:100%;border-radius:50%;box-sizing:border-box;overflow:hidden;text-align:center;color:#fff;background:url(+PAGE.COMMON+img/dianzanpic.png) no-repeat center center;background-size:100%}.zanBox .timer{height:20%;font-size:2rem;border-bottom:1px solid rgba(255,255,255,.3)}.tpBox{position:relative}.tpBox .timer{border-bottom:none}.tp_Count{position:absolute;bottom:15px;left:50%;-webkit-transform:translateX(-50%);width:60%}.tp_heart{box-sizing:border-box;width:100%;padding:8px 5px;margin:0 0 10px 0;border-radius:5px;background:#f21136;box-shadow:2px 2px 5px rgba(242,17,54,.5)}.tp_heart img{width:25px;vertical-align:middle;margin-right:10px}.tp_heart b{vertical-align:middle;font-size:16px}.tp_marsk{position:absolute;top:70%;left:50%;-webkit-transform:translateX(-50%);width:80%;z-index:10}.tp_marsk li{width:60px;height:60px;border-radius:50%;border:2px rgba(255,255,255,.3) solid;position:absolute;overflow:hidden}.tp_marsk li img{width:100%}.tpBox .tpActive{background:#696969;box-shadow:2px 2px 5px rgba(105,105,105,.5)}.tpBox .tpActive b{color:#bebebe}.tp_marsk li.tutor_cur{border:2px #fff solid}.opt_bfb{position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);background:url(+PAGE.COMMON+img/tp_optbf.png) no-repeat center center;background-size:100% 100%;padding:10px 15px;color:#fff;opacity:0}#zanP1{opacity:0;-webkit-transition:all linear 1.2s}.tutor_1 .tutor0{left:50%;top:0;-webkit-transform:translateX(-50%)}.tutor_2 .tutor0{left:20%;top:7px}.tutor_2 .tutor1{left:60%;top:7px}.tutor_3 .tutor0{left:6%;top:-15px}.tutor_3 .tutor1{left:40%;top:8px}.tutor_3 .tutor2{left:73%;top:-15px}.tutor_4 .tutor0{left:-4%;top:-22px}.tutor_4 .tutor1{left:25%;top:8px}.tutor_4 .tutor2{left:54%;top:8px}.tutor_4 .tutor3{left:82%;top:-22px}.tutor_5 .tutor0{left:-10%;top:-48px}.tutor_5 .tutor1{left:13%;top:-2px}.tutor_5 .tutor2{left:40%;top:14px}.tutor_5 .tutor3{left:67%;top:-2px}.tutor_5 .tutor4{left:90%;top:-50px}.tutor_6 .tutor0{left:-11%;top:-64px}.tutor_6 .tutor1{left:6%;top:-14px}.tutor_6 .tutor2{left:29%;top:8px}.tutor_6 .tutor3{left:54%;top:8px}.tutor_6 .tutor4{left:76%;top:-20px}.tutor_6 .tutor5{left:92%;top:-76px}@media screen and (min-width:319px) and (max-width:358px){.tp_marsk li{width:50px;height:50px}}@media screen and (min-width:359px) and (max-width:376px){.tp_marsk li{width:55px;height:55px}}@media screen and (min-width:377px) and (max-width:413px){.tp_marsk li{width:60px;height:60px}}@media screen and (min-width:414px){.tp_marsk li{width:60px;height:60px}}');
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
									localStorage.setItem("xuanze"+gameTime,daan);	
									localStorage.setItem("daan"+gameTime,daan);	
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
									countAction({option:"opt"+jishu+"Num",method:'accumulate',counterName:'投票人数'},queryAction);												
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
	//互动数据
	,INTERACTIVE:function(obj,$data){
		var CSS='.percentage{width:100%;position:absolute;left:0;top:0;z-index:999;font-size:14px;color:#fff;background:rgba(0,0,0,.6) url('+PAGE.COMMON+'img/percentageBg.png) no-repeat;background-size:100% 100%;}.percentage .persL,.percentage .persR{float:left;box-sizing:border-box}.percentage .persL{height:120px;position:relative;width:10%;background:url('+PAGE.COMMON+'img/percentBg.png) no-repeat center center;background-size:100% 100%}.percentage .persL img{width:60%;position:absolute;left:50%;top:50%;-webkit-transform:translate(-60%,-50%)}.percentage .persR{width:88%;padding-left:2%}.persR>div{position:relative;height:30px;line-height:30px;background:url('+PAGE.COMMON+'img/solid.png) no-repeat left bottom;background-size:100% 1px}.percentage .theme,.percentage em,.percentage p{position:absolute;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.percentage .theme{left:0;width:60%}.percentage p{color:#ffc600;width:15%;right:0}.percentage em{width:20%;right:20%;font-style:normal}.percentage.perMoveIn{-webkit-animation:perMoveIn 1s forwards}@-webkit-keyframes perMoveIn{0%{bottom:50%;opacity:0}60%{bottom:-10%}100%{bottom:0;opacity:1}}';
		setStyle(CSS);
		var data=mainVar.sceneData,percentage,letter=["A","B","C","D","E","F","G","H","I","J"],options=$data,persR;
		var val="auto";
		if(options.length<=2){
			val=(options.length*30-2)+"px";
		};
		function auto(){
			countAction({method:'queryCounter',dom:mainVar.ele,counterName:'答题人数'},function($data){
				var data=toObject($data);
				if(data.result=="{}")return;
				if(data.errCode=='0'){
					if(!mainVar.ele.percentage){
						mainVar.ele.percentage=createNode(obj,'div',{className:'percentage',html:'<div class="persL" style="height:'+options.length*30+'px"><img style="max-height:'+val+'" src="'+PAGE.COMMON+'img/percentTxt.png"></div>'},'p3');
						persR=createNode(mainVar.ele.percentage,'div',{className:'persR'},'p3');
					};
					var nums=toObject(data.result),count=nums.options,a,b,sum=0,liHtml='';
					for(var i=0,len=options.length;i<len;i++){
						a=options[i];
						for(var j in count){
							b=+count[j];
							if(i==0){
								sum+=b;
							};
							if(j==a.name){
								a.votes=b;
							};
						};
						a.percent=((a.votes*100)/(sum*100)*100).toFixed(0);
						liHtml+='<div><span class="theme">'+letter[i]+'.'+a.value+'</span><em>'+a.votes+'人</em><p class="scaleA">'+a.percent+'%</p></div>';
					};
					persR.innerHTML=liHtml;
				};
			})
		};
		auto();
		mainVar.times.percentage=setInterval(function(){
			auto();
		},6000); 		
	}
	,SHEQU:function(){
		return {display:function($ele,$fun){		
		setJsonp(HOST.WSQCDN+"/wsqh5/yyylivetalk/createbkbl.js?cache="+(+new Date),function(){
				new createBKBL($ele,$fun);
			},document.body);
			}
		}
	}
	
}