import React, { Fragment, useEffect, useState } from 'react';
import { Space, Select, Button } from 'antd';
import type { FormInstance } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';
import { languages as languagesOptions, certificationOptions } from '@/constants/selcet.json';

interface ILanguageProps {
    language: string | undefined;
    certification: string | undefined;
}

export default ({ form }: { form: FormInstance }) => {
    const userId = 1;
    // const [isEdit, setIsEdit] = useState(true);
    const [isEdit] = useState(true);
    const [languageList, setLanguageList] = useState<ILanguageProps[]>([
        { language: undefined, certification: undefined }
    ]);

    useEffect(() => {
        const initLanguageList = form.getFieldValue('languageList');
        setLanguageList(
            initLanguageList.map((item: any) => ({
                language: item.workLangValue,
                certification: item.certification
            }))
        );
    }, [form]);

    // const handleEdit = () => {
    //     setIsEdit(true);
    // };

    // const handleCancel = () => {
    //     setIsEdit(false);
    // };

    const handleAdd = () => {
        setLanguageList([...languageList, { language: undefined, certification: undefined }]);
    };
    const onChange = (value: string, index: number, type: 'language' | 'level' = 'language') => {
        if (type === 'language') languageList[index].language = value;
        else if (type === 'level') languageList[index].certification = value;
        setLanguageList(() => {
            form.setFieldValue(
                'languageList',
                languageList.map(({ language, certification }) => ({
                    userId,
                    // nativeLang: '',
                    workLang: languagesOptions.find(item => item.value === language)?.label,
                    workLangValue: language,
                    certification
                }))
            );
            return [...languageList];
        });
    };

    return (
        <>
            <Space wrap>
                {languageList.map(({ language, certification }, index) => (
                    <Space key={language}>
                        <Space.Compact block className='language-select-box'>
                            <p className='label language-label'>Languages：</p>
                            <Select
                                value={language}
                                showSearch
                                allowClear
                                filterOption={(inputValue, option) => {
                                    if (option?.label && typeof option?.label === 'string') {
                                        const label = option.label.toLowerCase() || '';
                                        inputValue = inputValue.toLowerCase();
                                        return label.includes(inputValue);
                                    }
                                    return false;
                                }}
                                className='select language-select'
                                placeholder='please select language'
                                style={{ width: 236 }}
                                onChange={value => {
                                    onChange(value, index);
                                }}
                                disabled={!isEdit}
                            >
                                {languagesOptions.map(({ value, label }) => {
                                    if (language === value) {
                                        return (
                                            <Select.Option value={value} label={label} key={value}>
                                                {label}
                                            </Select.Option>
                                        );
                                    }
                                    if (languageList.some(item => item.language === value))
                                        return null;
                                    return (
                                        <Select.Option value={value} label={label} key={value}>
                                            {label}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Space.Compact>
                        <Space.Compact block className='language-select-box'>
                            <p className='label level-label'>Level：</p>
                            <Select
                                value={certification}
                                allowClear
                                className='select level-select'
                                placeholder='please select level'
                                style={{ width: 236 }}
                                options={certificationOptions}
                                onChange={value => {
                                    onChange(value, index, 'level');
                                }}
                                disabled={!isEdit}
                            />
                        </Space.Compact>
                    </Space>
                ))}
            </Space>
            <div className='language-add-box'>
                <span className='line' />
                <Button type='link' icon={<PlusOutlined />} onClick={handleAdd} disabled={!isEdit}>
                    Add Language
                </Button>
                <span className='line' />
            </div>
        </>
    );
};
