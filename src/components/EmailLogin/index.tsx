// 在一个新文件（例如 EmailLogin.jsx）中
import React from 'react';

const EmailLogin = () => {
    return (
        <div>
            {/* 这里可以添加一个输入框和一个按钮来处理邮箱登录 */}
            <input type='email' placeholder='Enter your email' />
            {/* eslint-disable-next-line react/button-has-type */}
            <button>Login with Email</button>
        </div>
    );
};

export default EmailLogin;
