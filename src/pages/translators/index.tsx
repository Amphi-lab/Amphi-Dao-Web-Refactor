import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormInstance, SelectProps } from 'antd';
import { Form, Row, Col, Select, Pagination } from 'antd';

import api from '@/api';
import PageTitle from '@/components/PageTitle';

import './index.scss';
import { languages as languagesOptions, sortBy as sortByOptions } from '@/constants/selcet.json';
import type { DefaultOptionType } from 'antd/es/select';
import TranslatorList from '@/components/Translator/List';

interface SelectWrapProps extends SelectProps {
    label: string;
}

type FormValues = { language: string; sortBy?: string };

const allLanguageOption = {
    value: '-1',
    label: 'all'
};
const defaultPageSize = 20;
const initFormValues = {
    language: allLanguageOption.value
};
const initPageState = {
    pageNum: 1,
    total: 0
};

function defaultSelectFilter(inputValue: string, option?: DefaultOptionType) {
    if (option?.label && typeof option?.label === 'string') {
        const label = option.label.toLowerCase() || '';
        inputValue = inputValue.toLowerCase();
        return label.includes(inputValue);
    }
    return false;
}

function formatQueryParams(formValues: FormValues, pageNum = 1) {
    const { language, sortBy, ...other } = formValues;

    const queryParams: any = {};
    if (language && language !== allLanguageOption.value) {
        queryParams['params[language]'] = language;
    }

    if (sortBy) {
        queryParams[`params[${sortBy}]`] = 1;
    }

    return { pageNum, pageSize: defaultPageSize, ...queryParams, ...other };
}

function SelectWrap({ label, ...select }: SelectWrapProps) {
    return (
        <div className='select-wrap'>
            <p className='label'>{label}</p>
            <Select
                showSearch
                allowClear
                bordered={false}
                className='select'
                filterOption={defaultSelectFilter}
                {...select}
            />
        </div>
    );
}

export default function Translators() {
    const formRef = React.useRef<FormInstance>(null);

    const [pageState, setPageState] = useState(initPageState);
    const [translators, setTranslators] = useState([]);

    const resolvedLanguagesOptions = useMemo(
        () => ([] as typeof languagesOptions).concat(allLanguageOption, languagesOptions),
        []
    );

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
            fetchTranslatorList(formatQueryParams(formRef?.current?.getFieldsValue(), current));
        },
        [fetchTranslatorList]
    );

    useEffect(() => {
        fetchTranslatorList(formatQueryParams(formRef?.current?.getFieldsValue()));
    }, [fetchTranslatorList]);

    return (
        <>
            <PageTitle title='Our Translators' />
            <div className='translators-content'>
                <Form
                    ref={formRef}
                    initialValues={initFormValues}
                    onValuesChange={handleFormValuesChange}
                >
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item name='language'>
                                <SelectWrap
                                    label='Languages：'
                                    options={resolvedLanguagesOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name='sortBy'>
                                <SelectWrap label='Sort by：' options={sortByOptions} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <TranslatorList translators={translators} />

                    <Row justify='end'>
                        <Col>
                            <Pagination
                                current={pageState.pageNum}
                                total={pageState.total}
                                pageSize={defaultPageSize}
                                showSizeChanger={false}
                                showTotal={value => `Total ${value} items`}
                                onChange={handlePageChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}
