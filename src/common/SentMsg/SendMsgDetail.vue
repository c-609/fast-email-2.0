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
      <van-cell title="接收人员" is-link />
      <van-cell title="未读人员" is-link :value="unReadNum" @click="CheckUnReadList()"/>
    </div>
    <van-popup v-model="show" :style="{ height: '100%', width: '100%' } ">
      <div class="header">
        <van-nav-bar title="未读人员" left-arrow @click-left="showList" fixed>
          <van-button type="info" slot="right" size="small" @click="handleRead">标记为已读</van-button>
        </van-nav-bar>
        <div class="content">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="index"
                :title="item.name"
                @click="toggle(index)"
              >
                <van-checkbox
                  v-show="show"
                  :name="item"
                  ref="checkboxes"
                  slot="right-icon"
                />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
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
      list: [ ],
      result: [ ],
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
      console.log(res)
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
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
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
      getUnreadList(this.msg.id).then(res=>{
        this.list = res.data.data;
      })
      
      this.show = true;
    },
    //S删除
    onClickRight() {},

    //所选未读人员转为已读
    handleRead(){
      
    }
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
  margin-top: 44px;
}
.cell {
  height: 40px;
  line-height: 40px;
  width: 100%;
  background-color: pink;
  padding-left: 15px;
}
.cell span {
  color: #191f25;
  font-size: 16px;
}
</style>