import React, { ChangeEvent } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { Order } from '../../interfaces/Index'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/features/service/hooks'
import { addOrder, editOrder } from '../../app/features/orders/OrderSlice'
import { v4 } from "uuid"
import { Button } from '@material-tailwind/react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input
} from "@material-tailwind/react";

type FormEvent = React.FormEvent<HTMLFormElement>
type HandleInputChange = ChangeEvent<HTMLInputElement>;

export default function OrderRegister() {

    const initialState = {
        idProduct: "",
        quantity: 0,
        customer: "",
        address: "",
        phone: "",
        details: "",
        status: false
    }

    const [order, setOrder] = useState<Order>(initialState)
    const [error, setError] = useState<string>()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const orders = useAppSelector(state => state.OrderManager);
    const products = useAppSelector(state => state.ProductManager)

    const handleInputChange = ({ target: { name, value }, }: HandleInputChange) => {
        setOrder({ ...order, [name]: value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (params.id) {
            dispatch(editOrder(order))
            navigate('/')
        } else {
            dispatch(addOrder({
                ...order,
                idOrder: v4(),
            }))
            navigate('/')
        }
    }

    useEffect(() => {
        if (params.id) {
            const foundOrder = orders?.find((o) => o.idOrder === params?.id);

            if (foundOrder) {
                setOrder(foundOrder);
            }
        }
    }, [params.id, orders])

    const handleCancel = () => {
        setOrder(initialState)
    }

    return (
        <div className='grid place-items-center p-10 gap-10'>
            <div className='flex flex-col justify-center gap-5'>
                <h1 className=' text-3xl font-bold text-primary'>Register Order</h1>
                <p className='text-xl font-light text-gray-600'>Add orders and sort your itinerary</p>
                <Button placeholder="" onClick={() => navigate('/')} variant="outlined" className=' shadow-md'>Back to order list</Button>
            </div>
            <form className='flex flex-col justify-center gap-5 w-96 bg-gray-300 p-10 rounded-md shadow-md' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-start gap-2'>
                    <label className='text-start text-base font-bold'>Product name</label>
                    <input
                        className='p-2 rounded-md shadow-md text-gray-800 w-full'
                        placeholder="Cookies..."
                        type='text'
                        name='name'
                        value={order.customer}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-start text-base font-bold'>Price of product</label>
                    <input
                        className=' p-2 rounded-md w-full shadow-md text-slate-800'
                        placeholder="Product's Price"
                        type='number'
                        name='price'
                        required={true}
                        value={order.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex flex-row justify-center gap-5'>
                    <Button placeholder="" className='bg-primary' type='submit'>SAVE</Button>
                    <Button placeholder="" className='bg-details' type='button' onClick={handleCancel}>CANCEL</Button>
                </div>
            </form>


        </div>
    )
}
