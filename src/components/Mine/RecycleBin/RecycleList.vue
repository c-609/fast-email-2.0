 <template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="回收站" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="content">
      <template v-for="(item,index) in msgList" class="content">
        <base-msg-cell
          :key="index"
          :title="item.title"
          :status="item.status"
          :content="item.content|ellipsis"
          :time="item.time"
          :top="false"
          @handleDelete="handleDelete(item)"
          @click="clickMsg(item)"
        ></base-msg-cell>
      </template>
    </div>
  </div>
</template>

<script>
import BaseMsgCell from "../../../common/BaseMsgCell";
import eventBus from "../../../util/eventBus";
export default {
  name: "RecycleList",
  components: {
    BaseMsgCell
  },
  data() {
    return {
      msgList: [
        {
          title: "title", //通知标题
          status: "weidu", // 通知状态或者未读人员比例
          content: "通知状态或者未读人员比例", // 通知内容
          time: "2019-8-9" // 时间
        },
        {
          title: "title1", //通知标题
          status: "weidu1",
          content: "nihao1", // 通知内容
          time: "2019-8-91" // 时间
        }
      ],
      msg: ""
    };
  },
  filters: {
    //内容长度大于8，用 ...代替其他内容
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 8) {
        return value.slice(0, 8) + "......";
      }
      return value;
    }
  },
  beforeDestroy() {
    eventBus.$emit("receiveMsgDetail", this.msg);
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //删除
    handleDelete(e) {
      alert(e.title);
    },
    //点击通知，查看详情
    clickMsg(e) {
      this.msg = e;
      this.$router.push("/receive_msg_detail");
    }
  }
};
</script>

<style scoped >
.content {
  margin-top: 44px;
}
.joinedGroup {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.van-nav-bar {
  background-color: #f6f6f6;
}
.header {
  border-bottom: 1px solid #d2d2d2;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
</style>