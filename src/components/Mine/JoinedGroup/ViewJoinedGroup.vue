<template>
  <div class="viewJoinedGroup">
    <div class="header">
      <van-nav-bar title="查看群组" left-arrow @click-left="onClickLeft" fixed>
        <van-icon name="delete" slot="right" color="#191f25" size="18" @click="quit_group" />
      </van-nav-bar>
    </div>
    <div class="info">
      <ul>
        <li>群组名称: 查寝群</li>
        <li>邀请人: 张三</li>
        <li>邀请时间: 2019-08-08 14:45:45</li>
      </ul>
    </div>
    <div class="reason_p">
      <span>邀请理由:</span>
    </div>
    <div class="inviteReason">
      <span>为方便我院开展xxxxxxx，特此建群。</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    quit_group() {
      this.$toast({
        message: "退出群组",
        duration: 1000,
        position: "bottom"
      });
    },
    onClickLeft() {
      this.$router.push("/joined_group");
    }
  }
};
</script>

<style scoped>
.viewJoinedGroup {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.van-nav-bar {
  background-color: #f6f6f6;
}
.header {
  height: 46px;
  border-bottom: 1px solid #d2d2d2;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.info {
  background-color: #fff;
  padding: 10px;
}
.info ul li {
  color: #6e6e6e;
  padding-bottom: 5px;
  font-size: 14px;
}
.inviteReason {
  padding: 20px 0 20px 10px;
  background-color: #fff;
  font-size: 14px;
  color: #323233;
}
.reason_p {
  height: 20px;
  line-height: 20px;
  padding-left: 10px;
  color: #6e6e6e;
}
</style>