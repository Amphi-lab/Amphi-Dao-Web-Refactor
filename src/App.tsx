import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { Button } from "antd"
import { ThemeProvider } from "@/context/ThemeProvider"
import MockDemo from "./examples/MockDemo"
import ThemeSwitcher from "@/components/ThemeSwitch"


// eslint-disable-next-line no-console
// console.log(routes)

function App() {
    return (
        <ThemeProvider>
            <ThemeSwitcher />
            
            <Button>App</Button>

            <MockDemo />

            <Suspense fallback={<p>Loading...</p>}>
                {useRoutes(routes)}
            </Suspense>
        </ThemeProvider>
    )
}

export default App
