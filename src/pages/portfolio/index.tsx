import React, { useCallback, useEffect, useState } from 'react';
import {
    Col,
    Empty,
    Row,
    Space,
    Tabs,
    Card,
    Spin,
    Carousel,
    Avatar,
    Dropdown,
    message
} from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Jazzicon from 'react-jazzicon';
import { useAccount } from 'wagmi';
import { useClipboard } from 'use-clipboard-copy';
import dayjs from 'dayjs';
import api from '@/api';
import './index.scss';
import { languages, socialMedia } from '@/constants/selcet.json';
// utils
import { chunk, optionsMap } from '@/utils/array';
// images
import ImgSBTWorn from '@/assets/images/sbt-worn.png';
import ImgSBTDisabled from '@/assets/images/sbt-disabled.png';
import ImgPrev from '@/assets/images/swiper-prev.png';
import ImgNext from '@/assets/images/swiper-next.png';
import ImgBackground from '@/assets/images/background.png';
import IconGloble from '@/assets/svg/icon-globle.svg';
import IconLang from '@/assets/svg/icon-lang.svg';
import IconOrders from '@/assets/svg/icon-orders.svg';
import IconSetting from '@/assets/svg/icon-setting.svg';
import IconShare from '@/assets/svg/icon-share.svg';
import IconTranslation from '@/assets/svg/icon-translation.svg';
import IconDiscord from '@/assets/svg/icon-discord.svg';
import IconEmail from '@/assets/svg/icon-email.svg';
import { CopyFilled } from '@ant-design/icons';
import { getAmphiPass } from '@/contracts/contract';

const languagesMap = optionsMap(languages);
const socialMediaMap = optionsMap(socialMedia);

interface IProjectProps {
    id: number;
    title: string;
    sourceLang: string;
    targetLang: string;
    translationCharacter: string;
    updateTime: string;
}
const ProjectItem = ({
    title,
    sourceLang,
    targetLang,
    translationCharacter,
    updateTime
}: IProjectProps) => {
    return (
        <div className='project-item-box'>
            <p className='title'>{title}</p>
            <Space className='lang-box'>
                <Avatar src={IconTranslation} size={24} />
                <p className='lang'>
                    {languagesMap.get(sourceLang)} → {languagesMap.get(targetLang)}
                </p>
            </Space>
            <p>
                <span className='label color-text-desc'>Role:</span>
                {translationCharacter}
            </p>
            <p>
                <span className='label color-text-desc'>Completed on:</span>
                {dayjs(updateTime).format('YYYY/MM/DD')}
            </p>
        </div>
    );
};

