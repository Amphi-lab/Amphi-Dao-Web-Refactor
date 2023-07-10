import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { currentStep } from '@/store/reducers/orderDetailSlice';
import Schedule from './Schedule';
import Detail from './Detail';
import TranCandidate from './TranCandidate';
import TranContent from './TranContent';
import Notification from './Notification';
import styles from './index.module.scss';
import ServiceRating from './ServiceRating';
// import routes from '~react-pages';

const OrderDetail = () => {
    const step = useAppSelector(currentStep);
    console.log('order index step', step);
    return (
        <div className={styles['order-detail-wrapper']}>
            <Schedule />
            <Detail />
            {step === 1 && <TranCandidate />}
            {(step === 2 || step === 3) && <TranContent />}
            {(step === 2 || step === 3) && <Notification />}
            {step === 3 && <ServiceRating />}
            {/* <TranCandidate />
            <TranContent />
            <Notification />
            <ServiceRating /> */}
        </div>
    );
};

export default OrderDetail;
