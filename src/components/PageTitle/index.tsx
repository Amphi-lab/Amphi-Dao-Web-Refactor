import type { CSSProperties } from 'react';
import React, { useMemo } from 'react';
import styles from './index.module.scss';

console.log(styles, 'sss');
type IProps = {
    title: string;
    align?: 'left' | 'center' | 'right';
    subTitle?: string;
    style?: CSSProperties;
};

export default ({ title, align = 'left', subTitle, style }: IProps) => {
    const finallStyle = useMemo(() => {
        return { textAlign: align, ...style };
    }, [align, style]);

    return (
        <div className={styles['page-title']} style={finallStyle}>
            <h6>{title}</h6>
            {subTitle && <p className={styles['sub-title']}>{subTitle}</p>}
        </div>
    );
};
