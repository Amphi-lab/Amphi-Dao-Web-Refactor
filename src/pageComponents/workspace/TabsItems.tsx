import React, { useEffect, useState, useCallback } from 'react';
import Jazzicon from 'react-jazzicon';
import { Form, Select, Table, Space, Button, Tooltip, Badge, Avatar } from 'antd';
import { SwitcherOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

import type IOrder from '@/types/IOrder';
import { serviceTypes, languages } from '@/constants/selcet.json';
// components
import { amountFromToken } from '@/utils/number';
import { optionsMap } from '@/utils/array';
import SBTTag from '@/components/SBTTag';
import SBTImage from '@/constants/sbt';
import { getSubStr } from '@/utils/string';
import { ORDER_STATUS_CODE } from '@/constants/enums';
import type { QueryItem } from '@/layout/QueryContentLayout';
import { noop } from '@/utils/util';
import AvatarLabel from '@/components/AvatarLabel';

const { Option } = Select;
const formatType = 'YYYY-MM-DD HH:mm:ss'; // HH:mm:ss
const languagesOptions = optionsMap(languages);

export type TabsItemsProps<T> = {
    tabName: string;
    queryItems?: QueryItem[];
    columns?: ColumnsType<T>;

    onFormatQueryParams: (formValues: any, pageNum: number) => any;
    onFetchData: (queryParams: any) => Promise<{ rows: T[]; total: number }>;
};

const ActionCom = ({ status, id }: any) => {
    const navigate = useNavigate();
    return (
        <Space
            size='small'
            wrap
            onClick={() => {
                navigate(`/workspace/${id}`, { state: { id } });
            }}
        >
            <Button type='link' size='small' icon={<EyeOutlined />}>
                View details
            </Button>
            {ORDER_STATUS_CODE.COMPLETED.includes(status) && (
                <Button type='link' size='small' icon={<SwitcherOutlined />}>
                    Rate the service
                </Button>
            )}
            {ORDER_STATUS_CODE.CANCELLED.includes(status) && (
                <Button type='link' size='small' icon={<SwitcherOutlined />}>
                    Order again
                </Button>
            )}
        </Space>
    );
};

export const titleColumn: ColumnType<IOrder> = {
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
};
export const summaryColumn: ColumnType<IOrder> = {
    ...titleColumn,
    title: 'Mission Summary'
};
export const customerColumn: ColumnType<IOrder> = {
    title: 'Customer',
    key: 'buyer',
    dataIndex: 'buyer',
    width: 150,
    ellipsis: true,
    render: ({ profile, username, address, ...value }) => (
        <AvatarLabel avatar={profile} seed={value} label={username} />
    )
};
export const acceptAddressColumn: ColumnType<IOrder> = {
    title: 'Translator',
    key: 'acceptAddress',
    dataIndex: 'acceptAddress',
    ellipsis: true,
    render: (value, record) => {
        const status = record.translationState?.toString();
        const count = record?.params?.count;
        const username = record?.translator?.username;
        const address = record?.translator?.address;
        const profile = record?.translator?.profile;
        const wordsSbt = record?.translator?.badgeSlot?.wordsSbt;

        if (ORDER_STATUS_CODE.PENDING.includes(status))
            return count === 0 ? (
                <p className='color-text-desc'>No one applied yet</p>
            ) : (
                <p className='color-text-main'>There are {count} people applying</p>
            );
        if (
            ORDER_STATUS_CODE.IN_SERVICE.includes(status) ||
            ORDER_STATUS_CODE.COMPLETED.includes(status)
        )
            return (
                <div className='translator-cell'>
                    <div className='address-head-tips'>
                        {profile ? (
                            <Avatar src={profile} size={22} />
                        ) : (
                            <Jazzicon diameter={22} seed={value} />
                        )}
                        <span className='address'>
                            {username || (address ? getSubStr(address) : '')}
                        </span>
                    </div>
                    {wordsSbt && <SBTTag image={SBTImage[wordsSbt]} />}
                </div>
            );
        if (ORDER_STATUS_CODE.CANCELLED.includes(status))
            return <p className='color-text-main'>--</p>;
        // return ;
    }
};
export const bountyColumn: ColumnType<IOrder> = {
    title: 'Amount',
    key: 'bounty',
    dataIndex: 'bounty',
    render: value => `${amountFromToken(value)} USDT`
};
export const translationStateColumn: ColumnType<IOrder> = {
    title: 'Status',
    key: 'translationState',
    dataIndex: 'translationState',
    ellipsis: true,
    render: value => {
        if (ORDER_STATUS_CODE.PENDING.includes(value))
            return (
                <Badge
                    status='default'
                    text={<span className='color-text-desc'>Pending payment</span>}
                />
            );
        if (ORDER_STATUS_CODE.IN_SERVICE.includes(value))
            return <Badge status='warning' text='In service' />;
        if (ORDER_STATUS_CODE.COMPLETED.includes(value))
            return <Badge status='success' text='Completed' />;
        if (ORDER_STATUS_CODE.CANCELLED.includes(value))
            return <Badge status='error' text='Cancelled' />;
    }
};
export const deadlineColumn: ColumnType<IOrder> = {
    title: 'Times',
    key: 'deadline',
    dataIndex: 'deadline',
    render: value => dayjs(value).format(formatType)
};
export const translateTypeColumn: ColumnType<IOrder> = {
    title: 'Translate Type',
    key: 'translateType',
    dataIndex: 'translateType',
    render: (_, record) =>
        `${languagesOptions.get(record.sourceLang) || '--'} 
            to 
            ${languagesOptions.get(record.targetLang) || '--'}`
};
export const actionColumn: ColumnType<IOrder> = {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 120,
    render: (_, record) => {
        const status = record.translationState?.toString();
        const { id } = record;
        return <ActionCom status={status} id={id} />;
    }
};

export const translationTypeArrayFormItem = {
    name: 'translationTypeArray',
    className: 'filter-type',
    label: 'Service Type',
    itemRender: (
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
    )
};

export default function TabsItems<T extends object>({
    tabName,
    queryItems = [],
    columns = [],
    onFormatQueryParams = noop,
    onFetchData
}: TabsItemsProps<T>) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState<T[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPageNum, setCurrentPageNum] = useState<number>(1);
    const pageSize = 10;

    const getOptions = useCallback(
        (pageNum = 1) => {
            const options = onFormatQueryParams(form.getFieldsValue(), pageNum);
            return {
                ...options,
                pageNum,
                pageSize
            };
        },
        [form, onFormatQueryParams]
    );

    const fetchData = useCallback(
        (queryParams: any) => {
            setLoading(true);
            onFetchData?.(queryParams)
                // eslint-disable-next-line @typescript-eslint/no-shadow
                .then(({ rows, total }: any) => {
                    const { pageNum } = queryParams;
                    setDataList(rows);
                    setTotal(total);

                    setCurrentPageNum(pageNum);
                })
                .finally(() => setLoading(false));
        },
        [onFetchData]
    );

    useEffect(() => {
        fetchData(getOptions());
    }, [fetchData, getOptions]);

    const onValuesChange = () => {
        fetchData(getOptions());
    };

    const onPageChange = (value: any) => {
        fetchData(getOptions(value));
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
                    {queryItems.map(({ itemRender, ...others }) => (
                        <Form.Item key={others.name} {...others}>
                            {itemRender}
                        </Form.Item>
                    ))}
                </Space>
            </Form>
            <Table
                columns={columns}
                dataSource={dataList}
                loading={loading}
                pagination={{
                    pageSize,
                    current: currentPageNum,
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
}
