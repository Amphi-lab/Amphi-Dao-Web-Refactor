import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Banner from '../Banner';
import AmHeader from '../Header';
import AmFooter from '../Footer';
import styles from './index.module.scss';

const { Content } = Layout;

const Layouts = ({ isShowBanner = false }) => {
    return (
        <Layout style={{ background: '#FFF' }}>
            {isShowBanner ? (
                <div className={styles['amphi-layout']}>
                    <AmHeader />
                    <Banner />
                </div>
            ) : (
                <AmHeader />
            )}
            <Content style={{ height: '200px' }}>
                content
                <Outlet />
            </Content>
            <AmFooter />
        </Layout>
    );
};

export default Layouts;
