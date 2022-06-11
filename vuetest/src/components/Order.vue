<template>
<div>
  <div>
    <el-steps :active="1" align-center>
      <el-step title="查看购物车" ></el-step>
      <el-step title="拍下商品" ></el-step>
      <el-step title="付款" ></el-step>
      <el-step title="确认收货" ></el-step>
      <el-step title="评价" ></el-step>
    </el-steps>
  </div>
  <el-table
      :data="carts"
      style="margin: 0 auto">
    <el-table-column
        prop="commodityname"
        label="店铺宝贝"
        width="180">
    </el-table-column>
    <el-table-column
        prop="color"
        label="颜色"
        width="180">
    </el-table-column>
    <el-table-column
        prop="size"
        label="规格"
        width="180">
    </el-table-column>
    <el-table-column
        prop="priceforone"
        label="单价"
        width="180">
    </el-table-column>
    <el-table-column
        prop="quantity"
        label="数量"
        width="180">
    </el-table-column>
    <el-table-column
        prop="cost"
        label="小计"
        width="180">
    </el-table-column>
  </el-table>
<!--  <div class="inputaddress" >-->
<!--    <el-input-->
<!--        type="textarea"-->
<!--        :rows="2"-->
<!--        placeholder="请输入内容"-->
<!--        v-model="textarea">-->
<!--    </el-input>-->
<!--  </div>-->
  <div >
    <div class="useraddress">
      <p>请选择您的收货地址:</p>

        <el-select v-model="defaultaddress" @change="changeAddress(defaultaddress)" placeholder="请选择">
          <el-option
              v-for="item in address"
              :key="item"
              :label="item"
              :value="item">
            <span style="float: left">{{ item }}</span>
          </el-option>
        </el-select>
      </div>
   <div class="last">
     <span >实付款：</span>
     <span class="zongji">¥{{total}}</span>
     <p>寄送至:  {{defaultaddress}}</p>
     <p>收货人:{{consigneename}} {{phonenumber}}</p>
   </div>
    <el-button @click="goback">返回购物车</el-button>
    <el-button @click="goback2">返回商城</el-button>
    <el-button type="text" @click="sendorder">提交订单</el-button>
    <el-cascader
        v-if="flag"
        size="large"
        :options="options"
        v-model="selectedOptions"
        @change="handleChange">
    </el-cascader>
  </div>
</div>
</template>

<script>
import $ from 'jQuery';
import {provinceAndCityData,regionData,provinceAndCityDataPlus,regionDataPlus,CodeToText,TextToCode}  from 'element-china-area-data'
export default {
  name: "test",
  data() {
    return {
      phonenumber:"",
      consigneename:"",
      carts: [],
      textarea:"实付款:111",
      show:false,
      options: regionData,
      selectedOptions: [],
      defaultaddress:'',
      flag:false,
      user:[],
      address:[],
      total:0,
      cartid:""
    };
  },
  methods:{

    //实时加载对应地址的收货人和手机号
    changeAddress(defaultaddress){
      String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
      }
      let nowadd=""
      const  _this = this;
      if(defaultaddress.endWith("(默认地址)")){
        nowadd=defaultaddress.substr(0,defaultaddress.length-6)
      }else{
        nowadd = defaultaddress
      }
      axios.post('http://localhost:8181/order/findNameandTel/'+localStorage.getItem("userUnumber")+'/'+nowadd).then(function (resp){
        _this.consigneename = resp.data.consigneename;
        _this.phonenumber = resp.data.phonenumber;
      })

    },
    sendorder(){
      const  _this = this;
      //生成订单和订单详情 (因为数据传输只能是数组  所以用loadaddress再发送一次请求)
      axios.post('http://localhost:8181/order/save',_this.$route.query.jiesuan).then(function (resp){
        _this.cartid = resp.data;
        _this.loadaddress(resp.data);
      })
    },
    //第二次请求，保存订单地址
    loadaddress(onumber){
      const  _this = this;
      axios.post('http://localhost:8181/order/setaddressbyid/',{
        "onumber":onumber,
        "address":_this.defaultaddress,
        "consigneename":_this.consigneename,
        "phonenumber":_this.phonenumber
      }).then(function (resp){
        // cartid = resp.data;
        _this.$message("生成订单成功");
        localStorage.setItem("orderid",onumber);
        _this.$router.push("/Pay")
      })
    },
    goback(){
      this.$router.push("/Cart");
    },
    goback2(){
      this.$router.push("/ClothingMall")
    },
    handleChange (value) {
    },
    //获取购物车数据
    loadcart(){
      const  _this = this;
      axios.post('http://localhost:8181/cart/findByCartids',_this.$route.query.jiesuan).then(function (resp){
        _this.carts = resp.data;
        for (let i = 0;i<_this.carts.length;i++){
          _this.total+=parseInt(_this.carts[i].cost);
        }
      })
    },
    getUser(){
      const  _this = this;
      axios.get('http://localhost:8181/user/findUByUnumber/'+localStorage.getItem("userUnumber")).then(function (resp){
        console.log(resp.data);
        _this.consigneename = resp.data.uname;
        _this.phonenumber = resp.data.utelphone;
        _this.user = resp.data;
      })
      //加载所有地址
      axios.post('http://localhost:8181/user/getalladdress/'+localStorage.getItem("userUnumber")).then(function (resp){
        _this.address = resp.data;
      })
      //加载默认地址
      axios.post('http://localhost:8181/user/getdefaultaddress/'+localStorage.getItem("userUnumber")).then(function (resp){
        _this.defaultaddress = resp.data;
      })
    }
  },
  mounted() {
    this.loadcart();
    this.getUser();
  }
}
</script>

<style scoped>
.last{
  width: 40%;
  border: #FD3F31 1px solid;
}
.zongji{
  color: #FF0036;
  font-size: 26px;
}
</style>