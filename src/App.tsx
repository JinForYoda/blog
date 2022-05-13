import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

function App() {
    return (
        <div className="App bg-light min-vh-100">
            <Container fluid>
                <Header />
                <Main />
            </Container>
        </div>
    )
}

export default App
