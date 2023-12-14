export interface Order {
    idOrder?: string;
    idProduct?: string;
    quantity: number;
    customer: string;
    address: string;
    phone: string;
    details: string;
    status: boolean;
}

export interface Product {
    idProduct?: string;
    name: string;
    price: number;
}