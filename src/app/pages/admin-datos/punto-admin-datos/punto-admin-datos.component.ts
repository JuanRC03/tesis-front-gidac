import { AfterViewInit, Component, ViewChild, Inject,EventEmitter, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from 'src/app/services/dataset.service';
import Swal from 'sweetalert2';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfundidadService } from 'src/app/services/profundidad.service';
import { FormsModule } from '@angular/forms';
import { ProfundidadParcelaService } from 'src/app/services/profundidad-parcela.service';

@Component({
  selector: 'app-punto-admin-datos',
  templateUrl: './punto-admin-datos.component.html',
  styleUrls: ['./punto-admin-datos.component.css']
})
export class PuntoAdminDatosComponent implements OnInit {

  
  constructor(private profundidadParcelaService:ProfundidadParcelaService,
    private route:ActivatedRoute,
    private investigacionService:InvestigacionService,
    public profundidadService:ProfundidadService,
    public matDialog: MatDialog ) {
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  

  idParcela= 0;
  idConglomerado=0;
  idProyecto=0;
  ngOnInit(): void {
    this.idParcela = this.route.snapshot.params['idParcela'];
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
    this.listarProyectosVigentes();
    this.listarProfundidad();
  }

  profundidad : any = []
  listarProfundidad()
    {
      this.profundidadService.listar().subscribe(
          res=>{
            this.profundidad=res;
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
      this.profundidadParcelaService.obtenerPorParcela(this.idParcela).subscribe(
          (res:any)=>{
            this.listaDatos=this.transformarFechas(res);
            
          },
          err=>console.log(err)
        )
    }

    transformarFechas(data: any[]): any[] {
      return data.map(item => {
        const fechaInicioCompleta = item.fechaSalidaCampo;
        const fechaInicioObj = new Date(fechaInicioCompleta);
        const fechaInicioFormateada = this.formatoFecha(fechaInicioObj);
  
        // Devolver un nuevo objeto con las fechas formateadas y el resto de la estructura de datos sin cambios
        return { ...item, fechaSalidaCampo: fechaInicioFormateada };
      });
    }
  
    formatoFecha(fecha: Date): string {
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear().toString();
  
      return `${dia}/${mes}/${anio}`;
    }


    eliminar(idProfundidad:any, idParcela:any ){
      Swal.fire({
        title:'Eliminar punto',
        text:'¿Estás seguro de eliminar el punto?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.profundidadParcelaService.eliminar(idProfundidad,idParcela ).subscribe(
            (data) => {
              this.listarVigentes()
              Swal.fire('Informacion eliminada','El punto ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el punto, el punto debe estar vacio','error');
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
