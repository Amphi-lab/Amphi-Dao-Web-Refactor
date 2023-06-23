/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import '@rainbow-me/rainbowkit/styles.css';
import { metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { ConnectButton, connectorsForWallets } from '@rainbow-me/rainbowkit';

import type { Chain } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { configureChains, createConfig, useAccount, useDisconnect, useSignMessage } from 'wagmi';

import api from '@/api';
import { refreshAPIToken } from '@/api/axios';
import storage from '@/utils/storage';
import * as storageKeys from '@/constants/storageKeys';
import styles from './index.module.scss';

const testChain: Chain = {
    id: 80001,
    name: 'Mumbai',
    network: 'Mumbai',
    // iconUrl: 'https://example.com/icon.svg',
    // iconBackground: '#fff',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-mumbai.maticvigil.com']
        },
        public: {
            http: ['https://rpc-mumbai.maticvigil.com']
        }
    },
    blockExplorers: {
        default: { name: 'SnowTrace', url: 'https://mumbai.polygonscan.com/' }
    },
    testnet: true
};

const { chains, publicClient } = configureChains(
    [testChain],
    [
        jsonRpcProvider({
            rpc: chain => ({ http: chain.rpcUrls.default.http[0] })
        })
    ]
);

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            injectedWallet({ chains }),
            metaMaskWallet({ chains, projectId: '', shimDisconnect: false })
        ]
    }
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
});

export { wagmiConfig, chains };

const ConnectWallet = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [nonce, setNonce] = useState('');
    const { data: signature, signMessageAsync } = useSignMessage();
    const { address, isConnected, isDisconnected } = useAccount();
    const addressInfo = useRef({ address });
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();

    // 获取Nonce
    const getNonce = async () => {
        try {
            const formData = new FormData();
            formData.append('address', address as string);

            const nonceRes = await api.getNonce(formData);

            if (nonceRes?.code === 200) {
                if (nonceRes?.msg) {
                    setNonce(nonceRes?.msg);
                    await signMessageAsync({
                        message: nonceRes?.msg
                    });
                }
            } else {
                disconnect();
            }
        } catch (err) {
            console.log('error', err);
            disconnect();
        }
    };

    // login
    const login = async () => {
        try {
            const res = await api.login({
                address,
                msg: nonce,
                signature
            });
            if (res.code === 200) {
                const user = res.data;
                if (userInfo !== user) {
                    setUserInfo(user);
                }

                const accessToken = user.token;
                storage.setLocalStorage(storageKeys.AMPHI_USERTOKEN, accessToken);
                storage.setLocalStorage(storageKeys.EXPIRE_TIME, user?.expireTime.toString());
                storage.setLocalStorage(storageKeys.CURRENT_ADDRESS, address as string);
                refreshAPIToken();
                addressInfo.current.address = address;
                if (!res.username) {
                    // navigate("/register/getstart");
                    navigate('/');
                } else {
                    navigate('/');
                    // navigate("/start/mywork");
                }
            }
        } catch (err) {
            disconnect();
        }
    };

    // logout
    // const logout = async () => {
    //     await api.logout({ address, msg: nonce, signature });
    // };

    // 处理nonce
    useEffect(() => {
        (async () => {
            if (isConnected) {
                const currentAccessToken = storage.getLocalStorage(storageKeys.AMPHI_USERTOKEN);
                const expireTime = storage.getLocalStorage(storageKeys.EXPIRE_TIME);
                if (new Date().getTime() > Number(expireTime || 0)) {
                    await getNonce();
                    // await getLogin(address as string);
                } else {
                    const currentAddress = storage.getLocalStorage(storageKeys.CURRENT_ADDRESS);
                    if (address !== currentAddress && !currentAccessToken) {
                        // await getLogin(address as string);
                        await getNonce();
                    }
                }
            }
        })();
    }, [isConnected]);

    // 处理登录
    useEffect(() => {
        (async () => {
            const currentAccessToken = storage.getLocalStorage(storageKeys.AMPHI_USERTOKEN);
            if (signature && !currentAccessToken) {
                await login();
            }
        })();
    }, [signature]);

    // 退出处理;
    useEffect(() => {
        const currentAccessToken = storage.getLocalStorage(storageKeys.AMPHI_USERTOKEN);
        if (isDisconnected && currentAccessToken) {
            storage.removeLocalStorage(storageKeys.AMPHI_USERTOKEN);
            storage.removeLocalStorage(storageKeys.CURRENT_ADDRESS);
            storage.removeLocalStorage(storageKeys.EXPIRE_TIME);
            refreshAPIToken();
            navigate('/');
            // window.location.reload();
        }
    }, [isDisconnected]);

    // 退出处理;
    useEffect(() => {
        (async () => {
            if (address && addressInfo.current.address && addressInfo.current.address !== address) {
                storage.removeLocalStorage(storageKeys.AMPHI_USERTOKEN);
                storage.removeLocalStorage(storageKeys.CURRENT_ADDRESS);
                storage.removeLocalStorage(storageKeys.EXPIRE_TIME);
                refreshAPIToken();
                disconnect();
                addressInfo.current.address = undefined;
                navigate('/');
                window.location.reload();
            }
        })();
    }, [address]);

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted
            }) => {
                console.log(account);
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type='button'
                                        className={styles['wallet-btn']}
                                    >
                                        Connect Wallet
                                    </button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button
                                        onClick={openChainModal}
                                        type='button'
                                        className={`${styles['wallet-btn']} ${styles.wrong}`}
                                    >
                                        Wrong network
                                    </button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <img src={account.ensAvatar || ''} alt='avatar' />
                                    <button
                                        onClick={openAccountModal}
                                        type='button'
                                        className={styles['connected-btn']}
                                    >
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default ConnectWallet;
