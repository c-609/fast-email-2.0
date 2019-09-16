<template>
  <div class="sys_msg">
    <div class="header">
        <van-nav-bar title="系统消息" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="content">
        <div class="cell" v-for="(item,index) in sysMsg" :key="index">
            <base-msg-cell
              :disabled="true"
              :title="item.title"
              :content="item.content"
              :time="item.time"
              @click="clickSendMsg(item)"
            >
            </base-msg-cell>
        </div>
    </div>
  </div>
</template>

<script>
import BaseMsgCell from '../../../common/BaseMsgCell'
export default {
    components:{
        BaseMsgCell
    },
    data(){
        return{
            sysMsg: [
            // 送达中通知
                {
                title: "系统消息",
                content: "16计科班张三已加入查寝群",
                time: "2018-03-25"
                },
                {
                title: "系统消息",
                content: "今天晚上要查寝室啦",
                time: "2018-03-25"
                }
            ],
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push("/mine");
        }
    }
}
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
    margin-top: 44px;
}
</style>