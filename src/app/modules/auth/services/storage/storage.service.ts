import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Especialidad } from 'src/app/modules/clases/especialidad';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private nombreColeccion: string;
  private especialidadesRef: AngularFirestoreCollection;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.nombreColeccion = 'usuarios-temp';
    this.especialidadesRef = this.db.collection('especialidades')
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

  getEspecialidades(){
    return this.especialidadesRef.valueChanges() as Observable<Especialidad[]>
  }
}
