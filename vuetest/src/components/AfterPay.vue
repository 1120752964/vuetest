<template>
  <div >
    <div>
      <div>
        <el-steps :active="3" align-center>
          <el-step title="查看购物车" ></el-step>
          <el-step title="拍下商品" ></el-step>
          <el-step title="付款" ></el-step>
          <el-step title="确认收货" ></el-step>
          <el-step title="评价" ></el-step>
        </el-steps>
      </div>
    </div>
    <p>请耐心等待商家发货</p>
    <el-button @click="goShopping">继续逛逛</el-button>
    <el-button @click="goCart">查看购物车</el-button>
    <el-button @click="goOrderList">查看所有订单</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  methods: {
    goShopping(){
        this.$router.push("/ClothingMall");
    },
    goCart(){
      this.$router.push("/Cart");
    },
    goOrderList(){
      this.$router.push("/OrderList");
    },
  },
  mounted() {

  }
}
</script>