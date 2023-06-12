import React from 'react';
import type { FC } from 'react';
import { Button } from 'antd';
import MockDemo from '@/examples/MockDemo';
import ThemeSwitcher from '@/components/ThemeSwitch';
import Counter from '@/examples/StoreDemo';
import I18nDemo from '@/examples/I18nDemo';

const Component: FC = () => {
    return (
        <div>
            <p>demo/index</p>
            <ThemeSwitcher />

            <Button>App</Button>

            <I18nDemo />

            <Counter />

            <MockDemo />
        </div>
    );
};

export default Component;
