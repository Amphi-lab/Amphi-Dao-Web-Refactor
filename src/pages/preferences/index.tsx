import { Button, Form, Input, Select, message } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';
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

    useEffect(() => {
        /** TODO: 获取address
         * fetch useinfo 待测试
         */
        api.getUserInfo({ address: '' }).then((res: any) => {
            if (res?.code === 200) {
                const userInfo = res.data;
                form.setFieldsValue({
                    ...userInfo,
                    industry: optionsToArray(userInfo.industry, IndustryOptions),
                    jobFunction: optionsToArray(userInfo.jobFunction, JobFunctionsOptions)
                });
            }
        });
    }, [form]);

    const onFinish = (values: any) => {
        console.log(values);
        api.updateUserInfo({
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
        <>
            <PageTitle title='Profile Setting' />
            <div className='preferences-wrap'>
                <Form
                    form={form}
                    name='preferences'
                    layout='vertical'
                    autoComplete='off'
                    onFinish={onFinish}
                    style={{ width: 480 }}
                    initialValues={initialValue}
                >
                    {/* Avatar */}
                    <Form.Item name='profile' label='Avatar'>
                        <UploadImage form={form} formField='profile' />
                    </Form.Item>
                    {/* Background Image */}
                    <Form.Item name='backgroundUrl' label='Background Image'>
                        <UploadImage form={form} formField='backgroundUrl' shape='shape' />
                    </Form.Item>
                    <Form.Item
                        name='username'
                        label='Nickname'
                        rules={[{ required: true, message: 'Please input username' }]}
                    >
                        <Input placeholder='Enter username' />
                    </Form.Item>
                    <Form.Item name='languageList' label='Languages'>
                        <LanguageSelect form={form} />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='Email Address'
                        rules={[
                            { required: true, message: 'Please input email' },
                            { type: 'email' }
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
                    <Form.Item name='jobfunction'>
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
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
