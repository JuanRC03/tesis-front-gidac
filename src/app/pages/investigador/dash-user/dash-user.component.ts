import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from 'src/app/services/dashboard.service';
import {MatChipsModule} from '@angular/material/chips';
import { AdminDashService } from 'src/app/services/admin-dash.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.css']
})
export class DashUserComponent {
  /** Based on the screen size, switch from standard to one column per row */

  displayedColumnsDato1: string[] = ['indicador', 'valor'];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private adminDashService:AdminDashService,
    private dashboardService:DashboardService,
    private login:LoginService) {}

    contadores:any;

  usuario:any = null;
  ngOnInit() {  
    this.usuario = this.login.getUser();
    this.cargarDatosAltura();
    this.cargarDatosUnidadMedida();
    this.cargarDatosProfundidad();
    this.cargarDatosVariableCantidad();
    this.cargarDatosValorPromedio();
    this.listarContadores();
  }

  listarContadores(){
    this.dashboardService.obtenerSolicitudesActualizarInvestigador(this.usuario.idUsuario).subscribe(
      res=>{
        this.contadores=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosArea : any = []
  cargarDatosAltura(){
    this.dashboardService.obtenerAlturasMasUsuadas().subscribe(
      res=>{
        console.log(res)
        this.listaDatosArea=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosUnidadMedida : any = []
  cargarDatosUnidadMedida(){
    this.dashboardService.obtenerUnidadesDeMedidaMasUsuadas().subscribe(
      res=>{
        console.log(res)
        this.listaDatosUnidadMedida=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosProfunidad: any = []
  cargarDatosProfundidad(){
    this.dashboardService.obteneProfundidadesMasUsuadas().subscribe(
      res=>{
        console.log(res)
        this.listaDatosProfunidad=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosValorPrommedio: any = []
  cargarDatosValorPromedio(){
    this.dashboardService.obteneValorPromedioVariablesNumericas().subscribe(
      res=>{
        console.log(res)
        this.listaDatosValorPrommedio=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosVariablesCantidad: any = []
  cargarDatosVariableCantidad(){
    this.dashboardService.obteneCantidadDatosPorVariable().subscribe(
      res=>{
        console.log(res)
        this.listaDatosVariablesCantidad=res;
      },
      err=>console.log(err)
    )
  }

}
