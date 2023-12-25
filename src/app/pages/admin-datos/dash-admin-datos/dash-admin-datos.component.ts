import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatChipsModule} from '@angular/material/chips';
import { AdminDashService } from 'src/app/services/admin-dash.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dash-admin-datos',
  templateUrl: './dash-admin-datos.component.html',
  styleUrls: ['./dash-admin-datos.component.css']
})
export class DashAdminDatosComponent implements OnInit {

  displayedColumnsDato1: string[] = ['indicador', 'valor'];

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.cargarEstadosProyecto();
    this.cargarDatosAltura();
    this.cargarDatosUnidadMedida();
    this.cargarDatosProfundidad();
    this.cargarDatosVariableCantidad();
    this.cargarDatosValorPromedio();
  }

  contadores:any;
  cargarEstadosProyecto(){
    this.dashboardService.obtenerIndicadoresProyecto().subscribe(
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
