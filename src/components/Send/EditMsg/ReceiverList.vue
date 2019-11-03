<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="选择收件人" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-button type="info" slot="right" size="small" @click="onClickLeft">确认</van-button>
      </van-nav-bar>
    </div>

    <div class="select-receiver">
      <van-cell title="我的机构" is-link :value="orgValue" to="/select_receiver" />
      <van-cell title="我的群组" is-link :value="groupValue" @click="selectGroup" />
    </div>

    <!-- 选择群组 -->
    <van-popup v-model="show" @open="openPopup" @close="closePopup">
      <van-nav-bar title="选择群组" @click-left="onClickLeft" @click-right="onClickRight">
        <van-button type="info" slot="right" size="small" @click="closePopup">确认</van-button>
      </van-nav-bar>
      <van-checkbox-group v-model="selectedGroups">
        <van-cell-group>
          <van-cell v-for="item in groups" clickable :key="item.id" :title="item.name">
            <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <div class="receiver-list">
      <van-divider>已选择人员( {{usersNum}} )</van-divider>
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
      result: "", //[userid] = name
      show: false,
      groups: this.$store.state.groups,
      selectedGroups: this.$store.state.selectedGroups,
      selectedGroupsTemp: 0,
      role: this.$store.state.role,
      groupUsers: this.$store.state.groupUsers,
      deptUsers: this.$store.state.deptUsers,
      usersNum: 0
    };
  },
  watch: {
    selectedGroups() {
      this.selectedGroupsTemp = 1;
    },
    groupUsers() {
      this.result = [];
      // this.result = this.deptUsers;

      if (this.deptUsers.length != 0) {
        for (var i = 0; i < this.deptUsers.length; i++) {
          var _this = this;
          this.$set(
            _this.result,
            _this.deptUsers[i].userId,
            _this.deptUsers[i].name
          );
        }
      }

      if (this.groupUsers.length != 0) {
        for (var i = 0; i < this.groupUsers.length; i++) {
          var _this = this;
          this.$set(
            _this.result,
            _this.groupUsers[i].userId,
            _this.groupUsers[i].name
          );
        }
      }
      this.usersNum = this.getUserIds().length;
    }
  },
  created() {
    // console.log(this.result);
    // console.log(this.groupUsers);
    // console.log(this.deptUsers);
    // if (this.groupUsers.length !=0) {
    //   for (var i = 0; i < this.groupUsers.length; i++) {
    //     this.result[this.groupUsers[i].userId] = this.groupUsers[i].name;
    //   }
    // }
    // if (this.deptUsers.length != 0) {
    //   for (var i = 0; i < this.deptUsers.length; i++) {
    //     this.result[this.deptUsers[i].userId] = this.deptUsers[i].name;
    //   }
    // }

    this.result = [];
    // this.result = this.deptUsers;

    if (this.deptUsers.length != 0) {
      for (var i = 0; i < this.deptUsers.length; i++) {
        var _this = this;
        this.$set(
          _this.result,
          _this.deptUsers[i].userId,
          _this.deptUsers[i].name
        );
      }
    }

    if (this.groupUsers.length != 0) {
      for (var i = 0; i < this.groupUsers.length; i++) {
        var _this = this;
        this.$set(
          _this.result,
          _this.groupUsers[i].userId,
          _this.groupUsers[i].name
        );
      }
    }
    this.usersNum = this.getUserIds().length;
  },
  beforeDestroy() {
    //将已选人员id数组传给editMsg
    var userIds = this.getUserIds();
    eventBus.$emit("userIds", userIds);
    this.$store.commit("setResult", this.result);
    this.$store.commit("setGroupUsers", this.groupUsers);
  },
  methods: {
    getUserIds() {
      var userIds = [];
      for (var i = 0; i < this.result.length; i++) {
        if (this.result[i]) userIds.push(i);
      }
      return userIds;
    },
    onClickLeft() {
      this.$router.push("/edit_msg");
    },
    onClickRight() {},
    //移除收件人
    removeReceiver(index) {
      this.usersNum--;
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
      this.selectedGroupsTemp = 0;
      if (this.groups.length == 0) {
        let dbName = localStorage.getItem("userId");
        IDBMethods.getUserInfo(dbName, "UserInfo", result => {
          var userInfo = result[0];
          var userId = userInfo.userId;
          getGroup(userId).then(res => {
            this.groups = res.data.data;
            this.$store.commit("setGroups", this.groups);
          });
        });
      }
    },

    //关闭群组
    closePopup() {
      this.show = false;
      if (this.selectedGroupsTemp == 1) {
        var ids = new Array();

        for (var i = 0; i < this.selectedGroups.length; i++) {
          ids.push(this.selectedGroups[i].id);
        }
        this.$store.commit("setSelectedGroups", this.selectedGroups);

        var deptIds = ids.join(",");
        console.log(deptIds);
        getGroupUsers(deptIds).then(res => {
          var data = res.data.data;
          console.log(data);
          var groupUsers = [];
          if (data != null) {
            for (var i = 0; i < data.length; i++) {
              var obj = new Object();
              obj.userId = data[i].userId;
              obj.name = data[i].name;
              groupUsers.push(obj);
              // this.$set(this.groupUsers,data[i].userId,data[i].name);
            }
          }
          this.groupUsers = groupUsers;
          console.log(this.groupUsers);
          this.$store.commit("setGroupUsers", this.groupUsers);
        });
      } else {
        console.log(this.groupUsers);
      }
    }
  }
};
</script>
<style scoped>
.van-popup {
  width: 100%;
  min-height: 100px;
}
</style>