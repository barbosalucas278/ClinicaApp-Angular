import { Usuario } from './usuario';

export interface Especialista extends Usuario {
  especialidad?: string[];
  aprobado?:boolean;
}
