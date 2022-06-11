<template>
  <div id="app">
    <el-header style="background-color: #ffffff;">
      <div style="float:left;height: 40px;width:130px;border-bottom: 3px solid rgb(246,126,0);">
        <span style="color: rgb(246,126,0);">房源信息</span>
      </div>
      <div v-if="this.$route.query.buildingid" class="fangyuanbianhao" style="text-align: right">
        <div >
          <span>房源编号</span>
          <el-input :disabled="true" style="width: 100px;" v-model="editbuildingnumber" size="mini"></el-input>
        </div>
      </div>
    </el-header>

    <el-container style="height: 100%; border: 1px solid #eee">
      <el-main>
        <div class="left" style="float: left;height: 100%;width: 50%">
          <el-form ref="building"  :rules="rules"  :model="building" label-width="100px">
            <el-form-item label="楼盘名称" prop="bhname">
              <el-autocomplete
                  class="inline-input"
                  v-model="building.bhname"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="handleSelect"
              ></el-autocomplete>
              <el-switch
                  style="float: right;margin: 10px"
                  v-model="building.bisshow"
                  inactive-text="小程序显示"

                  active-color="#13ce66"
                  @change="changebisshow(building.bisshow)"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item  label="区域" style="display: inline-block"><el-select :disabled="true" v-model="building.barea" @change="getplate(house.harea)" placeholder="请选择" style="width: 100px"></el-select></el-form-item>
            <el-form-item    label="板块" style="display: inline-block;margin-left: -30px"><el-select :disabled="true" v-model="building.bplate"  placeholder="请选择" style="width: 100px;"></el-select></el-form-item>
            <el-form-item   label="地址" style="display: inline-block"><el-input :disabled="true" style="width: 180px;" v-model="building.baddress"></el-input></el-form-item>
            <el-form-item  label="楼盘类型"><el-select :disabled="true" v-model="building.btype" placeholder="请选择楼盘区域"></el-select></el-form-item>
            <el-form-item label="楼栋/楼号" prop="bloudong" style="display: inline-block">
              <el-select v-model="building.bloudong" placeholder="请选择" style="width: 100px">
                <el-option v-for="(item, index) in louhao" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <span style="margin-right: 15px">号/栋</span>
            </el-form-item>
            <el-form-item prop="bshihao" style="display: inline-block;margin-left: -100px">
            <el-input v-model="building.bshihao" style="width: 80px" ></el-input>
              <span>室</span>
            </el-form-item>
            <el-form-item label="状态" prop="bstate">
              <el-select  v-model="building.bstate" placeholder="请选择" style="width: 100px">
                <el-option label="有效" value="有效"></el-option>
                <el-option label="暂缓" value="暂缓"></el-option>
                <el-option label="无效" value="无效"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="租售方式" prop="brenttype">
              <el-radio-group v-model="building.brenttype">
                <el-radio label="出租"></el-radio>
                <el-radio label="出售"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item  label="可否注册"><el-select :disabled="true" v-model="building.bregister" placeholder="请选择" style="width: 100px"></el-select></el-form-item>
            <el-form-item label="建筑面积" prop="bsize">
              <el-input v-model="building.bsize" @change="computetotal" style="width: 80px" ></el-input>
              <span style="margin-left: 15px">㎡</span>
              <span style="margin-left: 40px">得房率</span>
              <el-input :disabled="true" v-model="building.brate" style="width: 80px" ></el-input>
              <span style="margin-left: 15px">%</span>
            </el-form-item>
            <el-form-item label="装修情况" prop="bfitment">
              <el-radio-group v-model="building.bfitment">
                <el-radio label="毛坯" name="毛坯"></el-radio>
                <el-radio label="简装" name="简装"></el-radio>
                <el-radio label="精装修" name="精装修"></el-radio>
                <el-radio label="豪华装修" name="豪华装修"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="租金单价" prop="bprice">
              <el-input v-model="building.bprice" @change="computetotal" style="width: 80px;" ></el-input>
              <span style="margin-left: 15px">元/㎡/天</span>
              <span style="margin-left: 50px;margin-right: 15px">总价</span>

              <el-input  :disabled="true" v-model="building.btotal" style="width: 120px" ></el-input>
              <span style="margin-left: 15px;">元/月</span>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select :disabled="true" v-model="building.bpaytype" placeholder="请选择" style="width: 100px">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <span style="margin-left: 20px;margin-right: 15px">物业费</span>
              <el-input  :disabled="true" v-model="building.bmanagementfee" style="width: 80px" ></el-input>
              <span>㎡/元/月</span>
            </el-form-item>
            <el-form-item label="起租期">
              <el-input  :disabled="true" v-model="building.bstartmonths" style="width: 80px" ></el-input>
              <span>个月</span>
              <span style="margin: 0 15px">免租期</span>
              <el-input  :disabled="true" v-model="building.bnomonths" style="width: 80px" ></el-input>
              <span>个月</span>
              <span style="margin-left: 70px;margin-right: 15px">钥匙号</span>
              <el-input   v-model="building.bkeynumber" style="width: 80px;" ></el-input>
            </el-form-item>
            <el-form-item label="配套设施" prop="bfacility">
              <el-checkbox-group v-model="building.bfacility">
                <el-checkbox  label="中央空调" name="中央空调"></el-checkbox>
                <el-checkbox label="宽带" name="宽带"></el-checkbox>
                <el-checkbox label="电" name="电"></el-checkbox>
                <el-checkbox label="水" name="水"></el-checkbox>
                <el-checkbox label="电梯" name="电梯"></el-checkbox>
                <el-checkbox label="办公家具" name="办公家具"></el-checkbox>
                <el-checkbox label="免费车位" name="免费车位"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="房源标签" prop="btags">
              <el-checkbox-group v-model="building.btags">
                <el-checkbox label="价格可面议" name="价格可面议"></el-checkbox>
                <el-checkbox label="租金含发票" name="租金含发票"></el-checkbox>
                <el-checkbox label="随时入驻" name="随时入驻"></el-checkbox>
                <el-checkbox label="随时可看" name="随时可看"></el-checkbox>
                <el-checkbox label="租金含物业费" name="租金含物业费"></el-checkbox>
                <el-checkbox label="可分割" name="可分割"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="付佣方">
              <el-radio-group :disabled="true" v-model="building.bwhopay">
                <el-radio label="业主承担"></el-radio>
                <el-radio label="租户承担"></el-radio>
                <el-radio label="业主和租户共同承担"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="佣金标准">
              <el-input :disabled="true" v-model="building.bpaynorm"  style="width: 80px" ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :rows="5" v-model="building.bremark" style="width: 90%"></el-input>
            </el-form-item>
            <el-form-item label="出租方" >
              <el-select v-model="building.bmaster1" placeholder="请选择" style="width: 100px">
                <el-option label="大业主" value="shanghai"></el-option>
                <el-option label="小业主" value="beijing"></el-option>
                <el-option label="二房东" value="beijing"></el-option>
                <el-option label="商管公司" value="beijing"></el-option>
                <el-option label="转租客" value="beijing"></el-option>
              </el-select>
              <span style="margin: 0 15px">联系人</span>
              <el-input v-model="building.blinkman1" style="width: 80px" ></el-input>
              <span style="margin: 0 15px">电话</span>
              <el-input :type="tel1inputtype" :disabled="!showtel1lock" v-model="building.btelphone1" style="width: 120px" ></el-input>
              <div v-if="showtel1lock"  style="float: right;margin-right: 200px">
                <el-image class="tel" @click="changetel1" :src="tel1lock" style="width: 40px;height: 40px;"></el-image>
              </div>
            </el-form-item>

            <el-form-item label="出租方">
              <el-select v-model="building.bmaster2" placeholder="请选择" style="width: 100px">
                <el-option label="大业主" value="shanghai"></el-option>
                <el-option label="小业主" value="beijing"></el-option>
                <el-option label="二房东" value="beijing"></el-option>
                <el-option label="商管公司" value="beijing"></el-option>
                <el-option label="转租客" value="beijing"></el-option>
              </el-select>
              <span style="margin: 0 15px">联系人</span>
              <el-input v-model="building.blinkman2" style="width: 80px" ></el-input>
              <span style="margin: 0 15px">电话</span>
              <el-input :type="tel2inputtype" :disabled="!showtel2lock" v-model="building.btelphone2" style="width: 120px" ></el-input>
              <div v-if="showtel2lock" style="float: right;margin-right: 200px">
                <el-image class="tel" @click="changetel2" :src="tel2lock" style="width: 40px;height: 40px;"></el-image>
              </div>
            </el-form-item>
            <el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"  style="float: right;width: 49%;height: 100%">

          <div class="showimg" >
            <!--轮播图-->
            <div class="imgs" style="height: 300px;width: 90%;padding-left: 5%">
              <template>
                <div>
                     <el-image class="swipertop" style="height: 400px;width: 100%"  fit="fit" :src="topimg" v-if="topimg!==''" ></el-image>
                     <video class="swipertop" style="height: 400px;width: 100%" controls="controls" width="500px" height="300px" :src="topvideo" v-if="topvideo!==''"></video>
