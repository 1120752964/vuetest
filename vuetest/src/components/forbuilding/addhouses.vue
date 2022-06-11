<template>
  <div id="app">
    <el-header style="background-color: #ffffff;">
      <div style="height: 40px;width:300px;border-bottom: 3px solid rgb(246,126,0);">
        <span style="color: rgb(246,126,0);">楼盘信息</span>
      </div>
    </el-header>

    <!--    border: 1px solid #eee-->
    <el-container style="height: 100%; ">
      <el-main>
        <!--        border: 3px solid;-->
        <div class="left" style="float: left;height: 100%;width: 50%">
          <el-form ref="house" :rules="rules"   :model="house" label-width="100px">
            <el-form-item prop="hname" label="楼盘名称">
              <el-input v-model="house.hname" style="width: 300px" ></el-input>
            </el-form-item>
            <el-form-item prop="harea" label="区域" style="display: inline-block">
              <el-select v-model="house.harea" @change="getplate(house.harea)" placeholder="请选择" style="width: 100px">
                <el-option v-for="item in area" :label="item" :key="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="hplate" label="板块" style="display: inline-block;margin-left: -35px">
              <el-select v-model="house.hplate" placeholder="请选择" style="width: 100px">
                <el-option v-for="item in plate" :label="item" :key="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="haddress" label="地址" style="display: inline-block;margin-left: -35px">
              <el-input style="width: 180px;" v-model="house.haddress"></el-input>
            </el-form-item>
            <div style="height: 150px;overflow-y: scroll">
            <el-form-item :key="index"  v-for="(louhao, index) in louhaos.louhao"
                          :rules="{required: true, message: '楼栋/号不能为空', trigger: 'blur' }"
                          :label="'楼栋/楼号' + (index+1)">

              <el-input style="width: 80px" v-model="louhao.lnumber" ></el-input>
              <span style="margin: 0 10px">栋/号</span>
