import React from 'react';
import PageTitle from '@/components/PageTitle'; // 引入自定义的 PageTitle 组件
import RequestForm from './Form'; // 引入本地的 RequestForm 组件
import SummaryCard from './Summary'; // 引入本地的 SummaryCard 组件
import TotalCostCard from './TotalCost'; // 引入本地的 TotalCostCard 组件
import styles from './index.module.scss'; // 导入 CSS 模块的样式

const RequestTranslation = () => {
    return (
        <>
            <PageTitle title='Get your professional translation' />
            <main className={styles['request-trans-wrapper']}>
                <div className={styles['request-trans-left']}>
                    <RequestForm />
                </div>
                <div className={styles['request-trans-right']}>
                    <SummaryCard />
                    <TotalCostCard />
                    {/* <ConfirmOrderCard onSave={hanldeSaveOrder} /> */}
                </div>
            </main>
        </>
    );
};

export default RequestTranslation; // 导出 RequestTranslation 组件
