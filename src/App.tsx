import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Button } from 'antd';
import MockDemo from '@/examples/MockDemo';
import ThemeSwitcher from '@/components/ThemeSwitch';
import Counter from '@/examples/StoreDemo';
import routes from '~react-pages';

// eslint-disable-next-line no-console
// console.log(routes)

function App() {
    return (
        <>
            <ThemeSwitcher />

            <Button>App</Button>
            <Counter />

            <MockDemo />

            <h2 style={{ fontSize: 30, marginTop: 50, marginBottom: 20 }}>pages: </h2>
            <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
        </>
    );
}

export default App;
