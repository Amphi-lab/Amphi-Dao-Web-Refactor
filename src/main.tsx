/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { WagmiConfig } from 'wagmi';
import '@/styles/reset.css';
import '@/styles/global.scss';
import store from '@/store';
// import { ThemeProvider } from '@/context/ThemeProvider';
import '@/i18n';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react';

// 1. Import the DynamicWagmiConnector
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <DynamicContextProvider
                settings={{
                    environmentId: 'ec2d73e9-1c8a-4d0a-a2c5-abb3be77f6aa'
                }}
            >
                <DynamicWagmiConnector>
                    <Router>
                        <App />
                    </Router>
                </DynamicWagmiConnector>
            </DynamicContextProvider>
        </Provider>
    </React.StrictMode>
);
