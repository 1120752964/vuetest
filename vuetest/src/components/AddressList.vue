<template>
  <div id="app">
    <h1>用户地址管理</h1>
    <el-button @click="goback">回到商城</el-button>
    <el-container style="height: 500px; border: 1px solid #eee">
      <!--      {{this.$route.query.userId}}-->
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

          <el-menu router :default-openeds="['1']">
            <el-submenu index="1"  >
              <template slot="title"><i class="el-icon-setting"></i>地址管理</template>
              <el-menu-item @click="goAddAddress()">新增地址</el-menu-item>
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
                    prop="useraddress"
                    label="地址"
                    width="330">
                </el-table-column>
                <el-table-column
                    prop="isdefault"
                    label="是否是默认地址"
                    width="120">
                  <template slot-scope="scope">
                    {{scope.row.isdefault==="0"?"一般地址":"默认地址"}}
                  </template>
                </el-table-column>
                <el-table-column
                    prop="consigneename"
                    label="收货人"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="phonenumber"
                    label="手机号码"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="commoditystatus"
                    label="操作"
                    width="100">
                  <template slot-scope="scope">
                    <el-button @click="changeDefault(scope.row)" type="text" v-if="scope.row.isdefault==='0'"  size="small">设为默认地址</el-button>
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
    changeDefault(row){
      const  _this = this;
      axios.post('http://localhost:8181/address/changeDefault',row).then(function (resp){
        // console.log(resp.data)
        _this.tableData=resp.data;
      })
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
          axios.post('http://localhost:8181/address/getAllAddresses/'+localStorage.getItem("userUnumber")).then(function (resp){
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
    goAddAddress(){
      this.$router.push("/AddAddress")
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
