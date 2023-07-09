import React from 'react';

import { Row, Col } from 'antd';

import type ITransaction from '@/types/ITransaction';
import type { TranslationItemProps } from './Item';
import TranslationItem from './Item';

type TranslationListProps = {
    translations: (ITransaction & { itemRender?: React.ReactNode })[];
} & Pick<TranslationItemProps, 'onAction'>;

export default function TranslationList({ translations, onAction }: TranslationListProps) {
    return (
        <Row gutter={[16, 24]}>
            {translations.map(translation => (
                <Col key={translation.id} xs={8} sm={8} md={6} lg={6} xl={6}>
                    {translation.itemRender ? (
                        translation.itemRender
                    ) : (
                        <TranslationItem translation={translation} onAction={onAction} />
                    )}
                </Col>
            ))}
        </Row>
    );
}
