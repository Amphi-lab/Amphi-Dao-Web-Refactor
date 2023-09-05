import React, { useState }  from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs, Typography, Divider, Table } from 'antd';
import discordIocn from '@/assets/svg/discord.svg';
import telegramIcon from '@/assets/svg/telegram.svg';
import styles from './index.module.scss';

// const DiscordComponent = () => <img src={IconDiscord} alt='discord' />;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const columns1 = [
  {
    title: 'Novel Title',
    dataIndex: 'novelTitle'
  },
  {
    title: 'Genre',
    dataIndex: 'genre'
  },
  {
    title: 'Word Count',
    dataIndex: 'wordCount'
  },
  {
    title: 'Original Language',
    dataIndex: 'originalLanguage'
  },
  {
    title: 'Target Language 1',
    dataIndex: 'targetLang1'
  },
  {
    title: 'Target Language 2',
    dataIndex: 'targetLang2'
  },
  {
    title: 'Target Language 3',
    dataIndex: 'targetLang3'
  },
  {
    title: 'Target Language 4',
    dataIndex: 'targetLang4'
  },
  {
    title: 'Target Language 5',
    dataIndex: 'targetLang5'
  },
  {
    title: 'Target Language 6',
    dataIndex: 'targetLang6'
  },
  {
    title: 'Target Language 7',
    dataIndex: 'targetLang7'
  },
  {
    title: 'Target Language 8',
    dataIndex: 'targetLang8'
  }
];

const data1 = [
  {
    key: '1',
    novelTitle: 'Bitcoin',
    genre: 'Technology',
    wordCount: 123900,
    originalLanguage: 'Chinese',
    targetLang1: 'Russian',
    targetLang2: 'French',
    targetLang3: 'Korean',
    targetLang4: 'Japanese',
    targetLang5: 'Spanish',
    targetLang6: 'Indonesian',
    targetLang7: 'English',
    targetLang8: 'Portuguese'
  },
  {
    key: '2',
    novelTitle: 'From Nairobi to Shenzhen',
    genre: 'Autobiography',
    wordCount: 273431,
    originalLanguage: 'Chinese',
    targetLang1: 'Russian',
    targetLang2: 'French',
    targetLang3: 'Korean',
    targetLang4: 'Japanese',
    targetLang5: 'Spanish',
    targetLang6: 'Indonesian',
    targetLang7: '—',
    targetLang8: 'Portuguese'
  },
  {
    key: '3',
    novelTitle: 'Think Like a Frog',
    genre: 'Workplace Rules',
    wordCount: 182758,
    originalLanguage: 'Chinese',
    targetLang1: 'Russian',
    targetLang2: 'French',
    targetLang3: 'Korean',
    targetLang4: 'Japanese',
    targetLang5: 'Spanish',
    targetLang6: 'Indonesian',
    targetLang7: 'English',
    targetLang8: 'Portuguese'
  },
  {
    key: '4',
    novelTitle: '11-hour Time Difference Letter',
    genre: "Boys' School Campus Love",
    wordCount: 60496,
    originalLanguage: 'Japanese',
    targetLang1: 'Russian',
    targetLang2: 'French',
    targetLang3: 'Korean',
    targetLang4: 'Chinese',
    targetLang5: 'Spanish',
    targetLang6: 'Indonesian',
    targetLang7: 'English',
    targetLang8: 'Portuguese'
  }
];

const columns2 = [
  {
    title: 'Scoring Dimension',
    dataIndex: 'Scoring Dimension',
    key: 'Scoring Dimension'
  },
  {
    title: 'Maximum Score',
    dataIndex: 'Maximum Score',
    key: 'Maximum Score'
  },
  {
    title: 'Scoring Criteria',
    dataIndex: 'Scoring Criteria',
    key: 'Scoring Criteria'
  }
]

