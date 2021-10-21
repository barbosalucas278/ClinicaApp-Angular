import { Usuario } from './usuario';

export interface Paciente extends Usuario {
  obraSocial?: string;
}
