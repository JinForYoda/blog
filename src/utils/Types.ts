export namespace BlogTypes {
    /*
        REDUCERS
    */
    export const POST_LIST = 'postList'
    export const SPEC_POST = 'specPost'

    /*
        ACTIONS
    */
    export const GET_POST_LIST = POST_LIST + '/getPostList'
    export const POST_NEW_POST = POST_LIST + '/postNewPost'
    export const DELETE_POST = POST_LIST + '/deletePost'
    export const GET_SPEC_POST = POST_LIST + '/getSpecPost'
    export const UPDATE_SPEC_POST = POST_LIST + '/updateSpecPost'
    export const POST_NEW_COMMENT = POST_LIST + '/postNewComment'

    /*
        API
    */
    export const POST_API = 'https://bloggy-api.herokuapp.com/posts'
    export const COMMENT_API = 'https://bloggy-api.herokuapp.com/comments'

    export enum LoadingType {
        idle = 'idle',
        pending = 'pending',
        succeeded = 'succeeded',
        failed = 'failed',
    }

    /*
        DATA INTERFACES
    */
    export interface PostListState {
        postList: PostList
        loading: keyof typeof LoadingType
    }
    export interface SpecPostState {
        post: SpecPostItem
        loading: keyof typeof LoadingType
    }

    export type PostList = PostItem[]

    export type PostItem = {
        id: string
        title: string
        body: string
    }

    export interface SpecPostItem extends PostItem {
        comments: CommentItem[]
    }

    export type CommentItem = {
        postId: string
        id: string
        body: string
    }
}
