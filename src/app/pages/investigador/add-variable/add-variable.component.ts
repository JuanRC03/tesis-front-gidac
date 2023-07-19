import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';
import { TipoVariableService } from 'src/app/services/tipo-variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-variable',
  templateUrl: './add-variable.component.html',
  styleUrls: ['./add-variable.component.css']
})
export class AddVariableComponent implements OnInit {

  constructor(
    private equivalenciaVariableService:EquivalenciaVariableService,
    private tipoVariableService:TipoVariableService,
    private catalogoOrganizacionService:CatalogoOrganizacionService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  public equivalenciaVariable = {
    variable:{
      nombreVariable:'',
      tipoVariable:{
        idTipoVariable:0,
      },
    },
    catalogoOrganizacion:{
      idVariableOrganizacion:0
    },
    catalogoEspoch:{
      nombreVariableEspoch:'',
      proyectoInvestigacion:{
        idProyecto:0
      },
    }
  }

  idTipoVariableAux=0;
  idVariableOrganizacionAux=0;
  nombreVariableEspochAux='';

  idProyecto=0;
  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.equivalenciaVariable.catalogoEspoch.proyectoInvestigacion.idProyecto=this.idProyecto;
    console.log(this.idProyecto);
    this.listarTipoVariable();
    this.listarCatalogoOrganizacion();
  }

  tipoVariable : any = []

  listarTipoVariable()
    {
      this.tipoVariableService.listar().subscribe(
          res=>{
            this.tipoVariable=res;
          },
          err=>console.log(err)
        )
    }

    catalogoOrganizacion : any = []

    listarCatalogoOrganizacion()
    {
      this.catalogoOrganizacionService.listar().subscribe(
          res=>{
            this.catalogoOrganizacion=res;
          },
          err=>console.log(err)
        )
    }

  datoTipoVariable : any;

  obtenerTipoVariable()
    {
      this.tipoVariableService.obtener(this.idTipoVariableAux).subscribe(
          res=>{
            this.datoTipoVariable=res;
          },
          err=>console.log(err)
        )
    }

    datoCatalogoOrganizacion : any;

    obtenerCatalogoOrganizacion()
    {
      this.catalogoOrganizacionService.obtener(this.idVariableOrganizacionAux).subscribe(
          res=>{
            this.datoCatalogoOrganizacion=res;
          },
          err=>console.log(err)
        )
    }

  public cargarDatosVariable(){
    if (this.equivalenciaVariable.variable.tipoVariable.idTipoVariable == 0) {
      this.snack.open('El tipo de variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.equivalenciaVariable.catalogoOrganizacion.idVariableOrganizacion==0) {
      this.snack.open('La variable de la organización es requeredia !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }


    if (this.equivalenciaVariable.catalogoEspoch.nombreVariableEspoch.trim() == '' || this.equivalenciaVariable.catalogoEspoch.nombreVariableEspoch.trim() == null) {
      this.snack.open('El nombre de la variable del proyecto es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if(this.idTipoVariableAux!=this.equivalenciaVariable.variable.tipoVariable.idTipoVariable){
      this.listaValoresPermitidos=[];
    }
    this.idTipoVariableAux=this.equivalenciaVariable.variable.tipoVariable.idTipoVariable;
    this.idVariableOrganizacionAux=this.equivalenciaVariable.catalogoOrganizacion.idVariableOrganizacion;
    if(this.idTipoVariableAux!=0){
      this.obtenerTipoVariable();
    }
    if(this.idVariableOrganizacionAux!=0){
      this.obtenerCatalogoOrganizacion();
    }
    this.nombreVariableEspochAux=this.equivalenciaVariable.catalogoEspoch.nombreVariableEspoch;
  }
  

  public agregar() {

    if (this.equivalenciaVariable.variable.tipoVariable.idTipoVariable == 0) {
      this.snack.open('El tipo de variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.equivalenciaVariable.catalogoOrganizacion.idVariableOrganizacion==0) {
      this.snack.open('La variable de la organización es requeredia !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }


    if (this.equivalenciaVariable.catalogoEspoch.nombreVariableEspoch.trim() == '' || this.equivalenciaVariable.catalogoEspoch.nombreVariableEspoch.trim() == null) {
      this.snack.open('El nombre de la variable del proyecto es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.listaValoresPermitidos.length === 0) {
      this.snack.open('Aun no ha ingresado ningun valor permitido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    const formData = new FormData();
    formData.append('equivalenciaVariables', JSON.stringify(this.equivalenciaVariable));
    formData.append('listaValoresPermitidos', JSON.stringify(this.listaValoresPermitidos));

    this.equivalenciaVariableService.guardar(formData).subscribe(
      (data) => {
        Swal.fire('Variable añadida', 'La variable se añadio con éxito', 'success').then(
          (e) => {
            
            this.equivalenciaVariable.catalogoOrganizacion.idVariableOrganizacion=0;
            this.equivalenciaVariable.catalogoEspoch.nombreVariableEspoch='';
            this.equivalenciaVariable.variable.tipoVariable.idTipoVariable=0;
            this.listaValoresPermitidos=[];
          })
      }, (error) => {
        Swal.fire('Error al anadir la variable', 'No se registro la nueva variable', 'error');
        console.log(error);
      }
    );
  }

  //valores permitidos
  displayedColumnsNumerico: string[] = ['dato1', 'dato2', 'opcion'];
  displayedColumnsNominal: string[] = ['dato1', 'opcion'];
    listaValoresPermitidos: any[] = [];
    valorPermitido = {
      valorMaximo: '',
      valorMinimo: '',
      valorPermitido: ''
    };
  
    valorMaximoAux=0;
    valorMinimoAux=0;
    agregarValorPermitido() {
      
      if(this.idTipoVariableAux==1){
        if(this.valorPermitido.valorMaximo=='' || this.valorPermitido.valorMinimo==''){
          this.snack.open('Ingrese los valores !!','Aceptar',{
            duration : 3000
          });
        }else{
          this.valorMaximoAux = parseFloat(this.valorPermitido.valorMaximo);
          this.valorMinimoAux = parseFloat(this.valorPermitido.valorMinimo);
          if(this.valorMinimoAux<this.valorMaximoAux){
            this.listaValoresPermitidos.push({
              valorMaximo: this.valorPermitido.valorMaximo,
              valorMinimo: this.valorPermitido.valorMinimo,
              });
              this.valorPermitido.valorMinimo = '';
              this.valorPermitido.valorMaximo = '';
            }else{
              this.snack.open('El valor minimo de ser menor que el maximo !!','Aceptar',{
                duration : 3000
              });
            }

        }
      }else{
        if(this.valorPermitido.valorPermitido==''){
          this.snack.open('Ingrese el valor permitido !!','Aceptar',{
            duration : 3000
          });
        }else{
            this.listaValoresPermitidos.push({
              valorPermitido: this.valorPermitido.valorPermitido,
              });
              this.valorPermitido.valorPermitido = '';
        }
      }
    }
  
    eliminarValorPermitido(index: number) {
      this.listaValoresPermitidos.splice(index, 1);
    }
  
}
