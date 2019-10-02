import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Figure } from '../../model/Figure';
import { FigurePosition } from '../../model/figure-position';

// consider move api paths to enviroment file

const API_LOCAL_URI = "https://localhost:44357/api";

@Injectable({ providedIn: 'root' })
export class FigureService {
    constructor(private http: HttpClient) {
    }

    public getFigures(): Observable<Figure[]> {
        return this.http.get<Figure[]>(`${API_LOCAL_URI}/figures`);
    }

    public getPossibleMoves(id: number, figurePosition: FigurePosition): Observable<FigurePosition[]> {
        return this.http.post<FigurePosition[]>(`${API_LOCAL_URI}/figures/${id}/moves`, figurePosition);
    }

    public postMove(id: number, from: FigurePosition, to: FigurePosition) {
        return this.http.post<FigurePosition[]>(`${API_LOCAL_URI}/figures/${id}/move`, { from, to });
    }
}