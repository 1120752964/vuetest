<template>
  <div >
    <div>
      <div>
        <el-steps :active=status align-center>
          <el-step title="查看购物车" ></el-step>
          <el-step title="拍下商品" ></el-step>
          <el-step title="付款" ></el-step>
          <el-step title="确认收货" ></el-step>
          <el-step title="评价" ></el-step>
        </el-steps>
      </div>
    </div>
    <p>订单信息：</p>
    <p>收货人：{{orderData.consigneename}}  手机号：{{orderData.phonenumber}}</p>
    <p>收货地址：{{orderData.useraddress}}</p>
    <p v-if="status==3">您已付款，请等待卖家发货</p>
    <p v-if="status==4">请收货</p>
    <p v-if="status==5">您已收货，你还可以去评价</p>
    <el-table
        :data="orderDetailData"
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
    </el-table>
    <p>总价：{{totalprice}}元</p>
    <el-button @click="goback">返回上一级</el-button>
    <el-button @click="goClothingMall">返回商城</el-button>
    <el-button @click="goCart">返回购物车</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderid:"",
      status:-1,
      orderData:[],
      totalprice:0,
      orderDetailData:[]
    }
  },

  methods: {
    load(){
      this.orderid = localStorage.getItem("orderid");
      const  _this = this;
      axios.post('http://localhost:8181/order/findOrdersByOnumber/'+_this.orderid).then(function (resp){
        _this.orderData = resp.data;
        console.log(_this.orderData);
      })
      axios.post('http://localhost:8181/order/findOrderDetailsByOnumber/'+_this.orderid).then(function (resp){
        _this.orderDetailData = resp.data;
        for (let i = 0; i < _this.orderDetailData.length; i++) {
          _this.totalprice += parseInt(_this.orderDetailData[i].ordercommoditycount);
        }
        if(_this.orderDetailData[0].commoditystatus=='已发货'){
          _this.status = 4
        }else if (_this.orderDetailData[0].commoditystatus=='已支付'){
          _this.status = 3
        }
      })
    },
    goback(){
      this.$router.go(-1)
    },
    goCart(){
      this.$router.push("/Cart")
    },
    goClothingMall(){
      this.$router.push("/ClothingMall")
    },

  },
  mounted() {
    this.load();
  }
}
</script>