//首次访问弹窗
$(function(){
    var t = document.createElement("a");
    t.href = document.referrer;
    var msgTitle = t.hostname;
    var name = t.hostname.split(".")[1];
    if("" !== document.referrer){
        switch (name) {
            case 'bing':
                msgTitle = '必应搜索';
                break;
            case 'baidu':
                msgTitle = '百度搜索';
                break;
            case 'so':
                msgTitle = '360搜索';
                break;
            case 'google':
                msgTitle = '谷歌搜索';
                break;
            case 'sogou':
                msgTitle = '搜狗搜索';
                break; 
            default:
                msgTitle =  t.hostname;
        }
    };
    var time = (new Date).getHours();
    var msg = '';
    23 < time || time <= 5 ? msg = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？":
    5< time && time <= 7 ? msg = "早上好！一日之计在于晨，美好的一天就要开始了！":
    7< time && time <= 11 ? msg = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！":
    11< time && time <= 14 ? msg = "中午了，工作了一个上午，现在是午餐时间！":
    14< time && time <= 17 ? msg = "午后很容易犯困呢，今天的运动目标完成了吗？":
    17< time && time <= 19 ? msg = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~":
    19< time && time <= 21 ? msg = "晚上好，今天过得怎么样？":
    21< time && time <= 23 && (msg = "已经这么晚了呀，早点休息吧，晚安~");
    $.ajax({
        type:"get", 
        url:"https://api.gmit.vip/Api/UserInfo",  
        data:{type:'json'},
        async:true,   
        success:function(data){
            layer.msg("Hi~ 来自"+ data.data.location+'~<br/>Hi~ 从'+msgTitle+'来的朋友！<br/>使用 '+ data.data.os +"<br/>"+ data.data.browser +' 访问本站！' + '<br/>' + msg);
        }
    }); 
});
if (sessionStorage.getItem("popCookieWindow") != "0") {
    setTimeout(function () {
        Snackbar.show({
            text: '本站使用Cookie和本地/会话存储保证浏览体验和网站统计',
            pos: 'bottom-right',
            actionText: "查看博客声明",
            onActionClick: function (element) {
                window.open("/license")
            },
        })
    }, 3000)
}
//不在弹出Cookie提醒
sessionStorage.setItem("popCookieWindow", "0");

//自带上文浏览器提示

function browserTC() {
    btf.snackbarShow("");
    Snackbar.show({
        text: '浏览器版本较低，网站样式可能错乱',
        actionText: '关闭',
        duration: '6000',
        pos: 'bottom-right'
    });
}
function browserVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
    var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
    var isOpera = userAgent.indexOf("Opera")>-1 || userAgent.indexOf("OPR")>-1 ; //Opera浏览器
    var isChrome = userAgent.indexOf("Chrome")>-1 && userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Chrome浏览器
    var isSafari = userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Chrome")==-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Safari浏览器
    if(isEdge) {
        if(userAgent.split('Edge/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isFirefox) {
        if(userAgent.split('Firefox/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isOpera) {
        if(userAgent.split('OPR/')[1].split('.')[0]<80){
            browserTC()
        }
    } else if(isChrome) {
        if(userAgent.split('Chrome/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isSafari) {
        //不知道Safari哪个版本是该淘汰的老旧版本
    }
}
//2022-10-29修正了一个错误：过期时间应使用toGMTString()，而不是toUTCString()，否则实际过期时间在中国差了8小时
function setCookies(obj, limitTime) {
    let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toGMTString()
    for (let i in obj) {
        document.cookie = i + '=' + obj[i] + ';expires=' + data
    }
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
if(getCookie('browsertc')!=1){
    setCookies({
        browsertc: 1,
    }, 1);
    browserVersion();
}
