import { Steps } from 'antd';
import React from 'react';

const Schedule = () => {
    return (
        <div>
            <div>
                <img src='' alt='' />
                <span>back to my order</span>
            </div>
            <Steps
                current={1}
                items={[
                    {
                        title: 'Submit the order'
                    },
                    {
                        title: 'Pending agreement'
                    },
                    {
                        title: 'In service'
                    },
                    {
                        title: 'Order completed'
                    }
                ]}
            />
        </div>
    );
};

export default Schedule;
