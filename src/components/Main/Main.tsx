import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { BlogFetch as Fetch } from '../../utils/Tools'
import PostList from './PostList'
import SpecPost from './SpecPost'

export default function Main() {
    const dispatch = useAppDispatch()
    // get Posts
    useEffect(() => {
        dispatch(Fetch.getPostList())
    })

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Navigate to="/posts" />} />
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/posts/:id" element={<SpecPost />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
