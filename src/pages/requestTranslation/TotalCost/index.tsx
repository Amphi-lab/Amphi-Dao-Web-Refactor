import React from 'react';
import AmCard from '@/components/Card';
import styles from './index.module.scss';

const TotalCost = () => {
    return (
        <AmCard title='Total cost'>
            <ul className={styles['total-cost-list']}>
                <li>
                    <span>Amphi service cost</span>
                    <strong>200 USDT</strong>
                </li>
                <li>
                    <span>Translator Fee</span>
                    <strong>200 USDT</strong>
                </li>
                <li>
                    <span>Bounty</span>
                    <strong>200 USDT</strong>
                </li>
                <li>
                    <span>Total</span>
                    <strong>200 USDT</strong>
                </li>
            </ul>
        </AmCard>
    );
};

export default TotalCost;
