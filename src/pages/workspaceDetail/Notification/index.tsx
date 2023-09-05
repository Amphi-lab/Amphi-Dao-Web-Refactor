import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { translationIndex } from '@/store/reducers/orderDetailSlice';
import BaseNotification from '@/pageComponents/others/BaseNotification';

const Notification = () => {
    const transIndex = useAppSelector(translationIndex);

    return <BaseNotification translationIndex={transIndex} />;
};

export default Notification;
