import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import copyIcon from '@/assets/svg/icon-copy.svg';
import { useLocation } from 'react-router-dom';
import api from '@/api';

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
    const location = useLocation();
    const id = location.state || +location.pathname.split('/')[2];
    const [details, setDetails] = useState({});

    useEffect(() => {
        api.getOrderDetail(id).then((res: any) => {
            if (res?.code === 200 && res?.data) {
                setDetails(prev => {
                    return {
                        prev,
                        ...res?.data
                    };
                });
            }
        });
    }, [id]);

    return (
        <Descriptions layout='vertical'>
            <Descriptions.Item label='Language'>{`From ${details?.sourceLang} to ${details?.targetLang}`}</Descriptions.Item>
            <Descriptions.Item label='Workload'>{details?.workload} words</Descriptions.Item>
            <Descriptions.Item label='Your upcoming payment'>
                {details?.humanBounty}USTD
            </Descriptions.Item>
            <Descriptions.Item label='Submission time'>{details?.createTime}</Descriptions.Item>
            <Descriptions.Item label='Deadline'>{details?.deadline}</Descriptions.Item>
            <Descriptions.Item label='Order number'>
                <span>No.{details?.translationIndex}</span>
                <img src={copyIcon} alt='' />
            </Descriptions.Item>
            <Descriptions.Item label='Content to translate'>
                {details?.translationFiles?.map(file => (
                    <a href={file.filePath} key={file.id}>
                        {file.fileName}
                    </a>
                ))}
            </Descriptions.Item>
            <Descriptions.Item label='Instructions for Translator' span={2}>
                {details?.instruction}
            </Descriptions.Item>
        </Descriptions>
    );
};

export default OrderDes;
