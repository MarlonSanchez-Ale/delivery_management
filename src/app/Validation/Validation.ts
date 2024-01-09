
export const DateValidate = (dateOrder: Date): boolean => {
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