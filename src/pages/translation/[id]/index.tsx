import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Descriptions, Button } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';

import { currentLanguages, jobFunctions } from '@/constants/selcet.json';
import AmCard from '@/components/Card';
import arrowLeft from '@/assets/svg/arrow-left.svg';
import verBar from '@/assets/svg/vertical-bar.svg';
import { amountFromToken } from '@/utils/number';
import { optionsMap } from '@/utils/array';
import AvatarLabel from '@/components/AvatarLabel';
import api from '@/api';

import './index.scss';
import MessageModalWrap from '@/pageComponents/translation/MessageModalWrap';

const cardStyle = {
    background: '#FFF',
    padding: '8px 24px 8px'
};

export default function TranslationDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [detail, setDetail] = useState<any>();

    const backToMyOrder = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (id) {
            api.getOrderDetail(id).then((res: any) => {
                if (res?.code === 200 && res?.data) {
                    // dispatch(getTranslationIndex(res.data.translationIndex));
                    // dispatch(getTranslationState(res.data.translationState));
                    // dispatch(getTranslationFileList(res.data.translationFiles));
                    // dispatch(getOrderDetailData(res.data));
                    setDetail((prev: any) => {
                        return {
                            prev,
                            ...res?.data
                        };
                    });
                }
            });
        }
    }, [id]);

    return (
        <div className='translation-detail-wrapper'>
            <AmCard cardStyle={cardStyle}>
                <div className='translation-detail-top-nav' onClick={backToMyOrder}>
                    <img src={arrowLeft} alt='' />
                    <img src={verBar} alt='' className='nav-ver-bar' />
                    <span>Back to the list</span>
                </div>
            </AmCard>

            <AmCard
                title={detail?.title}
                cardStyle={cardStyle}
                titleStyle={{ margin: '12px 0 24px 0' }}
            >
                <Descriptions layout='vertical'>
                    <Descriptions.Item label='Amount'>
                        {amountFromToken(detail?.humanBounty)}
                    </Descriptions.Item>
                    <Descriptions.Item label='Language'>{`From ${optionsMap(currentLanguages).get(
                        detail?.sourceLang
                    )} to ${optionsMap(currentLanguages).get(
                        detail?.targetLang
                    )}`}</Descriptions.Item>
                    <Descriptions.Item label='Posted by'>
                        <AvatarLabel seed={detail} label={detail?.email} />
                    </Descriptions.Item>
                    <Descriptions.Item label='Deadline'>{detail?.deadline}</Descriptions.Item>
                    <Descriptions.Item label='Workload'>{detail?.workload} words</Descriptions.Item>
                    <Descriptions.Item label='What background do you prefer'>
                        {optionsMap(jobFunctions).get(detail?.jobFunction) ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label='Instructions for Translator' span={2}>
                        {detail?.instruction}
                    </Descriptions.Item>
                </Descriptions>
            </AmCard>

            <AmCard
                title='Content to translate'
                cardStyle={cardStyle}
                titleStyle={{ margin: '12px 0' }}
            >
                <div className='file-content-container'>
                    {detail?.translationFiles.map((item: any) => {
                        return (
                            <div key={item.id} className='file-content-item'>
                                <TranslationOutlined />
                                <span className='text'>{item.fileName}</span>
                                <span className='size'>{item.fileSize}</span>
                            </div>
                        );
                    })}
                    <span className='tips'>
                        The content cannot be viewed until the service isstarted
                    </span>
                </div>

                <MessageModalWrap
                    translationIndex={detail?.translationIndex}
                    open={messageModalOpen}
                    onCancel={() => setMessageModalOpen(false)}
                >
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='confirm-btn'
                        onClick={() => setMessageModalOpen(true)}
                    >
                        Apply
                    </Button>
                </MessageModalWrap>
            </AmCard>
        </div>
    );
}
