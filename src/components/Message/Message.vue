<template>
  <div id="message">
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="收到" fixed></van-nav-bar>
    </div>
    <div class="content">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="refresh" >
      <div class="content">
      <van-search
        v-model="search"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
        class="search"
      ></van-search>

      <template v-for="(item,index) in MsgList">
        <base-msg-cell
          :key="index"
          :title="item.title"
          :status="item.status"
          :content="item.content|ellipsis"
          :time="item.time"
          statusRed="red"
          @handleDelete="handleDelete(item.id,item.status,index)"
          @handleTop="handleTop(item,item.id,index)"
          @click="clickMsg(item)"
        ></base-msg-cell>
      </template>
      </div>
    </van-pull-refresh>
    <!-- <receive-msg-detail ></receive-msg-detail> -->
    <van-loading color="#1989fa" class="load" v-show="show_loading"/>
    <span class="msg" v-show="show_msg">暂无任何通知</span>
  </div>
  </div>
  
</template>

<script>
import BaseMsgCell from "./../../common/BaseMsgCell";
import eventBus from "./../../util/eventBus";
import {getUnreadMsg} from "../../api/message"
import IDBMethods from "../../api/IndexedDbMethods"
export default {
  components: {
    BaseMsgCell
  },
  data() {
    return {
      show_loading:true,
      show_msg:false,
      isLoading:false,
      msgList:'',
      MsgList:'',
      // NewMsgList:'',
      // ReadMsgList:'',
      // TopMsgList:'',
      msg: "",
      search: "" //搜索
    };
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
    eventBus.$emit("receiveMsgDetail", this.msg);
  },
  created(){
    let NewMsgList = '';
    let ReadMsgList = '';
    let TopMsgList = '';
    let dbName = localStorage.getItem('userId')+"NewMsg";
    IDBMethods.getAllMsg(dbName,"NewMsg",0,result=>{
      console.log(result)
      NewMsgList = result;
    })
    IDBMethods.getAllMsg(dbName,"NewMsg",1,result=>{
      console.log(result)
      ReadMsgList = result;
    })
    IDBMethods.getAllTopMsg(dbName,"NewMsg",1,result=>{
      console.log(result)
      TopMsgList = result;
      this.msgList = TopMsgList.concat(NewMsgList.concat(ReadMsgList));
    })

  },
  computed: {
    tables() {
      const search = this.search;
      if (search) {
        return this.msgList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.msgList;
    }
  },
  watch: {
    tables() {
      this.MsgList = this.tables;
      if(this.MsgList == ''){
        this.show_msg = true;
      }else{
        this.show_msg = false;
      }
    }
  },
  mounted(){
    let userId = localStorage.getItem('userId');
    let dbName = userId+"NewMsg"
    IDBMethods.getAllMsgID(dbName,"NewMsg",result=>{
      getUnreadMsg(userId,result).then(res=>{
        console.log(res.data)
        if(res.data.code == 0){
          this.show_loading = false;
        }
        if(res.data.data){
          let msg = res.data.data;
          for(var i=0; i<msg.length; i++){
            this.msgList.unshift(msg[i]);
          }
          
          IDBMethods.addNewMsg(dbName,"NewMsg",res.data.data);
        }else{
          this.show_loading = false;
        }
    })
    })
    if(this.msgList == ''){
      this.show_loading = false;
    }
    if(this.msgList == null){
      this.show_msg = true;
    }
  },
  methods: {
        onRefresh(){
        this.show_msg = false;
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
      if(this.MsgList == ''){
        this.show_msg = true;
      }else{
        this.show_msg = false;
      }
    },
    //删除
    handleDelete(id,status,index) {
      console.log(index);
      if(status == 0){
        this.$dialog.alert({
        message: '未读通知不能删除'
        });
      }else{
        let userId = localStorage.getItem('userId');
        let dbName = userId+"NewMsg";
        IDBMethods.editMessageStatus(dbName,"NewMsg",id,2);
        this.msgList.splice(index,1);
      }
      
    },

    //置顶
    handleTop(item,id,index) {
      let userId = localStorage.getItem('userId');
      let dbName = userId+"NewMsg";
      IDBMethods.topMsg(dbName,"NewMsg",id,1);
      this.msgList.splice(0,0,item);
      this.msgList.splice(index+1,1);
    },
 
    //点击通知，查看详情
    clickMsg(e) {
      this.msg = e;
      this.$router.push("/receive_msg_detail");
    },

    onSearch() {},
    timeChange(picker, value, index) {
      this.select_time = picker.getValues();
      console.log(picker.getValues());
    }
  }
};
</script>

<style scoped>
.search{
  margin-top: 44px;
}
.van-nav-bar {
  background: #f6f6f6;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.load{
  position:fixed;
  top:50%;
  margin-top: -20px;
  left: 50%;
  margin-left: -20px;

}
.msg{
  position:fixed;
  top:50%;
  margin-top: -30px;
  left: 50%;
  margin-left: -42px;
  color: #969799;
  font-size: 14px;
}
.content{
  margin-bottom: 52px;
}
 
</style>