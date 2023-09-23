// @vue/component
import { getGateV4 } from "@/api/main";
import config from "@/static/data/config";
import { storage } from "@/libs/plugin";

export default {
  name: "Detail",

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
    async getItemId() {
      try {
        const { data } = await getGateV4(config().main.getGroup, {
          flowId: this.chainId,
        });
        if (data.state == 200) {
          const selectItem = [];
          data.info.forEach((v) => {
            this.itemIdList.push(v.items[0].itemId);
            selectItem.push({
              itemId: v.items[0].itemId,
              caseId: v.statusId,
              dataId: "",
            });
          });
          this.selectItem = selectItem;
          this.getChainDetail();
        } else {
          this.loading = false;
        }
      } catch (e) {
        this.loading = false;
        console.log("err", e);
      }
    },
    async getChainDetail() {
      try {
        const { data } = await getGateV4(config().main.getDeclareDetail, {
          flowId: this.chainId,
          selectItem: this.itemIdList,
        });
        if (data.state == 200) {
          this.info = data.info;
          this.info.selectItem = this.selectItem;
          this.getAcceptDetail();
          this.loading = false;
        } else {
          this.loading = false;
        }
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    async getAcceptDetail() {
      try {
        const { data } = await getGateV4(config().main.getHandbook, {
          flowId: this.chainId,
        });
        if (data.state == 200) {
          this.acceptDetail = data.info;
        } else {
          this.loading = false;
        }
      } catch (e) {
        this.loading = false;
      }
    },
    toUpload() {
      storage.set("chainDetail", this.info);
      this.$router.push("/upload");
    },
  },
};
