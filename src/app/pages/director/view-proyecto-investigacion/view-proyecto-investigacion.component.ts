import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ViewDirectorAsignado } from '../../admin/view-area-investigacion/view-area-investigacion.component';
import { EstadoProyectoInvestigacionService } from 'src/app/services/estado-proyecto-investigacion.service';
import { LoginService } from 'src/app/services/login.service';


interface EstadoProyecto {
  idEstadoProyecto: number;
  nombreEstadoProyecto: string;
}


@Component({
  selector: 'app-view-proyecto-investigacion',
  templateUrl: './view-proyecto-investigacion.component.html',
  styleUrls: ['./view-proyecto-investigacion.component.css']
})
export class ViewProyectoInvestigacionComponent implements OnInit {

  proyectoInvestigacio : any = []
  proyectoInvestigacioEliminados : any = []
  estadoProyectoInvestigacion:any = [];

  constructor(private investigacionService:InvestigacionService,
              private estadoProyectoInvestigacionService: EstadoProyectoInvestigacionService,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              private investigacionInvestigadoresService:InvestigacionInvestigadoresService
    ) { }

  idUsuario=0;
  rol='';
  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
    this.listarProyectosVigentes();
    this.listarProyectosEliminados();
    this.listarEstadoProyectoInvestigacion();
  }

  listarProyectosVigentes(){
    this.investigacionInvestigadoresService.obtenerProyectoVigentesDirector(this.idUsuario).subscribe(
      (dato:any) => {
        console.log(dato)
        this.proyectoInvestigacio = dato;
      },
      (error) => {
        console.log(error);
        //Swal.fire('Error','Error al cargar los exámenes','error');
      }
    )
  }

  listarProyectosEliminados(){
    this.investigacionInvestigadoresService.obtenerProyectoEliminadosDirector(this.idUsuario).subscribe(
      (dato:any) => {
        
        console.log(dato)
        this.proyectoInvestigacioEliminados = dato;
      },
      (error) => {
        console.log(error);
        //Swal.fire('Error','Error al cargar los exámenes','error');
      }
    )
  }

  listarEstadoProyectoInvestigacion(){
    
    this.estadoProyectoInvestigacionService.listarEstadoProyectoInvestigacion().subscribe(
        res=>{
          this.estadoProyectoInvestigacion=res;
          this.estadoProyectoInvestigacion.unshift({ idEstadoProyecto: 0, nombreEstadoProyecto: 'Todos' });
          this.estadoProyectoInvestigacion.idEstadoProyecto = 0;
        },
        err=>console.log(err)
      )
  }


  public searchEstado: string = '';
  opcionSeleccionada:any;
  onEstadoProyectoChange(event: any): void {
    this.opcionSeleccionada = this.estadoProyectoInvestigacion.find((option: EstadoProyecto) => option.idEstadoProyecto === event.value);
    if(this.opcionSeleccionada.idEstadoProyecto==0){
      this.searchEstado="";
    }else{
      this.searchEstado=this.opcionSeleccionada.nombreEstadoProyecto;
    }
    
  }
  

  eliminarProyectoInvestigacion(idProyecto:any){
    Swal.fire({
      title:'Eliminar proyecto de investigación',
      text:'¿Estás seguro de eliminar el proyecto de investigación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.investigacionService.eliminarInvestigacion(idProyecto).subscribe(
          (data) => {
            this.proyectoInvestigacio = this.proyectoInvestigacio.filter((proyectoInvestigacio:any) => proyectoInvestigacio.idProyecto != idProyecto);
            Swal.fire('Proyecto de investigación eliminado','El proyecto de investigación ha sido eliminado','success');
            this.listarProyectosEliminados();
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el proyecto de investigación','error');
          }
        )
      }
    })
  }

  cambiarPublico(idProyecto:any){
    Swal.fire({
      title:'Publicar proyecto de investigación',
      text:'¿Estás seguro de publicar el proyecto de investigación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Publicar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.investigacionService.cambioEstadoProyectoInvestigacion(idProyecto).subscribe(
          (data) => {
            Swal.fire('Proyecto de investigación público','El proyecto de investigación se encuentra público','success').then(() => {
              
              this.listarProyectosVigentes();
            });
            
          },
          (error) => {
            Swal.fire('Error','Error al publicar el proyecto de investigación','error');
          }
        )
      }
    })
  }

  cambiarPrivado(idProyecto:any){
    Swal.fire({
      title:'Volver privado el proyecto de investigación',
      text:'¿Estás seguro volver privado el proyecto de investigación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Privado',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.investigacionService.cambioEstadoProyectoInvestigacion(idProyecto).subscribe(
          (data) => {
            Swal.fire('Proyecto de investigación privado','El proyecto de investigación se encuentra privado','success');
            this.listarProyectosVigentes();
          },
          (error) => {
            Swal.fire('Error','Error al privar el proyecto de investigación','error');
          }
        )
      }
    })
  }

  restaurarProyectoInvestigacion(idProyecto:any){
    Swal.fire({
      title:'Restaurar proyecto de investigación',
      text:'¿Estás seguro de restaurar el proyecto de investigación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Restaurar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.investigacionService.restaurarInvestigacion(idProyecto).subscribe(
          (data) => {
            this.proyectoInvestigacioEliminados = this.proyectoInvestigacioEliminados.filter((proyectoInvestigacioEliminados:any) => proyectoInvestigacioEliminados.idProyecto != idProyecto);
            Swal.fire('Proyecto de investigación restaurado','El proyecto de investigación ha sido restaurar','success');
            this.listarProyectosVigentes();
          },
          (error) => {
            Swal.fire('Error','Error al restaurar el proyecto de investigación','error');
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

  //abrir dialogo de investigadores en proyectos de investigacion
  openDialogInvestigadores(idProyecto:any,nombreProyecto:any): void {
    const dialogRef = this.dialog.open(ViewInvestigadoresProyectosInvestigacion, {
      data: {idProyecto: idProyecto, nombreProyecto:nombreProyecto, idUsuario:this.idUsuario},
    });
  }

  //abrir dialogo de investigadores en proyectos de investigacion eliminado
  openDialogInvestigadoresProyectoEliminado(idProyecto:any,nombreProyecto:any): void {
    const dialogRef = this.dialog.open(ViewInvestigadoresProyectosInvestigacionEliminado, {
      data: {idProyecto: idProyecto, nombreProyecto:nombreProyecto, idUsuario:this.idUsuario},
    });
  }

}

export interface DialogDataProyectoInvestigacion {
  idProyecto:0,
  nombreProyecto:'',
  idUsuario:0,
}


@Component({
  selector: 'view-investigadores-proyectos-investigacion',
  templateUrl: 'view-investigadores-proyectos-investigacion.html',
  styleUrls: ['./view-proyecto-investigacion.component.css']
})
export class ViewInvestigadoresProyectosInvestigacion {
  constructor(
    public dialogRef: MatDialogRef<ViewInvestigadoresProyectosInvestigacion>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataProyectoInvestigacion,
    private snack:MatSnackBar, 
    private investigacionService:InvestigacionService,
    private userService: UserService,
    private route:ActivatedRoute,
    private investigacionInvestigadoresService:InvestigacionInvestigadoresService,
    private investigadorInvestigacionService:InvestigacionInvestigadoresService,
    private loginService:LoginService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  listaUsuariosDisponibles : any = []
  idProyecto:any;
  nombreProyecto:any;
  grupoInvestigacion:any = [];

  grupoInvestigacionEliminar:any = {
    proyectoInvestigacion:{
      idProyecto:0
    },
    usuario:{
      idUsuario:0
    }
  }
  
  grupoInvestigacionGuardar:any = {
    proyectoInvestigacion:{
      idProyecto:0
    },
    usuario:{
      idUsuario:0
    }
  }

  
  ngOnInit(): void {
    
    this.idProyecto = this.data.idProyecto;
    this.nombreProyecto = this.data.nombreProyecto;
    this.grupoInvestigacionEliminar.proyectoInvestigacion.idProyecto = this.idProyecto;
    this.grupoInvestigacionGuardar.proyectoInvestigacion.idProyecto = this.idProyecto;
    this.listarAsignados();
    this.listarDisponibles();
    
  }

  listarAsignados(){
    this.investigacionInvestigadoresService.listarInvestigadoresEnProyectosInvestigacion(this.idProyecto).subscribe(
      (data:any) => {
        console.log(data);
        this.grupoInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  listarDisponibles()
  {
    this.userService.listarInvestigadorNoAsignados(this.idProyecto).subscribe(
        res=>{
          this.listaUsuariosDisponibles=res;

        },
        err=>console.log(err)
      )
  }
  
  eliminarInvestigador(idUsuario:any){
    Swal.fire({
      title:'Eliminar investigador del proyecto',
      text:'¿Estás seguro , quieres eliminar este investigador del proyecto?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.grupoInvestigacionEliminar.usuario.idUsuario = idUsuario;
        console.log(idUsuario);
        this.investigacionInvestigadoresService.eliminarInvestigadorDeProyectoInvestigacion(this.grupoInvestigacionEliminar).subscribe(
          (data) => {
            this.snack.open('Investigador eliminado de la investigacion','',{
              duration:3000
            })
            this.grupoInvestigacion = this.grupoInvestigacion.filter((grupoInvestigacion:any) => grupoInvestigacion.usuario.idUsuario != idUsuario);
            this.listarDisponibles();
          },
          (error) => {
            this.snack.open('Error al eliminar el investigador','',{
              duration:3000
            })
            console.log(error);
          }
        )
      }
    })
  }
  
  asignarInvestigador(idUsuario:any){
    Swal.fire({
      title:'Agregar Investigador',
      text:'¿Estás seguro de agregar al investigador en la investigacion?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.grupoInvestigacionGuardar.usuario.idUsuario = idUsuario;
        //this.grupoInvestigacion.usuario['idUsuario'] = idUsuario;
        this.investigadorInvestigacionService.guardarGrupoDeInvestigacion(this.grupoInvestigacionGuardar).subscribe(
          (data) => {
            this.listaUsuariosDisponibles = this.listaUsuariosDisponibles.filter((listaUsuariosDisponibles:any) => listaUsuariosDisponibles.idUsuario != idUsuario);
            Swal.fire('Investigador Asignado','El investigador se ha asignado a la investigacion','success');
            this.listarAsignados();
          },
          (error) => {
            console.log(error);
            Swal.fire('Error','Error al asignar al investigador','error');
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


@Component({
  selector: 'view-investigadores-proyectos-investigacion-eliminado',
  templateUrl: 'view-investigadores-proyectos-investigacion-eliminado.html',
  styleUrls: ['./view-proyecto-investigacion.component.css']
})
export class ViewInvestigadoresProyectosInvestigacionEliminado {
  constructor(
    public dialogRef: MatDialogRef<ViewInvestigadoresProyectosInvestigacionEliminado>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataProyectoInvestigacion,
    private snack:MatSnackBar, 
    private investigacionService:InvestigacionService,
    private userService: UserService,
    private route:ActivatedRoute,
    private investigacionInvestigadoresService:InvestigacionInvestigadoresService,
    private investigadorInvestigacionService:InvestigacionInvestigadoresService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  idProyecto:any;
  nombreProyecto:any;
  grupoInvestigacion:any = [];

  grupoInvestigacionEliminar:any = {
    proyectoInvestigacion:{
      idProyecto:0
    },
    usuario:{
      idUsuario:0
    }
  }

  ngOnInit(): void {
    this.idProyecto = this.data.idProyecto;
    this.nombreProyecto = this.data.nombreProyecto;  
    this.grupoInvestigacionEliminar.proyectoInvestigacion.idProyecto = this.idProyecto;  
    this.listarAsignados();
    
  }

  listarAsignados(){
    this.investigacionInvestigadoresService.listarInvestigadoresEnProyectosInvestigacion(this.idProyecto).subscribe(
      (data:any) => {
        console.log(data);
        this.grupoInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  eliminarInvestigador(idUsuario:any){
    Swal.fire({
      title:'Eliminar investigador del proyecto',
      text:'¿Estás seguro , quieres eliminar este investigador del proyecto?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.grupoInvestigacionEliminar.usuario.idUsuario = idUsuario;
        console.log(idUsuario);
        this.investigacionInvestigadoresService.eliminarInvestigadorDeProyectoInvestigacion(this.grupoInvestigacionEliminar).subscribe(
          (data) => {
            this.snack.open('Investigador eliminado de la investigacion','',{
              duration:3000
            })
            this.grupoInvestigacion = this.grupoInvestigacion.filter((grupoInvestigacion:any) => grupoInvestigacion.usuario.idUsuario != idUsuario);
            
          },
          (error) => {
            this.snack.open('Error al eliminar el investigador','',{
              duration:3000
            })
            console.log(error);
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
