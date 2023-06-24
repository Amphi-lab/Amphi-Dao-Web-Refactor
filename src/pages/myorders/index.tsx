import React, { useEffect, useState, useCallback, Fragment } from 'react';
import type { FC } from 'react';
import Jazzicon from 'react-jazzicon';
import { Tabs, Form, Select, Table, Space, Button, Tooltip, Badge } from 'antd';
import { SwitcherOutlined, EyeOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as dayjs from 'dayjs';
import type IOrder from '@/types/IOrder';
import { serviceTypes, languages } from '@/constants/selcet.json';
import './index.scss';
// components
import PageTitle from '@/components/PageTitle';
import { amountFromToken } from '@/utils/number';
import api from '@/api';
import { optionsMap } from '@/utils/array';

const { Option } = Select;
const formatType = 'YYYY-MM-DD HH:mm:ss'; // HH:mm:ss
const languagesOptions = optionsMap(languages);
const columns: ColumnsType<IOrder> = [
    {
        title: '100 orders',
        key: 'title',
        dataIndex: 'title',
        width: 150,
        render: (value, record) => (
            <Tooltip placement='topLeft' title={value}>
                <p>{value}</p>
                <p className='color-text-desc'>{record?.instruction}</p>
            </Tooltip>
        )
    },
    {
        title: 'Translator',
        key: 'acceptAddress',
        dataIndex: 'acceptAddress',
        ellipsis: true,
        render: value =>
            // translator ? (<p>There are 2 people applying</p>) : (<p>No one applied yet</p>)
            /* <Avatar src={''} /> */
            value ? (
                <p className='address-head-tips'>
                    <Jazzicon diameter={22} seed={value} />
                    <span className='address'>{value}</span>
                </p>
            ) : (
                <p className='color-text-desc'>No one applied yet</p>
            )
    },
    {
        title: 'Amount',
        key: 'bounty',
        dataIndex: 'bounty',
        render: value => `$ ${amountFromToken(value)}`
    },
    {
        title: 'Status',
        key: 'translationState',
        dataIndex: 'translationState',
        ellipsis: true,
        render: value => <Badge status='success' text={value} />
    },
    {
        title: 'Times',
        key: 'deadline',
        dataIndex: 'deadline',
        render: value => dayjs(value).format(formatType)
    },
    {
        title: 'Translate Type',
        key: 'translateType',
        dataIndex: 'translateType',
        render: (_, record) =>
            `${languagesOptions.get(record.sourceLang) || '--'} 
            to 
            ${languagesOptions.get(record.targetLang) || '--'}`
    },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 120,
        render: () => (
            <Space size='small' wrap>
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
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState<IOrder[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [pageNum, setPageNum] = useState<number>(1);
    const pageSize = 10;
    const currentDate = dayjs().format(formatType);
    const year = dayjs().year();
    const yearRange = JSON.stringify([
        dayjs().startOf('year').format(formatType),
        dayjs().endOf('year').format(formatType)
    ]);
    const monthRange = JSON.stringify([
        dayjs().subtract(3, 'month').startOf('day').format(formatType),
        currentDate
    ]);
    const dayRange = JSON.stringify([
        dayjs().subtract(30, 'day').startOf('day').format(formatType),
        currentDate
    ]);

    const getOptions = useCallback(() => {
        const { translationTypeArray, createTime } = form.getFieldsValue();
        const options: any = {};
        if (translationTypeArray.length > 0) {
            options.translationTypeArray = JSON.stringify(translationTypeArray);
        }
        const [beginCreateTime, endCreateTime] = createTime ? JSON.parse(createTime) : [];
        if (beginCreateTime) options.params = { ...options.params, beginCreateTime };
        if (endCreateTime) options.params = { ...options.params, endCreateTime };
        return {
            ...options,
            pageNum,
            pageSize
        };
    }, [form, pageNum]);

    const fetchTranslationList = useCallback(() => {
        setLoading(true);
        api.getTranslationList(getOptions())
            .then((res: any) => {
                setLoading(false);
                if (res.code === 200) {
                    setDataList(res.rows);
                    setTotal(res.total);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    }, [getOptions]);

    useEffect(() => {
        fetchTranslationList();
    }, [fetchTranslationList]);

    const onValuesChange = () => {
        fetchTranslationList();
    };

    const onPageChange = (value: any) => {
        setPageNum(value);
        fetchTranslationList();
    };

    return (
        <>
            <Form
                form={form}
                layout='inline'
                name={tabName}
                onValuesChange={onValuesChange}
                className='filter-content'
                initialValues={{
                    translationTypeArray: ['0', '1', '2', '3'],
                    createTime: ''
                }}
            >
                <Space wrap>
                    <Form.Item
                        name='translationTypeArray'
                        label='Service Type'
                        className='filter-type'
                    >
                        <Select
                            placeholder='Select a option and change input text above'
                            mode='multiple'
                            style={{ minWidth: '360px' }}
                        >
                            {serviceTypes.map(({ value, label }) => (
                                <Option value={value} key={value}>
                                    {label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='createTime' label='Created at' className='filter-create-time'>
                        <Select placeholder='Select a option and change input text above'>
                            <Option value={dayRange}>last 30 days</Option>
                            <Option value={monthRange}>past 3 months</Option>
                            <Option value={yearRange}>{year}</Option>
                            <Option value=''>all time periods</Option>
                        </Select>
                    </Form.Item>
                </Space>
            </Form>
            <Table
                columns={columns}
                dataSource={dataList}
                loading={loading}
                pagination={{
                    pageSize,
                    current: pageNum,
                    total,
                    showSizeChanger: false,
                    showTotal: value => `Total ${value} items`,
                    onChange: onPageChange
                }}
                scroll={{ x: 'max-content' }}
                bordered
                rowKey='id'
            />
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
