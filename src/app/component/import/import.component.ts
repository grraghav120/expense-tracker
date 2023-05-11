import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit{
  constructor(private _formBuilder: FormBuilder,public route:Router){}
  ngOnInit(): void {}

  onView(){
    this.route.navigate(['dashboard']);
  }

  onSaveImport(){

  }
}
