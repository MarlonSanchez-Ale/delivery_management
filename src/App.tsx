import { Fragment } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import OrderList from './components/elements/Orders/OrderList/OrderList';
import OrderCreate from './components/elements/Orders/OrderForm/OrderCreate';
import ProductsList from './components/elements/Products/ProductsList';
import ProductsForm from './components/elements/Products/ProductsForm';
import FormatLayout from './components/layout/FormatLayout';
import OrderEditForm from './components/elements/Orders/OrderForm/OrderEditForm';

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
            <Route path='/order/edit/:id' element={<OrderEditForm />} />
          </Routes>
        </FormatLayout>
    </Fragment>


  );
}

export default App;
