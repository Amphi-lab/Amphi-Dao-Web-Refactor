import type { CSSProperties, PropsWithChildren } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';

import AmCard from '@/components/Card';
import arrowLeft from '@/assets/svg/arrow-left.svg';
import verBar from '@/assets/svg/vertical-bar.svg';

import './backTopNav.scss';

type BackTopNavProps = PropsWithChildren<{
    title: string;
    cardStyle?: CSSProperties;
}>;

const CARD_STYLE = {
    background: '#FFF',
    padding: '20px 24px'
};

export default function BackTopNav({ title, cardStyle = CARD_STYLE, children }: BackTopNavProps) {
    const navigate = useNavigate();
    return (
        <AmCard cardStyle={cardStyle}>
            <div className='back-top-nav' onClick={() => navigate(-1)}>
                <img src={arrowLeft} alt='' />
                <img src={verBar} alt='' className='nav-ver-bar' />
                <span>{title}</span>
            </div>
            {children}
        </AmCard>
    );
}
