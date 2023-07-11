import Icon from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface Iprops {
    icon?: any;
    text: string;
    onClick?: any;
    textStyle?: {};
    loading?: boolean;
}
const IconButton: React.FC<Iprops> = ({ icon, text, onClick, textStyle, loading }) => {
    return (
        <Button onClick={onClick} className={styles['amphi-icon-button']} loading={loading}>
            <Icon component={icon} />
            <span style={textStyle}>{text || 'text'}</span>
        </Button>
    );
};

export default IconButton;
