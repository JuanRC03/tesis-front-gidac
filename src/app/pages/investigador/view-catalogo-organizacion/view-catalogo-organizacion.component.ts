import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewCatalogoOrganizacionDataSource, ViewCatalogoOrganizacionItem } from './view-catalogo-organizacion-datasource';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-view-catalogo-organizacion',
  templateUrl: './view-catalogo-organizacion.component.html',
  styleUrls: ['./view-catalogo-organizacion.component.css']
})
export class ViewCatalogoOrganizacionComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewCatalogoOrganizacionItem>;
  dataSource: ViewCatalogoOrganizacionDataSource;


  constructor(private catalogoOrganizacionService:CatalogoOrganizacionService,
    private variableService:VariableService) {
    this.dataSource = new ViewCatalogoOrganizacionDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.variableService.listarCompletasInvestigador().subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }
    
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
  


