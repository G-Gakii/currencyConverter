import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CurrencyResponse } from '../interface/currency-response';
import { Rate } from '../interface/rate';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  private ApiUrl = `https://api.exchangeratesapi.io/v1/symbols?access_key=${environment.apikeySymbols}`;

  constructor(private http: HttpClient) {}

  getSymbols(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(this.ApiUrl);
  }
  convertCurrency(amount: number, from: string, to: string): Observable<Rate> {
    return this.http.get<Rate>(
      `https://v6.exchangerate-api.com/v6/${environment.ApiKey}/pair/${from}/${to}/${amount}`
    );
  }
}
