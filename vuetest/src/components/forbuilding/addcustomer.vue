<template>
  <div id="app">
    <el-header style="background-color: #ffffff;">
      <div style="height: 40px;width:300px;border-bottom: 3px solid rgb(246,126,0);">
        <span style="color: rgb(246,126,0);">客源信息</span>
        </div>
    </el-header>
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-main>
        <div class="left" style="float: left;height: 100%;width: 50%">
          <div style="margin: 10px">
            <span>联系人信息</span>
          </div>
          <div class="zuoshang" style="float: left">
            <el-form ref="customer" :rules="rules" :model="customer" label-width="70px">
              <el-form-item label="联系人" prop="cname" style="display: inline-block">
                <el-input v-model="customer.cname" style="width: 120px" ></el-input>
              </el-form-item>
              <el-form-item label="头像" style="float: right;margin-right: 50px">
                <el-upload
                    class="avatar-uploader"
                    ref="upimg"
                    accept="image/png,image/jpeg,image/gif,image/jpg"
                    action="#"
                    :show-file-list="false"
                    :on-change="handlechange"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                   >
                  <img v-if="customer.cpicture" :src="customer.cpicture" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="性别" style="display: inline-block">
                <el-select v-model="customer.cgender" placeholder="" style="width: 80px">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="微信号" style="display: inline-block">
                <el-input v-model="customer.cwechat" style="width: 120px" ></el-input>
              </el-form-item>
              <el-form-item label="职位" style="display: inline-block" >
              <el-select v-model="customer.cposition" placeholder="" style="width: 100px">
                  <el-option label="老板" value="老板"></el-option>
                  <el-option label="合伙人" value="合伙人"></el-option>
                  <el-option label="总经理" value="总经理"></el-option>
                  <el-option label="助理" value="助理"></el-option>
                  <el-option label="行政主管" value="行政主管"></el-option>
                  <el-option label="部门主管" value="部门主管"></el-option>
                  <el-option label="其他职位" value="其他职位"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业名称" >
                <el-input v-model="customer.ccompany" style="width: 200px" ></el-input>
              </el-form-item>
              <el-form-item label="电话1" prop="ctelphone1" style="margin-top: -50px">
                <el-input v-model="customer.ctelphone1" style="width: 200px" ></el-input>
              </el-form-item>
              <el-form-item label="电话2" >
                <el-input v-model="customer.ctelphone2" style="width: 200px" ></el-input>
              </el-form-item>
            </el-form>
            <div class="right-xiamian">
              <div style="border-bottom: 3px gainsboro solid">
                <span style="margin-left: 20px;font-weight: bold">最新动态</span>
                <div style="float: right;margin-right: 10px;margin-top: -10px">
                  <i class="el-icon-plus" style="color: rgb(246,126,0)"></i>
                  <el-button type="text" @click="dialogFormVisible = true" style="color: #333333">写动态</el-button>
                  <el-dialog style="margin-top:10px" title="写动态" :visible.sync="dialogFormVisible">
                    <el-form>
                      <el-form-item label="请输入动态内容">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="dynamic.dnote">
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="adddynamic">确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
                <div style="height: 380px;overflow-y: auto;width: 100%">
                  <el-timeline>
                    <el-timeline-item v-for="(item,index) in dynamicList" :timestamp="item.dcreatedate" placement="top">
                      <el-card >
                        <div style="float: left">
                          <el-avatar style="" size="small" :src="staffsfordynamic[index].stimg"></el-avatar>
                        </div>
                        <div style="float: left;margin-right: 285px">
                          <span style="font-size: larger;font-weight: bolder;">{{staffsfordynamic[index].stshop}}   {{staffsfordynamic[index].stname}}  {{staffsfordynamic[index].stnumber}}</span><span> 提交于 {{item.dcreatedate}}  </span>
                          <el-button v-if="dynamicdelflag" type="danger" size="mini" @click="deletedynamic(item)" icon="el-icon-delete" circle></el-button>
                        </div>
                        <div style="float: left">
                          <p>{{item.dnote}}</p>
                        </div>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="right" style="float: right;width: 49%;height: 100%">
          <div class="">
            <div style="margin: 10px">
            <span>需求信息</span>
            </div>
            <el-form ref="customer2" :rules="rules2" :model="customer" label-width="100px">
              <el-form-item label="交易" prop="cdeal">
                <el-select v-model="customer.cdeal" placeholder="请选择" style="width: 100px;display: inline-block" >
                  <el-option label="求租" value="求租"></el-option>
                  <el-option label="求购" value="求购"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="cstate" style="display: inline-block;">
                <el-select v-model="customer.cstate" placeholder="请选择" style="width: 100px">
                  <el-option label="有效" value="有效"></el-option>
                  <el-option label="无效" value="无效"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="carea"  label="区域" style="display: inline-block">
                <el-select  v-model="customer.carea" @change="getplate(customer.carea)" placeholder="请选择" style="width: 100px">
                  <el-option v-for="item in area" :label="item" :key="item" :value="item"></el-option>
                </el-select></el-form-item>
              <el-form-item  prop="cplate"  label="板块" style="display: inline-block;margin-left: -30px">
                <el-select  v-model="customer.cplate"  placeholder="请选择" style="width: 100px;">
                  <el-option v-for="item in plate" :label="item" :key="item" :value="item"></el-option>
                </el-select></el-form-item>
              <el-form-item label="楼盘类型" prop="chousetype">
                <el-select v-model="customer.chousetype" placeholder="请选择" style="width: 100px">
                  <el-option label="写字楼" value="写字楼"></el-option>
                  <el-option label="创意园" value="创意园"></el-option>
                  <el-option label="联合办公" value="联合办公"></el-option>
                  <el-option label="商务公寓" value="商务公寓"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="目标楼盘"  >
                <el-input v-model="customer.ctargethouse" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="需求面积" prop="csize1" style="display: inline-block;">
                <el-input v-model="customer.csize1" @input="onInput()" style="width: 80px"></el-input>
              </el-form-item>
              <el-form-item style="display: inline-block;margin-left: -95px;margin-right: 350px" >
                <span style="margin:0 5px">—</span>
                <el-input v-model="customer.csize2" @input="onInput()" style="width: 80px"></el-input>
                <span>㎡</span>
              </el-form-item>
              <el-form-item label="预算价格" prop="cbudget1" style="display: inline-block;">
                <el-input v-model="customer.cbudget1" @input="onInput()" style="width: 80px"></el-input>
              </el-form-item>
              <el-form-item   style="display: inline-block;margin-left: -95px">
                <span style="margin:0 5px">—</span>
                <el-input v-model="customer.cbudget2" @input="onInput()" style="width: 80px"></el-input>
                <span>元/㎡/天</span>
              </el-form-item>
              <el-form-item label="实地注册">
                <el-select v-model="customer.cisregister" placeholder="请选择" style="width: 100px">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="装修要求">
                <el-select v-model="customer.cfitment" placeholder="请选择" style="width: 100px">
                  <el-option label="毛坯" value="毛坯"></el-option>
                  <el-option label="简装" value="简装"></el-option>
                  <el-option label="精装修" value="精装修"></el-option>
                  <el-option label="豪华装修" value="豪华装修"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配套要求">
                <el-checkbox-group v-model="facility">
                  <el-checkbox label="中央空调" name="中央空调"></el-checkbox>
                  <el-checkbox label="宽带" name="宽带"></el-checkbox>
                  <el-checkbox label="电" name="电"></el-checkbox>
                  <el-checkbox label="水" name="水"></el-checkbox>
                  <el-checkbox label="电梯" name="电梯"></el-checkbox>
                  <el-checkbox label="办公家具" name="办公家具"></el-checkbox>
                  <el-checkbox label="近地铁站" name="近地铁站"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="5" v-model="customer.cremark" style="width: 400px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          </div>
      </el-main>
      <el-footer>
        <div style="float: right;margin-right: 30px">
          <span style="margin-right: 10px;">委托日期</span>
          <el-input style="width: 105px" v-model="customer.cdate"></el-input>
          <span style="margin: 0 15px">所属人</span>
          <el-select v-model="customer.cuserstore" @change="setstaffs1" placeholder="请选择" style="width: 100px">
            <el-option v-for="shop in shops"  :label="shop" :key="shop" :value="shop"></el-option>
          </el-select>
          <el-select v-model="customer.cuser" placeholder="请选择" style="width: 100px">
            <el-option v-for="staff in staffs1"  :label="staff" :key="staff" :value="staff"></el-option>
          </el-select>
          <el-button type="primary" @click="onSubmit('customer')" style="background-color: rgb(246,126,0);border: none;margin-left: 10px">保存客源</el-button>

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
</style>
<script>
import ipconfig from "@/components/forbuilding/ipconfig";

