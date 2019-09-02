<template>
  <div class="viewOrganization">
    <div class="header">
      <van-nav-bar title="查看学院机构" left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
    </div>
    <div class="content">
      <Organization v-for="(model, index) in list" :model="model" :key="index"></Organization>
    </div>
  </div>
</template>

<script>
import Organization from "../../../base/Organization";
export default {
  components: {
    Organization
  },
  data() {
    return {
      list: [
        {
          id: "1",
          menuName: "信息院",
          childTree: [
            {
              menuName: "项目进度",
              childTree: [
                {
                  menuName: "项目一",
                  childTree: [{ menuName: "详细信息" }]
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                },
                {
                  menuName: "项目一"
                }
              ]
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            },
            {
              menuName: "qqqqqqqqqqqqqq"
            }
          ]
        },
        {
          id: "2",
          menuName: "物电院"
        },
        {
          id: "3",
          menuName: "音舞院"
        },
        {
          id: "4",
          menuName: "国交院"
        },
        {
          id: "5",
          menuName: "文学院"
        },
        {
          id: "6",
          menuName: "商学院"
        },
        {
          id: "7",
          menuName: "医学院"
        },
        {
          id: "8",
          menuName: "资环院"
        },
        {
          id: "9",
          menuName: "xx院"
        },
        {
          id: "10",
          menuName: "xx院"
        },
        {
          id: "11",
          menuName: "xx院"
        },
        {
          id: "12",
          menuName: "xx院"
        },
        {
          id: "13",
          menuName: "xx院"
        },
        {
          id: "14",
          menuName: "xx院"
        },
        {
          id: "15",
          menuName: "xx院"
        }
      ]
    };
  },
  methods: {
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
</style>