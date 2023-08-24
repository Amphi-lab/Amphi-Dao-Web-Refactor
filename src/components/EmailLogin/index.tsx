import React, { useState } from 'react';
import { message } from 'antd'; // 用于显示成功消息，你可能需要根据你的项目使用其他库或组件
// import api from 'path-to-your-api-service'; // 替换为你的API服务路径
// import storage, { storageKeys } from 'path-to-your-storage-service'; // 替换为你的存储服务路径

const EmailLogin = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [loginError, setLoginError] = useState('');

    // 发送验证码
    const sendVerificationCode = async () => {
        try {
            const response = await api.sendVerificationCode({ email });
            if (response?.code === 200) {
                setIsVerificationSent(true);
                message.info('验证码已发送，请检查你的邮箱');
            } else {
                setLoginError('发送验证码失败');
            }
        } catch (err) {
            console.log('error', err);
            setLoginError('发送验证码失败');
        }
    };

    // 登录
    const login = async () => {
        try {
            const res = await api.loginWithEmail({
                email,
                verificationCode
            });
            if (res.code === 200) {
                const user = res.data;
                const accessToken = user.token;
                storage.setLocalStorage(storageKeys.USER_TOKEN, accessToken);
                storage.setLocalStorage(storageKeys.EXPIRE_TIME, user?.expireTime.toString());
                message.success('登录成功');
            } else {
                setLoginError('验证码不正确');
            }
        } catch (err) {
            console.log('error', err);
            setLoginError('登录失败');
        }
    };

    const handleButtonClick = () => {
        if (!isVerificationSent) {
            sendVerificationCode();
        } else {
            login();
        }
    };

    return (
        <div>
            <input
                type='email'
                placeholder='请输入你的邮箱'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            {isVerificationSent && (
                <input
                    type='text'
                    placeholder='请输入验证码'
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                />
            )}
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={handleButtonClick}>
                {isVerificationSent ? '使用邮箱登录' : '邮箱注册（登录）'}
            </button>
            {loginError && <div>{loginError}</div>}
        </div>
    );
};

export default EmailLogin;
