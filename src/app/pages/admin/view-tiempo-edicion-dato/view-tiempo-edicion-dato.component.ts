import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { TiempoEdicionDatoService } from 'src/app/services/tiempo-edicion-dato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tiempo-edicion-dato',
  templateUrl: './view-tiempo-edicion-dato.component.html',
  styleUrls: ['./view-tiempo-edicion-dato.component.css']
})
export class ViewTiempoEdicionDatoComponent implements OnInit {

  constructor(private tiempoEdicionDatoService:TiempoEdicionDatoService,
    public dialog: MatDialog,
    public login:LoginService) { }

  usuario: any = null;
  idUsuario = 0;
  ngOnInit(): void {
    this.usuario = this.login.getUser();
    this.idUsuario = this.usuario.idUsuario;
    this.listarVigentes();
    this.listarEliminados();
  }

    listaDatosVigentes : any = []
    listaDatosEliminados : any = []

    datosActuales = {
      idTiempoEdicionDato: 0,
      tiempo:0,
      usuario:{
        idUsuario:0
      }
    }

    listarVigentes()
    {
      this.tiempoEdicionDatoService.findByVigenciaTrueUno().subscribe(
          (data:any)=>{
            if (data!=null) {
                this.datosActuales.idTiempoEdicionDato=data.idTiempoEdicionDato;
                this.datosActuales.tiempo=data.tiempo;
                this.datosActuales.usuario.idUsuario=data.usuario.idUsuario;
            }
          },
          err=>console.log(err)
        )
    }
    listarEliminados()
    {
      this.tiempoEdicionDatoService.findByVigenciaFalse().subscribe(
          (res:any)=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar el tiempor de edicion de datos?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.tiempoEdicionDatoService.delete(id).subscribe(
            (data) => {
              this.listaDatosVigentes = this.listaDatosVigentes.filter((datos:any) => datos.idTiempoEdicionDato!= id);
              Swal.fire('Información eliminada','El tiempo de edicion de datos ha sido eliminado','success');
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el tiempo de edicion de datos','error');
            }
          )
        }
      })
    }

    restablecer(id:any){
      Swal.fire({
        title:'Restaurar información',
        text:'¿Estás seguro de restaurar el email de envió de correos?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.tiempoEdicionDatoService.restore(id).subscribe(
            (data) => {
              Swal.fire('Información restaurada','El tiempo de edicion de datos ha sido restaurada','success');
              this.listarVigentes();
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar el tiempo de edicion de datos','error');
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
    
    page_number1: number = 1
    handlePage1(e: PageEvent) {
      this.page_size = e.pageSize
      this.page_number1 = e.pageIndex + 1
    }
    
    public search: string = '';
  
    onSearch( search: string ) {
      this.search = search;
    }

    openDialogAgregar(): void {
      const dialogRef = this.dialog.open(DialogAddTiempoEdicionDato, {
        data: { idUsuario:this.idUsuario}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
        this.listarEliminados();
      });
      
    }

    openDialogEditar(): void {
      const dialogRef = this.dialog.open(DialogActualizarTiempoEdicionDato, {
        data: { idTiempoEdicionDato: this.datosActuales.idTiempoEdicionDato, idUsuario:this.datosActuales.usuario.idUsuario},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
}

interface DatosActualizar {
  idTiempoEdicionDato: 0,
  idUsuario: 0,
}
  
@Component({
  selector: 'add-tiempo-edicion-dato',
  templateUrl: 'add-tiempo-edicion-dato.html',
  styleUrls: ['./view-tiempo-edicion-dato.component.css']
})
export class DialogAddTiempoEdicionDato {
  constructor(
    public dialogRef: MatDialogRef<DialogAddTiempoEdicionDato>,
    @Inject(MAT_DIALOG_DATA) public datosInfo: DatosActualizar,
    private snack: MatSnackBar,
    private tiempoEdicionDatoService:TiempoEdicionDatoService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    tiempo:0,
    usuario:{
      idUsuario:0
    }
  }

  ngOnInit(): void {
    this.datos.usuario.idUsuario=this.datosInfo.idUsuario;
  }

  formSubmit() {
    if (this.datos.tiempo == 0) {
      this.snack.open('El tiempo debe ser mayor que 0 !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.tiempoEdicionDatoService.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información guardada ', 'El tiempo de edicion de datos se ha guardado con exito', 'success');
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El tiempo de edicion de datos no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-tiempo-edicion-dato',
  templateUrl: 'actualizar-tiempo-edicion-dato.html',
  styleUrls: ['./view-tiempo-edicion-dato.component.css']
})
export class DialogActualizarTiempoEdicionDato {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarTiempoEdicionDato>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private tiempoEdicionDatoService:TiempoEdicionDatoService,

  ) { }

  datosActualizar = {
    idTiempoEdicionDato: 0,
    tiempo:0,
    usuario:{
      idUsuario:0
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    this.datosActualizar.idTiempoEdicionDato=this.datos.idTiempoEdicionDato;
    this.datosActualizar.usuario.idUsuario=this.datos.idUsuario;
    this.obtenerDatos();
  }

  obtenerDatos()
    {
      this.tiempoEdicionDatoService.findById(this.datos.idTiempoEdicionDato).subscribe(
          (data:any)=>{
                this.datosActualizar.tiempo=data.tiempo;
          },
          err=>console.log(err)
        )
    }

  formSubmit() {
    if (this.datosActualizar.tiempo == 0) {
      this.snack.open('El tiempo para editar datos debe ser mayor que 0 !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.tiempoEdicionDatoService.actualizar(this.datosActualizar).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'El tiempo de edicion de datos se ha actualizado con exito', 'success');
        
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El tiempo de edicion de datos no se ha actualizado', 'error');
      }
    )
  }
}

  

