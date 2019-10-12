<template>
  <div class="joinedGroup">
    <div class="header">
      <van-nav-bar title="查看群组" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="search" />
    </div>
    <div class="groups">
      <van-cell-group v-for="(item,index) in JoinedGroup" :key="index">
        <van-cell :title="item.name" value="" :label="item.createTime" @click="view_joinedGroup(item.id)" />
      </van-cell-group>
    </div>
    <div class="msg" v-show="showMsg">
      <span>暂无任何群组</span>
    </div>
  </div>
</template>

<script>
import {getJoinedGroup} from '../../../api/group'
import eventBus from "../../../util/eventBus"
export default {
  data(){
    return {
      search:'',
      JoinedGroup:'',
      joinedGroup:'',
      showMsg:false,
      joinedId:'',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/mine");
    },
    view_joinedGroup(id) {
      this.joinedId = id;
      this.$router.push("/view_joined_group");
    }
  },
  created(){
    let userId = localStorage.getItem('userId');
    getJoinedGroup(userId).then(res=>{
      this.joinedGroup = res.data.data;
      console.log(res.data.data)
      if(!res.data.data) {
        this.showMsg = true;
      }
    })
  },
  beforeDestroy() {
     eventBus.$emit("joinedId", this.joinedId);
  },
   computed: {
    tables() {
      const search = this.search;
      if (search) {
        return this.joinedGroup.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.joinedGroup;
    }
  },
  watch: {
    tables() {
      this.JoinedGroup = this.tables;
    }
  },
};
</script>

<style scoped>
.joinedGroup {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.van-nav-bar {
  background-color: #f6f6f6;
}
.header {
  border-bottom: 1px solid #d2d2d2;
}
.van-nav-bar .van-icon {
  color: #191f25;
}
.van-nav-bar__arrow {
  font-size: 18px;
}
.search {
  height: 54px;
  width: 100%;
  z-index: 999;
  position: fixed;
  margin-top: 44px;
  border-bottom: 1px solid #efefef;
  box-shadow: 0px 1px 1px rgba(50, 50, 50, 0.1);
}
.groups {
  margin-top: 106px;
}
.msg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: #969799;
  font-size: 14px;
}
</style>