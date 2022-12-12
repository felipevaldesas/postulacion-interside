import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ClienteService } from 'src/app/services';

import { Cliente, Resumen, Movimiento } from 'src/app/model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

	public cliente: Cliente;
	public movimientos: Movimiento[];
	public total: Movimiento;
	public saldo: Movimiento;

	constructor(private servicio: ClienteService,
				private router: Router) {
		this.cliente = this.servicio.getClienteActivo();
		if(this.cliente == null) {
			this.router.navigate(['/']);
		} else {
			this.movimientos = [];
			this.total = { detalle : "Total", debe: 0, haber: 0 };
			this.saldo = { detalle : "Saldo", debe: null, haber: 0 };	
		}
	}

	ngOnInit() {
		this.servicio.buscarHistoricos(this.cliente).subscribe(resumen => {
			this.saldo.haber = resumen.saldo;
			this.movimientos = resumen.movimientos;
			
			this.total.debe = this.movimientos.reduce((a,o) => a + (o.debe), 0);
			this.total.haber = this.movimientos.reduce((a,o) => a + (o.haber), 0);
		});
	}

}
