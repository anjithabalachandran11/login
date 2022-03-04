import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private dbsr:DbService) { }

  id : any
  name:any
  age:any
  
  formdata = new FormGroup({
    id : new FormControl('',Validators.compose([Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')])),
    name : new FormControl('',Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]*")])),
    age : new FormControl('',Validators.compose([Validators.required,Validators.pattern('[0-9]*')]))
  })

  registerfun(){
    var id=this.formdata.value.id;
    var name=this.formdata.value.name;
    var age=this.formdata.value.age;
    this.dbsr.register(id,name,age).subscribe((result:any) =>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl('login')
      }
    },(result:any)=>{
      alert(result.error.message)
      this.router.navigateByUrl('register')
    }) 
  }
  ngOnInit(): void {
  }
}
