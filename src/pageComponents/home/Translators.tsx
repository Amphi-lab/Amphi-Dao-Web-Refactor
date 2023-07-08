import React, { useEffect, useState } from 'react';

import type ITranslators from '@/types/ITranslator';
// api
import api from '@/api';
// components
// images
import HomeSection from '@/pageComponents/home/HomeSection';
import TranslatorList from '@/components/Translator/List';

export default () => {
    const [dataList, setDataList] = useState<ITranslators[]>([]);

    useEffect(() => {
        api.getTranslatorList().then((res: any) => {
            if (res.code === 200) {
                const { rows } = res;
                rows.length = 4;
                setDataList(rows);
            }
        });
    }, []);

    return (
        <HomeSection className='home-translators' title='Our Translators'>
            <TranslatorList translators={dataList} />
        </HomeSection>
    );
};
