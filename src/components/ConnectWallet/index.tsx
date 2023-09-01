/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { DynamicWidget, useDynamicContext,DynamicUserProfile } from '@dynamic-labs/sdk-react';
import { useAccount, useDisconnect,useSignMessage } from 'wagmi';


import api from '@/api';
// import { refreshAPIToken } from '@/api/axios';
import storage from '@/utils/storage';
import * as storageKeys from '@/constants/storageKeys';
import DefaultAvatar from '@/assets/svg/default-avatar.svg';
import ArrowDown from '@/assets/svg/arrow-down-solid.svg';
import type { MenuProps } from 'antd';
import { message, Dropdown } from 'antd';
import styles from './index.module.scss';



const items: any = [
    {
        key: '/preferences',
        // label: <a href='/preferences'>Preference</a>
        label: 'Preference',
        path: '/preferences'
    },
    {
        key: '/portfolio',
        // label: <a href='/portfolio'>Portfolio</a>
        label: 'Portfolio',
        path: '/portfolio'
    },
    {
        key: '/myorders',
        // label: <a href='/portfolio'>Portfolio</a>
        label: 'My Orders',
        path: '/myorders'
    },
    {
        key: '/workspace',
        label: 'Workspace',
        path: '/workspace'
    }
];

const ConnectWallet = () => {
    const [userInfo, setUserInfo] = useState(null);
    // const [nonce, setNonce] = useState('');
    const [balance, setBalance] = useState(null);
    // const { data: signature, signMessageAsync } = useSignMessage(); 
    const { data: signature } = useSignMessage();
    const { address, isConnected, isDisconnected } = useAccount();
    console.log(useAccount(), useDynamicContext())
    const addressInfo = useRef({ address });
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();
    // const { chain } = useNetwork();
    const {
        // handleLogOut,
        setShowAuthFlow,
        // showAuthFlow,
        primaryWallet,
        user,
        setShowDynamicUserProfile
    } = useDynamicContext();


    const handleMenuClick: MenuProps['onClick'] = e => {
        // message.info('Click on menu item.');
        // console.log('click', e);
        navigate(e.key);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick
    };

    // 获取Nonce
    // const getNonce = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('address', address as string);
    //
    //         const nonceRes = await api.getNonce(formData);
    //
    //         if (nonceRes?.code === 200) {
    //             if (nonceRes?.msg) {
    //                 setNonce(nonceRes?.msg);
    //                 await signMessageAsync({
    //                     message: nonceRes?.msg
    //                 });
    //             }
    //         } else {
    //             disconnect();
    //         }
    //     } catch (err) {
    //         console.log('error', err);
    //         disconnect();
    //     }
    // };

    // login
    const login = async () => {
        try {
            const res = await api.login({
                address,
                msg: nonce,
                signature
            });
            if (res.code === 200) {
                const _user = res.data;
                if (userInfo !== user) {
                    setUserInfo(_user);
                }

                const accessToken = _user.token;
                storage.setLocalStorage(storageKeys.AMPHI_USERTOKEN, accessToken);
                storage.setLocalStorage(storageKeys.EXPIRE_TIME, _user?.expireTime.toString());
                storage.setLocalStorage(storageKeys.CURRENT_ADDRESS, address as string);
                // refreshAPIToken();
                addressInfo.current.address = address;
                message.success('Login successful');
                window.location.reload();
                if (!res.username) {
                    // navigate('/');
                } else {
                    // navigate('/');
                }
            }
        } catch (err) {
            disconnect();
        }
    };

    // logout
    // const logout = async () => {
    //     await api.logout({
    //         address: storage.getLocalStorage(storageKeys.CURRENT_ADDRESS),
    //         msg: nonce,
    //         signature
    //     });
    // };

    // 处理nonce
    // useEffect(() => {
    //     (async () => {
    //         if (isConnected) {
    //             const currentAccessToken = storage.getLocalStorage(storageKeys.AMPHI_USERTOKEN);
    //             const expireTime = storage.getLocalStorage(storageKeys.EXPIRE_TIME);
    //             if (new Date().getTime() > Number(expireTime || 0)) {
    //                 await getNonce();
    //             } else {
    //                 const currentAddress = storage.getLocalStorage(storageKeys.CURRENT_ADDRESS);
    //                 if (address !== currentAddress && !currentAccessToken) {
    //                     await getNonce();
    //                 }
    //             }
    //         }
    //     })();
    // }, [isConnected]);

    // 处理登录
    useEffect(() => {
        (async () => {
            const currentAccessToken = storage.getLocalStorage(storageKeys.AMPHI_USERTOKEN);
            if (signature && !currentAccessToken) {
                await login();
            }
        })();
    }, [isConnected, signature]);

    // 退出处理;
    useEffect(() => {
        (async () => {
            const currentAccessToken = storage.getLocalStorage(storageKeys.AMPHI_USERTOKEN);
            if (isDisconnected && currentAccessToken) {
                // console.log('logout 111');
                // await getNonce();
                // await logout();
                storage.removeLocalStorage(storageKeys.AMPHI_USERTOKEN);
                storage.removeLocalStorage(storageKeys.CURRENT_ADDRESS);
                storage.removeLocalStorage(storageKeys.EXPIRE_TIME);
                // refreshAPIToken();
                // navigate('/');
                window.location.reload();
            }
        })();
    }, [isDisconnected]);

    // 退出处理;
    useEffect(() => {
        (async () => {
            if (address && addressInfo.current.address && addressInfo.current.address !== address) {
                // await getNonce();
                // await logout();
                storage.removeLocalStorage(storageKeys.AMPHI_USERTOKEN);
                storage.removeLocalStorage(storageKeys.CURRENT_ADDRESS);
                storage.removeLocalStorage(storageKeys.EXPIRE_TIME);
                console.log('logout 222');

                // refreshAPIToken();
                disconnect();
                addressInfo.current.address = undefined;
                // navigate('/');
                window.location.reload();
            }
        })();
    }, [address]);

    // 查询余额
    useEffect(() => {
        const fetchBalance = async () => {
            if (primaryWallet) {
                const value = await primaryWallet.connector.getBalance();
                setBalance(value as any);
            }
        };
        fetchBalance();
    }, [primaryWallet]);

    return (
        <>
<DynamicWidget/>
        { user?  
        
        <Dropdown
        menu={menuProps}
        overlayClassName={styles['home-person-menu']}
    >
        <div style={{ display: 'flex' }}>
            <img
                src={user?.ens?.avatar || DefaultAvatar}
                alt='avatar'
            />
            <button
                onClick={()=>setShowDynamicUserProfile(true)}
                type='button'
                className={styles['connected-btn']}
            >
                {user?.lastName || user?.email}
                {balance}
            </button>
            <DynamicUserProfile />           
             <img src={ArrowDown} alt='' />
        </div>
    </Dropdown>: 
                 <button
                 onClick={() => setShowAuthFlow(true)}
                 type='button'
                 className={`${styles['wallet-btn']}`}
             >
                 Sign in / Sign up
             </button>
            }
        </>
    );
};

export default ConnectWallet;
