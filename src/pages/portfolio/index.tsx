import React, { useEffect, useState } from 'react';
import {
    ShareAltOutlined,
    SettingFilled,
    GlobalOutlined,
    TranslationOutlined,
    FileDoneOutlined
} from '@ant-design/icons';
import { Col, Empty, Row, Space, Tabs, Card, Spin, Carousel } from 'antd';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Jazzicon from 'react-jazzicon';
import api from '@/api';
import './index.scss';
// utils
import { chunk } from '@/utils/array';
// images
import ImgSBTWorn from '@/assets/images/sbt-worn.png';
import ImgSBTDisabled from '@/assets/images/sbt-disabled.png';
import ImgPrev from '@/assets/images/swiper-prev.png';
import ImgNext from '@/assets/images/swiper-next.png';
import ImgBackground from '@/assets/images/background.png';

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

interface IProjectProps {
    id: number;
    title: string;
}
const ProjectItem = ({ title }: IProjectProps) => {
    return (
        <div className='project-item-box'>
            <p className='title'>{title}</p>
            <Space className='lang-box'>
                <TranslationOutlined />
                <p className='lang'>English → Japanese</p>
            </Space>
            <p>
                <span className='label color-text-desc'>Role:</span>
                Translator
            </p>
            <p>
                <span className='label color-text-desc'>Completed on:</span>
                Translator
            </p>
        </div>
    );
};

