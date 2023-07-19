import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AreasInvestigacionService } from 'src/app/services/areas-investigacion.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { UserService } from 'src/app/services/user.service';
import { DirectorAreaInvestigacionService } from 'src/app/services/director-area-investigacion.service';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  

  selector: 'app-view-area-investigacion',
  templateUrl: './view-area-investigacion.component.html',
  styleUrls: ['./view-area-investigacion.component.css'],
  
  
})

export class ViewAreaInvestigacionComponent implements OnInit {
  
  areasInvestigaciones : any = []

  areasInvestigacionesEliminadas : any = []

  constructor(private areasInvestigacionService:AreasInvestigacionService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarAreasInvestigacionDisponibles();
    this.listarAreasInvestigacionEliminadas();
  }

  listarAreasInvestigacionDisponibles(){

    this.areasInvestigacionService.obtenerAreasInvestigacionVigentes().subscribe(
      (dato:any) => {
        this.areasInvestigaciones = dato;
      },
      (error) => {
        console.log(error);
        
      }
    )

  }
  listarAreasInvestigacionEliminadas(){
    this.areasInvestigacionService.obtenerAreasInvestigacionEliminadas().subscribe(
      (dato:any) => {
        this.areasInvestigacionesEliminadas = dato;
      },
      (error) => {
        console.log(error);
        
      }
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

  eliminarAreaInvestigacion(idAreaInvestigacion:any){
    Swal.fire({
      title:'Eliminar área de investigación',
      text:'¿Esta seguro de eliminar el área de investigación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.areasInvestigacionService.eliminarAreaInvestigacion(idAreaInvestigacion).subscribe(
          (data) => {
            this.areasInvestigaciones = this.areasInvestigaciones.filter((areasInvestigaciones:any) => areasInvestigaciones.idAreaInvestigacion != idAreaInvestigacion);
            Swal.fire('Área de investigación eliminada', 'El área de investigación ha sido eliminada', 'success');
            this.listarAreasInvestigacionEliminadas();
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el area de investigacion','error');
          }
        )
      }
    })
  }

  restaurarAreaInvestigacion(idAreaInvestigacion:any){
    Swal.fire({
      title:'Restaurar área de investigación',
      text:'¿Esta seguro de restaurar el área de investigación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Restaurar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.areasInvestigacionService.restaurarAreaInvestigacion(idAreaInvestigacion).subscribe(
          (data) => {
            this.areasInvestigacionesEliminadas = this.areasInvestigacionesEliminadas.filter((areasInvestigacionesEliminadas:any) => areasInvestigacionesEliminadas.idAreaInvestigacion != idAreaInvestigacion);
            Swal.fire('Área de investigación restaurada', 'El área de investigación ha sido restaurada', 'success');
            this.listarAreasInvestigacionDisponibles();
          },
          (error) => {
            Swal.fire('Error','Error al restaurar el area de investigacion','error');
          }
        )
      }
    })
  }

  //abrir el dialogo de proyectos de investigacion
  openDialogProyectosInvestigacion(idAreaInvestigacion:any): void {
    const dialogRef = this.dialog.open(InvestigacionesAreaInvestigacion, {
      data: {idAreaInvestigacion: idAreaInvestigacion},
    });
  }

  //abrir el dialogo de directores
  openDialogDirector(idAreaInvestigacion:any): void {
    const dialogRef = this.dialog.open(DirectoresDisponiblesAreaInvestigacion, {
      data: {idAreaInvestigacion: idAreaInvestigacion},
    });
  }

  //abrir el dialogo de reasignacion directores
  openDialogReasignarDirector(idUsuario:any,idAreaInvestigacion:any): void {
    const dialogRef = this.dialog.open(ReasignarDirectoresAreaInvestigacion, {
      data: {idUsuario: idUsuario,idAreaInvestigacion: idAreaInvestigacion},
    });
  }

  //abrir el dialogo de directores de area de investigacion
  openDialogDirectorAsignado(idUsuario:any,idAreaInvestigacion:any,nombreAreaInvestigacion:any): void {
    const dialogRef = this.dialog.open(ViewDirectorAsignado, {
      data: {idUsuario: idUsuario, idAreaInvestigacion:idAreaInvestigacion,nombreAreaInvestigacion:nombreAreaInvestigacion},
    });
  }

}


