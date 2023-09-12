// mock/workspace.ts

import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from './_util';

const workspaceData = [
    {
        id: '1',
        status: 'Pending reply',
        workload: 1000,
        sourceLang: 'English',
        targetLang: 'Spanish',
        createTime: '2022-01-01 12:00:00',
        deadline: '2022-01-10 12:00:00',
        instruction: 'Translate the document',
        translationFiles: [],
        translationIndex: 0
    },
    {
        id: '2',
        status: 'In service',
        workload: 2000,
        sourceLang: 'English',
        targetLang: 'French',
        createTime: '2022-01-02 12:00:00',
        deadline: '2022-01-12 12:00:00',
        instruction: 'Translate the website',
        translationFiles: [],
        translationIndex: 1
    }
];

export default [
    {
        url: '/api/workspace',
        timeout: 200,
        method: 'get',
        response: () => {
            return resultSuccess(workspaceData);
        }
    }
] as MockMethod[];
