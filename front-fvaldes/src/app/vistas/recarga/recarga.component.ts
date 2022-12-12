import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClienteService } from 'src/app/services';
import { Cliente } from 'src/app/model';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css']
})
export class RecargaComponent implements OnInit {

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
			
			if(!this.cliente.habilitado){
				this.mensaje = 'Las Recargas se encuentran bloqueadas, el cliente se encuentra actualmente Deshabilitado.';
			}
			this.formulario = new FormGroup({
				recarga: new FormControl( {value: null, disabled: !this.cliente.habilitado }, [Validators.required, , Validators.min(1)])
			});
		}
	}

	ngOnInit() {}

	get control(){
		return this.formulario.controls;
	}

	public submit(): void {
		
		if(!this.cliente.habilitado)return;
		
		if(this.formulario.valid){
			this.servicio.realizarRecarga(
				this.cliente.id, 
				this.control.recarga.value
			).subscribe(respuesta => {
				this.error = false;
				this.mensaje = respuesta.mensaje;
				
				this.formulario.reset();
			}, falla => {
				this.error = true;
				this.mensaje = falla.error.mensaje;
				if(!this.mensaje){
					this.mensaje = 'Ocurrio un error inesperado, reintente';
				}
			});
		} else {
			this.control.recarga.markAsTouched();
		}
	}
}
