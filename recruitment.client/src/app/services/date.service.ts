import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatLocaleString(date: Date) {
    return new Date(date).toLocaleString().replace(",", "");
  }

  formatDateString(date: Date) {
    return new Date(date).toLocaleDateString();
  }
}
