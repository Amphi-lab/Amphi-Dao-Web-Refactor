import React from 'react'
import type { FC, ReactNode } from 'react'
import './index.scss'
import { Button, Tabs, Table, Row, Col, Card } from 'antd'
import type { TabsProps } from 'antd';
import { StarFilled } from '@ant-design/icons';
// components
import ThemeSwitcher from '@/components/ThemeSwitch';
import RequestTransForm from "@/components/RequestTransForm"
// images
import ImageTranslator from "@/assets/images/translator.png"
import ImageAbout1 from "@/assets/images/about1.png"
import ImageAbout2 from "@/assets/images/about2.png"
import ImageAbout3 from "@/assets/images/about3.png"
import ImageAbout4 from "@/assets/images/about4.png"

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
    const dataSource = [
        { key: '1', name: 'Product Manual Translation', type: 'Translation', from: 'English', to: 'French', workload: '5,000 words', bounty: '100 USDT', posted: '2023/04/25', deadline: '2023/05/01' },
        { key: '2', name: 'Subtitles Validation', type: 'Validation', from: 'English', to: 'French', workload: '5,000 words', bounty: '100 USDT', posted: '2023/04/25', deadline: '2023/05/01' },
    ];

    const columns = [
        { title: 'REQUEST', dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: 'REQUEST TYPE', dataIndex: 'type', key: 'type' },
        { title: 'FROM', dataIndex: 'from', key: 'from' },
        { title: 'TO', dataIndex: 'to', key: 'to' },
        { title: 'WORKLOAD', dataIndex: 'workload', key: 'workload' },
        { title: 'BOUNTY', dataIndex: 'bounty', key: 'bounty' },
        { title: 'POSTED', dataIndex: 'posted', key: 'posted' },
        { title: 'DEADLINE', dataIndex: 'deadline', key: 'deadline' },
        {
            title: '', key: 'action', fixed: 'right',
            render: (_, record) => (
                <Button type='primary' size="small">Take</Button>
            ),
        },
    ];

    const operations = <Button type='primary'>More</Button>;

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Top',
            children: (
                <Table dataSource={dataSource} columns={columns} scroll={{ x: 'max-content' }} />
            )
        },
        {
            key: '2',
            label: `Latest`,
            children: (
                <Table dataSource={dataSource} columns={columns} scroll={{ x: 'max-content' }} />
            )
        }
    ]
    return (
        <HomeSection className="home-bounties" title="Earn Bounties by Translating">
            <Tabs size='large' tabBarExtraContent={operations} items={items} />
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

    const fetchList = () => {
        /* 
             "params[orderByBounty]":传1是top ，传" "是latest
        */
        //  let url = `/translation/list?params[orderByBounty]=${order}&pageNum=1&pageSize=10`
        //  if (order === 1) {
        //      url = `/translation/list?params[orderByBounty]=${order}&pageNum=1&pageSize=10`
        //  } else {
        //      url = `/translation/list?pageNum=1&pageSize=10`
        //  }
        //  API.get(url).then((res) => {
        //      if (res.status === 200) {
        //          const data: any = [];
        //          res.data.rows.forEach((item: any) => {
        //              if (item.tcount !== item.tmax) {
        //                  data.push({
        //                      ...item,
        //                      // bounty: ethers.utils.formatUnits(item.bounty.toString() || "0")
        //                      bounty: (item.bounty / 1000000000000000000)
        //                  });

        //              }
        //          });
        //          setTableData(data);
        //          // console.log(data);
        //      }
        //  });
    }

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
            {/* <ThemeSwitcher /> */}
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