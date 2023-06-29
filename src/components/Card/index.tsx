import type { ReactNode } from 'react';
import React from 'react';
import styles from './index.module.scss';

interface Iprops {
    title?: string;
    children: ReactNode;
}

const AmCard = ({ title = '', children }: Iprops) => {
    return (
        <div className={styles['request-trans-card']}>
            {title ? <h6>{title}</h6> : ''}
            {children}
        </div>
    );
};

export default AmCard;
