<template>
  <el-container>
    <el-header style="background-color: #ffffff;height: 100px">
    <div style="height: 40px;width:130px;border-bottom: 3px solid rgb(246,126,0);">
      <span style="color: rgb(246,126,0);">楼盘管理</span>
    </div>
    <div class="headernav">
      <!--区域-->
      <div class="area">
        <span>区域</span>
        <template>
          <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                     v-model="options.area" placeholder="请选择">
            <el-option
                v-for="item in areas"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </template>
        <span>板块</span>
        <template>
          <el-select size="small"
                     style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                     v-model="options.plate" placeholder="请选择">
            <el-option
                v-for="item in plates"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </template>
        <span>楼盘</span>
          <template>
            <el-autocomplete
                style="  width: 200px;height: 40px;margin-left: 10px;margin-right: 10px"
                class="inline-input"
                size="small"
                v-model="options.house"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
            ></el-autocomplete>
          </template>
        <span>类型</span>
        <template>
          <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                     v-model="options.type" placeholder="请选择">
            <el-option
                v-for="item in types"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </template>
        <el-button @click="queryhouse" size="mini" type="primary">查询</el-button>
        <el-button @click="resethouse" size="mini" type="primary">清空</el-button>
      </div>

        </div>
    </el-header>

  <el-container >
    <el-main style="padding: 5px;overflow: hidden">
    <el-table class="el-table" :cell-style="cellStyle" border :data="tableData">
      <el-table-column align="center" prop="harea" label="区域" width="80"></el-table-column>
      <el-table-column align="center" prop="hplate" label="板块" width="80">
      </el-table-column>
      <el-table-column  header-align="center" label="房源信息" width="350">
        <template slot-scope='scope'>
          <div style="float: left;margin: 10px 10px 0px 5px">
            <img @click="edithouse(scope.row)" :src="scope.row.hpicture" style="height: 80px;width:120px;">
            </img>
          </div>
          <div>
            <span style="color: rgb(246,126,0);font-size: large">{{scope.row.hname}}</span>
          </div>
          <div>
            <span>{{scope.row.haddress}}</span>
          </div>
          <div style="margin-top: 20px">
            <span style="color: rgb(50,131,17)">在租</span>
            <span style="margin: 0 10px">{{scope.row.honrentcount}}</span><span style="margin: 0 10px 0 0px">套</span>
            <span style="color: rgb(0,0,255)">在售</span>
            <span style="margin: 0 10px">{{scope.row.honsellcount}}</span><span>套</span>
            <div style="float: right">
              <i class="el-icon-delete" v-if="sttype==='经理'" @click="deletehouse(scope.row)"></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="htype" label="类型" width="80"></el-table-column>
      <el-table-column align="center" prop="hsubway" label="地铁线" width="80">
      </el-table-column>
      <el-table-column align="center" prop="hair" label="空调" width="80"></el-table-column>
      <el-table-column align="center" prop="hmanagementfee" label="物业费" width="80"></el-table-column>
      <el-table-column header-align="center" prop="hmanagementfee" label="支付方式" width="120">
        <template slot-scope='scope'>
          <span>押{{scope.row.hya}}</span>
          <span>付{{scope.row.hfu}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="hcommission" label="佣金" width="80"></el-table-column>
      <el-table-column header-align="center" prop="hremark"   label="备注" ></el-table-column>

    </el-table>
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
      restaurants: [],
      sttype:"",
      host:ipconfig.host,
      areas:["不限"],
      plates:["不限"],
      types:["不限"],
      houses:["不限"],
      options: {area:"不限", plate:"不限",  type:"不限", house:""},
      total: 0,
      pagesize: 10,
      pagesizes: [5, 10, 15, 20],
      tableData: [],
      subways:[],
      currentPage: 1,

    }
  },
  methods:{
    cellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex === 9){
        return  'vertical-align:top'
      }
    },
    resethouse(){
      this.options =   {area:"不限", plate:"不限",  type:"不限", house:""}
    },
    queryhouse(){
      const  _this = this;
      axios.post(_this.host+'house/queryhouse',_this.options).then(function (resp){
        let houses = resp.data;
        for (let i = 0; i <houses.length; i++) {
          axios.get(_this.host+'house/getpictureurl/'+houses[i].hnumber).then(function (res) {
            _this.$set(houses[i],"hpicture",_this.host+"images/"+res.data)
          })
        }
        for (let i = 0; i <houses.length; i++) {
          axios.get(_this.host+'house/getonrentcount/'+houses[i].hname).then(function (res) {
            _this.$set(houses[i],"honrentcount",res.data)
          })
        }
        for (let i = 0; i <houses.length; i++) {
          axios.get(_this.host+'house/getonsellcount/'+houses[i].hname).then(function (res) {
            _this.$set(houses[i],"honsellcount",res.data)
          })
        }
        _this.tableData = houses;
      })
    },
    deletehouse(row){
      const  _this = this;
      this.$confirm('此操作将同时删除楼盘下的所有房源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(_this.host+'house/deletehouse/'+row.hid).then(function (resp){
          _this.$alert('楼盘:'+row.hname+'删除成功!', '', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload();
            }
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    edithouse(row){
      this.$router.push({
        path:'/edithouses',
        query:{
          "hid":row.hid
        }
      });
    },
    loadHouses(){
      const  _this = this;
      //加载house
      axios.get(_this.host+'house/findAll').then(function (resp){
        let houses = resp.data;
        for (let i = 0; i <houses.length; i++) {
          axios.get(_this.host+'house/getpictureurl/'+houses[i].hnumber).then(function (res) {
            _this.$set(houses[i],"hpicture",_this.host+"images/"+res.data)
          })
        }
        for (let i = 0; i <houses.length; i++) {
          axios.get(_this.host+'house/getonrentcount/'+houses[i].hname).then(function (res) {
            _this.$set(houses[i],"honrentcount",res.data)
          })
        }
        for (let i = 0; i <houses.length; i++) {
          axios.get(_this.host+'house/getonsellcount/'+houses[i].hname).then(function (res) {
            _this.$set(houses[i],"honsellcount",res.data)
          })
        }
        _this.tableData = houses;

        let houseList = houses;
        // 加载选项
        for(let i=0;i<houseList.length;i++){
          if(!_this.areas.includes(houseList[i].harea)){
            _this.areas.push(houseList[i].harea);}
          if(!_this.plates.includes(houseList[i].hplate)){
            _this.plates.push(houseList[i].hplate);}
          if(!_this.types.includes(houseList[i].htype)){
            _this.types.push(houseList[i].htype);}
          if(!_this.houses.includes(houseList[i].hname)){
            _this.houses.push(houseList[i].hname);}
        }
        //加载subways  加载subways楼栋
        axios.get(_this.host+'house/findAllSubways').then(function (resp){
          var subways = resp.data;
          for(let i=0; i < _this.tableData.length;i++){
            if(subways[_this.tableData[i].hnumber]){
              // console.log(subways[_this.tableData[i].hnumber])
              _this.tableData[i].hsubway = subways[_this.tableData[i].hnumber];
            }
          }
        })
      })
    },
    handleSizeChange(pagesize) {
      this.pagesize=pagesize;
      const  _this = this;
      axios.get(_this.host+'house/findAll/'+this.currentPage+'/'+pagesize).then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    page(currentPage){
      const  _this = this;
      axios.get(_this.host+'house/findAll/'+currentPage+'/'+this.pagesize).then(function (resp){
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    //输入字，经过建议后选中楼盘名时触发的事件：
    //从楼盘获取数据后同步数据
    handleSelect(item) {
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadres(){
      //加载楼盘
      const  _this = this;
      let temp = []
      axios.get(_this.host+'house/findAll').then(function (resp){
        let houses = resp.data;
        for (let i = 0; i <houses.length; i++) {
          temp.push({"value":houses[i].hname})
        }
      })
      return temp;
    },
  },
  mounted() {
    this.loadHouses();
    this.sttype = localStorage.getItem("sttype");
    this.restaurants = this.loadres();

    // if(localStorage.getItem('hid')){
    //   const  _this = this;
    //   axios.get(_this.host+'house/findpagebyid/'+localStorage.getItem('buildingid')).then(function (resp){
    //     _this.currentPage=resp.data
    //     _this.page(resp.data)
    //     localStorage.removeItem('hid')
    //   })
    // }
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