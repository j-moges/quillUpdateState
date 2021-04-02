import { Action, createReducer } from '@ngrx/store';
import { AppActionTypes, AppActions } from './app.actions';


export interface State {
    quillContent: any
}

const initialState: State = {
    quillContent: ['<p style="text-indent: 3em;">initial content<p>']
}

export function reducer(
    state = initialState,
    action: AppActions,
): State{
    switch (action.type){

        case AppActionTypes.UpdateState: {

             let newResults = Object.assign([], state.quillContent);
             newResults.push(action.payload.bodyText);

            return {
                ...state,
                quillContent: newResults
            }
        }

        default: {
            return state;
        }
    }
}

export const quillContentState = (state: State) => state?.quillContent[(state?.quillContent?.length) - 1];