const ProjectList = ({ setCompletedNum }: any) => {
    const [search] = useSearchParams();
    const searchAddress = search.get('address');
    const { address } = useAccount();
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState<IProjectProps[]>([]);
    useEffect(() => {
        const addr = searchAddress || address;
        if (addr) {
            api.getProjectList({ address: addr })
                .then((res: any) => {
                    setLoading(false);
                    if (res?.code === 200) {
                        /**
                         * TODO:
                         * 没有数据获取的是假数据
                         */
                        setDataList(res.rows);
                        setCompletedNum(res.total);
                    }
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [searchAddress, address, setCompletedNum]);
    return (
        <Spin spinning={loading}>
            {(() => {
                if (Array.isArray(dataList) && dataList.length > 0) {
                    return (
                        <Row gutter={[16, 16]}>
                            {dataList.map((item: IProjectProps) => (
                                <Col md={12} lg={8} xl={6} key={item.id}>
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
    const { address } = useAccount();
    const searchAddress = search.get('address');

    /**
     * TODO:
     * 合约调用
     * 以下是之前的方法
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchList = async (address: string) => {
        setLoading(true);
        try {
            const amphiPass = await getAmphiPass();
            const [baseURI, tokenIds] = await Promise.all([
                amphiPass.methods.baseURI().call(),
                amphiPass.methods.walletOfOwner(address).call()
            ]);
            // https://ipfs.io/ipfs/bafybeigdmc4m2zt6dllmzn6ovgvdtawlytmcopb5n5z72mmlozqqb74otm/
            if (tokenIds.length === 0) {
                setLoading(false);
                setList([]);
                return;
            }
            const ipfsHash = baseURI.replace('ipfs://', '').replace('/', '');
            const uris = tokenIds.map((id: string) => `ipfsUris=${ipfsHash}/${id}.json`);
            const res = await api.getIpfsJson({ uris });
            setLoading(false);
            if (res?.code === 200) {
                const ipfsList = (res?.data || []).map((item: any) => ({
                    ...item,
                    image: item.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                }));
                console.log('----ipfsList----', ipfsList);
                setList(ipfsList);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const addr = searchAddress || address;
        if (addr) fetchList(addr);
    }, [searchAddress, address]);

    return (
        <div className='nft-wrap'>
            <Spin spinning={loading}>
                {(() => {
                    if (list && list.length > 0)
                        return (
                            <Row gutter={[24, 24]}>
                                {list.map(({ name, image }) => (
                                    <Col md={8} lg={6} xxl={4} key={name}>
                                        <Card hoverable cover={<img src={image} alt={name} />}>
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

const CopyComponent = ({ clipboard, link }: any) => (
    <Space
        onClick={() => {
            clipboard.copy(link);
            message.success('Copyed that!');
        }}
    >
        <CopyFilled />
        copy link
    </Space>
);
const EmailComponent = () => <img src={IconEmail} alt='email' />;
const DiscordComponent = () => <img src={IconDiscord} alt='discord' />;

export default () => {
    const clipboard = useClipboard();
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const searchAddress = search.get('address');
    const { address } = useAccount();
    const [userInfo, setUserInfo] = useState<any>({});
    const [completedNum, setCompletedNum] = useState<number | undefined>(undefined);
    const [copyLink, setCopyLink] = useState(location.href);
    // setCompletedNum(res.data.total)
    // const { username, avatar, backgroundUrl, industry, workLangs, socialMediaList } = userInfo;
    useEffect(() => {
        const addr = searchAddress || address;
        const link = location.href;
        setCopyLink(searchAddress ? link : `${link}?address=${address}`);
        if (addr) {
            api.getUserInfo({ address: addr }).then((res: any) => {
                if (res?.code === 200) {
                    const {
                        username,
                        profile,
                        backgroundUrl,
                        industry,
                        languageList,
                        socialMediaList
                    } = res.data;
                    const langs = languageList?.map((item: any) => item.workLang);
                    const industrys = industry.length > 0 ? industry.trim().split(';') : [];
                    setUserInfo({
                        username: username || 'Unnamed',
                        profile,
                        backgroundUrl: backgroundUrl || ImgBackground,
                        workLangs: langs,
                        industry: industrys || [],
                        socialMediaList: socialMediaList || []
                    });
                }
            });
        }
    }, [searchAddress, address]);

    const onChange = (key: string) => {
        console.log(key);
    };
    const onClickSetting = useCallback(() => {
        navigate('/preferences');
    }, [navigate]);

    return (
        <>
            <div className='background-box'>
                <img src={userInfo?.backgroundUrl || ImgBackground} alt='background' />
            </div>
            {/* 个人信息 */}
            <div className='personal-info-box'>
                <div className='personal-info-top-box'>
                    <Space className='left'>
                        <div className='avatar-box'>
                            {userInfo?.profile ? (
                                <img
                                    src={userInfo?.profile}
                                    alt='profile'
                                    width={120}
                                    style={{ borderRadius: 60 }}
                                />
                            ) : (
                                <Jazzicon diameter={120} seed={search.get('address')} />
                            )}
                            <p className='nickname'>{userInfo?.username}</p>
                        </div>
                        {/* TODO: 字段不确定 */}
                        <SBTTag type='PoVW' amount='1M' />
                        <SBTTag type='PoPV' amount='1M' color='#FFB600' />
                        <SBTTag type='PoSS' amount='1M' color='#8056FA' />
                    </Space>
                    <Space size='middle'>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '0',
                                        label: (
                                            <CopyComponent clipboard={clipboard} link={copyLink} />
                                        )
                                    },
                                    ...(userInfo?.socialMediaList || []).map(
                                        ({ mediaType, mediaAccount }: any) => ({
                                            key: mediaType,
                                            label: (
                                                <a
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    href={mediaAccount}
                                                    key={mediaType}
                                                >
                                                    {mediaType === 0 ? (
                                                        <EmailComponent />
                                                    ) : (
                                                        <DiscordComponent />
                                                    )}{' '}
                                                    Share on{' '}
                                                    {socialMediaMap.get(mediaType.toString())}
                                                </a>
                                            )
                                        })
                                    )
                                ]
                            }}
                            placement='bottomRight'
                        >
                            <a onClick={e => e.preventDefault()}>
                                <Avatar src={IconShare} size={24} style={{ cursor: 'pointer' }} />
                            </a>
                        </Dropdown>

                        <Avatar
                            src={IconSetting}
                            size={24}
                            onClick={onClickSetting}
                            style={{ cursor: 'pointer' }}
                        />
                    </Space>
                </div>
                <Space wrap className='personal-info-bottom-box'>
                    <Space wrap>
                        <Avatar src={IconLang} size={24} />
                        {userInfo?.workLangs?.length > 0 ? (
                            userInfo?.workLangs.map((value: string) => <p key={value}>{value}</p>)
                        ) : (
                            <p>--</p>
                        )}
                    </Space>
                    <Space wrap>
                        <Avatar src={IconGloble} size={24} />
                        {userInfo?.industry?.length > 0 ? (
                            userInfo?.industry.map((value: string) => <p key={value}>{value}</p>)
                        ) : (
                            <p>--</p>
                        )}
                    </Space>
                    <Space>
                        <Avatar src={IconOrders} size={24} />
                        <p>
                            <span>{completedNum}</span> orders completed
                        </p>
                    </Space>
                </Space>
            </div>
            <div className='personal-tabs-box'>
                <Tabs
                    defaultActiveKey='1'
                    items={[
                        {
                            key: '1',
                            label: `projects`,
                            children: <ProjectList setCompletedNum={setCompletedNum} />
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
                    ]}
                    onChange={onChange}
                />
            </div>
        </>
    );
};
