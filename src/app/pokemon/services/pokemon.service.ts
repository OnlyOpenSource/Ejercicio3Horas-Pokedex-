import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseURL;
  constructor( private http: HttpClient) { }

  getPokemons(index: any){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }


}
