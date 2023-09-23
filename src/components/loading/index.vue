<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Loading",
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<template>
  <div class="loading" v-show="visible" @touchmove.prevent>
    <div class="loading_main">
      <div class="loading_main_absolute">
        <div class="object object_four" />
        <div class="object object_three" />
        <div class="object object_two" />
        <div class="object object_one" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.loading {
  background-color: #00000056;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 10000;
  margin-top: 0px;
  top: 0px;
  left: 0;
  .loading_main {
    width: 100%;
    height: 100%;
    position: relative;
    .loading_main_absolute {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 200px;
      width: 200px;
      margin-top: -100px;
      margin-left: -100px;
      transform: rotate(-135deg);
      .object {
        border-radius: 50% 50% 50% 50%;
        position: absolute;
        border-top: 1px solid #fff;
        border-bottom: 1px solid transparent;
        border-left: 1px solid #fff;
        border-right: 1px solid transparent;
        animation: animate 2s infinite;
      }
      .object_one {
        left: 75px;
        top: 75px;
        width: 50px;
        height: 50px;
      }

      .object_two {
        left: 65px;
        top: 65px;
        width: 70px;
        height: 70px;
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }

      .object_three {
        left: 55px;
        top: 55px;
        width: 90px;
        height: 90px;
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }
      .object_four {
        left: 45px;
        top: 45px;
        width: 110px;
        height: 110px;
        -webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
      }
    }
  }
}
@-webkit-keyframes animate {
  50% {
    -ms-transform: rotate(360deg) scale(0.8);
    -webkit-transform: rotate(360deg) scale(0.8);
    transform: rotate(360deg) scale(0.8);
  }
}

@keyframes animate {
  50% {
    -ms-transform: rotate(360deg) scale(0.8);
    -webkit-transform: rotate(360deg) scale(0.8);
    transform: rotate(360deg) scale(0.8);
  }
}
</style>
