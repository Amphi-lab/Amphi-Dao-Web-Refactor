import React, { useCallback, useEffect, useState } from 'react';
import { Timeline, Input, Divider } from 'antd';
import Dot from '@/components/Icon/Dot';
import AmCard from '@/components/Card';
import notifiIcon from '@/assets/svg/notification.svg';
import api from '@/api';
import { useAccount } from 'wagmi';
import AvatarLabel from '@/components/AvatarLabel';

import './baseNotification.scss';

type BaseNotificationProps = { translationIndex?: string };

const { TextArea } = Input;
const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};

const BaseNotification = ({ translationIndex: transIndex }: BaseNotificationProps) => {
    const { address } = useAccount();

    const [timelineItems, setTimelineItems] = useState<any>([]);

    const hanldeTimelineData = (data: []) => {
        return data.map((item: any) => {
            return {
                color: '#0049FF',
                dot: <Dot />,
                children: (
                    <div>
                        <div className='base-notification-content'>
                            {item.commentType === 1 ? (
                                <AvatarLabel seed={item} label={item.username} />
                            ) : (
                                <img
                                    src={notifiIcon}
                                    alt=''
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                />
                            )}

                            <span style={{ marginLeft: '8px' }}>{item.content}</span>
                        </div>
                        <p className='time'>{item.createTime}</p>
                    </div>
                )
            };
        });
    };

    const getDiscussions = useCallback(async () => {
        if (transIndex) {
            api.getDiscussions(/* { translationIndex: transIndex } */).then((res: any) => {
                // console.log(res);
                if (res.code === 200) {
                    setTimelineItems(hanldeTimelineData(res.rows));
                }
            });
        }
    }, [transIndex]);

    const handlePressEnter = useCallback(
        ({ target }: any) => {
            const { value } = target;
            if (address && transIndex && value) {
                api.sendCandidate({ address, translationIndex: transIndex, content: value });
            }
        },
        [transIndex, address]
    );

    useEffect(() => {
        getDiscussions();
    }, [getDiscussions]);

    return (
        <AmCard title='Updates and Discussions' cardStyle={cardStyle}>
            <Timeline
                items={timelineItems}
                style={{ maxHeight: '300px', overflow: 'auto', paddingTop: '12px' }}
            />
            <Divider />
            <TextArea
                style={{ height: 88, marginBottom: '16px' }}
                onPressEnter={handlePressEnter}
                showCount
                maxLength={1000}
                placeholder='write a message…'
            />
        </AmCard>
    );
};

export default BaseNotification;
