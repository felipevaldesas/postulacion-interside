import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClienteService } from 'src/app/services';
import { Cliente } from 'src/app/model';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {

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
				producto: new FormControl( "", [Validators.required, Validators.maxLength(100)]),
				precio: new FormControl( 0, [Validators.required, , Validators.min(1)])
			});
		}
	}

	ngOnInit() {}

	get control(){
		return this.formulario.controls;
	}

	public submit(): void {
		this.error = true;
		this.mensaje = null;
		
		if(this.formulario.valid){
			this.servicio.realizarCompra(
				this.cliente.id, 
				this.control.producto.value,
				this.control.precio.value
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
			this.control.producto.markAsTouched();
			this.control.precio.markAsTouched();
		}
	}
}
