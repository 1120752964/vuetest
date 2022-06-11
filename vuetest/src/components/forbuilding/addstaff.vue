<template>
  <div id="app">
    <el-header style="background-color: #ffffff;">
      <div style="height: 40px;width:130px;border-bottom: 3px solid rgb(246,126,0);">
        <span style="color: rgb(246,126,0);">录入员工</span>
      </div>
    </el-header>

    <el-container style="height: 100%; border: 1px solid #eee">
      <el-main>
        <div class="left" style="border: 3px solid;float: left;height: 100%;width: 50%">
          <el-form ref="staff" :rules="rules"   :model="staff" label-width="100px">
            <el-form-item  prop="stname" label="员工姓名" >
              <el-input :disabled="flag" v-model="staff.stname" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item prop="stshop" label="员工店铺" >
              <el-select v-model="staff.stshop" placeholder="请选择" style="width: 180px">
                <el-option label="南翔店" value="南翔店"></el-option>
                <el-option label="测试店" value="测试店"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="stgender" label="员工性别" >
              <el-select v-model="staff.stgender" placeholder="请选择" style="width: 180px">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="stadddate" label="入职时间" >
              <el-date-picker
                  style="width: 180px"
                  v-model="staff.stadddate"
                  align="right"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="sttelphone" label="员工手机号" >
              <el-input v-model="staff.sttelphone" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item prop="stwechat" label="员工微信号" >
              <el-input v-model="staff.stwechat" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item  prop="stnumber" label="员工编号">
              <el-input v-model="staff.stnumber" :disabled="flag" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item prop="stpassword" label="员工密码">
              <el-input v-model="staff.stpassword" style="width: 180px" ></el-input>
            </el-form-item>
            <el-form-item prop="sttype" label="员工职位">
              <el-select v-model="staff.sttype" placeholder="请选择" style="width: 180px">
                <el-option label="普通员工" value="普通员工"></el-option>
                <el-option label="经理" value="经理"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="头像">
            <el-upload
                class="avatar-uploader"
                ref="upimg"
                accept="image/png,image/jpeg,image/gif,image/jpg"
                action="#"
                :show-file-list="false"
                :on-change="handlechange"
                :on-remove="handleRemove"
                :auto-upload="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <img v-if="staff.stimg" :src="staff.stimg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </el-form>
<!--          <input type="file" ref="myfile">-->
<!--          <el-button @click="importData" type="success" size="mini" icon="el-icon-upload2">导入数据</el-button>-->
        </div>

      </el-main>
      <el-footer>
        <div>
          <el-button type="primary"  @click="onSubmit('staff')" style="float: right;background-color: rgb(246,126,0);border: none">保存员工</el-button>
          <el-button type="primary"  @click="resetForm('staff')" style="float: right;margin-right:20px;background-color: rgb(246,126,0);border: none">重置</el-button>
        </div>

      </el-footer>
    </el-container>
  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<script>
