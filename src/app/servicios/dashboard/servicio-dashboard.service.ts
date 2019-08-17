import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioDashboardService {
  day: string;
  timbres: number;
  constructor() { }
}

let dataSemanal: ServicioDashboardService[] = [{
  day: "Lunes",
  timbres: 30
}, {
  day: "Martes",
  timbres: 2
}, {
  day: "Miercoles",
  timbres: 3
}, {
  day: "Jueves",
  timbres: 10
}, {
  day: "Viernes",
  timbres: 6
}, {
  day: "Sabado",
  timbres: 11
}, {
  day: "Domingo",
  timbres: 4
}];

@Injectable()
export class ServiceGraficaSem {
    getDataSemanal(): ServicioDashboardService[] {
        return dataSemanal;
    }
}
