/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@/styles/global.scss';
import '@/styles/reset.scss';
import store from '@/store';
// import { ThemeProvider } from '@/context/ThemeProvider';
// import { wagmiConfig as config, chains } from '@/components/ConnectWallet';
import '@/i18n';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react';

// 1. Import the DynamicWagmiConnector
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import App from './App';

// 使用ReactDOM.createRoot API，这是Concurrent Mode的一个功能。
// Concurrent Mode 可以让 React 在高优先级更新存在的情况下中断渲染工作，
// 提供更为平滑的用户体验。
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // React.StrictMode 是一个包装组件，用来检查应用中的潜在问题。
    <React.StrictMode>
        {/*
          Provider 是 react-redux 库的一部分，
          用于在 React 应用中提供一个 Redux store。
          所有的子组件都能够通过这个 Provider 访问到 Redux store。
        */}
        <Provider store={store}>
            {/*
              DynamicContextProvider 可能是一个上下文提供者，
              用于提供应用程序运行时需要的一些动态设置。
              这里传入了一个 environmentId。
            */}
            <DynamicContextProvider
                settings={{
                    environmentId: '5fb8d1c1-b293-4fb7-a9a7-27790dcf5499'  // old: ec2d73e9-1c8a-4d0a-a2c5-abb3be77f6aa
                }}
            >
                {/*
                  DynamicWagmiConnector 可能是用于连接某个服务或库的组件，
                */}
                <DynamicWagmiConnector>
                    {/*
                      使用 react-router-dom 的 Router 组件来处理应用内的路由。
                      App 组件可能包含具体的路由规则和页面组件。
                    */}
                    <Router>
                        <App />
                    </Router>
                </DynamicWagmiConnector>
            </DynamicContextProvider>
        </Provider>
    </React.StrictMode>
);
