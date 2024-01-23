import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailEnvioService } from 'src/app/services/email-envio.service';
import { LoginService } from 'src/app/services/login.service';
import { TipoProyectoService } from 'src/app/services/tipo-proyecto.service';
import { EventEmitter } from 'stream';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-email-envio',
  templateUrl: './view-email-envio.component.html',
  styleUrls: ['./view-email-envio.component.css']
})
export class ViewEmailEnvioComponent implements OnInit {

  constructor(private emailEnvioService:EmailEnvioService,
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
      idEmailEnvio: 0,
      email:'',
      contrasenia:'',
      host:'',
      port:'',
      usuario:{
        idUsuario:0
      }
    }

    listarVigentes()
    {
      this.emailEnvioService.findByVigenciaTrueUno().subscribe(
          (data:any)=>{
            if (data!=null) {
                this.datosActuales.idEmailEnvio=data.idEmailEnvio;
                this.datosActuales.email=data.email;
                this.datosActuales.contrasenia=data.contrasenia;
                this.datosActuales.host=data.host;
                this.datosActuales.port=data.port;
                this.datosActuales.usuario.idUsuario=data.usuario.idUsuario;
            }
          },
          err=>console.log(err)
        )
    }
    listarEliminados()
    {
      this.emailEnvioService.findByVigenciaFalse().subscribe(
          (res:any)=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar el email de envió de correos?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.emailEnvioService.delete(id).subscribe(
            (data) => {
              this.listaDatosVigentes = this.listaDatosVigentes.filter((datos:any) => datos.idTipoProyecto!= id);
              Swal.fire('Información eliminada','El email de envió de correos ha sido eliminado','success');
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el email de envió de correos','error');
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
          this.emailEnvioService.restore(id).subscribe(
            (data) => {
              Swal.fire('Información restaurada','El email de envió de correos ha sido restaurada','success');
              this.listarVigentes();
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar el email de envió de correos','error');
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
      const dialogRef = this.dialog.open(DialogAddEmailEnvio, {
        data: { idUsuario:this.idUsuario}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
        this.listarEliminados();
      });
      
    }

    openDialogEditar(): void {
      const dialogRef = this.dialog.open(DialogActualizarEmailEnvio, {
        data: { idEmailEnvio: this.datosActuales.idEmailEnvio, idUsuario:this.datosActuales.usuario.idUsuario},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
}

interface DatosActualizar {
  idEmailEnvio: 0,
  idUsuario: 0,
}
  
@Component({
  selector: 'add-email-envio',
  templateUrl: 'add-email-envio.html',
  styleUrls: ['./view-email-envio.component.css']
})
export class DialogAddEmailEnvio {
  constructor(
    public dialogRef: MatDialogRef<DialogAddEmailEnvio>,
    @Inject(MAT_DIALOG_DATA) public datosInfo: DatosActualizar,
    private snack: MatSnackBar,
    private service: EmailEnvioService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    email:'',
    contrasenia:'',
    host:'',
    port:'',
    usuario:{
      idUsuario:0
    }
  }

  ngOnInit(): void {
    this.datos.usuario.idUsuario=this.datosInfo.idUsuario;
  }

  formSubmit() {
    if (this.datos.email == '' || this.datos.email == null) {
      this.snack.open('El correo es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.datos.contrasenia == '' || this.datos.contrasenia == null) {
      this.snack.open('La contrasenia es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.datos.host == '' || this.datos.host == null) {
      this.snack.open('El host es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.datos.port == '' || this.datos.port == null) {
      this.snack.open('El puerto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información guardada ', 'El email de envió de correos se ha guardado con exito', 'success');
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El email de envió de correos no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-email-envio',
  templateUrl: 'actualizar-email-envio.html',
  styleUrls: ['./view-email-envio.component.css']
})
export class DialogActualizarEmailEnvio {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarEmailEnvio>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: EmailEnvioService,

  ) { }

  datosActualizar = {
    idEmailEnvio: 0,
    email:'',
    contrasenia:'',
    host:'',
    port:'',
    usuario:{
      idUsuario:0
    }
  }

  datosAntiguo = {
    idEmailEnvio: 0,
    email:'',
    contrasenia:'',
    host:'',
    port:'',
    usuario:{
      idUsuario:0
    }
  }

  datosComporbar = {
    contrasenia:'',
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    this.datosActualizar.idEmailEnvio=this.datos.idEmailEnvio;
    this.datosActualizar.usuario.idUsuario=this.datos.idUsuario;
    this.obtenerDatos();
  }

  obtenerDatos()
    {
      this.service.findById(this.datos.idEmailEnvio).subscribe(
          (data:any)=>{
                this.datosAntiguo.email=data.email;
                this.datosAntiguo.contrasenia=data.contrasenia;

                this.datosActualizar.idEmailEnvio=data.idEmailEnvio;
                this.datosActualizar.email=data.email;
                this.datosActualizar.host=data.host;
                this.datosActualizar.port=data.port;
          },
          err=>console.log(err)
        )
    }

  formSubmit() {
    if (this.datosActualizar.email == '' || this.datosActualizar.email == null) {
      this.snack.open('El correo es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datosComporbar.contrasenia == '' || this.datosComporbar.contrasenia == null) {
      this.snack.open('La contrasenia es antigua es requerida !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datosActualizar.contrasenia == '' || this.datosActualizar.contrasenia == null) {
      this.snack.open('La contrasenia nueva es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.datosActualizar.host == '' || this.datosActualizar.host == null) {
      this.snack.open('El host es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.datosActualizar.port == '' || this.datosActualizar.port == null) {
      this.snack.open('El puerto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if(this.datosAntiguo.contrasenia!=this.datosComporbar.contrasenia){
      this.snack.open('La contraseña antigua no es igual a la registrada !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.actualizar(this.datosActualizar).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'El email de envió de correos se ha actualizado con exito', 'success');
        
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El email de envió de correos no se ha actualizado', 'error');
      }
    )
  }
}

  

