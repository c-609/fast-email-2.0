<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="编辑通知" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-button type="info" slot="right" size="small">发送</van-button>
      </van-nav-bar>
    </div>

    <!-- 通知b标题与发件身份 -->
    <div class="title-sender">
      <van-field v-model="msg.title" label="通知标题 ：" placeholder="请输入标题" />
      <van-field
        v-model="msg.senderIdentify"
        label="发件身份 ："
        placeholder="请选择发件身份"
        @click="show=true"
      />
      <!-- 发件身份弹框 -->
      <van-popup v-model="show" @open="openPopup" @close="closePopup"></van-popup>
    </div>

    <!-- 收件人 -->
    <div class="receiver">
      <van-cell title="收件人" is-link :value="persons" to="/receiver_list"/>
    </div>

    <!-- 通知内容 -->
    <div class="content">
      <van-cell value="通知内容："></van-cell>
      <van-field v-model="msg.content" type="textarea" rows="15" placeholder="请输入发通知内容" />
    </div>
  </div>
</template>

<script>
import eventBus from "./../../../util/eventBus";
export default {
  name: "EditMsg",
  data() {
    return {
      msg: "",
      show: false,
      persons: " 请选择", //收件人单元格提示语，如果选了人为 “已选择”
      originalMsg: "", //原始的转发数据
      tree:[],
      result:[],
    };
  },
  created() {
    eventBus.$on("editMsg", res => {
      this.originalMsg = { ...res }; //es6语法，解决v-model数据双向绑定
      this.msg = res;
    });
    eventBus.$on("selectList",(tree,result)=>{
      this.tree = tree;
      this.result = result;
     this.persons = result.length;
    })
  },
  beforeDestroy() {
    
    eventBus.$off("selectList");
    eventBus.$emit("selectReceiver",this.tree,this.result);
    eventBus.$off("editMsg");
    if (this.originalMsg != "") {
      eventBus.$emit("receiveMsgDetail", this.originalMsg);
      console.log(this.originalMsg);
    }
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },

    //发送通知
    onClickRight() {},

    //打开发件身份弹出层时触发
    openPopup() {},

    //关闭发件身份弹出层时触发
    closePopup() {}
  }
};
</script>

<style scoped>
.title-sender .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
</style>