<!--                  <div id="deleteimg" @click="removeShowingImg()">-->
<!--                  <el-image  :src="deleteimg" style="height: 40px;width: 40px"></el-image>-->
<!--                  </div>-->
                </div>
                <div class="swiperbottom" >
                  <swiper class="mySwiper2" ref="mySwiper2" :options="swiperOptions2">
                    <swiper-slide class="swiper-slide" v-for="item in showList" :key="item.imgid">
                      <el-image style="height: 100px;width: 100%;opacity: 1" v-if="item.isvedio==='false'" fit="fit" :src="item.imgforbuilding" ></el-image>
                      <video style="height: 100px;width: 100%"   width="500px" height="300px" :src="item.imgforbuilding" v-if="item.isvedio==='true'"></video>
                    </swiper-slide>
                  </swiper>
                </div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
              </template>
            </div>
            <div class="texts" style="margin-top: 230px;">
              <div style="float: right;margin-left: 15px">
                <el-upload
                    class="upload-demo"
                    action="#"
                    multiple
                    :on-change="handleChange"
                    :auto-upload="false"
                    :show-file-list="false"
                    :file-list="fileList">
                  <el-button size="small" type="primary" style="background-color: rgb(246,126,0);border: none;">上传图片</el-button>
                  <div slot="tip" class="el-upload__tip"></div>
                </el-upload>
              </div>
              <div style="float: right">
                <el-button size="small" @click="removeShowingImg()" type="primary" style="background-color: rgb(246,126,0);border: none;">删除当前图片</el-button>
              </div>
            </div>
