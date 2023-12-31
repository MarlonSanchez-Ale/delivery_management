import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "../../../interfaces/Index";
import { useAppSelector, useAppDispatch } from "../../../app/features/service/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderShema } from "../../schema/OrderShema";
import { addOrder, editOrder } from "../../../app/features/orders/OrderSlice";
import { v4 } from "uuid";


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
    const orders = useAppSelector(state => state.OrderManager.items)
    const products = useAppSelector(state => state.ProductManager)
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    function convertirFechaParaInputDate(fechaString: string): string {
        // Parsea el string a un objeto Date
        const fecha = new Date(fechaString);

        // Obtiene los componentes de la fecha
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
        const day = String(fecha.getDate()).padStart(2, '0');

        // Formatea la fecha en el formato yyyy-MM-dd
        const fechaFormateada = `${year}-${month}-${day}`;

        return fechaFormateada;
    }

    useEffect(() => {
        if (params.id) {
            const foundProduct = orders?.find((p) => p.idOrder === params?.id);

            if (foundProduct) {
                setValue("idOrder", foundProduct.idOrder)
                setValue("product", foundProduct.product)
                setValue("customer", foundProduct.customer);
                setValue("dateOrder", convertirFechaParaInputDate(foundProduct.dateOrder));
                setValue("timeOrder", foundProduct.timeOrder);
                setValue("address", foundProduct.address);
                setValue("phone", foundProduct.phone);
                setValue("details", foundProduct.details);
            }
        }
    }, [params.id, orders, setValue])

    const onSubmit: SubmitHandler<Order> = (data) => {
        if (params.id) {
            const dataWithoutId = { ...data };
            dataWithoutId.idOrder = params.id;
            dispatch(editOrder({
                ...dataWithoutId
            }))
            navigate('/')
        } else {
            const dataWithoutId = { ...data };
            dataWithoutId.idOrder = v4();
            dispatch(addOrder({
                ...dataWithoutId,
                status: "REGISTERED"
            }))
            navigate('/')
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
        }
    }



    return (
        <div className='grid place-items-center p-10 gap-5 w-full'>
            <div className='flex flex-col gap-3 justify-center '>
                <h1 className="text-3xl text-primary font-bold underline text-center">
                    Register Product
                </h1>
                <p className=' text-xl font-light text-gray-600'>Product management for your orders</p>
            </div>

            <div className='grid place-items-center p-5'>
                <Button placeholder="" variant="outlined" onClick={() => navigate('/')}>Back to list</Button>
            </div>

            <form className='flex flex-col justify-center gap-5 w-auto bg-gray-300 p-10 rounded-md shadow-md' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-center gap-3 sm:flex-col md:flex-row'>
                    <div className='flex flex-col justify-center w-full'>
                        <label htmlFor="product" className='text-start text-base font-bold'>Products</label>
                        <select id="product" title='Select' className="p-2 rounded-md shadow-md"  {...register('product')}>
                            <option>Select...</option>
                            {products && products.map(({ idProduct, name, price }, index) => (
                                <option key={index} value={idProduct}>{`${name} - ${price}C$`}</option>
                            ))}
                        </select>
                        {errors.product?.message && (<p className='text-md text-red-400 font-light'>{errors.product?.message}</p>)}
                    </div>
                </div>

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



                <div className='flex flex-row justify-center gap-5'>
                    <Button placeholder="" className='bg-primary' type='submit'>SAVE</Button>
                    <Button placeholder="" className='bg-details' type='button' onClick={handleCancel}>CANCEL</Button>
                </div>
            </form >
        </div>
    );
}