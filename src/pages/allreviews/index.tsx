import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useNavigate } from 'react-router';
import api from '@/api';
import { languages } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import styles from './index.module.scss';

const languagesOptions = optionsMap(languages);
const { Title } = Typography;

const Allreviews: React.FC = () => {
    // 创建了一个名为 translationList 的状态变量，以及一个用于更新该状态的函数 setTranslationList。初始状态为一个空数组 []
    const [translationList, setTranslationList] = useState([]);
    // 这个 Hook 可能返回了一个上下文对象，其中包含了多个值。我们在这里解构了其中的两个属性：setShowAuthFlow 和 user。
    const { setShowAuthFlow, user } = useDynamicContext();
    const navigate  = useNavigate();

    const onApply = useCallback(()=>{
     if(user){
        navigate('../competition');
     }else{
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
                    const { title, Role, sourceLang, targetLang } = item;
                    const language = `${languagesOptions.get(sourceLang) || '--'} 
                    -> ${languagesOptions.get(targetLang) || '--'}`;

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
                                        Role: {Role}&nbsp;
                                    </span>
                                    {language}
                                </p>
                                <p>
                                    <span className={styles['competition-label']}>
                                        Completed on: 2023/11/15&nbsp;
                                    </span>
                                </p>
                                <p>
                                    <span className={styles['competition-label']}>
                                        Status: Pending review&nbsp;
                                    </span>
                                </p>
                                <Button onClick={onApply} className={styles['competition-button']}>Review</Button>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        );
    }, [translationList]);

    return (
        <div className={styles['competition-wrapper']}>
            <div className={styles['competition-materials']}>
                <Title className={styles['competition-title']} level={5}>
                    Reviews
                </Title>
                {renderMaterials}
            </div>
        </div>
    );
};

export default memo(Allreviews);
