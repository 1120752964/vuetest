<template>
  <el-container>
    <el-header style="background-color: #ffffff;height: 180px">
    <div style="height: 40px;width:130px;border-bottom: 3px solid rgb(246,126,0);">
      <span style="color: rgb(246,126,0);">客源管理</span>
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
      </div>
      <div class="number">
        <span>编号</span>
        <template>
          <el-select size="small" style="  width: 75px;height: 40px;margin-left: 10px;margin-right: 10px"
                     v-model="options.number" placeholder="请选择">
            <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        <span style="margin-right: 10px">联系人</span>
          <el-input size="small" placeholder="手动输入"  v-model="options.queryname" style="width: 100px"></el-input>
        <span style="margin: 10px">电话</span>
          <el-input size="small" placeholder="手动输入" v-model="options.queryphone" style="width: 160px;margin-right: 10px"></el-input>
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
        <el-button @click="querybuilding" size="mini" type="primary">查询</el-button>
        <el-button @click="resetbuilding" size="mini" type="primary">清空</el-button>
      </div>
      <div class="paixu" style="border-bottom: 3px solid rgb(245,245,245);margin-top: -40px;text-align: right;height: 40px">
        <el-link @click="sortByAddDate"  :underline="false">发布日期</el-link><i class="el-icon-bottom"></i>
        <el-link @click="sortByChangeDate" :underline="false">编辑日期</el-link><i class="el-icon-bottom"></i>
      </div>
    </div>
    </el-header>

  <el-container >
    <el-main style="padding: 5px;overflow: hidden">
    <el-table :cell-style="cellStyle" border :data="customers">
      <el-table-column align="center" label="交易"  width="80">
          <template  slot-scope='scope'>
            <span style="color: rgb(50,131,17);">{{scope.row.cdeal}}</span>
          </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="80">
        <template  slot-scope='scope'>
          <span style="color: rgb(0,0,255);">{{scope.row.cstate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="carea" label="区域" width="80"></el-table-column>
      <el-table-column align="center" prop="cplate" label="板块" width="80"></el-table-column>

      <el-table-column header-align="center"  label="顾客信息" width="400">
        <template slot-scope='scope'>
          <div style="float: left;margin: 10px 10px 10px 5px">
          <img @click="editcustomer(scope.row)" :src="host+'images/'+scope.row.cpicture" style="height: 80px;width:80px;border-radius: 50%"/>
          </div>
          <div >
            <div>
              <span style="color: rgb(0,0,255)">{{scope.row.cname}}</span>
            </div>
            <div v-if="scope.row.ccompany" style="margin-top: 10px">
              <span  style="">{{scope.row.ccompany}}</span>
            </div>
            <div v-if="!scope.row.ccompany" style="margin-top: 50px"></div>
            <div style="margin-top: 15px;">
              <span style="margin-right: 15px">编号:{{scope.row.cnumber}}</span>
              <span >已编辑:{{GetNumberOfDays(scope.row)}}</span>
              <i style="font-size: large;float: right" v-if="sttype==='经理'" class="el-icon-delete" @click="deletecustomer(scope.row)"></i>
            </div>
          </div>
          </template>
      </el-table-column>
      <el-table-column align="center" prop="cdate" label="委托日期" width="100"></el-table-column>
      <el-table-column align="center" prop="cposition" label="行业" width="80"></el-table-column>
      <el-table-column align="center" prop="cneedarea" label="面积范围" width="80"></el-table-column>
      <el-table-column align="center" prop="cbudget" label="价格范围" width="80"></el-table-column>
      <el-table-column align="center" prop="cfitment" label="装修" width="80"></el-table-column>
      <el-table-column header-align="center"  prop="cremark" label="备注" ></el-table-column>
<!--      <el-table-column v-if="sttype=='经理'" align="center"  label="转移客源" >-->
<!--        <template slot-scope='scope'>-->
<!--          <div>-->
<!--            <el-button type="primary" @click="setNowCustomer(scope.row)">转移客源</el-button>-->
<!--            <el-dialog title="转移客源" :visible.sync="dialogFormVisible">-->
<!--              <template slot-scope="scope">-->
<!--              <el-input label="输入要转移至的员工编号"  style="width: 450px" v-model="transcstnumber" autocomplete="off"></el-input>-->
<!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="transferCustomer()">确 定</el-button>-->
<!--              </template>-->
<!--            </el-dialog>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
      shops:[],
      staffs:[],
      staffs1:[],
      host:ipconfig.host,
      transcstnumber:"",
      customer:{},
      dialogFormVisible:false,
      sttype:"",
      areas:["不限"],
      plates:["不限"],
      states:["不限"],
      types:["不限"],
      houses:["不限"],
      numbers:["不限"],
      sizes:["不限"],
      prices:["不限"],
      options: {shop:"不限",staff:"不限",area:"不限", plate:"不限", state:"不限", type:"不限",  number:"不限", queryname:"", queryphone:""},
      customers:[],
    }
  },
  methods:{
    cellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex === 10){
        return  'vertical-align:top'
      }
    },
    setNowCustomer(customer){
      this.dialogFormVisible=true;
      this.customer = customer;
    },
    transferCustomer(scope){
      const  _this = this;
      let customer = _this.customer;
      if(_this.transcstnumber===""){
        alert("编号不能为空！")
        return
      }
      axios.get(_this.host+'customer/transferCustomer/'+customer.cid+'/'+_this.transcstnumber).then(function (resp){
        if(resp.data.cid==-1){
          alert("没有该员工编号，请重新输入正确编号！")
          _this.transcstnumber = "";
        }else {
          if(resp.data.cstnumber!=customer.cstnumber){
            alert("转移成功！")
            _this.loadCustomers();
          }else {
            alert("该客源已在该员工名下，请勿重复转移！")
          }
          _this.dialogFormVisible=false;
          _this.transcstnumber = "";
        }
      })

    },
    sortByAddDate(){
      //因为js写的总是split函数出问题，挪到后端去写
      const  _this = this;
      axios.get(_this.host+'customer/sortByCdate').then(function (resp){
        _this.customers = resp.data;
      })
    },
    sortByChangeDate(){
      const  _this = this;
      axios.get(_this.host+'customer/sortByCchangeDate').then(function (resp){
        _this.customers = resp.data;
      })
    },

    querybuilding(){
      const  _this = this;
      axios.post(_this.host+'customer/querycustomer',_this.options).then(function (resp){
        _this.customers = resp.data;
        let customerList = _this.customers ;
        let temp=[];
        if(localStorage.getItem("sttype")=="普通员工"){
          for (let i = 0; i < customerList.length; i++) {
            if(customerList[i].cstnumber==localStorage.getItem("stnumber")){
              temp.push(customerList[i]);
            }
          }
          _this.customers = temp;
        }
      })
    },
    resetbuilding(){
      this.options= {shop:"不限",staff:"不限",area:"不限", plate:"不限", state:"不限", type:"不限",  number:"不限", queryname:"", queryphone:""}
    },
    GetNumberOfDays(row) {//获得天数
      let changedate = row.cchangedate;
      let adddate = row.cdate;
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
    deletecustomer(row){
      const  _this = this;
      axios.get(_this.host+'customer/deletecustomer/'+row.cid).then(function (resp){
        _this.$alert('客源:'+row.cnumber+'删除成功!', '', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload();
          }
        });
      })
    },
    editcustomer(row){
      this.$router.push({
        path:'/editcustomer',
        query:{
          "cid":row.cid
        }
      });
    },
    loadCustomers(){
      const  _this = this;
      //加载buildings
      axios.get(_this.host+'customer/findAll').then(function (resp){
        _this.customers = resp.data;
        let customerList = _this.customers;
        let temp=[];
        if(localStorage.getItem("sttype")=="普通员工") {
          for (let i = 0; i < customerList.length; i++) {
            if (customerList[i].cstnumber == localStorage.getItem("stnumber")) {
              temp.push(customerList[i]);
            }
          }
          _this.customers = temp;
          customerList = temp;
        }
        // 加载选项
        for(let i=0;i<customerList.length;i++){
          if(!_this.areas.includes(customerList[i].carea)){
            _this.areas.push(customerList[i].carea);}
          if(!_this.plates.includes(customerList[i].cplate)){
            _this.plates.push(customerList[i].cplate);}
          if(!_this.states.includes(customerList[i].cstate)){
            _this.states.push(customerList[i].cstate);}
          if(!_this.types.includes(customerList[i].chousetype)){
            _this.types.push(customerList[i].chousetype);}
          if(!_this.houses.includes(customerList[i].ctargethouse)){
            _this.houses.push(customerList[i].ctargethouse);}
          if(!_this.numbers.includes(customerList[i].cnumber)){
            _this.numbers.push(customerList[i].cnumber);}
          if(!_this.sizes.includes(customerList[i].cneedarea)){
            _this.sizes.push(customerList[i].cneedarea);}
          if(!_this.prices.includes(customerList[i].cbudget)){
            _this.prices.push(customerList[i].cbudget);}
        }
        // let s = _this.sizes;
        // for (let i = 0; i < _this.sizes.length; i++) {
        //   if(_this.sizes[i]){
        //     let temp = _this.sizes[i].split('-');
        //     if (temp[0])
        //       s.push(temp[0])
        //     if (temp[1])
        //       s.push(temp[1])
        //   }
        // }
        let x = _this.prices;
        let tempprices=[];
        for (let i = 0; i < x.length; i++) {
          if(_this.prices[i]){
                let temp = _this.prices[i].split('-');
                if (temp[0]){
                  if(!tempprices.includes(temp[0])){
                    tempprices.push(temp[0])
                  }
                }
              if (temp[1]){
              if(!tempprices.includes(temp[1])){
                tempprices.push(temp[1])
              }
            }
          }
        }
        let tempsizes=[];
        x=_this.sizes;
        for (let i = 0; i < x.length; i++) {
          if(_this.sizes[i]){
            let temp = _this.sizes[i].split('-');
            if (temp[0]){
              if(!tempsizes.includes(temp[0])){
                tempsizes.push(temp[0])
              }
            }
            if (temp[1]){
              if(!tempsizes.includes(temp[1])){
                tempsizes.push(temp[1])
              }
            }
          }
        }
        _this.sizes = tempsizes;
        _this.prices = tempprices;
      })
      //加载所属人 shops 和 staffs
      axios.get(_this.host+'staff/findAllshops').then(function (resp){
        _this.shops = resp.data;
      })
      axios.get(_this.host+'staff/findAllstaffs').then(function (resp){
        _this.staffs = resp.data;
      })
    },
    setstaffs1(){
      this.staffs1=["不限"];
      for (let i = 0; i < this.staffs.length; i++) {
        if(this.staffs[i].stshop===this.options.shop){
          this.staffs1.push(this.staffs[i].stname);
        }
      }
    },
    loadOptions(){
      const  _this = this;
      axios.get(_this.host+'customer/findAll').then(function (resp){
        _this.buildings = resp.data;
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
    this.loadCustomers();
    this.sttype = localStorage.getItem("sttype");
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