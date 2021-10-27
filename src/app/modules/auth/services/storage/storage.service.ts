import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private nombreColeccion: string;
  constructor(private storage: AngularFireStorage) {
    this.nombreColeccion = 'usuarios-temp';
  }
  uploadFilePublic(file: File, dni: string): AngularFireUploadTask {
    const nombreArchivo = `${this.nombreColeccion}/${dni}-${Date.now()}`;
    const ref = this.storage.ref(nombreArchivo);
    return ref.put(file);
  }
}
