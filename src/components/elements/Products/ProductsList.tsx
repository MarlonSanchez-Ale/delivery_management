import { Card, Typography, Button, IconButton } from '@material-tailwind/react';
import { Product } from '../../../interfaces/Index';
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/features/service/hooks';
import { AiFillEdit, AiFillRest } from "react-icons/ai";
import { deleteProduct } from '../../../app/features/Products/ProductSlice';

const TABLE_HEAD = ["Product", "Price", "Operation"];

export default function ProductsList() {

    const products = useAppSelector((state) => state.ProductManager);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleDelete = (id: string) => {
        dispatch(deleteProduct(id))
    }

    return (
        <div className='h-full sm:w-auto p-8 justify-center md:w-4/6'>
            <div className='flex flex-col gap-3 justify-center p-6'>
                <h1 className="text-3xl text-primary font-bold underline text-center">
                    Product Management
                </h1>
                <p className=' text-xl font-light text-gray-600'>Product management for your orders</p>
            </div>
            <div className="grid place-items-center" >
                <Button placeholder="" onClick={() => navigate('/')} variant="outlined" className=' shadow-md'>Back to Orders</Button>

            </div>
            <div className="flex py-4 my-5 sm:flex-col gap-5 md:flex-row justify-between">
                <div className={`grid place-items-center p-2 rounded-md shadow-lg bg-second w-full`}>
                    <p className=' text-start text-lg text-primary font-bold'>
                        {`Total de Productos: ${products.length}`}
                    </p>
                </div>
                <button
                    className=' bg-primary text-center text-gray-200 justify-end text-lg  font-medium p-3 rounded-md shadow-lg'
                    onClick={() => navigate('/products/create')}
                >
                    Add Product
                </button>
            </div>

            <div className='w-full'>
                {products.length > 0 && (
                    <Card className="h-96 w-full overflow-scroll" placeholder="">
                        <table className="w-full table-auto text-left border border-collapse">
                            <thead className='sticky top-0'>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small" placeholder=""
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(({ idProduct, name, price }: Product, index) => (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography placeholder="" variant="small" color="blue-gray" className="font-normal">
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography placeholder="" variant="small" color="blue-gray" className="font-normal">
                                                {price}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <div className='flex flex-row justify-center gap-3'>
                                                <IconButton placeholder="" variant="text" onClick={() => navigate(`/products/create/${idProduct}`)}>
                                                    <AiFillEdit size={30} className='text-primary' />
                                                </IconButton>
                                                <IconButton placeholder="" variant="text" onClick={() => handleDelete(idProduct ? idProduct : "")}>
                                                    <AiFillRest size={30} className='text-details' />
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
                {!products && (
                    <div role="status" className="space-y-2.5 animate-pulse w-full p-20">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    </div>
                )}
                {products && !products.length && (
                    <div className={`bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md my-5`} role="alert">
                        <div className="flex">
                            <div className="py-1">
                                <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-start">Alert</p>
                                <p className="text-sm">You don't have any products.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
