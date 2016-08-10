var Json = {
    "target": "danmuTarget",
    "data": [{'name': 'one', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/che.png', 'speed': '6'}
        , {'name': 'two', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/hua.png'}
        , {'name': 'three', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/paoche.png'}
        , {'name': 'four', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/che.png', 'speed': '3'}
        , {'name': 'five', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/hua.png'}
        , {'name': 'six', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/paoche.png', 'speed': '3'}]
     , "line": "1"
};

var btn = document.getElementById("btn");

btn.onclick = function () {
    Json.data.push({
        'name': 'six',
        'head': './images/tx2.jpg',
        'des': '描述...',
        'img': './images/paoche.png',
        'speed': '5'
    });
};

startDanmu(Json);

function startDanmu(Json, time) {

    var dTime = time || 1500, /*获取数据的时间间隔*/
        line = Json.line, /*行数*/
        tatgetId = Json.target || "danmuTarget", /*弹幕所在div的id*/
        targetDom = document.getElementById(tatgetId), /*弹幕所在的dom节点*/
        danmu = document.createElement("div"),
        timer = null;

    danmu.className = "danmu";
    targetDom.appendChild(danmu);
    targetDom.style.position = "relative";

    clearInterval(timer);
    // 不间断的获取数据
    timer = setInterval(function () {
        if (Json.data[0]) {
            danmuLeft(Json);
        }
    }, dTime);

    function danmuLeft(Json) {

        //console.log(Json.data[0]);

        var data = Json.data[0],
            danmuWidth,
            danmuHeight,
            html = "",
            speed = data.speed || 5,
            size = data.size || 1,
            mathHeight,
            dom,
            domP = document.createElement("div"),
            domH,
            domW;
        domP.className = "dmFly";
        danmuWidth = danmu.offsetWidth;
        danmuHeight = danmu.offsetHeight;
        //alert(1);

        html += "<div class='flyLeft'><div class='head'>";
        html += "<img src=\"" + data.head + "\"></div>";
        html += "<span class='description'>" + data.des + "</span>";
        html += "<div class=\"d_img\" style=\"background-image\: url(" + data.img + ");\"></div>";
        html += "</div>";

        domP.innerHTML = html;

        danmu.appendChild(domP);
        //console.log(danmu);

        // 获取最新添加的dom节点
        dom = danmu.lastElementChild;
        //console.log(dom);
        //设置缩放原点
        dom.style.webkitTransformOrigin = "0 0 0";
        dom.style.webkitTransform = "scale3d(" + size + "," + size + "," + "1" + ")";
        //获取节点宽高
        domH = dom.offsetHeight * size;
        domW = dom.offsetWidth * size;
        //设置定位高度
        if (line == 1) {
            mathHeight = danmuHeight * 0.2;
        } else {
            mathHeight = Math.floor(Math.random() * (danmuHeight - domH));
        }
        dom.style.top = mathHeight + "px";
        // 定位
        //dom.style.left = "100%";

        dom.style.webkitTransition = "left " + speed + "s linear";
        //dom.style.webkitTransform = "translate3d(-" + (danmuWidth + domW) + "px," + 0 + "," + 0 + ") "
        //                                + "scale3d(" + size + "," + size + "," + "1" + ")";
        dom.style.left = "-200px";
        //animate(dom,-domW,speed*1000);

        dom.addEventListener("webkitTransitionEnd", function () {
            //danmu.removeChild(this);
        });
        //删除数组中第一个元素
        Json.data.shift();

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

}



