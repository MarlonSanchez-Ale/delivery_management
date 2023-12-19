export interface Order {
    idOrder?: string;
    product?: string;
    quantity: number;
    customer: string;
    dateOrder: string;
    timeOrder:  string;
    address: string;
    phone: number;
    details: string;
    status: boolean;
}

export interface Product {
    idProduct?: string;
    name: string;
    price: number;
}