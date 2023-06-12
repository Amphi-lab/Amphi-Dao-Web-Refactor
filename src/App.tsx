import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';

// eslint-disable-next-line no-console
// console.log(routes)

function App() {
    return (
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
    );
}

export default App;
