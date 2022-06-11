<template>
  <div>
    <h1 style="margin: 0 0 20px 40px;">商家注册</h1>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="商家名" prop="sname">
      <el-input v-model="ruleForm.sname"></el-input>
    </el-form-item>

    <el-form-item label="商家账号" prop="storenumber">
      <el-input  v-model="ruleForm.storenumber" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="商家密码" prop="storepassword">
      <el-input  v-model="ruleForm.storepassword" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="再次确认密码" prop="restorepassword">
      <el-input  v-model="ruleForm.restorepassword" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="商家介绍" prop="storeproduce">
      <el-input  v-model="ruleForm.storeproduce" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="选择发货省市">
      <el-cascader
          size="large"
          :options="ruleForm.options"
          v-model="ruleForm.selectedOptions"
          style="width: 380px"
          @change="handleChange">
      </el-cascader>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import { provinceAndCityData,CodeToText } from 'element-china-area-data'
export default {
  data() {
    var validateUname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商家名'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validateUnumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商家账号'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          axios.get("http://localhost:8181/store/juddgeifdup/"+this.ruleForm.storenumber).then(function (resp){
            if (resp.data.storeid>0){
              callback(new Error('该商家账号与商家'+resp.data.sname+"的账号重复,请修改账号"))
            }else if (resp.data.storeid==0){
              callback(new Error("商家账号必须为数字！"))
            }
        })}
    }};

    var validateUpassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商家密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateUaddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商家地址'));
      } else {
        callback();
      }
    };
    var validateStoreProduce = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商家介绍'));
      }
    };
    var validateReUpassWord = (rule, value, callback) => {
      if (value === '' || value !== this.ruleForm.storepassword) {
        callback(new Error('两次输入的密码不一致'));
      }
    };
    return {
      ruleForm: {
        storeid:'',
        sname: '',
        storepassword: '',
        storeproduce: '',
        storeaddress:'',
        storenumber: '',
        restorepassword:'',
        options: provinceAndCityData,
        selectedOptions: [],
      },
      rules: {
        sname: [
          { validator: validateUname, trigger: 'blur' }
        ],
        storepassword: [
          { validator: validateUpassWord, trigger: 'blur' }
        ],
        restorepassword: [
          { validator: validateReUpassWord, trigger: 'blur' }
        ],
        storenumber: [
          { validator: validateUnumber, trigger: 'blur' },
        ],
        storeaddress: [
          { validator: validateUaddress, trigger: 'blur' }
        ],
        storeproduce: [
          { validator: validateStoreProduce, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    handleChange (value) {
      this.ruleForm.uaddress = ''
      if (this.ruleForm.selectedOptions){
        for (let i in this.ruleForm.selectedOptions){
          this.ruleForm.storeaddress+=CodeToText[this.ruleForm.selectedOptions[i]]
        }
      }
      console.log(this.ruleForm.storeaddress)
    },
    submitForm(formName) {
      const _this = this
      if(!_this.ruleForm.sname||!_this.ruleForm.storenumber||!_this.ruleForm.storepassword||!_this.ruleForm.storeproduce||!_this.ruleForm.storeaddress){
        this.$message.error('请填写全部信息');
      }else {
        axios.post("http://localhost:8181/store/save",_this.ruleForm).then(function (resp){
          if (resp.data == 'success'){
            _this.$alert("商家:"+_this.ruleForm.sname+'注册成功成功!', '', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/StoreLogin")
              }
            });
          }
        })
      }
    },
    goback(formName) {
      this.$router.push("/StoreLogin")
    },

  },
  created(){
    // if(this.$route.query.uid!=null){
    // const  _this =this
    // axios.get('http://localhost:8181/user/findUserById/'+this.$route.query.uid).then(function (resp){
    //   _this.ruleForm = resp.data
    // })
    // }
  }
}
</script>