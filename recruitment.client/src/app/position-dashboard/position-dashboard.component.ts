import { Component, OnInit } from '@angular/core';
import { PositionService, Position } from '../services/position.service';
import { FancyGridComponent, FancyGridData } from '../common/fancy-grid/fancy-grid.component';
import { BreadcrumbComponent } from '../common/breadcrumb/breadcrumb.component';
import { Router, RouterLink } from '@angular/router';
import { MessageContainerComponent } from '../message-container/message-container.component';
import { NgFor } from '@angular/common';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-positions',
  templateUrl: './position-dashboard.component.html',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink, MessageContainerComponent, FancyGridComponent],
  styleUrls: ['./position-dashboard.component.css']
})
export class PositionDashboardComponent implements OnInit {
    data? : FancyGridData;
    successes : string[] = [];

    constructor(
        private positionService: PositionService,
        private dateService: DateService,
        private router: Router) { }

    ngOnInit(): void {
        const state = this.router.getCurrentNavigation()?.extras.state;
        console.log(state);
        if(state !== undefined) {
            if(state['created'] !== undefined) {
                this.successes.push("Position successfully created.");
            }
        }

        const headers = [
            { 
                content : 'ID',
                styles : 'max-width:100px;'
            },
            { 
                content : 'Name' 
            },
            { 
                content : 'Applicants',
                styles : 'max-width:110px;'
            },
            { 
                content : 'Hired',
                styles : 'max-width:110px;'
            },
            { 
                content : 'Declined',
                styles : 'max-width:110px;'
            },
            { 
                content : 'Created Date',
                styles : 'max-width:150px;'
            }
        ];

        this.positionService.findBy({
            includeApplicantTotal : true,
            includeDeclinedTotal: true,
            includeHiredTotal : true,
            orderBy : 'Position.id DESC'
        }).subscribe(res => {
            const rows = res.map(position => {
                return {
                    columns : [
                        {
                            content : position.id,
                            styles : 'max-width:100px;'
                        },
                        {
                            content : position.name
                        },
                        {
                            content : position.applicantTotal,
                            styles : 'max-width:110px;'
                        },
                        {
                            content : position.hiredTotal,
                            styles : 'max-width:110px;'
                        },
                        {
                            content : position.declinedTotal,
                            styles : 'max-width:110px;'
                        },
                        {
                            content : this.dateService.formatDateString(position.createdAt),
                            styles : 'max-width:150px;'
                        }
                    ],
                    routerLink : ['/position', position.id.toString(), 'applicants']
                }});
                this.data = {
                    headers : headers,
                    rows : rows
                };
            });
    }
}