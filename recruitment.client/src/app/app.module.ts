import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PositionDashboardComponent } from './position-dashboard/position-dashboard.component';
import { PositionTemplatesComponent } from './position-templates/position-templates.component';
import { SectionsComponent } from './sections/sections.component';
import { PositionComponent } from './position/position.component';
import { PositionService } from './services/position.service';
import { EditorModule } from "@tinymce/tinymce-angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FancyGridComponent } from './common/fancy-grid/fancy-grid.component';
import { PositionApplicantsComponent } from './position-applicants/positin-applicants.component';
import { MessageContainerComponent } from './message-container/message-container.component';
import { ApplicantService } from './services/applicant.service';
import { BackButtonComponent } from './common/back-button/back-button.component';
import { ApplicantComponent } from './applicant/applicant.component';

const routes: Routes = [
    { path: 'applicant/:id', component: ApplicantComponent },
    { path: 'position', component: PositionDashboardComponent },
    { path: 'position/new', component: PositionComponent },
    { path: 'position/:id', component: PositionComponent },
    { path: 'position/:id/applicants', component: PositionApplicantsComponent },
    { path: 'position-template', component: PositionTemplatesComponent },
    { path: 'section', component: SectionsComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PositionTemplatesComponent,
    SectionsComponent,
    PositionDashboardComponent,
    FancyGridComponent,
    MessageContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    FormsModule,
    EditorModule,
    ReactiveFormsModule
  ],
  providers: [
    PositionService,
    ApplicantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
