import { AbstractControl } from '@angular/forms';

export class Validaciones {
  static validarNombre(control: AbstractControl) {
    const nombre = control.value;
    if (nombre != null) {
      const tieneEspacio = nombre.split(' ');
      if (tieneEspacio.length > 2) {
        return { nombreInvalido: true };
      }
    }
    return null;
  }
  static validarDni(control: AbstractControl) {
    const dni = control.value;
    if (dni != null) {
      const tieneEspacio = dni.split(' ');
      if (tieneEspacio.length > 1) {
        return { dniInvalido: true };
      }
    }
    return null;
  }
  static validarApellido(control: AbstractControl) {
    const apellido = control.value;
    if (apellido != null) {
      const tieneEspacio = apellido.split(' ');
      if (tieneEspacio.length > 3) {
        return { apellidoInvalido: true };
      }
    }
    return null;
  }
  static validarEmail(control: AbstractControl) {
    const email = control.value;
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const esEmailValido = emailRegex.test(email);
    if (!esEmailValido) {
      return { emailInvalido: true };
    }
    return null;
  }
  static validarImg(control: AbstractControl) {
    if (control.value) {
      const archivos = control.value.split('.');
      const extension = archivos[archivos.length - 1];
      if (extension != 'jpeg' && extension != 'jpg') {
        return { imgInvalida: true };
      }
    }
    return null;
  }
}
