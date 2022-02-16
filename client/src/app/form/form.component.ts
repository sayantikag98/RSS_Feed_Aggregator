import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  newFeedForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newFeedForm = this.formBuilder.group({
      feedUrl: ["", Validators.required]
    });
  }

  async addFeed(){
    try{
      console.log(this.newFeedForm.value);
      const response = await axios.post("http://localhost:3000/", this.newFeedForm.value);
      if(response.status === 200)
        console.log("Feed url successfully added to the database");
      else
        console.log("ERROR!! Feed url cannot be added to the database");
    }
    catch(err){
      console.log(err);
    }
  }

}


