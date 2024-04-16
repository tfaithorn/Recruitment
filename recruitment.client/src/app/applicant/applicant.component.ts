import { Component, OnInit } from '@angular/core';
import { Applicant, ApplicantService } from '../services/applicant.service';
import { ActivatedRoute } from '@angular/router';
import { BackButtonComponent } from '../common/back-button/back-button.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-applicant',
  standalone: true,
  imports: [BackButtonComponent, NgFor, NgIf],
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit{
    applicant? : Applicant;

    constructor(private applicantService : ApplicantService, private route : ActivatedRoute) {
    }

    ngOnInit(): void {
        const applicantId = this.route.snapshot.params['id'];
        this.applicantService.findBy({
                id : applicantId,
                includePositions : true
            }).subscribe( applicant => {
            if(applicant.length > 0) {
                this.applicant = applicant[0];
                console.log(this.applicant)
            }
        })
    }
}
