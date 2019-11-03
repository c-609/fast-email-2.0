<template>
  <div class="org-cell">
    <van-cell  :title="data.name" @click="click" >
      <van-icon slot="right-icon" name="arrow" style="line-height: inherit;"   />
    </van-cell>
    <van-popup v-model="showInfo"  :style="{ height: '100%', width: '100%' }">
      <van-nav-bar title="查看用户" left-arrow @click-left="back" fixed>
        <van-button type="info" slot="right" size="small" @click="onClickRight">确认</van-button>
      </van-nav-bar>
      <div class="detail">
        <van-field disabled v-model="data.name" label="姓名"  />
        <van-field disabled v-model="data.email" label="邮箱"  v-show="data.email!=null"/>
        <van-field disabled v-model="data.phone" label="电话"  v-if="data.phone"/>
        <van-field disabled v-model="data.identityEntities[0].roleCNName" label="角色"  v-if="data.phone"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "OrgCell",
  props: {
    data: {
      type:Object
    },

  },
  data() {
    return {
      showInfo:false
    }
  },
  methods: {
    //右上角确认按钮
    onClickRight(){
        this.$router.push("/mine");
    },
    back(){
      this.showInfo = false;
    },
    //点击右键头
    click() {
      if(this.data.hasChild == 0){
        this.showInfo = true;
      }else{
        this.$emit("goNext",this.data);
      }
    },
  }
};
</script>

<style scoped>
.shenfen {
  font-size: 14px;
  margin-top: 10px;
  padding-left: 15px;
}

.org-cell .detail {
  margin-top: 46px;
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

</style>