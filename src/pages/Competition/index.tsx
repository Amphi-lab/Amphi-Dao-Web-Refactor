import React from 'react';
import { Typography, Divider } from 'antd';
// import styles from './index.module.scss'; // 导入 CSS 模块的样式

const { Title, Paragraph } = Typography;

const Join = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Title>Activity Introduction-Public Version V2-Metale “Amphi Cup” AI Growth Novel Proofreading Contest</Title>
            <Divider />
            {/* <Title level={3}>Metale “Amphi Cup” AI Bildungsroman Proofreading Contest</Title> */}
            <Title level={3}>Metale &ldquo;Amphi Cup&rdquo; AI Bildungsroman Proofreading Contest</Title>
            <Paragraph>
                Humans and AI coexist and draw a new era of literature!
            </Paragraph>
            <Divider />
            <Title level={4}>1. Competition Introduction:</Title>
            <Paragraph>
            With the rise of Web3 and AI technology, we are ushering in a new era in the wave of digitalization. To this end, Singapore-based Metale and the Amphi platform have joined hands to launch the &ldquo;Metale &lsquo;Amphi Cup&rsquo; AI Bildungsroman Proofreading Contest&rdquo;. 
            This is not only a combination of technology and talents, but also an exploration and challenge for the future translation industry.
            Translation, as a cultural bridge, plays a key role in global communication. Today, 
            AI technology has brought unprecedented opportunities to translation and provided powerful support for translators. 
            This competition aims to promote the progress of the translation industry and create greater value for society.
            For contestants, this is a unique platform for presentation and growth. Whether you are a professional 
            translator or a language enthusiast, there are opportunities for you here. You will have the opportunity to 
            communicate with top translators, improve yourself, and hopefully receive rich rewards.
            Overall, this competition is not only an arena for talents, but also an in-depth 
            reflection on the future of the translation industry. We eagerly look forward to the participation 
            of translators from around the world to jointly explore a new era of literary translation in the Web3 era.
            </Paragraph>

            <Divider />
            <Title level={4}>2. Organization:</Title>
            <Paragraph>
            Event organizing committee: composed of senior executives of Amphi , Metale and other cooperative units;
            Organizer: Amphi, Metale
            Academic support unit: We sincerely invite dozens of professional foreign language schools around the world to join us
            Co-organizer/Sponsor: We sincerely invite outstanding companies in web3-related fields to join
            Partner media: Metamedia, Cointime, lxdao, Builderdao, Seedao;
            (More media will be added one after another);
            </Paragraph>
            ▶ Group targets: foreign language colleges, professional translation agencies, companies, studios around the world
            <Paragraph>
            ▶ Individual targets: professional translators, foreign language majors, other language lovers
            </Paragraph>
        </div>
    );
};

export default Join;
