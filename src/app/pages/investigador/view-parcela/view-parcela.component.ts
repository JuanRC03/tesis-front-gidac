import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';
import Swal from 'sweetalert2';
import { ViewParcelaDataSource, ViewParcelaItem } from './view-parcela-datasource';

@Component({
  selector: 'app-view-parcela',
  templateUrl: './view-parcela.component.html',
  styleUrls: ['./view-parcela.component.css']
})
export class ViewParcelaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewParcelaItem>;
  dataSource: ViewParcelaDataSource;

  constructor(private parcelaService:ParcelaService,
    private route:ActivatedRoute) {
    this.dataSource = new ViewParcelaDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];
  
  ngAfterViewInit(): void {
  }

  idConglomerado= 0;
  idProyecto=0;
  ngOnInit(): void {
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.parcelaService.obtenerPorConglomerado(this.idConglomerado).subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(idParcela:any){
      Swal.fire({
        title:'Eliminar parcela',
        text:'¿Estás seguro de eliminar la parcela?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.parcelaService.eliminar(idParcela).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idParcela != idParcela);
              Swal.fire('Parcela eliminado','La parcela ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la parcela, la parcela debe estar vacio','error');
            }
          )
        }
      })
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
  

