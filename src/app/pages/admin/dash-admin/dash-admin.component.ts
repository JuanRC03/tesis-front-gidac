import { Component,ChangeDetectorRef, HostListener  } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';
import { AdminDashService } from 'src/app/services/admin-dash.service';
import { DashboardService } from 'src/app/services/dashboard.service';




@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css']
})
export class DashAdminComponent {

  displayedColumnsDato1: string[] = ['indicador', 'valor'];

  constructor(private breakpointObserver: BreakpointObserver
              , private cdRef: ChangeDetectorRef
              , private adminDashService:AdminDashService
              , private dashboardService:DashboardService) {
    
  }

  data: any;
  contadores:any;
  ngOnInit() {  
    this.createChart()
    this.createChart2()
    this.crearChartAccesoPorMes();
    this.crearChartUsuarioPorRol();
    this.cargarDatosTipoInvestigacion()
    this.cargarDatosSectorImpacto()
    this.cargarDatosLineaInvestigacion()
    this.cargarDatosEstadoProyecto()
    this.cargarDatosDirector()
    this.cargarDatosAreaInvestigacion()
    this.cargarDatosTIpoProyecto()
    this.adminDashService.obtenerContadorDatos().subscribe(
      res=>{
        this.contadores=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosAreaInvestigacion : any = []
  

  cargarDatosAreaInvestigacion(){
    this.dashboardService.obtenerCantidadProyectosPorAreaInvestigacion().subscribe(
      res=>{
        this.listaDatosAreaInvestigacion=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosDirector : any = []
  
  cargarDatosDirector(){
    this.dashboardService.obtenerCantidadProyectosPorDirector().subscribe(
      res=>{
        this.listaDatosDirector=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosEstadoProyecto : any = []
  
  cargarDatosEstadoProyecto(){
    this.dashboardService.obtenerCantidadProyectosPorEstadoProyecto().subscribe(
      res=>{
        this.listaDatosEstadoProyecto=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosTipoProyecto : any = []
  
  cargarDatosTIpoProyecto(){
    this.dashboardService.obtenerCantidadProyectosPorTipoProyecto().subscribe(
      res=>{
        this.listaDatosTipoProyecto=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosLineaInvestigacion : any = []
  
  cargarDatosLineaInvestigacion(){
    this.dashboardService.obtenerCantidadProyectosPorLineaInvestigacion().subscribe(
      res=>{
        this.listaDatosLineaInvestigacion=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosSectorImpacto : any = []
  
  cargarDatosSectorImpacto(){
    this.dashboardService.obtenerCantidadProyectosPorSectorImpacto().subscribe(
      res=>{
        this.listaDatosSectorImpacto=res;
      },
      err=>console.log(err)
    )
  }

  listaDatosTipoInvestigacion : any = []
  cargarDatosTipoInvestigacion(){
    this.dashboardService.obtenerCantidadProyectosPorTipoInvestigacion().subscribe(
      res=>{
        this.listaDatosTipoInvestigacion=res;
      },
      err=>console.log(err)
    )
  }


  crearChartUsuarioPorRol() {
    this.dashboardService.obtenerUsuarioPorRol().subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[0]}`);
    const dataPoints = data.map((item: any) => item[1]);

    const ctx = document.getElementById('graficoUsuarioRol') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de accesos',
          data: dataPoints,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)'
          ],
          borderWidth: 1,
          fill: false // Evita el relleno debajo de la línea
        }]
      },
        options: {
          responsive: true,
          
        }
      });
    });
  }
  

  crearChartAccesoPorAnio() {
    this.dashboardService.obtenerAccesoPorAnio().subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[0]}`);
    const dataPoints = data.map((item: any) => item[1]);

    const ctx = document.getElementById('graficoAcceso') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de accesos',
          data: dataPoints,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false // Evita el relleno debajo de la línea
        }]
      },
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Año' // Título del eje X
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Cantidad de accesos' // Título del eje Y
              },
              ticks: {
                min: 0, // Valor mínimo del eje Y
                stepSize: 50,
              }
            }]
          }
        }
      });
    });
  }

  crearChartAccesoPorMes() {
    this.dashboardService.obtenerAccesoPorMes().subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[2]}/${item[0]}`);
    const dataPoints = data.map((item: any) => item[3]);

    const ctx = document.getElementById('graficoAcceso') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de accesos',
          data: dataPoints,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false // Evita el relleno debajo de la línea
        }]
      },
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Mes / Año' // Título del eje X
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Cantidad de accesos' // Título del eje Y
              },
              ticks: {
                min: 0, // Valor mínimo del eje Y
                stepSize: 50,
              }
            }]
          }
        }
      });
    });
  }

  crearChartAccesoPorDia() {
    this.dashboardService.obtenerAccesoPorDia().subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[3]}/${item[2]}/${item[0]}`);
    const dataPoints = data.map((item: any) => item[4]);

    const ctx = document.getElementById('graficoAcceso') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de accesos',
          data: dataPoints,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false // Evita el relleno debajo de la línea
        }]
      },
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Dia / Mes / Año' // Título del eje X
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Cantidad de accesos' // Título del eje Y
              },
              ticks: {
                min: 0, // Valor mínimo del eje Y
                stepSize: 50,
              }
            }]
          }
        }
      });
    });
  }



  createChart() {
    let data1 = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    const chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: data1.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data1.map(row => row.count)
          }
        ]
      }
    });
  }

  createChart2() {
    let data1 = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    const chart = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: data1.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data1.map(row => row.count)
          }
        ]
      }
    });
  }
  
}

