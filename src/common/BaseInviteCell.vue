<template>
  <div class="cell">
    <div>
      <van-field disabled label="群组名称 ：" v-model="name" />
      <van-field disabled label="邀请人 ：" v-model="invitor" />
      <van-field disabled label="邀请理由 ：" v-model="content" />
      <van-field disabled label="邀请时间 ：" v-model="time" />
    </div>
    <div>
      <van-button size="small" type="primary" class="btn" @click="agree">同意</van-button>
      <van-button size="small" type="danger" class="btn" @click="refuse">拒绝</van-button>
    </div>
    <van-divider class="divider" />
  </div>
</template>

<script>
export default {
  name: "BaseInviteCell",
  props: {
    name: {
      type: String
    },
    invitor: {
      type: String
    },
    time: {
      type: String
    },
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    agree() {
      this.$emit("agree");
    },
    refuse() {
      this.$emit("refuse");
    }
  }
};
</script>

<style scoped>
.cell .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
.cell .van-cell {
  height: 30px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.btn {
  float: right;
  margin-right: 10px;
  margin-bottom: 5px;
}
.divider {
  clear: both;
}
</style>