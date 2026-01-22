import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert, Card, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        currentPrice: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching product details');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9999/products/${id}`, product);
            alert('Product updated successfully!');
            navigate(`/products/${id}`);
        } catch (err) {
            alert('Error updating product');
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </Container>
    );
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Button
                            variant="link"
                            className="mb-4 text-decoration-none d-flex align-items-center ps-0 text-muted"
                            onClick={() => navigate(`/products/${id}`)}
                        >
                            <FaArrowLeft className="me-2" /> Cancel Edit
                        </Button>

                        <Card className="border-0 shadow-lg rounded-4">
                            <Card.Body className="p-5">
                                <h3 className="fw-bold mb-4 text-center text-primary">Edit Product</h3>
                                <Form onSubmit={handleUpdateProduct}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="text-muted small fw-bold text-uppercase">Product Name</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            name="name"
                                            value={product.name}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-light border-0"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="text-muted small fw-bold text-uppercase">Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="description"
                                            value={product.description}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-light border-0"
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="text-muted small fw-bold text-uppercase">Original Price</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="price"
                                                    value={product.price}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="bg-light border-0"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="text-muted small fw-bold text-uppercase">Sale Price</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="currentPrice"
                                                    value={product.currentPrice}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="bg-light border-0 text-danger fw-bold"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-5">
                                        <Form.Label className="text-muted small fw-bold text-uppercase">Image Filename</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="image"
                                            value={product.image}
                                            onChange={handleInputChange}
                                            className="bg-light border-0"
                                        />
                                    </Form.Group>

                                    <Button variant="primary" size="lg" type="submit" className="w-100 shadow-sm">
                                        <FaSave className="me-2" /> Save Changes
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
};

export default ProductEdit;
