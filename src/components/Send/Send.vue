<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="发出" @click-right="onClickRight" fixed>
        <van-icon class-prefix="my-icon" name="edit" slot="right" color="#191f25" size="18" />
      </van-nav-bar>
    </div>
    <div class="content">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search v-model="search" placeholder="请输入搜索关键词" shape="round" class="search"></van-search>
      <template v-for="(item,index) in MsgList">
        <base-msg-cell
          :key="index"
          :title="item.title"
          :read="item.readNum"
          :all="item.number"
          :content="item.content|ellipsis"
          :time="item.time"
          statusRed="red"
          :remove="false"
          :top="false"
          @click="clickMsg(item)"
        ></base-msg-cell>
      </template>
    </van-pull-refresh>
    <van-loading color="#1989fa" class="load" v-show="show_loading" />
    <span class="msg" v-show="show_msg">暂无任何通知</span>
  </div>
  </div>
</template>

<script>
import eventBus from "./../../util/eventBus";
import BaseMsgCell from "./../../common/BaseMsgCell";
import { getSendingMsg } from "../../api/message";
export default {
  components: {
    BaseMsgCell
  },
  data() {
    return {
      show_msg: false,
      show_loading: true,
      isLoading: false,
      search: "",
      msgList: "",
      MsgList: "",
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
    eventBus.$emit("sendMsgDetail", this.msg);
  },
  created() {
    var _this = this;
    setTimeout(function() {
      _this.getMsg();
    }, 500);
  },
  computed: {
    tables() {
      const search = this.search;
      if (search) {
        return this.msgList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.msgList;
    }
  },
  watch: {
    tables() {
      this.MsgList = this.tables;
      if (this.MsgList == "") {
        this.show_msg = true;
      } else {
        this.show_msg = false;
      }
    }
  },
  methods: {
    getMsg() {
      let userId = localStorage.getItem("userId");
      getSendingMsg(userId).then(res => {
        if (res.data.code == 0) {
          this.msgList = res.data.data;
          this.show_loading = false;
        }
      });
    },
    onRefresh() {
      let userId = localStorage.getItem("userId");
      getSendingMsg(userId)
        .then(res => {
          if (res.data.code == 0) {
            this.msgList = res.data.data;
            this.isLoading = false;
            this.$notify({
              type: "primary",
              message: "刷新成功",
              duration: 500
            });
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$notify({ type: "danger", message: "刷新成功", duration: 500 });
        });
    },
    //编辑通知
    onClickRight() {
      this.$router.push("/edit_msg");
    },
    //删除
    handleDelete(e) {
      alert(e.title);
    },

    //置顶
    handleTop(e) {
      alert("置顶");
    },

    //点击通知，查看详情
    clickMsg(e) {
      this.msg = e;
      this.$router.push("/send_msg_detail");
    }
  }
};
</script>

<style scoped>
.search {
  margin-top: 44px;
}
.van-nav-bar {
  background: #f6f6f6;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.load {
  position: fixed;
  top: 50%;
  margin-top: -20px;
  left: 50%;
  margin-left: -20px;
}
.msg {
  position: fixed;
  top: 50%;
  margin-top: -30px;
  left: 50%;
  margin-left: -42px;
  color: #969799;
  font-size: 14px;
}
.content{
  margin-bottom: 52px;
}
 

</style>