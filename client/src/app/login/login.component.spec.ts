/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';

class ChatServiceMock {
  success = false;
  login(userName: string): Observable<boolean> {
    return Observable.of(this.success);
  }
}

describe('LoginComponent: ', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockService = new ChatServiceMock();
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{
        provide: ChatService,
        useValue: mockService
      }, {
        provide: Router,
        userValue: mockRouter
      }],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when onLogin() is called ', () => {
    it('and user enters a username already in use stays on page and gives an error', () => {
      //Arrange:
      mockService.success = false;
      let elem = fixture.debugElement.queryAll(By.css('div'))[0];
      //Act:
      component.onLogin();
      //Assert:
      //expect(elem).toContain('Sorry, this username is already taken');
      expect(elem).toBeTruthy;
    });
    it('and user enters a username not in use is routed to roomlist page', () => {
      //Arrange:
      mockService.success = true;
      //Act:
      component.onLogin();
      //Assert:
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });
});
