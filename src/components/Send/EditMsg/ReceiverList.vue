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
      <van-cell title="我的群组" is-link :value="groupValue" />
    </div>

    <div class="receiver-list">
      <van-divider>已选择人员</van-divider>
      <van-cell v-for="(item,index) in result" :key="item.id" :title="item.name">
        <van-icon slot="right-icon" name="cross" color="red" @click="removeReceiver(index)" />
      </van-cell>
    </div>
  </div>
</template>

<script>
import eventBus from "./../../../util/eventBus";
export default {
  name: "ReceiverList",
  data() {
    return {
      orgValue: "进入机构选择",
      groupValue: "进入群组选择",
      tree: [],
      result: [ ]
    };
  },
  created() {
    //监听select Receiver传过来的请求得到的所有数据以及选择的所有用户
    eventBus.$on("selectReceiver", (tree, result) => {
      this.tree = tree;
      this.result = result;
    });
  },
  beforeDestroy() {
    //如果是第二次进入机构选人，将原先的数据传给selectReceiver
    eventBus.$emit("selectList", this.tree, this.result);
    eventBus.$off("selectReceiver");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    //移除收件人
    removeReceiver(index) {
      this.result.splice(index, 1);
    }
  }
};
</script>