import React from 'react';
import styles from './index.module.scss';

type IProps = {
    subTitle: string;
};
const SubBanner = ({ subTitle }: IProps) => {
    return <div className={styles['sub-banner']}>{subTitle}</div>;
};

export default SubBanner;
