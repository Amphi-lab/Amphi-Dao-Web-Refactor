// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, Select, message } from 'antd';
// import { useAccount } from 'wagmi';
// import './index.scss';
// import {
//     industry as IndustryOptions,
//     jobFunctions as JobFunctionsOptions
// } from '@/constants/selcet.json';
// // components
// import PageTitle from '@/components/PageTitle';
// import UploadImage from '@/components/UploadImage';
// import LanguageSelect from '@/components/LanguageSelect';
// // types
// import type IUserInfo from '@/types/IUserInfo';
// // utils
// import { optionsToArray, optionsToString } from '@/utils/userInfo';
// // api
// import api from '@/api';

// type IUserInfoProps =
//     | IUserInfo
//     | (Omit<IUserInfo, 'id' | 'industry' | 'jobFunction'> & {
//           industry: string[];
//           jobFunction: string[];
//       });
// const initialValue: IUserInfoProps = {
//     address: '',
//     username: '',
//     email: '',
//     profile: '',
//     backgroundUrl: '',
//     industry: [],
//     jobFunction: [],
//     languageList: []
// };

// export default () => {
//     const [form] = Form.useForm();
//     const { address } = useAccount();
//     const [userId, setUseId] = useState<number | undefined>(undefined);

//     useEffect(() => {
//         /** TODO:
//          * fetch useinfo 待测试
//          */
//         if (address) {
//             api.getUserInfo({ address }).then((res: any) => {
//                 if (res?.code === 200) {
//                     const userInfo = res.data;
//                     if (userInfo?.id) setUseId(userInfo.id);
//                     const params = {
//                         ...userInfo,
//                         industry: optionsToArray(userInfo.industry, IndustryOptions),
//                         jobFunction: optionsToArray(userInfo.jobFunction, JobFunctionsOptions)
//                     };
//                     form.setFieldsValue(params);
//                 }
//             });
//         }
//     }, [address, form]);

//     const onFinish = (values: any) => {
//         console.log(values);
//         api.updateUserInfo({
//             id: userId,
//             address,
//             ...values,
//             industry: optionsToString(values.industry, IndustryOptions),
//             jobFunction: optionsToString(values.jobFunction, JobFunctionsOptions)
//         }).then((res: any) => {
//             if (res?.code === 200) {
//                 message.success('success');
//             } else {
//                 message.error(res.message);
//             }
//         });
//     };

//     return (
//         <>
//             <PageTitle title='Profile Setting' />
//             <div className='preferences-wrap'>
//                 <Form
//                     form={form}
//                     name='preferences'
//                     layout='vertical'
//                     autoComplete='off'
//                     onFinish={onFinish}
//                     style={{ width: 480 }}
//                     initialValues={initialValue}
//                 >
//                     {/* Avatar */}
//                     <Form.Item name='profile' label='Avatar'>
//                         <UploadImage form={form} formField='profile' />
//                     </Form.Item>
//                     {/* Background Image */}
//                     <Form.Item name='backgroundUrl' label='Background Image'>
//                         <UploadImage
//                             form={form}
//                             formField='backgroundUrl'
//                             shape='shape'
//                             desc='Recommended 1440px x 300px Max Size: 50MB'
//                         />
//                     </Form.Item>
//                     <Form.Item
//                         name='username'
//                         label='Nickname'
//                         rules={[{ required: true, message: 'Please input username' }]}
//                     >
//                         <Input placeholder='Enter username' />
//                     </Form.Item>
//                     <Form.Item name='languageList' label='Languages'>
//                         <LanguageSelect form={form} userId={userId} />
//                     </Form.Item>
//                     <Form.Item
//                         name='email'
//                         label='Email Address'
//                         rules={[
//                             { required: true, message: 'Please input email' },
//                             { type: 'email', message: 'Email Address is not valid email.' }
//                         ]}
//                     >
//                         <Input placeholder='Enter email' />
//                     </Form.Item>
//                     <Form.Item name='industry' label='Relevant Work Experience'>
//                         <Select
//                             mode='multiple'
//                             allowClear
//                             showSearch
//                             filterOption={(inputValue, option) => {
//                                 if (option?.label) {
//                                     const label = option.label?.toLowerCase();
//                                     inputValue = inputValue.toLowerCase();
//                                     return label.includes(inputValue);
//                                 }
//                                 return false;
//                             }}
//                             style={{ width: '100%' }}
//                             placeholder='Select industry background'
//                             options={IndustryOptions}
//                         />
//                     </Form.Item>
//                     <Form.Item name='jobFunction'>
//                         <Select
//                             mode='multiple'
//                             allowClear
//                             showSearch
//                             filterOption={(inputValue, option) => {
//                                 if (option?.label) {
//                                     const label = option.label?.toLowerCase();
//                                     inputValue = inputValue.toLowerCase();
//                                     return label.includes(inputValue);
//                                 }
//                                 return false;
//                             }}
//                             style={{ width: '100%' }}
//                             placeholder='Select job function'
//                             options={JobFunctionsOptions}
//                         />
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type='primary' htmlType='submit'>
//                             Save
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </>
//     );
// };


