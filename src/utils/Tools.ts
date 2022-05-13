import { createAsyncThunk } from '@reduxjs/toolkit'
import { BlogTypes as Types } from './Types'

export namespace BlogFetch {
    /*
        GET POSTS
    */
    export const getPostList = createAsyncThunk(
        Types.GET_POST_LIST,
        async () => {
            const response = await fetch(Types.POST_API)
            return response.json()
        }
    )

    /*
        CREATE POST
    */
    export const postNewPost = createAsyncThunk(
        Types.POST_NEW_POST,
        async (newPost: Omit<Types.PostItem, 'id'>) => {
            const response = await fetch(Types.POST_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            })
            return response.json()
        }
    )

    /*
        DELETE POST
    */
    export const deletePost = createAsyncThunk(
        Types.DELETE_POST,
        async (postID: string) => {
            const response = await fetch(Types.POST_API + `/${postID}`, {
                method: 'DELETE',
            })
            return response.json()
        }
    )

    /*
        GET SPECIFIC POST
    */
    export const getSpecPost = createAsyncThunk(
        Types.GET_SPEC_POST,
        async (postID: string) => {
            const response = await fetch(
                Types.POST_API + `/${postID}?_embed=comments`
            )
            return response.json()
        }
    )

    /*
        UPDATE SPECIFIC POST
    */
    export const updateSpecPost = createAsyncThunk(
        Types.UPDATE_SPEC_POST,
        async (post: Types.SpecPostItem) => {
            const data: Omit<Types.SpecPostItem, 'id' | 'comments'> = {
                title: post.title,
                body: post.body,
            }
            const response = await fetch(Types.POST_API + `/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            return response.json()
        }
    )

    /*
        POST COMMENT
    */
    export const postComment = createAsyncThunk(
        Types.POST_NEW_COMMENT,
        async (newComment: Omit<Types.CommentItem, 'id'>) => {
            const response = await fetch(Types.COMMENT_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            })
            return response.json()
        }
    )
}
