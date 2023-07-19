import { AfterViewInit, Component, Input, SimpleChanges, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CarbonoService } from 'src/app/services/carbono.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CarbonoTableDataSource, CarbonoTableItem } from './carbono-table-datasource';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';

export interface DialogData {
  id: '';
  idProyInv:'';
  motivo:''
}

@Component({
  selector: 'app-carbono-table',
  templateUrl: './carbono-table.component.html',
  styleUrls: ['./carbono-table.component.css']
})
export class CarbonoTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CarbonoTableItem>;
  

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    
    displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'dato6',  'opciones'];

    constructor(private carbonoService:CarbonoService, 
      private route:ActivatedRoute, public dialog: MatDialog) {
      
    }
  
    listaCarbono : any = []
    idProInves= 0;
    
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.idProInves = params['id'];
        this.idProInves = this.route.snapshot.params['id'];
        this.carbonoService.listarInvestigacionesId(this.idProInves).subscribe(
          res=>{
            this.listaCarbono=res;
            console.log(res);
          },
          err=>console.log(err)
        )
      })
    }


    eliminarCarbono(idCarbono:any){
      Swal.fire({
        title:'Eliminar ubicació',
        text:'¿Estás seguro de eliminar la ubicacion?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.carbonoService.eliminarCarbono(idCarbono).subscribe(
            (data) => {
              this.listaCarbono = this.listaCarbono.filter((carbono:any) => carbono.idCarbono != idCarbono);
              Swal.fire('Ubicacion eliminada','La ubicacion ha sido eliminado de la base de datos','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la ubicacion','error');
            }
          )
        }
      })
    }
  
    ngAfterViewInit(): void {
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

    //Dialogo
    datoresult='';
    openDialog(idCarbono:any): void {
    const dialogRef = this.dialog.open(DialogEliminar, {
      data: {id: idCarbono, idProyInv:this.idProInves ,motivo:''},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.datoresult=result;
      if(this.datoresult!=''){
        this.listaCarbono = this.listaCarbono.filter((carbono:any) => carbono.idCarbono != idCarbono);
        console.log(this.datoresult);
      }
    });
  }


}


@Component({
  selector: 'dialog-eliminar',
  templateUrl: 'dialog-eliminar.html',
  styleUrls: ['./carbono-table.component.css']
})

export class DialogEliminar {
  constructor(
    public dialogRef: MatDialogRef<DialogEliminar>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private snack:MatSnackBar, 
    private solicitudAccesoService:SolicitudAccesoService,
    private carbonoService:CarbonoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  dataCarbono:any;
  

formSubmit(){
  
  if(this.data.motivo== '' || this.data.motivo == null){
    this.snack.open('El motivo del rechazo de la solicitud es requerido !!','Aceptar',{
      duration : 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center'
    });
    return;
  }
  
  this.solicitudAccesoService.enviarSolicitudEliminar(this.data.id,this.data.idProyInv,this.data.idProyInv,this.data.motivo).subscribe(
    (data) => {
      console.log(data);
      Swal.fire('Solicitud enviada','El director aprovara o rechazara la eliminación del dato','success');
      this.dialogRef.close();
      
    },(error) => {
      console.log(error);
      this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
        duration : 3000
      });
    }
  )
  
}
}

