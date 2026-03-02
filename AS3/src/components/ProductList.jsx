import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

// Format number to Vietnamese price format (e.g., 25.990.000)
const formatPrice = (price) => {
    if (!price) return '';
    const num = typeof price === 'string' ? parseInt(price.replace(/\./g, ''), 10) : price;
    if (isNaN(num)) return price;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        currentPrice: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching products. Please try again later.');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', description: '', price: '', currentPrice: '' });
            alert('Product added successfully!');
        } catch (err) {
            alert('Error adding product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setProducts(products.filter((p) => p.id !== id));
            } catch (err) {
                alert('Error deleting product');
            }
        }
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
            {/* Add Product Form */}
            <div className="mb-5">
                <h3 className="text-center bg-dark text-white py-2 rounded-top mb-0">
                    <i>Add Product</i>
                </h3>
                <div className="border border-dark p-4 rounded-bottom">
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="mb-0 me-3 fw-bold" style={{ minWidth: '120px' }}>
                                Name:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="mb-0 me-3 fw-bold" style={{ minWidth: '120px' }}>
                                Description:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="mb-0 me-3 fw-bold" style={{ minWidth: '120px' }}>
                                Price:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="mb-0 me-3 fw-bold" style={{ minWidth: '120px' }}>
                                Current Price:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="currentPrice"
                                value={newProduct.currentPrice}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="dark" type="submit">
                                Add Product
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            {/* Product List Table */}
            <h3 className="text-center mb-3">
                <i>Product List</i>
            </h3>
            <Table bordered hover responsive className="text-center align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Current Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td className="text-start">{product.name}</td>
                            <td className="text-start">{product.description}</td>
                            <td>
                                <span className="text-decoration-line-through">
                                    {formatPrice(product.price)} đ
                                </span>
                            </td>
                            <td>
                                {formatPrice(product.currentPrice)} đ
                            </td>
                            <td>
                                <div className="d-flex flex-column gap-1">
                                    <Link to={`/products/edit/${product.id}`} className="w-100">
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="w-100"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProductList;
