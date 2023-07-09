import React, { useEffect, useState } from 'react';
import AmTable from '@/components/Table';
import AmCard from '@/components/Card';
import type { ColumnsType } from 'antd/es/table';
import api from '@/api';
import { Space, Tooltip } from 'antd';
import IconButton from '@/components/IconButton';
import ViewIcon from '@/components/Icon/View';
import PledgeIcon from '@/components/Icon/Pledge';
import { useAppSelector } from '@/store/hooks';
import { translationIndex, orderDetailData } from '@/store/reducers/orderDetailSlice';
// import BigNumber from 'bignumber.js';
import { useNavigate } from 'react-router';
import { getAmphi } from '@/contracts/contract';
import dayjs from 'dayjs';
import { optionsMap } from '@/utils/array';
import { languages } from '@/constants/selcet.json';
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

// const data: DataType[] = [];
const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};
const langOptions = optionsMap(languages);
const TranCandidate = () => {
    const navigate = useNavigate();
    const transIndex = useAppSelector(translationIndex);
    const detailData = useAppSelector<any>(orderDetailData);
    const [tableData, setTableData] = useState<any>([]);

    // 查看翻译者简介
    const hanldeViewprofile = (address: string) => {
        navigate(`/portfolio/?address=${address}`);
    };

    // 需求方选择翻译者并发单
    const handleChoosePledge = async (tasker: string) => {
        const amphi = await getAmphi();
        const translationPro = {
            buyer: detailData.buyerAddress, // 发布者
            releaseTime: dayjs(detailData.createTime).unix(), // 发布时间
            introduce: detailData.title, // 项目介绍
            need: detailData.instruction, // 项目需求说明
            deadline: dayjs(detailData.deadline).unix(), // 截至日期
            sourceLanguage: Number(detailData.sourceLang), // 源语言
            goalLanguage: Number(detailData.targetLang), // 目标语言
            preferList: [Number(detailData.industry), Number(detailData.jobFunction)], // 偏好
            translationType: Number(detailData.translationType), // 类型
            workLoad: Number(detailData.workload), // 工作量
            workLoadType:
                Number(detailData.workloadType) === -1 ? 0 : Number(detailData.workloadType), // 任务类型
            isNonDisclosure: false, // 是否保密
            isCustomize: false, // 是否为组织
            isAITrans: true, // 是否加入了AI翻译
            bounty: Number(detailData.bounty), // 赏金
            tasks: detailData.translationFiles, // 子任务
            tasker, // 任务者地址
            transState: 0, // 服务者任务状态
            state: detailData.translationState, // 项目状态
            translationIndex: detailData.translationIndex
        };
        console.log(translationPro);
        amphi.methods
            .postTask(translationPro)
            .call()
            .then((data: any) => {
                console.log(data);
            })
            .catch((err: any) => {
                console.log('err', err);
            });
    };

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
            key: 'language',
            render: value => {
                value = value
                    .map((item: any) => langOptions.get(String(item.workLangValue)))
                    .join(',');
                return <span>{value || '-'}</span>;
            }
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
            render: (value, record: any) => {
                return (
                    <Space>
                        <IconButton
                            text='View Portfolio'
                            icon={ViewIcon}
                            onClick={() => hanldeViewprofile(record.address)}
                        />
                        <IconButton
                            text='Choose & pledge'
                            icon={PledgeIcon}
                            onClick={() => handleChoosePledge(record.address)}
                        />
                    </Space>
                );
            }
        }
    ];

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
                language: item.translator.languages,
                address: item.address
            };
        });
    };

    /* const getCandidateList = async () => {
        const params = {
            translationIndex: transIndex,
            pageNum: 1,
            pageSize: 10
        };
        api.getCandidateList(params).then((res: any) => {
            if (res.code === 200) {
                setTableData(handleTableData(res.rows as any));
                // console.log(tableData);
            }
        });
    }; */

    useEffect(() => {
        const params = {
            translationIndex: transIndex,
            pageNum: 1,
            pageSize: 10
        };
        api.getCandidateList(params).then((res: any) => {
            if (res.code === 200) {
                setTableData(handleTableData(res.rows as any));
            }
        });
    }, [transIndex]);

    return (
        <AmCard title='Translation candidate' cardStyle={cardStyle}>
            <AmTable columns={columns} data={tableData} defaultActiveKey='1' bordered />
        </AmCard>
    );
};

export default TranCandidate;
