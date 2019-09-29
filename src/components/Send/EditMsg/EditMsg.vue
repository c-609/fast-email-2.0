<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="编辑通知" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-button type="info" slot="right" size="small">发送</van-button>
      </van-nav-bar>
    </div>

    <!-- 通知b标题与发件身份 -->
    <div class="title-sender">
      <van-field v-model="title" label="通知标题 ：" placeholder="请输入标题" />
      <van-field v-model="role.roleCNName" label="发件身份 ：" placeholder="请选择发件身份" @click="show=true" />
      <!-- 发件身份弹框 -->
      <van-popup v-model="show" @open="openPopup" @close="closePopup">
        <van-radio-group v-model="role">
          <van-cell-group>
            <van-cell v-for="item in roles" :key="item.id" :title="item.roleCNName" clickable>
              <van-radio slot="right-icon" :name="item" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
    </div>

    <!-- 收件人 -->
    <div class="receiver">
      <van-cell title="收件人" is-link :value="userIds.length" @click="goSelectList" />
    </div>

    <!-- 通知内容 -->
    <div class="content">
      <van-cell value="通知内容："></van-cell>
      <van-field v-model="content" type="textarea" rows="15" placeholder="请输入发通知内容" />
    </div>
  </div>
</template>

<script>
import eventBus from "./../../../util/eventBus";
import IDBMethods from "../../../api/IndexedDbMethods";
import { getGroup } from "../../../api/organization";
import { sendMsg } from "../../../api/message";
export default {
  name: "EditMsg",
  data() {
    return {
      msg: "",
      title: this.$store.state.title,
      content: this.$store.state.content,
      show: false,
      persons: " 请选择", //收件人单元格提示语，如果选了人为 “已选择”
      originalMsg: "", //原始的转发数据
      role: this.$store.state.role, //选择的发件身份
      roles: this.$store.state.roles, //用户的所有身份
      oldRole: this.$store.state.role,
      userIds: [],
      deptId: this.$store.state.deptId,
      senderInfo: this.$store.state.senderInfo
    };
  },
  created() {
    eventBus.$on("editMsg", res => {
      this.originalMsg = { ...res }; //es6语法，解决v-model数据双向绑定
      this.msg = res;
      this.title = res.title;
      this.content = res.content;
    });
    eventBus.$on("userIds", userIds => {
      this.userIds = userIds;
      console.log(userIds);
    });
  },
  beforeDestroy() {
    eventBus.$off("editMsg");
    if (this.originalMsg != "") {
      eventBus.$emit("receiveMsgDetail", this.originalMsg);
      console.log(this.originalMsg);
    }
  },
  methods: {
    clear() {
      var result = []; //已选择人员
      var tree = []; //机构发请求得到的数据
      var groups = []; // 群组向本地取到的用户群组
      var selectedGroups = []; //已选择群组
      var deptUsers = [];
      var groupUsers = [];
      this.$store.commit("setResult", result);
      this.$store.commit("setTree", tree);
      this.$store.commit("setGroups", groups);
      this.$store.commit("setSelectedGroups", selectedGroups);
      this.$store.commit("setDeptUsers", deptUsers);
      this.$store.commit("setGroupUsers", groupUsers);
    },
    //返回
    onClickLeft() {
      var roles = []; //请求到的发件身份
      var role = ""; //选择的发件身份
      var senderInfo = "";
      var title = "";
      var content = "";

      this.$store.commit("setRole", role);
      this.$store.commit("setRoles", roles);
      this.$store.commit("setSenderInfo", this.senderInfo);
      this.$store.commit("setTitle", this.title);
      this.$store.commit("setContent", this.content);
      this.clear();
      this.$router.go(-1);
    },

    //发送通知
    onClickRight() {
      console.log(this.senderInfo);
      var senderId = this.senderInfo.userId;
      var senderName = this.senderInfo.name;
      var content = this.content;
      var title = this.title;
      var userIds = this.userIds.join(",");
      var deptId = this.role.deptId;
      var roleId = this.role.roleId;

      console.log(this.role);
      console.log(
        senderId,
        senderName,
        content,
        title,
        userIds,
        deptId,
        roleId
      );
      if (title == "") this.$toast("请输入标题");
      else {
        if (senderName == "") this.$toast("请选择发件身份");
        else {
          if (userIds == "") this.$toast("请选择收件身份");
          else {
            if (content == "") this.$toast("请输入通知内容");
            else {
              sendMsg(
                senderId,
                senderName,
                content,
                title,
                userIds,
                deptId,
                roleId
              ).then(res => {
                Toast(res.data.msg);
              });
            }
          }
        }
      }
    },

    //打开发件身份弹出层时触发
    openPopup() {
      //从本地获取用户拥有的发件身份roles
      if (this.roles == undefined || this.roles.length == 0) {
        let dbName = localStorage.getItem("userId");
        IDBMethods.getUserInfo(dbName, "UserInfo", result => {
          var userInfo = result[0];
          this.roles = userInfo.identityEntities;
          this.senderInfo = userInfo;
          console.log(userInfo);
        });
      }
    },

    //关闭发件身份弹出层时触发
    closePopup() {
      if (this.role.id != this.oldRole.id) {
        this.$store.commit("setRole", this.role);
        this.clear();
        this.oldRole = this.role;
        this.result = null;
        this.tree = null;
        this.persons = 0;
      }
    },

    goSelectList() {
      if (this.role == "") {
        Toast("请先选择发件身份！");
      } else {
        this.$store.commit("setRole", this.role);
        this.$store.commit("setRoles", this.roles);
        this.$store.commit("setSenderInfo", this.senderInfo);
        this.$store.commit("setTitle", this.title);
        this.$store.commit("setContent", this.content);
        this.$router.push("/receiver_list");
      }
    }
  }
};
</script>

<style scoped>
.title-sender .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.van-popup {
  width: 340px;
  min-height: 100px;
}
</style>