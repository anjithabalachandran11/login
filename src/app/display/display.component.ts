import { Component, OnInit } from '@angular/core';
import { DbService } from '../service/db.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  cuser:any
  cid:any

  age:any
  name:any
  id:any
  f=false

  currentid=''

  updatedata = new FormGroup({
    newage : new FormControl('',Validators.compose([Validators.required])),
  })
  
  constructor(private dbsr:DbService, private router:Router ) {
      this.cuser =JSON.parse(localStorage.getItem("cname")||"")
      this.cid =JSON.parse(localStorage.getItem("cid")||"")
   }

   display(){
    this.dbsr.display().subscribe((result:any) =>{
      //console.log("result: "+result)
      if(result){
        alert("success..")
        //console.log(result.message,result.age,result.name,result.id)
        this.name = result.name
        this.id = result.id
        this.age =result.age
        this.f=true
      }
    },(result)=>{
      alert("failed")
      console.log(result.error.message)
    })
   }

   updatefun(){
    var newage=this.updatedata.value.newage;
    //console.log(newage)
    this.dbsr.updateage(newage).subscribe((result:any)=>{
      //console.log(result)
      if(result){
        alert("Updation Success...")
        this.name = result.uname
        this.id = result.id
        this.age =result.age
        this.f=true
        //console.log(result.message)
      }
    },
    (result)=>{
      alert("failed")
      console.log(result.error.message)
    })

  }

  deleteFromParent(){
    this.currentid =JSON.parse(localStorage.getItem("cid")||"")

  }
  delete(event:any){
    //alert("Message from parent"+event)
    this.dbsr.delete(event).subscribe((result:any)=>{
      console.log(result)
      if(result){
        alert(result.message)
        this.router.navigateByUrl('login')
      }
    },
    (result:any)=>{
      alert(result.error.message)
      this.router.navigateByUrl('display')
    })
  }

  cancel(){
    this.currentid=""
  }

  ngOnInit(): void {
  }

}
