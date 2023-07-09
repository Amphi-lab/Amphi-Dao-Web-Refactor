import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { currentLanguages, translationTypes } from '@/constants/selcet.json';
import api from '@/api';
import type { RootState } from '../index';

// 定义 slice state 的类型
export interface requestTranState {
    translationIndex: string;
    translationState: number;
    currentStep: number;
    translationFileList: [];
    orderDetailData: {};
}

// 使用该类型定义初始 state
const initialState: requestTranState = {
    translationIndex: '0',
    translationState: 0,
    currentStep: 1,
    translationFileList: [],
    orderDetailData: {}
};

export const saveAsync = createAsyncThunk('requestTrans/saveTrans', async (data: {}) => {
    api.saveOrder(data).then((res: any) => {
        console.log(res);
    });
});

// 创建slice
export const counterSlice = createSlice({
    name: 'orderDetail',
    // `createSlice` 将从 `initialState` 参数推断 state 类型
    initialState,
    // 定义action，这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
    reducers: {
        getTranslationIndex: (state, action: PayloadAction<string>) => {
            // console.log('getTranslationIndex', action.payload);
            state.translationIndex = action.payload;
        },
        getTranslationState: (state, action: PayloadAction<number>) => {
            state.translationState = action.payload;
        },
        getCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
        getTranslationFileList: (state, action: PayloadAction<[]>) => {
            state.translationFileList = [...action.payload];
        },
        getOrderDetailData: (state, action: PayloadAction<{}>) => {
            state.orderDetailData = { ...action.payload };
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
export const {
    getTranslationIndex,
    getTranslationState,
    getCurrentStep,
    getTranslationFileList,
    getOrderDetailData
} = counterSlice.actions;

// selectors 等其他代码可以使用导入的 `RootState` 类型
export const translationIndex = (state: RootState) => state.orderDetail.translationIndex;
export const translationState = (state: RootState) => state.orderDetail.translationState;
export const currentStep = (state: RootState) => state.orderDetail.currentStep;
export const translationFileList = (state: RootState) => state.orderDetail.translationFileList;
export const orderDetailData = (state: RootState) => state.orderDetail.orderDetailData;

// 内置了thunk插件，可以直接处理异步请求
// export const incrementIfOdd =(amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = selectCount(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default counterSlice.reducer;
