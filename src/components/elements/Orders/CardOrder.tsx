import { useState } from 'react'
import { Order } from '../../../interfaces/Index'
import { OrderProduct } from '../../../interfaces/Index';
import { MdDeliveryDining, MdCalendarMonth, MdAccessTime, MdFormatListBulleted, MdCheckCircle, MdPhone } from "react-icons/md";
import {
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  data: Order;
  index: number,
}

export default function CardOrder(props: Props) {

  const { data, index } = props;
  const { idOrder, customer, product, dateOrder, timeOrder, details, phone, address, status } = data;
  //idOrder, customer, product, dateOrder, timeOrder, details, phone,  address, status
 // const [open, setOpen] = useState<number>(0);
  //const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: idOrder
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (

    <div
      className='flex flex-col bg-white rounded-md shadow-md p-5 gap-8 relative'
      ref={setNodeRef} style={style} {...attributes} {...listeners} 
    >
      <div className='flex flex-col justify-start gap-3'>
        <MdDeliveryDining size={40} color='white' className='p-1 rounded-full bg-primary shadow-md my-5' />
        <Typography placeholder="" variant="h5" color="gray" className="mb-2">
          {customer}
        </Typography>
        <Typography placeholder="">
          {address}
        </Typography>
        
        <List placeholder="" >
          {product && product.map(({ name, quantity, total }: OrderProduct, index: number) => (
            <ListItem placeholder="" key={index} id='elementId'>
              {name}
              <ListItemSuffix placeholder="" className='flex flex-row gap-5'>
                <p>Quantity: </p>
                <Chip
                  value={quantity}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
                <p>Total: </p>
                <Chip
                  value={total}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>

        <div className='flex flex-row justify-between'>
          <div className='flex flex-row justify-center gap-2 mt-3'>
            <MdCheckCircle size={20} color='gray' />
            <p>{details}</p>
          </div>
          <div className='flex flex-row justify-center gap-2 mt-3'>
            <MdPhone size={20} color='gray' />
            <p>{phone}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between gap-3'>
        <div className='flex flex-row justify-center gap-2'>
          <MdCalendarMonth size={20} color='gray' />
          <p>{dateOrder.toString()}</p>
        </div>
        <div className='flex flex-row justify-center gap-2'>
          <MdAccessTime size={20} color='gray' />
          <p>{timeOrder}</p>
        </div>
        <div className='flex flex-row justify-center gap-2'>
          <MdFormatListBulleted size={20} color='gray' />
          <p>{status}</p>
        </div>
      </div>
    </div>

  )
}

/*
<List placeholder="" >
          {product && product.map(({ name, quantity, total }: OrderProduct, index: number) => (
            <ListItem placeholder="" key={index} id='elementId'>
              {name}
              <ListItemSuffix placeholder="" className='flex flex-row gap-5'>
                <p>Quantity: </p>
                <Chip
                  value={quantity}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
                <p>Total: </p>
                <Chip
                  value={total}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
*/