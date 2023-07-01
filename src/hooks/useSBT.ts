import { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import type { IBadgeItem, ISlotItem, ITokenURI, TTokenId } from '@/types/ISBT';
import {
    getBadgeSlot,
    getAllBadgeList,
    isRemindBadge,
    wearBadge,
    takeOffBadge,
    getNeedRemindBadgeList
} from '@/utils/sbt';
import { getSBTContract } from '@/contracts/contract';
import storage from '@/utils/storage';
import { AMPHI_USERTOKEN } from '@/constants/storageKeys';

const SBTContract = await getSBTContract();

const useSBT = () => {
    const { address } = useAccount();
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    // 是否需要提醒
    const [isNeedRemind, setIsNeedRemind] = useState(false);
    // 拥有的所有徽章列表
    const [ownedList, setOwnedList] = useState<IBadgeItem[]>([]);
    // 需要提醒的徽章列表
    const [remindList, setRemindList] = useState<IBadgeItem[]>([]);
    // 插槽列表
    const [slotList, setSlotList] = useState<ISlotItem[]>([]);

    const getLoginStatus = useCallback(() => {
        const token = storage.getLocalStorage(AMPHI_USERTOKEN);
        console.log('---------token---------', token);
        if (token) setIsLogin(true);
        else setIsLogin(false);
    }, []);

    useEffect(() => {
        let timer: any;
        if (address) {
            getLoginStatus();
            timer = setInterval(() => {
                getLoginStatus();
            }, 3000);
        }
        if (isLogin && address) clearInterval(timer);
        return () => {
            clearInterval(timer);
            timer = null;
        };
    }, [isLogin, address, getLoginStatus]);

    const fetchData = useCallback(async () => {
        if (address) {
            setLoading(true);
            try {
                const [slotRes, allRes, remindRes] = await Promise.all([
                    getBadgeSlot(address),
                    getAllBadgeList(address),
                    getNeedRemindBadgeList(address)
                ]);
                // 当有为0的记录时是需要提醒的记录（弹窗）
                // const remindRes = allRes.filter(({ isRemind }: IBadgeItem) => isRemind === 0);
                setSlotList(slotRes);
                setOwnedList(allRes);
                setRemindList(remindRes);
                // 提醒完用户有新徽章后调用
                if (remindRes.length > 0) {
                    setIsNeedRemind(true);

                    let tokenId;
                    let tokenIds;
                    if (remindRes.length === 1) tokenId = remindRes[0].tokenId;
                    if (remindRes.length > 1)
                        tokenIds = remindRes.map((item: IBadgeItem) => item.tokenId);
                    isRemindBadge({ address, tokenId, tokenIds });
                } else setIsNeedRemind(false);
                setLoading(false);
            } catch (error) {
                console.log('useSBT fetchData error===>', error);
                setLoading(false);
            }
        }
    }, [address]);

    useEffect(() => {
        if (address && isLogin) fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, isLogin]);

    const handleWear = useCallback(
        (tokenId: TTokenId) => {
            if (address) {
                wearBadge({ address, wordsSbt: tokenId });
            }
        },
        [address]
    );
    const handleTakeOffBadge = useCallback(() => {
        if (address) takeOffBadge(address);
    }, [address]);

    const getSBTInfo = useCallback(async (tokenId: TTokenId) => {
        const res: ITokenURI = await SBTContract.methods.getTokenURI(tokenId).call();
        return res;
    }, []);

    return {
        loading,
        isNeedRemind,
        ownedList,
        slotList,
        remindList,
        handleWear,
        handleTakeOffBadge,
        getSBTInfo
    };
};

export default useSBT;
