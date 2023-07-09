import React, { useCallback, useEffect, useMemo, useState } from 'react';

import api from '@/api';

import {
    currentLanguages as languagesOptions,
    sortBy as sortByOptions
} from '@/constants/selcet.json';
import TranslatorList from '@/components/Translator/List';
import LabelSelect from '@/components/Form/LabelSelect';
import type { QueryContentPageRef, QueryItem } from '@/layout/query-content-page';
import QueryContentPage from '@/layout/query-content-page';
import { DefaultPageSize } from '@/contracts/constants';

import './index.scss';

type FormValues = { language: string; sortBy?: string };

const allLanguageOption = {
    value: '-1',
    label: 'all'
};
const initFormValues = {
    language: allLanguageOption.value
};
const initPageState = {
    pageNum: 1,
    total: 0
};

function formatQueryParams(formValues: FormValues, pageNum = 1) {
    const { language, sortBy, ...other } = formValues;

    const queryParams: any = {};
    if (language && language !== allLanguageOption.value) {
        queryParams['params[language]'] = language;
    }

    if (sortBy) {
        queryParams[`params[${sortBy}]`] = 1;
    }

    return { pageNum, pageSize: DefaultPageSize, ...queryParams, ...other };
}

export default function Translators() {
    const ref = React.useRef<QueryContentPageRef>(null);

    const [pageState, setPageState] = useState(initPageState);
    const [translators, setTranslators] = useState([]);

    const resolvedLanguagesOptions = useMemo(
        () => ([] as typeof languagesOptions).concat(allLanguageOption, languagesOptions),
        []
    );

    const queryItems = useMemo<QueryItem[]>(() => {
        return [
            {
                colProps: { span: 8 },
                name: 'language',
                itemRender: <LabelSelect label='Languages：' options={resolvedLanguagesOptions} />
            },
            {
                colProps: { span: 8 },
                name: 'sortBy',
                itemRender: <LabelSelect label='Sort by：' options={sortByOptions} />
            }
        ];
    }, [resolvedLanguagesOptions]);

    const fetchTranslatorList = useCallback((query: any = {}) => {
        api.getTranslatorList(query).then((res: any) => {
            if (res.code === 200) {
                const { rows, total } = res;
                const { pageNum = 1 } = query;
                setTranslators(rows);
                setPageState({ pageNum, total });
            }
        });
    }, []);

    const handleFormValuesChange = useCallback(
        (_: any, allFields: any) => {
            fetchTranslatorList(formatQueryParams(allFields));
        },
        [fetchTranslatorList]
    );
    const handlePageChange = useCallback(
        (current: number) => {
            fetchTranslatorList(formatQueryParams(ref?.current?.form.getFieldsValue(), current));
        },
        [fetchTranslatorList]
    );

    useEffect(() => {
        fetchTranslatorList(formatQueryParams(ref.current?.form?.getFieldsValue()));
    }, [fetchTranslatorList]);

    return (
        <QueryContentPage
            ref={ref}
            title='Our Translators'
            pageNum={pageState.pageNum}
            total={pageState.total}
            queryItems={queryItems}
            initFormValues={initFormValues}
            onFormValuesChange={handleFormValuesChange}
            onPageChange={handlePageChange}
        >
            <TranslatorList translators={translators} />
        </QueryContentPage>
    );
}
