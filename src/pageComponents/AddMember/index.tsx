import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd'
import React from 'react';
import styles from './index.module.scss';

const AddMember = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Space>Members</Space>
            <Form
                name="form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles['form-wrapper']}
            >
                <Form.Item
                    name="username"
                    style={ {
                        width:'20%',
                        marginRight:'20px'
                    }}
                >
                    <Input placeholder='name'/>
                </Form.Item>

                <Form.Item
                    style={ {
                        width:'60%'
                    }}
                    name="address"
                >
                    <Input placeholder='Enter Members‘ Email and wallet address'/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add member
                    </Button>
                </Form.Item>
            </Form>

            <ul className={styles['memeber-list']}>
                <li><span className={styles['list-name']}>username</span><span className={styles['list-email']}>email</span><span className={styles['list-address']}>address</span><Button className={styles['list-btn']} icon={<DeleteOutlined />} type="link" block  >Delete</Button></li>
                {/* <li><span className={styles['list-name']}>username</span><span className={styles['list-address']}>address</span><Button className={styles['list-btn']} icon={<DeleteOutlined />} type="link" block  >Delete</Button></li> */}
            </ul>
        </>
    )
}

export default AddMember