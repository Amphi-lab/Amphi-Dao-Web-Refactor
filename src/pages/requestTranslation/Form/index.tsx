import React from 'react';
import type { DatePickerProps } from 'antd';
import { Form, Input, Row, Col, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import type { RangePickerProps } from 'antd/es/date-picker';

import {
    currentLanguages,
    translationTypes,
    industry,
    jobFunctions
} from '@/constants/selcet.json';
import UploadFile from '@/components/UploadFile';
import AmSelect from '@/components/Form/Select';
import AmDateTimePiker from '@/components/Form/DateTimePicker';
import { getTimeZoneName, formatFileList, getTotalWorkload } from '@/utils/util';
import api from '@/api';
import styles from './index.module.scss';

const RequestForm: React.FC = () => {
    const [form] = Form.useForm();

    const saveOrder = async (parmas: any) => {
        api.saveOrder(parmas).then((res: any) => {
            console.log(res);
        });
    };

    const onFinish = (values: any) => {
        const finalParams = {
            ...values,
            aiBounty: 1000,
            humanBounty: 1000,
            bounty: Number(values.bounty)
            // translationFiles: formatFileList(values.translationFiles.fileList)
        };
        console.log('Success:', values);
        console.log(finalParams);

        saveOrder(finalParams);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleSelectChange = (value: string, opiton: any) => {
        form.setFieldValue(opiton, value);
        console.log(value, opiton);
    };

    const hanldeDateChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string
    ) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        form.setFieldValue('deadline', dateString);
    };

    const handleFileChange = (info: { file: { name?: any; status?: any }; fileList: any }) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
            // console.log(info);
        }
        if (status === 'done') {
            console.log(getTotalWorkload(info.fileList));
            form.setFieldValue('translationFiles', formatFileList(info.fileList));

            // console.log(form.getFieldValue('translationFiles'));
        }
        // if (status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        // } else if (status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }
    };

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
                            onChange={handleSelectChange}
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
                            onChange={handleSelectChange}
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
                            onChange={handleSelectChange}
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
                    allowClear
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
                <UploadFile onChange={handleFileChange} />
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
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item name='industry'>
                            <AmSelect
                                options={industry}
                                placeholder='please select industry'
                                onChange={handleSelectChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='jobFunction'>
                            <AmSelect
                                options={jobFunctions}
                                placeholder='please select jobFunction'
                                onChange={handleSelectChange}
                            />
                        </Form.Item>
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
                        <AmDateTimePiker
                            placeholder='please select deadline'
                            onChange={hanldeDateChange}
                        />
                    </Col>
                    <Col span={12}>
                        <Input readOnly value={getTimeZoneName()} disabled />
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
                // rules={[{ message: 'Please Input Number!', type: 'number' }]}
                name='bounty'
            >
                <Col span={12}>
                    <Input
                        type='number'
                        addonAfter='USDT'
                        min={0}
                        placeholder='please enter bounty'
                    />
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
                rules={[
                    { required: true, message: 'The email format is incorrect', type: 'email' }
                ]}
            >
                <Col span={12}>
                    <Input type='email' placeholder='please enter email' allowClear />
                </Col>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RequestForm;
