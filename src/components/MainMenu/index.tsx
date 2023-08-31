// Import necessary modules and types
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

// Data for menu items
const items: MenuProps['items'] = [
    {
        label: 'Bounty',
        key: 'start',
        children: [
            {
                label: 'Request Translation',
                key: 'requestTranslation'
            },
            {
                label: 'Translation',
                key: 'translation'
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
            }
        ]
    },
    {
        label: 'Competition',
        key: 'competition',
        children: [
            {
                label: "Join Competition",
                key: 'competition'
            }
        ]
    }
];

// Main functional component
const App: React.FC = () => {
    // React Router hook for navigation
    const navigate = useNavigate();

    // Local state to manage currently selected menu item
    const [current, setCurrent] = useState('');

    // Event handler for Menu onClick
    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
        // Navigate to the new route based on the clicked menu item
        navigate(`/${e.key}`);
    };

    // Render the Menu component
    return (
        <Menu
            // Custom CSS class for styling
            className={styles['main-menu']}
            // onClick handler
            onClick={onClick}
            // Highlight the currently selected menu item
            selectedKeys={[current]}
            // Menu orientation
            mode='horizontal'
            // Pass in menu items
            items={items}
        />
    );
};

export default App;
