<template>
  <div class="home">
    <div class="header">
      <van-button plain size="small" class="bjbox" @click="toSchedule"
        >我的办件</van-button
      >
    </div>
    <div class="content">
      <div class="contbox">
        <van-cell-group v-for="(item, index) in navList" :key="index" border>
          <van-cell :title="item.name" is-link @click="toApply(item)">
            <template #icon>
              <img :src="item.img" alt="" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/static/data/config";
import userApi from "@/api/user";
import { getGateV4 } from "@/api/main";

export default {
  name: "Home",
  data() {
    return {
      navList: config().dataList,
      // navList: [],
    };
  },
  created() {
    this.getList();
    userApi.getUserInfo();
  },
  methods: {
    toSchedule() {
      this.$router.push("/schedule");
    },
    async getList() {
      try {
        const res = await getGateV4(config().main.getScene, {
          regionCode: "360222000000",
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

    // toDetail(flowId) {
    //   this.$router.push(`/detail/${flowId}`);
    // },
    toApply(item) {
      this.$router.push(`/select/${item.flowId}`);
    },
  },
};
</script>
<style lang="less">
@import "./index";
</style>
