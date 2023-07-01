import React, { useState, useCallback, createRef, forwardRef, useImperativeHandle } from 'react';
import { Spin, Row, Col, Space, Modal, Descriptions, Avatar, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useClipboard } from 'use-clipboard-copy';
// utils
import { getSubStr } from '@/utils/string';
// images
import SBTImage from '@/constants/sbt';
import IconCopy from '@/assets/svg/icon-copy.svg';
import IconFacebook from '@/assets/svg/icon-facebook.svg';
import IconTwitter from '@/assets/svg/icon-twitter.svg';
import useSBT from '@/hooks/useSBT';
import type { TTokenId, ISlotItem, ITokenURI } from '@/types/ISBT';

const SBTItemImage = ({ tokenId }: { tokenId: TTokenId }) => (
    <img
        src={SBTImage[tokenId]}
        alt={tokenId.toString()}
        width='100%'
        style={{ cursor: 'pointer' }}
    />
);

const ModalSBT = forwardRef(
    (
        {
            tokenId,
            workload,
            isHave,
            isWear
        }: Pick<ITokenURI, 'tokenId' | 'workload'> & { isHave: boolean; isWear: boolean },
        ref
    ) => {
        const clipboard = useClipboard();
        const [loading, setLoading] = useState(false);
        const { handleWear, handleTakeOffBadge } = useSBT();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const handleCancel = useCallback(() => {
            setIsModalOpen(false);
        }, []);
        const handleOk = async () => {
            try {
                setLoading(true);
                // if(isHave)
                if (isWear) {
                    Modal.confirm({
                        title: 'Warning！',
                        icon: <ExclamationCircleFilled />,
                        content: (
                            <p
                                className='color-text-sub'
                                style={{ paddingTop: '14px', paddingBottom: '14px' }}
                            >
                                When you remove the badge, it will no longer be displayed publicly.
                                Are you sure you want to remove it?
                            </p>
                        ),
                        okText: 'Confirm',
                        cancelText: 'Cancel',
                        onOk() {
                            return handleTakeOffBadge()
                                .then(() => {
                                    setLoading(false);
                                })
                                .catch(() => {
                                    setLoading(false);
                                });
                        },
                        onCancel() {
                            setLoading(false);
                        }
                    });
                } else {
                    await handleWear(tokenId);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };

        // 第二步：需要使用useImperativeHandle来将子组件的方法抛给父组件
        useImperativeHandle(ref, () => ({
            setIsModalOpen
        }));

        return (
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: isHave ? {} : { display: 'none' } }}
                okText={isWear ? 'Unwear' : 'Wear'}
                confirmLoading={loading}
                cancelText='Close'
                width='416px'
            >
                {isHave.toString()}
                {isWear.toString()}
                {tokenId.toString()}
                <p
                    style={
                        isHave
                            ? {
                                  textAlign: 'center'
                              }
                            : {
                                  textAlign: 'center',
                                  filter: 'grayscale(100%)'
                              }
                    }
                >
                    <img src={SBTImage[tokenId]} alt='sbt' height={150} />
                </p>
                <Space wrap>
                    <Descriptions column={1} labelStyle={{ width: '100px', textAlign: 'right' }}>
                        {isHave && (
                            <Descriptions.Item label='SBT Address'>
                                <Space
                                    onClick={() => {
                                        clipboard.copy(
                                            import.meta.env.VITE_PUBLIC_SBT_CONTRACT_ADDRESS
                                        );
                                        message.success('Copyed that!');
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {getSubStr(import.meta.env.VITE_PUBLIC_SBT_CONTRACT_ADDRESS)}
                                    <Avatar src={IconCopy} size={16} />
                                </Space>
                            </Descriptions.Item>
                        )}
                        <Descriptions.Item label='Glory Desc'>
                            When the valid workload reaches {workload} words, this badge will be
                            unlocked.
                        </Descriptions.Item>
                        {isHave && (
                            <Descriptions.Item label='Share to:'>
                                <Space>
                                    <a
                                        target='_blank'
                                        href='https://www.facebook.com/profile.php?id=100079177432699'
                                        rel='noreferrer'
                                    >
                                        <img src={IconFacebook} alt='facebook' height={24} />
                                    </a>
                                    <a
                                        target='_blank'
                                        href='https://twitter.com/globalkoon'
                                        rel='noreferrer'
                                    >
                                        <img src={IconTwitter} alt='twitter' height={24} />
                                    </a>
                                </Space>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Row />
                </Space>
            </Modal>
        );
    }
);

const SBTGroup = () => {
    const { slotList, ownedList, getSBTInfo } = useSBT();
    const [clickTokenId, setClickTokenId] = useState<TTokenId>('');
    const [workload, setWorkload] = useState<string>('');
    const modalRef = createRef<any>();
    const isHave = (tokenId: TTokenId) => {
        // eslint-disable-next-line eqeqeq
        return ownedList.some((item: any) => item.tokenId == tokenId);
    };
    const isWear = useCallback(
        (tokenId: TTokenId) => {
            // eslint-disable-next-line eqeqeq
            return slotList.some((item: any) => {
                // eslint-disable-next-line eqeqeq
                return item.wordsSbt == tokenId;
            });
        },
        [slotList]
    );

    const handleClick = (tokenId: TTokenId) => {
        // if (!isHave(tokenId)) return;
        setClickTokenId(tokenId);
        getSBTInfo(tokenId).then((res: ITokenURI) => {
            setWorkload(res.workload);
        });
        modalRef.current.setIsModalOpen(true);
    };

    return (
        <>
            <ModalSBT
                ref={modalRef}
                tokenId={clickTokenId}
                workload={workload}
                isHave={isHave(clickTokenId)}
                isWear={isWear(clickTokenId)}
            />
            <div className='sbt-group-item'>
                <p className='sbt-title'>My Badges</p>
                <Row>
                    {!!slotList?.length &&
                        slotList.map(({ wordsSbt }: ISlotItem) => (
                            <Col
                                md={6}
                                lg={4}
                                xl={3}
                                className='sbt-col'
                                key={wordsSbt}
                                onClick={() => {
                                    handleClick(wordsSbt);
                                }}
                            >
                                <SBTItemImage tokenId={wordsSbt} />
                            </Col>
                        ))}
                </Row>
            </div>
            <div className='sbt-group-item'>
                <p className='sbt-title'>Proof of Valid Workload</p>
                <Row>
                    {Object.keys(SBTImage).map(tokenId => (
                        <Col
                            md={6}
                            lg={4}
                            xl={3}
                            className='sbt-col'
                            key={tokenId}
                            onClick={() => {
                                handleClick(tokenId);
                            }}
                            style={isHave(tokenId) ? {} : { filter: 'grayscale(100%)' }}
                        >
                            <SBTItemImage tokenId={tokenId} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default () => {
    const { loading } = useSBT();

    return (
        <Spin spinning={loading}>
            <SBTGroup />
        </Spin>
    );
};
