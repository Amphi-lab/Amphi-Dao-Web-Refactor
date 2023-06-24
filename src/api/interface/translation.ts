import { post } from '../axios';

export const confirmOrder = (data: any) => post('/translation/save', data);

export const other = [];
