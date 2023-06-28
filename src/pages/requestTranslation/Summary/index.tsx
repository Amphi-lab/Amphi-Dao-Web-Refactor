import React from 'react';
import selectedIcon from '@/assets/svg/summary-selected.svg';
import unSelectedIcon from '@/assets/svg/summary-unselected.svg';
import { useAppSelector } from '@/store/hooks';
import { summaryWorkload } from '@/store/reducers/requestTransSlice';
import Card from '../Card';
import styles from './index.module.scss';

const SummaryCard = () => {
    const workload = useAppSelector(summaryWorkload);
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
                    <img src={workload ? selectedIcon : unSelectedIcon} alt='' />
                </li>
                <p>{workload ? `${workload} words` : '-'}</p>
                <li>
                    <span>Deadline</span>
                    <img src={unSelectedIcon} alt='' />
                </li>
                <p>-</p>
            </ul>
        </Card>
    );
};

export default SummaryCard;
