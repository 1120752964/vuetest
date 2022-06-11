<template>
  <div id="app">
    <el-header style="background-color: #ffffff;">
      <div style="height: 40px;width:130px;border-bottom: 3px solid rgb(246,126,0);">
        <span style="color: rgb(246,126,0);">看现场</span>
      </div>
    </el-header>

    <el-container style="height: 100%; border: 1px solid #eee">
      <el-main ref="shooting" :model="shooting">
        <div class="left" style="float:left;border: 3px solid;width: 49%;height: 100%">
          <div class="showimg" v-if="true">
            <!--轮播图-->
            <div style="height: 300px;width: 500px">
              <template>
                <!--第一次添加-->
                <el-carousel v-if="file" :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in fileList" :key="item.name">
                    <el-image v-if="item.name.includes('.jpeg')||item.name.includes('.png')||item.name.includes('.jpg')" fit="fit" :src="item.url" :alt="item.name"></el-image>
                    <video controls="controls" width="500px" height="300px" v-if="item.name.includes('.mp4')||item.name.includes('.avi')" :src="item.url" :alt="item.name"></video>
                  </el-carousel-item>
                </el-carousel>
                <!--展示-->
                <el-carousel v-if="show" :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in showList" :key="item.imgid">
                    <el-image v-if="item.imgforshooting.includes('.jpeg')||item.imgforshooting.includes('.png')||item.imgforshooting.includes('.jpg')" fit="fit" :src="item.imgforshooting" :alt="item.imgforshooting"></el-image>
                    <video controls="controls" width="500px" height="300px" v-if="item.imgforshooting.includes('.mp4')||item.imgforshooting.includes('.avi')" :src="item.imgforshooting" :alt="item.imgforshooting"></video>
                  </el-carousel-item>
                </el-carousel>
              </template>
            </div>
            <div>
              <el-upload
                  class="upload-demo"
                  action="#"
                  :on-change="handleChange"
                  :auto-upload="false"
                  :show-file-list="false"
                  :file-list="fileList">
                <el-button size="small" type="primary">点击选择文件</el-button>
                <div slot="tip" class="el-upload__tip">类型为jpg/png/mp4/avi，且不超过20MB</div>
              </el-upload>
            </div>
            <div v-if="show">
              <span>您已上传文件：</span>
              <div :key="i.imgid" v-for="i in showList">
                <span>{{ i.imgname }}</span> <i @click="removeshowfile(i)" class="el-icon-delete" ></i>
              </div>
            </div>
            <div>
              <span>您已选择文件：</span>
            </div>
            <div v-for="file in fileList">
              {{file.name}} <i @click="removefile(file)" class="el-icon-delete" ></i>
            </div>
          </div>
        </div>
        <div class="right" style="float:right;border: 3px solid;width: 49%;">
          <div style="margin-top: 30px;margin-left: 30px">
            <el-form :model="shooting">
              <el-form-item label="楼盘">
                <el-input v-model="shooting.hname" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="面积">
                <el-input v-model="shooting.hsize" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="装修">
                <el-input v-model="shooting.hfitment" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="介绍">
                <el-input type="textarea" :rows="4"  v-model="shooting.hremark" style="width: 400px;"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-button type="primary"  @click="onSubmit()" style="float: right;background-color: rgb(246,126,0);border: none">保存现场</el-button>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div>
          <template>
            <el-table
                :data="shootings"
                style="width: 100%">
              <el-table-column
                  prop="hname"
                  label="楼盘名称"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="hsize"
                  label="楼盘面积"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="hremark"
                  label="介绍">
              </el-table-column>
              <el-table-column
                  label="查看">
                <template slot-scope="scope">
                  <el-button @click="loadshooting(scope.row.shootingid)">查看</el-button>
                  <el-button @click="deleteshooting(scope.row.shootingid)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<style>

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-input.is-disabled /deep/ .el-input__inner {
  font-weight: bolder;
  color: rgb(264,146,0);
}
</style>

<script>
import {regionData} from "element-china-area-data";
import ipconfig from "@/components/forbuilding/ipconfig";

