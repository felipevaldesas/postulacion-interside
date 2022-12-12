import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaComponent } from 'src/app/vistas/busqueda';
import { ClienteComponent } from 'src/app/vistas/cliente';
import { ComprarComponent } from 'src/app/vistas/comprar';
import { HistoricoComponent } from 'src/app/vistas/historico';
import { RecargaComponent } from 'src/app/vistas/recarga';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'pantalla-inicial',
		pathMatch: 'full'
	},{
	    path: 'pantalla-inicial',
	    component: BusquedaComponent
	},{
	    path: 'cliente',
	    component: ClienteComponent
	},{	
		path: "comprar",
        component: ComprarComponent
    },{	
		path: "historico",
        component: HistoricoComponent
    },{	
		path: "recargar",
        component: RecargaComponent
    },{
		path: '**',
		redirectTo: '/pantalla-inicial'
	}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
