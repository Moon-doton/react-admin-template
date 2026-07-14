import http from './axios'

// 首页数据
export const getData = () =>{
    return http.request({
        url:'/home/getData',
        method:'get',
    })
}
// 用户数据
export const getUser = (params) =>{
    return http.request({
        url:'/user/getUser',
        method:'get',
        params,
    })
}
// 添加用户
export const addUser = (data) =>{
    return http.request({
        url:'/user/addUser',
        method:'post',
        data,
    })
}
// 编辑用户
export const editUser = (data) =>{    
        return http.request({
            url:'/user/editUser',
            method:'post',
            data,
        })
}
// 删除用户
export const delUser = (data) =>{
    return http.request({
        url:'/user/delUser',
        method:'post',
        data,
    })
}
// 登录
export const login = (data) =>{
    return http.request({
        url:'/login/login',
        method:'post',
        data,
    })
}
// 商品数据
export const getMall = (params) =>{
    return http.request({
        url:'/mall/getMall',
        method:'get',
        params,
    })
}
// 添加商品
export const addMall = (data) =>{
    return http.request({
        url:'/mall/addMall',
        method:'post',
        data,
    })
}
// 编辑商品
export const editMall = (data) =>{
    return http.request({
        url:'/mall/editMall',
        method:'post',
        data,
    })
}
// 删除商品
export const delMall = (data) =>{
    return http.request({
        url:'/mall/delMall',
        method:'post',
        data,
    })
}
// 获取菜单login
export const getMenu = (data) =>{
    return http.request({
        url:'/menu/getMenu',
        method:'post',
        data,
    })
}