import React from 'react';
import Logo from '@/assets/svg/logo';
import MainMenu from '../MainMenu';
import styles from './index.module.scss';

const Header = () => {
    return (
        <header className={styles['amphi-header']}>
            <Logo />
            <MainMenu />
        </header>
    );
};

export default Header;
