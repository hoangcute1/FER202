import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct } from '../redux/productSlice';
import { Container, Table, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Format number to Vietnamese price format (e.g., 25.990.000)
const formatPrice = (price) => {
    if (!price) return '';
    const num = typeof price === 'string' ? parseInt(price.replace(/\./g, ''), 10) : price;
    if (isNaN(num)) return price;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);

    // Form state
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        currentPrice: '',
        image: '',
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
            await dispatch(addProduct(newProduct)).unwrap();
            setNewProduct({ name: '', description: '', price: '', currentPrice: '', image: '' });
            alert('Product added successfully!');
        } catch (err) {
            alert('Error adding product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await dispatch(deleteProduct(id)).unwrap();
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

                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="mb-0 me-3 fw-bold" style={{ minWidth: '120px' }}>
                                Image URL:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
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
                        <th>Image</th>
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
                            <td>
                                <img
                                    src={product.image && product.image.startsWith('http') ? product.image : `/images/${product.image}`}
                                    alt={product.name}
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60?text=No+Image'; }}
                                />
                            </td>
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
                                <div className="d-flex flex-row gap-1 justify-content-center">
                                    <Link to={`/products/edit/${product.id}`}>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
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
