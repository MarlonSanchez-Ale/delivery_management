"use client"
import { DndContext, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
    Breadcrumbs,
} from "@material-tailwind/react";
import { reorderOrders, setFilter } from '../../../app/features/orders/OrderSlice';
import { useAppDispatch, useAppSelector } from "../../../app/features/service/hooks";
import { Order } from "../../../interfaces/Index";
import CardOrder from './CardOrder';

export default function OrderList() {
    const orders = useAppSelector(state => state.OrderManager.items);
    const itemsArray: (UniqueIdentifier | { id: UniqueIdentifier })[] = orders.map(order => ({
        id: order.idOrder,
        // otras propiedades si es necesario
    }));
    const filter = useAppSelector(state => state.OrderManager.filter)
    const dispatch = useAppDispatch();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    const handleFilter = (filter: string) => {
        dispatch(setFilter(filter))
    }


   

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
                try {
                    if (over && active.id !== over?.id) {
                        const activeIndex = orders.findIndex(({ idOrder }) => idOrder === active.id);
                        const overIndex = orders.findIndex(({ idOrder }) => idOrder === over.id);

                        dispatch(reorderOrders(arrayMove(orders, activeIndex, overIndex)));
                    }
                } catch (error) {
                    console.log('Error during drag end', error)
                }
            }}
        >
            <div className='h-full mt-5'>
                <div className='flex flex-col gap-3 justify-center p-6'>
                    <h1 className="text-3xl text-primary font-bold text-center">
                        Delivery manager
                    </h1>
                    <p className=' text-xl font-light text-center text-gray-500'>Order your deliveries and make the most of your time</p>
                </div>
                <div className='flex justify-center'>
                    <Breadcrumbs placeholder="" className=' shadow-md' fullWidth>
                        <p onClick={() => handleFilter("REGISTERED")}>All</p>
                        <p onClick={() => handleFilter("IN PROCCESS")}>In Process</p>
                        <p onClick={() => handleFilter("COMPLETED")}>Delivered</p>
                    </Breadcrumbs>
                </div>
                <div className='flex flex-col justify-center gap-5 p-5 my-5' >
                    <SortableContext items={itemsArray} >
                        {orders
                            .filter((order) => (filter ? order?.status.includes(filter) : true))
                            .map((order: Order, index: number) => (
                                <CardOrder
                                    key={order.idOrder}
                                    data={order}
                                    index={index}
                                />
                            ))}
                    </SortableContext>
                </div>
            </div>
        </DndContext>
    )
}


/*

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
*/