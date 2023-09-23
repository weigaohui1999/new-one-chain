class UtilsClient {
  //  校验数据类型
  typeOf(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }
  //  url
  GetRequest() {
    const url = decodeURI(window.location.search);
    const theRequest = new Object();
    if (url.indexOf("?") != -1) {
      const str = url.substr(1);
      const strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
    }
    return theRequest;
  }
  // 1 PC 2 APP 3 支付宝小程序 4 微信小程序
  iswxorapipay() {
    let ua = window.navigator.userAgent;
    let payEnv;
    // 判断微信还是支付宝
    if (/MicroMessenger/.test(ua)) {
      // 微信
      payEnv = ["4", "13", "3"]; //"weixin";
    } else if (/AlipayClient/.test(ua)) {
      // 支付宝
      payEnv = ["3", "14", "2"]; //"alipay";
    } else {
      payEnv = ["2", "01", "1"]; //"H5";
    }
    return payEnv;
  }
  getNowTime() {
    let dateTime;
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    let ss =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
    dateTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    return dateTime;
  }
  getNowLongTime() {
    let dateTime = this.getNowTime();
    return new Date(dateTime.replace(new RegExp("-", "gm"), "/")).getTime();
  }

  getStr(beginLen, endLen, max = 999) {
    // 这里用了闭包，闭包用完后需手动释放内存
    return function (str) {
      const firstStr = str.substr(0, beginLen);
      const lastStr = endLen == 0 ? "" : str.substr(endLen);
      let repeatNum = Math.max(0, str.length - (beginLen + Math.abs(endLen)));
      repeatNum = Math.min(max, repeatNum);
      const middleStr = "*".repeat(repeatNum);
      return firstStr + middleStr + lastStr;
    };
  }
  getName(str) {
    let getResult = null;
    getResult = this.getStr(0, -1);
    const result = getResult(str);
    getResult = null; // 闭包-需手动释放
    return result;
  }
  getIdCord(id) {
    let getResult = null;
    getResult = this.getStr(0, -4);
    const idCard = getResult(id);
    getResult = null; // 闭包-需手动释放
    return idCard;
  }
  getPhone(phone) {
    let getResult = null;
    getResult = this.getStr(3, -4);
    const tel = getResult(phone);
    getResult = null; // 闭包-需手动释放
    return tel;
  }
  /**
   * file或blob转base64
   * @param {*} blob file或者blob
   * @param {*} callback function (data)通过参数获得base64
   */
  blobToBase64(blob, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      callback(reader.result);
    });
    reader.readAsDataURL(blob);
  }
  /**
   * base64转file
   * base64格式：data:image/png;base64,iVBORw0KGgoAAAANSU...
   * @param {*} dataURL base64编码数据
   * @param {*} filename 文件名称
   */
  dataURLToFile(dataURL, filename) {
    const arr = dataURL.split(","),
      mime = arr[0].match(/:(.*?);/)[1], //mime类型 image/png
      bstr = atob(arr[1]); //base64 解码

    let n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
    //return new Blob([a8arr], {type: mime});
  }
  //  注册路由
  register(item, router, root) {
    if (item.children && item.children.length) {
      item.children.forEach((it) => {
        this.register(it, router, root);
      });
    } else {
      item.component = require(`@/views${item.component}.vue`).default;
      router.addRoute(root, item);
    }
  }
}

export default new UtilsClient();
