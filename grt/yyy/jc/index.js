var path="./yyy/jc/",cardDataPath,cardDataUrl;

document.write('\
<style>body{background:#fff}.button{border:1px solid #BFBFBF;border-radius:3px;background:#f6f6f6}#consloeImg{position:fixed;top:10px;left:10px;width:35px;z-index:100002}#consloeDiv td{padding:5px}</style>\
<script src="./common/jc/config_https.js"></script>\
<script src="./common/jc/xdTools-1.0.js"></script>\
<script src="'+path+'config.js"></script>\
<script src="'+path+'modules_https.js"></script>\
<script src="'+path+'program_https.js"></script>\
<script src="'+path+'testData.js"></script>\
<img src="img/a.png" id="consloeImg" style="display:none;">\
<div style="position:fixed;left:0px;top:10px;z-index:10000;background:#fff;display:none;z-index:100003" id="consloeDiv">\
<table border="0" cellspacing="0" cellpadding="0">\
  <tbody>\
    <tr>\
      <td>频道</td>\
      <td>\
      <input type="hidden" id="selectUrl" value="//q-cdn.mtq.tvm.cn/open/data/scene/a/9/564d846b17e6251c477e35a9.js" ></td>\
    </tr>\
 <tr>\
      <td>场景类型</td>\
      <td><select style="display:none;" id="selectModule" name="gameName" onChange="selectChange(this)">\
         <option index="0" value="570377b6f88cc003675c54dd" data="btv7_dati">BTV_生活答题</option>\
         <option index="1" value="57037814f88cc003675c54e4" data="btv7_dianzan">BTV_生活点赞</option>\
         <option index="2" value="57037709f88cc003675c54d5" data="btv_dati">BTV_剧场答题</option>\
         <option index="3" value="5703777cf88cc003675c54d7" data="btv_dianzan">BTV_剧场点赞</option>\
         <option index="4" value="5703787ff88cc003675c54f0" data="cctv15_dati">CCTV15_答题</option>\
         <option index="5" value="570378fbf88cc003675c54f5" data="cctv15_dianzan">CCTV15_点赞</option>\
         <option index="6" value="57b432519831f7e13f3940b0" data="ka">KA播控</option>\
         <option index="7" value="57b433369831f7e13f3940b4" data="zhitongche">直通车</option>\
		 </select><input type="hidden" id="adItem" value="default" ></td>\
    </tr>\
    <tr style="display:none">\
      <td>奖品类型</td>\
      <td><select id="prizeItem" name="prizeItem">\
        <option value="default">随线上</option>\
        <option value="hongbaoB">大奖红包</option>\
        <option value="hongbaoS">普通红包</option>\
        <option value="url3">第三方URL</option>\
        <option value="shiwuB">大奖实物</option>\
        <option value="kaquan_4">普通卡券</option>\
        <option value="kaquan_0">卡券组件</option>\
        <option value="kaquan_101">卡券微信</option>\
        <option value="kaquan_1">卡券话费</option>\
        <option value="kaquan_3">卡券第三方</option>\
        <option value="shiwuS">普通实物</option>\
        <option value="renwu">任务奖励</option>\
        <option value="wujiang">没有奖励</option>\
      </select></td>\
    </tr>  \
    <tr>\
      <td>金币奖励</td>\
      <td><input id="jingbiW" type="number" value="10" style="width:30px"></td>\
    </tr> \
    <tr>\
      <td><label id="button">互动时间</label></td>\
      <td><input type="text" name="gameTime" id="gameTime" value="60" style="width:50px"></td>\
    </tr>\
    <tr>\
      <td colspan="2" align="center"><input type="button" value="设置" onClick="location.search=Math.random()"><input type="button" value="取消"  id="consoleBut" ></td>\
      </tr>\
  </tbody>\
</table>\
</div>')
onload=function(){
var gameTime=document.getElementById("gameTime")
,button=document.getElementById("button")
,cdnIndex=+localStorage.getItem("channelName")||0
,moduleIndex=+localStorage.getItem("gameName")||0
,gameTimeCount=+localStorage.getItem("gameTime")||gameTime.value
,adItemIndex=+localStorage.getItem("adItem")||0
,prizeItemIndex=+localStorage.getItem("prizeItem")||0
,jingbiYW=+(jingbiW.value||localStorage.getItem("jingbiItem"))||0
,prizeModule="ceshi"//selectUrl.options[cdnIndex].parentNode.getAttribute("data")

,cdnConfig,adValue,moduleData
,prizeValue,dataP
;
selectUrl.selectedIndex=cdnIndex
,selectModule.selectedIndex=moduleIndex
,adItem.selectedIndex=adItemIndex
,prizeItem.selectedIndex=prizeItemIndex
,cdnConfig=selectUrl.value
,adValue=adItem.value
,moduleData=selectModule.value
,dataP=selectModule.selectedOptions[0].getAttribute("data");
prizeValue="hongbaoS"//prizeItem.value
var gameTag=Math.random()*100^0

if(setStorage("get","US")){
    var defaultData = document.getElementById("selectModule").querySelector('option[data='+setStorage("get","US").replace("?","").toLowerCase()+']');
    if(defaultData){
      moduleIndex=defaultData.getAttribute("index");
      selectModule.selectedIndex=moduleIndex;
      moduleData=selectModule.value
      dataP=defaultData.getAttribute("data");
    }
}

mainVar.config={
moduleData:moduleData
,momentTime:gameTime.value=gameTimeCount
,adValue:adValue
,adData:DSP[adItem.value]
}
cardDataPath="//qa-h5.mtq.tvm.cn/yao/yyy/data/"+dataP+"/",cardDataUrl=cardDataPath+"cardData.js";
setPrize()
localStorage.setItem("config",cdnConfig)
function changeAction(){
	var $t=this,name=$t.getAttribute("name"),value;
	switch(name){
		case "channelName":case "gameName":case "adItem":case "prizeItem":
			value=$t.selectedIndex;
			reload()
		break
		case "gameTime":
			value=$t.value;
			button.innerHTML="设置时间";
			button.className="button";
			button.onclick=reload;
		break
		case "jingbiItem":
			jingbiYW=value=$t.value;
			setPrize()
		break
		}
		localStorage.setItem(name,value)
	}
function setChange(){
	var i=0
	for(;i<arguments.length;i++){
		arguments[i].onchange=changeAction;
		}
	}
function reload(){
		setTimeout(function(){
			location.reload()
			},100)
}
function consoleDis(){
	consloeDiv.style.display=consloeDiv.style.display==="block"?"none":"block"
	}
function setPrize(){
	mainVar.config.prize=prizeValue=="default"?0:{status:"success",code:200,data:{userGainPrize:jiangpin[prizeValue],coinInfo:jingbiYW>0?{value:10}:null,showPrizes:jiangpin["showPrizes"]}}
	}
mainVar.peopleCount=10000+Math.random()*5003>>0;
mainVar.moneyCount=1900+Math.random()*600>>0;
setStorage("set","cardDataUrl",cardDataPath)
consloeImg.onclick=consoleBut.onclick=consoleDis;
setChange(selectUrl,selectModule,gameTime,adItem,prizeItem,jingbiYW);
//setStorage("set","userInfo",JSON.stringify({"city":"","nickname":"心动","ret":0,"openid":"o1xVoxH2wa2vr_I3Yu2onfRLlx3c","resTime":1440228050,"country":"","sig":"04c272269a4a32b689e29de30d7f0a70","status":"ok","errmsg":"","weixin_avatar_url":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM7SrVfYDxsA06My4y650joHhiaGpUDsJWGMWZQS3eccibFuKoS30pRdIwJmoiauCu1elQjicwjYulxJjw",sigExpire:1454559966,"sex":1,"province":"Beijing"}))
//setStorage("set","overTime",+new Date())
setJsonp(path+"action.js")
}