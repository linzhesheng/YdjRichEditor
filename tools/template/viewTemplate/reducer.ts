/**
 * <% Title %> Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example
 * case YOUR_ACTION_CONSTANT:
 *  return state.set('yourStateVarivle', yourActionPayload)
 */

import { fromJS } from "immutable";
import { AnyAction } from "redux";
import { DEMO_TYPE } from "./constants";

const initialState = fromJS({
});

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state;
    }
};
