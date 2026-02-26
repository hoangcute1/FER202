import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { lessonService } from '../services/api';

function AllLessons() {
  const [lessons, setLessons] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await lessonService.getAllLessons();
      const sortedLessons = response.data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      setLessons(sortedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleDelete = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await lessonService.deleteLesson(lessonToDelete.id);
      setShowDeleteModal(false);
      setShowAlert(true);
      fetchLessons();
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/he186454/update-lesson/${id}`);
  };

  const handleLessonClick = (id) => {
    navigate(`/he186454/lessons/${id}`);
  };

  const handleAddLesson = () => {
    navigate('/he186454/add-lesson');
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Lessons</h1>
        <Button variant="success" onClick={handleAddLesson}>
          Add New Lesson
        </Button>
      </div>

      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          Lesson deleted successfully!
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Lesson Title</th>
            <th>Level</th>
            <th>Estimated Time (minutes)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map(lesson => (
            <tr key={lesson.id}>
              <td 
                style={{ cursor: 'pointer' }}
                onClick={() => handleLessonClick(lesson.id)}
              >
                {lesson.lessonTitle}
              </td>
              <td>{lesson.level}</td>
              <td>{lesson.estimatedTime}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(lesson.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(lesson)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{lessonToDelete?.lessonTitle}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AllLessons;