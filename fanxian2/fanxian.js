function cashback() {
    var targetDom = document.querySelector('.container'),
        tDomH = targetDom.offsetHeight,
        domP = document.createElement("div"),
        domPheight = 0,
        dom = document.createElement("div"),
        data = '',
        dataLen = 0,
        i = 0,
        html = "";
    domP.className = "listP";
    domP.appendChild(dom);
    targetDom.appendChild(domP);
    domPheight = domP.offsetHeight;

    //滚动加载
    domP.onscroll = function() {
        var domH = dom.offsetHeight;
        var sTop = domP.scrollTop;
        //console.log(domH);
        if (domH - domPheight - sTop <= 0) {
            getData();
        }
    };

    getData();
    //获取数据，并设置
    function getData() {
        var domCon = document.createElement("div");
        var fxAjax = setAjax('get', 'http://q-cdn.mtq.tvm.cn/wtopic/jssdk/354e6b14b65b79ad_yue.js?cha=1470725917341');
        fxAjax.send(null);
        fxAjax.callBack = function($data) {
            var getD = JSON.parse($data).data;
            var type = '',
                hitime, 
                timeCount = new contrast_time;
            dataLen = getD.length;
            //拼接html结构
            for (; i < dataLen; i++) {
                type = getD[i].type;
                hitime = +getD[i].create_timestamp;
                if (type == '7') {
                    html += '<div class=\"list\"><img src=\"' + getD[i].headimg + '\">';
                    html += '<div class=\"listRight\"><div class=\"listRightCon clearfix\">';
                    html += '<p class=\"top\"><span>' + getD[i].nickname + '</span><span>返现' + getD[i].money + '元</span></p>';
                    html += '<p class=\"down\"><span>' + '商城购物' + '</span><span>' + timeCount.fn(hitime, getD[i].update_time) + '</span></p>';
                    html += '</div></div></div>';
                }
            }
            domCon.innerHTML = html;
            dom.appendChild(domCon);
        };
    }

}

//ajax 方法
function xmlObj() {
    try {
        return (new ActiveXObject("Msxml2.XMLHTTP") || new ActiveXObject('Microsoft.XMLHTTP'))
    } catch (e) {
        return new XMLHttpRequest()
    }
}

function setAjax(a, b, c, d, e) {
    return new function() {
        var t = this,
            errRun = 0;
        t.method = a || "get";
        t.action = b;
        t.async = (c != undefined ? c : true);
        t.cache = d || 0;
        t.callBack = (typeof(e) == "function" ? e : 0)
        t.data = "";
        t.Data = "";
        t.Open = t.Send = t.Test = t.Over = Function;
        t.Err = function() {
            xmlhttp = null
        }
        t.send = function(xmlCache) {
            var xmlhttp = xmlObj()
            xmlhttp.open(t.method, t.action, t.async);
            t.set && t.set.call(xmlhttp);
            if (t.method.toUpperCase() == "POST") {
                if (!t.set) xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8; text/html");
            } else {
                if (t.cache) {
                    var c = "cache=" + Math.random();
                    c = (t.action.indexOf("?") != -1 ? "&" : "?") + c;
                    t.action += c
                }
                t.data = null
            }

            function err() {
                t.stop();
                if (errRun) return;
                errRun = 1;
                typeof(t.err) === "function" && t.err()
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200 || xmlhttp.status === 304) {
                        t.err = null
                        if (t.callBack) t.callBack.call(xmlhttp, xmlhttp.responseText); //responseXML responseText
                        xmlhttp = null;
                    } else {
                        xmlhttp = null;
                        err()
                    }
                }
            }
            xmlhttp.send(t.data);
            t.stop = function() {
                xmlhttp && xmlhttp.abort()
            }
            setTimeout(function() {
                if (t.err) err()
            }, 15000)
        };
    }
}

function contrast_time() {
    var t = this,
        now = +new Date,
        arr = formatTime("Y-M-D-h-m-s", now).split('-'),
        yy = arr[0],
        mm = arr[1],
        dd = arr[2],
        todayend = +new Date(yy + '/' + mm + '/' + dd + ' 23:59:59') //计算当前结束时间时间戳
        ,
        st = todayend - now; //计算当天当前时间到当天完时间长
    t.fn = function(a, b) {
        var _ = now - a,
            bool = (st + _) < 86400000;
        if (_ <= 60000) return '刚刚';
        else if (bool) {
            if (_ < 3600000) return t.mfl(_ / 60000) + '分钟前';
            else return t.mfl(_ / 3600000) + '小时前';
        } else return b;
    }
    t.mfl = function(e) {
        return Math.floor(e);
    }
}
var timeStr = setItem("$Y;Y;$M;M;$D;D;$h;h;$m;m;$s;s");

function B(num) {
    return +num < 10 ? "0" + num : num
}

function formatTime(fra, $time, $type) {
    var date = new Date($type ? {
        "Unix": $time * 1000,
        "UTC": $time - 288e5
    }[$type] : $time);
    if (!date.getTime()) return null;
    var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        m2 = date.getMinutes(),
        s = date.getSeconds();
    var obj = timeStr,
        temp = obj,
        str2 = "",
        dataStr = "",
        data = {
            Y: y,
            $Y: y.toString().substr(2),
            $M: B(m),
            M: m,
            $D: B(d),
            D: d,
            $h: B(h),
            h: h,
            $m: B(m2),
            m: m2,
            $s: B(s),
            s: s
        };
    switch (fra) {
        case "toUTC":
            with(date) dataStr = Date.UTC(getFullYear(), getMonth(), getDate(), getHours(), getMinutes(), getSeconds())
            break
        case "toUnix":
            dataStr = +date / 1000 ^ 0
            break
        default:
            for (var i = 0, il = fra.length, t; i < il;) {
                str = fra.charAt(i)
                if (temp = temp[str]) {
                    str2 += str;
                    if (temp.end) {
                        dataStr += data[str2];
                        str2 = "";
                        temp = obj
                    }
                } else {
                    temp = obj;
                    str2 = "";
                    dataStr += str
                }
                i++
            }
            break
    }
    return dataStr
}

function setItem($c, $k, $o) {
    var k = $k || ";",
        sl = $c.length,
        i = 0,
        o = $o || {},
        it = o,
        t
    for (; i < sl; i++) {
        t = $c.charAt(i)
        if (t !== k) {
            if (it[t]) {
                it = it[t];
                it.tag = $k;
            } else {
                it = it[t] = {};
                it.tag = $k;
            }
        } else {
            it.end = true;
            it = o;
        }
    }
    it.end = true
    return o
}