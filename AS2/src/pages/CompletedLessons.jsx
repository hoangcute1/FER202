import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { lessonService } from '../services/api';

function CompletedLessons() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await lessonService.getAllLessons();
      const completedLessons = response.data
        .filter(lesson => lesson.isCompleted)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));
      setLessons(completedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleLessonClick = (id) => {
    navigate(`/he186454/lessons/${id}`);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Completed Lessons</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Lesson Title</th>
            <th>Level</th>
            <th>Lesson Image</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map(lesson => (
            <tr 
              key={lesson.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleLessonClick(lesson.id)}
            >
              <td>{lesson.lessonTitle}</td>
              <td>{lesson.level}</td>
              <td>
                <img 
                  src={lesson.lessonImage} 
                  alt={lesson.lessonTitle}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CompletedLessons;