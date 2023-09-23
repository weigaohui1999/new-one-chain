<template>
  <div class="schedule">
    <van-search show-action v-model="search" placeholder="请输入业务标识">
      <template #action>
        <van-button
          icon="search"
          type="info"
          size="small"
          :disabled="!detail"
          round
          @click="handleSearch()"
        />
      </template>
    </van-search>
    <div class="main">
      <div v-if="!isEmpty">
        <van-cell-group style="margin-bottom: 10px">
          <van-cell title="业务名称" :border="false" />
          <van-cell :value="detail.applySubject" />
          <van-cell title="受理时间" :value="detail.acceptTime" />
          <van-cell
            title="整体办理状态"
            :value="detail.status | detailStatus"
          />
        </van-cell-group>
        <van-cell-group
          v-for="(item, index) in detail.info"
          :key="index"
          style="margin-bottom: 10px"
        >
          <van-cell :title="'关联子事项' + (index + 1)" :border="false" />
          <van-cell :title="item.itemName" :value="item.status | itemStatus" />
          <van-cell title="受理时间" :value="item.receiveTime" />
          <van-cell title="办结时间" :value="item.proTime" />
        </van-cell-group>
      </div>
      <div v-else>
        <van-empty description="暂无数据" style="height: 100%" />
      </div>
    </div>
  </div>
</template>

<script src="./_schedule.js" lang="js"></script>
<style src="./_schedule.less" lang="less" scoped></style>
