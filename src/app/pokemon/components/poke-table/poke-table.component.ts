import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {PokemonService} from "../../services/pokemon.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-poke-table',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatTableModule,
    MatPaginator, HttpClientModule
  ],
  templateUrl: './poke-table.component.html',
  styleUrl: './poke-table.component.css'
})
export class PokeTableComponent implements OnInit{
  //Array de strings para definir las columnas de la tabla
  displayedColumns: string[] = ['position', 'image', 'name'];
  //Array vacio para almacenar los datos de pokemon
  data: any[] = [];
 //Creacion de una instancia de MatTableDataSource con los datos de Pokemon
  dataSource = new MatTableDataSource<any>(this.data);
  //Para acceder al paginador de la tabla desde la plantilla
  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;
  //Array para almacenar los datos de los pokemons recuperados
  pokemons = [];

  //Constructor donde se inyecta el servicio de Pokemon y el Router
  constructor(private  pokemonServices: PokemonService, private  router: Router) {
  }

  //Metodo que se ejecuta al iniciar el componente
  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    let pokemonData;
    for (let i =1; i <= 1008; i++){
      this.pokemonServices.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          //Añadir cada objeto del pokemon al array de datos y actualizar el dataSource
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
//Metodo para aplicar un filtro a la tabla basado en un evento de entrada
  applyFilter(event: Event){

    const inputElement = event.target as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');//Remueve caracteres no deseados
    inputElement.value = filteredValue; //Establece el valor filtrado
    this.dataSource.filter = filteredValue.trim().toLowerCase();
    //Regresar al inicio del paginator si se aplica un filtro
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  //Método para navegar a una URL específica cuando se selecciona una fila
  getRow(row: any){
    this.router.navigateByUrl(`/pokeDetail/${row.position}`);

  }
}
