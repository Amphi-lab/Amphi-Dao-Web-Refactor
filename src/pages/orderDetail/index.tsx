import React from 'react';
import Schedule from './Schedule';
import Detail from './Detail';
import TranCandidate from './TranCandidate';
import styles from './index.module.scss';

const OrderDetail = () => {
    return (
        <div className={styles['order-detail-wrapper']}>
            <Schedule />
            <Detail />
            <TranCandidate />
        </div>
    );
};

export default OrderDetail;
