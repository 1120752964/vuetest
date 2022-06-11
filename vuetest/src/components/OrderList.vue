<template>
  <div id="app">
    <h1>用户订单管理</h1>
    <el-button @click="goback">回到商城</el-button>
    <el-container style="height: 500px; border: 1px solid #eee">
      <!--      {{this.$route.query.userId}}-->
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

          <el-menu router :default-openeds="['1']">
            <el-submenu index="1"  >
              <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
              <el-menu-item @click="loadOrders">所有订单</el-menu-item>
              <el-menu-item @click="loadUnPayOrders">待付款</el-menu-item>
              <el-menu-item @click="loadUnSendOrders">待发货</el-menu-item>
              <el-menu-item @click="loadSendOrders">待收货</el-menu-item>
              <el-menu-item @click="getUnCommentOrders">待评价</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <div>
              <el-table
                  :data="tableData"
                  style="width: 100%">
                <el-table-column
                    prop="commodityname"
                    label="宝贝"
                    width="330">
                </el-table-column>
                <el-table-column
                    prop="commoditysize"
                    label="大小"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="commoditycolor"
                    label="颜色"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="commoditypriceforone"
                    label="单价"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="commoditycount"
                    label="数量"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="ordercommoditycount"
                    label="价格"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="commoditystatus"
                    label="交易状态"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="commoditystatus"
                    label="交易操作"
                    width="100">
                  <template slot-scope="scope">
                    <el-button @click="lookOrder(scope.row)" type="text" v-if="scope.row.commoditystatus==='已支付'" size="small">查看订单</el-button>
                    <el-button @click="gotopay(scope.row)" type="text" v-if="scope.row.commoditystatus==='未支付'" size="small">去支付</el-button>
                    <el-button @click="getcommodity(scope.row)" type="text" v-if="scope.row.commoditystatus==='已发货'" size="small">确认收货</el-button>
                    <el-button @click="gotocomment(scope.row)" type="text" v-if="scope.row.commoditystatus==='已收货'" size="small">去评价</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
          <!--          <el-footer>Footer</el-footer>-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {

  data() {
    return {
      total:0,
      flag:0,
      tableData: [],
    }
  },
  methods:{
        gotocomment(row){
          localStorage.setItem("commodity_cid",row.commoditycnumber);
          this.$router.push("/CommodityShow");
        },
        //查看订单详情页
        lookOrder(){
          this.$router.push("/OrderDetailShowForUser");
        },
         //设置为已收货
        getcommodity(row){
          const  _this = this;
          axios.post('http://localhost:8181/order/getCommodity/'+row.orderdetailid).then(function (resp){
            // console.log(resp.data)
            if(resp.data=="success"&&_this.flag==0){
              _this.loadOrders();
            }else if (resp.data=="success"&&_this.flag==1){
              _this.loadSendOrders();
            }
          })
        },
        gotopay(row){
          localStorage.setItem("orderid",row.orderonumber)
          this.$router.push("/Pay")
        },
        goback(){
           this.$router.push("/ClothingMall")
        },
        loadOrders(){
          const  _this = this;
          axios.post('http://localhost:8181/order/getAllOrders/'+localStorage.getItem("userUnumber")).then(function (resp){
            _this.flag=0;
            _this.tableData = resp.data;
          })
        },
        loadUnPayOrders(){
          const  _this = this;
          axios.post('http://localhost:8181/order/getAllUnPayOrders/'+localStorage.getItem("userUnumber")).then(function (resp){

            _this.tableData = resp.data;
          })
        },
        loadSendOrders(){
          const  _this = this;
          _this.flag=1;
          console.log(_this.flag)
          axios.post('http://localhost:8181/order/getSendOrders/'+localStorage.getItem("userUnumber")).then(function (resp){
            // console.log(resp.data)
            _this.tableData = resp.data;
          })
        },
        loadUnSendOrders(){
          const  _this = this;
          axios.post('http://localhost:8181/order/getUnSendOrders/'+localStorage.getItem("userUnumber")).then(function (resp){
            // console.log(resp.data)
            _this.tableData = resp.data;
          })
        },
        getUnCommentOrders(){
          const  _this = this;
          axios.post('http://localhost:8181/order/getUnCommentOrders/'+localStorage.getItem("userUnumber")).then(function (resp){
            // console.log(resp.data)
            _this.tableData = resp.data;
          })
        },
  },
  mounted() {
    this.loadOrders();
  }

}
</script>