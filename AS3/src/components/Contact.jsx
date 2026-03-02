import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <Container>
            <h2 className="text-center fw-bold mb-4">Contact Us</h2>
            <p className="text-center text-muted mb-5">
                Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi!
            </p>

            <Row className="g-4 mb-5">
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-3">
                        <div className="mx-auto mb-2 text-primary" style={{ fontSize: '2rem' }}>
                            <FaMapMarkerAlt />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold fs-6">Địa chỉ</Card.Title>
                            <Card.Text className="text-muted small">
                                Đại học FPT, Khu CNC Hòa Lạc, Hà Nội
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-3">
                        <div className="mx-auto mb-2 text-success" style={{ fontSize: '2rem' }}>
                            <FaPhone />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold fs-6">Điện thoại</Card.Title>
                            <Card.Text className="text-muted small">
                                0123 456 789
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-3">
                        <div className="mx-auto mb-2 text-warning" style={{ fontSize: '2rem' }}>
                            <FaEnvelope />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold fs-6">Email</Card.Title>
                            <Card.Text className="text-muted small">
                                contact@metmetshop.vn
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-3">
                        <div className="mx-auto mb-2 text-danger" style={{ fontSize: '2rem' }}>
                            <FaClock />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold fs-6">Giờ làm việc</Card.Title>
                            <Card.Text className="text-muted small">
                                8:00 - 21:00 (T2 - CN)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold mb-4 text-center">Gửi tin nhắn cho chúng tôi</h4>

                            {submitted && (
                                <Alert variant="success" className="text-center">
                                    Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất.
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Họ và tên</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Nhập họ và tên"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Nhập email"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Tiêu đề</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nhập tiêu đề"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Nội dung</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nhập nội dung tin nhắn..."
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="primary" type="submit" className="px-5">
                                        Gửi tin nhắn
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
