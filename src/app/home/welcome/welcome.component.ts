import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  pageTitle = "welcome Bosch";
  constructor() { }

  ngOnInit(): void {
  }

}
