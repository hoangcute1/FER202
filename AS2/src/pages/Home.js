import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { lessonService } from '../services/api';

function Home() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await lessonService.getAllLessons();
      const incompleteLessons = response.data.filter(lesson => !lesson.isCompleted);
      setLessons(incompleteLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleLessonClick = (id) => {
    navigate(`/he186454/lessons/${id}`);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Incomplete Lessons</h1>
      <Row>
        {lessons.map(lesson => (
          <Col key={lesson.id} md={4} className="mb-4">
            <Card 
              style={{ cursor: 'pointer' }}
              onClick={() => handleLessonClick(lesson.id)}
            >
              <Card.Img 
                variant="top" 
                src={lesson.lessonImage} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{lesson.lessonTitle}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="primary">{lesson.level}</Badge>
                  <small className="text-muted">{lesson.estimatedTime} minutes</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;