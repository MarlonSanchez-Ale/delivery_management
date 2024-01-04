import React from 'react';
import {
    IconButton,
    Accordion,
    AccordionHeader,
    AccordionBody,
    List,
    ListItem,
    
} from '@material-tailwind/react';
import { FaCirclePlus } from "react-icons/fa6";
import { Product } from '../../../../interfaces/Index';

interface ProductProps {
    products: Product[];
    onAddToOrder: (productName: string, price: number) => void;

}

const ProductSelect: React.FC<ProductProps> = ({ products, onAddToOrder }) => {
    const [open, setOpen] = React.useState<number>(1);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <Accordion placeholder="" open={open === 1}>
            <AccordionHeader placeholder="" onClick={() => handleOpen(1)}>Select Products</AccordionHeader>
            <AccordionBody>
                <List placeholder="">
                    {products && products.map(({ name, price}: Product, index: number) => (
                        <ListItem placeholder="" className='flex flex-row justify-between gap-5' key={index}>
                            <h3 className='font-semibold text-gray-700 mt-2'>{name}</h3>
                            <p className='text-gray-600 mt-2'>${price}</p>
                            <IconButton placeholder="" onClick={() => onAddToOrder(name, price)} variant="text">
                                <FaCirclePlus size={20} color='gray' />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </AccordionBody>
        </Accordion>
    );
};

export default ProductSelect;

