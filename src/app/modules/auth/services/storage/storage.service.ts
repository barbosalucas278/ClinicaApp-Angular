import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}
  uploadFilePublic(file: File): AngularFireUploadTask {
    const nombreArchivo = `usuarios-temp/temp-${file.name}`;
    const ref = this.storage.ref(nombreArchivo);
    return ref.put(file);
  }
}
