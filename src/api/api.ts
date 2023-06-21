import { get } from './axios';

/* 
    首页-Earn Bounties by Translating
    `/translation/list?params[orderByBounty]=${order}&pageNum=1&pageSize=10`
    "params[orderByBounty]":传1是top ，latest:latest时去掉这个参数
 */
export const ranking = ({ order }: { order: '1' | '2' }) =>
    get(
        `/translation/list?${order === '1' ? 'params[orderByBounty]=1&' : ''}pageNum=1&pageSize=10`
    );
/**
    /translator/list 翻译者列表
    "language": "2", 语言
    "pageNum": 1,
    "pageSize": 10,
  */
export const getTranslatorList = () => get(`/translator/list?language=2&pageNum=1&pageSize=10`);
