import { Injectable } from '@angular/core';
import { Figure } from '../../model/Figure';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class RenderService {

    constructor(private toastr: ToastrService) { }

    public showBadMoveInfo() {
        this.toastr.warning("Invalid move, try again.");
    }

    public getSelectedFigure(): Element {
        return document.getElementsByClassName('selected-figure').item(0)
    }

    public isFigureOnBoard(figures: Figure[]): Figure {
        var figure: Figure;
        figures.forEach(f => {
            if (document.querySelector(`div.${f.name}`) != null) {
                figure = f;
                figure.position = {
                    x: <number><unknown>document.querySelector(`div.${f.name}`).id[0],
                    y: <number><unknown>document.querySelector(`div.${f.name}`).id[1]
                }
            }
        });
        return figure;
    }
    public removeHighlight(): void {
        for (let z = 0; z < 6; z++) {
            var i = 0;
            let items = document.getElementsByClassName('highlight');
            let item = items.item(i);
            while (item) {
                item.classList.remove('highlight');
                i++;
                item = items.item(i);
            }
        }
    }
    public unselectToolboxFigure(figure: Element) {
        if (figure && figure.classList.contains('selected-figure')) {
            figure.classList.remove('selected-figure');
        }
    }

    public selectToolboxFigure(figure: Element) {
        figure.classList.add('selected-figure');
    }

    public setFieldWithFigure(figureName: string, target: HTMLElement) {
        target.classList.add(figureName);
    }

    public resetFieldFigure(figureName: string, target: Element) {
        if (target && target.classList.contains(figureName)) {
            target.classList.remove(figureName);
        }
    }

    public disableToolbox() {
        let toolboxFigures = document.getElementsByClassName('btn figure');
        for (let index = 0; index < toolboxFigures.length; index++) {
            (<HTMLInputElement>toolboxFigures.item(index)).disabled = true;
        }
    }

    public enableToolbox() {
        let toolboxFigures = document.getElementsByClassName('btn figure');
        for (let index = 0; index < toolboxFigures.length; index++) {
            (<HTMLInputElement>toolboxFigures.item(index)).disabled = false;
        }
    }
}