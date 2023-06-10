import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import AmHeader from '../Header';
import AmFooter from '../Footer';

const { Content } = Layout;

const Layouts = () => {
    return (
        <Layout style={{ background: '#FFF' }}>
            <AmHeader />
            <Content style={{ height: '200px' }}>
                content
                <Outlet />
            </Content>
            <AmFooter />
        </Layout>
    );
};

export default Layouts;
