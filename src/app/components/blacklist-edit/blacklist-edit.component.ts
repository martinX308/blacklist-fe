import {   Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-blacklist-edit',
  templateUrl: './blacklist-edit.component.html',
  styleUrls: ['./blacklist-edit.component.css']
})

export class BlacklistEditComponent implements OnInit {
  @Input() editPost: any;
  @Output() onEdit = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  updatePost(ddNum){
    console.log(ddNum);
    this.onEdit.emit({id:this.editPost._id,ddNum:ddNum});
  }

}
