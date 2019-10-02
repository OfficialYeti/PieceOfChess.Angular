import { Component, OnInit } from '@angular/core';
import { FigureService } from './shared/service/api/figure.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Figure } from './shared/model/Figure';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PieceOfChess';
  connectionRefused: boolean;
  figures: Figure[];

  constructor(private figureService: FigureService) {
  }

  ngOnInit(): void {
    this.figureService.getFigures().pipe(catchError((err, caught) => {
      this.connectionRefused = true;
      return EMPTY;
    })).subscribe(resp => {
      this.figures = resp;
    });
  }
}
