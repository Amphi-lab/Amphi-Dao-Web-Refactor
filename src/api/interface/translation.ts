import { post, get } from '../axios';

// confirm order
export const saveOrder = (data: any) => post('/translation/save', data);

// Order Detail
export const getOrderDetail = (id: number) => get(`/translation/${id}`);

// Translation candidate
export const getCandidateList = (data: any) => get('/translator/applyingList', data);

// 查询评论 Updates and Discussions
export const getDiscussions = (data: any) => get('/comment/list', data);
