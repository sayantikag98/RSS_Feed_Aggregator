import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { TableComponent } from '../table/table.component';

@Component({
  providers: [TableComponent, ApiService],
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit, OnChanges {
  newFeedForm !: FormGroup;
  actionBtn : string = "Create";
  counter: number = 0;
  @Input() newFeed:any;
  

  constructor(private formBuilder: FormBuilder, private api: ApiService, private tableComp: TableComponent) { }
  


  ngOnInit(): void {
    this.newFeedForm = this.formBuilder.group({
      feedUrl: ["", Validators.required]
    });
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    this.tableComp.getAllFeeds1(); 
    if(Object.keys(this.newFeed).length){
      this.actionBtn = "Update";
      this.newFeedForm.setValue({
        feedUrl: this.newFeed.feedUrl
      });
    }
  }

  addOrEditFeed(){
    if(this.actionBtn === "Create"){
      if(this.newFeedForm.valid){
        this.api.postFeed(this.newFeedForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            alert("Feed added successfully to the database");
            this.newFeedForm.reset();
            this.tableComp.getAllFeeds1();
          },
          error: () => {
            alert("Error!!! Feed cannot be added to the database");
          }
        })
      }
    }
    else{
      if(this.newFeedForm.valid){
        this.api.updateFeed(this.newFeed._id, this.newFeedForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            alert("Feed updated successfully in the database");
            this.newFeedForm.reset();
            this.actionBtn = "Create";
            this.tableComp.getAllFeeds1();
          },
          error: () => {
            alert("Error!!! Feed cannot be updated in the database");
          }
        })
      }
    }
      
  }

}


