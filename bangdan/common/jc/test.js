










mainVar.userInfo={"openid":"onC35t8Ycb-r3arg9XAK58ehTF3Y","nickname":"%E5%BB%96%E5%BF%97%E9%98%B3","weixin_avatar_url":"http%3A%2F%2Fwx.qlogo.cn%2Fmmopen%2FbnkRWEqVUN4l4JfVia5EgicT4aibciavDzKECLKeuSSRnia727PsVAzXHicn2XIE6QpZjIvcbmRlWNcmI1qg8EIfd7rzSkfqJ21wLY","province":"Beijing","sig":"ad163e1a0ca067839afff6ea3dca385f","sex":1,"country":"beijing","city":"beijing","sigExpire":1459019323}



http://cj.mtq.tvm.cn/open/syslottery/user/result?lotteryid=56f6e75bb304e803134066e51459021703968&yyyappId=wx33dc1a5264b4e846&code=ad163e1a0ca067839afff6ea3dca385f&openId=onC35t8Ycb-r3arg9XAK58ehTF3Y&sigExpire=1459019323&icon=undefined&name=%E5%BB%96%E5%BF%97%E9%98%B3&sex=1&country=CN&province=Beijing&city=Chaoyang

if(setStorage("get","userInfo")){
	mainVar.userInfo=JSON.parse(setStorage("get","userInfo"));
};
var _socket=new setSocket({url:"http://"+HOST.SOCKET+"/chat",room:"create"+PAGE.token,onmessage:function($data){
	var data=JSON.parse($data)
	console.log(data)
	console.log(decodeURIComponent(data.data.message)+" "+decodeURIComponent(data.data.sender.nickName))
}})	
