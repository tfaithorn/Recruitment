import { NgFor } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fancy-grid',
  standalone: true,
  templateUrl: './fancy-grid.component.html',
  imports: [RouterLink, NgFor],
  styleUrls: ['./fancy-grid.component.css']
})
export class FancyGridComponent implements OnInit, AfterContentChecked {
  @Input() data? : FancyGridData;

  constructor(private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  isEllipsisActive(e: HTMLElement): boolean {
    return e.offsetWidth < e.scrollWidth;
  }
}

export interface FancyGridData {
    headers :FancyGridColumn[];
    rows : FancyGridRow[];
    styles? : string;
}

export interface FancyGridRow {
    routerLink? : string[];
    columns : FancyGridColumn[];
}

export interface FancyGridColumn {
    content : any;
    styles? : string;
}