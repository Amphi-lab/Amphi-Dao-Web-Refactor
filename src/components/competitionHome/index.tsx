import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Row, Col, Card, Typography, Button, message } from 'antd';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useNavigate } from 'react-router';
import api from '@/api';
import { languages } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import GenerateTab from './tabContent';
import styles from './index.module.scss';

const languagesOptions = optionsMap(languages);
const { Title } = Typography;

const items: TabsProps['items'] = [
    {
        key: 'prizeTab',
        label: 'Prize',
        children: <GenerateTab tabKey='prizeTab'/>
    },
    {
        key: 'compDetaisTab',
        label: 'Competition Details',
        children: <GenerateTab tabKey='compDetaisTab'/>
    },
    {
        key: 'gudingTab',
        label: 'Judging Criteria',
        children: <GenerateTab tabKey='gudingTab'/>
    }
];

const CompetitionHome: React.FC = () => {
    // const [translationList, setTranslationList] = useState([]);
    const { setShowAuthFlow ,user } = useDynamicContext();
    const navigate  = useNavigate();
    const [messageApi,contextHolder ] = message.useMessage();
    const [taskList, setTaskList] = useState([]);

    // console.log(user,'user');

    const applyTask = async(taskId: string) => {
        api.applyTask(taskId).then( (res:any) => {
            console.log(res);
        })
    }

    const onApply = useCallback((id: string)=>{ // id may not be one string
        if(!user) {
            console.log('login judge');
            messageApi.open({
                type: 'warning',
                content: 'Please Login'
              });
        }else if(user){
            navigate(`/workspace/${id}`);
        }else{
            navigate(`/registration`);
            setShowAuthFlow(true)
        }

        applyTask(id)
        
       },[user]);


    // const onApply = useCallback((id: string) => {
    //     api.getRegistrationStatus(id).then((response: RegistrationStatusResponse) => {
    //         const isRegistered = response?.data?.isRegistered || false;
    //         if (isRegistered) {
    //             navigate(`/workspace/${id}`);
    //         } else {
    //             navigate(`/registration/`);
    //         }
    //     });
    // }, [navigate]);
    
    // const getTranslationList = useCallback((queryParams?: any) => {
    //     return api.getTranslationList(queryParams).then((res: any) => {
    //         if (res.code === 200) {
    //             const { rows } = res;
    //             console.log(rows);
    //             setTranslationList(rows);
    //         }
    //     });
    // }, []);

    const getTaskList = async() => {
        api.getTaskList().then( (res:any) => {
            if(res.code === 200){
                setTaskList( res.data )
            }
            
        })
    }

    useEffect(() => {
        getTaskList();
    }, []);

    const renderMaterials = useMemo(() => {
        console.log("taskList:", taskList); // 将 console.log 移到 useMemo 之外
        return (
            <Row gutter={30}>
                {
                    taskList.map((item: any) => {
                        const { id, novelName, deadline, workload, targetLanguage, sourceLanguage, score } = item;
                        const language = `${languagesOptions.get(sourceLanguage) || '--'} to ${languagesOptions.get(targetLanguage) || '--'}`;

                        return (
                            <Col key={item.id} span={6}>
                                <Card
                                    className={styles['competition-card']}
                                    title={novelName}
                                    bordered={false}
                                >
                                    <p>
                                    <span className={styles['competition-label']}>
                                        Language:&nbsp;
                                    </span>
                                        {language}
                                    </p >
                                    <p>
                                    <span className={styles['competition-label']}>
                                        Workload:&nbsp;
                                    </span>
                                        {workload} words
                                    </p >
                                    <p>
                                    <span className={styles['competition-label']}>
                                        Deadline:&nbsp;
                                    </span>
                                        {deadline}
                                    </p >
                                    <p>
                                    <span className={styles['competition-label']}>
                                        Score:&nbsp;
                                    </span>
                                        {score}
                                    </p >
                                    <Button onClick={() => onApply(id)} className={styles['competition-button']}>Apply</Button> {/* 使用箭头函数包装 onApply，以便传递参数 */}
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }, [taskList]);

    return (
        <>
        {contextHolder}
        <div className={styles['competition-wrapper']}>
            <div className={styles['competition-banner']} />
            <div className={styles['competition-tabs-wrap']}>
                <Tabs defaultActiveKey='1' items={items} />
            </div>
            <div className={styles['competition-materials']}>
                <Title className={styles['competition-title']} level={5}>
                    Competition materials
                </Title>
                {renderMaterials}
            </div>
        </div>
        </>

    );
};

export default memo(CompetitionHome);
