import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../redux/productSlice';
import { Container, Card, Button, Spinner, Alert, Row, Col, Badge, Modal, Form } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaShoppingCart } from 'react-icons/fa';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct: product, loading, error } = useSelector((state) => state.products);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [buyForm, setBuyForm] = useState({
        name: '',
        phone: '',
        address: '',
        quantity: 1
    });

    useEffect(() => {
        dispatch(fetchProductById(id));
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [dispatch, id]);

    const handleBuyNow = () => {
        setShowBuyModal(true);
    };

    const handleBuySubmit = (e) => {
        e.preventDefault();
        alert(`Đặt hàng thành công!\nSản phẩm: ${product.name}\nSố lượng: ${buyForm.quantity}\nTổng tiền: ${(parseInt(product.currentPrice.toString().replace(/\./g, '')) * buyForm.quantity).toLocaleString('vi-VN')} VND\nChúng tôi sẽ liên hệ bạn sớm!`);
        setShowBuyModal(false);
        setBuyForm({ name: '', phone: '', address: '', quantity: 1 });
    };

    const handleBuyFormChange = (e) => {
        const { name, value } = e.target;
        setBuyForm(prev => ({ ...prev, [name]: value }));
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
                                src={product.image && product.image.startsWith('http') ? product.image : `/images/${product.image}`}
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
                                    <Button variant="primary" size="lg" className="flex-grow-1" onClick={handleBuyNow}>
                                        <FaShoppingCart className="me-2" /> Buy Now
                                    </Button>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </motion.div>

            {/* Buy Now Modal */}
            <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Đặt mua sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <img 
                                src={product?.image && product.image.startsWith('http') ? product.image : `/images/${product?.image}`}
                                alt={product?.name}
                                className="img-fluid rounded"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image' }}
                            />
                        </Col>
                        <Col md={8}>
                            <h5>{product?.name}</h5>
                            <p className="text-muted">{product?.description}</p>
                            <h4 className="text-danger">{product && parseInt(product.currentPrice.toString().replace(/\./g, '')).toLocaleString('vi-VN')} VND</h4>
                        </Col>
                    </Row>
                    <hr />
                    <Form onSubmit={handleBuySubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và tên *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={buyForm.name}
                                        onChange={handleBuyFormChange}
                                        required
                                        placeholder="Nhập họ và tên"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại *</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={buyForm.phone}
                                        onChange={handleBuyFormChange}
                                        required
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ giao hàng *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="address"
                                value={buyForm.address}
                                onChange={handleBuyFormChange}
                                required
                                placeholder="Nhập địa chỉ giao hàng"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={buyForm.quantity}
                                        onChange={handleBuyFormChange}
                                        min="1"
                                        max="10"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <div className="mb-3">
                                    <strong>Tổng tiền: </strong>
                                    <span className="text-danger fs-5">
                                        {product && (parseInt(product.currentPrice.toString().replace(/\./g, '')) * buyForm.quantity).toLocaleString('vi-VN')} VND
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => setShowBuyModal(false)}>
                                Hủy
                            </Button>
                            <Button variant="primary" type="submit">
                                <FaShoppingCart className="me-2" /> Đặt mua ngay
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ProductDetail;
