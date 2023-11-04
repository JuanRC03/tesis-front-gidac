import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewPaisAdminDataSource, ViewPaisAdminItem } from './view-pais-admin-datasource';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from 'src/app/services/pais.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-pais-admin',
  templateUrl: './view-pais-admin.component.html',
  styleUrls: ['./view-pais-admin.component.css']
})
export class ViewPaisAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewPaisAdminItem>;
  dataSource: ViewPaisAdminDataSource;

  
  constructor(private route:ActivatedRoute,
    private paisService:PaisService,
    private ubicacionService:UbicacionService,
    public matDialog: MatDialog) {
    this.dataSource = new ViewPaisAdminDataSource();
  }
  
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
    
  ngOnInit(): void {
    
    this.listarPaises();
  }

    listaDatos : any = []

  listarPaises()
    {
      
      this.ubicacionService.obtenerPaises().subscribe(
          (res:any)=>{
            this.listaDatos=res;
            
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar el país?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.ubicacionService.eliminarPaises(id).subscribe(
            (data) => {
              Swal.fire('Información eliminada','El país ha sido eliminado','success');
              this.listarPaises();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el pais','error');
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
      const dialogRef = this.matDialog.open(DialogAddPais, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarPaises();
      });
    }

    openDialogEditar(codigo:any, nombre:any): void {
      const dialogRef = this.matDialog.open(DialogEditarPais, {
        data: { codigoPais: codigo, nombrePais:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarPaises();
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
    selector: 'add-pais-admin',
    templateUrl: 'add-pais-admin.html',
    styleUrls: ['./view-pais-admin.component.css']
  })
  export class DialogAddPais {
    constructor(
      public dialogRef: MatDialogRef<DialogAddPais>,
      private snack: MatSnackBar,
      private service: UbicacionService,
  
    ) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    investigacion: any = [];
  
    ngOnInit(): void {
      
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

      if (this.nuevaLocalizacion.codigoPais == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El nombre del país es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }

      if (this.nuevaLocalizacion.nombrePais == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El código del país es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }
  
      this.service.guardarPais(this.nuevaLocalizacion).subscribe(
        (data) => {
          Swal.fire('Información guardada ', 'El pais se ha guardado con exito', 'success');
          this.dialogRef.close();
  
        }, (error) => {
          console.log(error);
          Swal.fire('Error en el sistema', 'El pais no se ha guardado', 'error');
        }
      )
    }
  }


  @Component({
    selector: 'editar-pais-admin',
    templateUrl: 'editar-pais-admin.html',
    styleUrls: ['./view-pais-admin.component.css']
  })
  export class DialogEditarPais {
    constructor(
      public dialogRef: MatDialogRef<DialogEditarPais>,
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

      if (this.nuevaLocalizacion.codigoPais == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El nombre del país es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }

      if (this.nuevaLocalizacion.nombrePais == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El código del país es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }
  
  
      const formData = new FormData();
      formData.append('datosBusqueda', JSON.stringify(this.nuevaLocalizacion1));
      formData.append('datosActualizar', JSON.stringify(this.nuevaLocalizacion));
      
      this.service.actualizarPais(formData).subscribe(
        (data) => {
          Swal.fire('Información actualizada', 'El país se ha actualizado con exito', 'success');
          this.dialogRef.close();
  
        }, (error) => {
          console.log(error);
          Swal.fire('Error en el sistema', 'El país no se ha actualizado', 'error');
        }
      )
    }
  }