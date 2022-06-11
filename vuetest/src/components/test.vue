<template>
  <div id="app">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'款式' + (index+1)"
      >
        <div>
          <el-input style="width: 14%" v-model="domain.commoditycolortext" placeholder="请输入该款式颜色名称"></el-input>
          <el-input style="width: 14%" v-model="domain.commoditysize" placeholder="请输入该款式大小"></el-input>
          <el-input style="width: 30%" v-model="domain.commoditycolorcimage" placeholder="请输入该款式图片url"></el-input>
          <el-input style="width: 14%" v-model="domain.commodity_quantity" placeholder="请输入该款式库存"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增款式</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          commodity_quantity: '',
          commoditycolortext: '',
          commoditysize: '',
          commoditycolorcimage:''
        }],
        email: ''
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://localhost:8181/commodity/savecommdity_detail",_this.dynamicValidateForm.domains).then(function (resp){
            if (resp.data == 'success'){
              _this.$alert("添加成功!", '', {
                confirmButtonText: '确定',
                callback: action => {

                  // _this.$router.push("/CommodityManage")
                }
              });
            }
          })
          console.log(_this.dynamicValidateForm.domains)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        commodity_quantity: '',
        commoditycolortext: '',
        commoditysize: '',
        commoditycolorcimage:''
      });
    }
  }
}
</script>