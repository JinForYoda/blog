import { Button, Card, Container, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BlogFetch as Fetch } from '../../utils/Tools'
import { BlogTypes as Types } from '../../utils/Types'
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
                    {postList.map((post) => (
                        <Card style={{ width: '18rem' }} key={post.id}>
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Link to={'/posts/' + post.id}>
                                        <Button variant="primary">
                                            Open Post
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => postDelete(post.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            ) : (
                <div className="w-100 d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </Container>
    )
}
