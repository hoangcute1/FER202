import { Carousel } from 'react-bootstrap'

const slides = [
  { id: 1, image: 'images/slide1.jpg' },
  { id: 2, image: 'images/slide2.jpg' },
  { id: 3, image: 'images/slide3.jpg' },
]

const featureDishes = [
  { id: 1, image: 'images/menu-01.jpg' },
  { id: 2, image: 'images/menu-02.jpg' },
  { id: 3, image: 'images/menu-03.jpg' },
  { id: 4, image: 'images/menu-04.jpg' },
  { id: 5, image: 'images/menu-05.jpg' },
  { id: 6, image: 'images/menu-06.jpg' },
]

function Home() {
  return (
    <div className="page">
      <Carousel className="hero-carousel mb-4">
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img className="d-block w-100 hero-image" src={slide.image} alt={`Slide ${slide.id}`} />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex justify-content-center gap-4 mb-3">
        {featureDishes.map((dish, index) => (
          <img
            key={dish.id}
            src={dish.image}
            alt={`Dish ${dish.id}`}
            className="feature-thumb-circle fade-in-item"
            style={{ animationDelay: `${index * 0.12}s` }}
          />
        ))}
      </div>

      <h2 className="fade-in-item" style={{ color: 'red', fontWeight: 700, animationDelay: '0.8s' }}>This is Home Page</h2>
    </div>
  )
}

export default Home
