import React from 'react';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import styles from './index.module.scss';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const RequestForm: React.FC = () => (
    <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className={styles['request-trans-form']}
        layout='vertical'
    >
        <Row>
            <Col>
                <Form.Item
                    label='Translate From'
                    name='from'
                    rules={[
                        { required: true, message: 'Please Input our Translation Translate From!' }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    label='Translate To'
                    name='to'
                    rules={[{ required: true, message: 'Please Input Your Translate To!' }]}
                >
                    <Input.Password />
                </Form.Item>
            </Col>
        </Row>

        <Form.Item
            label='Service Type'
            name='to'
            rules={[{ required: true, message: 'Please Input Your Service Type!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
                Submit
            </Button>
        </Form.Item>
    </Form>
);

export default RequestForm;
