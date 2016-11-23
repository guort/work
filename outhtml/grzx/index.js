(function(){localStorage.clear();
var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight
,mainVar={temporary:{}}
,UA=navigator.userAgent.toLowerCase()
,search=getSearch()
,ST_user=localStorage.getItem("userInfo")
,userInfo=toObject(ST_user)||{}
,createFlag=true
,isWX
,CONFIG={
	shareInfo:{
	title:"红包摇不停！",
	ico:"http://qa.h5.mtq.tvm.cn/yao/sq_yyy/img/share_ico.png",
	link:"",
	desc:"正在玩红包摇不停，推荐你也来试试，现金红包任你领",
	token:"46497107fa23"
	}
},PAGE={title:"摇一摇福利到",
	token:"46497107fa23"
	,yyyappid:"46497107fa23"
	,channelId:"wxd06496bae6bb4a78"
  ,systoken:"uuETOJuZ"
	}
,HOST={
AD:"//mb.mtq.tvm.cn",
FR:"http://friends.yaotv.tvm.cn",
RTS:"//rts-opa.yaotv.tvm.cn",
}

toSQ({userInfo:userInfo,fun:function(){
	mainVar.loadObj=xdLoadFun()
	mainVar.loadObj.show()
    userInfo.isWX&&inWX();
	HRB()
}})
function HRB(){
	if(createFlag)list()
    function list(){
    	var cBox=createNode(DB,'div',{className:'cBox'},'p2')
    		,wBox=createNode(DB,'div',{className:'wBox'},'p3')
    		,selfBox=createNode(wBox,'ul',{className:'self'},'p3')
    		,HRBlist=createNode(wBox,'div',{className:'HRBlist'},'p3')
    		,HList=createNode(HRBlist,'ul',{className:'HList'},'p3')
            ,addFr=createNode(wBox,'div',{className:'addFr',html:'<span class="cyq" action="invite_newfriends">点击邀请朋友</span><span class="qhb">一起抢好友红包吧 !</span>',style:'display:none;'},'p3')
            ,HBJH=createNode(wBox,'div',{className:'hbjh',style:'display:none;',action:'yyhbjh'},'p3')
    		,ajax
    		,data
    		,html=''
    		,i=0
            ,leftW=winW-144
            ,szFM
    		;
        createFlag=false     
    	ajax=setAjax('GET',HOST.FR+'/app/user/getList?openid='+userInfo.openid+'&sig='+userInfo.sig+'&tvmid='+userInfo.tvmid+'&'+nocache())
    	ajax.callBack=function($data){
    		var k=0,len,da,d,topImg,bjImg,nickname,head,ranking,sort,money,thumbsUpNum,yaoNum,openid,hbStatus,hbHtml="",countDown=0,interval=0,fusername,fhead,fbjImg,thumbsUpDate=[],thumbsUpFlag=0
    		data=toObject($data)
    		if(data.status='success'){
    			da=data.data,len=da.length
    			if(len!=0){
    				for(;k<len;k++){
                        var colorFlag=1;
	    				d=da[k];
                        tvmid=d.tvmid;
                        openid=d.openid?d.openid:tvmid;
	    				hbStatus=d.status||1;
	    				nickname=d.nickname||'';
	    				head=d.avatar_url?(d.avatar_url.indexOf('wx.qlogo.cn')<0?d.avatar_url:d.avatar_url+'/0'):'http://q-cdn.mtq.tvm.cn/yao/images/default.png';
	    				yaoNum=d.yaoNum||0;
	    				thumbsUpNum=d.thumbsUpNum||0;
	    				thumbsUpDate=d.thumbsopenIds||[];
	    				money=Number(d.money/100).toFixed(2)||0;
	    				sort=d.sort||0;
	    				ranking=d.ranking||'';
	    				countDown=d.countDown||3*60
	    				interval=d.interval||5*60;
	    				topImg=(ranking>=1&&ranking<=3)?('./img/'+ranking+'.png'):"";
						switch(hbStatus){
							case 1:
								hbHtml="";
							break;
							case 2:
                            hbHtml='<div class="hb"><div class="hbImg"></div><span>可抢</span></div></div>';
							break;
							// case 3:
							// 	hbHtml='<div class="hb"><div class="hbImg"></div><div class="jdt"><div class="jdtMask" countDown="'+countDown+'.,'+interval+'"></div></div></div>';
							// break;	
							default:
								hbHtml="";
							break;
						}
						thumbsUpF()
						if(ranking==1){
                            fopenid=openid;
							fusername=nickname;
							fhead=head;
						}
						if(k==0){
							self(d);
						}else{
							html+='<li>\
							<div class="left" action="goUser.,'+openid+'.,'+tvmid+'" style="width:'+leftW+'px;">\
								<div class="num" style="background-image:url('+(k==0?'':topImg)+');">'+(ranking>3?ranking:"")+'</div>\
								<div class="userImg" style="background-image:url('+head+');"></div>\
								<div class="username">'+(k<1?'<p><span>'+rp(nickname)+'</span></p>\
									<p><span>第'+ranking+'名</span></p>':'<span>'+rp(nickname)+'</span>'+hbHtml)+'</div>\
							</div>\
							<div class="right">\
								<p><b>摇动</b><b class="middle">'+yaoNum+'</b><b>次</b></p>\
								<p><b>抢到</b><b class="red middle">'+money+'</b><b class="red">元</b></p>\
							</div>\
							<div class="zanN" action="zan.,'+thumbsUpFlag+'.,'+openid+'">\
								<b class="zNum">'+thumbsUpNum+'</b>\
								<b><div class="'+(colorFlag==0?'gray':'red')+'"></div></b>\
							</div>\
						</li>'
						}
	    			}
	    			coverUser({'flag':true,'nickname':fusername,'head':fhead,'openid':fopenid})
    			}else{
                    addFr.style.display='block'
    				coverUser({'flag':false,'nickname':'','head':'','openid':''})
    			}
    			HList.innerHTML=html;
                if(len==2){
                    addFr.style.display='block'
                    addFr.style.top=(((winH-getProperty(wBox).top)-(HList.offsetHeight*2+7))/2-33)+(HList.offsetHeight*2+7)+'px'
                }
    			// jdt();
	    		mainVar.loadObj.hidd();	
    		}
    		function thumbsUpF(){
	    		var len=thumbsUpDate.length;thumbsUpFlag=0;
	    		if(len!=0){
	    			for(var i=0;i<len;i++){
	    				if(thumbsUpDate[i]==userInfo.openid)thumbsUpFlag=1
	    			}
                    colorFlag=1
	    		}else{
                    colorFlag=0
                }
	    	}
    	}
    	ajax.err=function(){
    		mainVar.loadObj.hidd();	
    		tishi('获取数据失败，请稍后刷新重试!',{showTime:3000,hiddFun:function(){
    				location="user.html?toopenid="+userInfo.openid
    		}})
    	}
		ajax.send()
    	addEvent(wBox,'click',function(e){
	        docAction(e,{action:'action',fun:function($t,$action){
	            var action=$action.split(".,"),numNode,imgNode,num,a
	                switch(action[0]){
	                    case 'goUser':
	                    goto('user.html?toopenid='+action[1]+"&tvmid="+action[2]);
	                    break;
	                    case 'zan':
	                    	numNode=$t.querySelector('.zNum')
	                    	imgNode=$t.querySelector('div')
	                    	num=numNode.textContent
	                    	if(!Number(action[1])){
	                    		a=setAjax('GET',HOST.FR+'/app/user/thumbsUp?openid='+userInfo.openid+'&sig='+userInfo.sig+'&receive_openid='+action[2]+'&'+nocache())
	                    		a.callBack=function($data){
	                    			var data=toObject($data)
	                    			if(data.status=='success'){
	                    				$t.setAttribute('action','zan.,1')
			                    		imgNode.className='red'
			                    		num++
			                    		numNode.textContent=num
	                    			}else{
                                         createTSErrMsg('<p>'+(data.errMsg?data.errMsg:'点赞失败')+'</p>')
	                    			}
	                    		}
	                    		a.send()
	                    	}
	                    break;
                        case 'invite_newfriends':
                            $t.classList.add('tabIn')
                            setTimeout(function(){
                                $t.classList.remove('tabIn')
                            },400)
                            WebViewJavascriptBridge.callHandler("callNativeToDo",{action:"invite_newfriends",data:{},callback:0},function(){
                            })
                        break;
                        case 'yyhbjh':
                        break;
	                }
	            }
	        })
    	})
    	function self($data){
    		var html=''
    			,d=$data
                ,tvmid=d.tvmid
                ,openid=d.openid?d.openid:tvmid
	    		,hbStatus=d.status||1
	    		,nickname=d.nickname||''
	    		,head=d.avatar_url?(d.avatar_url.indexOf('wx.qlogo.cn')<0?d.avatar_url:d.avatar_url+'/0'):'http://q-cdn.mtq.tvm.cn/yao/images/default.png'
	    		,yaoNum=d.yaoNum||0
	    		,thumbsUpNum=d.thumbsUpNum||0
	    		,thumbsUpDate=d.thumbsopenIds||[]
	    		,thumbsUpFlag=0
                ,colorFlag=1
	    		,money=Number(d.money/100).toFixed(2)||0
	    		,sort=d.sort||0
	    		,ranking=d.ranking||''
    			;
    		thumbsUpF()
	    	html='<ul class="HList"><li>\
					<div class="left" action="goUser.,'+openid+'.,'+d.tvmid+'" style="width:'+leftW+'px;">\
						<div class="num"></div>\
						<div class="userImg" style="background-image:url('+head+');"></div>\
						<div class="username">\
							<p><span>'+rp(nickname)+'</span></p>\
							<p><span>第'+ranking+'名</span></p>\
						</div>\
					</div>\
					<div class="right">\
						<p><b>摇动</b><b class="middle">'+yaoNum+'</b><b>次</b></p>\
						<p><b>抢到</b><b class="red middle">'+money+'</b><b class="red">元</b></p>\
					</div>\
					<div class="zanN" action="zan.,'+thumbsUpFlag+'.,'+openid+'">\
						<b class="zNum">'+thumbsUpNum+'</b>\
						<b><div class="'+(colorFlag==0?'gray':'red')+'"></div></b>\
					</div>\
				</li></ul>'
			selfBox.innerHTML=html;
			function thumbsUpF(){
	    		var len=thumbsUpDate.length;thumbsUpFlag=0;
	    		if(len!=0){
	    			for(var i=0;i<len;i++){
	    				if(thumbsUpDate[i]==userInfo.openid)thumbsUpFlag=1
	    			}
                    colorFlag=1
	    		}else{
                    colorFlag=0
                }
	    	}
	    }
	    function coverUser($data){
	        var html=""
	        	,hFirst=$data.flag||true
	        	,nickname=$data.nickname||''
	        	,head=$data.head?$data.head.replace(/0$/,'96'):''
                ,openid=$data.openid
                ,bjImg
	        	;
            getUserInfo(function($data){
                var data=$data;
                if(data.status==true){
                    bjImg=data.data.user_bg||''
                    cBox.style.backgroundImage='url('+bjImg+')'
                }else{
                    bjImg=''
                    cBox.style.backgroundImage='url('+bjImg+')'
                }
            })
	        html='<div class="fUser">'+(hFirst?'<img src="'+head+'"/><p><b class="user">'+rp(nickname)+'</b><b>占领了封面</b></p>':'<b>还没有人占据封面<b>')+'</div>'
    		cBox.innerHTML=html
            if(userInfo.openid==openid||userInfo.tvmid==openid){
                szFM=createNode(cBox,'div',{className:'fm',html:'<img src="./img/xj.png"/><span>轻触设置封面</span>'},'p3')
                cBox.setAttribute('action','szFM')
            }

            function getUserInfo($fun){
                var d=setAjax("GET",HOST.RTS+"/userinfo/get?openid="+openid+"&systoken="+PAGE.systoken+"&"+nocache())
                    d.callBack=function($data){
                        var data=toObject($data);
                        data=data; 
                        isFun($fun,data);
                    }
                    d.send()
            }
    	}
        addEvent(cBox,'click',function(e){
            docAction(e,{action:'action',fun:function($t,$action){
                var action=$action.split(".,"),numNode,imgNode,num,a
                    switch(action[0]){
                        case 'szFM':
                        settingOpt();
                        break;
                    }
                }
            })
        })
    	function jdt(){
    		var jdt=document.querySelectorAll('.jdtMask')
    			,jWidth
    			,len=jdt.length
    			,width
    			,i=0
    			,time
    			,time2
    			,maxTime
    			,_this
    			,$this
    			timer=null
    			;
    		if(len!=0){
    			maxTime=1
    			for(;i<len;i++){
	    			_this=jdt[i];
	    			jWidth=_this.offsetWidth;
	    			time=_this.getAttribute('countDown').split('.,')||[]
	    			_this.countDown=Number(time[0]);
	    			_this.interval=Number(time[1]);
	    			maxTime=maxTime>_this.countDown?maxTime:_this.countDown
	    			_this.style.width=_this.countDown/_this.interval*jWidth+'px';
    			}
	    		timer=setInterval(function(){
					for(var j=0;j<len;j++){
						$this=jdt[j];
						time2=$this.getAttribute('countDown').split('.,')||[];
						$this.countDown=Number(time2[0]);
						$this.interval=Number(time2[1]);
						$this.countDown-=1;
						$this.setAttribute('countDown',$this.countDown+'.,'+$this.interval)
						width=Math.ceil($this.countDown/$this.interval*jWidth)
						if($this.offsetWidth==0){
							$this.parentNode.style.display="none";
						}else{
							$this.style.width=width+'px';
						}
						if(maxTime<=0){
							clearInterval(timer)
						}
					}
					maxTime-=1;
	    		},1000)	
    		}
     	}
        function settingOpt(){
            if(userInfo.isWX){  
                var upProgOuter=createNode(userTop,'div',{className:'up_progress'},'p3');
                userSTFile.onchange=function(){
                    var fileName=this.files[0].name;
                    uploadFile({
                        type:'POST',
                        url:HOST.FR+'/upload/image',
                        data:this.files[0],
                        object:this,
                        fileName:fileName,
                        moveFn:function(num){
                            upProgOuter.style.width=parseInt(num)+'%';
                        },
                        success:function(data){
                            var data=toObject(data);
                            if(data.status=='success'){
                                setUserBG(function(){
                                    cBox.style.backgroundImage='url('+data.data.imageUrl+')';
                                    szFM.remove();
                                },data.data.imageUrl);
                            }else{
                                tishi('上传失败，请重试。',{time:3e3});
                            };
                        },
                        error:function(){
                            tishi('上传失败，请重试!',{time:3e3});
                        }
                    })
                }
            }else{
                if(window.WebViewJavascriptBridge){
                    WebViewJavascriptBridge.callHandler("callNativeToDo",
                    {
                        action:"get_image",
                        data:{
                           "neededit":0
                        },
                        callback:1
                    },
                    function(data){
                        var data=toObject(data);
                        if(data){
                            setUserBG(function(){
                                cBox.style.backgroundImage='url('+data.url+')';
                            },data.url);
                        }
                    });
                }
            }
        }
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
function top3(i){
	if(i<4&&i>0){
		return "./img/"+i
	}else{
		return ""
	}
}
function rp($s){
    return $s.replace(/[",',<,>,;,\,,{,},\.,\\,\/]/g,"")
}
function createTSErrMsg($html){
    if(!DO.getElementById('errorMsgToast')){
        var errToast=createNode(DB,'div',{id:'errorMsgToast',className:'errorMsgToast MoveShow'},'p3'),
            errText=createNode(errToast,'div',{className:'errorMsgText',html:$html},'p3');
        setTimeout(function(){
            errToast.classList.add("MoveHide");
            setTimeout(function(){
                errToast.remove();
            },300);
        },2000);
    }
}
//工具类方法
//人民币 分转元
function toUnix($t){
	return +($t/1000).toFixed(0)
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
function setUserBG($fun,$data){
    var a=setAjax("POST",HOST.RTS+"/userinfo/saveaddr?"+nocache()),
        //data='{openid:'+user.openid+',systoken:'+PAGE.systoken+',wxSig:'+user.sig+',user_bg:'+$data+'}';
        data='openid='+userInfo.openid+'&systoken='+PAGE.systoken+'&wxSig='+userInfo.sig+'&user_bg='+$data;
        a.data=data;
    a.callBack=function($data){
        var data=toObject($data)
        isFun($fun,data)
    }
    a.err=function(){
      tishi("网络异常");
    }
    a.send();
}
function inWX(){
    var user=userInfo;
    CONFIG.shareInfo.link="http://"+location.host+location.pathname+"?refer_code=摇8分享";
    CONFIG.shareInfo.title="摇8分享！";
    CONFIG.shareInfo.desc="满中国都是红包一起来吧，下个红包就是你的哦！";
    CONFIG.shareInfo.resources=location.href;
    CONFIG.shareInfo.success=function(){TJ('118000',{},{},0);}
    CONFIG.shareInfo.strFun=function(wx){
        wx.getLocation({
          success:function($data){
            var user=userInfo
            ,ln=$data.longitude
            ,la=$data.latitude
            ,list,pos
            if(!user.location)user.location={}
            pos=user.location
            pos.gps=la+","+ln;
            window.getGeo=function($data){
                var ad_info,result,address,add
                if($data){
                    if(result=$data.result){
                        ad_info=result.ad_info;
                        list=ad_info.name;
                        list=list.replace(/\,/g,"-");
                        add=list.split("-");
                        address=result.address; 
                        pos.region=list;
                        pos.address=address;
                        pos.adcode=ad_info.adcode||0;
                        pos.cache=0;
                        user.country=add[0];
                        user.province=add[1];
                        user.city=add[2];
                        user.organization=add[3];
                            var now=+new Date,us=userInfo.setTime||0;
                            if(now-us>36e6){
                                var a=setAjax("POST",HOST.RTS+"/userinfo/saveaddr?"+nocache())
                                a.data="openid="+user.openid+"&nickname="+user.nickname+"&head_img="+user.weixin_avatar_url+"&sex="+user.sex
                                +"&longitude="+ln+"&latitude="+la+"&provice="+add[1]+"&city="+add[2]+"&area="+add[3]+"&street="+address+"&adcode="+pos.adcode+"&systoken="+PAGE.systoken+"&wxSig="+user.sig
                                a.send();                           
                                }
                        localStorage.setItem("userInfo",JSON.stringify(user))
                    }
                }else
                tishi("ERR_not position")
            }
            setJsonp(HOST.WXAPIS+"?location="+la+","+ln+"&coord_type=5&get_poi=0&output=jsonp&callback=getGeo&key=IPVBZ-BO4HG-MD3QU-I75W4-F7KUZ-PSBYI")
          },
          cancel:function (res) {
          }
        });
        wx.getNetworkType({
          success:function(res){
            mainVar.network=res.networkType;
          },
          fail: function (res) {
            mainVar.network="fail"
          }
        })      
        }   
    wxShare(CONFIG.shareInfo);  
    displayY8()
    
    }
 }())