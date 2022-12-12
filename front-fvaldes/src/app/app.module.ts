import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './inicial';

import { BusquedaComponent } from './vistas/busqueda';
import { ClienteComponent } from './vistas/cliente';
import { ComprarComponent } from './vistas/comprar';
import { HistoricoComponent } from './vistas/historico';
import { RecargaComponent } from './vistas/recarga';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    ClienteComponent,
    ComprarComponent,
    HistoricoComponent,
    RecargaComponent
  ],
  imports: [
	AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
