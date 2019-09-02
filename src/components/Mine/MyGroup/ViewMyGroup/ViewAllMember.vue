<template>
  <div class="allMember">
    <div class="header">
      <van-nav-bar title="查看成员" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <div class="members">
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
      <div class="member">
        <span>16计科班张三</span>
        <van-icon name="cross" class="delete_icon" size="18"></van-icon>
      </div>
    </div>
    <div class="add">
      <van-icon name="add" size="54" color="#ff9800"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.push("/view_my_group");
    }
  }
};
</script>

<style scoped>
.allMember {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

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
.search {
  height: 54px;
  width: 100%;
  z-index: 999;
  position: fixed;
  margin-top: 44px;
  border-bottom: 1px solid #efefef;
  box-shadow: 0px 1px 1px rgba(50, 50, 50, 0.1);
}
.members {
  margin-top: 106px;
}
.member {
  height: 44px;
  background-color: #fff;
  line-height: 44px;
  padding-left: 10px;
  position: relative;
  border-bottom: 1px solid #efefef;
}

.delete_icon {
  position: absolute;
  right: 10px;
  top: 13px;
}
.add {
  position: fixed;
  bottom: 20px;
  right: 15px;
}
</style>