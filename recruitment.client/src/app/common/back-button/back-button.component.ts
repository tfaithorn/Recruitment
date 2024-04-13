import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-back-button',
    standalone: true,
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
    @Input() classNames : string = '';

    constructor(private router : Router) { }

    ngOnInit(): void {
    }

    back() {
        window.history.back();
    }
}
