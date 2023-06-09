import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export default store;

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
