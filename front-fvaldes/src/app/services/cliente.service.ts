import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Cliente,  Resumen } from 'src/app/model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

	private clienteActivo: Cliente;
	private cliente$: BehaviorSubject<Cliente>;
	
	constructor(private http: HttpClient) {
		this.clienteActivo = null;
		this.cliente$ = new BehaviorSubject<Cliente>(this.clienteActivo);
	}
	
	public getClienteActivo(): Cliente {
		return this.clienteActivo;
	}
	public setClienteActivo(cliente: Cliente): void {
		this.clienteActivo = cliente;
		this.cliente$.next(this.clienteActivo);
	}
	
	public getCliente$(): Observable<Cliente> {
		return this.cliente$.asObservable();
	}
	
	
	public buscarClientePorCuenta(cuenta: string): Observable<any> {
		return this.http.post<any>(environment.url + '/findByCuenta', {cuenta});
	}

	public buscarHistoricos(cliente: Cliente): Observable<Resumen> {
		return this.http.post<any>(environment.url + '/historico', cliente);
	}
	
	public realizarCompra(cliente: number, producto: string, precio: number): Observable<any> {
		return this.http.post<any>(environment.url + '/venta', {cliente, producto, precio});
	}
	
	public realizarRecarga(cliente: number, monto: number): Observable<any> {
		return this.http.post<any>(environment.url + '/recarga', {cliente, monto});
	}
	
	public actualizarDatosCliente(id: number, nombre: string, apellido: string): Observable<any> {
		return this.http.post<any>(environment.url + '/save', {id, nombre, apellido});
	}	
	
}
