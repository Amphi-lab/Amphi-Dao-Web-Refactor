import React, { useEffect, useState } from 'react';
import { Descriptions, message } from 'antd';
import copyIcon from '@/assets/svg/icon-copy.svg';
import { useLocation, useParams } from 'react-router-dom';
import api from '@/api';
import { currentLanguages } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import { useClipboard } from 'use-clipboard-copy';
import { useAppDispatch } from '@/store/hooks';
import {
    getTranslationIndex,
    getTranslationState,
    getTranslationFileList,
    getOrderDetailData
} from '@/store/reducers/orderDetailSlice';
import { amountFromToken } from '@/utils/number';

/* {
    "createTime": "2023-07-01 19:01:11",
    "updateTime": null,
    "remark": null,
    "params": {},
    "id": 41,
    "translationIndex": 872594772328583200,
    "title": "1111",
    "instruction": "3333",
    "buyerAddress": "",
    "translator": null,
    "sourceLang": "62",
    "targetLang": "28",
    "translationCharacter": null,
    "translationType": "3",
    "translationTypeArray": null,
    "translationState": 0,
    "translationStateArray": null,
    "workload": "",
    "workloadType": -1,
    "deadline": "2023-07-29 00:00:00",
    "aiBounty": 0,
    "humanBounty": 45.93,
    "bounty": 111,
    "email": "111@163.com",
    "industry": "7",
    "jobFunction": "4",
    "revertMessage": "",
    "translationFiles": [
      {
        "createTime": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "id": 106,
        "translationIndex": 872594772328583200,
        "fileIndex": -1,
        "fileName": "Amphi-White - 副本 (3).doc",
        "fileSize": 12288,
        "videoLength": 0,
        "filePage": 0,
        "fileWords": 0,
        "filePath": "/3287c214-a424-4997-92cf-a935016994d7/Amphi-White - 副本 (3).doc",
        "fileType": 0,
        "filePurpose": 0,
        "isDownload": 0
      }
    ]
  } */

const OrderDes = () => {
    const dispatch = useAppDispatch();
    const clipboard = useClipboard();
    const location = useLocation();
    const searchParams = useParams();
    const { id } = location.state || searchParams;
    const [details, setDetails] = useState<any>({});

    console.log(id);
    console.log(searchParams);

    useEffect(() => {
        api.getOrderDetail(id).then((res: any) => {
            if (res?.code === 200 && res?.data) {
                dispatch(getTranslationIndex(res.data.translationIndex));
                dispatch(getTranslationState(res.data.translationState));
                dispatch(getTranslationFileList(res.data.translationFiles));
                dispatch(getOrderDetailData(res.data));
                setDetails((prev: any) => {
                    return {
                        prev,
                        ...res?.data
                    };
                });
            }
        });
    }, [dispatch, id]);

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

    // 文件列表
    const fileEls = details.translationFiles?.map((file: any) => {
        return (
            <a
                key={file.id}
                href='#'
                style={{ cursor: 'pointer' }}
                onClick={e => handleDownlodaFile(e, file.filePath)}
            >
                {file.fileName}
            </a>
        );
    });

    // copy NO.
    const hanldeCopyNumber = (number: any) => {
        clipboard.copy(number.toString());
        message.success('Copyed that!');
    };

    return (
        <Descriptions layout='vertical'>
            <Descriptions.Item label='Language'>{`From ${optionsMap(currentLanguages).get(
                details?.sourceLang
            )} to ${optionsMap(currentLanguages).get(details?.targetLang)}`}</Descriptions.Item>
            <Descriptions.Item label='Workload'>{details?.workload} words</Descriptions.Item>
            <Descriptions.Item label='Your upcoming payment'>
                {amountFromToken(details?.humanBounty)}USDT
            </Descriptions.Item>
            <Descriptions.Item label='Submission time'>{details?.createTime}</Descriptions.Item>
            <Descriptions.Item label='Deadline'>{details?.deadline}</Descriptions.Item>
            <Descriptions.Item label='Order number'>
                <span>No.{details?.translationIndex}</span>
                <img
                    src={copyIcon}
                    style={{ cursor: 'pointer', verticalAlign: 'middle', marginLeft: '5px' }}
                    alt=''
                    onClick={() => hanldeCopyNumber(details?.translationIndex)}
                />
            </Descriptions.Item>
            <Descriptions.Item label='Content to translate'>{fileEls}</Descriptions.Item>
            <Descriptions.Item label='Score' span={2}>
                {details?.instruction}
            </Descriptions.Item>
        </Descriptions>
    );
};

export default OrderDes;
