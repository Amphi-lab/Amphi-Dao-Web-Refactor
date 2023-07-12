import React from 'react';
import { Avatar } from 'antd';
import Jazzicon from 'react-jazzicon';

import './index.scss';

type AvatarLabelProps = {
    avatar?: React.ReactNode;
    seed?: any;
    label?: React.ReactNode;
    defaultLabel?: React.ReactNode;
};

export default function AvatarLabel({
    avatar,
    seed,
    label,
    defaultLabel = 'unknown'
}: AvatarLabelProps) {
    return (
        <div className='avatar-label'>
            {avatar ? (
                <Avatar src={avatar} size={22} />
            ) : (
                <Jazzicon diameter={22} seed={seed || {}} />
            )}
            <span className='label'>{label || defaultLabel}</span>
        </div>
    );
}