const data2 = [
    {
      "key": "1",
      "Scoring Dimension": "(1). Language Quality",
      "Maximum Score": "25 points",
      "Scoring Criteria": "N/A"
    },
    {
      "key": "2",
      "Scoring Dimension": "grammatical accuracy",
      "Maximum Score": "8 points",
      "Scoring Criteria": "No grammatical errors (8 points), few grammatical errors (5 points), many grammatical errors (2 points), full of grammatical errors (0 points)"
    },
    {
      "key": "3",
      "Scoring Dimension": "Accuracy of wording",
      "Maximum Score": "8 points",
      "Scoring Criteria": "The words are completely accurate (8 points), a few inappropriate words are used (5 points), many inappropriate words are used (2 points), and completely inappropriate words are used (0 points)"
    },
    {
      "key": "4",
      "Scoring Dimension": "sentence fluency",
      "Maximum Score": "9 points",
      "Scoring Criteria": "Very fluent (9 points), somewhat fluent (6 points), not fluent (3 points), not fluent at all (0 points)"
    },
    {
      "key": "5",
      "Scoring Dimension": "(2). Cultural transmission",
      "Maximum Score": "25 points",
      "Scoring Criteria": "N/A"
    },
    {
      "key": "6",
      "Scoring Dimension": "cultural fit",
      "Maximum Score": "8 points",
      "Scoring Criteria": "Completely adapted (8 points), Mostly adapted (5 points), Partially adapted (3 points), Not adapted at all (0 points)"
    },
    {
      "key": "7",
      "Scoring Dimension": "Preservation and Transmission of Local Colors",
      "Maximum Score": "8 points",
      "Scoring Criteria": "Fully retained (8 points), mostly retained (5 points), partially retained (3 points), not retained (0 points)"
    },
    {
      "key": "8",
      "Scoring Dimension": "Fidelity to the emotion and context of the original text",
      "Maximum Score": "9 points",
      "Scoring Criteria": "Completely loyal (9 points), Mostly loyal (6 points), Partially loyal (3 points), Not at all loyal (0 points)"
    },
    {
      "key": "9",
      "Scoring Dimension": "(3). Translation Difficulty Factor",
      "Maximum Score": "20 points",
      "Scoring Criteria": "N/A"
    },
    {
      "key": "10",
      "Scoring Dimension": "Specific Difficulty for Fiction Genres",
      "Maximum Score": "20 points",
      "Scoring Criteria": "Technology (20 points), Autobiography (15 points), Unwritten rules of the workplace (15 points), Gay campus (15 points)"
    },
    {
      "key": "11",
      "Scoring Dimension": "(4). Word count and language diversity",
      "Maximum Score": "20 points",
      "Scoring Criteria": "N/A"
    },
    {
      "key": "12",
      "Scoring Dimension": "Rating based on word count of novels",
      "Maximum Score": "10 points",
      "Scoring Criteria": "More than 200,000 words (10 points), 100,000-200,000 words (7 points), 50,000-100,000 words (5 points), less than 50,000 words (3 points)"
    },
    {
      "key": "13",
      "Scoring Dimension": "Score based on target language diversity",
      "Maximum Score": "10 points",
      "Scoring Criteria": "8 languages (10 points), 7 languages (8 points), 6 languages (6 points), 2-5 languages (4 points), *Individual single language does not count for this item"
    },
    {
      "key": "14",
      "Scoring Dimension": "(5). Overall impression",
      "Maximum Score": "10 points",
      "Scoring Criteria": "N/A"
    },
    {
      "key": "15",
      "Scoring Dimension": "Overall coherence and readability of the work",
      "Maximum Score": "10 points",
      "Scoring Criteria": "Very coherent (10 points), somewhat coherent (7 points), not coherent enough (4 points), not at all coherent (0 points)"
    }
];

const columns3 = [
  {
    title: 'Awards',
    dataIndex: 'awards',
    key: 'awards'
  },
  {
    title: 'Quota',
    dataIndex: 'quota',
    key: 'quota'
  },
  {
    title: 'WCM Tokens',
    dataIndex: 'wcmTokens',
    key: 'wcmTokens'
  },
  {
    title: 'Metale NFT',
    dataIndex: 'metaleNFT',
    key: 'metaleNFT'
  },
  {
    title: 'Amphi SBT',
    dataIndex: 'amphiSBT',
    key: 'amphiSBT'
  },
  {
    title: 'Additional Rights',
    dataIndex: 'additionalRights',
    key: 'additionalRights'
  }
];

