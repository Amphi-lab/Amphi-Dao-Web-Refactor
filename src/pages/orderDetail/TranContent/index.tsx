import React from 'react';
import AmCard from '@/components/Card';
import lineIcon from '@/assets/svg/trans-content-line.svg';
import languageIcon from '@/components/Icon/Language';
import downloadIcon from '@/components/Icon/Download';
import IconButton from '@/components/IconButton';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { translationFileList } from '@/store/reducers/orderDetailSlice';
import api from '@/api';
import styles from './index.module.scss';

const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};

const textStyle = {
    color: '#323335'
};
const TranContent = () => {
    const fileList = useAppSelector(translationFileList);
    const onChange = (key: string) => {
        console.log(key);
    };

    // 文件下载
    const handleDownlodaFile = (e: any, path: string) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('path', path);
        api.getFileDownloadPath(formData).then((res: any) => {
            if (res.code === 200) {
                window.open(res.data.url, '_blank');
            }
        });
    };

    // 原文件
    const getOriginFileList = () => {
        const originFiles = fileList.filter((file: any) => file?.filePurpose === 0);
        if (originFiles.length === 0) {
            return (
                <p className={styles['sub-card-human-content']}>
                    The original file has not been uploaded yet,please upload...
                </p>
            );
        }
        return originFiles?.map((item: any) => {
            return (
                <div className={styles['sub-card-content']} key={item.id}>
                    <IconButton icon={languageIcon} text={item.fileName} textStyle={textStyle} />
                    <IconButton
                        icon={downloadIcon}
                        text='Download'
                        onClick={(e: any) => handleDownlodaFile(e, item.filePath)}
                    />
                </div>
            );
        });
    };

    // AI 翻译的文件
    const getAIFileList = () => {
        const AIFiles = fileList.filter((file: any) => file?.filePurpose === 6);
        if (AIFiles.length === 0) {
            return (
                <p className={styles['sub-card-human-content']}>
                    AI is translating, please wait...
                </p>
            );
        }
        return AIFiles?.map((item: any) => {
            return (
                <div className={styles['sub-card-content']} key={item.id}>
                    <IconButton icon={languageIcon} text={item.fileName} textStyle={textStyle} />
                    <IconButton
                        icon={downloadIcon}
                        text='Download'
                        onClick={(e: any) => handleDownlodaFile(e, item.filePath)}
                    />
                </div>
            );
        });
    };

    // const getHumanFileList = () => {
    //     return fileList?.map((item: any) => item.filePurpose === 1);
    // };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Al Translation`,
            children: getAIFileList()
            // children: (
            //     <div className={styles['sub-card-content']}>
            //         <IconButton icon={languageIcon} text='Ocean.txt' textStyle={textStyle} />
            //         <IconButton icon={downloadIcon} text='Download' />
            //     </div>
            // )
        },
        {
            key: '2',
            label: `Proofreading`,
            children: (
                <p className={styles['sub-card-human-content']}>
                    The translator is working hard to translate, please wait...
                </p>
            )
        }
    ];
    return (
        <AmCard title='Translate Content' cardStyle={cardStyle}>
            <div className={styles['trans-content-box']}>
                <div className={styles['trans-content-sub-card']}>
                    <p className={styles['sub-card-title']}>Original Content</p>
                    {getOriginFileList()}
                    {/* <div className={styles['sub-card-content']}>
                        <IconButton icon={languageIcon} text='Ocean.txt' textStyle={textStyle} />
                        <IconButton icon={downloadIcon} text='Download' />
                    </div> */}
                </div>
                <img src={lineIcon} alt='' className={styles['trans-content-line']} />

                <div className={styles['trans-content-sub-card']}>
                    <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
                </div>
            </div>
        </AmCard>
    );
};

export default TranContent;
