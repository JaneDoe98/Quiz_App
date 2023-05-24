import { Score } from '../models/score';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  url = "Score"

  public playerName: string =''

  private score: Score = new Score

  constructor(private httpClient: HttpClient) { }

  getTopScores(): Observable<Score[]> {
    return this.httpClient.get<Score[]>(environment.apiUrl + "/" + this.url)
  }

  newScore(score: Score): Observable<Score[]>{
    return this.httpClient.post<Score[]>(environment.apiUrl + "/" + this.url, score);
  }
}
