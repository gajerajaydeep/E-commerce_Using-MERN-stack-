import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isLoading: false,
    addressList: []
}


export const addNewAddress = createAsyncThunk(
    "/addresses/addNewAddress",
    async (formData) => {
        console.log(formData,"backend");
        
      const response = await axios.post(
        "https://e-commerce-backend-qxdj.onrender.com/api/shop/address/add",
        formData
      );
  
      return response.data;
    }
  );

export const fetchAllAddresses = createAsyncThunk('/addresses/fetchAllAddresses',
    async (userId) => {
        const response = await axios.get(`https://e-commerce-backend-qxdj.onrender.com/api/shop/address/get/${userId}`);

        return response.data
    })

export const editaAddress = createAsyncThunk('/addresses/editaAddress', async ({ userId, addressId, formdata }) => {
    const response = await axios.put(`https://e-commerce-backend-qxdj.onrender.com/api/shop/address/update/${userId}/${addressId}`, formdata

    );

    return response.data
})

export const deleteAddress = createAsyncThunk('/addresses/deleteAddress', async ({ userId, addressId }) => {
    const response = await axios.delete(`https://e-commerce-backend-qxdj.onrender.com/api/shop/address/delete/${userId}/${addressId}`);

    return response.data
})


const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true
            }).addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false
                    // state.addressList = action.payload.data
            }).addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false
                    // state.addressList = []
            })
            .addCase(fetchAllAddresses.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchAllAddresses.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.addressList = action.payload.data
            }).addCase(fetchAllAddresses.rejected, (state) => {
                state.isLoading = false,
                    state.addressList = [];
            }) .addCase(editaAddress.pending, (state) => {
                state.isLoading = true
            }).addCase(editaAddress.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.addressList = action.payload.data
            }).addCase(editaAddress.rejected, (state) => {
                state.isLoading = false,
                    state.addressList = [];
            }) .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true
            }).addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.addressList = action.payload.data
            }).addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false,
                    state.addressList = [];
            })
    }
})


export default addressSlice.reducer;
