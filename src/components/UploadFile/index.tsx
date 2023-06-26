import React from 'react';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import UploadFileIcon from '@/assets/svg/uploadFileIcon.svg';
import { AMPHI_USERTOKEN } from '@/constants/storageKeys';
import styles from './index.module.scss';

const { Dragger } = Upload;

const action = `${import.meta.env.VITE_BASE_URL}/file/upload`;
const token = localStorage.getItem(AMPHI_USERTOKEN);
const headers = { authorization: 'authorization-text', token: token as string };

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action,
    headers,
    showUploadList: true,
    // onChange(info) {
    //     const { status } = info.file;
    //     if (status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //     }
    //     if (status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully.`);
    //     } else if (status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    // },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    }
};

const UploadFile: React.FC = ({ onChange }: UploadProps) => (
    <Dragger {...props} onChange={onChange} className='amphi-file-upload'>
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
