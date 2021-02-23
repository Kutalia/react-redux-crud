import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const fixPrice = (price) => Number.parseFloat(price).toFixed(2);

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(
                {
                    id: uuidv4(),
                    ...action.payload,
                    price: fixPrice(action.payload.price),
                }
            );
        },
        removeProduct: (state, action) => {
            return state.filter((product) => product.id !== action.payload);
        },
        editProduct: (state, action) => {
            const productIndex = state.findIndex(product => product.id === action.payload.id);
            state[productIndex] = {
                ...state[productIndex],
                ...action.payload,
                price: fixPrice(action.payload.price),
            };
        }
    },
});

export const { addProduct, removeProduct, editProduct } = shopSlice.actions;

export const allProductsSelector = state => state.shop;
export const createProductSelector = id => createSelector(
    allProductsSelector,
    products => products.find((product) => product.id === id)
);

export default shopSlice.reducer;
