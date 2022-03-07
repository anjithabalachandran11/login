import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
  @Input() item:string|undefined
  @Output() onDelete = new EventEmitter
  @Output() onCancel = new EventEmitter

  constructor(private router:Router, private dbsr:DbService) { }


  deletUserFromChild(){
    this.onDelete.emit(this.item)
  }

  cancelFromChild(){
    this.onCancel.emit()
  }

  ngOnInit(): void {
  }

}
