<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-tabs v-model="tab" sticky swipeable :border="false" animated :line-height="2" color="#3296fa">
      <van-tab>
        <div slot="title">
          新到通知
          <span style="display:inline; color:#ff943e">{{receiveNumber}}</span>
        </div>
        <div class="footer">
          <div v-for="(item,index) in receiveMsgs" :key="index">
            <base-msg-cell
              :disabled="true"
              :title="item.senderName"
              :status="item.status"
              :content="item.content"
              :time="item.time"
              @click="clickReceiveMsg(item)"
            ></base-msg-cell>
          </div>
        </div>
      </van-tab>
     
      <van-tab>
        <div slot="title">
          送达中
          <span style="display:inline; color:#ff943e">{{sendNumber}}</span>
        </div>
        <div class="footer">
         
          <div v-for="(item,index) in sendMsgs" :key="index">
            <base-msg-cell
              :disabled="true"
              :title="item.title"
              :read="item.readNum"
              :all="item.number"
              :content="item.content"
              :time="item.time"
              @click="clickSendMsg(item)"
            ></base-msg-cell>
          </div>
          
        </div>
         
      </van-tab>
      <van-tab>
        <div slot="title">
          群组邀请
          <span style="display:inline; color:#ff943e">{{inviteNumber}}</span>
        </div>
        <div class="footer invite">
          <div v-for="(item,index) in inviteMsgs" :key="index">
            <base-invite-cell
              :name="item.name"
              :invitor="item.invitor"
              :content="item.content"
              :time="item.time"
              @refuse="clickRefuse"
              @agree="clickAgree"
            ></base-invite-cell>
          </div>
        </div>
      </van-tab>
      
    </van-tabs>
     </van-pull-refresh>
  </div>
</template>

<script>
import eventBus from "../../util/eventBus";
import BaseMsgCell from "./../../common/BaseMsgCell";
import BaseInviteCell from "./../../common/BaseInviteCell";
import {getUnreadMsg,getSendingMsg} from "../../api/message"
import IDBMethods from "../../api/IndexedDbMethods"
export default {
  components: {
    BaseMsgCell,
    BaseInviteCell
  },
  created(){
    let dbName = localStorage.getItem('userId')+"NewMsg";
    IDBMethods.getAllMsg(dbName,"NewMsg",0,result=>{
      this.receiveMsgs = result;
    })
  },
  mounted(){
    let userId = localStorage.getItem('userId');
    let dbName = userId+"NewMsg"
    IDBMethods.getAllMsgID(dbName,"NewMsg",result=>{
      getUnreadMsg(userId,result).then(res=>{
        if(res.data.data){
          let msg = res.data.data;
          for(var i=0; i<msg.length; i++){
            this.receiveMsgs.unshift(msg[i]);
          }
          
          IDBMethods.addNewMsg(dbName,"NewMsg",res.data.data);
        }
    })
    })
    getSendingMsg(userId).then(res=>{
      this.sendMsgs = res.data.data;
    })
  },
  methods: {
    goPath(url) {
      this.$router.push(url);
    }
  },
  data() {
    return {
      isLoading:false,
      tab: this.$store.state.tab,
      receiveMsgs: [],
      sendMsgs:'',
      inviteMsgs: [
        //群组邀请消息
        {
          name: "查寝",
          invitor: "tj",
          content:
            "今天晚上要查寝室啦今天晚上要查寝室啦今天晚上要查寝室啦今天晚上要查寝室啦今天晚上要查寝室啦",
          time: "2018-03-25"
        },
        {
          title: "查寝",
          invitor: "ha",
          content: "今天晚上要查寝室啦",
          time: "2018-03-25"
        }
      ],

      receiveNumber: 0, //新到通知数量
      sendNumber: 0, // 发送通知的数量
      inviteNumber: 0, //群组邀请消息数量

      msg: ""
    };
  },
  beforeDestroy() {
    this.$store.commit("getTab", this.tab);
    eventBus.$emit("receiveMsgDetail", this.msg);
    eventBus.$emit("sendMsgDetail", this.msg);
  },
  methods: {
    onRefresh(){
      let userId = localStorage.getItem('userId');
      let dbName = userId+"NewMsg"
      let _this = this;
      IDBMethods.getAllMsgID(dbName,"NewMsg",result=>{
        getUnreadMsg(userId,result).then(res=>{
          if(res.data.data){
            let msg = res.data.data;
            for(var i=0; i<msg.length; i++){
              this.receiveMsgs.unshift(msg[i]);
            }
            IDBMethods.addNewMsg(dbName,"NewMsg",res.data.data);
            this.$notify({ type: 'primary', message: '刷新成功',duration:500 });
            this.isLoading = false;
          }else if(res.data.msg == '没有未读消息'){
            this.$notify({ type: 'primary', message: '刷新成功',duration:500 });
            this.isLoading = false;
          }
        })
      })
    getSendingMsg(userId).then(res=>{
      this.sendMsgs = res.data.data;
    })
    },
    //查看新到通知
    clickReceiveMsg(e) {
      this.receiveNumber--;
      this.msg = e;
      this.$router.push("/receive_msg_detail");
    },
    //查看送达中通知
    clickSendMsg(e) {
      this.msg = e;
      this.$router.push("/send_msg_detail");
    },
    //拒绝群组邀请
    clickRefuse() {
      alert("拒绝");
    },
    //同意群组邀请
    clickAgree() {
      alert("同意");
    }
  }
};
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
.footer {
  margin-bottom: 50px;
}
.invite {
  margin-top: 10px;
}
</style>>

