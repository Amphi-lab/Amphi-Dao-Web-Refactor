import { get, post, deleteFetch } from '../axios';

// get glossary list
export const getGlossaryList = (translationIndex: string) =>
    get('/glossary/list', { translationIndex });

// add glossary item
/**
 * @description: 添加术语表 
 * @param {any} data：{
    "translationIndex":"872579805407744000", 
    "translationCharactor":"Translator", --需求方提交的传Buyer,翻译者提交的传Translator
    "source":"eye", --单词
    "target":"眼睛" --对应的翻译单词
}
 * @return {*}
 */
export const addGlossaryItem = (data: any) => post('/glossary/save', data);

// delete glossary item
export const deleteGlossaryItem = (id: number) => deleteFetch(`/glossary/${id}`);
