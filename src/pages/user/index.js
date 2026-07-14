import React ,{useEffect,useState} from 'react';
import { Button ,Form ,Input ,Table, Popconfirm, Modal,InputNumber,Select,
    DatePicker , Tag 
} from 'antd'
import './user.css'
import { getUser,addUser,editUser,delUser} from '../../api/index'
import dayjs from 'dayjs'

const User = () => {
    const [listData,setListData] = useState({
        name:''
    })
    //form实例
    const [form] = Form.useForm();
    const [tableData,setTableData] = useState([])
    //新增用户弹窗
    const [modalType ,setModalType] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    //新增编辑按钮
    const handleClick = (type,rowData)=>{
        setIsModalOpen(!isModalOpen)
        if(type === 'add'){
            setModalType(0)
        }else if(type === 'edit'){  
            setModalType(1)
            const cloneData = JSON.parse(JSON.stringify(rowData))
            //将出生日期转换为dayjs对象
            cloneData.birth = dayjs(cloneData.birth)
            //表单数据回填
            form.setFieldsValue(cloneData)
        }
    }
    //提交
    const handleFinish = (e)=>{
        setListData({
            name:e.name,
        })
        console.log(e)
    }
    useEffect(()=>{
        getTableData()
    },[listData])

    //删除
    const handleDelete = ({id})=>{
        delUser({id}).then(()=>{
            getTableData()
        })
    }

    const getTableData=()=>{
        getUser(listData).then(({data})=>{
            console.log(data.list ,'res')
            setTableData(data.list)
        })
    }
    //确认提交
    const handleOk = ()=>{
        //表单校验
        form.validateFields().then((values)=>{
            // console.log(values)
            //将出生日期转换为字符串格式
            values.birth = dayjs(values.birth).format('YYYY-MM-DD')
            // console.log(values)
            //调后端接口
            if(modalType){//编辑
                editUser(values).then(()=>{
                    handleCancel()
                    getTableData()
                })
            }else{//新增
                 addUser(values).then(()=>{
                    handleCancel()
                    getTableData()
                })
            }
        }).catch((error)=>{
            console.log('表单校验失败',error)
        })
    }
    //弹窗取消
    const handleCancel = ()=>{
        setIsModalOpen(false)
        form.resetFields()
    }
    const columns = [
        {
            title:'姓名',
            dataIndex:'name',

        },
        {
            title:'年龄',
            dataIndex:'age',
        },
        {
            title:'性别',
            dataIndex:'sex',
            render:(val)=>{
                return val ? '女':'男'
            }
        },
        {
            title:'出生日期',
            dataIndex:'birth',
        },
        {
            title:'地址',
            dataIndex:'addr',
        },
        {
            title:'操作',
            render: (rowData) => {
                return (
                    <div className="flex-box">
                        <Button style={{marginRight:'55px'}} onClick={()=>{ handleClick('edit',rowData)}}>编辑</Button>
                        <Popconfirm 
                            title="提示？"
                            description="此操作将会删除用户,是否继续？"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={()=>{ handleDelete(rowData) }}
                        > 
                             <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
    useEffect(()=>{
        //调用后端接口获取用户列表数据
        getTableData()
    },[])

    return (
        <div className= "user">
            <div className= "flex-box space-between">
                <Button type="primary" onClick={()=>{ handleClick('add')}}>+新增</Button>
                <Form  
                    layout="inline"
                    onFinish={handleFinish}
                    >
                    <Form.Item name= "keyword">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table columns={columns} dataSource={tableData} rowKey={"id" } style={{marginTop:'10px'}}/>
            <Modal
                open={isModalOpen}
                title={modalType ? '编辑用户' : '新增用户'}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                
            >
                <Form
                    form={form}
                    labelCol={{
                        span:6,
                    }}
                    wrapperCol={{
                        span:18,
                    }}
                    labelAlign="left"
                >
                    {
                        modalType == 1 &&
                            <Form.Item 
                                name="id" 
                                hidden={true}
                            >
                                <Input />
                            </Form.Item>
                          
                    }
              
                    <Form.Item 
                        name="name" 
                        label="姓名"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名',
                            },
                        ]}
                    >
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item 
                        name="age" 
                        label="年龄"
                        rules={[
                            {
                                required: true,
                                message: '请输入年龄',
                            },
                            {
                                type:'number',
                                message:'请输入数字',
                            }
                        ]}
                    >
                        <InputNumber placeholder="请输入年龄" />
                    </Form.Item>
                     <Form.Item 
                        name="sex" 
                        label="性别"
                        rules={[
                            {
                                required: true,
                                message: '请输入性别',
                            },
                        ]}
                    >
                        <Select 
                            options={[
                                { label:'男', value:0,},
                                {label:'女',value:1,}
                            ]}
                            placeholder="请选择性别" 
                            
                        />
                    </Form.Item>
                    <Form.Item 
                        name="birth" 
                        label="出生日期"
                        rules={[
                            {
                                required: true,
                                message: '请输入出生日期',
                            },
                        ]}
                    >
                        <DatePicker placeholder="请输入出生日期" format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item 
                        name="addr" 
                        label="地址"
                        rules={[
                            {
                                required: true,
                                message: '请输入地址',
                            },
                        ]}
                    >
                        <Input placeholder="请输入地址" />
                    </Form.Item>


                </Form>
            </Modal>
        </div>
    )
}

export default User;
