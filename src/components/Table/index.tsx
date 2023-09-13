import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface Iprops extends TableProps<any> {
    columns: ColumnsType<any>;
    data: any[];
    bordered?: boolean;
    defaultActiveKey?: string | number;
    loading?: boolean;
}

const AmTable: React.FC<Iprops> = ({
    columns,
    data,
    bordered,
    defaultActiveKey,
    loading,
    ...others
}) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered={bordered}
            defaultActiveKey={defaultActiveKey}
            loading={loading}
            {...others}
        />
    );
};

export default AmTable;
