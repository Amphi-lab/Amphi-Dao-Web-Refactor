import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Row, Col, Card, Typography, Button } from 'antd';
import api from '@/api';
import { languages } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import { PrizeTab, CompDetaisTab, GudingTab } from './tabContent';
import styles from './index.module.scss';

const languagesOptions = optionsMap(languages);
const { Title } = Typography;

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Prize',
        children: PrizeTab
    },
    {
        key: '2',
        label: 'Competition Details',
        children: CompDetaisTab
    },
    {
        key: '3',
        label: 'Judging Criteria',
        children: GudingTab
    }
];

const CompetitionHome: React.FC = () => {
    const [translationList, setTranslationList] = useState([]);

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
                        <Col key={item.id} span={8}>
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
                                <Button className={styles['competition-button']}>Apply</Button>
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
