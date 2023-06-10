import React from 'react';
import { Layout } from 'antd';
import Logo from '@/assets/svg/logo';
import MainMenu from '../MainMenu';
import styles from './index.module.scss';

const { Header } = Layout;

const AmHeader = () => {
    return (
        <Header className={styles['amphi-header']}>
            <Logo />
            <MainMenu />
        </Header>
    );
};

export default AmHeader;
