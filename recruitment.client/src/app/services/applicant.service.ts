import { Injectable } from '@angular/core';
import { Position, PositionApplicant } from './position.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as exp from 'constants';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
    constructor(private http: HttpClient) { }

    findBy(criteria: ApplicantCriteria): Observable<Applicant[]> {
        return this.http.post<Applicant[]>('/api/applicant/findby', criteria);
    }
}

export interface ApplicantCriteria {
    id?: number;
    positionId?: number;
    includePositions?: boolean;
    includeNotes: boolean;
}

export interface Applicant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    positionApplications?: PositionApplicant[];
    applicantNotes? : ApplicantNote[];
}

export interface ApplicantNote {
    id : number;
    content: string;
    createdAt: Date;
    creator: User;
}