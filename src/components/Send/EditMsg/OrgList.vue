<template>
  <div class="org-cell">
    <van-cell  v-for="(item,index) in mydata.data" :key="index">
      <template slot="title">
        <img src="/static/yuan.png" v-if="item.status==0" @click="select(item.status,index)" />
        <img src="/static/heng.png" v-else-if="item.status==-1" @click="select(item.status,index)" />
        <img src="/static/gou.png" v-else-if="item.status==1" @click="select(item.status,index)" />
        <span class="custom-title">{{item.name}}</span>
      </template>
      <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" @click="click(item)" v-if="item.hasChild!=0"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "OrgCell",
  props: {
    //当前界面显示的数据
    data: {
      type:Object
    },

  },
  data() {
    return {
      mydata:this.data,
      listener: 0,//监听是否对选择框进行操作
    };
  },
  watch:{
    listener(){
    this.$emit("updateData",this.mydata);//updateDate传回数据状态被改变后的mydata
    }
  },
  methods: {
    select(status,index) {
      //不选变全选
      if (status == 0) {
        this.mydata.data[index].status = 1;
      }
      //全选变不选
      else if (status == 1) {
        this.mydata.data[index].status = 0;
      }
      //半选变全选
      else if (status == -1) {
        this.mydata.data[index].status = 1;
      }
      this.listener++;
    },
    //点击右键头
    click(item) {
      this.$emit("goNext",item); //goNext:进入下一级，并把被点击的数据传回
    }
  }
};
</script>

<style scoped>
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
</style>