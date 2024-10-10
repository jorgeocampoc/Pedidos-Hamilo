
import { alertConfirm } from './alerts';
const token = localStorage.getItem('token') || '';


const verificaToken = (route) => {
  if (token == '' || token == null) {
    alertConfirm('Token expirado!!', '', 'warning', 'Iniciar sesion', route);
  }
}

export default verificaToken;