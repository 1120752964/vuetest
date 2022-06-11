<template>

  <div>
<!--    商户端展示商品页面  -->
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="cname"
          label="商品名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="coldprice"
          label="商品原价"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cnowprice"
          label="商品现价"
          width="120">
      </el-table-column>
      <el-table-column
          prop="csales"
          label="商品销量"
          width="120">
      </el-table-column>
      <el-table-column
          prop="caddress"
          label="发货地址"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cquantity"
          label="商品库存"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cimages"
          label="商品图片url"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cstatus"
          label="商品审核状态"
          width="120">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button @click="editer(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    page-size= "6"-->
    <el-pagination
        style="width: 80%"
        background
        layout="prev, pager, next"
        :page-size="6"
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
      axios.get('http://localhost:8181/commodity/findAll/1/6/'+localStorage.getItem("storename")).then(function (resp){
        // console.log(resp.data.totalElements)
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },

    editer(row) {
      this.$router.push({
        path:'/CommodityUpdate',
        query:{
          cid:row.cid
        }
      });
    },
    deleteUser(row){
      // console.log(row)
      const  _this = this;
      axios.delete('http://localhost:8181/commodity/deleteCommodityById/'+row.cid).then(function (resp) {
        _this.$alert(row.cname+'删除成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
            _this.loadusers()
          }
        });
      })
    },
    page(currentPage){
      const  _this = this;
      axios.get('http://localhost:8181/commodity/findAll/'+currentPage+'/6/'+localStorage.getItem("storename")).then(function (resp){
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
      total:1000,
      tableData: [],
    }
  }
}
</script>
