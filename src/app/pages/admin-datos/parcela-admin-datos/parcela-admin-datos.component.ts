import { AfterViewInit, Component, ViewChild, Inject,EventEmitter, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';
import Swal from 'sweetalert2';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AreaService } from 'src/app/services/area.service';


@Component({
  selector: 'app-parcela-admin-datos',
  templateUrl: './parcela-admin-datos.component.html',
  styleUrls: ['./parcela-admin-datos.component.css']
})
export class ParcelaAdminDatosComponent implements OnInit {

  constructor(private parcelaService:ParcelaService,
    private route:ActivatedRoute,
    private investigacionService:InvestigacionService,
    public matDialog: MatDialog,
    public areaService:AreaService) {
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
    this.listarProyectosVigentes();
    this.listarArea();
  }

  area : any = []

  listarArea()
    {
      this.areaService.listar().subscribe(
          res=>{
            this.area=res;
          },
          err=>console.log(err)
        )
    }


  datos : any = []
    listarProyectosVigentes()
    {
      this.investigacionService.obtenerProyectoInvestigacion(this.idProyecto).subscribe(
          res=>{
            this.datos=res;
          },
          err=>console.log(err)
        )
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
        title:'Eliminar información',
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
              Swal.fire('Información eliminada','La parcela ha sido eliminada','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la parcela','error');
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
