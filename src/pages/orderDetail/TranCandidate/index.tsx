import React, { useEffect, useState } from 'react';
import { Space, Tooltip, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

import AmTable from '@/components/Table';
import AmCard from '@/components/Card';
import api from '@/api';
import IconButton from '@/components/IconButton';
import ViewIcon from '@/components/Icon/View';
import PledgeIcon from '@/components/Icon/Pledge';
import AvatarLabel from '@/components/AvatarLabel';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
    translationIndex,
    orderDetailData,
    getTaskIndex,
    getCurrentStep
} from '@/store/reducers/orderDetailSlice';
// import BigNumber from 'bignumber.js';
import { getAmphi, getNewErc20 } from '@/contracts/contract';
import { optionsMap } from '@/utils/array';
import { languages } from '@/constants/selcet.json';
// import { web3 } from '@/contracts/config';
import { amountFromToken } from '@/utils/number';
import { useAccount } from 'wagmi';
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
    const dispath = useAppDispatch();
    const navigate = useNavigate();
    const transIndex = useAppSelector(translationIndex);
    const detailData = useAppSelector<any>(orderDetailData);
    const [tableData, setTableData] = useState<any>([]);
    const [isPledgeLoading, setIsPledgeLoading] = useState(false);
    const { address: userAddress } = useAccount();

    const formatFileForContract = (filelist: []) => {
        return filelist.map((file: any) => {
            return {
                name: file.fileName,
                size: file.fileSize,
                videoLength: file.videoLength,
                Page: file.filePage,
                words: file.fileWords,
                fileType: file.fileType, // 文件类型
                path: file.filePath, // 文件链接
                transFile: '',
                taskerFile: '',
                lastUpload: dayjs(file.updateTime || new Date()).unix() // 最后更新时间
            };
        });
    };

    // 需求方选择翻译者并发单
    const handleChoosePledge = async (tasker: string) => {
        console.log('current row address', tasker);
        setIsPledgeLoading(true);
        const amphi = await getAmphi();

        const translationPro = [
            detailData.buyerAddress, // 发布者
            dayjs(detailData.createTime).unix(), // 发布时间
            detailData.title, // 项目介绍
            detailData.instruction, // 项目需求说明
            dayjs(detailData.deadline).unix(), // 截至日期
            Number(detailData.sourceLang), // 源语言
            Number(detailData.targetLang), // 目标语言
            [Number(detailData.industry), Number(detailData.jobFunction)], // 偏好
            Number(detailData.translationType), // 类型
            Number(detailData.workload), // 工作量

            Number(detailData.workloadType) === -1 ? 0 : Number(detailData.workloadType), // 任务类型
            false, // 是否保密
            false, // 是否为组织
            true, // 是否加入了AI翻译
            // 1,
            Number(amountFromToken(detailData.bounty)), // 赏金
            // bounty: web3.utils.toWei(detailData.bounty, 'ether'), // 赏金
            formatFileForContract(detailData.translationFiles), // 子任务
            tasker, // 任务者地址
            0, // 服务者任务状态
            detailData.translationState, // 项目状态
            detailData.translationIndex
        ];

        // const translationPro = {
        //     buyer: detailData.buyerAddress, // 发布者
        //     releaseTime: dayjs(detailData.createTime).unix(), // 发布时间
        //     introduce: detailData.title, // 项目介绍
        //     need: detailData.instruction, // 项目需求说明
        //     deadline: dayjs(detailData.deadline).unix(), // 截至日期
        //     sourceLanguage: Number(detailData.sourceLang), // 源语言
        //     goalLanguage: Number(detailData.targetLang), // 目标语言
        //     preferList: [Number(detailData.industry), Number(detailData.jobFunction)], // 偏好
        //     translationType: Number(detailData.translationType), // 类型
        //     workLoad: Number(detailData.workload), // 工作量
        //     workLoadType:
        //         Number(detailData.workloadType) === -1 ? 0 : Number(detailData.workloadType), // 任务类型
        //     isNonDisclosure: false, // 是否保密
        //     isCustomize: false, // 是否为组织
        //     isAITrans: true, // 是否加入了AI翻译
        //     bounty: 1,
        //     // bounty: Number(amountFromToken(detailData.bounty)), // 赏金
        //     // bounty: web3.utils.toWei(detailData.bounty, 'ether'), // 赏金
        //     tasks: formatFileForContract(detailData.translationFiles), // 子任务
        //     tasker, // 任务者地址
        //     transState: 0, // 服务者任务状态
        //     state: detailData.translationState, // 项目状态
        //     translationIndex: detailData.translationIndex
        // };
        console.log(translationPro);
        amphi.methods
            .postTask(translationPro)
            .call()
            .then((data: any) => {
                console.log('postTask', typeof data);
                if (typeof data === 'object') {
                    message.success('Choose & pledge successfully!');
                    dispath(getTaskIndex(data));
                    dispath(getCurrentStep(2));
                    // window.location.reload();
                } else {
                    message.error('Choose & pledge failed !');
                }
                setIsPledgeLoading(false);
            })
            .catch((err: any) => {
                setIsPledgeLoading(false);
                message.error('Contract request error, please try again!');
                console.log('err', err);
            });
    };

    // 查看翻译者简介
    const hanldeViewprofile = (address: string) => {
        navigate(`/portfolio/?address=${address}`);
    };

    const hanldeERC20Approve = async (tasker: string) => {
        const erc20 = await getNewErc20();
        erc20.methods
            .approve(
                import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS,
                Number(amountFromToken(detailData.bounty))
            )
            .send({
                from: userAddress
            })
            .then((res: any) => {
                console.log('erc20 res', res);
                handleChoosePledge(tasker);
            })
            .catch((err: any) => {
                console.log('erc20 err', err);
            });
    };

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

    const columns: ColumnsType<DataType> = [
        {
            title: 'Candidate',
            dataIndex: 'candidate',
            key: 'candidate',
            width: 150,
            render: (value, record) => {
                return (
                    <>
                        <Space className={styles.candidate}>
                            <AvatarLabel avatar={record.avatar} seed={record} label={record.name} />
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
                // console.log(record);
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
                            onClick={() => hanldeERC20Approve(record.address)}
                        />
                    </Space>
                );
            }
        }
    ];

    return (
        <AmCard title='Translation candidate' cardStyle={cardStyle}>
            <AmTable
                columns={columns}
                data={tableData}
                defaultActiveKey='1'
                bordered
                scroll={{ x: 'max-content' }}
                loading={isPledgeLoading}
            />
        </AmCard>
    );
};

export default TranCandidate;
