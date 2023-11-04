import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewParroquiaAdminDataSource, ViewParroquiaAdminItem } from './view-parroquia-admin-datasource';
import { ActivatedRoute } from '@angular/router';
import { CantonService } from 'src/app/services/canton.service';
import { ParroquiaService } from 'src/app/services/parroquia.service';
import Swal from 'sweetalert2';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-parroquia-admin',
  templateUrl: './view-parroquia-admin.component.html',
  styleUrls: ['./view-parroquia-admin.component.css']
})
export class ViewParroquiaAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewParroquiaAdminItem>;
  dataSource: ViewParroquiaAdminDataSource;

  constructor(private route:ActivatedRoute,
              private parroquiaService:ParroquiaService,
              private matDialog:MatDialog,
              private ubicacionService:UbicacionService ) {

    this.dataSource = new ViewParroquiaAdminDataSource();
  }

  
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  

  idPais= 0;
  idProvincia=0;
  idCanton=0;
  ngOnInit(): void {
    this.idPais = this.route.snapshot.params['idPais'];
    this.idProvincia = this.route.snapshot.params['idProvincia'];
    this.idCanton = this.route.snapshot.params['idCanton'];
    this.listarParroquias();
  }

    listaDatos : any = []

    listarParroquias()
    {
      this.ubicacionService.obtenerParroquias(this.idPais,this.idProvincia,this.idCanton).subscribe(
          (res:any)=>{
            this.listaDatos = res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información ',
        text:'¿Estás seguro de eliminar la parroquia?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.ubicacionService.eliminarParroquia(this.idPais, this.idProvincia, this.idCanton, id).subscribe(
            (data) => {
              Swal.fire('Información eliminada','La parroquia ha sido eliminada','success');
              this.listarParroquias();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la parroquia','error');
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
  
    openDialogAgregar(): void {
      const dialogRef = this.matDialog.open(DialogAddParroquia, {
        data: { codigoPais: this.idPais, codigoProvincia:this.idProvincia, codigoCanton:this.idCanton}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarParroquias();
      });
    }

    openDialogEditar(codigo:any, nombre:any): void {
      console.log(codigo)
      console.log(nombre)
      const dialogRef = this.matDialog.open(DialogEditarParroquia, {
        data: { codigoPais: this.idPais, codigoProvincia:this.idProvincia, codigoCanton:this.idCanton, codigoParroquia:codigo, nombreParroquia:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarParroquias();
      });
    }
  }
  


  interface DatosActualizar {
    codigoPais: '',
    nombrePais:'',
    codigoProvincia: '',
    nombreProvincia:'',
    codigoCanton: '',
    nombreCanton:'',
    codigoParroquia: '',
    nombreParroquia:'',
  }
    
  @Component({
    selector: 'add-parroquia-admin',
    templateUrl: 'add-parroquia-admin.html',
    styleUrls: ['./view-parroquia-admin.component.css']
  })
  export class DialogAddParroquia {
    constructor(
      public dialogRef: MatDialogRef<DialogAddParroquia>,
      @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
      private snack: MatSnackBar,
      private service: UbicacionService,
  
    ) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    investigacion: any = [];
  
    ngOnInit(): void {
      this.nuevaLocalizacion.codigoPais=this.datos.codigoPais
      this.nuevaLocalizacion.nombrePais=this.datos.nombrePais
      this.nuevaLocalizacion.codigoProvincia=this.datos.codigoProvincia
      this.nuevaLocalizacion.nombreProvincia=this.datos.nombreProvincia
      this.nuevaLocalizacion.codigoCanton=this.datos.codigoCanton
      this.nuevaLocalizacion.nombreCanton=this.datos.nombreCanton
      this.nuevaLocalizacion.codigoParroquia=this.datos.codigoParroquia
      this.nuevaLocalizacion.nombreParroquia=this.datos.nombreParroquia
      
    }

    public nuevaLocalizacion = {
      codigoPais: '',
      nombrePais:'',
      codigoProvincia: '',
      nombreProvincia:'',
      codigoCanton: '',
      nombreCanton:'',
      codigoParroquia: '',
      nombreParroquia:'',
    }
  
  
    formSubmit() {

      if (this.nuevaLocalizacion.codigoParroquia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El código de la parroquia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }

      if (this.nuevaLocalizacion.nombreParroquia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El nombre de la parroquia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }
      
  
      this.service.guardarParroquia(this.nuevaLocalizacion).subscribe(
        (data) => {
          Swal.fire('Información guardada ', 'La parroquia se ha guardado con exito', 'success');
          this.dialogRef.close();
  
        }, (error) => {
          console.log(error);
          Swal.fire('Error en el sistema', 'La parroquia no se ha guardado', 'error');
        }
      )
    }
  }


  @Component({
    selector: 'editar-parroquia-admin',
    templateUrl: 'editar-parroquia-admin.html',
    styleUrls: ['./view-parroquia-admin.component.css']
  })
  export class DialogEditarParroquia {
    constructor(
      public dialogRef: MatDialogRef<DialogEditarParroquia>,
      @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
      private snack: MatSnackBar,
      private service: UbicacionService,
  
    ) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    investigacion: any = [];
  
    ngOnInit(): void {
      this.nuevaLocalizacion.codigoPais=this.datos.codigoPais
      this.nuevaLocalizacion.nombrePais=this.datos.nombrePais
      this.nuevaLocalizacion.codigoProvincia=this.datos.codigoProvincia
      this.nuevaLocalizacion.nombreProvincia=this.datos.nombreProvincia
      this.nuevaLocalizacion.codigoCanton=this.datos.codigoCanton
      this.nuevaLocalizacion.nombreCanton=this.datos.nombreCanton
      this.nuevaLocalizacion.codigoParroquia=this.datos.codigoParroquia
      this.nuevaLocalizacion.nombreParroquia=this.datos.nombreParroquia

      this.nuevaLocalizacion1.codigoPais=this.datos.codigoPais
      this.nuevaLocalizacion1.nombrePais=this.datos.nombrePais
      this.nuevaLocalizacion1.codigoProvincia=this.datos.codigoProvincia
      this.nuevaLocalizacion1.nombreProvincia=this.datos.nombreProvincia
      this.nuevaLocalizacion1.codigoCanton=this.datos.codigoCanton
      this.nuevaLocalizacion1.nombreCanton=this.datos.nombreCanton
      this.nuevaLocalizacion1.codigoParroquia=this.datos.codigoParroquia
      this.nuevaLocalizacion1.nombreParroquia=this.datos.nombreParroquia
      
    }

    public nuevaLocalizacion = {
      codigoPais: '',
      nombrePais:'',
      codigoProvincia: '',
      nombreProvincia:'',
      codigoCanton: '',
      nombreCanton:'',
      codigoParroquia: '',
      nombreParroquia:'',
    }

    public nuevaLocalizacion1 = {
      codigoPais: '',
      nombrePais:'',
      codigoProvincia: '',
      nombreProvincia:'',
      codigoCanton: '',
      nombreCanton:'',
      codigoParroquia: '',
      nombreParroquia:'',
    }
  
  
    formSubmit() {

      if (this.nuevaLocalizacion.codigoParroquia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El código de la parroquia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }

      if (this.nuevaLocalizacion.nombreParroquia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El nombre de la parroquia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }

      const formData = new FormData();
      formData.append('datosBusqueda', JSON.stringify(this.nuevaLocalizacion1));
      formData.append('datosActualizar', JSON.stringify(this.nuevaLocalizacion));
  
      this.service.actualizarParroquia(formData).subscribe(
        (data) => {
          Swal.fire('Información actualizada', 'La parroquia se ha actualizado con exito', 'success');
          this.dialogRef.close();
  
        }, (error) => {
          console.log(error);
          Swal.fire('Error en el sistema', 'La parroquia no se ha actualizado', 'error');
        }
      )
    }
  }
  

  


