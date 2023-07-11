import React, { useCallback, useMemo } from 'react';
import { Tabs } from 'antd';

import AmDateTimePiker from '@/components/Form/DateTimePicker';
import api from '@/api';
import TabsItems, {
    bountyColumn,
    customerColumn,
    deadlineColumn,
    summaryColumn,
    translateTypeColumn,
    translationStateColumn,
    translationTypeArrayFormItem
} from '@/pageComponents/myorders/TabsItems';
import OrderLayout from '@/layout/OrderLayout';
import { useAccount } from 'wagmi';
import { WORKSPACE_STATUS_CODE } from '@/constants/enums';

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

    const fetchProjectList = useCallback((queryParams: any) => {
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
        return [
            {
                key: '1',
                label: `All Orders`,
                children: (
                    <TabsItems
                        tabName='orders'
                        columns={columns}
                        queryItems={queryItems}
                        onFetchData={fetchProjectList}
                        onFormatQueryParams={(formValues: any) => formatQueryParams(formValues)}
                    />
                )
            },
            {
                key: '2',
                label: `Pending reply`,
                children: (
                    <TabsItems
                        tabName='pendingrReply'
                        queryItems={queryItems}
                        columns={columns}
                        onFetchData={fetchProjectList}
                        onFormatQueryParams={(formValues: any) =>
                            formatQueryParams(formValues, WORKSPACE_STATUS_CODE.PENDING)
                        }
                    />
                )
            },
            {
                key: '3',
                label: `Translating`,
                children: (
                    <TabsItems
                        tabName='translating'
                        queryItems={queryItems}
                        columns={columns}
                        onFetchData={fetchProjectList}
                        onFormatQueryParams={(formValues: any) =>
                            formatQueryParams(formValues, WORKSPACE_STATUS_CODE.TRANSLATING)
                        }
                    />
                )
            },
            {
                key: '4',
                label: `To be modified`,
                children: (
                    <TabsItems
                        tabName='tobeModified'
                        columns={columns}
                        onFetchData={fetchProjectList}
                        queryItems={queryItems}
                        onFormatQueryParams={(formValues: any) =>
                            formatQueryParams(formValues, WORKSPACE_STATUS_CODE.TOBEMODIFIED)
                        }
                    />
                )
            },
            {
                key: '5',
                label: `Completed`,
                children: (
                    <TabsItems
                        tabName='completed'
                        columns={columns}
                        onFetchData={fetchProjectList}
                        queryItems={queryItems}
                        onFormatQueryParams={(formValues: any) =>
                            formatQueryParams(formValues, WORKSPACE_STATUS_CODE.COMPLETED)
                        }
                    />
                )
            },
            {
                key: '6',
                label: `Cancelled`,
                children: (
                    <TabsItems
                        tabName='cancelled'
                        columns={columns}
                        onFetchData={fetchProjectList}
                        queryItems={queryItems}
                        onFormatQueryParams={(formValues: any) =>
                            formatQueryParams(formValues, WORKSPACE_STATUS_CODE.CANCELLED)
                        }
                    />
                )
            }
        ];
    }, [columns, fetchProjectList, formatQueryParams, queryItems]);

    return (
        <OrderLayout title='Workspace' tabsItems={items}>
            <Tabs defaultActiveKey='1' items={items} />
        </OrderLayout>
    );
};
