import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchProducts = createAsyncThunk('products', async (params) => {
    const { data } = await axios.post("", params);
    return data;
})

const initialState = {
    data: [],
    status: 'loading',
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Получение всех продуктов
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })
    },
});

export const { reducer: productsReducer } = productsSlice; // Export the postsReducer
