// 一个使用React和Ant Design创建的Translation Item卡片组件。

// 导入React和必要的Ant Design组件
import React, { useMemo } from 'react';
import { Row, Col, Card, Tag, Descriptions, Tooltip } from 'antd';
import { EyeOutlined, SolutionOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; // 时间处理库

// 导入类型定义和常量
import type ITransaction from '@/types/ITransaction';
import { noop } from '@/utils/util';
import { workLoadType, languages } from '@/constants/selcet.json';
import { ORDER_STATUS_NAME } from '@/constants/enums';
import { amountFromToken } from '@/utils/number';
import { optionsMap } from '@/utils/array';

import './item.scss'; // 导入样式

// 定义组件的Props类型
export type TranslationItemProps = {
    translation: ITransaction;
    onAction?: (type: TranslationItemActionType, translation: ITransaction) => void;
};

// 定义Action类型枚举
export enum TranslationItemActionType {
    VIEW_DETAIL,
    APPLY
}

// 卡片元数据
const { Meta } = Card;

// 将工作量类型和语言转为Map结构以便查询
const workLoadTypeOptions = optionsMap(workLoadType);
const languagesOptions = optionsMap(languages);

// 主函数组件
export default function TranslationItem({ translation, onAction = noop }: TranslationItemProps) {
    // 从props中解构需要的字段
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

    // 计算金额和语言方向（都用useMemo优化性能）
    const amount = useMemo(() => amountFromToken(bounty), [bounty]);
    const language = useMemo(
        () => `${languagesOptions.get(sourceLang)} → ${languagesOptions.get(targetLang)}`,
        [sourceLang, targetLang]
    );

    // 返回组件JSX
    return (
        <Card size='small' className='item-content'>
            <Meta
                // 标题和悬赏金额
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
                // 详情描述部分
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
