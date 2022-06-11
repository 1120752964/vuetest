<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item>
        <h1>商铺登录界面</h1>
      </el-form-item>
      <el-form-item label="账号" style="width: 40%;" prop="storenumber">
        <el-input v-model.number="ruleForm.storenumber"></el-input>
      </el-form-item>
      <el-form-item label="密码" style="width: 40%;" prop="storepassword">
        <el-input type="password" v-model="ruleForm.storepassword" autocomplete="off"></el-input>
      </el-form-item>
      <!--      <el-form-item label="确认密码" prop="checkPass">-->
      <!--        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
      <!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
        <el-button @click="register()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    register(){
      this.$router.push("/AddStore")
    },
    submitForm(formName) {
      const _this = this
      axios.post("http://localhost:8181/store/login",this.ruleForm).then(function (resp){
        console.log(resp)
        if (resp.data != "error"){
          console.log(resp.data)
          var a = resp.data;
          localStorage.setItem("storenumber",resp.data);
          // _this.$router.push({path:"/ClothingMall?"+"name="+resp.data,});//params:{uname:resp.data.toString()}
          _this.$router.push({path:"/Store"});//params:{uname:resp.data.toString()}
          // axios.save("http://localhost:8181/administrator/setAdministrator/"+resp.data.aid);
          // _this.$alert(_this.ruleForm.unumber+'登录成功!', '', {
          //   confirmButtonText: '确定',
          //   callback: action => {
          //     _this.$router.push("/Home");
          //   }
          // });
        }else {
          alert("用户名或密码不正确")
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
    };
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
      } else if (value !== this.ruleForm.apassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        storepassword: '',
        // checkPass: '',
        storenumber: ''
      },
      rules: {
        apassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        anumber: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },

}
</script>