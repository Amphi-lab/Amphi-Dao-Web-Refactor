import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const PrizeTab = (
    <Typography style={{ fontSize: '20px' }}>
        <Title level={5}>
            Total award 100,000 wcm token! Opportunity to obtain authorship rights for proofreading
            works!!
        </Title>

        <section>
            <Title level={5}>Team Award</Title>
            <p>
                Team <strong>1st</strong> Prize: 1 winner, with a reward of 20,000 wcm tokens +
                Metale NFT + Amphi SBT
            </p>

            <p>
                Team <strong>2nd</strong> Prize: 2 winners, each receiving 10,000 wcm tokens +
                Metale NFT+ Amphi SBT
            </p>

            <p>
                Team <strong>3rd</strong> Prize: 3 winners, each receiving 5,000 wcm tokens + Metale
                NFT + Amphi SBT
            </p>

            <p>
                *Rules for awards: The corresponding awards will be selected according to the
                ranking of the total scores of the translations.
            </p>
        </section>

        <section>
            <Title level={5}>Individual Monolingual Excellence Award</Title>
            <p>
                Single Language Excellence Award: <strong>9 winners,</strong> each receiving 5,000
                wcm tokens + Amphi SBT
            </p>
            <p>
                Best Potential Award: 1 winner, with a reward of 5,000 wcm tokens + an Amphi Pass
                NFT
            </p>

            <p>
                *Rules for awards: The corresponding awards will be selected according to the
                ranking of the total scores of the translations.
            </p>
        </section>

        <section>
            <Title level={5}>Lucky award</Title>

            <p>Amphi pass NFT * 12 lucky attendances</p>

            <p>
                *Group award and individual excellenc award cannot be superimposed for
                participation.
            </p>
        </section>
    </Typography>
);

const CompDetaisTab = (
    <Typography style={{ fontSize: '20px' }}>
        <section>
            <Title level={5}>
                Registration and translation stage: September 15, 2023-November 15, 2023
                <p>
                    (1) Log in to Amphi&apos;s official website: https://amphi.space to register for
                    free and fill in your personal information, and select the registration type
                    (group registration or individual registration); after submitting the
                    registration application, you will receive an email verification notification,
                    and follow the prompts to verify.
                </p>
            </Title>
        </section>
        <section>
            <Title level={5}>
                Registration and translation stage: September 15, 2023-November 15, 2023
            </Title>
            <p>
                (1) Log in to Amphi&apos;s official website: https://amphi.space to register for
                free and fill in your personal information, and select the registration type (group
                registration or individual registration); after submitting the registration
                application, you will receive an email verification notification, and follow the
                prompts to verify.
            </p>
            <p>
                (2) Contestants who have successfully registered log in to the Amphi official
                website, check and select the novels they need to proofread and translate, and
                download the works after selecting the works (original manuscript and AI
                translation). And translation, upload and submit the translated works in word
                document format before the deadline of the translation stage .
            </p>
        </section>
        <section>
            <Title level={5}>Work review stage: November 16, 2023-December 16, 2023</Title>
            <p>
                Contestants can check whether the evaluation status of their proofreading and
                translation works has been completed in the registration background of the official
                website.
            </p>
        </section>
        <section>
            <Title level={5}> Award publicity stage: December 17, 2023-December 24, 2023</Title>
            <p>
                The results of the review will be announced on the official website from December
                17th to 24th, 2023, and all contestants can log on to the official website to check.
                Award
            </p>
        </section>
        <section>
            <Title level={5}> distribution period: December 29, 2023-December 31, 2023</Title>
            <p>
                Relevant rewards will be issued through the wallet address registered by the
                contestants:
            </p>
        </section>
    </Typography>
);

const GudingTab = (
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
                <li>Fidelity to the emotion and context of the original text 9 points</li>
            </ul>
        </section>

        <section>
            <Title level={5}> Translation Difficulty Factor (20 points)</Title>
            <ul>
                <li>Specific Difficulty for Fiction Genres 20 points</li>
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
                <li>Overall coherence and readability of the work 10 points</li>
            </ul>
        </section>
    </Typography>
);

export { PrizeTab, CompDetaisTab, GudingTab };
