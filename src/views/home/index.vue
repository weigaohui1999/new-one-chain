<template>
  <div class="home">
    <div class="header">
      <van-button plain size="small" class="bjbox" @click="toSchedule"
        >我的办件</van-button
      >
    </div>
    <div class="content">
      <div class="contbox">
        <div class="content-item" v-for="(item, index) in navList" :key="index">
          <div class="item-hd">
            <img :src="require(`@/static/image/${index}.png`)" alt="" />
            <div class="title-name">{{ item.flowName }}</div>
          </div>
          <div class="item-btn">
            <van-button
              size="small"
              @click="toDetail(item.flowId)"
              style="margin-right: 16px"
              >办事指南</van-button
            >
            <van-button size="small" @click="toApply(item.flowId)"
              >立即办理</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/static/data/config";
import userApi from "@/api/user";
import { getGate, getGateV4 } from "@/api/main";

export default {
  name: "Home",
  data() {
    return {
      navList: [],
    };
  },
  created() {
    this.getList();
    userApi.getUserInfo();
  },
  methods: {
    async getList() {
      try {
        this.loading = true;
        const res = await getGate(config().main.getScene, {
          regionCode: "360222000000",
          parentId: "0",
        });
        if (res.code == 200) {
          const { data } = JSON.parse(res.data);
          this.navList = data;
          console.log(data);
        } else {
          this.loading = false;
        }
      } catch (err) {
        this.loading = false;
        console.log("err", err);
      }
    },
    toSchedule() {
      this.$router.push("/schedule");
    },
    toDetail(flowId) {
      this.$router.push(`/detail/${flowId}`);
    },
    toApply(flowId) {
      this.$router.push(`/select/${flowId}`);
    },
  },
};
</script>
<style lang="less">
@import "./index";
</style>
