import { ConfigProvider, theme as antdTheme } from 'antd';
import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import customTheme from '@/styles/theme.json';
import { useTranslation } from 'react-i18next';
import Storage from '@/utils/storage';
import { ThemeStorageKey } from '@/constants/storageKeys';

const ThemeContext = createContext<any>({});

function getSystemTheme(): 'dark' | 'light' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredIsCompact(): boolean {
    return Storage.setLocalStorage(ThemeStorageKey.isCompact) === 'true';
}

function setStoreIsCompact(isCompact: boolean) {
    Storage.setLocalStorage(ThemeStorageKey.isCompact, isCompact.toString());
}

const ThemeProvider = (props: any) => {
    const [, i18n] = useTranslation();
    const [locale, setLocale] = useState(enUS);
    const [algorithm, setAlgorithm] = useState([antdTheme.defaultAlgorithm]);

    const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(getSystemTheme());
    const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(systemTheme);
    const [isCompact, setIsCompact] = useState<boolean>(getStoredIsCompact());

    useEffect(() => setLocale(i18n.language === 'en-US' ? enUS : zhCN), [i18n.language]);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setSystemTheme(event.matches ? 'dark' : 'light');
        });
    }, []);

    const switchTheme = useCallback(
        (_theme: 'dark' | 'light' | 'system') => {
            Storage.setLocalStorage(ThemeStorageKey.mode, _theme);
            document.documentElement.dataset.theme = _theme === 'system' ? systemTheme : _theme;
            setTheme(_theme);
        },
        [systemTheme]
    );

    useEffect(() => {
        const setThemeFromLocalStore = () => {
            const _themeMode = Storage.getLocalStorage(ThemeStorageKey.mode) as
                | 'dark'
                | 'light'
                | 'system';
            if (_themeMode) {
                switchTheme(_themeMode);
            } else {
                switchTheme(getSystemTheme());
            }
        };

        setThemeFromLocalStore();
    }, [systemTheme, switchTheme]);

    useEffect(() => {
        setStoreIsCompact(isCompact);
    }, [isCompact]);

    useEffect(() => {
        let algorithmList = [antdTheme.defaultAlgorithm];

        if (theme === 'system') {
            algorithmList = [
                systemTheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
            ];
        } else if (theme === 'dark') {
            algorithmList = [antdTheme.darkAlgorithm];
        }

        if (isCompact) {
            algorithmList.push(antdTheme.compactAlgorithm);
        }
        setAlgorithm(algorithmList);
    }, [systemTheme, theme, isCompact]);

    const themeContextProp = useMemo(
        () => ({ theme, switchTheme, isCompact, setIsCompact }),
        [theme, switchTheme, isCompact]
    );
    const themeOption = useMemo(() => ({ ...customTheme, algorithm }), [algorithm]);

    return (
        <ThemeContext.Provider value={themeContextProp}>
            <ConfigProvider prefixCls={systemTheme} locale={locale} theme={themeOption}>
                {props.children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
