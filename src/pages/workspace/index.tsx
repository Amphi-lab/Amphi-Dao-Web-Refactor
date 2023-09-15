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
} from '@/pageComponents/workspace/TabsItems';
import OrderLayout from '@/layout/OrderLayout';
import { useAccount } from 'wagmi';
import { WORKSPACE_STATUS_CODE } from '@/constants/enums';
// import workspaceData from '/Users/hangyiwang/Documents/GitHub/Amphi-Dao-Web-Refactor/mock/workspace';

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
        return api.getAppliedTaskList(queryParams).then((res: any) => {
            if (res.code === 200) {
                const { rows, total } = res;
                return { rows, total };
            }
        });
        
        // use mock data
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve({ rows: workspaceData, total: workspaceData.length });
        //     }, 500);
        // });
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
                label: `Submit the order`,
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
            // {
            //     key: '2',
            //     label: `Pending reply`,
            //     children: (
            //         <TabsItems
            //             tabName='pendingrReply'
            //             queryItems={queryItems}
            //             columns={columns}
            //             onFetchData={fetchProjectList}
            //             onFormatQueryParams={(formValues: any) =>
            //                 formatQueryParams(formValues, WORKSPACE_STATUS_CODE.PENDING)
            //             }
            //         />
            //     )
            // },
            {
                key: '3',
                label: `In progress`,
                children: (
                    <TabsItems
                        tabName='translating'
                        queryItems={queryItems}
                        columns={columns}
                        onFetchData={fetchProjectList}
                        onFormatQueryParams={(formValues: any) =>
                            formatQueryParams(formValues, WORKSPACE_STATUS_CODE.INSERVICE)
                        }
                    />
                )
            },
            {
                key: '4',
                label: `Pending Review`,
                children: (
                    <TabsItems
                        tabName='tobeModified'
                        columns={columns}
                        onFetchData={fetchProjectList}
                        queryItems={queryItems}
                        onFormatQueryParams={(formValues: any) =>
                            formatQueryParams(formValues, WORKSPACE_STATUS_CODE.PRENDINGREVIEW)
                        }
                    />
                )
            },
            {
                key: '5',
                label: `Review completed`,
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
            }
        ];
    }, [columns, fetchProjectList, formatQueryParams, queryItems]);

    return (
        <OrderLayout title='Workspace' tabsItems={items}>
            <Tabs defaultActiveKey='2' items={items} />
        </OrderLayout>
    );
};
