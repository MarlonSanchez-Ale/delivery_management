"use client"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { Order } from "../../../interfaces/Index";
import { Button } from "@material-tailwind/react";
import { useAppSelector, useAppDispatch } from "../../../app/features/service/hooks";
import { deleteOrder } from '../../../app/features/orders/OrderSlice';
import { AiOutlineUser } from "react-icons/ai";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
    Alert
} from "@material-tailwind/react";
import {
    BellIcon,
    ArchiveBoxIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function OrderList() {
    const orders = useAppSelector(state => state.OrderManager);
    const products = useAppSelector(state => state.ProductManager)
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    return (
        <div className='h-full  bg-red-200'>
            <div className='flex flex-col gap-3 justify-center p-6'>
                <h1 className="text-3xl text-second font-bold underline text-center">
                    Order Management
                </h1>
                <p className=' text-xl font-light text-center text-gray-400'>This application manages your orders</p>
            </div>
            <div className="grid place-items-center" >
                <Button placeholder="" onClick={() => navigate('/products')} variant="outlined" className=' shadow-md'>Products Management</Button>
                {!products.length && (<p className='mt-5 text-details'>Alerta: Para iniciar a agregar ordenes debe agregar productos previamente</p>)}
            </div>
            <div className='flex py-4 my-5 sm:flex-col gap-5 md:flex-row justify-between'>
                <div className={`grid place-items-center p-2 rounded-md shadow-md bg-second w-full`}>
                    <p className=' text-start text-lg text-primary font-bold'>
                        {`Total de Pedidos: ${orders.length}`}
                    </p>
                </div>
                <div className={`grid place-items-center p-2 rounded-md shadow-md bg-primary w-full`}>
                    <p className=' text-start text-lg text-second  font-bold'>
                        {`Ingreso por entrega: 500 C$`}
                    </p>
                </div>
                {products.length > 0 && (
                    <button
                        className='bg-details text-center w-full text-gray-200 text-lg  font-medium p-3 rounded-md shadow-lg hover:bg-details/90'
                        onClick={() => navigate('/order/create')}
                    >
                        New Order
                    </button>
                )}
            </div>

            <div className='flex flex-col justify-center gap-5'>

                {orders && orders.map(({ idOrder, customer, product, dateOrder, timeOrder, quantity, address, status }: Order, index: number) => (
                    <div className='flex flex-col bg-gray-800 rounded-md shadow-md p-5 gap-8' key={index}>
                        <div className='flex flex-row justify-start gap-3'>
                            <div className='flex flex-col justify-center p-2 bg-primary rounded-md shadow-md '>
                                <ArchiveBoxIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className='flex flex-col justify-start'>
                                <p className="text-sm text-gray-600 text-start">Customer</p>
                                <p className=' text-start text-lg font-semibold'>{customer}</p>
                                <p className=' text-start text-sm font-light'>12/05/2023</p>
                            </div>
                            <div className='flex flex-col justify-start'>
                                <p className="text-sm text-gray-600 text-start">Time Order</p>
                                <p className=' text-start text-lg font-semibold'>{timeOrder}</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-start gap-5 border-t-2 border-t-gray-700 p-2'>

                            <div className='flex flex-col justify-start'>
                                <p className="text-sm text-gray-600 text-start">Time Order</p>
                                <p className=' text-start text-lg font-semibold'>{timeOrder}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {!orders &&
                <div role="status" className="space-y-2.5 animate-pulse w-full p-20">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                </div>
            }

            {orders && !orders.length && (
                <div className={`bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900 px-4 py-3 shadow-md my-5`} role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <svg className="fill-current h-6 w-6 text-primary mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-start text-primary">Alert</p>
                            <p className="text-sm text-primary">You don't have any pending orders.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

/*

<div
                        key={index}
                        className={`flex flex-col justify-center gap-6 bg-black p-10 rounded-md shadow-md hover:translate-y-2 cursor-pointer`}
                    //onClick={() => t.id && handleCompleted(t.id)}
                    >
                        <div className='flex justify-start gap-5 sm:flex-col md:flex-row'>
                            <div className='flex flex-row justify-start gap-2'>
                                <div className='flex flex-col rounded-md shadow-md p-2'
                                >
                                    <AiOutlineUser color='orange' size={30} />
                                </div>
                                <div className='flex flex-col justify-start'>
                                    <p className="text-sm text-gray-600 text-start">Customer</p>
                                    <p className=' text-start text-lg font-semibold'>{customer}</p>
                                </div>
                            </div>

                            <div className='flex flex-row justify-start gap-2'>
                                <div className='flex flex-col rounded-md shadow-md p-2'
                                >
                                    <AiOutlineUser color='gray' size={20} />
                                </div>
                                <div className='flex flex-col justify-start'>
                                    <p className="text-sm text-gray-600 text-start">Product</p>
                                    <p className=' text-start text-lg font-semibold'>Flan de Caramelo</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row gap-3 justify-end bg-second p-5 rounded-md'>
                            <div className={`grid place-items-center p-2 rounded-md shadow-md ${status ? 'bg-green-400' : 'bg-yellow-400'}`}>
                                <p className=' text-start text-sm text-white font-ligth'>
                                    {status ? 'Delivered' : "Not delivered"}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 shadow-md"
                                onClick={() => navigate(`/order/create/${idOrder}`)}
                            >
                                <PencilSquareIcon height={25} width={25} />
                            </button>
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 shadow-md"
                                onClick={() => idOrder && dispatch(deleteOrder(idOrder))}
                            >
                                <TrashIcon height={25} width={25} />
                            </button>
                        </div>
                    </div>
                    
*/