import React,{useEffect,useState} from 'react';
import { Col, Row, Card ,Table } from 'antd';
import './home.css'
import { getData } from '../../api/index'
import * as Icons from "@ant-design/icons";
import MyEcharts from '../../components/Echarts/index.js'


 //table列的数据
const columns = [
        {
            title: '课程',
            dataIndex: 'name'
        },
        {
            title: '今日购买',
            dataIndex: 'todayBuy'
        },
        {
            title: '本月购买',
            dataIndex: 'monthBuy'
        },
        {
            title: '总购买',
            dataIndex: 'totalBuy'
        }
        ]
//订单统计
const countData = [
    {
        "name": "今日支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "今日收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "今日未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "本月支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "本月收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "本月未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    }
    ]
//动态获取icon
const iconToElement =(name)=>React.createElement(Icons[name])
const Home = () => {
    const userImages = require('../../assets/images/1.png')
    //echarts响应数据
    const [echartsData,setEchartsData] = useState([])
    //dom首次渲染完成
    useEffect(()=>{
        getData().then(({data})=>{
            console.log(data,'res')
            const {tableData,orderData,userData,videoData} = data.data
            setTableData(tableData)
            //对于echarts数据的处理
            const order = orderData
            //x轴数据
            const xData = order.date
            //series数据组装
            const keyArray = Object.keys(order.data[0])
            const series = []
            keyArray.forEach(key =>{
                series.push({
                    name:key,
                    data:order.data.map(item=>item[key]),
                    type:'line',//折线图
                })
            })
            setEchartsData({
                order:{
                    xData,
                    series
                },
                user:{
                    xData:userData.map(item=>item.data),
                    series:[
                        {
                            name:'新增用户',
                            data:userData.map(item=>item.new),
                            type:'bar',//柱状图
                        },
                        {
                            name:'活跃用户',
                            data:userData.map(item=>item.active),
                            type:'bar',//柱状图
                        }
                    ]
                },
                video:{
                    series:[
                        {
                            data:videoData,
                            type:'pie',//饼图
                        }
                    ]
                }
            })
        })
       
        
    },[])
    
    
    // 表格数据
    const [tableData,setTableData] = useState([])
   
    return (
        <Row className="home">
            <Col span={8}>
                <Card className="user-card"  hoverable>
                    <div className="user">
                        <img src={userImages} alt="" />
                        <div className="userinfo">
                            <p className="name">Admin</p>
                            <p className="role">超级管理员</p>
                        </div>
                    </div>
                    <div className="login-info">
                        <p>上次登录时间：<span>2026-06-01</span></p>
                        <p>当前登录地点：<span>郑州</span></p>
                    </div>
                </Card>
                <Card hoverable>
                    <Table rowKey={"name"} columns={columns} dataSource={tableData} pagination={false} />
                </Card>
            </Col>
            <Col span={16}>
                <div className="num">
                    {
                        countData.map((item,index)=>{
                            return (
                               <Card key={index} hoverable>
                                 <div className="icon-box" style={{backgroundColor:item.color}}>
                                     {iconToElement(item.icon)}
                                 </div>
                                 <div className="detail">
                                    <p className="numb">¥ {item.value}</p>
                                    <p className="txt">{item.name}</p>
                                 </div>
                               </Card>
                            )
                        })
                    }
                </div>
                {echartsData.order && <MyEcharts style={{height:"280px"}} chartData={echartsData.order} />} 
                <div className="graph" >
                    { echartsData.user && <MyEcharts style={{height:"240px",width:"50%"}} chartData={echartsData.user} /> }
                    { echartsData.video && <MyEcharts style={{height:"240px",width:"50%"}} isAxisChart={false} chartData={echartsData.video} /> }
                 </div>
            </Col>
        </Row>
    )
}

export default Home;
