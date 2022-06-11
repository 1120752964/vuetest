<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="用户编号" >
      <el-input v-model="ruleForm.uid" readonly></el-input>
    </el-form-item>

    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.uname"></el-input>
    </el-form-item>

    <el-form-item label="用户账号" prop="unumber">
      <el-input  v-model="ruleForm.unumber" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="用户密码" prop="upassword">
      <el-input  v-model="ruleForm.upassword" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="用户收货地址" prop="uaddress">
      <el-input  v-model="ruleForm.uaddress" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="用户性别" prop="usex">
      <el-input  v-model="ruleForm.usex" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="用户支付密码" prop="upaypassword">
      <el-input  v-model="ruleForm.upaypassword" autocomplete="off"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="goback('ruleForm')">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
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
      },
      rules: {

      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put("http://localhost:8181/user/update",this.ruleForm).then(function (resp){
            if (resp.data == 'success'){
              _this.$alert("用户:"+_this.ruleForm.uname+'修改成功!', '', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.go(-1);
                }
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    goback(formName) {
      this.$router.go(-1);
    },

  },
  created(){
    const  _this =this
    axios.get('http://localhost:8181/user/findUserById/'+this.$route.query.uid).then(function (resp){
      console
        _this.ruleForm = resp.data
    })
  }
}
</script>