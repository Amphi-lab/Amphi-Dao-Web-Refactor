import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Modal, Carousel, Space, Row } from 'antd';
import IconFireworks from '@/assets/svg/icon-fireworks.svg';
import ImgSBT from '@/assets/images/sbt-disabled.png';
import IconPrev from '@/assets/svg/icon-prev.svg';
import IconNext from '@/assets/svg/icon-next.svg';
import IconCopy from '@/assets/svg/icon-copy.svg';
import IconLinkedin from '@/assets/svg/icon-linkedin.svg';
import IconFacebook from '@/assets/svg/icon-facebook.svg';
import IconTwitter from '@/assets/svg/icon-twitter.svg';
import IconT from '@/assets/svg/icon-t.svg';

const NoticeContext = createContext<any>({});

const SBTNoticeContent = ({ address, num, sbtlist, title }: any) => {
    const [currentNum, setCurrentNum] = useState(1);
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
        setCurrentNum(currentSlide + 1);
    };
    return (
        <div style={{ width: '100%', textAlign: 'center', margin: '0 auto' }}>
            <Carousel
                dots={false}
                arrows
                prevArrow={<img src={IconPrev} alt='<-' className='swiper-prev' />}
                nextArrow={<img src={IconNext} alt='->' className='swiper-next' />}
                afterChange={onChange}
            >
                {sbtlist.map(({ id, sbt }: any) => (
                    <img src={sbt} alt='sbt' height={150} key={id} />
                ))}
            </Carousel>
            <Row justify='space-between'>
                <Space className='text-desc'>
                    SBT Address: {address}
                    <Avatar src={IconCopy} size={16} />
                </Space>
                {sbtlist.length > 1 && (
                    <p className='text-desc'>
                        {currentNum} / {sbtlist.length}
                    </p>
                )}
            </Row>
            <p className='text-title'>{title}</p>
            <p className='text-sub'>
                You are the <span className='text-strong'>No. {num}</span> user to receive this
                badge
            </p>
        </div>
    );
};

const SBTShareContent = ({ img }: any) => {
    return (
        <Space wrap style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
            <img src={img} alt='sbt' height={150} />
            <p className='text-sub'>
                Your honor will be displayed next to your name, bringing joy to your friends or
                colleagues as well！
            </p>
            <Space>
                <img src={IconFacebook} alt='facebook' width={24} />
                <img src={IconLinkedin} alt='linkedin' width={24} />
                <img src={IconTwitter} alt='twitter' width={24} />
                <img src={IconT} alt='t' width={24} />
            </Space>
        </Space>
    );
};

const NoticeProvider = (props: any) => {
    const [modal, contextHolder] = Modal.useModal();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const openSBT = useCallback(() => {
        modal.confirm({
            width: '416px',
            title: (
                <Space>
                    <Avatar src={IconFireworks} size={20} />
                    Congratulations on your achievement
                </Space>
            ),
            icon: null,
            closable: true,
            okText: 'Wear',
            cancelText: 'Cancel',
            onOk: () => {
                // TODO: 此处需要调用穿戴接口只完成了弹窗UI
                /**
                 * TODO: 穿戴成功
                 */
                modal.confirm({
                    title: 'Badge Wearing Tips',
                    content:
                        'You are already wearing the same type of [徽章类型-徽章级别]. Would you like to replace it?',
                    okText: 'Confirm',
                    cancelText: 'Cancel'
                });
                /**
                 * TODO: 穿戴失败
                 */
                modal.error({
                    title: 'Failed to wear',
                    content:
                        'You have reached the maximum limit of badges. If you still want to wear this badge, please remove at least one badge from your portfolio page.',
                    okText: 'Go to Portfolio'
                });
            },
            content: (
                // TODO: sbtlist数据动态，此处写死了，待完善
                <SBTNoticeContent
                    address=''
                    num={3}
                    sbtlist={[
                        { id: 1, url: ImgSBT },
                        { id: 2, url: ImgSBT },
                        { id: 3, url: ImgSBT }
                    ]}
                    title='Proof of Valid Workload'
                />
            )
        });
    }, [modal]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const openSBTShare = useCallback(() => {
        modal.confirm({
            width: '416px',
            title: (
                <Space>
                    <Avatar src={IconFireworks} size={20} />
                    Congratulations on your achievement
                </Space>
            ),
            icon: null,
            closable: true,
            okText: 'Go to Portfolio',
            cancelText: 'Close',
            onOk: () => {
                // TODO: 点击 Go to Portfolio 去哪里？
            },
            // TODO: ImgSBT 动态的， 此处写死了，待完善
            content: <SBTShareContent img={ImgSBT} />
        });
    }, [modal]);

    useEffect(() => {
        // TODO: 有了新通知调用对应的弹窗方法
    }, []);

    return (
        <NoticeContext.Provider value={props.value}>
            {contextHolder}
            {props.children}
        </NoticeContext.Provider>
    );
};

const useNotice = () => useContext(NoticeContext);

export { NoticeProvider, useNotice };