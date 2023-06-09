import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
    {
        label: 'START',
        key: 'start',
        children: [
            {
                label: 'Request Translation',
                key: 'requestTranslation'
            },
            {
                label: 'Translation',
                key: 'translation'
            },
            {
                label: 'Validation',
                key: 'validation'
            }
        ]
    },
    {
        label: 'WORKSPACE',
        key: 'workspace',
        children: [
            {
                label: 'Dashboard',
                key: 'dashboard'
            },
            {
                label: 'Task List',
                key: 'taskList'
            },
            {
                label: 'Acceptance List',
                key: 'acceptanceList'
            }
        ]
    },
    {
        label: 'NFT',
        key: 'nft',
        children: [
            {
                label: (
                    <a
                        href='https://testnets.opensea.io/zh-CN/collection/amphipass-2'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Amphi Pass NFT
                    </a>
                ),
                key: 'amphiPassNFT'
                // key:'https://testnets.opensea.io/zh-CN/collection/amphipass-2'
            }
        ]
    },
    {
        label: 'LEARN',
        key: 'learn',
        children: [
            {
                label: (
                    <a
                        href='https://drive.google.com/file/d/1nfm84w4o458WKZ7wQU9omx5EnAtKplNw/view'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Whitepaper
                    </a>
                ),
                key: 'whitepaper'
            },
            {
                label: 'FAQ',
                key: 'faq'
            }
        ]
    }
];

const App: React.FC = () => {
    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />;
};

export default App;
