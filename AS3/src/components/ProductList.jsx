import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaInfoCircle, FaPlus, FaTag } from 'react-icons/fa';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        currentPrice: '',
        description: '',
        image: 'laptop1.png'
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:9999/products');
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching products');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: '', currentPrice: '', description: '', image: 'laptop1.png' });
            setShowAddForm(false);
            alert('Product added successfully!');
        } catch (err) {
            alert('Error adding product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:9999/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert('Error deleting product');
            }
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </Container>
    );

    if (error) return (
        <Container className="mt-5">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4 fade-in">
                <div>
                    <h2 className="mb-0 fw-bold text-primary">Featured Products</h2>
                    <p className="text-muted mb-0">Discover our latest tech collection</p>
                </div>
                <Button
                    variant={showAddForm ? "danger" : "primary"}
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="d-flex align-items-center shadow-sm"
                >
                    <FaPlus className={`me-2 ${showAddForm ? "rotate-45" : ""}`} style={{ transition: "transform 0.2s" }} />
                    {showAddForm ? "Cancel" : "Add Product"}
                </Button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-5"
                    >
                        <Card className="border-0 shadow-sm bg-light">
                            <Card.Body className="p-4">
                                <h4 className="mb-4">Add New Item</h4>
                                <Form onSubmit={handleAddProduct}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Product Name</Form.Label>
                                                <Form.Control type="text" name="name" value={newProduct.name} onChange={handleInputChange} required placeholder="e.g. MacBook Pro" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control type="text" name="description" value={newProduct.description} onChange={handleInputChange} required placeholder="Brief description" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Original Price</Form.Label>
                                                <Form.Control type="text" name="price" value={newProduct.price} onChange={handleInputChange} required placeholder="e.g. 25.000.000" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Sale Price</Form.Label>
                                                <Form.Control type="text" name="currentPrice" value={newProduct.currentPrice} onChange={handleInputChange} required placeholder="e.g. 22.000.000" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-end mt-2">
                                        <Button variant="success" type="submit" className="px-4">Save Product</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                <AnimatePresence>
                    {products.map((product, index) => (
                        <Col key={product.id}>
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="h-100 border-0 shadow-sm hover-card overflow-hidden">
                                    <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                                        <Card.Img
                                            variant="top"
                                            src={`/assets/${product.image}`}
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300?text=No+Image' }}
                                            style={{ objectFit: 'contain', height: '100%', width: '100%', padding: '20px' }}
                                        />
                                        <Badge bg="danger" className="position-absolute top-0 end-0 m-3 shadow-sm">
                                            Sale
                                        </Badge>
                                    </div>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fs-6 fw-bold text-truncate mb-2" title={product.name}>
                                            {product.name}
                                        </Card.Title>
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold fs-5 me-2">{product.currentPrice}đ</span>
                                            <span className="text-muted text-decoration-line-through small">{product.price}đ</span>
                                        </div>
                                        <Card.Text className="text-muted small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {product.description}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                                            <Link to={`/products/${product.id}`} className="text-decoration-none w-50 pe-1">
                                                <Button variant="outline-primary" size="sm" className="w-100 d-flex align-items-center justify-content-center">
                                                    <FaInfoCircle className="me-1" /> Details
                                                </Button>
                                            </Link>
                                            <div className="w-50 ps-1">
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    className="w-100 d-flex align-items-center justify-content-center"
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    <FaTrash className="me-1" /> Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </AnimatePresence>
            </Row>
        </Container>
    );
};

export default ProductList;
