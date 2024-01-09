import { createContext } from "react";
import { SweetAlertResult } from 'sweetalert2';

export type TypeAlert = {
    title: string;
    text?: string;
    icon?: "success" | "error" | "warning" | "info" | "question";
    confirmButtonText?: string;
    showDenyButton?: boolean;
    timer?: number
    denyButtonText?: string;
    backdrop?: boolean;
};


export type TypeContext = {
    alertSuccess: (alert: TypeAlert) => Promise<SweetAlertResult<any>>;
    alertWarning: (alert: TypeAlert) => Promise<SweetAlertResult<any>>;
    alertError: (alert: TypeAlert) => Promise<SweetAlertResult<any>>;
    showAlert: (alert: TypeAlert) => Promise<SweetAlertResult<any>>;
    alertInfo: (alert: TypeAlert) => Promise<SweetAlertResult<any>>;
}

export const AlertContext = createContext<TypeContext>({} as TypeContext); 