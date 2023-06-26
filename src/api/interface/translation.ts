import { post } from '../axios';

export const saveOrder = (data: any) => post('/translation/save', data);

export const other = [];
