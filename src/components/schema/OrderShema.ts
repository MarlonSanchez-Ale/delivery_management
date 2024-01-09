import { z } from 'zod'
import { DateValidate } from '../../app/Validation/Validation';

export const OrderShema = z.object({
    customer: z.string({
        required_error: "Customer is required"
    })
        .min(3, { message: "Customer must be at least 3 characters long" })
        .max(200, { message: "Customer must be less 200 characters long" })
        .refine(value => isNaN(parseFloat(value)), {
            message: "Customer name cannot be a number"
        }),
    dateOrder: z.string({
        required_error: "Please select a date",
    })
        .transform(value => new Date(value))
        .refine(value => DateValidate(value), {
            message: "Your date is not valid"
        }),
    timeOrder: z.string({
        required_error: "Time of delivery is required"
    }),
    address: z.string({
        required_error: "Address is required"
    })
        .min(5, { message: "Customer must be at least 5 characters long" })
        .max(200, { message: "Customer must be less 200 characters long" })
        .refine(value => isNaN(parseFloat(value)), {
            message: "Customer name cannot be a number"
        }),
    phone: z.string({
        required_error: "Phone is required"
    }),
    details: z.string({
        required_error: "Details is required"
    })
        .min(3, {
            message: "Product's name must be at least 3 characters long"
        })
        .max(200, {
            message: "Product's name must be less 200 characters long"
        }),
})
