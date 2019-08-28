<template>
  <div class="home">
    <van-tabs v-model="active" sticky swipeable :border="false" animated :line-height="2" > 
        <van-tab title="新到通知">新到通知</van-tab>
        <van-tab title="送达中">送达中</van-tab>
        <van-tab title="群组邀请">群组邀请</van-tab>
    </van-tabs> 
  </div>
</template>

<script>
export default {
    methods:{
        goPath(url){
            this.$router.push(url)
        }
    },
    data() {
        return {
            active:1
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.van-tabs {
    margin-top: 10px;
}
.van-tabs__nav--line {
    padding-bottom: 10px;
}

</style>>

