import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../../interfaces/Index";
//Datos de los pedidos 
// Producto, Cantidad, nombre, telefono, especificaciones, estado

// Definiendo el estado inicial

interface Initial {
    items: Order[],
    filter: string
}

const initialState: Initial = {
    items: [
        {
            idOrder: "1",
            product: [
                { name: "Jamones", quantity: 2, total: 20 }
            ],
            customer: "Juan",
            dateOrder: "12/02/23",
            timeOrder: "10:30",
            address: "Por ahí",
            phone: "85588662",
            details: "Detalles",
            status: "NOT START"

        },
        {
            idOrder: "2",
            product: [
                { name: "Galletas", quantity: 3, total: 10 },
                { name: "Flan", quantity: 4, total: 20 }
            ],
            customer: "Juan",
            dateOrder: "12/02/23",
            timeOrder: "10:30",
            address: "Por ahí",
            phone: "85588662",
            details: "Detalles",
            status: "IN PROCCESS"

        }
    ],
    filter: ""
}

export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            state.items.push(action.payload)
        },
        editOrder: (state, action: PayloadAction<Order>) => {
            const { idOrder, customer, address, phone, product, details } = action.payload;

            const foundOrder = state.items.find(order => order.idOrder === idOrder);

            if (foundOrder) {
                foundOrder.customer = customer;
                foundOrder.address = address;
                foundOrder.phone = phone;
                foundOrder.details = details;
                foundOrder.product = product;
            }
        },
        editState: (state, action: PayloadAction<string>) => {
            const idOrder = action.payload;
            const foundOrder = state.items.find(order => order.idOrder === idOrder);

            if (foundOrder) {
                if (foundOrder.status === "NOT START") {
                    foundOrder.status = "IN PROCCESS";
                }
                else if (foundOrder.status === "IN PROCCESS") {
                    foundOrder.status = "COMPLETED"
                }
                else if (foundOrder.status === "COMPLETED") {
                    foundOrder.status = "COMPLETED"
                }
            }
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            const idOrder = action.payload;
            const foundOrder = state.items.find(order => order.idOrder === idOrder);
            if (foundOrder) {
                state.items.splice(state.items.indexOf(foundOrder), 1)
            }
        },
        deleteAll: (state) => {
            state.items.splice(0, state.items.length)
        },
        reorderOrders: (state, action: PayloadAction<Order[]>) => {
            state.items = action.payload;
        }
    }
})

export const { setFilter, addOrder, editOrder, editState, deleteOrder, deleteAll, reorderOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
// Exporta el tipo de estado
export type OrderState = ReturnType<typeof OrderSlice.reducer>;