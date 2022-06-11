<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="uid"
          label="用户编号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="uname"
          label="用户名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="unumber"
          label="用户账号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="upassword"
          label="用户密码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="upaypassword"
          label="用户支付密码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="uaddress"
          label="用户收货地址"
          width="120">
      </el-table-column>
      <el-table-column
          prop="usex"
          label="用户性别"
          width="120">
      </el-table-column>
      <el-table-column
          prop="utelphone"
          label="用户手机号"
          width="120">
      </el-table-column>
<!--      <el-table-column-->
<!--          fixed="right"-->
<!--          label="操作"-->
<!--          width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="editer(scope.row)" type="text" size="small">修改</el-button>-->
<!--          <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
<!--    page-size= "6"-->
    <el-pagination
        style="width: 80%"
        background
        layout="prev, pager, next"

        :total="total"
        @current-change="page">
    </el-pagination>
  </div>

</template>

<script>
export default {
  methods: {

    loadusers(){
      const  _this = this;
      axios.get('http://localhost:8181/user/findAll/1/6').then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },

    editer(row) {
      this.$router.push({
        path:'/UserUpdate',
        query:{
          uid:row.uid
        }
      });
    },
    deleteUser(row){
      const  _this = this;
      axios.delete('http://localhost:8181/user/deleteUserById/'+row.uid).then(function (resp) {
        _this.$alert(row.uname+'删除成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
           window.location.reload();
          }
        });
      })
    },
    page(currentPage){
      const  _this = this;
      axios.get('http://localhost:8181/user/findAll/'+currentPage+'/6').then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    getAdministrator(){

    }

  },
  mounted() {
    this.loadusers();
    this.getAdministrator();
  },
  data() {
    return {
      total:0,
      tableData: [],
    }
  }
}
</script>
