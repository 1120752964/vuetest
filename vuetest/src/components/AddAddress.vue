<template>
  <div>
    <h1 style="margin: 0 0 20px 40px;">添加用户地址</h1>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="收件人" prop="consigneename">
      <el-input v-model="ruleForm.consigneename"></el-input>
    </el-form-item>

    <el-form-item label="手机号" prop="phonenumber">
      <el-input  v-model="ruleForm.phonenumber" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="选择所在区县">
      <el-cascader
          size="large"
          :options="ruleForm.options"
          v-model="ruleForm.selectedOptions"
          style="width: 380px"
          @change="handleChange">
      </el-cascader>
    </el-form-item>

    <el-form-item label="用户详细地址" prop="useraddress">
      <el-input  v-model="ruleForm.useraddress" autocomplete="off"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import { regionData,CodeToText  } from 'element-china-area-data'
export default {
  data() {

    var validateconsigneename = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入收件人姓名'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validateuseruserunumber = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入用户账号'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          axios.get("http://localhost:8181/user/juddgeifdup/"+this.ruleForm.useruserunumber).then(function (resp){
            if (resp.data.useraddressid>0){
              callback(new Error('该用户账号与用户'+resp.data.consigneename+"的账号重复,请修改账号"))
            }else if (resp.data.useraddressid==0){
              callback(new Error("用户账号必须为数字！"))
            }
        })}
    }};


    var validateuseraddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户地址'));
      } else {
        callback();
      }
    };

    var validatephonenumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)){
        callback(new Error('请输入正确的手机号'));
      }
    };
    return {
      ruleForm: {
        useraddressid:'',
        consigneename: '',
        useraddress: '',
        userunumber: '',
        phonenumber: '',
        options: regionData,
        selectedOptions: [],
      },
      rules: {
        consigneename: [
          { validator: validateconsigneename, trigger: 'blur' }
        ],
        useruserunumber: [
          { validator: validateuseruserunumber, trigger: 'blur' },
        ],
        useraddress: [
          { validator: validateuseraddress, trigger: 'blur' }
        ],
        phonenumber: [
          { validator: validatephonenumber, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    handleChange (value) {
      this.ruleForm.useraddress = ''
      if (this.ruleForm.selectedOptions){
        for (let i in this.ruleForm.selectedOptions){
          this.ruleForm.useraddress+=CodeToText[this.ruleForm.selectedOptions[i]]
        }
      }
      console.log(this.ruleForm.useraddress)
    },
    submitForm(formName) {
      const _this = this
      _this.ruleForm.userunumber = localStorage.getItem("userUnumber")
      if(!_this.ruleForm.useraddress||!_this.ruleForm.consigneename||!_this.ruleForm.phonenumber){
        this.$message.error('请填写全部信息');
      }else {
        axios.post("http://localhost:8181/address/save",_this.ruleForm).then(function (resp){
          if (resp.data == 'success'){
            _this.$alert('添加地址成功!', '', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/AddressList")
              }
            });
          }else {
            _this.$alert("添加地址失败")
          }
        })
      }
    },
    goback(formName) {
      this.$router.push("/AddressList")
    },

  },
  created(){
    if(this.$route.query.useraddressid!=null){
    const  _this =this
    axios.get('http://localhost:8181/user/findUserById/'+this.$route.query.useraddressid).then(function (resp){
      _this.ruleForm = resp.data
    })
    }
  }
}
</script>