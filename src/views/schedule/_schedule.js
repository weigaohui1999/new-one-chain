// @vue/component
import { getGateV4 } from "@/api/main";
import config from "@/static/data/config";
import { Notify } from "vant";

export default {
  name: "Schedule",

  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      search: "",
      isEmpty: true,
      detail: {},
    };
  },

  computed: {},
  filters: {
    detailStatus(val) {
      var str = "";
      switch (val) {
        case "01":
          str = "待预审";
          break;
        case "05":
          str = "不予受理";
          break;
        case "11":
          str = "在办";
          break;
        case "99":
          str = "办结";
          break;
      }
      return str;
    },
    itemStatus(val) {
      var str = "";
      switch (val) {
        case "10":
          str = "未办";
          break;
        case "11":
          str = "未受理";
          break;
        case "12":
          str = "已受理";
          break;
        case "99":
          str = "已办";
          break;
      }
      return str;
    },
  },
  watch: {},

  created() {},

  methods: {
    handleSearch() {
      this.getUserBusRecord();
    },
    async getUserBusRecord() {
      try {
        const { data } = await getGateV4(config().main.selectStatus, {
          bizId: this.search,
        });
        if (data.state == 200) {
          this.isEmpty = false;
          this.detail = data;
        } else {
          this.isEmpty = true;
          Notify({
            type: "warning",
            message: "查询数据失败, 请输入合理的数据！",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
