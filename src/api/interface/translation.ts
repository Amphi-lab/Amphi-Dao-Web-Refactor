import { post, get } from '../axios';

// confirm order
export const saveOrder = (data: any) => post('/translation/save', data);

// Order Detail
export const getOrderDetail = (id: number) => get(`/translation/${id}`);

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
