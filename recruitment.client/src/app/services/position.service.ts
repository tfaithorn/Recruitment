import { Injectable } from '@angular/core';
import { Applicant } from './applicant.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../location.service';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    constructor(private http : HttpClient) { }

    create(positionInput : PositionInput) : Observable<Position> {
        return this.http.post<Position>('/api/position/findby', positionInput);
    }
  
    update (id : number, positionInput : PositionInput) : Observable<Position> {
        return this.http.put<Position>('/api/position', positionInput)
    }

    findBy(criteria: PositionCriteria) : Observable<Position[]> {
        return this.http.post<Position[]>('/api/position/findby', criteria);
    }
}

export interface PositionCriteria {
    id? : number;
    includeApplicants?: boolean;
    includeStages?: boolean;
    includeApplicantTotal?: boolean;
    includeHiredTotal?: boolean;
    includeDeclinedTotal?: boolean;
    includeCategories?: boolean;
    includeLocations?: boolean;
    orderBy? : string;
}

export interface Position {
    id : number;
    name : string;
    applicantTotal: number;
    hiredTotal : number;
    declinedTotal : number;
    createdAt : string;
    createdBy : string;
    workType : string;
    contactEmail : string;
    shortDescription : string;
    longDescription : string;
    categories : Category[];
    payType : string;
    minimumSalary : number;
    maximumSalary : number;
    visibleSalary : number;
    positionApplicants? : PositionApplicant[];
    stages? : Stage[];
    locations? : Location[];
}

export interface Category {
    id : number;
    name : string;
}

export interface PositionInput {
    name : string;
    workType : string;
    contactEmail : string;
    shortDescription : string;
    longDescription : string;
    categoryId : number,
    payType : string;
    minimumSalary : number;
    maximumSalary : number;
    visibleSalary : number;
}

export interface PositionApplicant {
    id : number;
    position? : Position,
    applicant : Applicant;
    stage : Stage;
    responses : QuestionResponse[];
}

export interface Stage {
    id : number;
    name : string;
    slug : string;
    position : number;
}

export interface QuestionResponse {
    question : string;
    answer : string;
}

export enum PositionStageTypes {
    HIRED = 'hired',
    DECLINED = 'declined'
}