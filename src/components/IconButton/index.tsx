import Icon from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface Iprops {
    icon?: any;
    text: string;
    onClick?: any;
    textStyle?: {};
}
const IconButton: React.FC<Iprops> = ({ icon, text, onClick, textStyle }) => {
    return (
        <Button onClick={onClick} className={styles['amphi-icon-button']}>
            <Icon component={icon} />
            <span style={textStyle}>{text || 'text'}</span>
        </Button>
    );
};

export default IconButton;
