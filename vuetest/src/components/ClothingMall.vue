<template>
  <el-container>
    <el-header style="background-color: transparent">
      <el-row >
<!--        <el-col :span="4"><div class="grid-content bg-purple">-->
<!--          <span>用户名:{{$store.state.counts}}</span>-->
        <div style="margin-bottom: 50px;margin-top: 30px">
          <el-input v-model="input" style="width: 300px" placeholder="请输入"></el-input>
          <el-button @click="chaxun()">查询</el-button>
<!--          <span v-if="!userUnumber">请登录</span>-->
          <el-button v-if="!userUnumber" @click="goLogin">去登陆</el-button>
          <span v-if="userUnumber" >欢迎:{{username}}</span>

          <el-dropdown v-if="userUnumber">
            <span class="el-dropdown-link" @click="gotocart()">
              购物车<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
            <el-dropdown-menu trigger="hover" slot="dropdown">
              <el-dropdown-item class="item"  v-for="cart in cartlist" :key="cart.cartid"  >
                <el-image :src="cart.colorimg"></el-image>
                <span>{{cart.commodityname}} </span>
                <span>¥{{cart.priceforone}}</span>
                <p>颜色分类:{{cart.color}},尺码:{{cart.size}}</p>
                <el-button @click="deletecart(cart)">删除{{cart.cartid}}</el-button>
              </el-dropdown-item>
              <el-dropdown-item >阿巴阿巴</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-if="userUnumber" @click="goOrderList()" >我的订单</el-button>
          <el-button v-if="userUnumber" @click="goAddressList()" >地址管理</el-button>
          <el-button v-if="userUnumber" @click="logout()" >注销</el-button>
        </div>

      </el-row>
    </el-header>
    <el-main>

      <div style="margin-top: 30px">
      <ul>

        <li class="commodityItem" v-for="(commodity,index) in tableData" >
          <a class="abiaoqian" @click="tiaozhuan(commodity)" >
          <div class="nei">
            <div class="demo-image" style="margin: 2px;text-align: center">
              <el-image style="width: 194px; height: 198px" :src=commodity.cimages ></el-image>
            </div>
            <div  class="text">
            <p class="title_text">{{commodity.cname}}</p>
              <span class="commoditynowprice">¥{{commodity.cnowprice}}</span>
              <span class="commodityoldprice">¥{{commodity.coldprice}}</span>
            <p class="storename"><i style="color: #FD3149" class="el-icon-s-shop"></i>{{commodity.storename}}</p>
            </div>
              <p class="yuexiao">月销{{commodity.csales}}</p>
          </div>
          </a>
        </li>
      </ul>
      </div>
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="page"
            :current-page="currentPage"
            :page-sizes="pagesizes"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {

  methods:{
    handleSizeChange(pagesize) {
      this.pagesize=pagesize;
      const  _this = this;
      axios.get('http://localhost:8181/commodity/findAllForClothingMall/'+this.currentPage+'/'+pagesize).then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    loadCommodities(){
      const  _this = this;
      axios.get('http://localhost:8181/commodity/findAllForClothingMall/1/5').then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    page(currentPage){
      const  _this = this;
      axios.get('http://localhost:8181/commodity/findAllForClothingMall/'+currentPage+'/'+this.pagesize).then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    goAddressList(){
      this.$router.push("/AddressList");
    },
    goLogin(){
      this.$router.push("/TotalLogin");
    },
    goOrderList(){
      this.$router.push("/OrderList");
    },
    gotocart(){
      this.$router.push("/Cart");
    },
    deletecart(cart){
      const  _this = this;
      axios.delete('http://localhost:8181/cart/delete/'+cart.cartid).then(function (resp){
        alert("删除成功!")
      })
      axios.get('http://localhost:8181/cart/findByUserunumber/'+_this.userUnumber).then(function (resp){
        _this.cartlist = resp.data;
        _this.loadcart();
      })
    },
    chaxun(){
      const  _this = this;
      axios.get('http://localhost:8181/commodity/search/'+_this.input).then(function (resp){
        // console.log(resp)
        _this.tableData = resp.data;
        _this.total = resp.data.totalElements;
      })
    },
    tiaozhuan(commodity){
      localStorage.setItem("commodity_cid",commodity.cid);
      this.$router.push("/CommodityShow");
    },
    logout(){
      this.username = "";
      this.userUnumber = "";
      localStorage.clear();
      this.$router.push("/TotalLogin");
    },


    //获取购物车数据
    loadcart(){
      const  _this = this;
      axios.get('http://localhost:8181/cart/findByUserunumber/'+_this.userUnumber).then(function (resp){
        _this.cartlist = resp.data;
      })
    },

    //获取user名
    getUser(){
      const  _this = this;
      if (_this.userUnumber){
         {
        axios.get('http://localhost:8181/user/findUserByUnumber/'+_this.userUnumber).then(function (resp){
          _this.username = resp.data;
        })
      }
    }},


  },
  mounted() {
    // console.log(this.userUnumber);
    this.loadCommodities();
    this.userUnumber = localStorage.getItem('userUnumber');
    this.getUser();
    this.loadcart();
  },
  data() {
    return {
      total:0,
      pagesize:5,
      pagesizes:[5, 10, 15, 20],
      tableData: [],
      userUnumber:"",
      username:'',
      cartlist:[],
      input: '',
      currentPage: 1
    }
  }
}
</script>

<style scoped>

.abiaoqian{
  text-decoration: none;
  cursor:pointer;
}
.yuexiao{
  position: relative;
  left: 150px;
  width: 50px;
  line-height: 17px;
  color: #9B9B9B;
  font: 12px "PingFang SC";
  margin: 0px;
  background: #ffffff;
  padding: 0px 0px 0px 12px;
}
.text{
  width: 193px;
  margin-left: 20px;
  padding-bottom: 5px;
  border-bottom: 2px solid #f2f2f2;
}
.demo-image{

}
.storename{
  margin: 0px;
  color: #9B9B9B;
  font: 12px "PingFang SC" ;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.nei{
  margin: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
body{
  background-color: #EDEDED;
}
.commodityItem{
  height: 340px;width: 234px;
  border:1px solid #ccc;
  background-color: #fff;
  display: inline-block;
  list-style:none;
  /*margin-bottom:10px;*/
  /*text-align:center;*/
  /*padding:4px;*/
}
.commodityItem:hover{
  border:4px solid #FD3F31;
  /*margin: 55px;*/
}

.title_text{
  font: 14px "PingFang SC" ;
  vertical-align:middle;
  text-overflow:ellipsis;
  color: #9B9B9B;
  margin: 0px;
  text-align:center;
}
.commodityoldprice{
  font: 14px "PingFang SC";
  color: #969896;
  text-decoration-line: line-through;
}
.commoditynowprice{
  font: 18px "PingFang SC";
  color: #FD3F31;
}
</style>
