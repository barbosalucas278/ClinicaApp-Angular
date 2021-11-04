import { Encuesta } from './encuesta';
import { Resenia } from './resenia';

export interface Turno {
  id_turno?: number;
  dia?: string;
  horario?: string;
  estado?: Estados;
  email_paciente?: string;
  nombre_paciente?: string;
  email_especialista?: string;
  nombre_especialista?: string;
  especialidad?: string;
  resenia?: Resenia[];
  encuesta?: Encuesta;
  calificacion?: string;
}
export enum Estados {
  Pendiente = 'pendiente', //gris
  Cancelado = 'cancelado', //rojo//
  Rechazado = 'rechazado', //amarillo
  Aceptado = 'aceptado', //azul
  Tomado = 'tomado', //verde
  Finalizado = 'finalizado', //negro//
}
