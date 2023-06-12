import React from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Component: FC = () => {
    return (
        <div>
            <p>nested demo view:</p>
            <Outlet />
        </div>
    );
};

export default Component;
