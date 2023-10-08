<template>
  <div class="home select">
    <div class="header" />
    <div class="content">
      <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        style="margin-bottom: 10px"
      >
        勾选需要办理的事项
      </van-notice-bar>

      <van-collapse v-model="collapse1">
        <van-collapse-item
          title="场景名称"
          name="0"
          :is-link="false"
          disabled
          :border="false"
        >
          {{ acceptDetail.flowName }}
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="collapse2">
        <van-collapse-item
          title="联办事项"
          name="1"
          :is-link="false"
          disabled
          class="sroll-auto"
          :border="false"
        >
          <van-checkbox-group v-model="selectItem" @change="getSelectItem">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in selectData"
                clickable
                :key="index"
                :title="item.itemName"
              >
                <template #right-icon>
                  <van-checkbox :name="item" ref="checkboxes" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
      </van-collapse>

      <van-button type="info" style="width: 100%" @click="toUpload"
        >立即办理</van-button
      >
    </div>
  </div>
</template>

<script src="./_select.js" lang="js"></script>
<style src="./_select.less" lang="less" scoped></style>