export default {
  data() {
    return {
      dynamicdelflag:false,
      staffsfordynamic:[],
      host:ipconfig.host,
      staff:{},
      dialogTableVisible: false,
      dialogFormVisible: false,
      dynamic:{"dnote":"","dcreatedate":"","dchangedate":"","cnumber":"","stnumber":"","bnumber":"",},
      dynamicList:[],
      file:[],
      fileList:[],
      staffs1:[],
      shops:[],
      staffs:[],
      facility:[],
      customer:{"ccompany":"","cstnumber":"", "cchangedate":"",csize1:"","cfacility":"","csize":"","csize2":"","cbudget1":"","cbudget2":"","cnumber":"", "cname":"", "cgender":"", "cwechat":"","cposition":"", "ctelphone1":"", "ctelphone2":"", "cpicture":"", "cdeal":"", "cstate":"有效", "carea":"", "cplate":"", "chousetype":"","ctargethouse":"", "cneedarea":"", "cisregister":"", "cfitment":"", "cbudget":"","cuserstore":"",  "cremark":"", "cdate":"", "cuser":"",},
      date:"",
      flag:true,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      plate:[],
      area:['浦东', '闵行', '松江', '宝山', '嘉定', '徐汇', '青浦', '静安', '普陀', '杨浦', '奉贤', '黄浦', '虹口', '长宁', '金山', '崇明', '上海周边'],
      plates:[['八佰伴', '北蔡', '碧云', '曹路', '川沙', '大团', '东昌路站', '高桥', '高行', '航头', '合庆', '花木', '惠南', '江镇', '金桥', '金杨新村', '康桥', '老港', '联洋', '临港新城', '龙阳路站', '芦潮港', '陆家嘴', '梅园', '南汇周边', '南码头', '泥城', '浦东周边', '三林', '三灶', '上钢新村', '上南', '世博', '世博滨江', '世纪公园', '书院', '塘桥', '唐镇', '外高桥', '王港', '万祥', '潍坊新村', '新场', '宣桥', '杨东', '洋泾', '杨思', '源深', '御桥', '张江', '周浦', '祝桥', '竹园']
        ,
        ['北桥', '漕宝路', '春申', '古美罗阳', '航华', '虹桥', '华漕', '江川路', '静安新城', '金虹桥', '老闵行', '龙柏金汇', '马桥', '梅陇', '闵行周边', '浦江', '七宝', '七莘路', '吴泾', '莘庄', '莘庄工业区', '颛桥', '诸翟']
        ,
        ['车墩', '大港', '洞泾', '九亭', '泖港', '茸北', '佘山', '泗泾', '松江大学城', '松江工业区', '松江老城', '松江新城', '松江周边', '小昆山', '新浜', '莘闵', '新桥', '叶榭', '永丰', '岳阳', '中山']
        ,
        ['大场', '大华', '高境', '共富新村', '共康', '顾村', '刘行', '罗店', '罗泾', '罗南', '上海大学', '水产路站', '泗塘', '淞宝', '淞南', '通河新村', '杨行', '友谊路', '月浦', '张庙']
        ,
        ['安亭', '曹王', '方泰', '封浜', '丰庄', '黄渡', '华亭', '嘉定城区', '嘉定新城', '嘉定周边', '江桥新城', '金鹤新城', '菊园新区', '娄塘', '马陆', '南翔', '唐行', '外冈', '徐行', '真新', '朱桥']
        ,
        ['漕宝路站', '漕河泾', '长桥', '复兴中路', '衡山路', '华东理工', '淮海西路', '华泾', '湖南路', '建国西路', '康健', '龙华', '上海南站', '上海师大', '上海植物园', '田林', '万体馆', '襄阳公园', '斜土路', '徐汇滨江', '徐汇周边', '徐家汇', '肇嘉浜路站']
        ,
        ['白鹤', '凤溪', '华新', '金泽', '练塘', '青浦工业园区', '青浦新城', '青浦周边', '香花桥', '夏阳', '徐泾', '徐泾北城', '赵巷', '重固', '朱家角']
        ,
        ['宝山路', '北京西路', '曹家渡', '场中路', '大宁', '江宁路', '静安寺', '老北站', '南京西路', '彭浦', '市北工业园', '天目西路', '西康路', '新客站', '新闸路', '西藏北路', '延长路', '阳城永和', '玉佛寺', '闸北公园', '芷江西路', '中环共和新路']
        ,
        ['曹杨', '长风', '长寿路', '长征', '甘泉宜川', '光新', '华东师大', '环球港', '李子园', '普陀周边', '轻纺市场', '桃浦', '万里城', '武宁', '真光', '真如', '中远两湾城']
        ,
        ['鞍山', '长白新村', '长阳路', '东外滩', '黄兴', '江浦路', '控江路', '平凉路', '五角场', '五角场北', '新华医院', '新江湾城', '杨浦大桥', '杨浦公园', '杨浦周边', '运光/复旦', '中原', '周家嘴路']
        ,
        ['金汇', '南桥', '庄行', '奉城', '柘林', '海湾', '青村', '西渡', '奉贤周边']
        ,
        ['打浦桥', '董家渡', '复兴公园', '淮海中路', '黄浦世博滨江', '黄浦周边', '老西门', '鲁班路', '南京东路', '南浦大桥', '蓬莱公园', '人民广场', '外滩/十六铺', '五里桥', '斜桥', '新天地', '西藏南路', '豫园']
        ,
        ['北外滩', '大柏树', '和平公园', '虹口周家嘴路', '虹口足球场', '江湾', '凉城', '临平路', '鲁迅公园', '曲阳', '四川北路', '四平路', '提篮桥']
        ,
        ['北新泾', '长宁周边', '动物园', '古北', '虹桥路', '江苏路站', '天山', '仙霞', '西郊公园', '新华路', '镇宁路', '中山公园', '周家桥']
        ,
        ['漕泾', '枫泾', '金山工业区', '金山卫', '金山新城', '金山周边', '廊下', '吕巷', '山阳', '石化', '亭林', '兴塔', '张堰', '朱泾', '朱行']
        ,
        ['城桥', '堡镇', '陈家', '长兴岛']
        ,
        ['昆山', '其他', '嘉兴', '苏州', '慈溪', '湖州', '南通']
        ,],
      rules: {
        cname: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        ctelphone1: [
          {  required: true, message: '请输入电话1', trigger: 'blur' }
        ],
      },
      rules2:{
        cdeal: [
          {  required: true, message: '请选择交易类型', trigger: 'change' }
        ],
        ctargethouse: [
          {  required: true, message: '请输入目标楼盘', trigger: 'blur' }
        ],
        csize1: [
          {  required: true, message: '请输入需求面积', trigger: 'blur' }
        ],
        cbudget1: [
          {  required: true, message: '请输入预算价格', trigger: 'blur' }
        ],
        bprice: [
          {  required: true, message: '请输入租金单价', trigger: 'blur' }
        ],
        cstate: [
          {  required: true, message: '请选择状态', trigger: 'change' }
        ],
        carea: [
          { required: true, message: '请选择区域', trigger: 'change' },
        ],
        cplate: [
          { required: true, message: '请选择板块', trigger: 'change' },
        ],
        chousetype: [
          { required: true, message: '请选择楼盘类型', trigger: 'change' },
        ],

      }
    }
  },
  methods:{
    onInput(){
      this.$forceUpdate();
    },
    deletedynamic(dynamic){
      // console.log(dynamic.dynamicid)
      const  _this = this;
      axios.post(_this.host+'customer/deletedynamic',dynamic).then(function (resp){
        _this.loaddynamics();
      })
    },
    adddynamic(){
      const  _this = this;
      this.dialogFormVisible = false;
      //房源添加时间和修改时间 badddate,bchangedate
      let month;
      let myDate = new Date();
      if(myDate.getMonth()+1<10){
        month = '0'+(myDate.getMonth()+1);
      }else {
        month = myDate.getMonth()+1;
      }
      if(_this.dynamic.dcreatedate){
        _this.dynamic.dcreatedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
        _this.dynamic.dchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
      }else {
        _this.dynamic.dcreatedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
        _this.dynamic.dchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
      }
      _this.dynamic.stnumber = localStorage.getItem("stnumber");
      if(_this.$route.query.cid==null){
        alert("请先保存客源后再添加动态");
      }else {
        _this.dynamic.cnumber = _this.$route.query.cid;
        axios.post(_this.host+'customer/adddynamic',_this.dynamic).then(function (resp){
          _this.loaddynamics();
          _this.dynamic.dnote="";
        })
      }

    },
    setstaffs1(){
      this.staffs1=[];
      for (let i = 0; i < this.staffs.length; i++) {
        if(this.staffs[i].stshop==this.customer.cuserstore){
          this.staffs1.push(this.staffs[i].stname);
        }
      }
    },
    getplate(a){
      this.plate = this.plates[this.area.indexOf(a)]
    },
    handlechange(file,filelist){
      this.customer.cpicture = URL.createObjectURL(file.raw);
      this.fileList = filelist;
      let a = filelist[0];
      this.file=file;
      console.log(this.file)
      console.log(URL.createObjectURL(a.raw))
    },
    onSubmit(formName){
      const  _this = this;
      this.$refs[formName].validate((valid1) => {
        if(!valid1){
          alert("请填写完整联系人信息")
        }else {
        this.$refs["customer2"].validate((valid2) => {
          if(!valid2){
            alert("请填写完整需求信息")
          }else {
          const  _this = this;
          //将配套设施和房源标签从数组转成字符串形式，存到后端
          let as = _this.facility;
          let facility2 = ""
          for(let i=0;i<as.length;i++){
            facility2=facility2+as[i]+' ';
          }
          //客源添加时间和修改时间 cdate,cchangedate
          let month;
          let myDate = new Date();
          if(myDate.getMonth()+1<10){
            month = '0'+(myDate.getMonth()+1);
          }else {
            month = myDate.getMonth()+1;
          }
          if(_this.customer.cchangedate){
            _this.customer.cchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
          }else {
            _this.customer.cdate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
            _this.customer.cchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
          }
          this.customer.cfacility = facility2;
          this.customer.cneedarea=this.customer.csize1+'-'+this.customer.csize2;
          this.customer.cbudget=this.customer.cbudget1+'-'+this.customer.cbudget2;
          if(!_this.customer.cstnumber){
            _this.customer.cstnumber = localStorage.getItem("stnumber");
          }
            let fd = new FormData();
          fd.append("customer",JSON.stringify(_this.customer));
          fd.append("cpicture",_this.file.raw);
          axios.post(_this.host+'customer/save',fd).then(function (resp){
            if (_this.$route.query.cid!=null){
              _this.$router.push("/managecustomer")
            }else {
              alert("新增客源成功")
              _this.$router.push("/managecustomer")
            }
            _this.customer.cfacility=[]
          })
          }
        });
        }

      });
    },
    loadall(){
      var datetime = new Date();
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var date1 = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      this.customer.cdate = year+'-'+month+'-'+date1;
      const  _this = this;
      axios.get(_this.host+'staff/findAllshops').then(function (resp){
        _this.shops = resp.data;
      })
      axios.get(_this.host+'staff/findAllstaffs').then(function (resp){
        _this.staffs = resp.data;
      })
      _this.loaddynamics();

      axios.get(_this.host+'staff/findByStnumber/'+localStorage.getItem("stnumber")).then(function (resp){
        _this.staff = resp.data;
        _this.staff.stimg = _this.host+"images/"+_this.staff.stimg;
        if(!_this.$route.query.cid) {
          _this.customer.cuserstore = _this.staff.stshop;
          _this.customer.cuser = _this.staff.stname;
        }
      })
    },
    loaddynamics(){
      const  _this = this;
      if(_this.$route.query.cid){
        axios.get(_this.host+'customer/findAlldynamics/'+localStorage.getItem("stnumber")+'/'+_this.$route.query.cid).then(function (resp){
          _this.dynamicList = resp.data;
          console.log(_this.dynamicList)
          if(_this.dynamicList.length>0){
            if(localStorage.getItem("sttype")=='经理'){
              _this.dynamicdelflag=true;
            }
          }
          _this.staffsfordynamic=[]
          axios.post(_this.host+'dynamic/getdynamicstaff',_this.dynamicList).then(function (resp){
              let a = resp.data;
            for (let i = 0; i < a.length; i++) {
              a[i].stimg = _this.host+"images/"+a[i].stimg;
            }
              _this.staffsfordynamic=a;
          })
        })
      }
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
    loadcustomer(cid){
      const  _this = this;
      axios.get(_this.host+'customer/findCustomerByCid/'+cid).then(function (resp){
        _this.customer = resp.data;
        _this.customer.cpicture = _this.host+"images/"+_this.customer.cpicture;
        _this.facility = _this.customer.cfacility.split(' ')
        let temp = _this.customer.cneedarea.split('-');
        if(temp){
          if(temp[0])
            _this.customer.csize1=temp[0]
          if(temp[1])
            _this.customer.csize2=temp[1]
        }
        temp = _this.customer.cbudget.split('-');
        if(temp){
          if(temp[0])
            _this.customer.cbudget1=temp[0]
          if(temp[1])
            _this.customer.cbudget2=temp[1]
        }
      })
    }
  },
  mounted() {
    if (this.$route.query.cid!=null){
      this.loadcustomer(this.$route.query.cid);
    }
    this.loadall();
  }

}
</script>