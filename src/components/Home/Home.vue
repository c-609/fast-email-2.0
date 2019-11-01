<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-tabs
        v-model="tab"
        sticky
        swipeable
        :border="false"
        animated
        :line-height="2"
        color="#3296fa"
      >
        <van-tab>
          <div slot="title">
            新到通知
            <span style="display:inline; color:#ff943e">{{receiveNumber}}</span>
          </div>
          <div class="footer">
            <div class="msg" v-show="show_msg">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <span>暂无任何通知</span>
            </div>

            <div class="content">
              <base-msg-cell
                v-for="(item,index) in receiveMsgs"
                :key="index"
                :disabled="true"
                :title="item.senderName"
                :status="item.status"
                :content="item.content|ellipsis"
                :time="item.time"
                @click="clickReceiveMsg(item)"
              ></base-msg-cell>
            </div>
          </div>
        </van-tab>

        <van-tab>
          <div slot="title">
            送达中
            <span style="display:inline; color:#ff943e">{{sendNumber}}</span>
          </div>
          <div class="footer">
            <div class="content">
              <base-msg-cell
                v-for="(item,index) in sendMsgs"
                :key="index"
                :disabled="true"
                :title="item.title"
                :read="item.readNum"
                :all="item.number"
                :content="item.content|ellipsis"
                :time="item.time"
                @click="clickSendMsg(item)"
              ></base-msg-cell>
            </div>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            群组邀请
            <span style="display:inline; color:#ff943e">{{inviteNumber}}</span>
          </div>
          <div class="footer invite">
            <div class="content">
              <base-invite-cell
                v-for="(item,index) in inviteMsgs"
                :key="index"
                :name="item.group.name"
                :invitor="item.sender.name"
                :content="item.inviteReason"
                :time="item.time"
                @refuse="clickRefuse(item.id,index)"
                @agree="clickAgree(item.id,index)"
              ></base-invite-cell>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import eventBus from "../../util/eventBus";
