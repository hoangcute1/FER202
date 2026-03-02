import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { lessonService } from '../services/api';

function UpdateLesson() {
  const [formData, setFormData] = useState({
    lessonTitle: '',
    lessonImage: '',
    level: 'N1',
    estimatedTime: '',
    isCompleted: false
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const response = await lessonService.getLessonById(id);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lessonTitle.trim()) {
      newErrors.lessonTitle = 'Lesson title is required';
    } else if (formData.lessonTitle.trim().split(' ').length <= 1) {
      newErrors.lessonTitle = 'Lesson title must contain more than 1 word';
    }

    if (!formData.lessonImage.trim()) {
      newErrors.lessonImage = 'Lesson image URL is required';
    } else {
      try {
        new URL(formData.lessonImage);
      } catch {
        newErrors.lessonImage = 'Please enter a valid URL';
      }
    }

    if (!formData.estimatedTime) {
      newErrors.estimatedTime = 'Estimated time is required';
    } else if (isNaN(formData.estimatedTime) || formData.estimatedTime <= 0) {
      newErrors.estimatedTime = 'Estimated time must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const lessonData = {
        ...formData,
        estimatedTime: parseInt(formData.estimatedTime)
      };
      
      await lessonService.updateLesson(id, lessonData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/he186454/all-lessons');
      }, 2000);
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  if (loading) {
    return <Container className="mt-4"><h2>Loading...</h2></Container>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h2>Update Lesson</h2>
        </Card.Header>
        <Card.Body>
          {showSuccess && (
            <Alert variant="success">
              Lesson updated successfully! Redirecting...
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Lesson Title *</Form.Label>
              <Form.Control
                type="text"
                name="lessonTitle"
                value={formData.lessonTitle}
                onChange={handleChange}
                isInvalid={!!errors.lessonTitle}
                placeholder="e.g., Kanji Master"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lessonTitle}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lesson Image URL *</Form.Label>
              <Form.Control
                type="url"
                name="lessonImage"
                value={formData.lessonImage}
                onChange={handleChange}
                isInvalid={!!errors.lessonImage}
                placeholder="https://example.com/image.jpg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lessonImage}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Level *</Form.Label>
              <Form.Select
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="N1">N1</option>
                <option value="N2">N2</option>
                <option value="N3">N3</option>
                <option value="N4">N4</option>
                <option value="N5">N5</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estimated Time (minutes) *</Form.Label>
              <Form.Control
                type="number"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
                isInvalid={!!errors.estimatedTime}
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.estimatedTime}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="isCompleted"
                label="Is Completed"
                checked={formData.isCompleted}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Update Lesson
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/he186454/all-lessons')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UpdateLesson;