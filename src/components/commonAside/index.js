import React from 'react';
import MenuConfig from '../../config';
import * as Icons from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { selectMenuList } from '../../store/reducers/tab'

const { Sider } = Layout;

//动态获取菜单数据icon
const iconToElement =(name)=>React.createElement(Icons[name])
//处理菜单数据
const items = MenuConfig.map((item) => {
    //没有子菜单
    const child = {
        key:item.path,
        icon:iconToElement(item.icon),
        label:item.label,
    }
    //有子菜单
    if(item.children){
        child.children = item.children.map((childItem)=>{
            return {
                key:childItem.path,
               // icon:iconToElement(childItem.icon),
                label:childItem.label,
            }
        })
    }
    return child;
})

const CommonAside = ({collapsed}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //添加数据到store方法
    const setTabList = (val) => {
        dispatch(selectMenuList(val))
    }
  
   // console.log(collapsed,"commonAside")

    //点击菜单
    const selectMenu = (e)=>{
       console.log(e,'e')
        let data
        MenuConfig.forEach(item=>{
            //找到当前的数据
            if(item.path === e.keyPath[e.keyPath.length-1]){
                data = item
                //如果有二级菜单
                if(e.keyPath.length >1){
                    data = item.children.find(child =>{
                        return child.path == e.key
                    })
              }
            }
        })
        setTabList({
            path:data.path,
            name:data.name,
            label:data.label
        })
        navigate(e.key)
    }
    return (
         <Sider trigger={null}  collapsed={collapsed} >
            <h3 className="app-name">{collapsed?"系统":"通用后台管理系统"}</h3>
            <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={items}
                    style={{
                        height: "100%"
                    }}
                    onClick={selectMenu}
            />
      </Sider>   
    )
}
export default CommonAside;