import React from 'react';
import type { UploadProps } from 'antd';
import { Upload, message } from 'antd';
import UploadFileIcon from '@/assets/svg/uploadFileIcon.svg';
import { AMPHI_USERTOKEN } from '@/constants/storageKeys';
import styles from './index.module.scss';

const { Dragger } = Upload;

const action = `${import.meta.env.VITE_BASE_URL}/file/upload`;
const token = localStorage.getItem(AMPHI_USERTOKEN);
const headers = { authorization: 'authorization-text', token: token as string };
const accept = '.ass,.srt,.txt,.doc,.docx,.pdf,.xls,.xlsx';

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action,
    headers,
    // showUploadList: true,
    accept,
    maxCount: 10,
    beforeUpload(file) {
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
            message.error('A file must smaller than 20MB !');
            return isLt20M;
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    }
};

const UploadFile: React.FC = ({ onChange, defaultFileList }: UploadProps) => (
    <Dragger
        {...props}
        onChange={onChange}
        defaultFileList={defaultFileList}
        className='amphi-file-upload'
    >
        <p className='ant-upload-drag-icon'>
            <img src={UploadFileIcon} alt='' />
        </p>
        <p className={styles['ant-upload-text']}>Click to select, or drag and drop files here</p>
        <p className={styles['ant-upload-hint']}>
            <span>Support uploading ass, srt, txt, doc, docx, pdf, xls, xlsx formats</span>
            <br />
            <span>
                A single file is less than or equal to 20 M, and a maximum of 10 files can be
                uploaded
            </span>
        </p>
    </Dragger>
);

export default UploadFile;
