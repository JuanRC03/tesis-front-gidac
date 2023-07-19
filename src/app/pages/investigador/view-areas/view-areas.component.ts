import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAreasDataSource, ViewAreasItem } from './view-areas-datasource';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-view-areas',
  templateUrl: './view-areas.component.html',
  styleUrls: ['./view-areas.component.css']
})
export class ViewAreasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewAreasItem>;
  dataSource: ViewAreasDataSource;

  constructor( private areaService:AreaService) {
    this.dataSource = new ViewAreasDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.areaService.listar().subscribe(
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
  