import React from 'react';
import { Select } from 'antd';

interface IProps {
    size?: 'large' | 'middle' | 'small';
    placeholder?: string;
    options: { value: string; label: string }[];
    onSelectChange?: () => void;
}
const AmSelect = ({ size, placeholder, options, onSelectChange }: IProps) => {
    return (
        <Select
            size={size}
            showSearch
            allowClear
            placeholder={placeholder}
            optionFilterProp='label'
            options={options}
            onChange={onSelectChange}
        />
    );
};

export default AmSelect;
