import { post, get, deleteFetch } from '../axios';

// confirm order
export const saveOrder = (data: any) => post('/translation/save', data);

// get Order Detail
export const getOrderDetail = (id: number) => get(`/translation/${id}`);

// cancel order
export const cancelOrder = (id: number) => deleteFetch(`/translation/${id}`);

/**
 * @description: 获取翻译者列表
 * @param {any} data:{
                    "translationIndex": 1, 订单号
                    "pageNum": 1,
                    "pageSize": 10,
 *              }
 * @return {*}
 */
export const getCandidateList = (data: any) => get('/translator/applyingList', data);

/**
 * @description: 查询评论 Updates and Discussions
 * @param {any} formDaata:translationIndex
 * @return {*}
 */
export const getDiscussions = (data: any) => get('/comment/list', data);

/**
 * @description:订单完成后评价
 * @param {any} data:{
    "translationIndex":"2", --订单号
    "machine": 1, --机翻是否满意 0=不满意 1=满意
    "overall":10,  
    "professional":10,  
    "timeliness":10, 
    "attitude":10,
    "comment":"testtttt" -- 输入的评价
}
 * @return {*}
 */
export const evalution = (data: any) => post('/evalution/save', data);

// /evalution/{translationIndex} 查询评价
export const getEvalutions = (transIndex: number) => get(`/evalution/${transIndex}`);
