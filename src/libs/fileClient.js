class FileClient {
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

  //1,先将base64转换为blob
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  //2,再将blob转换为file
  blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date(); // 文件最后的修改日期
    theBlob.name = fileName; // 文件名
    return new File([theBlob], fileName, {
      type: theBlob.type,
      lastModified: Date.now(),
    });
  }

  //压缩方法
  dealImage(base64, w, callback) {
    var newImage = new Image();
    var quality = 0.6; //压缩系数0-1之间
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", "Anonymous"); //url为外域时需要
    var imgWidth, imgHeight;
    newImage.onload = function () {
      imgWidth = this.width;
      imgHeight = this.height;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
          canvas.width = w;
          canvas.height = (w * imgHeight) / imgWidth;
        } else {
          canvas.height = w;
          canvas.width = (w * imgWidth) / imgHeight;
        }
      } else {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        quality = 0.6;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
      var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句

      callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
    };
  }
}

export default new FileClient();
