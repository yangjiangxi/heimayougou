import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  login
} from "../../utils/asyncWx.js";

Page({
  async handleGetUserInfo(e) {
    // 1获取用户信息
    try {
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail;
      // 2获取小程序登录成功后的code
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      };
      // 3发送请求获取用户的token
      const {
        token
      } = await request({
        url: "/users/wxlogin",
        data: loginParams,
        method: "post"
      });
      // 4把token存入缓存中，同时调转回上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error)
    }

  }
})