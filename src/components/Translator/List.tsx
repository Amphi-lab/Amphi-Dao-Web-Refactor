import React from 'react';

import { Row, Col } from 'antd';

import type ITranslators from '@/types/ITranslator';
import TranslatorItem from './Item';

type TranslatorListProps = {
    translators: (ITranslators & { itemRender?: React.ReactNode })[];
};

export default function TranslatorList({ translators }: TranslatorListProps) {
    return (
        <Row gutter={[50, 60]}>
            {translators.map(translator => (
                <Col xs={10} sm={10} md={8} lg={6} xl={6} key={translator.id}>
                    {translator.itemRender ? (
                        translator.itemRender
                    ) : (
                        <TranslatorItem translator={translator} />
                    )}
                </Col>
            ))}
        </Row>
    );
}
