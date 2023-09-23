<script>
export default {
  name: "MyFooter",
  computed: {
    provider() {
      return process.env.VUE_APP_PROVIDER;
    },
  },
};
</script>

<template>
  <div class="rg-footer">
    <img src="@/static/image/index/gft.png" class="logo" alt="赣服通" />
    <p class="provider">{{ provider }}</p>
  </div>
</template>

<style scoped lang="less">
.rg-footer {
  height: 1.4359rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0.4692rem;
  background: transparent;
  .logo {
    width: 0.6154rem;
    height: 0.6154rem;
  }
  .provider {
    margin-top: 0.1538rem;
    font-size: 0.3077rem;
    color: #121212;
  }
}
</style>
