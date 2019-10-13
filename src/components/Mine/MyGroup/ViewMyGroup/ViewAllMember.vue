<template>
  <div class="allMember">
    <div class="header">
      <van-nav-bar title="查看成员" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="search" />
    </div>
    <div class="members">
      <div class="member" v-for="(item,index) in MemberList" :key="index">
        <span >{{item.name}}</span>
        <van-tag class="delete_icon" v-show="userId==item.userId" type="primary">群主</van-tag>
        <van-icon name="cross" class="delete_icon" size="18" @click="remove_member(item.userId,index)" v-show="userId!=item.userId"></van-icon>
      </div>
    </div>
    <div class="add" v-show="hidshow">
      <van-icon name="add" size="54" color="#ff9800" @click="addMember()"></van-icon>
    </div>
    
  </div>
</template>

<script>
import eventBus from "../../../../util/eventBus"
import {removeMember} from "../../../../api/group"
export default {
  data(){
    return{
      userId:localStorage.getItem('userId'),
      memberList:'',
      MemberList:'',
      search:'',
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true,
    }
  },

  created() {
    eventBus.$on("memberList", res => {
      console.log(res);   
      this.memberList = res;
    });
  },
  computed: {
    tables() {
      const search = this.search;
      if (search) {
        return this.memberList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.memberList;
    }
  },

   beforeDestroy() {
    eventBus.$off("memberList");
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.documentElement.clientHeight;
        })()
    }
  },
  watch:{
    showHeight() {
      if(this.docmHeight != this.showHeight){
          this.hidshow=false 
      }else{
        this.hidshow = true
      }
    },
    tables() {
      console.log("1")
      this.MemberList = this.tables;
    }
  },
  methods: {
    remove_member(userId,index){
      let groupId = localStorage.getItem('groupId')
      removeMember(userId,groupId).then(res=>{
        if(res.data.code == 0){
          this.$toast({
            message: "移除成功",
            duration: 1000,
            position: "bottom"
          });
          this.MemberList.splice(index,1)
        }
      })
    },
    onClickLeft() {
      this.$router.push("/view_my_group");
    },
    addMember(){
      this.$router.push('/add_member')
    }
  }
};
</script>

<style scoped>
.allMember {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

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
.search {
  height: 54px;
  width: 100%;
  z-index: 999;
  position: fixed;
  margin-top: 44px;
  border-bottom: 1px solid #efefef;
  box-shadow: 0px 1px 1px rgba(50, 50, 50, 0.1);
}
.members {
  margin-top: 106px;
}
.member {
  height: 44px;
  background-color: #fff;
  line-height: 44px;
  padding-left: 10px;
  position: relative;
  border-bottom: 1px solid #efefef;
}

.delete_icon {
  position: absolute;
  right: 10px;
  top: 13px;
}
.add {
  position: fixed;
  bottom: 20px;
  right: 15px;
}

</style>