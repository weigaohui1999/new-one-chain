<template>
  <div class="home">
    <div class="header">
      <div class="tit">一件事 一次办</div>
      <div class="ftit">
        一表申请、一套材料、一次提交<br />
        一窗受理、一网通办
      </div>
      <van-button plain size="small" class="bjbox" @click="toSchedule"
        >我的办件</van-button
      >
    </div>
    <div class="content">
      <div class="contbox" v-if="navList.length > 0">
        <div class="contbox-item" v-for="(item, index) in navList" :key="index">
          <div class="list_i">
            <div class="list_i_tit w-e">
              <div class="tag">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACSVBMVEX/1D7/wjv/uyf/qhb/qRf/qBn/qBj/qBf/pxX/pRr/oxT/oRj/oBT/nhj/jxH/hB//gAP/ZSYAAAD/0Dj/xDb/qRj/qRf/qBf/pxf/pxb/pxX/phj/pxf/phj/pRn/rh3/qR3/qBn/qBj/qhf/qRv/qRj/qRf/qBf/pxj/qBf/qBf/pxf/pxf/qBf/pxf/pxf/pxb/pxf/pxb/qBb/qBb/qBf/pxb/qBf/pxb/pxb/pxb///////7//v7//v3//vz//vv//fr//fn//Pj//Pf/+vP/+vL/+fH/+fD/+e//9+v/9un/9uf/9eb/9eT/9eP/9OL/9OH/8tz/8dn/7tH/7Mv/68r/6MT/6ML/58D/5r7/5r3/5rz/5Ln/5Lj/47X/4a//4K//36v/3qj/3qf/3af/3ab/3KX/26D/2p7/2p3/2Zv/1pP/1Y//1I//04v/0or/z3//zn//znz/zX7/zXz/zHj/y3f/y3b/yXH/yXD/x23/xWj/xWb/xWX/w2L/w2H/w1//wl//wV3/wVv/wVj/wFv/vVD/vE//vE7/uUX/t0H/tj7/tj3/tTv/tDj/szb/szX/sjP/sTL/sTH/sTD/sC3/ryv/rin/rSf/rCT/rCH/qRz/qRv/qRr/qRn/qBr/qBn/qBj/qBf/pxj/pxf/pxb/pxX/phb/phX/phT/phP/phL/phH/pRL/pRH/pRD/pQ//pBD/pA//pA7/pA3/pAz/ow7/ow3/owz/owv/owr/ogv/ogr/ogn/ogj/ogf/oQf/oQbUP6ohAAAAO3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAgICAgICAgICAwMDBRIWICEhITlPUGZolpi/v8TN0NTe4eb7/Pz9/q6LfqYAAAM6SURBVHja7dfLbhtVHMfx3/9c7NhNnGSc+hLsUFouQkLsKlnd8Bo8hK20hMKCFwAVkCvnGfoYbFh1AaQipQGhKsSOnTi+X8aXOReEVCly5LHCeNNFPtsz53tmNKOR/uR0I2bDNjIhKSTbxXU8NZ7yppUt6rDROjk9bDaz0ciX+3lc337++5FbjrcRo00Ta2SiX+9by5C/7nYYovx3buV2h5EjWnfX9kqW+ez2axgq/NB/7ShKtjPOF8WH+P+KD3/sVBw+3Ih/FWg/csVHzyd1Hs5+U9pFILnS3i89lg5jCeE0W3lcKiCgQunxCuOwCMyCMwmGwBgkk1iKFFe+PwVOWEBZcbmOPBg9m113qDeRfgmr4IQ6amZZzFwgo3/pxN3WeAJBc84Opb2jiRN3yS9A+OmIrW3vpLdtXc0mPOPEOue/Vdqj+GeJCc0PKOfwV4t+9SCZTd2LNyYeJP6jjQgl2KvzcnUAiMrh569D8wM22rbCMKuqp9H49p1Uym0JAN6teO/895NWEyBuGTou83sEWGhrAMZct/witZP4cOiRTR3/cVruAhzGKhDslCzNBq7SmrgZHx+v/X0/7G3+/LIOELcab5DFJeb3wgxxMTg4iq8cP68LQVZpzCXgx2qEpo0V2Xe5tvAlsIABAQYaCzBcw03gJnATuAm8tQFNfgHLIAiLcfCIpfkB1t+KeEwy+CLOFbbC1uevzPsfDQ5bE4DD2Dlnk7YaW9lPa9InAN57kG1UTs81SCjMIEYKiKWzqfcbFn4BUC16/5PaxUn9TIG4BejNnRujsbGV2UnGulUJ/wCkKvNb7zz48+L0pK0QVhpkGdMKkfTO7Y9lc9gliUUBcA57YTc/GNaq/7RakNYIq1adzLvJuHsGSRJX0DPMoQ0Pr8tXte57d0buS566t9GceiRwyTdwycN6bDwdkliVXtMIwny8kvNb4aPuaMqgB31XcL/9T5nBPnwIKThAUsoFowvzsBSPeTAIzMBjGoTACJqNnxRKCKhUeDJmtQmWMKlxbV7sFXMIorj77dmAJ7uRg0fFXLCxr99ILD94bpq1i8xqoNF3UEl02fLDt9ONmjVeDzD+J3Sfuev/AlxAeNb64v7TAAAAAElFTkSuQmCC"
                  alt=""
                />
                {{ item.title }}
              </div>
              <van-button @click="toDetail(item.flowId)">立即办理</van-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <van-empty description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script>
import { getGateV4 } from "@/api/main";
import config from "@/static/data/config";
import userApi from "@/api/user";
import { storage } from "@/libs/plugin";

export default {
  name: "Home",
  data() {
    return {
      navList: [],
    };
  },
  created() {
    this.getList();
    userApi.getUserInfo(() => {
      this.userVisits();
    });
  },
  methods: {
    async userVisits() {
      try {
        let date = storage.get("date") || 0;
        let nowDate = new Date().getTime();
        if (nowDate - date > 3600000) {
          await getGateV4(config().main.visit, {
            idCard: storage.get("idCard"),
            name: storage.get("name"),
            type: "",
            typeName: "一链办专区",
          });
          storage.set("date", nowDate);
        }
      } catch (e) {
        console.log("err", e);
      }
    },
    async getList() {
      try {
        const res = await getGateV4(config().main.getScene, {
          regionCode: "360981000000",
          parentId: "0",
        });
        if (res.data.state == 200) {
          for (let item of res.data.info) {
            let obj = {};
            obj.title = item.flowName;
            obj.flowId = item.flowId;
            this.navList.push(obj);
          }
        }
      } catch (e) {
        console.log(e);
        this.$notify({ type: "danger", message: "拉取数据失败！" });
      }
    },
    toSchedule() {
      this.$router.push("/schedule");
    },
    toDetail(flowId) {
      this.$router.push(`/detail/${flowId}`);
    },
  },
};
</script>
<style lang="less">
@import "./index";
</style>
