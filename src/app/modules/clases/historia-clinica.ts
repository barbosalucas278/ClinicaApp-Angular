import { HistoriaEspecifica } from './historia-especifica';

export interface HistoriaClinica {
  altura?: string;
  peso?: string;
  temperatura?: string;
  presion?: string;
  historiasEspecificas?: HistoriaEspecifica[];
}
