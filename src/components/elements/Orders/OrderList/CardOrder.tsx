import { Order } from '../../../../interfaces/Index';
import { OrderProduct } from '../../../../interfaces/Index';
import {
  MdDeliveryDining,
  MdCalendarMonth,
  MdAccessTime,
  MdFormatListBulleted,
  MdCheckCircle,
  MdPhone,
  MdEdit,
  MdOutlineDelete
} from "react-icons/md";
import {
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  IconButton,
  Button
} from "@material-tailwind/react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch } from '../../../../app/features/service/hooks';
import { deleteOrder, editState } from '../../../../app/features/orders/OrderSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateValidate } from '../../../../app/Validation/Validation';

type Props = {
  data: Order;
  index: number,
}

export default function CardOrder(props: Props) {

  const { data } = props;
  const { idOrder, customer, product, dateOrder, timeOrder, details, phone, address, status } = data;

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

  const [colorbg, setColorbg] = useState<string>("bg-primary")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleStateOrder = (id: string) => {
    dispatch(editState(id))
  }

  const handleDeletOrder = (id: string) => {
    dispatch(deleteOrder(id))
  }

  useEffect(() => {
    if (status) {
      if (status === "NOT START") {
        setColorbg("bg-blue-300")
      } else if (status === "IN PROCCESS") {
        setColorbg("bg-primary")
      } else if (status === "COMPLETED") {
        setColorbg("bg-green-500")
      }
    }
  }, [status])

  const dateFormat = new Date(dateOrder)

  return (

    <div
      className='flex flex-col bg-white rounded-md shadow-md p-5 gap-8 relative sm:my-5'
      ref={setNodeRef} style={style} {...attributes} {...listeners}
    >
      <div className='flex flex-col justify-start gap-3'>
        <div className='flex justify-between'>
          <MdDeliveryDining size={40} color='white' className='p-1 rounded-full bg-primary shadow-md my-5' />
          {DateValidate(dateFormat) ? (
            <IconButton placeholder="" onClick={() => navigate(`/order/edit/${idOrder}`)} variant='text'>
              <MdEdit size={35} color='white' className='p-1 rounded-full bg-gray-500 shadow-md my-5' />
            </IconButton>
          ) : (
            <Chip variant="ghost" value="Expired order" />
          )}
        </div>
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
      <div className='flex justify-between sm:flex-col sm:gap-10 md:flex-row'>
        <div className='flex flex-row sm:justify-between md:justify-center gap-10'>
          <div className='flex flex-row justify-center'>
            <MdCalendarMonth size={20} color='gray' />
            <p>{dateFormat.toLocaleDateString()}</p>
          </div>
          <div className='flex flex-row justify-center gap-2'>
            <MdAccessTime size={20} color='gray' />
            <p>{timeOrder}</p>
          </div>
        </div>
        <div className='flex flex-row sm:justify-between md:justify-center gap-10'>
          <Button placeholder=""
            className={`flex items-center gap-2 ${colorbg} `}
            onClick={() => handleStateOrder(idOrder)}
          >
            <MdFormatListBulleted size={20} color='white' />
            {status}
          </Button>
          <IconButton placeholder="" onClick={() => handleDeletOrder(idOrder)} variant='text'>
            <MdOutlineDelete size={40} color='white' className='p-1 rounded-full bg-details shadow-md my-5' />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
