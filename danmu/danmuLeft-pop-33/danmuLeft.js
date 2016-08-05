var Json = {
    "target": "danmuTarget",
    "data": [{'name': 'one', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/che.png', 'speed': '6'}
        , {'name': 'two', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/hua.png'}
        , {'name': 'three', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/paoche.png'}
        , {'name': 'four', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/che.png', 'speed': '9'}
        , {'name': 'five', 'head': './images/tx.jpg', 'des': '恭喜你中奖了', 'img': './images/hua.png'}
        , {'name': 'six', 'head': './images/tx2.jpg', 'des': '描述...', 'img': './images/paoche.png', 'speed': '6.4'}]
     // , "line": "1"
        ,"play":"false"
};

var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");

btn.onclick = function () {
    Json.data.push({
        'name': 'six',
        'head': './images/tx2.jpg',
        'des': '描述...',
        'img': './images/paoche.png',
        'speed': '5'
    });
};


var DSQ =  startDanmu(Json);

     btn2.onclick = function () {
         clearInterval(DSQ.timer);
     };
     btn3.onclick = function () {
         DSQ =  startDanmu(Json);
     };



function startDanmu(Json, time) {

    var dTime = time || 1500,     /*获取数据的时间间隔*/
        line = Json.line,      /*行数  1位1行 其他的为随机高度*/
        tatgetId = Json.target || "danmuTarget",   /*弹幕所在div的id*/
        targetDom = document.getElementById(tatgetId),  /*弹幕所在的dom节点 弹幕出现的位置*/
        danmu = document.createElement("div"),   /*承载弹幕的div*/
        clientH = screen.height || 730,     /*屏幕的高度*/
        timer = null;
    //console.log(clientH);
    danmu.className = "danmu";
    targetDom.appendChild(danmu);
    targetDom.style.position = "relative";

    clearInterval(danmuLeft.timer);
    danmuLeft.timer = setInterval(function () {
            if (Json.data[0]) {
                danmuLeft(Json);
            }
    }, dTime);

    function danmuLeft(Json) {
        var data = Json.data[0],
            danmuWidth,
            danmuHeight,
            html = "",
            speed = data.speed || 7,
            size = data.size || 1,
            mathHeight,
            dom,
            domP = document.createElement("div"),
            domH,
            domW;

        domP.className = "dmFly";
        danmuWidth = danmu.offsetWidth;
        danmuHeight = danmu.offsetHeight;
        //console.log(danmuWidth);

        html += "<div class='flyLeft'><div class='head'>";
        html += "<img src=\"" + data.head + "\"></div>";
        html += "<span class='description'>" + data.des + "</span>";
        html += "<div class=\"d_img\" style=\"background-image\: url(" + data.img + ");\"></div>";
        html += "</div>";

        domP.innerHTML = html;

        danmu.appendChild(domP);
        // 获取最新添加的dom节点
        dom = danmu.lastElementChild;
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

        dom.style.webkitTransition = "-webkit-transform " + speed + "s linear";
        dom.style.webkitTransform = "translate3d(-" + (clientH+domW) + "px," + 0 + "," + 0 + ") "
                                        + "scale3d(" + size + "," + size + "," + "1" + ")";

        //dom.style.webkitTransition = "left " + speed + "s linear";
        //dom.style.left = "-200px";

        dom.addEventListener("webkitTransitionEnd", function () {
            danmu.removeChild(this);
        });
        //删除数组中第一个元素
        Json.data.shift();
    }

    //函数返回值  把定时器返回出去
    return {
        timer:danmuLeft.timer
        // setTimer:function () {
        //     clearInterval(danmuLeft.timer);
        //     danmuLeft.timer = setInterval(function () {
        //         if(Json.data[0]) {
        //             danmuLeft(Json);
        //         }
        //     }, dTime);
        // }
    }

}



