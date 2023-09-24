// @vue/component
import { getGateV4 } from "@/api/main";
import config from "@/static/data/config";

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
      chainId: "",
      itemIdList: [],
      selectItem: [],
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
        const { data } = await getGateV4(config().main.getScene, {
          regionCode: "360981000000",
          parentId: this.flowId,
        });
        if (data.state == 200) {
          this.chainId = data.info[0].flowId;
          this.getItemId();
        } else {
          this.loading = false;
        }
        // console.log(data);
      } catch (err) {
        this.loading = false;
        console.log("err", err);
      }
    },
  },
};
