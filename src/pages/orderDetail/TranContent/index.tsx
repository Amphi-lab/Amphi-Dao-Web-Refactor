import React from 'react';
import AmCard from '@/components/Card';
import lineIcon from '@/assets/svg/trans-content-line.svg';
import languageIcon from '@/components/Icon/Language';
import downloadIcon from '@/components/Icon/Download';
import IconButton from '@/components/IconButton';
import { Button, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { translationFileList } from '@/store/reducers/orderDetailSlice';
import api from '@/api';
import glossaryIcon from '@/components/Icon/Glossary';
// import { getAmphi } from '@/contracts/contract';
import styles from './index.module.scss';
import Glossary from './glossary';
import RejectForm from './receive/rejectForm';
import AcceptForm from './receive/AcceptForm';

const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};

const textStyle = {
    color: '#323335'
};
const TranContent = () => {
    const childGlossaryRef: any = React.createRef();
    const childRejctRef: any = React.createRef();
    const childAcceptRef: any = React.createRef();
    const fileList = useAppSelector(translationFileList);

    const onChange = (key: string) => {
        console.log(key);
    };

    const handleReceiveTask = async () => {
        childRejctRef?.current?.showRejectModal();
    };

    const handleAcceptTask = async () => {
        childAcceptRef?.current?.showAcceptModal();
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

    // 人工翻译文件
    const getHumanFileList = () => {
        const humanFiles = fileList.filter((file: any) => file?.filePurpose === 1);
        if (humanFiles.length === 0) {
            return (
                <p className={styles['sub-card-human-content']}>
                    The translator is working hard to translate, please wait...
                </p>
            );
        }
        return humanFiles?.map((item: any) => {
            return (
                <>
                    <div className={styles['sub-card-content']} key={item.id}>
                        <IconButton
                            icon={languageIcon}
                            text={item.fileName}
                            textStyle={textStyle}
                        />
                        <IconButton
                            icon={downloadIcon}
                            text='Download'
                            onClick={(e: any) => handleDownlodaFile(e, item.filePath)}
                        />
                    </div>

                    <div>
                        <Button ghost onClick={() => handleReceiveTask()}>
                            Reject
                        </Button>
                        <Button
                            type='primary'
                            className={styles.accept}
                            onClick={() => handleAcceptTask()}
                        >
                            Accept
                        </Button>
                    </div>
                </>
            );
        });
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Al Translation`,
            children: getAIFileList()
        },
        {
            key: '2',
            label: `Proofreading`,
            children: getHumanFileList()
        }
    ];

    const showGlossaryModal = () => {
        childGlossaryRef?.current?.showGlossaryModal();
    };

    const rightContent = (
        <IconButton icon={glossaryIcon} text='View Glossary' onClick={showGlossaryModal} />
    );
    return (
        <>
            <AmCard title='Translate Content' cardStyle={cardStyle} rightContent={rightContent}>
                <div className={styles['trans-content-box']}>
                    <div className={styles['trans-content-sub-card']}>
                        <p className={styles['sub-card-title']}>Original Content</p>
                        {getOriginFileList()}
                    </div>
                    <img src={lineIcon} alt='' className={styles['trans-content-line']} />

                    <div className={styles['trans-content-sub-card']}>
                        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
                    </div>
                </div>
            </AmCard>
            <Glossary onRef={childGlossaryRef} />
            <RejectForm onRef={childRejctRef} />
            <AcceptForm onRef={childAcceptRef} />
        </>
    );
};

export default TranContent;
