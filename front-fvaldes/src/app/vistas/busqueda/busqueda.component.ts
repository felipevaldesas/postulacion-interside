import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ClienteService } from 'src/app/services';
import { Cliente } from 'src/app/model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

	public formulario: FormGroup;
	public mensaje: string = null;
	
	constructor(private router: Router, 
				private servicio: ClienteService ) {
		this.formulario = new FormGroup({
			cuenta: new FormControl('', [Validators.required, Validators.minLength(8)])
		});
	}

	ngOnInit() { }

	public submit(): void {
		this.mensaje = null;
		
		if(this.formulario.valid){
			this.servicio.buscarClientePorCuenta(this.control.cuenta.value).subscribe(
				cliente => {
					this.servicio.setClienteActivo(cliente);
					this.goToCliente();
				},
				falla => {
					this.mensaje = falla.error.mensaje + "["+this.control.cuenta.value+"]";
					this.formulario.reset();
				});
		}
	}
	
	get control(){
		return this.formulario.controls;
	}
	
	setearCuenta(numero: string) : void{
		this.formulario.controls.cuenta.setValue(numero);
	}
	
	private goToCliente(): void {
		this.router.navigate(['/cliente']);
	}
}
