import React from 'react';

interface IProps {
    size?: number;
    color?: string;
}
export default ({ size = 11, color = '#D9D9D9' }: IProps) => {
    const half = Math.floor(size / 2);
    return (
        <svg width={`${size}px`} height={`${size}px`}>
            <circle cx={`${half}px`} cy={`${half}px`} r={`${half}px`} fill={color} />
        </svg>
    );
};
