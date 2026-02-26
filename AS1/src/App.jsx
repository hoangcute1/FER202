import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Quiz from './pages/Quiz'

function App() {
  return (
    <div className="app-shell">
      <Navbar expand="lg" bg="light" className="mb-0 border-bottom">
        <Container fluid className="px-3">
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav navbarScroll>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/news">
                News
              </Nav.Link>
              <Nav.Link as={NavLink} to="/quiz">
                Quiz
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="px-3 pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  )
}

function NotFound() {
  return (
    <div className="page">
      <h2 className="page-title">Not found</h2>
      <p className="text-muted">The page you requested does not exist.</p>
    </div>
  )
}

export default App
