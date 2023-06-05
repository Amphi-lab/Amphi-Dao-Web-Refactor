import { ConfigProvider, theme as antdTheme } from 'antd'
import { createContext, useState, useEffect, useContext } from 'react'
import en_US from 'antd/es/locale/en_US'
import customTheme from '@/styles/theme.json';

const ThemeContext = createContext<any>({})

function getSystemTheme(): 'dark' | 'light' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
}

function getStoredIsCompact(): boolean {
    return localStorage.getItem('isCompact') === 'true'
}

function storeIsCompact(isCompact: boolean) {
    localStorage.setItem('isCompact', isCompact.toString())
}

const ThemeProvider = (props: any) => {
    const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(
        getSystemTheme(),
    )
    const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(systemTheme)
    const [isCompact, setIsCompact] = useState<boolean>(getStoredIsCompact())

    useEffect(() => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (event) => {
                setSystemTheme(event.matches ? 'dark' : 'light')
            })
    }, [])

    const switchTheme = (theme: 'dark' | 'light' | 'system') => {
        localStorage.setItem('theme', theme)
        document.documentElement.dataset.theme = theme === 'system' ? systemTheme : theme
        setTheme(theme)
    }

    useEffect(() => {
        const setThemeFromLocalStore = () => {
            const _theme = localStorage.getItem('theme') as
                | 'dark'
                | 'light'
                | 'system'
            if (_theme) {
                switchTheme(_theme)
            } else {
                switchTheme(getSystemTheme())
            }
        }

        setThemeFromLocalStore()
    }, [])

    useEffect(() => {
        storeIsCompact(isCompact)
    }, [isCompact])

    let algorithm = [antdTheme.defaultAlgorithm]

    if (theme === 'system') {
        algorithm = [
            systemTheme === 'dark'
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
        ]
    } else if (theme === 'dark') {
        algorithm = [antdTheme.darkAlgorithm]
    }

    if (isCompact) {
        algorithm.push(antdTheme.compactAlgorithm)
    }

    return (
        <ThemeContext.Provider
            value={{ theme, switchTheme, isCompact, setIsCompact }}
        >
            <ConfigProvider
                prefixCls={systemTheme}
                locale={en_US}
                theme={{
                    ...customTheme,
                    algorithm,
                }}
            >
                {props.children}
            </ConfigProvider>
        </ThemeContext.Provider>
    )
}

const useTheme = () => useContext(ThemeContext)

export { ThemeProvider, useTheme }