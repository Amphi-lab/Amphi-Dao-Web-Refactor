import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, Row, Col, Radio, Modal } from 'antd';
// import { useAccount } from 'wagmi';
import {
    industry as IndustryOptions,
    jobFunctions as JobFunctionsOptions,
    competitionlanguages as CompetitionLanguages,
    certificationOptions as CertificationOptions
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

import storage from '@/utils/storage';
// import { useEmailVerificationRequest } from '@dynamic-labs/sdk-react';
import discordIocn from '@/assets/svg/icon-discord.svg';
import telegramIcon from '@/assets/svg/telegram.svg';
import AddMember from '@/pageComponents/AddMember';
import styles from './index.module.scss';


const { verifiedCredentials, email } = storage.getLocalStorage('dynamic_authenticated_user') && storage.getLocalStorage('dynamic_authenticated_user');
const { address } = verifiedCredentials && verifiedCredentials[0]

type IUserInfoProps =
    | IUserInfo
    | (Omit<IUserInfo, 'id' | 'industry' | 'jobFunction'> & {
        industryBackground: string[];
        jobFunction: string[];
    });
const initialValue: IUserInfoProps = {
    address: '',
    wallet: address || '',
    name: '',
    email: email || '',
    profile: '',
    backgroundUrl: '',
    industryBackground: [],
    jobFunction: [],
    languages: []
};

export default () => {
    const handleDiscordClick = () => { window.open('https://discord.gg/vgG22sb6Tb', '_blank'); };

    const handleTelegramClick = () => { window.open('https://t.me/+-7mw_Qqv47w4YzFl', '_blank'); }; // Replace with your Telegram URL

    const [form] = Form.useForm();
    // const { address } = useAccount();
    const [userId, setUseId] = useState<number | undefined>(undefined);
    const [role, setRole] = useState<string | undefined>(undefined);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // console.log(address, 'address');
    // console.log(verifiedCredentials,'userInfo');
    // console.log(storage.getLocalStorage('dynamic_authenticated_user'),'')
    // const { verifyEmail } = useEmailVerificationRequest();
    // const [defaultWalletAddress, setDefaultWalletAddress] = useState(address);
    // const [defaultEmail, setDefaultEmai] = useState(email);

    // const handleVerify = async (verificationToken: string) => {
    //     try {
    //       const verifyEmailResponse = await verifyEmail(verificationToken);
    //       console.log(verifyEmailResponse);
    //       // Handle successful email verification, e.g., show a success message or redirect
    //     } catch (error) {
    //       // Handle errors, e.g., show an error message or prompt for the correct token
    //     }
    //   };

    // useEffect( () => {
    //     setDefaultWalletAddress(address);
    //     setDefaultEmai(email)
    // })

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
                        jobFunction: optionsToArray(userInfo.jobFunction, JobFunctionsOptions),
                        language: optionsToString(userInfo.competitionlanguages, CompetitionLanguages),
                        level: optionsToString(userInfo.certificationOptions, CertificationOptions)
                    };
                    form.setFieldsValue(params);
                }
            });
        }
    }, [address, form]);

    // languagesArray example
    const languagesArray = [
        { language: 'English', level: 'Advanced' },
        { language: 'Spanish', level: 'Intermediate' }
        // 其他语言和级别
    ];

    // const industryBackgroundAsString = values.industryBackground.join(',');

    const onFinish = (values: any) => {
        console.log(values);
        api.competRegistration({
            // id: userId,
            address,
            ...values,
            industry: optionsToString(values.industry, IndustryOptions),
            jobFunction: optionsToString(values.jobFunction, JobFunctionsOptions),

            // language: optionsToString(values.competitionlanguages, CompetitionLanguages),
            // level: optionsToString(values.certificationOptions, CertificationOptions),
            // 将构建好的数组传递给后端
            languages: languagesArray.map(() => ({
                language: optionsToString(values.language, CompetitionLanguages),
                level: optionsToString(values.level, CertificationOptions)
            }))
        }).then((res: any) => {
            if (res?.code === 200) {
                message.success('success');
            } else {
                message.error(res.message);
            }
        });
    };

    // const emailChange = (value:any) => {
    //     console.log('djsklfjslfjsl')
    //     console.log(value);
    // }

    return (
        <>
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
                                    name='name'
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
                                    <Radio.Group onChange={e => setRole(e.target.value)}>
                                        <Radio value='apple'> Individual Coppetitor </Radio>
                                        <Radio value='pear'> Team Competitor</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {role === 'pear' && (
                                    <Form.Item >
                                        <AddMember />
                                    </Form.Item>
                                )}
                                <Form.Item name='languages' label='Languages'>
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
                                    <Input placeholder='Enter email' defaultValue={email} />
                                </Form.Item>
                                <Form.Item name='industryBackground' label='Relevant Work Experience'>
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
                                    initialValue={address}
                                    name='wallet'
                                    label='Verify your wallet'
                                    rules={[{ required: true, message: 'Please input username' }]}
                                >
                                    <Input placeholder='like 0x324fds083jduf84nhfs93l3jmfsujcd883jdnns6f' value={address} />
                                </Form.Item>
                                <Form.Item name='telegram' label='Telegram'>
                                    <Input />
                                    <div onClick={handleTelegramClick} style={{ cursor: 'pointer' }}>
                                        <img src={telegramIcon} alt="Telegram Icon" />
                                    </div>
                                </Form.Item>

                                <Form.Item name='discord' label='Discord'>
                                    <Input />
                                    <div onClick={handleDiscordClick} style={{ cursor: 'pointer' }}>
                                        <img src={discordIocn} alt="Discord Icon" />
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <Button type='primary' htmlType='submit' onClick={showModal}>
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
            <Modal title="" cancelText="Cancel" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Please verify that the information is accurate.
                    The prize will be sent to you via email.</p>
            </Modal>
        </>
    );
};
