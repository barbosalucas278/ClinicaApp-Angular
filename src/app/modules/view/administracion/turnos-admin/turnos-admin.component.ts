import { Component, OnInit } from '@angular/core';
import { AnimateGallery } from 'src/app/animations';

@Component({
  selector: 'app-turnos-admin',
  templateUrl: './turnos-admin.component.html',
  styleUrls: ['./turnos-admin.component.scss'],
  animations: [AnimateGallery],
})
export class TurnosAdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
