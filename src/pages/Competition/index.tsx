import React from 'react';
import { Typography, Divider } from 'antd';
// import styles from './index.module.scss'; // 导入 CSS 模块的样式

const { Title, Paragraph } = Typography;

const Join = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Title>Activity Introduction-Public Version V2-Metale “Amphi Cup” AI Growth Novel Proofreading Contest</Title>
            <Divider />
            <Title level={3}>Metale “Amphi Cup” AI Bildungsroman Proofreading Contest</Title>
            <Paragraph>
                Humans and AI coexist and draw a new era of literature!
            </Paragraph>
            <Divider />
            <Title level={4}>1.  Introduction:</Title>
            <Paragraph>
                <h1> This is paragraph one </h1>
            </Paragraph>
            <Divider />
            <Title level={4}>2. Organization:</Title>
            <Paragraph>
                {/* ...其他描述... */}
            </Paragraph>
            {/* ...更多段落和标题... */}
        </div>
    );
};

export default Join;
