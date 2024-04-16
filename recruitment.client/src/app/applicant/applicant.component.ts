import { Component, OnInit } from '@angular/core';
import { Applicant, ApplicantService } from '../services/applicant.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackButtonComponent } from '../common/back-button/back-button.component';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-applicant',
  standalone: true,
  imports: [BackButtonComponent, NgFor, NgIf, RouterLink],
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit{
    applicant? : Applicant;

    constructor(
        private applicantService: ApplicantService, 
        public userService: UserService,
        public dateService: DateService,
        private route : ActivatedRoute) {
    }

    ngOnInit(): void {
        const applicantId = this.route.snapshot.params['id'];
        this.applicantService.findBy({
                id : applicantId,
                includePositions : true,
                includeNotes: true
            }).subscribe( applicant => {
            if(applicant.length > 0) {
                this.applicant = applicant[0];
                console.log(this.applicant)
            }
        })
    }
}
