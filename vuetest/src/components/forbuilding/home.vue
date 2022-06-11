<template>
  <el-container style=" border: 1px solid #eee;height: 3%;">
    <el-header class="el-header" style="background-color:rgb(246,126,0);color: #333 ">
      <div class="left" style="width: 300px;float: left;color: #eeeeee;margin: 3px">
        <img :src="logoimg" style="height: 55px;width: 55px">
        <span  style="font-size: larger;position: absolute;top: 10px;">金办信息管理系统</span>
      </div>
      <div class="right" style="float: right">
        <span style="margin-right: 20px;color: #eeeeee;">{{name}}</span>
        <el-button size="mini" @click="goback()" >退出</el-button>
      </div>
    </el-header>
    <el-container style="height: 95%" >
      <el-aside width="200px" style=" background-color:rgb(84,92,100)">
        <el-menu
            :default-active="activepath"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color=rgb(84,92,100)
            text-color="#fff"
            active-text-color=rgb(246,126,0)>
          <el-menu-item index="2" @click="managebuildings()">
            <i class="el-icon-office-building"></i>
            <span slot="title"  >房源管理</span>
          </el-menu-item >
          <el-menu-item index="3" @click="addbuilding()">
            <span slot="title" style="padding-left: 30px">录入房源</span>
          </el-menu-item>
          <el-menu-item index="4" @click="manageCustomers()">
            <i class="el-icon-s-custom"></i>
            <span slot="title">客源管理</span>
          </el-menu-item>
          <el-menu-item index="5" @click="addCustomers()">
            <span slot="title" style="padding-left: 30px">录入客源</span>
          </el-menu-item>
          <el-menu-item index="6"  @click="managehouses()" >
            <i class="el-icon-school"></i>
            <span slot="title" >楼盘管理</span>
          </el-menu-item>
          <el-menu-item index="7" @click="addhouses()">
            <span slot="title" style="padding-left: 30px">录入楼盘</span>
          </el-menu-item>
          <el-menu-item index="10" @click="golookaround()">
            <span slot="title" style="padding-left: 30px">看现场</span>
          </el-menu-item>
          <el-submenu index="0" v-if="flag" >
            <span slot="title" style="padding-left: 20px">系统设置</span>
            <el-menu-item index="8" @click="managestaffs()">
              <span slot="title" >员工管理</span>
            </el-menu-item>
            <el-menu-item index="9" @click="addstaff()">
              <span slot="title" >录入员工</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main style="padding: 0px">
        <router-view :key="key"></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>
<style>
.el-header span{
  text-align: center; font-size: 20px;
}

</style>

<script>
import ipconfig from "@/components/forbuilding/ipconfig";

export default {
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    managehouses(){
      this.$router.push("/managehouses");
    },
    addhouses(){
      this.$router.push("/addhouses");
    },
    managestaffs(){
      this.$router.push("/managestaffs");
    },
    golookaround(){
      this.$router.push("/lookaround");
    },
    addstaff(){
      this.$router.push("/addstaff");
    },
    goback(){
      localStorage.clear();
      this.$router.push("/UserLogin");
    },
    managebuildings(){
      this.$router.push("/managebuilding");
    },
    addCustomers(){
      this.$router.push("/addcustomer");
    },
    addbuilding(){
      this.$router.push("/addbuilding");
    },
    manageCustomers(){
      this.$router.push("/managecustomer");
    },

  },
  data() {
    return{
      logoimg:require("@/assets/img/logo.jpg"),
      host:ipconfig.host,
      flag:false,
      name:""
    }
  },
  computed:{
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    },
    activepath(){
      if(this.$route.path === '/managecustomer'){return "4"}
      if(this.$route.path === '/editcustomer'){return "4"}
      if(this.$route.path === '/managebuilding'){return "2"}
      if(this.$route.path === '/editbuilding'){return "2"}
      if(this.$route.path === '/addbuilding'){return "3"}
      if(this.$route.path === '/addcustomer'){return "5"}
      if(this.$route.path === '/managehouses'){return "6"}
      if(this.$route.path === '/edithouses'){return "6"}
      if(this.$route.path === '/addhouses'){return "7"}
      if(this.$route.path === '/lookaround'){return "10"}
      if(this.$route.path === '/managestaffs'){return "8"}
      if(this.$route.path === '/editstaffs'){return "8"}
      if(this.$route.path === '/addstaff'){return "9"}
    }
  },
  mounted(){
    if(localStorage.getItem('stname')){
      this.name = localStorage.getItem('stname');
      const _this=this;
      axios.get(_this.host+'staff/findByStnumber/'+localStorage.getItem('stnumber')).then(function (resp){
        if(resp.data.sttype=="经理"){
          _this.flag = true;
        }
      })
    }else {
      alert("请登录")
      this.goback();
    }
  },
};
</script>
