import Vue from 'vue'
import VueRouter from 'vue-router'
import AdministratorLogin from "@/components/AdministratorLogin";
import Home from '../components/Home';
import AddCommodity from "../components/AddCommodity";
import AddUser from "../components/AddUser";
import UserUpdate from "../components/UserUpdate";
import UserManage from "@/components/UserManage";
import CommodityManage from "../components/CommodityManage"
import CommodityUpdate from "../components/CommodityUpdate"
import UserLogin from "@/components/UserLogin";
import ClothingMall from "@/components/ClothingMall";
import TotalLogin from "@/components/TotalLogin";
import StoreLogin from "@/components/StoreLogin";
import CommodityShow from "@/components/CommodityShow";
import test from "@/components/test";
import Cart from "@/components/Cart";
import Order from "@/components/Order";
import Pay from "@/components/Pay";
import OrderList from "@/components/OrderList";
import AfterPay from "@/components/AfterPay";
import Store from "@/components/Store";
import addbuilding from "@/components/forbuilding/addbuilding";
import AddAddress from "@/components/AddAddress";
import AddressUpdate from "@/components/AddressUpdate";
import AddStore from "@/components/AddStore";
import StoreCommodities from "@/components/StoreCommodities";
import StoreAllOrders from "@/components/StoreAllOrders";
import StoreUnSendOrders from "@/components/StoreUnSendOrders";
import StoreSendOrders from "@/components/StoreSendOrders";
import OrderDetailShowForUser from "@/components/OrderDetailShowForUser";
import home from "@/components/forbuilding/home";
import managebuilding from "@/components/forbuilding/managebuilding";
import managecustomer from "@/components/forbuilding/managecustomer";
import addcustomer from "@/components/forbuilding/addcustomer";
import managehouses from "@/components/forbuilding/managehouses";
import addhouses from "@/components/forbuilding/addhouses";
import addstaff from "@/components/forbuilding/addstaff";
import managestaffs from "@/components/forbuilding/managestaffs";
import addhousesggbanben from "@/components/forbuilding/addhousesggbanben";
import lookaround from "@/components/forbuilding/lookaround";
import AddressList from "@/components/AddressList";
Vue.use(VueRouter)

const routes =   [
    { path: '/AddCommodity', name: '添加商品', component: AddCommodity},

    // {path:'/',redirect:'/UserLogin'},
    // {path:"/UserLogin", name:"用户登录", component:UserLogin},
    // {path:"/addhousesggbanben", name:"addhousesggbanben", component:addhousesggbanben},
    // // {path: '/home', name:'home', component: home},
    // {path: '/home',
    //     name:'home',
    //     component: home,
    //     children: [
    //         {path: '/managebuilding', name:'managebuilding', component: managebuilding},
    //         { path: '/addbuilding', name: '录入房源', component: addbuilding},
    //         { path: '/editbuilding', name: '编辑房源', component: addbuilding},
    //         { path: '/addhouses', name: 'addhouses', component: addhouses},
    //         { path: '/edithouses', name: 'edithouses', component: addhouses},
    //         { path: '/addcustomer', name: 'addcustomer', component: addcustomer},
    //         { path: '/editcustomer', name: 'editcustomer', component: addcustomer},
    //         { path: '/addstaff', name: 'addstaff', component: addstaff},
    //         { path: '/editstaff', name: 'editstaff', component: addstaff},
    //         { path: '/managecustomer', name: 'managecustomer', component: managecustomer},
    //         { path: '/managestaffs', name: 'managestaffs', component: managestaffs},
    //         { path: '/managehouses', name: 'managehouses', component: managehouses},
    //         { path: '/lookaround', name: 'lookaround', component: lookaround},
    //         {path: '/StoreUnSendOrders', name:'StoreUnSendOrders', component: StoreUnSendOrders},
    //         {path: '/StoreSendOrders', name:'StoreSendOrders', component: StoreSendOrders},
    //
    //     ]
    // },
    {path:'/',redirect:'/TotalLogin'},
    {path:"/UserLogin", name:"用户登录", component:UserLogin},
    {path:'/ClothingMall',name:"商城页面",component: ClothingMall},
    {path:'/TotalLogin',name:"总登录页面",component: TotalLogin},
    { path: '/AddUser', name: '添加用户', component: AddUser},
    {path: '/AdministratorLogin', name:'管理员登录登录', component: AdministratorLogin},
    {path: '/StoreLogin', name:'商铺登录', component: StoreLogin},
    {path: '/CommodityShow', name:'商品展示', component: CommodityShow},
    {path: '/Cart', name:'Cart', component: Cart},
    {path: '/Order', name:'Order', component: Order},
    {path: '/Pay', name:'Pay', component: Pay},
    {path: '/OrderList', name:'OrderList', component: OrderList},
    {path: '/AfterPay', name:'AfterPay', component: AfterPay},
    {path: '/test', name:'test', component: test},
    {path: '/AddAddress', name:'AddAddress', component: AddAddress},
    {path: '/AddressList', name:'AddAddress', component: AddressList},
    {path: '/AddressUpdate', name:'AddressUpdate', component: AddressUpdate},
    {path: '/AddStore', name:'AddStore', component: AddStore},
    {path: '/OrderDetailShowForUser', name:'OrderDetailShowForUser', component: OrderDetailShowForUser},

    {path: '/Store',
        name:'Store',
        component: Store,
        children: [
            {path: '/StoreCommodities', name:'StoreCommodities', component: StoreCommodities},
            { path: '/AddCommodity', name: '添加商品', component: AddCommodity},
            { path: '/CommodityUpdate', name: '修改商品', component: CommodityUpdate},
            { path: '/StoreAllOrders', name: '所有订单', component: StoreAllOrders},
            {path: '/StoreUnSendOrders', name:'StoreUnSendOrders', component: StoreUnSendOrders},
            {path: '/StoreSendOrders', name:'StoreSendOrders', component: StoreSendOrders},

        ]
    },

    { path: '/Home',
      component: Home,
      name:'用户管理',
      show:true,
      children:[
        { path: '/UserManage',
          name: '查询所有用户',
          component: UserManage,
        },

        { path: '/UserUpdate',
          name: '修改用户',
          component: UserUpdate,
        },{ path: '/CommodityManage',
              name: '查询所有用户',
              component: CommodityManage,
          },
          { path: '/AddCommodity',
              name: '添加商品',
              component: AddCommodity,
          },

      ]
    },


]
let router = new VueRouter({
    routes
})

export default router
