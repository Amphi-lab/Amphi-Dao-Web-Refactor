import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Iprops {
    columns: ColumnsType<any>;
    data: any[];
    bordered?: boolean;
    defaultActiveKey?: string | number;
    loading?: boolean;
}

const AmTable: React.FC<Iprops> = ({ columns, data, bordered, defaultActiveKey, loading }) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered={bordered}
            defaultActiveKey={defaultActiveKey}
            loading={loading}
        />
    );
};

export default AmTable;
