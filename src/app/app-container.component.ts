import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as AppActions from './app.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app-container.component.html',
    host: {}
})

export class AppContainerComponent implements OnInit{
    getQuillContent$: Observable<any>;

    ngOnInit(){}

    constructor (private store: Store<fromApp.State>) {
        this.getQuillContent$ = store.pipe(select(fromApp.quillContentState));
    }
    
    updateState(content){
        console.log('update state call');
        console.log(content);
        this.store.dispatch(new AppActions.UpdateState(content))
    }
}

