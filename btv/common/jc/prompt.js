var search=getSearch()
,state=Number(search["state"])
,DO=document
,DB=DO.body
,$={
	title:'领红包'
	,css:''
	,html:''
};

function pages(){var t=this,h='';
	$.css=createNode(DB,"link",{href:PAGE.COMMON+"jc/prompt.css?2",rel:"stylesheet",type:"text/css"},"p2");
	$.html=createNode(DB,"div",{className:"wrap",html:'<dl class="promptDl">'+
			'<dt><img src="'+PAGE.FOLDER+'img/HB.png" alt=""></dt>'+
			'<dd id="txt"></dd>'+
		'</dl>'+
		'<div class="flow" id="flow">'+
			' <img src="'+PAGE.FOLDER+'img/flow.png" alt="">'+
		'</div>'},"p3");
	t.init=function(){
		switch(state){
			case 1:
				flow.style.display="none";
				h="刚刚没有获取到您的身份信息，请点击摇一摇中“我的奖品”在试一次吧！";
				break
			case 2:
				txt.className="txt";
				h="您已经领过红包啦！";
				break
			default:
				h="我们已经获取到您的身份，稍后微信会马上给你发一个红包，快去看看微信消息提示吧，惊喜等着你！(如下图)";
				break
		}
		txt.innerHTML=h;
	}
}
var page=new pages;
page.init();