<!--              <el-input style="width: 80px" v-model="louhao.lcontent"></el-input>-->
<!--              <span style="margin: 0 10px">室</span>-->
              <el-button @click.prevent="removelouhao(louhao)">删除</el-button>
            </el-form-item>
            </div>
            <el-button @click="addlouhao" style="display: block;margin-left: 100px;margin-bottom: 10px">新增楼栋/号</el-button>

            <el-form-item :key="index"  v-for="(subway, index) in subways.subway"
                          :rules="{required: true, message: '地铁线不能为空', trigger: 'blur' }"
                          :label="'附近地铁' + (index+1)">

              <el-input style="width: 80px" v-model="subway.subwaynote1" ></el-input>
              <el-input style="width: 120px" v-model="subway.subwaynote2"></el-input>
              <span style="margin: 0 10px">约</span>
              <el-input style="width: 80px" v-model="subway.subwaymeters" ></el-input>
              <span style="margin: 0 10px">米</span>
              <el-button @click.prevent="removesubway(subway)">删除</el-button>
            </el-form-item>
            <el-button @click="addsubway" style="display: block;margin-left: 100px;margin-bottom: 10px">新增附近地铁</el-button>

            <el-form-item prop="htype" label="楼盘类型" style="display: inline-block">
              <el-select v-model="house.htype" placeholder="请选择" style="width: 100px">
                <el-option label="写字楼" value="写字楼"></el-option>
                <el-option label="创意园" value="创意园"></el-option>
                <el-option label="联合办公" value="联合办公"></el-option>
                <el-option label="商务公寓" value="商务公寓"></el-option>
                <el-option label="独栋办公" value="独栋办公"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="hyear" label="建筑年代" style="display: inline-block;margin-right: 10px;margin-left: 32px">
              <!--              <el-date-picker-->
              <!--                  v-model="house.hyear"-->
              <!--                  align="right"-->
              <!--                  style="width: 150px"-->
              <!--                  type="date"-->
              <!--                  value-format="yyyy-MM-dd"-->
              <!--                  placeholder="选择日期"-->
              <!--                  :picker-options="pickerOptions">-->
              <!--              </el-date-picker>-->
              <el-date-picker
                  v-model="house.hyear"
                  type="year"
                  style="width: 100px"
                  placeholder="选择年">
              </el-date-picker>
              <span style="margin-left: 10px">年</span>
            </el-form-item>
            <el-form-item prop="hlevel" label="楼盘等级" style="display: inline-block">
              <el-select v-model="house.hlevel" placeholder="请选择" style="width: 100px">
                <el-option label="甲级" value="甲级"></el-option>
                <el-option label="乙级" value="乙级"></el-option>
                <el-option label="普通" value="普通"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="hsize"  label="整层面积" style="display: inline-block">
              <el-input v-model="house.hsize" style="width: 100px" ></el-input>
              <span style="margin: 0 10px">㎡</span>
            </el-form-item>
            <el-form-item  prop="hrate" label="得房率" style="display: inline-block">
              <el-input v-model="house.hrate" style="width: 100px" ></el-input>
              <span style="margin: 0 10px">%</span>
            </el-form-item>
            <el-form-item label="可否注册" prop="hregiest" style="display: inline-block">
              <el-select v-model="house.hregiest" placeholder="请选择" style="width: 100px">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="租金均价" prop="hrent" style="display: inline-block;">
              <el-input v-model="house.hrent" style="width: 100px" ></el-input>
              <span style="margin: 0 10px">㎡/元/天</span>
            </el-form-item>
            <el-form-item label="是否含票" style="display: inline-block;margin-left: -20px">
              <el-select v-model="house.hticket" placeholder="请选择" style="width: 100px">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起租期" prop="hstartmonths" style="display: inline-block;margin-left: 10px">
              <el-input v-model="house.hstartmonths" style="width: 100px" ></el-input>
              <span style="margin: 0 10px">月</span>
            </el-form-item>
            <el-form-item label="免租期" prop="hnomonths" style="display: inline-block;">
              <el-input v-model="house.hnomonths" style="width: 100px" ></el-input>
              <span style="margin: 0 10px">月</span>
            </el-form-item>
            <el-form-item prop="hfu" label="支付方式   付" style="display: inline-block;">
              <el-input v-model="house.hfu" style="width: 50px" ></el-input>
              <span style="margin: 0 10px">月</span>
            </el-form-item>
            <el-form-item prop="hya" label="押" style="display: inline-block;margin-left: -30px">
              <el-input v-model="house.hya" style="width: 50px" ></el-input>
              <span style="margin: 0 30px 0 10px">月</span>
            </el-form-item>
            <el-form-item label="停车费" prop="hparkingfee" style="display: inline-block;">
              <el-input v-model="house.hparkingfee" style="width: 100px"></el-input>
              <span style="margin: 0 10px">元/辆/月</span>
            </el-form-item>
            <el-form-item label="空调" prop="hair" style="display: inline-block;margin-left: -30px">
              <el-select v-model="house.hair" placeholder="请选择" style="width: 140px">
                <el-option label="统一中央空调" value="统一中央空调"></el-option>
                <el-option label="独立中央空调" value="独立中央空调"></el-option>
                <el-option label="分体式空调" value="分体式空调"></el-option>
                <el-option label="无空调" value="无空调"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物业收费" prop="hmanagementfee" style="display: inline-block;">
              <el-input v-model="house.hmanagementfee" style="width: 100px" ></el-input>
              <span style="margin: 0 10px">㎡/元/月</span>
            </el-form-item>
            <el-form-item label="物业押金" prop="hmanagementpledge" style="display: inline-block;">
              <el-select v-model="house.hmanagementpledge" placeholder="请选择" style="width: 100px">
                <el-option label="一个月" value="一个月"></el-option>
                <el-option label="两个月" value="两个月"></el-option>
                <el-option label="三个月" value="三个月"></el-option>
                <el-option label="四个月" value="四个月"></el-option>
                <el-option label="五个月" value="五个月"></el-option>
              </el-select>
              <span style="margin: 0 10px">个月</span>
            </el-form-item>
            <el-form-item label="出租方" prop="hmaster" style="display: inline-block;">
              <el-select v-model="house.hmaster" placeholder="请选择" style="width: 120px">
                <el-option label="大业主" value="大业主"></el-option>
                <el-option label="小业主" value="小业主"></el-option>
                <el-option label="二房东" value="二房东"></el-option>
                <el-option label="商管公司" value="商管公司"></el-option>
                <el-option label="转租客" value="转租客"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付佣方" prop="hwhopay">
              <el-radio-group  v-model="house.hwhopay">
                <el-radio label="业主承担"></el-radio>
                <el-radio label="租户承担"></el-radio>
                <el-radio label="业主和租户共同承担"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="付佣" prop="hcommission"  style="display: inline-block;">
              <el-select v-model="house.hcommission" placeholder="请选择" style="width: 100px">
                <el-option label="一个月" value="一个月"></el-option>
                <el-option label="两个月" value="两个月"></el-option>
                <el-option label="三个月" value="三个月"></el-option>
                <el-option label="四个月" value="四个月"></el-option>
                <el-option label="五个月" value="五个月"></el-option>
              </el-select>
              <span style="margin: 0 10px">个月</span>
            </el-form-item>
            <el-form-item label="备注" prop="hremark">
              <el-input type="textarea" :rows="5" v-model="house.hremark" style="width: 400px"></el-input>
            </el-form-item>

          </el-form>
        </div>
        <!--        border: 3px solid;-->
        <div class="right" style="float: right;height: 100%;width: 49%">
          <!--轮播图-->
          <div class="imgs" style="height: 300px;width: 90%;padding-left: 5%">
            <template>
              <div style="text-align: center">
