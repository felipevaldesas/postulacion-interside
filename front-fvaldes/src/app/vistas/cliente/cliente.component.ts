import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Cliente } from 'src/app/model';
import { ClienteService } from 'src/app/services';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
	
	public formulario: FormGroup;

	public cliente: Cliente;

	public mensaje: string = null;
	public error: boolean = true;

	constructor(private servicio: ClienteService,
				private router: Router) {
		this.cliente = this.servicio.getClienteActivo();
		if(this.cliente == null) {
			this.router.navigate(['/']);
		} else {
			this.formulario = new FormGroup({
				cuenta: new FormControl({ value: this.cliente.cuenta, disabled: true }),
				estado: new FormControl({ value: (this.cliente.habilitado ? "Cliente Activo" : "Cliente Deshabilitado"), disabled: true }),
				nombre: new FormControl(this.cliente.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
				apellido: new FormControl(this.cliente.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(40)])
			});
		}
	}
	
	ngOnInit() { }
	
	get control(){
		return this.formulario.controls;
	}
	
	public submit(): void {
		this.error = true;
		this.mensaje = null;
		
		if(this.formulario.valid){
			
			this.servicio.actualizarDatosCliente(
				this.cliente.id, 
				this.control.nombre.value,
				this.control.apellido.value
			).subscribe(cliente => {
				this.cliente = cliente;
				this.error = false;
				this.mensaje = "Informacion Actualizada";
				this.servicio.setClienteActivo(this.cliente);
			}, falla => {
				this.error = true;
				this.mensaje = falla.error.mensaje;
				if(!this.mensaje){
					this.mensaje = 'Ocurrio un error inesperado, reintente';
				}
			});
		} else {
			this.control.nombre.markAsTouched();
			this.control.apellido.markAsTouched();
		}
	}

}