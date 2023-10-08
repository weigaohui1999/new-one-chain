// @vue/component
import { getGate } from "@/api/main";
import config from "@/static/data/config";
import { storage } from "@/libs/plugin";
import { Notify } from "vant";

export default {
  name: "Select",

  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      loading: false,
      info: {},
      activeName: null,
      flowId: "",
      selectItem: [],
      selectData: [],
      collapse1: ["0"],
      collapse2: ["1"],
      acceptDetail: {},
    };
  },

  computed: {},

  watch: {},

  created() {
    if (this.$route.params.flowId) {
      this.flowId = this.$route.params.flowId;
      this.getChainId();
    }
  },

  methods: {
    async getChainId() {
      try {
        this.loading = true;
        const res = await getGate(config().main.getGroup, {
          flowId: this.flowId,
        });
        if (res.code == 200) {
          const { data } = JSON.parse(res.data);
          console.log(data);
          this.acceptDetail = data;
          this.renderSelectData();
        } else {
          this.loading = false;
        }
      } catch (err) {
        this.loading = false;
        console.log("err", err);
      }
    },
    renderSelectData() {
      let obj = [];
      this.acceptDetail.info.forEach((it, idx) => {
        if (it.items.length > 0) {
          obj.push(...it.items);
        }
      });
      this.selectData = obj;
    },
    getSelectItem(obj) {
      this.selectItem = obj;
    },
    toUpload() {
      if (this.selectItem.length > 0) {
        let selectItem = [];
        this.selectItem.forEach((i) => {
          selectItem.push(i.itemId);
        });
        storage.set("flowObj", {
          flowId: this.flowId,
          selectItem: selectItem,
        });
        this.$router.push(`/upload`);
      } else {
        Notify({ type: "warning", message: "请选择最少一种要办理的事项" });
      }
    },
  },
};
