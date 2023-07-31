import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { translationFileList } from '@/store/reducers/orderDetailSlice';

import BaseTranContent from './BaseTranContent';

const TranContent = () => {
    const fileList = useAppSelector(translationFileList);
    return <BaseTranContent fileList={fileList} />;
};

export default TranContent;
