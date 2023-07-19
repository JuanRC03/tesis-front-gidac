import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { InvestigadorService } from 'src/app/services/investigador.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-investigador-en-proyecto-investigacion',
  templateUrl: './add-investigador-en-proyecto-investigacion.component.html',
  styleUrls: ['./add-investigador-en-proyecto-investigacion.component.css']
})
export class AddInvestigadorEnProyectoInvestigacionComponent implements OnInit {

  constructor(private userService:UserService, 
              private route:ActivatedRoute,
              private investigadorInvestigacionService:InvestigacionInvestigadoresService) { }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dat5', 'opciones'];
  
  idProyectoInvestigacion:any;
  nombreProyectoInvestigacion:any;

  grupoInvestigacion:any = {
    proyectoInvestigacion:{
      idProyectoInvestigacion:0
    },
    usuario:{
      idUsuario:0
    }
  }


  listaUsuariosDisponibles : any = []
  
  ngOnInit(): void {
    this.idProyectoInvestigacion = this.route.snapshot.params['idProyectoInvestigacion'];
    this.nombreProyectoInvestigacion = this.route.snapshot.params['nombreProyectoInvestigacion'];
    this.grupoInvestigacion.proyectoInvestigacion.idProyectoInvestigacion = this.idProyectoInvestigacion;
    //this.grupoInvestigacion.proyectoInvestigacion['idProyectoInvestigacion'] = this.idProyectoInvestigacion;
    this.listar();
  }


  listar()
  {
    this.userService.listarInvestigadorNoAsignados(this.idProyectoInvestigacion).subscribe(
        res=>{
          this.listaUsuariosDisponibles=res;

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
        this.grupoInvestigacion.usuario.idUsuario = idUsuario;
        //this.grupoInvestigacion.usuario['idUsuario'] = idUsuario;
        this.investigadorInvestigacionService.guardarGrupoDeInvestigacion(this.grupoInvestigacion).subscribe(
          (data) => {
            this.listaUsuariosDisponibles = this.listaUsuariosDisponibles.filter((listaUsuariosDisponibles:any) => listaUsuariosDisponibles.idUsuario != idUsuario);
            Swal.fire('Investigador Asignado','El investigador se ha asignado a la investigacion','success');
          },
          (error) => {
            console.log(error);
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
