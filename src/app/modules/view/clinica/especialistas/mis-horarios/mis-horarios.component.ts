import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { Especialidad } from 'src/app/modules/clases/especialidad';
import { Especialista } from 'src/app/modules/clases/especialista';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss'],
})
export class MisHorariosComponent implements OnInit {
  @Input() especialista!: Especialista;
  listaDeEspecialidades: Especialidad[] = [];
  constructor(private userService: UsuarioService) {}
  ngOnInit(): void {
    this.listaDeEspecialidades = [];
    this.listaDeEspecialidades.push(...this.especialista.especialidad!);
  }
  onHorarioEstablecido(especialidadEstablecida: Especialidad) {
    this.userService.actualizarDisponibilidadHorariaEspecialista(
      this.especialista.email!,
      especialidadEstablecida
    );
  }
}
