<template>
  <div>
    <div class="header">
      <van-nav-bar title="创建群组" left-arrow @click-left="goBack" fixed>
        <van-button slot="right" size="small" type="info" @click="confirm">确认</van-button>
      </van-nav-bar>
    </div>

    <div class="content">
      <org-list :data="list" :key="list.parentId" @goNext="goNext" @updateData="updateData"></org-list>
    </div>
  </div>
</template>

<script>
import OrgList from "../../../Send/EditMsg/OrgList";
import eventBus from "../../../../util/eventBus";
import { getOrg, getChildOrg, getOrgUsers } from "../../../../api/organization";
export default {
  components: {
    OrgList
  },
  data() {
    return {
      list: "", //对象，当前界面的数据对象 {parentId，parentStatus，data[]}
      currentList: "", //本级最新的数据对象
      stack: [], //数组，存储路过的数据对象，便于返回,list
      tree: this.$store.state.tree, // 数组，存放请求到的所有数据对象,将parentId作为数组的下标
      result: [],
      currentList: ""
    };
  },
  watch: {
    tree() {
      this.$store.commit("setTree", this.tree);
    }
  },
  created() {
    var temp;
    temp = this.findDataInTree(1);
    var list = new Object();
    if (temp == 1) {
      list = this.tree[1];
      this.list = list;
      this.stack.push(list);
      this.tree[list.parentId] = list;
    } else {
      var data = new Array();

      getChildOrg(1).then(res => {
        // data.push(res.data.data);
        data = res.data.data;
        list.parentId = 1;
        list.data = data;
        this.list = list;
        this.stack.push(list);
        this.tree[list.parentId] = list;
      });
    }
  },
  beforeDestroy() {
    eventBus.$emit("chooseMumber", this.result);
    // this.$store.commit("setResult", this.result);
  },
  methods: {
    confirm() {
       while (this.stack.length != 0) {
        this.goBack();
      }
    },
    //通过id判断要请求的数据tree中是否存在，返回 0不存在，1存在
    findDataInTree(id) {
      if (this.tree[id] == null || this.tree[id] == undefined) {
        return 0;
      } else {
        return 1;
      }
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
        //父节点不选，则接下来一级数据状态为全不选择
        // console.log(list)
        if (status == 0) {
          list.parentStatus = 0;
          for (var i = 0; i < list.data.length; i++) {
            list.data[i].status = 0;
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

        getChildOrg(item.id).then(res => {
          //机构下一层是用户，发送请求用户的请求
          var _this = this;
          if (res.data.data == null) {
            getOrgUsers(id).then(res => {
              if (res.data.data != null) {
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
                Toast("该机构下没有内容");
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
        this.exitChooseMenber();
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
    },

    exitChooseMenber() {
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
                  } else {
                    deptIds.push(this.tree[i].data[j].id);
                  }   
                }
                if (this.tree[i].data[j].status == 0) {
                    if (this.tree[this.tree[i].data[j].id] != undefined) {
                      this.tree[this.tree[i].data[j].id].parentStatus = 0;
                      for (
                        var h = 0;
                        h < this.tree[this.tree[i].data[j].id].data.length;
                        h++
                      ) {
                        this.tree[this.tree[i].data[j].id].data[h].status = 0;
                      }
                    }
                  }
              }
            }
          }
          if (this.tree[i].parentStatus == 0) {
              for (var n = 0; n < this.tree[i].data.length; n++) {
                this.tree[i].data[n].status = 0;
                if (this.tree[this.tree[i].data[n].id] != undefined) {
                  this.tree[this.tree[i].data[n].id].parentStatus = 0;
                }
              }
            }
        }
      }

      //有机构被选
      if (deptIds.length > 0) {
        var depts = deptIds.join(",");
        getOrgUsers(depts).then(res => {
          var data = res.data.data;
          for (var j = 0; j < data.length; j++) {
            result[data[j].userId] = data[j].name;
          }

          //有用户被选
          if (users.length > 0) {
            for (var i = 0; i < users.length; i++) {
              result[users[i].userId] = users[i].name;
            }
          }

          if (result != null) {
            for (var i = 0; i < result.length; i++) {
              if (result[i] != null) {
                var obj = new Object();
                obj.userId = i;
                obj.name = result[i];
                this.result.push(obj);
              }
            }
          }
          this.$router.push("create_group");
        });
      } else {
        if (users.length > 0) {
          for (var i = 0; i < users.length; i++) {
            result[users[i].userId] = users[i].name;
          }
        }

        if (result != null) {
          for (var i = 0; i < result.length; i++) {
            if (result[i] != null) {
               var obj = new Object();
                obj.userId = i;
                obj.name = result[i];
                this.result.push(obj);
            }
          }
        }
        this.$router.push("create_group");
      }
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 46px;
}
</style>