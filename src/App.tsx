import { Suspense } from 'react'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import MockDemo from "./examples/MockDemo"

// eslint-disable-next-line no-console
// console.log(routes)

function App() {
    return (
        <>
            App

            <MockDemo />

            <Suspense fallback={<p>Loading...</p>}>
                {useRoutes(routes)}
            </Suspense>
        </>
    )
}

export default App
