
function lunbo (ban,cir){
    var bannner = document.querySelector(ban)
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
                if(index>=len+1){
                    index = 1;
                    rmTransition();
                    setTransform(-index*eleWidth);

                }else if(index <1){
                    index = len;
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

