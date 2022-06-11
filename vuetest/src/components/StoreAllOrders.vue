<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
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
                    <el-button @click="sendcommodity(scope.row)" type="text" v-if="scope.row.commoditystatus==='已支付'" size="small">发货</el-button>
                    <el-button @click="gotopay(scope.row)" type="text" v-if="scope.row.commoditystatus==='未支付'" size="small"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
          <!--          <el-footer>Footer</el-footer>-->
        </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total:0,
      tableData: [],
    }
  },
  methods:{
        sendcommodity(row){
          const  _this = this;

          axios.post('http://localhost:8181/store/sendCommodity/'+row.orderdetailid).then(function (resp){
            // console.log(resp.data)
            if(resp.data=="success"){
              _this.loadOrders();
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
          axios.post('http://localhost:8181/store/getAllOrders/'+localStorage.getItem("storename")).then(function (resp){
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