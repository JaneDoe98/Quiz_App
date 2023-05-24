import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreboardService } from '../services/scoreboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private scoreService: ScoreboardService) { }

  defaultValue = this.scoreService.playerName

  ngOnInit() {
    if (this.defaultValue != '') {
      this.isDisabled = false;
    }
  }

  isDisabled = true

  onUserInput(event: any) {
    let inputText = event.target.value;

    if (inputText == '') {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
    }
  }

  startGame(givenName: string) {
    this.scoreService.playerName = givenName
    this.router.navigate(['/quiz'])
  }
}
