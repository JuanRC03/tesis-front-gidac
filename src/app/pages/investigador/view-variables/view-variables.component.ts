import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';
import Swal from 'sweetalert2';
import { ViewVariablesDataSource, ViewVariablesItem } from './view-variables-datasource';

@Component({
  selector: 'app-view-variables',
  templateUrl: './view-variables.component.html',
  styleUrls: ['./view-variables.component.css']
})
export class ViewVariablesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewVariablesItem>;
  dataSource: ViewVariablesDataSource;


  constructor(private equivalenciaVariableService:EquivalenciaVariableService) {
    this.dataSource = new ViewVariablesDataSource();
  }
  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
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
  


