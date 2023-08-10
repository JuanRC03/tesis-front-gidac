import { AfterViewInit, Component, ViewChild, Inject,EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAreasDataSource, ViewAreasItem } from './view-areas-datasource';
import { AreaService } from 'src/app/services/area.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MedidaService } from 'src/app/services/medida.service';


@Component({
  selector: 'app-view-areas',
  templateUrl: './view-areas.component.html',
  styleUrls: ['./view-areas.component.css']
})
export class ViewAreasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewAreasItem>;
  dataSource: ViewAreasDataSource;

  constructor( private areaService:AreaService,
    public matDialog: MatDialog) {
    this.dataSource = new ViewAreasDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.areaService.listar().subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
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
  


    //eliminar

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar área',
        text:'¿Estás seguro de eliminar el área?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.areaService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((lista:any) => lista.idAltura != id);
              Swal.fire('Área eliminado','El área ha sido eliminado','success');
              this.listar();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el área','error');
            }
          )
        }
      })
    }

    //agregar
    agregar(): void {
      const dialogRef = this.matDialog.open(EditarArea, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listar();
      });
      
    }

    //editar
    editar(id:any, dato1:any, dato2:any): void {
      const dialogRef = this.matDialog.open(EditarArea, {
        data: { idArea: id, area:dato1,idUnidadMedida:dato2},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listar();
      });
    }
  }
  



  
export interface dataEditar {
  idArea: 0,
  area: '',
  idUnidadMedida:0
}

@Component({
  selector: 'editar-area',
  templateUrl: 'editar-area.html',
  styleUrls: ['./view-areas.component.css']
})

export class EditarArea {
  constructor(
    public dialogRef: MatDialogRef<EditarArea>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private areaService:AreaService,
    private snack: MatSnackBar,
    private medidaService:MedidaService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listarMedidas();
    this.data.idArea=this.data1.idArea;
    this.data.area=this.data1.area;
    this.data.unidadMedida.idUnidadMedida=this.data1.idUnidadMedida;
  }

  medida : any = []
  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            console.log(this.medida);
          },
          err=>console.log(err)
        )
    }

  public data = {
      idArea:-1,
      area: '',
      unidadMedida:{
        idUnidadMedida:-1
      }
    }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public editar() {

    if (this.data.area.trim() == '' || this.data.area.trim() == null) {
      this.snack.open('El área es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.data.unidadMedida.idUnidadMedida == -1) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.areaService.guardar(this.data).subscribe(
      (data) => {
        Swal.fire('Área editada', 'El área se editado con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error al editadar el área', 'No se editada el área', 'error');
        console.log(error);
      }
    );
  }

}



@Component({
  selector: 'agregar-area',
  templateUrl: 'agregar-area.html',
  styleUrls: ['./view-areas.component.css']
})

export class AgregarArea {
  constructor(
    public dialogRef: MatDialogRef<AgregarArea>,
    private areaService:AreaService,
    private snack: MatSnackBar,
    private medidaService:MedidaService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public data = {
      area: '',
      unidadMedida:{
        idUnidadMedida:-1
      }
    }

  ngOnInit(): void {
    this.listarMedidas();
  }

  medida : any = []
  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            console.log(this.medida);
          },
          err=>console.log(err)
        )
    }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {

    if (this.data.area.trim() == '' || this.data.area.trim() == null) {
      this.snack.open('El área es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.data.unidadMedida.idUnidadMedida == -1) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.areaService.guardar(this.data).subscribe(
      (data) => {
        Swal.fire('Área añadida', 'El área se añadio con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error al anadir el área', 'No se registro el área', 'error');
        console.log(error);
      }
    );
  }

}



  
  