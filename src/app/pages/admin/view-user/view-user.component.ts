import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  @ViewChild('tableContainer') tableContainer: ElementRef;

  constructor(private userServicio:UserService, private elementRef: ElementRef) {
    this.tableContainer = elementRef;
   }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dat5', 'opciones'];
  
  listaUsuarios : any = []
  
  ngOnInit(): void {
    this.listar();
    this.tableContainer.nativeElement.classList.add('cdk-virtual-scroll-viewport');
  }


  listar()
  {
    this.userServicio.listarUsuariosNormales().subscribe(
        res=>{
          this.listaUsuarios=res;

        },
        err=>console.log(err)
      )
  }

  eliminarUsuario(idUsuario:any){
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
        this.userServicio.eliminarUsuario(idUsuario).subscribe(
          (data) => {
            this.listaUsuarios = this.listaUsuarios.filter((usuario:any) => usuario.id != idUsuario);
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

  


}
