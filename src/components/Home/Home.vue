<template>
  <div class="home">
    <van-tabs v-model="active" sticky swipeable :border="false" animated :line-height="2" > 
        <van-tab >
            <div slot="title">
                新到通知
                <span style="display:inline; color:red">{{receiveNumber}}</span>
            </div>
            <div class="footer">
                <div v-for="(item,index) in receiveMsgs" :key="index" >
                    <base-msg-cell 
                        :disabled="true"
                        :title="item.title"
                        :status="item.status"
                        :content="item.content"
                        :time="item.time"
                        @click="clickReceiveMsg(item)"
                    >
                    </base-msg-cell> 
                    </div>
            </div>
        </van-tab>
        <van-tab >
            <div slot="title">
                送达中
                <span style="display:inline; color:red">{{sendNumber}}</span>
            </div> 
            <div class="footer">
                <div v-for="(item,index) in sendMsgs" :key="index" >
                <base-msg-cell 
                    :disabled="true"
                    :title="item.title"
                    :status="item.status"
                    :content="item.content"
                    :time="item.time"
                    @click="clickSendMsg(item)"
                >
                </base-msg-cell> 
                </div>
            </div>
        </van-tab>
        <van-tab >
            <div slot="title" >
                群组邀请
                <span style="display:inline; color:red">{{inviteNumber}}</span>
            </div>
            <div class="footer invite">
                <div v-for="(item,index) in inviteMsgs" :key="index" >
                    <base-invite-cell
                        :name="item.name"
                        :invitor="item.invitor"
                        :content="item.content"
                        :time="item.time"
                        @refuse="clickRefuse"
                        @agree="clickAgree">
                    </base-invite-cell>
                </div>
            </div>
        </van-tab>
    </van-tabs> 
  </div>
</template>

<script>
import eventBus from "../../util/eventBus"
import BaseMsgCell from './../../common/BaseMsgCell'
import BaseInviteCell from './../../common/BaseInviteCell'
export default {
    components:{
        BaseMsgCell,
        BaseInviteCell
    },
    methods:{
        goPath(url){
            this.$router.push(url)
        }
    },
    data() {
        return {
            active: 0,
            receiveMsgs:[ //新到通知
                {
                    title:"查寝",
                    status: "未读",
                    content:"今天晚上要查寝室啦",
                    time: "2018-03-25"
                },
                {
                    title:"查寝",
                    status: "未读",
                    content:"今天晚上要查寝室啦",
                    time: "2018-03-25"
                }
            ],
            sendMsgs: [// 送达中通知
                 {
                    title:"查寝",
                    status: "1/2",
                    content:"今天晚上要查寝室啦",
                    time: "2018-03-25"
                },
                {
                    title:"查寝",
                    status: "1/2",
                    content:"今天晚上要查寝室啦",
                    time: "2018-03-25"
                }
            ], 
            inviteMsgs: [//群组邀请消息
                {
                    name:"查寝",
                    invitor: "tj",
                    content:"今天晚上要查寝室啦今天晚上要查寝室啦今天晚上要查寝室啦今天晚上要查寝室啦今天晚上要查寝室啦",
                    time: "2018-03-25"
                },
                {
                    title:"查寝",
                    invitor: "ha",
                    content:"今天晚上要查寝室啦",
                    time: "2018-03-25"
                }
                
            ], 

            receiveNumber: 0,//新到通知数量
            sendNumber: 0, // 发送通知的数量
            inviteNumber: 0, //群组邀请消息数量

            msg:"",
            
        }
    },
    beforeDestroy() {
        eventBus.$emit("receiveMsgDetail",this.msg);
        eventBus.$emit("sendMsgDetail",this.msg);
    },
    methods:{
        //查看新到通知
        clickReceiveMsg(e){
            this.receiveNumber--;
            this.msg = e;
            this.$router.push("/receive_msg_detail")
        },
        //查看送达中通知
        clickSendMsg(e){
            this.msg = e;
            this.$router.push("/send_msg_detail")
        },
        //拒绝群组邀请
        clickRefuse(){
            alert("拒绝")
        },
        //同意群组邀请
        clickAgree(){
            alert("同意")
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.van-tabs {
    margin-top: 10px;
}
.van-tabs__nav--line {
    padding-bottom: 10px;
}
.footer{
    margin-bottom: 50px;
}
.invite{
    margin-top: 10px;
    
}


</style>>

