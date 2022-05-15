import { useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { BlogFetch as Fetch } from '../../../utils/Tools'
import { BlogTypes as Types } from '../../../utils/Types'
import { cleanSpecPost } from '../../../app/reducers/specPost'
import Loader from '../../Loader'
import PostUpdater from './PostUpdater'
import CommentForm from './CommentForm'

export default function SpecPost() {
    // get postId from url params
    const { id } = useParams()

    const dispatch = useAppDispatch()

    const specPost = useAppSelector((store) => store.specPost.post)
    const loadingStatus = useAppSelector((store) => store.specPost.loading)

    useEffect(() => {
        dispatch(Fetch.getSpecPost(id as string))
    }, [id, dispatch])

    // clean post when leave page
    const onGoBack = () => {
        dispatch(cleanSpecPost())
    }

    return (
        <>
            <Link to="/posts">
                <Button onClick={onGoBack} variant="secondary" className="mt-3">
                    Go Back
                </Button>
            </Link>
            {loadingStatus !== Types.LoadingType.pending ? (
                specPost.id && (
                    <>
                        <PostUpdater specPost={specPost} />
                        <CommentForm specPost={specPost} />
                        <h3 className="mt-3">Comments</h3>
                        <ListGroup variant="flush">
                            {specPost.comments.length > 0 ? (
                                specPost.comments.map((comment) => (
                                    <ListGroup.Item key={comment.id}>
                                        {comment.body}
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <h5 className="w-100 text-lg-center">
                                    No Coments here. You canm be first
                                </h5>
                            )}
                        </ListGroup>
                    </>
                )
            ) : (
                <Loader />
            )}
        </>
    )
}
