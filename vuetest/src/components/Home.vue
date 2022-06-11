<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
<!--      {{this.$route.query.userId}}-->
      <el-header>
        <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content bg-purple">服装商城后台管理系统</div></el-col>
          <el-col :span="6"><div id="AdminisitratorName" class="grid-content bg-purple"></div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple"> <el-button @click="goback()">退出</el-button></div></el-col>
        </el-row>

      </el-header>
      <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

        <el-menu router :default-openeds="['2','1']">
          <el-submenu index="1"  >
            <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
            <el-menu-item  index="UserManage"  :class="$route.path.includes('/UserManage')?'is-active':''">用户展示</el-menu-item>
          </el-submenu>

          <el-submenu index="2" >
            <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
            <el-menu-item  index="CommodityManage" :class="$route.path.includes('/CommodityManage')?'is-active':''">商品展示</el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
        <el-container>
         <el-main>
            <router-view></router-view>
         </el-main>
<!--          <el-footer>Footer</el-footer>-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {

  created() {
    const _this=this;
    axios.get("http://localhost:8181/administrator/getAdministrator").then(function (resp){
      // console.log(resp)
     // if(resp.data.aid===0){
     //   alert("账号或密码错误")
     // }
       if(resp.data.aid===1){
         document.getElementById("AdminisitratorName").innerText = "欢迎尊贵的管理员:"+resp.data.aname;
       }else {
         _this.$alert('无管理员!', '', {
           confirmButtonText: '确定',
           callback: action => {
             _this.$router.push("/TotalLogin");

           }
         });
       }
    })
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }, methods:{
    goback:function(){
      this.$router.push("/TotalLogin");
      axios.put("http://localhost:8181/administrator/clearAdministrator/")
    },
    getAdministrator() {

    }
  }
};
</script>
