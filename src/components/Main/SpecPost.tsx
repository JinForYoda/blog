import { useEffect, useState } from 'react'
import { Button, Form, ListGroup, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BlogFetch as Fetch } from '../../utils/Tools'
import { BlogTypes as Types } from '../../utils/Types'
import { cleanSpecPost } from '../../app/reducers/specPost'

export default function SpecPost() {
    // get postId from url params
    const { id } = useParams()

    const dispatch = useAppDispatch()

    const specPost = useAppSelector((store) => store.specPost.post)
    const loadingStatus = useAppSelector((store) => store.specPost.loading)

    // states for updating only if fields have changed
    const [newTitle, setNewTitle] = useState(specPost.title)
    const [newBody, setNewBody] = useState(specPost.body)
    const [newComments, setNewComments] = useState(specPost.comments)
    const [comment, setComment] = useState('')

    useEffect(() => {
        dispatch(Fetch.getSpecPost(id as string))
    }, [id, dispatch])

    useEffect(() => {
        setNewTitle(specPost.title)
        setNewBody(specPost.body)
        setNewComments(specPost.comments)
    }, [specPost])

    // after pushing post need to update posts list and this post
    const updatePost = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const data: Types.SpecPostItem = {
            title: newTitle,
            body: newBody,
            comments: newComments,
            id: specPost.id,
        }
        await dispatch(Fetch.updateSpecPost(data))
        await dispatch(Fetch.getPostList())
        await dispatch(Fetch.getSpecPost(specPost.id))
    }

    const postComment = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const data: Omit<Types.CommentItem, 'id'> = {
            body: comment,
            postId: specPost.id,
        }
        await dispatch(Fetch.postComment(data))
        // clean input
        setComment('')
    }

    // clean post when leave page
    const onGoBack = () => {
        dispatch(cleanSpecPost())
    }

    const isFormWrong = (): boolean => {
        return (
            (newTitle === specPost.title && newBody === specPost.body) ||
            !newTitle ||
            !newBody
        )
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
                        <div className="formWrapper">
                            <h3>Update Post</h3>
                            <Form className="w-75">
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicTitle"
                                >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter titile"
                                        onChange={(e) =>
                                            setNewTitle(e.target.value)
                                        }
                                        value={newTitle}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicBody"
                                >
                                    <Form.Label>Text</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Type some text here"
                                        onChange={(e) =>
                                            setNewBody(e.target.value)
                                        }
                                        value={newBody}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={(e) => updatePost(e)}
                                    disabled={isFormWrong()}
                                >
                                    Update Post
                                </Button>
                            </Form>
                        </div>
                        <div>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicTitle"
                                >
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Write comment here"
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        value={comment}
                                    />
                                </Form.Group>
                                <Button
                                    variant="success"
                                    type="submit"
                                    onClick={(e) => postComment(e)}
                                    disabled={!comment}
                                >
                                    Write Comment
                                </Button>
                            </Form>
                        </div>
                        <h3 className="mt-3">Comments</h3>
                        <ListGroup variant="flush">
                            {specPost.comments.length > 0 ? (
                                specPost.comments.map((comment) => (
                                    <ListGroup.Item key={comment.id}>
                                        {comment.body}
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <h5 className="w-100 text-align-center">
                                    No Coments here. You canm be first
                                </h5>
                            )}
                        </ListGroup>
                    </>
                )
            ) : (
                <div className="w-100 d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </>
    )
}
