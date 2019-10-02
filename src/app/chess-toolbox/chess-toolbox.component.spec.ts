import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessToolboxComponent } from './chess-toolbox.component';

describe('ChessToolboxComponent', () => {
  let component: ChessToolboxComponent;
  let fixture: ComponentFixture<ChessToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
