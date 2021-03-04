import { Action } from '@ngrx/store';

export enum AppActionTypes {
    GetQuillContent = '[App] GetQuillContent',
    GetQuillContentComplete = '[App] GetQuillContentComplete',
    UpdateState = '[App] UpdateState'
}

export class UpdateState implements Action {
    readonly type = AppActionTypes.UpdateState;
    constructor(public payload: any){}
}

export type AppActions = 
    | UpdateState;