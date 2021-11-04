# ClinicaApp

Proyecto final par ala materia Laboratorio de Programación IV de la Universidad Tecnológica Nacional, Facultad Regional Avellaneda

Es una aplicación donde se puede gestionar usuarios de una clínica médica. Esos usuarios pueden ser Pacientes, Especialistas o Administradores, cada uno tiene un acceso diferente segun permisos al sistema.

## Registro

Para poder registrarse al sistema como paciente o especialista, debemos acceder desde el menu principal a el boton `Registrarse`, luego seguir los pasos que el formulario tiene para completar. El mismo se encuentra validado y especificado claramente lo que se necesita en cada campo.

## Ingresar

Para poder ingresar al sistema, debemos ingresar nuestro email y contraseña en el menu principal, priviamente nos llegará un email de confirmación de cuenta que debemos activar desde nuestra cuenta accediendo a nuestro correo electrónico y haciendo click al link que nos llega por correo electrónico. 
Si usted es un especialista, debe esperar la aprobación de un administrador del sistema para poder ingresar.

El sistema cuenta con un sistema de `Acceso Rápido` con le cual puede ingresar al sistema para poder probar las funcionalidades hasta el momento agregadas.

# Ingresando como Paciente

## Vista Mi Perfil

En esta sección se encontraran con su perfil de usuario, mostrando algunos datos relevantes al usuario.

## Vista Mis Turnos

- En esta vista, podrán visualizar los turnos que corresponden al usuario paciente ingresado.
- El botón `Solicitar Turno` nos proporciona la funcionalidad de solicitar un turno.
  - Para poder completar el formulario de solicitud de turno debemos seguir los pasos descendentemente.
  - Primero elijo la Especialidad.
  - Segundo elijo el Especialista relaiconado a esa especialidad.
  - Tercero elijo el Horario y el Día según la disponibilidad del especialista.
  - `Los campos no son editables.`
  - `Para elejir o cambiar los campos del formulario debemos hacer click en el boton verde que se encuentra al lado de cada campo.`
  - Con el boton `Volver a Mis Turnos` volvemos a la vista principal de turnos.

# Ingresando como especialista

## Vista Mi Perfil

- En esta sección se encontraran con su perfil de usuario, mostrando algunos datos relevantes al usuario.
- Tambien contraremos `Mis Horarios` donde podremos establecer la disponibilidad horarios que tenemos en nuestras especialidades, establecemos el horario y luego hacemos click en le botón `Establecer`

## Vista Mis Turnos

- En esta seccion podemos encontrar los distintos turnos que tenemos asociados al especialistas, podemos hacer diferentes acciones:
  - Cancelar un turno: si se encuentra en estado `pendiente`.
  - Rechazar un tunro: si se encuentra en estado `aceptado`.
  - Aceptar un turno: si se encuentra en estado `pendiente`.
  - Finalizar un turno: si se encuentra en estado `tomado`.
  - Ver Reseña de un turno: si este tiene alguna reseña cargada.

# Ingresando como Administrador

## Vista Mi Perfil

- En esta sección se encontraran con su perfil de usuario, mostrando algunos datos relevantes al usuario.

## Vista Usuarios

- En esta sección podemos visualizar una tabla de cada tipo de usuarios filtrandolos por pacientes, especialista o administrador haciendo click en los botonnes con sus respectivos nombre.
- Haciendo click en el boton `Crear usuario` podemos acceder al menú para crear los 3 tipos de usuario que existen en el sistema siguien las mismas indicaciones de registro de un usuario.
- En la visualización de la tabla paciente podemos crear un turno asociado a ese paciente haciendo click en el boton verde que se encuentra en su fila correspondiente al usuario. en la vista de crear un turno el boton `Cancelar` nos redirecciona a la tabla de pacientes anteriormente mostrada.
- En la visualización de la tabla de especialista, podemos habilitar o inhabilitar a cada especialista haciendole click al `check VERDE` para habilitar y a la `cruz roja` para inhabilitar al especialista.

## Vista Turnos

- En esta vista podemos visualizar todos los turnos hasta el momento que se encuentran en el sistema de la clinica.
- Por el momenot la unica acción que puede hacer el administrador es cancelar un turno si este se encuentra en estado `pendiente`.
