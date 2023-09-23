class config {
  fileUrl = "http://10.193.10.30:8090/WebDiskServerDemo/doc";
  organCode = "5267b0f20ffa47d68f7a7054aab8e41c";
  abilityCode = "0272a09bed4140f2844579aacf01ef4f";
  region = {
    code: "360981000000",
    name: "丰城市行政服务中心",
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
    getScene: "a4459441a5ab440c9031f58d476b9ea8",
    // 根据链条叶子节点获取情形分组
    getGroup: "7b5c57501efb433692e66ccdc798a263",
    // 获取申报信息
    getDeclareDetail: "7c65b82f40494fdd85e0fdbca05af660",
    // 获取获取办事指南信息
    getHandbook: "6f222d047e08493eb60762a3763e9584",
    // 查询办件状态
    selectStatus: "6bd3cc4ae23b4adda6a5c5c4619c4eb3",
    // 查询字典
    selectLibrary: "c855cb86c9ff445ca4c1abfe9a5f0146",
    // 查询表单id
    selectFromId: "9b137b276bf14ddcaffc136d3ef66b4a",
    // 查询是否选择前置事项
    selectPrecondition: "52d40c049f34443787a9c7a8f1603e6c",
    // 查询用户办件记录
    selectRecord: "e4295f622ccc43709dfcf711043d89de",
    // 查询用户办理事项记录
    selectTransactRecord: "e6ac12b646244987b32b565c594b1736",
    // 业务提交
    declare: "a94a4c03dec74d628f9aacc4968a07e0",
    // 上传
    upload: "179985651a4a43aea1c1e1e41d24d0f1",
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
