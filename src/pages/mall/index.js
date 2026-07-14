import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Input, Modal, Form, InputNumber, Select, Image, Tag, Popconfirm, message, Empty, Spin } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './mall.css'
import { getMall, addMall, editMall, delMall } from '../../api/index'
import { getBrandImage, brandOptions } from '../../config/brandImages'

const Mall = () => {
    const [form] = Form.useForm()
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalType, setModalType] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchName, setSearchName] = useState('')

    const getTableData = () => {
        setLoading(true)
        getMall({ name: searchName }).then(({ data }) => {
            setTableData(data.list)
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getTableData()
    }, [])

    const handleSearch = () => {
        getTableData()
    }

    const handleClick = (type, rowData) => {
        setIsModalOpen(true)
        if (type === 'add') {
            setModalType(0)
            form.resetFields()
        } else {
            setModalType(1)
            form.setFieldsValue(rowData)
        }
    }

    const handleDelete = ({ id }) => {
        delMall({ id }).then(() => {
            message.success('删除成功')
            getTableData()
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (modalType) {
                editMall(values).then(() => {
                    message.success('编辑成功')
                    handleCancel()
                    getTableData()
                })
            } else {
                addMall(values).then(() => {
                    message.success('添加成功')
                    handleCancel()
                    getTableData()
                })
            }
        })
    }

    // 选择品牌时自动填充对应图片
    const handleBrandChange = (brand) => {
        form.setFieldValue('image', getBrandImage(brand))
    }

    return (
        <div className="mall">
            <div className="mall-header">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick('add')}>
                    新增商品
                </Button>
                <div className="mall-search">
                    <Input.Search
                        placeholder="搜索商品名称或品牌"
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                        onSearch={handleSearch}
                        style={{ width: 280 }}
                        allowClear
                    />
                </div>
            </div>

            <Spin spinning={loading}>
                {tableData.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {tableData.map((item) => (
                            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    className="mall-card"
                                    cover={
                                        <div className="mall-card-img">
                                            <Image
                                                src={item.image}
                                                fallback={getBrandImage(item.brand)}
                                                preview={true}
                                                style={{ width: '100%', height: 180, objectFit: 'cover' }}
                                            />
                                        </div>
                                    }
                                    actions={[
                                        <EditOutlined key="edit" onClick={() => handleClick('edit', item)} />,
                                        <Popconfirm
                                            key="delete"
                                            title="确定删除该商品？"
                                            onConfirm={() => handleDelete(item)}
                                        >
                                            <DeleteOutlined style={{ color: '#ff4d4f' }} />
                                        </Popconfirm>
                                    ]}
                                >
                                    <Card.Meta
                                        title={
                                            <div className="mall-card-title">
                                                <span>{item.name}</span>
                                                <Tag color="blue">{item.brand}</Tag>
                                            </div>
                                        }
                                        description={
                                            <div className="mall-card-desc">
                                                <div className="mall-price">¥{item.price}</div>
                                                <div className="mall-stock">
                                                    库存：<span className={item.stock < 50 ? 'low-stock' : ''}>{item.stock}</span> 件
                                                </div>
                                                <div className="mall-desc-text">{item.description}</div>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description="暂无商品数据" />
                )}
            </Spin>

            <Modal
                open={isModalOpen}
                title={modalType ? '编辑商品' : '新增商品'}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                width={600}
            >
                <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} labelAlign="left">
                    {modalType === 1 && (
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item name="name" label="商品名称" rules={[{ required: true, message: '请输入商品名称' }]}>
                        <Input placeholder="请输入商品名称" />
                    </Form.Item>
                    <Form.Item name="brand" label="品牌" rules={[{ required: true, message: '请选择品牌' }]}>
                        <Select options={brandOptions} placeholder="请选择品牌" onChange={handleBrandChange} />
                    </Form.Item>
                    <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }, { type: 'number', message: '请输入数字' }]}>
                        <InputNumber prefix="¥" placeholder="请输入价格" style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item name="stock" label="库存" rules={[{ required: true, message: '请输入库存' }, { type: 'number', message: '请输入数字' }]}>
                        <InputNumber placeholder="请输入库存数量" style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item name="image" label="图片地址" rules={[{ required: true, message: '请输入图片地址' }]}>
                        <Input placeholder="请输入商品图片URL" />
                    </Form.Item>
                    <Form.Item name="description" label="商品描述">
                        <Input.TextArea rows={3} placeholder="请输入商品描述" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Mall