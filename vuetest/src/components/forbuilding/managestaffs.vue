<template>
  <el-container>
    <el-header style="background-color: #ffffff;height: 60px">
    <div style="height: 40px;width:130px;border-bottom: 3px solid rgb(246,126,0);">
      <span style="color: rgb(246,126,0);">员工管理</span>
    </div>
    </el-header>
  <el-container style="">
    <el-main style="padding: 5px;overflow: hidden">
    <el-table  border :data="tableData">
      <el-table-column prop="stnumber" label="员工编号" width="80"></el-table-column>
      <el-table-column prop="stshop" label="所在店铺" width="80"></el-table-column>
      <el-table-column prop="sttype" label="职位" width="120"></el-table-column>
      <el-table-column  prop="stname" label="姓名" width="120"></el-table-column>
      <el-table-column prop="stgender" label="性别" width="120"></el-table-column>
      <el-table-column prop="stadddate" label="入职时间" width="120"></el-table-column>
      <el-table-column prop="sttelphone" label="手机号" width="120"></el-table-column>
      <el-table-column
          prop="commoditystatus"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button @click="editstaff(scope.row)" type="text" >编辑</el-button>
          <el-button @click="deletestaff(scope.row)" type="text"  size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="page"
            :current-page="currentPage"
            :page-sizes="pagesizes"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import ipconfig from "@/components/forbuilding/ipconfig";

export default {
  name: "managebuilding",
  data() {
    return {
      host:ipconfig.host,
      total: 0,
      pagesize: 10,
      pagesizes: [5, 10, 15, 20],
      tableData: [],
      currentPage: 1,
    }
  },
  methods:{
    deletestaff(row){
      const  _this = this;
      axios.get(_this.host+'staff/deletestaff/'+row.stnumber).then(function (resp){
        // _this.loadStaffs();
        _this.$alert('员工:'+row.stname+'删除成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload();
          }
        });
      })
    },
    editstaff(row){
      this.$router.push({
        path:'/editstaff',
        query:{
          "stnumber":row.stnumber
        }
      });
    },
    loadStaffs(){
      const  _this = this;
      axios.get(_this.host+'staff/findAll/1/10').then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    handleSizeChange(pagesize) {
      this.pagesize=pagesize;
      const  _this = this;
      axios.get(_this.host+'staff/findAll/'+this.currentPage+'/'+pagesize).then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    page(currentPage){
      const  _this = this;
      axios.get(_this.host+'staff/findAll/'+currentPage+'/'+this.pagesize).then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
  },
  mounted() {
    this.loadStaffs();
  }
}
</script>

<style scoped>

.headernav span{
  font-size: 15px;
}
.a{
  cursor:pointer;
}

.paixu span{
  font-size: smaller;
  padding-bottom: -10px;
}
li{list-style:none}
</style>