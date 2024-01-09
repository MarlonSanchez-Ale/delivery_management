// ProductComponent.tsx
import React from 'react';
import {
    IconButton,
    Accordion,
    AccordionHeader,
    AccordionBody,
    List,
    ListItem,
    Card
} from '@material-tailwind/react';
import { FaCirclePlus } from "react-icons/fa6";

interface ProductProps {
    name: string;
    price: number;
    onAddToOrder: () => void;
    
}

const ProductComponent: React.FC<ProductProps> = ({ name, price, onAddToOrder }) => {
    const [open, setOpen] = React.useState<number>(1);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <Accordion placeholder="" open={open === 1}>
            <AccordionHeader placeholder="" onClick={() => handleOpen(1)}>Select Products</AccordionHeader>
            <AccordionBody>
                <List placeholder="">
                    <ListItem placeholder="" className='flex flex-row justify-between gap-5'>
                        <h3 className='font-semibold text-gray-700 mt-2'>{name}</h3>
                        <p className='text-gray-600 mt-2'>${price}</p>
                        <IconButton placeholder="" onClick={onAddToOrder} variant="text">
                            <FaCirclePlus size={20} color='gray' />
                        </IconButton>
                    </ListItem>
                </List>
            </AccordionBody>
        </Accordion>
    );
};

export default ProductComponent;


/*
<div className="flex flex-row justify-center gap-10 border p-4 mb-4">
            <h3 className='font-semibold text-gray-700 mt-2'>{name}</h3>
            <p className='text-gray-600 mt-2'>${price.toFixed(2)}</p>
            <IconButton placeholder="" onClick={onAddToOrder} variant="text">
                <FaCirclePlus size={20} color='gray' />
            </IconButton>
        </div>
*/