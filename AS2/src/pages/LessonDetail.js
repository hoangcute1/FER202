import { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { lessonService } from '../services/api';

function LessonDetail() {
  const [lesson, setLesson] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const response = await lessonService.getLessonById(id);
      setLesson(response.data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    }
  };

  const formatTime = (minutes) => {
    return minutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!lesson) {
    return <Container className="mt-4"><h2>Loading...</h2></Container>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Img 
              variant="top" 
              src={lesson.lessonImage} 
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title className="h2 mb-3">{lesson.lessonTitle}</Card.Title>
              
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Level:</strong>
                  <Badge bg="primary" className="ms-2">{lesson.level}</Badge>
                </Col>
                <Col sm={6}>
                  <strong>Status:</strong>
                  <Badge 
                    bg={lesson.isCompleted ? "success" : "warning"} 
                    className="ms-2"
                  >
                    {lesson.isCompleted ? "Completed" : "Not Completed"}
                  </Badge>
                </Col>
              </Row>
              
              <Row>
                <Col>
                  <strong>Estimated Time:</strong>
                  <span className="ms-2">{formatTime(lesson.estimatedTime)} minutes</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LessonDetail;