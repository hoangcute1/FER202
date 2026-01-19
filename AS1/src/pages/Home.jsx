import { Carousel, Col, Row, Card } from 'react-bootstrap'

const slides = [
  {
    id: 1,
    title: 'Holiday Feast',
    caption: 'Gather the family around a vibrant spread packed with favorites.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 2,
    title: 'Sweet Treats',
    caption: 'Fresh pies, cheesecakes, and cookies ready for dessert hour.',
    image:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 3,
    title: 'Party Platter',
    caption: 'A colorful board of snacks to start any celebration.',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=80',
  },
]

const featureDishes = [
  {
    id: 1,
    label: 'Seafood',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    label: 'Pasta',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    label: 'Burgers',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    label: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    label: 'Salads',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    label: 'Drinks',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80&sat=-20',
  },
]

function Home() {
  return (
    <div className="page">
      <div className="d-flex flex-column gap-2 mb-4">
        <h2 className="page-title">Home</h2>
        <p className="lead mb-0">Browse highlights, get inspired, and jump into the quiz.</p>
      </div>

      <Carousel className="hero-carousel mb-4" fade>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img className="d-block w-100 hero-image" src={slide.image} alt={slide.title} />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded-3 p-3">
              <h3>{slide.title}</h3>
              <p className="mb-0">{slide.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex flex-column gap-2 mb-3">
        <h3 className="h5 fw-semibold">Featured picks</h3>
        <p className="text-muted mb-0">Quick bites from different categories to explore.</p>
      </div>

      <Row xs={2} sm={3} md={3} lg={6} className="g-3">
        {featureDishes.map((dish) => (
          <Col key={dish.id}>
            <Card className="h-100 text-center shadow-sm feature-card">
              <Card.Img variant="top" src={dish.image} alt={dish.label} className="feature-thumb" />
              <Card.Body className="py-3">
                <Card.Text className="fw-semibold mb-0">{dish.label}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home
