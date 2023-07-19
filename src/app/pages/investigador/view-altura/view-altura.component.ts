import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAlturaDataSource, ViewAlturaItem } from './view-altura-datasource';
import { AlturaService } from 'src/app/services/altura.service';

@Component({
  selector: 'app-view-altura',
  templateUrl: './view-altura.component.html',
  styleUrls: ['./view-altura.component.css']
})
export class ViewAlturaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewAlturaItem>;
  dataSource: ViewAlturaDataSource;

  constructor(
    private alturaService:AlturaService
  ) {
    this.dataSource = new ViewAlturaDataSource();
  }
  
  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.alturaService.listar().subscribe(
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
  