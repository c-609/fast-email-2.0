<template>
  <div class="viewMyGroup">
    <div class="header">
      <van-nav-bar :title="groupInfo.groupName" left-arrow @click-left="onClickLeft">
        <van-icon name="delete" slot="right" color="#191f25" size="18" />
      </van-nav-bar>
    </div>
    <div class="groupInfo">
      <p>群组名称: {{groupInfo.groupName}}</p>
      <p>创建时间: {{groupInfo.createTime}}</p>
    </div>
    <div class="member">
      <van-cell title="查看所有成员" icon="friends-o" is-link value="24人" @click="view_all_member()" />
    </div>

    <div class="inviteReason">
      <p>邀请理由:</p>
    </div>
    <div class="reason">
      <p>为方便我院开展xxxxxxx,特此建群。</p>
    </div>
  </div>
</template>

<script>
import eventBus from "../../../../util/eventBus"
export default {
  data(){
    return{
      groupInfo:'',
      memberList:'',
    }
  },
  created() {
    eventBus.$on("groupMsg", res => {   
      this.groupInfo = res;
      this.memberList = res.userInfoEntityList;
    });
  },
   beforeDestroy() {
    eventBus.$off("groupMsg");
  },
  methods: {
    onClickLeft() {
      this.$router.push("/my_group");
    },
    view_all_member() {
      eventBus.$emit("memberList", this.memberList);
      console.log(this.memberList)
      this.$router.push("/view_all_member");
    }
  }
};
</script>

<style scoped>
.viewMyGroup {
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
.groupInfo {
  height: 80px;
  background-color: #fff;
  padding-top: 5px;
  padding-left: 15px;
}
.groupInfo p {
  color: #6e6e6e;
  font-size: 14px;
}
.member {
  margin-top: 12px;
}
.inviteReason {
  margin-top: -8px;
  background-color: #f6f6f6;
  padding-left: 10px;
  color: #6e6e6e;
}
.reason {
  margin-top: -8px;
  background-color: #fff;
  padding: 2px 0 10px 10px;
  font-size: 14px;
  color: #323233;
}
</style>>

