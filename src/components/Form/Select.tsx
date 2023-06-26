import React from 'react';
import { Select } from 'antd';

interface IProps {
    size?: 'large' | 'middle' | 'small';
    placeholder?: string;
    options: { value: string; label: string }[];
    onChange?: (value: any, opiton: any) => void;
}
const AmSelect = ({ size, placeholder, options, onChange }: IProps) => {
    return (
        <Select
            size={size}
            showSearch
            allowClear
            placeholder={placeholder}
            optionFilterProp='label'
            options={options}
            onChange={onChange}
        />
    );
};

export default AmSelect;
