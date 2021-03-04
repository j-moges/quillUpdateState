import { Action } from '@ngrx/store';

export enum AppActionTypes {
    GetQuillContent = '[App] GetQuillContent',
    GetQuillContentComplete = '[App] GetQuillContentComplete',
    UpdateState = '[App] UpdateState'
}

// export class GetQuillContent implements Action {
//     readonly type = AppActionTypes.GetQuillContent;
//     constructor(){}
// }

// export class GetQuillContentComplete implements Action {
//     readonly type = AppActionTypes.GetQuillContentComplete;
//     constructor(public payload: any){}
// }

export class UpdateState implements Action {
    readonly type = AppActionTypes.UpdateState;
    constructor(public payload: any){}
}

export type AppActions = 
    // GetQuillContent
    // | GetQuillContentComplete
    | UpdateState;