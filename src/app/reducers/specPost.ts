import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BlogTypes as Types } from '../../utils/Types'
import { BlogFetch as Fetch } from '../../utils/Tools'

const initialState: Types.SpecPostState = {
    post: {
        id: '',
        title: '',
        body: '',
        comments: [],
    },
    loading: Types.LoadingType.idle,
}

export const specPost = createSlice({
    name: Types.SPEC_POST,
    initialState,
    reducers: {
        cleanSpecPost: (state) => {
            state.post = { id: '', title: '', body: '', comments: [] }
        },
    },
    extraReducers: (builder) => {
        builder
            // start getting the post data
            .addCase(Fetch.getSpecPost.pending, (state) => {
                state.loading = Types.LoadingType.pending
            })
            // get post
            .addCase(
                Fetch.getSpecPost.fulfilled,
                (state, action: PayloadAction<Types.SpecPostItem>) => {
                    state.loading = Types.LoadingType.succeeded
                    state.post = {
                        id: action.payload.id,
                        title: action.payload.title,
                        body: action.payload.body,
                        comments: action.payload.comments,
                    }
                }
            )
            // update post data
            .addCase(
                Fetch.updateSpecPost.fulfilled,
                (state, action: PayloadAction<Types.SpecPostItem>) => {
                    state.post = {
                        id: action.payload.id,
                        title: action.payload.title,
                        body: action.payload.body,
                        comments: action.payload.comments || [],
                    }
                }
            )
            // push comment
            .addCase(
                Fetch.postComment.fulfilled,
                (state, action: PayloadAction<Types.CommentItem>) => {
                    state.post.comments.push(action.payload)
                }
            )
    },
})

export const { cleanSpecPost } = specPost.actions
export default specPost.reducer
