import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewProvinciaAdminDataSource, ViewProvinciaAdminItem } from './view-provincia-admin-datasource';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-provincia-admin',
  templateUrl: './view-provincia-admin.component.html',
  styleUrls: ['./view-provincia-admin.component.css']
})
export class ViewProvinciaAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewProvinciaAdminItem>;
  dataSource: ViewProvinciaAdminDataSource;


  constructor(private route:ActivatedRoute,
    private provinciaService:ProvinciaService,
    private ubicacionService:UbicacionService,
    private matDialog:MatDialog) {
    this.dataSource = new ViewProvinciaAdminDataSource();
  }

  
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  

  idPais= '';
  ngOnInit(): void {
    this.idPais = this.route.snapshot.params['idPais'];
    this.listarProvincias();
  }

    listaDatos : any = []

    listarProvincias()
    {
      this.ubicacionService.obtenerProvincias(this.idPais).subscribe(
          (res:any)=>{
            this.listaDatos=res
            
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar la provincia?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.ubicacionService.eliminarProvincias(this.idPais, id).subscribe(
            (data) => {
              Swal.fire('Información eliminada','La provincia ha sido eliminada','success');
              this.listarProvincias();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la provincia','error');
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
      const dialogRef = this.matDialog.open(DialogAddProvincia, {
        data: { codigoPais: this.idPais}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarProvincias();
      });
    }

    openDialogEditar(codigo:any, nombre:any): void {
      console.log(codigo)
      console.log(nombre)
      const dialogRef = this.matDialog.open(DialogEditarProvincia, {
        data: { codigoPais: this.idPais, codigoProvincia: codigo, nombreProvincia:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarProvincias();
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
    selector: 'add-provincia-admin',
    templateUrl: 'add-provincia-admin.html',
    styleUrls: ['./view-provincia-admin.component.css']
  })
  export class DialogAddProvincia {
    constructor(
      public dialogRef: MatDialogRef<DialogAddProvincia>,
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

      if (this.nuevaLocalizacion.codigoProvincia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El código de la provincia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }

      if (this.nuevaLocalizacion.nombreProvincia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El nombre de la provincia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }
  
      this.service.guardarProvincia(this.nuevaLocalizacion).subscribe(
        (data) => {
          Swal.fire('Información actualizada', 'La provincia se ha guardado con exito', 'success');
          this.dialogRef.close();
  
        }, (error) => {
          console.log(error);
          Swal.fire('Error en el sistema', 'La provincia no se ha guardado', 'error');
        }
      )
    }
  }


  @Component({
    selector: 'editar-provincia-admin',
    templateUrl: 'editar-provincia-admin.html',
    styleUrls: ['./view-provincia-admin.component.css']
  })
  export class DialogEditarProvincia {
    constructor(
      public dialogRef: MatDialogRef<DialogEditarProvincia>,
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

      if (this.nuevaLocalizacion.codigoProvincia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El código de la provincia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }

      if (this.nuevaLocalizacion.nombreProvincia == '' || this.nuevaLocalizacion.codigoPais == null) {
        this.snack.open('El nombre de la provincia es requerido !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }
  
      const formData = new FormData();
      formData.append('datosBusqueda', JSON.stringify(this.nuevaLocalizacion1));
      formData.append('datosActualizar', JSON.stringify(this.nuevaLocalizacion));

      this.service.actualizarProvincia(formData).subscribe(
        (data) => {
          Swal.fire('Información actualizada', 'La provincia se ha actualizado con exito', 'success');
          this.dialogRef.close();
  
        }, (error) => {
          console.log(error);
          Swal.fire('Error en el sistema', 'La provincia no se ha actualizado', 'error');
        }
      )
    }
  }
  
