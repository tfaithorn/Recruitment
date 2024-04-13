import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Position, PositionApplicant, PositionService, PositionStageTypes } from '../services/position.service';
import { HttpClient } from '@angular/common/http';
import { BackButtonComponent } from '../common/back-button/back-button.component';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-position-applicants',
  standalone: true,
  imports: [BackButtonComponent, RouterLink, NgFor, NgClass, NgIf],
  templateUrl: './position-applicants.component.html',
  styleUrls: ['./position-applicants.component.css']
})
export class PositionApplicantsComponent implements OnInit {
    positionId: number = 0;
    position?: Position;
    PositionStageTypes = PositionStageTypes;

    constructor(
        private route: ActivatedRoute,
        private positionService : PositionService,
        private http : HttpClient) { }

    ngOnInit(): void {
        this.positionId = this.route.snapshot.params['id'];
        this.positionService.findBy({
            includeApplicants : true,
            includeStages: true,
            id : this.positionId,
        })
        .subscribe(res => {
            this.position = res[0];
            console.log(this.position);
        });
    }

    getStagePosition(stageId : number) : number {
        if(this.position?.stages) {
            for(let i = 0; i < this.position.stages.length; i++) {
                if(stageId == this.position.stages[i].id) {
                    return i + 1;
                }
            }
        }
        return 0;
    }

    getPendingApplicants() : PositionApplicant[] | undefined {
        return this.position?.positionApplicants?.filter(positionApplicant => !([PositionStageTypes.DECLINED, PositionStageTypes.HIRED] as string[]).includes(positionApplicant.stage.slug));
    }

    getHiredApplicants()  : PositionApplicant[] | undefined {
        return this.position?.positionApplicants?.filter(positionApplicant => positionApplicant.stage.slug == PositionStageTypes.HIRED);
    }

    getDeclinedApplicants()  : PositionApplicant[] | undefined {
        return this.position?.positionApplicants?.filter(positionApplicant => positionApplicant.stage.slug == PositionStageTypes.DECLINED);
    }
}
