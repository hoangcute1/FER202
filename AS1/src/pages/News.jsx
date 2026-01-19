import { Card, Col, Row } from 'react-bootstrap'
import { newLists } from '../data/newsData'

function News() {
  return (
    <div className="page">
      <div className="d-flex flex-column gap-2 mb-4">
        <h2 className="page-title">News</h2>
        <p className="lead mb-0">Fresh bites from the food world and seasonal inspiration.</p>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {newLists.map((news) => (
          <Col key={news.id}>
            <Card className="h-100 shadow-sm news-card">
              <Card.Img variant="top" src={news.images} alt={news.title} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-semibold mb-2">{news.title}</Card.Title>
                <Card.Text className="text-muted small mb-3">{news.description}</Card.Text>
                <div className="mt-auto">
                  <a className="stretched-link" href="#" aria-label={`Read more about ${news.title}`}>
                    Read more
                  </a>
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
