import React from 'react';
import type { TabsProps } from 'antd';
// components
import PageTitle from '@/components/PageTitle';
import './orderLayout.scss';
import type { TabsItemsProps } from '@/pageComponents/myorders/TabsItems';
import TabsItems from '@/pageComponents/myorders/TabsItems';
import { ORDER_STATUS_CODE } from '@/constants/enums';
import type { ColumnType } from 'antd/es/table';

export type OrderLayoutProps = React.PropsWithChildren<{
    title: string;

    tabsItems: TabsProps['items'];
}>;

export function createBaseTabItems<T extends object>(
    columns: ColumnType<T>[],
    fetchData: TabsItemsProps<T>['onFetchData'],
    formatQueryParams: (formValues: any, status?: string) => any,
    queryItems: any
) {
    return [
        {
            key: '1',
            label: `All Orders`,
            children: (
                <TabsItems
                    tabName='orders'
                    columns={columns}
                    queryItems={queryItems}
                    onFetchData={fetchData}
                    onFormatQueryParams={(formValues: any) => formatQueryParams(formValues)}
                />
            )
        },
        {
            key: '2',
            label: `Pending payment`,
            children: (
                <TabsItems
                    tabName='payment'
                    queryItems={queryItems}
                    columns={columns}
                    onFetchData={fetchData}
                    onFormatQueryParams={(formValues: any) =>
                        formatQueryParams(formValues, ORDER_STATUS_CODE.PENDING)
                    }
                />
            )
        },
        {
            key: '3',
            label: `In service`,
            children: (
                <TabsItems
                    tabName='service'
                    queryItems={queryItems}
                    columns={columns}
                    onFetchData={fetchData}
                    onFormatQueryParams={(formValues: any) =>
                        formatQueryParams(formValues, ORDER_STATUS_CODE.IN_SERVICE)
                    }
                />
            )
        },
        {
            key: '4',
            label: `Completed`,
            children: (
                <TabsItems
                    tabName='completed'
                    columns={columns}
                    onFetchData={fetchData}
                    queryItems={queryItems}
                    onFormatQueryParams={(formValues: any) =>
                        formatQueryParams(formValues, ORDER_STATUS_CODE.COMPLETED)
                    }
                />
            )
        },
        {
            key: '5',
            label: `Cancelled`,
            children: (
                <TabsItems
                    tabName='cancelled'
                    columns={columns}
                    onFetchData={fetchData}
                    queryItems={queryItems}
                    onFormatQueryParams={(formValues: any) =>
                        formatQueryParams(formValues, ORDER_STATUS_CODE.CANCELLED)
                    }
                />
            )
        }
    ];
}

export default function OrderLayout({ title, children }: OrderLayoutProps) {
    return (
        <>
            <PageTitle title={title} />
            <div className='order-tabs-content'>{children}</div>
        </>
    );
}
