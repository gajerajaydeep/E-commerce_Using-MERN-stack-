import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk(
    '/products/addnewproduct',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://e-commerce-backend-qxdj.onrender.com/api/admin/products/add',
                formData,
                {
                    headers: {
                        // DO NOT set 'Content-Type' manually for FormData.
                    }
                }
            );

            console.log("API Response:", response.data); // Debugging
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    async () => {
        const result = await axios.get('https://e-commerce-backend-qxdj.onrender.com/api/admin/products/get')
        return result?.data;
    });

export const editProduct = createAsyncThunk('/products/editProduct',
    async ({ id, formData }) => {
        const result = await axios.put(`https://e-commerce-backend-qxdj.onrender.com/api/admin/products/edit/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return result?.data;
    });

    export const deleteProduct = createAsyncThunk(
        "/products/deleteProduct",
        async (id, { rejectWithValue }) => {
            if (!id) {
                console.error("Error: Product ID is undefined");
                return rejectWithValue("Invalid product ID");
            }
    
            try {
                const result = await axios.delete(
                    `https://e-commerce-backend-qxdj.onrender.com/api/admin/products/delete/${id}`
                );
    
                return result?.data;
            } catch (error) {
                console.error("Delete request failed:", error.response?.data || error.message);
                return rejectWithValue(error.response?.data || "Failed to delete product");
            }
        }
    );

const AdminProductsSlice = createSlice({
    name: 'adminproducts',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
        bulider.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false
            state.productList = action.payload.data;
        }).addCase(fetchAllProducts.rejected, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false
            state.productList = []
        })
    }
})


export default AdminProductsSlice.reducer;
