class config {
  fileUrl = "http://10.193.10.30:8090/WebDiskServerDemo/doc";
  organCode = "5267b0f20ffa47d68f7a7054aab8e41c";
  abilityCode = "0272a09bed4140f2844579aacf01ef4f";
  region = {
    code: "360222000000",
    name: "浮梁县行政服务中心",
  };
  interface_id = {
    // 按持证人用证
    ACZRYZ: "fcsaczryz",
    // 电子证照数据
    DZZZSJ: "fcshqzjzsj",
  };
  jumpToEvaluate = {
    abilityCode: this.abilityCode,
    appName: process.env["VUE_APP_NAME"],
    appCode: process.env["VUE_APP_PAKEAGE"],
  };
  accessBuriedPoint = {
    abilityCode: this.abilityCode,
    appType: "1",
  };
  handlingBuriedPoint = {
    abilityCode: this.abilityCode,
    appType: "1",
    itemType: "2",
    matterType: "2",
  };

  main = {
    // 获取场景导航
    getScene: "flx_yjs_hqcjdh",
    // 根据链条叶子节点获取情形分组
    getGroup: "flx_yjs_gjltyzjdhqqxfz",
    // 获取申报信息
    getDeclareDetail: "flx_yjs_hqsbxx",
    // 获取获取办事指南信息
    getHandbook: "flx_yjs_hqbsznxx",
    // 查询办件状态
    selectStatus: "flx_yjs_cxbjzt",
    // 查询字典
    selectLibrary: "flx_yjs_cxzdxx",
    // 查询表单id
    selectFromId: "flx_yjs_cxbdy",
    // 查询是否选择前置事项
    selectPrecondition: "flx_yjs_cxsfxzqzsx",
    // 查询用户办件记录
    selectRecord: "flx_yjs_cxyhbjjl",
    // 查询用户办理事项记录
    selectTransactRecord: "flx_yjs_cxyhblsxjl",
    // 业务提交
    declare: "flx_yjs_tjsbxx",
    // 上传
    upload: "jdzgftfjsc",
    // 电子证照
    // 上传电子证照
    authUploader: "e68b06d013844d958a08bad00c14f52b",
    // 查询电子证照列表
    authList: "a067cd180744475d9054b0fad9434727",
    //获取表单id
    getFormInfo: "d08b23d1e742483ab983b9167c814b4b",
    //通过表单id获取表单ui
    getFormUI: "986a3f177f804cfe8f430b04db61205f",
    //提交表单数据获取dataId
    saveFormData: "0bed80fdde5248a5af129aa8afe7b406",

    // 下载
    download: "1b3f77fe26084e679add3b6d69c081ba",
    // 事项详情
    promise: "b610ab6046ac4ad5902abecc0a21faa8",
    // 电子证照
    papers: "5d1ba7fcb5ff40448b392a4504c03efb",

    // 监测平台
    //  新增访问量
    visit: "221921906b0c49b185060fba778b16b6",
    //  办件数据添加
    add: "92936b0dc50b4ea9948cad471e4cf6cf",
  };

  getJumpToEvaluate = () => {
    return {
      ...this.jumpToEvaluate,
      organCode: this.organCode,
      regionCode: this.region.code,
      regionName: this.region.name,
    };
  };

  getAccessBuriedPoint = () => {
    return {
      ...this.accessBuriedPoint,
      deptName: this.region.name,
      deptMark: this.region.code,
      organCode: this.organCode,
    };
  };

  getHandlingBuriedPoint = (commitUserType, submitResultStatue) => {
    return {
      ...this.handlingBuriedPoint,
      deptName: this.region.name,
      deptMark: this.region.code,
      organCode: this.organCode,
      commitUserType,
      submitResultStatue,
    };
  };
}

export default () => {
  return new config();
};
