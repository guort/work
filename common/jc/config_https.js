var HOST={
	AD:"//mb.mtq.tvm.cn" //更新
	,ADJS:"//tvmdata.oss-cn-hangzhou.aliyuncs.com" //新增 取广告投放
	,API:"//count.yaotv.tvm.cn"
	,APICDN:"//q-cdn.mtq.tvm.cn"
	,BALANCE:'//ttye.yaotv.tvm.cn'
	,CARD:"//pmall.yaotv.tvm.cn"
	,CJ:"//cj.mtq.tvm.cn"
	,DSP:"//dsp.yaotv.tvm.cn"
	,DSPJS:"//e-cdn.yaotv.tvm.cn" 
	,DOMAIN:"//pmall.yaotv.tvm.cn"
	,DOMAIN2:'http://pmall.yaotv.tvm.cn'		
	,FOLDER:"//a-h5.mtq.tvm.cn/yao"
	,GOLDCOIN:'//coin.yaotv.tvm.cn' 
	,HJGY:"//wsq.yaotv.tvm.cn"
	,HUIYUAN:'//userapi.yaotv.tvm.cn/tvmyao/hz.html'
	,JBDH:'http://q.cdn.mtq.tvm.cn/adsmall/mobile/views/'
	,JIAGE:"//ad-cdn.yaotv.tvm.cn" 
	,MALL:""
	,MB:"//qc.yaotv.tvm.cn"
	,ORDER:'http://yaomall.tvm.cn/html/?q=deal/46497107fa23/0/order'
	,QQAPI:"//yaotv.qq.com/shake_tv/include/js/jsapi.js"
	,QQHB:"//wximg.gtimg.com/shake_tv/include/js/jsapi_hongbao.js"
	,QX:'//userapi.yaotv.tvm.cn'
	,RESOURCE:"//a-h5.mtq.tvm.cn/yao/common/"
	,RTS:"//rts-opa.yaotv.tvm.cn"
	,SJYZ:"//sms.yaotv.tvm.cn"
	,SC:"//ucj.yaotv.tvm.cn"
	,SOCKET:"//yao-socket.yaotv.tvm.cn"
	,TJ:"//ana.mtq.tvm.cn"
	,TX:'//tf.yaotv.tvm.cn'
	,USERAPI:"//userapi.yaotv.tvm.cn"
	,WSQ:"//wsq.yaotv.tvm.cn"
	,WSQCDN:"//q-cdn.mtq.tvm.cn"
	,WSQDZP:"//wsq.yaotv.tvm.cn"
	,WSQTURN:"//wsq.yaotv.tvm.cn"
	,WXAPI:"//res.wx.qq.com/open/js/jweixin-1.0.0.js"
	,WXAPIS:"//apis.map.qq.com/ws/geocoder/v1/"
	,YAO:"//yaotv.tvm.cn"
},PAGE={
	channelId:1782
	,token:"33580c57d3c86f07"
	,mpappid:'wx3db39d118d638999'
	,yyyappid:"wx44490bbc768ce355"
	,countInstanceid:"55cc1b516488692924abe165"
	,instanceidDefault:"560fa196923af7d00a028461"//"55a91c9d4ae5e14a2b7177a0"
	,topicid:"1506111637584d4ba2a7d23205074dcce5"
	,hosturl:"24gyl4cihxg8bhd"
	,redirect:"http://yao.qq.com/tv/entry?redirect_uri=http://yaotv.qq.com/shake_tv/auto2/2015/12/8srllcii2i0eq0/index.html#wechat_redirect"
	,unit:"爽币"
	,channelName:"北京生活"	//频道名称
	,banquan:"//a-h5.mtq.tvm.cn/yao/common/img/banquan.jpg"
	,COMMON:"//a-h5.mtq.tvm.cn/yao/common/"
	,FOLDER:"//a-h5.mtq.tvm.cn/yao/https/"
	,bangdan:"share.html"
	,loading:"爽宝正在为您加载数据"
	,pusher:false       //推送大屏幕
	,yanzheng:0		//手机验证
	,speech:0		//获奖感言
	,hasJB:true		//需不需要金币大奖区
	,cash:false			//需不需要金币明细
	,sqMenu:[]
	,menu:{}
	,orderForm:[]
	,mascot:{//吉祥物
		name:"爽宝"		//吉祥物名称
		,img:"//a-h5.mtq.tvm.cn/yao/common/img/a1.png"		//吉祥物图片
		,sound:{
			///a:"//a-h5.mtq.tvm.cn/yao/common/media/a.mp3"//开场欢迎
			//,b:"//a-h5.mtq.tvm.cn/yao/common/media/b.mp3"//中奖了
			//,c:"//a-h5.mtq.tvm.cn/yao/common/media/c.mp3"//没中奖
			//,d:"//a-h5.mtq.tvm.cn/yao/common/media/d.mp3"//冒泡
			//,e:"//a-h5.mtq.tvm.cn/yao/common/media/e.mp3"//掉金币
			}
		,word:[]	//边看边聊菜单项目			
		
	}
	,MENU:null//社区菜单
	,errName1:"摇霸"
	,errName2:"摇侠"
	,errName3:"摇仙"
	,errIco:"//a-h5.mtq.tvm.cn/yao/common/img/user.gif"
}
,CONFIG={
	chars:{
		myhome:{//个人中心
			news:1
			,balance:1
			,homes:{
				key:1
				,strategy:'http://q.cdn.mtq.tvm.cn/static/release/html/46497107fa23/tuwen/e4/58/41/GT1R0BK6H8_1.html'	//攻略
				,financing:'http://q.cdn.mtq.tvm.cn/adsmall/sales/dist/finance/index.html'	//理财
			}
			,menu:{
				wintake:1		//中奖纪录
				,card:1			//我的收藏
				,myorder:1		//返现订单
				,shoping:1		//商城
				,casino:1		//娱乐场
				,history:1		//我的订单
			}
		}
		,mywin:{//卡券包
			kabao:1				//
			,youlove:1			//
			,coupons:1			//
		}
		,birdSay:{//小鸟说的话
			a:"参与就有机会赢大奖哦~(互动)"			//互动页
			,b:null
			,c:"大奖互动马上开始，请看电视提示，摇一摇立即参与"		//弹幕
			,d:null
			,e:"游戏已经结束了,下一轮即将开始"	//超时
			,f:"大奖互动马上开始，请看电视提示，摇一摇立即参与"		//弹幕
			,g:null
			,h:'距离下一次大奖来袭还有<br><label class="info_a"></label>请看电视提示哦'		//弹幕倒计时
			,i:'参与就有机会赢大奖哦~（领奖）'	         //领奖页
			}
		,bkbl:{//边看边聊
			a:"大奖时刻马上开始，请看电视注意屏幕提示"	//页面上方的提示
		}
		,button:{//按钮上的文字
			a:"点我看大奖"
			,b:"只领钱不说话"
			,c:"现在发表"
			,d:"点击领取"		//手机验证按钮
			,e:"立即使用"
			,f:"中奖通知"
			,g:"点击赞TA"		//点赞页面按钮文字
		}		
		,circle:{ //圆圈上的文字
			a:'超过100,000'
			,b:'位朋友和你一起玩电视'
		}
		,coin:{//金币大奖区页面
			a:PAGE.COMMON+'img/JBlogo.png' //爽币图标
		}
		,form:{ //手机验证模块
			a:"请输入正确的11位手机号"
			,b:"请输入手机号"
			,c:"请输入验证码"
			,d:"验证成功"
			,e:"发送验证太频繁，请稍后再试"
			,f:"当前用户已经绑定手机号"
			,g:"验证码已过5分钟有效期，请重新发送手机验证"
			,h:"用户信息或验证码错误"
			,i:"绑定失败"
			,j:"您的地址提交失败！"
			,k:"您的信息已提交成功"
			,l:"请您在72小时内完成信息登记，逾期视为放弃领奖。一经填写，不能修改，请仔细填写。"
			,m:"填写中奖信息"
			,n:"获奖感言"
			,o:"为保障您的中奖权益 ，请您成为"+PAGE.channelName+"频道注册会员，以便在必要时联系到您。安全声明：您的注册信息我们不会分享、透露给任何第三方服务商。"
			,p:"* 提示：超过72小时领取奖品，默认为自动放弃。"
		}
	,historyRank:{//历史榜单
			a:PAGE.FOLDER+'img/share_banner.jpg',//历史榜单banner图片	
		}
	,hjgy:{//获奖感言模块
		a:"哎哟你写的获奖感言太少了，最少也要写5个字吧"
		,b:"您的感言写太多了，写15个字就行哦！"
		,c:"您的获奖感言正在提交中"
		,d:"您的获奖感言提交成功"
		,e:"发送失败，请再次提交"
		,f:"请填写获奖感言"
		,g:"中大奖了，分享下中奖的心情"
		,h:null
		,i:'人品大爆发！竟然摇中<b>'
		,j:null
		,k:'泪牛满面！我赢得了<b>'
		,l:null
		,m:null
		,n:"参与全天摇一摇活动 赢得"
		}			
	,Interaction:{//金币大奖区页面
		a:'邀请您参与互动'
		,b:PAGE.FOLDER+'img/Interaction.png'		//吉祥物图片
		,c:PAGE.FOLDER+'img/Interactionb.jpg'		//banner图片
		,d:'大奖即将揭晓，要不要来一发？！即刻参与互动吧~'
		,e:'本轮放弃'								//关闭按钮文字
		,f:'立即参与'								//确定按钮文字
	}
	,jbrk:{//弹幕页面金币大奖区入口
		a:PAGE.COMMON+"img/JBbtn.png"   //点我进入金币大奖区：JBbtn.png    点我进入爽币大奖区：SBbtn.png 
	}	
	,kaijiang:{//开奖模块
		a:'大奖揭晓还有<label class="info_a"><b>0</b><b>0</b></label>秒<br> 玩家<b class="info_b">1</b> 现金<label class="info_c"><b>0</b></label>元<br><label class="deng">等你来领哦～玩家越多，奖池越大</label>'
		,b:'正在获取数据请稍后！'
		,c:"您的网络好像不太好，"+PAGE.mascot.name+"鸭梨山大联系不上服务器。"
		,d:"本次互动没有"+PAGE.unit+"奖励。"
		,e:"参与互动就有机会赢得大奖哦～"
	}	
	,keyword:"习近平|李克强|王岐山|妈的|操|傻逼|sb|SB|骗子|骗人" //弹幕过滤词以 ，分开	
	,linjiang:{//领奖模块
		a:"正在获取数据请稍后！"
		,b:"您的网络好像不太好，"+PAGE.mascot.name+"鸭梨山大联系不上服务器。"
		,c:"点击领奖"
		,d:"您已经领过奖了"
		,e:"排队的人太多，已将奖品放入您的奖品，请及时领取！"
		,f:"这个红包已经领过了！"
		,g:"这个卡券已经领过了！"
		,h:"手慢了，奖品都被抢光了<br>别气馁，再加油哦！"
		,i:'很遗憾<br>互动超时了，请继续关注节目'
		,j:'手慢了，奖品都被抢光了<br>别气馁，再加油哦！'
		,k:'很遗憾您答错了<br>正确答案是'
		,l:'本次互动没有'+PAGE.unit+'奖励。'
		,m:'恭喜您获得了'
	}		
	,prize:{
		a:"我的"+PAGE.unit
		}		
	,rank:{//总榜单
		a:PAGE.FOLDER+'img/share_banner.jpg',//榜单banner图片
		tab:{
			a:1,//每轮互动排行  0不显示，1显示
			b:1,//每轮现金大奖榜单 	 0不显示，1显示
			c:1//爽币抽奖榜单  0不显示，1显示
		}
	}
	,scroll:{
		a:"已经到最后一页了！"
	}		
	,share:{
		a:"邀请你一起来玩"+PAGE.channelName+"摇一摇"
		,b:"锁定"+PAGE.channelName+"频道"
		,c:"微信摇一摇"
		,d:"参与互动抽红包"
	}
	,shxx:{ //收货信息模块
		a:"您的信息提交成功"
		,b:"您的地址提交失败！"
		}
	,sjyz:{
		a:"短信已发送"
	}			
	,tishi:{ //页面上的异常提示
		a:"这里的网络好像不太好！"
		,b:"看看有谁在一起玩"
		,c:"本活动仅支持微信客户端哦"
		,d:"您的网络好像不太好，"+PAGE.mascot.name+"鸭梨山大联系不上服务器。"
		,e:'您的手机不支持摇晃'
		,f:"请输入正确的11位手机号码！"
	}	
	,units:{//单位	
		b:"我的"+PAGE.unit
		,c:"互动"+PAGE.unit
		,d:PAGE.unit+"使用说明"
		,e:"<div class='tt'><span>·</span> 成功参与互动即可获得"+PAGE.unit+"；</div><div class='tt'><span>·</span> "+PAGE.unit+"大奖区有丰富的奖品等着你，奖品不断更新，请随时关注；</div><div class='tt'><span>·</span> 使用"+PAGE.unit+"抽取心仪的奖品</div>"
		,f:"累计"+PAGE.unit
		,g:"今日获得"
		,h:"成功参与互动即可获得"+PAGE.unit+"；"
		,i:PAGE.unit+"大奖区有丰富的奖品等着你，奖品不断更新，请随时关注；"
		,j:"使用"+PAGE.unit+"抽取心仪的奖品"
		,k:PAGE.unit+"明细"
		,l:"<p>您还没有"+PAGE.unit+"进账，</p><p>快去参与互动赢取"+PAGE.unit+"吧！</p>"
		,m:"今日排名"
	}
}
,shareInfo:{ //分享文字
	title:"快来玩啊-https"
	,imgUrl:"http://q.cdn.mtq.tvm.cn/general/uploads/tvm2fabf1ff49f91c72/55a91c9d4ae5e14a2b7177a0/0d12ec0d61a7570d661fad673b0f6472.jpg"
	,link:PAGE.redirect.replace("/index.html","/fx.html")
	,desc:"现金大奖等着你，呼朋唤友抢红包啦"
	,fakeid:""
	,trigger:function (res){}
	,success:function (res){}
	,cancel:function (res){}
	,fail:function (res){}
	}
,sceneData:{} //场景上的容错数据
},SWITCH={licai:0,yue:0,shangcheng:1,fanxianmingxi:1,jingcai:0,userttdsb:0,tiwen:0},vars={id:0},广告组访问量=null,主页访问量=null
function createJS($src){
	var i=0,il=$src.length,str="";
	for(;i<il;i++){
		str+="<script src='"+$src[i]+"?cache='><\/script>"
		}
	document.write(str)	
	}
