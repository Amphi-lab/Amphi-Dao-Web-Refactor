import React from 'react';
import selectedIcon from '@/assets/svg/summary-selected.svg';
import unSelectedIcon from '@/assets/svg/summary-unselected.svg';
import Card from '../Card';
import styles from './index.module.scss';

const SummaryCard = () => {
    return (
        <Card title='Summary'>
            <ul className={styles['summary-list']}>
                <li>
                    <span>Translation Language</span>
                    <img src={selectedIcon} alt='' />
                </li>
                <p>English to Chinese</p>
                <li>
                    <span>Service Type</span>
                    <img src={unSelectedIcon} alt='' />
                </li>
                <p>-</p>
                <li>
                    <span>Workload</span>
                    <img src='' alt='' />
                </li>
                <p>-</p>
                <li>
                    <span>Deadline</span>
                    <img src='' alt='' />
                </li>
                <p>-</p>
            </ul>
        </Card>
    );
};

export default SummaryCard;
