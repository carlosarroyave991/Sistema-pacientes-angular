import { ResponseI } from './../../modelos/response.interface';
import { PacienteI } from './../../modelos/paciente.interface';
import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/modelos/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaPacientesI } from 'src/app/modelos/listapacientes.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://api.solodata.es/"
  constructor(private http:HttpClient) { }

  loginByEmail(form: LoginI):Observable<ResponseI>{
    let direccion = this.url + "auth";
    return this.http.post<ResponseI>(direccion,form);
  }

  getAllPatients(page:number):Observable<ListaPacientesI[]>{
    let direccion = this.url + "pacientes?page=" + page;
    return this.http.get<ListaPacientesI[]>(direccion);
  }

  getSinglePacient(id:any):Observable<PacienteI>{
    let direccion = this.url +"pacientes?id=" + id;
    return this.http.get<PacienteI>(direccion);
  }

  putPatient(form:PacienteI):Observable<ResponseI>{
    let direccion = this.url +"pacientes";
    return this.http.put<ResponseI>(direccion, form);
  }

  deletePatient(form:PacienteI):Observable<ResponseI>{
    let direccion = this.url+"pacientes";
    let Options={
      headers: new HttpHeaders({
        'Content-type':'application/json'
      }),
      body:form,
    }
    return this.http.delete<ResponseI>(direccion, Options);
  }
}
