<template>
  <div class="createGroup">
    <div class="header">
      <van-nav-bar title="创建群组" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="groupinfo">
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入群组名" label="群组名称:" />
        <van-field
          v-model="message"
          placeholder="请输入邀请理由"
          rows="1"
          label="邀请理由:"
          autosize
          type="textarea"
        />
        <van-cell title="选择成员:" is-link value @click="choseMember()" />
      </van-cell-group>
    </div>

    <div>
      <ul>
        <items v-for="(model, index) in list" :model="model" :key="index"></items>
      </ul>
    </div>
  </div>
</template>

<script>
import items from "./Items";
export default {
  components: {
    items
  },
  data() {
    return {
      show: false,
      list: [
        {
          id: "1",
          menuName: "项目管理",
          childTree: [
            {
              menuName: "项目进度",
              childTree: [
                {
                  menuName: "项目一",
                  childTree: [{ menuName: "详细信息" }]
                }
              ]
            },
            {
              menuName: "任务安排"
            }
          ]
        },
        {
          id: "2",
          menuName: "数据统计"
        },
        {
          id: "3",
          menuName: "人员管理"
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/my_group");
    },
    choseMember() {
      this.show = true;
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