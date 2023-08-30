// 导入所需的React模块和其他依赖
import React, { Suspense } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { Spin } from 'antd';
import Layouts from '@/components/Layouts';
import { NoticeProvider } from '@/context/NoticeProvider';
import routes from '~react-pages';

// 函数组件App
function App() {
    // 使用react-router-dom提供的useLocation钩子函数来获取当前路由的位置对象
    const location = useLocation();

    // 返回JSX
    return (
        // NoticeProvider是自定义的上下文提供者，可能用于在应用内传递通知或消息
        <NoticeProvider>
            {/*
                Layouts是一个自定义的布局组件。
                当当前路由是根路径（'/'）时，显示横幅（isShowBanner为true）
            */}
            <Layouts isShowBanner={location.pathname === '/'}>
                {/*
                    使用React的Suspense组件来处理异步加载的组件。
                    如果组件还在加载中，显示一个中间态（这里是一个Spin加载器）。
                */}
                <Suspense
                    fallback={
                        <div
                            style={{
                                textAlign: 'center',
                                paddingTop: '100px',
                                paddingBottom: '100px'
                            }}
                        >
                            <Spin />
                        </div>
                    }
                >
                    {/*
                        使用react-router-dom提供的useRoutes钩子函数来动态地应用路由规则。
                        routes是一个包含了应用内所有路由规则的数组或对象。
                    */}
                    {useRoutes(routes)}
                </Suspense>
            </Layouts>
        </NoticeProvider>
    );
}

// 导出App组件
export default App;
