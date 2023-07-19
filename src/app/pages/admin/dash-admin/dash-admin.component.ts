import { Component,ChangeDetectorRef, HostListener  } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';
import { AdminDashService } from 'src/app/services/admin-dash.service';




@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css']
})
export class DashAdminComponent {


  constructor(private breakpointObserver: BreakpointObserver
              , private cdRef: ChangeDetectorRef
              , private adminDashService:AdminDashService) {
    
  }

  data: any;
  contadores:any;
  ngOnInit() {  
    this.createChart()
    this.createChart2()
    this.adminDashService.obtenerContadorDatos().subscribe(
      res=>{
        this.contadores=res;
      },
      err=>console.log(err)
    )
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

