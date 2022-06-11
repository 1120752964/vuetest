<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="cname"
          label="商品名"
          width="150">
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
          label="商品发货地"
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
          width="100">
        <template slot-scope="scope">

          <el-button @click="editer2(scope.row)" type="text" v-if="scope.row.cstatus==='未通过'" size="small">批准</el-button>
          <el-button @click="editer(scope.row)" type="text" v-if="scope.row.cstatus==='已通过'" size="small">撤销通过</el-button>
<!--          <el-button @click="deleteCommodity(scope.row)" type="text" v-if="scope.row.cstatus==='已通过'" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
<!--    page-size="6"-->
    <el-pagination
        style="width: 80%"
        background
        layout="prev, pager, next"
        page-size=6
        :current-page.sync="currentPage"
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
      axios.get('http://localhost:8181/commodity/findAllForAdministrate/'+this.currentPage+'/6').then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },

    editer(row) {
      const  _this = this;
      axios.post('http://localhost:8181/commodity/CommodityUnAuthorize/'+row.cname).then(function (resp) {
        _this.$alert('撤销商品:'+row.cname+'成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
            // window.location.reload();
            // _this.loadusers()
            _this.page(_this.currentPage)
          }
        });
      })
    },
    editer2(row) {
      const  _this = this;
      axios.post('http://localhost:8181/commodity/CommodityAuthorize/'+row.cname).then(function (resp) {
        _this.$alert('批准商品:'+row.cname+'成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
            _this.page(_this.currentPage)
          }
        });
      })
    },
    deleteCommodity(row){
      const  _this = this;
      axios.delete('http://localhost:8181/commodity/deleteCommodityByCname/'+row.cname).then(function (resp) {
        _this.$alert(row.cname+'删除成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
           window.location.reload();

          }
        });
      })
    },
    page(currentPage){
      const  _this = this;
      axios.get('http://localhost:8181/commodity/findAllForAdministrate/'+currentPage+'/6').then(function (resp){
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
      currentPage:1
    }
  }
}
</script>