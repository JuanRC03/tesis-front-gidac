import { Component } from '@angular/core';
import { VisitanteService } from './services/visitante.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GIDAC';

  constructor() {}


  ngOnInit() {
    
  }

  /*
  constructor(private visitanteService: VisitanteService,public login:LoginService) {}
  ngOnInit() {
    console.log(this.login.getUser());
    if(this.login.getUser() == null){
      const fechaActual = new Date(); //obtener la fecha actual
      fechaActual.setHours(0, 0, 0, 0); //establecer la hora en cero
      this.visitante.fecha = fechaActual; //asignar la fecha actual al modelo
      this.visitanteService.getIPAddress().subscribe((res:any)=>{
        this.visitante.ip=res.ip;
        this.visitanteService.agregarVisitante(this.visitante).subscribe();
      },(error) => {
        console.log(error);
      });
    }
    
  }*/
}
