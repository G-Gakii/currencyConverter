import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { ConvertService } from '../../service/convert.service';
import { CurrencyResponse } from '../../interface/currency-response';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FontAwesomeModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  faArrowRightLeft = faArrowRightArrowLeft;
  currencyCode: string[] = [];
  currencyName: string[] = [];
  myamount: number = 0;
  exchangedAmount: number = 0;
  myTo: string = 'USD';
  myFrom: string = 'USD';
  exchangeForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
    from: new FormControl('USD', [Validators.required]),
    to: new FormControl('USD', [Validators.required]),
  });

  constructor(private convertService: ConvertService) {}
  ngOnInit(): void {
    this.convertService.getSymbols().subscribe({
      next: (data: CurrencyResponse) => {
        const symbols = data.symbols;

        for (const [code, name] of Object.entries(symbols)) {
          this.currencyCode.push(code);
          this.currencyName.push(name);
        }
      },
    });
  }

  convert() {
    console.log('clicked');
    const { amount, from, to } = this.exchangeForm.value;
    if (amount && from && to) {
      this.myamount = amount;
      this.myFrom = from;
      this.myTo = to;
      this.convertService.convertCurrency(amount, from, to).subscribe({
        next: (response) => {
          this.exchangedAmount = response.conversion_rate;
        },
      });
    }
  }
}
