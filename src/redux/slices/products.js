import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchProducts = createAsyncThunk('products', async (params) => {
    const { data } = await axios.post("", params);
    return data;
})
export const fetchCategory = createAsyncThunk('category', async (params) => {
    const { data } = await axios.post("", params);
    return data;
})


const initialState = {
    products: {
        data: [],
        status: 'loading',
    },
    category: {
        data: [],
        status: 'loading',
    },
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Получение всех продуктов
            .addCase(fetchProducts.pending, (state) => {
                state.products.status = 'loading';
                state.products.data = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.status = 'loaded';
                state.products.data = action.payload
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.products.status = 'error';
                state.products.data = null
            })
            //Получение всех категорий
            .addCase(fetchCategory.pending, (state) => {
                state.category.status = 'loading';
                state.category.data = null
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.category.status = 'loaded';
                state.category.data = action.payload
            })
            .addCase(fetchCategory.rejected, (state) => {
                state.category.status = 'error';
                state.category.data = null
            })
    },
});

export const { reducer: productsReducer } = productsSlice; // Export the postsReducer
