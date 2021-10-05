import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PacienteI } from 'src/app/modelos/paciente.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiService) { }

  datosPaciente: PacienteI | undefined;
  editarForm = new FormGroup({
    nombre:new FormControl(''),
    correo:new FormControl(''),
    dni:new FormControl(''),
    direccion:new FormControl(''),
    codigoPostal:new FormControl(''),
    genero:new FormControl(''),
    telefono:new FormControl(''),
    token:new FormControl(''),
    pacienteId:new FormControl(''),
    fechaNacimiento:new FormControl(''),
  });


  ngOnInit(): void {
    let pacienteid = this.activerouter.snapshot.paramMap.get('id');
    console.log(pacienteid);
    let token = this.getToken();
    console.log(token);
    this.api.getSinglePacient(pacienteid).subscribe(data =>{
        this.datosPaciente = data;
        this.editarForm.setValue({
          'nombre': this.datosPaciente.Nombre,
          'correo': this.datosPaciente.Correo,
          'direccion': this.datosPaciente.Direccion,
          'codigoPostal': this.datosPaciente.CodigoPostal,
          'genero': this.datosPaciente.Genero,
          'telefono':this.datosPaciente.Telefono,
          'dni':this.datosPaciente.DNI,
          'token':token,
          'pacienteId':pacienteid,
          'fechaNacimiento': this.datosPaciente.FechaNaciemiento,
        });
    });
  }


  getToken(){
    return localStorage.getItem('token');
  }

  postForm(form:PacienteI){
    this.api.putPatient(form).subscribe(data=>{
      console.log(data);
    })
  }

  eliminar(){
    let datos:PacienteI = this.editarForm.value;
    this.api.deletePatient(datos).subscribe(data=>{
      console.log(data);
    });
  }
}
