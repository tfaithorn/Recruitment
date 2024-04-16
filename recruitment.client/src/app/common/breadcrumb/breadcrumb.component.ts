import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
    @Input() parts : BreadCrumbPart[] = [];
}

export interface BreadCrumbPart {
    name: string;
    routerLink: string[];
}
