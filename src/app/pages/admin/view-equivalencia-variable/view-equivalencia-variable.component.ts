import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewEquivalenciaVariableDataSource, ViewEquivalenciaVariableItem } from './view-equivalencia-variable-datasource';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';

@Component({
  selector: 'app-view-equivalencia-variable',
  templateUrl: './view-equivalencia-variable.component.html',
  styleUrls: ['./view-equivalencia-variable.component.css']
})
export class ViewEquivalenciaVariableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewEquivalenciaVariableItem>;
  dataSource: ViewEquivalenciaVariableDataSource;


  constructor(private equivalenciaVariableService:EquivalenciaVariableService) {
    this.dataSource = new ViewEquivalenciaVariableDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }


  
  ngOnInit(): void {
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.equivalenciaVariableService.listar().subscribe(
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
  