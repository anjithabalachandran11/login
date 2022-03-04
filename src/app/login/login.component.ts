import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private dbsr:DbService, private router:Router) { }
  public id : any
  name=""
  age:any
  invalidlogin:any
  formdata = new FormGroup({
    id : new FormControl('',Validators.compose([Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')])),
    name : new FormControl('',Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]*")])),
  })


  loginfun(){
    var id=this.formdata.value.id;
    var name=this.formdata.value.name;
    //console.log(id,name)
    this.dbsr.login(id,name).subscribe((result:any) =>{
      //console.log(result)
      if(result){
        alert(result.message)
        localStorage.setItem("cid",JSON.stringify(result.cid))
        localStorage.setItem("cname",JSON.stringify(result.cname))
        localStorage.setItem("token",JSON.stringify(result.token))
        this.router.navigateByUrl('display')
      }
    },(result)=>{
      alert(result.error.message)
      this.router.navigateByUrl('login')
    })
  }

  ngOnInit(): void {
  }

}
