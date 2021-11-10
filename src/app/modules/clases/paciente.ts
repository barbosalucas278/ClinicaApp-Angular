import { HistoriaClinica } from './historia-clinica';
import { Usuario } from './usuario';

export interface Paciente extends Usuario {
  obraSocial?: string;
  historiaClinica?: HistoriaClinica;
}