export default {
  data() {
    return {
      host:ipconfig.host,
      show:false,
      file:true,
      shootings:[],
      shooting:{hname:"",hsize:"",hremark:"",hfitment:""},
      //这次要上传的文件
      fileList: [],
      //已上传过，进行展示的文件
      showList:[],
    }
  },
  methods:{
    loadshootings(){
      const  _this = this;
      axios.get(_this.host+'shooting/findAll').then(function (resp){
        _this.shootings = resp.data;
      })
    },
    deleteshooting(shootingid){
      const  _this = this;
      axios.get(_this.host+'shooting/deleteShootingByShootingId/'+shootingid).then(function (resp){
        _this.loadshootings();
      })
    },
    loadshooting(shootingid){
      const  _this = this;
      axios.get(_this.host+'shooting/findByShootingId/'+shootingid).then(function (resp){
        _this.shooting = resp.data;

        _this.show=true;
        _this.file=false;
        axios.get(_this.host+'shooting/findImgByShootingId/'+shootingid).then(function (resp){
          _this.showList = resp.data;
          for (let i = 0; i < _this.showList.length; i++) {
            _this.showList[i].imgforshooting = _this.host+"images/"+ _this.showList[i].imgforshooting;
          }
          _this.fileList=[]
        })
      })
    },
    removeshowfile(file){
      for (let i=0;i<this.showList.length;i++){
        if(file.imgid==this.showList[i].imgid){
          this.showList.splice(i,1);
        }
      }
      console.log(this.showList)
    },
    removefile(file) {
      for (let i=0;i<this.fileList.length;i++){
        if(file.uid==this.fileList[i].uid){
          this.fileList.splice(i,1);
        }
      }
      console.log(this.fileList)
    },
    beforeAvatarUpload(file) {
      let fileName = file.name
      let pos = fileName.lastIndexOf('.')
      let lastName = fileName.substring(pos, fileName.length)
      if (lastName.toLowerCase() !== '.jpeg' &&lastName.toLowerCase() !== '.jpg'&&lastName.toLowerCase() !== '.mp4'&&lastName.toLowerCase() !== '.avi'&&lastName.toLowerCase() !== '.png'&&lastName.toLowerCase() !== '.gif') {
        this.$message.error('文件必须为.jpeg或.avi或.mp4或png或jpg类型')
        return false;
      }
      const isLt20M = file.size / 1024 / 1024 /20 < 1;
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return  isLt20M;
    },
    handleAvatarSuccess(res, file) {
      this.staff.stimg = URL.createObjectURL(file.raw);
      // console.log(this.staff.stimg)
    },
    handleChange(file, fileList) {
      let flag = this.beforeAvatarUpload(file)
      if(!flag){
        //出问题了
        this.fileList = fileList.slice(0,fileList.length-1);
      }else {
        //没问题
        this.fileList = fileList.slice(0,fileList.length-1);
        file.url = URL.createObjectURL(file.raw);
        this.fileList.push(file);
        console.log(this.fileList)
      }
    },
    computetotal(){
      if((!isNaN(this.building.bsize)&&this.building.bsize!='')&&(!isNaN(this.building.bprice)&&this.building.bprice!='')){
        this.building.btotal = Math.ceil(this.building.bsize * this.building.bprice *365 /12);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(formName){
      const  _this = this;
        //将配套设施和房源标签从数组转成字符串形式，存到后端
          //房源添加时间和修改时间 badddate,bchangedate
          let fd = new FormData();
          if(this.$route.query.shootingid){
            console.log(this.showList)
            for (let j = 0; j < _this.showList.length; j++) {
              let a = _this.showList[j].imgforshooting;
              a=a.substr(a.lastIndexOf('/')+1,a.length);
              _this.showList[j].imgforbuilding=a;
              console.log(_this.showList[j]);
              fd.append("showfiles",JSON.stringify(_this.showList[j]));
            }
            if(_this.showList.length==1){
              fd.append("showfiles","wtf");
            }
          }
          for (let i = 0; i < _this.fileList.length; i++) {
            fd.append("files",_this.fileList[i].raw);
          }
          if(_this.fileList.length==1){
            fd.append("files","wtf");
          }
          fd.append("shooting",JSON.stringify(_this.shooting));
          _this.$axios.defaults.headers.post['Content-Type']='multipart/form-data'
          axios.post(_this.host+'shooting/save',fd).then(function (resp1){
            alert("保存现场成功");
            _this.loadshooting(resp1.data.shootingid);
            _this.loadshootings();
          })
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    goback(){
      this.$router.push("/ClothingMall")
    },

  },
  mounted() {
    this.loadshootings();
    if (this.$route.query.shootingid!=null){
      this.loadbuilding(this.$route.query.shootingid);
    }
  }

}
</script>