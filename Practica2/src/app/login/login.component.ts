import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ConexionService} from '../servicios/conexion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles_forms.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router,
              private conexion: ConexionService) {
                if(localStorage.getItem("sesion")){
                  this.router.navigate(['/Users'])
                 
                }          
    
  }

  ngOnInit(): void {
  }
  session:any;
  
  validar_login(usr:String, pass:String){
    if(localStorage.getItem("sesion")){
      this.router.navigate(['/Users'])
     
    }  
    
    if(usr == "" && pass == ""){
        alert("Campos vacios")
    }else{
    
      let sesion = this.conexion.login({"user" : usr, "pass": pass});

      sesion.subscribe(resp=>{
        if(resp == null){
            this.router.navigate(['/Users/Login'])
            alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          let resultado = JSON.parse(JSON.stringify(resp));
          if(resultado.length != 0){
            localStorage.setItem("sesion", JSON.stringify(resp));
            this.router.navigate(['/Users'])
          
          }else{
            alert("Datos erroneos, porfavor intente de nuevo")
          }
        }
       })    
    }
  }
}
