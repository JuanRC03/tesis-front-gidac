import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewCatalogoEspochAdminDataSource, ViewCatalogoEspochAdminItem } from './view-catalogo-espoch-admin-datasource';
import { CatalogoEspochService } from 'src/app/services/catalogo-espoch.service';

@Component({
  selector: 'app-view-catalogo-espoch-admin',
  templateUrl: './view-catalogo-espoch-admin.component.html',
  styleUrls: ['./view-catalogo-espoch-admin.component.css']
})
export class ViewCatalogoEspochAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewCatalogoEspochAdminItem>;
  dataSource: ViewCatalogoEspochAdminDataSource;


  constructor(private catalogoEspochService:CatalogoEspochService) {
    this.dataSource = new ViewCatalogoEspochAdminDataSource();
  }

  displayedColumns = ['dato1', 'dato2'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.catalogoEspochService.listar().subscribe(
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
  