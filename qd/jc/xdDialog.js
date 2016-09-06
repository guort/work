(function(){
function xdDialogFun(obj){ 
var css="#dialogBox{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;display:none}"
+".dialogBoxBG{position:absolute;width:100%;height:100%;top:0;left:0;background-color:rgba(0,0,0,.5);cursor:pointer;}"
+"#dialog{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);z-index:1;background-color:#f0f1f2;border-radius:4px;overflow:auto}"
+".dialogShow .dialog{-webkit-animation:show .3s;}"
+".dialogHidd .dialog{-webkit-animation:hidd .5s forwards;}"
+".dialogShow .dialogBoxBG{-webkit-animation:showBG .5s;}"
+".dialogHidd .dialogBoxBG{-webkit-animation:hiddBG .35s forwards 350ms;}"
+".closeButton{height:0.4rem;color:white;line-height:0.4rem;font-size:0.14rem;float:right;padding-right:0.1rem;}"
+".dialogTitle{height:0.4rem;font-size:0.18rem;background-color:#252525;color:#fff;padding:0.1rem;margin:0;border-radius:4px 4px 0 0;text-align:center}"
+".dialogTable{font-size:.9em;margin:auto;width:100%}"
+".dialogBody{overflow:hidden;text-align:cneter}"
+".dialogFooter{position:absolute;width:100%;bottom:20px;text-align:center;}"
+"@-webkit-keyframes showBG{0%{opacity:0}100%{opacity:1}}"
+"@-webkit-keyframes hiddBG{0%{opacity:1}100%{opacity:0}}"
+"@-webkit-keyframes show{0%{-webkit-transform:scale(0);opacity:0}85%{-webkit-transform:scale(1.10);opacity:1}100%{-webkit-transform:scale(1);opacity:1}}"
+"@-webkit-keyframes hidd{0%{-webkit-transform:scale(1) translate(-50%,-50%);opacity:1 }30%{-webkit-transform:scale(1.05) translate(-50%,-50%);opacity:1}50%{-webkit-transform:scale(0.8) translate(-50%,-50%);opacity:0.8 }100%{-webkit-transform:scale(1.2) translate(-50%,-50%);opacity:0}}"

	var t=this,D=document,DD=D.documentElement
	,dialogBox=CE("div",{class:"dialogBox",id:"dialogBox"})
	,dialogBoxBG=CE("div",{class:"dialogBoxBG"})
	,dialog=CE("div",{class:"dialog",id:"dialog"})
	,closeButton=CE("b",{class:"closeButton",action:"dialog.,close"})
	,dialogTitle=CE("section",{class:"dialogTitle",action:"drag.,dialog"})
	,title=D.createElement("h3")
	,dialogTable=document.createElement("table")
	,tr=dialogTable.insertRow(0)
	,dialogBody=tr.insertCell(0)
	,dialogFooter=CE("section",{calss:"dialogFooter"})
	,eSty=dialogBox.style;
	//dialogTitle.innerHTML="标题";
	closeButton.innerHTML=" 关闭";
	dialogBox.appendChild(dialogBoxBG);
	dialogBox.appendChild(dialog);
	dialogTitle.appendChild(closeButton);
	dialogTitle.appendChild(title);
	dialog.appendChild(dialogTitle);
	dialog.appendChild(dialogTable);
	dialog.appendChild(dialogFooter);
	setStyle(css);
	t.closeButton=closeButton;
	dialogTable.className="dialogTable";
	D.body.appendChild(dialogBox);	
	(function(){	
		var bSty=dialog.style
		,titleE=dialogTitle
		,contentE=dialogTable;		
		t.open=function(opt){
			//隐藏弹出框
			eSty.display="block";
			var i,type,isCenter=1,isTitleHidden=0,oty=typeof(opt);
			typeof(t.openFun)==="function" && t.openFun.apply(t)			
			if(oty==="object"){
				for(i in opt){
					type=opt[i]
					switch(i){
						case "title":						
							if(type==="hidden")
							isTitleHidden=1	
							else
							title.innerHTML=type;
						break
						case "html":
							dialogBody.innerHTML=type;
						break
						case "center":
							isCenter=type;
						break
						case "height":
							dialogBody.style.height=type
						break
						default:
							dialog.setAttribute(i,type);
						break
					}
				}
			}else if(oty==="string"){
				dialogTable.innerHTML="<p>"+opt+"</p>"
				}
			
			if(isCenter){
				var bw=dialogBox.offsetWidth,bh=dialogBox.offsetHeight,dw=dialog.offsetWidth,dh=dialog.offsetHeight,left=(bw-dw)>>1,top=(bh-dh)>>1;				
				//dialog.style.top=top+"px";
				//dialog.style.left=left+"px";
			}
			if(isTitleHidden){
				dialogTitle.style.display="none"
				dialogTable.style.height=dialogBox.offsetHeight+"px";
				}
			
			//dialogBox.className="dialogShow";
			}
		t.close=function(){
			dialogBox.className="dialogHidd";
			typeof(t.closeFun)==="function" && t.closeFun.apply(t);
			setTimeout(function(){
			eSty.display="none";
			},700)
		}
		}());
	function CE(tag,opt){
		var ele=D.createElement(tag),i;
		for(i in opt)ele.setAttribute(i,opt[i]);
		return ele
		}
	function setStyle(css,_){
			var sty=D.createElement("style")
			sty.setAttribute("type","text/css");
			sty.styleSheet?sty.styleSheet.cssText=css:sty.innerHTML=css
			_?_.appendChild(sty):DD.firstChild.appendChild(sty);
		}
							
	}
	!window.xdDialog&&(window.xdDialog=new xdDialogFun)	;
	xdDialog.closeButton.onclick=function(){
		xdDialog.close()
	}
}())
;
//xdDialog.open({html:"456",style:"top:10px;text-align:center",height:"100px"})