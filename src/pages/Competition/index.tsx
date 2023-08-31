import React from 'react';
import { Typography, Divider } from 'antd';
import styles from './index.module.scss'; // 导入 CSS 模块的样式

const { Title, Paragraph } = Typography;

const Join = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Title>Activity Introduction-Public Version V2-Metale “Amphi Cup” AI Growth Novel Proofreading Contest</Title>
            <Divider />
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
                        <ul className={styles['event-info']}>
                                <li className={styles['event-info-item']}>
                                        Event organizing committee: composed of senior executives of Amphi, Metale and other cooperative units;
                                </li>
                                <li className={styles['event-info-item']}>
                                        Organizer: Amphi, Metale
                                </li>
                                <li className={styles['event-info-item']}>
                                        Academic support unit: We sincerely invite dozens of professional foreign language schools around the world to join us
                                </li>
                                <li className={styles['event-info-item']}>
                                        Co-organizer/Sponsor: We sincerely invite outstanding companies in web3-related fields to join
                                </li>
                                <li className={styles['event-info-item']}>
                                        Partner media: Metamedia, Cointime, lxdao, Builderdao, Seedao;
                                        <br />
                                        (More media will be added one after another);
                                </li>
                        </ul>
                </Paragraph>

            <Divider />
            <Title level={4}>3. Activity objects:</Title>
                ▶ Group targets: foreign language colleges, professional translation agencies, companies, studios around the world
                <br/>
                ▶ Individual targets: professional translators, foreign language majors, other language lovers

            <Divider />
            <Title level={4}>4. Competition time:</Title>
                <Paragraph>
                    1. Registration and translation stage: September 15, 2023-November 15, 2023
                    <br />
                    (1) Log in to Amphi official website: https://amphi.space to register for free and fill in personal information, select the registration type (group registration or individual registration); after submitting the registration application, you will receive an email verification notification, follow the prompts to verify.
                    <br />
                    (2) Successfully registered contestants log in to the Amphi official website, view and select the novel works they need to proofread and translate. After selecting the works, download the works (original manuscript and AI translation draft). After successful downloading, proofread according to the guidance requirements of the &ldquo;Amphi Translation Manual&rdquo; and translation, upload and submit translation works in word document format before the deadline of the translation stage .
                <br/>
                </Paragraph>
                <Paragraph>
                    2. Work review stage: November 16, 2023 - December 16, 2023
                    <br />
                    Contestants can check whether the review status of their proofread translation works has been completed in the registration background of the official website.
                </Paragraph>
                <Paragraph>
                    3. Award announcement stage: December 17, 2023 - December 24, 2023
                    <br />
                        The results of the review will be announced on the official website from December 17th to 24th, 2023, and all contestants can log on to the official website to check.
                </Paragraph>
                <Paragraph>
                    4. Award distribution period: December 29, 2023-December 31, 2023
                    <br />
                        Relevant rewards will be issued through the wallet address registered by the contestants:
                        <ul>
                                <li>(1) Metale WCM issuance:</li>
                                <li>(2) Metale NFT issuance:</li>
                                <li>(3) Amphi pass NFT and SBT issuance:</li>
                                <li>(4) Display and feedback of the authorship rights of the winning works:</li>
                                <li>(5) Other reward distribution:</li>
                        </ul>
                        The above time will be adjusted in case of force majeure or special circumstances, and the details will be subject to notification.
                </Paragraph>
        </div>
    );
};

export default Join;
