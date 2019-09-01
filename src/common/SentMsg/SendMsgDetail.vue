<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="发出通知"  left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="delete" slot="right" color="#191f25" size="18" />
      </van-nav-bar>
    </div>

    <!-- 通知详情 -->
    <div class="detail">
      <van-collapse v-model="activeName" >
        <van-collapse-item :title="msg.title" name="1">
          发布时间 : {{msg.time}}
          <br />
          发布身份 : {{msg.sender}} 
        </van-collapse-item>
      </van-collapse>
      <van-cell title="接收人员" is-link  />
      <van-cell title="未读人员" is-link :value="msg.ratio" />
    </div>

    <!-- 通知内容 -->
    <div class="content">
      <van-cell title="通知内容："></van-cell>
      <van-field v-model="msg.content" type="textarea" rows="15" disabled />
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'SendMsgDetail',
  data(){
    return {
       activeName: ["1"],
       msg: '' //通知对象
    }
  },
   methods:{
    //返回
    onClickLeft(){
      this.$router.go(-1);
    },

    //S删除
    onClickRight(){

    }
  }
}
</script>

<style scoped>
.van-nav-bar{
  background: #f6f6f6;
}
.van-nav-bar .van-icon {
    color: #191f25;
}
.van-nav-bar__arrow {
    font-size: 18px;
}
.detail .van-cell:not(:last-child)::after{
  border-bottom: 0px;
}
</style>