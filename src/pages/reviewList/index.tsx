import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import api from '@/api';
import { Button, Card, Row, Col, Select } from 'antd'
import { useNavigate } from 'react-router';
import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { languages } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import styles from './index.module.scss';

type ViewStateType = 'pending' | 'completed';
const languagesMap = optionsMap(languages);
const viewStateOptions = [
    {
        label: 'Completed',
        value: 'completed'
    },
    {
        label: 'Pending Review',
        value: 'pending'
    }
]
const ReviewList: React.FC = () => {

    const [translationList, setTranslationList] = useState([]);
    const [viewState, setViewState] = useState<ViewStateType>('pending');
    const [language, setLanguage] = useState<string>('chinese');
    const { setShowAuthFlow, user } = useDynamicContext();
    const navigate = useNavigate();

    const onApply = useCallback(() => {
        if (user) {
            navigate('competition');
        } else {
            setShowAuthFlow(true)
        }
    }, [user,navigate,setShowAuthFlow]);

    const getTranslationList = useCallback((queryParams?: any) => {
        return api.getTranslationList(queryParams).then((res: any) => {
            if (res.code === 200) {
                const { rows } = res;
                setTranslationList(rows);
            }
        });
    }, []);

    useEffect(() => {
        getTranslationList();
    }, [getTranslationList]);

    const onLanguageChange = useCallback((val: string) => {
        setLanguage(val);
        console.log(language);
    }, [language]);

    const onViewStateChange = useCallback((val: ViewStateType) => {
        setViewState(val);
        console.log(viewState);
    }, [viewState]);

    const filterOption = useCallback((input: string, option: { label: string; value: string })=>{
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    },[]);
           

    const renderMaterials = useMemo(() => {
        return (
            <Row gutter={30}>
                {translationList.map((item: any) => {
                    const { title, deadline, workload, sourceLang, targetLang } = item;
                    const languageFromTo = `${languagesMap.get(sourceLang) || '--'} 
                       to ${languagesMap.get(targetLang) || '--'}`;

                    return (
                        <Col key={item.id} span={6}>
                            <Card
                                className={styles.card}
                                title={title}
                                bordered={false}
                            >
                                <p>
                                    <span className={styles['card-label']}>
                                        Language:&nbsp;
                                    </span>
                                    {languageFromTo}
                                </p>
                                <p>
                                    <span className={styles['card-label']}>
                                        Workload:&nbsp;
                                    </span>
                                    {workload}
                                </p>
                                <p>
                                    <span className={styles['card-label']}>
                                        Deadline:&nbsp;
                                    </span>
                                    {deadline}
                                </p>
                                <Button onClick={onApply} className={styles['card-button']}>Apply</Button>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        );
    }, [translationList,onApply]);

    return (
        <div className={styles.wrapper}>
            <div className={styles['select-wrap']}>
                <span className={styles['select-label']}>
                    Search By:
                </span>
                <Select
                    className={styles.select}
                    bordered={false}
                    placeholder="Select a view state"
                    onChange={onViewStateChange}
                    options={viewStateOptions}
                />
                <Select
                    className={styles.select}
                    bordered={false}
                    showSearch
                    // @ts-ignore
                    filterOption={filterOption}
                    placeholder="Select a language"
                    onChange={onLanguageChange}
                    options={languages}
                />
            </div>
            {renderMaterials}
        </div>
    )
}

export default memo(ReviewList);
