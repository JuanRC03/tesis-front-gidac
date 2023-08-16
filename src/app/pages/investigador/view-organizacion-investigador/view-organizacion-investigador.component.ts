import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewOrganizacionInvestigadorDataSource, ViewOrganizacionInvestigadorItem } from './view-organizacion-investigador-datasource';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-view-organizacion-investigador',
  templateUrl: './view-organizacion-investigador.component.html',
  styleUrls: ['./view-organizacion-investigador.component.css']
})
export class ViewOrganizacionInvestigadorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewOrganizacionInvestigadorItem>;
  dataSource: ViewOrganizacionInvestigadorDataSource;


  constructor(private service:OrganizacionService) {
    this.dataSource = new ViewOrganizacionInvestigadorDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.service.listar().subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
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
