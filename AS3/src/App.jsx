import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductEdit from './components/ProductEdit';
import CustomNavbar from './components/CustomNavbar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Container className="pb-5">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