<!--            <div v-if="this.$route.query.buildingid" style="float: right;margin-top: 300px">-->
<!--              <span>您已上传文件：</span>-->
<!--              <div :key="i.imgid" v-for="i in showList">-->
<!--                <span>{{ i.imgname }}</span> <i @click="removeshowfile(i)" class="el-icon-delete" ></i>-->
<!--              </div>-->
<!--              <span>您已选择文件：</span>-->
<!--              <div v-for="file in fileList">-->
<!--                {{file.name}} <i @click="removefile(file)" class="el-icon-delete" ></i>-->
<!--              </div>-->
<!--            </div>-->
          </div>
          <div class="right-xiamian"  style="margin-top: 300px">
            <div style="border-bottom: 3px gainsboro solid">
              <span style="margin-left: 20px;font-weight: bold">最新动态</span>
              <div style="float: right;margin-right: 10px">
                <i class="el-icon-plus" style="color: rgb(246,126,0)"></i>
                <el-button type="text" @click="dialogFormVisible = true" style="color: #333333;margin-top: -8px">写动态</el-button>
                <el-dialog title="写动态" :visible.sync="dialogFormVisible">
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
            <div style="height: 650px;overflow-y: auto;width: 100%">
              <el-timeline>
                <el-timeline-item v-for="(item,index) in dynamicList" :key="item.dynamicid" :timestamp="item.dcreatedate" placement="top">
                  <el-card >
                    <div style="float: left">
                      <el-avatar style="" size="small" :src="staffsfordynamic[index].stimg"></el-avatar>
                    </div>
                    <div style="float: left;margin-right: 380px">
                      <span style="font-size: large;font-weight: bolder">{{staffsfordynamic[index].stshop}}   {{staffsfordynamic[index].stname}}</span><span>   {{item.dcreatedate}}  </span>
                      <el-button v-if="dynamicdelflag" type="danger" size="mini" @click="deletedynamic(item)" icon="el-icon-delete" circle></el-button>
                    </div>
                    <div style="float: left;">
                      <p>{{item.dnote}}</p>
                    </div>

                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer style="height: 100px">
        <div>
          <span style="margin-right: 20px">房源录入人</span>
          <el-select v-model="building.bwhoaddarea" @change="setstaffs1" placeholder="请选择店名" style="width: 120px">
            <el-option v-for="shop in shops"  :label="shop" :key="shop" :value="shop"></el-option>
          </el-select>
          <el-select v-model="building.bwhoadd"  placeholder="请选择用户" style="width: 120px">
            <el-option v-for="staff in staffs1"  :label="staff" :key="staff" :value="staff"></el-option>
          </el-select>
          <span style="margin: 0 15px">图片视频上传人</span>
          <el-select v-model="building.bwhoaddvedio" @change="setstaffs2" placeholder="请选择店名" style="width: 120px">
            <el-option v-for="shop in shops" :label="shop" :key="shop" :value="shop"></el-option>
          </el-select>
          <el-select v-model="building.bwhoaddwedioarea" placeholder="请选择用户" style="width: 120px">
            <el-option v-for="staff in staffs2"  :label="staff" :key="staff" :value="staff"></el-option>
          </el-select>
          <el-button type="primary"  @click="onSubmit('building')" style="float: right;background-color: rgb(246,126,0);border: none">保存房源</el-button>
          <el-button type="primary" v-if="this.$route.query.buildingid"  @click="gobackManage('building')" style="float: right;margin-right:20px;background-color: rgb(246,126,0);border: none">返回</el-button>

        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<style>
.swiperbottom{
  margin-top: 20px;
  width: 90%;
  text-align: center;
  margin-left: 40px;
}
.swiper-button-prev{
  position: absolute;
  left: 870px;
  top: 625px;
  width: 30px;
  height: 100px;
  background-color: black;
  outline: none;
}
.swiper-button-next{
  position: absolute;
  right: 20px;
  top: 625px;
  width: 30px;
  height: 100px;
  background-color: black;
  outline: none;
}
#deleteimg{
  position: absolute;
  top: 160px;
  left: 1460px;
}
.el-input.is-disabled /deep/ .el-input__inner {
  font-weight: bolder;
  color: rgb(264,146,0);
}
</style>

