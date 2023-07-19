import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CarbonoService } from 'src/app/services/carbono.service';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-carbono',
  templateUrl: './add-carbono.component.html',
  styleUrls: ['./add-carbono.component.css']
})
export class AddCarbonoComponent implements OnInit {


  ubicaciones:any = [];
  periodo:any = [];

  carbonoDatos = {
    investigacion:{
      idInvestigacion:0
    },
    ubicacionGeografica:{
      idUbicacion:0
    },
    periodosMuestra:{
      idPeriodo:1
    }
  }

  constructor(private carbonoService:CarbonoService,
              private ubicacionServicio:UbicacionService,
              private investigacionInvestigadoresService:InvestigacionInvestigadoresService,
              private snack:MatSnackBar,
              private router:Router,
              private route:ActivatedRoute) { }

  idProInves= 0;
  dataInvestigacionInvestigador:any;
  ngOnInit(): void {
    this.idProInves = this.route.snapshot.params['id'];
    this.investigacionInvestigadoresService.getInvestigacionInvestigador(this.idProInves).subscribe(
      res=>{
        this.dataInvestigacionInvestigador=res;
        console.log(res);
        this.carbonoDatos.investigacion.idInvestigacion=this.dataInvestigacionInvestigador.investigacion.idInvestigacion;
      },
      err=>console.log(err)
    )
    
    this.carbonoDatos.periodosMuestra.idPeriodo=1;
    this.listarDatos();
  }

  listarDatos()
  {
    this.ubicacionServicio.listarVigente().subscribe(
        res=>{
          this.ubicaciones=res;

        },
        err=>console.log(err)
      )
  }

  formSubmit(){
    

    const formData = new FormData();
    formData.append('carbono', JSON.stringify(this.carbonoDatos));
    formData.append('file', this.file);

    this.carbonoService.agregarCarbono(formData).subscribe(
      (dato:any) => {
        Swal.fire('Ubicación agregada','La ubicacín ha sido agregada con éxito','success');
        this.router.navigate(['/user-dashboard/carbonoTable/'+this.idProInves]);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar la ubicación','error')
      }
    )
  }

  file: File = new File([], "");

  onFileChanged(event: any): void {
    this.file = event.target.files[0];
  }

}
