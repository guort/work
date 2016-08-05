
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
        mathWidth = 0,
        mathHeight = 0,
        html = "",
        num = 0,
        domList = [],
        domListLength = 0,
        flag = false;

    danmu.className = "danmu";
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
        if (line == 1) {
            mathHeight = danmuHeight * 0.1;
        } else {
            mathHeight = Math.random() * (danmuHeight - 160);
        }
        domList[j].style.top = mathHeight + "px";
        domList[j].style.webkitTransition = "left " + speedArr[j] + "s linear";
    }
    clearInterval(timer);
    timer = setInterval(function () {
        domList[num].style.left = "-300px";
        num++;
        if (num == domListLength) {
            clearInterval(timer);
            setTimeout(function () {
                targetDom.removeChild(danmu)
            }, speedArr[num - 1] * 1000);
        }
    }, 1500);
}



//固定距离，固定时间移动
function animate ( dom, target, dur ) {
    var totalDistance = target - dom.offsetLeft;  // 总路程
    var startTime = +new Date;
    var startLocation = dom.offsetLeft;
    // console.log( startTime );
    var play = function () {
        // 在 每次 play 的时候计算一下已经经过了多少时间
        var currentTime = +new Date;
        var time = currentTime - startTime; // 毫秒
        // 已经经过的时间 / 总时间 = 已经经过的路程(tween) / 总路程
        // console.log( totalDistance );
        var tween = time * totalDistance / dur;
        //console.log( tween );
        if ( time >= dur ) {
            tween = totalDistance;
            clearInterval( timerId );
            danmu.removeChild(dom);
        }
        dom.style.left = startLocation + tween + 'px';
    };

    play();
    var timerId = setInterval( play, 25 );
}