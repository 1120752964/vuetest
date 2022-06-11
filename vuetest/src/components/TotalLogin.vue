<template>
  <div>
  <div align="center">
    <h1 style="margin-top: 75px">请选择对应的登录窗口登录:</h1>
    <el-row>
      <el-button class="a" @click="goUser()"  type="primary">用户登录</el-button>
      <el-button class="a" @click="goStore()" type="success">商家登录</el-button>
      <el-button class="a" @click="goAdministrator()" type="info">管理员登录</el-button>

    </el-row>
  </div>
  <div align="center" style="margin-top: 75px">
  <el-button   @click="goMall()">免注册随便逛逛</el-button>
  </div>
  </div>
</template>

<script>
export default {
  name: "TotalLogin",
  methods:{

    goUser() {
      this.$router.push({path:'/UserLogin'});
    },
    goStore() {
      this.$router.push({path:'/StoreLogin'});
    },
    goAdministrator() {
      this.$router.push({path:'/AdministratorLogin'});
    },
    goMall() {
      this.$router.push({path:'/ClothingMall'});
    },
  }
}
</script>

<style scoped>
  .a{
    margin-top: 100px;
    margin-right: 25px;
    margin-left: 25px;
  }
</style>