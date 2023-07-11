import React, { useCallback, useMemo } from 'react';
import { Tabs } from 'antd';

import AmDateTimePiker from '@/components/Form/DateTimePicker';
import api from '@/api';
import {
    bountyColumn,
    customerColumn,
    deadlineColumn,
    summaryColumn,
    translateTypeColumn,
    translationStateColumn,
    translationTypeArrayFormItem
} from '@/pageComponents/myorders/TabsItems';
import OrderLayout, { createBaseTabItems } from '@/layout/OrderLayout';
import { useAccount } from 'wagmi';

const formatType = 'YYYY-MM-DD HH:mm:ss'; // HH:mm:ss

export default () => {
    const { address } = useAccount();
    console.log(address);

    const queryItems = useMemo(() => {
        return [
            translationTypeArrayFormItem,
            {
                name: 'deadline',
                label: 'Deadline',
                className: 'filter-dead-time',
                itemRender: <AmDateTimePiker placeholder='Please Choose' />
            }
        ];
    }, []);

    const columns = useMemo(() => {
        return [
            summaryColumn,
            customerColumn,
            deadlineColumn,
            translateTypeColumn,
            bountyColumn,
            translationStateColumn
        ];
    }, []);

    const getTranslationList = useCallback((queryParams: any) => {
        return api.getProjectList(queryParams).then((res: any) => {
            if (res.code === 200) {
                const { rows, total } = res;
                return { rows, total };
            }
        });
    }, []);
    const formatQueryParams = useCallback(
        (formValues: any, status?: string) => {
            const { translationTypeArray, deadline } = formValues;
            const options: any = {
                translationStateArray: status?.split(','),
                address
            };
            if (translationTypeArray.length > 0) {
                options.translationTypeArray = translationTypeArray.join();
            }
            if (deadline) {
                options.deadline = deadline.format(formatType);
            }

            return options;
        },
        [address]
    );

    const items = useMemo(() => {
        return createBaseTabItems(columns, getTranslationList, formatQueryParams, queryItems);
    }, [columns, getTranslationList, formatQueryParams, queryItems]);

    return (
        <OrderLayout title='Workspace' tabsItems={items}>
            <Tabs defaultActiveKey='1' items={items} />
        </OrderLayout>
    );
};
