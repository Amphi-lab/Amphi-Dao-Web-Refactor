import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
    currentLanguages,
    translationTypes,
    industry,
    jobFunctions
} from '@/constants/selcet.json';
import UploadFile from '@/components/UploadFile';
import AmSelect from '@/components/Form/Select';
import AmDateTimePiker from '@/components/Form/DateTimePicker';
import styles from './index.module.scss';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const RequestForm: React.FC = () => {
    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className={styles['request-trans-form']}
            layout='vertical'
        >
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item
                        label='Translate From'
                        name='from'
                        rules={[
                            {
                                required: true,
                                message: 'Please Input our Translation Translate From!'
                            }
                        ]}
                    >
                        <AmSelect options={currentLanguages} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Translate To'
                        name='to'
                        rules={[{ required: true, message: 'Please Input Your Translate To!' }]}
                    >
                        <AmSelect options={currentLanguages} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label='Service Type'
                        name='to'
                        rules={[{ required: true, message: 'Please Input Your Service Type!' }]}
                    >
                        <AmSelect options={translationTypes} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label='Write a brief sentense about your project'
                name='to'
                rules={[{ required: true, message: 'Please Input Your Service Type!' }]}
            >
                <Input showCount maxLength={20} />
            </Form.Item>
            <Form.Item
                label='Upload the file you need to translate'
                name='to'
                rules={[
                    { required: true, message: 'Please Upload the file you need to translate!' }
                ]}
            >
                <UploadFile />
            </Form.Item>
            <Form.Item
                label='Instructions for Translator'
                name='to'
                rules={[{ required: true, message: 'Please Input Your Service Type!' }]}
            >
                <TextArea
                    placeholder='Please provide a detailed description of your expectations, specific requirements, or any other relevant information for the translation project.'
                    allowClear
                    showCount
                    maxLength={1000}
                />
            </Form.Item>
            <Form.Item
                label='What kind of work experience do you expect translators to have?'
                name='to'
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <AmSelect options={industry} />
                    </Col>
                    <Col span={12}>
                        <AmSelect options={jobFunctions} />
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item
                label='When would you like to receive the documents?'
                name='to'
                rules={[{ required: true, message: 'Please Input Your Service Type!' }]}
            >
                <AmDateTimePiker />
            </Form.Item>
            <Form.Item label='Bounty' name='to'>
                <Col span={12}>
                    <Input suffix='USDT' />
                </Col>
            </Form.Item>
            <Form.Item
                label='Your Email'
                name='to'
                rules={[{ required: true, message: 'Please Input Your Service Type!' }]}
            >
                <Col span={12}>
                    <Input />
                </Col>
            </Form.Item>

            {/* <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
                Submit
            </Button>
        </Form.Item> */}
        </Form>
    );
};

export default RequestForm;
