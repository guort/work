
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
        targetDom = document.getElementById(tatgetId),
        danmu = document.createElement("div"),
        timer = null,
        danmuHeight = 0,
        danmuWidth = 0,
        dataLen = data.length,
        speedArr = [],
        speed,
        size,
        sizeArr = [],
        mathWidth = 0,
        mathHeight = 0,
        html = "",
        num = 0,
        domList = [],
        domH = 0,
        domHCZ = 0,
        domListLength = 0;


    danmu.className = "danmu";
    targetDom.style.position = "relative";
    targetDom.appendChild(danmu);
    danmuWidth = danmu.offsetWidth;
    danmuHeight = danmu.offsetHeight;

    for (var i = 0; i < dataLen; i++) {
        speed = data[i].speed || 5;
        speedArr.push(speed);
        size = data[i].size || 1;
        sizeArr.push(size);
        html += "<div class='flyLeft'><div class='head'>";
        html += "<img src=\"" + data[i].head + "\"></div>";
        html += "<span class='description'>" + data[i].des + "</span>";
        html += "<div class=\"d_img\" style=\"background-image\: url("+ data[i].img +");\"></div>";
        html += "</div>";
    }
    danmu.innerHTML += html;

    domList = danmu.querySelectorAll(".flyLeft");
    domListLength = domList.length;

    for (var j = 0; j < domListLength; j++) {
        domList[j].index = j;
        //domList[j].style.webkitTransform ="scale("+ sizeArr[j] +")";
        //3d转换，手机上运行比较流畅
        domList[j].style.webkitTransformOrigin = "0 0 0";
        domList[j].style.webkitTransform = "scale3d("+ sizeArr[j]+","+  sizeArr[j]+","+"1"+")";
        domList[j].style.left = "100%";
        domH = domList[j].offsetHeight*sizeArr[j];
        if (line == 1) {
            mathHeight = danmuHeight * 0.2;
        } else {
            mathHeight = Math.floor(Math.random() * (danmuHeight-domH));
        }
        domList[j].style.top = mathHeight + "px";
        domList[j].style.webkitTransition = "left " + speedArr[j] + "s linear";
        domList[j].addEventListener("webkitTransitionEnd",function () {
            if(this.index == domListLength-1){
                targetDom.removeChild(danmu);
            }
            danmu.removeChild(this);
        });
    }
    clearInterval(timer);
    timer = setInterval(function () {
        domList[num].style.left = "-200px";
        num++;
        if (num == domListLength) {
            danmuAJAX();
            clearInterval(timer);
        }
    }, 1500);
}