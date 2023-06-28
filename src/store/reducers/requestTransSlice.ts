import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// 定义 slice state 的类型
export interface requestTranState {
    transLang: String;
    serviceType: String;
    workload: number;
    deadline: String;

    amphiServiceCost: Number;
    translatorFee: Number;
    bounty: Number;
    totalCost: number;
}

// 使用该类型定义初始 state
const initialState: requestTranState = {
    transLang: '',
    serviceType: '',
    workload: 0,
    deadline: '',
    amphiServiceCost: 1000,
    translatorFee: 1000,
    bounty: 0,
    totalCost: 0
};

export const incrementAsync = createAsyncThunk(
    'requestTrans/fetchCount',
    async (amount: number) => {
        // const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return amount;
    }
);

// 创建slice
export const counterSlice = createSlice({
    name: 'requestTrans',
    // `createSlice` 将从 `initialState` 参数推断 state 类型
    initialState,
    // 定义action，这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
    reducers: {
        // totalCost: state => {
        //     // state.totalCost = state.amphiServiceCost + state.translatorFee + state.bounty;
        // },
        getWorkload: (state, action: PayloadAction<[]>) => {
            state.workload = 0;
            action.payload.forEach((file: { response: { data: { wordCount: any } } }) => {
                state.workload += Number(file?.response?.data?.wordCount || 0);
            });
        }
    }
    // extraReducers: builder => {
    //     builder
    //         .addCase(incrementAsync.pending, state => {
    //             state.status = 'loading';
    //         })
    //         .addCase(incrementAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             state.value += action.payload;
    //         })
    //         .addCase(incrementAsync.rejected, state => {
    //             state.status = 'failed';
    //         });
    // }
});

// Action creators are generated for each case reducer function
export const { getWorkload } = counterSlice.actions;

// selectors 等其他代码可以使用导入的 `RootState` 类型
export const summaryWorkload = (state: RootState) => state.requestTrans.workload;

// 内置了thunk插件，可以直接处理异步请求
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = selectCount(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default counterSlice.reducer;
