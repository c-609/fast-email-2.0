<template>
    <div>
            <button @click="test1()">123</button>
            <button @click="test2()">456</button>
            <span>{{testdata}}</span>
    </div>
</template>

<script>

export default {
   
    data(){
        return {
            testdata:[],
           msg:[
        {
            "id": 1,
            "senderId": 2,
            "senderName": "张三",
            "title": "测试一",
            "content": "你好，这是测试一",
            "time": "2019-09-05 14:37:38",
            "number": 20,
            "readNum": 2,
            "status": 0,
            "deptRoleId": 1,
            "identity": {
                "id": null,
                "deptRoleId": 1,
                "deptId": null,
                "deptName": "dept-update",
                "roleId": null,
                "roleName": null,
                "roleCNName": "update_name"
            }
        }
           ]
       }
   },
   methods:{
       test1(){
           this.testdata.unshift(this.msg);
       },
       test2(){
           console.log(this.testdata);
       }
   }
}
</script>

<style>

</style>