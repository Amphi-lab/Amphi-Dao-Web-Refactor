import React from 'react';

import './baseLayout.scss';

export type BaseLayoutProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function BaseLayout({ className = '', children }: BaseLayoutProps) {
    return <div className={`base-layout ${className}`}>{children}</div>;
}
