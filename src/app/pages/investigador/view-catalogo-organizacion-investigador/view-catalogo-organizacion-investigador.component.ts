import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewCatalogoOrganizacionInvestigadorDataSource, ViewCatalogoOrganizacionInvestigadorItem } from './view-catalogo-organizacion-investigador-datasource';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-catalogo-organizacion-investigador',
  templateUrl: './view-catalogo-organizacion-investigador.component.html',
  styleUrls: ['./view-catalogo-organizacion-investigador.component.css']
})
export class ViewCatalogoOrganizacionInvestigadorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewCatalogoOrganizacionInvestigadorItem>;
  dataSource: ViewCatalogoOrganizacionInvestigadorDataSource;


  constructor(private catalogoOrganizacionService:CatalogoOrganizacionService,
    private route:ActivatedRoute) {
    this.dataSource = new ViewCatalogoOrganizacionInvestigadorDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3'];
  
  ngAfterViewInit(): void {
  }
  
  idOrganizacion=0;
  siglasOrganizacion='';

  ngOnInit(): void {
    this.idOrganizacion = this.route.snapshot.params['idOrganizacion'];
    this.siglasOrganizacion = this.route.snapshot.params['siglas'];
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.catalogoOrganizacionService.obtenerCatalogoPorOrganizacion(this.idOrganizacion).subscribe(
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