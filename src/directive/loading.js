// directive/loading/load.js
import Vue from "vue";
import Loading from "@/components/loading";

const Mask = Vue.extend(Loading);

const insertDom = (parent, el) => {
  parent.appendChild(el.mask);
};

const toggleLoading = (el, binding) => {
  if (binding.value) {
    //  防止部分元素未设置定位标准
    el.style.position = "relative";
    Vue.nextTick(() => {
      el.instance.visible = true; // 控制loading组件显示
      insertDom(el, el, binding); // 插入到目标元素
    });
  } else {
    el.instance.visible = false;
  }
};

const vLoading = {
  // bind(){}当绑定指令的时候出发
  bind: function (el, binding) {
    const mask = new Mask({
      el: document.createElement("div"),
      data() {},
    });
    el.instance = mask;
    el.mask = mask.$el;
    el.maskStyle = {};
    binding.value && toggleLoading(el, binding);
  },
  // update(){}当数据更新时候会触发该函数
  update: function (el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding);
    }
  },
  // unbind(){}解绑的时候触发该函数
  unbind: function (el) {
    el.instance && el.instance.$destroy();
  },
};

export default {
  install(Vue) {
    Vue.directive("loading", vLoading);
  },
};
