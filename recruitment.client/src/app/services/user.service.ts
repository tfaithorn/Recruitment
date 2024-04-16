import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor() { }

    buildName(user : User ) {
    return user.firstName + " " + user.lastName
  }
}

export interface User {
    id : number;
    firstName: string;
    lastName: string;
    createdAt: Date;
}