const ProjectList = () => {
    const [search] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState<IProjectProps[]>([]);
    useEffect(() => {
        api.getProjectList({ address: search.get('address') })
            .then((res: any) => {
                setLoading(false);
                if (res?.code === 200) {
                    /**
                     * TODO:
                     * 没有数据获取的是假数据
                     */
                    setDataList(res.rows);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    }, [search]);
    return (
        <Spin spinning={loading}>
            {(() => {
                if (Array.isArray(dataList) && dataList.length > 0) {
                    return (
                        <Row gutter={[16, 16]}>
                            {dataList.map((item: IProjectProps) => (
                                <Col lg={8} xl={6} key={item.id}>
                                    <ProjectItem {...item} />
                                </Col>
                            ))}
                        </Row>
                    );
                }
                return <Empty />;
            })()}
        </Spin>
    );
};

interface INFTItemProps {
    name: string;
    image: any;
}
const NFTList = () => {
    const [search] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<INFTItemProps[]>([]);

    /**
     * TODO:
     * 合约调用
     * 以下是之前的方法
     */
    const fetchList = async (address: string) => {
        setLoading(!!address);
        setList([]);

        // try {
        //     const amphiPass = await getAmphiPass();
        //     const [baseURI, tokenIds] = await Promise.all([
        //         amphiPass.methods.baseURI().call(),
        //         amphiPass.methods.walletOfOwner(address).call()
        //     ]);
        //     // https://ipfs.io/ipfs/bafybeigdmc4m2zt6dllmzn6ovgvdtawlytmcopb5n5z72mmlozqqb74otm/
        //     if (tokenIds.length === 0) {
        //         setLoading(false);
        //         setList([]);
        //         return;
        //     }
        //     const ipfsHash = baseURI.replace('ipfs://', '').replace('/', '');
        //     const uris = tokenIds.map((id: string) => `ipfsUris=${ipfsHash}/${id}.json`);
        //     const res = await API.get(`/ipfs/getJson?${uris.join('&')}`);
        //     setLoading(false);
        //     if (res.data.code === 200) {
        //         const ipfsList = res.data.data.map((item: any) => ({
        //             ...item,
        //             image: item.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
        //         }));
        //         list && setList(ipfsList);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     setLoading(false);
        // }
    };

    useEffect(() => {
        const address = search.get('address');
        if (address) fetchList(address);
    }, [search]);

    return (
        <div className='nft-wrap'>
            <Spin spinning={loading}>
                {(() => {
                    if (list && list.length > 0)
                        return (
                            <Row gutter={[24, 24]}>
                                {list.map(({ name, image }) => (
                                    <Col lg={8} xl={6} key={name} className='cards'>
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img src={image} alt={name} />}
                                        >
                                            <Card.Meta title={name} description='' />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        );
                    return <Empty />;
                })()}
            </Spin>
        </div>
    );
};

const BadgeItem = ({ title, list = [] }: { title: string; list: any[] }) => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    return (
        <div className='sbt-group-item'>
            <p className='sbt-title'>{title}</p>
            <Carousel
                className='sbt-swiper-wrap'
                afterChange={onChange}
                arrows
                prevArrow={<img src={ImgPrev} alt='<-' />}
                nextArrow={<img src={ImgNext} alt='->' />}
            >
                {chunk(list, 4).map((itemArray: any, index: number) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className='sbt-row' key={index}>
                        {itemArray.map(({ id, sbt }: any) => (
                            <div className='sbt-col' key={id}>
                                <img
                                    src={sbt === 'worn' ? ImgSBTWorn : ImgSBTDisabled}
                                    alt='sbt'
                                    style={{ width: '100%' }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

const BadgeList = () => {
    const [list] = useState([
        { id: 1, sbt: 'worn' },
        { id: 2, sbt: 'worn' },
        { id: 3, sbt: 'worn' },
        { id: 4, sbt: 'disabled' },
        { id: 5, sbt: 'disabled' }
    ]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Spin spinning={loading}>
            {(() => {
                if (Array.isArray(list) && list.length > 0) {
                    return (
                        <>
                            <BadgeItem title='My Badges' list={list} />
                            <BadgeItem title='Proof of Valid Workload' list={list} />
                            <BadgeItem title='Proof of Project Volume' list={list} />
                            <BadgeItem title='Proof of Service Satisfaction' list={list} />
                        </>
                    );
                }
                return <Empty />;
            })()}
        </Spin>
    );
};

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `projects`,
        children: <ProjectList />
    },
    {
        key: '2',
        label: `NFTs`,
        children: <NFTList />
    },
    {
        key: '3',
        label: `Badge`,
        children: <BadgeList />
    }
];

const SBTTag = ({
    type,
    amount,
    color = '#0049ff'
}: {
    type: string;
    amount: string | number;
    color?: string;
}) => (
    <Space.Compact className='sbt-tag-box'>
        <p className='type' style={{ backgroundColor: color }}>
            {type}
        </p>
        <p className='amount'>{amount}</p>
    </Space.Compact>
);
export default () => {
    const [search] = useSearchParams();
    return (
        <>
            <div className='background-box'>
                <img src={ImgBackground} alt='background' />
            </div>
            {/* 个人信息 */}
            <div className='personal-info-box'>
                <div className='personal-info-top-box'>
                    <Space className='left'>
                        <div className='avatar-box'>
                            {url ? (
                                <img src={url} alt='profile' width={120} />
                            ) : (
                                <Jazzicon diameter={120} seed={search.get('address')} />
                            )}
                            <p className='nickname'>nickname</p>
                        </div>

                        <SBTTag type='PoVW' amount='1M' />
                        <SBTTag type='PoPV' amount='1M' />
                        <SBTTag type='PoSS' amount='1M' />
                    </Space>
                    <Space size='middle'>
                        <ShareAltOutlined style={{ fontSize: 24 }} />
                        <SettingFilled style={{ fontSize: 24 }} />
                    </Space>
                </div>
                <Space className='personal-info-bottom-box'>
                    <Space>
                        <TranslationOutlined />
                        <p>Japanese-A1</p>
                        <p>Korea</p>
                        <p>English-A2</p>
                    </Space>
                    <Space>
                        <GlobalOutlined />
                        <p>E-commerce</p>
                    </Space>
                    <Space>
                        <FileDoneOutlined />
                        <p>103 orders completed</p>
                    </Space>
                </Space>
            </div>
            <div className='personal-tabs-box'>
                <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
            </div>
        </>
    );
};
