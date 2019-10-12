<template>
  <div class="org-cell">
    <van-cell  :title="data.name">
      <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" @click="click"  v-if="data.hasChild!=0" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "OrgCell",
  props: {
    data: {
      type:Object
    },

  },

  methods: {
    //点击右键头
    click() {
      this.$emit("goNext",this.data);
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

</style>