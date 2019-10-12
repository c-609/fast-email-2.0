<template>
  <div class="viewOrganization">
    <div class="header">
      <van-nav-bar title="查看学院机构" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="content">
      <van-checkbox-group v-model="result"  v-for="(item, index) in list"
          :key="item.id">
          <div class="cell">
            <van-checkbox
            
              :name="item.id"
              @click="check(item.id,index)"
            >
            </van-checkbox>
            <van-cell :title="item.name" @click="next(item.id,index)" clickable/>
            <van-icon name="arrow" class="icon" size="16"/>
          </div>
      </van-checkbox-group >
      
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      list:[
        {
           id:'a',
           name:'信息院',
           child:[
             {
               id:'c',
               name:'16计科'
             },
             {
               id:'c',
               name:'16计科'
             },
           ] 
        },
        {
           id:'b',
           name:'物电院',
           child:[] 
        },
      ],
      result: ['f','b', 'a','e']
    };
  },
  methods: {
    check(id,index) {
      console.log(id)
    },
    next(id,index){
      console.log(id)
    },
    onClickLeft() {
      this.$router.push("/mine");
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
.content {
  
  margin-top: 46px;
  
}
.content .van-cell {
  display: inline-block;
  position: absolute;
  padding: 0;
  margin: 0;
  margin-left: 5px;
  line-height: 37px;
  padding-left: 10px;
}
.content .van-checkbox{
  margin-left: 15px;
  display: inline-block;
  padding-top: 9px;
  padding-bottom: 9px;
}
.cell{
  position: relative;
} 
.cell .icon{
  position: fixed;
  right: 5px;
  margin-top: 13px;
}
</style>