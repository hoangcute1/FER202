import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLaptopCode, FaShippingFast, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const About = () => {
    return (
        <Container>
            <h2 className="text-center fw-bold mb-4">About Us</h2>
            <Row className="justify-content-center mb-5">
                <Col md={8}>
                    <p className="text-muted text-center fs-5">
                        <strong>Mệt Mệt Shop</strong> là cửa hàng chuyên cung cấp các sản phẩm laptop chính hãng
                        với giá tốt nhất thị trường. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm
                        chất lượng cao cùng dịch vụ chăm sóc khách hàng tận tâm.
                    </p>
                </Col>
            </Row>

            <Row className="g-4 mb-5">
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-4">
                        <div className="mx-auto mb-3 text-primary" style={{ fontSize: '3rem' }}>
                            <FaLaptopCode />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold">Sản phẩm chính hãng</Card.Title>
                            <Card.Text className="text-muted">
                                100% laptop nhập khẩu chính hãng, đầy đủ giấy tờ và bảo hành.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-4">
                        <div className="mx-auto mb-3 text-success" style={{ fontSize: '3rem' }}>
                            <FaShippingFast />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold">Giao hàng nhanh</Card.Title>
                            <Card.Text className="text-muted">
                                Giao hàng toàn quốc trong 1-3 ngày. Miễn phí giao hàng cho đơn trên 10 triệu.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-4">
                        <div className="mx-auto mb-3 text-warning" style={{ fontSize: '3rem' }}>
                            <FaHeadset />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold">Hỗ trợ 24/7</Card.Title>
                            <Card.Text className="text-muted">
                                Đội ngũ tư vấn viên sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="text-center border-0 shadow-sm h-100 p-4">
                        <div className="mx-auto mb-3 text-danger" style={{ fontSize: '3rem' }}>
                            <FaShieldAlt />
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold">Bảo hành uy tín</Card.Title>
                            <Card.Text className="text-muted">
                                Bảo hành chính hãng từ 12-24 tháng. Đổi trả trong 30 ngày đầu.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="border-0 shadow-sm bg-light p-4">
                        <Card.Body className="text-center">
                            <h4 className="fw-bold mb-3">Tầm nhìn của chúng tôi</h4>
                            <p className="text-muted mb-0">
                                Trở thành đơn vị phân phối laptop hàng đầu Việt Nam, mang đến cho khách hàng
                                trải nghiệm mua sắm công nghệ tốt nhất với giá cả hợp lý và dịch vụ chuyên nghiệp.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
