import { AppActionTypes, AppActions } from './app.actions';


export interface State {
    quillContent: any
}

const initialState: State = {
    quillContent: ['initial content']
}

export function reducer(
    state = initialState,
    action: AppActions,
): State{
    switch (action.type){

        // case AppActionTypes.GetQuillContent: {
        //     return {
        //         ...state,
        //     }
        // }

        // case AppActionTypes.GetQuillContentComplete: {
        //     let newResults = Object.assign([], state.quillContent);
        //      newResults.push(action.payload);
        //     return {
        //         ...state,
        //         quillContent: newResults
        //     }
        // }

        case AppActionTypes.UpdateState: {

             let newResults = Object.assign([], state.quillContent);
             newResults.push(action.payload);

            return {
                ...state,
                quillContent: newResults
            }
        }
    }
}

export const quillContentState = (state: State) => state.quillContent[state.quillContent?.length - 1];