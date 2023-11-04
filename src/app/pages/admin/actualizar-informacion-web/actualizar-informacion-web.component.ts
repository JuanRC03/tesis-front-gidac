import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppWebService } from 'src/app/services/app-web.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-informacion-web',
  templateUrl: './actualizar-informacion-web.component.html',
  styleUrls: ['./actualizar-informacion-web.component.css']
})
export class ActualizarInformacionWebComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private appWebService:AppWebService,
              private snack:MatSnackBar,
              private router:Router,) { }

  datos:any=[];

  informacionEcoAndes = {
    condicionesUso : '',
    derechoReservado : '',
    descripcion : '',
    licenciaUso : '',
    usuario:{
      idUsuario:0
    }
  }
  idUsuario= 0;
    ngOnInit(): void {
      this.idUsuario = this.route.snapshot.params['id'];
      this.informacionEcoAndes.usuario.idUsuario=this.idUsuario;
      this.mostrarInformacionVigente();
    }

    public mostrarInformacionVigente(){
      this.appWebService.mostrarInformacionAppWebVigente().subscribe(
        (data:any) => {
          
          if (data!=null) {
            this.datos=data;
              this.informacionEcoAndes.condicionesUso=this.datos.condicionesUso;
              this.informacionEcoAndes.derechoReservado=this.datos.derechoReservado;
              this.informacionEcoAndes.descripcion=this.datos.descripcion;
              this.informacionEcoAndes.licenciaUso=this.datos.licenciaUso;
          }
        },
        (error) => {
          console.log(error);
          this.datos=[];
        }
      )
    }

    public actualizarDatos(){

      if(this.informacionEcoAndes.descripcion.trim() == '' || this.informacionEcoAndes.descripcion.trim() == null){
        this.snack.open('La descripción es requerida !!','Aceptar',{
          duration:3000
        })
        return;
      }

      if(this.informacionEcoAndes.condicionesUso.trim() == '' || this.informacionEcoAndes.condicionesUso.trim() == null){
        this.snack.open('Las condiciones de uso son requeridas !!','Aceptar',{
          duration:3000
        })
        return;
      }
      
      
      if(this.informacionEcoAndes.licenciaUso.trim() == '' || this.informacionEcoAndes.licenciaUso.trim() == null){
        this.snack.open('La licencia de uso es requerida !!','Aceptar',{
          duration:3000
        })
        return;
      }
      if(this.informacionEcoAndes.derechoReservado.trim() == '' || this.informacionEcoAndes.derechoReservado.trim() == null){
        this.snack.open('Los derechos reservados son requeridos !!','Aceptar',{
          duration:3000
        })
        return;
      }

      this.appWebService.actualizarInformacionAppWeb(this.informacionEcoAndes).subscribe(
        (data) => {
          Swal.fire('Informacion actualizada','La información de la aplicación web ha sido actualizado con éxito','success').then(
            (e) => {
              this.mostrarInformacionVigente();
            }
          );
        },
        (error) => {
          Swal.fire('Error en el sistema','No se ha podido actualizar la información de la aplicación web','error');
          console.log(error);
        }
      )
    }

}
