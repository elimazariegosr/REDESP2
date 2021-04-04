import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  url:any
  constructor(private http:HttpClient) { 
    this.url = 'http://localhost:3000/';

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  login(data:any){
    return this.http.post(this.url + "Login", data)
  }
  agregar_usuario(data:any){
    return this.http.post(this.url + "crearUsuario", data)
  }
  modificar_usuario(data:any){
    return this.http.post(this.url + "modificarUsuario", data)
  }
  agregar_libro(data:any){
    return this.http.post(this.url + "crearLibro", data)
  }
  modificar_libro(data:any){
    return this.http.post(this.url + "modificarLibro", data)
  }
  eliminar_libro(data:any){
    return this.http.post(this.url + "eliminarLibro", data)
  }
  obtener_libros(){
    return this.http.get(this.url + "verLibros")
  }
}
