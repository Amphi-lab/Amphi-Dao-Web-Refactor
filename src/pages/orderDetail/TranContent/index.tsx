import React from 'react';
import AmCard from '@/components/Card';

const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};
const titleStyle = {
    marginBottom: '24px'
};
const TranContent = () => {
    return (
        <AmCard cardStyle={cardStyle} titleStyle={titleStyle}>
            Translate Content
        </AmCard>
    );
};

export default TranContent;
