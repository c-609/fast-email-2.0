<template>
   <div>
            <items :list="list" ></items>
    </div>
</template>

<script>
import Items from './Items'
export default {
   components: {
        Items
    },
    data() {
      return {
          list: [
      {
          "id": "1",
          "menuName": "项目管理",
          "childTree": [{
              "menuName": "项目进度",
              "childTree": [{
                  "menuName": "项目一",
                  "childTree": [{ "menuName": "详细信息" }]
              }]
          }, {
              "menuName": "任务安排"
          }]
      }, 
      {
          "id": "2",
          "menuName": "数据统计"
      }, 
      {
          "id": "3",
          "menuName": "人员管理"
      }]
      }
    }
}
</script>

<style>

</style>