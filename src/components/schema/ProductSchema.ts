import { z } from 'zod'

export const ProductSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    })
        .min(3, {
            message: "Product's name must be at least 3 characters long"
        })
        .max(200, {
            message: "Product's name must be less 200 characters long"
        })
        .refine(value => isNaN(parseFloat(value)), {
            message: "The name cannot be a number"
        }),
    price: z.number({
        required_error: "Age is required",
    })
        .positive({ message: "Price must be non-zero" })
})