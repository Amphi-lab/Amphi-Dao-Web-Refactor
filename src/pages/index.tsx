import React, { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Button, Tabs, Table, Row, Col, Card, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { StarFilled } from '@ant-design/icons';
import './index.scss';
// api
import { ranking, getTranslatorList } from '@/api/api';
// components
import RequestTransForm from '@/components/RequestTransForm';
// utils
import type BigNumber from 'bignumber.js';
import { amountFromToken } from '@/utils/number';
import { getSubStr } from '@/utils/string';
// types
import type ITransaction from '@/types/ITransaction';
import { currentLanguages, translationTypes, workLoadType } from '@/constants/selcet.json';
// images
import ImageTranslator from '@/assets/images/translator.png';
import ImageAbout1 from '@/assets/images/about1.png';
import ImageAbout2 from '@/assets/images/about2.png';
import ImageAbout3 from '@/assets/images/about3.png';
import ImageAbout4 from '@/assets/images/about4.png';
import textIcon from '@/assets/svg/text.svg';
import aduioIcon from '@/assets/svg/audio.svg';
import folderIcon from '@/assets/svg/folder.svg';

const { Meta } = Card;

// const Banner: FC = () => {
//     return (
//         <div className='home-banner'>
//             <h1>A new language service</h1>
//             <h1 className='primary'>marketplace</h1>
//             <h3>AI translation + human proofreading marketplace</h3>
//             <Button size='large' className='primary'>
//                 Go now
//             </Button>
//         </div>
//     );
// };

type IHomeSectionProps = {
    className?: string;
    title: string;
    children: ReactNode;
};
const HomeSection: FC<IHomeSectionProps> = ({ className, title, children }) => {
    return (
        <div className={`home-section ${className}`}>
            <h2 className='home-section-title'>{title}</h2>
            <div className='home-section-content'>{children}</div>
        </div>
    );
};

const Bounties: FC = () => {
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState<ITransaction[]>([]);

    const findIcon = (translationType: string) => {
        if (translationType === '1' || translationType === '2' || translationType === '0')
            return textIcon;
        if (translationType === '3' || translationType === '4') return aduioIcon;
        if (translationType === '5') return folderIcon;
        return '';
    };

    const columns: ColumnType<ITransaction>[] = [
        {
            title: 'REQUEST',
            dataIndex: 'title',
            key: 'name',
            fixed: 'left',
            render: (value: string, record: ITransaction, index: number) => {
                const url = findIcon(record.translationType);
                return (
                    <div className='ranking-name'>
                        <span className='rank-index'>{index + 1}. </span>
                        <img className='rank-icon' src={url} alt='' />
                        <Tooltip title={value}> {getSubStr(value)} </Tooltip>
                    </div>
                );
            }
        },
        {
            title: 'REQUEST TYPE',
            dataIndex: 'translationType',
            key: 'type',
            render: (value: string) => {
                return translationTypes.find(item => item.value === value)?.label;
            }
        },
        {
            title: 'FROM',
            dataIndex: 'sourceLang',
            key: 'from',
            render: (value: string) => {
                return currentLanguages.find(item => item.value === value)?.label;
            }
        },
        {
            title: 'TO',
            dataIndex: 'targetLang',
            key: 'to',
            render: (value: string) => {
                return currentLanguages.find(item => item.value === value)?.label;
            }
        },
        {
            title: 'WORKLOAD',
            dataIndex: 'workload',
            key: 'workload',
            render: (value: number, record: ITransaction) => {
                return `${value} ${
                    workLoadType.find(item => item.value === record.workloadType)?.label
                }`;
            }
        },
        {
            title: 'BOUNTY',
            dataIndex: 'bounty',
            key: 'bounty',
            render: (value: BigNumber.Value) => {
                return `${amountFromToken(value, 'format')} USDT`;
            }
        },
        {
            title: 'POSTED',
            dataIndex: 'createTime',
            key: 'posted',
            render: (value: string) => new Date(value).toLocaleString()
        },
        {
            title: 'DEADLINE',
            dataIndex: 'deadline',
            key: 'deadline',
            render: (value: string) => new Date(value).toLocaleString()
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            render: () => (
                <Button
                    type='primary'
                    size='small'
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Take
                </Button>
            )
        }
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Top',
            children: (
                <Table
                    rowKey='id'
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
            )
        },
        {
            key: '2',
            label: `Latest`,
            children: (
                <Table
                    rowKey='id'
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
            )
        }
    ];

    const operations = (
        <Button
            type='primary'
            onClick={() => {
                navigate('/');
            }}
        >
            More
        </Button>
    );

    const fetchList = (order: '1' | '2') => {
        ranking({ order }).then((res: any) => {
            if (res.code === 200) {
                setDataSource(res.rows);
            }
        });
    };

    useEffect(() => {
        fetchList('1');
    }, []);

    return (
        <HomeSection className='home-bounties' title='Earn Bounties by Translating'>
            <Tabs
                size='large'
                items={items}
                tabBarExtraContent={operations}
                onChange={(activeKey: any) => {
                    fetchList(activeKey);
                }}
            />
        </HomeSection>
    );
};

