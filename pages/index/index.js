// 0 引入用来发送请求的方法一定要把路径补全
import {
  request
} from "../../request/index.js"

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: [],
  },
  // 页面开始加载，就会触发
  onLoad: function (option) {
    // 1 发送异步请求获取轮播图数据
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList() {
    request({
        url: "/home/swiperdata"
      })
      .then(result => {
        result.forEach((v, i) => {
          result[i].navigator_url = v.navigator_url.replace('main', 'index');
        });
        this.setData({
          swiperList: result
        })
      })
  },

  // 获取分类导航数据
  getCateList() {
    request({
        url: "/home/catitems"
      })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },

  // 获取楼层数据
  getFloorList() {
    request({
        url: "/home/floordata"
      })
      .then(result => {
        for (let k = 0; k < result.length; k++) {
          result[k].product_list.forEach((v, i) => {
            result[k].product_list[i].navigator_url = v.navigator_url.replace('?', '/index?');
          });
        }

        this.setData({
          floorList: result
        })
      })
  }

});