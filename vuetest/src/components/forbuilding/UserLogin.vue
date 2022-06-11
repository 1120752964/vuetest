<template>
  <div class="home">
    <div class="img" style="float: right;z-index: -1;position: absolute">
      <el-image fit="fill" width="100%" height="100%"  :src="require('@/assets/img/home.jpg')"></el-image>
    </div>
    <div class="form" style="width:400px;height: 350px;z-index: 1;position: absolute;left: 70%;margin-top:200px;margin-right:80px;background-color: rgb(255,255,255)">
      <div style="margin: 30px 0px 20px 60px;border-bottom:4px solid rgb(255,90,30);width: 80px">
        <span style="">账号登录</span>
      </div>
    <el-form  status-icon :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
      <el-form-item label="门店"  prop="shop">
        <el-select v-model="staff.stshop" @change="setstaffs" placeholder="请选择店名" style="width: 230px">
          <el-option v-for="shop in shops" :label="shop" :key="shop" :value="shop" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工"  prop="staff">
        <el-select v-model="staff.stname" placeholder="请选择员工" style="width: 230px">
          <el-option v-for="staff in staffs1" :label="staff" :key="staff" :value="staff" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码"   prop="upassword">
        <el-input type="password" v-model="staff.stpassword" style="width: 230px;" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="login()" style="width: 230px;background-color: rgb(255,90,30);color: rgb(255,255,255)">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<style>
.home{
}

</style>
<script>
import { mapMutations } from 'vuex';
import ipconfig from "@/components/forbuilding/ipconfig";
export default {

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
      host:ipconfig.host,

      staff: {
        stpassword: '',
        stname: '',
        stshop:''
      },
      staffs1:[],
      shops:[],
      staffs:[],
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
  methods: {
    setstaffs(){
      this.staffs1=[];
      this.staff.stname="";
      for (let i = 0; i < this.staffs.length; i++) {
        if(this.staffs[i].stshop===this.staff.stshop){
          this.staffs1.push(this.staffs[i].stname);
        }
      }
    },
    loadstore(){
      const _this = this;
      axios.get(_this.host+'staff/findAllshops').then(function (resp){
        _this.shops = resp.data;
      })
      axios.get(_this.host+'staff/findAllstaffs').then(function (resp){
        _this.staffs = resp.data;
      })
    },
    login () {
      let _this = this;
      if (this.staff.stshop === '' || this.staff.stname === '') {
        alert('请选择正确店铺和员工');
      } else {
        this.axios({
          method: 'post',
          url: _this.host+'staff/login',
          data: _this.staff
        }).then(res => {
          console.log(res.data);
          if (res.data.staffid!=-1){
            localStorage.clear();
            localStorage.setItem('stname',res.data.stname);
            localStorage.setItem('stnumber',res.data.stnumber);
            localStorage.setItem('sttype',res.data.sttype);
            _this.$router.push('/managebuilding');
          }else {
            alert('账号或密码错误');
          }
        }).catch(error => {
          alert('账号或密码错误');
          console.log(error);
        });
      }
    },
    register(formName) {
      // this.$refs[formName].resetFields();
      this.$router.push({path:'/AddUser'});
    }
  },
  mounted() {
    this.loadstore();
  }
}


</script>