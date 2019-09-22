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
import { getOrg, getChildOrg } from "../../../api/organization";
export default {
  components: {
    OrgCell
  },
  data() {
    return {
      index: 0,
      list: "", //对象，当前界面的数据对象 {parentId，parentStatus，data[]}
      stack: [], //数组，存储路过的数据对象，便于返回,list
      tree: [] // 数组，存放请求到的所有数据对象,将parentId作为数组的下标
    };
  },
  created() {
    var data;
    getChildOrg(1).then(res => {
      data = res.data.data;
      list.parentId = 1;
      list.parentStatus = 0;
      list.data = data;
      this.list = list;
      this.stack.push(list);
      this.tree[list.parentId] = list;
      console.log(this.tree);
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
      } else {
        list = this.getDataById(id);
      }
      this.list = list;
      this.stack.push(list);
      this.tree[id] = list;
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
    },

    //发请求请求数据
    getDataById(id) {
      if (id == 0) return this.data1;
      else if (id == 1) return this.data2;
      else if (id == 11) return this.data3;
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
</style>