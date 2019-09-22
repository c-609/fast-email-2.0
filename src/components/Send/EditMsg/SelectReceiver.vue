<template>
  <div class="viewOrganization">
    <div class="header">
      <van-nav-bar title="我的机构" left-arrow @click-left="goBack" fixed></van-nav-bar>
    </div>
    <div class="content">
      <org-list :data="list" :key="list.parentId" @goNext="goNext" @updateData="updateData"></org-list>
    </div>
  </div>
</template>

<script>
import OrgList from "./OrgList";
import eventBus from "./../../../util/eventBus";
import { getChildOrg, getOrgUsers } from "../../../api/organization";
export default {
  components: {
    OrgList
  },
  data() {
    return {
      index: 0,

      //数据存储结构如下hasChild是否有子节点，0无，有的话没有haschild属性，最后用户层数据用户得属性
      // data1: {
      //   parentId: 0,
      //   parentStatus: -1,
      //   data: [
      //     { id: 1, name: "信息", status: -1 ,hasChild: 0},
      //     { id: 2, name: "物电", status: -1 ,hasChild: 0},
      //     { id: 3, name: "化工", status: -1,hasChild: 0 }
      //   ]
      // },

      list: "", //对象，当前界面的数据对象 {parentId，parentStatus，data[]}
      currentList: "", //本级最新的数据对象
      stack: [], //数组，存储路过的数据对象，便于返回,list
      tree: [], // 数组，存放请求到的所有数据对象,将parentId作为数组的下标
      result: []
    };
  },

  created() {
    //监听select List传来的数据
    eventBus.$on("selectList", (tree, result) => {
      this.tree = tree;
      console.log(this.tree);
      // this.result = result;

      //请求第一级，parentId默认为0
      //请求数据前要先查找数据是否在tree中有，没有则发送请求

      var temp;
      temp = this.findDataInTree(1);

      var list = new Object();
      if (temp == 1) {
        list = this.tree[1];
        // this.list = "";
        this.list = list;
        this.stack.push(list);
        this.tree[list.parentId] = list;
      } else {
        // list = this.getDataById(1);
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
      }
    });
  },
  beforeDestroy() {
    //将发送请求得到的所有数据以及选择的所有用户传给ReceicverList页面
    eventBus.$emit("selectReceiver", this.tree, this.result);
    eventBus.$off("selectList");
  },
  methods: {
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
      var data;
      var list = new Object();
      getChildOrg(id).then(res => {
        data = res.data.data;
        list.parentId = id;
        list.parentStatus = 0;
        list.data = data;
        console.log(list);
        return list;
      });
    },

    //进入下一级，item为当前点击数据
    goNext(item) {
      this.currentList = "";

      var temp;
      var id = item.id;
      var status = item.status;

      temp = this.findDataInTree(id);

      var list = new Object();
      if (temp == 1) {
        list = this.tree[id];
        //父节点全选，则接下来一级数据状态为选择
        // console.log(list)
        if (status == 1) {
          list.parentStatus = 1;
          for (var i = 0; i < list.data.length; i++) {
            list.data[i].status = 1;
          }
        }
        // console.log(list);
        // this.list = "";
        this.list = list;
        this.stack.push(list);
        this.index++;
        this.tree[list.parentId] = list;
      } else {
        var data;

        getChildOrg(id).then(res => {
          //机构下一层是用户，发送请求用户的请求
          var _this = this;
          if (res.data.data == null) {
            getOrgUsers(id).then(res => {
              if (res.data.data != null) {
                console.log(res.data.data);
                data = res.data.data;
                list.parentId = id;
                list.parentStatus = 0;
                list.data = data;

                for (var i = 0; i < list.data.length; i++) {
                  list.data[i].status = 0;
                  list.data[i].hasChild = 0;
                }

                //父节点全选，则接下来一级数据状态为选择
                if (status == 1) {
                  list.parentStatus = 1;
                  for (var i = 0; i < list.data.length; i++) {
                    list.data[i].status = 1;
                  }
                }

                _this.list = list;
                _this.stack.push(list);
                _this.index++;
                _this.tree[list.parentId] = list;
              } else {
                console.log(res.data.data);
              }
            });
          }
          //机构下一层还是机构
          else {
            data = res.data.data;
            list.parentId = id;
            list.parentStatus = 0;
            list.data = data;

            //父节点全选，则接下来一级数据状态为选择
            if (status == 1) {
              list.parentStatus = 1;
              for (var i = 0; i < list.data.length; i++) {
                list.data[i].status = 1;
              }
            }

            this.list = list;
            this.stack.push(list);
            this.index++;
            this.tree[list.parentId] = list;
          }
        });
      }

      //最后一级不进行进入下一级
      //..................
    },

    //状态改变，返回当前数据对象
    updateData(val) {
      this.currentList = val;
    },

    //返回，退出页面或者返回上一级
    goBack() {
      //放回上一级

      var checked = 0; //本级被选择的数目
      var currentList;

      if (this.currentList == "") {
        currentList = this.list;
      } else {
        currentList = this.currentList;
      }

      //判断本级数据是否全选和存在半选，确定返回上一级的状态
      var halfChecked = 0;
      for (var i = 0; i < currentList.data.length; i++) {
        if (currentList.data[i].status == 1) {
          checked++;
        } else if (currentList.data[i].status == -1) {
          halfChecked = -1;
        }
      }
      if (checked == currentList.data.length) {
        currentList.parentStatus = 1;
      } else if (checked == 0) {
        if (halfChecked == -1) {
          currentList.parentStatus = -1;
        } else {
          currentList.parentStatus = 0;
        }
      } else {
        currentList.parentStatus = -1;
      }

      this.tree[currentList.parentId] = currentList;

      this.stack.pop();
      //退出页面,处理选择的接收者
      if (this.stack.length == 0) {
        var result = new Array(); //最后发送精确到用户，userId,name
        var deptIds = new Array(); //所选部门id
        var users = new Array(); //所选用户

        //筛选出用户和部门
        for (var i = 0; i < this.tree.length; i++) {
          if (this.tree[i] != undefined) {
            if (this.tree[i].parentStatus != 0) {
              if (this.tree[i].data != undefined) {
                for (var j = 0; j < this.tree[i].data.length; j++) {
                  if (this.tree[i].data[j].status == 1) {
                    var obj = new Object();
                    //用户id
                    if (this.tree[i].data[j].userId != undefined) {
                      obj.userId = this.tree[i].data[j].userId;
                      obj.name = this.tree[i].data[j].name;
                      users.push(obj);
                    }
                    else{
                      deptIds.push(this.tree[i].data[j].id );
                    }
                  }
                }
              }
            }
          }
        }

        //取所选部门下人
         getOrgUsers(2).then(res => {
           console.log(res.data)
         })

        this.result = result;
        console.log(deptIds);
        console.log(users)
        this.$router.go(-1);
      } else {
        var parentId = this.stack[this.stack.length - 1].parentId;
        var data = this.tree[parentId].data;

        var id = currentList.parentId;
        var status = currentList.parentStatus;
        for (var i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            this.tree[parentId].data[i].status = status;
            break;
          }
        }

        this.list = "";
        this.list = this.stack[this.stack.length - 1];
        this.currentList = "";
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
</style>