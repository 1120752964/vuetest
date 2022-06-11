<template>
  <el-container>
    <el-header style="background-color: #ffffff;height: 180px">
    <div style="height: 40px;width:130px;border-bottom: 3px solid rgb(246,126,0);">
      <span style="color: rgb(246,126,0);">房源管理</span>
    </div>
    <div class="headernav">
        <!--区域-->
        <div class="area">
          <span >区域</span>
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
            <span>状态</span>
            <template>
              <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                         v-model="options.state" placeholder="请选择">
                <el-option
                    v-for="item in states"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
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
        </div>
        <div class="number" style="margin-top: -15px">
          <span>编号</span>
            <el-input v-model="options.number" placeholder="请输入" size="small" style="width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"></el-input>
          <span>面积</span>
          <template>
            <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                       v-model="options.size1" placeholder="请选择">
              <el-option
                  v-for="item in sizes1"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </template>
          <span style="margin: 0 -5px">-</span>
          <template>
            <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                       v-model="options.size2" placeholder="请选择">
              <el-option
                  v-for="item in sizes2"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </template>

          <span>单价</span>
          <template>
            <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                       v-model="options.price1" placeholder="请选择">
              <el-option
                  v-for="(item,index) in prices1"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </template>
          <span style="margin: 0 -5px">-</span>
          <template>
            <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                       v-model="options.price2" placeholder="请选择">
              <el-option
                  v-for="(item,index) in prices2"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </template>
          <span style="margin: 0 15px">所属人</span>
          <template>
            <el-select size="small" v-model="options.shop" @change="setstaffs1" style="width: 90px">
              <el-option v-for="shop in shops"  :label="shop" :key="shop" :value="shop"></el-option>
            </el-select>
            <el-select size="small" v-model="options.staff"   style="width: 90px;margin-right: 15px">
              <el-option v-for="staff in staffs1"  :label="staff" :key="staff" :value="staff"></el-option>
            </el-select>
          </template>
          <el-button @click="querybuilding" style="margin-left: 2px" size="mini" type="primary">查询</el-button>
          <el-button @click="resetbuilding" type="primary" size="mini">清空</el-button>
        </div>

      <div class="paixu" style="border-bottom: 3px solid rgb(245,245,245);margin-top: -40px;text-align: right;height: 40px">
        <span >排序：</span>
        <el-link @click="sortByAddDate"  :underline="false">发布日期</el-link><i class="el-icon-bottom"></i>
        <el-link @click="sortByChangeDate" :underline="false">编辑日期</el-link><i class="el-icon-bottom"></i>
      </div>

    </div>
    </el-header>

  <el-container >
    <el-main style="padding: 5px;margin-top:-15px;overflow: hidden">
    <el-table   :cell-style="cellStyle" border :data="buildings">
      <el-table-column  align="center"  label="交易" width="80">
        <template slot-scope='scope'>
            <span style="color: rgb(246,126,0)">{{scope.row.brenttype}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="状态" width="80">
        <template slot-scope='scope'>
          <span style="color: rgb(0,0,255)">{{scope.row.bstate}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="barea" label="区域" width="80"></el-table-column>
      <el-table-column align="center" prop="bplate" label="板块" width="80"></el-table-column>
      <el-table-column header-align="center" label="房源信息" width="400">
        <template slot-scope='scope'>
          <div style="float: left;margin: 10px 5px 5px 15px" >
            <img @click="editbuilding(scope.row)" :src="scope.row.bpicture" style="height: 80px;width:120px;">
          </div>
          <div style="margin-top: 5px"><span style="color: #333333">{{scope.row.bhname}}</span></div>
          <div id="spans" style="margin-top: 10px">
            <span style="margin-right: 20px">{{scope.row.btype}}   </span>
            <span style="margin-right: 20px">{{scope.row.bsize}}㎡    </span>
            <span style="margin-right: 20px">{{scope.row.bprice}}/㎡/天   </span>
            <div style="margin-top: 10px">
            <span>编号:{{scope.row.bnumber}}</span>
            <span style="margin-left: 20px">已编辑:{{GetNumberOfDays(scope.row)}} </span>
            <i style="font-size: large;float: right" v-if="authority==='经理'" class="el-icon-delete" @click="deletebuilding(scope.row)"></i>
            </div>
          </div>
       </template>
      </el-table-column>
      <el-table-column align="center" prop="bfitment" label="装修情况" width="80"></el-table-column>
      <el-table-column align="center" prop="bair" label="空调" width="120"></el-table-column>
      <el-table-column align="center" prop="bmanagementfee" label="物业费" width="80"></el-table-column>
      <el-table-column align="center" prop="bpaytype" label="支付方式" width="80"></el-table-column>
      <el-table-column align="center" prop="bpaynorm" label="佣金" width="80"></el-table-column>
<!--      <el-table-column header-align="center" prop="badddate" label="委托日期" ></el-table-column>-->
      <el-table-column align="center" prop="badddate" label="委托日期" >
        <template slot-scope='scope'>
          <span>{{scope.row.badddate.split(' ')[0]}}</span>
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
<style>
.headernav span{
  font-size: 15px;
}
</style>
<script>
import ipconfig from "@/components/forbuilding/ipconfig";

export default {
  name: "managebuilding",
  data() {
    return {
      shops:[],
      staffs:[],
      staffs1:[],
      authority:'',
      total:0,
      pagesize: 20,
      pagesizes: [20,50,],
      currentPage: 1,
      host:ipconfig.host,
      buildings: [],
      restaurants: [],
      areas:["不限"],
      plates:["不限"],
      states:["不限"],
      types:["不限"],
      houses:["不限"],
      numbers:["不限"],
      sizes1:[0,50,100,150,200,300,400,500,600,700,800,900,1000,2000,3000,5000],
      sizes2:[50,100,150,200,300,400,500,600,700,800,900,1000,2000,3000,5000,10000],
      prices1:[0,1,1.5,2,2.5,3,4,5,6,7,8,9,10],
      prices2:[1,1.5,2,2.5,3,4,5,6,7,8,9,10,12,15],
      options: {shop:"不限",staff:"不限",area:"不限", plate:"不限", state:"有效", type:"不限", house:"", number:"", size1:"不限", size2:"不限", price1:"不限", price2:"不限"}
    }
  },
  computed:{

  },
  methods:{
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
    cellStyle({row, column, rowIndex, columnIndex}){
      // if(columnIndex === 10){
      //   return  'vertical-align:top'
      // }
      return 'padding:1px'
    },
    setstaffs1(){
      this.staffs1=["不限"];
      for (let i = 0; i < this.staffs.length; i++) {
        if(this.staffs[i].stshop===this.options.shop){
          this.staffs1.push(this.staffs[i].stname);
        }
      }
    },
    sortByAddDate(){
      //因为js写的总是split函数出问题，挪到后端去写
      const  _this = this;
      axios.get(_this.host+'building/sortByAddDate').then(function (resp){
        let buildings = resp.data;
        for (let i = 0; i <buildings.length; i++) {
          axios.get(_this.host+'building/getpictureurl/'+buildings[i].bnumber).then(function (res) {
            if (res.data==""){
              _this.$set(buildings[i],"bpicture","https://image.so.com/view?q=%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=f42aa2747a51fda308bd7b8439c6e634&src=360pic_new&correct=%E5%9B%BE%E7%89%87&ancestor=list&cmsid=c8ac3b0e9e814976cdeaacc96132c7ba&cmras=6&cn=0&gn=0&kn=50&crn=0&bxn=20&fsn=130&cuben=0&pornn=0&manun=24&adstar=0&clw=254#id=b3ef317286eee91628778922a282ab19&prevsn=274&currsn=310&ps=487&pc=60")
            }else {
              _this.$set(buildings[i],"bpicture",_this.host+"images/"+res.data)
            }
          })
        }
        _this.buildings = buildings;
      })
    },
    sortByChangeDate(){
      const  _this = this;
      axios.get(_this.host+'building/sortByChangeDate').then(function (resp){
        let buildings = resp.data;
        for (let i = 0; i <buildings.length; i++) {
          axios.get(_this.host+'building/getpictureurl/'+buildings[i].bnumber).then(function (res) {
            if (res.data==""){
              _this.$set(buildings[i],"bpicture","https://image.so.com/view?q=%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=f42aa2747a51fda308bd7b8439c6e634&src=360pic_new&correct=%E5%9B%BE%E7%89%87&ancestor=list&cmsid=c8ac3b0e9e814976cdeaacc96132c7ba&cmras=6&cn=0&gn=0&kn=50&crn=0&bxn=20&fsn=130&cuben=0&pornn=0&manun=24&adstar=0&clw=254#id=b3ef317286eee91628778922a282ab19&prevsn=274&currsn=310&ps=487&pc=60")
            }else {
              _this.$set(buildings[i],"bpicture",_this.host+"images/"+res.data)
            }
          })
        }
        _this.buildings = buildings;
      })
    },

    querybuilding(){
      const  _this = this
      axios.post(_this.host+'building/querybuilding',_this.options).then(function (resp){
        let buildings = resp.data;
        for (let i = 0; i <buildings.length; i++) {
          axios.get(_this.host+'building/getpictureurl/'+buildings[i].bnumber).then(function (res) {
            if (res.data==""){
              _this.$set(buildings[i],"bpicture","https://image.so.com/view?q=%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=f42aa2747a51fda308bd7b8439c6e634&src=360pic_new&correct=%E5%9B%BE%E7%89%87&ancestor=list&cmsid=c8ac3b0e9e814976cdeaacc96132c7ba&cmras=6&cn=0&gn=0&kn=50&crn=0&bxn=20&fsn=130&cuben=0&pornn=0&manun=24&adstar=0&clw=254#id=b3ef317286eee91628778922a282ab19&prevsn=274&currsn=310&ps=487&pc=60")
            }else {
              _this.$set(buildings[i],"bpicture",_this.host+"images/"+res.data)
            }
          })
        }
        _this.buildings = buildings;
      })
    },
    resetbuilding(){
      this.options= {shop:"不限",staff:"不限",area:"不限", plate:"不限", state:"不限", type:"不限", house:"", number:"", size1:"不限", size2:"不限", price1:"不限", price2:"不限"}
    },
    GetNumberOfDays(row) {//获得天数
      let changedate = row.bchangedate.toString();
      let adddate = row.badddate.toString();
      let day = 0;
      if(changedate&&adddate){
        let a1 = new Date();
        let a2 = new Date();
        let changedates = changedate.split('-');
        a2.setFullYear(parseInt(changedates[0]));
        a2.setMonth(parseInt(changedates[1])-1);
        let dates = changedates[2].split(' ');
        a2.setDate(parseInt(dates[0]));
        let minutes = dates[1].split(':');
        a2.setMinutes(parseInt(minutes[1]));
        a2.setHours(parseInt(minutes[0]));
        a2.setSeconds(parseInt(minutes[2]));//a2为编辑时间
        let minute = parseInt((a1-a2)/ (1000 * 60 ));//* 60 * 24
        if(minute<60*24){
        //   if(minute<60){
        //     day = minute+"分钟"
        //   }else {
        //     let x = minute%60;
        //     day = Math.floor(minute/60) + "小时"+x+"分钟"
        //   }
        // }else if(minute/(60*24)>365){
        //   let temp = Math.floor(minute/(60*24)%365)
          day = 0+"天"
        }
        else {
          day = Math.floor(minute/(60*24))+"天"
        }
      }
      return day
    },
    deletebuilding(row){
      const  _this = this;
      axios.get(_this.host+'building/deletebuilding/'+row.buildingid).then(function (resp){
        _this.$alert('房源:'+row.bnumber+'删除成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload();
          }
        });
      })
    },
    editbuilding(row){
      this.$router.push({
        path:'/editbuilding',
        query:{
          "buildingid":row.buildingid
        }
      });
    },
    handleSizeChange(pagesize) {
      this.pagesize=pagesize;
      const  _this = this;
      axios.get(_this.host+'building/findAll/'+this.currentPage+'/'+pagesize).then(function (resp){
        _this.buildings = resp.data.content;
        _this.total = resp.data.totalElements;
        let buildings = _this.buildings
        for (let i = 0; i <buildings.length; i++) {
          axios.get(_this.host+'building/getpictureurl/'+buildings[i].bnumber).then(function (res) {
            if (res.data==""){
              _this.$set(buildings[i],"bpicture","https://image.so.com/view?q=%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=f42aa2747a51fda308bd7b8439c6e634&src=360pic_new&correct=%E5%9B%BE%E7%89%87&ancestor=list&cmsid=c8ac3b0e9e814976cdeaacc96132c7ba&cmras=6&cn=0&gn=0&kn=50&crn=0&bxn=20&fsn=130&cuben=0&pornn=0&manun=24&adstar=0&clw=254#id=b3ef317286eee91628778922a282ab19&prevsn=274&currsn=310&ps=487&pc=60")
            }else {
              _this.$set(buildings[i],"bpicture",_this.host+"images/"+res.data)
            }
          })
        }
        _this.buildings = buildings;
      })
    },
    page(currentPage){
      const  _this = this;
      axios.get(_this.host+'building/findAll/'+currentPage+'/'+this.pagesize).then(function (resp){
        _this.buildings = resp.data.content;
        _this.total = resp.data.totalElements;
        let buildings = _this.buildings
        for (let i = 0; i <buildings.length; i++) {
          axios.get(_this.host+'building/getpictureurl/'+buildings[i].bnumber).then(function (res) {
            if (res.data==""){
              _this.$set(buildings[i],"bpicture","https://image.so.com/view?q=%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=f42aa2747a51fda308bd7b8439c6e634&src=360pic_new&correct=%E5%9B%BE%E7%89%87&ancestor=list&cmsid=c8ac3b0e9e814976cdeaacc96132c7ba&cmras=6&cn=0&gn=0&kn=50&crn=0&bxn=20&fsn=130&cuben=0&pornn=0&manun=24&adstar=0&clw=254#id=b3ef317286eee91628778922a282ab19&prevsn=274&currsn=310&ps=487&pc=60")
            }else {
              _this.$set(buildings[i],"bpicture",_this.host+"images/"+res.data)
            }
          })
        }
        _this.buildings = buildings;
      })
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
    loadBuildings(){
      this.authority = localStorage.getItem('sttype')
      const  _this = this;

      //加载所属人 shops 和 staffs
      axios.get(_this.host+'staff/findAllshops').then(function (resp){
        _this.shops = resp.data;
      })
      axios.get(_this.host+'staff/findAllstaffs').then(function (resp){
        _this.staffs = resp.data;
      })
      //加载buildings
      axios.get(_this.host+'building/findAll/1/'+_this.pagesize).then(function (resp){
        let buildings = resp.data.content;
        _this.total = resp.data.totalElements;

        for (let i = 0; i <buildings.length; i++) {
          axios.get(_this.host+'building/getpictureurl/'+buildings[i].bnumber).then(function (res) {
            if (res.data==""){
              _this.$set(buildings[i],"bpicture","https://image.so.com/view?q=%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=f42aa2747a51fda308bd7b8439c6e634&src=360pic_new&correct=%E5%9B%BE%E7%89%87&ancestor=list&cmsid=c8ac3b0e9e814976cdeaacc96132c7ba&cmras=6&cn=0&gn=0&kn=50&crn=0&bxn=20&fsn=130&cuben=0&pornn=0&manun=24&adstar=0&clw=254#id=b3ef317286eee91628778922a282ab19&prevsn=274&currsn=310&ps=487&pc=60")
            }else {
              _this.$set(buildings[i],"bpicture",_this.host+"images/"+res.data)
            }
          })
        }
        if(!localStorage.getItem('buildingid')){
          _this.buildings = buildings;
        }
        })

    },
    loadOptions(){
      const  _this = this;
      axios.get(_this.host+'building/findAll').then(function (resp){
        let buildingList = resp.data;
        // 加载选项
        for(let i=0;i<buildingList.length;i++){
          if(!_this.areas.includes(buildingList[i].barea)){
            _this.areas.push(buildingList[i].barea);}
          if(!_this.plates.includes(buildingList[i].bplate)){
            _this.plates.push(buildingList[i].bplate);}
          if(!_this.states.includes(buildingList[i].bstate)){
            _this.states.push(buildingList[i].bstate);}
          if(!_this.types.includes(buildingList[i].btype)){
            _this.types.push(buildingList[i].btype);}
        }
      })
    },
    ishave(a,b){
      var flag=false;
      for (let i = 0; i < b.length; i++) {
        if (a==b[i]){
          flag = true;
        }
      }
      return flag
    }
  },
  mounted() {
    this.loadBuildings();
    this.restaurants = this.loadres();
    this.loadOptions();
    if(localStorage.getItem('buildingid')){
      const  _this = this;
      axios.get(_this.host+'building/findpagebyid/'+localStorage.getItem('buildingid')).then(function (resp){
        _this.currentPage=resp.data
        _this.page(resp.data)
        localStorage.removeItem('buildingid')
      })
    }
  }

}
</script>

<style scoped>

span {
  color: #333333;
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