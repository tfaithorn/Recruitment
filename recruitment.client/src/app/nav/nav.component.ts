import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  expand : boolean = true;
  selectedMenuItem : number = 0;
  selectedSubMenuItem : number = 0;
  menuItems : MenuItem[] = [
    {
        "id" : 2,
        "name" : "Training",
        "iconClass" : "bi bi-book",
        "subItems" : [
            {
                "id" : 4,
                "name" : "My Training",
                "url" : "/"
            }
        ]
    },
    {
        "id": 1,
        "name" : "Recruitment",
        "iconClass" : "bi bi-building",
        "subItems" : [
            {
                "id" : 1,
                "name" : "Positions",
                "url" : "/position"
            },
            {
                "id" : 2,
                "name" : "Position Templates",
                "url" : "/position-template"
            },
            {
                "id" : 3,
                "name" : "Sections",
                "url" : "/section"
            },
        ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenuItem(id : number) {
    if(this.selectedMenuItem == id) {
        this.selectedMenuItem = 0;
    } else {
        this.selectedMenuItem = id;
    }
  }

  selectSubMenuItem(id : number) {
    this.selectedSubMenuItem = id;
  }

  toggleNav() {
    this.expand = !this.expand;
  }
}

export interface MenuItem {
    id : number;
    name : string;
    iconClass: string;
    subItems : SubMenuItem[];
}

export interface SubMenuItem {
    id: number;
    name : string;
    url : string;
}