import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent implements OnInit {

  public termino: string = "";
  public hayError: boolean = false;
  public paises: Country[] = [];
  public paisesSugeridos: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }


  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
      .subscribe((res) => {
        this.paises = res;
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencia(query: string) {
    this.hayError = false;

    this.paisService.buscarPais(query)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0, 3))
  }

}
