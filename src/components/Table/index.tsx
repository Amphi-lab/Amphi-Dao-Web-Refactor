import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Iprops {
    columns: ColumnsType<any>;
    data: any[];
    bordered?: boolean;
    defaultActiveKey?: string | number;
}

const AmTable: React.FC<Iprops> = ({ columns, data, bordered, defaultActiveKey }) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered={bordered}
            defaultActiveKey={defaultActiveKey}
        />
    );
};

export default AmTable;
