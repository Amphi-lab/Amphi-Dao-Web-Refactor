import React from 'react';
// import { useRoutes } from 'react-router-dom';
// import { Button } from 'antd';
// import MockDemo from '@/examples/MockDemo';
// import ThemeSwitcher from '@/components/ThemeSwitch';
// import Counter from '@/examples/StoreDemo';
// import I18nDemo from '@/examples/I18nDemo';
// import Header from '@/components/Header';
import Home from '@/pages/Home';
// import routes from '~react-pages';

// eslint-disable-next-line no-console
// console.log(routes)

function App() {
    return (
        <Home />
        // <>
        //     <Header />

        //     <ThemeSwitcher />

        //     <Button>App</Button>

        //     <I18nDemo />

        //     <Counter />

        //     <MockDemo />

        //     <h2 style={{ fontSize: 30, marginTop: 50, marginBottom: 20 }}>pages: </h2>
        //     <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
        // </>
    );
}

export default App;
