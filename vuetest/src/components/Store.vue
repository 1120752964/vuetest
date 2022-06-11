<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
      <!--      {{this.$route.query.userId}}-->
      <el-header>
        <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content bg-purple">店家商品管理系统</div></el-col>
          <el-col :span="6"><div id="StoreName" class="grid-content bg-purple">欢迎尊贵的店家:{{sname}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple"> <el-button @click="goback()">退出</el-button></div></el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router :default-openeds="['1','2']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
              <el-menu-item  index="StoreCommodities"  :class="$route.path.includes('/StoreCommodities')?'is-active':''">全部商品</el-menu-item>
              <el-menu-item index="AddCommodity"  :class="$route.path.includes('/AddCommodity')?'is-active':''">上架商品</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
              <el-menu-item index="StoreAllOrders"  :class="$route.path.includes('/StoreCommodities')?'is-active':''">全部订单</el-menu-item>
              <el-menu-item index="StoreUnSendOrders"  :class="$route.path.includes('/StoreCommodities')?'is-active':''">未发货订单</el-menu-item>
              <el-menu-item index="StoreSendOrders"  :class="$route.path.includes('/StoreCommodities')?'is-active':''">已发货</el-menu-item>
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
  data() {
    return {
      total:0,
      store: [],
      sname:""
    }
  },
  mounted() {
      if(localStorage.getItem("storenumber")){
        this.loadStoreName();
      }
  },
  methods:{
    goback(){
      localStorage.clear();
      this.$router.push("/TotalLogin");
    },
    loadStoreName(){
      const _this=this;
      axios.get("http://localhost:8181/store/findStoreBysid/"+localStorage.getItem("storenumber")).then(function (resp){
        // console.log(resp)
        _this.store = resp.data;
        localStorage.setItem("storename",_this.store.sname)
        _this.sname = _this.store.sname
      })
      let a = ''
      axios.get("http://localhost:8181/commodity/setStoreName/"+localStorage.getItem("storename")).then(function (resp){
      })
    }
  }
}

</script>
