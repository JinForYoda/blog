import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BlogTypes as Types } from '../../../utils/Types'

interface PostCardProps {
    post: Types.PostItem
    onDelete: (id: string) => void
}

export default function PostCard({ post, onDelete }: PostCardProps) {
    return (
        <Card style={{ width: '18rem' }} key={post.id}>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <div className="d-flex justify-content-between">
                    <Link to={'/posts/' + post.id}>
                        <Button variant="primary">Open Post</Button>
                    </Link>
                    <Button variant="danger" onClick={() => onDelete(post.id)}>
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
