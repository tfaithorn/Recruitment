import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

    constructor(private http : HttpClient) { }

    findBy(criteria: LocationCriteria) : Observable<Location[]> {
        return this.http.post<Location[]>('/api/location/findby', criteria);
    }
}

export interface Location {
    id : number;
    name : string;
}

export interface LocationCriteria {
    id? : number;
}