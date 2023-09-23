import RGApi from "./service";
import utils from "@/libs/utils";
import { Notify } from "vant";
import { storage } from "@/libs/plugin";

export default {
  getUserInfo(callback) {
    const token = storage.get("token");
    if (token) return;

    const ticket = utils.GetRequest().auth_token;
    const appid = utils.GetRequest().appid;
    RGApi.request({
      method: "get",
      url: process.env.VUE_APP_API_USERURL,
      params: {
        ticket,
        appid,
      },
    }).then((res) => {
      if (res && res.succ) {
        storage.set("token", res.token);
        storage.set("name", res.data.name);
        storage.set("idCard", res.data.cardid);
        storage.set("phone", res.data.mobile);
        storage.set("sex", res.data.sex);
        storage.set("appid", appid);
        callback && callback();
      } else {
        Notify({ type: "warning", message: res.msg });
      }
    });
  },
  getToken(url) {
    RGApi.request({
      method: "post",
      url: process.env.VUE_APP_API_TOKENURL,
      data: {
        token: storage.get("token"),
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      if (res.result) {
        window.location.href =
          url + `?appid=${storage.get("appid")}&auth_token=${res.ticket}`;
      } else {
        Notify({
          type: "warning",
          message: "用户身份已过期，请稍后重新访问此应用！",
        });
      }
    });
  },
};
