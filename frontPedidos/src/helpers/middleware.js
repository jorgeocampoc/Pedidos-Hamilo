
import { alertConfirm } from './alerts';
const token = localStorage.getItem('token') || '';


export const verificaToken = (route)=>{
    if(token == '' || token == null){
        alertConfirm('Token expirado!!', '', 'warning','Iniciar sesion',route);
    }
} 