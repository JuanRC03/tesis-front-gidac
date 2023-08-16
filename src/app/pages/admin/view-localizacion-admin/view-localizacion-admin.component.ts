import { AfterViewInit, Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewLocalizacionAdminDataSource, ViewLocalizacionAdminItem } from './view-localizacion-admin-datasource';
import Swal from 'sweetalert2';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-localizacion-admin',
  templateUrl: './view-localizacion-admin.component.html',
  styleUrls: ['./view-localizacion-admin.component.css']
})
export class ViewLocalizacionAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewLocalizacionAdminItem>;
  dataSource: ViewLocalizacionAdminDataSource;

 

  constructor(private ubicacionService:UbicacionService,
    public dialog: MatDialog) {
    this.dataSource = new ViewLocalizacionAdminDataSource();
  }

  displayedColumns = ['dato1', 'dato2','dato3', 'dato4', 'dato5', 'opciones'];
  
  ngAfterViewInit(): void {
  }
    
  ngOnInit(): void {
    
    this.listar();
  }

    listaDatos : any = []
    listaDatosEliminados : any = []

  listar()
    {
      
      this.ubicacionService.listarVigente().subscribe(
          (res:any)=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    listarEliminados()
    {
      
      this.ubicacionService.listarEliminado().subscribe(
          (res:any)=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar localización',
        text:'¿Estás seguro de eliminar la localización?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.ubicacionService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idLocalizacion!= id);
              Swal.fire('Localización eliminada','La localización ha sido eliminada','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la localización','error');
            }
          )
        }
      })
    }
  
    //paginacion y busqueda
    page_size:number=10
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
  
    editar(id:any, dato1:any, dato2:any, dato3:any, dato4:any, dato5:any): void {
      const dialogRef = this.dialog.open(EditarLocalizacion, {
        data: { idUsuario: id, nombreUsuario:dato1,apellidoUsuario:dato2,cedula:dato3,telefono:dato4,email:dato5},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listar();
      });
    }

  }
  

  
export interface dataEditar {
  idUsuario:0,
  nombreUsuario: '',
  apellidoUsuario: '',
  cedula:'',
  telefono:'',
  email: '',
  vigencia: 1,
  idRol: 2
}





@Component({
selector: 'editar-localizacion',
templateUrl: 'editar-localizacion.html',
styleUrls: ['./view-localizacion-admin.component.css']
})

export class EditarLocalizacion {
constructor(
  public dialogRef: MatDialogRef<EditarLocalizacion>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private userService:UserService,
  private snack: MatSnackBar,
) { }

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.data.idUsuario=this.data1.idUsuario;
  this.data.nombreUsuario=this.data1.nombreUsuario;
  this.data.apellidoUsuario=this.data1.apellidoUsuario;
  this.data.cedula=this.data1.cedula;
  this.data.telefono=this.data1.telefono;
  this.data.email=this.data1.email;
  this.data.rol.idRol=this.data1.idRol;
}

public data = {
  idUsuario:0,
  nombreUsuario: '',
  apellidoUsuario: '',
  cedula:'',
  telefono:'',
  email: '',
  vigencia: 1,
  rol: {
    idRol: 1
  }
}





public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public editar() {
  if (this.data.nombreUsuario.trim() == '' || this.data.nombreUsuario.trim() == null) {
    this.snack.open('El nombre del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.apellidoUsuario.trim() == '' || this.data.apellidoUsuario.trim() == null) {
    this.snack.open('El apellido del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.cedula.trim() == '' || this.data.cedula.trim() == null) {
    this.snack.open('La cédula del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  if (this.data.telefono.trim() == '' || this.data.telefono.trim() == null) {
    this.snack.open('El teléfono del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.email.trim() == '' || this.data.email.trim() == null) {
    this.snack.open('El email del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  

  this.userService.editarPerfil(this.data).subscribe(
    (data) => {
      Swal.fire('Administrador actualizado', 'El administrador se actualizado con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error al actualizadar al administrador', 'No se actualizado al administrador', 'error');
      console.log(error);
    }
  );
    
  }

}
  

  
