import React from 'react';
import AmCard from '@/components/Card';
// import lineIcon from '@/assets/svg/trans-content-line.svg';
import languageIcon from '@/components/Icon/Language';
import downloadIcon from '@/components/Icon/Download';
import IconButton from '@/components/IconButton';
import { Row, Col, Button, Tabs, Upload, message } from 'antd';

import type { TabsProps, UploadProps } from 'antd';
import api from '@/api';
// import glossaryIcon from '@/components/Icon/Glossary';
// import { getAmphi } from '@/contracts/contract';
import { AMPHI_USERTOKEN } from '@/constants/storageKeys';
import { noop } from '@/utils/util';
import styles from './index.module.scss';
import Glossary from './glossary';
import RejectForm from './receive/rejectForm';
import AcceptForm from './receive/AcceptForm';

type BaseTranContentProps = {
    fileList?: [];
    workspace?: boolean;

    onUploadFile?: () => void;
};

const cardStyle = {
    background: '#FFF',
    padding: '16px 24px 24px'
};

const textStyle = {
    color: '#323335'
};

const action = `${import.meta.env.VITE_BASE_URL}/file/upload`;
const token = localStorage.getItem(AMPHI_USERTOKEN);
const headers = { authorization: 'authorization-text', token: token as string };
const accept = '.ass,.srt,.txt,.doc,.docx,.pdf,.xls,.xlsx';

const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action,
    headers,
    showUploadList: false,
    accept,
    maxCount: 1,
    beforeUpload(file) {
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
            message.error('A file must smaller than 20MB !');
            return isLt20M;
        }
    }
};

const BaseTranContent = ({
    fileList = [],
    workspace = false,
    // eslint-disable-next-line no-unused-vars
    onUploadFile = noop
}: BaseTranContentProps) => {
    const childGlossaryRef: any = React.createRef();
    const childRejctRef: any = React.createRef();
    const childAcceptRef: any = React.createRef();

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
        return (
            <>
                {originFiles?.map((item: any) => {
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
                })}
                <Upload {...uploadProps}>
                    <Button type='primary' className={styles.accept}>
                        Upload
                    </Button>
                </Upload>
            </>
        );
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

    const getHumanFileListByWorkspace = () => {
        const humanFiles = fileList.filter((file: any) => file?.filePurpose === 1);
        if (humanFiles.length === 0) {
            return (
                <div className={styles['workspace-sub-card-content']}>
                    <p className={styles['sub-card-human-content']}>Show after upload</p>
                    <IconButton
                        icon={downloadIcon}
                        text='Download'
                        onClick={(e: any) => handleDownlodaFile(e, item.filePath)}
                    />
                    <Upload {...uploadProps}>
                        <Button type='primary' className={styles.accept}>
                            Upload
                        </Button>
                    </Upload>
                </div>
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
            children: workspace ? getHumanFileList() : getHumanFileListByWorkspace()
        }
    ];

    // const showGlossaryModal = () => {
    //     childGlossaryRef?.current?.showGlossaryModal();
    // };

    // const rightContent = (
    //     <IconButton icon={glossaryIcon} text='View Glossary' onClick={showGlossaryModal} />
    // );

    return (
        <>
            {/* <AmCard title='Translate Content' cardStyle={cardStyle} rightContent={rightContent}> */}
            <AmCard title='Translate Content' cardStyle={cardStyle}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className={styles['trans-content-sub-card']}>
                            <p className={styles['sub-card-title']}>Original Content</p>
                            {getOriginFileList()}
                            <IconButton
                                icon={downloadIcon}
                                text='Download'
                                onClick={(e: any) => handleDownlodaFile(e, item.filePath)}
                            />
                        </div>
                    </Col>

                    {/* <img src={lineIcon} alt='' className={styles['trans-content-line']} /> */}
                    <Col span={12}>
                        <div className={styles['trans-content-sub-card']}>
                            <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
                            {workspace && (
                                <Upload {...uploadProps}>
                                    <Button type='primary' className={styles.accept}>
                                        Upload
                                    </Button>
                                </Upload>
                            )}
                        </div>
                    </Col>
                </Row>
            </AmCard>
            <Glossary onRef={childGlossaryRef} />
            <RejectForm onRef={childRejctRef} />
            <AcceptForm onRef={childAcceptRef} />
        </>
    );
};

export default BaseTranContent;
