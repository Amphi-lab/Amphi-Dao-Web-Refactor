import React from 'react';
import type { FC } from 'react';
import { Tabs, Form, Select, Table, Space, Button } from 'antd';
import { SwitcherOutlined, EyeOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';
// components
import CircleSvg from '@/components/CircleSvg';
import PageTitle from '@/components/PageTitle';

const { Option } = Select;

const Filter: FC<{ name: string }> = props => {
    const [form] = Form.useForm();
    const onChange = (value: any) => {
        console.log('---form value---', value);
    };
    const onGenderChange = (value: string) => {
        form.setFieldsValue({ type: value });
    };

    return (
        <Form
            form={form}
            layout='inline'
            name={props.name}
            onChange={onChange}
            className='filter-content'
        >
            <Form.Item name='type' label='Service Type' className='filter-type'>
                <Select
                    placeholder='Select a option and change input text above'
                    mode='multiple'
                    onChange={onGenderChange}
                >
                    <Option value='text'>Text translation</Option>
                    <Option value='voice'>Voice translation</Option>
                    <Option value='Subtitling'>Subtitling</Option>
                    <Option value='local'>Local errand</Option>
                </Select>
            </Form.Item>
            <Form.Item name='createTime' label='Created at' className='filter-create-time'>
                <Select
                    placeholder='Select a option and change input text above'
                    allowClear
                    onChange={onGenderChange}
                >
                    <Option value='days'>last 30 days</Option>
                    <Option value='months'>past 3 months</Option>
                    <Option value='2023'>2023</Option>
                    <Option value='all'>all time periods</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

interface DataType {
    key: string;
    orders: string;
    translator: string;
    amount: number;
    status: string;
    times: number;
    type: string;
}

const columns: ColumnsType<DataType> = [
    { title: '100 orders', dataIndex: 'orders', key: 'orders', fixed: 'left' },
    { title: 'Translator', dataIndex: 'translator', key: 'translator' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: value => (
            <Space size='small'>
                <CircleSvg size={6} color='#ff0000' />
                {value}
            </Space>
        )
    },
    { title: 'Times', key: 'times', dataIndex: 'times' },
    { title: 'Translate Type', key: 'type', dataIndex: 'type' },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: () => (
            <Space size='small'>
                <Button type='link' size='small' icon={<EyeOutlined />}>
                    View details
                </Button>
                <Button type='link' size='small' icon={<SwitcherOutlined />}>
                    Rate the service
                </Button>
                <Button type='link' size='small' icon={<SwitcherOutlined />}>
                    Order again
                </Button>
            </Space>
        )
    }
];

const TabsItems: FC<{ tabName: string }> = ({ tabName }) => {
    const data: DataType[] = [
        {
            key: '1',
            orders: 'string',
            translator: 'string',
            amount: 100,
            status: 'string',
            times: 100,
            type: 'string'
        },
        {
            key: '2',
            orders: 'string',
            translator: 'string',
            amount: 100,
            status: 'string',
            times: 100,
            type: 'string'
        }
    ];
    return (
        <>
            <Filter name={tabName} />
            <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} bordered />
        </>
    );
};

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

const onChange = (key: string) => {
    console.log(key);
};
const Component: FC = () => {
    return (
        <>
            <PageTitle title='My Orders' />
            <div className='order-tabs-content'>
                <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
            </div>
        </>
    );
};

export default Component;
