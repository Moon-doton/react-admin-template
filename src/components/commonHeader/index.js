import React from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import './index.css'
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/tab'
import { useNavigate } from 'react-router-dom'



import { Button, Layout, Avatar, Dropdown } from "antd";
const { Header} = Layout;

const CommonHeader = ({collapsed}) => {
  const navigate = useNavigate()
  // 退出登录
    const logout = () => {
      //1.清空token
      localStorage.removeItem('token')
      //2.跳转到登录页
      navigate('/login')
    }
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" >
              个人中心
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick= {()=>{logout()}} target="_blank" rel="noopener noreferrer" >
              退出
            </a>
          ),
        }
    ];

    //创建dispath
    const dispatch = useDispatch();
  
    //点击展开收起按钮
    const setCollapsed = () => {
      console.log(collapsed)
      dispatch(collapseMenu())
    }
    return (
       <Header className='contain'>
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            style={{
              fontSize: "16px",
              width: 64,
              height: 32,
              backgroundColor: '#fff',
            }}
            onClick={()=>setCollapsed()}

          />
          <Dropdown
           menu={{ items }}
           >
            <Avatar size={36} src={<img src={require('../../assets/images/1.png')} /> } />
          </Dropdown>
        </Header>
    )
  }
  
export default CommonHeader;

