<template>
  <div >
    <div>
      <div>
        <el-steps :active="2" align-center>
          <el-step title="查看购物车" ></el-step>
          <el-step title="拍下商品" ></el-step>
          <el-step title="付款" ></el-step>
          <el-step title="确认收货" ></el-step>
          <el-step title="评价" ></el-step>
        </el-steps>
      </div>
    </div>
    <p>您的订单编号为:{{orderid}},请输入支付密码:</p>
    <el-input placeholder="请输入密码" maxlength="9" v-model="upaypassword" style="width: 200px" show-password></el-input>
    <el-button @click="pay">支付</el-button>
    <el-button @click="goClothingMall">返回商城</el-button>
    <el-button @click="goCart">返回购物车</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upaypassword:"",
      orderid:""
    }
  },

  methods: {
    goCart(){
      this.$router.push("/Cart")
    },
    goClothingMall(){
      this.$router.push("/ClothingMall")
    },
    pay(){
      const  _this = this;
      _this.$confirm('是否确认支付?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8181/user/pay/'+localStorage.getItem("userUnumber")+'/'+_this.upaypassword+'/'+_this.orderid).then(function (resp){
          console.log(resp.data);
          if(resp.data=="success"){
            _this.$message({
              type: 'success',
              message: '支付成功!'
            });
            _this.$router.push("/AfterPay");
          }else {
            _this.$message.error('支付密码错误！');
          }
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消支付'
        });
      });


    },
      load(){
        this.orderid = localStorage.getItem("orderid")
      }
  },
  mounted() {
    this.load();
  }
}
</script>