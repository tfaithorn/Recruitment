import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PositionInput, PositionService, PositionCriteria } from '../services/position.service';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectDropdownComponent, MultiSelectDropdownOption } from '../common/multi-select-dropdown/multi-select-dropdown.component';
import { BackButtonComponent } from '../common/back-button/back-button.component';


@Component({
    selector: 'app-position',
    standalone : true,
    imports: [
        MultiSelectDropdownComponent, 
        BackButtonComponent, 
        ReactiveFormsModule, 
        EditorModule, 
        RouterLink],
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
    maxShortDescriptionCharacters = 200;
    shortDescriptionEditor : any;
    shortDescriptionCharacterCount : number = 0;
    id? : number;
    currencyPattern = "^[0-9$,.]*$";
    locationOptions : MultiSelectDropdownOption[] = [];

    form = new FormGroup({
        name: new FormControl('', Validators.required),
        contactEmail: new FormControl('', [Validators.required, Validators.email]),
        workType: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        payType: new FormControl('', Validators.required),
        minimumSalary: new FormControl(''),
        maximumSalary: new FormControl(''),
        visibleSalary:  new FormControl('', [Validators.pattern(this.currencyPattern)]),
        shortDescription : new FormControl('', [Validators.required, Validators.maxLength(200)]),
        longDescription : new FormControl(''),
        locations : new FormControl([] as number[])
    });

  constructor(
    private route: ActivatedRoute, 
    private positionService: PositionService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        if(params['id'] === undefined) {
            return;
        }
        this.id = +params['id'];
        const criteria : PositionCriteria = {
            id: this.id,
            includeCategories: true,
            includeLocations: true
        };
        this.positionService.findBy(criteria).subscribe(res => {
            if(res.length > 0) {
                const position = res[0];
                this.form.patchValue({
                    name : position.name,
                    contactEmail : position.contactEmail,
                    workType : position.workType,
                    category : '1',
                    payType : position.payType,
                    minimumSalary : position.minimumSalary.toString(),
                    maximumSalary : position.maximumSalary.toString(),
                    visibleSalary : position.visibleSalary.toString(),
                    shortDescription : position.shortDescription,
                    longDescription : position.longDescription
                });

                if(position.locations !== undefined) {
                    this.locationOptions = position.locations.map(x => { 
                        return {
                            name: x.name, 
                            value: x.id
                        }
                    });
                    this.form.patchValue({
                        locations : position.locations.map(x => x.id)
                    });
                }
            }
        });
    });
  }

  limitShortDescriptionCharacters(e : any) {
    this.shortDescriptionCharacterCount = e.editor.plugins.wordcount.body.getCharacterCount();
    if(this.shortDescriptionCharacterCount >= this.maxShortDescriptionCharacters) {
        e.event.preventDefault();
    }
  }

  onSubmit() {
    if(this.form.valid) {
        /* When upgrading to angular 16, typescript required the form values be not nullable
        (even though they are required in the form), so this is the solution until I can find a more elegant way to do it
        */
        const formValues : PositionInput = {
            name : this.form.value.name!,
            workType : this.form.value.workType!,
            contactEmail : this.form.value.contactEmail!,
            shortDescription : this.form.value.shortDescription!,
            longDescription : this.form.value.longDescription!,
            categoryId : +this.form.value.category!,
            payType : this.form.value.payType!,
            minimumSalary : +this.form.value.minimumSalary!,
            maximumSalary : +this.form.value.maximumSalary!,
            visibleSalary : + this.form.value.visibleSalary!
        }

        if(this.id !== undefined) {
            this.positionService.update(this.id, formValues).subscribe(_ => {
                this.router.navigate(['/position'], { state: { updated: true } });
            });
        }
        else {
            this.positionService.create(formValues).subscribe(_ => {
                this.router.navigate(['/position'], { state: { created: true } });
            });
        }
    }
  }
}
