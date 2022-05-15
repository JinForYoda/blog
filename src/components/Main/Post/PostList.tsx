import { Container, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { BlogFetch as Fetch } from '../../../utils/Tools'
import { BlogTypes as Types } from '../../../utils/Types'
import Loader from '../../Loader'
import PostCard from './PostCard'
import PostCreator from './PostCreator'

export default function PostList() {
    const dispatch = useAppDispatch()
    const postList = useAppSelector((store) => store.postList.postList)
    const loadingStatus = useAppSelector((store) => store.postList.loading)

    // after deleting need to update posts list
    const postDelete = async (id: string) => {
        await dispatch(Fetch.deletePost(id))
        await dispatch(Fetch.getPostList())
    }

    return (
        <Container fluid>
            <PostCreator />
            {loadingStatus !== Types.LoadingType.pending ? (
                <Row className="gap-5">
                    {postList.map((post: Types.PostItem) => (
                        <PostCard post={post} onDelete={postDelete} />
                    ))}
                </Row>
            ) : (
                <Loader />
            )}
        </Container>
    )
}
