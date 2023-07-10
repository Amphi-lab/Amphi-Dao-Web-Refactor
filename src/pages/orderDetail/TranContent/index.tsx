import React from 'react';
import AmCard from '@/components/Card';
import lineIcon from '@/assets/svg/trans-content-line.svg';
import languageIcon from '@/components/Icon/Language';
import downloadIcon from '@/components/Icon/Download';
import IconButton from '@/components/IconButton';
import { Button, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { translationFileList, translationIndex } from '@/store/reducers/orderDetailSlice';
import api from '@/api';
import glossaryIcon from '@/components/Icon/Glossary';
import { getAmphi } from '@/contracts/contract';
import styles from './index.module.scss';
import Glossary from './glossary';
import RejectForm from './receive/rejectForm';

const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};

const textStyle = {
    color: '#323335'
};
const TranContent = () => {
    const childRef: any = React.createRef();
    const fileList = useAppSelector(translationFileList);
    const transIndex = useAppSelector(translationIndex);

    const onChange = (key: string) => {
        console.log(key);
    };

    const handlereceiveTask = async (isPass: boolean) => {
        childRef?.current?.showModal();
        const amphi = await getAmphi();
        const receivePro = {
            index: transIndex,
            isPass,
            file: isPass ? '' : '',
            illustrate: isPass ? '' : ''
        };
        amphi.methods
            .receiveTask(receivePro)
            .call()
            .then((data: any) => {
                console.log(data);
            })
            .catch((err: any) => {
                console.log('err', err);
            });
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
    // const getHumanFileList = () => {
    //     const humanFiles = fileList.filter((file: any) => file?.filePurpose === 1);
    //     if (humanFiles.length === 0) {
    //         return (
    //             <p className={styles['sub-card-human-content']}>
    //                 The translator is working hard to translate, please wait...
    //             </p>
    //         );
    //     }
    //     return humanFiles?.map((item: any) => {
    //         return (
    //             <>
    //                 <div className={styles['sub-card-content']} key={item.id}>
    //                     <IconButton
    //                         icon={languageIcon}
    //                         text={item.fileName}
    //                         textStyle={textStyle}
    //                     />
    //                     <IconButton
    //                         icon={downloadIcon}
    //                         text='Download'
    //                         onClick={(e: any) => handleDownlodaFile(e, item.filePath)}
    //                     />
    //                 </div>

    //                 <div>
    //                     <Button>Reject</Button>
    //                     <Button>Accept</Button>
    //                 </div>
    //             </>
    //         );
    //     });
    // };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Al Translation`,
            children: getAIFileList()
        },
        {
            key: '2',
            label: `Proofreading`,
            // children: getHumanFileList()
            children: (
                <div className={styles['human-area']}>
                    <div className={`${styles['sub-card-content']} ${styles['human-sub-card']}`}>
                        <IconButton icon={languageIcon} text='sfjlsfjsl' textStyle={textStyle} />
                        <IconButton
                            icon={downloadIcon}
                            text='Download'
                            onClick={(e: any) => handleDownlodaFile(e, 'sjflsfsljf')}
                        />
                    </div>

                    <div className={styles['human-area-btns']}>
                        <Button ghost onClick={() => handlereceiveTask(false)}>
                            Reject
                        </Button>
                        <Button
                            type='primary'
                            className={styles.accept}
                            onClick={() => handlereceiveTask(true)}
                        >
                            Accept
                        </Button>
                    </div>
                </div>
            )
        }
    ];

    const showGlossaryModal = () => {
        childRef?.current?.showModal();
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
            <Glossary onRef={childRef} />
            <RejectForm onRef={childRef} />
        </>
    );
};

export default TranContent;
