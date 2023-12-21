import { z } from 'zod'

function ValidateDate(dateOrder: Date): boolean {
    // Obtener la fecha actual

    const today = new Date();
    // convertimos en cero toda la hora para evitar de la zona horaria
    today.setHours(0, 0, 0, 0)
    // seteamos los minutos segun la zona horaria para que no nos cambie  la fecha
    dateOrder.setMinutes(dateOrder.getMinutes() + dateOrder.getTimezoneOffset())
    // Comparar la fecha proporcionada con la fecha actual
    if (dateOrder < today) {
        // La fecha proporcionada es menor que la fecha actual
        return false;
    } else {
        // La fecha proporcionada es válida
        return true;
    }
}

export const OrderShema = z.object({
    product: z.string({
        required_error: "Product is required"
    })
        .refine(value => value !== "Select...", {
            message: "You must select a product!"
        }),
    quantity: z.number({
        required_error: "Quantity is required"
    })
        .positive({ message: "Quantity cannot be less than or equal to zero" }),
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
        .refine(value => ValidateDate(value), {
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
