import { AfterViewInit, Component, ViewChild, Inject,EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';
import Swal from 'sweetalert2';
import { ViewParcelaDataSource, ViewParcelaItem } from './view-parcela-datasource';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AreaService } from 'src/app/services/area.service';



@Component({
  selector: 'app-view-parcela',
  templateUrl: './view-parcela.component.html',
  styleUrls: ['./view-parcela.component.css']
})
export class ViewParcelaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewParcelaItem>;
  dataSource: ViewParcelaDataSource;

  constructor(private parcelaService:ParcelaService,
    private route:ActivatedRoute,
    private investigacionService:InvestigacionService,
    public matDialog: MatDialog,
    public areaService:AreaService) {
    this.dataSource = new ViewParcelaDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];
  
  ngAfterViewInit(): void {
  }

  idConglomerado= 0;
  idProyecto=0;
  ngOnInit(): void {
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
    this.listarProyectosVigentes();
    this.listarArea();
  }

  area : any = []

  listarArea()
    {
      this.areaService.listar().subscribe(
          res=>{
            this.area=res;
          },
          err=>console.log(err)
        )
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
      this.parcelaService.obtenerPorConglomerado(this.idConglomerado).subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(idParcela:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar la parcela?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.parcelaService.eliminar(idParcela).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idParcela != idParcela);
              Swal.fire('Información eliminada','La parcela ha sido eliminada','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la parcela','error');
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
  

    
  //agregar
  agregar(): void {
    const dialogRef = this.matDialog.open(AgregarParcela, {
      data: { idConglomerado: this.idConglomerado, area:this.area},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
    
  }

  //editar
  editar(id:any, dato1:any, dato2:any, dato3:any, dato4:any, dato5:any): void {
    const dialogRef = this.matDialog.open(EditarParcela, {
      data: { idParcela: id, codigoParcela:dato1,nombreParcela:dato2,coordenadaX:dato3,coordenadaY:dato4,idArea:dato5, idConglomerado:this.idConglomerado, area:this.area},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }
}





export interface dataEditar {
  idParcela:0,
  codigoParcela: '',
  nombreParcela: '',
  coordenadaX: '',
  coordenadaY: '',
  idConglomerado:0,
  idArea:0,
  area : []
}




@Component({
selector: 'editar-parcela',
templateUrl: 'editar-parcela.html',
styleUrls: ['./view-parcela.component.css']
})

export class EditarParcela {
constructor(
  public dialogRef: MatDialogRef<EditarParcela>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private parcelaService:ParcelaService,
  private snack: MatSnackBar,
  private areaService:AreaService
) { }

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.area = this.data1.area;
  this.data.idParcela=this.data1.idParcela;
  this.data.codigoParcela=this.data1.codigoParcela;
  this.data.nombreParcela=this.data1.nombreParcela;
  this.data.coordenadaX=this.data1.coordenadaX;
  this.data.coordenadaY=this.data1.coordenadaY;
  this.data.conglomerado.idConglomerado=this.data1.idConglomerado;
  this.data.area.idArea=this.data1.idArea;
}



public data = {
  idParcela:0,
  codigoParcela: '',
  nombreParcela: '',
  coordenadaX: '',
  coordenadaY: '',
  conglomerado:{
    idConglomerado:0
  },
  area:{
    idArea:0
  }
}



area : any = []

listarArea()
    {
      this.areaService.listar().subscribe(
          res=>{
            this.area=res;
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public editar() {
  if (this.data.codigoParcela.trim() == '' || this.data.codigoParcela.trim() == null) {
    this.snack.open('El código de la parcela es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }


  if (this.data.nombreParcela.trim() == '' || this.data.nombreParcela.trim() == null) {
    this.snack.open('El nombre de la parcela es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }


  if (this.data.coordenadaX.trim() == '' || this.data.coordenadaX.trim() == null) {
    this.snack.open('La coordenad X es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.coordenadaY.trim() == '' || this.data.coordenadaY.trim() == null) {
    this.snack.open('La coordenada Y es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  if (this.data.area.idArea== 0) {
    this.snack.open('El área de la parcela es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  
  

  this.parcelaService.actualizar(this.data).subscribe(
    (data) => {
      Swal.fire('Información actualizada', 'La parsela se actualizo con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error en el sistema', 'No se actualizo la parcela', 'error');
      console.log(error);
    }
  );
    
  }

}



@Component({
selector: 'agregar-parcela',
templateUrl: 'agregar-parcela.html',
styleUrls: ['./view-parcela.component.css']
})

export class AgregarParcela {
constructor(
  public dialogRef: MatDialogRef<AgregarParcela>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private parcelaService:ParcelaService,
  private snack: MatSnackBar,
  private areaService:AreaService
) { }

onNoClick(): void {
  this.dialogRef.close();
}

public data = {
  codigoParcela: '',
  nombreParcela: '',
  coordenadaX: '',
  coordenadaY: '',
  conglomerado:{
    idConglomerado:0
  },
  area:{
    idArea:0
  }
}

ngOnInit(): void {
  this.area = this.data1.area;
  this.data.conglomerado.idConglomerado=this.data1.idConglomerado;
}

area : any = []

listarArea()
    {
      this.areaService.listar().subscribe(
          res=>{
            this.area=res;
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public agregar() {
  if (this.data.codigoParcela.trim() == '' || this.data.codigoParcela.trim() == null) {
    this.snack.open('El código de la parcela es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }


  if (this.data.nombreParcela.trim() == '' || this.data.nombreParcela.trim() == null) {
    this.snack.open('El nombre de la parcela es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }


  if (this.data.coordenadaX.trim() == '' || this.data.coordenadaX.trim() == null) {
    this.snack.open('La coordenad X es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.coordenadaY.trim() == '' || this.data.coordenadaY.trim() == null) {
    this.snack.open('La coordenada Y es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  if (this.data.area.idArea== 0) {
    this.snack.open('El área de la parcela es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  
  

  this.parcelaService.guardar(this.data).subscribe(
    (data) => {
      Swal.fire('Información guardada', 'La parsela se agrego con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error en el sistema', 'No se agrego la parcela', 'error');
      console.log(error);
    }
  );
    
  }

}








  
  







  

