import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProfundidadService } from 'src/app/services/profundidad.service';
import { ViewProfundidadesDataSource, ViewProfundidadesItem } from './view-profundidades-datasource';

@Component({
  selector: 'app-view-profundidades',
  templateUrl: './view-profundidades.component.html',
  styleUrls: ['./view-profundidades.component.css']
})
export class ViewProfundidadesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewProfundidadesItem>;
  dataSource: ViewProfundidadesDataSource;

  

  constructor(private profundidadService:ProfundidadService) {
    this.dataSource = new ViewProfundidadesDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.profundidadService.listar().subscribe(
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
  



