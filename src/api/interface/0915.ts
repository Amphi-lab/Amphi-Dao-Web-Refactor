import { get, post } from '../axios';

// 比赛报名的页面
export const competRegistration = (data: any) => post('/login', data);

// 获取参赛团队信息
export const getGroupInfo = (data:any) => get('/competition/getGroupInfo', data);

// 加入团队
export const addGroup = (id:any) => get(`/competition/doJoin/${id}`);

//