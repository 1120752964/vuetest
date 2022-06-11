<template>
  <div>
    <h1 style="margin: 0 0 20px 40px;">用户注册</h1>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="用户名" prop="uname">
      <el-input v-model="ruleForm.uname"></el-input>
    </el-form-item>

    <el-form-item label="用户账号" prop="unumber">
      <el-input  v-model="ruleForm.unumber" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="用户密码" prop="upassword">
      <el-input  v-model="ruleForm.upassword" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="再次确认密码" prop="reupassword">
      <el-input  v-model="ruleForm.reupassword" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="用户手机号" prop="utelphone">
      <el-input  v-model="ruleForm.utelphone" autocomplete="off"></el-input>
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

    <el-form-item label="用户详细地址" prop="uaddress">
      <el-input  v-model="ruleForm.uaddress" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户性别" prop="usex">
      <el-radio-group v-model="ruleForm.usex" size="medium">
        <el-radio border label="男"></el-radio>
        <el-radio border label="女"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="用户支付密码" prop="upaypassword">
      <el-input  v-model="ruleForm.upaypassword" autocomplete="off"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import { regionData,CodeToText  } from 'element-china-area-data'
export default {
  data() {

    var validateUname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validateUnumber = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入用户账号'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          axios.get("http://localhost:8181/user/juddgeifdup/"+this.ruleForm.unumber).then(function (resp){
            if (resp.data.uid>0){
              callback(new Error('该用户账号与用户'+resp.data.uname+"的账号重复,请修改账号"))
            }else if (resp.data.uid==0){
              callback(new Error("用户账号必须为数字！"))
            }
        })}
    }};

    var validateUpassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateUaddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户地址'));
      } else {
        callback();
      }
    };

    var validateUpaypassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户支付密码'));
      } else if(!/^\d{6}$/.test(value)) {
        callback(new Error('请输入六位数字支付密码'));
      }
    };
    var validateReUpassWord = (rule, value, callback) => {
      if (value === '' || value !== this.ruleForm.upassword) {
        callback(new Error('两次输入的密码不一致'));
      }

    };
    var validateUtelphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户手机号'));
      } else if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)){
        callback(new Error('请输入正确的手机号'));
      }
    };
    return {
      ruleForm: {
        uid:'',
        uname: '',
        upassword: '',
        uaddress: '',
        unumber: '',
        usex: '',
        utelphone: '',
        upaypassword: '',
        reupassword:'',
        options: regionData,
        selectedOptions: [],
        a:''
      },
      rules: {
        uname: [
          { validator: validateUname, trigger: 'blur' }
        ],
        upassword: [
          { validator: validateUpassWord, trigger: 'blur' }
        ],
        reupassword: [
          { validator: validateReUpassWord, trigger: 'blur' }
        ],
        unumber: [
          { validator: validateUnumber, trigger: 'blur' },
        ],
        uaddress: [
          { validator: validateUaddress, trigger: 'blur' }
        ],
        utelphone: [
          { validator: validateUtelphone, trigger: 'blur' }
        ],
        upaypassword: [
          { validator: validateUpaypassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleChange (value) {
      this.ruleForm.uaddress = ''
      if (this.ruleForm.selectedOptions){
        for (let i in this.ruleForm.selectedOptions){
          this.ruleForm.uaddress+=CodeToText[this.ruleForm.selectedOptions[i]]
        }
      }
      console.log(this.ruleForm.uaddress)
    },
    submitForm(formName) {
      const _this = this
      if(!_this.ruleForm.unumber||!_this.ruleForm.upassword||!_this.ruleForm.reupassword||!_this.ruleForm.uaddress||!_this.ruleForm.uname||!_this.ruleForm.upaypassword||!_this.ruleForm.usex||!_this.ruleForm.utelphone){
        this.$message.error('请填写全部信息');
      }else {
        axios.post("http://localhost:8181/user/save",_this.ruleForm).then(function (resp){
          if (resp.data == 'success'){
            _this.$alert("用户:"+_this.ruleForm.uname+'注册成功成功!', '', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/UserLogin")
              }
            });
          }
        })
      }
    },
    goback(formName) {
      this.$router.push("/UserLogin")
    },

  },
  created(){
    if(this.$route.query.uid!=null){
    const  _this =this
    axios.get('http://localhost:8181/user/findUserById/'+this.$route.query.uid).then(function (resp){
      _this.ruleForm = resp.data
    })
    }
  }
}
</script>