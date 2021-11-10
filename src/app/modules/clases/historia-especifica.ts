import { Especificacion } from './especificacion';

export interface HistoriaEspecifica {
  especialidad?: string;
  especificaciones: Especificacion[];
  especialista?: string;
  fecha?: string;
}
