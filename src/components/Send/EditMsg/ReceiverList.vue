<template>
  <div>
     <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="查看收件人"  left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-button type="info" slot="right" size="small">确认</van-button>
      </van-nav-bar>
    </div>



  </div>
</template>

<script>
export default{
  name:"ReceiverList" , //已选择收件人列表

}
</script>