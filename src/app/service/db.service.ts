import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options ={
  headers : new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DbService {

  constructor(private http:HttpClient) { }

  register(id:any,name:any,age:any){
    const data = {
      id,
      name,
      age
    }
    return this.http.post('http://localhost:3000/register',data)
  }

  login(id:any,name:any){
    const data = {
      id,
      name
    }
    return this.http.post('http://localhost:3000/login',data)
  }
  display(){
    const name =JSON.parse(localStorage.getItem("cname")||"")
    const id =JSON.parse(localStorage.getItem("cid")||"")
    //console.log("cuser: "+name)
    //console.log("cid: "+id)
    const data={
      id,
      name
    }
    //console.log("data: "+data)
    const token = JSON.parse(localStorage.getItem("token")||'')
    //console.log("token: "+token)
    //to create header
    let headers = new HttpHeaders()
    if(token){
       headers = headers.append('x-access-token',token)
       options.headers = headers
    }
    //console.log("options"+options.headers)
    return this.http.post('http://localhost:3000/display',data,options)
    
  }

  updateage(age:any){
    const name =JSON.parse(localStorage.getItem("cname")||"")
    const id =JSON.parse(localStorage.getItem("cid")||"")
    const data={
      id,
      name,
      age
    }
    const token = JSON.parse(localStorage.getItem("token")||'')
    let headers = new HttpHeaders()
    if(token){
       headers = headers.append('x-access-token',token)
       options.headers = headers
    }
    return this.http.post('http://localhost:3000/update',data,options)

  }

  delete(id:any){
    // const data={
    //   id,
    //   name
    // }
    console.log(id)
    const token = JSON.parse(localStorage.getItem("token")||'')
    let headers = new HttpHeaders()
    if(token){
       headers = headers.append('x-access-token',token)
       options.headers = headers
    }
    return this.http.delete('http://localhost:3000/display/?id='+id,options)

  }






















  // getoptions(){
  //   const token = JSON.parse(localStorage.getItem("token")||'')
  //   console.log("token: "+token)
  //   //to create header
  //   let headers = new HttpHeaders()
  //   if(token){
  //      headers = headers.append("x-access-token",token)
  //      options.headers = headers
  //   }
  //   console.log("options"+options)
  //   return options
  // }

}
