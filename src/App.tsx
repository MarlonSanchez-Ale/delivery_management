import { Fragment } from 'react';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import OrderList from './components/elements/Orders/OrderList';
import OrderCreate from './components/elements/Orders/OrderCreate';
import ProductsList from './components/elements/Products/ProductsList';
import ProductsForm from './components/elements/Products/ProductsForm';
import FormatLayout from './components/layout/FormatLayout';
//import OrderForm from './components/elements/Orders/OrderForm';

function App() {

  return (
    <Fragment>
      <FormatLayout>
          <Routes>
            <Route path='/' element={<OrderList />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/products/create' element={<ProductsForm />} />
            <Route path='/products/create/:id' element={<ProductsForm />} />
            <Route path='/order/create' element={<OrderCreate />} />
            <Route path='/order/create/:id' element={<OrderCreate />} />
          </Routes>
      </FormatLayout>
    </Fragment>


  );
}

export default App;
