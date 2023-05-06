import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableviewComponent } from './tableview.component';

describe('TableviewComponent', () => {
  let component: TableviewComponent;
  let fixture: ComponentFixture<TableviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
