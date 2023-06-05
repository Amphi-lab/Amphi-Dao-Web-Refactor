import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { Button } from "antd"
import MockDemo from "@/examples/MockDemo"
import ThemeSwitcher from "@/components/ThemeSwitch"
import Counter from "@/examples/StoreDemo"


// eslint-disable-next-line no-console
// console.log(routes)

function App() {
    return (
        <>
            <ThemeSwitcher />

            <Button>App</Button>
            <Counter />

            <MockDemo />

            <Suspense fallback={<p>Loading...</p>}>
                {useRoutes(routes)}
            </Suspense>
        </>
    )
}

export default App
