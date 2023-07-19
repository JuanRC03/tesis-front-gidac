import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { InvestigadorService } from 'src/app/services/investigador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-investigadores-investigacion',
  templateUrl: './add-investigadores-investigacion.component.html',
  styleUrls: ['./add-investigadores-investigacion.component.css']
})
export class AddInvestigadoresInvestigacionComponent implements OnInit {

  constructor(private investigadorService:InvestigadorService, 
              private route:ActivatedRoute,
              private investigadorInvestigacionService:InvestigacionInvestigadoresService) { }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dat5', 'opciones'];
  
  idProyectoInvestigacion:any;
  nombreProyectoInvestigacion:any;

  grupoInvestigacion:any = {
    investigacion : {},
    investigador : {},
  }


  listaInvestigadores : any = []
  
  ngOnInit(): void {
    this.idProyectoInvestigacion = this.route.snapshot.params['idInvestigacion'];
    this.nombreProyectoInvestigacion = this.route.snapshot.params['nombreInvestigacion'];
    this.grupoInvestigacion.investigacion['idProyectoInvestigacion'] = this.idProyectoInvestigacion;
    this.listar();
  }


  listar()
  {
    this.investigadorService.listarInvestigador(this.idProyectoInvestigacion).subscribe(
        res=>{
          this.listaInvestigadores=res;

        },
        err=>console.log(err)
      )
  }

  
  asignarInvestigador(idUsuario:any){
    Swal.fire({
      title:'Agregar Investigador',
      text:'¿Estás seguro de agregar al investigador en la investigacion?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.grupoInvestigacion.usuario['idUsuario'] = idUsuario;
        this.investigadorInvestigacionService.guardarGrupoDeInvestigacion(this.grupoInvestigacion).subscribe(
          (data) => {
            this.listaInvestigadores = this.listaInvestigadores.filter((investigador:any) => investigador.idUsuario != idUsuario);
            Swal.fire('Investigador Asignado','El investigador se ha asignado a la investigacion','success');
          },
          (error) => {
            Swal.fire('Error','Error al asignar al investigador','error');
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
