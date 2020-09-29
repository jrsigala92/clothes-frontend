import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  display = false;
  constructor() { }

  ngOnInit(): void {
  }

    showDialog() {
        this.display = true;
    }
}
