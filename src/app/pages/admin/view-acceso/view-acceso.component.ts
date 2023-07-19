import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAccesoDataSource, ViewAccesoItem } from './view-acceso-datasource';
import { AccesoService } from 'src/app/services/acceso.service';

@Component({
  selector: 'app-view-acceso',
  templateUrl: './view-acceso.component.html',
  styleUrls: ['./view-acceso.component.css']
})
export class ViewAccesoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewAccesoItem>;
  dataSource: ViewAccesoDataSource;

  constructor(private accesoService:AccesoService) {
    this.dataSource = new ViewAccesoDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarAccesoAdministrador();
    this.listarAccesoDirector();
    this.listarAccesoInvestigador();

  }

    listaDatosAdministrador : any = []
    listaDatosDirector : any = []
    listaDatosInvestigador : any = []

    listarAccesoAdministrador()
    {
      this.accesoService.listarAccesoAdministrador().subscribe(
          (res:any)=>{
            this.listaDatosAdministrador=this.transformarFechas(res);
          },
          err=>console.log(err)
        )
    }

    listarAccesoDirector()
    {
      this.accesoService.listarAccesoDirector().subscribe(
          (res:any)=>{
            this.listaDatosDirector=this.transformarFechas(res);
          },
          err=>console.log(err)
        )
    }

    listarAccesoInvestigador()
    {
      this.accesoService.listarAccesoInvestigador().subscribe(
          (res:any)=>{
            this.listaDatosInvestigador=this.transformarFechas(res);
          },
          err=>console.log(err)
        )
    }
  
    transformarFechas(data: any[]): any[] {
      return data.map(item => {
        const fechaInicioCompleta = item.fechaAcceso;
        const fechaInicioObj = new Date(fechaInicioCompleta);
        const fechaInicioFormateada = this.formatoFecha(fechaInicioObj);
  
        // Devolver un nuevo objeto con las fechas formateadas y el resto de la estructura de datos sin cambios
        return { ...item, fechaAcceso: fechaInicioFormateada};
      });
    }
  
    formatoFecha(fecha: Date): string {
      
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear().toString();
      const horas = fecha.getHours().toString().padStart(2, '0');
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      const segundos = fecha.getSeconds().toString().padStart(2, '0');
    
      return `${dia}/${mes}/${anio}  -  ${horas}:${minutos}:${segundos}`;
    }

    //paginacion y busqueda
    page_size:number=5
    page_number:number=1
    page_size_options=[5,10,20,50,100]
  
    handlePage(e: PageEvent){
      this.page_size=e.pageSize
      this.page_number=e.pageIndex + 1
    }
    
    public search: string = '';
  
    onSearch( search: string ) {
      this.search = search;
    }
  }
  