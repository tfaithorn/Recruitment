import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MultiSelectDropdownComponent),
        multi: true,
    },
],
})
export class MultiSelectDropdownComponent implements ControlValueAccessor, OnInit {
    @Input() options: MultiSelectDropdownOption[] = [];
    @Input() placeholder: string = "Select an option";
    control : FormControl | undefined;
    @ViewChild('dropdownSelector') dropdownSelector! : ElementRef;
    @ViewChild('textInput') textInput! : ElementRef;

    optionsVisible : boolean = false;
    onChange = (value : any) => { return value };
    selectedValues : any[] = [];
    searchText : string = "";
    filteredOptions: MultiSelectDropdownOption[] = [];

    ngOnInit(): void {
    }

    add(value : any) {
        this.selectedValues.push(value);
        this.onChange(this.selectedValues);
    }

    updateSearchText(text : string) {
        this.searchText = text;
        this.filteredOptions = this.options.filter(x => !this.selectedValues.includes(x.value) && x.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    showOptions(text : string) {
        this.optionsVisible = true;
        this.updateSearchText(text);
    }
    hideOptions() {
        //a buffer is needed to allow time for onclick on the options to trigger 
        setTimeout(() => {
            this.optionsVisible = false;
        }, 200)
    }

    getNameFromValue(value : any) {
        return this.options.find(x => x.value === value)?.name;
    }

    removeOption(value : any) {
        this.selectedValues.splice(this.selectedValues.indexOf(value), 1);
    }

    writeValue(values: any): void {
        values.forEach( (x : any) => {
            this.add(x);
        });
        this.onChange(this.selectedValues);
    }

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouch: any): void {
        
    }
}

export interface MultiSelectDropdownOption {
    name : string;
    value : any;
}