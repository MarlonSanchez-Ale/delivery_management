import { Order, OrderProduct } from '../../../../interfaces/Index';
import {
  MdDeliveryDining,
  MdCalendarMonth,
  MdAccessTime,
  MdFormatListBulleted,
  MdCheckCircle,
  MdPhone,
  MdEdit
} from "react-icons/md";
import {
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  IconButton
} from "@material-tailwind/react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef, useEffect } from 'react';


export const CardOrder = forwardRef((props: any, ref: any) => {


  const { data } = props;
  const { customer, product, dateOrder, timeOrder, details, phone, address, status } = data;
  // const navigate = useNavigate()
  

  console.log(data)

  const formatDate = new Date(dateOrder)

  return (

    <div
      className='flex flex-col bg-white rounded-md shadow-md p-5 gap-8 relative'
      {...props}
      ref={ref}
    >
      {props.data ? (
        <>
          <div className='flex flex-col justify-start gap-3'>
            <div className='flex flex-row-reverse justify-between'>
              {props.onRemove ? (
                <IconButton placeholder="" onClick={() => {
                  console.log(`Removing: ${props.id}`);
                  props.onRemove(props.id);
                }}
                  className=' rounded-full z-10' variant='text'
                >
                  <MdEdit size={40} color='white' className='p-1 rounded-full bg-gray-400 shadow-md my-5' />
                </IconButton>
              ) : null}
              <MdDeliveryDining size={40} color='white' className='p-1 rounded-full bg-primary shadow-md my-5' />
            </div>
            <Typography placeholder="" variant="h5" color="gray" className="mb-2">
              {customer}
            </Typography>
            <Typography placeholder="">
              {address}
            </Typography>

            <List placeholder="">
              {product && product.map(({ name, quantity, total }: OrderProduct, index: number) => (
                <ListItem placeholder="" key={index} id='elementId'>
                  {name}
                  <ListItemSuffix placeholder="" className='flex flex-row gap-5'>
                    <p>Quantity: </p>
                    <Chip
                      value={quantity}
                      variant="ghost"
                      size="sm"
                      className="rounded-full" />
                    <p>Total: </p>
                    <Chip
                      value={total}
                      variant="ghost"
                      size="sm"
                      className="rounded-full" />
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
          </div><div className='flex flex-row justify-between gap-3'>
            <div className='flex flex-row justify-center gap-2'>
              <MdCalendarMonth size={20} color='gray' />
              <p>{formatDate.toLocaleDateString()}</p>
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
        </>
      ) : null}
    </div>

  )
})

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