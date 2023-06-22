import { stringify } from 'qs';
import { get } from '../axios';

/* 
    首页-Earn Bounties by Translating
    `/translation/list?params[orderByBounty]=${order}&pageNum=1&pageSize=10`
    "params[orderByBounty]":传1是top ，latest:latest时去掉这个参数
 */
/**
 *
 * @param {object} options    配置对象
 * @param {string} options.order   1 | undefined ; 1是top ，latest:latest时去掉这个参数
 * @returns
 */
export const ranking = ({ order }: { order: '1' | '2' }) =>
    get(
        `/translation/list?${order === '1' ? 'params[orderByBounty]=1&' : ''}pageNum=1&pageSize=10`
    );

/**
 * 翻译者列表
 * url: /translator/list    请求地址
 * @param {object} options    配置对象
 * @param {string} options.language   语言
 * @param {number} options.pageNum    页码
 * @param {number} options.pageSize   每页多少条数据
 * @returns
 */
export const getTranslatorList = ({ language, pageNum = 1, pageSize = 10 }: any) =>
    get(`/translator/list?language=${language}&pageNum=${pageNum}&pageSize=${pageSize}`);

/**
 * 翻译任务列表
 * url: /translation/list    请求地址
 * @param {object} options    配置对象
 * @param {array}  options.translationTypeArray 类型
 * @param {object} options.params 时间范围
 * @param {string} options.params.beginCreateTime 开始时间
 * @param {string} options.params.endCreateTime 结束时间
 * @param {number} options.pageNum    页码
 * @param {number} options.pageSize   每页多少条数据
 * @returns
 */
export const getTranslationList = (options: any) => get(`/translation/list?${stringify(options)}`);
