import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import DateIcon from '../Icon/DateIcon';

interface IProps {
    placeholder: string;
}
const AmDateTimePiker = ({ placeholder }: IProps) => {
    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string
    ) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };
    return (
        <DatePicker
            allowClear
            autoFocus
            placeholder={placeholder}
            format='YYYY-MM-DD HH:mm:ss'
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
            onChange={onChange}
            onOk={onOk}
            suffixIcon={<DateIcon />}
            style={{
                backgroundColor: '#F2F2FB',
                width: '100%'
            }}
        />
    );
};

export default AmDateTimePiker;
