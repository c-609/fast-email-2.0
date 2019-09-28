<template>
  <div class="createGroup">
    <div class="header">
      <van-nav-bar title="创建群组" left-arrow @click-left="onClickLeft" fixed>
        <van-button slot="right" size="small" type="info" @click="createGroup()">立即创建</van-button>
      </van-nav-bar>
    </div>
    <div class="groupinfo">
      <van-cell-group>
        <van-field v-model="groupName" placeholder="请输入群组名" label="群组名称:" />
        <van-field
          v-model="inviteReason"
          placeholder="请输入邀请理由"
          rows="1"
          label="邀请理由:"
          autosize
          type="textarea"
        />
        <van-cell title="选择成员:" is-link :value="result.length" @click="chooseMember()" />
      </van-cell-group>
    </div>
    <div class="receiver-list">
      <van-divider>已选择人员</van-divider>
      <div >
        <van-cell v-for="(item,index) in result" :key="index" :title="item.name">
          <van-icon slot="right-icon" name="cross" color="red" @click="removeReceiver(index)" />
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "../../../../util/eventBus";

export default {
  data() {
    return {
      groupName:"",
      invinviteReasonite:"",
      result:this.$store.state.result,
      
    };
  },
  methods: {
    onClickLeft() {
      var tree = [];
      var result = [];
      this.$store.commit("setTree", tree);
      this.$store.commit("setResult", result);
      this.$router.push("/my_group");
    },
    chooseMember() {
      this.$router.push("/choose_member");
    },
    removeReceiver(index) {
      this.result.splice(index, 1);
    },
    createGroup(){
      var ids = new Array();
      for(var i=0;i<this.result.length;i++){
        ids.push(this.result[i].userId);
      }
      var userIds = ids.join(",");
      
    }
  }
};
</script>

<style scoped>
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.van-nav-bar {
  background-color: #f6f6f6;
}
.header {
  border-bottom: 1px solid #d2d2d2;
}
.groupinfo {
  margin-top: 46px;
}
</style>