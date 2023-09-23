<template>
  <div class="detail" v-loading="loading">
    <div v-if="Object.keys(info).length !== 0">
      <div class="header">
        <div class="tit">{{ info.flowName }}</div>
        <div class="ftit">
          一表申请、一套材料、一次提交<br />
          一窗受理、一网通办
        </div>
      </div>
      <div class="item-box">
        <van-cell-group class="item">
          <van-cell title="受理窗口" :value="acceptDetail.acceptWindow" />
          <van-cell title="部门" :value="acceptDetail.orgNames" />
          <van-cell title="时限" :value="acceptDetail.limit + '个工作日'" />
          <van-cell title="客服电话" :value="acceptDetail.linkPhone" />
          <van-cell
            title="是否收费"
            :value="acceptDetail.isFare == 1 ? '是' : '否'"
          />
          <van-cell title="办事地点" :border="false" />
          <van-cell :value="acceptDetail.handleTimePlace" />
        </van-cell-group>
        <div v-for="(item, index) in info.itemArray" :key="index" class="item">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item
              title="关联事项"
              :label="item.itemName"
              :is-link="false"
              :name="'no' + index"
              title-class="title"
              disabled
            />
            <van-collapse-item title="申请条件" :name="index">
              <p v-for="(c, ic) in item.condition" :key="ic">{{ c.name }}</p>
            </van-collapse-item>
            <van-collapse-item title="申报材料" :name="index">
              <van-cell
                class="no-x-padding"
                v-for="(m, im) in item.resourceArray"
                :key="im"
                :title="im + 1 + '.' + m.resourceName"
              />
            </van-collapse-item>
          </van-collapse>
        </div>
        <van-button type="info" @click="toUpload">下一步</van-button>
      </div>
    </div>
    <div v-else class="empty">
      <van-empty description="暂无数据" />
    </div>
  </div>
</template>

<script src="./_detail.js" lang="js"></script>
<style src="./_detail.less" lang="less" scoped>
.no-value {
  background: #2c3e50;
  .van-collapse-item__wrapper {
    background: #2c3e50;
    .van-collapse-item__content {
      display: none !important;
    }
  }
}
</style>
