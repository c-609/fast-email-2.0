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
      <van-field v-model="msg.title" label="通知标题 ：" placeholder="请输入标题" />
      <van-field v-model="role.roleCNName" label="发件身份 ：" placeholder="请选择发件身份" @click="show=true" />
      <!-- 发件身份弹框 -->
      <van-popup v-model="show" @open="openPopup" @close="closePopup">
        <van-radio-group v-model="role">
          <van-cell-group>
            <van-cell
              v-for="item in roles"
              :key="item.id"
              :title="item.roleCNName"
              clickable
            >
              <van-radio slot="right-icon" :name="item" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
    </div>

    <!-- 收件人 -->
    <div class="receiver">
      <van-cell title="收件人" is-link :value="persons" @click="goSelectList" />
    </div>

    <!-- 通知内容 -->
    <div class="content">
      <van-cell value="通知内容："></van-cell>
      <van-field v-model="msg.content" type="textarea" rows="15" placeholder="请输入发通知内容" />
    </div>
  </div>
</template>

<script>
import eventBus from "./../../../util/eventBus";
import IDBMethods from "../../../api/IndexedDbMethods";
import { getGroup } from "../../../api/organization";
export default {
  name: "EditMsg",
  data() {
    return {
      msg: "",
      show: false,
      persons: " 请选择", //收件人单元格提示语，如果选了人为 “已选择”
      originalMsg: "", //原始的转发数据
      tree: [],
      result: [],
      role: "", //选择的发件身份
      roles: [], //用户的所有身份
      oldRole: ""
    };
  },
  created() {
    eventBus.$on("editMsg", res => {
      this.originalMsg = { ...res }; //es6语法，解决v-model数据双向绑定
      this.msg = res;
    });
    eventBus.$on("selectList", (tree, result, role,roles) => {
      this.tree = tree;
      this.result = result;
      this.role = role;
      this.roles = roles;
      this.oldRole = role;
      this.persons = result.length;
    });  
  },
  beforeDestroy() {
    eventBus.$off("selectList");
    eventBus.$emit("edit", this.tree, this.result, this.role,this.roles);
    eventBus.$off("editMsg");
    if (this.originalMsg != "") {
      eventBus.$emit("receiveMsgDetail", this.originalMsg);
      console.log(this.originalMsg);
    }
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },

    //发送通知
    onClickRight() {},

    //打开发件身份弹出层时触发
    openPopup() {
      //从本地获取用户拥有的发件身份roles
      console.log(this.roles)
      if(this.roles.length==0 || this.roles.length == undefined){
      let dbName = localStorage.getItem("userId");
      IDBMethods.getUserInfo(dbName, "UserInfo", result => {
        var userInfo = result[0];
        this.roles = userInfo.identityEntities;
      });}
    },

    //关闭发件身份弹出层时触发
    closePopup() {
      if (this.role.id != this.oldRole.id) {
        this.result = null;
        this.tree = null;
        this.persons=0;
      }
    },

    goSelectList() {
      if (this.role == "") {
        Toast("请先选择发件身份！");
      } else {
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