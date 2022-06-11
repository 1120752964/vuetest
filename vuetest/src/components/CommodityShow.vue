<template>
<!--<h1>cid:{{commodityData.cname}}</h1>-->
  <div>
<!--    <div class="head">-->
<!--            <a class="dianpu" @click="storetiaozhuan()"><span>{{commodityData.storename}}</span></a>-->
<!--    </div>-->
    <div class="main">
      <img style="width: 350px; height: 350px" :src=commodityData.cimages >
      <p>{{commodityData.cname}}</p>
      <span class="commoditynowprice">现价:¥{{commodityData.cnowprice}}</span>
      <span class="commodityoldprice">原价¥{{commodityData.coldprice}}</span>
      <span class="yuexiao">月销:{{commodityData.csales}}</span>
      <span class="fahuodi">发货地:{{commodityData.caddress}}</span>
      <div class="size">
        <span>尺码:</span>
        <div v-for="(size,index) in sizes" class="s" @click="clicks(size,index)" style="display: inline-block">
          {{size}}
        </div>
      </div>
      <div class="colors">
        <span>颜色:</span>
        <div v-for="(color,index)  in colors" class="c" style="display: inline-block" >
          <el-image :src="color" @click="clickc(color,index)"  ></el-image>
        </div>
      </div>
      <div class="quantity">
        库存为:{{kucun}}
      </div>

    </div>
<!--    选择购物的数量  -->
    <div class="number">
      <el-input-number  v-model="num"  :min="1" :max="kucun" label="描述文字"></el-input-number>
    </div>
    <div>
      <el-button @click="cartadd()">加入购物车</el-button>
      <el-button @click="goback()">返回商城</el-button>
    </div>
    <div v-if="!isbought">
      <p>您可以在购买并收货后评论！</p>
    </div>
    <div class="block" v-if="isbought">
        <span class="demonstration">请对您的购物体验评分：</span>
      <el-rate
          v-model="ratescore"
          :colors="colors2">
      </el-rate>
      <el-input
          type="textarea"
          :rows="2"
          style="width: 50%"
          placeholder="请输入内容"
          v-model="comment">
      </el-input>
      <el-button @click="sendComment">提交评价</el-button>
    </div>

    <div v-for="(comment1,index) in commentDate">
      <el-rate
          v-model="comment1.gradetocommdity"
          disabled
          :colors="colors2"
        >
      </el-rate>
      <span>用户{{comment1.commentusername}}在{{comment1.createdtime}}发表评价:{{comment1.commentcontent}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommodityShow",
  methods:{

    loadComments(){
      const _this = this;
      axios.post('http://localhost:8181/comment/getAllComment/'+localStorage.getItem("commodity_cid")).then(function (resp){
        _this.commentDate = resp.data;
        // console.log(_this.commentDate)
      });
    },
    sendComment(){
      const _this = this;
      if (this.comment==''){
        _this.$alert("请填写评价！");
        return;
      }
      if (this.ratescore==0){
        _this.$alert("请填写评分！");
        return;
      }
      axios.post('http://localhost:8181/comment/save/',{
        "commentusernumber":localStorage.getItem("userUnumber"),
        "commodityid":localStorage.getItem("commodity_cid"),
        "commentcontent":_this.comment,
        "gradetocommdity":_this.ratescore,
      }).then(function (resp){
        _this.$alert("评价成功");
        _this.comment='';
        _this.ratescore=0;
        _this.loadComments();
      })
    },
    goback(){
      this.$router.push("/ClothingMall");
    },
    cartadd(){
      const  _this = this;
      if(!_this.colorone||!_this.sizeone){
        alert("请同时勾选尺寸和颜色");
      }else {
      axios.post('http://localhost:8181/cart/save/',{
        "commodityname":_this.commodityData.cname,
        "userunumber":localStorage.getItem("userUnumber"),
        "commodityid":localStorage.getItem("commodity_cid"),
        "size":_this.sizeone,
        "color":_this.colorone,
        "quantity":_this.num,
        "storename":_this.commodityData.storename,
        "priceforone":_this.commodityData.cnowprice,
        "colorimg":_this.colorone,
      }).then(function (resp){
        if (resp.data!=="error"){
          alert("添加购物车成功!");
        }else {
          alert("添加失败!");
        }
      });
      }
    },
    clickc(color,index){
      const  _this = this;
      if (this.colorone===color){
        this.colorone = "";
        document.getElementsByClassName("cc")[0].setAttribute("class","c");
      }else {
        if(this.colorone===""){
          this.colorone = color;
          document.getElementsByClassName("c")[index].setAttribute("class","cc");
        }else {
          this.colorone = color;
          document.getElementsByClassName("cc")[0].setAttribute("class","c");
          document.getElementsByClassName("c")[index].setAttribute("class","cc");
        }
      }
      if (!this.sizeone&&!this.colorone){
        axios.get('http://localhost:8181/commodity/findCommodityByCid/'+_this.cid).then(function (resp){
          _this.kucun = resp.data.cquantity;
        });
      }
      if (this.sizeone&&this.colorone){
        axios.post('http://localhost:8181/commodity/findCommodityQuantity/',{"colorimg":_this.colorone, "size":_this.sizeone}).then(function (resp){
          _this.kucun = resp.data;
        });
      }


    },
    clicks(size,index){
      const  _this = this;
      if (this.sizeone===size){
        this.sizeone = "";
        document.getElementsByClassName("sc")[0].setAttribute("class","s");
      }else {
        if(this.sizeone===""){
        this.sizeone = size;
        document.getElementsByClassName("s")[index].setAttribute("class","sc");
        }else {
          this.sizeone = size;
          document.getElementsByClassName("sc")[0].setAttribute("class","s");
          document.getElementsByClassName("s")[index].setAttribute("class","sc");
        }
      }
      if (!this.sizeone&&!this.colorone){
        axios.get('http://localhost:8181/commodity/findCommodityByCid/'+_this.cid).then(function (resp){
          _this.kucun = resp.data.cquantity;
        });
      }
      if (this.sizeone&&this.colorone){
        axios.post('http://localhost:8181/commodity/findCommodityQuantity/',{"colorimg":_this.colorone, "size":_this.sizeone}).then(function (resp){
          _this.kucun = resp.data;
        });
      }
    },
    loadCommodity(){
      const  _this = this;
      if (_this.cid){
        axios.get('http://localhost:8181/commodity/findCommodityByCid/'+_this.cid).then(function (resp){
          // console.log(resp);
          _this.commodityData = resp.data;
          _this.kucun = resp.data.cquantity;
        });
        axios.get('http://localhost:8181/commodity/findCommoditySizesByCid/'+_this.cid).then(function (resp){
          // console.log(resp);
          _this.sizes = resp.data;
        });
        axios.get('http://localhost:8181/commodity/findCommodityColorsByCid/'+_this.cid).then(function (resp){
          // console.log(resp);
          _this.colors = resp.data;
        });
        //判断用户是否购买过并已经收货该商品
        axios.get('http://localhost:8181/comment/findCommodityisbought/'+localStorage.getItem("userUnumber")+'/'+localStorage.getItem("commodity_cid")).then(function (resp){
          // console.log(resp);
          _this.isbought = resp.data;
        });
      }else {
        alert("无cid!!!");
      }
    }
  },

  mounted() {
    this.cid = localStorage.getItem("commodity_cid");
    // console.log(this.cid);
    this.loadCommodity();
    this.loadComments();
  },
  data() {
    return {
      cid:"",
      num:1,
      commodityData: [],
      isbought:0,
      commodityList:"",
      input: '',
      sizes:[],
      colors:[],
      colors2: ['#99A9BF', '#F7BA2A', '#FF9900'] , // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      ratescore:0,
      comment:'',
      commentDate:[],
      sizeone:"",
      colorone:"",
      kucun:0,
      username:''
    }
  }

}
</script>

