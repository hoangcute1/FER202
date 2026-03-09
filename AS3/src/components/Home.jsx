import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

// Format number to Vietnamese price format (e.g., 25.990.000)
const formatPrice = (price) => {
    if (!price) return '';
    const num = typeof price === 'string' ? parseInt(price.replace(/\./g, ''), 10) : price;
    if (isNaN(num)) return price;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const Home = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [buyForm, setBuyForm] = useState({
        name: '',
        phone: '',
        address: '',
        quantity: 1
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleBuyNow = (product) => {
        setSelectedProduct(product);
        setShowBuyModal(true);
    };

    const handleBuySubmit = (e) => {
        e.preventDefault();
        alert(`Đặt hàng thành công!\nSản phẩm: ${selectedProduct.name}\nSố lượng: ${buyForm.quantity}\nTổng tiền: ${(parseInt(selectedProduct.currentPrice.toString().replace(/\./g, '')) * buyForm.quantity).toLocaleString('vi-VN')} VND\nChúng tôi sẽ liên hệ bạn sớm!`);
        setShowBuyModal(false);
        setBuyForm({ name: '', phone: '', address: '', quantity: 1 });
        setSelectedProduct(null);
    };

    const handleBuyFormChange = (e) => {
        const { name, value } = e.target;
        setBuyForm(prev => ({ ...prev, [name]: value }));
    };

    if (loading)
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );

    if (error)
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );

    return (
        <Container>
            <h2 className="text-center mb-4 fw-bold">
                <i>Product List</i>
            </h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {products.map((product) => (
                    <Col key={product.id}>
                        <Card className="h-100 shadow-sm border">
                            <div
                                className="d-flex align-items-center justify-content-center bg-white"
                                style={{ height: '200px', overflow: 'hidden' }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={product.image && product.image.startsWith('http') ? product.image : `/images/${product.image}`}
                                    alt={product.name}
                                    style={{ maxHeight: '180px', objectFit: 'contain', padding: '10px' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                    }}
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="fs-6 fw-bold">
                                    {product.name}
                                </Card.Title>
                                <Card.Text className="text-muted small flex-grow-1" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {product.description}
                                </Card.Text>
                                <div className="mt-2">
                                    <div className="text-muted text-decoration-line-through">
                                        {formatPrice(product.price)} đ
                                    </div>
                                    <div className="text-danger fw-bold fs-5">
                                        {formatPrice(product.currentPrice)} đ
                                    </div>
                                </div>
                                <div className="mt-3 d-flex gap-2">
                                    <Link to={`/products/${product.id}`} className="flex-grow-1">
                                        <Button variant="outline-primary" size="sm" className="w-100">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="primary" 
                                        size="sm" 
                                        className="flex-grow-1"
                                        onClick={() => handleBuyNow(product)}
                                    >
                                        <FaShoppingCart className="me-1" style={{fontSize: '12px'}} />
                                        Buy Now
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Buy Now Modal */}
            <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Đặt mua sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <>
                            <Row>
                                <Col md={4}>
                                    <img 
                                        src={selectedProduct.image && selectedProduct.image.startsWith('http') ? selectedProduct.image : `/images/${selectedProduct.image}`}
                                        alt={selectedProduct.name}
                                        className="img-fluid rounded"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image' }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <h5>{selectedProduct.name}</h5>
                                    <p className="text-muted">{selectedProduct.description}</p>
                                    <h4 className="text-danger">{formatPrice(selectedProduct.currentPrice)} đ</h4>
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
                                                {(parseInt(selectedProduct.currentPrice.toString().replace(/\./g, '')) * buyForm.quantity).toLocaleString('vi-VN')} đ
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
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Home;
