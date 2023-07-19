import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/services/area.service';
import { MedidaService } from 'src/app/services/medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.css']
})
export class AddAreaComponent implements OnInit {

  constructor(
    private areaService: AreaService,
    private medidaService: MedidaService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  medida : any = []
  
  public area = {
    area: '',
    unidadMedida:{
      idUnidadMedida:0
    }
  }

  ngOnInit(): void {
    this.listarMedidas();
  }

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

  public agregar() {
    if (this.area.area.trim() == '' || this.area.area.trim() == null) {
      this.snack.open('El área es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.area.unidadMedida.idUnidadMedida == 0) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.areaService.guardar(this.area).subscribe(
      (data) => {
        Swal.fire('Área añadida', 'El área se añadio con éxito', 'success').then(
          (e) => {
            this.area.area='';
            this.area.unidadMedida.idUnidadMedida=0;
          })
      }, (error) => {
        Swal.fire('Error al anadir el área', 'No se registro el área', 'error');
        console.log(error);
      }
    );
  }
}

