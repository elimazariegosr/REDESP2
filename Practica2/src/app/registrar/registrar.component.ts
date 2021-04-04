import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['../styles_forms.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private router: Router, private conexion: ConexionService) { 
    if(localStorage.getItem("sesion")){
      this.router.navigate(['/Users'])
     
    }  
  }

  registrar(user : string, name : string, pass : string){
    if(user == "" || name == "" || pass == ""){
      alert("Campos vacios")
      return
    }
    let sesion = this.conexion.agregar_usuario({"user" : user, "name" : name, "pass": pass});
      sesion.subscribe(resp=>{
        if(resp == null){
            this.router.navigate(['/Users/Registrar'])
            alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          this.router.navigate(['/Users/Login'])
        }
       })    

  }
  ngOnInit(): void {
  }

}
