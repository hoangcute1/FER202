import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { newLists } from '../data/newsData'

function News() {
  return (
    <div className="page">
      <h2 style={{ color: 'red', fontWeight: 700 }}>News Category</h2>

      <Row xs={1} md={2} lg={4} className="g-4">
        {newLists.map((news, index) => (
          <Col key={news.id} className="fade-in-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <Card className="h-100 shadow-sm news-card">
              <Card.Img variant="top" src={news.images} alt={news.title} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-bold mb-2">{news.title}</Card.Title>
                <Card.Text className="text-muted small mb-3">{news.description}</Card.Text>
                <div className="mt-auto">
                  <Link className="news-link" to={`/news/${news.id}`}>
                    {news.title}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News
