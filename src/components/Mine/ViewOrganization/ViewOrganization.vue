<template>
  <div class="viewOrganization">
    <div class="header">
      <van-nav-bar title="查看学院机构" left-arrow @click-left="goBack" fixed></van-nav-bar>
    </div>
    <div class="content">
      <org-cell v-for="item in list.data" :key="item.id" :data="item" @goNext="goNext"></org-cell>
    </div>
  </div>
</template>

<script>
import OrgCell from "../../../base/OrgCell";
import { getOrg, getChildOrg, getOrgUsers } from "../../../api/organization";
export default {
  components: {
    OrgCell
  },
  data() {
    return {
      index: 0,
      list: "", //对象，当前界面的数据对象 {parentId，data[]}
      stack: [], //数组，存储路过的数据对象，便于返回,list
      tree: [] // 数组，存放请求到的所有数据对象,将parentId作为数组的下标
    };
  },
  created() {
    var data;
    var list = new Object();
    getChildOrg(1).then(res => {
      data = res.data.data;
      list.parentId = 1;
      list.data = data;
      this.list = list;
      this.stack.push(list);
      this.tree[list.parentId] = list;
    });
  },

  methods: {
    //进入下一级，item为当前点击数据
    goNext(item) {
      var temp;
      var id = item.id;
      temp = this.findDataInTree(id);

      var list;
      if (temp == 1) {
        list = this.tree[id];
        this.list = list;
        this.stack.push(list);
        this.tree[id] = list;
      } else {
        var data;
        var list = new Object();
        getChildOrg(id).then(res => {
          if (res.data.data == null) {
            getOrgUsers(id).then(res => {
              data = res.data.data;
              for (var i = 0; i < data.length; i++) {
                data[i].hasChild = 0;
              }
              list.parentId = id;
              list.data = data;
              this.list = list;
              this.stack.push(list);
              this.tree[list.parentId] = list;
            });
          } else {
            data = res.data.data;
            list.parentId = id;
            list.data = data;
            this.list = list;
            this.stack.push(list);
            this.tree[list.parentId] = list;
          }
        });
      }
    },
    //返回，退出页面或者返回上一级
    goBack() {
      this.stack.pop();
      if (this.stack.length == 0) {
        this.$router.push("/mine");
      } else {
        this.list = this.stack[this.stack.length - 1];
      }
    },
    //通过id判断要请求的数据tree中是否存在，返回 0不存在，1存在
    findDataInTree(id) {
      if (this.tree[id] == undefined) {
        return 0;
      } else {
        return 1;
      }
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