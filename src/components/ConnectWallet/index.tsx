/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, useAccount, useDisconnect, useSignMessage } from 'wagmi';
import type { Chain } from 'wagmi';
// import { polygonMumbai } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import api from '@/api';
import storage from '@/utils/storage';
import * as storageKeys from '@/constants/storageKeys';
import { useNavigate } from 'react-router';

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
            metaMaskWallet({
                chains,
                projectId: '',
                shimDisconnect: false
            })
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
    const [nonce, setNonce] = useState('');
    const { data: signature, signMessageAsync } = useSignMessage();
    const { address, isConnected, isDisconnected } = useAccount();
    const addressInfo = useRef({ address });
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();

    // 获取Nonce
    const getNonce = async () => {
        console.log('getNonce');
        console.log(isDisconnected);
        try {
            const formData = new FormData();
            formData.append('address', address as string);

            const nonceRes = await api.getNonce(formData);

            if (nonceRes?.data?.code === 200) {
                if (nonceRes?.data?.msg) {
                    setNonce(nonceRes?.data?.msg);
                    await signMessageAsync({
                        message: nonceRes?.data?.msg
                    });
                }
            } else {
                disconnect();
            }
        } catch (err) {
            disconnect();
        }
    };

    // 处理Nonce
    const handleNonce = async () => {
        console.log('handleNonce');
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
    };

    // login
    const fetchLogin = async () => {
        try {
            const info = await api.login({
                address,
                msg: nonce,
                signature
            });
            if (info.data.code === 200) {
                const res = info.data.data;

                // if (userInfo !== res) {
                //     setUserInfo(res);
                // }

                const accessToken = res.token;
                storage.setLocalStorage(storageKeys.AMPHI_USERTOKEN, accessToken);
                storage.setLocalStorage(
                    storageKeys.EXPIRE_TIME,
                    info?.data?.data?.expireTime.toString()
                );
                storage.setLocalStorage(storageKeys.CURRENT_ADDRESS, address as string);
                // refreshAPIToken();
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

    useEffect(() => {
        handleNonce();
        fetchLogin();
    }, []);

    return <ConnectButton />;
};

export default ConnectWallet;
