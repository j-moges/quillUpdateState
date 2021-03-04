import { Injectable } from '@angular/core';
import { Action, ActionsSubject } from '@ngrx/store';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromApp from './app.reducer';
import { Observable, empty, defer, of, from } from 'rxjs';
import { switchMap, toArray, map, catchError, mergeMap, mapTo, withLatestFrom, startWith, tap, filter } from 'rxjs/operators';

@Injectable()
export class AppEffects {
    constructor(private actions$: ActionsSubject, private store: Store<fromApp.State>) { }

}

