import React, { useState } from 'react'
import { Form, Input, Button, Switch, Card, Divider, message, Upload, Select } from 'antd'
import { UploadOutlined, SaveOutlined } from '@ant-design/icons'

const PageTwo = () => {
    const [loading, setLoading] = useState(false)

    const handleFinish = (values) => {
        setLoading(true)
        console.log('系统设置:', values)
        setTimeout(() => {
            setLoading(false)
            message.success('设置保存成功')
        }, 600)
    }

    return (
        <div style={{ maxWidth: 800 }}>
            <Form
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    siteName: '通用后台管理系统',
                    siteDesc: '基于 React + Ant Design 的企业级后台管理模板',
                    allowRegister: true,
                    allowComment: true,
                    emailNotice: false,
                    smsNotice: true,
                    uploadType: 'local',
                }}
            >
                <Card title="基本信息" style={{ marginBottom: 16 }}>
                    <Form.Item label="网站名称" name="siteName" rules={[{ required: true, message: '请输入网站名称' }]}>
                        <Input placeholder="请输入网站名称" />
                    </Form.Item>
                    <Form.Item label="网站简介" name="siteDesc">
                        <Input.TextArea rows={3} placeholder="请输入网站简介" />
                    </Form.Item>
                    <Form.Item label="Logo 上传" name="logo" valuePropName="fileList" getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}>
                        <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>上传 Logo</Button>
                        </Upload>
                    </Form.Item>
                </Card>

                <Card title="功能开关" style={{ marginBottom: 16 }}>
                    <Form.Item label="开放注册" name="allowRegister" valuePropName="checked">
                        <Switch checkedChildren="开" unCheckedChildren="关" />
                    </Form.Item>
                    <Form.Item label="评论功能" name="allowComment" valuePropName="checked">
                        <Switch checkedChildren="开" unCheckedChildren="关" />
                    </Form.Item>
                </Card>

                <Card title="通知配置" style={{ marginBottom: 16 }}>
                    <Form.Item label="邮件通知" name="emailNotice" valuePropName="checked">
                        <Switch checkedChildren="开" unCheckedChildren="关" />
                    </Form.Item>
                    <Form.Item label="短信通知" name="smsNotice" valuePropName="checked">
                        <Switch checkedChildren="开" unCheckedChildren="关" />
                    </Form.Item>
                </Card>

                <Card title="存储配置">
                    <Form.Item label="文件上传方式" name="uploadType">
                        <Select
                            options={[
                                { label: '本地存储', value: 'local' },
                                { label: '阿里云 OSS', value: 'oss' },
                                { label: '七牛云', value: 'qiniu' },
                            ]}
                        />
                    </Form.Item>
                </Card>

                <Divider />
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading} size="large">
                    保存设置
                </Button>
            </Form>
        </div>
    )
}

export default PageTwo