interface UniqueIdentifier {
    idOrder: string; // o el tipo correcto de tu id
  }
export interface Order extends UniqueIdentifier{
    product?: OrderProduct[];
    customer: string;
    dateOrder: string;
    timeOrder:  string;
    address: string;
    phone: string;
    details: string;
    status: string;
}

export interface OrderProduct {
    idProduct?: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Product {
    idProduct?: string;
    name: string;
    price: number;
}