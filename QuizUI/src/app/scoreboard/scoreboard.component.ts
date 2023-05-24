import { Component, OnDestroy, OnInit } from '@angular/core';
import { Score } from '../models/score';
import { ScoreboardService } from '../services/scoreboard.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, OnDestroy {

  constructor(private scoreService: ScoreboardService) { }

  subscription: any

  tableSource: MatTableDataSource<Score> = new MatTableDataSource<Score>
  displayedColumns: any

  ngOnInit() {
    this.subscription = this.scoreService
      .getTopScores()
      .subscribe((result) => { this.tableSource = new MatTableDataSource<Score>(result); });

    this.displayedColumns = ['pos-col', 'name-col', 'score-col'];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe
  }
}
