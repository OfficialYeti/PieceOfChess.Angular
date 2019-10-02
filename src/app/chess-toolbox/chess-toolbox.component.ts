import { Component, Input, OnInit } from '@angular/core';
import { Figure } from '../shared/model/Figure';
import { RenderService } from '../shared/service/view/render.service';

@Component({
  selector: 'app-chess-toolbox',
  templateUrl: './chess-toolbox.component.html',
  styleUrls: ['./chess-toolbox.component.scss']
})
export class ChessToolboxComponent implements OnInit {
  @Input() figures: Figure[];

  constructor(private renderService: RenderService) { }

  ngOnInit() {
  }

  public onChangeSelection(target: HTMLElement) {
    let lastSelection = document.getElementsByClassName("selected-figure").item(0);
    this.renderService.unselectToolboxFigure(lastSelection);
    this.renderService.selectToolboxFigure(target);
  }

  public onReset() {
    this.figures.forEach(f => {
      this.renderService.resetFieldFigure(f.name, document.getElementsByClassName(f.name).item(0));
    })
    this.renderService.enableToolbox();
    this.renderService.removeHighlight();
  }
}
