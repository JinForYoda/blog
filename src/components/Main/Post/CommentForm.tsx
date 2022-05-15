import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAppDispatch } from '../../../app/hooks'
import { BlogTypes as Types } from '../../../utils/Types'
import { BlogFetch as Fetch } from '../../../utils/Tools'

interface CommentFormProprs {
    specPost: Types.SpecPostItem
}

export default function CommentForm({ specPost }: CommentFormProprs) {
    const dispatch = useAppDispatch()

    const [comment, setComment] = useState('')

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
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Write comment here"
                        onChange={(e) => setComment(e.target.value)}
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
    )
}
