import React from 'react';
import AmCard from '@/components/Card';
import { useAppSelector } from '@/store/hooks';
import {
    totalCost,
    amphiServiceCost,
    bounty,
    translatorFee
} from '@/store/reducers/requestTransSlice';
import { Tooltip } from 'antd';

import styles from './index.module.scss';

const TotalCost = () => {
    const amServiceCost = useAppSelector(amphiServiceCost);
    const amTotalCost = useAppSelector(totalCost);
    const amBounty = useAppSelector(bounty);
    const amTranslatorFee = useAppSelector(translatorFee);
    return (
        <AmCard title='Total cost'>
            <ul className={styles['total-cost-list']}>
                <Tooltip title='The Amphi service is 20% of the bounty' placement='top'>
                    <li>
                        <span>Amphi service cost</span>
                        <strong>{`${amServiceCost} USDT`}</strong>
                    </li>
                </Tooltip>
                <Tooltip title='1000words/55U' placement='top'>
                    <li>
                        <span>Translator Fee</span>
                        <strong>{`${amTranslatorFee} USDT`}</strong>
                    </li>
                </Tooltip>
                <li>
                    <span>Bounty</span>
                    <strong>{`${amBounty} USDT`}</strong>
                </li>
                <li>
                    <span>Total</span>
                    <strong>{amTotalCost} USDT</strong>
                </li>
            </ul>
        </AmCard>
    );
};

export default TotalCost;
