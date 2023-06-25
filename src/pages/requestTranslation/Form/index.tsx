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
                        label={<span className={styles['label-title']}>Translation From</span>}
                        name='sourceLang'
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Translation From Language!'
                            }
                        ]}
                    >
                        <AmSelect
                            options={currentLanguages}
                            placeholder='please Select Translation From Language!'
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<span className={styles['label-title']}>Translation To</span>}
                        name='targetLang'
                        rules={[
                            { required: true, message: 'Please Select Translate To Language!' }
                        ]}
                    >
                        <AmSelect
                            options={currentLanguages}
                            placeholder='please Select Translation To Language'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<span className={styles['label-title']}>Service Type</span>}
                        name='translationType'
                        rules={[{ required: true, message: 'Please Select Service Type!' }]}
                    >
                        <AmSelect
                            options={translationTypes}
                            placeholder='please select Service Type'
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label={
                    <span className={styles['label-title']}>
                        Write a brief sentense about your project
                    </span>
                }
                name='title'
                rules={[
                    {
                        required: true,
                        message: 'Please write a brief sentense about your project!'
                    }
                ]}
            >
                <Input
                    showCount
                    maxLength={20}
                    placeholder='please write a brief sentense about your project'
                />
            </Form.Item>
            <Form.Item
                label={
                    <span className={styles['label-title']}>
                        Upload the file you need to translate
                    </span>
                }
                name='translationFiles'
                rules={[
                    { required: true, message: 'Please Upload the files you need to translate!' }
                ]}
            >
                <UploadFile />
            </Form.Item>
            <Form.Item
                label={<span className={styles['label-title']}>Instructions for Translator</span>}
                name='instruction'
                rules={[
                    { required: true, message: 'Please Input Your Instructions for Translator!' }
                ]}
            >
                <TextArea
                    placeholder='Please provide a detailed description of your expectations, specific requirements, or any other relevant information for the translation project.'
                    allowClear
                    showCount
                    maxLength={1000}
                />
            </Form.Item>
            <Form.Item
                label={
                    <span className={styles['label-title']}>
                        What kind of work experience do you expect translators to have?
                    </span>
                }
                name='jobFunctiong'
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <AmSelect options={industry} placeholder='please select industry' />
                    </Col>
                    <Col span={12}>
                        <AmSelect options={jobFunctions} placeholder='please select jobFunctions' />
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item
                label={
                    <span className={styles['label-title']}>
                        When would you like to receive the documents?
                    </span>
                }
                name='deadline'
                rules={[{ required: true, message: 'Please select deadline!' }]}
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <AmDateTimePiker placeholder='please select deadline' />
                    </Col>
                    <Col span={12}>
                        <Input readOnly value='1111' />
                        {/* <AmDateTimePiker placeholder='please select deadline' /> */}
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item
                label={
                    <>
                        <span className={styles['label-title']}>Bounty</span>
                        <small className={styles['label-tip-message']}>
                            We will provide you with a reference price, and you can also modify the
                            price on your own, 1 USDT≈1 Dollar
                        </small>
                    </>
                }
                name='bounty'
            >
                <Col span={12}>
                    <Input suffix='USDT' placeholder='please enter bounty' />
                </Col>
            </Form.Item>
            <Form.Item
                className={styles['email-tip-message']}
                label={
                    <>
                        <span className={styles['label-title']}>Your Email</span>
                        <small className={styles['label-tip-message']}>
                            Your linked email will be automatically filled in here, and you can also
                            modify the email address.
                        </small>
                    </>
                }
                name='email'
                rules={[{ required: true, message: 'Please Input Your Email!' }]}
            >
                <Col span={12}>
                    <Input placeholder='please enter email' />
                </Col>
            </Form.Item>
        </Form>
    );
};

export default RequestForm;
