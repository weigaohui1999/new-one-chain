<template>
  <div class="upload" v-loading="loading">
    <van-form @submit="onSubmit" class="page-form">
      <van-cell-group class="page-form-group">
        <van-cell title="基本信息" title-class="tc" />
        <van-field
          v-model="newName"
          readonly
          name="name"
          label="申报人员"
          required
          :rules="[{ required: true }]"
        />
        <van-field
          value="身份证"
          readonly
          name="identityType"
          label="证件类型"
          required
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="newIdCard"
          readonly
          name="idcardNo"
          label="证件号码"
          required
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="newPhone"
          readonly
          name="linkPhone"
          label="联系电话"
          required
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="info.applyObj.address"
          name="linkAddress"
          label="联系地址"
          rows="1"
          autosize
          type="textarea"
          required
          placeholder="请填写联系地址"
          :rules="[{ required: true }]"
        />
      </van-cell-group>
      <van-cell-group class="page-form-group">
        <van-cell title="办件材料" title-class="tc" />
        <van-cell :border="false">
          <template #default>
            <van-notice-bar
              left-icon="volume-o"
              text="证照功能仅限省内用户调取，且当前业务存在证照相关材料时可用。"
            />
          </template>
        </van-cell>
        <van-cell v-for="(item, index) in stuff" :key="index">
          <van-cell
            :border="false"
            :title="index + 1 + '.' + item.resourceName"
          />
          <van-field
            :border="false"
            class="no-padding-field"
            :rules="[
              {
                required: true,
                message: `请提交${item.resourceName}相关材料`,
              },
            ]"
          >
            <template #input>
              <van-uploader
                v-model="item.update"
                :after-read="
                  (f) => {
                    afterRead(f, item, index);
                  }
                "
                :before-read="beforeRead"
              />
              <van-button
                type="info"
                size="mini"
                v-if="authCards.length"
                @click="openAuth(index)"
                >选取证照</van-button
              >
            </template>
          </van-field>
        </van-cell>
      </van-cell-group>
    </van-form>
    <van-button
      style="margin-top: 10px; width: 100%"
      type="info"
      native-type="submit"
      @click="onSubmit"
      >提交</van-button
    >
    <van-action-sheet
      v-model="showAuth"
      :actions="authCards"
      :description="newName + '的证照清单'"
      cancel-text="取消"
      safe-area-inset-bottom
      @select="setAuthCode"
    />
  </div>
</template>

<script src="./_upload.js" lang="js"></script>
<style src="./_upload.less" lang="less" scoped></style>
