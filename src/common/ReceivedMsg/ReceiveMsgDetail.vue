<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="收到通知" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="share" slot="right" color="#191f25" size="18" />
      </van-nav-bar>
    </div>

    <!-- 通知详情 -->
    <div class="detail">
      <van-field disabled v-model="msg.title" label="通知标题" placeholder="通知标题" />
      <van-field disabled v-model="msg.time" label="发布时间" placeholder="发布时间" />
      <van-field disabled v-model="msg.sender" label="发布人" placeholder="发布人" />
    </div>

    <!-- 通知内容 -->
    <div class="content">
      <van-cell value="通知内容："></van-cell>
      <van-field v-model="msg.content" type="textarea" disabled rows="15" />
    </div>
  </div>
</template>
<script>
import eventBus from "./../../util/eventBus";
export default {
  name: "ReceiveMsgDetail",
  data() {
    return {
      msg: "", //通知对象，包含通知所有内容
      isSahre: false //是否转发
    };
  },
  created() {
    eventBus.$on("receiveMsgDetail", res => {
      this.msg = res;
    });
  },
  beforeDestroy() {
    eventBus.$off("receiveMsgDetail");
    if (this.isSahre == true) eventBus.$emit("editMsg", this.msg);
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },

    //转发,直接带msg进入发送页面，无需接口
    onClickRight() {
      this.isSahre = true;
      this.$router.push("/edit_msg");
    }
  }
};
</script>

<style scoped >
.van-nav-bar {
  background: #f6f6f6;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.detail .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
</style>