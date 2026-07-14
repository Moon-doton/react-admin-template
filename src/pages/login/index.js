import React from 'react'
import './index.css'
import {Form,Input,Button,message} from 'antd';
import { getMenu } from '../../api/index';
import { useNavigate,Navigate } from 'react-router-dom';

const Login = () =>{
    const navigate = useNavigate()
    //在登陆状态下，跳转到首页home
    if(localStorage.getItem('token')){
        return <Navigate to="/home" replace />
    }
    const handleSubmit = (val) => {
        //登录校验
        //1.账号和密码不能为空
        if(!val.username || !val.password){
            return message.open({
                type:'warning',
                content:'请输入账号和密码',
            })
        }
        //2.登录接口
        getMenu(val).then(({data}) => {
            console.log(data);
            // localStorage.setItem('token',data.data.token)
           // navigate('/home')
           if(data.code === 20000){
                localStorage.setItem('token',data.data.token)
                navigate('/home')
            }else{
                message.open({
                    type:'error',
                    content:data.data.message || '登录失败',
                })
            }
        })
    }
    return(
       <Form className="login-container" onFinish={handleSubmit}>
         <div className="login_title">系统登录</div>
        < Form.Item 
            label="账号"
            name="username"
        > 
            <Input type="text" placeholder="请输入账号" />
        </Form.Item>
        < Form.Item 
            label="密码"
            name="password"
        > 
            <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item className="login-button">
            <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
       </Form>
    )
}
 
export default Login