import { ListaPacientesI } from './../../modelos/listapacientes.interface';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  pacientes: ListaPacientesI[]=[];
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
      this.api.getAllPatients(1).subscribe(data =>{
        this.pacientes = data;
      console.log(data);
    })
  }

  nuevoPaciente(){
    this.router.navigate(['nuevo']);
  }

  editarPaciente(id: any){
    this.router.navigate(['editar',id]);
  }

}
