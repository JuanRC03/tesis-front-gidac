import { AfterViewInit, Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import Swal from 'sweetalert2';
import { ViewDatoRecolectadoDataSource, ViewDatoRecolectadoItem } from './view-dato-recolectado-datasource';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { LoginService } from 'src/app/services/login.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { VariableUnidadMedidaService } from 'src/app/services/variable-unidad-medida.service';

@Component({
  selector: 'app-view-dato-recolectado',
  templateUrl: './view-dato-recolectado.component.html',
  styleUrls: ['./view-dato-recolectado.component.css']
})
export class ViewDatoRecolectadoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewDatoRecolectadoItem>;
  dataSource: ViewDatoRecolectadoDataSource;


  constructor(private datoRecolectadoService:DatoRecolectadoService,
    private route:ActivatedRoute,
    public login:LoginService,
    public dialog: MatDialog,
    public investigacionService:InvestigacionService) {
    this.dataSource = new ViewDatoRecolectadoDataSource();
  }

  displayedColumns = ['dato1', 'dato2','dato3','dato4', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  idPunto= 0;
  idParcela= 0;
  idConglomerado= 0;
  idProyecto= 0;
  usuario:any = null;
  ngOnInit(): void {
    this.usuario = this.login.getUser();
    console.log(this.usuario);
    console.log(this.usuario.idUsuario);
    this.idPunto = this.route.snapshot.params['idPunto'];
    this.idParcela = this.route.snapshot.params['idParcela'];
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
    this.listarProyectosVigentes();
  }

  datos : any = []
    listarProyectosVigentes()
    {
      this.investigacionService.obtenerProyectoInvestigacion(this.idProyecto).subscribe(
          res=>{
            this.datos=res;
          },
          err=>console.log(err)
        )
    }

    listaDatos : any = []

    listarVigentes()
    {
      this.datoRecolectadoService.obtenerPorDataset(this.idPunto).subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(idDatoRecolectado:any){
      Swal.fire({
        title:'Eliminar parcela',
        text:'¿Estás seguro de eliminar la parcela?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.datoRecolectadoService.eliminar(idDatoRecolectado).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idDatoRecolectado != idDatoRecolectado);
              Swal.fire('Parcela eliminado','La parcela ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la parcela, la parcela debe estar vacio','error');
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

    //dialogo acualizar
    datoresult='';
    openDialog(idDatoRecolectado:any): void {
      const dialogRef = this.dialog.open(DialogoSolicitudActualizar, {
        data: {id: idDatoRecolectado, idProyInv:this.idProyecto, idUsuario:this.usuario.idUsuario ,motivo:''},
    });
    dialogRef.afterClosed().subscribe(result => {
      
      this.datoresult=result;
      if(this.datoresult!=''){
        this.listaDatos = this.listaDatos.filter((dato:any) => dato.idDatoRecolectado != idDatoRecolectado);
        console.log(this.datoresult);
      }
    });
  }

  
  //agregar
  agregar(): void {
    const dialogRef = this.dialog.open(AgregarDatoRecolectado, {
      data: { idDataset:this.idPunto},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
    
  }

  //editar
  editar(id:any, dato1:any, dato2:any, dato3:any): void {
    const dialogRef = this.dialog.open(EditarDatoRecolectado, {
      data: { idValorRecolectado: id, valor:dato1,idVariableUnidadMedida:dato2,idDataset:dato3},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }
}





export interface dataEditar {
  idValorRecolectado:0,
  valor: '',
  idDataset:0,
  idVariableUnidadMedida:0
}


@Component({
selector: 'editar-dato-recolectado',
templateUrl: 'editar-dato-recolectado.html',
styleUrls: ['./view-dato-recolectado.component.css']
})

export class EditarDatoRecolectado {
constructor(
  public dialogRef: MatDialogRef<EditarDatoRecolectado>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private datoRecolectadoService:DatoRecolectadoService,
  private snack: MatSnackBar,
  private variableUnidadMedidaService:VariableUnidadMedidaService

) { }

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.listarVariableUnidadMedida();
  this.data.idValorRecolectado=this.data1.idValorRecolectado;
  this.data.valor=this.data1.valor;
  this.data.dataset.idDataset=this.data1.idDataset;
  this.data.variableUnidadMedida.idVariableUnidadMedida=this.data1.idVariableUnidadMedida;
}


public data = {
  idValorRecolectado:0,
  valor: '',
  vigencia: 1,
  dataset:{
    idDataset:0
  },
  variableUnidadMedida:{
    idVariableUnidadMedida:0
  }
}

formatDate(date: string): string {
  const parts = date.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return '';
}



variableUnidadMedida : any = []
listarVariableUnidadMedida()
    {
      this.variableUnidadMedidaService.listar().subscribe(
          res=>{
            this.variableUnidadMedida=res;
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public editar() {
  if (this.data.valor== '') {
    this.snack.open('EL valor del dato recolectado es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.variableUnidadMedida.idVariableUnidadMedida== 0) {
    this.snack.open('La variable es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  this.datoRecolectadoService.guardar(this.data).subscribe(
    (data) => {
      Swal.fire('Dato recolectado añadido', 'El dato recolectado se añadio con éxito', 'success').then(
        (e) => {
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error al anadir el dato recolectado', 'No se registro el dato recolectado', 'error');
      console.log(error);
    }
  );
    
    
  }

}



@Component({
selector: 'agregar-dato-recolectado',
templateUrl: 'agregar-dato-recolectado.html',
styleUrls: ['./view-dato-recolectado.component.css']
})

export class AgregarDatoRecolectado {
constructor(
  public dialogRef: MatDialogRef<AgregarDatoRecolectado>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private variableUnidadMedidaService:VariableUnidadMedidaService,
  private snack: MatSnackBar,
  private datoRecolectadoService:DatoRecolectadoService
) { }

onNoClick(): void {
  this.dialogRef.close();
}



public data = {
  valor: '',
  vigencia: 1,
  dataset:{
    idDataset:0
  },
  variableUnidadMedida:{
    idVariableUnidadMedida:0
  }
}



ngOnInit(): void {
  this.listarVariableUnidadMedida();
  this.data.dataset.idDataset=this.data1.idDataset;
}

variableUnidadMedida : any = []
listarVariableUnidadMedida()
    {
      this.variableUnidadMedidaService.listar().subscribe(
          res=>{
            this.variableUnidadMedida=res;
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public agregar() {
  
  if (this.data.valor== '') {
    this.snack.open('EL valor del dato recolectado es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.variableUnidadMedida.idVariableUnidadMedida== 0) {
    this.snack.open('La variable es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  this.datoRecolectadoService.guardar(this.data).subscribe(
    (data) => {
      Swal.fire('Dato recolectado añadido', 'El dato recolectado se añadio con éxito', 'success').then(
        (e) => {
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error al anadir el dato recolectado', 'No se registro el dato recolectado', 'error');
      console.log(error);
    }
  );
    
  }

}


  



  

  export interface DialogData {
    id: '';
    idProyInv:'';
    idUsuario:'';
    motivo:''
  }


  

@Component({
  selector: 'dialogo-solicitud-actualizar',
  templateUrl: 'dialogo-solicitud-actualizar.html',
  styleUrls: ['./view-dato-recolectado.component.css']
})

export class DialogoSolicitudActualizar {
  constructor(
    public dialogRef: MatDialogRef<DialogoSolicitudActualizar>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private snack:MatSnackBar, 
    private solicitudAccesoService:SolicitudAccesoService,
    private datoRecolectadoService: DatoRecolectadoService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  dataCarbono:any;
  

formSubmit(){
  
  if(this.data.motivo== '' || this.data.motivo == null){
    this.snack.open('El motivo del para actualizar los datos es requerido!!','Aceptar',{
      duration : 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center'
    });
    return;
  }
  
  this.solicitudAccesoService.enviarSolicitudEliminar(this.data.id,this.data.idProyInv,this.data.idUsuario,this.data.motivo).subscribe(
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

