import { Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services';

import { Cliente } from 'src/app/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {	
	titulo = 'angular8-fvaldes';
	existe: boolean;
	
	constructor(private servicio: ClienteService,
				private router: Router) {
		this.existe = false;
	}
	
	ngOnInit() {
		this.servicio.getCliente$().subscribe(cliente => {
			this.existe = (cliente == null || cliente.id == null) ? false : true;
		});
	}
	
	public salir(): void {
		this.servicio.setClienteActivo(null);
		this.router.navigate(['/']);
	}
}
