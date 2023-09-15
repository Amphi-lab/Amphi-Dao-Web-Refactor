import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Row, Col, Card, Typography, Button, Grid } from 'antd';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useNavigate } from 'react-router';
import api from '@/api';
import { languages } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import GenerateTab from './tabContent';
import styles from './index.module.scss';

const languagesOptions = optionsMap(languages);
const { Title } = Typography;
const { useBreakpoint } = Grid;

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
    const [translationList, setTranslationList] = useState([]);
    const { setShowAuthFlow, user } = useDynamicContext();
    const navigate  = useNavigate();
    const screens = useBreakpoint();

    const onApply = useCallback((id: string)=>{ // id may not be one string
        if(user){
           navigate(`/workspace/${id}`);
        //    window.location.href = `/workspace/${id}`;
        }else{
            navigate(`/registration/`);
            setShowAuthFlow(true)
        }
       },[user]);

    const getTranslationList = useCallback((queryParams?: any) => {
        return api.getTranslationList(queryParams).then((res: any) => {
            if (res.code === 200) {
                const { rows } = res;
                console.log(rows);
                setTranslationList(rows);
            }
        });
    }, []);

    useEffect(() => {
        getTranslationList();
    }, [getTranslationList]);

    const renderMaterials = useMemo(() => {
        return (
            <Row gutter={30}>
                {translationList.map((item: any) => {
                    const { title, deadline, workload, sourceLang, targetLang } = item;
                    const language = `${languagesOptions.get(sourceLang) || '--'} 
                    to ${languagesOptions.get(targetLang) || '--'}`;

                    return (
                        // <Col key={item.id} span={6}
                        // 响应式布局
                        <Col key={item.id} span={screens.xs ? 24 : 6}>  
                            <Card
                                className={styles['competition-card']}
                                title={title}
                                bordered={false}
                            >
                                <p>
                                    <span className={styles['competition-label']}>
                                        Language:&nbsp;
                                    </span>
                                    {language}
                                </p>
                                <p>
                                    <span className={styles['competition-label']}>
                                        Workload:&nbsp;
                                    </span>
                                    {workload}
                                </p>
                                <p>
                                    <span className={styles['competition-label']}>
                                        Deadline:&nbsp;
                                    </span>
                                    {deadline}
                                </p>
                                {/* <Button onClick={onApply} className={styles['competition-button']}>Apply</Button> */}
                                {/*  响应式调整 */}
                                <Button onClick={() => onApply(item.id)} className={styles['competition-button']}>Apply</Button>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        );
    }, [translationList]);

    return (
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
    );
};

export default memo(CompetitionHome);

