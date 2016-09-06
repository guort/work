

window.onload = function () {

    var tbHeader = document.querySelector('.tb_header');
    var tbBanner = document.querySelector('.tb_banner');

    var bannerUl = tbBanner.firstElementChild || tbBanner.firstChild;
    
    var timer = null;
    

   // headerChange();
    //bannerMOve();
    //downTime();

    
    

    // header透明变化
    // function headerChange() {
    //     var headerHeight = tbHeader.offsetHeight;
    //     var bannerHeight = tbBanner.offsetHeight;

    //     window.onscroll = function () {
    //         var docTop = document.body.scrollTop;

    //         docTop = docTop > bannerHeight ? bannerHeight : docTop;

    //         var headerA = docTop / bannerHeight;

    //         tbHeader.style.backgroundColor = 'rgba(201,21,35,' + headerA + ')'
    //     }

    // }


    // function bannerMOve() {
        
    //     var bannerLi = bannerUl.firstElementChild || tbBanner.firstChild;
    //     var liWidth = bannerLi.offsetWidth;
    //     var bannerCircle = tbBanner.lastElementChild || tbBanner.lastChild;
    //     var circleLis = bannerCircle.getElementsByTagName('li');
    //     // console.log(circleLis);
        
        
    //     var index =  1;
    //     // 添加过渡
    //     function addTransition() {
    //         bannerUl.style.transition = 'all 0.2s';
    //         bannerUl.style.webkitTransition = 'all 0.2s';
    //     }
    //     // 移除过渡
    //     function rmTransition() {
    //         bannerUl.style.transition = '';
    //         bannerUl.style.webkitTransition = '';
    //     }
    //     // 设置位置
    //     function setTranslateX(dom,x) {
    //         dom.style.transform = 'translateX('+x+'px)';
    //         dom.style.webkitTransform = 'translateX('+x+'px)';
    //     }

    //     clearInterval(tbBanner.timer);

    //     tbBanner.timer = setInterval(function () {
    //         index++;
    //         addTransition();
    //         setTranslateX(bannerUl,-index*liWidth);

    //     },2000);
    //     // 监听动画结束后的状态
    //     isTransitionEnd(bannerUl);

    //     function isTransitionEnd(dom) {

    //         dom.addEventListener('transitionEnd',function () {
    //             if(index>=9){
    //                 index = 1;
    //                 rmTransition();
    //                 setTransform(bannerUl,-index*liWidth);

    //             }else if(index <1){
    //                 index = 8;
    //                 removeTransition();
    //                 setTranslateX(bannerUl,-index * width);
    //             }
    //             // console.log(1);
    //             setCircle(index);

    //         });
    //         dom.addEventListener('webkitTransitionEnd',function () {
    //             if(index>=9){
    //                 index = 1;
    //                 rmTransition();
    //                 setTranslateX(bannerUl,-index*liWidth);

    //             }else if(index <1){
    //                 index = 8;
    //                 rmTransition();
    //                 setTranslateX(bannerUl,-index * liWidth);
    //             }
    //             // console.log(1);
    //             setCircle(index);

    //         });
    //     }

    //     // 设置banner圆点样式
    //     function setCircle(index) {
    //         // 清除样式
    //         for(var i=0;i<circleLis.length;i++){

    //             circleLis[i].className = ' ';
    //         }
    //         // 设置样式
    //         circleLis[index-1].className = 'now';
    //     }




    //     // 手势

    //     var startX = 0;
    //     var moveX = 0;
    //     var disdenceX = 0;
    //     var ismove = false;


    //     bannerUl.addEventListener('touchstart',function (e) {
    //         startX = e.touches[0].clientX;
    //         // console.log(startX);
    //         rmTransition();
    //         clearInterval(tbBanner.timer);
    //     });
    //     bannerUl.addEventListener('touchmove',function (e) {
    //         moveX = e.touches[0].clientX;
    //         // console.log(startX);
    //         disdenceX = moveX-startX;
    //         // console.log(disdenceX)
    //         setTranslateX(bannerUl,-index*liWidth+disdenceX);
    //         ismove = true;
    //     });
    //     bannerUl.addEventListener('touchend',function (e) {
    //         if(Math.abs(disdenceX)>(liWidth/3)&&ismove){

    //             if(disdenceX>0){
    //                 index--;
    //             }else{
    //                 index++;
    //             }
    //             addTransition();
    //             setTranslateX(bannerUl,-index*liWidth);
    //         }else{
    //             addTransition();
    //             setTranslateX(bannerUl,-index*liWidth);
    //         }

    //         startX = 0;
    //         moveX = 0;
    //         disdenceX = 0;
    //         ismove = false;

    //         clearInterval(tbBanner.timer);
    //         tbBanner.timer = setInterval(function () {
    //             index++;
    //             addTransition();
    //             setTranslateX(bannerUl,-index*liWidth);
    //         },2000)

    //     });
    // }
    
    lunbo(".banner_box",".circle_box");

function lunbo (ban,cir){
    var  bannner = document.querySelector(ban)
        ,bannerCircle = document.querySelector(cir)
        ,circleLis = bannerCircle.querySelectorAll('li')
        ,firstEle = bannner.firstElementChild || bannner.firstChild
        ,lastEle = bannner.lastElementChild || bannner.lastChild
        ,cloneF = firstEle.cloneNode(true)
        ,cloneL = lastEle.cloneNode(true)
        ,eleWidth = firstEle.offsetWidth
        ,len = bannner.children.length
        ,timer = null
        ,index =  1
        ,startX = 0
        ,moveX = 0
        ,disdenceX = 0
        ,ismove = false
        ;
    bannner.appendChild(cloneF);
    bannner.insertBefore(cloneL,firstEle);
    bannner.style.Transform = "translateX(-"+ eleWidth +"px)";
    bannner.style.webkitTransform = "translateX(-"+ eleWidth +"px)";

    bannerMove();
    function bannerMove() {      
        function addTransition() {
            bannner.style.transition = 'all 0.8s';
            bannner.style.webkitTransition = 'all 0.8s';
        }
        function rmTransition() {
            bannner.style.transition = '';
            bannner.style.webkitTransition = '';
        }
        function setTranslateX(x) {
            bannner.style.transform = 'translateX('+x+'px)';
            bannner.style.webkitTransform = 'translateX('+x+'px)';
        }

        clearInterval(bannner.timer);
        bannner.timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index*eleWidth);
        },3000);

        isTransitionEnd();
        function isTransitionEnd() {
            bannner.addEventListener('transitionEnd',function () {
                if(index>=len){
                    index = 1;
                    rmTransition();
                    setTransform(-index*eleWidth);

                }else if(index <1){
                    index = len-1;
                    removeTransition();
                    setTranslateX(-index * eleWidth);
                }
                setCircle(index);

            });
            bannner.addEventListener('webkitTransitionEnd',function () {
                if(index>=len+1){
                    index = 1;
                    rmTransition();
                    setTranslateX(-index*eleWidth);
                }else if(index <1){
                    index = len;
                    rmTransition();
                    setTranslateX(-index * eleWidth);
                }
                setCircle(index);

            });
        }

        // 设置banner圆点样式
        function setCircle(index) {
            for(var i=0;i<circleLis.length;i++){
                circleLis[i].className = ' ';
            }
            circleLis[index-1].className = 'now';
        }
        
        bannner.addEventListener('touchstart',function (e) {
            startX = e.touches[0].clientX;
            rmTransition();
            clearInterval(bannner.timer);
        });
        bannner.addEventListener('touchmove',function (e) {
            moveX = e.touches[0].clientX;
            disdenceX = moveX-startX;
            setTranslateX(-index*eleWidth+disdenceX);
            ismove = true;
        });
        bannner.addEventListener('touchend',function (e) {
            if(Math.abs(disdenceX)>(eleWidth/3)&&ismove){
                if(disdenceX>0){
                    index--;
                }else{
                    index++;
                }
                addTransition();
                setTranslateX(-index*eleWidth);
            }else{
                addTransition();
                setTranslateX(-index*eleWidth);
            }
            startX = 0;
            moveX = 0;
            disdenceX = 0;
            ismove = false;
            clearInterval(bannner.timer);
            bannner.timer = setInterval(function () {
                index++;
                addTransition();
                setTranslateX(-index*eleWidth);
            },3000)

        });
    }
}


    // function downTime () {

    //     var time = 5 * 60 * 60;
    //     var timeBox = document.getElementsByClassName('time')[0];
    //     var spans = timeBox.getElementsByTagName('span');

    //     var timer = setInterval(function () {
    //         if (time <= 0) {
    //             clearInterval(timer);
    //             return false;
    //         }

    //         time--;
    //         var h = Math.floor(time / 3600);

    //         var m = Math.floor((time % 3600) / 60);

    //         var s = time % 60;

    //         spans[0].innerHTML = Math.floor(h / 10);
    //         spans[1].innerHTML = h % 10;

    //         spans[3].innerHTML = Math.floor(m / 10);
    //         spans[4].innerHTML = m % 10;

    //         spans[6].innerHTML = Math.floor(s / 10);
    //         spans[7].innerHTML = s % 10;
    //     }, 1000);

    // }
}





