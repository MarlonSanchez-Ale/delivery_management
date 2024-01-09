import { useEffect, useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, IconButton, Card, List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Order, OrderProduct } from "../../../../interfaces/Index";
import { useAppSelector, useAppDispatch } from "../../../../app/features/service/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderShema } from "../../../schema/OrderShema";
import { addOrder } from "../../../../app/features/orders/OrderSlice";
import { v4 } from "uuid";
import { IoReturnUpBackSharp } from "react-icons/io5";
import ProductSelect from "./ProductSelect";
import { FaRegTrashAlt } from "react-icons/fa";
import { AlertContext } from "../../../../app/AlertWrapper/Context/AlertContext";

export default function OrderCreate() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Order>({
        resolver: zodResolver(OrderShema),
        defaultValues: {
            idOrder: "",
            product: [],
            customer: "",
            dateOrder: "",
            timeOrder: "",
            address: "",
            phone: "",
            details: "",
        }
    });
    const { alertSuccess, alertError } = useContext(AlertContext)
    const [orderProduct, setOrderProduct] = useState<OrderProduct[]>([]);
    const products = useAppSelector(state => state.ProductManager)
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [viewDetails, setViewDetails] = useState<boolean>(false)

    useEffect(() => {
        if (orderProduct.length) {
            setViewDetails(true)
        } else {
            setViewDetails(false)
        }
    }, [orderProduct, viewDetails])


    const onSubmit: SubmitHandler<Order> = (data) => {

        try {
            if (orderProduct.length) {
                const dataWithoutId = { ...data };
                dataWithoutId.idOrder = v4();
                dataWithoutId.product = orderProduct;
                dispatch(addOrder({
                    ...dataWithoutId,
                    status: "NOT START"
                }))
                alertSuccess({
                    title: 'Order created',
                    text: 'Successfully registered order',
                })
                handleCancel()
            }
            else {
                alertError({
                    title: 'Update Error',
                    text: "Failed create, "
                })
            }
        } catch (error) {
            alertError({
                title: 'Update Error',
                text: `Failed update: ${error}`
            })
        }

    }

    const handleCancel = () => {
        if (params.id) {
            navigate('/')
        } else {
            setValue("product", [])
            setValue("customer", "")
            setValue("dateOrder", "")
            setValue("timeOrder", "")
            setValue("address", "")
            setValue("phone", "")
            setValue("details", "")
            setOrderProduct([])
        }
    }

    const addToOrder = (productName: string, price: number) => {
        const existingItemIndex = orderProduct.findIndex(item => item.name === productName);

        if (existingItemIndex !== -1) {
            const updatedOrder = [...orderProduct];
            updatedOrder[existingItemIndex].quantity += 1;
            setOrderProduct(updatedOrder);
        } else {
            setOrderProduct(prevOrder => [...prevOrder, { name: productName, quantity: 1, total: price }]);
        }
    };

    const SubtractingOrder = (productName: string, price: number) => {
        const existingItemIndex = orderProduct.findIndex(item => item.name === productName);

        if (existingItemIndex !== -1) {
            const updateOrder = [...orderProduct];
            if (updateOrder[existingItemIndex].quantity > 1) {
                updateOrder[existingItemIndex].quantity -= 1
                setOrderProduct(updateOrder)
            } else {
                const updateOrder = orderProduct.filter(item => item.name !== productName);
                setOrderProduct(updateOrder);
            }

        } else {
            setOrderProduct(prevOrder => [...prevOrder, { name: productName, quantity: 1, total: price }]);
        }
    }

    const removeFromOrder = (name: string) => {
        const updatedOrder = orderProduct.filter((item) => item.name !== name);
        setOrderProduct(updatedOrder);
    };

    return (
        <div className='grid place-items-center p-10 gap-5 w-full'>
            <form className='flex flex-col justify-center gap-10 w-full bg-white p-10 rounded-md shadow-md' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-3 justify-center '>
                    <h1 className="text-3xl text-primary font-bold underline text-center">
                        Register Orders
                    </h1>
                    <p className=' text-xl font-light text-gray-600 text-center'>Product management for your orders</p>
                </div>

                <div className='grid place-items-center '>
                    <IconButton placeholder="" color="blue" onClick={() => navigate('/')}>
                        <IoReturnUpBackSharp size={20} color="white" />
                    </IconButton>
                </div>



                <div className="flex justify-center sm:flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor='customer' className='text-start text-base font-bold'>Customer</label>
                        <input
                            className=' p-2 rounded-md w-full shadow-md text-slate-800'
                            placeholder="Juan Perez"
                            type='text'
                            id='customer'
                            required={true}
                            {...register('customer')}
                        />
                        {errors.customer?.message && (<p className='text-md text-red-400 font-light'>{errors.customer?.message}</p>)}
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor='address' className='text-start text-base font-bold'>Address</label>
                        <input
                            className='p-2 rounded-md w-full shadow-md text-slate-800'
                            placeholder="Parque central 2 cuadras al este..."
                            type='text'
                            id='address'
                            required={true}
                            {...register("address")}
                        />
                        {errors.address?.message && (<p className='text-md text-red-400 font-light'>{errors.address?.message}</p>)}
                    </div>

                </div>

                <div className="flex justify-center gap-3 sm:flex-col md:flex-row">
                    <div className='flex flex-col w-full'>
                        <label htmlFor='dateOrder' className='text-start text-base font-bold'>Delivery date</label>
                        <input
                            className='p-2 rounded-md w-full shadow-md text-slate-800'
                            placeholder="12/12/23"
                            type='date'
                            id='dateOrder'
                            required={true}
                            {...register('dateOrder')}
                        />
                        {errors.dateOrder?.message && (<p className='text-md text-red-400 font-light'>{errors.dateOrder?.message}</p>)}
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor='timeOrder' className='text-start text-base font-bold'>Delivery time</label>
                        <input
                            className='p-2 rounded-md w-full shadow-md text-slate-800'
                            placeholder="04:52 pm"
                            type='time'
                            id='timeOrder'
                            required={true}
                            {...register('timeOrder')}
                        />
                    </div>
                </div>

                <div className='flex justify-center gap-3 sm:flex-col md:flex-row'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='phone' className='text-start text-base font-bold'>Phone</label>
                        <input
                            className='p-2 rounded-md w-full shadow-md text-slate-800'
                            placeholder="88888888"
                            type='tel'
                            id='phone'
                            pattern="[0-9]{8}"
                            required={true}
                            {...register('phone', { valueAsNumber: false })}
                        />
                        {errors.phone?.message && (<p className='text-md text-red-400 font-light'>{errors.phone?.message}</p>)}

                    </div>

                    <div className='flex  flex-col w-full'>
                        <label htmlFor='details' className='text-start text-base font-bold '>Delivery details</label>
                        <input
                            className='p-2 rounded-md w-full shadow-md text-slate-800'
                            placeholder="Casa color verde."
                            type='text'
                            id='details'
                            required={true}
                            {...register('details')}
                        />
                        {errors.details?.message && (<p className='text-md text-red-400 font-light'>{errors.details?.message}</p>)}

                    </div>
                </div>

                <ProductSelect products={products} onAddToOrder={addToOrder} onSubtracttoOrder={SubtractingOrder} />

                <div className='flex flex-row justify-center gap-5'>
                    <Button placeholder="" className='bg-primary' type='submit'>SAVE</Button>
                    <Button placeholder="" className='bg-details' type='button' onClick={handleCancel}>CANCEL</Button>
                </div>
            </form >

            {viewDetails && (
                <Card placeholder="" className="w-full border p-4 mb-4">
                    <h2>Product's Details</h2>
                    <List placeholder="">
                        {orderProduct.map((item, index) => (
                            <ListItem placeholder="" ripple={false} className="py-1 pr-1 pl-4" key={index}>
                                <div className='flex flex-row justify-between gap-10'>
                                    <h2 className='font-semibold text-center'>{item.name}</h2>
                                    <p className=''>Quantity: {item.quantity}</p>
                                    <p className=''>Total: ${(item.quantity * item.total).toFixed(2)}</p>
                                </div>
                                <ListItemSuffix placeholder="">
                                    <IconButton placeholder="" variant="text" color="blue-gray" onClick={() => removeFromOrder(item.name)}>
                                        <FaRegTrashAlt size={20} />
                                    </IconButton>
                                </ListItemSuffix>
                            </ListItem>

                        ))}
                    </List>
                </Card>
            )}
        </div>
    );
}