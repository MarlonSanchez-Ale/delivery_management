import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../../interfaces/Index";
//Datos de los pedidos 
// Producto, Cantidad, nombre, telefono, especificaciones, estado

// Definiendo el estado inicial
const initialState: Order[] = []

export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.push(action.payload)
        },
        editOrder: (state, action: PayloadAction<Order>) => {
            const { idOrder, quantity, customer, address, phone, details } = action.payload;

            const foundOrder = state.find(order => order.idOrder === idOrder);

            if (foundOrder) {
                foundOrder.quantity = quantity;
                foundOrder.customer = customer;
                foundOrder.address = address;
                foundOrder.phone = phone;
                foundOrder.details = details;
                //foundOrder.idProduct = idProduct;
            }
        },
        editState: (state, action: PayloadAction<Order>) => {
            const { idOrder, status } = action.payload;
            const foundOrder = state.find(order => order.idOrder === idOrder);

            if (foundOrder) {
                foundOrder.status = !status;
            }
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            const idOrder = action.payload;
            const foundOrder = state.find(order => order.idOrder === idOrder);
            if (foundOrder) {
                state.splice(state.indexOf(foundOrder), 1)
            }
        },
        deleteAll: (state) => {
            state.splice(0, state.length)
        }
    }
})

export const { addOrder, editOrder, editState, deleteOrder, deleteAll } = OrderSlice.actions;
export default OrderSlice.reducer;
// Exporta el tipo de estado
export type OrderState = ReturnType<typeof OrderSlice.reducer>;