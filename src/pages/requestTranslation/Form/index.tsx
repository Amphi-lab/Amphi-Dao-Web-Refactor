import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { Form, Input, Row, Col, Button, message } from 'antd';
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
import { useAppDispatch } from '@/store/hooks';
import { getWorkload, getTransLang, getServiceType } from '@/store/reducers/requestTransSlice';
import styles from './index.module.scss';

const RequestForm: React.FC = () => {
    const [form] = Form.useForm();
    const [totalWorkLoad] = useState(0);
    const [fileList, setFileList] = useState([]);
    const dispatch = useAppDispatch();

    const saveOrder = async (parmas: any) => {
        api.saveOrder(parmas).then((res: any) => {
            console.log(res);
        });
    };

    // save form handler funciton
    const onFinish = (values: any) => {
        const finalParams = {
            ...values,
            aiBounty: 1000,
            humanBounty: 1000,
            bounty: Number(values.bounty),
            translationFiles: formatFileList(values.translationFiles.fileList)
        };
        console.log('Success:', values);
        console.log(totalWorkLoad, 'totalWorkLoad');
        console.log('finalParams', finalParams);
        console.log('workload', getTotalWorkload(fileList as any));
        saveOrder(finalParams);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // select change hanlder funciton
    // eslint-disable-next-line no-unused-vars
    const handleSelectChange = (value: string, opiton: any) => {
        // get summary Translation Language
        dispatch(
            getTransLang({
                from: form.getFieldValue('sourceLang'),
                to: form.getFieldValue('targetLang')
            })
        );
        dispatch(getServiceType(form.getFieldValue('translationType')));
    };

    // date-time change hanlder funciton
    const hanldeDateChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string
    ) => {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
        form.setFieldValue('deadline', dateString);
    };

    // file-upload change hanlder funciton
    const handleFileChange = (info: { file: any; fileList: [] }) => {
        const { status, response } = info.file;
        if (info.fileList.length > 10) {
            message.error('A maximum of 10 files can be uploaded !');
            return false;
        }
        if (status === 'done') {
            if (response?.code === 200) {
                message.success(`${info.file.name} file uploaded successfully.`);
                setFileList(info.fileList);
                dispatch(getWorkload(info.fileList));
            } else if (response?.status === 403) {
                info.file.status = 'error';
                message.warning(`Please Log in and try again`);
            }
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        if (status === 'removed') {
            dispatch(getWorkload(info.fileList));
        }
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
                tooltip='A maximum of 10 files can be uploaded'
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
