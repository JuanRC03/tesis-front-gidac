import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-investigacion',
  templateUrl: './add-investigacion.component.html',
  styleUrls: ['./add-investigacion.component.css']
})
export class AddInvestigacionComponent implements OnInit {

  investigacion = {
    nombreInvestigacion: '',
    descripcion: '',
    fechaInicio: new Date(0),
    fechaFin: new Date(0)
  }

  constructor(private investigacionService:InvestigacionService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.investigacion.nombreInvestigacion.trim() == '' || this.investigacion.nombreInvestigacion == null){
      this.snack.open("El nombre de la investigacion es requerida !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.investigacion.descripcion.trim() == '' || this.investigacion.descripcion == null){
      this.snack.open("La descripcion es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.investigacion.fechaInicio == null){
      this.snack.open("La dehca de inico es requerida !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.investigacion.fechaFin == null){
      this.snack.open("La fecha de fin es requerida !!",'',{
        duration:3000
      })
      return ;
    }

    
    this.investigacionService.añadirInvestigacion(this.investigacion).subscribe(
      (dato:any) => {
        this.investigacion.nombreInvestigacion = '';
        this.investigacion.descripcion = '';
        this.investigacion.fechaInicio = new Date(0);
        this.investigacion.fechaFin = new Date(0);
        Swal.fire('Investigacion agregada','La investigacion ha sido agregada con éxito','success');
        this.router.navigate(['/admin/ubicaTable']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar la investigacion','error')
      }
    )
  }

}
