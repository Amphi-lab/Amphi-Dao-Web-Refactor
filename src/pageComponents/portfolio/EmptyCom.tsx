import React from 'react';
import { Empty } from 'antd';
import ImgEmpty from '@/assets/svg/img-empty.svg';

export default () => (
    <Empty image={ImgEmpty} imageStyle={{ height: 200 }} description='Data Not Found' />
);
