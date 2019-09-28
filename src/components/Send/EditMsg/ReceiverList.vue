<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="选择收件人" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-button type="info" slot="right" size="small">确认</van-button>
      </van-nav-bar>
    </div>

    <div class="select-receiver">
      <van-cell title="我的机构" is-link :value="orgValue" to="/select_receiver" />
      <van-cell title="我的群组" is-link :value="groupValue" @click="selectGroup" />
    </div>

    <!-- 选择群组 -->
    <van-popup v-model="show" @open="openPopup" @close="closePopup">
      <van-checkbox-group v-model="selectedGroups">
        <van-cell-group>
          <van-cell v-for="item in groups" clickable :key="item.id" :title="item.name">
            <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <div class="receiver-list">
      <van-divider>已选择人员</van-divider>
      <div v-for="(item,index) in result" :key="index">
        <van-cell v-if="item" :title="item">
          <van-icon slot="right-icon" name="cross" color="red" @click="removeReceiver(index)" />
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "./../../../util/eventBus";
import IDBMethods from "../../../api/IndexedDbMethods";
import { getGroup, getGroupUsers } from "../../../api/organization";
export default {
  name: "ReceiverList",
  data() {
    return {
      orgValue: "进入机构选择",
      groupValue: "进入群组选择",
      tree: [],
      result: [],
      show: false,
      groups: [],
      selectedGroups: [],
      selectedGroupsTemp: 0,
      role: "",
      roles: []
    };
  },
  watch: {
    selectedGroups() {
      selectedGroupsTemp = 1;
    }
  },
  created() {
    //监听select Receiver传过来的请求得到的所有数据以及选择的所有用户
    eventBus.$on("selectReceiver", (tree, result, role, roles) => {
      this.tree = tree;
      if (result != null) this.result = result;
      this.role = role;
      this.roles = roles;
      console.log(this.result);
    });
    eventBus.$on("edit", (tree, result, role, roles) => {
      this.tree = tree;
      this.result = result;
      this.role = role;
      this.roles = roles;
      console.log(this.result);
    });
  },
  beforeDestroy() {
    //如果是第二次进入机构选人，将原先的数据传给selectReceiver
    eventBus.$emit("selectList", this.tree, this.result, this.role, this.roles);
    eventBus.$off("selectReceiver");
    eventBus.$off("edit");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    //移除收件人
    removeReceiver(index) {
      this.result.splice(index, 1);
    },
    //点击我的群组
    selectGroup() {
      this.show = true;
    },
    //打开群组
    openPopup() {
      //从本地获取用户拥有的发件身份roles
      //获取所有群组
      selectedGroupsTemp = 0;
      if (this.groups.length == 0) {
        let dbName = localStorage.getItem("userId");
        IDBMethods.getUserInfo(dbName, "UserInfo", result => {
          var userInfo = result[0];
          var userId = userInfo.userId;
          getGroup(userId).then(res => {
            this.groups = res.data.data;
          });
        });
      }
    },

    //关闭群组
    closePopup() {
      if (selectedGroupsTemp == 1) {
        
        getGroupUsers().then(res => {
          console.log(res);
          this.result = res.data.data.userInfoEntityList;
          console.log(this.result);
        });
      }
    }
  }
};
</script>
<style scoped>
.van-popup {
  width: 340px;
  min-height: 100px;
}
</style>