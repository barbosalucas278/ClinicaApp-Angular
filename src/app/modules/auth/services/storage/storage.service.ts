import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { map } from '@firebase/util';
import { Observable } from 'rxjs';
import { Encuesta } from 'src/app/modules/clases/encuesta';
import { Especialidad } from 'src/app/modules/clases/especialidad';
import { HistoriaClinica } from 'src/app/modules/clases/historia-clinica';
import { HistoriaEspecifica } from 'src/app/modules/clases/historia-especifica';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Resenia } from 'src/app/modules/clases/resenia';
import { Turno } from 'src/app/modules/clases/turno';
import { isToken } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private nombreColeccion: string;
  private especialidadesRef: AngularFirestoreCollection;
  private turnosRef: AngularFirestoreCollection;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.nombreColeccion = 'usuarios-temp';
    this.especialidadesRef = this.db.collection('especialidades');
    this.turnosRef = this.db.collection('turnos');
  }
  /**
   * Funcion para subir archivos al storage de firebase
   * @param file Archivos
   * @param dni Dni dle usuario relacionado al archivo
   * @returns
   */
  uploadFilePublic(file: File, dni: string): AngularFireUploadTask {
    const nombreArchivo = `${this.nombreColeccion}/${dni}-${Date.now()}`;
    const ref = this.storage.ref(nombreArchivo);
    return ref.put(file);
  }

  getEspecialidades() {
    return this.especialidadesRef.valueChanges() as Observable<Especialidad[]>;
  }
  /**
   * Trae una lista de turnos segun el email del especialista por especialidad
   * @param emailEspecialialista email del especialista
   * @returns lista de turnos del especialista
   */
  getTurnosByEspecialidad(emailEspecialialista: string, especialidad: string) {
    const turnosFiltrados = this.db.collection('turnos', (ref) =>
      ref
        .where('email_especialista', '==', `${emailEspecialialista}`)
        .where('especialidad', '==', `${especialidad}`)
    );
    return turnosFiltrados.valueChanges() as Observable<Turno[]>;
  }
  /**
   * Trae una lista de turnos segun el email del especialista
   * @param emailEspecialialista email del especialista
   * @returns lista de turnos del especialista
   */
  getTurnosByEspecialista(emailEspecialialista: string) {
    const turnosFiltrados = this.db.collection('turnos', (ref) =>
      ref.where('email_especialista', '==', `${emailEspecialialista}`)
    );
    return turnosFiltrados.valueChanges() as Observable<Turno[]>;
  }
  /**
   * Trae un array con el ultimo tunro sacado
   * @returns array ocn el ultimo turno
   */
  getUltimoTurno() {
    const turnosFiltrados = this.db.collection('turnos', (ref) =>
      ref.orderBy('id_turno', 'desc').limit(1)
    );
    return turnosFiltrados.valueChanges() as Observable<Turno[]>;
  }
  /**
   * Trae una lsta con los turno dle paciente ingresado el email
   * @param emailPaciente email del paciente
   * @returns
   */
  getTurnosByPaciente(emailPaciente: string) {
    const turnosFiltrados = this.db.collection('turnos', (ref) =>
      ref.where('email_paciente', '==', `${emailPaciente}`)
    );
    return turnosFiltrados.valueChanges() as Observable<Turno[]>;
  }
  /**
   * Crea un turno nuevo
   * @param turno nuevo turno
   * @returns
   */
  createTurno(turno: Turno) {
    return this.turnosRef.doc(`${turno.id_turno}`).set({ ...turno });
  }

  updateEstadoDeUnTurno(estado: string, turno_id: number, resenia?: Resenia[]) {
    const currentUsuario = this.db.doc(`turnos/${turno_id}`);
    const reseniaAGuardar = resenia ? resenia : [];
    return currentUsuario.update({ estado: estado, resenia: reseniaAGuardar });
  }
  guardarEncuestaTurno(id_turno: number, encuesta: Encuesta) {
    const currentUsuario = this.db.doc(`turnos/${id_turno}`);
    return currentUsuario.update({ encuesta: encuesta });
  }
  guardarCalificacionTurno(id_turno: number, calificacion: string) {
    const currentUsuario = this.db.doc(`turnos/${id_turno}`);
    return currentUsuario.update({ calificacion: calificacion });
  }
  guardarEstadoHistoriaClinicaEnTurno(
    id_turno: number,
    historiaClinica: HistoriaClinica
  ) {
    const currentUsuario = this.db.doc(`turnos/${id_turno}`);
    return currentUsuario.update({
      historiaClinicaCargada: true,
      historiaClinica: historiaClinica,
    });
  }
  getTurnos() {
    const turnosFiltrados = this.db.collection('turnos', (ref) =>
      ref.limit(25).orderBy('dia', 'desc')
    );
    return turnosFiltrados.valueChanges() as Observable<Turno[]>;
  }

  guardarHistoriaClinica(
    email_paciente: string,
    historiaClinica: HistoriaClinica
  ) {
    const currentUsuario = this.db.doc(`usuarios/${email_paciente}`);
    let historiasEspecificasCurrent: HistoriaEspecifica[] = [];
    const pacienteObservable =
      currentUsuario.valueChanges() as Observable<Paciente>;
    pacienteObservable.subscribe((p) => {
      historiasEspecificasCurrent = p.historiaClinica?.historiasEspecificas
        ? p.historiaClinica?.historiasEspecificas!.filter(
            (e) =>
              !historiaClinica.historiasEspecificas?.some(
                (es) => es.especialidad == e.especialidad
              )
          )
        : [];
      historiasEspecificasCurrent.push(
        ...historiaClinica.historiasEspecificas!
      );
    });
    setTimeout(() => {
      return currentUsuario.update({
        historiaClinica: {
          altura: historiaClinica.altura,
          peso: historiaClinica.peso,
          presion: historiaClinica.presion,
          temperatura: historiaClinica.temperatura,
          historiasEspecificas: historiasEspecificasCurrent,
        },
      });
    }, 1000);
  }
}
