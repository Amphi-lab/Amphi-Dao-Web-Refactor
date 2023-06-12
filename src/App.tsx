import React, { Suspense } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import Layouts from '@/components/Layouts';

// eslint-disable-next-line no-console
// console.log(routes)

function App() {
    const location = useLocation()
    return (
        <Layouts isShowBanner={location.pathname === "/"}>
            <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
        </Layouts>
    );
}

export default App;
