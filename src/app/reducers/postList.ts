import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BlogTypes as Types } from '../../utils/Types'
import { BlogFetch as Fetch } from '../../utils/Tools'

const initialState: Types.PostListState = {
    postList: [],
    loading: Types.LoadingType.idle,
}

export const postList = createSlice({
    name: Types.POST_LIST,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // start getting the post list
            .addCase(Fetch.getPostList.pending, (state) => {
                state.loading = Types.LoadingType.pending
            })
            // get all posts
            .addCase(
                Fetch.getPostList.fulfilled,
                (state, action: PayloadAction<Types.PostList>) => {
                    state.loading = Types.LoadingType.succeeded
                    state.postList = [...action.payload]
                }
            )
            // push new post
            .addCase(Fetch.postNewPost.fulfilled, (state) => {})
            // delete post
            .addCase(Fetch.deletePost.fulfilled, () => {})
    },
})

export default postList.reducer
