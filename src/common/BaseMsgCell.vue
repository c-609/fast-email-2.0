<template>
  <div id="message">
    <van-swipe-cell :disabled="disabled" >
      <van-cell
        :border="false"
        :title="title"
        :value="status"
        :label="content"
        :value-class="statusRed"
        @click="click"
        class="click"
      ></van-cell>
      <span class="cell-time">{{time}}</span>
      <template slot="right">
        <van-button square type="danger" class="btn" text="删除" @click="handleDelete" />
        <van-button square type="primary" class="btn" text="置顶" v-if="top" @click="handleTop" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "BaseMsgCell", //接收的消息单元格组件
  props: {
    //标题
    title: {
      type: String
    },
    //通知状态或未读比例
    status: {
      type: String
    },
    //内容
    content: {
      type: String
    },
    //时间
    time: {
      type: String
    },
    //是否禁用滑动,默认值false
    disabled: {
      type: Boolean
    },
    //status是否标记为红色突出，默认不突出，突出传值 red
    statusRed: {
      type: String,
      default: ""
    },
    //top是否显示置顶，默认显示true
    top: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //点击单元格
    click() {
      this.$emit("click");
    },

    //删除
    handleDelete() {
      this.$emit("handleDelete");
    },

    //置顶
    handleTop() {
      this.$emit("handleTop");
    }
  }
};
</script>

<style scoped>
.cell-time {
  margin-top: -28px;
  margin-right: 15px;
  position: relative;
  z-index: 999;
  float: right;
}
.btn {
  float: right;
  height: 64.98px;
}

.red {
  color: red;
}
.click:active {
  background-color: #f2f3f5;
}
</style>