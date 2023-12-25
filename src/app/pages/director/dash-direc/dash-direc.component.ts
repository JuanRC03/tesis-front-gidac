import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, LinearScale } from 'chart.js';
import { AdminDashService } from 'src/app/services/admin-dash.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';

interface GraficoData {
  anio: number;
  mes: number;
  total_registros: number;
}


@Component({
  selector: 'app-dash-direc',
  templateUrl: './dash-direc.component.html',
  styleUrls: ['./dash-direc.component.css']
})
export class DashDirecComponent implements OnInit {

  displayedColumnsDato1: string[] = ['indicador', 'valor'];

  constructor(private breakpointObserver: BreakpointObserver
              , private cdRef: ChangeDetectorRef
              , private adminDashService:AdminDashService
              , private dashboardService:DashboardService
              ,public login:LoginService) {
  }
  
  data: any;
  
  usuario:any = null;
  ngOnInit() {  
    this.usuario = this.login.getUser();
    this.createChart()
    this.createChart2()
    this.crearChartSolicitudDescargaPorMes()
    this.crearChartSolicitudActualizarPorMes()
    this.cargarEstadosProyecto();
    this.cargarContadorSolicitudes();
    this.cargarContadorActualizar();  
  }

  
  contadores:any;
  cargarEstadosProyecto(){
    this.dashboardService.obtenerEstadoProyecto(this.usuario.idUsuario).subscribe(
      res=>{
        this.contadores=res;
      },
      err=>console.log(err)
    )
  }

  listaSolicitudesDescarga : any = []
  cargarContadorSolicitudes(){
    this.dashboardService.obtenerSolicitudesDescarga(this.usuario.idUsuario).subscribe(
      res=>{
        this.listaSolicitudesDescarga=res;

      },
      err=>console.log(err)
    )
  }

  listaSolicitudesActualizar : any = []
  cargarContadorActualizar(){
    this.dashboardService.obtenerSolicitudesActualizar(this.usuario.idUsuario).subscribe(
      res=>{
        this.listaSolicitudesActualizar=res;

      },
      err=>console.log(err)
    )
  }


  crearChartSolicitudDescargaPorAnio() {
    this.dashboardService.obtenerSolicitudesDescargaGraficaPorAnio(this.usuario.idUsuario).subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[0]}`);
    const dataPoints = data.map((item: any) => item[1]);

    const ctx = document.getElementById('graficoSolicitudDescarga') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de registros',
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
                labelString: 'Cantidad solicitudes' // Título del eje Y
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

  crearChartSolicitudDescargaPorMes() {
    this.dashboardService.obtenerSolicitudesDescargaGraficaPorMes(this.usuario.idUsuario).subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[2]}/${item[0]}`);
    const dataPoints = data.map((item: any) => item[3]);

    const ctx = document.getElementById('graficoSolicitudDescarga') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de registros',
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
                labelString: 'Cantidad solicitudes' // Título del eje Y
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

  crearChartSolicitudDescargaPorDia() {
    this.dashboardService.obtenerSolicitudesDescargaGraficaPorDia(this.usuario.idUsuario).subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[3]}/${item[2]}/${item[0]}`);
    const dataPoints = data.map((item: any) => item[4]);

    const ctx = document.getElementById('graficoSolicitudDescarga') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de registros',
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
                labelString: 'Cantidad solicitudes' // Título del eje Y
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


  crearChartSolicitudActualizarPorAnio() {
    this.dashboardService.obtenerSolicitudesDescargaGraficaActualizarPorAnio(this.usuario.idUsuario).subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[0]}`);
    const dataPoints = data.map((item: any) => item[1]);

    const ctx = document.getElementById('graficoSolicitudActualizar') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de registros',
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
                labelString: 'Cantidad solicitudes' // Título del eje Y
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

  crearChartSolicitudActualizarPorMes() {
    this.dashboardService.obtenerSolicitudesDescargaGraficaActualizarPorMes(this.usuario.idUsuario).subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[2]}/${item[0]}`);
    const dataPoints = data.map((item: any) => item[3]);

    const ctx = document.getElementById('graficoSolicitudActualizar') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de registros',
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
                labelString: 'Cantidad solicitudes' // Título del eje Y
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

  crearChartSolicitudActualizarPorDia() {
    this.dashboardService.obtenerSolicitudesDescargaGraficaActualizarPorDia(this.usuario.idUsuario).subscribe((data: any) => {
      console.log(data);
    const labels = data.map((item: any) => `${item[3]}/${item[2]}/${item[0]}`);
    const dataPoints = data.map((item: any) => item[4]);

    const ctx = document.getElementById('graficoSolicitudActualizar') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // Cambiado a 'line' para un gráfico de líneas
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de registros',
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
                labelString: 'Cantidad solicitudes' // Título del eje Y
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
