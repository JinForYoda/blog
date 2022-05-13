import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import postList from './reducers/postList'
import specPost from './reducers/specPost'

export const store = configureStore({
    reducer: {
        postList: postList,
        specPost: specPost,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