import ipconfig from "@/components/forbuilding/ipconfig";
export default {
  data() {
    var validateStnumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入员工编号'));
      } else {
        if(!this.$route.query.stnumber){
        if (this.staff.stnumber !== '') {
          axios.get(ipconfig.host+"staff/juddgeifdup/"+this.staff.stnumber).then(function (resp){
            if (resp.data.staffid>0){
              callback(new Error('该员工编号与员工:'+resp.data.stname+"的账号重复,请修改账号"))
            }else if (resp.data.staffid==0){
              callback(new Error("员工编号必须为数字！"))
            }else if(resp.data.staffid==-1){
              callback();
            }else {
              callback(new Error("莫名的Bug"))
            }
          })
      }}else {
          //存在传过来的  this.$route.query.stnumber  说明这是在修改  所以不判断stnumber
          callback();
        }
      }};
    var validateStname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入员工姓名'));
      } else {
        if(!this.$route.query.stnumber){
          if (this.staff.stname !== '') {
            axios.get(ipconfig.host+"staff/judgenamedup/"+this.staff.stname).then(function (resp){
              if (resp.data.staffid>0){
                callback(new Error('该员工姓名已被占用,请修改'))
              }else if(resp.data.staffid===-1){
                //无事发生
                callback();
              }else {
                callback(new Error("莫名的Bug"))
              }
            })
          }}else {
          //存在传过来的  this.$route.query.stnumber  说明这是在修改  所以通过cid判断能否输入编号和姓名
          callback();
        }
      }};

    return {
      host:ipconfig.host,
      fileList:[],
      flag:false,
      /*日期选择器内容*/
      value1:"",
      pickerOptions: {disabledDate(time) {return time.getTime() > Date.now();}, shortcuts: [{ text: '今天', onClick(picker) { picker.$emit('pick', new Date());}}, {text: '昨天', onClick(picker) {const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}}, {text: '一周前', onClick(picker) {const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]},
      staff:{stnumber:"", stimg: '', stshop:"", stpassword: "", sttype:"", stname:"", stgender:"", stadddate:"", sttelphone:"", stwechat:""},
      rules: {
        stname: [
          { required: true,validator: validateStname, trigger: 'blur' },
        ],
        stshop: [
          { required: true, message: '请选择所在店铺', trigger: 'change' },
        ],
        stpassword: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }

        ],
        sttype: [
          {  required: true, message: '请选择职务', trigger: 'change' }
        ],
        stadddate: [
          {  required: true, message: '请选择时间', trigger: 'change' }
        ],
        // stnumber: [
        //   {  required: true, message: '请输入员工编号', trigger: 'change' }
        // ],
        stnumber: [
          { required: true,validator: validateStnumber, trigger: 'blur' },
        ],
        stgender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        sttelphone: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号必须为11位数字', trigger: 'blur' }
        ],
        stwechat: [
          {  message: '请输入微信号', trigger: 'blur' }
        ],

    }}
  },

  methods:{
    // importData() {
    //   let myfile = this.$refs.myfile;
    //   let files = myfile.files;
    //   let file = files[0];
    //   var formData = new FormData();
    //   formData.append("file", file);
    //   axios({
    //     method: 'post',
    //     url: _this.host+'staff/saveimg',
    //     data: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }).then(function (resp){
    //     console.log(resp)
    //   })
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlechange(file,filelist){
      this.staff.stimg = URL.createObjectURL(file.raw);
      this.fileList = filelist;
      let a = filelist[0];
      console.log(URL.createObjectURL(a.raw))
    },

    handleAvatarSuccess(res, file) {
      this.staff.stimg = URL.createObjectURL(file.raw);
      // console.log(this.staff.stimg)
    },
    beforeAvatarUpload(file) {
      let types = ['image/jpeg','image/png','image/jpg','image/gif'];
      const isJPG = types.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG、GIF、JPEG 4中格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      return isJPG && isLt2M;
    },
    loadstaff(stnumber){
        const  _this = this;
        axios.get(_this.host+'staff/findByStnumber/'+stnumber).then(function (resp){
          console.log(resp)
          _this.staff = resp.data;
          if(_this.staff.stimg){
            _this.staff.stimg = _this.host+"images/"+_this.staff.stimg;
          }
          // _this.staff.stimg = require(_this.staff.stimg);
        })
    },
    onSubmit(formName){
      const  _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加图片和员工信息到FormData中
          let fd = new FormData();
          console.log(_this.fileList)
          if(_this.fileList.length==0){
            fd.append("flag","true" );
            fd.append("stimg","");
          }else {
            fd.append("flag","false" );
            fd.append("stimg",_this.fileList[0].raw );
          }
          fd.append("staff",JSON.stringify(_this.staff));
          _this.$axios.defaults.headers.post['Content-Type']='multipart/form-data'
          axios.post(_this.host+'staff/save',fd).then(function (resp){
            console.log(resp)
            if(resp.data=='success'){
              _this.resetForm(formName);
              _this.staff={};
              if(_this.$route.query.stnumber){
                _this.$router.push("/managestaffs")
              }else {
                alert("新增员工成功")
                _this.$router.push("/managestaffs")
              }
            }
          })
        } else {
          alert("请正确输入内容！")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goback(){
      this.$router.push("/ClothingMall")
    },
  },
  mounted() {
    if (this.$route.query.stnumber!=null){
      this.loadstaff(this.$route.query.stnumber);
      this.flag=true;
    }else {
      this.staff={stnumber:"", stimg: '', stshop:"", stpassword: "", sttype:"", stname:"", stgender:"", stadddate:"", sttelphone:"", stwechat:""};
      this.flag=false;
    }
  }

}
</script>