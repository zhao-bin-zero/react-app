import { DOWNLOADAPPURL, AGREEMENTRELATED, pinyin } from './constant'

// 设置cookies
/**
 * @param 
        *      name: 名字
        *      value: 
        *      expires: 过期时间 单位天
        *      path
 */
export const setCookie = ({ name, value, expires = 30, domain = getDomain(), path = '/', secure }) => {

    let cookieText = "";
    cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);

    // expires
    let oDate = new Date();
    oDate.setTime(oDate.getTime() + (expires * 24 * 60 * 60 * 1000));
    cookieText += "; expires=" + oDate.toGMTString();

    // path
    cookieText += "; path=" + path;
    cookieText += "; domain=" + domain;
    if (secure) {
        cookieText += "; secure";
    }
    document.cookie = cookieText;
}
// 获取cookies
export const getCookie = (name) => {
    let cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = "";
    if (cookieStart > -1) {
        let cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
}
// 删除cookie
export const delCookie = ({ name, domain, path, secure }) => {
    let value = '';
    let expires = Date(0)
    setCookie({ name, value, expires, domain, path, secure });
}



// 上传图片base64
// 返回64位imgCode
export const fileImgUploadBase = (e) => {
    return new Promise((reslove) => {
        // 利用fileReader对象获取file
        let file = e.target.files[0];
        let filesize = file.size;
        let filename = file.name;
        // 2,621,440   2M
        if (filesize > 2101440) {
            // 图片大于2MB
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            let imgcode = e.target.result;
            reslove(imgcode)
        };
    })
}
// 判断url是否含有参数
export const setUrlParam = (url) => {
    if (url.split('?').length == 1) {
        return url + '?'
    } else {
        return url + '&'
    }
}

const isAndriod = () => {
    let bIsAndroid = navigator.userAgent.toLowerCase().match(/android/i) == "android";
    return bIsAndroid;
}
const isWindows = () => {
    let np = navigator.platform;
    return ((np == "Win32") || (np == "Windows"))
}
const isIOS = () => {
    return /like Mac OS X/.test(navigator.userAgent);
}
const isWX = () => {
    let userAgent = navigator.userAgent;
    return (/MicroMessenger/gi.test(userAgent));
}

//js 加法计算
//调用：accAdd(arg1,arg2)
//返回值：arg1加arg2的精确结果
export const accAdd = (arg1, arg2) => {
    let r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return ((arg1 * m + arg2 * m) / m).toFixed(Math.max(r1, r2));
}

//js 减法计算
//调用：subtr(arg1,arg2)
//返回值：arg1减arg2的精确结果
export const subtr = (arg1, arg2) => {
    let r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(Math.max(r1, r2));
}

//js 乘法函数
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
export const accMul = (arg1, arg2) => {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//js 除法函数
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
export const accDiv = (arg1, arg2) => {
    let t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

//js 余数函数
//调用：accRem(arg1,arg2)
//返回值：arg1%arg2的精确结果
export const accRem = (arg1, arg2) => {
    let t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return ((r1 * Math.pow(10, t2)) % (r2 * Math.pow(10, t1))) / Math.pow(10, t2 + t1);
}

const padLeftZero = (str) => {
    return ('00' + str).substr(str.length)
}
// 格式化时间
export const formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}
//Guid
export const new_guid = () => {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

// 深拷贝
export const deepCopy = (obj) => {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

// 复制text到剪切板
export const copyText = (text) => {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = 'fixed'
    textArea.style.background = 'transparent';
    textArea.style.boxShadow = 'none';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        let successful = document.execCommand('copy');
        let msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
        console.log(msg);
    } catch (err) {
        console.log('该浏览器不支持点击复制到剪贴板,请手动复制');
    }

    document.body.removeChild(textArea);
}

