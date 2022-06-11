<template>
  <!--    商户端增加商品页面  -->
  <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item style="width: 60%" label="商品名" prop="cname">
      <el-input v-model="ruleForm.cname"></el-input>
    </el-form-item>

    <el-form-item style="width: 60%" label="商品原价" prop="coldprice">
      <el-input  v-model="ruleForm.coldprice" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item style="width: 60%" label="商品现价" prop="cnowprice">
      <el-input  v-model="ruleForm.cnowprice" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item style="width: 60%" label="商品销量" prop="csales">
      <el-input  v-model="ruleForm.csales" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item style="width: 60%" label="商品发货地址" prop="caddress">
      <el-input  v-model="ruleForm.caddress" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item style="width: 60%" label="商品库存" prop="cquantity">
      <el-input  v-model="ruleForm.cquantity" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item style="width: 60%" label="商品图片url" prop="cimages">
      <el-input  v-model="ruleForm.cimages" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item
        v-for="(domain, index) in detailFrom.domains"
        :label="'款式' + (index+1)"
    >
      <div>
        <el-input style="width: 18%" v-model="domain.commoditycolortext" placeholder="请输入该款式颜色名称"></el-input>
        <el-input style="width: 14%" v-model="domain.commoditysize" placeholder="请输入该款式大小"></el-input>
        <el-input style="width: 30%" v-model="domain.commoditycolorcimage" placeholder="请输入该款式图片url"></el-input>
        <el-input style="width: 14%" v-model="domain.commodity_quantity" placeholder="请输入该款式库存"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="addDomain">新增款式</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {

    var validateUname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品名'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validateUnumber = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入商品账号'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          axios.get("http://localhost:8181/user/juddgeifdup/"+this.ruleForm.unumber).then(function (resp){
            if (resp.data.uid>0){
              callback(new Error('该商品账号与商品'+resp.data.uname+"的账号重复,请修改账号"))
            }
        })}
    }};

    var validateUpassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateUaddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品地址'));
      } else {
        callback();
      }
    };
    var validateUsex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品性别'));
      } else {
        callback();
      }
    };
    var validateUpaypassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品支付密码'));
      } else {
        callback();
      }
    };
    var validateUtelphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品手机号'));
      } else {
        callback();
      }
    };



    return {
      ruleForm: {
        cid:'',
        cname: '',
        coldprice: '',
        cnowprice: '',
        csales: '',
        caddress: '',
        csize: '',
        ccolor: '',
        cquantity: '',
        cimages: '',
        storename:''
      },
      detailFrom:{
        domains: [{
          commodity_quantity: '',
          commoditycolortext: '',
          commoditysize: '',
          commoditycolorcimage:''
        }],
      },

      rules: {
        // uname: [
        //   { validator: validateUname, trigger: 'blur' }
        // ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      let resp1='';let resp2 = '';
      this.ruleForm.storename=localStorage.getItem("storename");
      axios.post("http://localhost:8181/commodity/save",this.ruleForm).then(function (resp){
        resp1 = resp.data;
        console.log(resp.data)
        axios.post("http://localhost:8181/commodity/savecommdity_detail",_this.detailFrom.domains).then(function (resp){
          resp2=resp.data;
          if(resp1=='success'&&resp2=='success'){
            _this.$notify({
              title: '成功',
              message: '添加商品成功',
              type: 'success'
            });
            _this.$router.push("/StoreCommodities")
          }
        })
      })

      console.log(resp2)
      console.log(resp1)

      console.log(_this.detailFrom.domains)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.detailFrom.domains.indexOf(item)
      if (index !== -1) {
        this.detailFrom.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.detailFrom.domains.push({
        commodity_quantity: '',
        commoditycolortext: '',
        commoditysize: '',
        commoditycolorcimage:''
      });
    },
    goback(formName) {
      this.$router.push("/StoreCommodities")
    },

  },
  created(){
    // if(this.$route.query.cid!=null) {
    //   const _this = this
    //   axios.get('http://localhost:8181/commodity/findCommodityById/' + this.$route.query.cid).then(function (resp) {
    //     _this.ruleForm = resp.data
    //   })
    // }
  }
}
</script>
