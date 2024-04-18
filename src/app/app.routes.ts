import { Routes } from '@angular/router';
import {PokeTableComponent} from "./pokemon/components/poke-table/poke-table.component";
import {PokeDetailComponent} from "./pokemon/components/poke-detail/poke-detail.component";

export const routes: Routes = [
  { path: 'home', component: PokeTableComponent},
  { path: 'pokeDetail/:id', component: PokeDetailComponent},
  { path: '', pathMatch: 'full', redirectTo:'home'},
  { path: '**', pathMatch: 'full', redirectTo:'home'}
];
