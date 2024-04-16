import { Injectable } from '@angular/core';
import { Position, PositionApplicant } from './position.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
    constructor(private http: HttpClient) { }

    findBy(criteria : ApplicantCriteria) : Observable<Applicant[]> {
        return this.http.post<Applicant[]>('/api/applicant/findby', criteria);
    }
}

export interface ApplicantCriteria {
    id? : number;
    positionId? : number;
    includePositions? : boolean;
}

export interface Applicant {
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    positionApplications?: PositionApplicant[];
}