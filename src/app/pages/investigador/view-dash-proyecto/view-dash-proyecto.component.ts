import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionService } from 'src/app/services/investigacion.service';

@Component({
  selector: 'app-view-dash-proyecto',
  templateUrl: './view-dash-proyecto.component.html',
  styleUrls: ['./view-dash-proyecto.component.css']
})
export class ViewDashProyectoComponent implements OnInit {

  constructor(private investigacionService:InvestigacionService,
    public dialog: MatDialog,
    private route:ActivatedRoute) { }

  idProyecto= 0;
  nmbrePoryecto= 0;
  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
  }

  datos : any;

    listarVigentes()
    {
      this.investigacionService.obtenerProyectoInvestigacion(this.idProyecto).subscribe(
          res=>{
            this.datos=res;
          },
          err=>console.log(err)
        )
    }



}
