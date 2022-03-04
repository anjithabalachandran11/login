import { Component, OnInit } from '@angular/core';
import { DbService } from '../service/db.service';

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
  
  constructor(private dbsr:DbService) {
      this.cuser =JSON.parse(localStorage.getItem("cname")||"")
      this.cid =JSON.parse(localStorage.getItem("cid")||"")
   }

   display(){
    this.dbsr.display().subscribe((result:any) =>{
      console.log("result: "+result)
      if(result){
        alert("success")
        console.log(result.message,result.age,result.name,result.id)
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

  ngOnInit(): void {
  }

}
