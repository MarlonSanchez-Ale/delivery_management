import { useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../../../interfaces/Index'
import { useAppSelector, useAppDispatch } from '../../../app/features/service/hooks'
import { addProduct, editProduct } from '../../../app/features/Products/ProductSlice'
import { v4 } from 'uuid'
import { Button, IconButton } from '@material-tailwind/react'
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema } from '../../schema/ProductSchema'
import { AlertContext } from '../../../app/AlertWrapper/Context/AlertContext'
import { IoReturnUpBackSharp } from "react-icons/io5";

export default function ProductsForm() {

    const initialState = {
        idProduct: '',
        name: '',
        price: 0
    }

    const { alertSuccess } = useContext(AlertContext)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const products = useAppSelector(state => state.ProductManager)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Product>({
        resolver: zodResolver(ProductSchema),
        defaultValues: initialState
    })


    const onSubmit: SubmitHandler<Product> = (data) => {
        if (params.id) {
            dispatch(editProduct({
                idProduct: params.id,
                ...data,
            }))
            alertSuccess({
                title: 'Product updated',
                text: 'Successfully updated product',
            })
        } else {
            dispatch(addProduct({
                idProduct: v4(),
                ...data,
            }))
            alertSuccess({
                title: 'Product created',
                text: 'Successfully registered product',
            })
            handleCancel()
        }

    }

    useEffect(() => {
        if (params.id) {
            const foundProduct = products?.find((p) => p.idProduct === params?.id);


            if (foundProduct) {
                setValue("idProduct", foundProduct.idProduct)
                setValue("name", foundProduct.name);
                setValue("price", foundProduct.price);
            }
        }
    }, [params.id, products, setValue])

    const handleCancel = () => {
        if (params.id) {
            navigate('/products/')
        } else {
            setValue("name", "")
            setValue("price", 0)
        }
    }


    return (
        <div className='grid place-items-center gap-5 my-10 w-full'>
            <form className='flex flex-col justify-center gap-5 bg-white rounded-md shadow-md sm:p-10 md:p-20' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-3 justify-center '>
                    <h1 className="text-3xl text-primary font-bold text-center">
                        Register Product
                    </h1>
                    <p className='text-xl font-light text-center text-gray-500'>Product management for your orders</p>
                </div>

                <div className='grid place-items-center my-3'>
                    <IconButton placeholder="" color="blue" onClick={() => navigate('/products')}>
                        <IoReturnUpBackSharp size={20} color="white" />
                    </IconButton>
                </div>
                <div className='flex flex-col justify-start gap-2'>
                    <label className='text-start text-base font-bold'>Product name</label>
                    <input
                        className='p-2 rounded-md shadow-md text-gray-800 w-full'
                        placeholder="Cookies..."
                        type='text'
                        required={true}
                        id='name'
                        {...register('name')}
                    />
                    {errors.name?.message && (<p className='text-md text-red-400 font-light'>{errors.name?.message}</p>)}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-start text-base font-bold'>Price of product</label>
                    <input
                        className=' p-2 rounded-md w-full shadow-md text-slate-800'
                        placeholder="Product's Price"
                        type='number'
                        id='price'
                        required={true}
                        {...register('price', { valueAsNumber: true })}
                    />
                    {errors.price?.message && (<p className='text-md text-red-400 font-light'>{errors.price?.message}</p>)}
                </div>
                <div className='flex flex-row justify-center gap-5'>
                    <Button placeholder="" className='bg-primary' type='submit'>SAVE</Button>
                    <Button placeholder="" className='bg-details' type='button' onClick={handleCancel}>CANCEL</Button>
                </div>
            </form>
        </div>
    )
}
