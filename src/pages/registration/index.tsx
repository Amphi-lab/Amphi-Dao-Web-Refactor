import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, Row, Col, Radio } from 'antd';
import { useAccount } from 'wagmi';
import {
    industry as IndustryOptions,
    jobFunctions as JobFunctionsOptions
} from '@/constants/selcet.json';
// components
import PageTitle from '@/components/PageTitle';
import UploadImage from '@/components/UploadImage';
import LanguageSelect from '@/components/LanguageSelect';
// types
import type IUserInfo from '@/types/IUserInfo';
// utils
import { optionsToArray, optionsToString } from '@/utils/userInfo';
// api
import api from '@/api';

import styles from './index.module.scss';

type IUserInfoProps =
    | IUserInfo
    | (Omit<IUserInfo, 'id' | 'industry' | 'jobFunction'> & {
          industry: string[];
          jobFunction: string[];
      });
const initialValue: IUserInfoProps = {
    address: '',
    username: '',
    email: '',
    profile: '',
    backgroundUrl: '',
    industry: [],
    jobFunction: [],
    languageList: []
};

export default () => {
    const [form] = Form.useForm();
    const { address } = useAccount();
    const [userId, setUseId] = useState<number | undefined>(undefined);

    useEffect(() => {
        /** TODO:
         * fetch useinfo 待测试
         */
        if (address) {
            api.getUserInfo({ address }).then((res: any) => {
                if (res?.code === 200) {
                    const userInfo = res.data;
                    if (userInfo?.id) setUseId(userInfo.id);
                    const params = {
                        ...userInfo,
                        industry: optionsToArray(userInfo.industry, IndustryOptions),
                        jobFunction: optionsToArray(userInfo.jobFunction, JobFunctionsOptions)
                    };
                    form.setFieldsValue(params);
                }
            });
        }
    }, [address, form]);

    const onFinish = (values: any) => {
        console.log(values);
        api.updateUserInfo({
            id: userId,
            address,
            ...values,
            industry: optionsToString(values.industry, IndustryOptions),
            jobFunction: optionsToString(values.jobFunction, JobFunctionsOptions)
        }).then((res: any) => {
            if (res?.code === 200) {
                message.success('success');
            } else {
                message.error(res.message);
            }
        });
    };

    return (
        <div className={styles['registration-container']}>
            <div className={styles['registration-wrap']}>
                <PageTitle
                    title='Registration Form'
                    align='center'
                    subTitle='please fill out this form with the required information'
                    style={{ background: 'unset' }}
                />
                <hr className={styles['registration-divider']} />
                <Form
                    form={form}
                    name='preferences'
                    layout='vertical'
                    autoComplete='off'
                    onFinish={onFinish}
                    initialValues={initialValue}
                >
                    <Row gutter={100}>
                        <Col span='12'>
                            <Form.Item
                                name='username'
                                label='Name'
                                rules={[{ required: true, message: 'Please input username' }]}
                            >
                                <Input placeholder='John Doe' />
                            </Form.Item>
                            <Form.Item
                                label='Role'
                                name='role'
                                rules={[{ required: true, message: 'Please select a role' }]}
                            >
                                <Radio.Group>
                                    <Radio value='apple'> Individual Coppetitor </Radio>
                                    <Radio value='pear'> Team Competitor</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='languageList' label='Languages'>
                                <LanguageSelect form={form} userId={userId} />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                label='Email Address'
                                rules={[
                                    { required: true, message: 'Please input email' },
                                    { type: 'email', message: 'Email Address is not valid email.' }
                                ]}
                            >
                                <Input placeholder='Enter email' />
                            </Form.Item>
                            <Form.Item name='industry' label='Relevant Work Experience'>
                                <Select
                                    mode='multiple'
                                    allowClear
                                    showSearch
                                    filterOption={(inputValue, option) => {
                                        if (option?.label) {
                                            const label = option.label?.toLowerCase();
                                            inputValue = inputValue.toLowerCase();
                                            return label.includes(inputValue);
                                        }
                                        return false;
                                    }}
                                    style={{ width: '100%' }}
                                    placeholder='Select industry background'
                                    options={IndustryOptions}
                                />
                            </Form.Item>
                            <Form.Item name='jobFunction'>
                                <Select
                                    mode='multiple'
                                    allowClear
                                    showSearch
                                    filterOption={(inputValue, option) => {
                                        if (option?.label) {
                                            const label = option.label?.toLowerCase();
                                            inputValue = inputValue.toLowerCase();
                                            return label.includes(inputValue);
                                        }
                                        return false;
                                    }}
                                    style={{ width: '100%' }}
                                    placeholder='Select job function'
                                    options={JobFunctionsOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                name='wallet'
                                label='Verify your wallet'
                                rules={[{ required: true, message: 'Please input username' }]}
                            >
                                <Input placeholder='0x324fds083jduf84nhfs93l3jmfsujcd883jdnns6f' />
                            </Form.Item>
                            <Form.Item name='wallet' label='Telegram'>
                                <Input />
                            </Form.Item>

                            <Form.Item name='wallet' label='Discord'>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>

                        <Col span='12'>
                            {/* Avatar */}
                            <Form.Item name='profile' label='Avatar'>
                                <UploadImage form={form} formField='profile' />
                            </Form.Item>

                            {/* Background Image */}
                            <Form.Item name='backgroundUrl' label='Background Image'>
                                <UploadImage
                                    form={form}
                                    formField='backgroundUrl'
                                    shape='shape'
                                    desc='Recommended 1440px x 300px Max Size: 50MB'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};