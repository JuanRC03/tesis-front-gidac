import { AfterViewInit, Component, ViewChild, Inject, EventEmitter, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { LoginService } from 'src/app/services/login.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { VariableUnidadMedidaService } from 'src/app/services/variable-unidad-medida.service';
import { DatasetService } from 'src/app/services/dataset.service';

@Component({
  selector: 'app-dato-director',
  templateUrl: './dato-director.component.html',
  styleUrls: ['./dato-director.component.css']
})
export class DatoDirectorComponent implements OnInit {

  
  constructor(private datoRecolectadoService:DatoRecolectadoService,
    private route:ActivatedRoute,
    public login:LoginService,
    public dialog: MatDialog,
    public investigacionService:InvestigacionService,
    public datasetService:DatasetService,
    public variableUnidadMedidaService:VariableUnidadMedidaService,
    public loginService:LoginService) {
  }

  displayedColumns = ['dato1', 'dato2','dato3'];
  
  ngAfterViewInit(): void {
  }
  
  idProfundidad= 0;
  idParcela= 0;
  idConglomerado= 0;
  idProyecto= 0;
  usuario:any = null;
  isLoggedIn = false;
  idUsuario= 0;

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.usuario = this.loginService.getUser();
    this.idUsuario=this.usuario.idUsuario;
    console.log(this.usuario);
    console.log(this.usuario.idUsuario);
    this.idProfundidad = this.route.snapshot.params['idProfundidad'];
    this.idParcela = this.route.snapshot.params['idParcela'];
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
    this.listarProyectosVigentes();
    this.listarVariableUnidadMedida();
    this.listarDatasets();
  }

  variableUnidadMedida : any = []
  listarVariableUnidadMedida()
    {
      this.variableUnidadMedidaService.listarVigentesVariableVigente().subscribe(
          res=>{
            this.variableUnidadMedida=res;
            
          },
          err=>console.log(err)
        )
    }

    listaDatosDataset: any = [];
    listarDatasets() {
      this.listaDatosDataset=[];
      this.datasetService.obtenerDatasets(this.idProyecto).subscribe(
        res => {
          this.listaDatosDataset = res;
          this.listaDatosDataset.unshift({ codigoDataset: 0, fechaDataset: 'Todos' });
          this.opcionSeleccionada.codigoDataset=0;
        },
        err => console.log(err)
      )
    }
    public searchEstado: string = '';
    
    opcionSeleccionada: any = {
      codigoDataset: 0,
      fechaDataset: null
    }

    onEstadoChange(event: any): void {
      if (this.opcionSeleccionada.codigoDataset == 0) {
        this.searchEstado = "";
      } else {
        this.searchEstado = this.opcionSeleccionada.codigoDataset;
      }
      console.log(this.searchEstado)
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
      this.datoRecolectadoService.obtenerPorProfundidadParcela(this.idProfundidad, this.idParcela).subscribe(
          res=>{
            this.listaDatos=res;
            console.log(res)
          },
          err=>console.log(err)
        )
    }

    eliminar(idDatoRecolectado:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar el dato recolectado?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.datoRecolectadoService.eliminar(idDatoRecolectado).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idDatoRecolectado != idDatoRecolectado);
              Swal.fire('Información eliminada','El dato recolectado ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el dato recolectado','error');
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
