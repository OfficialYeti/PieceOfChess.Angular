import { Component, OnInit, Input } from '@angular/core';
import { FigurePosition } from '../shared/model/figure-position';
import { FigureService } from '../shared/service/api/figure.service';
import { Figure } from '../shared/model/Figure';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() figures: Figure[];
  positions = new Array<FigurePosition>();
  connectionRefused: boolean;

  constructor() {
    this.initFigurePositions();
  }

  ngOnInit() {
  }

  private initFigurePositions() {
    for (let y = 1; y < 9; y++) {
      for (let x = 1; x < 9; x++) {
        this.positions.push({ x: x, y: y });
      }
    }
  }
}
