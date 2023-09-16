import { get, post } from '../axios';

// 比赛报名的页面
export const competRegistration = (data: any) => post('/competition/register', data);

// 获取参赛团队信息
export const getGroupInfo = (data:any) => get('/competition/getGroupInfo', data);

// 加入团队
export const addGroup = (id:any) => get(`/competition/doJoin/${id}`);

// 获取任务列表  
export const getTaskList = () => get(`/competition/getTaskList`);

// 申请任务  /competition/apply/{taskId}
export const applyTask = (taskId:string) => get(`/competition/apply/${taskId}`);

// 获取已经 apply的任务 /competition/getAppliedTaskList
export const getAppliedTaskList = () => get(`/competition/getAppliedTaskList`);

// 获取当前用户是否参加了比赛
export const isJoinCompetition = () =>  get(`/competition/isJoinCompetition`);
