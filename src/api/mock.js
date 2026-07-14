import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
import mallApi from './mockServeData/mall'

// //拦截接口
// Mock.mock(/home\/getData/,homeApi. getStatisticalData)
// Mock.mock(/user\/getUser/,userApi. getUserList)

// Mock.mock(/user\/addUser/,'post',userApi.createUser)
// Mock.mock(/user\/editUser/,'post',userApi. updateUser)

// Mock.mock(/user\/delUser/,'post',userApi.deleteUser)

// //登录接口
// Mock.mock(/login\/login/,'post',permissionApi.getMenu)

//拦截接口
Mock.mock(/api\/home\/getData/,homeApi. getStatisticalData)
Mock.mock(/api\/user\/getUser/,userApi. getUserList)

Mock.mock(/api\/user\/addUser/,'post',userApi.createUser)
Mock.mock(/api\/user\/editUser/,'post',userApi. updateUser)

Mock.mock(/api\/user\/delUser/,'post',userApi.deleteUser)   

//登录接口
Mock.mock(/api\/login\/login/,'post',permissionApi.getMenu)

//商品接口
Mock.mock(/api\/mall\/getMall/,mallApi.getMallList)
Mock.mock(/api\/mall\/addMall/,'post',mallApi.createMall)
Mock.mock(/api\/mall\/editMall/,'post',mallApi.updateMall)
Mock.mock(/api\/mall\/delMall/,'post',mallApi.deleteMall)