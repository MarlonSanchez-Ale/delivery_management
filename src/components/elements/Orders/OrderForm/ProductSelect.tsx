import React from 'react';
import {
    IconButton,
    Accordion,
    AccordionHeader,
    AccordionBody,
    List,
    ListItem,

} from '@material-tailwind/react';
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { Product } from '../../../../interfaces/Index';

interface ProductProps {
    products: Product[];
    onAddToOrder: (productName: string, price: number) => void;
    onSubtracttoOrder:  (productName: string, price: number) => void;

}

const ProductSelect: React.FC<ProductProps> = ({ products, onAddToOrder, onSubtracttoOrder }) => {
    const [open, setOpen] = React.useState<number>(1);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <Accordion placeholder="" open={open === 1}>
            <AccordionHeader placeholder="" onClick={() => handleOpen(1)}>Select Products</AccordionHeader>
            <AccordionBody>
                <List placeholder="">
                    {products && products.map(({ name, price }: Product, index: number) => (
                        <ListItem placeholder="" className='flex flex-row justify-between gap-5' key={index}>
                            <h3 className='font-semibold text-gray-700 mt-2'>{name}</h3>
                            <p className='text-gray-600 mt-2'>${price}</p>
                            <div className='flex flex-row justify-center gap-3'>
                                <IconButton placeholder="" onClick={() => onAddToOrder(name, price)} variant='text'>
                                    <IoAddCircle size={30} color='gray' />
                                </IconButton>
                                <IconButton placeholder="" onClick={() => onSubtracttoOrder(name, price)} variant='text'>
                                    <IoRemoveCircle size={30} color='gray' />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </AccordionBody>
        </Accordion>
    );
};

export default ProductSelect;

