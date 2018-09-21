//index.js
//获取应用实例
const app = getApp()
console.log(app)
var initialData = {
  name: 'taobao'
};

//引用外部js文件的方法，切记不能使用绝对路径，只能使用相对路径
var common = require("../../utils/commen.js")
console.log(common)
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'https://cn.ucloudlink.com/uploads/cms/20170309/201703091808019174.jpg',
      'https://cn.ucloudlink.com/uploads/cms/20170309/201703091807495418.jpg',
      'https://cn.ucloudlink.com/uploads/cms/20170309/201703091807366550.jpg'
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //扫一扫
  scanCode(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  //获取经纬度
  getLocation(){
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
      }
    })
  },
  //页面触底时触发，需在app.json的window中设置onReachBottomDistance的值
  onReachBottom(){
    this.setData({
      motto:"你好世界"
    },() => {
      this.getLocation()
    })
    // this.data.motto = "赵德升"
  },
  //小程序自我分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index?id=123'
    }
  },
  //点击tap的时候触发，显示当前tap的信息
  onTabItemTap(item) {
    console.log(item)
  },
  //页面初次加载时打印页面路径
  onShow: function () {
    console.log(this.route)
  },
  //跳路由
  goRoute(){
    wx.navigateTo({
      url: '/pages/route/route?id=1'
      // url: '/pages/index/index'
    });
    // wx.switchTab({
    //   url: '/pages/logs/logs'
    // });
    //  wx.reLaunch({
    //    url: '/pages/logs/logs',
    //  })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
