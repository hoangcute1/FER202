import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Spinner, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaShoppingCart } from 'react-icons/fa';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
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

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </Container>
    );

    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!product) return <Container className="mt-5"><Alert variant="warning">Product not found</Alert></Container>;

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button
                    variant="link"
                    className="mb-4 text-decoration-none d-flex align-items-center ps-0 text-muted hover-primary"
                    onClick={() => navigate('/')}
                >
                    <FaArrowLeft className="me-2" /> Back to Products
                </Button>

                <Card className="border-0 shadow-lg overflow-hidden rounded-4">
                    <Row className="g-0">
                        <Col md={6} className="bg-light d-flex align-items-center justify-content-center p-5">
                            <motion.img
                                layoutId={`image-${product.id}`}
                                src={`/assets/${product.image}`}
                                alt={product.name}
                                className="img-fluid"
                                style={{ maxHeight: '400px', objectFit: 'contain' }}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/500?text=No+Image' }}
                            />
                        </Col>
                        <Col md={6}>
                            <Card.Body className="p-5 d-flex flex-column h-100 justify-content-center">
                                <div className="mb-2">
                                    <Badge bg="primary" className="me-2">New Arrival</Badge>
                                    <Badge bg="success">In Stock</Badge>
                                </div>
                                <h2 className="display-6 fw-bold mb-3">{product.name}</h2>
                                <h3 className="text-danger fw-bold mb-4 d-flex align-items-end">
                                    {product.currentPrice} VND
                                    <span className="text-muted fs-6 text-decoration-line-through ms-3 mb-1">{product.price} VND</span>
                                </h3>

                                <Card.Text className="text-muted mb-5 leading-relaxed">
                                    {product.description}
                                </Card.Text>

                                <div className="d-flex gap-3 mt-auto">
                                    <Link to={`/products/edit/${product.id}`} className="flex-grow-1">
                                        <Button variant="outline-primary" size="lg" className="w-100">
                                            <FaEdit className="me-2" /> Edit Details
                                        </Button>
                                    </Link>
                                    <Button variant="primary" size="lg" className="flex-grow-1">
                                        <FaShoppingCart className="me-2" /> Buy Now
                                    </Button>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </motion.div>
        </Container>
    );
};

export default ProductDetail;
