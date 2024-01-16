import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../interfaces/Index";

const initialState: Product[] = [
    { idProduct: "1", name: "Arroz de leche", price: 20 },
    { idProduct: "2", name: "Galletas", price: 10 },
    { idProduct: "3", name: "Flan", price: 20 }
];

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.push(action.payload)
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const { idProduct, name, price } = action.payload;
            const foundProduct = state.find(p => p.idProduct === idProduct);

            if (foundProduct) {
                foundProduct.name = name;
                foundProduct.price = price;
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            const idProduct = action.payload;
            const foundProduct = state.find(p => p.idProduct === idProduct);

            if (foundProduct) {
                state.splice(state.indexOf(foundProduct), 1)
            }
        },
    }
})

export const { addProduct, editProduct, deleteProduct } = ProductSlice.actions;
export default ProductSlice.reducer;