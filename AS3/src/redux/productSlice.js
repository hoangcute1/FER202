import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Async Thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetchProductById
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // addProduct
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // updateProduct
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.selectedProduct = action.payload;
            })
            // deleteProduct
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload);
            });
    },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
