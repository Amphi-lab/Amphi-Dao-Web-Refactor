import React from 'react';
import Card from '../../../components/AmphiCard';
import styles from './index.module.scss';

const TotalCost = () => {
    return (
        <Card title='Total cost'>
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
        </Card>
    );
};

export default TotalCost;
