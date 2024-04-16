import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-message-container',
    standalone: true,
    imports: [NgFor],
    templateUrl: './message-container.component.html',
    styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit {
    @Input() errors : string[] = [];
    @Input() successes : string[] = [];
    @Input() warnings : string[] = [];

    constructor() { }

    ngOnInit(): void {
    }
}