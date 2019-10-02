import { Component, Input, OnInit } from '@angular/core';
import { Figure } from 'src/app/shared/model/Figure';
import { FigurePosition } from 'src/app/shared/model/figure-position';
import { FigureService } from 'src/app/shared/service/api/figure.service';
import { RenderService } from 'src/app/shared/service/view/render.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() position: FigurePosition;
  @Input() figures: Figure[];
  darkField: boolean;
  fieldId: string;

  constructor(private figureService: FigureService,
    private renderService: RenderService) {
  }

  ngOnInit() {
    this.fieldId = `${this.position.x}${this.position.y}`;
    this.darkField = (this.position.x + this.position.y) % 2 === 1;
  }

  onFieldClick(target: HTMLElement) {
    const selectedFigureElement = this.renderService.getSelectedFigure();
    const boardFigure: Figure = this.renderService.isFigureOnBoard(this.figures);

    const state = this.getBoardState(selectedFigureElement, boardFigure, target);
    switch (state) {
      case "RESET":
        this.handleResetState();
        break;
      case "TOOLBOX_FIGURE_SELECTED":
        this.handleToolBoxFigureSelectedState(selectedFigureElement, target);
        break;
      case "BOARD_FIGURE_CLICK":
        this.handleBoardFigureClickState(boardFigure);
        break;
      case "HIGHLIGHT_CLICK":
        this.handleHighlightClickState(target, boardFigure);
        break;
      case "EMPTY_FIELD_CLICK":
        this.handleEmptyFieldClickState();
        break;
      default:
        break;
    }
  }

  private handleEmptyFieldClickState() {
    this.renderService.removeHighlight();
    this.renderService.showBadMoveInfo();
  }
  private handleHighlightClickState(target: HTMLElement, boardFigure: Figure) {
    const destination: FigurePosition = { x: <number><unknown>target.id[0], y: <number><unknown>target.id[1] };
    this.figureService.postMove(boardFigure.id, boardFigure.position, destination).subscribe(x => {
      this.renderService.resetFieldFigure(boardFigure.name, document.querySelector(`div.${boardFigure.name}`))
      this.renderService.removeHighlight();
      this.renderService.setFieldWithFigure(boardFigure.name, target);
    });
  }
  private handleBoardFigureClickState(boardFigure: Figure) {
    this.figureService.getPossibleMoves(boardFigure.id, this.position).subscribe(positions => {
      positions.forEach(pos =>
        document.getElementById(`${pos.x}${pos.y}`).classList.add('highlight'));
    });
  }
  private handleToolBoxFigureSelectedState(selectedFigureElement: Element, target: HTMLElement) {
    this.renderService.setFieldWithFigure(selectedFigureElement.id, target);
    this.renderService.disableToolbox();
    this.renderService.unselectToolboxFigure(selectedFigureElement);
  }
  private handleResetState() {
    return;
  }

  private getBoardState(selectedFigureElement: Element, boardFigure: Figure, target: Element): STATUS {
    if (boardFigure && boardFigure.position && (boardFigure.position.x == this.position.x) && (boardFigure.position.y == this.position.y))
      return "BOARD_FIGURE_CLICK";
    if (document.querySelector('div.highlight') && !target.classList.contains('highlight'))
      return "EMPTY_FIELD_CLICK";
    if (target.classList.contains('highlight'))
      return "HIGHLIGHT_CLICK";
    if (selectedFigureElement)
      return "TOOLBOX_FIGURE_SELECTED";
    else
      return "RESET";
  }
}

export type STATUS =
  'RESET' |
  'TOOLBOX_FIGURE_SELECTED' |
  'BOARD_FIGURE_CLICK' |
  'HIGHLIGHT_CLICK' |
  'EMPTY_FIELD_CLICK'
