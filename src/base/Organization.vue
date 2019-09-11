<template>
  <div>
    <van-cell :title="model.menuName" :is-link="show_link" @click="toggle" />
    <van-popup v-model="open" v-if="isFolder" class="height1" :duration="0.1">
      <div class="header">
        <van-nav-bar title="查看学院机构" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
      </div>
      <div class="content">
        <Organization v-for="(item, index) in model.childTree" :model="item" :key="index"></Organization>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/javascript">
export default {
  // 组件递归必要条件，name属性
  name: "Organization",
  props: ["model"],
  data() {
    return {
      // 控制子列表的显示隐藏
      open: false,
      show_link: true
    };
  },
  computed: {
    // 是否还有子列表需要渲染，作为v-if的判断条件
    isFolder() {
      return this.model.childTree && this.model.childTree.length;
    }
  },
  created() {
    if (this.model.childTree && this.model.childTree.length) {
      this.show_link = true;
    } else {
      this.show_link = false;
    }
  },
  methods: {
    onClickLeft() {
      this.open = false;
    },
    // 切换列表显示隐藏的方法
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
        this.$parent.onClickLeft();
      }
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
.content {
  margin-top: 46px;
}
.height1 {
  
}
</style>