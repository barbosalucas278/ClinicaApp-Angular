import { Especialidad } from './especialidad';
import { Usuario } from './usuario';

export interface Especialista extends Usuario {
  especialidad?: Especialidad[];
  aprobado?:boolean;
}
