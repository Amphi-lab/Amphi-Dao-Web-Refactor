import React from 'react';
import { Layout } from 'antd';
import logo from '@/assets/svg/logo.svg';
import MainMenu from '../MainMenu';
import ConnectWallet from '../ConnectWallet';
// import EmailLogin from '../EmailLogin';
import styles from './index.module.scss';

const { Header } = Layout;

const AmHeader = () => {
    return (
        <Header className={styles['amphi-header']}>
            <a href='/' className={styles.logo}>
                <img src={logo} alt='' />
            </a>
            <MainMenu />
            {/* <EmailLogin /> */}
            <ConnectWallet />
        </Header>
    );
};

export default AmHeader;
