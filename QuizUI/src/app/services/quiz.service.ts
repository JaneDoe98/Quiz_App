import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  url = "Quiz"

  private question: Question = new Question

  constructor(private httpClient: HttpClient) { }

  getQuestion(): Observable<Question> {
    return this.httpClient.get<Question>(environment.apiUrl + "/" + this.url)
  }
}
