

fanXian('fx');

function fanXian(id) {
    var targetDom = document.getElementById(id),
        tDomH = targetDom.offsetHeight,
        domP = document.createElement("div"),
        domPheight = 0,
        dom = document.createElement("div"),
        data = '',
        dataLen = 0,
        i=0,
        html = "";
    domP.className = "listP";
    domP.appendChild(dom);
    targetDom.appendChild(domP);
    domPheight = domP.offsetHeight;

    //滚动加载
    domP.onscroll = function () {
        var domH = dom.offsetHeight;
        var sTop = domP.scrollTop;
        //console.log(domH);
        if(domH-domPheight-sTop<=0){
            getData();
        }
    };

    getData();
    //获取数据，并设置
    function getData() {
        var domCon = document.createElement("div");

        var fxAjax = setAjax('get','./fx.php');
        fxAjax.send(null);
        fxAjax.callBack = function ($data) {
            data = JSON.parse($data);
            //console.log(data);
            if(data == null) return;
            dataLen = data.length;
            //拼接html结构
            for(;i<dataLen;i++){
                html+='<div class=\"list\"><img src=\"'+ data[i].headImg+'\">';
                html+='<div class=\"listRight\"><div class=\"listRightCon\"><div class=\"fxUser\">';
                html+='<span>'+ data[i].name +'</span><span>'+ data[i].place +'</span></div>';
                html+='<div class=\"fxMonTim\"><span>'+ data[i].money +'</span><span>'+ data[i].time +'</span></div>';
                html+='</div></div></div>';
            }

            domCon.innerHTML = html;
            dom.appendChild(domCon);
        };
    }

}

function xmlObj(){
    try{
        return (new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject('Microsoft.XMLHTTP'))
    }catch(e){
        return new XMLHttpRequest()
    }	}
function setAjax(a,b,c,d,e){
    return new function(){
        var t=this,errRun=0;
        t.method=a||"get";
        t.action=b;
        t.async=(c!=undefined?c:true);
        t.cache=d||0;
        t.callBack=(typeof(e)=="function"?e:0)
        t.data="";
        t.Data="";
        t.Open=t.Send=t.Test=t.Over=Function;
        t.Err=function(){xmlhttp=null}
        t.send=function(xmlCache){
            var	xmlhttp=xmlObj()
            xmlhttp.open(t.method,t.action,t.async);
            t.set&&t.set.call(xmlhttp);
            if(t.method.toUpperCase()=="POST"){
                if(!t.set)xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");
            }else{
                if(t.cache){
                    var c="cache="+Math.random();
                    c=(t.action.indexOf("?")!=-1?"&":"?")+c;
                    t.action+=c
                }
                t.data=null
            }
            function err(){
                t.stop();
                if(errRun)return;errRun=1;
                typeof(t.err)==="function"&&t.err()
            }
            xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState===4){
                    if(xmlhttp.status===200||xmlhttp.status===304){
                        t.err=null
                        if(t.callBack)t.callBack.call(xmlhttp,xmlhttp.responseText);//responseXML responseText
                        xmlhttp=null;
                    }else{
                        xmlhttp=null;
                        err()
                    }
                }
            }
            xmlhttp.send(t.data);
            t.stop=function(){
                xmlhttp&&xmlhttp.abort()
            }
            setTimeout(function(){
                if(t.err)err()
            },15000)
        };
    }
}


