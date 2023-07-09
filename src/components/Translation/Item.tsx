import React, { useMemo } from 'react';
import { Row, Col, Card, Tag, Descriptions, Tooltip } from 'antd';
import { EyeOutlined, SolutionOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import type ITransaction from '@/types/ITransaction';
import { noop } from '@/utils/util';
import { workLoadType, languages } from '@/constants/selcet.json';
import { ORDER_STATUS_NAME } from '@/constants/enums';
import { amountFromToken } from '@/utils/number';
import { optionsMap } from '@/utils/array';

import './item.scss';

export type TranslationItemProps = {
    translation: ITransaction;

    onAction?: (type: TranslationItemActionType, translation: ITransaction) => void;
};

export enum TranslationItemActionType {
    VIEW_DETAIL,
    APPLY
}

const { Meta } = Card;

const workLoadTypeOptions = optionsMap(workLoadType);
const languagesOptions = optionsMap(languages);

export default function TranslationItem({ translation, onAction = noop }: TranslationItemProps) {
    const {
        title,
        translationState,
        bounty,
        deadline,
        workloadType,
        workload,
        sourceLang,
        targetLang
    } = translation;

    const amount = useMemo(() => amountFromToken(bounty), [bounty]);
    const language = useMemo(
        () => `${languagesOptions.get(sourceLang)} → ${languagesOptions.get(targetLang)}`,
        [sourceLang, targetLang]
    );
    return (
        <Card size='small' className='item-content'>
            <Meta
                title={
                    <Row gutter={10} className='header' wrap={false}>
                        <Col>
                            <Tooltip title={title}>
                                <p className='title'>{title}</p>
                            </Tooltip>
                            <Tag color='white'>
                                <span style={{ color: 'var(--text-desc-color)' }}>
                                    {ORDER_STATUS_NAME[translationState]}
                                </span>
                            </Tag>
                        </Col>
                        <Col flex='1' className='bounty'>
                            <Tooltip title={amount}>
                                <p style={{ lineHeight: 'normal', fontSize: '20px' }}>{amount}</p>
                            </Tooltip>
                            <span style={{ fontSize: '12px' }}>USDT</span>
                        </Col>
                    </Row>
                }
                description={
                    <Row>
                        <Col span='24'>
                            <Descriptions column={1} size='small'>
                                <Descriptions.Item label='Language'>
                                    <Tooltip title={language}>{language}</Tooltip>
                                </Descriptions.Item>
                                <Descriptions.Item label='Workload'>{`${workload || 0} ${
                                    workLoadTypeOptions.get(workloadType) ?? ''
                                }`}</Descriptions.Item>
                                <Descriptions.Item label='Deadline'>
                                    {dayjs(deadline).format('YYYY/MM/DD')}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span='24' className='actions'>
                            <span
                                onClick={() =>
                                    onAction(TranslationItemActionType.VIEW_DETAIL, translation)
                                }
                            >
                                <EyeOutlined />
                                View Details
                            </span>
                            <span
                                onClick={() =>
                                    onAction(TranslationItemActionType.APPLY, translation)
                                }
                                style={{ marginLeft: '16px' }}
                            >
                                <SolutionOutlined />
                                Apply
                            </span>
                        </Col>
                    </Row>
                }
            />
        </Card>
    );
}
