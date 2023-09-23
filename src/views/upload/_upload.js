// @vue/component
import { storage } from "@/libs/plugin";
import utils from "@/libs/utils";
import { Dialog, Notify } from "vant";
import { getGate, getGateV4 } from "@/api/main";
import config from "@/static/data/config";
import fileClient from "@/libs/fileClient";

export default {
  name: "Upload",

  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      loading: false,
      show: false,
      chainDetail: {},
      orgCode: "",
      isDisabled: false,
      formData: "",
      xmmc: "",
      ywbz: "",
      //办件名和机构名，
      bjm_jgm: [],
      html: "",
      isTy: false,
      info: {
        flowId: "",
        selectItem: [],
        // 服务对象，0 企业；1 个人
        serviceObj: "1",
        dataId: "YiLianTongYongYeWuBiaoDan",
        applyObj: {
          name: storage.get("name"),
          sex: storage.get("sex") === "1" ? "男" : "女",
          address: null,
          certNo: storage.get("idCard"),
          certType: "DZZZ_CERTIFTYPE",
          phone: storage.get("phone"),
          // 是否代办 0 否； 1 是
          isAgent: "0",
          agentName: "",
          agentAddress: "",
          agentEmail: "",
          agentCertNo: "",
          agentCertType: "",
          agentPhone: "",
        },
        material: [],
        emsInfo: {
          // 1 邮寄, 0 自取
          isEms: "0",
          emsName: "",
          emsAddress: "",
          emsPhone: "",
          emsAcceptPostCode: "",
          provinceName: "",
          cityName: "",
          countyName: "",
          sendName: "",
          sendPhone: "",
          sendAddress: "",
        },
      },
      // 所需材料
      // 图片对应的材料
      stuff: [],
      update: [],
      material: [],
      authCards: [],
      showAuth: false,
      authKey: "",
    };
  },

  computed: {
    Notify() {
      return Notify;
    },
    newName() {
      return utils.getName(storage.get("name")) || "";
    },
    newIdCard() {
      return utils.getIdCord(storage.get("idCard")) || "";
    },
    newPhone() {
      return utils.getPhone(storage.get("phone")) || "";
    },
  },

  watch: {},

  created() {
    this.renderData();
    this.getAuthCode();
  },

  methods: {
    renderData() {
      this.chainDetail = storage.get("chainDetail");
      this.orgCode = this.chainDetail.itemArray[0].orgCode;
      this.xmmc = this.chainDetail.flowName;
      this.ywbz = this.chainDetail.itemArray[0].itemName;
      this.bjm_jgm.push(this.chainDetail.flowName);
      this.bjm_jgm.push(this.chainDetail.itemArray[0].orgName);
      this.info.flowId = this.chainDetail.flowId;
      this.renderItem();
    },
    renderItem() {
      const itemArray = this.chainDetail.itemArray;
      let resArr = [];
      itemArray.forEach((item, index) => {
        let obg = {};
        obg.itemId = itemArray[index].itemId;
        this.info.selectItem = this.chainDetail.selectItem;
        item.resourceArray.forEach((i, idx) => {
          resArr = itemArray[index].resourceArray[idx];
          resArr.itemId = itemArray[index].itemId;
          resArr.itemCode = itemArray[index].itemCode;
          this.stuff.push(resArr);
        });
      });
      //获取表单ui
      this.getFormUi();
    },
    async getFormUi() {
      const res = await getGateV4(config().main.getFormUI, {
        formId: this.chainDetail.formId,
      });
      if (this.chainDetail.formId == "YiLianTongYongYeWuBiaoDan") {
        this.isTy = true;
      }

      if (res.code == 0) {
        res.msg.match(/<td[/\s/\S]*?>[/\s/\S]*?<\/td>/g);
        res.msg.match(/<input[/\s/\S]*?>/g);
        res.msg.match(/<input[/\s/\S]*?>[\u4e00-\u9fa5]{0,}/g).join("");
        this.html = res.msg;
      }
    },
    getInput() {
      const inputs = document.querySelectorAll("input");
      let obj = {};
      inputs.forEach((v, k) => {
        if (v.type == "text") {
          obj[v.id] = v.value;
        } else if (v.type == "checkbox" && v.checked) {
          obj[v.id] = v.value;
        }
      });
      this.formData = obj;
    },
    async getAuthCode() {
      try {
        const res = await getGate(config().interface_id.ACZRYZ, {
          service_item_code: "360981-000201056000-XK-435-01-01",
          service_item_name: "特种作业操作证的发证",
          identity_number: storage.get("idCard"),
          operator: {
            account: "js_abc",
            name: "特种作业操作证的发证",
            identity_num: storage.get("idCard"),
            role: config().region.name,
            service_org_code: "12360926MB03850436",
            service_org: config().region.name,
            division: config().region.name,
            division_code: config().region.code,
          },
        });
        if (res && res.code == 200) {
          let result = JSON.parse(res.data);
          result.data.data.forEach((item, index) => {
            item["auth_code"] = result.data.auth_codes[index];
          });
          this.authCards = result.data.data.map((item) => {
            let obj = {
              more: { ...item },
              name: item.name,
              subname: item.issue_org_name,
              auth_codes: item.auth_code,
            };
            return obj;
          });
          console.log(this.authCards);
        } else {
          this.$notify({
            type: "warning",
            message: "证照获取失败，请稍后重试！",
          });
        }
      } catch (e) {
        console.log(e);
        this.$notify({ type: "danger", message: "证照获取异常，请稍后重试！" });
      }
    },
    async setAuthCode(item) {
      try {
        this.loading = true;
        const interface_id = config().interface_id.DZZZSJ;
        const res = await getGate(interface_id, {
          _servicecode: "20230706102117",
          _token: "ade111cf5ba81006c5f026be0582992d",
          _orgId: "001",
          _refuladdress: "archive",
          authCode: item.auth_codes,
        });
        if (res && res.code == 200) {
          this.loading = false;
          this.showAuth = false;
          let result = JSON.parse(res.data);
          this.convertPdfToImage(result.data.data.file_data).then((res) => {
            res.forEach((it) => {
              let metail = this.stuff[this.authKey];
              let result = {
                data: {
                  FILE_NAME: metail.name,
                  FILE_PATH: item.auth_codes,
                  DOCUMENT_ID: metail.code,
                  DOCUMENT_NAME: metail.name,
                  DOCUMENT_CODE: metail.code,
                  FILE_AUTH_CODE: item.auth_codes,
                  TYPE: "3",
                },
                content: it,
                file: fileClient.dataURLtoBlob(it),
                message: "上传完成",
                status: "done",
              };
              metail.update.push(result);
            });
          });
        } else {
          this.loading = false;
          this.$notify({
            type: "warning",
            message: "证照归档异常，未获取到电子证照文件实体数据!",
          });
        }
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.$notify({ type: "danger", message: "证照归档异常，请稍后重试！" });
      }
    },
    openAuth(key) {
      this.showAuth = true;
      this.authKey = key;
    },
    async afterRead(fileObj, item, index) {
      fileObj.status = "uploading";
      fileObj.message = "上传中...";
      try {
        const { data } = await getGateV4(config().main.upload, {
          base64: fileObj.content,
          fileName: item.resourceName + ".jpg",
        });
        if (data && data.code == "0000") {
          // res.data = JSON.parse(res.data);
          fileObj.status = "done";
          fileObj.message = "上传完成";
          let stuff = this.stuff[index];
          // console.log(res.data);
          let result = {
            resourceCode: stuff.resourceCode,
            resourceType: stuff.resourceType,
            fileName: stuff.resourceName,
            filePath: data.filePath,
            itemId: stuff.itemId,
            itemCode: stuff.itemCode,
            fileType: "1",
          };
          fileObj.data = result;
        } else {
          fileObj.status = "failed";
          fileObj.message = "上传失败";
        }
      } catch (e) {
        console.log(e);
        fileObj.status = "failed";
        fileObj.message = "上传失败";
      }
    },
    beforeRead(file) {
      return new Promise((resolve) => {
        fileClient.blobToBase64(file, (base64) => {
          fileClient.dealImage(base64, 2000, (newBase64) => {
            const blob = fileClient.dataURLtoBlob(newBase64);
            const newFile = fileClient.blobToFile(blob, file.name);
            resolve(newFile);
          });
        });
      });
    },
    async convertPdfToImage(pdfUrl) {
      pdfUrl = "data:application/pdf;base64," + pdfUrl;

      const pdf = await pdfjs.getDocument(pdfUrl).promise;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      let imgs = [];
      // 循环遍历每一页pdf，将其转成图片
      for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
        // 获取pdf页
        const page = await pdf.getPage(i);

        // 获取页的尺寸
        const viewport = page.getViewport({ scale: 1 });

        // 设置canvas的尺寸
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // 将pdf页渲染到canvas上
        await page.render({ canvasContext: context, viewport: viewport })
          .promise;
        imgs.push(canvas.toDataURL("image/png"));
      }
      return Promise.resolve(imgs);
    },
    //办件数量添加
    async bjadd(name, organization) {
      await getGateV4(config().main.add, {
        name: name,
        organization: organization,
      }).then((res) => {
        console.log(res);
      });
    },
    //申报信息提交后保存返回值
    localSto(v) {
      // const getItem=JSON.parse(window.localStorage.getItem('jdk'));
      let getItem = window.localStorage.getItem("selectStatus");
      const arr = [];
      // console.log(getItem===''||getItem===null);
      if (getItem === "" || getItem === null) {
        arr.push(v);
        // console.log(getItem);
        window.localStorage.setItem("selectStatus", JSON.stringify(arr));
      } else {
        getItem = JSON.parse(getItem);
        getItem.push(v);
        // console.log(getItem);
        window.localStorage.setItem("selectStatus", JSON.stringify(getItem));
      }
    },
    async onSubmit() {
      let materials = [];
      this.stuff.forEach((item) => {
        item.update.map((it) => {
          materials.push(it.data);
        });
      });
      this.info.material = materials;
      this.loading = true;
      // 获取dataId
      const res = await getGateV4(config().main.declare, {
        enterprise: this.info,
      });
      if (res.code === 0) {
        this.localSto(res.data.receiveId);
        //办件量添加
        this.bjadd(this.bjm_jgm[0], this.bjm_jgm[1]);
        this.loading = false;
        Dialog.alert({
          title: "提交成功",
          message: `请截图或者复制保存, 可根据业务表示查看办件状态, 业务标识为：${res.data.bizId}`,
          theme: "round-button",
          confirmButtonText: "返回首页",
        }).then(() => {
          this.$router.push("/home");
        });
      } else {
        this.loading = false;
        Notify({
          type: "ywu",
          message: "提交数据失败, 请稍后重试！",
        });
      }
      // this.getInput();
      // const res = await getGateV4(config().main.saveFormData, {
      //   formId: this.chainDetail.formId,
      //   orgCode: this.orgCode,
      //   formData: this.isTy
      //     ? JSON.stringify({
      //         XiangMuMingChen: this.xmmc,
      //         YeWuBeiZhu: this.ywbz,
      //       })
      //     : JSON.stringify(this.formData),
      // });
      // if (res.code == 0) {
      //   this.info.dataId = res.data.dataId;
      //   let materials = [];
      //   this.material.forEach((item) => {
      //     materials = materials.concat(item.update.map((it) => it.data));
      //   });
      //   const res = await getGateV4({
      //     enterprise: this.info,
      //   });
      //   if (res.code === 0) {
      //     this.localSto(res.data.receiveId);
      //     //办件量添加
      //     this.bjadd(this.bjm_jgm[0], this.bjm_jgm[1]);
      //     this.loading = false;
      //     Notify({
      //       type: "success",
      //       message: "提交成功, 即将返回首页",
      //     });
      //     await this.$router.push("/");
      //   } else {
      //     this.loading = false;
      //     Notify({
      //       type: "warning",
      //       message: "提交数据失败, 请稍后重试！",
      //     });
      //   }
      // } else {
      //   this.loading = false;
      //   Notify({
      //     type: "warning",
      //     message: "提交数据失败, 请稍后重试！",
      //   });
      // }
    },
  },

  destroyed() {
    storage.set("chainDetail", {});
  },
};
