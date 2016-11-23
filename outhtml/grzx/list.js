(function(){
var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight
,mainVar={temporary:{}}
,search=getSearch()
,ST_user=localStorage.getItem("userInfo")
,userInfo=toObject(ST_user)||{}
,toopenid=search.toopenid
,tvmid=search.tvmid||''
,hidNunber=search.hid||''
,CONFIG={
    shareInfo:{
    title:"红包摇不停！",
    ico:"http://qa.h5.mtq.tvm.cn/yao/sq_yyy/img/share_ico.png",
    link:"",
    desc:"正在玩红包摇不停，推荐你也来试试，现金红包任你领",
    token:"46497107fa23"
    }
    ,tab:['fcHB','lqHB','jrBD','ljBD']
},PAGE={title:"摇一摇福利到",
    token:"46497107fa23"
    ,yyyappid:"46497107fa23"
    ,channelId:"wxd06496bae6bb4a78"
  ,systoken:"uuETOJuZ"
    }
,HOST={
    AD:"//mb.mtq.tvm.cn",
    FR:'//friends.yaotv.tvm.cn',
    RTS:"//rts-opa.yaotv.tvm.cn",
    HB:"http://pmall.yaotv.tvm.cn"
}
var jrBody,ljBody,sdBody,fcBody,scrollFlag=true
if(toopenid){
    if(!tvmid)tishi('未获取到用户tvmid',{showTime:1000})
    mainVar.loadObj=xdLoadFun()
    topNavBar()
}else{
    tishi('未获取用户身份信息',{showTime:3000,hiddFun:function(){
        history.go(-1)
    }})
}
function topNavBar(){
    var navBar
        ,html=''
        ,nowIn
        ,i=0
        ,tabArr=CONFIG.tab||[]
        ,tabLen=tabArr.length
        ;
        if(tvmid=='sys582581347a23dba43c128fe6'){
            checkTab(2)
        }
        if(tabLen!=0){
            for(;i<tabLen;i++){
                switch(tabArr[i]){
                    case 'fcHB':
                    html+='<li action="'+tabArr[i]+'" class="liNavBar"><span>TA发出的红包</span></li>'
                    break;
                    case 'lqHB':
                    html+='<li action="'+tabArr[i]+'" class="liNavBar"><span>TA领的红包</span></li>'
                    break;
                    case 'jrBD':
                    html+='<li action="'+tabArr[i]+'" class="liNavBar"><span>今日红包最多</span></li>'
                    break;
                    case 'ljBD':
                    html+='<li action="'+tabArr[i]+'" class="liNavBar"><span>累计红包排名</span></li>'
                    break;
                }
            }
            navBar=createNode(DB,'div',{className:'navBar'},'p2');
            navBarList=createNode(navBar,'ul',{className:'navBarList',html:html})
            nLi=navBarList.querySelectorAll('li');
            nLi[0].className="liNavBar active";
            for(var i=0;i<nLi.length;i++){
                nLi[i].style.width=(winW/nLi.length)+'px'
                nLi[i].index=i;
                nLi[i].onclick=function(){
                    nowIn=this.index
                    for(var i=0;i<nLi.length;i++){
                        nLi[i].className="liNavBar";
                    }
                    nLi[nowIn].className="liNavBar active";
                }
            }
            switch(tabArr[0]){
                case 'fcHB':fcHB();break;
                case 'lqHB':sdHB();break;
                case 'jrBD':HongBao('jrBD');break;
                case 'ljBD':HongBao('ljBD');break;
            }
        }else{
            document.write('暂时没有榜单')
        }
    function checkTab($num){
        var num=$num||6
        tabArr.splice($num-1,1)
        tabLen=tabArr.length
    }
}
addEvent(DB,'click',function(e){
    docAction(e,{action:'action',fun:function($t,$action){
        var action=$action.split(".,"),numNode,imgNode,num,a
            switch(action[0]){
                case 'fcHB':
                    scrollFlag=true
                    DB.style.backgroundColor='#fff'
                    hiddBox()
                    if(!fcBody){
                        fcHB()
                    }else{
                        fcBody.style.display='block'
                    }
                break;
                case 'lqHB':
                    scrollFlag=false
                    DB.style.backgroundColor='#fff'
                    hiddBox()
                    if(!sdBody){
                        sdHB()
                    }else{
                        sdBody.style.display='block'
                    }
                break;
                case 'jrBD':
                    scrollFlag=false
                    DB.style.backgroundColor='#ff677e'
                    hiddBox()
                    if(!jrBody){
                        HongBao('jrBD')
                    }else{
                        jrBody.style.display='block'
                    }
                break;
                case 'ljBD':
                    scrollFlag=false
                    DB.style.backgroundColor='#f75e46'
                    hiddBox()
                    if(!ljBody){
                        HongBao('ljBD')
                    }else{
                        ljBody.style.display='block'
                    }
                break;
                case 'goUser':
                    goto('user.html?toopenid='+action[1]+'&tvmid='+action[2]);
                break;
            }
        }
    })
})
//发出红包
function fcHB(){
        fcBody=createNode(DB,'div',{className:'fcHB'},'p3')
    var tb=createNode(fcBody,'div',{className:'tb'},'p3')
        ,tb2=createNode(tb,'div',{className:'tb2',html:'<div class="tbTitle"><b class="left">今日发出</b><b class="num">0个</b></div>'},'p3')
        ,tubiao=createNode(tb2,'div',{className:'tubiao'},'p3')
        ,bangdan=createNode(fcBody,'div',{className:'bangdan'},'p3')
        ,list=createNode(bangdan,'ul',{className:'fclist'},'p3')
        ,a
        ,i=0
        ,page=0
        ,bangdanH
        ,DBHeight
        ,listHeight
        ,scrollHeight
        ,scollT
        ;
    getDetaile();getData();    
    function getDetaile(){
        var a,arr,len,li,i=0,date,number,count,arrDate=[],arrNumber=[]
        a=setAjax('GET',HOST.FR+'/app/redEnvelop/statistics?toTtopenid='+toopenid+'&toTvmid='+tvmid)
        a.callBack=function($data){
            data=toObject($data)
            if(data.status=='success'){
                var numText=tb2.querySelector('.num')
                arr=data.data
                len=arr.length
                if(len!=0){
                    for(;i<len;i++){
                        li=arr[i]
                        date=li.date
                        number=li.money?li.money:0
                        arrNumber[i]=number
                        if(i==0)count=number
                        if(i!=len-1){
                            arrDate[i]=toDay(date)
                        }else{
                            arrDate[i]=toMon(date)
                        }
                    }
                }else{
                    count=0
                    arrNumber=[0,0,0,0,0,0,0]
                    arrDate=['','','','','','','']
                }
                numText.textContent=count+'个'
                initTB({'date':arrDate,'number':arrNumber})
                window.initHbRecord('#app',toopenid)
            }
        }    
        a.send();
    }
    function initTB($opt){
        var myChart = echarts.init(tubiao)
            ,opt=$opt||{}
            ,allCont=$opt.todayNum||0
            ,dateArr=$opt.date||[]
            ,numArr=$opt.number||[]
            ,len=dateArr.length
            ;
            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter:'{a0} : {c0} 个'
                },
                grid: {
                    left: '0',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [dateArr[6],dateArr[5],dateArr[4],dateArr[3],dateArr[2],dateArr[1],dateArr[0]],
                    splitLine:{
                        show:false
                    },
                    axisTick:{
                        interval:0
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#5cd9d0'
                        }
                    },
                    axisLabel:{
                        show:true,
                        interval:0
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:false,
                    splitLine:{
                        show:false
                    }
                },
                series: [
                    {
                        name:'发出红包',
                        type:'line',
                        stack: '总量',
                        data:[numArr[6],numArr[5],numArr[4],numArr[3],numArr[2],numArr[1],numArr[0]],
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    color:'#8cfff6'
                                },
                                color:'#8cfff6'
                            }
                        },
                        areaStyle:{
                            normal:{
                                color:'#49baac'
                            }
                        }
                    }
                ]
        }
        myChart.setOption(option);
    }
    function getData(){
        var dd,data,len,html='',li,openid,gtvmid,head,name,province,city,area,type,amount,dateTime,timeCount=new contrast_time,time,content,number
        mainVar.loadObj.show()
        a=setAjax('GET',HOST.FR+'/app/redEnvelop/give?toTtopenid='+toopenid+'&toTvmid='+tvmid+'&pageNum='+page+'&pageSize=10')
        a.callBack=function($data){
            dd=toObject($data)
            data=dd.data
            len=data.length
            if(dd.status=='success'){
                if(len!=0){
                    for(var i=0;i<len;i++){
                        li=data[i]||{}
                        openid=li.ttopenid
                        gtvmid=li.tvmid
                        head=li.img?(li.img.indexOf('wx.qlogo.cn')<0?li.img:li.img+'/0'):'http://q-cdn.mtq.tvm.cn/yao/images/default.png'
                        name=li.name?rp(li.name):''
                        province=li.province?li.province.replace('undefined','').replace('0',''):''
                        city=li.city?li.city.replace('undefined','').replace('0',''):''
                        area=li.area?li.area.replace('undefined','').replace('0',''):''
                        type=li.type
                        amount=li.amount||0
                        dateTime=+li.dateTime||""
                        time=timeCount.fn(dateTime)
                        switch(type){
                            case '108'://余额
                            number=amount/100+'元'
                            content='余额'
                            break;
                            case '109'://现金
                            number=amount/100+'元'
                            content='现金红包'
                            break;
                            case '110'://金币
                            number=amount+'个'
                            content='金币'
                            break;
                            default:
                            number=amount+'个'
                            content='金币'
                            break;
                        }
                        html+='<li action="goUser.,'+openid+'.,'+gtvmid+'">\
                            <div class="headImg" style="background-image:url('+head+');"></div>\
                            <div class="right">\
                                <p><span class="name"><b>'+name+'</b></span><span class="red">抢到了<span>'+number+'</span>'+content+'</span></p>\
                                <p><span class="addr"><b>'+city+area+'</b></span><span class="time">'+time+'</span></p>\
                            </div>\
                        </li>'
                    }
                    list.innerHTML+=html
                }else{
                    if(list.innerHTML=='')list.innerHTML='<b>暂时没有数据</b>'
                    scrollFlag=false
                }
                mainVar.loadObj.hidd();
                page++
            }
        }
        a.send()
    }
    document.onscroll=function(){
        var height
        DBHeight=DB.offsetHeight
        scollT=DB.scrollTop
        height=DBHeight-winH-scollT
        if(height<=0){
            if(scrollFlag)getData()
        }
    }
    // bangdanH=getProperty(list).top
    // bangdan.style.height=(winH-bangdanH)+'px'
}
//收到的红包
function sdHB(){
        sdBody=createNode(DB,'div',{className:'fcHB'},'p3')
    var tb=createNode(sdBody,'div',{className:'tb'},'p3')
        ,tb2=createNode(tb,'div',{className:'tb2',html:'<div class="tbTitle"><b class="left">今日领取</b><b class="num">0元</b></div>'},'p3')
        ,tubiao=createNode(tb2,'div',{className:'tubiao'},'p3')
        ,bangdan=createNode(sdBody,'div',{className:'bangdan',id:'app'},'p3')
        ,bangdanH
        ,a
        ,cont=0
        ,arrDate=[]
        ,arrNumber=[]
        ;
    getDetaile()
    function getDetaile(){
        var a,arr,len,li,i=0,date,number,count
        a=setAjax('GET',HOST.HB+'/open/account/statistics/daily?openid='+toopenid)
        a.callBack=function($data){
            data=toObject($data)
            if(data.status=='success'){
                var numText=tb2.querySelector('.num')
                arr=data.data
                len=arr.length
                if(len!=0){
                    for(;i<len;i++){
                        li=arr[i]
                        date=li.date
                        number=li.money?(li.money/100).toFixed(2):0
                        arrNumber[i]=number
                        if(i==0)count=number
                        if(i!=len-1){
                            arrDate[i]=toDay(date)
                        }else{
                            arrDate[i]=toMon(date)
                        }
                    }
                }else{
                    count=0
                    arrNumber=[0,0,0,0,0,0,0]
                    arrDate=['','','','','','','']
                }
                numText.textContent=count+'元'
                initTB({'date':arrDate,'number':arrNumber})
                window.initHbRecord('#app',toopenid)
            }
        }    
        a.send();
    }
    function initTB($opt){
        var myChart = echarts.init(tubiao)
            ,opt=$opt||{}
            ,allCont=$opt.todayNum||0
            ,dateArr=$opt.date||[]
            ,numArr=$opt.number||[]
            ,len=dateArr.length
            ;
            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter:'{a0} : {c0} 元'
                },
                grid: {
                    left: '0',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [dateArr[6],dateArr[5],dateArr[4],dateArr[3],dateArr[2],dateArr[1],dateArr[0]],
                    splitLine:{
                        show:false
                    },
                    axisTick:{
                        interval:0
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#5cd9d0'
                        }
                    },
                    axisLabel:{
                        show:true,
                        interval:0
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:false,
                    splitLine:{
                        show:false
                    }
                },
                series: [
                    {
                        name:'领取红包',
                        type:'line',
                        stack: '总量',
                        data:[numArr[6],numArr[5],numArr[4],numArr[3],numArr[2],numArr[1],numArr[0]],
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    color:'#8cfff6'
                                },
                                color:'#8cfff6'
                            }
                        },
                        areaStyle:{
                            normal:{
                                color:'#49baac'
                            }
                        }
                    }
                ]
        }
        myChart.setOption(option);
    }
    // bangdanH=getProperty(bangdan).top
    // bangdan.style.height=(winH-bangdanH)+'px'
}
function HongBao($flag){
    var BD,topList,list,listH,titleImg,bgImg,titleCon,url,now=+new Date,arr=formatTime("Y-M-D-h-m-s",now).split('-'),addeFlag
        switch($flag){
            case 'jrBD':
                addeFlag=0
                titleImg='./img/jrHB.png'
                bgImg='./img/jrBJ.jpg'
                titleCon=""
                url='http://open-cdn.yaotv.tvm.cn/open/201609/01/real_cashpank.json?date='
            break;
            case 'ljBD':
                addeFlag=1   
                titleImg='./img/ljHB.png'
                bgImg='./img/ljBJ.jpg'
                titleCon='以下是截止到'+arr[1]+'月'+arr[2]+'日的累计红包排名(不含今天)'
                url='http://open-cdn.yaotv.tvm.cn/open/201609/01/off_cashpank.json?date='
            break;
        }
    titleInit()
    function titleInit(){
        var BODY
            if($flag=='jrBD'){
                BODY=jrBody=createNode(DB,'div',{className:'bg'},'p3');
            }else if($flag=='ljBD'){
                BODY=ljBody=createNode(DB,'div',{className:'bg'},'p3');
            }
        var title=createNode(BODY,'div',{className:'title'},'p3')
            ,cont=createNode(title,'span',{className:'cont'},'p3')
            ;
            BODY.style.backgroundImage='url('+bgImg+')';
            title.style.backgroundImage='url('+titleImg+')';
            cont.innerHTML=titleCon;
            BD=createNode(BODY,'div',{className:'BD'},'p3');
            
            topList=createNode(BD,'ul',{className:'topList'},'p3');
            list=createNode(BD,'ul',{className:'list'},'p3');
    }
    createList()
    function createList(){
        var a,dd,data,len,li,ht='',html='',i=0,name,money,headimg,addr,province,city,now=+new Date,arr=formatTime("Y-M-D-h-m-s",now).split('-'),arrT=arr[0]+"-"+arr[1]+"-"+arr[2]+"-"+arr[3]+"-"+arr[4],TopaddrCont,addrCont,openid,tvmidArr,gtvmid,goFlag;
        a=setAjax('GET',url+arrT)
        a.callBack=function($data){
            dd=toObject($data)
            data=dd.data
            len=data.length
            if(dd.status=='success'){
                if(len!=0){
                    for(;i<len;i++){
                        li=data[i]
                        openid=li.openid||''
                        tvmidArr=li.tvmid||[]
                        nickname=li.nickname||''
                        money=li.money?(li.money/100).toFixed(2):''
                        headimg=li.weixin_avatar_url||''
                        headimg=headimg?headimg.replace(/0$/,'96'):'http://q-cdn.mtq.tvm.cn/yao/images/default.png'
                        province=li.province||''
                        city=li.city||''
                        addr=province+city
                        TopaddrCont=addeFlag?'':'<span class="addr">'+addr+'</span>'
                        addrCont=addeFlag?'<p style="height:100%;line-height:45px;">'+rp(nickname)+'</p>':'<p>'+rp(nickname)+'</p><p>'+addr+'</p>'
                        if(addeFlag){
                            goFlag=""
                        }else{
                            if(tvmidArr[0]){
                                gtvmid=tvmidArr[0]
                            }else{
                                gtvmid=''
                            }
                            goFlag=' action="goUser.,'+openid+'.,'+gtvmid+'"'
                        }
                        if(i<3){
                            ht+='<li'+goFlag+'>\
                                    <div class="headImg" style="background-image:url('+headimg+');"></div>\
                                    <span class="name">'+rp(nickname)+'</span>'+TopaddrCont+'\
                                    <span class="money">￥'+money+'</span>\
                                    <img src="./img/'+(i+1)+'.png">\
                                </li>'
                        }else{
                            html+='<li'+goFlag+'>\
                                    <span>'+(i+1)+'</span>\
                                    <div class="headImg" style="background-image:url('+headimg+');"></div>\
                                    <div class="count">'+addrCont+'</div>\
                                    <b>￥'+money+'</b>\
                                </li>'
                        }
                    }
                    topList.innerHTML=ht;
                    // listH=getProperty(list).top
                    // list.style.height=(winH-listH)+'px'
                    list.innerHTML=html;
                }
            }else{
                tishi("获取数据失败",{showTime:2000})
            }
        }
        a.send();
    }
}
function toDay($s){
    var st=$s.split('-')
    return st[2].replace(/^0/,'')
}    
function toMon($s){
    var st=$s.split('-')
    return st[1]+'月'+st[2]
}
function getTvmid($id,$fun){
    var a=setAjax("GET",HOST.FR+"/app/user/info?openid="+$id+"&"+nocache())
        a.callBack=function($data){
            var data=toObject($data);
            isFun($fun,data);
        }
        a.send()
}
function hiddBox(){
    var arr=[jrBody,ljBody,fcBody,sdBody]
    for(var i=0;i<arr.length;i++){
        if(arr[i])arr[i].style.display='none'
    }
}
function goto(url,$type){
    if($type==="tlq"){
        tjData["appName"]="讨论区";
        TJ(100000);
        setTimeout(function(){
            top.location.href=url
            },1000)
        return 
        }
    top.location.href=url
}
function rp($s){
    return $s.replace(/[",',<,>,;,\,,{,},\.,\\,\/]/g,"")
}

function docAction(e,$opt){
    var ele=e.srcElement||e.target,opt=$opt||{},_action=opt.action||"action",attribute,argument,a1;             
        do{
            if(ele.nodeType!==1)break
            if(attribute=ele.getAttribute(_action))break            
            }while(ele=ele.parentNode)                  
        if(attribute){                          
            isFun(opt.fun,ele,attribute)
        }
}
function getUserInfo($id,$fun){
    window.getUserData=$fun;
    setJsonp(HOST.AD+'/ufo/puserinfo?wx_token='+PAGE.token+"&openid="+$id+"&cb=getUserData&"+nocache())
}
function contrast_time(){
    var t=this
    ,now=+new Date
    ,arr=formatTime("Y-M-D-h-m-s",now).split('-')
    ,yy=arr[0]
    ,mm=arr[1]
    ,dd=arr[2]
    ,todayend=+new Date(yy+'/'+mm+'/'+dd+' 23:59:59') //计算当前结束时间时间戳
    ,st=todayend-now;  //计算当天当前时间到当天完时间长
    t.fn=function(a){
        var _=now-a,bool=(st+_)<86400000;
        if(_<=60000)return '刚刚';
        else if(bool){
            if(_<3600000)return t.mfl(_/60000)+'分钟前';
            else return t.mfl(_/3600000)+'小时前';
        }else return t.zh(a);
    }
    t.mfl=function(e){return Math.floor(e);}
    t.zh=function(a){
        var arr=formatTime("Y-M-D-h-m-s",+a).split('-')
        return B(arr[1])+'月'+B(arr[2])+'日 '+B(arr[3])+':'+B(arr[4])+':'+B(arr[5])
    }
}
//工具类方法
//人民币 分转元
function toUnix($t){
    return +($t/1000).toFixed(0)
    }
//提示方法
function tishi($c,options){
    var opt=options||{},t=this,boxSty,bgSty,bg,box;
    if(!window.xdAlert){
        setStyle(".xdAlert_bg{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;background:rgba(0,0,0,.7);-webkit-transition:background 400ms ease;}.xdAlert_bg.display{display:block}.xdAlert_box{position:absolute;display:table;text-align:center;color:#fff;font-size:16px;background:rgba(0,0,0,.5);top:50%;left:50%;max-width:90%;-webkit-transform:translate3D(-50%,-50%,0);border-radius:6px;padding:10px;opacity:0;margin:-60px 0 0 0;box-sizing:border-box;-webkit-transition:margin 400ms ease,opacity 500ms ease;}.xdAlert_box.show{opacity:1;margin:0 0 0 0;}.xdAlert_box.MoveHide{-webkit-animation:iHidd 350ms forwards;}@-webkit-keyframes iShow{0%{opacity:0;margin:-60px 0 0 0}100%{opacity:1;margin:0 0 0 0}}@-webkit-keyframes iHidd{0%{opacity:1;margin:0 0 0 0;}100%{opacity:0;margin:-60px 0 0 0;}}")
        window.xdAlert={}
    }
    if(t===window){
        t=window.xdAlert
    }
    create()
    t.time&&clearTimeout(t.time);
    t.showTime=opt.showTime||1000;//默认显示时长，如果没设置在1秒后隐藏
    t.hiddFun=opt.hiddFun;
    t.show=show;
    t.hidd=hidd;
    t.bgSty=opt.bgSty;
    t.boxSty=opt.boxSty;
    bgSty=t.bg.style;
    boxSty=t.box.style;
    show();
    return t
function create(){
    if(!t.bg){
        t.bg=createNode(opt.box||document.body,"div",{className:"xdAlert_bg"},"p3");
        t.box=createNode(t.bg,"div",{className:"xdAlert_box"},"p2")
        }
    }       
function show($s,$fun){
    var content=$s||$c||"",type=typeOf(content);//显示当前内容，初始内容，空白内容
    if(t.bgSty)bgSty.cssText=t.bgSty;
    if(t.boxSty)boxSty.cssText=t.boxSty;
    if(type==="DOM")
    t.box.appendChild(content)
    else
    t.box.innerHTML=content
    t.bg.classList.add("display");
    setTimeout(function(){
        t.type="show";
        t.box.classList.add("show")
    },100)
    t.time=setTimeout(function(){hidd($fun)},t.showTime);
}       
function hidd($fun){
    t.box.classList.remove("show");
    t.time=setTimeout(function(){
        t.type="hidd";
        t.bg.classList.remove("display");
        },600);
    isFun($fun||t.hiddFun)
    }
}
//loading 显示与隐藏
function xdLoadFun(){
    if(!window.xdLoadEle){
        setStyle(".xdLoadBox{position:fixed;width:60px;height:60px;border-radius:5px;background:rgba(0,0,0,.5) url(img/loading.gif) no-repeat center center;display:none;top:50%;left:50%;background-size:30px 30px;-webkit-transform:translate(-50%,-50%);z-index:1000}")
        window.xdLoadEle=createNode(document.body,"div",{className:"xdLoadBox"})
        }
        return {show:function($opt){
            if($opt){
                if($opt.style)
                xdLoadEle.style.cssText=$opt.style
                }
            xdLoadEle.style.display="block";
        },hidd:function(){
            xdLoadEle.style.display="none"
            }
        }
    }
//边看边聊导航栏跳转链接
function goUrl($){var h,user=userInfo;
    switch($){
        case"M_SC_NEW":
            h="http://assets.yaomall.tvm.cn/staticfile/pages/shop/2aeaf986-da55-8738-2f81-2b2918cad9df/index.html?fromgzh=1"
        break
        case "M_YL":
            h="http://assets.yaomall.tvm.cn/staticfile/pages/shop/2aeaf986-da55-8738-2f81-2b2918cad9df/index.html?fromgzh=1"
            //h=" http://games.yaotv.tvm.cn/?f=wx&addi="+JSON.stringify({"yaotv_openid":user.openid,"yyyappid":PAGE.yyyappid,"sign":user.sig})+"&cache="+Math.random()
        break
        case "M_GRZX":
            h="http://a.h5.mtq.tvm.cn/yao_zhoubian/ttdsb/index.html?url=home.html"
        break
        case "M_HBBD":
              h="share.html?type=money"
        break
        case "M_DJBD":
            h="share.html?type=dajiangsk"
        break
        case "FX":
            h=HOST.DOMAIN2+"/auth/fanxian?page=pickup&fromgzh=1"
        break
        case "CZ":
            h="http://games.yaotv.tvm.cn/Home/Order/index"
        break
        case "MYE":
            h="http://yaomall.tvm.cn/html/?q=deal/46497107fa23/0/buy-balance"
        break
        case "MH":
            //h=HOST.DOMAIN2+"/auth/fanxian?page=record&fromgzh=1&toopenid="+user.openid
            var url=getSearch().home;
            h=url?url:h="http://friends.yaotv.tvm.cn/auth/friends?page=friends&fromgzh=1&toopenid="+user.openid
        break
        case "PHB":
            h="http://pmall.yaotv.tvm.cn/sales/dist/rank/index.html"
        break
        
    }
    setTimeout(function(){
        if(h)location.href=h
        },200);
}   
//倒计时
function format($time){
  var t=n2t($time,[{v:3600,u:":",hidd:1},{v:60,u:":"},{v:1,u:""}]);
  return t.replace(/(\d)/g,"<b>$1</b>");
}
 }())