<style scoped>

.s{
  cursor:pointer;
  width: 30px;
  height: 30px;
  border: #9B9B9B 2px solid;
  text-align: center;
}
.sc{
  width: 30px;
  height: 30px;
  cursor:pointer;
  border:#FD3F31 2px solid;
  color: #FD3F31;
  text-align: center;
}
.s:hover{
  border:#FD3F31 2px solid;
}
.c{
  cursor:pointer;
  width: 30px;
  height: 30px;
  border: #9B9B9B 2px solid;
  text-align: center;
}
.cc{
  width: 30px;
  height: 30px;
  cursor:pointer;
  border:#FD3F31 2px solid;
  color: #FD3F31;
  text-align: center;
}
.c:hover{
  border:#FD3F31 2px solid;
}
.check-box{
  width: 120px;
  height: 30px;
  border: 2px solid #FF3333;
  position: relative;
  transition: all 0.5s ease;}
.check-box:hover:after {
  content: '✔';
  display: block;
  height: 0px;
  width: 0px;
  position: absolute;
  bottom: 0;
  right: 0;
  color:#fff;
  /**对号大小*/
  font-size: 10px;
  line-height: 8px;
  border: 10px solid;
  border-color: transparent #FF3333 #FF3333 transparent}
* {
  margin: 0;
  padding: 0;
}
.dianpu{
  cursor:pointer;
}
.head {
  background-color: #ffffff;
  margin: 0px 200px 0px 200px;
  height: 85px;
  /*text-align: center;*/
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}


</style>