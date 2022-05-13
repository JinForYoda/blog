import { Container, Navbar } from 'react-bootstrap'

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container className="justify-content-end">
                <Navbar.Brand>Created by Max Ryaguzov</Navbar.Brand>
            </Container>
        </Navbar>
    )
}
