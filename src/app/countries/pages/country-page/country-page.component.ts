import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute, // ruta
    private countriesService: CountriesService, // servicio
    private router: Router, // redireccionar
  ) {
  }

  ngOnInit(): void {
    // Extract params from url with observable help
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.countriesService.searchCountryByAlphaCode(id).subscribe(country => {
    //     console.log(country);
    //   });
    // });

    // *con switchMap
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id)),
      )
      .subscribe(country => {
        // Si no existe un país con ese code, redireccionar
        if (!country) return this.router.navigateByUrl('');

        // console.log('TENEMOS EL PAIS', country);
        return this.country = country;
      });
  }
}