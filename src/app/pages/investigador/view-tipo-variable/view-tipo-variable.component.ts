import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewTipoVariableDataSource, ViewTipoVariableItem } from './view-tipo-variable-datasource';
import { TipoVariableService } from 'src/app/services/tipo-variable.service';

@Component({
  selector: 'app-view-tipo-variable',
  templateUrl: './view-tipo-variable.component.html',
  styleUrls: ['./view-tipo-variable.component.css']
})
export class ViewTipoVariableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewTipoVariableItem>;
  dataSource: ViewTipoVariableDataSource;


  constructor(
    private tipoVariableService:TipoVariableService
  ) {
    this.dataSource = new ViewTipoVariableDataSource();
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
      this.tipoVariableService.listar().subscribe(
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
  