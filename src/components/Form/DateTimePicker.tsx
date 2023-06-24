import React from 'react';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

const AmDateTimePiker = () => {
    const disabledDate: RangePickerProps['disabledDate'] = current => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };
    const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56]
    });
    return (
        <DatePicker
            format='YYYY-MM-DD HH:mm:ss'
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
        />
    );
};

export default AmDateTimePiker;
