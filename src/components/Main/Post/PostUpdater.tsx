import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAppDispatch } from '../../../app/hooks'
import { BlogTypes as Types } from '../../../utils/Types'
import { BlogFetch as Fetch } from '../../../utils/Tools'

interface PostUpdaterProprs {
    specPost: Types.SpecPostItem
}

export default function PostUpdater({ specPost }: PostUpdaterProprs) {
    const dispatch = useAppDispatch()

    // states for updating only if fields have changed
    const [newTitle, setNewTitle] = useState(specPost.title)
    const [newBody, setNewBody] = useState(specPost.body)

    useEffect(() => {
        setNewTitle(specPost.title)
        setNewBody(specPost.body)
    }, [specPost])

    // after pushing post need to update posts list and this post
    const updatePost = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const data: Types.SpecPostItem = {
            title: newTitle,
            body: newBody,
            comments: specPost.comments,
            id: specPost.id,
        }
        await dispatch(Fetch.updateSpecPost(data))
        await dispatch(Fetch.getPostList())
        await dispatch(Fetch.getSpecPost(specPost.id))
    }

    const isFormWrong = (): boolean => {
        return (
            (newTitle === specPost.title && newBody === specPost.body) ||
            !newTitle ||
            !newBody
        )
    }

    return (
        <div className="formWrapper">
            <h3>Update Post</h3>
            <Form className="w-75">
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter titile"
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBody">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Type some text here"
                        onChange={(e) => setNewBody(e.target.value)}
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
    )
}
