import React, { useEffect, useState } from 'react';
import AmTable from '@/components/Table';
import AmCard from '@/components/Card';
import type { ColumnsType } from 'antd/es/table';
import api from '@/api';
import { Space, Tooltip } from 'antd';
import IconButton from '@/components/IconButton';
import ViewIcon from '@/components/Icon/View';
import PledgeIcon from '@/components/Icon/Pledge';
import styles from './index.module.scss';

interface DataType {
    key: string;
    name: string;
    avatar: string; // --头像链接
    wordsSbt: string; // --佩戴的徽章tokenId
    orderQuantity: string;
    score: string;
    message: string;
    languages: [];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Candidate',
        dataIndex: 'candidate',
        key: 'candidate',
        render: (value, record) => {
            return (
                <>
                    <Space className={styles.candidate}>
                        <img className={styles.avatar} src={record.avatar} alt='' />
                        <span>{record.name}</span>
                    </Space>
                    <img src={record.wordsSbt} alt='' />
                </>
            );
        }
    },
    {
        title: 'Order quantity',
        dataIndex: 'orderQuantity',
        key: 'orderQuantity',
        render: value => {
            return (
                <span>
                    {value}
                    {value === 0 ? 'order' : 'orders'}
                </span>
            );
        }
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        render: value => {
            return <span>{value || '-'}</span>;
        }
    },
    {
        title: 'Language',
        dataIndex: 'language',
        key: 'language'
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        width: 450,
        render: value => {
            return (
                <Tooltip placement='topLeft' title={value}>
                    <span className={styles.message}>{value}</span>
                </Tooltip>
            );
        }
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
        render: () => {
            return (
                <Space>
                    <IconButton text='View Portfolio' icon={ViewIcon} />
                    <IconButton text='Choose & pledge' icon={PledgeIcon} />
                </Space>
            );
        }
    }
];
// const data: DataType[] = [];

const TranCandidate = () => {
    const [tableData, setTableData] = useState<any>([]);
    // const [totalNum, setTotalNum] = useState(0);

    const handleTableData = (data: []) => {
        return data.map((item: any) => {
            return {
                key: item.translator.id,
                name: item.translator.username,
                avatar: item.translator.profile, // --头像链接
                wordsSbt: item.translator?.badgeSlot?.wordsSbt, // --佩戴的徽章tokenId
                orderQuantity: item.translator.orders,
                score: item.translator.score,
                message: item.translator.message,
                languages: item.translator.languages
            };
        });
    };

    const getCandidateList = async () => {
        const params = {
            translationIndex: 1,
            pageNum: 1,
            pageSize: 10
        };
        api.getCandidateList(params).then((res: any) => {
            if (res.code === 200) {
                setTableData(handleTableData(res.rows as any));
                // console.log(tableData);
            }
        });
    };
    console.log(tableData);
    useEffect(() => {
        getCandidateList();
    }, []);

    return (
        <AmCard title='Translation candidate'>
            <AmTable columns={columns} data={tableData} defaultActiveKey='1' bordered />
        </AmCard>
    );
};

export default TranCandidate;
