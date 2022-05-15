import React, { useState } from 'react'
import './PostForm.css'
import { Button, Form } from 'react-bootstrap'
import { useAppDispatch } from '../../../app/hooks'
import { BlogFetch as Fetch } from '../../../utils/Tools'
import { BlogTypes as Types } from '../../../utils/Types'

export default function PostCreator() {
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    // after pushing need to update posts list
    const pushPost = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const data: Omit<Types.PostItem, 'id'> = {
            title: title,
            body: body,
        }
        await dispatch(Fetch.postNewPost(data))
        await dispatch(Fetch.getPostList())
        // clean inputs
        setTitle('')
        setBody('')
    }

    return (
        <div className="formWrapper">
            <h3>Create Post</h3>
            <Form className="w-75">
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter titile"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBody">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Type some text here"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    onClick={(e) => pushPost(e)}
                    disabled={!title || !body}
                >
                    Create
                </Button>
            </Form>
        </div>
    )
}
