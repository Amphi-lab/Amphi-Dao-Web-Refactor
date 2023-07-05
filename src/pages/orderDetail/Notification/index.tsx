import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import Dot from '@/components/Icon/Dot';
import AmCard from '@/components/Card';
import notifiIcon from '@/assets/svg/notification.svg';
import api from '@/api';
import { useAppSelector } from '@/store/hooks';
import { translationIndex } from '@/store/reducers/orderDetailSlice';

const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};

const Notification = () => {
    const transIndex = useAppSelector(translationIndex);
    const [timelineItems, setTimelineItems] = useState<any>([]);

    const hanldeTimelineData = (data: []) => {
        return data.map((item: any) => {
            return {
                color: '#0049FF',
                dot: <Dot />,
                children: (
                    <div>
                        <div className='content'>
                            <img
                                src={notifiIcon}
                                alt=''
                                style={{
                                    verticalAlign: 'middle',
                                    marginRight: '8px'
                                }}
                            />
                            <span>{item.content}</span>
                        </div>
                        <p className='time'>{item.createTime}</p>
                    </div>
                )
            };
        });
    };

    const getDiscussions = async () => {
        const formData = new FormData();
        formData.append('translationIndex', transIndex as any);

        api.getDiscussions(formData).then((res: any) => {
            console.log(res);
            if (res.code === 200) {
                setTimelineItems(hanldeTimelineData(res.rows));
            }
        });
    };

    useEffect(() => {
        getDiscussions();
    }, []);

    return (
        <AmCard title='Updates and Discussions' cardStyle={cardStyle}>
            <Timeline items={timelineItems} />
        </AmCard>
    );
};

export default Notification;
