import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@prisma/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User | null>;

  constructor() {
    this.userSubject = new BehaviorSubject(null as User | null) ;
  }

  public get user(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public login(user: User): void {
    this.userSubject.next(user);
  }

  public update(user: User): void {
    this.userSubject.next(user);
  }

  public logout(): boolean {
    this.userSubject.next(null);
    return true;
  }
}
