import React, { useState } from 'react'
import { Table, Tag, Input, Select, DatePicker, Button, Space, Drawer, Descriptions } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const statusMap = {
    '待付款': { color: 'orange', text: '待付款' },
    '已付款': { color: 'blue', text: '已付款' },
    '已发货': { color: 'cyan', text: '已发货' },
    '已完成': { color: 'green', text: '已完成' },
    '已取消': { color: 'red', text: '已取消' },
}

const initData = [
    { id: 1, orderNo: 'DD20240701001', product: 'iPhone 15 Pro Max', customer: '张三', amount: 9999, status: '已完成', time: '2024-07-01 10:30:00', phone: '138****8888', address: '北京市朝阳区xxx路100号' },
    { id: 2, orderNo: 'DD20240701002', product: 'Mate 60 Pro', customer: '李四', amount: 6999, status: '已发货', time: '2024-07-02 14:20:00', phone: '139****6666', address: '上海市浦东新区xxx路200号' },
    { id: 3, orderNo: 'DD20240701003', product: 'Xiaomi 14 Pro', customer: '王五', amount: 4999, status: '已付款', time: '2024-07-03 09:15:00', phone: '137****9999', address: '深圳市南山区xxx路300号' },
    { id: 4, orderNo: 'DD20240701004', product: 'Galaxy S24 Ultra', customer: '赵六', amount: 8999, status: '待付款', time: '2024-07-04 16:45:00', phone: '136****3333', address: '广州市天河区xxx路400号' },
    { id: 5, orderNo: 'DD20240701005', product: 'OPPO Find X7', customer: '孙七', amount: 5999, status: '已取消', time: '2024-07-05 11:00:00', phone: '135****2222', address: '杭州市西湖区xxx路500号' },
    { id: 6, orderNo: 'DD20240701006', product: 'vivo X100 Pro', customer: '周八', amount: 4999, status: '已完成', time: '2024-07-06 08:30:00', phone: '134****1111', address: '成都市武侯区xxx路600号' },
    { id: 7, orderNo: 'DD20240701007', product: 'iPhone 15 Pro', customer: '吴九', amount: 8999, status: '已发货', time: '2024-07-07 13:20:00', phone: '133****0000', address: '南京市鼓楼区xxx路700号' },
    { id: 8, orderNo: 'DD20240701008', product: 'Redmi K70 Pro', customer: '郑十', amount: 3299, status: '已付款', time: '2024-07-08 17:00:00', phone: '132****7777', address: '武汉市洪山区xxx路800号' },
]

const PageOne = () => {
    const [data, setData] = useState(initData)
    const [searchText, setSearchText] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [currentOrder, setCurrentOrder] = useState(null)

    const handleSearch = () => {
        let result = initData
        if (searchText) {
            result = result.filter(item =>
                item.orderNo.includes(searchText) || item.product.includes(searchText) || item.customer.includes(searchText)
            )
        }
        if (statusFilter) {
            result = result.filter(item => item.status === statusFilter)
        }
        setData(result)
    }

    const handleReset = () => {
        setSearchText('')
        setStatusFilter('')
        setData(initData)
    }

    const showDetail = (record) => {
        setCurrentOrder(record)
        setDrawerVisible(true)
    }

    const columns = [
        { title: '订单号', dataIndex: 'orderNo', width: 160 },
        { title: '商品名称', dataIndex: 'product', width: 180 },
        { title: '客户', dataIndex: 'customer', width: 100 },
        {
            title: '金额', dataIndex: 'amount', width: 120,
            render: (val) => <span style={{ color: '#ff4d4f', fontWeight: 600 }}>¥{val}</span>
        },
        {
            title: '状态', dataIndex: 'status', width: 100,
            render: (val) => <Tag color={statusMap[val]?.color}>{val}</Tag>
        },
        { title: '下单时间', dataIndex: 'time', width: 180 },
        {
            title: '操作', width: 120,
            render: (_, record) => (
                <Button type="link" onClick={() => showDetail(record)}>查看详情</Button>
            )
        },
    ]

    return (
        <div>
            <Space style={{ marginBottom: 16 }} wrap>
                <Input
                    placeholder="搜索订单号/商品/客户"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 240 }}
                    allowClear
                />
                <Select
                    placeholder="订单状态"
                    value={statusFilter || undefined}
                    onChange={v => setStatusFilter(v)}
                    style={{ width: 140 }}
                    allowClear
                    options={Object.keys(statusMap).map(k => ({ label: k, value: k }))}
                />
                <RangePicker />
                <Button type="primary" onClick={handleSearch}>查询</Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 6, showTotal: total => `共 ${total} 条` }}
            />

            <Drawer
                title="订单详情"
                open={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                size={480}
            >
                {currentOrder && (
                    <Descriptions column={1} bordered size="middle">
                        <Descriptions.Item label="订单号">{currentOrder.orderNo}</Descriptions.Item>
                        <Descriptions.Item label="商品名称">{currentOrder.product}</Descriptions.Item>
                        <Descriptions.Item label="客户姓名">{currentOrder.customer}</Descriptions.Item>
                        <Descriptions.Item label="联系电话">{currentOrder.phone}</Descriptions.Item>
                        <Descriptions.Item label="收货地址">{currentOrder.address}</Descriptions.Item>
                        <Descriptions.Item label="订单金额">
                            <span style={{ color: '#ff4d4f', fontWeight: 600 }}>¥{currentOrder.amount}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="订单状态">
                            <Tag color={statusMap[currentOrder.status]?.color}>{currentOrder.status}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="下单时间">{currentOrder.time}</Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </div>
    )
}

export default PageOne