export interface DialogData {
  idAreaInvestigacion:0
}

export interface DialogDataUsuario {
  idUsuario:0,
  idAreaInvestigacion:0,
  nombreAreaInvestigacion:String
}

export interface DialogDataAreaInvestigacion {
  idAreaInvestigacion:0
}

export interface DialogDataReasignarAreaInvestigacion {
  idUsuario:0,
  idAreaInvestigacion:0
}


@Component({
  selector: 'investigaciones-area-investigacion',
  templateUrl: 'investigaciones-area-investigacion.html',
  styleUrls: ['./view-area-investigacion.component.css']
})
export class InvestigacionesAreaInvestigacion {
  constructor(
    public dialogRef: MatDialogRef<InvestigacionesAreaInvestigacion>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private snack:MatSnackBar, 
    private investigacionService:InvestigacionService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  proyectoInvestigacio:any = [];




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
  selector: 'directores-disponibles-area-investigacion',
  templateUrl: 'directores-disponibles-area-investigacion.html',
  styleUrls: ['./view-area-investigacion.component.css']
})
export class DirectoresDisponiblesAreaInvestigacion {
  constructor(
    public dialogRef: MatDialogRef<DirectoresDisponiblesAreaInvestigacion>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataAreaInvestigacion,
    private snack:MatSnackBar, 
    private investigacionService:InvestigacionService,
    private userService: UserService,
    private directorAreaInvestigacionService: DirectorAreaInvestigacionService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  usuarios:any = [];

  directorAreaInvestigacion:any = {
    areaInvestigacion:{
      idAreaInvestigacion:0
    },
    usuario:{
      idUsuario:0
    }
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
  selector: 'reasignar-directores-area-investigacion',
  templateUrl: 'reasignar-directores-area-investigacion.html',
  styleUrls: ['./view-area-investigacion.component.css']
})
export class ReasignarDirectoresAreaInvestigacion {
  constructor(
    public dialogRef: MatDialogRef<ReasignarDirectoresAreaInvestigacion>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataReasignarAreaInvestigacion,
    private snack:MatSnackBar, 
    private investigacionService:InvestigacionService,
    private userService: UserService,
    private directorAreaInvestigacionService: DirectorAreaInvestigacionService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  usuarios:any = [];

  directorAreaInvestigacionAntiguo:any = {
    areaInvestigacion:{
      idAreaInvestigacion:0
    },
    usuario:{
      idUsuario:0
    }
  }

  directorAreaInvestigacionNuevo:any = {
    areaInvestigacion:{
      idAreaInvestigacion:0
    },
    usuario:{
      idUsuario:0
    }
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
  selector: 'view-director-asignado',
  templateUrl: 'view-director-asignado.html',
  styleUrls: ['./view-area-investigacion.component.css']
})
export class ViewDirectorAsignado {
  constructor(
    public dialogRef: MatDialogRef<ViewDirectorAsignado>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataUsuario,
    private snack:MatSnackBar, 
    private investigacionService:InvestigacionService,
    private userService: UserService,
    private directorAreaInvestigacionService:DirectorAreaInvestigacionService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  usuario:any = [];

  directorAreaInvestigacion:any = {
    areaInvestigacion:{
      idAreaInvestigacion:0
    },
    usuario:{
      idUsuario:0
    }
  }

  ngOnInit(): void {
    this.directorAreaInvestigacion.usuario.idUsuario=this.data.idUsuario;
    this.directorAreaInvestigacion.areaInvestigacion.idAreaInvestigacion=this.data.idAreaInvestigacion;
    this.userService.obtenerUsuarioID(this.data.idUsuario).subscribe(
      (dato:any) => {
        this.usuario = dato;
      },(error) => {
        console.log(error);
        
        this.snack.open('Error al cargar los directores !!','Aceptar',{
          duration : 3000
        });
        this.dialogRef.close();
  
      }
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



