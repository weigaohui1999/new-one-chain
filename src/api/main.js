import RGApi from "./service";
import utils from "@/libs/utils";

import { Notify } from "vant";
import md5 from "@/static/util/md5";

export const getSign = (data) => {
  return RGApi.request({
    method: "post",
    url: process.env.VUE_APP_API_SIGNURL,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getGate = async (key, params, header = {}) => {
  const data = defaultParams(key, params, header);
  try {
    const res = await getSign(data);
    data["sign"] = res.data.sign;
    return RGApi.request({
      method: "post",
      url: process.env.VUE_APP_API_GATEURL,
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error) {
    Notify({ type: "warning", message: "验签未通过，请稍后重试！" });
  }
};

export const gateFile = async (key, params) => {
  //  配置赣服通参数
  const data = defaultParams(key, {}, {});
  const fd = new FormData();
  //  将数据依次计入FormData数据
  Object.keys(data).forEach((item) => {
    fd.append(item, data[item]);
  });
  fd.append("file", params);
  //  获取赣服通签名
  try {
    const res = await getSign(fd, {
      "Content-Type": "multipart/form-data",
    });
    fd.append("sign", res.data.sign);
    return RGApi.request({
      method: "post",
      url: process.env.VUE_APP_API_GATEURL,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    Notify({ type: "warning", message: "验签未通过，请稍后重试！" });
  }
};

export const getGateV4 = async (key, params, option = {}) => {
  const optionObj = defaultParamsV4(key);
  let param = Object.assign({}, optionObj, params);
  try {
    return await RGApi.request({
      method: "post",
      url: process.env.VUE_APP_API_GATEURL_v4,
      data: { param: JSON.stringify(param) },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error) {
    Notify({ type: "warning", message: "验签未通过，请稍后重试！" });
  }
};

const defaultParamsV4 = (key) => {
  return {
    from: 3,
    key: key,
    requestTime: Date.now(),
    sign: md5("fcsgft" + Date.now()),
  };
};

const defaultParams = (key, params, header) => {
  return {
    app_id: "fcsgpsx",
    interface_id: key,
    version: process.env.VUE_APP_VERSION,
    charset: "UTF-8",
    timestamp: Date.now(),
    origin: utils.iswxorapipay()[2],
    biz_content: JSON.stringify(params),
    header: JSON.stringify(header),
  };
};