<script>
import ipconfig from "@/components/forbuilding/ipconfig";
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive
  },
  data() {
    var validateshihao = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入室号'));
      } else {
        //新建
        if(!this.$route.query.buildingid){
          if (this.building.bshihao !== '') {
            //需要同时向后端传递 楼盘名  楼栋号   室号
            axios.get(ipconfig.host+"building/judgeshihaodup/"+this.building.bhname+'/'+this.building.bloudong+'/'+this.building.bshihao).then(function (resp){
              if (resp.data>0){
                callback(new Error('该室号已有房源,请修改'))
              }else if(resp.data===-1){
                callback();
              }else {
                callback(new Error("莫名的Bug"))
              }
            })
          }}else {
          //存在传过来的this.$route.query.buildingid  说明这是在修改  所以通过buildingid和室号是否与原来的室号一致判断能否输入室号
          if (this.building.bshihao !== '') {
            axios.get(ipconfig.host+"building/judgeshihaodupinedit/"+this.building.bshihao+"/"+this.building.bloudong+"/"+this.$route.query.buildingid).then(function (resp){
              console.log(resp)
              if (resp.data>0){
                callback(new Error('该室号已有房源,请修改'))
              }else if(resp.data<0){
                callback();
              }else {
                callback(new Error("莫名的Bug"))
              }
            })
          }
        }
      }};
    return {
      dynamicdelflag:false,
      staffsfordynamic:[],
      tel2inputtype:'',
      tel1inputtype:'',
      iffirstaddimg:false,
      deleteimg:require('@/assets/img/deleteimg.jpg'),
      tel1lock:require('@/assets/img/unlock.jpg'),
      tel2lock:require('@/assets/img/unlock.jpg'),
      noimg:require('@/assets/img/noimg.jpg'),
      topimg:'',
      topvideo:'',
      showtel1lock:true,
      showtel2lock:true,
      swiperOptions2: {
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:false,//修改swiper的父元素时，自动初始化swiper
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      host:ipconfig.host,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dynamic:{"dnote":"","dcreatedate":"","dchangedate":"","cnumber":"","stnumber":"","bnumber":"",},
      dynamicList:[],
      //这次要上传的文件
      fileList: [],
      //已上传过，进行展示的文件
      showList:[],
      editbuildingnumber:"",
      plate:[],
      building:{btelphone1clock:"",btelphone2clock:"",bkeynumber:"",bisshow:true,bstnumber:"",btelphone1:"",btotal:"",baddress:"",btelphone2:"",bmaster1:"",bmaster2:"",blinkman1:"",blinkman2:"",bnumber:"", bhname:"",barea:"", bplate:"", btype:"",bshihao:"", bloudong:"", bstate:"", brenttype:"", bregister:"", bsize:"", brate:"", bfitment:"", bprice:"", bpaytype:"", bstartmonths:"", bnomonths:"", bfacility:[], btags:[], bwhopay:"", bremark:"", bwhoadd:"", bwhoaddarea:"", bwhoaddvedio:"", bwhoaddwedioarea:"", bmanagementfee:"", bair:"", badddate:"", bchangedate:"",},
      houses:[],
      house: {hname: "",hnumber:"",harea:"",hair:"", hplate:"", haddress:"", htype:"", hyear:"", hlevel:"", hsize:"", hrate:"", hregiest:"", hrent:"", hticket:"", hstartmonths:"", hnomonths:"", hfu:"",hya:"", hparkingfee:"", hmanagementfee:"", hmanagementpledge:"", hmaster:"", hcommission:"", hremark:"", hmaster2:"", hmaster3:"", hlinkman1:"", hlinkman2:"", htelphone1:"", htelphone2:""},
      showflag:true,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      total:0,
      tableData: [],
      restaurants: [],
      state2: '',
      b:[],
      louhaos:[],
      louhao:[],
      staffs1:[],
      staffs2:[],
      staffs:[],
      staff:{},
      shops:[],
      test:{},

      rules: {
        bhname: [
          { required: true, message: '请输入楼盘名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        bloudong: [
          {  required: true, message: '请选择楼栋号', trigger: 'change' }
        ],
        bshihao: [
          { required: true,validator: validateshihao, trigger: 'blur' },
        ],
        bstate: [
          {  required: true, message: '请选择状态', trigger: 'change' }
        ],
        brenttype: [
          {  required: true, message: '请选择租售方式', trigger: 'change' }
        ],
        bsize: [
          {  required: true, message: '请输入房源面积', trigger: 'blur' }
        ],
        bfitment: [
          {  required: true, message: '请选择装修情况', trigger: 'change' }
        ],
        bprice: [
          {  required: true, message: '请输入租金单价', trigger: 'blur' }
        ],
        bfacility: [
          { required: true, message: '请选择配套设施', trigger: 'change' },
        ],
        btags: [
          { required: true, message: '请选择房源标签', trigger: 'change' },
        ],

      }
    }
  },
  methods:{
    getdynamicstaffname(stnumber){
      const  _this = this;
      let name = ''
      axios.get(_this.host+'dynamic/getdynamicstaff/'+stnumber).then(function (resp){
        let staff = resp.data;
        name = staff.stname
        return 'name';
      })
    },
    gobackManage(){
      let buildingid = this.$route.query.buildingid
      localStorage.setItem('buildingid',buildingid)
      this.$router.push("/managebuilding");
    },
    changetel1(){
      console.log(this.tel1lock.search('/unlock')===-1)
      // this.tel1lock.search('/unlock')!==-1 =>true 说明是灰色 false
      if(this.tel1lock.search('/unlock')!==-1){
        this.tel1lock = require('@/assets/img/lock.jpg')//变红色
        this.building.btelphone1clock = "true"
      }else {//现在是红色点击进来了
        this.tel1lock = require('@/assets/img/unlock.jpg')//变灰色
        this.building.btelphone1clock = "false"
      }
    },
    changetel2(){
      console.log(this.tel2lock.search('/unlock')===-1)
      // this.tel2lock.search('/unlock')!==-1 =>true 说明是灰色 false
      if(this.tel2lock.search('/unlock')!==-1){
        this.tel2lock = require('@/assets/img/lock.jpg')//变红色
        this.building.btelphone2clock = "true"
      }else {//现在是红色点击进来了
        this.tel2lock = require('@/assets/img/unlock.jpg')//变灰色
        this.building.btelphone2clock = "false"
      }
    },
    changebisshow(bisshow){
      console.log(bisshow)
      this.building.bisshow = bisshow;
      console.log(this.building.bisshow)
    },
    deletedynamic(dynamic){
      // console.log(dynamic.dynamicid)
      const  _this = this;
      axios.post(_this.host+'building/deletedynamic',dynamic).then(function (resp){
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
      if(_this.dynamic.dchangedate){
        _this.dynamic.dchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
        _this.dynamic.dcreatedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
      }else {
        _this.dynamic.dcreatedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
        _this.dynamic.dchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
      }
      if(_this.dynamic.stnumber){
      }else {
        _this.dynamic.stnumber = localStorage.getItem("stnumber");
      }
      if(_this.$route.query.buildingid==null){
        alert("请先保存房源后再添加动态");
      }else {
        _this.dynamic.bnumber = _this.$route.query.buildingid;
        axios.post(_this.host+'building/adddynamic',_this.dynamic).then(function (resp){
          _this.loaddynamics();
          _this.dynamic.dnote="";
        })
      }
    },
    removeshowfile(file){
      for (let i=0;i<this.showList.length;i++){
        if(file.imgid==this.showList[i].imgid){
          this.showList.splice(i,1);
        }
      }
    },
    //fileList是新加的  showList是已经加的
    removeShowingImg(){
      if(this.topvideo){
        if(this.topvideo.search('blob:http:')!==-1){
          for(let i=0;i<this.fileList.length;i++) {
            if(this.fileList[i].url===this.topvideo){
              this.fileList.splice(i,1)
              console.log(this.fileList)
            }
          }
        }
        for(let i=0;i<this.showList.length;i++){
          if(this.showList[i].imgforbuilding===this.topvideo){
            if(this.showList.length===1){
              this.showList.splice(i,1);
              this.topvideo=''
              this.topimg=''
              break
            }
            if(this.showList.length-1===i){
              let img = this.showList[i-1];
              this.showList.splice(i,1);
              if(img.isvedio==='true'){
                this.topvideo=img.imgforbuilding
                this.topimg=''
              }else {
                this.topvideo=''
                this.topimg=img.imgforbuilding
              }
              break
            }
            let img = this.showList[i+1];
            this.showList.splice(i,1);
            this.topvideo=''
            if(img.isvedio==='true'){
              this.topvideo=img.imgforbuilding
              this.topimg = ''
            }else {
              this.topimg=img.imgforbuilding
              this.topvideo = ''
            }
            break;
          }
        }
      }else {
        if(this.topimg){
          if(this.topimg.search('blob:http:')!==-1){
            for(let i=0;i<this.fileList.length;i++) {
              if(this.fileList[i].url===this.topimg){
                this.fileList.splice(i,1)
              }
            }
          }
          for(let i=0;i<this.showList.length;i++){
            if(this.showList[i].imgforbuilding===this.topimg){
              if(this.showList.length===1){
                this.showList.splice(i,1);
                this.topimg=''
                break
              }
              if(this.showList.length-1===i){
                let img = this.showList[i-1];
                this.showList.splice(i,1);
                if(img.isvedio==='true'){
                  this.topvideo=img.imgforbuilding
                  this.topimg=''
                }else {
                  this.topimg=img.imgforbuilding
                  this.topvideo=''
                }
                break
              }
              let img = this.showList[i+1];
              this.showList.splice(i,1);
              this.topvideo=''
              if(img.isvedio==='true'){
                this.topvideo=img.imgforbuilding
                this.topimg=''
              }else {
                this.topimg=img.imgforbuilding
                this.topvideo=''
              }
              break;
            }
          }
        }
      }

    },
    removefile() {
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
        //将文件加入showList中
        let fileName = file.name
        let pos = fileName.lastIndexOf('.')
        let lastName = fileName.substring(pos, fileName.length)
        let flag="false"
        if (lastName.toLowerCase() === '.mp4'||lastName.toLowerCase() === '.avi') {
          flag = 'true'
        }
        if(this.showList.length===0&&flag === 'true'){
          this.topvideo = file.url
        }
        if(this.showList.length===0&&flag === 'false'){
          this.topimg = file.url
        }
        if(this.showList.length===1&&this.showList[0].imgid===-1){
          this.showList=[]
          this.showList.push({
            imgforbuilding:file.url,
            imgid: file.url,
            isvedio: flag
          });
          if(flag === 'true'){
            this.topvideo = file.url
            this.topimg = ''
          }
          if(flag === 'false'){
            this.topimg = file.url
            this.topvideo = ''
          }
        }else {
          this.showList.push({
            imgforbuilding:file.url,
            imgid: file.url,
            isvedio: flag
          });
        }
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
      this.$refs[formName].validate((valid) => {
        //将配套设施和房源标签从数组转成字符串形式，存到后端
        let as = _this.building.bfacility;
        let facility = ""
        for(let i=0;i<as.length;i++){
          facility=facility+as[i]+' ';
        }
        _this.building.bfacility = facility;
        let bs = _this.building.btags;
        let tags = ""
        for(let i=0;i<bs.length;i++){
          tags=tags+bs[i]+' ';
        }
        _this.building.btags = tags;
        if (valid) {
          //房源添加时间和修改时间 badddate,bchangedate
          let month;
          let myDate = new Date();
          if(myDate.getMonth()+1<10){
            month = '0'+(myDate.getMonth()+1);
          }else {
            month = myDate.getMonth()+1;
          }
          if(_this.building.badddate){
            _this.building.bchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
          }else {
            _this.building.badddate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
            _this.building.bchangedate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
          }
          if(_this.building.bstnumber){
          }else {
            _this.building.bstnumber = localStorage.getItem("stnumber");
          }
          let fd = new FormData();
          for (let i = 0; i < _this.showList.length; i++) {
            if(_this.showList[i].imgforbuilding.search('blob:http://')!==-1){
              _this.showList.splice(i,1)
              i=i-1
            }
          }
            if(this.$route.query.buildingid){
            console.log(this.showList)
            for (let j = 0; j < _this.showList.length; j++) {
              if(_this.showList[j].imgid===-1){
                continue
              }
              let a = _this.showList[j].imgforbuilding;
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
          fd.append("building",JSON.stringify(_this.building));
          _this.$axios.defaults.headers.post['Content-Type']='multipart/form-data'
          axios.post(_this.host+'building/save',fd).then(function (resp1){
            if(_this.$route.query.buildingid){
              _this.$router.push("/managebuilding")
            }else {
              alert("新建房源成功")
              _this.$router.push("/managebuilding")
            }
            _this.resetForm(formName);
            _this.building = {btelphone1:"",baddress:"",btotal:"",btelphone2:"",bmaster1:"",bmaster2:"",blinkman1:"",blinkman2:"",bnumber:"", bhname:"",barea:"", bplate:"", btype:"",bshihao:"", bloudong:"", bstate:"", brenttype:"", bregister:"", bsize:"", brate:"", bfitment:"", bprice:"", bpaytype:"", bstartmonths:"", bnomonths:"", bfacility:[], btags:[], bwhopay:"", bremark:"", bwhoadd:"", bwhoaddarea:"", bwhoaddvedio:"", bwhoaddwedioarea:"", bmanagementfee:"", bair:"", badddate:"", bchangedate:"",}
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    loadHouses(){
      const  _this = this;
      axios.get(_this.host+'house/findAll').then(function (resp){
        _this.houses = resp.data;
        var houses = _this.houses;
        for (let i = 0; i <houses.length; i++) {
          _this.restaurants.push({"value":houses[i].hname})
        }
      })

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
    loadAll() {
      const  _this = this;
      axios.get(_this.host+'house/findAll').then(function (resp){
        _this.houses = resp.data;
      })
      axios.get(_this.host+'house/findAllLouhao').then(function (resp){
        _this.louhaos = resp.data;
      })
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
        if(!_this.$route.query.buildingid) {
          _this.building.bwhoaddarea = _this.staff.stshop;
          _this.building.bwhoadd = _this.staff.stname;
        }
      })
      return [];
    },
    loaddynamics(){
      const  _this = this;
      //获取动态dynamicList
      if(_this.$route.query.buildingid){
        axios.get(_this.host+'building/findAlldynamics/'+localStorage.getItem("stnumber")+'/'+_this.$route.query.buildingid).then(function (resp){
          _this.dynamicList = resp.data;
          if(_this.dynamicList.length>0){
            if(_this.dynamicList[0].stnumber==localStorage.getItem("stnumber")||localStorage.getItem("sttype")=='经理'){
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
    setstaffs1(){
      this.staffs1=[];
      for (let i = 0; i < this.staffs.length; i++) {
        if(this.staffs[i].stshop==this.building.bwhoaddarea){
          this.staffs1.push(this.staffs[i].stname);
        }
      }
    },
    setstaffs2(){
      this.staffs2=[];
      for (let i = 0; i < this.staffs.length; i++) {
        if(this.staffs[i].stshop==this.building.bwhoaddvedio){
          this.staffs2.push(this.staffs[i].stname);
        }
      }
    },
    //输入字，经过建议后选中楼盘名时触发的事件：
    //从楼盘获取数据后同步数据
    handleSelect(item) {
      let houses = this.houses;
      for (let i = 0; i <houses.length; i++) {
        if(item.value==houses[i].hname){
          this.house = houses[i];
          this.building.bplate = houses[i].hplate;
          this.building.barea = houses[i].harea;
          this.building.btype = houses[i].htype;
          this.building.baddress = houses[i].haddress;
          this.building.bair = houses[i].hair;
          this.building.bmanagementfee = houses[i].hmanagementfee;

          //加载楼栋号到下拉框  为什么？？不能直接push 好奇怪
          let hnumber1 = houses[i].hnumber;
          let arr = []
          for (let i=0;i<this.louhaos.length ;i++){
            this.louhao=[];
            if(this.louhaos[i].hnumber==hnumber1){
              arr.push(this.louhaos[i].lnumber)
            }
          }
          this.louhao = arr;
          this.building.bloudong = "";
          this.building.bregister = houses[i].hregiest;
          this.building.brate = houses[i].hrate;
          this.building.bpaytype ='付'+houses[i].hfu+'押'+houses[i].hya;
          this.building.bstartmonths = houses[i].hstartmonths;
          this.building.bnomonths = houses[i].hnomonths;
          this.building.bwhopay = houses[i].hwhopay;
          this.building.bpaynorm = houses[i].hcommission;

        }
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
    goback(){
      this.$router.push("/ClothingMall")
    },
    loadbuilding(buildingid){
      const  _this = this;
      axios.get(_this.host+'building/findByBuildingid/'+buildingid).then(function (resp){
        _this.building = resp.data;
        if(_this.building.btelphone1clock === 'true'){
          _this.tel1lock = require('@/assets/img/lock.jpg')//变红色
        }else {
          _this.tel1lock = require('@/assets/img/unlock.jpg')//变灰色
        }
        if(_this.building.btelphone2clock === 'true'){
          _this.tel2lock = require('@/assets/img/lock.jpg')//变红色
        }else {
          _this.tel2lock = require('@/assets/img/unlock.jpg')//变灰色
        }
        _this.editbuildingnumber = _this.building.bnumber;
        _this.building.bfacility = _this.building.bfacility.split(' ')
        _this.building.btags = _this.building.btags.split(' ')
        let arr = []
        for (let i = 0; i <_this.houses.length; i++) {
          if(_this.building.bhname===_this.houses[i].hname){
            console.log(_this.houses[i].hname)
            for (let j=0;j<_this.louhaos.length ;j++){
              if(_this.louhaos[j].hnumber==_this.houses[i].hnumber){
                arr.push(_this.louhaos[j].lnumber)
              }
            }
          }
        }
        _this.louhao = arr;
        let number = _this.building.bnumber;
        axios.get(_this.host+'building/findImgByBnumber/'+number).then(function (res) {
          _this.showList=res.data;
          for (let i = 0; i < _this.showList.length; i++) {
            _this.showList[i].imgforbuilding = _this.host+"images/"+_this.showList[i].imgforbuilding;
          }
          // if(_this.showList.length<4){
          //   _this.swiperOptions1.loopedSlides = _this.showList.length
          //   _this.swiperOptions2.loopedSlides = _this.showList.length
          // }
          // console.log(_this.showList)
        })
      })


    }
  },
  mounted() {

    this.loadHouses();
    this.restaurants = this.loadAll();

    if (this.$route.query.buildingid!=null){
      // this.loadbuilding(this.$route.query.buildingid);
      const  _this = this;
      axios.get(_this.host+'building/findByBuildingid/'+this.$route.query.buildingid).then(function (resp){
        _this.building = resp.data;
        _this.building.bisshow = _this.building.bisshow === 'true';
        if(_this.building.bstnumber !== localStorage.getItem('stnumber')){
          //不是房源录入人 再展示时要设置一个boolen
          //不让别人再去操作lock图片
          _this.showtel1lock = false
          if(_this.building.btelphone1clock === 'true'){
            //不是房源录入人 且被隐蔽了  那么应该换成*号显示
            _this.tel1inputtype = 'password'
          }
        }else {
          //是房源录入人，那么可以继续控制是否隐蔽
          _this.showtel1lock = true
          if(_this.building.btelphone1clock === 'true'){
            _this.tel1lock = require('@/assets/img/lock.jpg')//变红色
          }else {
            _this.tel1lock = require('@/assets/img/unlock.jpg')//变灰色
          }
        }
        if(_this.building.bstnumber !== localStorage.getItem('stnumber')){
          //不是房源录入人 再展示时要设置一个boolen
          //不让别人再去操作lock图片
          _this.showtel2lock = false
          if(_this.building.btelphone2clock === 'true'){
            //不是房源录入人 且被隐蔽了  那么应该换成*号显示
            _this.tel2inputtype = 'password'
          }
        }else {
          //是房源录入人，那么可以继续控制是否隐蔽
          _this.showtel2lock = true
          if(_this.building.btelphone2clock === 'true'){
            _this.tel2lock = require('@/assets/img/lock.jpg')//变红色
          }else {
            _this.tel2lock = require('@/assets/img/unlock.jpg')//变灰色
          }
        }
        _this.editbuildingnumber = _this.building.bnumber;
        _this.building.bfacility = _this.building.bfacility.split(' ')
        _this.building.btags = _this.building.btags.split(' ')
        let arr = []
        for (let i = 0; i <_this.houses.length; i++) {
          if(_this.building.bhname===_this.houses[i].hname){
            console.log(_this.houses[i].hname)
            for (let j=0;j<_this.louhaos.length ;j++){
              if(_this.louhaos[j].hnumber==_this.houses[i].hnumber){
                arr.push(_this.louhaos[j].lnumber)
              }
            }
          }
        }
        _this.louhao = arr;
        let number = _this.building.bnumber;
        axios.get(_this.host+'building/findImgByBnumber/'+number).then(function (res) {
          _this.showList=res.data;
          //用于将视频放在第一个展示
          let temp = {};
          let flag = false;
          //先判断里面有没有视频
          for (let j = 0; j < _this.showList.length; j++) {
            if(_this.showList[j].imgforbuilding.includes(".mp4")||_this.showList[j].imgforbuilding.includes(".avi")){
              flag=true;
            }
          }
          //第一个已经是视频
          if(flag){
            if(_this.showList.length>0){
              if(_this.showList[0].imgforbuilding.search(".mp4")!== -1 ||_this.showList[0].imgforbuilding.search(".avi")!== -1){
                flag=false
              }}
          }
          //第一个不是视频  需要吧一个视频换上来
          if(flag){
            if(_this.showList.length === 1){
            }
            if(_this.showList.length === 2){
              if(_this.showList[0].imgforbuilding.search(".mp4")!== -1 ||_this.showList[0].imgforbuilding.search(".avi")!== -1){
              }else {
                temp = _this.showList[0]
                _this.showList[0] = _this.showList[1]
                _this.showList[1] = temp
              }
            }else {
              //长度大于=3
              let i=0;
              for (; i < _this.showList.length; i++) {
                if(_this.showList[i].imgforbuilding.search(".mp4")!== -1 ||_this.showList[i].imgforbuilding.search(".avi")!== -1){
                  temp = _this.showList[i]
                  break;
                }
              }
              _this.showList[i] = _this.showList[0];
              _this.showList[0] = temp;
            }}

          //用于将图片或视频路径转换为向后端访问
          for (let i = 0; i < _this.showList.length; i++) {
            _this.showList[i].imgforbuilding = _this.host+"images/"+_this.showList[i].imgforbuilding;
          }
          if(_this.showList.length===0){
            _this.iffirstaddimg = true
            //压入一个提示图片  来初始化swiper
            _this.showList.push({
              imgforbuilding:_this.noimg,
              imgid: -1,
              isvedio: 'false'
            })
          }
          if(_this.showList[0].imgforbuilding.search(".mp4")!== -1 ||_this.showList[0].imgforbuilding.search(".avi")!== -1){
            _this.topvideo =  _this.showList[0].imgforbuilding
          }else {
            _this.topimg =  _this.showList[0].imgforbuilding
          }

          _this.$nextTick(() => {
            const mySwiper2 = _this.$refs.mySwiper2.$swiper
            mySwiper2.on('click',function () {
              const clickedIndex = this.clickedIndex;
              console.log(_this.showList[clickedIndex])
              if(_this.showList[clickedIndex].isvedio==='true'){
                _this.topimg = ''
                _this.topvideo = _this.showList[clickedIndex].imgforbuilding
              }else {
                _this.topvideo = ''
                _this.topimg = _this.showList[clickedIndex].imgforbuilding
              }
            })
          })
        })
      })
    }else {
      //加载默认选项
      this.building.bstate = '有效'
      this.building.brenttype = '出租'
      //控制右侧的图片和动态是否显示的
      this.showflag = false
      this.building.btelphone1clock = "false"
      this.building.btelphone2clock = "false"
    }
  }

}
</script>