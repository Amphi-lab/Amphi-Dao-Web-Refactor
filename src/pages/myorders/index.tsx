import React, { useCallback, useMemo } from 'react';
import { Select, Tabs } from 'antd';
import dayjs from 'dayjs';

import api from '@/api';
import {
    acceptAddressColumn,
    actionColumn,
    bountyColumn,
    deadlineColumn,
    titleColumn,
    translateTypeColumn,
    translationStateColumn,
    translationTypeArrayFormItem
} from '@/pageComponents/myorders/TabsItems';
import OrderLayout, { createBaseTabItems } from '@/layout/OrderLayout';
import { useAccount } from 'wagmi';

const { Option } = Select;

const formatType = 'YYYY-MM-DD HH:mm:ss'; // HH:mm:ss

export default () => {
    const { address } = useAccount();

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

    const queryItems = useMemo(() => {
        return [
            translationTypeArrayFormItem,
            {
                name: 'createTime',
                className: 'filter-create-time',
                label: 'Created at',
                itemRender: (
                    <Select placeholder='Select a option and change input text above'>
                        <Option value={dayRange}>last 30 days</Option>
                        <Option value={monthRange}>past 3 months</Option>
                        <Option value={yearRange}>{year}</Option>
                        <Option value=''>all time periods</Option>
                    </Select>
                )
            }
        ];
    }, [dayRange, monthRange, year, yearRange]);

    const columns = useMemo(() => {
        return [
            titleColumn,
            acceptAddressColumn,
            bountyColumn,
            translationStateColumn,
            deadlineColumn,
            translateTypeColumn,
            actionColumn
        ];
    }, []);

    const getTranslationList = useCallback((queryParams: any) => {
        return api.getTranslationList(queryParams).then((res: any) => {
            if (res.code === 200) {
                const { rows, total } = res;
                return { rows, total };
            }
        });
    }, []);
    const formatQueryParams = useCallback(
        (formValues: any, status?: string) => {
            const { translationTypeArray, createTime } = formValues;
            const options: any = {
                translationStateArray: status?.split(','),
                buyerAddress: address
            };
            if (translationTypeArray.length > 0) {
                options.translationTypeArray = translationTypeArray.join();
            }
            const [beginCreateTime, endCreateTime] = createTime ? JSON.parse(createTime) : [];
            if (beginCreateTime) options.params = { ...options.params, beginCreateTime };
            if (endCreateTime) options.params = { ...options.params, endCreateTime };

            return options;
        },
        [address]
    );

    // status 对应的状态
    // 下面的状态我是简写的，你按UI上的文案来
    // 0 pending
    // 1  2  3 in service
    // 5  completed
    // 4  6   cancell
    const items = useMemo(() => {
        return createBaseTabItems(columns, getTranslationList, formatQueryParams, queryItems);
    }, [columns, getTranslationList, formatQueryParams, queryItems]);

    return (
        <OrderLayout title='My Orders' tabsItems={items}>
            <Tabs defaultActiveKey='1' items={items} />
        </OrderLayout>
    );
};