const data3 = [
  {
    key: '1',
    awards: 'First Prize Best Group Award',
    quota: '1 person',
    wcmTokens: 'Metale 20000 WCM Tokens',
    metaleNFT: 'Metale NFT*1',
    amphiSBT: 'Amphi SBT*1',
    additionalRights: 'Authorization rights for translated works'
  },
  {
    key: '2',
    awards: 'Second Prize (Excellent Group Award)',
    quota: '2 people',
    wcmTokens: 'Metale 10000 WCM',
    metaleNFT: 'Metale NFT*1',
    amphiSBT: 'Amphi SBT*1',
    additionalRights: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '3',
    awards: 'Third Prize (Outstanding Group Award)',
    quota: '3 people',
    wcmTokens: 'Metale 5000 WCM',
    metaleNFT: 'Metale NFT*1',
    amphiSBT: 'Amphi SBT*1',
    additionalRights: 'Opportunity to obtain authorship rights for proofreading works'
  }
];

const columns4 = [
  {
    title: 'Awards',
    dataIndex: 'awards',
    key: 'awards'
  },
  {
    title: 'Number of Winners',
    dataIndex: 'numberOfWinners',
    key: 'numberOfWinners'
  },
  {
    title: 'Award',
    key: 'award',
    children: [
      {
        title: 'WCM',
        dataIndex: 'wcm',
        key: 'wcm'
      },
      {
        title: 'Amphi SBT',
        dataIndex: 'amphiSBT',
        key: 'amphiSBT'
      },
      {
        title: 'Opportunity',
        dataIndex: 'opportunity',
        key: 'opportunity'
      }
    ]
  }
];

const data4 = [
  {
    key: '1',
    awards: 'Russian - Excellence Award',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '2',
    awards: 'French - Excellence Award',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '3',
    awards: 'Korean - Excellence Award',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '4',
    awards: 'Japanese - Excellence Award',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '5',
    awards: 'Spanish - Award of Excellence',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '6',
    awards: 'Indonesian - Merit Award',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '7',
    awards: 'English - Excellence Award',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '8',
    awards: 'Portuguese - Award of Excellence',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  },
  {
    key: '9',
    awards: 'Best Potential Award',
    numberOfWinners: '1 person',
    wcm: 'Metale 5000 WCM',
    amphiSBT: 'Amphi SBT*1',
    opportunity: 'Opportunity to obtain authorship rights for proofreading works'
  }
];

const columns5 = [
  {
  title: 'Awards',
  dataIndex: 'awards',
  key: 'awards'
  },
  {
    title: 'Quota',
    dataIndex: 'quota',
    key: 'quota'
  },
  {
    title: 'Award',
    dataIndex: 'award',
    key: 'award'
  }
];

const data5 = [
  {
    key: '1',
    awards: 'Lucky Prize',
    quota: '12',
    award: 'Amphi pass NFT 1 per person'
  }
];

