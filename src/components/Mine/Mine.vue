<template>
  <div class="mine">
    <div class="header">
      个人中心
      <van-icon
        name="setting-o"
        style="float:right;padding:13px 15px 0 0;"
        size="18"
        @click="clickSetting()"
      />
    </div>
    <div class="card">
      <div class="identify">
        <ul>
          <li>张三</li>
          <li>
            <van-icon class-prefix="my-icon" name="tel" />  12857485983
          </li>
          <li>
            <van-icon class-prefix="my-icon" name="email" />  386596055@qq.com
          </li>
          <li>
            <van-icon class-prefix="my-icon" name="organization" />  教务处
          </li>
          <li>
            <van-icon class-prefix="my-icon" name="role" size="13" />  教务处处长
          </li>
        </ul>
      </div>
      <img src="../../assets/hdImg_de21995e655487fd40cc7238ff32abc415670486495.jpg" />
      <div class="edit">
        <van-icon name="edit" color="white" size="14" class="edit-icon" @click="clickSetting()"></van-icon>
      </div>
    </div>
    <div class="group">
      <van-cell-group>
        <van-cell  is-link to="/view_organization" >
          <template slot="title">
            <van-icon class-prefix="my-icon" name="organization" />
            <span class="custom-title">学院机构</span>
          </template>
        </van-cell>
        <van-cell is-link to="/my_group" >
          <template slot="title">
            <van-icon class-prefix="my-icon" name="group" />
            <span class="custom-title">我的群组</span>
          </template>
        </van-cell>
        <van-cell is-link :border="false" to="/joined_group">
          <template slot="title">
            <van-icon class-prefix="my-icon" name="mygroup" />
            <span class="custom-title">我加入的群组</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="rec">
      <van-cell is-link  to="recycle_list" >
        <template slot="title">
            <van-icon class-prefix="my-icon" name="rec" />
            <span class="custom-title">回收站</span>
          </template>
      </van-cell>
    </div>
    <div class="logout">退出登录</div>
  </div>
</template>

<script>
export default {
  methods: {
    goPath(url) {
      this.$router.push(url);
    },
    clickSetting() {
      this.$toast({
        message: "暂未上线",
        duration: 1000,
        position: "bottom"
      });
    }
  }
};
</script>

<style scoped>
.mine {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.header {
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  font-size: 15px;
  font-weight: 600;
  padding-left: 20px;
  color: #323233;
}
.card {
  width: 340px;
  height: 180px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #efefef;
  position: relative;
}
.identify {
  float: left;
  padding: 20px;
}
.identify ul li {
  padding-bottom: 5px;
  color: #6e6e6e;
}
.identify ul li:first-child {
  font-size: 18px;
  font-weight: 600;
  color: #323233;
}
.card img {
  float: right;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #6e6e6e;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  margin: 20px 20px 0 0;
}
.edit {
  width: 0;
  height: 0;
  border: 15px solid;
  border-color: transparent #3296fa #3296fa transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0 0 6px 0;
}
.edit-icon {
  position: absolute;
  left: -2px;
  top: -3px;
}
.group {
  margin-top: 20px;
}
.rec {
  margin-top: 10px;
}
.logout {
  height: 44px;
  background-color: #fff;
  text-align: center;
  color: red;
  line-height: 44px;
  margin-top: 10px;
  font-size: 14px;
}
.logout:active {
  background-color: #f2f3f5;
}
</style>