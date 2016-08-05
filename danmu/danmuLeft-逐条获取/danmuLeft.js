
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
var Json = {
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

danmuAJAX();

function danmuAJAX() {
        setInterval(function () {
            if(Json.data[0]){
                danmuLeft(Json);
            }
        },1500);
 }

function danmuLeft(Json) {
    var data = Json.data[0],
        line = Json.line,
        tatgetId = Json.target || danmuTarget,
        targetDom = document.getElementById(tatgetId),
        danmu = document.createElement("div"),
        domEle = null,
        timer = null,
        danmuHeight = 0,
        danmuWidth = 0,
        speed,
        size,
        mathWidth = 0,
        mathHeight = 0,
        html = "",
        domH = 0;

    danmu.className = "danmu";
    targetDom.style.position = "relative";
    targetDom.appendChild(danmu);
    danmuWidth = danmu.offsetWidth;
    danmuHeight = danmu.offsetHeight;


    speed = data.speed || 5;
    size = data.size || 1;
    html += "<div class='flyLeft'><div class='head'>";
    html += "<img src=\"" + data.head + "\"></div>";
    html += "<span class='description'>" + data.des + "</span>";
    html += "<div class=\"d_img\" style=\"background-image\: url("+ data.img +");\"></div>";
    html += "</div>";
    danmu.innerHTML += html;

    domEle = danmu.querySelector(".flyLeft");
    //console.log(domEle);

    domEle.style.webkitTransformOrigin = "0 0 0";
    domEle.style.webkitTransform = "scale3d("+ size+","+  size+","+"1"+")";
    domEle.style.left = "100%";
    domH = domEle.offsetHeight*size;
    if (line == 1) {
        mathHeight = danmuHeight * 0.2;
    } else {
        mathHeight = Math.floor(Math.random() * (danmuHeight-domH));
    }
    domEle.style.top = mathHeight + "px";
    domEle.style.webkitTransition = "left " + speed + "s linear";
    domEle.style.left = "-200px";
    domEle.addEventListener("webkitTransitionEnd",function () {
        targetDom.removeChild(danmu);
    });
    Json.data.shift();
}