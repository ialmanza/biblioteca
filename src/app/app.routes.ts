import { Routes } from '@angular/router';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { ListarConTablaComponent } from './components/listar-con-tabla/listar-con-tabla.component';
import { BusquedaDeLibrosCampoComponent } from './components/busqueda-de-libros-campo/busqueda-de-libros-campo.component';
import { EditarLibroComponent } from './components/editar-libro/editar-libro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PruebaBDComponent } from './components/prueba-bd/prueba-bd.component';

export const routes: Routes = [

  { path: 'crear-libro', component: CrearLibroComponent },
  { path: 'listar-tabla', component: ListarConTablaComponent },
  { path: 'buscar-libro', component: BusquedaDeLibrosCampoComponent },
  { path: 'editar-libro', component: EditarLibroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'base-datos', component: PruebaBDComponent },
  { path: '', redirectTo: 'listar-tabla', pathMatch: 'full' },

];
