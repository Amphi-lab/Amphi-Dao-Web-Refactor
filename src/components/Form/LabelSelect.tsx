import React from 'react';

import { Select } from 'antd';
import type { SelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';

import './LabelSelect.scss';

interface SelectWrapProps extends SelectProps {
    label: string;
}

function defaultSelectFilter(inputValue: string, option?: DefaultOptionType) {
    if (option?.label && typeof option?.label === 'string') {
        const label = option.label.toLowerCase() || '';
        inputValue = inputValue.toLowerCase();
        return label.includes(inputValue);
    }
    return false;
}

export default function LabelSelect({ label, ...select }: SelectWrapProps) {
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