type ITranslatorsProps = {
    // title: string;
    // imageUrl: string;
    // description: string;
    // orders: number;
    // star: string;
    id: number;
    userId: number;
    username: string;
    address: string;
    profile: any;
    languages: null;
    orders: number;
    score: number;
    latestAcceptTime: string;
};

const CircleSvg = () => (
    <svg width='11px' height='11px'>
        <circle cx='6px' cy='5px' r='5px' fill='#D9D9D9' />
    </svg>
);
const DescItem = ({
    languages,
    orders,
    score
}: Pick<ITranslatorsProps, 'languages' | 'orders' | 'score'>) => (
    <>
        <p>{languages}</p>
        <p>
            <CircleSvg />
            &nbsp;&nbsp;{orders} orders
        </p>
        <p>
            <StarFilled style={{ color: '#333', fontSize: 12 }} />
            &nbsp;&nbsp;{score}
        </p>
    </>
);

const Translators: FC = () => {
    const [dataList, setDataList] = useState<ITranslatorsProps[]>([
        {
            id: 1,
            userId: 1,
            username: 'aaa',
            address: '0x867f1469356D37313406b75c461fA057c829c749',
            profile: null,
            languages: null,
            orders: 10,
            score: 9.0,
            latestAcceptTime: '2023-06-09T14:31:18.000+00:00'
        }
    ]);

    useEffect(() => {
        getTranslatorList().then((res: any) => {
            console.log('---res---', res);
            if (res.code === 200) {
                setDataList(res.rows);
            }
        });
    });

    return (
        <HomeSection className='home-translators' title='Our Translators'>
            <Row gutter={[50, 60]}>
                {dataList.map(({ id, address, username, profile, languages, orders, score }) => (
                    <Col xs={10} sm={10} md={8} lg={6} xl={6} key={id}>
                        <Card cover={<img alt='example' src={profile || ImageTranslator} />}>
                            <Meta
                                title={username || address}
                                description={
                                    <DescItem languages={languages} orders={orders} score={score} />
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </HomeSection>
    );
};

const dataList = [
    {
        title: 'Decentralized',
        imageUrl: ImageAbout1,
        description:
            'Increase translation process efficiency, One-station language service platform.'
    },
    {
        title: 'Earn',
        imageUrl: ImageAbout2,
        description: 'Increase accuracy of AI model with specific database.'
    },
    {
        title: 'Trustless',
        imageUrl: ImageAbout3,
        description:
            'More convenient settlement, native web3 Dapp supports cryptocurrency payments.'
    },
    {
        title: 'Transparemt',
        imageUrl: ImageAbout4,
        description: 'Translator build influence in Amphi and sync propagate to the world.'
    }
];

const index: FC = () => {
    return (
        <div>
            {/* banner */}
            {/* <Banner /> */}
            {/* Earn Bounties by Translating */}
            <Bounties />
            {/* Our Translators */}
            <Translators />
            {/* Get your professional translation */}
            <HomeSection
                className='home-prof-translation'
                title='Get your professional translation'
            >
                <RequestTransForm isRequired={false} size='large' />
            </HomeSection>
            {/* What Does Amphi do */}
            <HomeSection className='home-aboutus' title='What Does Amphi do'>
                <Row gutter={[50, 60]}>
                    {dataList.map(({ title, imageUrl, description }) => (
                        <Col xs={10} sm={10} md={8} lg={6} xl={6} key={title}>
                            <Card cover={<img alt='example' src={imageUrl} />}>
                                <Meta title={title} description={description} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </HomeSection>
        </div>
    );
};

export default index;
