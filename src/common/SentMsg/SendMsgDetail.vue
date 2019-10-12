<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="发出通知" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="delete" slot="right" color="#191f25" size="18" />
      </van-nav-bar>
    </div>

    <!-- 通知详情 -->
    <div class="detail">
      <van-collapse v-model="activeName">
        <van-collapse-item :title="msg.title" name="1">
          发布时间 : {{msg.time}}
          <br />
          发布身份 : {{msg.identity.roleCNName}}
        </van-collapse-item>
      </van-collapse>
      <van-cell title="未读人员" is-link :value="unReadNum" @click="CheckUnReadList()"/>
    </div>
    <van-popup v-model="show" :style="{ height: '100%', width: '100%' } ">
      <div class="header">
        <van-nav-bar title="未读人员" left-arrow @click-left="showList" fixed></van-nav-bar>
        <div class="content_list">
          <div class="cell" v-for="(item,index) in unReadList" :key="index">
            <span>{{item.name}}</span>
            <van-icon name="cross" size="16" class="cell-icon" @click="remove_unread(item.userId)"/>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 通知内容 -->
    <div class="content">
      <van-cell title="通知内容："></van-cell>
      <van-field v-model="msg.content" type="textarea" rows="15" disabled />
    </div>
  </div>
</template>

<script>
import eventBus from "./../../util/eventBus";
import {getUnreadList} from "../../api/message"
export default {
  name: "SendMsgDetail",
  data() {
    return {
      show:false,
      unReadList:'',
      unReadNum:'',
      activeName: ["1"],
      msg: "" //通知对象
    };
  },
  created() {
    eventBus.$on("sendMsgDetail", res => {   
      this.msg = res;
    });
  },
  mounted(){
    getUnreadList(this.msg.id).then(res=>{
        if(res.data.code == 0){
          this.unReadList = res.data.data;
          this.unReadNum = res.data.data.length;
        }
    })
  },
  beforeDestroy() {
    eventBus.$off("sendMsgDetail");
  },
  methods: {
    remove_unread(userId){
      alert(userId)
    },
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    showList(){
      this.show = false;
    },
    //查看未读名单
    CheckUnReadList(){
      console.log(this.unReadList)
      this.show = true;
    },
    //S删除
    onClickRight() {}
  }
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #d2d2d2;
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
.detail .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
.content {
  margin-top: 10px;
}
.content_list {
  margin-top: 46px;
}
.cell {
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding-left: 15px;
}
.cell span {
  color: #191f25;
  font-size: 16px;
}
.cell-icon{
  position: absolute;
  right: 10px;
  margin-top: 13px;
}
</style>