import { AlertContext, TypeAlert } from "../Context/AlertContext"
import Swal from "sweetalert2"

type Props = {
    children: React.ReactNode;
}

const AlertProvider = ({ children }: Props) => {

    const showAlert = async (options: TypeAlert) => {
        const {
            title,
            text,
            icon = 'success',
            confirmButtonText,
            showDenyButton,
            timer,
            denyButtonText = 'Cerrar',
            backdrop = true,
        } = options;

        return await Swal.fire({
            title,
            text,
            icon,
            confirmButtonText,
            confirmButtonColor: "#3085d6",
            denyButtonColor: "#808080",
            denyButtonText,
            showDenyButton,
            timer,
            backdrop,
            timerProgressBar: true,
        });
    };

    const alertSuccess = async (data: TypeAlert) => {
        return await showAlert({
            ...data,
            icon: 'success',
            confirmButtonText: data.confirmButtonText ?? 'Aceptar',
            backdrop: data.backdrop
        })
    }

    const alertError = async (data: TypeAlert) => {
        return await showAlert({
            ...data,
            icon: 'error',
            confirmButtonText: data.confirmButtonText ?? 'Aceptar',
            backdrop: data.backdrop
        })
    }

    const alertInfo = async (data: TypeAlert) => {
        return await showAlert({
            ...data,
            icon: 'info',
            confirmButtonText: data.confirmButtonText ?? 'Aceptar',
            backdrop: data.backdrop
        })
    }

    const alertWarning = async (data: TypeAlert) => {
        return await showAlert({
            ...data,
            icon: 'warning',
            confirmButtonText: data.confirmButtonText ?? 'Aceptar',
            backdrop: data.backdrop
        })
    }

    return (
        <AlertContext.Provider value={{ showAlert, alertSuccess, alertError, alertInfo, alertWarning }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider;