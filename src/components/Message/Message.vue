<template>
  <div id="message">
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="收到" fixed></van-nav-bar>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="refresh" >
      <div class="content">
      <van-search
        v-model="search"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
        class="search"
      ></van-search>

      <template v-for="(item,index) in msgList">
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
        ></base-msg-cell>
      </template>
      </div>
    </van-pull-refresh>
    <!-- <receive-msg-detail ></receive-msg-detail> -->
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
      isLoading:false,
      msgList:'',
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
    let dbName = localStorage.getItem('userId')+"NewMsg";
    IDBMethods.getAllMsg(dbName,"NewMsg",0,result=>{
      this.msgList = result;
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
            this.msgList.unshift(msg[i]);
          }
          
          IDBMethods.addNewMsg(dbName,"NewMsg",res.data.data);
        }
    })
    })
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
    },
    //删除
    handleDelete(e) {
      alert(e.title);
    },

    //置顶
    handleTop(e) {
      alert("置顶");
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

</style>