import BaseMsgCell from "./../../common/BaseMsgCell";
import BaseInviteCell from "./../../common/BaseInviteCell";
import {
  getUnreadMsg,
  getSendingMsg,
  editMsgState,
  getNotice,
  updateInvite
} from "../../api/message";
import IDBMethods from "../../api/IndexedDbMethods";
export default {
  components: {
    BaseMsgCell,
    BaseInviteCell
  },
  data() {
    return {
      tab: this.$store.state.tab,
      userInfo: "",
      isLoading: false,
      show_msg: false,
      receiveMsgs: [],
      sendMsgs: "",
      inviteMsgs: [],

      receiveNumber: "", //新到通知数量
      sendNumber: "", // 发送通知的数量
      inviteNumber: "", //群组邀请消息数量

      msg: ""
    };
  },
   filters: {
    //内容长度大于8，用 ...代替其他内容
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    }
  },
  created() {
    let dbName = localStorage.getItem("userId") + "NewMsg";
    IDBMethods.getAllMsg(dbName, "NewMsg", 0, result => {
      console.log(result);
      this.receiveMsgs = result;
      this.receiveNumber = result.length;
    });
  },
  mounted() {
    let userId = localStorage.getItem("userId");
    let dbName = userId + "NewMsg";
    IDBMethods.getAllMsgID(dbName, "NewMsg", result => {
      getUnreadMsg(userId, result).then(res => {
        if (res.data.data) {
          let msg = res.data.data;
          for (var i = 0; i < msg.length; i++) {
            this.receiveMsgs.unshift(msg[i]);
          }
          IDBMethods.addNewMsg(dbName, "NewMsg", res.data.data);
        }
      });
    });
    getSendingMsg(userId).then(res => {
      this.sendMsgs = res.data.data;
      this.sendNumber = res.data.data.length;
    });
    if (this.receiveMsgs == null) {
      this.show_msg = true;
    }
  },
  methods: {
    goPath(url) {
      this.$router.push(url);
    }
  },

  created() {
    let dbName = localStorage.getItem("userId") + "NewMsg";
    IDBMethods.getAllMsg(dbName, "NewMsg", 0, result => {
      this.receiveMsgs = result;
      this.receiveNumber = this.receiveMsgs.length;
    });
    let db = localStorage.getItem("userId");
    IDBMethods.getUserInfo(db, "UserInfo", result => {
      this.userInfo = result[0];
    });
    let userId = localStorage.getItem("userId");
    let ids = localStorage.getItem("ids");
    getNotice(userId, 1, ids).then(res => {
      this.inviteMsgs = res.data.data;
      this.inviteNumber = res.data.data.length;
      console.log(this.inviteMsgs);
    
    });
  },
  mounted() {
    let userId = localStorage.getItem("userId");
    let dbName = userId + "NewMsg";
    IDBMethods.getAllMsgID(dbName, "NewMsg", result => {
      getUnreadMsg(userId, result).then(res => {
        if (res.data.data) {
          let msg = res.data.data;
          for (var i = 0; i < msg.length; i++) {
            this.receiveMsgs.unshift(msg[i]);
            this.receiveNumber = this.receiveMsgs.length;
          }

          IDBMethods.addNewMsg(dbName, "NewMsg", res.data.data);
        }
      });
    });
    getSendingMsg(userId).then(res => {
      this.sendMsgs = res.data.data;
      this.sendNumber = this.sendMsgs.length;
    });
  },
  watch: {
    tab() {
      this.$store.commit("setTab", this.tab);
    }
  },
  methods: {
    goPath(url) {
      this.$router.push(url);
    }
  },

  beforeDestroy() {
    eventBus.$emit("receiveMsgDetail", this.msg);
    eventBus.$emit("sendMsgDetail", this.msg);
  },
  methods: {
    onRefresh() {
      
      let userId = localStorage.getItem("userId");
       let ids = localStorage.getItem("ids");
      getNotice(userId, 1,ids).then(res => {
        console.log(res)
        this.inviteMsgs = res.data.data;
        this.inviteNumber = inviteMsgs.length;
      });
      let dbName = userId + "NewMsg";
      let _this = this;
      IDBMethods.getAllMsgID(dbName, "NewMsg", result => {
        getUnreadMsg(userId, result)
          .then(res => {
            if (res.data.data) {
              let msg = res.data.data;
              for (var i = 0; i < msg.length; i++) {
                this.receiveMsgs.unshift(msg[i]);
              }
              IDBMethods.addNewMsg(dbName, "NewMsg", res.data.data);
              this.$notify({
                type: "primary",
                message: "刷新成功",
                duration: 500
              });
              this.isLoading = false;
            } else if (res.data.msg == "没有未读消息") {
              this.$notify({
                type: "primary",
                message: "刷新成功",
                duration: 500
              });
              this.isLoading = false;
            }
          })
          .catch(err => {
            this.$notify({
              type: "danger",
              message: "服务器错误",
              duration: 500
            });
            this.isLoading = false;
          });
      });
      getSendingMsg(userId).then(res => {
        this.sendMsgs = res.data.data;
      });
    },
    //查看新到通知,并且通知状态改为已读
    clickReceiveMsg(e) {
      this.receiveNumber--;
      this.msg = e;

      editMsgState(this.msg.id, this.userInfo.userId).then(res => {
        if (res.data.msg == "success") Toast("读取通知后设置消息为已读");
      });
      this.$router.push("/receive_msg_detail");
    },
    //查看送达中通知
    clickSendMsg(e) {
      this.msg = e;
      this.$router.push("/send_msg_detail");
    },
    //拒绝群组邀请
    clickRefuse(id, index) {
      updateInvite(id, 2).then(res => {
        if (res.data.code == 0) {
          var ids = localStorage.getItem("ids");
          ids = ids + "," + id;
          localStorage.setItem("ids", ids);
          Toast("已拒绝");
          this.inviteMsgs.splice(index, 1);
          this.inviteNumber -= 1;
        }
      });
    },
    //同意群组邀请
    clickAgree(id, index) {
      var _this = this;
      updateInvite(id, 1).then(res => {
        if (res.data.code == 0) {
          var ids = localStorage.getItem("ids");
          ids = ids + "," + id;
          localStorage.setItem("ids", ids);
          Toast("已同意");
          _this.inviteMsgs.splice(index, 1);
          this.inviteNumber -= 1;
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.van-tabs {
  margin-top: 10px;
}
.van-tabs__nav--line {
  padding-bottom: 10px;
}
.footer {
  position: relative;
  margin-bottom: 50px;
}
.invite {
  margin-top: 10px;
}
.msg span {
  margin-left: 138px;
  color: #969799;
  font-size: 14px;
}
.content {
  margin-bottom: 52px;
  min-height: 535px;
}
</style>>