<!--                450/-->
                <el-image class="swipertop" style="height: 400px;width: 100%"  fit="fit" :src="topimg" v-if="topimg!==''" ></el-image>
                <video class="swipertop" style="height: 400px;width: 100%" controls="controls" width="500px" height="300px" :src="topvideo" v-if="topvideo!==''"></video>
<!--                <div id="deleteimg" @click="removeShowingImg()">-->
<!--                  <el-image  :src="deleteimg" style="height: 40px;width: 40px"></el-image>-->
<!--                </div>-->
              </div>
              <div class="swiperbottom"  >
                <swiper class="mySwiper2" ref="mySwiper2" :options="swiperOptions2">
                  <swiper-slide class="swiper-slide" v-for="item in showList" :key="item.imgid">
                    <el-image class="a" style="height: 100px;width: 100%;opacity: 1" v-if="item.isvedio==='false'" fit="fit" :src="item.imgforhouse" ></el-image>
                    <video style="height: 100px;width: 100%"   width="500px" height="300px" :src="item.imgforhouse" v-if="item.isvedio==='true'"></video>
                  </swiper-slide>
                </swiper>
              </div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            </template>
          </div>
          <!--          <div style="height: 300px;width: 500px">-->
          <!--            <template>-->
          <!--&lt;!&ndash;              第一次添加&ndash;&gt;-->
          <!--              <el-carousel v-if="!this.$route.query.hid" :interval="5000" arrow="always">-->
          <!--                <el-carousel-item v-for="item in fileList" :key="item.name">-->
          <!--                  <el-image v-if="item.name.includes('.jpeg')||item.name.includes('.png')||item.name.includes('.jpg')" fit="fit" :src="item.url" :alt="item.name"></el-image>-->
          <!--                  <video controls="controls" width="500px" height="300px" v-if="item.name.includes('.mp4')||item.name.includes('.avi')" :src="item.url" :alt="item.name"></video>-->
          <!--                </el-carousel-item>-->
          <!--              </el-carousel>-->
          <!--              <div>-->
          <!--&lt;!&ndash;                编辑&ndash;&gt;-->
          <!--              <el-carousel v-if="this.$route.query.hid" :interval="5000" arrow="always">-->
          <!--                <el-carousel-item  v-for="item in showList" :key="item.imgid">-->
          <!--                  <el-image v-if="item.isvedio=='false'" fit="fit" :src="item.imgforhouse" ></el-image>-->
          <!--                  <video  controls="controls" width="500px" height="300px" :src="item.imgforhouse" v-if="item.isvedio!=='false'">-->
          <!--                  </video>-->
          <!--                </el-carousel-item>-->
          <!--              </el-carousel>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </div>-->
          <div style="margin-top: 250px;">
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
          <!--          <div v-if="this.$route.query.hid">-->
          <!--            <span>您已上传文件：</span>-->
          <!--            <div :key="i.imgid" v-for="i in showList">-->
          <!--              <span>{{ i.imgname }}</span> <i @click="removeshowfile(i)" class="el-icon-delete" ></i>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <span>您已选择文件：</span>-->
          <!--          </div>-->
          <!--          <div v-for="file in fileList">-->
          <!--            {{file.name}} <i @click="removefile(file)" class="el-icon-delete" ></i>-->
          <!--          </div>-->
          <div style="margin-top: 350px">
            <el-form ref="house2">
              <el-form-item label="出租方1">
                <el-select v-model="house.hmaster2" placeholder="请选择" style="width: 100px">
                  <el-option label="大业主" value="大业主"></el-option>
                  <el-option label="小业主" value="小业主"></el-option>
                  <el-option label="二房东" value="二房东"></el-option>
                  <el-option label="商管公司" value="商管公司"></el-option>
                  <el-option label="转租客" value="转租客"></el-option>
                </el-select>
                <span style="margin: 0 15px">联系人</span>
                <el-input v-model="house.hlinkman1" style="width: 80px" ></el-input>
                <span style="margin: 0 15px">电话</span>
                <el-input v-model="house.htelphone1" style="width: 150px" ></el-input>
              </el-form-item>
              <el-form-item label="出租方2" >
                <el-select v-model="house.hmaster3" placeholder="请选择" style="width: 100px">
                  <el-option label="大业主" value="大业主"></el-option>
                  <el-option label="小业主" value="小业主"></el-option>
                  <el-option label="二房东" value="二房东"></el-option>
                  <el-option label="商管公司" value="商管公司"></el-option>
                  <el-option label="转租客" value="转租客"></el-option>
                </el-select>
                <span style="margin: 0 15px">联系人</span>
                <el-input v-model="house.hlinkman2" style="width: 80px" ></el-input>
                <span style="margin: 0 15px">电话</span>
                <el-input v-model="house.htelphone2" style="width: 150px" ></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary"  @click="onSubmit('house')" style="float: right;background-color: rgb(246,126,0);border: none">保存楼盘</el-button>
            <el-button type="primary"  @click="gobackManage()" style="float: right;margin-right:20px;background-color: rgb(246,126,0);border: none">返回</el-button>
          </div>
        </div>
      </el-main>
      <el-footer style="height: 100%">

        <div class="tabs" style="position: relative;">
          <div style="text-align: right;border:none;position: absolute;right: 30px;top: 10px;z-index: 1"  >
            <i style="color: rgb(246,126,0);z-index: 100;" @click="goaddbuilding" class="el-icon-plus"></i><span style="font-size: large;" @click="goaddbuilding">新增房源</span>
          </div>
          <div style="margin-top: -34px;width: 100%;z-index: -1">
            <template >
              <el-tabs  v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane name="在租房源">
                  <span slot="label" style="color: green;font-weight: bolder;font-size: x-large">在租房源</span>
                  <template>
                    <el-table
                        :data="isonrent"
                        style="width: 100%">
                      <el-table-column
                          align="center"
                          :label="honrentcount"
                          width="180">
                        <template slot-scope="scope">
                          <div style="text-align: center">
                            <img @click="editbuilding(scope.row)" :src="scope.row.bpicture" style="height: 80px;width:120px;">
                            </img>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          label="房号/面积"
                          width="180">
                        <template slot-scope="scope">
                          <div><span>{{scope.row.bloudong}}号{{scope.row.bshihao}}室</span></div>
                          <div><span>{{scope.row.bsize}}㎡</span></div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          label="单价"
                          width="180">
                        <template slot-scope="scope">
                          <div><span style="color: red;font-size: large">{{scope.row.bprice}}</span><span>元/㎡/天</span></div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          label="总价"
                          width="180">
                        <template slot-scope="scope">
                          <div><span style="color: red;font-size: large">{{scope.row.btotal}}</span><span>元/㎡/天</span></div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-tab-pane>
                <el-tab-pane name="在售房源">
                  <span slot="label" style="color: darkblue;font-weight: bolder;font-size: x-large">在售房源</span>
                  <template>
                    <el-table
                        :data="isonsell"
                        style="width: 100%">
                      <el-table-column
                          align="center"
                          :label="honsellcount"
                          width="180">
                        <template slot-scope="scope">
                          <div style="text-align: center">
                            <img @click="editbuilding(scope.row)" :src="scope.row.bpicture" style="height: 80px;width:120px;">
                            </img>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          label="房号/面积"
                          width="180">
                        <template slot-scope="scope">
                          <div><span>{{scope.row.bloudong}}号{{scope.row.bshihao}}室</span></div>
                          <div><span>{{scope.row.bsize}}㎡</span></div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          label="单价"
                          width="180">
                        <template slot-scope="scope">
                          <div><span style="color: red;font-size: large">{{scope.row.bprice}}</span><span>元/㎡/天</span></div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          label="总价"
                          width="180">
                        <template slot-scope="scope">
                          <div><span style="color: red;font-size: large">{{scope.row.btotal}}</span><span>元/㎡/天</span></div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-tab-pane>
                <el-tab-pane name="位置信息">
                  <span slot="label" style="color:#000000;font-weight: bolder;font-size: x-large">位置信息</span>
                  <template>
                    <div id="container" >
                    </div>
                  </template>
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
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
  left: 1110px;
  top: 595px;
  width: 30px;
  height: 100px;
  background-color: black;
  outline: none;
}
.swiper-button-next{
  position: absolute;
  right: 70px;
  top: 593px;
  width: 30px;
  height: 100px;
  background-color: black;
  outline: none;
}
#deleteimg{
  position: absolute;
  top: 130px;
  left: 1470px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*取消tab页click蓝色下标线*/
