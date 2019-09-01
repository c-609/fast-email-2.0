<template>
  <div>
      <!-- 头部 -->
    <div class="header">
         <van-nav-bar title="发出"  @click-right="onClickRight">
        <van-icon name="edit" slot="right" color="#191f25" size="18" />
      </van-nav-bar>
    </div>

      <template v-for="(item,index) in msgList" >
            <base-msg-cell  
                :key="index"
                :title="item.title" 
                :status="item.status" 
                :content="item.content|ellipsis"  
                :time="item.time"
                statusRed="red"
                @handleDelete="handleDelete(item)"
                @handleTop="handleTop(item)"
                @click="clickMsg(item)"
                >
            </base-msg-cell>
        </template>
  </div>
</template>

<script>
import eventBus from "./../../util/eventBus"
import  BaseMsgCell from "./../../common/BaseMsgCell"
export default {
    components:{
        BaseMsgCell
    },
    data(){
        return{
            msgList:[
                {
                    title:'title', //通知标题
                    status:'1/5', // 通知状态或者未读人员比例
                    content:'通知状态或者未读人员比例', // 通知内容
                    time:'2019-8-9', // 时间
                },
                {
                    title:'title1', //通知标题
                    status:'5/9', 
                    content:'nihao1', // 通知内容
                    time:'2019-8-91', // 时间
                }
            ],
            msg:""
        }
    },
    filters: {
        //内容长度大于8，用 ...代替其他内容
        ellipsis(value) {
            if (!value) return "";
            if (value.length > 8) {
                return value.slice(0, 8) + "......";
            }
            return value;
            }
  },
  beforeDestroy() {
     eventBus.$emit("sendMsgDetail",this.msg);
  },
  methods:{
        //编辑通知
        onClickRight(){
            this.$router.push("/edit_msg");
        },
        //删除
        handleDelete(e){
            alert(e.title)
        },

        //置顶
        handleTop(e){
           alert("置顶")
        },

        //点击通知，查看详情
        clickMsg(e){
            this.msg = e;
            this.$router.push("/send_msg_detail")
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
</style>