import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(private http : HttpClient) { }

    findBy(criteria: CategoryCriteria) : Observable<Category[]> {
        return this.http.post<Category[]>('/api/category/findby', criteria);
    }
}

export interface Category {
    id : number;
    name : string;
}

export interface CategoryCriteria {
    id? : number;
}