const Join: React.FC = () => {
    const [mode, setMode] = useState<TabPosition>('left');

    const handleModeChange = (e: RadioChangeEvent) => {
      setMode(e.target.value);
    };

    const handleDiscordClick = () => {
      window.open('https://discord.gg/bWwUutdGCC', '_blank');
    };

    const handleTelegramClick = () => {
      window.open('https://t.me/+-7mw_Qqv47w4YzFl', '_blank'); // Replace with your Telegram URL
    };

    return (
        <div style={{ padding: '20px' }}>
          <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
            {/* <Radio.Button value="top">Horizontal</Radio.Button> */}
            <Radio.Button value="left">Catalog</Radio.Button>
          </Radio.Group>
          <Tabs
            defaultActiveKey="1"
            tabPosition={mode}
            style={{ height: 'auto' }}  // 修改了这里的高度，以适应内容
          >
            <TabPane tab="Activity Introduction" key="1">
            <Title>Public Version V2-Metale “Amphi Cup” AI Growth Novel Proofreading Contest</Title>
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
            </TabPane>

            <TabPane tab="Organization" key="2">
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
            </TabPane>

            <TabPane tab="Activity Objects" key="3">
            <Divider />
            <Title level={4}>3. Activity objects:</Title>
                ▶ Group targets: foreign language colleges, professional translation agencies, companies, studios around the world
                <br/>
                ▶ Individual targets: professional translators, foreign language majors, other language lovers
            </TabPane>

            <TabPane tab="Competition Time" key="4">
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
            </TabPane>

            <TabPane tab="Competition Content" key="5">
            <Divider />
            <Title level={4}>5. Competition content:</Title>
                 <Paragraph><strong>Details of translated works</strong></Paragraph>
                 {/* 每页显示多少条数据、当前页码、总页数 */}
                 <Table columns={columns1} dataSource={data1} pagination={{ pageSize: 10, current: 5, total: data1.length }} />
                 <Paragraph><strong>Content description:</strong></Paragraph>
                 <Paragraph>
                   <strong>1. Novel works designated for translation and their sources:</strong>
                   <br />
                   The novels used in the competition are all provided by Metale. All novels are carefully selected, have rich plots and in-depth characterization, and also reflect various cultural backgrounds, allowing contestants to fully experience the challenge and fun of translation.
                   <br />
                   <strong>2. Translation languages and requirements:</strong>
                   <br/>
                   The total translation works of this competition are 4 novels, which need to be translated into Chinese, Russian, French, Korean, Japanese, Spanish, Indonesian, English, Portuguese and other languages. For details, please see the &ldquo;Translation Details of Works&rdquo; above.
                   <br />
                   <span style={{ color: 'red' }}>At the same time, the organizer will assist the contestants to provide a novel manuscript + an AI translation manuscript in each language for reference by the participating teams. The participating teams can proofread and translate based on the original manuscript and the AI translation manuscript.</span>
                   <br />
                   <strong>3. Guidance and requirements for translation content:</ strong>
                    <br />
                   During the translation process, please strictly follow the guidance requirements of the &ldquo;Amphi Translation Manual&rdquo; (click to download or view) for proofreading and translation.
                    <br />
                   <strong>4. Submission method and deadline:</strong>
                   <br/>
                   (1) Work submission method: All translation works should be submitted through the competition-specific online submission system. After completing the translation, the contestants need to save the work in word format and upload it through the online submission system. At the same time, entrants need to ensure that their works do not contain any personally identifiable information to ensure the fairness of the competition.
                   <br/>
                   (2) Deadline: All works must be submitted before November 15, 2023 . No late submissions will be accepted beyond this time. To avoid last-minute network delays or technical issues, all entrants are advised to submit their entries in advance.
                   <br/>
                   (3) Modification and resubmission : Before the deadline, contestants may modify or resubmit the submitted work. Please note, however, that the judging team will only review each entrant’s last submitted version.
                   <br/>
                   <strong>5. Copyright of the work:</strong>
                   <br/>
                   The copyright of the translation work submitted by the contestant belongs to the original author and Metale. Submitting the work indicates that the contestant agrees to this clause (the copyright of the work belongs to Read2n, and Read2n changed its name to Metale on August 25, 2023)
                   <br/>
                   <strong>6. Review process:</strong>
                   <br/>
                   After the competition, a professional jury will review all works. The jury is composed of a number of linguists, professional translation teachers, etc., and will evaluate the works in terms of language quality, cultural transmission, innovative interpretation, etc.
                   <br/>
                   <strong>7. Matters needing attention:</strong>
                   <br/>
                   (1) Participants should abide by the rules of the competition and are not allowed to plagiarize or plagiarize other people&apos;s works or use other unfair means. Once discovered, the competition will be disqualified.
                    <br/>
                   (2) Contestants should respect the cultural connotation of the original work and avoid inappropriate content such as discrimination and derogation during the translation process. Once found, the competition will be disqualified.
                 </Paragraph>
            </TabPane>

            <TabPane tab="Evaluation Rules" key="6">
            <Divider />
            <Title level={4}>6. Evaluation rules:</Title>
                <Paragraph><strong><span style={{ color: 'red' }}>1. Evaluation Process:</span></strong></Paragraph>
                <Paragraph>
                  The review method of this competition is double review by AI artificial intelligence + translation experts.
                  <br /><strong>The first round of AI preliminary screening</strong> to evaluate the translation completion of the translation. Works whose translation completion rate is less than 40% will be considered unqualified and will not enter the follow-up review.
                  <br/><strong>The second round of AI further screening</strong>, focusing on the repetition rate and similarity between translations. <span style={{ color: 'red' }}>Works with a repetition rate or similarity higher than 80% will be excluded</span> to ensure the independence and originality of the translation.
                  <br/><strong>The third round is manually reviewed by translation experts</strong>, looking at language quality, cultural transmission and emotional expression. Experts will deeply analyze the accuracy, fluency and cultural connotation of the translation to ensure that the translation accurately conveys the emotion and meaning of the original work.
                  <br/>The comprehensive score will combine the degree of difficulty of the translated works, the number of translated words and the diversity of the languages involved, etc. These factors jointly determine the overall score of each work, and corresponding awards will be selected based on the score.
                </Paragraph>
                <Paragraph>
                <strong>2. Review Dimensions:</strong>
                </Paragraph>
                <Table columns={columns2} dataSource={data2} pagination={false} />
                <Paragraph><strong>3. Scoring calculation formula (scoring according to works):</strong></Paragraph>
                 <Paragraph>
                   (1) Team:
                   <span style={{ color: 'red' }}><br/>(Grammar accuracy + word accuracy + sentence fluency + cultural adaptability + retention and transmission of local colors + fidelity to the original emotion and context + translation difficulty + novel word count + overall coherence and readability of the work ) / number of submissions + language diversity.</span>
                 </Paragraph>
                   (2) Person:<br/>
                   <span style={{ color: 'red' }}>Grammar accuracy + word accuracy + sentence fluency + cultural adaptability + retention and transmission of local colors + fidelity to the original emotion and context + translation difficulty + novel word count + overall coherence and readability of the work + linguistic diversity.</span>
            </TabPane>

            <TabPane tab="Awards" key="7">
            <Divider />
            <Title level={4}><strong>Group Award (translated into 2 or more languages):</strong></Title>
                <Paragraph> <Table columns={columns3} dataSource={data3} /> </Paragraph>
                <Paragraph><span style={{ color: 'red' }}>*Award rules: Rank the translations according to their total scores and select the corresponding awards.</span></Paragraph>
                <Paragraph><strong>1. Individual Award (translated into 1 language):</strong></Paragraph>
                <Paragraph><Table columns={columns4} dataSource={data4} pagination={false} /></Paragraph>
                <Paragraph><span style={{ color: 'red' }}>*Rules for awards: Rank according to the total score of the translations, and select the corresponding awards.</span></Paragraph>
                <Paragraph><strong>2.Lucky prize (entrants who meet the basic eligibility requirements will be randomly selected)</strong></Paragraph>
                <Paragraph><Table columns={columns5} dataSource={data5} pagination={false} /></Paragraph>
                <Paragraph><span style={{ color: 'red' }}>Special Note: The above group awards and individual awards cannot be applied for at the same time.</span></Paragraph>
            </TabPane>

            <TabPane tab="Contact us:" key="8">
              <Divider />
              <Title level={4}><strong>Contact us:</strong></Title>
              <Paragraph><strong>Competition consultation:</strong>
                <br />Official website of the competition : https://amphi.space
                <br />Contact: Kim
                <br />WeChat: kimdcai
                <br/>Email:amphiassistance@gmail.com
                <br/>💬 Community Q&A:
                <br/>Discord community click there:
                <div onClick={handleDiscordClick} style={{ cursor: 'pointer' }}>
                  <img src={discordIocn} alt="Discord Icon" />
                </div>
                <br/>Telegram group click there:
                <div onClick={handleTelegramClick} style={{ cursor: 'pointer' }}>
                  <img src={telegramIcon} alt="Telegram Icon" /> {/* Telegram Icon */}
                </div>
              </Paragraph>
              </TabPane>
          </Tabs>
        </div>
    );
};

export default Join;
