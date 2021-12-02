import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Label, SingleDataSet } from 'ng2-charts';
import { AnimateGallery } from 'src/app/animations';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Especialidad } from 'src/app/modules/clases/especialidad';
import { LogAcceso } from 'src/app/modules/clases/log-acceso';
import { Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
  animations: [AnimateGallery],
})
export class InformesComponent implements OnInit {
  turnos: Turno[] = [];
  especialidades: Especialidad[] = [];
  ingresos: LogAcceso[] = [];
  showIngresos: boolean = false;
  showTurnosPorEspecialidad: boolean = false;
  showTurnosPorDia: boolean = false;
  showTurnosPorMedico: boolean = false;
  showTurnosFinalizadosPorMedico: boolean = false;
  fechaDesdeInput?: string = '';
  fechaHastaInput?: string = '';
  //Grafico de lineas
  chartDataSets: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  showTurnosPordiaHighCharts: boolean = false;
  constructor(
    private storageService: StorageService,
    private usuariosService: UsuarioService
  ) {
    this.ocultarTodosLosGraficos();
    this.cargarTurnos();
    this.cargarEspecialidades();
    this.cargaringresos();
    this.onShowIngresos();
  }
  cargarTurnos() {
    this.storageService.getTurnos().subscribe((T) => {
      setTimeout(() => {
        this.turnos = [];
        this.turnos = T;
      }, 500);
    });
  }
  cargarEspecialidades() {
    this.storageService.getEspecialidades().subscribe((e) => {
      setTimeout(() => {
        this.especialidades = e;
      }, 500);
    });
  }
  cargaringresos() {
    this.usuariosService.obtenerIngresos().subscribe((i) => {
      this.ingresos = [];
      this.ingresos = i;
      this.ingresos.sort(function (a: LogAcceso, b: LogAcceso) {
        const diaA = moment(`${a.dia} ${a.horario}`, 'DD-MM hh:mm');
        const diaB = moment(`${b.dia} ${b.horario}`, 'DD-MM hh:mm');
        let ret = -1;
        if (diaB.diff(diaA) >= 0) {
          ret = 1;
        }

        return ret;
      });
    });
  }
  ocultarTodosLosGraficos() {
    this.showIngresos = false;
    this.showTurnosPorEspecialidad = false;
    this.showTurnosPorDia = false;
    this.showTurnosPorMedico = false;
    this.showTurnosFinalizadosPorMedico = false;
    this.showTurnosPordiaHighCharts = false;

    this.resetearPArametrosGraficos();
  }
  resetearPArametrosGraficos() {
    this.chartDataSets = [];
    this.chartLabels = [];
  }
  filtrarTurnos() {}
  ngOnInit(): void {}
  onShowIngresos() {
    this.ocultarTodosLosGraficos();
    this.showIngresos = true;
  }
  onShowTurnosPorEspecialidad() {
    this.ocultarTodosLosGraficos();
    this.especialidades.forEach((e) => {
      let label: Label = e.detalle!;
      this.chartLabels.push(label);
    });
    const datos: ChartDataSets = { data: [] };
    for (const especialidad of this.chartLabels) {
      let cantidad = 0;
      this.turnos.forEach((element) => {
        if (element.especialidad === especialidad) {
          cantidad++;
        }
      });
      datos.data?.push(cantidad);
    }

    this.setTortaDataSet(datos);
    this.showTurnosPorEspecialidad = true;
  }
  onShowTurnosPorDia() {
    this.ocultarTodosLosGraficos();
    this.fechaDesdeInput = undefined;
    this.fechaHastaInput = undefined;

    this.calcularPeriodoDeDias();

    const turnosFiltrados = this.turnos.filter(
      (T) =>
        moment(T.dia, 'DD-MM') >= moment(this.fechaDesdeInput, 'DD-MM') &&
        moment(T.dia, 'DD-MM') <= moment(this.fechaHastaInput, 'DD-MM')
    );
    const datos: ChartDataSets[] = [];
    for (const dia of this.chartLabels) {
      if (datos.length == 0) {
        let cantidad = 0;
        turnosFiltrados.forEach((element) => {
          if (element.dia === dia) {
            cantidad++;
          }
        });

        datos.push({ label: 'turnos', data: [cantidad] });
      } else {
        let cantidad = 0;
        turnosFiltrados.forEach((element) => {
          if (element.dia === dia) {
            cantidad++;
          }
        });
        datos.find((d) => d.label == 'turnos')?.data?.push(cantidad);
      }
    }

    this.setLineDataSet(datos);
    this.showTurnosPorDia = true;
  }
  onShowTurnosPorDiaHighCharts() {
    this.ocultarTodosLosGraficos();
    this.fechaDesdeInput = undefined;
    this.fechaHastaInput = undefined;

    this.calcularPeriodoDeDias();

    const turnosFiltrados = this.turnos.filter(
      (T) =>
        moment(T.dia, 'DD-MM') >= moment(this.fechaDesdeInput, 'DD-MM') &&
        moment(T.dia, 'DD-MM') <= moment(this.fechaHastaInput, 'DD-MM')
    );
    const datos: ChartDataSets[] = [];
    for (const dia of this.chartLabels) {
      if (datos.length == 0) {
        let cantidad = 0;
        turnosFiltrados.forEach((element) => {
          if (element.dia === dia) {
            cantidad++;
          }
        });

        datos.push({ label: 'turnos', data: [cantidad] });
      } else {
        let cantidad = 0;
        turnosFiltrados.forEach((element) => {
          if (element.dia === dia) {
            cantidad++;
          }
        });
        datos.find((d) => d.label == 'turnos')?.data?.push(cantidad);
      }
    }

    this.setLineDataSet(datos);
    this.showTurnosPordiaHighCharts = true;
  }
  onShowTurnosPorMedico(actualizacion: boolean) {
    this.ocultarTodosLosGraficos();
    if (!actualizacion) {
      this.fechaDesdeInput = undefined;
      this.fechaHastaInput = undefined;
    }
    this.calcularPeriodoDeDias();
    const desde = this.fechaDesdeInput;
    const hasta = this.fechaHastaInput;

    const turnosFiltrados = this.turnos.filter(
      (T) =>
        moment(T.dia, 'DD-MM') >= moment(desde, 'DD-MM') &&
        moment(T.dia, 'DD-MM') <= moment(hasta, 'DD-MM')
    );
    const especialista = [
      ...new Set(turnosFiltrados.map((t) => t.nombre_especialista)),
    ];

    const datos: ChartDataSets[] = [];
    for (const dia of this.chartLabels) {
      for (const doctor of especialista) {
        if (datos.length == 0 || !datos.find((t) => t.label == doctor)) {
          let cantidad = 0;
          turnosFiltrados.forEach((element) => {
            if (element.nombre_especialista == doctor && element.dia === dia) {
              cantidad++;
            }
          });

          datos.push({ label: doctor, data: [cantidad] });
        } else {
          let cantidad = 0;
          turnosFiltrados.forEach((element) => {
            if (element.nombre_especialista == doctor && element.dia === dia) {
              cantidad++;
            }
          });
          datos.find((d) => d.label == doctor)?.data?.push(cantidad);
        }
      }
    }

    this.setLineDataSet(datos);
    this.showTurnosPorMedico = true;
  }
  onPeriodoChange($event: any) {
    if ($event.target.id == 'desde') {
      const desdeFormateado: string[] = $event.target.value
        .split('-')
        .filter((f: any) => f.length == 2);
      this.fechaDesdeInput = desdeFormateado.reverse().join('-');
    } else {
      const hastaFormateado: string[] = $event.target.value
        .split('-')
        .filter((f: any) => f.length == 2);
      this.fechaHastaInput = hastaFormateado.reverse().join('-');
    }

    if (this.showTurnosPorMedico) {
      this.onShowTurnosPorMedico(true);
    } else {
      this.onShowTurnosFinalizadosPorMedico(true);
    }
  }
  onShowTurnosFinalizadosPorMedico(actualizacion: boolean) {
    this.ocultarTodosLosGraficos();
    if (!actualizacion) {
      this.fechaDesdeInput = undefined;
      this.fechaHastaInput = undefined;
    }
    this.calcularPeriodoDeDias();
    const desde = this.fechaDesdeInput;
    const hasta = this.fechaHastaInput;

    const turnosFiltrados = this.turnos.filter(
      (T) =>
        moment(T.dia, 'DD-MM') >= moment(desde, 'DD-MM') &&
        moment(T.dia, 'DD-MM') <= moment(hasta, 'DD-MM')
    );
    const especialista = [
      ...new Set(turnosFiltrados.map((t) => t.nombre_especialista)),
    ];

    const datos: ChartDataSets[] = [];
    for (const dia of this.chartLabels) {
      for (const doctor of especialista) {
        if (datos.length == 0 || !datos.find((t) => t.label == doctor)) {
          let cantidad = 0;
          turnosFiltrados.forEach((element) => {
            if (
              element.nombre_especialista == doctor &&
              element.dia === dia &&
              element.estado == 'finalizado'
            ) {
              cantidad++;
            }
          });

          datos.push({ label: doctor, data: [cantidad] });
        } else {
          let cantidad = 0;
          turnosFiltrados.forEach((element) => {
            if (
              element.nombre_especialista == doctor &&
              element.dia === dia &&
              element.estado == 'finalizado'
            ) {
              cantidad++;
            }
          });
          datos.find((d) => d.label == doctor)?.data?.push(cantidad);
        }
      }
    }

    this.setLineDataSet(datos);
    this.showTurnosFinalizadosPorMedico = true;
  }
  setLineDataSet(datos: ChartDataSets[]) {
    this.chartDataSets = datos;
  }

  setBarDataSet(datos: ChartDataSets) {
    this.chartDataSets.push(datos);
  }
  setTortaDataSet(datos: ChartDataSets) {
    this.chartDataSets.push(datos);
  }
  calcularPeriodoDeDias() {
    if (this.chartLabels.length == 0) {
      const fechaDeHoy = moment();
      const fechaHastaDefault = moment(
        fechaDeHoy.format('DD-MM-yyyy'),
        'DD-MM-yyyy'
      ).add(15, 'days');
      const fechaHasta =
        this.fechaHastaInput != undefined
          ? moment(this.fechaHastaInput!, 'DD-MM')
          : fechaHastaDefault;
      const fechaDesde =
        this.fechaDesdeInput != undefined
          ? moment(this.fechaDesdeInput!, 'DD-MM')
          : fechaDeHoy.subtract(15, 'day');
      this.fechaDesdeInput = fechaDesde.format('yyyy-MM-DD');
      this.fechaHastaInput = fechaHasta.format('yyyy-MM-DD');

      while (fechaDesde <= fechaHasta) {
        let label: Label = fechaDesde.format('DD-MM');
        this.chartLabels.push(label);
        fechaDesde.add(1, 'day');
      }
    }
  }
}
