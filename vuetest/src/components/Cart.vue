<template>
<div>
  <input type="checkbox"  id="quanxuanc"  name="quanxuan" @click="selectall" /><span>全选</span>
  <div id="fatherone">
    <div v-for="(cart,flag) in carts"  class="t">
      <input type="checkbox"  class="testc" @click="changetotalcount" name="category"  />
      <input type="hidden" class="aaa" :value="cart.cost"/>
      <input type="hidden" class="bbb" :value="cart.cartid"/>
      <img style="width: 30px; height: 30px" :src=cart.colorimg >
      <span> 商品姓名:{{cart.commodityname}}</span>
      <span>价格:{{cart.priceforone}} 颜色分类:{{cart.color}}尺码:{{cart.size}} 数量:</span>
      <input type="button" value="-" @click="subQuantity(cart,flag)" class="car_btn_1" />
      <input type="text" style="width: 40px;text-align: center" :value="cart.quantity" name="quantit" class="car_ipt" readonly="readonly" />
      <input type="button" value="+" @click="addQuantity(cart,flag)" class="car_btn_2" />
      <span class="cost">总价:{{cart.cost}}元</span>
      <el-button class="delete" @click="deletecart(cart)">删除</el-button>
    </div>
  </div>
  <div>
    <p class="gongji">共计:{{totalcount}}元</p>
  </div>
  <el-button @click="submitorder">结算</el-button>
  <el-button @click="goback">返回商城</el-button>
</div>
</template>

<script>
import $ from 'jQuery';
let cartOptions = [];
let flag = true;
export default {
  data() {
    return {
      checkAll: false,
      checkedCarts: [],
      carts: [],
      isIndeterminate: true,
      indexs:[],
      totalcount:0,
      jiesuan:[]
    };
  },
  methods: {
    goback(){
      this.$router.push("/ClothingMall");
    },
    //提交订单
    submitorder(){
      let inputs = $(".testc");
      let count = 0;
      for(let i=0;i<inputs.length;i++){
        if(inputs.eq(i).attr("checked")=="checked") {
          this.jiesuan.push(parseInt(inputs.eq(i).next().next().val())) ;//this.tijiao.push()
          count++;
        }
      }
      if(count<=0){
        alert("勾选的数量不能小于1!");
        return;
      }
      //跳转到结算和选地址页面
      this.$router.push({
        path:'/Order',
        query: {
          jiesuan:this.jiesuan
        }
      })
    },
    //计算总价
    changetotalcount(){
      let inputs = $(".testc");
      this.totalcount = 0;
      for(let i=0;i<inputs.length;i++){
        if(inputs.eq(i).attr("checked")=="checked") {
          this.totalcount += parseInt(inputs.eq(i).next().val());
        }
      }
    },
    //删除一项商品
    deletecart(cart){
      // console.log(row)
      const _this = this;
      let qs = $(".bbb");
      let index =0;
      for(let i=0;i<qs.length;i++){
        if(qs[i].value==cart.cartid){
          index = i;
        }
      }
      console.log(index)
      let childs = $(".t");
        axios.delete('http://localhost:8181/cart/delete/'+cart.cartid).then(function (resp){
          if(resp.data==="success"){
            _this.$alert("删除成功")
          }
        });
      console.log(childs)
      childs.eq(index).remove();
    },
    //全选
    selectall(){
      var items = $(".testc");
      this.totalcount = 0;
      if(flag){
        for(var i=0;i<items.length;i++){
          items[i].checked = true;
          this.totalcount += parseInt(items.eq(i).next().val());
        }
        flag=!flag;
      }else {
        for(var i=0;i<items.length;i++){
          items[i].checked = false;
        }
        flag=!flag;
      }

    },
    //增加一项cart的数量
    addQuantity(cart,flag){
      if($(".testc").eq(flag).attr("checked")=="checked"){
        this.totalcount += parseInt(cart.priceforone);
      }
      const _this = this;
      if(cart.quantity>=100){
        alert("数量最高不能超过100件");
        return;
      }
      axios.get('http://localhost:8181/cart/addQuantity/'+cart.cartid+'/'+localStorage.getItem("userUnumber")).then(function (resp){
        _this.carts = resp.data;
      });

    },
    //减少一项cart的数量
    subQuantity(cart,flag){
      if($(".testc").eq(flag).attr("checked")=="checked"){
        this.totalcount -= parseInt(cart.priceforone);
      }
      const _this = this;
      if(cart.quantity<=1){
        alert("数量最低不能低于一件");
        return;
      }
      axios.get('http://localhost:8181/cart/subQuantity/'+cart.cartid+'/'+localStorage.getItem("userUnumber")).then(function (resp){
        _this.carts = resp.data;
      });
    },
    //获取购物车数据
    loadcart(){
      const  _this = this;
      axios.get('http://localhost:8181/cart/findByUserunumber/'+localStorage.getItem("userUnumber")).then(function (resp){
        _this.carts = resp.data;

        for(var j = 0; j < _this.carts.length; j++) {
            cartOptions[j] = _this.carts[j].cartid;
          _this.indexs[j] = _this.carts[j].cartid;
        }
      })
    }
  },
  mounted() {
    this.loadcart();
  }
};
</script>

<style scoped>

</style>