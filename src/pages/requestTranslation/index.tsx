import React from 'react';
import PageTitle from '@/components/PageTitle';
import RequestForm from './Form';
import styles from './index.module.scss';

const RequestTranslation = () => {
    return (
        <>
            <PageTitle title='Get your professional translation' />
            <main className={styles['request-trans-wrapper']}>
                <div className={styles['request-trans-left']}>
                    <RequestForm />
                </div>
                <div className={styles['request-trans-right']}>dfjlsfjslfjsld</div>
            </main>
        </>
    );
};

export default RequestTranslation;
