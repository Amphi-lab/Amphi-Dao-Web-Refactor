import React, { useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router';
import { Button, Tabs, Table, Row, Col, Card, Tooltip } from 'antd'
import type { TabsProps } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './index.scss'
// api
import { ranking } from '@/api/api';
// components
import RequestTransForm from "@/components/RequestTransForm"
// utils
import BigNumber from 'bignumber.js';
import { amountFromToken } from '@/utils/number';
import { getSubStr } from '@/utils/string';
// types
import ITransaction from "@/types/ITransaction"
import { currentLanguages, translationTypes, workLoadType } from "@/constants/selcet.json"
// images
import ImageTranslator from "@/assets/images/translator.png"
import ImageAbout1 from "@/assets/images/about1.png"
import ImageAbout2 from "@/assets/images/about2.png"
import ImageAbout3 from "@/assets/images/about3.png"
import ImageAbout4 from "@/assets/images/about4.png"
import textIcon from '@/assets/svg/text.svg'
import aduioIcon from '@/assets/svg/audio.svg'
import folderIcon from '@/assets/svg/folder.svg'



const { Meta } = Card;

const Banner: FC = () => {
    return (
        <div className="home-banner">
            <h1>A new language service</h1>
            <h1 className="primary">marketplace</h1>
            <h3>AI translation + human proofreading marketplace</h3>
            <Button size="large" className="primary">Go now</Button>
        </div>
    )
}


type IHomeSectionProps = {
    className?: string;
    title: string;
    children: ReactNode
}
const HomeSection: FC<IHomeSectionProps> = ({ className, title, children }) => {
    return (
        <div className={'home-section ' + className}>
            <h2 className='home-section-title'>{title}</h2>
            <div className='home-section-content'>
                {children}
            </div>
        </div>
    )
}


const Bounties: FC = () => {
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState<ITransaction[]>([]);

    const findIcon = (translationType: string) => {
        if (translationType === '1' || translationType === '2' || translationType === '0') return textIcon
        else if (translationType === '3' || translationType === '4') return aduioIcon
        else if (translationType === '5') return folderIcon
        else return ''
    }

    const columns = [
        {
            title: 'REQUEST', dataIndex: 'title', key: 'name', fixed: 'left',
            render: (value: string, record: ITransaction, index: number) => {
                const url = findIcon(record.translationType)
                return (
                    <div className='ranking-name'>
                        <span className='rank-index'>{index + 1}. </span>
                        <img className='rank-icon' src={url} alt="" />
                        <Tooltip title={value}> {getSubStr(value)} </Tooltip>
                    </div>
                )
            }
        },
        {
            title: 'REQUEST TYPE', dataIndex: 'translationType', key: 'type',
            render: (value: string) => {
                return translationTypes.find(item => item.value === value)?.label
            }
        },
        {
            title: 'FROM', dataIndex: 'sourceLang', key: 'from',
            render: (value: string) => {
                return currentLanguages.find(item => item.value === value)?.label
            }
        },
        {
            title: 'TO', dataIndex: 'targetLang', key: 'to',
            render: (value: string) => {
                return currentLanguages.find(item => item.value === value)?.label
            }
        },
        {
            title: 'WORKLOAD', dataIndex: 'workload', key: 'workload',
            render: (value: number, record: ITransaction) => {
                return value + " " + workLoadType.find(item => item.value === record.workloadType)?.label
            }
        },
        {
            title: 'BOUNTY', dataIndex: 'bounty', key: 'bounty',
            render: (value: BigNumber.Value) => {
                return amountFromToken(value, 'format') + " USDT"
            }
        },
        { title: 'POSTED', dataIndex: 'createTime', key: 'posted', render: (value: string) => (new Date(value).toLocaleString()) },
        { title: 'DEADLINE', dataIndex: 'deadline', key: 'deadline', render: (value: string) => (new Date(value).toLocaleString()) },
        {
            title: '', key: 'action', fixed: 'right',
            render: () => (
                <Button type='primary' size="small" onClick={() => { navigate("/") }}>Take</Button>
            ),
        },
    ];



    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Top',
            children: (
                <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: 'max-content' }} />
            )
        },
        {
            key: '2',
            label: `Latest`,
            children: (
                <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: 'max-content' }} />
            )
        }
    ]

    const operations = <Button type='primary' onClick={() => { navigate("/") }}>More</Button>;

    const fetchList = (order) => {
        ranking({ order }).then(res => {
            if (res.code === 200) {
                setDataSource(res.rows)
            }
        })
    }


    useEffect(() => {
        fetchList(1)
    }, [])

    return (
        <HomeSection className="home-bounties" title="Earn Bounties by Translating">
            <Tabs
                size='large'
                items={items}
                tabBarExtraContent={operations}
                onChange={(activeKey: any) => {
                    fetchList(activeKey)
                }}
            />
        </HomeSection>
    )
}

type ITranslatorsProps = {
    title: string;
    imageUrl: string;
    description: string;
    orders: number;
    star: string;
}

const Translators: FC = () => {

    const dataList: ITranslatorsProps[] = new Array(8).fill({ title: "Card title", imageUrl: '', description: "This is the description", orders: 98, star: '8.0' })

    const CircleSvg = () => (
        <svg width="11px" height="11px">
            <circle cx="6px" cy="5px" r="5px" fill="#D9D9D9" />
        </svg>
    );
    const DescItem = ({ description, orders, star }: Omit<ITranslatorsProps, 'title' | 'imageUrl'>) => (
        <>
            <p>{description}</p>
            <p>
                <CircleSvg />
                &nbsp;&nbsp;{orders} orders
            </p>
            <p>
                <StarFilled style={{ color: "#333", fontSize: 12 }} />
                &nbsp;&nbsp;{star}
            </p>
        </>
    )



    return (
        <HomeSection className="home-translators" title="Our Translators">
            <Row gutter={[50, 60]}>
                {
                    dataList.map(({ title, imageUrl, description, orders, star }, index) => (
                        <Col xs={10} sm={10} md={8} lg={6} xl={6} key={index}>
                            <Card cover={<img alt="example" src={imageUrl ? imageUrl : ImageTranslator} />}>
                                <Meta title={title} description={(
                                    <DescItem description={description} orders={orders} star={star}></DescItem>
                                )} />
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </HomeSection>
    )
}

const ProfTranslation: FC = () => {
    return (
        <HomeSection className="home-prof-translation" title='Get your professional translation'>
            <RequestTransForm />
        </HomeSection>
    )
}

const AboutAmphi: FC = () => {
    const dataList = [
        { title: 'Decentralized', imageUrl: ImageAbout1, description: 'Increase translation process efficiency, One-station language service platform.' },
        { title: 'Earn', imageUrl: ImageAbout2, description: 'Increase accuracy of AI model with specific database.' },
        { title: 'Trustless', imageUrl: ImageAbout3, description: 'More convenient settlement, native web3 Dapp supports cryptocurrency payments.' },
        { title: 'Transparemt', imageUrl: ImageAbout4, description: 'Translator build influence in Amphi and sync propagate to the world.' },
    ]
    return (
        <HomeSection className="home-aboutus" title='What Does Amphi do'>
            <Row gutter={[50, 60]}>
                {
                    dataList.map(({ title, imageUrl, description }) => (
                        <Col xs={10} sm={10} md={8} lg={6} xl={6} key={title}>
                            <Card cover={<img alt="example" src={imageUrl} />}>
                                <Meta title={title} description={description} />
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </HomeSection>
    )
}

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
            <ProfTranslation />
            {/* What Does Amphi do */}
            <AboutAmphi />
        </div>
    )
}

export default index