.el-tabs__active-bar {
  border-bottom: 4px solid rgb(246,146,0);
  background-color: transparent !important;
}
#container {
  width: 100%;
  height: 800px;
  min-width:800px;
  min-height:800px;
}
</style>
<script>
import {TMap} from "@/assets/js/TMap";
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
    var validateHname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入楼盘名'));
      } else {
        if(!this.$route.query.hid){
          if (this.house.hname !== '') {
            axios.get(ipconfig.host+"house/judgenamedup/"+this.house.hname).then(function (resp){
              if (resp.data.hid>0){
                callback(new Error('该楼盘名已被占用,请修改'))
              }else if(resp.data.hid===-1){
                callback();
              }else {
                callback(new Error("莫名的Bug"))
              }
            })
          }}else {
          //存在传过来的this.$route.query.hid  说明这是在修改  所以通过hid判断能否输入编号和姓名
          if (this.house.hname !== '') {
            axios.get(ipconfig.host+"house/judgenamedupinedit/"+this.house.hname+"/"+this.$route.query.hid).then(function (resp){
              // console.log(resp)
              if (resp.data.hid>0){
                callback(new Error('该楼盘名已被占用,请修改'))
              }else if(resp.data.hid===-1){
                callback();
              }else {
                callback(new Error("莫名的Bug"))
              }
            })
          }
        }
      }};
    return {
      noimg:require('@/assets/img/noimg.jpg'),
      topimg:'',
      topvideo:'',
      deleteimg:require('@/assets/img/deleteimg.jpg'),
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
      honrentcount:"",
      honsellcount:"",
      test:"",
      //这次要上传的文件
      fileList: [],
      //已上传过，进行展示的文件
      showList:[],
      buildings:[],
      isonrent:[],
      isonsell:[],
      lng: 121.31373,
      lat: 31.28085,
      region:'上海',
      location: "上海市嘉定区金昌西路与华翔路交汇处附近东北",
      activeName: '在租房源',
      /*日期选择器内容*/
      value1:"",
      pickerOptions: {disabledDate(time) {return time.getTime() > Date.now();}, shortcuts: [{ text: '今天', onClick(picker) { picker.$emit('pick', new Date());}}, {text: '昨天', onClick(picker) {const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}}, {text: '一周前', onClick(picker) {const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]},
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
      house: {hstnumber:"",hname: "",hnumber:"",harea:"",hwhopay:"",hair:"", hplate:"", haddress:"", htype:"", hyear:"", hlevel:"", hsize:"", hrate:"", hregiest:"", hrent:"", hticket:"", hstartmonths:"", hnomonths:"", hfu:"",hya:"", hparkingfee:"", hmanagementfee:"", hmanagementpledge:"", hmaster:"", hcommission:"", hremark:"", hmaster2:"", hmaster3:"", hlinkman1:"", hlinkman2:"", htelphone1:"", htelphone2:""},
      subways: {subway: [],}, louhaos: {louhao: [],},
      rules: {
        hname: [
          { required: true,validator: validateHname, trigger: 'blur' },
        ],
        harea: [
          {  required: true, message: '请选择区域', trigger: 'change' }
        ],
        hplate: [
          {  required: true, message: '请选择板块', trigger: 'change' }
        ],
        haddress: [
          {  required: true, message: '请输入地址', trigger: 'blur' }
        ],
        htype: [
          {  required: true, message: '请选择类型', trigger: 'change' }
        ],
        hyear: [
          {  required: true, message: '请选择年代', trigger: 'change' }
        ],
        hlevel: [
          {  required: true, message: '请选择等级', trigger: 'change' }
        ],
        hsize: [
          { required: true, message: '请输入面积', trigger: 'blur' },
        ],
        hrate: [
          { required: true, message: '请输入得房率', trigger: 'blur' },
        ],
        hregiest: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        hrent: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        hticket: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        hstartmonths: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        hnomonths: [
          {  required: true, message: '请选择', trigger: 'change' }
        ],
        hya: [
          {  required: true, message: '请输入压多久', trigger: 'blur' }
        ],
        hfu: [
          {  required: true, message: '请输入付多久', trigger: 'blur' }
        ],
        hparkingfee: [
          {  required: true, message: '请输入停车费', trigger: 'blur' }
        ],
        hair: [
          {  required: true, message: '请选择空调类型', trigger: 'change' }
        ],
        hmanagementpledge: [
          {  required: true, message: '请输入物业押金', trigger: 'blur' }
        ],
        hmanagementfee: [
          {  required: true, message: '请输入物业费', trigger: 'blur' }
        ],
        hmaster: [
          {  required: true, message: '请选择出租方', trigger: 'change' }
        ],
        hwhopay: [
          {  required: true, message: '请选择付佣方', trigger: 'change' }
        ],
        hcommission: [
          {  required: true, message: '请输入付佣', trigger: 'blur' }
        ],

      }}
  },
  methods:{
    editbuilding(row){
      this.$router.push({
        path:'/editbuilding',
        query:{
          "buildingid":row.buildingid
        }
      });
    },
    onInput(){
      this.$forceUpdate();
    },
    //fileList是新加的  showList是已经加的
    removeShowingImg(){
      if(this.topvideo){
        if(this.topvideo.search('blob:http:')!==-1){
          for(let i=0;i<this.fileList.length;i++) {
            if(this.fileList[i].url===this.topvideo){
              this.fileList.splice(i,1)
              // console.log(this.fileList)
            }
          }
        }
        for(let i=0;i<this.showList.length;i++){
          if(this.showList[i].imgforhouse===this.topvideo){
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
                this.topvideo=img.imgforhouse
                this.topimg=''
              }else {
                this.topvideo=''
                this.topimg=img.imgforhouse
              }
              break
            }
            let img = this.showList[i+1];
            this.showList.splice(i,1);
            this.topvideo=''
            if(img.isvedio==='true'){
              this.topvideo=img.imgforhouse
              this.topimg = ''
            }else {
              this.topimg=img.imgforhouse
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
            if(this.showList[i].imgforhouse===this.topimg){
              if(this.showList.length===1){
                this.showList.splice(i,1);
                this.topimg=''
                break
              }
              if(this.showList.length-1===i){
                let img = this.showList[i-1];
                this.showList.splice(i,1);
                if(img.isvedio==='true'){
                  this.topvideo=img.imgforhouse
                  this.topimg=''
                }else {
                  this.topimg=img.imgforhouse
                  this.topvideo=''
                }
                break
              }
              let img = this.showList[i+1];
              this.showList.splice(i,1);
              this.topvideo=''
              if(img.isvedio==='true'){
                this.topvideo=img.imgforhouse
                this.topimg=''
              }else {
                this.topimg=img.imgforhouse
                this.topvideo=''
              }
              break;
            }
          }
        }
      }

    },
    goaddbuilding(){
      this.$router.push("/addbuilding");
    },
    beforeAvatarUpload(file) {
      let fileName = file.name
      let pos = fileName.lastIndexOf('.')
      let lastName = fileName.substring(pos, fileName.length)
      // console.log(lastName)
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
            imgforhouse:file.url,
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
            imgforhouse:file.url,
            imgid: file.url,
            isvedio: flag
          });
        }
        // console.log(this.fileList)
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    removeshowfile(file){
      for (let i=0;i<this.showList.length;i++){
        if(file.imgid==this.showList[i].imgid){
          this.showList.splice(i,1);
        }
      }
      // console.log(this.showList)
    },
    removefile(file) {
      for (let i=0;i<this.fileList.length;i++){
        if(file.uid==this.fileList[i].uid){
          this.fileList.splice(i,1);
        }
      }
    },
    handlePreview(file) {
      // console.log(file);
    },
    //获取经纬度
    getLatLng(){
      const  _this = this;
      // console.log(_this.location)
      jQuery.ajax({
        type: "get",
        dataType: 'jsonp',
        data: {
          key: "YQXBZ-CDNWW-3LDRA-OWLVS-WYO36-4NBQD", // 填申请到的key
          address:  _this.location, //具体的地址
          output: 'jsonp' //返回格式：支持JSON/JSONP，默认JSON
        },
        jsonp: "callback",
        jsonpCallback: "QQmap",
        url: "https://apis.map.qq.com/ws/geocoder/v1/?",
        success: function (json) {
          if(json.status == 0) {
            _this.lat = json.result.location.lat;
            _this.lng = json.result.location.lng;
            console.log('经度：', _this.lat);
            console.log('纬度：', _this.lng);
          } else {
            // alert('楼盘位置不精确：', json.message);
            // console.log('楼盘位置不精确')
            // console.log(json.status)
          }
        },
        error: function (err) {
          alert("异常错误，请刷新浏览器后重试");
        }
      })
    },
    // 地图初始化函数，本例取名为init，开发者可根据实际情况定义
    initMap(){
      TMap('申请的key').then(qq => {
        var map = new qq.maps.Map(document.getElementById("container"), {
          // 地图的中心地理坐标。
          center: new qq.maps.LatLng(this.lat, this.lng),
          zoom: 19,
        });
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addsubway() {
      this.subways.subway.push({
        subwaynote1: '',
        subwaymeters: '',
        subwaynote2: '',
        hnumber: '',
      });
    },
    addlouhao() {
      this.louhaos.louhao.push({
        lnumber: '',
        lcontent: '',
        hnumber: '',
      });
    },
    removesubway(item) {
      var index = this.subways.subway.indexOf(item)
      if (index !== -1) {
        this.subways.subway.splice(index, 1)
      }
    },
    removelouhao(item) {
      this.$confirm('此操作将同时删除该楼栋号下的所有房源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        var index = this.louhaos.louhao.indexOf(item)
        if (index !== -1) {
          this.louhaos.louhao.splice(index, 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getplate(a){
      this.plate = this.plates[this.area.indexOf(a)]
    },
    loadsubways(hid){
      const  _this = this;
      axios.get(_this.host+'house/findSubwaysByHid/'+hid).then(function (resp){
        _this.subways.subway = resp.data;
      })
    },
    loadlouhaos(hid){
      const  _this = this;
      axios.get(_this.host+'house/findLouhaosByHid/'+hid).then(function (resp){
        _this.louhaos.louhao = resp.data;
      })
    },
    loadhouse(hid){
      const  _this = this;
      axios.get(_this.host+'house/findByHid/'+hid).then(function (resp){
        _this.house = resp.data;
        let number = _this.house.hnumber;
        _this.location = '上海市'+_this.house.haddress;
        _this.getLatLng();
        _this.initMap();
        axios.get(_this.host+'house/findImgByHnumber/'+number).then(function (res) {
          _this.showList=res.data;
          console.log(1)
          console.log(_this.showList)
          console.log(111)
          //用于将视频放在第一个展示
          let temp = {};
          let flag = false;
          for (let j = 0; j < _this.showList.length; j++) {
            if(_this.showList[j].imgforhouse.includes(".mp4")||_this.showList[j].imgforhouse.includes(".avi")){
              flag=true;
            }
          }
          if(flag){
            let i=0;
            for (; i < _this.showList.length; i++) {
              if(_this.showList[i].imgforhouse.includes(".mp4")||_this.showList[i].imgforhouse.includes(".avi")){
                temp = _this.showList[i]
              }
            }
            _this.showList[i-1] = _this.showList[0];
            _this.showList[0] = temp;
          }

          //用于将图片或视频路径转换为向后端访问
          for (let i = 0; i < _this.showList.length; i++) {
            _this.showList[i].imgforhouse = _this.host+"images/"+_this.showList[i].imgforhouse;
          }

          if(_this.showList.length===0){
            _this.iffirstaddimg = true
            //压入一个提示图片  来初始化swiper
            _this.showList.push({
              imgforhouse:_this.noimg,
              imgid: -1,
              isvedio: 'false'
            })
          }
          console.log(_this.showList[0])
          if(_this.showList[0].imgforhouse.includes(".mp4")||_this.showList[0].imgforhouse.includes(".avi")){
            _this.topvideo =  _this.showList[0].imgforhouse
          }else {
            _this.topimg =  _this.showList[0].imgforhouse
          }
          console.log(_this.topvideo)
          console.log(_this.topimg)

          _this.$nextTick(() => {
            const mySwiper2 = _this.$refs.mySwiper2.$swiper
            mySwiper2.on('click',function () {
              const clickedIndex = this.clickedIndex;
              console.log(_this.showList[clickedIndex])
              if(_this.showList[clickedIndex].isvedio==='true'){
                _this.topimg = ''
                _this.topvideo = _this.showList[clickedIndex].imgforhouse
              }else {
                _this.topvideo = ''
                _this.topimg = _this.showList[clickedIndex].imgforhouse
              }
            })
          })
        })
      })
    },
    gobackManage(){
      // let hid = this.$route.query.hid
      // localStorage.setItem('hid',hid)
      this.$router.push("/managehouses");
    },
    onSubmit(formName){
      const  _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fd = new FormData();
          if(this.$route.query.hid){
            for (let i = 0; i < _this.showList.length; i++) {
              let a = _this.showList[i].imgforhouse;
              a=a.substr(a.lastIndexOf('/')+1,a.length);
              _this.showList[i].imgforhouse=a;
              fd.append("showfiles",JSON.stringify(_this.showList[i]));
              // console.log(JSON.stringify(_this.showList[i]))
            }
            if(_this.showList.length==1){
              fd.append("showfiles","wtf");
            }
          }
          for (let i = 0; i < _this.fileList.length; i++) {
            fd.append("files",_this.fileList[i].raw);
          }
          if(!_this.house.hstnumber){
            _this.house.hstnumber = localStorage.getItem("stnumber");
          }
          fd.append("house",JSON.stringify(_this.house));
          _this.$axios.defaults.headers.post['Content-Type']='multipart/form-data'
          axios.post(_this.host+'house/save',fd).then(function (resp1){
            let housenumber = resp1.data;
            if(_this.subways.subway.length!==0){
              for(let i=0;i<_this.subways.subway.length;i++){
                _this.subways.subway[i].hnumber = housenumber;
              }
            }else {
              _this.subways.subway.push({
                "subwaynote1": "",
                "subwaymeters": "",
                "subwaynote2": "",
                "hnumber": housenumber,
              })
            }

            axios.post(_this.host+'house/savesubways',_this.subways.subway).then(function (resp){
              if(_this.louhaos.louhao.length!==0){
                for(let i=0;i<_this.louhaos.louhao.length;i++){
                  _this.louhaos.louhao[i].hnumber = housenumber;
                }
              }else {
                _this.louhaos.louhao.push({"lnumber": "",
                  "lcontent": "",
                  "hnumber": housenumber})
              }
              axios.post(_this.host+'house/savelouhaos',_this.louhaos.louhao).then(function (res){
              })
              if(_this.$route.query.hid){
                _this.$router.push("/managehouses")
              }else {
                alert("新增楼盘成功")
                _this.$router.push("/managehouses")
              }
              _this.resetForm(formName)
              _this.subways= {subway: [{subwaynote1: '', subwaymeters: '', subwaynote2: '', hnumber: '',}, {subwaynote1: '', subwaymeters: '', subwaynote2: '', hnumber: '',}]}
              _this.house.hremark=_this.house.hmaster2=_this.house.hmaster3=""
              _this.house.htelphone1=_this.house.htelphone2=_this.house.hlinkman1=_this.house.hlinkman2=""
              _this.louhaos=  {louhao: []}
              _this.fileList=[]
            })
          })
        } else {
          alert("请正确输入数据！");
          return false;
        }
      });
    },
    resetForm(formName) {

    },
    loadsendhouses(){
      const  _this = this;
      axios.get(_this.host+'building/findAll').then(function (resp){
        _this.buildings = resp.data;
        for (let i = 0; i <_this.buildings.length; i++) {
          axios.get(_this.host+'building/getpictureurl/'+_this.buildings[i].bnumber).then(function (res) {
            _this.$set(_this.buildings[i],"bpicture",_this.host+"images/"+res.data)
          })
        }
        for (let i = 0; i < _this.buildings.length; i++) {
          if(_this.buildings[i].brenttype=="出租"&&_this.buildings[i].bhname===_this.house.hname){
            _this.isonrent.push(_this.buildings[i]);
          }
          if(_this.buildings[i].brenttype=="出售"&&_this.buildings[i].bhname===_this.house.hname){
            _this.isonsell.push(_this.buildings[i]);
          }
        }
        _this.honrentcount="全部("+_this.isonrent.length+"套)";
        _this.honsellcount="全部("+_this.isonsell.length+"套)";

      })
    }
  },
  mounted() {
    if (this.$route.query.hid!=null){
      this.loadhouse(this.$route.query.hid);
      this.loadsubways(this.$route.query.hid);
      this.loadlouhaos(this.$route.query.hid);
    }
    this.initMap();
    //加载最下方的表格
    this.loadsendhouses();
    this.test = require("@/assets/img/a.mp4")
  }

}
</script>