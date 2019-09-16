<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="发出" @click-right="onClickRight" fixed>
        <van-icon class-prefix="my-icon" name="edit" slot="right" color="#191f25" size="18" />
      </van-nav-bar>
    </div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> 
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
            :read="item.readNum"
            :all="item.number"
            :content="item.content|ellipsis"
            :time="item.time"
            statusRed="red"
            @handleDelete="handleDelete(item)"
            @handleTop="handleTop(item)"
            @click="clickMsg(item)"
          ></base-msg-cell>
        </template>
      </van-pull-refresh>
  </div>
</template>

<script>
import eventBus from "./../../util/eventBus";
import BaseMsgCell from "./../../common/BaseMsgCell";
import {getSendingMsg} from "../../api/message"
export default {
  components: {
    BaseMsgCell
  },
  data() {
    return {
      isLoading:false,
      search:'',
      msgList:'',
      msg: ""
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
    eventBus.$emit("sendMsgDetail", this.msg);
  },
  created(){
    let userId = localStorage.getItem('userId');
    getSendingMsg(userId).then(res=>{
      this.msgList = res.data.data;
    })
  },
  methods: {
    onSearch(){},
    onRefresh(){
      setTimeout(() => {
        this.$notify({ type: 'primary', message: '刷新成功',duration:500 });
        this.isLoading = false;
      }, 300);
    },
    //编辑通知
    onClickRight() {
      this.$router.push("/edit_msg");
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
      this.$router.push("/send_msg_detail");
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