import React, { useEffect, useState } from 'react';
import { Descriptions, Divider, Steps } from 'antd';
import { useParams } from 'react-router';

import BaseLayout from '@/layout/BaseLayout';
import BackTopNav from '@/pageComponents/others/BackTopNav';
import AmCard from '@/components/Card';
import { currentLanguages } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import api from '@/api';
// import BaseNotification from '@/pageComponents/others/BaseNotification';
import BaseTranContent from '@/pages/workspaceDetail/TranContent/BaseTranContent';
import ServiceRating from '@/pages/workspaceDetail/ServiceRating';


const cardStyle = {
    background: '#FFF',
    padding: '8px 24px 8px'
};

const WorkspaceDetail = () => {
    const { id } = useParams();

    const [step] = useState(0);
    const [detail, setDetail] = useState<any>();

    useEffect(() => {
        if (id) {
            api.getOrderDetail(id).then((res: any) => {  // api need to be changed here
                if (res?.code === 200 && res?.data) {
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
        <BaseLayout>
            <BackTopNav title='Back to workspace'>
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ padding: '0 60px' }}>
                    <Steps
                        current={step}
                        items={[
                            {
                                title: 'Submit the order'
                            },
                            {
                                title: 'In service'
                            },
                            {
                                title: 'Pending Review'
                            },
                            {
                                title: 'Order completed'
                            }
                        ]}
                    />
                </div>
            </BackTopNav>

            <AmCard
                title='Order Title'
                cardStyle={cardStyle}
                titleStyle={{ margin: '12px 0 24px 0' }}
            >
                <Descriptions layout='vertical'>
                    <Descriptions.Item label='Order ID'>{detail?.instruction}</Descriptions.Item>
                    <Descriptions.Item label='Language'>{`From ${optionsMap(currentLanguages).get(
                        detail?.sourceLang
                    )} to ${optionsMap(currentLanguages).get(
                        detail?.targetLang
                    )}`}</Descriptions.Item>
                    <Descriptions.Item label='Workload'>{detail?.workload} words</Descriptions.Item>
                    <Descriptions.Item label='Submission time'>
                        {detail?.createTime}
                    </Descriptions.Item>
                    <Descriptions.Item label='Deadline'>{detail?.deadline}</Descriptions.Item>
                    <Descriptions.Item label='Instructions for Translator'>
                        {detail?.instruction}
                    </Descriptions.Item>
                </Descriptions>
            </AmCard>

            <BaseTranContent fileList={detail?.translationFiles} />

            {/* 如果 step 的值小于 3，那么就渲染 <BaseNotification translationIndex={detail?.translationIndex} /> 这个组件。如果 step 的值不小于 3，那么就不渲染任何东西（返回 null）。 */}
            {/* {step < 3 ? <BaseNotification translationIndex={detail?.translationIndex} /> : null} */}
            {/* <Schedule /> */}
            {/* <Detail /> */}
            {/* {step === 1 && <TranCandidate />} */}
            {/* {(step <= 2) && <BaseTranContent />} */}
            {/* Pending Review part, add serviceRating */}
            {step === 2 && <ServiceRating />}
        </BaseLayout>
    );
};

export default WorkspaceDetail;
