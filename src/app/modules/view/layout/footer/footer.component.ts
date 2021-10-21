import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentDate!: Date;
  nombreEmpresa:string;

  constructor() {
    this.nombreEmpresa = environment.nombreEmpresa;
  }

  ngOnInit(): void {
    this.currentDate = new Date();
  }

}
