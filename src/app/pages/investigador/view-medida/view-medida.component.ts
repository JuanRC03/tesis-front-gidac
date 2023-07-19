import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MedidaService } from 'src/app/services/medida.service';
import { ViewMedidaDataSource, ViewMedidaItem } from './view-medida-datasource';

@Component({
  selector: 'app-view-medida',
  templateUrl: './view-medida.component.html',
  styleUrls: ['./view-medida.component.css']
})
export class ViewMedidaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewMedidaItem>;
  dataSource: ViewMedidaDataSource;


  constructor(private medidaService:MedidaService) {
    this.dataSource = new ViewMedidaDataSource();
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
      this.medidaService.listar().subscribe(
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
  

