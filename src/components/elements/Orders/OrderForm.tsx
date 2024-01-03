// OrderComponent.tsx
import React, { useState } from 'react';
import ProductComponent from './ProductComponent';
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { FaRegTrashAlt } from "react-icons/fa";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

const OrderForm: React.FC = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addToOrder = (productName: string, price: number) => {
    const existingItemIndex = order.findIndex(item => item.name === productName);

    if (existingItemIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[existingItemIndex].quantity += 1;
      setOrder(updatedOrder);
    } else {
      setOrder(prevOrder => [...prevOrder, { name: productName, quantity: 1, price }]);
    }
  };

  const removeFromOrder = (productName: string) => {
    const updatedOrder = order.filter((item) => item.name !== productName);
    setOrder(updatedOrder);
  };

  return (
    <div className='mt-10'>


      <Card placeholder="" className="border p-4 mb-4">
        <h2>Product's Details</h2>
        <List placeholder="">
          {order.map(item => (
            <ListItem placeholder="" ripple={false} className="py-1 pr-1 pl-4">
              <div className='flex flex-row justify-between gap-10'>
                <h2 className='font-semibold text-center'>{item.name}</h2>
                <p className=''>Quantity: {item.quantity}</p>
                <p className=''>Total: ${(item.quantity * item.price).toFixed(2)}</p>
              </div>
              <ListItemSuffix placeholder="">
                <IconButton placeholder="" variant="text" color="blue-gray" onClick={() => removeFromOrder(item.name)}>
                  <FaRegTrashAlt size={20} />
                </IconButton>
              </ListItemSuffix>
            </ListItem>

          ))}
        </List>
      </Card>

      <h2>Productos disponibles</h2>
      <ProductComponent name="Producto 1" price={10} onAddToOrder={() => addToOrder('Producto 1', 10.99)} />
      <ProductComponent name="Producto 2" price={15} onAddToOrder={() => addToOrder('Producto 2', 15.99)} />
      {/* Agrega más productos según sea necesario */}
    </div>
  );
};

export default OrderForm;
