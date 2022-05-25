import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @Input() value!: any;
  @Input() hotel!: any;
  @Input() in!: any;
  @Input() out!: any;
  constructor() {}

  ngOnInit(): void {}
}
