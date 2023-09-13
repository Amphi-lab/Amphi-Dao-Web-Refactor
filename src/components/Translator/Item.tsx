import React from 'react';
import { useNavigate } from 'react-router';
import { Card, Badge } from 'antd';
import { StarFilled } from '@ant-design/icons';

import type ITranslators from '@/types/ITranslator';
import { languages as languagesOptions } from '@/constants/selcet.json';
import { optionsMap } from '@/utils/array';
import ImageTranslator from '@/assets/images/translator.png';

type TranslatorListProps = {
    translator: ITranslators;
};

const { Meta } = Card;

const languagesMap = optionsMap(languagesOptions);

const DescItem = ({
    languages,
    orders,
    score
}: Pick<ITranslators, 'languages' | 'orders' | 'score'>) => (
    <>
        {languages ? (
            <p>
                I speak{' '}
                {languages
                    .map(({ workLangValue }: any) => languagesMap.get(workLangValue.toString()))
                    .join('、')}
            </p>
        ) : null}
        <Badge color='#D9D9D9' text={`${orders || '--'} orders`} />
        <p>
            <StarFilled style={{ color: '#333', fontSize: 10 }} />
            &nbsp;&nbsp;{score}
        </p>
    </>
);

export default function TranslatorItem({
    translator: { address, username, profile, languages, orders, score }
}: TranslatorListProps) {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate('/translators')}
            cover={
                <img
                    alt='example'
                    src={profile}
                    onError={e => {
                        e.target.src = ImageTranslator;
                    }}
                />
            }
        >
            <Meta
                title={username || address}
                description={<DescItem languages={languages} orders={orders} score={score} />}
            />
        </Card>
    );
}
