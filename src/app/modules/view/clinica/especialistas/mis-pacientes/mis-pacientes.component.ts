import { Component, OnInit } from '@angular/core';
import { AnimateGallery } from 'src/app/animations';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
  animations:[AnimateGallery]
})
export class MisPacientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
