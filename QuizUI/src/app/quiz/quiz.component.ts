import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../models/question';
import { Score } from '../models/score';
import { QuizService } from '../services/quiz.service';
import { ScoreboardService } from '../services/scoreboard.service';
import { backgroundMap } from '../models/background-map';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  question: Question = new Question

  playerName = this.scoreService.playerName

  finalResult: Score = new Score()

  subscription: any
  subscriptionScore: any

  map = new backgroundMap()

  constructor(private quizService: QuizService, private scoreService: ScoreboardService, private router: Router) {}

  ngOnChanges() {

  }

  ngOnInit() {
    this.subscribeObserver()
  }


  score: number = 0
  scoreStyle = {}

  optionAStyle = {}
  optionBStyle = {}
  optionCStyle = {}
  optionDStyle = {}

  enableButton = true
  enableClick = "auto"

  resultInnerHTML = ""
  resultStyle = {}

  answerBtn = {}

  nextQuestionBtnStyle = {}
  endGameBtnStyle = {}

  checkAnswer(answer: string) {
    if (answer === this.question.correctAnswer) {
      this.resultStyle = {
        'display': 'block',
        'background-color': '#00ff00'
      }
      this.resultInnerHTML = "Helyes"
      this.toggleQuestion()

      this.styleAnswer(this.question.correctAnswer, "#00ff00");

      this.score += 100

      this.nextQuestionBtnStyle = {
        'display': 'block'
      }
    }
    else {
      this.resultStyle = {
        'display': 'block',
        'background-color': '#ff0000'
      }
      this.resultInnerHTML = "Rossz válasz<br>A helyes válasz: '" + this.question.correctAnswer + "'"
      this.toggleQuestion()

      //Helyes válasz
      this.styleAnswer(this.question.correctAnswer, "#00ff00");

      //Helytelen, de megjelölt válasz
      this.styleAnswer(answer, "#ff0000")

      this.scoreStyle = {
        'fontWeight': 'bold'
      }

      this.endGameBtnStyle = {
        'display': 'block'
      }
    }
  }

  newQuestion() {
    this.styleAnswer(this.question.correctAnswer, "#00aeff")

    this.subscription.unsubscribe()

    this.subscribeObserver()

    this.toggleQuestion()
    this.resultStyle = {
      'display': 'none'
    }
    this.nextQuestionBtnStyle = {
      'display': 'none'
    }
  }

  saveAndHome() {
    this.finalResult.playerName = this.playerName
    this.finalResult.score = this.score

    this.subscriptionScore = this.scoreService.newScore(this.finalResult).subscribe(() => (
      this.changeBackground(''),
      this.router.navigate(['/home'])))
  }

  toggleQuestion() {
    if (!this.enableButton) {
      this.enableButton = true;
      this.enableClick = "auto"
    }
    else if (this.enableButton) {
      this.enableButton = false;
      this.enableClick = "none"
    }
  }

  subscribeObserver() {
    return this.subscription = this.quizService
      .getQuestion()
      .subscribe((result: Question) => (this.question = result,
        this.changeBackground(this.question.category)));
  }

  styleAnswer(answer: string, color: string) {
    switch (answer) {
      case 'A': {
        this.optionAStyle = {
          'background-color': color
        }
        break;
      }
      case 'B': {
        this.optionBStyle = {
          'background-color': color
        }
        break;
      }
      case 'C': {
        this.optionCStyle = {
          'background-color': color
        }
        break;
      }
      case 'D': {
        this.optionDStyle = {
          'background-color': color
        }
        break;
      }
    }
  }

  changeBackground(category: string) {
    let img = new Image();
    img.src = this.map.map.get(category)!
    img.onload = function(){
      (document.body.style.backgroundImage = ("url('" + img.src + "')"))
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscriptionScore.unsubscribe()
  }
}
