"use client"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { Order } from "../../interfaces/Index";
import { Button } from "@material-tailwind/react";
import { useAppSelector } from "../../app/features/service/hooks";

export default function OrderList() {
    const orders = useAppSelector(state => state.OrderManager);
    const products = useAppSelector(state => state.ProductManager)

    const navigate = useNavigate();

    return (
        <div className='h-full sm:w-auto p-8 justify-center md:w-4/6'>
            <div className='flex flex-col gap-3 justify-center p-6'>
                <h1 className="text-3xl text-primary font-bold underline text-center">
                    Order Management
                </h1>
                <p className=' text-lg font-light text-gray-600'>This application manages your orders</p>
            </div>
            <div className="grid place-items-center" >
                <Button placeholder="" onClick={() => navigate('/products')} variant="outlined" className=' shadow-md'>Products Management</Button>
                {!products.length && (<p className='mt-5 text-details'>Alerta: Para iniciar a agregar ordenes debe agregar productos previamente</p>)}
            </div>
            <div className='flex py-4 my-5 sm:flex-col gap-5 md:flex-row justify-between'>
                <div className={`grid place-items-center p-2 rounded-md shadow-md bg-second w-full`}>
                    <p className=' text-start text-lg text-primary font-ligth'>
                        {`Total de Pedidos: ${orders.length}`}
                    </p>
                </div>
                <div className={`grid place-items-center p-2 rounded-md shadow-md bg-primary w-full`}>
                    <p className=' text-start text-lg text-second  font-ligth'>
                        {`Ingreso por entrega: 500 C$`}
                    </p>
                </div>
                {products.length > 0 && (
                    <button
                        className='bg-details text-center w-full text-gray-200 text-lg  font-medium p-3 rounded-md shadow-lg border ring-2 ring-blue-900 hover:bg-sky-700'
                        onClick={() => navigate('/order/register')}
                    >
                        New Order
                    </button>
                )}
            </div>

            <div className='sm:w-full flex flex-col justify-center'>
                {orders && orders.map((t: Order, index: number) => (
                    <div
                        key={index}
                        className={`flex flex-col justify-center gap-6 bg-rose-50 p-5 rounded-md shadow-md border ring-2 ${t.status ? "border-green-600 ring-green-200" : "border-yellow-600 ring-yellow-200"} hover:translate-y-2 hover:bg-rose-100 cursor-pointer`}
                    //onClick={() => t.id && handleCompleted(t.id)}
                    >
                        <div className='flex flex-col justify-start gap-2'>
                            <p className=' text-start text-lg font-semibold'>
                                {`Nombre de Cliente: ${t.customer}`}
                            </p>
                            <p className=' text-start text-lg font-light'>
                                {`Producto: Flan de Caramelo`}
                            </p>
                            <p className=' text-start text-lg font-light'>
                                {`Cantidad: ${t.quantity} unidad`}
                            </p>
                            <p className=' text-start text-lg font-light'>
                                {`Dirección: ${t.address}`}
                            </p>
                            <p className=' text-start text-lg font-light'>
                                {`Detalles de entrega: ${t.details}`}
                            </p>
                            <p className="text-start text-lg font-light">
                                {`Teléfono: ${t.phone}`}
                            </p>
                        </div>
                        <div className='flex flex-row gap-3 justify-end'>
                            <div className={`grid place-items-center p-2 rounded-md shadow-md ${t.status ? 'bg-green-400' : 'bg-yellow-400'}`}>
                                <p className=' text-start text-sm text-white font-ligth'>
                                    {t.status ? 'Delivered' : "Not delivered"}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 shadow-md"
                            //onClick={() => navigate(`/create-task/${t.idOrder}`)}
                            >
                                <PencilSquareIcon height={25} width={25} />
                            </button>
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 shadow-md"
                            //onClick={() => t.idOrder && deleteTask(t.idOrder)}
                            >
                                <TrashIcon height={25} width={25} />
                            </button>
                        </div>
                    </div>
                ))}
                {!orders &&
                    <div role="status" className="space-y-2.5 animate-pulse w-full p-20">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    </div>
                }

            </div>
            {orders && !orders.length && (
                <div className={`bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md my-5`} role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-start">Alert</p>
                            <p className="text-sm">You don't have any pending orders.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}