import { Usuario } from './usuario';

export interface LogAcceso {
  usuario?: Usuario;
  dia?: string;
  horario?: string;
}
