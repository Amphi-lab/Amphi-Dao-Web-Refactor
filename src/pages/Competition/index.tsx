import React, { useState }  from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs, Typography, Divider, Table } from 'antd';
import discordIocn from '@/assets/svg/discordQrcode.svg';
import telegramIcon from '@/assets/svg/telegramQRcode.svg';

// const DiscordComponent = () => <img src={IconDiscord} alt='discord' />;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
type TabPosition = 'left' | 'right' | 'top' | 'bottom';

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
      "Scoring Dimension": "(1). Language quality",
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
      "Scoring Dimension": "word accuracy",
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
      "Scoring Criteria": "Fully adapted (8 points), mostly adapted (5 points), partially adapted (3 points), not at all adapted (0 points)"
    },
    {
      "key": "7",
      "Scoring Dimension": "Preservation and Transmission of Local Colors",
      "Maximum Score": "8 points",
      "Scoring Criteria": "Fully retained (8 points), mostly retained (5 points), partially retained (3 points), not retained (0 points)"
    },
    {
      "key": "8",
      "Scoring Dimension": "Faithful to the original text",
      "Maximum Score": "9 points",
      "Scoring Criteria": "Totally faithful (9 points), mostly faithful (6 points), partially faithful (3 points), not at all faithful (0 points)"
    },
    {
      "key": "9",
      "Scoring Dimension": "(3). Translation Difficulty Factor",
      "Maximum Score": "20 points",
      "Scoring Criteria": "N/A"
    },
    {
      "key": "10",
      "Scoring Dimension": "Difficulty of types",
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
      "Scoring Dimension": "Score based on the word count of the novel",
      "Maximum Score": "10 points",
      "Scoring Criteria": "More than 200,000 words (10 points), 100,000-200,000 words (7 points), 50,000-100,000 words (5 points), less than 50,000 words (3 points)"
    },
    {
      "key": "13",
      "Scoring Dimension": "Score based on diversity of target languages",
      "Maximum Score": "10 points",
      "Scoring Criteria": "8 languages (10 points), 7 languages (8 points), 6 languages (6 points), 2-5 languages (4 points), *Individual monolingual is not scored for this item"
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
            <TabPane tab="I. Backgound of competition" key="1">
            <Title>The Metale &ldquo;Amphi Cup&rdquo; AI Novel Proofreading Competition</Title>

              <Divider />
              <Title level={4}>I. Backgound of competition</Title>
              <Paragraph>
              Amidst the rapid evolution of Web3 technologies and artificial intelligence, traditional models of content distribution and trade are undergoing a transformative shift. Metale, a pioneering force in global content asset distribution and trading, in collaboration with Amphi, a platform dedicated to forging Web3 linguistic service infrastructure, are proud to unveil the &ldquo;Metale &lsquo;Amphi Cup&rsquo; AI Novel Proofreading Competition.&rdquo;
              </Paragraph>
              <Paragraph>
              More than a mere confluence of technical expertise and shared vision, this competition is a strategic move to bolster the visibility and impact of both projects, underscoring their profound commitment to the future trajectory of the Web3 content industry. The event is poised to highlight the synergistic potential of human and AI collaboration in the realms of translation and proofreading, with the goal of rapidly and extensively disseminating global content to every corner of the world.
              </Paragraph>
              <Paragraph>
              For participants, the competition presents a unique stage for showcasing talent and growth. Whether a seasoned translator or a language enthusiast, this is your moment to shine. Engage with top-tier translators, elevate your skills, and stand a chance to secure substantial rewards.
              </Paragraph>
              <Paragraph>
              Join us in championing the revolution of content translation in the digital age!
              </Paragraph>
            </TabPane>

            <TabPane tab="II. Competition date and prize" key="2">
            <Divider />
            <Title level={4}>II. Competition date and prize</Title>
                <Paragraph>
                    <strong>1. Registration Period (15th September - 15th November 2023)</strong>
                    <br />
                    <br />
                    (1) Log in to Amphi official website(https:// amphi.space) to register for free and fill in personal information, select the registration type (group registration or individual registration); after submitting the registration application, you will receive an email verification notification, follow the prompts to verify.
                    <br />
                    (2) Successfully registered contestants log in to the Amphi official website, view and select the novel and proofread. After selecting novels task, download original manuscript and AI translation draft to proofread. After complete proofreading, submit translation works in word document format before 15th November 2023.
                    <br />
                    <br />
                    <strong>2. Review Period (16th November 2023 - 16th December 2023)</strong>
                    <br />
                    <br />
                    Contestants can check whether the review status of their proofread translation works has been completed in the registration background of the official website.
                    <br />
                    <br />
                    <strong>3. Award Announcement Period (December 18 - December 22, 2023)</strong>
                    <br />
                    <br />
                    Delve into the outstanding talents of the competition! Results will be showcased on the official website from December 17-24, 2023. All participants are encouraged to check the website for updates.
                    <br />
                    <br />
                    <strong>4. Prize Distribution Phase: December 26 - December 29, 2023</strong>
                    <br />
                    <br />
                    Attention Participants! Please ensure you provide a valid email address and digital wallet during registration for a seamless reward distribution.
                    <br />
                    <br />
                    <strong>5. Award Categories</strong>
                    <br />
                    <br />
                    (1) Group Awards (For translations into 2 or more languages):
                    <br />
                    First Prize (1 winner): 20,000 wcm, Metale NFT, and Amphi SBT
                    <br />
                    Second Prize (2 winners): 10,000 wcm, Metale NFT, and Amphi SBT
                    <br />
                    Third Prize (3 winners): 5,000 wcm, Metale NFT, and Amphi SBT
                    <br />
                    Judging Criteria: Winners will be chosen based on the overall score of their translated works. Winning works will also have the privilege of being credited in the published novel!
                    <br />
                    <br />
                    (2) Individual Awards (9 winners in total, one for each language):
                    <br />
                    Each winner will receive 5,000 wcm, a Metale NFT, and an Amphi SBT.
                    <br />
                    <br />
                    (3) Lucky Draw (12 winners):
                    <br />
                    Randomly selected participants who made it to the screening phase will receive an airdropped Amphi Pass NFT.
                    <br />
                    Special Note: Participants cannot apply for both Group and Individual awards simultaneously.
                </Paragraph>
            </TabPane>

            <TabPane tab="III. Competition Details" key="3">
            <Divider />
            <Title level={4}>III. Competition Details</Title>
            <Paragraph>
                <strong>1. Translation Languages and Requirements:</strong>
                For this competition, a total of 4 novels will be translated into nine languages: Chinese, Russian, French, Korean, Japanese, Spanish, Indonesian, English, and Portuguese.
                The organizers will provide the original manuscript of the novel along with AI translations for each language as a reference for the participating teams. Teams can utilize the original alongside the AI translation for their proofreading and translation process.
            </Paragraph>
            <Paragraph>
                <strong>2. Submission Method and Deadline:</strong>
                Method: All translated works should be submitted through the dedicated online submission system for the competition. After completing their translations, participants should save their work in Word format and upload it via the Amphi platform. Additionally, participants should ensure that their submissions do not contain any personally identifiable information to maintain the competition&aposs integrity.
                Deadline: All works must be submitted by November 15, 2023. Submissions after this date will not be accepted. To avoid last-minute technical or network issues, participants are advised to submit their works well in advance.
                Modifications and Resubmissions: Prior to the deadline, participants can make changes to or resubmit their work. The review committee will only evaluate the final version submitted by each participant.
            </Paragraph>
            <Paragraph>
                <strong>3. Copyright of the Works:</strong> The copyright for the translated works submitted by participants belongs to the original authors and Metale. By submitting their work, participants indicate their agreement to this term.
            </Paragraph>
            <Paragraph>
                <strong>4. Points to Note:</strong>
                Participants must adhere to the competition rules and avoid plagiarism or any unfair practices. Any violation will result in disqualification.
                Participants should respect the cultural essence of the original work and avoid any content that may be discriminatory or derogatory during the translation process. Non-adherence to this will result in disqualification.
            </Paragraph>
            </TabPane>

            <TabPane tab="IV. Evaluation Criteria" key="4">
            <Divider />
            <Title level={4}>IV. Evaluation Criteria</Title>
                <Paragraph>
                  <strong>1. Review Process</strong>
                  <br />
                  The evaluation process for this competition will incorporate a dual review method, utilizing artificial intelligence and expert translators.
                  <br />
                  <br />
                  <strong>First Round:</strong> The initial screening will be conducted using AI to evaluate the completion degree of the translation and the repetition and similarity rates between the translations. Works will be assessed based on their proofreading rate and the median repetition rate with the original AI translation. Works with a completion degree higher than the median will be eliminated and will not proceed to subsequent reviews.
                  <br />
                  <br />
                  <strong>Second Round:</strong> Translation experts will manually review the selected works from the first round. Winners will be chosen based on their overall scores and subsequently assigned the appropriate awards.
                  <br />
                  <br />
                </Paragraph>
                <Paragraph>
                    <strong>2. Evaluation Dimensions</strong>
                    <Table columns={columns2} dataSource={data2} pagination={false} />
                </Paragraph>
            </TabPane>

            <TabPane tab="V. Inquiries and Clarifications" key="5">
              <Title level={4}><strong>Contact us:</strong></Title>
              <Paragraph>
                  {/* <strong>Competition consultation:</strong> */}
                {/* <br />Official website of the competition : https://amphi.space */}
                <br />Contact: Kim
                <br />WeChat: kimdcai
                <br/>Email:amphiassistance@gmail.com
                <br/>💬 Community Q&A:
                <br/>Discord community click or scan there:
                <div onClick={handleDiscordClick} style={{ cursor: 'pointer' }}>
                  <img src={discordIocn} alt="Discord Icon" />
                </div>

                <br/>Telegram group click or scan there:
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

