import React from 'react';
import banner from '@/assets/svg/banner.svg';
import bannerText from '@/assets/svg/bannerText.svg';
import styles from './index.module.scss';

const Banner = () => {
    return (
        <div className={styles['amphi-banner']}>
            <img src={banner} alt='banner' className={styles['banner-img']} />
            <img src={bannerText} alt='' />
            <button className={styles['go-now']} type='submit'>
                GO NOW
            </button>
        </div>
    );
};

export default Banner;