function instance($data){
	for(var i in $data){
		var k=i.split("_").join("."),v=$data[i];
		eval(k+"=v")
	};
	HOST.SOCKET="//yao-socket.yaotv.tvm.cn";
	CONFIG.chars.share={
		a:"邀请你一起来玩"+PAGE.channelName+"摇一摇"
		,b:"锁定"+PAGE.channelName+"频道"
		,c:"微信摇一摇"
		,d:"参与互动抽红包"
	}			
	CONFIG.chars.units={//单位	
		b:"我的"+PAGE.unit
		,c:"互动"+PAGE.unit
		,d:PAGE.unit+"使用说明"
		,e:"<div class='tt'><span>·</span> 成功参与互动即可获得"+PAGE.unit+"；</div><div class='tt'><span>·</span> "+PAGE.unit+"大奖区有丰富的奖品等着你，奖品不断更新，请随时关注；</div><div class='tt'><span>·</span> 使用"+PAGE.unit+"抽取心仪的奖品</div>"
		,f:"累计"+PAGE.unit
		,g:"今日获得"
		,h:"成功参与互动即可获得"+PAGE.unit+"；"
		,i:PAGE.unit+"大奖区有丰富的奖品等着你，奖品不断更新，请随时关注；"
		,j:"使用"+PAGE.unit+"抽取心仪的奖品"
		,k:PAGE.unit+"明细"
		,l:"<p>您还没有"+PAGE.unit+"进账，</p><p>快去参与互动赢取"+PAGE.unit+"吧！</p>"
		,m:"今日排名"
	}
	CONFIG.chars.linjiang={//领奖模块
		a:"正在获取数据请稍后！"
		,b:"您的网络好像不太好，"+PAGE.mascot.name+"鸭梨山大联系不上服务器。"
		,c:"点击领奖"
		,d:"您已经领过奖了"
		,e:"排队的人太多，已将奖品放入您的奖品，请及时领取！"
		,f:"这个红包已经领过了！"
		,g:"这个卡券已经领过了！"
		,h:"手慢了，奖品都被抢光了<br>别气馁，再加油哦！"
		,i:'很遗憾<br>互动超时了，请继续关注节目'
		,j:'手慢了，奖品都被抢光了<br>别气馁，再加油哦！'
		,k:'很遗憾您答错了<br>正确答案是'
		,l:'本次互动没有'+PAGE.unit+'奖励。'
		,m:'恭喜您获得了'
	}
	CONFIG.chars.form={ //手机验证模块
		a:"请输入正确的11位手机号"
		,b:"请输入手机号"
		,c:"请输入验证码"
		,d:"验证成功"
		,e:"发送验证太频繁，请稍后再试"
		,f:"当前用户已经绑定手机号"
		,g:"验证码已过5分钟有效期，请重新发送手机验证"
		,h:"用户信息或验证码错误"
		,i:"绑定失败"
		,j:"您的地址提交失败！"
		,k:"您的信息已提交成功"
		,l:"请您在72小时内完成信息登记，逾期视为放弃领奖。一经填写，不能修改，请仔细填写。"
		,m:"填写中奖信息"
		,n:"获奖感言"
		,o:"为保障您的中奖权益 ，请您成为"+PAGE.channelName+"频道注册会员，以便在必要时联系到您。安全声明：您的注册信息我们不会分享、透露给任何第三方服务商。"
		,p:"* 提示：超过72小时领取奖品，默认为自动放弃。"
		}
	CONFIG.chars.tishi={ //页面上的异常提示
		a:"这里的网络好像不太好！"
		,b:"看看有谁在一起玩"
		,c:"本活动仅支持微信客户端哦"
		,d:"您的网络好像不太好，"+PAGE.mascot.name+"鸭梨山大联系不上服务器。"
		,e:'您的手机不支持摇晃'
		,f:"请输入正确的11位手机号码！"
	}
	CONFIG.chars.prize={a:"我的"+PAGE.unit}
	CONFIG.chars.kaijiang.c="您的网络好像不太好，"+PAGE.mascot.name+"鸭梨山大联系不上服务器。";	
	CONFIG.chars.kaijiang.d="本次互动没有"+PAGE.unit+"奖励。";
	PAGE.redirect=PAGE.redirect;
	CONFIG.shareInfo.link=PAGE.redirect.replace("/index.html","/fx.html");
	PAGE.yanzheng=0
//	PAGE.menu.d!=""&&(PAGE.mascot.word.push({img:PAGE.menu.d,"activeimg":PAGE.menu.d,txt:"",link:"javascript:goUrl('share')"}));
//	PAGE.menu.b!=""&&(PAGE.mascot.word.push({img:PAGE.menu.b,"activeimg":PAGE.menu.b,txt:"",link:"javascript:goUrl('coin')"}));
//	PAGE.menu.c!=""&&(PAGE.mascot.word.push({img:PAGE.menu.c,"activeimg":PAGE.menu.c,txt:"",link:"javascript:goUrl('rwzq')"}));
//	PAGE.menu.a!=""&&(PAGE.mascot.word.push({img:PAGE.menu.a,"activeimg":PAGE.menu.a,txt:"",link:"javascript:goUrl('home')"}));
//	!CONFIG.chars.hjgy.h&&(CONFIG.chars.hjgy.h="耶！摇中<b>1元红包</b>，一元也是爱，快来参与"+PAGE.channelName+"频道摇一摇")
//	!CONFIG.chars.hjgy.j&&(CONFIG.chars.hjgy.j='元大红包</b>，快来参与'+PAGE.channelName+'频道摇一摇')
//	!CONFIG.chars.hjgy.l&&(CONFIG.chars.hjgy.l='</b>大奖，快来参与'+PAGE.channelName+'频道摇一摇')
	!CONFIG.chars.hjgy.m&&(CONFIG.chars.hjgy.m="太爽了！我在"+PAGE.channelName+"频道")
}	
mainVar={userInfo:null,ele:{},game:{},module:{},mainData:{},times:{},adData:{},sceneData:{},mzArr:[],location:{gps:"0,0",region:"0-0-0-0",adcode:0,cache:1},network:"default"}
function noUser(){
	tishi("未获取您的身份，需要重新进入",{fun:function(){
		location.replace(PAGE.redirect)
		}});
	}
function setStorage(type,key,val){
	var a=type,b=key+PAGE.yyyappid,c=val||'',storage = window.localStorage; 
	switch(a){
		case "set":	
		b&&storage.setItem(b,c);
		break
		case "get":	
		if(b)return storage.getItem(b);
		break
		case "remove":	
		b&&storage.removeItem(b);
		break
		case "clear":	
		storage.clear();
		break
	}
}
