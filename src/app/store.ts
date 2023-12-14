import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import OrderSlice from "./features/orders/OrderSlice";
import ProductSlice from "./features/Products/ProductSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['OrderManager', 'ProductManager']
}

const rootReducer = combineReducers({
    OrderManager: OrderSlice,
    ProductManager: ProductSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      })
})

// Opcional: Definir el tipo RootState para tipado de useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;