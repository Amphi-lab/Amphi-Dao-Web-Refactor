import React, { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Button, Tabs, Table, Row, Col, Card, Tooltip, Badge } from 'antd';
import type { TabsProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { StarFilled } from '@ant-design/icons';
import type ITranslators from '@/types/ITranslator';
import './index.scss';
// api
import api from '@/api';
// components
import RequestTransForm from '@/components/RequestTransForm';
// utils
import type BigNumber from 'bignumber.js';
import { amountFromToken } from '@/utils/number';
import { getSubStr } from '@/utils/string';
// types
import type ITransaction from '@/types/ITransaction';
import {
    currentLanguages,
    translationTypes,
    workLoadType,
    languages as languagesOptions
} from '@/constants/selcet.json';
// images
import ImageTranslator from '@/assets/images/translator.png';
import ImageAbout1 from '@/assets/images/about1.png';
import ImageAbout2 from '@/assets/images/about2.png';
import ImageAbout3 from '@/assets/images/about3.png';
import ImageAbout4 from '@/assets/images/about4.png';
import textIcon from '@/assets/svg/text.svg';
import aduioIcon from '@/assets/svg/audio.svg';
import folderIcon from '@/assets/svg/folder.svg';
import { optionsMap } from '@/utils/array';

const { Meta } = Card;

const currentLanguagesOptions = optionsMap(currentLanguages);
const translationTypesOptions = optionsMap(translationTypes);
const workLoadTypeOptions = optionsMap(workLoadType);
const languagesMap = optionsMap(languagesOptions);

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

interface IHomeSectionProps {
    className?: string;
    title: string;
    children: ReactNode;
}
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
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [dataSource1, setDataSource1] = useState<ITransaction[]>([]);
    const [dataSource2, setDataSource2] = useState<ITransaction[]>([]);

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
                return translationTypesOptions.get(value);
            }
        },
        {
            title: 'FROM',
            dataIndex: 'sourceLang',
            key: 'from',
            render: (value: string) => {
                return currentLanguagesOptions.get(value);
            }
        },
        {
            title: 'TO',
            dataIndex: 'targetLang',
            key: 'to',
            render: (value: string) => {
                return currentLanguagesOptions.get(value);
            }
        },
        {
            title: 'WORKLOAD',
            dataIndex: 'workload',
            key: 'workload',
            render: (value: number, record: ITransaction) => {
                return `${value} ${workLoadTypeOptions.get(record.workloadType)}`;
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
                    dataSource={dataSource1}
                    loading={loading1}
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
                    dataSource={dataSource2}
                    loading={loading2}
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
        if (order === '1') setLoading1(true);
        else if (order === '2') setLoading2(true);
        api.ranking({ order })
            .then((res: any) => {
                if (order === '1') setLoading1(false);
                else if (order === '2') setLoading2(false);
                if (res.code === 200) {
                    if (order === '1') setDataSource1(res.rows);
                    else if (order === '2') setDataSource2(res.rows);
                }
            })
            .catch(() => {
                if (order === '1') setLoading1(false);
                else if (order === '2') setLoading2(false);
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

const DescItem = ({
    languages,
    orders,
    score
}: Pick<ITranslators, 'languages' | 'orders' | 'score'>) => (
    <>
        {languages ? (
            <p>
                I speak{' '}
                {languages
                    .map(({ workLangValue }: any) => languagesMap.get(workLangValue.toString()))
                    .join('、')}
            </p>
        ) : null}
        <Badge color='#D9D9D9' text={`${orders || '--'} orders`} />
        <p>
            <StarFilled style={{ color: '#333', fontSize: 10 }} />
            &nbsp;&nbsp;{score}
        </p>
    </>
);

const Translators: FC = () => {
    const [dataList, setDataList] = useState<ITranslators[]>([]);

    useEffect(() => {
        api.getTranslatorList().then((res: any) => {
            console.log('---res---', res);
            if (res.code === 200) {
                setDataList(res.rows);
            }
        });
    }, []);

    return (
        <HomeSection className='home-translators' title='Our Translators'>
            <Row gutter={[50, 60]}>
                {dataList.map(({ id, address, username, profile, languages, orders, score }) => (
                    <Col xs={10} sm={10} md={8} lg={6} xl={6} key={id}>
                        <Card
                            cover={
                                <img
                                    alt='example'
                                    src={
                                        `https://gateway.lighthouse.storage/ipfs/${profile}` ||
                                        ImageTranslator
                                    }
                                />
                            }
                        >
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
