import React, {useCallback} from 'react';
import { Typography, Button } from 'antd';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

const { Title } = Typography;

interface TabContentProps{
    onApply: () => void,
}

const PrizeTab:React.FC<TabContentProps> = ({ onApply })=> (
    <Typography style={{ fontSize: '20px' }}>
        <section>
            <Title level={4}>Group Awards</Title>
            <p>Team <strong>1st</strong> Prize: 20,000 wcm & Metale NFTs & Amphi SBT!</p>
            <p> Only 1 winner</p>
            <p>Team <strong>2nd</strong> Prize: 10,000 wcm & Metale NFTs & Amphi SBT!</p>
            <p>2 winners</p>
            <p>Team <strong>3rd</strong> Prize: 5,000 wcm, Metale NFT, and Amphi SBT</p>
            <p>3 winners</p>
        </section>

        <section>
            <Title level={4}>Individual Awards</Title>
            <p>5,000 wcm, Metale NFT and Amphi SBT</p>
            <p>9 winners</p>
        </section>

        <section>
            <Title level={4}>Lucky award</Title>

            <p>Amphi pass NFT</p>
            <p>12 lucky attendances</p>

            <p>
                *Group award and individual excellenc award cannot be superimposed for
                participation.<Button onClick={onApply} className={styles['competition-button-tab']}>Apply</Button>
            </p>
        </section>
    </Typography>
);

const CompDetaisTab :React.FC<TabContentProps>= ({ onApply })=> (
    <Typography style={{ fontSize: '20px' }}>
        <section>
            <Title level={4}>Registration Period (15th September - 15th November 2023)</Title>
            <p>
                (1) Log in to Amphi&apos;s official website: https://amphi.space to register for
                free and fill in personal information, select the registration type (group registration or individual registration); after submitting the registration application, you will receive an email verification notification, follow the prompts to verify.
            </p>
            <p>
                (2) Successfully registered contestants log in to the Amphi official website, view and select the novel and proofread. After selecting novels task, download original manuscript and AI translation draft to proofread. After complete proofreading, submit translation works in word document format before 15th November 2023.
            </p>
        </section>
        <section>
            <Title level={4}>Review Period (16th November - 16th December 2023)</Title>
            <p>
                Contestants can check whether the review status of their proofread translation works 
                has been completed in the registration background of the official website.
            </p>
        </section>
        <section>
            <Title level={4}> Award Announcement Period (December 18 - December 22, 2023)</Title>
            <p>
                Delve into the outstanding talents of the competition! Results will be showcased on the official website from December 17-24, 2023. All participants are encouraged to check the website for updates.
            </p>
        </section>
        <section>
            <Title level={4}> Prize Distribution Phase: December 26 - December 29, 2023 </Title>
            <p>
                Attention Participants! Please ensure you provide a valid email address and digital wallet during registration for a seamless reward distribution. 
                <Button  onClick={onApply} className={styles['competition-button-tab']}>Apply</Button>
            </p>
        </section>
    </Typography>
);

const GudingTab:React.FC<TabContentProps> = ({ onApply }) => (
    <Typography style={{ fontSize: '20px' }}>
        <section>
            <Title level={5}> Language quality (25 points)</Title>
            <ul>
                <li>grammatical accuracy 8 points</li>
                <li>word accuracy 8 points</li>
                <li>sentence fluency 9 points</li>
            </ul>
        </section>

        <section>
            <Title level={5}> Cultural transmission (25 points)</Title>
            <ul>
                <li>Cultural fit 8 points</li>
                <li>Preservation and Transmission of Local Colors 8 points</li>
                <li>Faithful to the original text 9 points</li>
            </ul>
        </section>

        <section>
            <Title level={5}> Translation Difficulty (20 points)</Title>
            <ul>
                <li>Difficulty of types 20 points</li>
                {/*  */}
            </ul>
        </section>

        <section>
            <Title level={5}> Word count and language diversity (20 points)</Title>
            <ul>
                <li>Score based on the word count of the novel 10 points</li>
                <li>Score based on diversity of target languages 10 points</li>
            </ul>
        </section>

        <section>
            <Title level={5}> Overall impression (10 points)</Title>
            <ul>
                <li>Overall coherence and readability of the work 10 points</li><Button onClick={onApply} className={styles['competition-button-tab']}>Apply</Button>
            </ul>
        </section>
    </Typography>
);

interface GenerateTabProps {
    tabKey: 'prizeTab' | 'compDetaisTab' | 'gudingTab';
}

const GenerateTab: React.FC<GenerateTabProps> = ({tabKey})=>{
 const { setShowAuthFlow, user } = useDynamicContext();
 const navigate = useNavigate();

 const tabItem:{
    prizeTab:React.FC<TabContentProps>,
    compDetaisTab:React.FC<TabContentProps>,
    gudingTab:React.FC<TabContentProps>
 } = {
     prizeTab: PrizeTab,
     compDetaisTab: CompDetaisTab,
     gudingTab: GudingTab
    };

const onApply = useCallback(()=>{
    if(user){
        navigate('competition');
    }else{
        setShowAuthFlow(true)
    }
},[user]);

 const TabCom: React.ElementType<TabContentProps> = tabItem[tabKey];
 return <TabCom onApply={onApply}/>
}

export default GenerateTab;
