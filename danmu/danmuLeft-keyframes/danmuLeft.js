
// 弹幕功能插件
    //传入的json格式
    /* var Json = {
             "name": "danmuData",
             "target": "danmuTarget",
             "data": [{'name': 'one','head': './images/tx.jpg','des': '恭喜你中奖了','img': './images/che.png','speed': '6'}
                , {'name': 'two', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/hua.png'}
                , {'name': 'three', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/paoche.png'}
                , {'name': 'four', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/che.png','speed':'3'}
                , {'name': 'five', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/hua.png'}
                , {'name': 'six','head': './images/tx2.jpg','des': '描述...','img': './images/paoche.png','speed': '3'}]
            ,"line":"1"
            };
*/

danmuLeft.flag = true;

function danmuAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open('get','ajax1.php');
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            var json = JSON.parse(xhr.responseText);
            if(json.data[0]){
                danmuLeft(json);
            }else{
                setTimeout(danmuAJAX,2000);
            }
        }
    };
}

function danmuLeft(Json) {
    var data = Json.data,
        line = Json.line,
        tatgetId = Json.target || danmuTarget,
        targetDom = document.getElementById(tatgetId)||document.body,
        danmu = document.createElement("div"),
        timer = null,
        danmuHeight = 0,
        danmuWidth = 0,
        dataLen = data.length,
        speedArr = [],
        speed,
        mathWidth = 0,
        mathHeight = 0,
        html = "",
        keyframesHtml = "",
        num = 0,
        domList = [],
        domListLength = 0;

    danmu.className = "danmu";
    targetDom.style.position = "relative";
    targetDom.appendChild(danmu);
    danmuWidth = danmu.offsetWidth;
    danmuHeight = danmu.offsetHeight;

    for (var i = 0; i < dataLen; i++) {
        speed = data[i].speed || 5;
        speedArr.push(speed);
        html += "<div class='flyLeft'><div class='head'>";
        html += "<img src=\"" + data[i].head + "\"></div>";
        html += "<span class='description'>" + data[i].des + "</span>";
        html += "<div class=\"d_img\" style=\"background-image\: url("+ data[i].img +");\"></div>";
        html += "</div>";
    }
    danmu.innerHTML += html;

    domList = danmu.querySelectorAll(".flyLeft");
    domListLength = domList.length;
    //alert(domListLength);

    for (var j = 0; j < domListLength; j++) {
        domList[j].style.left = "100%";
        domList[j].style.display = "none";
        if (line == 1) {
            mathHeight = danmuHeight * 0.2;
        } else {
            mathHeight = Math.random() * (danmuHeight - 160);
        }
        domList[j].style.top = mathHeight + "px";
        //domList[j].style.webkitTransition = "left " + speedArr[j] + "s linear";
    }

    var keyframesHtml = "@-webkit-keyframes aniLeft{0%{left:100%;}100%{left:-200px;}}";


    if(danmuLeft.flag){
        setStyle(keyframesHtml);
        danmuLeft.flag = false;
    }

    clearInterval(timer);
    timer = setInterval(function () {
        domList[num].style.webkitAnimation = "aniLeft "+ speedArr[num] +"s linear"
        domList[num].style.display = "block";
        num++;
        if (num == domListLength) {
            danmuAJAX();
            clearInterval(timer);
            setTimeout(function () {
                targetDom.removeChild(danmu)
            }, speedArr[num - 1] * 1000);
        }
    }, 1500);


function setStyle(css,_){
    var sty=document.createElement("style");
    sty.setAttribute("type","text/css");
    sty.styleSheet?sty.styleSheet.cssText=css:sty.innerHTML=css;
    _?_.appendChild(sty):document.documentElement.firstChild.appendChild(sty);
}


}