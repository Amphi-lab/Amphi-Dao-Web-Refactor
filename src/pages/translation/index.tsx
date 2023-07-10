import React, { useCallback, useEffect, useMemo, useState } from 'react';

import api from '@/api';
import {
    currentLanguages as languagesOptions,
    serviceTypes as serviceTypeOptions
} from '@/constants/selcet.json';
import LabelSelect from '@/components/Form/LabelSelect';
import type { QueryContentPageRef, QueryItem } from '@/layout/query-content-page';
import QueryContentPage from '@/layout/query-content-page';
import TranslationList from '@/components/Translation/List';
import type ITransaction from '@/types/ITransaction';
import { DefaultPageSize } from '@/contracts/constants';
import { TranslationItemActionType } from '@/components/Translation/Item';

import './index.scss';
import { useAccount } from 'wagmi';

type FormValues = { translationTypeArray?: string[]; languageArray: string[]; sortBy?: string };

const sortByOptions = [
    {
        value: 'orderByDeadline',
        label: 'Deadline'
    },
    {
        value: 'orderByBounty',
        label: 'Bounty'
    }
];

function formatQueryParams(formValues: FormValues, pageNum = 1) {
    const { translationTypeArray, sortBy, languageArray, ...other } = formValues;

    const queryParams: any = {};
    if (languageArray) {
        queryParams.languageArray = languageArray;
    }

    if (translationTypeArray) {
        queryParams.translationTypeArray = translationTypeArray;
    }

    if (sortBy) {
        queryParams[`params[${sortBy}]`] = 1;
    }

    return { pageNum, pageSize: DefaultPageSize, ...queryParams, ...other };
}

export default function Translations() {
    const ref = React.useRef<QueryContentPageRef>(null);

    const { address } = useAccount();
    const [pageState, setPageState] = useState({
        pageNum: 1,
        total: 0
    });
    const [translations, setTranslations] = useState<ITransaction[]>([]);

    const queryItems = useMemo<QueryItem[]>(() => {
        return [
            {
                colProps: { span: 7 },
                name: 'languageArray',
                itemRender: (
                    <LabelSelect
                        label='Languages：'
                        maxTagCount='responsive'
                        mode='multiple'
                        options={languagesOptions}
                    />
                )
            },
            {
                colProps: { span: 7 },
                name: 'translationTypeArray',
                itemRender: (
                    <LabelSelect
                        label='serviceType：'
                        maxTagCount='responsive'
                        mode='multiple'
                        options={serviceTypeOptions}
                    />
                )
            },
            {
                colProps: { span: 7 },
                name: 'sortBy',
                itemRender: <LabelSelect label='Sort by：' options={sortByOptions} />
            }
        ];
    }, []);

    const fetchTranslationList = useCallback((query: any = {}) => {
        api.getTranslationList(query).then((res: any) => {
            if (res.code === 200) {
                const { rows, total } = res;
                const { pageNum = 1 } = query;
                setTranslations(rows);
                setPageState({ pageNum, total });
            }
        });
    }, []);

    const handleFormValuesChange = useCallback(
        (_: any, allFields: any) => {
            fetchTranslationList(formatQueryParams(allFields));
        },
        [fetchTranslationList]
    );
    const handlePageChange = useCallback(
        (current: number) => {
            fetchTranslationList(formatQueryParams(ref?.current?.form.getFieldsValue(), current));
        },
        [fetchTranslationList]
    );
    const handleAction = useCallback(
        (type: TranslationItemActionType, { translationIndex }: ITransaction) => {
            if (type === TranslationItemActionType.VIEW_DETAIL) {
                // empty
            } else if (type === TranslationItemActionType.APPLY) {
                if (address) {
                    api.postTranslationApply({
                        translationIndex,
                        address
                    });
                }
            }
        },
        [address]
    );

    useEffect(() => {
        fetchTranslationList(formatQueryParams(ref.current?.form?.getFieldsValue()));
    }, [fetchTranslationList]);

    return (
        <QueryContentPage
            ref={ref}
            title='Translation'
            pageNum={pageState.pageNum}
            total={pageState.total}
            queryItems={queryItems}
            initFormValues={{}}
            onFormValuesChange={handleFormValuesChange}
            onPageChange={handlePageChange}
        >
            <TranslationList translations={translations} onAction={handleAction} />
        </QueryContentPage>
    );
}