import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, Row, Col, Radio, Modal } from 'antd';
import {
    industry as IndustryOptions,
    jobFunctions as JobFunctionsOptions,
    competitionlanguages as CompetitionLanguages,
    certificationOptions as CertificationOptions
} from '@/constants/selcet.json';
import PageTitle from '@/components/PageTitle';
import UploadImage from '@/components/UploadImage';
import LanguageSelect from '@/components/LanguageSelect';
import type IUserInfo from '@/types/IUserInfo';
import { optionsToArray, optionsToString } from '@/utils/userInfo';
import api from '@/api';
import storage from '@/utils/storage';
import discordIocn from '@/assets/svg/icon-discord.svg';
import telegramIcon from '@/assets/svg/telegram.svg';
import AddMember from '@/pageComponents/AddMember';
import styles from './index.scss';

const { verifiedCredentials, storedEmail } = storage.getLocalStorage('dynamic_authenticated_user') || {};
const { address } = verifiedCredentials ? verifiedCredentials[0] : {};

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
    email: storedEmail || '',
    profile: '',
    backgroundUrl: '',
    industryBackground: [],
    jobFunction: [],
    languages: []
};

export default () => {
    const handleDiscordClick = () => { window.open('https://discord.gg/vgG22sb6Tb', '_blank'); };
    const handleTelegramClick = () => { window.open('https://t.me/+-7mw_Qqv47w4YzFl', '_blank'); };
    const [form] = Form.useForm();
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

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateWallet = (wallet: string) => {
        const re = /^0x[a-fA-F0-9]{40}$/;
        return re.test(String(wallet).toLowerCase());
    };

    const handleEmailVerification = () => {
        if (validateEmail(form.getFieldValue('email'))) {
            message.success('Email is valid');
        } else {
            message.error('Email is not valid');
        }
    };

    const handleWalletVerification = () => {
        if (validateWallet(form.getFieldValue('wallet'))) {
            message.success('Wallet is valid');
        } else {
            message.error('Wallet is not valid');
        }
    };

    useEffect(() => {
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

    const languagesArray = [
        { language: 'English', level: 'Advanced' },
        { language: 'Spanish', level: 'Intermediate' }
    ];

    const onFinish = (values: any) => {
        api.competRegistration({
            address,
            ...values,
            industry: optionsToString(values.industry, IndustryOptions),
            jobFunction: optionsToString(values.jobFunction, JobFunctionsOptions),
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
                                    <Input placeholder='Enter email' defaultValue={storedEmail} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' onClick={handleEmailVerification}>
                                        Verify Email
                                    </Button>
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
                                <Form.Item>
                                    <Button type='primary' onClick={handleWalletVerification}>
                                        Verify Wallet
                                    </Button>
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
                                <Form.Item name='profile' label='Avatar'>
                                    <UploadImage form={form} formField='profile' />
                                </Form.Item>

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
