import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
// components
import PageTitle from '@/components/PageTitle';
import TabsItems from '@/pageComponents/myorders/TabsItems';
import './index.scss';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `All Orders`,
        children: <TabsItems tabName='orders' />
    },
    {
        key: '2',
        label: `Pending payment`,
        children: <TabsItems tabName='payment' />
    },
    {
        key: '3',
        label: `In service`,
        children: <TabsItems tabName='service' />
    },
    {
        key: '4',
        label: `Completed`,
        children: <TabsItems tabName='completed' />
    },
    {
        key: '5',
        label: `Cancelled`,
        children: <TabsItems tabName='cancelled' />
    }
];

export default () => {
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <>
            <PageTitle title='My Orders' />
            <div className='order-tabs-content'>
                <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
            </div>
        </>
    );
};
