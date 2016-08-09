

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

        //var data = setAjax('get',seturl("fx"));

        var xhr = new XMLHttpRequest();
        xhr.open("get","fx.php");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if(xhr.status ==200 && xhr.readyState == 4){
                //获取返回数据
                data = JSON.parse(xhr.responseText);
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

            }
        };

    }

}

